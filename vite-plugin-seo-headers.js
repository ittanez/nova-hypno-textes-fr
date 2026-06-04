// Plugin Vite : injecte le préchargement des polices critiques du hero (LCP).
//
// Le hero de la homepage (charte) est composé de texte : l'élément LCP est le
// nom géant « ZenAtti » en Cormorant Garamond 500 (normal + italique). Ces
// polices sont normalement découvertes APRÈS le parsing du CSS (les @font-face
// y sont inlinées), ce qui retarde leur arrivée. On les précharge donc dès le
// <head>, en parallèle du CSS, pour accélérer le LCP.
//
// Les fichiers woff2 sont hashés par Vite : on résout leur nom réel depuis le
// bundle (transformIndexHtml order:'post', qui a accès à ctx.bundle).

// Sous-chaînes identifiant les polices critiques à précharger (sous-ensemble latin).
const CRITICAL_FONTS = [
  'cormorant-garamond-latin-500-normal',
  'cormorant-garamond-latin-500-italic',
];

export function viteSeoHeaders() {
  let resolvedConfig;
  return {
    name: 'vite-seo-headers',
    configResolved(config) {
      resolvedConfig = config;
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const base = resolvedConfig?.base || '/';

        let preloadTags = '';
        if (ctx.bundle) {
          for (const sub of CRITICAL_FONTS) {
            const fileName = Object.keys(ctx.bundle).find(
              (k) => k.includes(sub) && k.endsWith('.woff2')
            );
            if (fileName) {
              const href = `${base.replace(/\/$/, '')}/${fileName}`;
              preloadTags += `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>\n    `;
            }
          }
        }

        // Remplace le marqueur par les balises de préchargement (ou rien en dev).
        return html.replace('<!-- PRELOAD_CRITICAL_FONTS -->', preloadTags.trim());
      },
    },
  };
}
