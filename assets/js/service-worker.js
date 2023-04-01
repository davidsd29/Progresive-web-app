const CORE_CACHE_VERSION = 'v1';
const RUNTIME_CACHE_NAME = 'runtime-cache';
const CORE_CACHE_ARRAY = [
	{
		name: `files-${CORE_CACHE_VERSION}`,
		urls: ['/manifest.json', '/assets/css/style.css', '/assets/js/script.js'],
	},
	{
		name: `assets-${CORE_CACHE_VERSION}`,
		urls: [
			'/assets/img/logo.png',
			'/assets/img/shopping.png!bw700',
			'/assets/images/check-mark.png',
			'/assets/images/scan.png',
			'/assets/images/sad-angry.png',
		],
	},
	{
		name: `pages-${CORE_CACHE_VERSION}`,
		urls: ['/', '/home', '/offline', '/groceries', '/search'],
	},
];

// Get all names from CASH ARRAY
let cacheNames = CORE_CACHE_ARRAY.map((cache) => cache.name);

self.addEventListener('install', (event) => {
	console.log('Install service worker');
	event.waitUntil(
		caches
			.keys()
			.then((keys) => {
				return Promise.all(
                    // 
					CORE_CACHE_ARRAY.map((object) => {

                        console.log(object)
						return caches.open(object.name).then((cache) => {
							console.log(`caching ${object.name}`);
							return cache.addAll(object.urls);
						});
					})
				);
			})
			.then(() => {
				console.log('Service worker installed');
				return self.skipWaiting();
			})
	);
});

self.addEventListener('activate', (event) => {
	console.log('Activating service worker');
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (
						cacheName !== CORE_CACHE_NAME &&
						cacheName !== RUNTIME_CACHE_NAME
					) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
