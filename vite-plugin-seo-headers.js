// Plugin Vite personnalisé pour injecter les titres SEO
export function viteSeoHeaders() {
  return {
    name: 'vite-seo-headers',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // Only apply in production builds
        if (ctx.bundle) {
          // Optimisations critiques pour le LCP
          html = html.replace(
            '<!-- Préchargement des images critiques -->',
            '<!-- Préchargement des ressources critiques -->'
          );
          
          html = html.replace(
            '<link rel="preload" href="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp" as="image" fetchpriority="high">',
            `<link rel="preload" href="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp" as="image" fetchpriority="high">
    <link rel="preload" href="https://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2" as="font" type="font/woff2" crossorigin>`
          );
          
          // Optimiser Lucky Orange pour charger après interaction
          html = html.replace(
            /setTimeout\(function\(\)\{\s*const script=document\.createElement\('script'\);\s*script\.src='https:\/\/tools\.luckyorange\.com\/core\/lo\.js\?site-id=856f311d';\s*document\.head\.appendChild\(script\);\s*\},5000\);/,
            `let luckyOrangeLoaded = false;
      function loadLuckyOrange() {
        if (!luckyOrangeLoaded) {
          luckyOrangeLoaded = true;
          const script = document.createElement('script');
          script.src = 'https://tools.luckyorange.com/core/lo.js?site-id=856f311d';
          document.head.appendChild(script);
        }
      }
      // Charger après interaction ou 10s
      setTimeout(loadLuckyOrange, 10000);
      ['scroll', 'click', 'mousemove', 'keydown'].forEach(event => {
        document.addEventListener(event, loadLuckyOrange, { once: true, passive: true });
      });`
          );
          
          // Ajouter les polices critiques dans le CSS inline
          html = html.replace(
            'body{font-family:\'Poppins\',sans-serif;margin:0;padding:0;line-height:1.6}',
            `@font-face{font-family:'Poppins';font-style:normal;font-weight:400;src:url(https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2) format('woff2');font-display:swap}
      @font-face{font-family:'Playfair Display';font-style:normal;font-weight:700;src:url(https://fonts.gstatic.com/s/playfairdisplay/v36/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.woff2) format('woff2');font-display:swap}
      body{font-family:'Poppins',sans-serif;margin:0;padding:0;line-height:1.6}`
          );
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