self.addEventListener('install', () => {
  console.log('🛠️ Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request));
});
