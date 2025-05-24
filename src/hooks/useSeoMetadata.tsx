
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  ogUrl?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
};

const DEFAULT_TITLE = 'NovaHypnose | Hypnothérapie à Paris - Alain Zenatti, Maître en Hypnose Ericksonienne';
const DEFAULT_DESCRIPTION = 'Cherchez un hypnothérapeute à Paris ? Cabinet d\'hypnose pour traiter stress, sommeil, phobies. Consultation thérapie à Paris 4 Marais Bastille. Tél 06 49 35 80 89.';
const DEFAULT_KEYWORDS = 'hypnothérapeute Paris, hypnose ericksonienne, Alain Zenatti, séance hypnose, cabinet hypnothérapie, stress, sommeil, confiance en soi, phobies, Hypno-Balade, forêt de Senonches';
const DEFAULT_OG_IMAGE = '/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png';
const DEFAULT_OG_TYPE = 'website';
const BASE_URL = 'https://novahypnose.fr';

/**
 * Custom hook to set up SEO metadata and structured data
 */
export function useSeoMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = DEFAULT_OG_TYPE,
  ogUrl,
  canonicalUrl,
  structuredData,
}: SeoProps = {}) {
  const location = useLocation();
  
  // Generate the current URL for Open Graph and canonical tags
  const currentPath = location.pathname;
  const fullUrl = useMemo(() => `${BASE_URL}${currentPath}`, [currentPath]);
  const actualOgUrl = ogUrl || fullUrl;
  const actualCanonicalUrl = canonicalUrl || fullUrl;
  
  useEffect(() => {
    // Set page title with optimal length (60-70 characters)
    document.title = title;
    
    // Update or create meta description (150-160 characters)
    updateMetaTag('description', description);
    
    // Update or create meta keywords
    updateMetaTag('keywords', keywords);
    
    // Update Open Graph meta tags for social sharing
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`, 'property');
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:url', actualOgUrl, 'property');
    
    // Update Twitter meta tags
    updateMetaTag('twitter:card', 'summary_large_image', 'name');
    updateMetaTag('twitter:title', title, 'name');
    updateMetaTag('twitter:description', description, 'name');
    updateMetaTag('twitter:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`, 'name');
    
    // Update canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute('href', actualCanonicalUrl);
    
    // Add structured data for SEO
    if (structuredData) {
      addOrUpdateStructuredData(structuredData);
    } else {
      addOrUpdateStructuredData(getDefaultStructuredData());
    }
    
    // Cleanup function
    return () => {
      // Optional: Remove custom structured data when component unmounts
      // In practice, we usually just let the next page add its own
    };
  }, [
    title, 
    description, 
    keywords, 
    ogImage, 
    ogType, 
    actualOgUrl, 
    actualCanonicalUrl, 
    structuredData
  ]);
}

// Helper function to update or create meta tags
function updateMetaTag(name: string, content: string, attributeType: 'name' | 'property' = 'name') {
  if (!content) return;
  
  let metaTag = document.querySelector(`meta[${attributeType}="${name}"]`);
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeType, name);
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', content);
}

// Helper function to add or update structured data
function addOrUpdateStructuredData(data: Record<string, any>) {
  // Remove existing script if present
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    document.head.removeChild(existingScript);
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Default structured data for the business
function getDefaultStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://novahypnose.fr/#organization",
    "name": "NovaHypnose - Alain Zenatti",
    "image": "https://novahypnose.fr/lovable-uploads/ac75f7ce-64fa-4285-9d09-3c372d3efde5.png",
    "description": "Cabinet d'hypnothérapie à Paris. Alain Zenatti, Maître Hypnologue vous accompagne pour retrouver confiance, équilibre et vitalité.",
    "url": "https://novahypnose.fr",
    "telephone": "+33649358089",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "16 rue St Antoine",
      "addressLocality": "Paris",
      "postalCode": "75004",
      "addressCountry": "FR",
      "addressRegion": "Île-de-France"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8533575,
      "longitude": 2.3644123
    },
    "priceRange": "€€",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/novahypnose/",
      "https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services d'hypnothérapie",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Séance d'Hypnose Individuelle",
            "description": "Séance d'hypnose ericksonienne en cabinet ou téléconsultation"
          },
          "price": "90",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pack 3 séances d'hypnose",
            "description": "Pack de 3 séances d'hypnothérapie valable 6 mois"
          },
          "price": "255",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hypno-Balade en Forêt de Senonches",
            "description": "Expérience d'hypnose en pleine nature pour une reconnexion profonde"
          },
          "price": "120",
          "priceCurrency": "EUR"
        }
      ]
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Claire M."
      },
      "reviewBody": "Accompagnement vraiment exceptionnel d'Alain pour ma phobie des transports en commun. En seulement 3 séances, j'ai pu recommencer à prendre le métro sereinement."
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "40",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}
