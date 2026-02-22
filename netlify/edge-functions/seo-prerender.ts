import type { Context } from "https://edge.netlify.com";

// ─── Configuration ─────────────────────────────────────────────────────────
const SUPABASE_URL = "https://akrlyzmfszumibwgocae.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcmx5em1mc3p1bWlid2dvY2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NjUyNDcsImV4cCI6MjA1ODM0MTI0N30.UDVk1wzm36OJGK0usCHEtvmkC2QxABvG9KQ8p2lKz30";
const SITE_URL = "https://novahypnose.fr";
const SITE_NAME = "Blog NovaHypnose";
const STORAGE_URL =
  "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public";
const DEFAULT_IMAGE = `${STORAGE_URL}/images/emergences-hypnose.webp`;

const BOT_USER_AGENTS = [
  "googlebot",
  "bingbot",
  "msnbot",        // Bing legacy crawler
  "bingpreview",   // Bing preview/thumbnail bot
  "yandex",
  "baiduspider",
  "duckduckbot",
  "slurp",
  "facebot",
  "ia_archiver",
  "linkedinbot",
  "twitterbot",
  "applebot",
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "petalbot",
  "gptbot",
  "claude-web",
  "perplexitybot",
  "meta-externalagent",
  "amazonbot",
  "bytespider",
  "dataforseobot",
];

// ─── Types ─────────────────────────────────────────────────────────────────
interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url: string;
  storage_image_url: string;
  published: boolean;
  published_at: string | null;
  updated_at: string;
  categories: string[];
  tags: { name: string; slug: string }[];
  keywords: string[];
  seo_description: string;
  meta_description: string;
  read_time: number;
  author: string;
  faq: { question: string; answer: string }[] | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function isBot(request: Request): boolean {
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

function truncateTitle(title: string, maxLength = 45): string {
  if (title.length <= maxLength) return title;
  return title.substring(0, maxLength).trim() + "...";
}

function ensureDescriptionLength(desc: string, minLength = 120, maxLength = 160): string {
  if (desc.length >= minLength && desc.length <= maxLength) return desc;
  if (desc.length < minLength) {
    const suffix = " Découvrez nos articles par Alain Zenatti, hypnothérapeute ericksonien à Paris 4ème.";
    return (desc + suffix).substring(0, maxLength);
  }
  if (desc.length > maxLength) return desc.substring(0, maxLength - 3) + "...";
  return desc;
}

function getImageUrl(article: Article): string {
  return article.storage_image_url || article.image_url || DEFAULT_IMAGE;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

// ─── Supabase fetch helpers ────────────────────────────────────────────────

async function supabaseFetch(path: string): Promise<Response> {
  return fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
    },
  });
}

async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await supabaseFetch(
    `articles?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*&limit=1`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}

async function getAllPublishedArticles(): Promise<Article[]> {
  const res = await supabaseFetch(
    `articles?published=eq.true&order=published_at.desc&select=id,title,slug,excerpt,image_url,storage_image_url,published_at,categories,read_time,author,seo_description`
  );
  if (!res.ok) return [];
  return res.json();
}

async function getArticlesByCategory(
  categorySlug: string
): Promise<{ articles: Article[]; category: Category | null }> {
  // Get category info
  const catRes = await supabaseFetch(
    `categories?slug=eq.${encodeURIComponent(categorySlug)}&select=*&limit=1`
  );
  const categories = catRes.ok ? await catRes.json() : [];
  const category = categories.length > 0 ? categories[0] : null;

  if (!category) return { articles: [], category: null };

  // Get articles that contain this category name
  const artRes = await supabaseFetch(
    `articles?published=eq.true&categories=cs.{${encodeURIComponent(category.name)}}&order=published_at.desc&select=id,title,slug,excerpt,image_url,storage_image_url,published_at,categories,read_time,author,seo_description`
  );
  const articles = artRes.ok ? await artRes.json() : [];

  return { articles, category };
}

async function getAllCategories(): Promise<Category[]> {
  const res = await supabaseFetch(`categories?order=name.asc&select=*`);
  if (!res.ok) return [];
  return res.json();
}

async function getAdjacentArticles(
  publishedAt: string
): Promise<{ prev: Article | null; next: Article | null }> {
  const [prevRes, nextRes] = await Promise.all([
    supabaseFetch(
      `articles?published=eq.true&published_at=lt.${publishedAt}&order=published_at.desc&limit=1&select=title,slug`
    ),
    supabaseFetch(
      `articles?published=eq.true&published_at=gt.${publishedAt}&order=published_at.asc&limit=1&select=title,slug`
    ),
  ]);

  const prevData = prevRes.ok ? await prevRes.json() : [];
  const nextData = nextRes.ok ? await nextRes.json() : [];

  return {
    prev: prevData.length > 0 ? prevData[0] : null,
    next: nextData.length > 0 ? nextData[0] : null,
  };
}

