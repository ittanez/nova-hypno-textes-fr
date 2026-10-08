// Assemble apres/*.html + métadonnées → apres/*.json, puis génère le SQL du lot (slugs inchangés).
import fs from 'node:fs';

const items = JSON.parse(fs.readFileSync("items.json", "utf8"));

const BAN = /Sophie|Sarah|Marc\b|Marie\b|Émilie|Paul\b|Lucie|Pierre|INSERM|Boroditsky|Damasio|Gueguen|Terhune|Pascual|Janet|Rainville|garantie|4e séance|révolution|miracul|\d+ ?%(?!.{0,3}\)?)|cinq ans|cinq années|centaines de séances|Témoignage|une cliente|un client\b|mes clients me/i;
const sql = [
  '-- LOT 1 : réécriture de 6 articles (sources : avant/ ; sauvegarde : table articles_backup_20261007).',
  '-- Les slugs NE CHANGENT PAS : le déclencheur trigger_auto_slug (qui recalcule le slug quand le titre change)',
  '-- est désactivé le temps de la mise à jour, puis réactivé dans la même transaction.',
  '-- À coller en entier dans Supabase > SQL Editor > Run (projet NovaZen).',
  '', 'begin;', '', 'alter table public.articles disable trigger trigger_auto_slug;', '',
];
let bad = false;
for (const it of items) {
  const meta = JSON.parse(fs.readFileSync(`avant/${it.n}.meta.json`, 'utf8'));
  const html = fs.readFileSync(`apres/${it.n}.html`, 'utf8');
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const hits = [...new Set((text.match(new RegExp(BAN.source, 'gi')) || []))];
  const lens = { title: it.title.length, meta: it.meta.length, excerpt: it.excerpt.length };
  console.log(it.n.padEnd(22), words + ' mots', '| titre', lens.title, '| meta', lens.meta, '| mots suspects:', hits.join(', ') || 'aucun');
  const okHits = hits.filter((h) => !/^(garantie|Paul)$/i.test(h));
  if (words < 900 || it.meta.length > 160 || okHits.length) bad = true;
  fs.writeFileSync(`apres/${it.n}.json`, JSON.stringify({ slug: meta.slug, title: it.title, excerpt: it.excerpt, meta_description: it.meta, seo_description: it.meta, content: html }, null, 2));
  const q = (s) => `$q$${s}$q$`;
  sql.push(`update public.articles set`, `title = ${q(it.title)},`, `excerpt = ${q(it.excerpt)},`, `meta_description = ${q(it.meta)},`, `seo_description = ${q(it.meta)},`, `updated_at = now(),`, `content = ${q(html)}`, `where id = '${meta.id}' and slug = '${meta.slug}';`, '');
}
sql.push('alter table public.articles enable trigger trigger_auto_slug;', '',
  '-- Vérification : 6 lignes, slugs inchangés, nouveaux titres',
  `select slug, title, length(content) as caracteres from public.articles where id in (${items.map(i => `'${JSON.parse(fs.readFileSync(`avant/${i.n}.meta.json`, 'utf8')).id}'`).join(',')});`, '', 'commit;');
fs.writeFileSync('METTRE-A-JOUR-LE-LOT-1.sql', sql.join('\n'));
console.log(bad ? '\n⚠ à corriger' : '\nOK');
