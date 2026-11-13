const PAGE_CACHE = "sumaira-pages-v1";
const RUNTIME_CACHE = "sumaira-runtime-v1";

const isCacheableResponse = (response) => response && response.ok && response.type === "basic";

async function storeResponse(cacheName, request, response) {
  if (!isCacheableResponse(response)) return response;

  const cache = await caches.open(cacheName);
  await cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(cacheName, request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => storeResponse(cacheName, request, response))
    .catch(() => undefined);

  return cached || (await network) || Response.error();
}

async function cacheFirst(cacheName, request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    return await storeResponse(cacheName, request, await fetch(request));
  } catch {
    return Response.error();
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGE_CACHE)
      .then((cache) => cache.add("/"))
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
            .filter((key) => key.startsWith("sumaira-") && ![PAGE_CACHE, RUNTIME_CACHE].includes(key))
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
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(staleWhileRevalidate(PAGE_CACHE, request));
    return;
  }

  const isBuildAsset = url.pathname.startsWith("/_next/static/");
  const isRuntimeAsset =
    request.destination === "image" ||
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font" ||
    url.pathname.startsWith("/assets/") ||
    url.pathname === "/_next/image";

  if (isBuildAsset) {
    event.respondWith(cacheFirst(RUNTIME_CACHE, request));
  } else if (isRuntimeAsset) {
    event.respondWith(staleWhileRevalidate(RUNTIME_CACHE, request));
  }
});
