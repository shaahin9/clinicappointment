/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
if (typeof importScripts === 'function') {
	importScripts(
		'https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js'
	);

	if (workbox) {
		console.log(`Workbox is loaded 🎉`);

		const CACHE_NAME_DETAILS = {
			prefix: 'saniyar_app',
			suffix: 'v1.0',
			precache: 'install-time',
			runtime: 'run-time',
			googleAnalytics: 'ga',
		};

		workbox.core.setCacheNameDetails(CACHE_NAME_DETAILS);

		// eslint-disable-next-line
		workbox.precaching.precacheAndRoute(self.__precacheManifest);

		// eslint-disable-next-line
		self.addEventListener('install', (event) =>
			event.waitUntil(self.skipWaiting())
		);
		// eslint-disable-next-line
		self.addEventListener('activate', (event) =>
			event.waitUntil(self.clients.claim())
		);

		self.addEventListener('fetch', function (e) {
			console.log(
				'[hospitalPWA - ServiceWorker] Fetch event fired.',
				e.request.url
			);
			e.respondWith(
				caches.match(e.request).then(function (response) {
					if (response) {
						console.log(
							'[hospitalPWA - ServiceWorker] Retrieving from cache...'
						);
						return response;
					}
					console.log('[hospitalPWA - ServiceWorker] Retrieving from URL...');
					return fetch(e.request).catch(function (e) {
						console.log(e.request);
						// you might want to do more error checking here too,
						// eg, check what e is returning..
						// window.alert(
						// 	'You appear to be offline, please try again when back online'
						// );
					});
				})
			);
		});

		// //Cache cdn files and external links
		// workbox.routing.registerRoute(
		// 	new RegExp('https:.*.(css|js|json|)'),
		// 	new workbox.strategies.NetworkFirst({ cacheName: 'external-cache' })
		// );

		workbox.routing.registerRoute(
			new RegExp(/\/assets\/.*\.(?:woff|woff2)/),
			new workbox.strategies.CacheFirst({
				cacheName: `${CACHE_NAME_DETAILS.prefix}-fonts--${CACHE_NAME_DETAILS.suffix}`,
				plugins: [
					new workbox.expiration.ExpirationPlugin({
						// Only cache requests for 50 days
						maxAgeSeconds: 50 * 24 * 60 * 60,
					}),
				],
			})
		);

		workbox.routing.registerRoute(
			new RegExp(/\/(assets|static)\/.*\.(?:js|css)/),
			new workbox.strategies.StaleWhileRevalidate({
				cacheName: `${CACHE_NAME_DETAILS.prefix}-assets-${CACHE_NAME_DETAILS.suffix}`,
				plugins: [
					new workbox.expiration.ExpirationPlugin({
						maxAgeSeconds: 7 * 24 * 60 * 60,
						maxEntries: 20,
					}),
					// new workbox.broadcastUpdate.BroadcastUpdatePlugin('assets-updates'),
				],
			})
		);

		workbox.routing.registerRoute(
			/.*(?:googleapis|gstatic)\.com.*$/,
			new workbox.strategies.StaleWhileRevalidate({
				cacheName: `${CACHE_NAME_DETAILS.prefix}-google-api-${CACHE_NAME_DETAILS.suffix}`,
				plugins: [
					new workbox.expiration.ExpirationPlugin({
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 30,
					}),
				],
			})
		);

		workbox.routing.registerRoute(
			({ url }) => url.hostname.includes('neshan.org'),
			new workbox.strategies.StaleWhileRevalidate({
				cacheName: `${CACHE_NAME_DETAILS.prefix}-map-${CACHE_NAME_DETAILS.suffix}`,
				plugins: [
					new workbox.expiration.ExpirationPlugin({
						maxEntries: 10,
						maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
					}),
				],
			})
		);

		workbox.routing.registerRoute(
			/.*\.(?:png|jpg|jpeg|svg|gif|webp|bmp)/,
			new workbox.strategies.CacheFirst({
				cacheName: `${CACHE_NAME_DETAILS.prefix}-images-${CACHE_NAME_DETAILS.suffix}`,
				cacheExpiration: {
					maxEntries: 10,
					maxAgeSeconds: 7 * 24 * 60 * 60,
				},
			})
		);
	} else {
		console.log(`Workbox didn't load `);
	}
}

// app-shell
workbox.routing.registerRoute('/', new workbox.strategies.NetworkFirst());
