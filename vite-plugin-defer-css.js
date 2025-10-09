/**
 * Plugin Vite pour différer le chargement du CSS non-critique
 * Utilise la technique media="print" -> media="all" pour éviter le blocage du rendu
 */
export function deferCss() {
  return {
    name: 'vite-plugin-defer-css',
    transformIndexHtml(html) {
      // Remplacer les balises <link rel="stylesheet"> par des balises différées
      return html.replace(
        /<link([^>]*rel=["']stylesheet["'][^>]*)>/gi,
        (match, attrs) => {
          // Vérifier si c'est un fichier CSS (pas un preload ou autre)
          if (attrs.includes('href') && !attrs.includes('media=')) {
            // Ajouter media="print" pour charger sans bloquer le rendu
            // onload="this.media='all'" pour basculer en media="all" une fois chargé
            return `<link${attrs} media="print" onload="this.media='all'"><noscript><link${attrs}></noscript>`;
          }
          return match;
        }
      );
    }
  };
}