// ─── HTML generators ───────────────────────────────────────────────────────

function htmlShell(options: {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  jsonLd: unknown[];
  body: string;
}): string {
  const {
    title,
    description,
    canonicalUrl,
    imageUrl,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
    keywords = [],
    jsonLd,
    body,
  } = options;

  const fullTitle = `${truncateTitle(title)} | ${SITE_NAME}`;
  const safeTitle = escapeHtml(fullTitle);
  const safeDesc = escapeHtml(description);

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}">
  <meta name="robots" content="index, follow">
  <meta name="googlebot" content="index, follow">
  <meta name="bingbot" content="index, follow">
  <meta name="msvalidate.01" content="802C8CF0910ACE394934676CB839E931">
  <meta name="google-site-verification" content="3VKz5JfNFaPVPQOGFV9iuTBzPZsQghbXpgb8vwiyjfM">
  ${keywords.length > 0 ? `<meta name="keywords" content="${escapeHtml(keywords.join(", "))}">` : ""}
  ${author ? `<meta name="author" content="${escapeHtml(author)}">` : ""}
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:type" content="${type}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:locale" content="fr_FR">
  ${publishedTime ? `<meta property="article:published_time" content="${publishedTime}">` : ""}
  ${modifiedTime ? `<meta property="article:modified_time" content="${modifiedTime}">` : ""}
  ${type === "article" && author ? `<meta property="article:author" content="${escapeHtml(author)}">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${imageUrl}">
  ${jsonLd.map((ld) => `<script type="application/ld+json">${safeJsonLd(ld)}</script>`).join("\n  ")}
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 1rem; color: #1a1a2e; line-height: 1.6; }
    header { border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 2rem; }
    header a { color: #6d28d9; text-decoration: none; margin-right: 1rem; }
    h1 { color: #1a1a2e; font-size: 1.8rem; }
    .meta { color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem; }
    .article-image { max-width: 100%; height: auto; border-radius: 0.5rem; margin-bottom: 1.5rem; }
    .article-list { list-style: none; padding: 0; }
    .article-list li { margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; }
    .article-list h2 { margin: 0 0 0.5rem; }
    .article-list h2 a { color: #6d28d9; text-decoration: none; }
    .article-list p { color: #475569; margin: 0.25rem 0; }
    .faq-section { background: #f8fafc; padding: 1.5rem; border-radius: 0.5rem; margin-top: 2rem; }
    .faq-section h2 { margin-top: 0; }
    .faq-item { margin-bottom: 1rem; }
    .faq-item h3 { color: #6d28d9; margin-bottom: 0.25rem; }
    nav.pagination { display: flex; justify-content: space-between; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; }
    nav.pagination a { color: #6d28d9; text-decoration: none; }
    .categories-list { list-style: none; padding: 0; }
    .categories-list li { margin-bottom: 1rem; }
    .categories-list a { color: #6d28d9; text-decoration: none; font-size: 1.1rem; }
    footer { border-top: 1px solid #e2e8f0; margin-top: 3rem; padding-top: 1rem; color: #64748b; font-size: 0.85rem; }
    footer a { color: #6d28d9; text-decoration: none; }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="${SITE_URL}">NovaHypnose</a>
      <a href="${SITE_URL}/blog">Blog Émergences</a>
      <a href="${SITE_URL}/blog/categories">Catégories</a>
    </nav>
  </header>
  <main>
    ${body}
  </main>
  <footer>
    <p><a href="${SITE_URL}">NovaHypnose</a> - Hypnothérapeute Paris 4 | Alain Zenatti</p>
    <p><a href="${SITE_URL}/mentions-legales">Mentions légales</a></p>
  </footer>
</body>
</html>`;
}

// ─── Page renderers ────────────────────────────────────────────────────────

