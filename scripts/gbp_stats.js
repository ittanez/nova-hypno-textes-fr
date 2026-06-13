#!/usr/bin/env node
/**
 * gbp_stats.js — Statistiques Google Business Profile
 *
 * Usage :
 *   node scripts/gbp_stats.js           → rapport 7j / 30j / 90j + export CSV
 *   node scripts/gbp_stats.js --no-csv  → terminal uniquement
 *
 * Exports :
 *   scripts/gbp_stats_weekly.csv   → 7 derniers jours (une ligne ajoutée à chaque run)
 *   scripts/gbp_stats_monthly.csv  → 30 derniers jours (une ligne ajoutée à chaque run)
 *
 * Les fichiers CSV s'alimentent à chaque exécution — l'historique s'accumule.
 * Importables directement dans Google Sheets ou Excel pour des graphiques.
 */

import { google } from 'googleapis';
import { readFileSync, existsSync, readdirSync, appendFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_PATH  = join(__dirname, 'gbp_token.json');
const CONFIG_PATH = join(__dirname, 'gbp_config.json');
const CSV_WEEKLY  = join(__dirname, 'gbp_stats_weekly.csv');
const CSV_MONTHLY = join(__dirname, 'gbp_stats_monthly.csv');

const CSV_HEADER = 'date_run,period_days,queries_direct,queries_indirect,views_maps,views_search,clicks_website,calls,directions,photos_views\n';

const METRICS = [
  'QUERIES_DIRECT',
  'QUERIES_INDIRECT',
  'VIEWS_MAPS',
  'VIEWS_SEARCH',
  'ACTIONS_WEBSITE',
  'ACTIONS_PHONE',
  'ACTIONS_DRIVING_DIRECTIONS',
  'PHOTOS_VIEWS_MERCHANT',
];

const LABELS = {
  QUERIES_DIRECT:             '🔍 Recherches directes (nom exact)',
  QUERIES_INDIRECT:           '🔍 Recherches indirectes (catégorie)',
  VIEWS_MAPS:                 '🗺️  Vues sur Google Maps',
  VIEWS_SEARCH:               '🔎 Vues dans Google Search',
  ACTIONS_WEBSITE:            '🌐 Clics vers novahypnose.fr',
  ACTIONS_PHONE:              '📞 Appels téléphoniques',
  ACTIONS_DRIVING_DIRECTIONS: '📍 Demandes d\'itinéraire',
  PHOTOS_VIEWS_MERCHANT:      '📷 Vues des photos',
};

function getAuthClient() {
  const files = readdirSync(__dirname).filter(f => (f === 'gbp_credentials.json' || f.startsWith('client_secret')) && f.endsWith('.json'));
  if (!files.length) throw new Error('client_secret_*.json introuvable dans scripts/');
  const creds = JSON.parse(readFileSync(join(__dirname, files[0]), 'utf8'));
  const { client_id, client_secret } = creds.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3333/callback');
  if (!existsSync(TOKEN_PATH)) throw new Error('Token manquant — lancez d\'abord : node scripts/gbp_auth.js');
  oAuth2Client.setCredentials(JSON.parse(readFileSync(TOKEN_PATH, 'utf8')));
  return oAuth2Client;
}

async function fetchPeriod(token, accountId, locationId, days) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  const body = {
    locationNames: [locationId],
    basicRequest: {
      metricRequests: METRICS.map(m => ({ metric: m, options: ['AGGREGATED_TOTAL'] })),
      timeRange: { startTime: start.toISOString(), endTime: end.toISOString() },
    },
  };

  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/${accountId}/locations:reportInsights`,
    { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  );
  const data = await res.json();
  if (data.error) throw new Error(`API error (${days}j) : ${data.error.message}`);
  return data.locationMetrics?.[0]?.metricValues ?? [];
}

function metricMap(metricValues) {
  const map = {};
  for (const m of metricValues) map[m.metric] = m.totalValue?.value ?? 0;
  return map;
}

function printTable(title, map) {
  console.log(`\n${title}`);
  console.log('─'.repeat(52));
  for (const [key, label] of Object.entries(LABELS)) {
    console.log(`${label.padEnd(40)} ${String(map[key] ?? '—').padStart(6)}`);
  }
  console.log('─'.repeat(52));
}

function appendCsv(csvPath, days, map, runDate) {
  if (!existsSync(csvPath)) writeFileSync(csvPath, CSV_HEADER);
  const row = [
    runDate,
    days,
    map.QUERIES_DIRECT        ?? 0,
    map.QUERIES_INDIRECT      ?? 0,
    map.VIEWS_MAPS            ?? 0,
    map.VIEWS_SEARCH          ?? 0,
    map.ACTIONS_WEBSITE       ?? 0,
    map.ACTIONS_PHONE         ?? 0,
    map.ACTIONS_DRIVING_DIRECTIONS ?? 0,
    map.PHOTOS_VIEWS_MERCHANT ?? 0,
  ].join(',') + '\n';
  appendFileSync(csvPath, row);
}

async function main() {
  const noCSV = process.argv.includes('--no-csv');
  if (!existsSync(CONFIG_PATH)) throw new Error('gbp_config.json introuvable — lancez d\'abord gbp_accounts.js');
  const { account_id, location_id } = JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
  const auth = getAuthClient();
  const token = (await auth.getAccessToken()).token;
  const runDate = new Date().toISOString().slice(0, 10);

  console.log('\n📊 Statistiques GBP — NovaHypnose');
  console.log(`   Rapport du ${runDate}\n`);

  // Requêtes en parallèle pour les 3 périodes
  const [v7, v30, v90] = await Promise.all([
    fetchPeriod(token, account_id, location_id, 7),
    fetchPeriod(token, account_id, location_id, 30),
    fetchPeriod(token, account_id, location_id, 90),
  ]);

  const m7  = metricMap(v7);
  const m30 = metricMap(v30);
  const m90 = metricMap(v90);

  printTable('📅 7 derniers jours',  m7);
  printTable('📅 30 derniers jours', m30);
  printTable('📅 90 derniers jours', m90);

  if (!noCSV) {
    appendCsv(CSV_WEEKLY,  7,  m7,  runDate);
    appendCsv(CSV_MONTHLY, 30, m30, runDate);
    console.log(`\n✅ CSV mis à jour :`);
    console.log(`   ${CSV_WEEKLY}`);
    console.log(`   ${CSV_MONTHLY}`);
    console.log('   (une ligne ajoutée à chaque exécution — historique cumulé)\n');
  }
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
