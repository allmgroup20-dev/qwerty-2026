const CACHE = "jgcareer-v2";
const PRECACHE = ["/", "/offline", "/app-install", "/products", "/faq"];
const RUNTIME = "jgcareer-runtime-v2";

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) =>
      Promise.all(ks.filter((k) => k !== CACHE && k !== RUNTIME).map((k) => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  
  // API calls - network only
  if (url.pathname.startsWith("/api/")) {
    return;
  }
  
  // Static assets - cache first
  if (url.pathname.match(/\.(js|css|woff2?|png|jpg|svg)$/)) {
    e.respondWith(
      caches.match(e.request).then((r) => r || fetch(e.request))
    );
    return;
  }
  
  // Navigation - network first, fallback to cache, then offline page
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(RUNTIME).then((c) => c.put(e.request, clone));
          return res;
        })
        .catch(() =>
          caches.match(e.request).then((r) => r || caches.match("/offline"))
        )
    );
    return;
  }
  
  // Everything else - network first
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(RUNTIME).then((c) => c.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
