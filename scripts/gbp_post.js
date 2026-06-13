#!/usr/bin/env node
/**
 * gbp_post.js — Publie un post sur Google Business Profile
 *
 * Usage :
 *   node scripts/gbp_post.js                          → publie le post dans gbp_next_post.json
 *   node scripts/gbp_post.js scripts/mon_post.json    → publie un fichier spécifique
 *
 * Format du fichier de post (gbp_next_post.json) :
 * {
 *   "type": "STANDARD",          // STANDARD | EVENT | OFFER
 *   "summary": "Texte du post",  // max 1500 caractères
 *   "callToAction": {
 *     "actionType": "BOOK",      // BOOK | CALL | LEARN_MORE | ORDER | SHOP | SIGN_UP
 *     "url": "https://..."       // optionnel selon le type
 *   },
 *   "event": {                   // uniquement pour type EVENT
 *     "title": "Nom de l'événement",
 *     "schedule": {
 *       "startDate": { "year": 2026, "month": 7, "day": 1 },
 *       "endDate":   { "year": 2026, "month": 7, "day": 1 }
 *     }
 *   }
 * }
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

function loadConfig() {
  if (!existsSync(CONFIG_PATH)) {
    throw new Error(
      'gbp_config.json introuvable.\n' +
      'Lancez d\'abord : node scripts/gbp_accounts.js\n' +
      'Puis créez scripts/gbp_config.json avec :\n' +
      '{ "account_id": "accounts/XXX", "location_id": "locations/XXX" }'
    );
  }
  return JSON.parse(readFileSync(CONFIG_PATH, 'utf8'));
}

async function main() {
  const postFile = process.argv[2] || join(__dirname, 'gbp_next_post.json');
  if (!existsSync(postFile)) throw new Error(`Fichier de post introuvable : ${postFile}`);

  const post = JSON.parse(readFileSync(postFile, 'utf8'));
  const config = loadConfig();
  const auth = getAuthClient();
  const token = (await auth.getAccessToken()).token;

  const locationName = config.location_id; // ex: "locations/123456789"

  const body = {
    languageCode: 'fr',
    summary: post.summary,
    topicType: post.type || 'STANDARD',
  };

  if (post.callToAction) body.callToAction = post.callToAction;
  if (post.event) body.event = post.event;

  const url = `https://mybusiness.googleapis.com/v4/${locationName}/localPosts`;
  console.log(`📤 Publication sur : ${locationName}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (data.error) {
    console.error('❌ Erreur API :', JSON.stringify(data.error, null, 2));
    process.exit(1);
  }

  console.log('✅ Post publié avec succès !');
  console.log('   ID du post :', data.name);
  console.log('   URL Google Maps :', data.searchUrl || '(disponible dans le dashboard GBP)');
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
