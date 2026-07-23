const CACHE_NAME = 'daia-v2';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',      // for loading screen
  './splash.png',    // for splash
  './icon-180.png',  // iOS icon
  './icon-192.png',  // PWA icon
  './icon-512.png'   // Android big icon
];

// Install and cache all files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

// Delete old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});