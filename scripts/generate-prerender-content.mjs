#!/usr/bin/env node
/**
 * Génère le contenu pré-rendu (HTML pour robots) des pages spécialité À PARTIR des
 * vraies pages React (src/pages/Hypnose*.tsx), pour que les robots voient le même
 * contenu que les visiteurs : sections, cartes, cas, FAQ, références, date de mise
 * à jour (audit C1/C3/C4/C6).
 *
 * Sortie : netlify/edge-functions/lib/prerender-extra.generated.ts
 * Lancé automatiquement par `npm run prebuild`.
 */
import ts from 'typescript';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = resolve(root, 'src/pages');
const appSrc = readFileSync(resolve(root, 'src/App.tsx'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const clean = (s) => s.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

// composant -> route, d'après App.tsx
const routeOf = new Map();
for (const m of appSrc.matchAll(/<Route\s+path="(\/hypnose-[^"]+)"\s+element=\{<(\w+)\s*\/>/g)) routeOf.set(m[2], m[1]);
const importOf = new Map();
for (const m of appSrc.matchAll(/(?:const|import)\s+(\w+)\s*(?:=\s*(?:React\.)?lazy\(\(\)\s*=>\s*import\(|from\s+)['"]@\/pages\/(\w+)['"]/g)) importOf.set(m[1], m[2]);

function strOf(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isTemplateExpression(node)) return node.head.text + node.templateSpans.map((s) => '…' + s.literal.text).join('');
  return null;
}

function objToEntries(obj) {
  const out = {};
  for (const p of obj.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    const k = p.name.getText();
    const v = strOf(p.initializer);
    if (v != null) out[k] = v;
  }
  return out;
}

function itemsHtml(items) {
  let h = '';
  for (const it of items) {
    const e = it;
    const head = e.question ?? e.title ?? e.name ?? e.heading ?? e.t;
    const body = e.answer ?? e.desc ?? e.description ?? e.text ?? e.body ?? e.d;
    if (head && body) h += `<h3>${esc(clean(head))}</h3><p>${esc(clean(body))}</p>`;
    else if (e.value && e.label) h += `<p><strong>${esc(clean(e.value))}</strong> ${esc(clean(e.label))}</p>`;
    else if (head) h += `<p>${esc(clean(head))}</p>`;
    else if (body) h += `<p>${esc(clean(body))}</p>`;
  }
  return h;
}

function textOf(node) {
  let t = '';
  const visit = (n) => {
    if (ts.isJsxText(n)) t += n.text;
    else if (ts.isJsxSelfClosingElement(n)) { if (n.tagName.getText() === 'br') t += ' '; }
    else if (ts.isJsxExpression(n) && n.expression) { const s = strOf(n.expression); if (s) t += s; }
    else ts.forEachChild(n, visit);
  };
  ts.forEachChild(node, visit);
  return clean(t);
}

function extract(file) {
  const src = readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const arrays = new Map();
  const collectArrays = (n) => {
    if (ts.isVariableDeclaration(n) && n.initializer && ts.isArrayLiteralExpression(n.initializer)) {
      const items = n.initializer.elements.filter(ts.isObjectLiteralExpression).map(objToEntries);
      if (items.length) arrays.set(n.name.getText(), items);
    }
    ts.forEachChild(n, collectArrays);
  };
  collectArrays(sf);

  let html = '';
  let modified = '';
  const SKIP = new Set(['svg', 'script', 'Helmet', 'button', 'HeroArt', 'SpecialtyShort', 'SpecialtyBlogArticles', 'style', 'noscript']);

  const emitRefs = (el) => {
    const attrs = el.attributes.properties;
    const get = (name) => attrs.find((a) => ts.isJsxAttribute(a) && a.name.getText() === name);
    const dm = get('dateModified');
    if (dm?.initializer && ts.isStringLiteral(dm.initializer)) modified = dm.initializer.text;
    const refs = get('references');
    if (refs?.initializer && ts.isJsxExpression(refs.initializer) && refs.initializer.expression && ts.isArrayLiteralExpression(refs.initializer.expression)) {
      const items = refs.initializer.expression.elements.filter(ts.isObjectLiteralExpression).map(objToEntries);
      if (items.length) {
        html += '<h2>Références scientifiques</h2><ul>' + items.map((r) =>
          `<li>${esc([r.authors, r.year ? `(${r.year})` : '', r.title, r.source].filter(Boolean).join('. '))}${r.url ? ` — <a href="${esc(r.url)}">source</a>` : ''}</li>`).join('') + '</ul>';
      }
    }
  };

  const walk = (n) => {
    if (ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) {
      const open = ts.isJsxElement(n) ? n.openingElement : n;
      const tag = open.tagName.getText();
      if (tag === 'SpecialtyReferences') { emitRefs(open); return; }
      if (SKIP.has(tag)) return;
      const cls = (open.attributes.properties.find((a) => ts.isJsxAttribute(a) && a.name.getText() === 'className')?.initializer);
      const clsText = cls && ts.isStringLiteral(cls) ? cls.text : '';
      if (ts.isJsxElement(n)) {
        if (/^h[1-4]$/.test(tag)) { const t = textOf(n); if (t) html += `<${tag === 'h1' ? 'h2' : tag}>${esc(t)}</${tag === 'h1' ? 'h2' : tag}>`; return; }
        if (tag === 'p' || tag === 'li') { const t = textOf(n); if (t.length > 20 && !n.getText().includes('<Link')) html += `<${tag}>${esc(t)}</${tag}>`; else if (t.length > 20) html += `<${tag}>${esc(t)}</${tag}>`; return; }
        if (tag === 'div' && /__title$/.test(clsText)) { const t = textOf(n); if (t) html += `<h3>${esc(t)}</h3>`; return; }
        if (tag === 'div' && /__desc$/.test(clsText)) { const t = textOf(n); if (t) html += `<p>${esc(t)}</p>`; return; }
      }
      ts.forEachChild(n, walk);
      return;
    }
    if (ts.isJsxExpression(n) && n.expression && ts.isCallExpression(n.expression)) {
      const call = n.expression;
      if (ts.isPropertyAccessExpression(call.expression) && call.expression.name.text === 'map') {
        const target = call.expression.expression;
        if (ts.isIdentifier(target) && arrays.has(target.text)) { html += itemsHtml(arrays.get(target.text)); return; }
        if (ts.isArrayLiteralExpression(target)) { html += itemsHtml(target.elements.filter(ts.isObjectLiteralExpression).map(objToEntries)); return; }
      }
    }
    ts.forEachChild(n, walk);
  };

  // JSX retourné par le composant : on parcourt tout le fichier hors tableaux de données
  const mainReturn = [];
  const findReturn = (n) => {
    if (ts.isReturnStatement(n) && n.expression) {
      const e = ts.isParenthesizedExpression(n.expression) ? n.expression.expression : n.expression;
      if (ts.isJsxElement(e) || ts.isJsxFragment(e)) mainReturn.push(e);
    }
    ts.forEachChild(n, findReturn);
  };
  findReturn(sf);
  const biggest = mainReturn.sort((a, b) => b.getEnd() - b.getStart() - (a.getEnd() - a.getStart()))[0];
  if (biggest) walk(biggest);
  return { html, modified };
}

const out = {};
for (const [comp, route] of routeOf) {
  const file = importOf.get(comp);
  if (!file) continue;
  const path = resolve(pagesDir, `${file}.tsx`);
  try {
    const { html, modified } = extract(path);
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    if (words < 150) { console.warn(`  ignoré ${route} (${words} mots extraits)`); continue; }
    const dateHtml = modified ? `<p><em>Dernière mise à jour : ${new Date(modified).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</em></p>` : '';
    out[route] = `<section>${html}${dateHtml}</section>`;
    console.log(`  ${route}: ${words} mots`);
  } catch (e) {
    console.warn(`  erreur ${route}: ${e.message}`);
  }
}

const header = '// FICHIER GÉNÉRÉ par scripts/generate-prerender-content.mjs — ne pas modifier à la main.\n';
writeFileSync(
  resolve(root, 'netlify/edge-functions/lib/prerender-extra.generated.ts'),
  `${header}export const PRERENDER_EXTRA: Record<string, string> = ${JSON.stringify(out, null, 2)};\n`,
);
console.log(`${Object.keys(out).length} pages générées`);
