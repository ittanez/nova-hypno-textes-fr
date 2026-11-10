// Génère les PDF (et les fichiers Word) des guides à partir de guides-pdf/<guide>/guide.md.
// Usage : node guides-pdf/build.mjs [guide ...]      (sans argument : tous les guides)
// Prérequis : pandoc installé ; Playwright (déjà dans le projet).
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const wanted = process.argv.slice(2);
const guides = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(resolve(root, d.name, 'guide.md')))
  .map((d) => d.name)
  .filter((n) => wanted.length === 0 || wanted.includes(n));

mkdirSync(resolve(root, 'dist'), { recursive: true });
// CHROMIUM_PATH : chemin d'un Chromium déjà installé (facultatif ; sinon Playwright utilise le sien).
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
for (const g of guides) {
  const dir = resolve(root, g);
  const html = resolve(dir, 'guide.html');
  execFileSync('pandoc', [
    resolve(dir, 'guide.md'), '-f', 'markdown+fenced_divs+bracketed_spans+smart', '-t', 'html5',
    '--template', resolve(root, 'template.html'), '-o', html,
  ]);
  const page = await browser.newPage();
  await page.goto(pathToFileURL(html).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: resolve(root, 'dist', `${g}.pdf`), preferCSSPageSize: true, printBackground: true });
  await page.close();
  // Version Word modifiable (texte seul, sans la mise en page).
  execFileSync('pandoc', [resolve(dir, 'guide.md'), '-f', 'markdown+fenced_divs+bracketed_spans+smart', '-o', resolve(root, 'dist', `${g}.docx`)]);
  console.log(`✓ ${g}`);
}
await browser.close();
