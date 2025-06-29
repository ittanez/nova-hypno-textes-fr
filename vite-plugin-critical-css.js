export function viteCriticalCSS() {
  return {
    name: 'vite-critical-css',
    transformIndexHtml: {
      enforce: 'post',
      transform(html) {
        // Remove the link to CSS file and make it async
        return html.replace(
          /<link[^>]+rel="stylesheet"[^>]+href="[^"]*\.css"[^>]*>/g,
          ''
        ).replace(
          /<\/head>/,
          `  <script>
            // Load CSS asynchronously to avoid render blocking
            (function() {
              const links = [];
              function loadCSS(href) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
                document.head.appendChild(link);
                links.push(link);
              }
              // Find CSS files and load them
              const scripts = document.querySelectorAll('script[type="module"]');
              scripts.forEach(script => {
                const src = script.src;
                if (src && src.includes('assets')) {
                  const cssPath = src.replace(/\\/js\\/[^/]+\\.js$/, '').replace('/assets/js/', '/assets/css/') + '/index-XfRj7ryC.css';
                  if (cssPath.includes('.css')) {
                    loadCSS(cssPath);
                  }
                }
              });
              // Fallback - load known CSS file
              loadCSS('/assets/css/index-XfRj7ryC.css');
            })();
          </script>
        </head>`
        );
      }
    }
  };
}