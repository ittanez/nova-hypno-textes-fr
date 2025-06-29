const CACHE_NAME = 'novahypnose-v1';
const STATIC_ASSETS = [
  '/',
  '/zenatti.webp',
  '/cabinet.webp',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  // Cache images and static assets with long TTL
  if (event.request.destination === 'image' || 
      event.request.url.includes('.webp') ||
      event.request.url.includes('.jpg') ||
      event.request.url.includes('.png')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
            return response;
          });
        })
    );
  }
  
  // Network first for API calls
  if (event.request.url.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
  }
});