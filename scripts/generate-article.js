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
 *   --force                Publier malgré les alertes du contrôle qualité (à vos risques)
 *
 * Contrôle qualité : le texte est audité (faux clients, études douteuses, promesses, longueur).
 *   Si des problèmes sont détectés, l'article est enregistré en BROUILLON même avec --publish,
 *   sauf si vous ajoutez --force après relecture.
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
    force: false,
    topic: ''
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--publish') {
      opts.publish = true;
    } else if (args[i] === '--force') {
      opts.force = true;
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
  return `Vous rédigez un article de blog pour Alain Zenatti, hypnothérapeute (il n'est ni médecin ni psychologue) au Cabinet Le Marais-Bastille à Paris. Sujet : "${topic}"

Public : personnes curieuses de l'hypnose, du débutant au passionné, langage clair et chaleureux, sans jargon inutile.

## Ton et perspective
- Première personne autorisée ("je") pour parler de la manière de travailler, jamais pour raconter des faits non vérifiables.
- Mentionnez Paris / Bastille avec parcimonie.
- Le ton est honnête et nuancé : on explique, on ne vend pas. L'article peut inviter, en fin de texte, à prendre rendez-vous pour un premier échange, avec cette idée : "je vous dirai honnêtement si l'hypnose me semble adaptée à votre situation".

## RÈGLES DE VÉRITÉ (impératives, elles priment sur le style)
1. AUCUN client, patient ou témoignage, même "anonymisé" ou "prénom modifié". N'inventez ni prénom, ni âge, ni métier, ni citation de client. Si un exemple est utile, présentez-le comme une situation fréquente, sans personnage ("Prenons une personne qui…").
2. AUCUNE étude, statistique, pourcentage, taille d'effet, organisme ou chercheur que vous n'êtes pas certain à 100 % d'avoir correctement cité (auteurs, année, revue). En cas de doute : n'en citez pas. N'attribuez jamais une étude à l'INSERM, à une université ou à un institut sans certitude. Mieux vaut "les études sont peu nombreuses" qu'une référence inventée.
3. AUCUNE promesse absolue : pas de "garanti", "100 %", "définitif", "pour toujours", "efficace à X %", pas de "reprogrammer l'inconscient". "Durable" ou "rapide" est permis seulement comme objectif visé ("changements durables visés"), jamais comme certitude. Un repère de "3 à 5 premières séances" est permis uniquement dans cette formulation : "Les premiers changements se font en général assez vite, souvent dans les 3 à 5 premières séances, bien sûr le nombre de séances varie selon chacun et je ne peux pas annoncer de résultat." Jamais "résultat en X séances" sans cette nuance. Écrivez "je ne peux pas vous annoncer de résultat ni de nombre de séances".
4. L'hypnose est présentée comme un complément (détente, imagination, entraînement), jamais comme un traitement. Quand une approche mieux étudiée existe (TCC, exposition progressive, EMDR pour le trauma, TCC de l'insomnie, etc.), nommez-la comme approche de référence.
5. Pas de vocabulaire pseudo-scientifique vague ("ondes alpha-thêta", "recâbler le cerveau", "neurones miroirs qui expliquent", "inconscient qui gère 90 % de vos comportements"). Le mot "inconscient" peut être employé comme image, jamais comme un lieu du cerveau.
6. Pas d'affirmation sur le passé professionnel du praticien (années de pratique, nombre de personnes accompagnées) : ne mentionnez aucun chiffre le concernant.
7. Prix, horaires et coordonnées : n'en donnez aucun.
8. Santé : incluez une encadré d'avertissement (warning-box) adapté : quand consulter un médecin ou un psychologue, et, si le sujet touche à la détresse, le 3114 (prévention du suicide, 24 h/24, gratuit). Pour les violences : 3919 ; danger immédiat : 17 ou 112. Ne conseillez jamais d'arrêter ou de modifier un traitement.
9. Ne traitez pas de l'arrêt du tabac.
10. Les exercices (respiration, visualisation, auto-hypnose) sont sûrs, courts, sans rétention de souffle prolongée, avec une consigne d'arrêt en cas de malaise.

## IMPORTANT : Format de sortie STRICT
Vous DEVEZ retourner un JSON valide et UNIQUEMENT un JSON. Pas de texte avant, pas de texte après, pas de markdown.

{
  "title": "Titre clair intégrant le mot-clé principal (75 caractères max), sans promesse",
  "seo_title": "Titre SEO court (60 caractères max)",
  "slug": "slug-url-friendly-sans-accents",
  "meta_description": "Méta-description de 150 caractères max avec mot-clé principal, sans promesse absolue",
  "seo_description": "Même description ou variante",
  "excerpt": "Extrait de 40-60 mots",
  "category": "Une catégorie parmi la liste autorisée",
  "categories": ["Même catégorie unique"],
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "keywords": ["mot-cle1", "mot-cle2", "mot-cle3"],
  "read_time": 6,
  "content": "<article class='article-hypnose'>HTML complet de l'article</article>",
  "faq": [
    { "question": "Question 1 ?", "answer": "Réponse 1." },
    { "question": "Question 2 ?", "answer": "Réponse 2." },
    { "question": "Question 3 ?", "answer": "Réponse 3." },
    { "question": "Question 4 ?", "answer": "Réponse 4." },
    { "question": "Question 5 ?", "answer": "Réponse 5." }
  ],
  "image_prompt": "Description détaillée pour générer l'image avec une IA (sans texte dans l'image)",
  "image_alt": "Texte alternatif de l'image incluant le mot-clé"
}

## Directives pour le contenu HTML (champ "content")
- 900 à 1300 mots.
- Pas de bloc <style> ni de balise <h1> : le style du site s'applique et le titre est affiché par la page.
- Structure : <div class='intro-section'> (3-5 phrases, qui annonce ce que l'article apporte ET ses limites), puis des <h2>/<h3>, puis le texte.
- Intégrez le mot-clé principal dans la première phrase et au moins un sous-titre, naturellement.
- Utilisez, avec mesure, les encadrés : <div class='highlight-box'> (à retenir), <div class='technique-box'>, <div class='exercise-box'> (exercice pas à pas), <div class='warning-box'> (obligatoire, voir règle 8).
- Parlez de ce que l'on sait (ou de ce que l'on ne sait pas), des approches de référence, de ce que l'hypnose peut raisonnablement apporter, de ses limites.
- Terminez par : <div class='author-note'><strong>Alain Zenatti</strong><br>Hypnothérapeute, maître en hypnose ericksonienne<br>Cabinet Le Marais-Bastille https://novahypnose.fr</div>

## FAQ (champ "faq")
- 5 questions que les lecteurs poseraient sur Google, 50 à 100 mots par réponse.
- Sans chiffre inventé. Si la question porte sur le nombre de séances ou la durée, répondez : "Les premiers changements se font en général assez vite, souvent dans les 3 à 5 premières séances, bien sûr le nombre de séances varie selon chacun et je ne peux pas annoncer de résultat."

## Catégories autorisées (choisir UNE seule)
- Hypnose thérapeutique
- Métaphores & langage symbolique
- Gestion des émotions & bien-être
- Gestion du Stress
- Approches complémentaires
- Hypnose ericksonienne & neurosciences
- Techniques d'induction & scripts
- Auto-hypnose & pratiques personnelles
- Spiritualité & hypnose

## Slug
Minuscules, traits d'union, sans accents. Exemple : "hypnose-peur-parler-public"

RAPPEL : retournez UNIQUEMENT le JSON. Relisez-vous avant de répondre : aucune personne inventée, aucune étude douteuse, aucune promesse.`;
}

