#!/usr/bin/env node
/**
 * gbp_accounts.js — Liste les comptes et fiches Google Business Profile
 *
 * Usage : node scripts/gbp_accounts.js
 *
 * Affiche account_id et location_id à copier dans gbp_config.json
 */

import { google } from 'googleapis';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_PATH = join(__dirname, 'gbp_token.json');

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

async function main() {
  const auth = getAuthClient();

  // Lister les comptes
  const accountsRes = await fetch(
    'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
    { headers: { Authorization: `Bearer ${(await auth.getAccessToken()).token}` } }
  );
  const accountsData = await accountsRes.json();

  if (!accountsData.accounts?.length) {
    console.log('Aucun compte Business Profile trouvé pour cet email.');
    return;
  }

  for (const account of accountsData.accounts) {
    console.log(`\n📋 Compte : ${account.accountName}`);
    console.log(`   account_id : ${account.name}`);

    // Lister les fiches du compte
    const locRes = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title,storefrontAddress,websiteUri`,
      { headers: { Authorization: `Bearer ${(await auth.getAccessToken()).token}` } }
    );
    const locData = await locRes.json();

    if (locData.locations?.length) {
      for (const loc of locData.locations) {
        console.log(`\n   📍 Fiche : ${loc.title}`);
        console.log(`      location_id : ${loc.name}`);
        console.log(`      Adresse : ${loc.storefrontAddress?.addressLines?.join(', ')}, ${loc.storefrontAddress?.postalCode} ${loc.storefrontAddress?.locality}`);
        if (loc.websiteUri) console.log(`      Site : ${loc.websiteUri}`);
      }
    } else {
      console.log('   Aucune fiche trouvée dans ce compte.');
      if (locData.error) console.log('   Erreur API :', JSON.stringify(locData.error));
    }
  }

  console.log('\n💡 Copiez account_id et location_id dans scripts/gbp_config.json');
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
