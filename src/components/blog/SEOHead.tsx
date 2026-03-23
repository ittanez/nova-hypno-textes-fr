
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
  image = "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/emergences-hypnose.webp",
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  keywords = [],
  robots = "index, follow",
  structuredData,
  breadcrumbs = []
}: SEOHeadProps) => {
  const siteTitle = "Blog NovaHypnose";

  // Fonction pour tronquer le titre si trop long (max 60 caractères total)
  const truncateTitle = (title: string, maxLength: number = 45): string => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength).trim() + '...';
  };

  const fullTitle = title === siteTitle
    ? title
    : `${truncateTitle(title)} | ${siteTitle}`;

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
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteTitle} />

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
      
      {/* Données structurées */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{
              __html: safeJSONStringify(data)
            }} />
          ))
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
