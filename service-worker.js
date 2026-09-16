// History PWA: always use the newest online version.
// We deliberately do not cache app shell files here: GitHub Pages + browser HTTP cache
// handle delivery, while refresh must always be able to receive the latest deployment.
self.addEventListener('install',()=>self.skipWaiting());

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch',()=>{
  // No respondWith: requests go straight to the network/browser normally.
});