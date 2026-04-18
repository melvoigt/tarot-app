// Cache-first service worker — the whole app works offline.
const CACHE = "arcana-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./privacy.html",
  "./styles.css",
  "./app.js",
  "./cards.js",
  "./audio.js",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.json",
  "./screenshots/welcome.svg",
  "./screenshots/reading.svg",
  "./screenshots/desktop.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        // Opportunistically cache successful same-origin responses
        if (sameOrigin && resp && resp.status === 200 && resp.type === "basic") {
          const copy = resp.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return resp;
      }).catch(() => {
        // Offline fallback for navigations
        if (req.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});