function renderArticlePage(
  article: Article,
  adjacent: { prev: Article | null; next: Article | null }
): string {
  const canonicalUrl = `${SITE_URL}/blog/article/${article.slug}`;
  const imageUrl = getImageUrl(article);
  const description =
    article.seo_description || article.meta_description || article.excerpt;

  // BlogPosting structured data
  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: description,
    image: imageUrl,
    url: canonicalUrl,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: {
      "@type": "Person",
      name: article.author || "Alain Zenatti",
      url: `${SITE_URL}`,
    },
    publisher: {
      "@type": "Organization",
      name: "NovaHypnose",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    wordCount: stripHtmlTags(article.content).split(/\s+/).length,
    timeRequired: `PT${article.read_time || 5}M`,
    inLanguage: "fr",
    ...(article.keywords?.length > 0 && { keywords: article.keywords.join(", ") }),
  };

  // BreadcrumbList
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: canonicalUrl,
      },
    ],
  };

  const jsonLd: unknown[] = [blogPostingLd, breadcrumbLd];

  // FAQPage structured data if FAQ exists
  if (article.faq && article.faq.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  // Build FAQ HTML
  const faqHtml =
    article.faq && article.faq.length > 0
      ? `<section class="faq-section">
        <h2>Questions fréquentes</h2>
        ${article.faq.map((item) => `<div class="faq-item"><h3>${escapeHtml(item.question)}</h3><p>${escapeHtml(item.answer)}</p></div>`).join("")}
      </section>`
      : "";

  // Adjacent articles navigation
  const navHtml = `<nav class="pagination">
    ${adjacent.prev ? `<a href="${SITE_URL}/blog/article/${adjacent.prev.slug}">&larr; ${escapeHtml(adjacent.prev.title)}</a>` : "<span></span>"}
    ${adjacent.next ? `<a href="${SITE_URL}/blog/article/${adjacent.next.slug}">${escapeHtml(adjacent.next.title)} &rarr;</a>` : "<span></span>"}
  </nav>`;

  const body = `<article>
    <h1>${escapeHtml(article.title)}</h1>
    <div class="meta">
      <span>Par ${escapeHtml(article.author || "Alain Zenatti")}</span>
      ${article.published_at ? `<span> | ${formatDate(article.published_at)}</span>` : ""}
      ${article.read_time ? `<span> | ${article.read_time} min de lecture</span>` : ""}
    </div>
    ${imageUrl ? `<img class="article-image" src="${imageUrl}" alt="${escapeHtml(article.title)}" width="800" height="450">` : ""}
    <p><em>${escapeHtml(article.excerpt)}</em></p>
    <div class="article-content">${article.content}</div>
    ${faqHtml}
  </article>
  ${navHtml}`;

  return htmlShell({
    title: article.title,
    description,
    canonicalUrl,
    imageUrl,
    type: "article",
    publishedTime: article.published_at || undefined,
    modifiedTime: article.updated_at,
    author: article.author || "Alain Zenatti",
    keywords: article.keywords,
    jsonLd,
    body,
  });
}

function renderBlogIndex(articles: Article[]): string {
  const canonicalUrl = `${SITE_URL}/blog`;

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: SITE_NAME,
    description:
      "Articles sur l'hypnose, le bien-être et le développement personnel par Alain Zenatti, hypnothérapeute à Paris.",
    url: canonicalUrl,
    publisher: {
      "@type": "Organization",
      name: "NovaHypnose",
      url: SITE_URL,
    },
    inLanguage: "fr",
    blogPost: articles.slice(0, 20).map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${SITE_URL}/blog/article/${a.slug}`,
      datePublished: a.published_at,
      description: a.seo_description || a.excerpt,
      image: getImageUrl(a),
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: canonicalUrl,
      },
    ],
  };

  const articlesHtml = articles
    .map(
      (a) => `<li>
      <h2><a href="${SITE_URL}/blog/article/${a.slug}">${escapeHtml(a.title)}</a></h2>
      <p class="meta">${formatDate(a.published_at)} ${a.read_time ? `| ${a.read_time} min de lecture` : ""}</p>
      <p>${escapeHtml(a.excerpt || a.seo_description || "")}</p>
    </li>`
    )
    .join("");

  const body = `<h1>Émergences - Blog hypnose et bien-être</h1>
    <p>Articles sur l'hypnose, le bien-être et le développement personnel par Alain Zenatti, hypnothérapeute à Paris.</p>
    <ul class="article-list">${articlesHtml}</ul>`;

  return htmlShell({
    title: "Blog hypnose et bien-être",
    description:
      "Découvrez nos articles sur l'hypnose, le stress, l'anxiété, les phobies et le bien-être. Conseils pratiques par Alain Zenatti, hypnothérapeute à Paris.",
    canonicalUrl,
    imageUrl: DEFAULT_IMAGE,
    jsonLd: [blogLd, breadcrumbLd],
    body,
  });
}

function renderCategoryPage(
  category: Category,
  articles: Article[]
): string {
  const canonicalUrl = `${SITE_URL}/blog/categorie/${category.slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: canonicalUrl,
      },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - ${SITE_NAME}`,
    description:
      category.description ||
      `Articles sur ${category.name} - hypnose et bien-être`,
    url: canonicalUrl,
    isPartOf: {
      "@type": "Blog",
      name: SITE_NAME,
      url: `${SITE_URL}/blog`,
    },
  };

  const articlesHtml = articles
    .map(
      (a) => `<li>
      <h2><a href="${SITE_URL}/blog/article/${a.slug}">${escapeHtml(a.title)}</a></h2>
      <p class="meta">${formatDate(a.published_at)} ${a.read_time ? `| ${a.read_time} min de lecture` : ""}</p>
      <p>${escapeHtml(a.excerpt || a.seo_description || "")}</p>
    </li>`
    )
    .join("");

  const body = `<h1>${escapeHtml(category.name)}</h1>
    ${category.description ? `<p>${escapeHtml(category.description)}</p>` : ""}
    <p>${articles.length} article${articles.length > 1 ? "s" : ""} dans cette catégorie.</p>
    <ul class="article-list">${articlesHtml}</ul>
    <p><a href="${SITE_URL}/blog">&larr; Retour au blog</a></p>`;

  const rawDescription =
    category.description ||
    `Articles sur ${category.name}. Conseils et techniques d'hypnose par Alain Zenatti, hypnothérapeute à Paris.`;

  return htmlShell({
    title: `${category.name} - Blog hypnose`,
    description: ensureDescriptionLength(rawDescription),
    canonicalUrl,
    imageUrl: DEFAULT_IMAGE,
    jsonLd: [collectionLd, breadcrumbLd],
    body,
  });
}

