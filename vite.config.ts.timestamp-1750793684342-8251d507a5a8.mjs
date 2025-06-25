// vite.config.ts
import { defineConfig } from "file:///home/ittanez/nova-hypno-textes-fr/node_modules/vite/dist/node/index.js";
import react from "file:///home/ittanez/nova-hypno-textes-fr/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///home/ittanez/nova-hypno-textes-fr/node_modules/lovable-tagger/dist/index.js";

// vite-plugin-seo-headers.js
function viteSeoHeaders() {
  return {
    name: "vite-seo-headers",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (ctx.bundle) {
          const structuredData = [
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://novahypnose.fr/#localbusiness",
              "name": "NovaHypnose - Cabinet d'hypnoth\xE9rapie",
              "alternateName": "Alain Zenatti Hypnoth\xE9rapeute",
              "description": "Cabinet d'hypnoth\xE9rapie \xE0 Paris 4\xE8me sp\xE9cialis\xE9 en hypnose ericksonienne. Alain Zenatti, Ma\xEEtre Hypnologue certifi\xE9, vous accompagne pour stress, sommeil, confiance en soi.",
              "url": "https://novahypnose.fr",
              "telephone": "+33649358089",
              "email": "contact@novahypnose.fr",
              "priceRange": "\u20AC\u20AC",
              "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/zenatti.webp",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "16 rue St Antoine",
                "addressLocality": "Paris",
                "addressRegion": "\xCEle-de-France",
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
                "name": "Services d'hypnoth\xE9rapie",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "S\xE9ance d'hypnose individuelle",
                      "description": "Hypnoth\xE9rapie personnalis\xE9e pour stress, sommeil, confiance"
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
              "jobTitle": "Hypnoth\xE9rapeute certifi\xE9",
              "description": "Ma\xEEtre Hypnologue et Ma\xEEtre en Hypnose Ericksonienne \xE0 Paris",
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
          structuredData.forEach((data, index) => {
            html = html.replace(
              "</head>",
              `  <script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>
  </head>`
            );
          });
          console.log("\u2705 Plugin SEO: Donn\xE9es structur\xE9es inject\xE9es");
        }
        return html;
      }
    }
  };
}