// ═══════════════════════════════════════════════════════════════════════
// CONTRÔLE QUALITÉ DU TEXTE GÉNÉRÉ (règles de vérité)
// ═══════════════════════════════════════════════════════════════════════

export function auditArticle(article) {
  const issues = [];
  const html = String(article.content || '');
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const all = [text, article.title, article.excerpt, article.meta_description, article.seo_description, JSON.stringify(article.faq || [])].join(' ');
  const words = text.split(' ').filter(Boolean).length;
  if (words < 900) issues.push(`texte trop court : ${words} mots (minimum 900)`);
  if (/<style/i.test(html) || /<h1/i.test(html)) issues.push('bloc <style> ou <h1> présent (le site fournit le style et le titre)');
  if (!/warning-box/.test(html)) issues.push("aucun encadré d'avertissement (warning-box)");
  const rules = [
    [/pr[ée]nom modifi[ée]|appelons[- ](le|la)|une de mes clientes?|un de mes clients?|mes patients?\b|mon client\b|ma cliente\b|t[ée]moignage\b/i, 'client, patient ou témoignage'],
    [/\b(INSERM|CNRS|Sorbonne|Stanford|Harvard|Universit[ée] d[eu']|Institut (fran[cç]ais|national))\b/i, 'organisme ou université cité (à vérifier à la main)'],
    [/\b\d{1,3}(,\d+)? ?% /i, 'pourcentage (à vérifier, ou à retirer)'],
    [/en (une|1) (seule )?séance|\b\d ?(à|-|–) ?\d{1,2} séances?\b(?![^.]{0,160}(varie selon chacun|ne peux pas annoncer))/i, 'nombre de séances annoncé sans nuance'],
    [/garanti|d[ée]finitiv|pour toujours|100 ?%|reprogramm|recâbl|ondes (alpha|th[êe]ta|b[êe]ta)/i, 'promesse ou jargon pseudo-scientifique'],
    [/\b(cinq|5|dix|10) (ans|années) de pratique|depuis 2020|centaines? de (personnes|clients|patients)|des dizaines de (personnes|clients|patients)/i, 'affirmation sur la pratique du praticien'],
    [/arr[êe]t(er)? (du tabac|de fumer)|sevrage tabagique/i, 'sujet tabac (hors périmètre)'],
    [/\b\d{2,3} ?€/i, 'tarif cité (ne pas en donner)'],
  ];
  for (const [re, label] of rules) { const m = all.match(re); if (m) issues.push(`${label} : « ${m[0]} »`); }
  return issues;
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

  // Contrôle qualité du texte
  const issues = auditArticle(article);
  if (issues.length) {
    console.log('\n⚠ CONTRÔLE QUALITÉ : ' + issues.length + ' point(s) à vérifier');
    issues.forEach((i) => console.log('  - ' + i));
    if ((opts.publish || opts.schedule) && !opts.force) {
      console.log("\nPublication/planification annulée : l'article sera enregistré en BROUILLON.");
      console.log("Relisez-le, corrigez-le, puis publiez depuis l'admin (ou relancez avec --force).");
      opts.publish = false;
      opts.schedule = null;
    }
  } else {
    console.log('Contrôle qualité : aucun point détecté.');
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
