// Migration notice: remove old offline content and never cache old paragraphs.
const TARGET='https://thenikolaika1.github.io/konspekt-app/';
self.addEventListener('install',event=>{event.waitUntil(self.skipWaiting())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const key of await caches.keys())await caches.delete(key);await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 const base=new URL('./',self.registration.scope);
 const isEntry=url.pathname===base.pathname||url.pathname===base.pathname+'index.html';
 if(isEntry){event.respondWith(fetch(new Request(new URL('index.html',base),{cache:'no-store'})).catch(()=>new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Мы переехали</title><body style="font:18px system-ui;padding:2rem;background:#091323;color:white"><h1>Мы переехали!</h1><p>Откройте новое приложение, когда появится интернет.</p><a style="color:#7cd7ff" href="'+TARGET+'">Konspekt by NK</a></body>',{headers:{'Content-Type':'text/html; charset=utf-8'}})));return;}
 event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>new Response('Ресурс старого приложения больше не доступен',{status:410,headers:{'Content-Type':'text/plain; charset=utf-8'}})));
});