const CORE_CACHE_VERSION = 'v1';
const RUNTIME_CACHE_NAME = 'runtime-cache';
const CORE_CACHE_ARRAY = [
	{
		name: `files-${CORE_CACHE_VERSION}`,
		urls: [
			'/manifest/manifest.json',
			'/css/style.css',
			'/js/script.js',
		],
	},
	{
		name: `assets-${CORE_CACHE_VERSION}`,
		urls: [
			'/img/logo.png',
			'/img/shopping.png!bw700',
			'/img/check-mark.png',
			'/img/scan.png',
			'/img/sad-angry.png',
		],
	},
	{
		name: `pages-${CORE_CACHE_VERSION}`,
		urls: ['/', '/home', '/offline', '/groceries'],	
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
	console.log(path);


		
	
	if (event.request.headers.get('accept').includes('text/html')) {
		console.log(event.request);
		event.respondWith(
			caches
				.open(`pages-${CORE_CACHE_VERSION}`)
				.then((cache) => cache.match(event.request))
				// If there is no response fetchAndCache
				.then((response) => response)
				.catch(() =>
					caches
						.open(`pages-${CORE_CACHE_VERSION}`)
						.then((cache) => cache.match('/offline'))
				)
		);

	} 
	

	else if (isRequested(, path)) {
			CORE_CACHE_ARRAY.map((items) => {})

		event.respondWith(
			caches
				.open(`files-${CORE_CACHE_VERSION}`)
				.then((cache) => cache.match(path))
		);
	}

	else if (`assets-${CORE_CACHE_VERSION}`.includes(path)) {
		event.respondWith(
			caches
				.open(`assets-${CORE_CACHE_VERSION}`)
				.then((cache) => cache.match(path))
		);
	}
});




/** * Check if a file is from a specified type * 
 * @param {String} type is an object name of the CORE_CACHE_ASSETS * 
 * @param {URL} path to the source * 
 * @returns {Boolean} true or false if file is requested */ 

function isRequested(type, path) { 
	return CORE_CACHE_ASSETS.filter(item => item.name == `${type}-${CORE_CACHE_VERSION}`)[0].urls.includes(path);
 }
