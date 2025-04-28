import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export const PWAInstallButton = ({ 
  variant = 'default', 
  size = 'default',
  className = '',
}: PWAInstallButtonProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // بررسی کنیم که آیا اپلیکیشن قبلاً نصب شده است
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInstalledIOS = window.navigator.standalone;
    const isPWAInstalled = isStandalone || Boolean(isInstalledIOS);
    
    if (!isPWAInstalled) {
      // رویداد beforeinstallprompt را گوش کنیم
      const handleBeforeInstallPrompt = (e: Event) => {
        // از نمایش پاپ‌آپ نصب مرورگر جلوگیری می‌کنیم
        e.preventDefault();
        // رویداد را برای استفاده بعدی ذخیره می‌کنیم
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        // دکمه نصب را نمایش می‌دهیم
        setIsVisible(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // رویداد appinstalled را برای زمانی که اپلیکیشن نصب شد گوش کنیم
      const handleAppInstalled = () => {
        setDeferredPrompt(null);
        setIsVisible(false);
        console.log('PWA was installed');
      };

      window.addEventListener('appinstalled', handleAppInstalled);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    } else {
      // اگر اپلیکیشن قبلاً نصب شده است، دکمه را نمایش نمی‌دهیم
      setIsVisible(false);
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setDeferredPrompt(null);
          setIsVisible(false);
        } else {
          console.log('User dismissed the install prompt');
        }
      } catch (error) {
        console.error('Error installing PWA:', error);
      }
    }
  };

  if (!isVisible) return null;

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={handleInstallClick}
    >
      <Download className="h-4 w-4 ml-1" />
      <span>نصب اپلیکیشن</span>
    </Button>
  );
};

export default PWAInstallButton;