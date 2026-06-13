/**
 * Structured Data (Schema.org) pour le SEO
 * Optimisé pour Google, AI Search (ChatGPT, Perplexity, Gemini) et Local Pack
 */

import { faqItems } from './faqData';

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": "https://novahypnose.fr/#localbusiness",
  "name": "NovaHypnose - Hypnothérapeute Paris",
  "alternateName": "Alain Zenatti Hypnothérapeute Paris 4",
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
    "latitude": 48.85358,
    "longitude": 2.36642
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
  "identifier": [
    { "@type": "PropertyValue", "propertyID": "SIRET", "value": "89489890700015" }
  ],
  "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp",
  "logo": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp",
  "description": "Cabinet d'hypnothérapie ericksonienne à Paris 4ème, quartier Marais-Bastille, et téléconsultations visio partout en France. Alain Zenatti, Maître Hypnologue certifié, spécialiste du stress, de l'anxiété, des phobies, du sommeil et de la confiance en soi. Résultats en 3 à 5 séances.",
  "slogan": "Transformez votre vie par l'hypnose",
  "founder": {
    "@type": "Person",
    "name": "Alain Zenatti",
    "@id": "https://novahypnose.fr/#person"
  },
  "knowsAbout": [
    "Hypnose ericksonienne",
    "Hypnothérapie",
    "Hypnose en ligne",
    "Téléconsultation hypnose",
    "Hypnose à distance",
    "Hypnose par visioconférence",
    "Téléconsultation thérapeutique",
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
      "@type": "Country",
      "name": "France",
      "@id": "https://www.wikidata.org/wiki/Q142"
    },
    {
      "@type": "City",
      "name": "Paris",
      "@id": "https://www.wikidata.org/wiki/Q90"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Île-de-France"
    },
    { "@type": "City", "name": "Paris 1er arrondissement" },
    { "@type": "City", "name": "Paris 2e arrondissement" },
    { "@type": "City", "name": "Paris 3e arrondissement" },
    { "@type": "City", "name": "Paris 4e arrondissement" },
    { "@type": "City", "name": "Paris 5e arrondissement" },
    { "@type": "City", "name": "Paris 6e arrondissement" },
    { "@type": "City", "name": "Paris 7e arrondissement" },
    { "@type": "City", "name": "Paris 8e arrondissement" },
    { "@type": "City", "name": "Paris 9e arrondissement" },
    { "@type": "City", "name": "Paris 10e arrondissement" },
    { "@type": "City", "name": "Paris 11e arrondissement" },
    { "@type": "City", "name": "Paris 12e arrondissement" },
    { "@type": "City", "name": "Paris 13e arrondissement" },
    { "@type": "City", "name": "Paris 14e arrondissement" },
    { "@type": "City", "name": "Paris 15e arrondissement" },
    { "@type": "City", "name": "Paris 16e arrondissement" },
    { "@type": "City", "name": "Paris 17e arrondissement" },
    { "@type": "City", "name": "Paris 18e arrondissement" },
    { "@type": "City", "name": "Paris 19e arrondissement" },
    { "@type": "City", "name": "Paris 20e arrondissement" },
    { "@type": "Place", "name": "Marais" },
    { "@type": "Place", "name": "Bastille" },
    { "@type": "Place", "name": "Le Marais-Bastille" },
    { "@type": "City", "name": "Lyon" },
    { "@type": "City", "name": "Marseille" },
    { "@type": "City", "name": "Bordeaux" },
    { "@type": "City", "name": "Toulouse" },
    { "@type": "City", "name": "Nice" },
    { "@type": "City", "name": "Strasbourg" },
    { "@type": "City", "name": "Nantes" },
    { "@type": "City", "name": "Montpellier" },
    { "@type": "City", "name": "Lille" },
    { "@type": "City", "name": "Rennes" },
    { "@type": "City", "name": "Grenoble" }
  ],
  "sameAs": [
    "https://www.instagram.com/novahypnose/",
    "https://www.linkedin.com/in/alain-zenatti/",
    "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
    "https://www.google.com/maps/place/16+Rue+Saint-Antoine,+75004+Paris"
  ],
  "employee": { "@id": "https://novahypnose.fr/#person" },
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
          "name": "Téléconsultation d'hypnose en visio",
          "description": "Séance d'hypnose en visioconférence partout en France, aussi efficace qu'en cabinet. Plateforme Google Meet.",
          "serviceType": "Hypnothérapie en ligne",
          "areaServed": { "@type": "Country", "name": "France" },
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
            "name": "Visioconférence (Google Meet)"
          },
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
    "@id": "https://novahypnose.fr/#aggregateRating",
    "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
    "ratingValue": 5,
    "bestRating": 5,
    "worstRating": 1,
    "reviewCount": 23
  },
  "review": [
    {
      "@type": "Review",
      "@id": "https://novahypnose.fr/#review-1",
      "author": { "@type": "Person", "name": "Edward Achour" },
      "datePublished": "2026-05-20",
      "reviewRating": { "@type": "Rating", "@id": "https://novahypnose.fr/#rating-1", "ratingValue": "5", "bestRating": "5" },
      "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
      "reviewBody": "Découvrir le travail d'Alain Zenatti est une expérience marquante. Alain propose bien plus que des séances - de véritables parcours de transformation conçus pour libérer l'esprit, dépasser les freins invisibles et renouer avec une forme de clarté personnelle."
    },
    {
      "@type": "Review",
      "@id": "https://novahypnose.fr/#review-2",
      "author": { "@type": "Person", "name": "Marie Hernandez" },
      "datePublished": "2026-04-08",
      "reviewRating": { "@type": "Rating", "@id": "https://novahypnose.fr/#rating-2", "ratingValue": "5", "bestRating": "5" },
      "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
      "reviewBody": "J'ai consulté pour un problème d'anxiété, dès la première séance je me suis sentie apaisée et sereine. Alain est à l'écoute et mon anxiété a totalement disparu en 3 séances. Je recommande vivement."
    },
    {
      "@type": "Review",
      "@id": "https://novahypnose.fr/#review-3",
      "author": { "@type": "Person", "name": "Philippe Audoin" },
      "datePublished": "2026-04-15",
      "reviewRating": { "@type": "Rating", "@id": "https://novahypnose.fr/#rating-3", "ratingValue": "5", "bestRating": "5" },
      "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
      "reviewBody": "Mr Zenatti est un praticien calme et réfléchi. Son écoute attentive lui a permis de déterminer les axes de travail, les points d'amélioration, les émotions limitantes. En quelques séances, j'ai pu me libérer de certains blocages."
    },
    {
      "@type": "Review",
      "@id": "https://novahypnose.fr/#review-4",
      "author": { "@type": "Person", "name": "Isabelle Marechal" },
      "datePublished": "2025-12-23",
      "reviewRating": { "@type": "Rating", "@id": "https://novahypnose.fr/#rating-4", "ratingValue": "5", "bestRating": "5" },
      "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
      "reviewBody": "Alain m'a aidée à retrouver un sommeil réparateur en 2 séances. Je vous le recommande."
    },
    {
      "@type": "Review",
      "@id": "https://novahypnose.fr/#review-5",
      "author": { "@type": "Person", "name": "Regis Gonzalez" },
      "datePublished": "2025-12-23",
      "reviewRating": { "@type": "Rating", "@id": "https://novahypnose.fr/#rating-5", "ratingValue": "5", "bestRating": "5" },
      "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
      "reviewBody": "Première séance d'hypnose de ma vie qui a permis de solutionner un problème que j'avais depuis de nombreuses années. Un grand merci et bravo."
    },
    {
      "@type": "Review",
      "@id": "https://novahypnose.fr/#review-6",
      "author": { "@type": "Person", "name": "Karine Bogda" },
      "datePublished": "2023-03-30",
      "reviewRating": { "@type": "Rating", "@id": "https://novahypnose.fr/#rating-6", "ratingValue": "5", "bestRating": "5" },
      "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
      "reviewBody": "Grâce à Alain j'ai pris le dessus sur ma phobie, je recommande à 100%. Dès le premier contact téléphonique il a su être à mon écoute, et toutes les séances ont été bienveillantes, mes bulles de bien-être."
    },
    {
      "@type": "Review",
      "@id": "https://novahypnose.fr/#review-7",
      "author": { "@type": "Person", "name": "Arthur Perez" },
      "datePublished": "2022-08-17",
      "reviewRating": { "@type": "Rating", "@id": "https://novahypnose.fr/#rating-7", "ratingValue": "5", "bestRating": "5" },
      "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
      "reviewBody": "Phobique de l'avion, monsieur Zenatti a su m'aider avant un voyage important. Merci encore pour ce que vous avez fait !"
    },
    {
      "@type": "Review",
      "@id": "https://novahypnose.fr/#review-8",
      "author": { "@type": "Person", "name": "Anne Lhande" },
      "datePublished": "2022-07-05",
      "reviewRating": { "@type": "Rating", "@id": "https://novahypnose.fr/#rating-8", "ratingValue": "5", "bestRating": "5" },
      "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
      "reviewBody": "Je recommande Alain Zenatti chaleureusement pour sa grande qualité d'écoute et sa justesse d'analyse. Arrivée avec un plexus solaire totalement noué et douloureux, Alain a réussi via ses techniques d'hypnose à adoucir ma douleur et à la transformer."
    },
    {
      "@type": "Review",
      "@id": "https://novahypnose.fr/#review-9",
      "author": { "@type": "Person", "name": "Safia Amor" },
      "datePublished": "2025-11-25",
      "reviewRating": { "@type": "Rating", "@id": "https://novahypnose.fr/#rating-9", "ratingValue": "5", "bestRating": "5" },
      "itemReviewed": { "@id": "https://novahypnose.fr/#localbusiness" },
      "reviewBody": "J'ai apprécié la patience, la douceur, l'écoute et le professionnalisme d'Alain Zenatti. Il m'a aidée au-delà de mes espérances alors que j'étais sceptique vis-à-vis de l'hypnose. Grâce à lui, j'ai repris confiance en moi."
    }
  ]
};

