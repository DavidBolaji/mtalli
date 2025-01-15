/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
self.addEventListener('push', function (event) {
  const {
    title,
    body,
    icon
  } = JSON.parse(event.data.text());
  if (event.data) {
    const options = {
      body,
      icon: '/icon-128x128.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
      }
    };
    event.waitUntil(self.registration.showNotification(title, options));
  }
});
self.addEventListener("notificationclick", async e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({
    type: "window"
  }).then(clientList => {
    for (const client of clientList) {
      if (client.url === "/" && "focus" in client) return client.focus();
    }
    if (clients.openWindow) return clients.openWindow("/");
  }));
});

// self.addEventListener('notificationclick', function (event) {
//   console.log('Notification click received.')
//   event.notification.close()
//   event.waitUntil(clients.openWindow('https://buyeranpro.com'))
// })
/******/ })()
;