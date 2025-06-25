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
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS1wbHVnaW4tc2VvLWhlYWRlcnMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9pdHRhbmV6L25vdmEtaHlwbm8tdGV4dGVzLWZyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9pdHRhbmV6L25vdmEtaHlwbm8tdGV4dGVzLWZyL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2l0dGFuZXovbm92YS1oeXBuby10ZXh0ZXMtZnIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCB7IHZpdGVTZW9IZWFkZXJzIH0gZnJvbSBcIi4vdml0ZS1wbHVnaW4tc2VvLWhlYWRlcnMuanNcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiOjpcIixcbiAgICBwb3J0OiA4MDgwLFxuICB9LFxuICBiYXNlOiAnLycsXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHZpdGVTZW9IZWFkZXJzKCksXG4gICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJlxuICAgIGNvbXBvbmVudFRhZ2dlcigpLFxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxufSkpO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9pdHRhbmV6L25vdmEtaHlwbm8tdGV4dGVzLWZyXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9pdHRhbmV6L25vdmEtaHlwbm8tdGV4dGVzLWZyL3ZpdGUtcGx1Z2luLXNlby1oZWFkZXJzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2l0dGFuZXovbm92YS1oeXBuby10ZXh0ZXMtZnIvdml0ZS1wbHVnaW4tc2VvLWhlYWRlcnMuanNcIjsvLyBQbHVnaW4gVml0ZSBwZXJzb25uYWxpc1x1MDBFOSBwb3VyIGluamVjdGVyIGxlcyB0aXRyZXMgU0VPXG5leHBvcnQgZnVuY3Rpb24gdml0ZVNlb0hlYWRlcnMoKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZpdGUtc2VvLWhlYWRlcnMnLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbDoge1xuICAgICAgb3JkZXI6ICdwb3N0JyxcbiAgICAgIGhhbmRsZXIoaHRtbCwgY3R4KSB7XG4gICAgICAgIC8vIE9ubHkgYXBwbHkgaW4gcHJvZHVjdGlvbiBidWlsZHNcbiAgICAgICAgaWYgKGN0eC5idW5kbGUpIHtcbiAgICAgICAgICAvLyBBZGQgc3RydWN0dXJlZCBkYXRhIGZvciBiZXR0ZXIgU0VPXG4gICAgICAgICAgY29uc3Qgc3RydWN0dXJlZERhdGEgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiQGNvbnRleHRcIjogXCJodHRwczovL3NjaGVtYS5vcmdcIixcbiAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIkxvY2FsQnVzaW5lc3NcIixcbiAgICAgICAgICAgICAgXCJAaWRcIjogXCJodHRwczovL25vdmFoeXBub3NlLmZyLyNsb2NhbGJ1c2luZXNzXCIsXG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcIk5vdmFIeXBub3NlIC0gQ2FiaW5ldCBkJ2h5cG5vdGhcdTAwRTlyYXBpZVwiLFxuICAgICAgICAgICAgICBcImFsdGVybmF0ZU5hbWVcIjogXCJBbGFpbiBaZW5hdHRpIEh5cG5vdGhcdTAwRTlyYXBldXRlXCIsXG4gICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJDYWJpbmV0IGQnaHlwbm90aFx1MDBFOXJhcGllIFx1MDBFMCBQYXJpcyA0XHUwMEU4bWUgc3BcdTAwRTljaWFsaXNcdTAwRTkgZW4gaHlwbm9zZSBlcmlja3Nvbmllbm5lLiBBbGFpbiBaZW5hdHRpLCBNYVx1MDBFRXRyZSBIeXBub2xvZ3VlIGNlcnRpZmlcdTAwRTksIHZvdXMgYWNjb21wYWduZSBwb3VyIHN0cmVzcywgc29tbWVpbCwgY29uZmlhbmNlIGVuIHNvaS5cIixcbiAgICAgICAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL25vdmFoeXBub3NlLmZyXCIsXG4gICAgICAgICAgICAgIFwidGVsZXBob25lXCI6IFwiKzMzNjQ5MzU4MDg5XCIsXG4gICAgICAgICAgICAgIFwiZW1haWxcIjogXCJjb250YWN0QG5vdmFoeXBub3NlLmZyXCIsXG4gICAgICAgICAgICAgIFwicHJpY2VSYW5nZVwiOiBcIlx1MjBBQ1x1MjBBQ1wiLFxuICAgICAgICAgICAgICBcImltYWdlXCI6IFwiaHR0cHM6Ly9ha3JseXptZnN6dW1pYndnb2NhZS5zdXBhYmFzZS5jby9zdG9yYWdlL3YxL29iamVjdC9wdWJsaWMvaW1hZ2VzL3plbmF0dGkud2VicFwiLFxuICAgICAgICAgICAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJQb3N0YWxBZGRyZXNzXCIsXG4gICAgICAgICAgICAgICAgXCJzdHJlZXRBZGRyZXNzXCI6IFwiMTYgcnVlIFN0IEFudG9pbmVcIixcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NMb2NhbGl0eVwiOiBcIlBhcmlzXCIsXG4gICAgICAgICAgICAgICAgXCJhZGRyZXNzUmVnaW9uXCI6IFwiXHUwMENFbGUtZGUtRnJhbmNlXCIsXG4gICAgICAgICAgICAgICAgXCJwb3N0YWxDb2RlXCI6IFwiNzUwMDRcIixcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NDb3VudHJ5XCI6IFwiRlJcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImdlb1wiOiB7XG4gICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIkdlb0Nvb3JkaW5hdGVzXCIsXG4gICAgICAgICAgICAgICAgXCJsYXRpdHVkZVwiOiA0OC44NTMzNTc1LFxuICAgICAgICAgICAgICAgIFwibG9uZ2l0dWRlXCI6IDIuMzY0NDEyM1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcImFyZWFTZXJ2ZWRcIjoge1xuICAgICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJDaXR5XCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiUGFyaXNcIixcbiAgICAgICAgICAgICAgICBcInNhbWVBc1wiOiBcImh0dHBzOi8vZnIud2lraXBlZGlhLm9yZy93aWtpL1BhcmlzXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJvcGVuaW5nSG91cnNTcGVjaWZpY2F0aW9uXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwiT3BlbmluZ0hvdXJzU3BlY2lmaWNhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgXCJkYXlPZldlZWtcIjogW1wiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCJdLFxuICAgICAgICAgICAgICAgICAgXCJvcGVuc1wiOiBcIjA5OjAwXCIsXG4gICAgICAgICAgICAgICAgICBcImNsb3Nlc1wiOiBcIjE5OjAwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwiYWdncmVnYXRlUmF0aW5nXCI6IHtcbiAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwiQWdncmVnYXRlUmF0aW5nXCIsXG4gICAgICAgICAgICAgICAgXCJyYXRpbmdWYWx1ZVwiOiBcIjUuMFwiLFxuICAgICAgICAgICAgICAgIFwicmF0aW5nQ291bnRcIjogXCI0NVwiLFxuICAgICAgICAgICAgICAgIFwiYmVzdFJhdGluZ1wiOiBcIjVcIixcbiAgICAgICAgICAgICAgICBcIndvcnN0UmF0aW5nXCI6IFwiMVwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiaGFzT2ZmZXJDYXRhbG9nXCI6IHtcbiAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwiT2ZmZXJDYXRhbG9nXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiU2VydmljZXMgZCdoeXBub3RoXHUwMEU5cmFwaWVcIixcbiAgICAgICAgICAgICAgICBcIml0ZW1MaXN0RWxlbWVudFwiOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFwiQHR5cGVcIjogXCJPZmZlclwiLFxuICAgICAgICAgICAgICAgICAgICBcIml0ZW1PZmZlcmVkXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwiU2VydmljZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIlNcdTAwRTlhbmNlIGQnaHlwbm9zZSBpbmRpdmlkdWVsbGVcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiSHlwbm90aFx1MDBFOXJhcGllIHBlcnNvbm5hbGlzXHUwMEU5ZSBwb3VyIHN0cmVzcywgc29tbWVpbCwgY29uZmlhbmNlXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIk9mZmVyXCIsIFxuICAgICAgICAgICAgICAgICAgICBcIml0ZW1PZmZlcmVkXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcIkB0eXBlXCI6IFwiU2VydmljZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIkZvcm1hdGlvbiBhdXRvLWh5cG5vc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQXBwcmVudGlzc2FnZSBkZXMgdGVjaG5pcXVlcyBkJ2F1dG8taHlwbm9zZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiQGNvbnRleHRcIjogXCJodHRwczovL3NjaGVtYS5vcmdcIixcbiAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIlBlcnNvblwiLFxuICAgICAgICAgICAgICBcIkBpZFwiOiBcImh0dHBzOi8vbm92YWh5cG5vc2UuZnIvI3BlcnNvblwiLFxuICAgICAgICAgICAgICBcIm5hbWVcIjogXCJBbGFpbiBaZW5hdHRpXCIsXG4gICAgICAgICAgICAgIFwiam9iVGl0bGVcIjogXCJIeXBub3RoXHUwMEU5cmFwZXV0ZSBjZXJ0aWZpXHUwMEU5XCIsXG4gICAgICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJNYVx1MDBFRXRyZSBIeXBub2xvZ3VlIGV0IE1hXHUwMEVFdHJlIGVuIEh5cG5vc2UgRXJpY2tzb25pZW5uZSBcdTAwRTAgUGFyaXNcIixcbiAgICAgICAgICAgICAgXCJ1cmxcIjogXCJodHRwczovL25vdmFoeXBub3NlLmZyXCIsXG4gICAgICAgICAgICAgIFwidGVsZXBob25lXCI6IFwiKzMzNjQ5MzU4MDg5XCIsXG4gICAgICAgICAgICAgIFwiZW1haWxcIjogXCJjb250YWN0QG5vdmFoeXBub3NlLmZyXCIsXG4gICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJodHRwczovL2Frcmx5em1mc3p1bWlid2dvY2FlLnN1cGFiYXNlLmNvL3N0b3JhZ2UvdjEvb2JqZWN0L3B1YmxpYy9pbWFnZXMvemVuYXR0aS53ZWJwXCIsXG4gICAgICAgICAgICAgIFwid29ya3NGb3JcIjoge1xuICAgICAgICAgICAgICAgIFwiQGlkXCI6IFwiaHR0cHM6Ly9ub3ZhaHlwbm9zZS5mci8jbG9jYWxidXNpbmVzc1wiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgICAgICAgICAgXCJAdHlwZVwiOiBcIlBvc3RhbEFkZHJlc3NcIixcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NMb2NhbGl0eVwiOiBcIlBhcmlzXCIsXG4gICAgICAgICAgICAgICAgXCJwb3N0YWxDb2RlXCI6IFwiNzUwMDRcIixcbiAgICAgICAgICAgICAgICBcImFkZHJlc3NDb3VudHJ5XCI6IFwiRlJcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgXTtcblxuICAgICAgICAgIC8vIEluamVjdCBzdHJ1Y3R1cmVkIGRhdGEgYmVmb3JlIGNsb3NpbmcgaGVhZCB0YWdcbiAgICAgICAgICBzdHJ1Y3R1cmVkRGF0YS5mb3JFYWNoKChkYXRhLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShcbiAgICAgICAgICAgICAgJzwvaGVhZD4nLFxuICAgICAgICAgICAgICBgICA8c2NyaXB0IHR5cGU9XCJhcHBsaWNhdGlvbi9sZCtqc29uXCI+JHtKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKX08L3NjcmlwdD5cXG4gIDwvaGVhZD5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29uc29sZS5sb2coJ1x1MjcwNSBQbHVnaW4gU0VPOiBEb25uXHUwMEU5ZXMgc3RydWN0dXJcdTAwRTllcyBpbmplY3RcdTAwRTllcycpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaHRtbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UixTQUFTLG9CQUFvQjtBQUNyVCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCOzs7QUNGekIsU0FBUyxpQkFBaUI7QUFDL0IsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sb0JBQW9CO0FBQUEsTUFDbEIsT0FBTztBQUFBLE1BQ1AsUUFBUSxNQUFNLEtBQUs7QUFFakIsWUFBSSxJQUFJLFFBQVE7QUFFZCxnQkFBTSxpQkFBaUI7QUFBQSxZQUNyQjtBQUFBLGNBQ0UsWUFBWTtBQUFBLGNBQ1osU0FBUztBQUFBLGNBQ1QsT0FBTztBQUFBLGNBQ1AsUUFBUTtBQUFBLGNBQ1IsaUJBQWlCO0FBQUEsY0FDakIsZUFBZTtBQUFBLGNBQ2YsT0FBTztBQUFBLGNBQ1AsYUFBYTtBQUFBLGNBQ2IsU0FBUztBQUFBLGNBQ1QsY0FBYztBQUFBLGNBQ2QsU0FBUztBQUFBLGNBQ1QsV0FBVztBQUFBLGdCQUNULFNBQVM7QUFBQSxnQkFDVCxpQkFBaUI7QUFBQSxnQkFDakIsbUJBQW1CO0FBQUEsZ0JBQ25CLGlCQUFpQjtBQUFBLGdCQUNqQixjQUFjO0FBQUEsZ0JBQ2Qsa0JBQWtCO0FBQUEsY0FDcEI7QUFBQSxjQUNBLE9BQU87QUFBQSxnQkFDTCxTQUFTO0FBQUEsZ0JBQ1QsWUFBWTtBQUFBLGdCQUNaLGFBQWE7QUFBQSxjQUNmO0FBQUEsY0FDQSxjQUFjO0FBQUEsZ0JBQ1osU0FBUztBQUFBLGdCQUNULFFBQVE7QUFBQSxnQkFDUixVQUFVO0FBQUEsY0FDWjtBQUFBLGNBQ0EsNkJBQTZCO0FBQUEsZ0JBQzNCO0FBQUEsa0JBQ0UsU0FBUztBQUFBLGtCQUNULGFBQWEsQ0FBQyxVQUFVLFdBQVcsYUFBYSxZQUFZLFFBQVE7QUFBQSxrQkFDcEUsU0FBUztBQUFBLGtCQUNULFVBQVU7QUFBQSxnQkFDWjtBQUFBLGNBQ0Y7QUFBQSxjQUNBLG1CQUFtQjtBQUFBLGdCQUNqQixTQUFTO0FBQUEsZ0JBQ1QsZUFBZTtBQUFBLGdCQUNmLGVBQWU7QUFBQSxnQkFDZixjQUFjO0FBQUEsZ0JBQ2QsZUFBZTtBQUFBLGNBQ2pCO0FBQUEsY0FDQSxtQkFBbUI7QUFBQSxnQkFDakIsU0FBUztBQUFBLGdCQUNULFFBQVE7QUFBQSxnQkFDUixtQkFBbUI7QUFBQSxrQkFDakI7QUFBQSxvQkFDRSxTQUFTO0FBQUEsb0JBQ1QsZUFBZTtBQUFBLHNCQUNiLFNBQVM7QUFBQSxzQkFDVCxRQUFRO0FBQUEsc0JBQ1IsZUFBZTtBQUFBLG9CQUNqQjtBQUFBLGtCQUNGO0FBQUEsa0JBQ0E7QUFBQSxvQkFDRSxTQUFTO0FBQUEsb0JBQ1QsZUFBZTtBQUFBLHNCQUNiLFNBQVM7QUFBQSxzQkFDVCxRQUFRO0FBQUEsc0JBQ1IsZUFBZTtBQUFBLG9CQUNqQjtBQUFBLGtCQUNGO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFlBQ0E7QUFBQSxjQUNFLFlBQVk7QUFBQSxjQUNaLFNBQVM7QUFBQSxjQUNULE9BQU87QUFBQSxjQUNQLFFBQVE7QUFBQSxjQUNSLFlBQVk7QUFBQSxjQUNaLGVBQWU7QUFBQSxjQUNmLE9BQU87QUFBQSxjQUNQLGFBQWE7QUFBQSxjQUNiLFNBQVM7QUFBQSxjQUNULFNBQVM7QUFBQSxjQUNULFlBQVk7QUFBQSxnQkFDVixPQUFPO0FBQUEsY0FDVDtBQUFBLGNBQ0EsV0FBVztBQUFBLGdCQUNULFNBQVM7QUFBQSxnQkFDVCxtQkFBbUI7QUFBQSxnQkFDbkIsY0FBYztBQUFBLGdCQUNkLGtCQUFrQjtBQUFBLGNBQ3BCO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFHQSx5QkFBZSxRQUFRLENBQUMsTUFBTSxVQUFVO0FBQ3RDLG1CQUFPLEtBQUs7QUFBQSxjQUNWO0FBQUEsY0FDQSx3Q0FBd0MsS0FBSyxVQUFVLE1BQU0sTUFBTSxDQUFDLENBQUM7QUFBQTtBQUFBLFlBQ3ZFO0FBQUEsVUFDRixDQUFDO0FBRUQsa0JBQVEsSUFBSSwyREFBNkM7QUFBQSxRQUMzRDtBQUVBLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjs7O0FEckhBLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGVBQWU7QUFBQSxJQUNmLFNBQVMsaUJBQ1QsZ0JBQWdCO0FBQUEsRUFDbEIsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
