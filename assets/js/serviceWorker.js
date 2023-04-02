const CORE_CACHE_VERSION = 'v1';
const RUNTIME_CACHE_NAME = 'runtime-cache';
const CORE_CACHE_ARRAY = [
	{
		name: `files-${CORE_CACHE_VERSION}`,
		urls: [
			'/assets/js/manifest.json',
			'/assets/css/style.css',
			'/assets/js/script.js',
		],
	},
	{
		name: `assets-${CORE_CACHE_VERSION}`,
		urls: [
			'/assets/img/logo.png',
			'/assets/img/shopping.png!bw700',
			'/assets/img/check-mark.png',
			'/assets/img/scan.png',
			'/assets/img/sad-angry.png',
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
					CORE_CACHE_ARRAY.map((object) => {
						// Check if object exist in cash
						if (keys.indexOf(object.name) === -1) {
							return caches.open(object.name).then((cache) => {
								console.log(`caching ${object.name}`);
								return cache.addAll(object.urls);
							});
						} else {
							console.log(`found ${object.name}`);
							return Promise.resolve(true);
						}
					})
				);
			})
			.then(() => {
				console.log('Service worker is installed');
				return self.skipWaiting();
			})
	);
});


self.addEventListener('activate', (event) => {
	console.log('Activating service worker');
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.map((cachName) => {
					if (cacheNames.indexOf(cachName) === -1) {
						console.log(`deleting ${cachName}`);
						return caches.delete(cachName);
					}
				})
			);
		})
	);
});


self.addEventListener('fetch', (event) => {
	console.log(`Handling fetch event for ${event.request.url}`);
	const path = new URL(event.request.url).pathname;
	console.log(path);

	if (event.request.headers.get('accept').includes('text/html')) {
		console.log('hoi');
		event.respondWith(
			caches
				.open(`pages-${CORE_CACHE_VERSION}`)
				.then((cache) => cache.match(event.request))
				.then((response) => response || fetchAndCache(event.request))
				.catch(() =>
					caches
						.open(CORE_CACHE_NAME)
						.then((cache) => cache.match('/offline'))
				)
		);
	} else if (`pages-${CORE_CACHE_VERSION}`.includes(path)) {
		event.respondWith(
			caches
				.open(`pages-${CORE_CACHE_VERSION}`)
				.then((cache) => cache.match(path))
		);
	}
});

function fetchAndCache(request) {
	return fetch(request).then((response) => {
		const clone = response.clone();
		caches
			.open(RUNTIME_CACHE_NAME)
			.then((cache) => cache.put(request, clone));

		return response;
	});
}
