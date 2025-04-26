// پرانا - دستیار هوشمند سلامت | Service Worker

const CACHE_NAME = 'prana-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/index-*.js',
  '/assets/index-*.css',
  '/assets/YekanBakh-Regular.ttf',
  '/assets/YekanBakh-Light.ttf',
  '/assets/YekanBakh-Black.ttf',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
];

// Service Worker Installation
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker...');
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching App Shell');
        return cache.addAll(urlsToCache);
      })
  );
});

// Service Worker Activation
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('[Service Worker] Removing old cache', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
  
  return self.clients.claim();
});

// Network First with Cache Fallback Strategy
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('http')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          // Open cache and store the response
          caches.open(CACHE_NAME)
            .then(cache => {
              // Don't cache API calls
              if (!event.request.url.includes('/api/')) {
                cache.put(event.request, responseToCache);
              }
            });
          
          return response;
        })
        .catch(() => {
          // Network failed, try to get it from the cache
          return caches.match(event.request);
        })
    );
  }
});

// Push Notification Event Listener
self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  
  const options = {
    body: 'اعلان جدید از پرانا',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'explore',
        title: 'مشاهده',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'بستن',
        icon: '/icons/xmark.png'
      },
    ]
  };
  
  if (event.data) {
    try {
      const data = event.data.json();
      options.title = data.title || 'اعلان پرانا';
      options.body = data.body || 'اعلان جدید از سیستم پرانا';
      
      if (data.url) {
        options.data.url = data.url;
      }
    } catch (e) {
      options.title = 'اعلان پرانا';
      options.body = event.data.text();
    }
  }
  
  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Notification Click Event Listener
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click received.', event);
  
  event.notification.close();
  
  let targetUrl = '/';
  if (event.notification.data.url) {
    targetUrl = event.notification.data.url;
  }
  
  if (event.action === 'explore') {
    // Handle explore action
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then(clientList => {
        // Check if there is already a window/tab open with the target URL
        for (const client of clientList) {
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus();
          }
        }
        // If no window/tab is open, open one
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
    );
  }
});

// Background Sync for offline form submissions
self.addEventListener('sync', event => {
  console.log('[Service Worker] Background Sync', event);
  
  if (event.tag === 'health-data-sync') {
    event.waitUntil(
      // Get all the health data that needs to be synced
      // and send it to the server
      syncHealthData()
    );
  }
});

// Helper function to sync health data
async function syncHealthData() {
  try {
    // Get all the health data from IndexedDB
    const dbPromise = await openIndexedDB();
    const db = await dbPromise;
    const tx = db.transaction('offline-health-data', 'readwrite');
    const store = tx.objectStore('offline-health-data');
    
    // Get all records
    const records = await store.getAll();
    
    for (const record of records) {
      try {
        // Try to send the record to the server
        const response = await fetch('/api/health-metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(record.data),
        });
        
        if (response.ok) {
          // If successful, remove the record from IndexedDB
          await store.delete(record.id);
        }
      } catch (err) {
        console.error('Error syncing record:', err);
      }
    }
    
    await tx.complete;
    db.close();
    
    return true;
  } catch (err) {
    console.error('Error in syncHealthData:', err);
    return false;
  }
}

// Helper function to open IndexedDB
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('prana-offline-db', 1);
    
    request.onerror = (event) => {
      reject('Error opening IndexedDB');
    };
    
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('offline-health-data')) {
        db.createObjectStore('offline-health-data', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}