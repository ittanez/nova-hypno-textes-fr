#!/usr/bin/env node

/**
 * Applique une série de réécritures d'articles (fichiers JSON) dans Supabase, avec sauvegarde et vérification.
 *
 * Usage :
 *   node scripts/apply-article-updates.js docs/audit-blog-2026-10/lot-1/apres --dry-run
 *   node scripts/apply-article-updates.js docs/audit-blog-2026-10/lot-1/apres
 *
 * Chaque fichier .json du dossier doit contenir : slug, et au choix title, excerpt, meta_description,
 * seo_description, content, faq (tableau de {question, answer}). L'article est retrouvé par son slug, qui ne change JAMAIS.
 *
 * Sécurité :
 *   - avant toute écriture, la ligne complète de chaque article est sauvegardée dans
 *     docs/audit-blog-2026-10/sauvegardes/<horodatage>/<slug>.json ;
 *   - après l'écriture, le slug est relu : s'il a changé (déclencheur auto_generate_slug), il est remis
 *     tout de suite à sa valeur d'origine ;
 *   - --dry-run n'écrit rien.
 *
 * Prérequis : SUPABASE_SERVICE_ROLE_KEY et VITE_SUPABASE_URL dans .env (clé à droits complets : ne jamais
 * la committer ni l'afficher). Le .env est suivi par git dans ce dépôt : voir la note de mémoire correspondante.
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, '..', '.env') });

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('VITE_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY requis dans .env');
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const dir = args.find((a) => !a.startsWith('--'));
if (!dir) {
  console.error('Usage : node scripts/apply-article-updates.js <dossier-de-json> [--dry-run]');
  process.exit(1);
}

const FIELDS = ['title', 'excerpt', 'meta_description', 'seo_description', 'content', 'faq'];
const files = readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
if (!files.length) {
  console.error(`Aucun .json dans ${dir}`);
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const backupDir = path.resolve(__dirname, '..', 'docs', 'audit-blog-2026-10', 'sauvegardes', stamp);
const words = (html) => html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;

let failures = 0;
console.log(`${dryRun ? '[DRY-RUN] ' : ''}${files.length} article(s) depuis ${dir}\n`);

for (const file of files) {
  const update = JSON.parse(readFileSync(path.join(dir, file), 'utf-8'));
  const fields = Object.fromEntries(FIELDS.filter((f) => update[f] !== undefined).map((f) => [f, update[f]]));

  if (!update.slug || Object.keys(fields).length === 0) {
    console.error(`✗ ${file} : slug et au moins un champ à mettre à jour obligatoires`);
    failures++;
    continue;
  }

  const { data: row, error } = await supabase.from('articles').select('*').eq('slug', update.slug).single();
  if (error || !row) {
    console.error(`✗ ${file} : article introuvable (${error?.message ?? 'aucune ligne'})`);
    failures++;
    continue;
  }

  console.log(`• ${update.slug.slice(0, 70)}`);
  console.log(`  ${words(row.content)} mots → ${words(fields.content ?? row.content)} mots | titre : ${fields.title ?? '(inchangé)'} | champs : ${Object.keys(fields).join(', ')}`);
  if (dryRun) continue;

  mkdirSync(backupDir, { recursive: true });
  writeFileSync(path.join(backupDir, `${update.slug.slice(0, 120)}.json`), JSON.stringify(row, null, 2));

  const { error: upErr } = await supabase
    .from('articles')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', row.id);
  if (upErr) {
    console.error(`  ✗ écriture refusée : ${upErr.message}`);
    failures++;
    continue;
  }

  // Vérification : le slug doit être resté identique
  let { data: after } = await supabase.from('articles').select('slug, title, content, faq').eq('id', row.id).single();
  if (after.slug !== row.slug) {
    console.warn(`  ⚠ le slug a changé (${after.slug}) : remise de l'original`);
    const { error: fixErr } = await supabase.from('articles').update({ slug: row.slug }).eq('id', row.id);
    if (fixErr) {
      console.error(`  ✗ IMPOSSIBLE de restaurer le slug : ${fixErr.message}`);
      failures++;
      continue;
    }
    ({ data: after } = await supabase.from('articles').select('slug, title, content, faq').eq('id', row.id).single());
  }
  const norm = (f) => JSON.stringify((f || []).map((q) => [q.question, q.answer]));
  const ok = after.slug === row.slug && (fields.content === undefined || after.content === fields.content) && (!fields.title || after.title === fields.title) && (fields.faq === undefined || norm(after.faq) === norm(fields.faq));
  console.log(ok ? '  ✓ écrit et vérifié' : '  ✗ la relecture ne correspond pas');
  if (!ok) failures++;
}

console.log(failures ? `\n${failures} échec(s).` : dryRun ? '\n[DRY-RUN] aucune modification.' : `\nTerminé. Sauvegardes : ${backupDir}`);
process.exit(failures ? 1 : 0);
