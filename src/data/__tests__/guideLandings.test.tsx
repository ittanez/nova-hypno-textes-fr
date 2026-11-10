import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import GuideLanding from '@/components/guide/GuideLanding';
import { GUIDE_LANDINGS } from '@/data/guideLandings';

// Nombre de pages des PDF publiés (voir guides-pdf/REVISION-2026-11-10.md).
const PDF_PAGES: Record<string, number> = {
  sommeil: 14,
  procrastination: 14,
  tabac: 12,
  colere: 12,
  carriere: 12,
  'emotions-travail': 12,
  autohypnose: 19,
};

describe('pages de téléchargement des guides', () => {
  it('couvre les 7 guides', () => {
    expect(Object.keys(GUIDE_LANDINGS).sort()).toEqual(Object.keys(PDF_PAGES).sort());
  });

  it.each(Object.entries(PDF_PAGES))('%s : nombre de pages aligné sur le PDF', (key, pages) => {
    const c = GUIDE_LANDINGS[key];
    expect(c.pages).toBe(pages);
    expect(c.tag).toContain(`${pages} pages`);
    expect(c.metaDescription).toContain(`${pages} pages`);
    expect(c.schemaDescription).toContain(`${pages} pages`);
  });

  it.each(Object.keys(PDF_PAGES))('%s : rendu avec les sections communes, sans mention interdite', (key) => {
    const c = GUIDE_LANDINGS[key];
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <GuideLanding config={c} submit={async () => ({ success: true })} />
      </MemoryRouter>
    );
    expect(html).toContain('Vous vous reconnaissez ?');
    expect(html).toContain('Ce que vous allez découvrir');
    expect(html).toContain('Qui suis-');
    expect(html).toContain('3114');
    expect(html).toContain('Paris 4e et visio, partout en France');
    expect(html).toContain(c.cover.src);
    // Pas de promesse ni de titre retiré des guides.
    expect(html).not.toMatch(/Maître Praticien|Maître Hypnologue/);
    expect(html).not.toMatch(/prouvée?|validée? auprès|testée? sur/i);
    // Le premier échange téléphonique dure 15 minutes (pas 30).
    expect(html).not.toMatch(/(échange|appel|découverte)[^.<]{0,40}30 minutes/);
  });

  it('seul le guide Émotions au travail ne demande pas la localisation', () => {
    const noLocation = Object.entries(GUIDE_LANDINGS).filter(([, c]) => !c.askLocation).map(([k]) => k);
    expect(noLocation).toEqual(['emotions-travail']);
  });
});
