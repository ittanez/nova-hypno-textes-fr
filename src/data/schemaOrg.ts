/**
 * Structured Data (Schema.org) pour le SEO
 * Extrait de src/pages/Index.tsx pour améliorer la maintenabilité
 */

import { faqItems } from './faqData';

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MedicalBusiness", "HealthAndBeautyBusiness"],
  "@id": "https://novahypnose.fr/#localbusiness",
  "name": "NovaHypnose - Hypnothérapeute Paris",
  "alternateName": "Alain Zenatti Hypnothérapeute Paris 4",
  "url": "https://novahypnose.fr",
  "telephone": "+33649358089",
  "email": "contact@novahypnose.fr",
  "servesCuisine": null,
  "hasMap": "https://www.google.com/maps/place/16+Rue+Saint-Antoine,+75004+Paris",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "16 rue Saint-Antoine",
    "addressLocality": "Paris",
    "addressRegion": "Île-de-France",
    "postalCode": "75004",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.8534",
    "longitude": "2.3656"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "11:00",
      "closes": "20:00"
    }
  ],
  "priceRange": "€€",
  "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp",
  "description": "Hypnothérapeute Paris 4ème - Cabinet d'hypnothérapie ericksonienne. Spécialiste stress, sommeil, phobies, confiance en soi. Maître Hypnologue certifié Alain Zenatti.",
  "areaServed": [
    {
      "@type": "City",
      "name": "Paris"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Île-de-France"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services d'hypnothérapie",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Séance d'hypnose individuelle",
          "description": "Hypnothérapie ericksonienne personnalisée pour stress, anxiété, phobies, sommeil"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "12"
  }
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://novahypnose.fr/#person",
  "name": "Alain Zenatti",
  "jobTitle": "Maître Hypnologue",
  "description": "Hypnothérapeute certifié spécialisé en hypnose ericksonienne à Paris",
  "url": "https://novahypnose.fr",
  "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp",
  "sameAs": [
    "https://www.instagram.com/novahypnose/",
    "https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
  ],
  "telephone": "+33649358089",
  "email": "contact@novahypnose.fr",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "16 rue Saint-Antoine",
    "addressLocality": "Paris",
    "postalCode": "75004",
    "addressCountry": "FR"
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer
    }
  }))
};