function renderCategoriesPage(categories: Category[]): string {
  const canonicalUrl = `${SITE_URL}/blog/categories`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Catégories",
        item: canonicalUrl,
      },
    ],
  };

  const categoriesHtml = categories
    .map(
      (c) => `<li>
      <a href="${SITE_URL}/blog/categorie/${c.slug}">${escapeHtml(c.name)}</a>
      ${c.description ? `<p>${escapeHtml(c.description)}</p>` : ""}
    </li>`
    )
    .join("");

  const body = `<h1>Catégories du blog</h1>
    <p>Explorez nos articles par thématique.</p>
    <ul class="categories-list">${categoriesHtml}</ul>
    <p><a href="${SITE_URL}/blog">&larr; Retour au blog</a></p>`;

  return htmlShell({
    title: "Catégories - Blog hypnose",
    description:
      "Explorez les catégories du blog Émergences : stress, anxiété, phobies, sommeil, confiance en soi et plus. Articles par Alain Zenatti, hypnothérapeute à Paris.",
    canonicalUrl,
    imageUrl: DEFAULT_IMAGE,
    jsonLd: [breadcrumbLd],
    body,
  });
}

// ─── Main handler ──────────────────────────────────────────────────────────

export default async function handler(
  request: Request,
  context: Context
): Promise<Response> {
  // Only intercept for bots
  if (!isBot(request)) {
    return context.next();
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    // Route: /blog/article/:slug
    const articleMatch = pathname.match(/^\/blog\/article\/([^/]+)\/?$/);
    if (articleMatch) {
      const slug = articleMatch[1];
      const article = await getArticleBySlug(slug);
      if (!article) {
        return context.next();
      }
      const adjacent = await getAdjacentArticles(
        article.published_at || article.updated_at
      );
      const html = renderArticlePage(article, adjacent);
      return new Response(html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
          "x-robots-tag": "index, follow",
        },
      });
    }

    // Route: /blog/categorie/:slug
    const categoryMatch = pathname.match(/^\/blog\/categorie\/([^/]+)\/?$/);
    if (categoryMatch) {
      const slug = categoryMatch[1];
      const { articles, category } = await getArticlesByCategory(slug);
      if (!category) {
        return context.next();
      }
      const html = renderCategoryPage(category, articles);
      return new Response(html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
          "x-robots-tag": "index, follow",
        },
      });
    }

    // Route: /blog/categories
    if (pathname === "/blog/categories" || pathname === "/blog/categories/") {
      const categories = await getAllCategories();
      const html = renderCategoriesPage(categories);
      return new Response(html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
          "x-robots-tag": "index, follow",
        },
      });
    }

    // Route: /blog
    if (pathname === "/blog" || pathname === "/blog/") {
      const articles = await getAllPublishedArticles();
      const html = renderBlogIndex(articles);
      return new Response(html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
          "x-robots-tag": "index, follow",
        },
      });
    }
  } catch (error) {
    console.error("[seo-prerender] Error:", error);
    // On error, fall through to SPA
    return context.next();
  }

  // Fallback: serve SPA
  return context.next();
}
