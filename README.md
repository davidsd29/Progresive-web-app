# Welcome

## Project discription
In this project I convert the client-side web application, Good-Foodie, into a server side-rendered application. I also add functionalities based on the Service Worker and turn the application into a Progressive Web App. Finally I will implement a series of optimisations to improve the performance of the application.

My app is called Goodie-Foodie. Goodie-Foodie helps you make better food choices. Just as quickly when you're shopping or when you want to create a comprehensive and detailed diet plan at home. The Goodie-Foodie is based on "Open Food Facts," a product database about food by everyone and for everyone. It's an open-source API that I can then pull information from but also put it back.

## What is the diffrence?
### Client-side
Client-side is the side of the website that the user (client) has acces to. A client-side website normally contains static HTML, CSS and Javascript. The benefits of client-side scripts is that you have acces to the DOM. So you can fully controll almost everything the user does and use everything what the client browser offers.

### Server-side
Server-side is the side of the website that the user (client) can't control or has acces to. The down part is that you also can't controll what the user does and what the client browser offers. Server-side scripts process information on the web server when the user requests this information. The benefits of server-side is that it can load scripts before the web page is loaded. This gives you the opportunity to make login systems and cache some important files so that the page performance is good and the user can even use your website offline.

## Functions

I have converted my functions that I already had to my server-side. Below, I explain the functions of the application

### Scanning products 
The feature fetches to the Open Food Facts API to see if the barcode matches a barcode in their database. If it does, the product data is retrieved. This information is passed back to the server. Which renders the data and presents it to the user. This allows the user to see the product in the app and the relevant information about it.
### Shopping card
This feature uses a barcode API. This API generates a barcode for you passed on the barcode number of your pass. This is stored and displayed in the app as your shopping card.
The barcode is retrieved by the barcode libary. It scans the card and checks for a barcode. With that barcode an image is generated which becomes the code of your shopping card. 

### Scan fallback

There are also many situations where the user cannot use the scanner. For example, no javascript is running, camera broken, bar code is faded. To avoid this problem, the user can. Enter the barcode of the product as well. This allows the application to still be used and the user to go about their business.
### Filter product in your groceries
The filter function works if there are items in the list. The filter function allows the user to see the total values of the products. Here you can think of sugars, carbohydrates, salt and protein. When an item is added, these values are added automatically. This allows me to easily tone it down to the user.

### Add items to groceries list
When a product is scanned or fillid in the user is taken to the details page. The user is given the option to add x number of the product to the shopping list. Note! To perform this action the user must enter a quantity of the product to add it to the list.

Suppose the user forgot to do it. Does the quantity indication get a red boarder. To alert the user that the index number is still at 0.

## Service worker

### Cache structure
To keep a clear overview of me cache, I have divided what I cache into 3 main names: files, assets and pages. This way I don't have one long list but my urls neatly divided into categories.

``` js

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


```

### Caching stategies

For my caching, I use two different strategies, cache only and network first.

#### Cache only 

My service worker is in control of the page, matching requests will only ever go to the cache. This means that my assets, pages and images will need to be precached in order to be available for the pattern to work, and that those assets will never be updated in the cache until the service worker is updated.I have chosen for certain pages to be static html pages and there will be no change. This allows me to save them easily and also show them to the user offline in the same way.

 <img src="https://github.com/davidsd29/Progresive-web-app/blob/main/img/readme/cache_only.avif" alt="Shows flow from page, to service worker, to cache. #Cache Only" />

``` js

{
    name: `pages-${CORE_CACHE_VERSION}`,
    urls: ['/', '/home', '/offline', '/groceries', '/card'],
},

```

#### Network first

This strategy is great for HTML or API requests when, while online, you want the most recent version of a resource, yet want to give offline access to the most recent available version.
In my situation, I use it to display my shopping list to the user, since it is a dynamic page. This is a page which I cannot precatch because the shopping list would always be empty. So what happens is the sever looks when something has taken place on the network. If it has, it shows that to the user. If not, the cache (what is precached ) is shown to the user.

 <img src="https://github.com/davidsd29/Progresive-web-app/blob/main/img/readme/network.avif" alt="Shows flow from page, to service worker, to network, then to cache if network not available." />

 ### Install Event

 The install event handler is used to populate a cache with a number of responses, which the service worker can then use to serve assets offline:

``` js
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
```

### Activate Event

The activate event is automatically fired after the install event, It's used for removing old caches so a newer version can be added.

``` js
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


```

### Fetch Event
When fired, the code returns a promise that resolves to the first matching request in the Cache object.

``` js

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

```

In my fetch event, I use two separate functions to get what I want.
``` js
/** * Check if a file is from a specified type *
 * @param {String} type is an object name of the CORE_CACHE_ASSETS *
 * @param {URL} path to the source *
 * @returns {Boolean} true or false if file is requested */

function isRequested(type, path) {
	return CORE_CACHE_ARRAY.filter(
		(item) => item.name == `${type}-${CORE_CACHE_VERSION}`
	)[0].urls.includes(path);
}

```

``` js
/** * Check if a path is a match in cache version and sends the files from the cache to the client. *
 * @param {String} cacheName is an object name of the CORE_CACHE_ASSETS *
 * @param {Event} event is the event that is running *
 * @param {URL} path to the source  */

function cacheOnly(event, cacheName, path) {
	event.respondWith(
		caches
			.open(`${cacheName}-${CORE_CACHE_VERSION}`)
			.then((cache) => cache.match(path))
	);
}
```

## Preformance

### Images
Lazy loading is the practice of delaying load or initialization of resources or objects until they’re actually needed to improve performance and save system resources.
As a result, not everything is loaded immediately but only when there is demand. This in turn ensures that other things load faster.

### Javascript
I configure type="module" for my script element. The script is fetched immediately but does not block parsing HTML. It is not executed until the HTML is parsed.
It prevents the page to be blank for a long time.

### Styling

Because I use sass, with 1 line of code, I can minify my css. This removes all unnecessary whitespace and spacing, making the file much smaller and faster to load

``` json
  "scripts": {
    "sass": "sass --watch assets/scss/style.scss assets/css/style.css --style compressed"
  },
 ```