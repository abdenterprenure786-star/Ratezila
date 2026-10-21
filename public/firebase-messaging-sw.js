// RateZilla Firebase Cloud Messaging Service Worker
// Standard path: /firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

// RateZilla Firebase Client Configuration
const firebaseConfig = {
  apiKey: "AIzaSyRateZillaMarketAlertsKey2025",
  authDomain: "ratezilla-pk.firebaseapp.com",
  projectId: "ratezilla-pk",
  storageBucket: "ratezilla-pk.appspot.com",
  messagingSenderId: "317255552136",
  appId: "1:317255552136:web:ratezillaalertspush"
};

try {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  // Background message handler for FCM
  messaging.onBackgroundMessage((payload) => {
    console.log('[RateZilla FCM SW] Received background push message:', payload);

    const notificationTitle = payload.notification?.title || payload.data?.title || 'RateZilla Market Price Alert';
    const notificationOptions = {
      body: payload.notification?.body || payload.data?.body || 'Gold or fuel prices have updated in Pakistan markets.',
      icon: '/icon.svg',
      badge: '/icon.svg',
      tag: payload.data?.tag || 'ratezilla-price-alert',
      data: {
        url: payload.data?.url || '/',
        timestamp: Date.now(),
        type: payload.data?.type || 'market_alert'
      },
      vibrate: [200, 100, 200],
      actions: [
        { action: 'view_rates', title: 'View Live Rates' },
        { action: 'dismiss', title: 'Dismiss' }
      ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
} catch (e) {
  console.warn('[RateZilla FCM SW] Firebase messaging initialization fallback:', e);
}

// Fallback standard Web Push event listener
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { body: event.data.text() };
    }
  }

  const title = data.title || 'RateZilla Price Drop Notification';
  const options = {
    body: data.body || 'New Sarafa Gold or OGRA Fuel rate update available.',
    icon: '/icon.svg',
    badge: '/icon.svg',
    tag: data.tag || 'ratezilla-alert',
    data: data.data || { url: '/' },
    vibrate: [200, 100, 200],
    actions: [
      { action: 'view_rates', title: 'Check Rates' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// Cache installation for offline PWA reliability
const CACHE_NAME = 'ratezilla-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/sitemap.xml'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});
