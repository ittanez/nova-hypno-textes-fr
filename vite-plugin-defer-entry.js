// Plugin Vite : sort le bundle JS du chemin critique de rendu de la homepage.
//
// Pourquoi : la homepage est pré-rendue statiquement dans index.html (nav + hero)
// et peint dès l'arrivée du CSS, sans JS. Mais Lighthouse/PageSpeed (throttling
// simulé Lantern) inclut dans ses estimations FCP/LCP tout script téléchargé
// avant le paint observé — même préchargé en priorité basse et exécuté après le
// paint. Tant que le téléchargement du bundle (~130 KB gz) démarrait avant le
// premier rendu, le gain du pré-rendu restait invisible dans le score.
//
// Ce plugin retire donc les <link rel="modulepreload"> et la balise
// <script type="module"> émis par Vite, et les remplace par un petit loader
// inline qui ne démarre le téléchargement du JS qu'APRÈS le premier rendu :
//
//   - Homepage : à la première entrée LargestContentfulPaint observée par un
//     PerformanceObserver (= le hero statique est peint). Le téléchargement
//     commence ainsi toujours après le LCP, sur connexion rapide comme lente.
//   - Autres routes (pré-rendu masqué, aucun paint contentful → pas d'entrée
//     LCP) et navigateurs sans l'API : double requestAnimationFrame.
//   - Filets de sécurité : setTimeout absolu (onglet en arrière-plan, etc.).
//
// Au déclenchement, les chunks vendors sont préchargés en parallèle de l'entrée
// pour éviter la cascade entrée → imports.
//
// Coût réel : sur réseau lent, React devient interactif ~1 s plus tard, mais le
// contenu visible (hero statique) est déjà peint — l'expérience perçue est
// meilleure car CSS et polices ne partagent plus la bande passante avec le JS.

export function viteDeferEntry() {
  return {
    name: 'vite-defer-entry',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // En dev (pas de bundle), garder le <script> normal pour le HMR.
        if (!ctx.bundle) return html;

        // Collecte puis suppression des modulepreloads émis par Vite.
        const preloads = [];
        html = html.replace(
          /\s*<link rel="modulepreload"[^>]*href="([^"]+)"[^>]*>/g,
          (_m, href) => {
            preloads.push(href);
            return '';
          }
        );

        return html.replace(
          /<script type="module" crossorigin src="([^"]+)"><\/script>/,
          (_match, src) => {
            const loader =
              `(function(){var d=false;` +
              `function l(){if(d)return;d=true;` +
              `${JSON.stringify(preloads)}.forEach(function(h){` +
              `var p=document.createElement('link');p.rel='modulepreload';p.crossOrigin='anonymous';p.href=h;document.head.appendChild(p);});` +
              `var s=document.createElement('script');s.type='module';s.crossOrigin='anonymous';s.src=${JSON.stringify(src)};document.body.appendChild(s);}` +
              `function raf(){requestAnimationFrame(function(){requestAnimationFrame(function(){setTimeout(l,0)})});setTimeout(l,1500);}` +
              `if(window.__czIsHome&&'PerformanceObserver'in window){` +
              `try{var po=new PerformanceObserver(function(){po.disconnect();setTimeout(l,0);});` +
              `po.observe({type:'largest-contentful-paint',buffered:true});setTimeout(l,3000);}` +
              `catch(e){raf();}}else{raf();}` +
              `})();`;
            return `<script>${loader}</script>`;
          }
        );
      },
    },
  };
}