/**
 * Service dédié à la consultation en visioconférence, disponible partout en France.
 * Complète le référencement local (cabinet Paris 4ème) par un signal national pour
 * Google et les moteurs de réponse IA (areaServed + serviceArea = France).
 */
export const visioServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://novahypnose.fr/#service-visio",
  "name": "Hypnose en visioconférence partout en France",
  "description": "Consultations d'hypnose ericksonienne en visio (téléconsultation), accessibles partout en France. Stress, anxiété, phobies, sommeil, confiance en soi. Aussi efficaces qu'au cabinet, sans aucun déplacement.",
  "url": "https://novahypnose.fr/hypnose-en-ligne",
  "serviceType": "Hypnothérapie en ligne",
  "provider": { "@id": "https://novahypnose.fr/#person" },
  "areaServed": { "@type": "Country", "name": "France" },
  "serviceArea": { "@type": "Country", "name": "France" },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
    "name": "Téléconsultation par visioconférence (Google Meet)",
    "availableLanguage": { "@type": "Language", "name": "French" }
  },
  "offers": {
    "@type": "Offer",
    "price": "90",
    "priceCurrency": "EUR"
  }
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://novahypnose.fr/#person",
  "name": "Alain Zenatti",
  "jobTitle": "Maître Hypnologue",
  "description": "Hypnothérapeute certifié à Paris 4ème et spécialiste de l'hypnose en ligne (téléconsultation visio). Maître Hypnologue avec plus de 5 ans d'expérience et 9 certifications professionnelles. Cabinet Marais-Bastille et consultations visio partout en France.",
  "url": "https://novahypnose.fr",
  "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp",
  "sameAs": [
    "https://www.instagram.com/novahypnose/",
    "https://www.linkedin.com/in/alain-zenatti/",
    "https://www.resalib.fr/agenda/47325?src=novahypnose.fr"
  ],
  "knowsAbout": [
    "Hypnose ericksonienne",
    "Hypnose directive",
    "Hypnose spirituelle",
    "Auto-hypnose",
    "PNL",
    "Hypnose en ligne",
    "Téléconsultation hypnose",
    "Hypnose à distance par visioconférence",
    "Gestion du stress par l'hypnose",
    "Traitement des phobies par l'hypnose",
    "Anxiété généralisée et troubles anxieux",
    "Troubles du sommeil et insomnie",
    "Confiance en soi et syndrome de l'imposteur",
    "Régulation émotionnelle",
    "Burn-out et gestion de carrière",
    "Procrastination et blocages inconscients",
    "Neurosciences du changement comportemental"
  ],
  "workLocation": { "@id": "https://novahypnose.fr/#localbusiness" },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "École Psynapse",
    "url": "https://psynapse.fr/"
  },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certification",
      "name": "Maître Hypnologue",
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": "École Psynapse",
        "url": "https://psynapse.fr/"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Certification",
      "name": "Maître Praticien Hypnose Ericksonienne",
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": "École Psynapse",
        "url": "https://psynapse.fr/"
      }
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
      "recognizedBy": {
        "@type": "EducationalOrganization",
        "name": "École Psynapse",
        "url": "https://psynapse.fr/"
      }
    }
  ],
  "telephone": "+33649358089",
  "email": "contact@novahypnose.fr",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+33649358089",
    "email": "contact@novahypnose.fr",
    "contactType": "customer service",
    "areaServed": "FR",
    "availableLanguage": "French"
  },
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

