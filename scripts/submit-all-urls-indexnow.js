#!/usr/bin/env node

/**
 * Script pour soumettre toutes les URLs du sitemap à IndexNow (Bing)
 *
 * Usage:
 *   node scripts/submit-all-urls-indexnow.js
 *
 * Prérequis:
 *   - Le sitemap doit être accessible sur https://novahypnose.fr/sitemap.xml
 *   - La fonction Edge IndexNow doit être déployée
 *   - La clé IndexNow doit être configurée
 */

import https from 'https';
import http from 'http';

const SITEMAP_URL = 'https://novahypnose.fr/sitemap.xml';
const EDGE_FUNCTION_URL = 'https://akrlyzmfszumibwgocae.supabase.co/functions/v1/notify-bing-indexnow';

/**
 * Récupérer le contenu du sitemap
 */
function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    client.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', reject);
  });
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
 * Soumettre les URLs à IndexNow
 */
function submitToIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ urls });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const url = new URL(EDGE_FUNCTION_URL);
    const client = url.protocol === 'https:' ? https : http;

    const req = client.request(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Soumission des URLs à Bing via IndexNow');
  console.log('===========================================\n');

  try {
    // 1. Récupérer le sitemap
    console.log(`📥 Récupération du sitemap: ${SITEMAP_URL}`);
    const sitemapXml = await fetchSitemap(SITEMAP_URL);
    console.log('✅ Sitemap récupéré\n');

    // 2. Extraire les URLs
    console.log('🔍 Extraction des URLs...');
    const urls = extractUrls(sitemapXml);
    console.log(`✅ ${urls.length} URLs trouvées\n`);

    if (urls.length === 0) {
      console.log('⚠️  Aucune URL trouvée dans le sitemap');
      return;
    }

    // Afficher un échantillon des URLs
    console.log('📋 Échantillon des URLs à soumettre:');
    urls.slice(0, 5).forEach(url => console.log(`   - ${url}`));
    if (urls.length > 5) {
      console.log(`   ... et ${urls.length - 5} autres\n`);
    } else {
      console.log('');
    }

    // 3. Soumettre à IndexNow
    // Note: IndexNow accepte jusqu'à 10,000 URLs par requête
    // Pour de très grands sitemaps, il faudrait diviser en lots
    const MAX_URLS_PER_REQUEST = 10000;

    if (urls.length > MAX_URLS_PER_REQUEST) {
      console.log(`⚠️  Attention: ${urls.length} URLs > ${MAX_URLS_PER_REQUEST} (limite IndexNow)`);
      console.log(`📦 Division en lots de ${MAX_URLS_PER_REQUEST} URLs\n`);

      const batches = [];
      for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) {
        batches.push(urls.slice(i, i + MAX_URLS_PER_REQUEST));
      }

      for (let i = 0; i < batches.length; i++) {
        console.log(`📤 Soumission du lot ${i + 1}/${batches.length} (${batches[i].length} URLs)...`);
        const result = await submitToIndexNow(batches[i]);
        console.log('✅', result.message || 'Soumis avec succès');

        // Petit délai entre les lots pour éviter le rate limiting
        if (i < batches.length - 1) {
          console.log('⏳ Attente de 2 secondes...\n');
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    } else {
      console.log(`📤 Soumission de ${urls.length} URLs à IndexNow...`);
      const result = await submitToIndexNow(urls);
      console.log('✅', result.message || 'Soumis avec succès');

      if (result.urlsSubmitted) {
        console.log(`📊 ${result.urlsSubmitted} URLs soumises`);
      }
    }

    console.log('\n🎉 Toutes les URLs ont été soumises à Bing via IndexNow!');
    console.log('\n📝 Prochaines étapes:');
    console.log('   1. Vérifier dans Bing Webmaster Tools > URL Submission');
    console.log('   2. Attendre quelques minutes pour l\'indexation');
    console.log('   3. Vérifier l\'indexation: site:novahypnose.fr sur Bing\n');

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    process.exit(1);
  }
}

// Exécuter le script
main();
