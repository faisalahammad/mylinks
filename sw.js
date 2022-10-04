const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";

// initial assets to load into cache
const asset = [
  "/",
  "/index.html",
  "/app.js",
  "/main.js",
  "/style/font-awesome.min.css",
  "/style/main.css",
  "/style/water.css",
  "/libs/jquery-ui.min.js",
  "/libs/jquery.min.js",
  "/libs/jquery.ui.touch-punch.js",
  "/libs/particles.app.js",
  "/libs/particles.min.js",
  "/libs/print.min.js",
  "/libs/qrcode2.min.js",
  "/libs/sharer.min.js",
  "/libs/stoneJSCatalog.js",
  "/libs/stretchy.min.js",
  "/libs/XORCipher.js",
  "/fonts/fontawesome-webfont.woff2",
  "/assets/favicon.png",
  "/images/girl-running.png",
  "/images/one-free.png",
  "/images/safe-browsing.png"
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};


// install
self.addEventListener("install", (evt) => {
  //   console.log("install");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("Caching");
      cache.addAll(asset);
    })
  );
});


// Refresh the caches 
self.addEventListener("activate", (evt) => {
  // Takes care of PWA versioning
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && dynamicCacheName)
          .map((key) => caches.delete(key)) // delete old caches
      );
    })
  );
});


// fetch request and add put new caches
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRES) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRES.clone());
              limitCacheSize(dynamicCacheName, 15);
              return fetchRES;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/404.html");
        }
      })
  );
});
