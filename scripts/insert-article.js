#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, '..', '.env') });

// Credentials Supabase (utiliser SERVICE_ROLE_KEY pour contourner les RLS)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Lire le JSON
const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error('❌ Chemin du JSON requis');
  process.exit(1);
}

console.log(`\n📖 Lecture de ${jsonPath}...\n`);
const articleData = JSON.parse(readFileSync(jsonPath, 'utf-8'));

// Préparer la ligne pour Supabase
const article = {
  title: articleData.title,
  content: articleData.content,
  excerpt: articleData.excerpt,
  author: 'Alain Zenatti',
  categories: articleData.categories || [articleData.category],
  tags: articleData.tags || [],
  published: false, // Toujours en brouillon
  featured: false,
  slug: articleData.slug,
  category: articleData.category,
  keywords: articleData.keywords || [],
  meta_description: articleData.meta_description || '',
  read_time: articleData.read_time || 5,
  seo_description: articleData.seo_description || '',
  faq: articleData.faq,
  image_url: null,
  storage_image_url: null,
  scheduled_for: null,
  published_at: null
};

console.log('═══════════════════════════════════════════════');
console.log(`✍️  ${articleData.title}`);
console.log('═══════════════════════════════════════════════');
console.log(`Slug: ${article.slug}`);
console.log(`Catégorie: ${article.category}`);
console.log(`Tags: ${article.tags.join(', ')}`);
console.log(`État: BROUILLON (published=false)\n`);

// Insérer dans Supabase
(async () => {
  try {
    console.log('Insertion dans Supabase...\n');

    const { data, error } = await supabase
      .from('articles')
      .insert(article)
      .select('id, slug, title, published')
      .single();

    if (error) {
      throw new Error(`Erreur Supabase: ${error.message}`);
    }

    console.log('✅ Article inséré avec succès!\n');
    console.log('📊 Détails:');
    console.log(`  ID: ${data.id}`);
    console.log(`  Slug: ${data.slug}`);
    console.log(`  Titre: ${data.title}`);
    console.log(`  État: ${data.published ? 'PUBLIÉ' : 'BROUILLON'}`);
    console.log('\n🔗 Admin blog: https://novahypnose.fr/admin-blog/login');
    console.log(`📄 Visualiser: https://novahypnose.fr/blog/${data.slug}\n`);

    process.exit(0);
  } catch (error) {
    console.error(`\n❌ Erreur: ${error.message}\n`);
    process.exit(1);
  }
})();
