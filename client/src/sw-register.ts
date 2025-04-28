/**
 * ثبت سرویس ورکر برای قابلیت‌های PWA
 */

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration.scope);
          
          // برای به‌روزرسانی سرویس ورکر
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                // وقتی سرویس ورکر آماده است ولی هنوز فعال نشده
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New Service Worker available, refresh to update');
                  // اینجا می‌توانیم یک نوتیفیکیشن به کاربر نمایش دهیم
                  // یا می‌توانیم از کامپوننت PWAManager استفاده کنیم
                }
              });
            }
          });
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
      
      // گوش دادن به پیام‌های service worker
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          console.log('New content is available; please refresh.');
          // اینجا می‌توانیم به کاربر اطلاع دهیم که محتوای جدیدی موجود است
        }
      });
      
      // اگر مرورگر آفلاین شد
      window.addEventListener('offline', () => {
        console.log('App is offline');
        // می‌توانیم وضعیت آفلاین را به کاربر نمایش دهیم
      });
      
      // اگر مرورگر آنلاین شد
      window.addEventListener('online', () => {
        console.log('App is online');
        // می‌توانیم به کاربر اطلاع دهیم که اتصال مجدداً برقرار شده است
      });
    });
  }
}

export default registerServiceWorker;