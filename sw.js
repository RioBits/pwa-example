const staticCacheName = 'site-static'
const assets = ['/', '/index.html', '/js/app.js', 'style.css', 'logo.png']

// install event
self.addEventListener('install', (event) => {
  // console.log('service worker has been installed')
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets')
      cache.addAll(assets)
    })
  )
})

// activate event
self.addEventListener('activate', (event) => {
  console.log('service worker has been activated')
  event.waitUntil(
    caches.keys().then((keys) => {
      // console.log(keys)
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      )
    })
  )
})

// fetch event
self.addEventListener('fetch', (event) => {
  // console.log('fetch event', event)
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request)
    })
  )
})
