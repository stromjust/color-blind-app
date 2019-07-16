self.addEventListener('install', () => {
	console.log("Service Worker Installed");
});

self.addEventListener('activate', () => {
	console.log("Service Worker Activated");
	return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	console.log('Fetching: ', event);
})
