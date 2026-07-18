// Minimal service worker — required for PWA installability (Chrome needs a
// registered SW with a fetch handler before it offers "Install").
// Content-hashed bundles are cache-first (they never change under the same
// name); everything else is network-first with cache fallback for offline.
const CACHE = 'js-interviewer-v1';

// Matches output-hashed build files, e.g. main.cbe2145bd07daa83.js
const HASHED_ASSET = /\.[0-9a-f]{16}\.(js|css)$/;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  if (HASHED_ASSET.test(new URL(request.url).pathname)) {
    event.respondWith(
      caches.match(request).then(
        cached =>
          cached ||
          fetch(request).then(response => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE).then(cache => cache.put(request, copy));
            }
            return response;
          })
      )
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request).then(cached => cached || caches.match('index.html')))
  );
});
