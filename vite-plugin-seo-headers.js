// Plugin Vite personnalisé pour injecter les titres SEO
export function viteSeoHeaders() {
  return {
    name: 'vite-seo-headers',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // Only apply in production builds
        if (ctx.bundle) {
          // Add structured data for better SEO
          const structuredData = [
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://novahypnose.fr/#localbusiness",
              "name": "NovaHypnose - Cabinet d'hypnothérapie",
              "alternateName": "Alain Zenatti Hypnothérapeute",
              "description": "Cabinet d'hypnothérapie à Paris 4ème spécialisé en hypnose ericksonienne. Alain Zenatti, Maître Hypnologue certifié, vous accompagne pour stress, sommeil, confiance en soi.",
              "url": "https://novahypnose.fr",
              "telephone": "+33649358089",
              "email": "contact@novahypnose.fr",
              "priceRange": "€€",
              "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "16 rue St Antoine",
                "addressLocality": "Paris",
                "addressRegion": "Île-de-France",
                "postalCode": "75004",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 48.8533575,
                "longitude": 2.3644123
              },
              "areaServed": {
                "@type": "City",
                "name": "Paris",
                "sameAs": "https://fr.wikipedia.org/wiki/Paris"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "19:00"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "ratingCount": "45",
                "bestRating": "5",
                "worstRating": "1"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Services d'hypnothérapie",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Séance d'hypnose individuelle",
                      "description": "Hypnothérapie personnalisée pour stress, sommeil, confiance"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Formation auto-hypnose",
                      "description": "Apprentissage des techniques d'auto-hypnose"
                    }
                  }
                ]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://novahypnose.fr/#person",
              "name": "Alain Zenatti",
              "jobTitle": "Hypnothérapeute certifié",
              "description": "Maître Hypnologue et Maître en Hypnose Ericksonienne à Paris",
              "url": "https://novahypnose.fr",
              "telephone": "+33649358089",
              "email": "contact@novahypnose.fr",
              "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp",
              "worksFor": {
                "@id": "https://novahypnose.fr/#localbusiness"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Paris",
                "postalCode": "75004",
                "addressCountry": "FR"
              }
            }
          ];

          // Inject structured data before closing head tag
          structuredData.forEach((data, index) => {
            html = html.replace(
              '</head>',
              `  <script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>\n  </head>`
            );
          });

          console.log('✅ Plugin SEO: Données structurées injectées');
        }
        
        return html;
      }
    }
  };
}