/**
 * Breadcrumb helper. Pass an ordered list of { name, url } items from the
 * site root down to the current page (the homepage entry is added automatically).
 *
 *   createBreadcrumbSchema([
 *     { name: "Blog", url: "https://novahypnose.fr/blog" },
 *     { name: "Hypnose et stress", url: "https://novahypnose.fr/blog/hypnose-stress" },
 *   ])
 */
export const createBreadcrumbSchema = (
  trail: Array<{ name: string; url: string }> = []
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Accueil",
      "item": "https://novahypnose.fr"
    },
    ...trail.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 2,
      "name": item.name,
      "item": item.url
    }))
  ]
});

// Default homepage breadcrumb (kept for back-compat with Index.tsx).
export const breadcrumbSchema = createBreadcrumbSchema();

/**
 * WebSite schema — déclare l'entité site, l'éditeur, et la search action
 * que les moteurs (Google, Bing) peuvent exposer en sitelinks searchbox.
 * Référencé par les autres schémas via @id.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://novahypnose.fr/#website",
  "url": "https://novahypnose.fr",
  "name": "NovaHypnose",
  "alternateName": "Alain Zenatti Hypnothérapeute Paris",
  "description": "Cabinet d'hypnothérapie ericksonienne à Paris 4ème. Alain Zenatti, Maître Hypnologue certifié. Stress, anxiété, phobies, troubles du sommeil, confiance en soi. Séances au cabinet (Marais-Bastille) et en visio partout en France.",
  "keywords": "hypnothérapeute paris, hypnose ericksonienne paris, cabinet hypnose paris 4, hypnose en ligne, stress anxiété hypnose, troubles sommeil hypnose, phobies hypnose paris",
  "inLanguage": "fr-FR",
  "author": { "@id": "https://novahypnose.fr/#person" },
  "publisher": { "@id": "https://novahypnose.fr/#localbusiness" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://novahypnose.fr/blog?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};
