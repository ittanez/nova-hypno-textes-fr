#!/usr/bin/env node

/**
 * Met à jour le contenu d'un article existant dans Supabase depuis un fichier JSON.
 *
 * Usage :
 *   node scripts/update-article-content.js autophobie-update.json
 *   node scripts/update-article-content.js autophobie-update.json --dry-run
 *
 * Options :
 *   --dry-run   Affiche ce qui serait mis à jour sans toucher la base de données
 *
 * Prérequis :
 *   - VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env
 *   - Le fichier JSON doit contenir au minimum : slug, content
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY requis dans .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const args = process.argv.slice(2);
const jsonFile = args.find(a => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');

if (!jsonFile) {
  console.log('Usage :');
  console.log('  node scripts/update-article-content.js <fichier.json>');
  console.log('  node scripts/update-article-content.js <fichier.json> --dry-run');
  process.exit(1);
}

// Lecture du fichier JSON
const raw = readFileSync(path.resolve(jsonFile), 'utf-8');
const updates = JSON.parse(raw);

if (!updates.slug) {
  console.error('Le fichier JSON doit contenir un champ "slug"');
  process.exit(1);
}

// Recherche de l'article existant
console.log(`Recherche de l'article avec le slug : ${updates.slug}`);
const { data: existing, error: fetchError } = await supabase
  .from('articles')
  .select('id, title, slug, published')
  .eq('slug', updates.slug)
  .single();

if (fetchError) {
  console.error('Erreur lors de la recherche :', fetchError.message);
  process.exit(1);
}

if (!existing) {
  console.error(`Article introuvable avec le slug : ${updates.slug}`);
  process.exit(1);
}

console.log(`Article trouvé :`);
console.log(`  ID    : ${existing.id}`);
console.log(`  Titre : ${existing.title}`);
console.log(`  Slug  : ${existing.slug}`);
console.log(`  Publié: ${existing.published}`);

// Construire l'objet de mise à jour (on ne modifie que les champs présents dans le JSON)
const updateFields = {};
const updatableFields = [
  'title', 'seo_title', 'content', 'excerpt', 'meta_description',
  'seo_description', 'category', 'categories', 'tags', 'keywords',
  'read_time', 'faq'
];

for (const field of updatableFields) {
  if (updates[field] !== undefined) {
    updateFields[field] = updates[field];
  }
}

updateFields.updated_at = new Date().toISOString();

// Calcul du nombre de mots
const wordCount = updateFields.content
  ? updateFields.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length
  : 0;

console.log(`\nChamps à mettre à jour : ${Object.keys(updateFields).join(', ')}`);
console.log(`Nombre de mots (contenu) : ~${wordCount}`);
console.log(`FAQ : ${updateFields.faq?.length || 0} questions`);

if (dryRun) {
  console.log('\n[DRY-RUN] Aucune modification effectuée.');
  process.exit(0);
}

// Mise à jour dans Supabase
console.log('\nMise à jour dans Supabase...');
const { error: updateError } = await supabase
  .from('articles')
  .update(updateFields)
  .eq('id', existing.id);

if (updateError) {
  console.error('Erreur lors de la mise à jour :', updateError.message);
  process.exit(1);
}

console.log('\nArticle mis à jour avec succès !');
console.log(`  URL : https://novahypnose.fr/blog/article/${existing.slug}`);
console.log(`  Mots : ~${wordCount}`);
