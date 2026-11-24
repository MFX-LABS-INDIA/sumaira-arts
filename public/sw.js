const CACHE_VERSION = "v2";
const PAGE_CACHE = `sumaira-pages-${CACHE_VERSION}`;
const IMAGE_CACHE = `sumaira-images-${CACHE_VERSION}`;
const ASSET_CACHE = `sumaira-assets-${CACHE_VERSION}`;
const ACTIVE_CACHES = [PAGE_CACHE, IMAGE_CACHE, ASSET_CACHE];

const PRECACHE_ROUTES = ["/", "/products", "/live-events", "/workshops", "/about"];
const MAX_IMAGE_ENTRIES = 140;
const MAX_PAGE_ENTRIES = 45;

const isCacheableResponse = (response) =>
  Boolean(
    response &&
      response.ok &&
      (response.type === "basic" || response.type === "cors"),
  );

async function trimCache(cacheName, maxEntries) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length <= maxEntries) return;
    const excess = keys.length - maxEntries;
    await Promise.all(keys.slice(0, excess).map((key) => cache.delete(key)));
  } catch {
    // Ignore quota / cleanup errors cleanly
  }
}

async function storeResponse(cacheName, request, response, maxEntries) {
  if (!isCacheableResponse(response)) return response;

  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
  if (maxEntries) {
    void trimCache(cacheName, maxEntries);
  }
  return response;
}

async function cacheFirst(cacheName, request, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    return await storeResponse(cacheName, request, networkResponse, maxEntries);
  } catch {
    return Response.error();
  }
}

async function staleWhileRevalidate(cacheName, request, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkPromise = fetch(request)
    .then((response) => storeResponse(cacheName, request, response, maxEntries))
    .catch(() => undefined);

  return cached || (await networkPromise) || Response.error();
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      .then((cache) =>
        Promise.allSettled(PRECACHE_ROUTES.map((route) => cache.add(route))),
      )
      .catch(() => undefined),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) => key.startsWith("sumaira-") && !ACTIVE_CACHES.includes(key),
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  // Pages & Next.js App Router RSC navigation payloads: instant from cache + silent refresh
  const isRscRequest =
    url.searchParams.has("_rsc") || request.headers.get("RSC") === "1";
  if (request.mode === "navigate" || isRscRequest) {
    event.respondWith(staleWhileRevalidate(PAGE_CACHE, request, MAX_PAGE_ENTRIES));
    return;
  }

  // Immutable Next build chunks & fonts: cache-first forever
  const isStaticAsset =
    url.pathname.startsWith("/_next/static/") ||
    request.destination === "font" ||
    request.destination === "style" ||
    request.destination === "script";
  if (isStaticAsset) {
    event.respondWith(cacheFirst(ASSET_CACHE, request));
    return;
  }

  // Website & portfolio images: cache-first once loaded (bounded LRU)
  const isImageAsset =
    request.destination === "image" ||
    url.pathname === "/_next/image" ||
    url.pathname.startsWith("/assets/");
  if (isImageAsset) {
    event.respondWith(cacheFirst(IMAGE_CACHE, request, MAX_IMAGE_ENTRIES));
  }
});
