const CACHE_NAME = "version-1";
// const urlsToCache = [ '/index.html', '/offline.html', '/static/js/bundle.js', '/static/js/0.chunk.js', 'static/js/main.chunk.js', '/'];
const urlsToCache = [ '/index.html', '/offline.html', '/static/js/bundle.js', '/', '/images/logo.png', 'static/media/bg.7b83f7cda99cf768cbb6.jpg', '/manifest.json'];

const self = this;

console.warn("sw.js")

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');

        return cache.addAll(urlsToCache);
      })
  )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      // .then(() => {
      //     return fetch(event.request) 
      //         .catch(() => caches.match('offline.html'))
      // })
    .then((resp) => {
      if (resp) {
        return resp
      }
    })
  )
});

// Activate the SW
// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [];
//   cacheWhitelist.push(CACHE_NAME);

//   event.waitUntil(
//     caches.keys().then((cacheNames) => Promise.all(
//       cacheNames.map((cacheName) => {
//         if(!cacheWhitelist.includes(cacheName)) {
//           return caches.delete(cacheName);
//         }
//       })
//     ))
//   )
// });