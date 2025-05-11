
import { useEffect } from 'react';

/**
 * Custom hook to set up SEO metadata and structured data
 */
export function useSeoMetadata() {
  useEffect(() => {
    document.title = 'NovaHypnose | Hypnothérapie à Paris - Alain Zenatti, Maître en Hypnose Ericksonienne';
    
    // Update meta description with optimal length for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Hypnothérapie à Paris avec Alain Zenatti, spécialiste en hypnose ericksonienne. Séances personnalisées pour stress, sommeil, confiance. Cabinet proche Bastille.");
    }

    // Add meta keywords for better SEO
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'hypnothérapeute Paris, hypnose ericksonienne, Alain Zenatti, séance hypnose, cabinet hypnothérapie, stress, sommeil, confiance en soi, phobies, Hypno-Balade, forêt de Senonches');

    // Add favicon (avoiding modification of the read-only favicon.ico)
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
      existingFavicon.setAttribute('href', '/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png');
      existingFavicon.setAttribute('type', 'image/png');
    } else {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = '/lovable-uploads/ec67dc75-c109-4d24-aa14-90092a4d4e2e.png';
      newFavicon.type = 'image/png';
      document.head.appendChild(newFavicon);
    }

    // Add the schema.org structured data for local business
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://novahypnose.fr/#organization",
      "name": "NovaHypnose - Alain Zenatti",
      "image": "https://novahypnose.fr/wp-content/uploads/2023/12/alain-zenatti-lexperience-dun-hypnotherapeute-parisien.webp",
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
    });
    
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }
    document.head.appendChild(script);
    
    // Clean up
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, []);
}
