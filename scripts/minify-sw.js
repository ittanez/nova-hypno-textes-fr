/**
 * Minifie le service worker après le build Vite.
 *
 * Les fichiers de public/ sont copiés tels quels dans dist/ : sans cette étape,
 * sw.js est servi non minifié en production (signalé par les audits SEO
 * "unminified JavaScript"). La source lisible reste public/sw.js.
 */
import { transform } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const distSw = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist', 'sw.js');

const source = await readFile(distSw, 'utf8');
const { code } = await transform(source, { minify: true, target: 'es2018' });
await writeFile(distSw, code);

console.log(`✅ sw.js minifié : ${source.length} → ${code.length} octets`);
