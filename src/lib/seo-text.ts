/**
 * Petits utilitaires de texte pour le SEO des articles (versions miroir de celles du
 * pré-rendu `netlify/edge-functions/seo-prerender.ts`).
 */

/** Rétrograde les H1 présents dans le contenu d'un article en H2 (un seul H1 par page). */
export function demoteH1(html: string): string {
  return (html || '').replace(/<h1(\s|>)/gi, '<h2$1').replace(/<\/h1>/gi, '</h2>');
}

/** Description ≤ 155 caractères, coupée à la limite d'un mot. */
export function trimDescription(desc: string, maxLength = 155): string {
  const clean = (desc || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  const cut = clean.substring(0, maxLength + 1);
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > 80 ? cut.substring(0, lastSpace) : clean.substring(0, maxLength);
  return base.replace(/[\s:;,.\-–—]+$/u, '') + '…';
}
