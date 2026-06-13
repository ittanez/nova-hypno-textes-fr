#!/usr/bin/env node
/**
 * gbp_stats.js — Statistiques Google Business Profile (90 derniers jours)
 *
 * Usage : node scripts/gbp_stats.js
 *
 * Affiche : vues Maps, vues Search, clics site, appels, itinéraires,
 *           requêtes directes vs indirectes.
 */

import { google } from 'googleapis';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_PATH  = join(__dirname, 'gbp_token.json');
const CONFIG_PATH = join(__dirname, 'gbp_config.json');

function getAuthClient() {
  const files = readdirSync(__dirname).filter(f => f.startsWith('client_secret') && f.endsWith('.json'));
  if (!files.length) throw new Error('client_secret_*.json introuvable dans scripts/');
  const creds = JSON.parse(readFileSync(join(__dirname, files[0]), 'utf8'));
  const { client_id, client_secret } = creds.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3333/callback');
  if (!existsSync(TOKEN_PATH)) throw new Error('Token manquant — lancez d\'abord : node scripts/gbp_auth.js');
  oAuth2Client.setCredentials(JSON.parse(readFileSync(TOKEN_PATH, 'utf8')));
  return oAuth2Client;
}

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}

async function main() {
  if (!existsSync(CONFIG_PATH)) throw new Error('gbp_config.json introuvable — lancez d\'abord gbp_accounts.js');
  const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
  const auth = getAuthClient();
  const token = (await auth.getAccessToken()).token;

  const metrics = [
    'QUERIES_DIRECT',
    'QUERIES_INDIRECT',
    'QUERIES_CHAIN',
    'VIEWS_MAPS',
    'VIEWS_SEARCH',
    'ACTIONS_WEBSITE',
    'ACTIONS_PHONE',
    'ACTIONS_DRIVING_DIRECTIONS',
    'PHOTOS_VIEWS_MERCHANT',
    'PHOTOS_COUNT_MERCHANT',
  ];

  const body = {
    locationNames: [config.location_id],
    basicRequest: {
      metricRequests: metrics.map(m => ({ metric: m, options: ['AGGREGATED_TOTAL'] })),
      timeRange: {
        startTime: (() => { const d = new Date(); d.setDate(d.getDate() - 90); return d.toISOString(); })(),
        endTime: new Date().toISOString(),
      },
    },
  };

  const url = `https://mybusiness.googleapis.com/v4/${config.account_id}/locations:reportInsights`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (data.error) {
    console.error('❌ Erreur API :', JSON.stringify(data.error, null, 2));
    process.exit(1);
  }

  const labels = {
    QUERIES_DIRECT:              '🔍 Recherches directes (nom exact)',
    QUERIES_INDIRECT:            '🔍 Recherches indirectes (catégorie)',
    QUERIES_CHAIN:               '🔍 Recherches par chaîne',
    VIEWS_MAPS:                  '🗺️  Vues sur Google Maps',
    VIEWS_SEARCH:                '🔎 Vues dans Google Search',
    ACTIONS_WEBSITE:             '🌐 Clics vers novahypnose.fr',
    ACTIONS_PHONE:               '📞 Appels téléphoniques',
    ACTIONS_DRIVING_DIRECTIONS:  '📍 Demandes d\'itinéraire',
    PHOTOS_VIEWS_MERCHANT:       '📷 Vues des photos (propriétaire)',
    PHOTOS_COUNT_MERCHANT:       '📷 Nombre de photos (propriétaire)',
  };

  console.log('\n📊 Statistiques GBP — NovaHypnose (90 derniers jours)\n');
  console.log('─'.repeat(55));

  const locationInsight = data.locationMetrics?.[0];
  if (!locationInsight) { console.log('Aucune donnée disponible.'); return; }

  for (const m of locationInsight.metricValues || []) {
    const label = labels[m.metric] || m.metric;
    const value = m.totalValue?.value ?? '—';
    console.log(`${label.padEnd(42)} ${String(value).padStart(6)}`);
  }

  console.log('─'.repeat(55));
  console.log('\n💡 Pour un rapport mensuel automatique, ajoutez ce script');
  console.log('   à un CRON GitHub Actions (voir .github/workflows/deploy.yml)\n');
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
