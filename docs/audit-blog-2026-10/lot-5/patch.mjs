// Applique des remplacements [ancre -> nouveau texte] à lot-5/apres/<n>.html ; échoue si une ancre est absente.
import fs from 'node:fs';
export function patch(n, pairs) {
  const f = `lot-5/apres/${n}.html`;
  let h = fs.readFileSync(f, 'utf8');
  for (const [a, b] of pairs) {
    if (!h.includes(a)) { console.log(`  ANCRE ABSENTE (${n}):`, a.slice(0, 70)); continue; }
    h = h.split(a).join(b);
  }
  fs.writeFileSync(f, h);
  console.log(n, h.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'mots');
}
// Remplace tout ce qui va de l'ancre `a` (incluse) jusqu'à l'ancre `b` (exclue) par `txt`.
export function range(n, a, b, txt) {
  const f = `lot-5/apres/${n}.html`;
  let h = fs.readFileSync(f, 'utf8');
  const i = h.indexOf(a);
  const j = i < 0 ? -1 : h.indexOf(b, i + a.length);
  if (i < 0 || j < 0) { console.log(`  PLAGE ABSENTE (${n}):`, a.slice(0, 50), '->', b.slice(0, 50)); return; }
  h = h.slice(0, i) + txt + h.slice(j);
  fs.writeFileSync(f, h);
  console.log(n, h.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'mots');
}
