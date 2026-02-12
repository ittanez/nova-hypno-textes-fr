#!/usr/bin/env node

/**
 * Agent de génération d'articles d'hypnothérapie
 *
 * Usage :
 *   node scripts/generate-article.js "La peur de parler en public"
 *   node scripts/generate-article.js "L'hypnose et le deuil" --publish
 *   node scripts/generate-article.js "Sujet" --schedule "2026-03-01"
 *   node scripts/generate-article.js "Sujet" --image photo.webp
 *   node scripts/generate-article.js --from-json article.json --image photo.webp
 *
 * Options :
 *   --publish              Publier immédiatement (sinon brouillon)
 *   --schedule "YYYY-MM-DD" Planifier la publication à cette date
 *   --image fichier.webp   Uploader l'image dans Supabase Storage
 *   --from-json fichier    Importer depuis un fichier JSON (pas besoin de clé API)
 *
 * Prérequis :
 *   - VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env
 *   - ANTHROPIC_API_KEY dans .env (sauf --from-json)
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const STORAGE_BUCKET = 'blog_images';
const STORAGE_BASE_URL = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}`;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY requis dans .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ═══════════════════════════════════════════════════════════════════════
// ARGUMENTS
// ═══════════════════════════════════════════════════════════════════════

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {
    publish: false,
    schedule: null,
    imagePath: null,
    fromJson: null,
    topic: ''
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--publish') {
      opts.publish = true;
    } else if (args[i] === '--schedule' && args[i + 1]) {
      opts.schedule = args[++i];
    } else if (args[i] === '--image' && args[i + 1]) {
      opts.imagePath = args[++i];
    } else if (args[i] === '--from-json' && args[i + 1]) {
      opts.fromJson = args[++i];
    } else if (!args[i].startsWith('--')) {
      opts.topic += (opts.topic ? ' ' : '') + args[i];
    }
  }

  return opts;
}

// ═══════════════════════════════════════════════════════════════════════
// PROMPT DE GENERATION
// ═══════════════════════════════════════════════════════════════════════

function buildPrompt(topic) {
  return `Vous êtes hypnothérapeute expert certifié. Votre mission est de rédiger un article de blog sur : "${topic}"

Adressez-vous à un public curieux de l'hypnose, allant du débutant au passionné, sans jargon inutile dans un langage parlé.

L'article doit être un contenu mixte : à la fois accessible (vulgarisation) et informatif (expertise), pour convenir à un lectorat varié.

Vous pouvez, si besoin, orienter l'article vers une tonalité secondaire : pédagogique, thérapeutique ou promotionnelle, selon le contexte ou l'objectif du contenu. Montrez que je suis passionné par mon travail.

## Ton et perspective :

Première personne autorisée : Utilisez "je", "mon expérience", "dans ma pratique" pour personnaliser le contenu
Références géographiques : Mentionnez occasionnellement votre localisation parisienne quand c'est pertinent
Signature expertise : Votre identité d'hypnothérapeute (je ne suis pas docteur) du cabinet Marais-Bastille doit transparaître naturellement dans le style

## IMPORTANT : Format de sortie STRICT

Vous DEVEZ retourner un JSON valide et UNIQUEMENT un JSON. Pas de texte avant, pas de texte après, pas de markdown.

Le JSON doit suivre exactement cette structure :

{
  "title": "Titre principal accrocheur intégrant le mot-clé principal",
  "seo_title": "Titre SEO court (60 caractères max)",
  "slug": "slug-url-friendly-sans-accents",
  "meta_description": "Méta-description de 140 caractères max avec mot-clé principal",
  "seo_description": "Description SEO alternative",
  "excerpt": "Extrait court de 50-60 mots captivant l'essence du contenu",
  "category": "Une catégorie parmi la liste autorisée",
  "categories": ["Même catégorie unique"],
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "keywords": ["mot-cle1", "mot-cle2", "mot-cle3"],
  "read_time": 5,
  "content": "<style>CSS intégré</style><article class='article-hypnose'>HTML complet de l'article</article>",
  "faq": [
    { "question": "Question 1 ?", "answer": "Réponse détaillée 1." },
    { "question": "Question 2 ?", "answer": "Réponse détaillée 2." },
    { "question": "Question 3 ?", "answer": "Réponse détaillée 3." },
    { "question": "Question 4 ?", "answer": "Réponse détaillée 4." },
    { "question": "Question 5 ?", "answer": "Réponse détaillée 5." }
  ],
  "image_prompt": "Description détaillée pour générer l'image avec une IA",
  "image_alt": "Texte alternatif de l'image incluant le mot-clé"
}

## Directives pour le contenu :

### Contenu HTML (champ "content")
- 800-1200 mots pour un SEO optimal
- Utilisez des sous-titres H2 et H3
- Intégrez le mot-clé principal dans le titre, la première phrase, et au moins un sous-titre
- Densité mot-clé : 1-2% (naturelle)
- Utilisez des métaphores, un brin d'humour
- Exemples de clients anonymisés issus de votre pratique parisienne
- En tant qu'Alain Zenatti, référencez naturellement le Cabinet Le Marais-Bastille
- Mentionnez 2-3 études scientifiques (sources citées sans liens)
- Note d'auteur en fin : "Cabinet Le Marais-Bastille https://novahypnose.fr"
- Incluez les CSS classes : .article-hypnose, .intro-section, .highlight-box, .technique-box, .exercise-box, .warning-box, .author-note

Le CSS intégré au début du content :
<style>
.article-hypnose { max-width: 100%; line-height: 1.6; color: #333; font-family: inherit; }
.article-hypnose h1 { color: #2c3e50; font-size: 2.2rem; margin-bottom: 1rem; text-align: center; }
.article-hypnose h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 2rem; }
.article-hypnose h3 { color: #2980b9; margin-top: 1.5rem; }
.article-hypnose .intro-section { font-size: 1.1rem; color: #555; font-style: italic; margin-bottom: 2rem; text-align: center; }
.article-hypnose .highlight-box { background: #f8f9fa; border-left: 4px solid #3498db; padding: 15px; margin: 20px 0; border-radius: 3px; }
.article-hypnose .technique-box { background: #e8f4fd; border: 1px solid #3498db; padding: 20px; margin: 20px 0; border-radius: 8px; }
.article-hypnose .exercise-box { background: #f0f8e8; border: 1px solid #27ae60; padding: 20px; margin: 20px 0; border-radius: 8px; }
.article-hypnose .warning-box { background: #fef5e7; border: 1px solid #f39c12; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #f39c12; }
.article-hypnose .author-note { background: #ecf0f1; padding: 15px; border-radius: 5px; margin-top: 2rem; text-align: center; font-size: 0.9rem; }
.article-hypnose blockquote { border-left: 3px solid #3498db; padding-left: 15px; margin: 20px 0; font-style: italic; color: #666; }
.article-hypnose p { margin-bottom: 1rem; }
.article-hypnose ul, .article-hypnose ol { margin: 1rem 0; padding-left: 2rem; }
.article-hypnose li { margin-bottom: 0.5rem; }
</style>

### FAQ (champ "faq")
- 5 questions-réponses en rapport direct avec le sujet
- Questions que les lecteurs poseraient sur Google
- 50-120 mots par réponse
- Mentionnez Paris/Bastille/NovaHypnose dans 2-3 réponses
- Données concrètes : nombre de séances, durée, résultats

### Catégories autorisées (choisir UNE seule) :
- Hypnose thérapeutique
- Métaphores & langage symbolique
- Gestion des émotions & bien-être
- Gestion du Stress
- Approches complémentaires
- Hypnose ericksonienne & neurosciences
- Techniques d'induction & scripts
- Auto-hypnose & pratiques personnelles
- Spiritualité & hypnose

### Slug
Format URL-friendly : minuscules, traits d'union, sans accents. Exemple : "hypnose-peur-parler-public"

RAPPEL : Retournez UNIQUEMENT le JSON, rien d'autre.`;
}

// ═══════════════════════════════════════════════════════════════════════
// APPEL API CLAUDE
// ═══════════════════════════════════════════════════════════════════════

function callClaudeAPI(prompt) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }]
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Claude API HTTP ${res.statusCode}: ${data}`));
          return;
        }
        try {
          const response = JSON.parse(data);
          const text = response.content[0].text;
          resolve(text);
        } catch (e) {
          reject(new Error(`Erreur parsing réponse Claude: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ═══════════════════════════════════════════════════════════════════════
// UPLOAD IMAGE DANS SUPABASE STORAGE
// ═══════════════════════════════════════════════════════════════════════

async function uploadImage(imagePath, slug) {
  if (!existsSync(imagePath)) {
    throw new Error(`Image introuvable : ${imagePath}`);
  }

  const ext = path.extname(imagePath).toLowerCase();
  const mimeTypes = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.avif': 'image/avif'
  };

  const contentType = mimeTypes[ext] || 'image/webp';
  const fileName = `${slug}${ext}`;
  const fileBuffer = readFileSync(imagePath);

  console.log(`Upload image : ${imagePath} -> ${STORAGE_BUCKET}/${fileName}`);

  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, fileBuffer, {
      contentType,
      upsert: true
    });

  if (error) {
    throw new Error(`Erreur upload image: ${error.message}`);
  }

  const publicUrl = `${STORAGE_BASE_URL}/${fileName}`;
  console.log(`Image uploadee : ${publicUrl}\n`);
  return publicUrl;
}

// ═══════════════════════════════════════════════════════════════════════
// PARSING ET VALIDATION
// ═══════════════════════════════════════════════════════════════════════

function parseArticleJSON(text) {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```\s*$/, '');
  cleaned = cleaned.replace(/^```\s*/i, '').replace(/\s*```\s*$/, '');

  const article = JSON.parse(cleaned);

  const required = ['title', 'slug', 'content', 'excerpt', 'category', 'faq'];
  for (const field of required) {
    if (!article[field]) {
      throw new Error(`Champ requis manquant : ${field}`);
    }
  }

  if (!Array.isArray(article.faq) || article.faq.length < 3) {
    throw new Error(`FAQ invalide : ${article.faq?.length || 0} entrées (minimum 3)`);
  }

  return article;
}

// ═══════════════════════════════════════════════════════════════════════
// INSERTION SUPABASE
// ═══════════════════════════════════════════════════════════════════════

async function insertArticle(article, opts) {
  const now = new Date().toISOString();

  const row = {
    title: article.title,
    content: article.content,
    excerpt: article.excerpt,
    author: 'Alain Zenatti',
    categories: article.categories || [article.category],
    tags: article.tags || [],
    published: opts.publish,
    featured: false,
    slug: article.slug,
    category: article.category,
    keywords: article.keywords || [],
    meta_description: article.meta_description || '',
    read_time: article.read_time || 5,
    seo_description: article.seo_description || '',
    faq: article.faq,
    image_url: opts.imageUrl || null,
    storage_image_url: opts.imageUrl || null,
    scheduled_for: opts.schedule ? new Date(opts.schedule + 'T09:00:00+01:00').toISOString() : null,
    published_at: opts.publish ? now : null
  };

  const { data, error } = await supabase
    .from('articles')
    .insert(row)
    .select('id, slug, title, published, scheduled_for')
    .single();

  if (error) {
    throw new Error(`Erreur Supabase: ${error.message}`);
  }

  return data;
}

// ═══════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════

async function main() {
  const opts = parseArgs();

  // Validation des arguments
  if (!opts.fromJson && !opts.topic) {
    console.log('Usage :');
    console.log('  node scripts/generate-article.js "Sujet de l\'article"');
    console.log('  node scripts/generate-article.js "Sujet" --publish');
    console.log('  node scripts/generate-article.js "Sujet" --schedule "2026-03-01"');
    console.log('  node scripts/generate-article.js "Sujet" --image photo.webp');
    console.log('  node scripts/generate-article.js --from-json article.json');
    console.log('  node scripts/generate-article.js --from-json article.json --image photo.webp --schedule "2026-03-01"');
    process.exit(1);
  }

  if (opts.schedule) {
    const date = new Date(opts.schedule);
    if (isNaN(date.getTime())) {
      console.error(`Date invalide : ${opts.schedule} (format attendu : YYYY-MM-DD)`);
      process.exit(1);
    }
  }

  let article;

  if (opts.fromJson) {
    // Mode import JSON
    console.log(`Import depuis ${opts.fromJson}...\n`);
    const raw = readFileSync(opts.fromJson, 'utf-8');
    article = parseArticleJSON(raw);
  } else {
    // Mode génération avec Claude API
    if (!ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY requis dans .env');
      console.error('Obtenez une cle sur https://console.anthropic.com');
      console.error('\nAlternative : utilisez --from-json pour importer un article');
      process.exit(1);
    }

    console.log(`Sujet : ${opts.topic}`);
    console.log('Generation de l\'article avec Claude...\n');

    const prompt = buildPrompt(opts.topic);
    const response = await callClaudeAPI(prompt);

    console.log('Reponse recue, parsing...\n');
    article = parseArticleJSON(response);
  }

  // Upload image si fournie
  let imageUrl = null;
  if (opts.imagePath) {
    imageUrl = await uploadImage(opts.imagePath, article.slug);
  }
  opts.imageUrl = imageUrl;

  // Déterminer l'état de publication
  let etat = 'BROUILLON';
  if (opts.publish) {
    etat = 'PUBLIE';
  } else if (opts.schedule) {
    etat = `PLANIFIE pour le ${opts.schedule}`;
  }

  // Afficher un résumé
  console.log('='.repeat(60));
  console.log(`Titre     : ${article.title}`);
  console.log(`Slug      : ${article.slug}`);
  console.log(`Categorie : ${article.category}`);
  console.log(`Tags      : ${(article.tags || []).join(', ')}`);
  console.log(`FAQ       : ${article.faq.length} questions`);
  console.log(`Mots      : ~${Math.round(article.content.replace(/<[^>]*>/g, '').split(/\s+/).length)} mots`);
  console.log(`Image     : ${imageUrl || 'aucune'}`);
  console.log(`Etat      : ${etat}`);
  console.log('='.repeat(60));

  // Extrait
  console.log(`\nExtrait : ${article.excerpt}\n`);

  // FAQ preview
  console.log('FAQ :');
  article.faq.forEach((f, i) => {
    console.log(`  ${i + 1}. ${f.question}`);
  });

  // Prompt image si pas d'image fournie
  if (!imageUrl && article.image_prompt) {
    console.log(`\nPrompt image (pour generation IA) :`);
    console.log(`  ${article.image_prompt}`);
    console.log(`  Alt: ${article.image_alt || ''}`);
  }

  // Insertion dans Supabase
  console.log('\nInsertion dans Supabase...');
  const result = await insertArticle(article, opts);
  console.log(`\nArticle insere avec succes !`);
  console.log(`  ID       : ${result.id}`);
  console.log(`  Slug     : ${result.slug}`);
  console.log(`  URL      : https://novahypnose.fr/blog/article/${result.slug}`);
  console.log(`  Etat     : ${etat}`);
  if (opts.schedule) {
    console.log(`  Planifie : ${result.scheduled_for}`);
  }
  if (!imageUrl) {
    console.log(`\n  Pour ajouter une image plus tard :`);
    console.log(`  node scripts/generate-article.js --from-json article.json --image photo.webp`);
    console.log(`  ou via l'admin : https://novahypnose.fr/admin/blog/edit/${result.slug}`);
  }
}

main().catch((err) => {
  console.error('\nErreur:', err.message);
  process.exit(1);
});
