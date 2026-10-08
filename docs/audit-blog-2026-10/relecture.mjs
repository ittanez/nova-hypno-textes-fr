// Génère <lot>/RELECTURE.html : avant / après côte à côte pour chaque article du lot.
// Usage : node relecture.mjs lot-2
import fs from 'node:fs';
const lot = process.argv[2];
const items = JSON.parse(fs.readFileSync(`${lot}/items.json`, 'utf8'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const w = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').split(/\s+/).filter(Boolean).length;
let h = `<!doctype html><html lang="fr"><meta charset="utf-8"><title>Relecture ${lot}</title><style>
body{font:16px/1.55 system-ui,sans-serif;margin:0;background:#f6f4ef;color:#1d1d1b}
header{position:sticky;top:0;background:#1d1d1b;color:#fff;padding:.6rem 1rem;z-index:5}header a{color:#ffd37a;margin-right:1rem;font-size:.9rem}
section{max-width:1400px;margin:2rem auto;padding:0 1rem}h1{font-size:1.4rem}
.titres{background:#fff;padding:1rem;border-radius:8px;margin-bottom:1rem}.t-old{color:#9a2b1d;text-decoration:line-through}.t-new{color:#1f6b3a;font-weight:600}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:1rem}@media(max-width:900px){.cols{grid-template-columns:1fr}}
.col{background:#fff;padding:1rem 1.2rem;border-radius:8px;border-top:6px solid #bbb}.col.av{border-color:#c0392b}.col.ap{border-color:#27ae60}
.col h3.l{margin:0 0 .5rem;font-size:.8rem;text-transform:uppercase;letter-spacing:.08em;color:#666}
.col h2{font-size:1.15rem;margin-top:1.4rem}.col h3{font-size:1rem}.highlight-box,.technique-box,.exercise-box,.warning-box{border-left:4px solid #999;background:#f4f4f4;padding:.6rem .9rem;margin:1rem 0}.warning-box{border-color:#d9822b;background:#fff4e6}
</style><header><b>${lot} — avant / après</b> &nbsp; ${items.map((i, k) => `<a href="#a${k}">${k + 1}</a>`).join('')}</header>`;
items.forEach((it, k) => {
  const m = JSON.parse(fs.readFileSync(`${lot}/avant/${it.n}.meta.json`, 'utf8'));
  const av = fs.readFileSync(`${lot}/avant/${it.n}.html`, 'utf8').replace(/''/g, "'");
  const ap = fs.readFileSync(`${lot}/apres/${it.n}.html`, 'utf8');
  h += `<section id="a${k}"><h1>${k + 1}. ${esc(m.title)}</h1><div class="titres"><div>Titre : <span class="t-old">${esc(m.title)}</span><br><span class="t-new">${esc(it.title)}</span></div><div style="margin-top:.5rem;font-size:.9rem">Extrait : <i>${esc(it.excerpt)}</i><br>Description : <i>${esc(it.meta)}</i><br>URL (inchangée) : <code>/blog/article/${esc(m.slug)}</code></div></div><div class="cols"><div class="col av"><h3 class="l">Avant (${w(av)} mots)</h3>${av}</div><div class="col ap"><h3 class="l">Après (${w(ap)} mots)</h3>${ap}</div></div></section>`;
});
fs.writeFileSync(`${lot}/RELECTURE.html`, h + '</html>');
console.log(`${lot}/RELECTURE.html : ${items.length} articles`);
