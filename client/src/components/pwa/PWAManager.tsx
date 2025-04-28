import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Download, X, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export const PWAManager = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [showUpdatedToast, setShowUpdatedToast] = useState(false);

  // بررسی وضعیت نصب PWA
  useEffect(() => {
    const checkPWAInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      // @ts-ignore - navigator.standalone در Safari iOS وجود دارد
      const isInstalledIOS = window.navigator.standalone;
      setIsPWAInstalled(isStandalone || Boolean(isInstalledIOS));
    };

    checkPWAInstalled();
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkPWAInstalled);

    return () => {
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', checkPWAInstalled);
    };
  }, []);

  // ثبت service worker
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          
          // بررسی به‌روزرسانی‌های service worker
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setShowUpdatedToast(true);
                }
              });
            }
          });
          
          console.log('Service Worker registered successfully:', registration.scope);
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    registerServiceWorker();
  }, []);

  // مدیریت رویداد نصب PWA
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // از نمایش پاپ‌آپ نصب مرورگر جلوگیری می‌کنیم
      e.preventDefault();
      // رویداد را برای استفاده بعدی ذخیره می‌کنیم
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // نمایش پاپ‌آپ نصب سفارشی خودمان
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // مدیریت رویداد نصب موفقیت‌آمیز PWA
  useEffect(() => {
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
      setIsPWAInstalled(true);
      console.log('PWA was installed');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // نصب PWA
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      } catch (error) {
        console.error('Error installing PWA:', error);
      }
    }
  };

  // به‌روزرسانی service worker
  const handleUpdate = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdatedToast(false);
      window.location.reload();
    }
  };

  return (
    <>
      {/* دیالوگ نصب PWA */}
      <Dialog open={showInstallPrompt} onOpenChange={setShowInstallPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>نصب پرانا روی دستگاه</DialogTitle>
            <DialogDescription>
              با نصب اپلیکیشن پرانا روی دستگاه خود، می‌توانید به راحتی و بدون نیاز به مرورگر به امکانات سامانه دسترسی داشته باشید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg mb-4">
              <Smartphone className="h-16 w-16 text-tiffany" />
            </div>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="mr-2 text-tiffany">✓</span>
                <span>دسترسی سریع بدون نیاز به مرورگر</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-tiffany">✓</span>
                <span>عملکرد آفلاین و بارگذاری سریع‌تر</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-tiffany">✓</span>
                <span>دریافت نوتیفیکیشن‌های مهم</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-tiffany">✓</span>
                <span>تجربه کاربری بهتر و روان‌تر</span>
              </li>
            </ul>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
            <Button variant="outline" onClick={() => setShowInstallPrompt(false)}>
              <X className="h-4 w-4 ml-1" />
              <span>فعلاً نه</span>
            </Button>
            <Button onClick={handleInstallClick}>
              <Download className="h-4 w-4 ml-1" />
              <span>نصب اپلیکیشن</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* توست به‌روزرسانی */}
      {showUpdatedToast && (
        <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-slate-900 text-white p-4 rounded-lg shadow-lg z-50 flex justify-between items-center">
          <div>
            <p className="font-semibold">به‌روزرسانی جدید</p>
            <p className="text-sm text-slate-300">نسخه جدیدی از اپلیکیشن در دسترس است.</p>
          </div>
          <Button size="sm" onClick={handleUpdate}>
            به‌روزرسانی
          </Button>
        </div>
      )}
    </>
  );
};

export default PWAManager;