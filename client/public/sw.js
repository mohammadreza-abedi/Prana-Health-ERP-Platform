// نسخه کش را تعریف می‌کنیم تا با هر آپدیت اپلیکیشن، کش‌های قبلی پاک شوند
const CACHE_NAME = 'prana-health-v1';

// لیست فایل‌هایی که باید کش شوند
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // افزودن دیگر فایل‌های استاتیک که باید کش شوند
];

// نصب سرویس ورکر و ذخیره فایل‌های اصلی در کش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  // زمانی که سرویس ورکر جدید نصب می‌شود، نسخه قبلی را فوراً جایگزین کنید
  self.skipWaiting();
});

// فعال‌سازی سرویس ورکر و پاک کردن کش‌های قبلی
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    })
  );
  // به سرویس ورکر اجازه می‌دهیم روی همه کلاینت‌ها (تب‌های باز) تأثیر بگذارد
  self.clients.claim();
});

// استراتژی کش: ابتدا از شبکه، سپس از کش
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // ابتدا درخواست از شبکه را امتحان می‌کنیم
    fetch(event.request)
      .then((response) => {
        // درخواست موفقیت‌آمیز بود، پاسخ را به کاربر برمی‌گردانیم و یک کپی از آن را در کش ذخیره می‌کنیم
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            // فقط درخواست‌های GET را کش می‌کنیم
            if (event.request.method === 'GET') {
              cache.put(event.request, responseToCache);
            }
          });

        return response;
      })
      .catch(() => {
        // اگر درخواست از شبکه شکست خورد، از کش استفاده می‌کنیم
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // اگر در کش هم موجود نبود، صفحه آفلاین را نمایش می‌دهیم
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            
            // برای درخواست‌های دیگر پاسخی نداریم
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// مدیریت پیام‌ها (برای به‌روزرسانی کش به صورت دستی)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});