// vite.config.ts
import analyze from "file:///home/ittanez/nova-hypno-textes-fr/node_modules/rollup-plugin-analyzer/index.js";
var __vite_injected_original_dirname = "/home/ittanez/nova-hypno-textes-fr";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  base: "/",
  plugins: [
    react(),
    viteSeoHeaders(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  build: {
    rollupOptions: {
      plugins: [
        analyze({
          summaryOnly: true,
          limit: 20
        })
      ]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS1wbHVnaW4tc2VvLWhlYWRlcnMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9pdHRhbmV6L25vdmEtaHlwbm8tdGV4dGVzLWZyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9pdHRhbmV6L25vdmEtaHlwbm8tdGV4dGVzLWZyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2l0dGFuZXovbm92YS1oeXBuby10ZXh0ZXMtZnIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IHZpdGVTZW9IZWFkZXJzIH0gZnJvbSBcIi4vdml0ZS1wbHVnaW4tc2VvLWhlYWRlcnMuanNcIjtcbmltcG9ydCBhbmFseXplIGZyb20gXCJyb2xsdXAtcGx1Z2luLWFuYWx5emVyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgYmFzZTogJy8nLFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB2aXRlU2VvSGVhZGVycygpLFxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiZcbiAgICBjb21wb25lbnRUYWdnZXIoKSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICBhbmFseXplKHtcbiAgICAgICAgICBzdW1tYXJ5T25seTogdHJ1ZSxcbiAgICAgICAgICBsaW1pdDogMjBcbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvaXR0YW5lei9ub3ZhLWh5cG5vLXRleHRlcy1mclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvaXR0YW5lei9ub3ZhLWh5cG5vLXRleHRlcy1mci92aXRlLXBsdWdpbi1zZW8taGVhZGVycy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9pdHRhbmV6L25vdmEtaHlwbm8tdGV4dGVzLWZyL3ZpdGUtcGx1Z2luLXNlby1oZWFkZXJzLmpzXCI7Ly8gUGx1Z2luIFZpdGUgcGVyc29ubmFsaXNcdTAwRTkgcG91ciBpbmplY3RlciBsZXMgdGl0cmVzIFNFT1xuZXhwb3J0IGZ1bmN0aW9uIHZpdGVTZW9IZWFkZXJzKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICd2aXRlLXNlby1oZWFkZXJzJyxcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgIG9yZGVyOiAncG9zdCcsXG4gICAgICBoYW5kbGVyKGh0bWwsIGN0eCkge1xuICAgICAgICAvLyBPbmx5IGFwcGx5IGluIHByb2R1Y3Rpb24gYnVpbGRzXG4gICAgICAgIGlmIChjdHguYnVuZGxlKSB7XG4gICAgICAgICAgLy8gQWRkIHN0cnVjdHVyZWQgZGF0YSBmb3IgYmV0dGVyIFNFT1xuICAgICAgICAgIGNvbnN0IHN0cnVjdHVyZWREYXRhID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIkBjb250ZXh0XCI6IFwiaHR0cHM6Ly9zY2hlbWEub3JnXCIsXG4gICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJMb2NhbEJ1c2luZXNzXCIsXG4gICAgICAgICAgICAgIFwiQGlkXCI6IFwiaHR0cHM6Ly9ub3ZhaHlwbm9zZS5mci8jbG9jYWxidXNpbmVzc1wiLFxuICAgICAgICAgICAgICBcIm5hbWVcIjogXCJOb3ZhSHlwbm9zZSAtIENhYmluZXQgZCdoeXBub3RoXHUwMEU5cmFwaWVcIixcbiAgICAgICAgICAgICAgXCJhbHRlcm5hdGVOYW1lXCI6IFwiQWxhaW4gWmVuYXR0aSBIeXBub3RoXHUwMEU5cmFwZXV0ZVwiLFxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQ2FiaW5ldCBkJ2h5cG5vdGhcdTAwRTlyYXBpZSBcdTAwRTAgUGFyaXMgNFx1MDBFOG1lIHNwXHUwMEU5Y2lhbGlzXHUwMEU5IGVuIGh5cG5vc2UgZXJpY2tzb25pZW5uZS4gQWxhaW4gWmVuYXR0aSwgTWFcdTAwRUV0cmUgSHlwbm9sb2d1ZSBjZXJ0aWZpXHUwMEU5LCB2b3VzIGFjY29tcGFnbmUgcG91ciBzdHJlc3MsIHNvbW1laWwsIGNvbmZpYW5jZSBlbiBzb2kuXCIsXG4gICAgICAgICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9ub3ZhaHlwbm9zZS5mclwiLFxuICAgICAgICAgICAgICBcInRlbGVwaG9uZVwiOiBcIiszMzY0OTM1ODA4OVwiLFxuICAgICAgICAgICAgICBcImVtYWlsXCI6IFwiY29udGFjdEBub3ZhaHlwbm9zZS5mclwiLFxuICAgICAgICAgICAgICBcInByaWNlUmFuZ2VcIjogXCJcdTIwQUNcdTIwQUNcIixcbiAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcImh0dHBzOi8vYWtybHl6bWZzenVtaWJ3Z29jYWUuc3VwYWJhc2UuY28vc3RvcmFnZS92MS9vYmplY3QvcHVibGljL2ltYWdlcy96ZW5hdHRpLndlYnBcIixcbiAgICAgICAgICAgICAgXCJhZGRyZXNzXCI6IHtcbiAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwiUG9zdGFsQWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgIFwic3RyZWV0QWRkcmVzc1wiOiBcIjE2IHJ1ZSBTdCBBbnRvaW5lXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzTG9jYWxpdHlcIjogXCJQYXJpc1wiLFxuICAgICAgICAgICAgICAgIFwiYWRkcmVzc1JlZ2lvblwiOiBcIlx1MDBDRWxlLWRlLUZyYW5jZVwiLFxuICAgICAgICAgICAgICAgIFwicG9zdGFsQ29kZVwiOiBcIjc1MDA0XCIsXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzQ291bnRyeVwiOiBcIkZSXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJnZW9cIjoge1xuICAgICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJHZW9Db29yZGluYXRlc1wiLFxuICAgICAgICAgICAgICAgIFwibGF0aXR1ZGVcIjogNDguODUzMzU3NSxcbiAgICAgICAgICAgICAgICBcImxvbmdpdHVkZVwiOiAyLjM2NDQxMjNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJhcmVhU2VydmVkXCI6IHtcbiAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwiQ2l0eVwiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlBhcmlzXCIsXG4gICAgICAgICAgICAgICAgXCJzYW1lQXNcIjogXCJodHRwczovL2ZyLndpa2lwZWRpYS5vcmcvd2lraS9QYXJpc1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwib3BlbmluZ0hvdXJzU3BlY2lmaWNhdGlvblwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIk9wZW5pbmdIb3Vyc1NwZWNpZmljYXRpb25cIixcbiAgICAgICAgICAgICAgICAgIFwiZGF5T2ZXZWVrXCI6IFtcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiXSxcbiAgICAgICAgICAgICAgICAgIFwib3BlbnNcIjogXCIwOTowMFwiLFxuICAgICAgICAgICAgICAgICAgXCJjbG9zZXNcIjogXCIxOTowMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcImFnZ3JlZ2F0ZVJhdGluZ1wiOiB7XG4gICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIkFnZ3JlZ2F0ZVJhdGluZ1wiLFxuICAgICAgICAgICAgICAgIFwicmF0aW5nVmFsdWVcIjogXCI1LjBcIixcbiAgICAgICAgICAgICAgICBcInJhdGluZ0NvdW50XCI6IFwiNDVcIixcbiAgICAgICAgICAgICAgICBcImJlc3RSYXRpbmdcIjogXCI1XCIsXG4gICAgICAgICAgICAgICAgXCJ3b3JzdFJhdGluZ1wiOiBcIjFcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImhhc09mZmVyQ2F0YWxvZ1wiOiB7XG4gICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIk9mZmVyQ2F0YWxvZ1wiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlNlcnZpY2VzIGQnaHlwbm90aFx1MDBFOXJhcGllXCIsXG4gICAgICAgICAgICAgICAgXCJpdGVtTGlzdEVsZW1lbnRcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwiT2ZmZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtT2ZmZXJlZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIlNlcnZpY2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJTXHUwMEU5YW5jZSBkJ2h5cG5vc2UgaW5kaXZpZHVlbGxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkh5cG5vdGhcdTAwRTlyYXBpZSBwZXJzb25uYWxpc1x1MDBFOWUgcG91ciBzdHJlc3MsIHNvbW1laWwsIGNvbmZpYW5jZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJPZmZlclwiLCBcbiAgICAgICAgICAgICAgICAgICAgXCJpdGVtT2ZmZXJlZFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIlNlcnZpY2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJGb3JtYXRpb24gYXV0by1oeXBub3NlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkFwcHJlbnRpc3NhZ2UgZGVzIHRlY2huaXF1ZXMgZCdhdXRvLWh5cG5vc2VcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcIkBjb250ZXh0XCI6IFwiaHR0cHM6Ly9zY2hlbWEub3JnXCIsXG4gICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJQZXJzb25cIixcbiAgICAgICAgICAgICAgXCJAaWRcIjogXCJodHRwczovL25vdmFoeXBub3NlLmZyLyNwZXJzb25cIixcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiQWxhaW4gWmVuYXR0aVwiLFxuICAgICAgICAgICAgICBcImpvYlRpdGxlXCI6IFwiSHlwbm90aFx1MDBFOXJhcGV1dGUgY2VydGlmaVx1MDBFOVwiLFxuICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiTWFcdTAwRUV0cmUgSHlwbm9sb2d1ZSBldCBNYVx1MDBFRXRyZSBlbiBIeXBub3NlIEVyaWNrc29uaWVubmUgXHUwMEUwIFBhcmlzXCIsXG4gICAgICAgICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9ub3ZhaHlwbm9zZS5mclwiLFxuICAgICAgICAgICAgICBcInRlbGVwaG9uZVwiOiBcIiszMzY0OTM1ODA4OVwiLFxuICAgICAgICAgICAgICBcImVtYWlsXCI6IFwiY29udGFjdEBub3ZhaHlwbm9zZS5mclwiLFxuICAgICAgICAgICAgICBcImltYWdlXCI6IFwiaHR0cHM6Ly9ha3JseXptZnN6dW1pYndnb2NhZS5zdXBhYmFzZS5jby9zdG9yYWdlL3YxL29iamVjdC9wdWJsaWMvaW1hZ2VzL3plbmF0dGkud2VicFwiLFxuICAgICAgICAgICAgICBcIndvcmtzRm9yXCI6IHtcbiAgICAgICAgICAgICAgICBcIkBpZFwiOiBcImh0dHBzOi8vbm92YWh5cG5vc2UuZnIvI2xvY2FsYnVzaW5lc3NcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJQb3N0YWxBZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzTG9jYWxpdHlcIjogXCJQYXJpc1wiLFxuICAgICAgICAgICAgICAgIFwicG9zdGFsQ29kZVwiOiBcIjc1MDA0XCIsXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzQ291bnRyeVwiOiBcIkZSXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF07XG5cbiAgICAgICAgICAvLyBJbmplY3Qgc3RydWN0dXJlZCBkYXRhIGJlZm9yZSBjbG9zaW5nIGhlYWQgdGFnXG4gICAgICAgICAgc3RydWN0dXJlZERhdGEuZm9yRWFjaCgoZGF0YSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoXG4gICAgICAgICAgICAgICc8L2hlYWQ+JyxcbiAgICAgICAgICAgICAgYCAgPHNjcmlwdCB0eXBlPVwiYXBwbGljYXRpb24vbGQranNvblwiPiR7SlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMil9PC9zY3JpcHQ+XFxuICA8L2hlYWQ+YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdcdTI3MDUgUGx1Z2luIFNFTzogRG9ublx1MDBFOWVzIHN0cnVjdHVyXHUwMEU5ZXMgaW5qZWN0XHUwMEU5ZXMnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICB9XG4gICAgfVxuICB9O1xufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1IsU0FBUyxvQkFBb0I7QUFDclQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1Qjs7O0FDRnpCLFNBQVMsaUJBQWlCO0FBQy9CLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLG9CQUFvQjtBQUFBLE1BQ2xCLE9BQU87QUFBQSxNQUNQLFFBQVEsTUFBTSxLQUFLO0FBRWpCLFlBQUksSUFBSSxRQUFRO0FBRWQsZ0JBQU0saUJBQWlCO0FBQUEsWUFDckI7QUFBQSxjQUNFLFlBQVk7QUFBQSxjQUNaLFNBQVM7QUFBQSxjQUNULE9BQU87QUFBQSxjQUNQLFFBQVE7QUFBQSxjQUNSLGlCQUFpQjtBQUFBLGNBQ2pCLGVBQWU7QUFBQSxjQUNmLE9BQU87QUFBQSxjQUNQLGFBQWE7QUFBQSxjQUNiLFNBQVM7QUFBQSxjQUNULGNBQWM7QUFBQSxjQUNkLFNBQVM7QUFBQSxjQUNULFdBQVc7QUFBQSxnQkFDVCxTQUFTO0FBQUEsZ0JBQ1QsaUJBQWlCO0FBQUEsZ0JBQ2pCLG1CQUFtQjtBQUFBLGdCQUNuQixpQkFBaUI7QUFBQSxnQkFDakIsY0FBYztBQUFBLGdCQUNkLGtCQUFrQjtBQUFBLGNBQ3BCO0FBQUEsY0FDQSxPQUFPO0FBQUEsZ0JBQ0wsU0FBUztBQUFBLGdCQUNULFlBQVk7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
