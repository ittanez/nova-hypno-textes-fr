/**
 * Garde-fou C1/C3 : le contenu pré-rendu généré depuis les pages React doit
 * couvrir toutes les pages spécialité avec un volume de texte suffisant.
 */
import { describe, it, expect } from 'vitest';
import { PRERENDER_EXTRA } from '../../netlify/edge-functions/lib/prerender-extra.generated';

const words = (h: string) => h.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;

describe('prerender-extra (généré)', () => {
  it('couvre au moins 35 pages, chacune > 400 mots', () => {
    const entries = Object.entries(PRERENDER_EXTRA);
    expect(entries.length).toBeGreaterThanOrEqual(35);
    for (const [path, html] of entries) {
      expect(words(html), path).toBeGreaterThan(400);
    }
  });
  it('contient la FAQ et la date de mise à jour de la page deuil', () => {
    const h = PRERENDER_EXTRA['/hypnose-deuil-paris'];
    expect(h).toContain('Combien de séances sont nécessaires pour un deuil');
    expect(h).toContain('Dernière mise à jour');
  });
});
