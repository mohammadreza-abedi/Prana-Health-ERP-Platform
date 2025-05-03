import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AdvancedAvatarBuilder from '@/components/ui/advanced-avatar-builder';
import { ChevronRight, SaveAll, User } from 'lucide-react';
import { Link } from 'wouter';

export default function AvatarEditor() {
  const { toast } = useToast();
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  const handleSaveAvatar = (options: any, dataUrl: string) => {
    setAvatarImage(dataUrl);
    
    // در یک برنامه واقعی، اینجا آواتار به سرور ارسال می‌شود
    // simulateApiCall('/api/user/avatar', { avatar: dataUrl });
    
    toast({
      title: "آواتار ذخیره شد",
      description: "آواتار شما با موفقیت ذخیره شد و به پروفایل شما اضافه شد.",
      variant: "default",
    });
  };

  return (
    <div className="container py-8 max-w-[1200px] mx-auto">
      <div className="space-y-6">
        {/* بردکرامب */}
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">خانه</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/profile">پروفایل</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-slate-600 dark:text-slate-300 font-medium">
              ویرایش آواتار
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* عنوان صفحه */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-tiffany">
              ویرایش آواتار
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              شخصیت دیجیتال خود را در پلتفرم طراحی کنید
            </p>
          </div>

          <div className="flex mt-4 md:mt-0">
            <Button variant="outline" className="ml-2" asChild>
              <Link href="/profile">
                <ChevronRight className="h-5 w-5 ml-1" />
                بازگشت به پروفایل
              </Link>
            </Button>

            {avatarImage && (
              <Button className="bg-tiffany hover:bg-tiffany-hover">
                <SaveAll className="h-5 w-5 ml-1" />
                ذخیره تغییرات
              </Button>
            )}
          </div>
        </div>

        {/* نمایش آواتار فعلی */}
        {avatarImage && (
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="mb-4 sm:mb-0 sm:ml-6">
                <h2 className="text-lg font-bold mb-2">آواتار فعلی شما</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                  این آواتار در تمام بخش‌های پلتفرم نمایش داده خواهد شد. برای تغییر مجدد آن می‌توانید از ویرایشگر زیر استفاده کنید.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg">
                  <img 
                    src={avatarImage} 
                    alt="آواتار کاربر" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* کامپوننت ویرایشگر آواتار پیشرفته */}
        <AdvancedAvatarBuilder 
          onSave={handleSaveAvatar}
          userLevel={12}
          userRole="کارشناس HSE"
          userStatus="online"
          userXp={1240}
        />
        
        {/* راهنمای استفاده */}
        <Card className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 ml-4">
              <User className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">راهنمای ساخت آواتار</h3>
              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <p>
                  از ویژگی‌های مختلف برای شخصی‌سازی آواتار خود استفاده کنید. می‌توانید فرم چهره، رنگ پوست، مدل مو، لباس و اکسسوری‌های مختلف را تنظیم کنید.
                </p>
                <p>
                  همچنین می‌توانید تصویر دلخواه خود را آپلود کنید یا از ویژگی تولید هوشمند برای ساخت سریع یک آواتار استفاده کنید.
                </p>
                <p>
                  پس از اتمام ویرایش، روی دکمه «ذخیره آواتار» کلیک کنید تا تغییرات شما ذخیره شود.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}