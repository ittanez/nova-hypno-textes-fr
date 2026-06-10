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
// Toutes les graisses rendues dans le hero/nav de la homepage : les précharger
// depuis le HTML (priorité High, niveau 2) plutôt que de les laisser découvrir
// par le CSS (priorité VeryHigh, niveau 3) raccourcit la chaîne critique du FCP,
// pour les vrais utilisateurs comme pour la simulation Lighthouse/PageSpeed.
const CRITICAL_FONTS = [
  'cormorant-garamond-latin-500-normal',
  'cormorant-garamond-latin-500-italic',
  'cormorant-garamond-latin-400-normal',
  'cormorant-garamond-latin-400-italic',
  'dm-sans-latin-300-normal',
  'dm-sans-latin-500-normal',
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
