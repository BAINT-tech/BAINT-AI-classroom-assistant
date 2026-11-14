/* BAINT AI service worker.
   - Online: always try the network first, so a new version shows up straight away.
   - Offline (or very slow network): use the saved copy, so the app still opens with no data.
   - Also lets notifications work on Android. */
const CACHE = "baint-v47";
const SHELL = ["./", "./index.html", "./lessons.js", "./solver.js", "./engine.js", "./logo.png"];
const NETWORK_WAIT_MS = 4000;

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.all(SHELL.map(url => cache.add(new Request(url, {cache: "reload"})).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if(req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(cache => {
      const fromCache = () => cache.match(req, {ignoreSearch: true});
      const network = fetch(new Request(req.url, {cache: "no-cache", credentials: "same-origin"})).then(res => {
        if(res && res.ok) cache.put(req, res.clone());
        return res;
      });
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("slow")), NETWORK_WAIT_MS));
      return Promise.race([network, timeout]).catch(() => fromCache().then(saved => saved || network));
    })
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({type: "window", includeUncontrolled: true}).then(list => {
      if(list.length) return list[0].focus();
      return self.clients.openWindow("./");
    })
  );
});
