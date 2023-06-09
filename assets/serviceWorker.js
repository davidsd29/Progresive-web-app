const CORE_CACHE_VERSION = 'v1';
const CORE_CACHE_ARRAY = [
	{
		name: `files-${CORE_CACHE_VERSION}`,
		urls: ['/manifest/manifest.json', '/css/style.css', '/js/script.js'],
	},
	{
		name: `assets-${CORE_CACHE_VERSION}`,
		urls: [
			'/img/logo.png',
			'/img/shopping.png!bw700',
			'/img/check-mark.png',
			'/img/scan.png',
			'/img/sad-angry.png',
			'/img/whoops.png',
			'/img/healthy.png',
			'/img/card.png',
		],
	},
	{
		name: `pages-${CORE_CACHE_VERSION}`,
		urls: ['/', '/home', '/offline', '/groceries', '/card'],
	},
];

// Get all names from CASH ARRAY
let cacheNames = CORE_CACHE_ARRAY.map((cache) => cache.name);

self.addEventListener('install', (event) => {
	console.log('Installing service worker');
	event.waitUntil(
		caches
			.keys()
			.then((keys) => {
				console.log(keys);
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
				return this.skipWaiting();
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

	if (isRequested('pages', path)) {
		console.log(event.request);
		event.respondWith(
			caches
				.open(`pages-${CORE_CACHE_VERSION}`)
				.then((cache) => {
					if (path == '/groceries') {
						return fetch(event.request.url)
							.then((fetchedResponse) => {
								cache.put(event.request, fetchedResponse.clone());

								return fetchedResponse;
							})
							.catch(() => {
								// If the network is unavailable, get
								return cache.match(event.request.url);
							});
					} else {
						return cache.match(event.request, { ignoreSearch: true });
					}
				})
				// If there is no response fetchAndCache
				.then((response) => response)
				.catch((error) => {
					console.log(error);
					return caches
						.open(`pages-${CORE_CACHE_VERSION}`)
						.then((cache) => cache.match('/offline'));
				})
		);
	} else if (isRequested('files', path)) {
		cacheOnly(event, 'files', path);
	} else if (isRequested('assets', path)) {
		cacheOnly(event, 'assets', path);
	}
});

/** * Check if a file is from a specified type *
 * @param {String} type is an object name of the CORE_CACHE_ASSETS *
 * @param {URL} path to the source *
 * @returns {Boolean} true or false if file is requested */

function isRequested(type, path) {
	return CORE_CACHE_ARRAY.filter(
		(item) => item.name == `${type}-${CORE_CACHE_VERSION}`
	)[0].urls.includes(path);
}

/** * Check if a path is a match in cache version and sends the files from the cache to the client. *
 * @param {String} cacheName is an object name of the CORE_CACHE_ASSETS *
 * @param {Event} event is the event that is running *
 * @param {URL} path to the source */

function cacheOnly(event, cacheName, path) {
	event.respondWith(
		caches
			.open(`${cacheName}-${CORE_CACHE_VERSION}`)
			.then((cache) => cache.match(path))
	);
}
