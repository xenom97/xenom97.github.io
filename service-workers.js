let staticCacheName = 'mws-ahmad-static';

self.addEventListener('install', function(event) {
    console.log('Installing...');

    // Create new caches
    let urlsToCaches = [
        '/',
        'css/main.css',
        'images/favicon.ico',
        'images/icon.png',
        'images/photo-large.jpg',
        'images/photo-medium.jpg',
        'images/photo-small.jpg',
        'js/main.js',
        'project1/css/add2numbers.css',
        'project1/index.html',
        'project2/css/mystyle.css',
        'project2/images/stadion-gbk.jpg',
        'project2/js/mapbox.js',
        'project2/index.html',
        'project3/css/style.css',
        'project3/images/istora.jpg',
        'project3/images/stadion-aquatic.jpg',
        'project3/images/stadion-gbk.jpg',
        'project3/js/maps.js',
        'project3/index.html',
        'project3/map.json',
        'manifest.json',
        '404.html'
    ];

    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(urlsToCaches);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Activating...');

    // Update all caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('mws-ahmad-') && cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    //console.log('Fetching...');

    event.respondWith(
        caches.match(event.request).then(function(response){
            //console.log(response);

            return response || fetch(event.request).then(function(response) {
                return caches.open(staticCacheName).then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
        })
    );
});