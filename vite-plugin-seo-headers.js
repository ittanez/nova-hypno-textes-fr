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
          // Note: Structured data (LocalBusiness, Person, FAQ, Breadcrumb) is managed
          // exclusively by React Helmet via src/data/schemaOrg.ts to avoid duplicate
          // aggregateRating causing Google Search Console errors.
        }
        
        return html;
      }
    }
  };
}