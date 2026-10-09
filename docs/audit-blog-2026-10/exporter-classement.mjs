// Exporte dans <dossier>/avant les articles du classement.md (rangs donnés), dans l'ordre.
// Usage : node exporter-classement.mjs lot-4 "1-5,7-51"
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import fs from 'node:fs';
config({ path: new URL('../../.env', import.meta.url) });
const sb = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const [dir, spec] = process.argv.slice(2);
const ranks = spec.split(',').flatMap((p) => { const [a, b] = p.split('-').map(Number); return b ? Array.from({ length: b - a + 1 }, (_, i) => a + i) : [a]; });
const rows = fs.readFileSync('classement.md', 'utf8').split('\n').filter((l) => /^\| \d+ \|/.test(l)).map((l) => { const c = l.split('|').map((s) => s.trim()); return { rang: +c[1], titre: c[5] }; });
const { data } = await sb.from('articles').select('*').eq('published', true);
fs.mkdirSync(`${dir}/avant`, { recursive: true });
const norm = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
let i = 0;
for (const r of ranks) {
  const row = rows.find((x) => x.rang === r);
  const hits = data.filter((a) => norm(a.title.replace(/\|/g, '/')) === norm(row.titre));
  if (hits.length !== 1) { console.error(`✗ rang ${r} "${row.titre.slice(0, 40)}" : ${hits.length}`); continue; }
  const a = hits[0]; i++;
  const n = `${i}-${a.slug.slice(0, 28).replace(/-+$/, '')}`;
  fs.writeFileSync(`${dir}/avant/${n}.html`, a.content);
  fs.writeFileSync(`${dir}/avant/${n}.meta.json`, JSON.stringify({ id: a.id, slug: a.slug, title: a.title, excerpt: a.excerpt, meta_description: a.meta_description, seo_description: a.seo_description, categories: a.categories, tags: a.tags, read_time: a.read_time }, null, 2));
  console.log(n, '|', a.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'mots');
}
