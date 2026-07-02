import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://novahypnose.fr';

// Source de vérité unique : la liste STATIC_PAGES de la fonction Supabase
// generate-sitemap (celle qui sert le sitemap de production via l'edge
// function sitemap-proxy). On la parse ici plutôt que de maintenir une
// seconde liste qui divergerait — cf. AUDIT-SEO-GEO-JUILLET-2026.md.
// Le garde-fou scripts/__tests__/seo-coverage.test.ts vérifie que cette
// liste reste alignée avec les routes React, le prerender et llms.txt.
function loadStaticPages() {
  const supabaseFn = path.join(
    __dirname, '..', 'supabase', 'functions', 'generate-sitemap', 'index.ts'
  );
  const src = fs.readFileSync(supabaseFn, 'utf8');
  const pages = [...src.matchAll(
    /\{ loc: '(\/[^']*)',\s*changefreq: '(\w+)',\s*priority: '([\d.]+)' \}/g
  )].map(([, loc, changefreq, priority]) => ({ loc, changefreq, priority }));

  if (pages.length < 40) {
    throw new Error(
      `Extraction de STATIC_PAGES depuis ${supabaseFn} suspecte : ` +
      `${pages.length} pages trouvées (au moins 40 attendues). ` +
      `Le format de la liste a probablement changé — adapter la regex.`
    );
  }
  return pages;
}

const STATIC_PAGES = loadStaticPages();

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function fetchFromSupabase() {
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.warn('⚠️  Variables Supabase manquantes — sitemap avec pages statiques uniquement');
    return { articles: [], categories: [] };
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const [articlesRes, categoriesRes] = await Promise.all([
      supabase
        .from('articles')
        .select('slug, updated_at, published_at, image_url, title')
        .eq('published', true)
        .order('published_at', { ascending: false }),
      supabase
        .from('categories')
        .select('slug, created_at'),
    ]);

    if (articlesRes.error) throw articlesRes.error;

    return {
      articles: articlesRes.data || [],
      categories: categoriesRes.data || [],
    };
  } catch (error) {
    console.error('❌ Erreur Supabase:', error.message);
    console.warn('⚠️  Sitemap généré sans articles de blog');
    return { articles: [], categories: [] };
  }
}

async function generateSitemap() {
  console.log('🚀 Génération du sitemap...');

  const now = new Date().toISOString().split('T')[0];
  const { articles, categories } = await fetchFromSupabase();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Pages statiques
  for (const page of STATIC_PAGES) {
    xml += `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

    if (page.loc === '/') {
      xml += `
    <image:image>
      <image:loc>https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp</image:loc>
      <image:caption>Alain Zenatti, Hypnothérapeute à Paris</image:caption>
      <image:title>NovaHypnose - Cabinet d'hypnothérapie à Paris</image:title>
    </image:image>`;
    }

    xml += `
  </url>
`;
  }

  // Catégories du blog
  for (const category of categories) {
    const lastmod = category.created_at
      ? new Date(category.created_at).toISOString().split('T')[0]
      : now;

    xml += `  <url>
    <loc>${SITE_URL}/blog/categorie/${category.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  // Articles du blog
  for (const article of articles) {
    const lastmod = article.updated_at
      ? new Date(article.updated_at).toISOString().split('T')[0]
      : (article.published_at
          ? new Date(article.published_at).toISOString().split('T')[0]
          : now);

    xml += `  <url>
    <loc>${SITE_URL}/blog/article/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>`;

    if (article.image_url) {
      xml += `
    <image:image>
      <image:loc>${escapeXml(article.image_url)}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
    </image:image>`;
    }

    xml += `
  </url>
`;
  }

  xml += `</urlset>`;

  // Écrire le fichier
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');

  const totalUrls = STATIC_PAGES.length + categories.length + articles.length;
  console.log(`✅ Sitemap généré: ${sitemapPath} (${totalUrls} URLs)`);
  console.log(`   Pages statiques: ${STATIC_PAGES.length}, Catégories: ${categories.length}, Articles: ${articles.length}`);
}

generateSitemap();
