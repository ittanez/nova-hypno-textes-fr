/**
 * IndexNow + Google Ping — Notification moteurs de recherche
 * - Soumet toutes les URLs à Bing via IndexNow
 * - Pinge Google pour lui signaler la mise à jour du sitemap
 * Usage : node scripts/indexnow.js
 */

const SITE_URL = 'https://novahypnose.fr';
const INDEXNOW_KEY = '1290617b03634f6a91131c77a141c8c6';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// URLs indexables (hors noindex : /guide-emotions-travail, /admin, /maquette...)
const URLS = [
  '/',
  '/hypnose-stress-anxiete-paris',
  '/hypnose-phobies-paris',
  '/hypnose-sommeil-paris',
  '/hypnose-gestion-emotions-paris',
  '/hypnose-blocages-paris',
  '/hypnose-confiance-en-soi-paris',
  '/hypnose-troubles-alimentaires-paris',
  '/hypnose-professionnels-paris',
  '/alain-zenatti',
  '/hypnose-en-ligne',
  '/test-receptivite',
  '/autohypnose',
  '/blog',
  '/blog/categories',
  '/mentions-legales',
].map(path => `${SITE_URL}${path}`);

// ─── Bing via IndexNow ──────────────────────────────────────────────────────

async function submitBingIndexNow() {
  console.log('\n📡 Soumission IndexNow → Bing');
  const body = {
    host: 'novahypnose.fr',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: URLS,
  };

  const res = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  if (res.ok || res.status === 202) {
    console.log(`✅ Bing accepté (HTTP ${res.status}) — ${URLS.length} URLs`);
  } else {
    const text = await res.text();
    console.error(`❌ Bing refusé (HTTP ${res.status}) : ${text}`);
  }
}

// ─── IndexNow API générale (Yandex, Seznam, etc.) ─────────────────────────
// Note : Google a supprimé son ping sitemap en 2023. Pour Google, soumettre
// manuellement les URLs dans Google Search Console → Inspection d'URL.

async function submitIndexNowGeneral() {
  console.log('\n📡 Soumission IndexNow → API générale (Yandex, Seznam...)');
  const body = {
    host: 'novahypnose.fr',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: URLS,
  };

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });

  if (res.ok || res.status === 202) {
    console.log(`✅ API générale acceptée (HTTP ${res.status})`);
  } else {
    const text = await res.text();
    console.error(`❌ API générale refusée (HTTP ${res.status}) : ${text}`);
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Notification moteurs de recherche — ${new Date().toLocaleString('fr-FR')}`);
  console.log(`   Site : ${SITE_URL}`);
  console.log(`   URLs : ${URLS.length}`);

  await Promise.allSettled([
    submitBingIndexNow(),
    submitIndexNowGeneral(),
  ]);

  console.log('\n✅ Terminé\n');
}

main();
