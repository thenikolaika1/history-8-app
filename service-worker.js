const CACHE='history-8-v3';
const OFFLINE=['./','./index.html','./app.js','./important-dates.js','./manifest.json'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(OFFLINE)));
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  event.respondWith((async()=>{
    try{
      const fresh=await fetch(event.request,{cache:'no-store'});
      if(fresh&&fresh.ok){
        const cache=await caches.open(CACHE);
        cache.put(event.request,fresh.clone());
      }
      return fresh;
    }catch(error){
      return (await caches.match(event.request,{ignoreSearch:true})) || (event.request.mode==='navigate' ? await caches.match('./index.html') : Response.error());
    }
  })());
});