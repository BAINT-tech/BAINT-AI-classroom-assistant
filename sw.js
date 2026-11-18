/* BAINT AI service worker.
   - Online: always try the network first, so a new version shows up straight away.
   - Offline (or very slow network): use the saved copy, so the app still opens with no data.
   - Also lets notifications work on Android. */
const CACHE = "baint-v54";
const SHELL = ["./", "./index.html", "./lessons.js", "./solver.js", "./lessons-extra.js", "./numeric.js", "./engine.js", "./blde.js", "./memory.js", "./casestudy.js", "./chats.js", "./lessons-approved.js", "./review.html", "./logo.png"];
const NETWORK_WAIT_MS = 4000;
const RES_CACHE = "baint-resources-v1";            // saved answers from open educational resources (BLDE)
const RES_HOSTS = /^en\.(wikipedia|wikibooks)\.org$/;
const RES_MAX = 60;

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
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== RES_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if(req.method === "GET" && RES_HOSTS.test(url.hostname)){
    /* open educational resources: network first (6s), then the last saved copy, so lessons found once still work offline */
    event.respondWith(
      caches.open(RES_CACHE).then(cache => {
        const net = fetch(req).then(res => {
          if(res && res.ok){ cache.put(req, res.clone()).then(() => cache.keys()).then(ks => { if(ks.length > RES_MAX) cache.delete(ks[0]); }); }
          return res;
        });
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("slow")), 6000));
        return Promise.race([net, timeout]).catch(() => cache.match(req).then(saved => saved || net));
      })
    );
    return;
  }
  if(req.method !== "GET" || url.origin !== self.location.origin) return;
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
