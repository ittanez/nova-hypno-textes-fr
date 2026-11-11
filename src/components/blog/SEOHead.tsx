
import React from "react";
import { Helmet } from "react-helmet";
import { SchemaMarkup } from "@/types/schema";
import { safeJSONStringify } from '@/lib/seo-utils';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
  robots?: string;
  structuredData?: SchemaMarkup | SchemaMarkup[];
  breadcrumbs?: Array<{ name: string; url?: string }>;
}

// Export du type pour utilisation ailleurs
export type { SchemaMarkup };

const SEOHead = ({
  title,
  description,
  image = "https://novahypnose.fr/images/emergences-hypnose.webp",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  keywords = [],
  robots = "index, follow",
  structuredData
}: SEOHeadProps) => {
  const siteTitle = "Blog NovaHypnose";

  // Titre SERP (audit R-03) : 58 caractères max, coupé au dernier mot entier,
  // jamais sur un mot-outil (préposition, article...), sans points de suspension.
  // Le suffixe de marque court n'est ajouté que s'il tient dans la limite.
  const MAX_TITLE = 58;
  const BRAND_SUFFIX = " | NovaHypnose";
  const DANGLING_WORDS = new Set([
    "à", "a", "au", "aux", "de", "du", "des", "d'", "l'", "la", "le", "les", "un", "une",
    "et", "ou", "en", "pour", "par", "sur", "sous", "dans", "avec", "sans", "vers", "chez",
    "que", "qui", "ce", "se", "ne", "est", "son", "sa", "ses", "votre", "vos", "notre",
    "ma", "mon", "on", "l'on", "comment", "quand",
  ]);
  // Mots qui ouvrent un complément : coupé juste avant, le titre se lit seul.
  const TITLE_OPENERS = new Set(["pour", "avec", "grâce", "en", "à", "au", "aux", "par", "dans", "chez", "sur", "selon", "face"]);
  // Longueur minimale d'un titre coupé à une ponctuation (il doit encore dire le sujet).
  const MIN_CLAUSE_TITLE = 24;

  // Même logique que truncateTitle dans netlify/edge-functions/seo-prerender.ts.
  const truncateTitle = (raw: string, maxLength: number = MAX_TITLE): string => {
    const text = raw.trim();
    if (text.length <= maxLength) return text;
    const head = text.slice(0, maxLength + 1);
    const lastSpace = head.lastIndexOf(" ");
    const wordCut = lastSpace > 20 ? head.slice(0, lastSpace) : text.slice(0, maxLength);
    const words = wordCut.split(/\s+/);
    while (words.length > 1 && DANGLING_WORDS.has(words[words.length - 1].toLowerCase())) {
      words.pop();
    }
    const base = words.join(" ").replace(/[\s,;:.\-–—]+$/, "");

    // 1) La coupe au mot tombe à un endroit naturel (fin de proposition) : on la garde.
    const next = text.slice(wordCut.length).trim();
    const nextWord = next.split(/\s+/)[0].toLowerCase();
    if (base === wordCut && (/^[,:;?!)–—]/.test(next) || /\)$/.test(base) || TITLE_OPENERS.has(nextWord))) {
      return base;
    }
    // 2) Sinon on enlève la proposition entamée (« … : ce qui marche, ce qui ne ») en
    //    coupant à la dernière virgule ou parenthèse, s'il reste au moins deux mots
    //    après les deux-points.
    const colon = head.lastIndexOf(" : ");
    const comma = Math.max(head.lastIndexOf(", "), head.lastIndexOf(" ("), head.lastIndexOf(" – "), head.lastIndexOf(" — "));
    if (comma > colon && comma >= MIN_CLAUSE_TITLE) {
      const start = Math.max(colon, head.lastIndexOf(" ? "));
      const tail = text.slice(start < 0 ? 0 : start + 3, comma).trim();
      if (tail.split(/\s+/).length >= 2) return text.slice(0, comma).trim();
    }
    // 3) Sinon le sujet seul (avant les deux-points), s'il est assez long pour se suffire.
    if (colon >= MIN_CLAUSE_TITLE) return text.slice(0, colon).trim();
    // 4) À défaut, la coupe au mot.
    return base;
  };

  const baseTitle = truncateTitle(title);
  const fullTitle = title === siteTitle || baseTitle.length + BRAND_SUFFIX.length > MAX_TITLE
    ? baseTitle
    : `${baseTitle}${BRAND_SUFFIX}`;

  // Normaliser l'URL pour éviter les différences canonical/og:url
  const normalizeUrl = (rawUrl: string): string => {
    try {
      const urlObj = new URL(rawUrl);
      // Supprimer trailing slash sauf pour la racine
      const pathname = urlObj.pathname === '/' ? '/' : urlObj.pathname.replace(/\/$/, '');
      // Supprimer query params et fragments
      return `${urlObj.protocol}//${urlObj.host}${pathname}`;
    } catch {
      return rawUrl;
    }
  };

  const currentUrl = normalizeUrl(url || window.location.href);

  // Garantir une longueur minimale de description (120-160 caractères)
  const ensureDescriptionLength = (desc: string): string => {
    const minLength = 120;
    const maxLength = 160;

    if (desc.length >= minLength && desc.length <= maxLength) {
      return desc;
    }

    if (desc.length < minLength) {
      // Description trop courte : ajouter un suffix générique
      const suffix = " Découvrez nos techniques d'hypnose ericksonienne à Paris pour améliorer votre bien-être.";
      const needed = minLength - desc.length;
      if (needed > suffix.length) {
        return desc + suffix;
      }
      return desc + suffix.substring(0, needed);
    }

    // Description trop longue : tronquer
    if (desc.length > maxLength) {
      return desc.substring(0, maxLength - 3) + '...';
    }

    return desc;
  };

  const finalDescription = ensureDescriptionLength(description);

  return (
    <Helmet>
      {/* Titre et description de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Robots */}
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />

      {/* Mots-clés */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Auteur */}
      {author && <meta name="author" content={author} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="NovaHypnose" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />

      {/* Article spécifique */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Données structurées : fusionnées en un seul @graph pour que les
          références croisées entre schémas (@id vers #person, #localbusiness,
          etc.) se résolvent dans le même document JSON-LD. Des scripts
          séparés cassent ces références aux yeux des validateurs schema.org. */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: safeJSONStringify({
              "@context": "https://schema.org",
              "@graph": structuredData.map((data) => {
                const { "@context": _omit, ...rest } = data as SchemaMarkup & { "@context"?: string };
                return rest;
              })
            })
          }} />
        ) : (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: safeJSONStringify(structuredData)
          }} />
        )
      )}
    </Helmet>
  );
};

export default SEOHead;
