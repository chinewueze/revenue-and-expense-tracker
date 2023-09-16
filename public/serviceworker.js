// service-worker.js

// Define a cache name for storing assets
const cacheName = 'my-app-cache-v1';

// List of files to cache when the service worker is installed
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // Add other assets (e.g., CSS, JavaScript, images) here
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

// Fetch event - intercept network requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
