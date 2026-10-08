// Exporte des articles (par début de titre) vers <dossier>/avant : un .html + un .meta.json par article.
// Usage : node exporter-lot.mjs <dossier> "<début titre 1>" "<début titre 2>" ...
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import fs from 'node:fs';
config({ path: new URL('../../.env', import.meta.url) });
const sb = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const [dir, ...debuts] = process.argv.slice(2);
const { data } = await sb.from('articles').select('*').eq('published', true);
fs.mkdirSync(`${dir}/avant`, { recursive: true });
debuts.forEach((d, i) => {
  const hits = data.filter((a) => a.title.trim().toLowerCase().startsWith(d.toLowerCase()));
  if (hits.length !== 1) { console.error(`✗ "${d}" : ${hits.length} résultat(s)`); return; }
  const a = hits[0], n = `${i + 1}-${a.slug.slice(0, 28).replace(/-+$/, '')}`;
  fs.writeFileSync(`${dir}/avant/${n}.html`, a.content);
  fs.writeFileSync(`${dir}/avant/${n}.meta.json`, JSON.stringify({ id: a.id, slug: a.slug, title: a.title, excerpt: a.excerpt, meta_description: a.meta_description, seo_description: a.seo_description, categories: a.categories, tags: a.tags, read_time: a.read_time }, null, 2));
  console.log(n, '|', a.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, 'mots');
});
