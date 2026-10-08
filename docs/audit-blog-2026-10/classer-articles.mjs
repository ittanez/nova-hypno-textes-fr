// Classe les articles publiés par nombre de problèmes de contenu (lecture seule).
// Usage : node docs/audit-blog-2026-10/classer-articles.mjs > docs/audit-blog-2026-10/classement.md
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: new URL('../../.env', import.meta.url) });
const sb = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

import fs from 'node:fs';
const FAIT = new Set(JSON.parse(fs.readFileSync(new URL('./traites.json', import.meta.url), 'utf8')));

const PRENOMS = 'Sophie|Marc|Sarah|Thomas|Marie|Julie|Pierre|Claire|Laura|Nicolas|Paul|Emma|Lucas|Camille|Lucie|Émilie|Antoine|Isabelle|Karim|Léa|Julien|Céline|David|Nathalie|Alexandre|Caroline|Vincent|Sandrine|Philippe|Anne|Jean|Mathieu|Éric|Stéphanie|Laurent|Valérie|Hugo|Chloé|Manon|Jérôme|Sylvie|Patrick|Delphine|Olivier|Aurélie|Bruno|Florence';
const CRITERES = [
  ['prénom + âge/profession', new RegExp(`\b(${PRENOMS})\b[ ,]+(\d{2} ans|,? (?:une|un|cadre|ingénieur|avocat|enseignant|infirmi|chef|dirigeant|architecte|consultant|étudiant|retraité|mère|père))`, 'g'), 5],
  ['prénom seul', new RegExp(`\b(${PRENOMS})\b`, 'g'), 1],
  ['client(e)/patient(e) cité(e)', /\b(une cliente|un client|ma cliente|mon client|une patiente|un patient|mes clients me|mes patients me|l'un de mes clients|une de mes clientes)\b/gi, 3],
  ['étude / organisme', /\b(INSERM|CNRS|Universit[ée]|Harvard|Stanford|Oxford|selon une étude|une étude|des études|étude menée|recherches? (?:de|menée|publiée)|Dr\.? [A-Z][a-zé]+|Pr\.? [A-Z][a-zé]+)\b/g, 3],
  ['pourcentage', /\b\d{1,3} ?%/g, 2],
  ['garantie / offerte', /\b(garantie|garantis?|séance offerte|4e séance|remboursé)\b/gi, 4],
  ['promesse de résultat', /(résultats? (?:durables?|rapides?|garantis?|spectaculaires?)|en \d+(?: à \d+)? séances?|guérison|guérir|disparaît|définitivement|miracul|révolution)/gi, 3],
  ['apostrophes doublées', /''/g, 1],
];
const TITRE_PROMESSE = /(changent? tout|va vous surprendre|efficace|en \d+ séances?|secret|miracle|révolution|définitivement|garanti|guérir|incroyable|que tous mes)/i;

const { data, error } = await sb.from('articles').select('slug,title,content,published_at').eq('published', true);
if (error) throw error;
const lignes = [];
for (const a of data) {
  if (FAIT.has(a.slug)) continue;
  const texte = a.content.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ');
  let score = 0; const detail = [];
  for (const [nom, re, poids] of CRITERES) {
    const n = (texte.match(re) || []).length;
    if (n) { score += Math.min(n, 6) * poids; detail.push(`${nom} ×${n}`); }
  }
  if (TITRE_PROMESSE.test(a.title)) { score += 6; detail.push('titre à promesse'); }
  lignes.push({ score, slug: a.slug, title: a.title, mots: texte.split(/\s+/).filter(Boolean).length, detail, date: (a.published_at || '').slice(0, 10) });
}
lignes.sort((x, y) => y.score - x.score);
console.log(`# Classement des articles à corriger (${lignes.length} restants)\n`);
console.log('| # | score | mots | date | article | problèmes repérés |\n|---|---|---|---|---|---|');
lignes.forEach((l, i) => console.log(`| ${i + 1} | ${l.score} | ${l.mots} | ${l.date} | ${l.title.replace(/\|/g, '/')} | ${l.detail.join(', ') || '—'} |`));
