const CACHE = 'prod-monitor-pwa-986ef45741ac-1';
const ASSETS = ['./offline.html','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => {event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate', event => {event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('prod-monitor-pwa-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch', event => {
 const r=event.request, u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==self.location.origin)return;
 if(r.mode==='navigate'){event.respondWith(fetch(r,{cache:'no-cache'}).catch(()=>caches.match('./offline.html')));return;}
 if(ASSETS.some(a=>u.href===new URL(a,self.registration.scope).href))event.respondWith(fetch(r).catch(()=>caches.match(r)));
});
