/**
 * IndexNow — Notification Bing des URLs du site
 * Soumet toutes les URLs indexables à Bing via le protocole IndexNow.
 * Usage : node scripts/indexnow.js
 */

const SITE_URL = 'https://novahypnose.fr';
const INDEXNOW_KEY = '1290617b03634f6a91131c77a141c8c6';
const BING_ENDPOINT = 'https://www.bing.com/indexnow';

// URLs indexables (hors noindex : /guide-emotions-travail, /admin, /maquette...)
const URLS = [
  '/',
  '/hypnose-stress-anxiete-paris',
  '/hypnose-phobies-paris',
  '/hypnose-sommeil-paris',
  '/hypnose-gestion-emotions-paris',
  '/hypnose-blocages-paris',
  '/hypnose-confiance-en-soi-paris',
  '/hypnose-professionnels-paris',
  '/test-receptivite',
  '/autohypnose',
  '/zone-intervention',
  '/blog',
  '/blog/categories',
  '/mentions-legales',
].map(path => `${SITE_URL}${path}`);

async function submitIndexNow() {
  console.log(`\n📡 Soumission IndexNow → Bing`);
  console.log(`   Clé : ${INDEXNOW_KEY}`);
  console.log(`   URLs : ${URLS.length}\n`);

  const body = {
    host: 'novahypnose.fr',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: URLS,
  };

  try {
    const res = await fetch(BING_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (res.ok || res.status === 202) {
      console.log(`✅ Bing IndexNow accepté (HTTP ${res.status})`);
      URLS.forEach(url => console.log(`   ✓ ${url}`));
    } else {
      const text = await res.text();
      console.error(`❌ Bing a refusé la requête (HTTP ${res.status})`);
      console.error(`   Réponse : ${text}`);
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ Erreur réseau :', err.message);
    process.exit(1);
  }
}

submitIndexNow();
