/**
 * Garde-fou R-01 (soft 404) : toute route déclarée dans App.tsx doit figurer
 * dans la liste blanche de l'edge function not-found-guard, sinon une page
 * valide serait servie en 404.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import {
  KNOWN_PATHS,
  shouldReturn404,
} from '../../netlify/edge-functions/not-found-guard';

const root = resolve(__dirname, '../..');

describe('not-found-guard', () => {
  it('connaît toutes les routes statiques de App.tsx', () => {
    const src = readFileSync(resolve(root, 'src/App.tsx'), 'utf8');
    const routes = [...src.matchAll(/<Route\s+path="(\/[^"*:]*)"/g)]
      .map((m) => m[1])
      .filter((p) => p !== '/404');
    const missing = routes.filter((p) => !KNOWN_PATHS.has(p));
    expect(missing).toEqual([]);
  });

  it('renvoie 404 pour une URL inconnue', () => {
    expect(shouldReturn404('/zzz-test-404')).toBe(true);
    expect(shouldReturn404('/hypnose-aviophobie-paris')).toBe(true);
  });

  it('laisse passer pages, slugs dynamiques, fichiers et accueil', () => {
    expect(shouldReturn404('/')).toBe(false);
    expect(shouldReturn404('/hypnose-deuil-paris/')).toBe(false);
    expect(shouldReturn404('/blog/article/un-slug')).toBe(false);
    expect(shouldReturn404('/robots.txt')).toBe(false);
    expect(shouldReturn404('/assets/index-abc.js')).toBe(false);
  });
});
