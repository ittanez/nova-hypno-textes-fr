#!/usr/bin/env node
/**
 * gbp_auth.js — Authentification OAuth2 pour Google Business Profile API
 *
 * Usage : node scripts/gbp_auth.js
 *
 * Ce script est à lancer UNE SEULE FOIS. Il ouvre une page dans le navigateur
 * pour autoriser l'accès, puis sauvegarde le token dans gbp_token.json.
 * Les scripts suivants (gbp_post.js, gbp_stats.js) liront ce token
 * automatiquement sans aucune interaction.
 */

import { google } from 'googleapis';
import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_PATH = join(__dirname, 'gbp_token.json');

const SCOPES = [
  'https://www.googleapis.com/auth/business.manage',
];

function findCredentialsFile() {
  const files = readdirSync(__dirname).filter(f => (f === 'gbp_credentials.json' || f.startsWith('client_secret')) && f.endsWith('.json'));
  if (files.length === 0) throw new Error('Fichier client_secret_*.json introuvable dans scripts/');
  return join(__dirname, files[0]);
}

function openBrowser(url) {
  const cmd = process.platform === 'win32' ? `start "" "${url}"` : `open "${url}"`;
  exec(cmd);
}

async function main() {
  if (existsSync(TOKEN_PATH)) {
    console.log('✅ Token déjà existant :', TOKEN_PATH);
    console.log('   Supprimez gbp_token.json pour forcer une ré-authentification.');
    return;
  }

  const credsPath = findCredentialsFile();
  const creds = JSON.parse(readFileSync(credsPath, 'utf8'));
  const { client_id, client_secret, redirect_uris } = creds.installed;

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3333/callback');

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });

  console.log('\n🔐 Ouverture du navigateur pour autorisation Google...');
  console.log('   Si le navigateur ne s\'ouvre pas, copiez cette URL :\n');
  console.log('   ' + authUrl + '\n');
  openBrowser(authUrl);

  // Serveur local temporaire pour capturer le code de retour OAuth
  await new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      if (!req.url?.startsWith('/callback')) return;

      const url = new URL(req.url, 'http://localhost:3333');
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        res.end('<h1>Accès refusé.</h1><p>Fermez cette fenêtre.</p>');
        server.close();
        reject(new Error('Accès refusé : ' + error));
        return;
      }

      try {
        const { tokens } = await oAuth2Client.getToken(code);
        writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
        res.end('<h1>✅ Authentification réussie !</h1><p>Fermez cette fenêtre et revenez dans le terminal.</p>');
        console.log('✅ Token sauvegardé dans', TOKEN_PATH);
        server.close();
        resolve();
      } catch (err) {
        res.end('<h1>Erreur.</h1><pre>' + err.message + '</pre>');
        server.close();
        reject(err);
      }
    });

    server.listen(3333, () => console.log('   En attente du callback sur http://localhost:3333/callback ...'));
    server.on('error', reject);
  });

  console.log('\n🎉 Authentification terminée. Vous pouvez maintenant utiliser :');
  console.log('   node scripts/gbp_accounts.js  → récupérer vos IDs de fiche');
  console.log('   node scripts/gbp_post.js      → publier un post');
  console.log('   node scripts/gbp_stats.js     → consulter les statistiques\n');
}

main().catch(err => { console.error('❌', err.message); process.exit(1); });
