/**
 * Structured Data (Schema.org) pour le SEO
 * Optimisé pour Google, AI Search (ChatGPT, Perplexity, Gemini) et Local Pack
 */

import { faqItems } from './faqData';

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MedicalBusiness", "HealthAndBeautyBusiness"],
  "@id": "https://novahypnose.fr/#localbusiness",
  "name": "NovaHypnose - Hypnothérapeute Paris",
  "alternateName": "Alain Zenatti Hypnothérapeute Paris 4",
  "additionalType": "https://en.wikipedia.org/wiki/Hypnotherapy",
  "url": "https://novahypnose.fr",
  "telephone": "+33649358089",
  "email": "contact@novahypnose.fr",
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
  "logo": "https://novahypnose.fr/favicon.ico",
  "description": "Cabinet d'hypnothérapie ericksonienne à Paris 4ème, quartier Marais-Bastille. Alain Zenatti, Maître Hypnologue certifié, spécialiste du stress, de l'anxiété, des phobies, du sommeil et de la confiance en soi. Résultats en 3 à 5 séances.",
  "slogan": "Transformez votre vie par l'hypnose",
  "knowsAbout": [
    "Hypnose ericksonienne",
    "Hypnothérapie",
    "Gestion du stress",
    "Traitement de l'anxiété",
    "Traitement des phobies",
    "Amélioration du sommeil",
    "Confiance en soi",
    "Arrêt du tabac",
    "Gestion du poids",
    "Auto-hypnose",
    "Peur de parler en public",
    "Procrastination"
  ],
  "areaServed": [
    {
      "@type": "City",
      "name": "Paris",
      "@id": "https://www.wikidata.org/wiki/Q90"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Île-de-France"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/novahypnose/",
    "https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris",
    "https://www.google.com/maps/place/16+Rue+Saint-Antoine,+75004+Paris"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services d'hypnothérapie à Paris",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Séance d'hypnose au cabinet Paris 4ème",
          "description": "Séance individuelle d'hypnose ericksonienne au cabinet Marais-Bastille pour stress, anxiété, phobies, sommeil, confiance en soi",
          "serviceType": "Hypnothérapie",
          "areaServed": { "@type": "City", "name": "Paris" },
          "provider": { "@id": "https://novahypnose.fr/#person" }
        },
        "price": "90",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Téléconsultation d'hypnose",
          "description": "Séance d'hypnose en visioconférence pour les personnes éloignées de Paris. Aussi efficace qu'en cabinet.",
          "serviceType": "Hypnothérapie en ligne",
          "areaServed": { "@type": "Country", "name": "France" },
          "provider": { "@id": "https://novahypnose.fr/#person" }
        },
        "price": "90",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Séance d'hypnose à domicile Paris",
          "description": "Séance d'hypnothérapie à domicile à Paris et proche banlieue pour les personnes à mobilité réduite ou préférant le confort de leur domicile",
          "serviceType": "Hypnothérapie à domicile",
          "areaServed": { "@type": "City", "name": "Paris" },
          "provider": { "@id": "https://novahypnose.fr/#person" }
        },
        "price": "140",
        "priceCurrency": "EUR"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "40"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Edward Achour" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Découvrir NovaHypnose et le travail d'Alain Zenatti est une expérience marquante. Alain propose bien plus que des séances - de véritables parcours de transformation conçus pour libérer l'esprit."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Marie Hernandez" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "J'ai consulté pour un problème d'anxiété, dès la première séance je me suis sentie apaisée et sereine. Mon anxiété a totalement disparu en 3 séances. Je recommande vivement."
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Philippe Audoin" },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "Un praticien calme et réfléchi. Son écoute attentive lui a permis de déterminer les axes de travail. En quelques séances, j'ai pu me libérer de certains blocages."
    }
  ]
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://novahypnose.fr/#person",
  "name": "Alain Zenatti",
  "jobTitle": "Maître Hypnologue",
  "description": "Hypnothérapeute certifié à Paris 4ème, spécialisé en hypnose ericksonienne. Maître Hypnologue avec plus de 5 ans d'expérience et 9 certifications professionnelles. Cabinet Marais-Bastille.",
  "url": "https://novahypnose.fr",
  "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp",
  "sameAs": [
    "https://www.instagram.com/novahypnose/",
    "https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
  ],
  "knowsAbout": [
    "Hypnose ericksonienne",
    "Hypnose directive",
    "Hypnose spirituelle",
    "Auto-hypnose",
    "PNL",
    "Gestion du stress par l'hypnose",
    "Traitement des phobies par l'hypnose"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certification",
      "name": "Maître Hypnologue",
      "recognizedBy": { "@type": "Organization", "name": "École Psynapse" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certification",
      "name": "Maître Praticien Hypnose Ericksonienne",
      "recognizedBy": { "@type": "Organization", "name": "École Psynapse" }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certification",
      "name": "Hypnose Directive et Hyperemperia"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certification",
      "name": "Hypnose Spirituelle",
      "recognizedBy": { "@type": "Organization", "name": "École Psynapse" }
    }
  ],
  "telephone": "+33649358089",
  "email": "contact@novahypnose.fr",
  "worksFor": { "@id": "https://novahypnose.fr/#localbusiness" },
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

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://novahypnose.fr"
    }
  ]
};
