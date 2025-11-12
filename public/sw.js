// Service Worker - NovaHypnose Performance Optimization
// Version 1.0.0 - Phase 2

const CACHE_VERSION = 'nova-hypnose-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// Assets à mettre en cache immédiatement
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/zenatti.webp'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Precaching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );

  // Activer immédiatement le nouveau SW
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Supprimer les anciens caches
            return cacheName.startsWith('nova-hypnose-') &&
                   cacheName !== STATIC_CACHE &&
                   cacheName !== DYNAMIC_CACHE &&
                   cacheName !== IMAGE_CACHE;
          })
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );

  // Prendre le contrôle de toutes les pages immédiatement
  return self.clients.claim();
});

// Stratégie de cache pour les requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-HTTP et les API externes
  if (!request.url.startsWith('http')) return;

  // Ignorer les appels API Supabase (toujours fresh)
  if (url.hostname.includes('supabase.co') && url.pathname.includes('/rest/')) {
    return;
  }

  // Stratégie par type de ressource
  if (request.destination === 'image') {
    // Stale-While-Revalidate pour les images
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
  } else if (
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font'
  ) {
    // Cache-First pour JS, CSS, Fonts
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (request.destination === 'document') {
    // Network-First pour HTML
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  } else {
    // Network-First par défaut
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Stratégie Cache-First (assets statiques)
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Fetch failed:', error);
    throw error;
  }
}

// Stratégie Network-First (HTML, API)
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stratégie Stale-While-Revalidate (images)
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(cacheName);
      cache.then((c) => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => {
    // Ignorer les erreurs réseau silencieusement
    return cachedResponse;
  });

  // Retourner le cache immédiatement si disponible, sinon attendre le réseau
  return cachedResponse || fetchPromise;
}
