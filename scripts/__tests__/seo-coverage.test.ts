/**
 * Garde-fou SEO/GEO — synchronisation des 4 systèmes qui doivent connaître
 * chaque page spécialité indexable :
 *
 *   1. Routes React                    src/App.tsx
 *   2. Sitemap de production           supabase/functions/generate-sitemap/index.ts
 *   3. Prerender bots                  netlify/edge-functions/seo-prerender-static.ts
 *      + routage                       netlify.toml
 *   4. Index IA                        public/llms.txt
 *
 * Contexte : audit SEO/GEO de juillet 2026 (AUDIT-SEO-GEO-JUILLET-2026.md).
 * 19 pages spécialités avaient été créées sans être ajoutées au prerender ni
 * au sitemap ni à llms.txt — invisibles pour Bing, ChatGPT, Claude, Perplexity.
 * Ce test échoue dès qu'une nouvelle page recrée cet écart.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const root = resolve(__dirname, '../..');
const read = (p: string) => readFileSync(resolve(root, p), 'utf8');

/** Routes de contenu déclarées dans App.tsx (les <Navigate> sont exclus). */
function appContentRoutes(): Set<string> {
  const src = read('src/App.tsx');
  const routes = new Set<string>();
  for (const m of src.matchAll(/<Route\s+path="(\/[^"]*)"\s+element=\{<(\w+)/g)) {
    if (m[2] !== 'Navigate') routes.add(m[1]);
  }
  return routes;
}

/** URLs statiques du sitemap de production (fonction Supabase). */
function sitemapStaticPages(): Set<string> {
  const src = read('supabase/functions/generate-sitemap/index.ts');
  return new Set([...src.matchAll(/\{ loc: '(\/[^']*)'/g)].map((m) => m[1]));
}

/** Clés de la table PAGES du prerender statique (2 syntaxes possibles). */
function prerenderPages(): Set<string> {
  const src = read('netlify/edge-functions/seo-prerender-static.ts');
  const keys = new Set<string>();
  for (const m of src.matchAll(/^ {2}"(\/[a-z0-9-]*)":/gm)) keys.add(m[1]);
  for (const m of src.matchAll(/PAGES\["(\/[a-z0-9-]+)"\]\s*=/g)) keys.add(m[1]);
  return keys;
}

/** Chemins routés vers seo-prerender-static dans netlify.toml. */
function netlifyPrerenderRoutes(): Set<string> {
  const src = read('netlify.toml');
  const routes = new Set<string>();
  for (const m of src.matchAll(
    /\[\[edge_functions\]\]\s*\n\s*path = "([^"]+)"\s*\n\s*function = "seo-prerender-static"/g
  )) {
    routes.add(m[1]);
  }
  return routes;
}

/** Chemins liés dans public/llms.txt. */
function llmsTxtPaths(): Set<string> {
  const src = read('public/llms.txt');
  return new Set(
    [...src.matchAll(/https:\/\/novahypnose\.fr(\/[a-z0-9\-/]*)/g)].map((m) =>
      m[1].replace(/\/$/, '') || '/'
    )
  );
}

/** Pages spécialités = celles où l'écart s'est produit historiquement. */
const isSpecialty = (p: string) => /^\/hypnose-[a-z-]+$/.test(p) || p === '/peurdelavion';

/** Pages volontairement noindex (netlify.toml X-Robots-Tag) — jamais dans le sitemap. */
const NOINDEX_PAGES = ['/zone-intervention', '/test-receptivite-archive'];

describe('Garde-fou SEO/GEO — couverture des pages spécialités', () => {
  const routes = appContentRoutes();
  const sitemap = sitemapStaticPages();
  const prerender = prerenderPages();
  const netlifyRoutes = netlifyPrerenderRoutes();
  const llms = llmsTxtPaths();
  const specialties = [...routes].filter(isSpecialty).sort();

  it('trouve bien les pages spécialités dans App.tsx (sanity check)', () => {
    expect(specialties.length).toBeGreaterThanOrEqual(30);
    expect(specialties).toContain('/hypnose-stress-anxiete-paris');
  });

  it('chaque page spécialité est dans le sitemap de production (Supabase)', () => {
    const missing = specialties.filter((p) => !sitemap.has(p));
    expect(missing, `Pages absentes de supabase/functions/generate-sitemap/index.ts (STATIC_PAGES) : ${missing.join(', ')}`).toEqual([]);
  });

  it('chaque page spécialité a une entrée PAGES dans seo-prerender-static.ts', () => {
    const missing = specialties.filter((p) => !prerender.has(p));
    expect(missing, `Pages sans prerender bot (les crawlers sans JS reçoivent une coquille SPA vide) : ${missing.join(', ')}`).toEqual([]);
  });

  it('chaque entrée PAGES est routée vers seo-prerender-static dans netlify.toml', () => {
    const missing = [...prerender].filter((p) => !netlifyRoutes.has(p)).sort();
    expect(missing, `Entrées PAGES jamais servies faute de bloc [[edge_functions]] dans netlify.toml : ${missing.join(', ')}`).toEqual([]);
  });

  it('chaque route netlify.toml vers le prerender a une entrée PAGES (pas de fallthrough silencieux)', () => {
    // /anxiete-hypnose est servie par un fichier HTML statique via redirect
    const missing = [...netlifyRoutes]
      .filter((p) => !prerender.has(p) && p !== '/anxiete-hypnose')
      .sort();
    expect(missing, `Routes prerender sans entrée PAGES (context.next() → SPA vide pour les bots) : ${missing.join(', ')}`).toEqual([]);
  });

  it('chaque page spécialité est référencée dans public/llms.txt', () => {
    const missing = specialties.filter((p) => !llms.has(p));
    expect(missing, `Pages absentes de llms.txt (invisibles pour les moteurs génératifs) : ${missing.join(', ')}`).toEqual([]);
  });

  it('les pages noindex ne sont pas dans le sitemap de production', () => {
    const present = NOINDEX_PAGES.filter((p) => sitemap.has(p));
    expect(present, `Pages noindex présentes dans le sitemap (contradiction pour Google) : ${present.join(', ')}`).toEqual([]);
  });

  it('chaque URL statique du sitemap correspond à une route App.tsx (pas de 404 dans le sitemap)', () => {
    const missing = [...sitemap]
      .filter((p) => !p.startsWith('/blog') && !routes.has(p))
      .sort();
    expect(missing, `URLs du sitemap sans route React correspondante : ${missing.join(', ')}`).toEqual([]);
  });
});
