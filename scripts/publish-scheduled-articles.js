#!/usr/bin/env node

/**
 * Auto-publish scheduled articles
 * Publie automatiquement les articles dont la date scheduled_for est atteinte
 *
 * Usage:
 *   node scripts/publish-scheduled-articles.js
 *
 * Cron (toutes les heures):
 *   0 * * * * cd /path/to/project && node scripts/publish-scheduled-articles.js
 */

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, '..', '.env') });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant dans .env');
  process.exit(1);
}

// Utiliser SERVICE_ROLE_KEY pour contourner RLS
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function publishScheduledArticles() {
  console.log(`\n⏰ Vérification des articles programmés... [${new Date().toISOString()}]\n`);

  try {
    // Trouver les articles programmés à publier
    const now = new Date().toISOString();

    const { data: scheduledArticles, error: fetchError } = await supabase
      .from('articles')
      .select('id, title, slug, scheduled_for')
      .eq('published', false)
      .not('scheduled_for', 'is', null)
      .lte('scheduled_for', now);

    if (fetchError) {
      throw new Error(`Erreur Supabase (fetch): ${fetchError.message}`);
    }

    if (!scheduledArticles || scheduledArticles.length === 0) {
      console.log('✅ Aucun article à publier pour le moment.\n');
      return;
    }

    console.log(`📋 ${scheduledArticles.length} article(s) à publier:\n`);

    // Publier chaque article
    for (const article of scheduledArticles) {
      const { error: updateError } = await supabase
        .from('articles')
        .update({
          published: true,
          published_at: new Date().toISOString()
        })
        .eq('id', article.id);

      if (updateError) {
        console.error(`  ❌ ${article.slug}: ${updateError.message}`);
      } else {
        console.log(`  ✅ ${article.slug}`);
        console.log(`     Titre: ${article.title}`);
        console.log(`     Programmé pour: ${article.scheduled_for}`);
        console.log(`     Publié à: ${new Date().toISOString()}\n`);
      }
    }

    console.log(`\n✅ Tâche terminée! ${scheduledArticles.length} article(s) publié(s).\n`);

  } catch (error) {
    console.error(`\n❌ Erreur: ${error.message}\n`);
    process.exit(1);
  }
}

// Exécuter
publishScheduledArticles();
