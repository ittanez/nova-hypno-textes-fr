#!/usr/bin/env node

/**
 * Script pour soumettre toutes les URLs du sitemap a IndexNow (Bing, Yandex, Seznam)
 *
 * Usage:
 *   node scripts/submit-all-urls-indexnow.js              # Appel direct a IndexNow API
 *   node scripts/submit-all-urls-indexnow.js --via-supabase  # Via la edge function Supabase
 *
 * Prerequis:
 *   - Le sitemap doit etre accessible sur https://novahypnose.fr/sitemap.xml
 *   - Le fichier de cle doit etre deploye sur https://novahypnose.fr/{key}.txt
 */

import https from 'https';
import http from 'http';

const SITE_HOST = 'novahypnose.fr';
const SITE_URL = `https://${SITE_HOST}`;
// Utiliser directement la Edge Function Supabase pour éviter les problèmes de cache/proxy Netlify
const SITEMAP_DIRECT_URL = 'https://akrlyzmfszumibwgocae.supabase.co/functions/v1/generate-sitemap';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = '1290617b03634f6a91131c77a141c8c6';
const INDEXNOW_API_URL = 'https://api.indexnow.org/indexnow';
const EDGE_FUNCTION_URL = 'https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow';

const USE_SUPABASE = process.argv.includes('--via-supabase');

/**
 * Faire une requete HTTP/HTTPS
 */
function httpRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;

    const req = client.request(parsedUrl, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, statusMessage: res.statusMessage, data }));
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

/**
 * Recuperer le contenu du sitemap
 */
async function fetchSitemap() {
  const res = await httpRequest(SITEMAP_URL, { method: 'GET' });
  if (res.status !== 200) {
    throw new Error(`Sitemap HTTP ${res.status}: ${res.statusMessage}`);
  }
  return res.data;
}

/**
 * Extraire les URLs du sitemap XML
 */
function extractUrls(sitemapXml) {
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

/**
 * Soumettre directement a IndexNow API (sans passer par Supabase)
 */
async function submitDirectToIndexNow(urls) {
  const payload = JSON.stringify({
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  });

  const res = await httpRequest(INDEXNOW_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, payload);

  if (res.status === 200 || res.status === 202) {
    return { success: true, message: `IndexNow accepte (HTTP ${res.status})`, urlsSubmitted: urls.length };
  } else {
    throw new Error(`IndexNow HTTP ${res.status}: ${res.data}`);
  }
}

/**
 * Soumettre via la edge function Supabase
 */
async function submitViaSupabase(urls) {
  const payload = JSON.stringify({ urls });

  const res = await httpRequest(EDGE_FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, payload);

  if (res.status === 200) {
    try {
      return JSON.parse(res.data);
    } catch {
      return { success: true, message: res.data, urlsSubmitted: urls.length };
    }
  } else {
    throw new Error(`Edge function HTTP ${res.status}: ${res.data}`);
  }
}

/**
 * Fonction principale
 */
async function main() {
  const mode = USE_SUPABASE ? 'via Supabase Edge Function' : 'direct IndexNow API';
  console.log(`Soumission des URLs a Bing via IndexNow (${mode})`);
  console.log('='.repeat(60) + '\n');

  try {
    // 1. Recuperer le sitemap (direct depuis Supabase pour avoir toutes les URLs)
    console.log(`Recuperation du sitemap: ${SITEMAP_DIRECT_URL}`);
    let sitemapXml;
    try {
      sitemapXml = await httpRequest(SITEMAP_DIRECT_URL, { method: 'GET' }).then(r => {
        if (r.status !== 200) throw new Error(`HTTP ${r.status}`);
        return r.data;
      });
    } catch (e) {
      console.log(`Fallback sur ${SITEMAP_URL}...`);
      sitemapXml = await fetchSitemap();
    }
    console.log('Sitemap recupere\n');

    // 2. Extraire les URLs
    console.log('Extraction des URLs...');
    const urls = extractUrls(sitemapXml);
    console.log(`${urls.length} URLs trouvees\n`);

    if (urls.length === 0) {
      console.log('Aucune URL trouvee dans le sitemap');
      return;
    }

    // Afficher un echantillon
    console.log('URLs a soumettre:');
    urls.slice(0, 5).forEach(url => console.log(`   - ${url}`));
    if (urls.length > 5) {
      console.log(`   ... et ${urls.length - 5} autres\n`);
    } else {
      console.log('');
    }

    // 3. Soumettre a IndexNow (max 10000 URLs par requete)
    const MAX_URLS_PER_REQUEST = 10000;
    const submitFn = USE_SUPABASE ? submitViaSupabase : submitDirectToIndexNow;

    if (urls.length > MAX_URLS_PER_REQUEST) {
      const batches = [];
      for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
        batches.push(urls.slice(i, i + MAX_URLS_PER_REQUEST));
      }

      for (let i = 0; i < batches.length; i++) {
        console.log(`Soumission du lot ${i + 1}/${batches.length} (${batches[i].length} URLs)...`);
        const result = await submitFn(batches[i]);
        console.log(result.message || 'Soumis avec succes');

        if (i < batches.length - 1) {
          console.log('Attente de 2 secondes...\n');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    } else {
      console.log(`Soumission de ${urls.length} URLs a IndexNow...`);
      const result = await submitFn(urls);
      console.log(result.message || 'Soumis avec succes');
      if (result.urlsSubmitted) {
        console.log(`${result.urlsSubmitted} URLs soumises`);
      }
    }

    console.log('\nToutes les URLs ont ete soumises a Bing via IndexNow!');
    console.log('\nProchaines etapes:');
    console.log('   1. Verifier dans Bing Webmaster Tools > URL Submission');
    console.log('   2. Attendre quelques minutes pour l\'indexation');
    console.log('   3. Verifier l\'indexation: site:novahypnose.fr sur Bing\n');

  } catch (error) {
    console.error('\nErreur:', error.message);
    process.exit(1);
  }
}

main();
