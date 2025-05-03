import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { AvatarStudio } from '@/components/ui/avatar-pro-system/AvatarStudio';
import { ChevronRight, User, Users, Sparkles, LayoutDashboard, UserCog, Save, ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// این صفحه آواتار پیشرفته را نمایش می‌دهد
export default function ProAvatarPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("editor");
  const [avatarImage, setAvatarImage] = useState<string | null>(null);
  
  // ایجاد استودیوی آواتار با مشخصات کاربر فعلی
  const initialAvatarData = {
    // اطلاعات اولیه آواتار
    name: "آواتار سازمانی",
    metaInfo: {
      level: 18,
      role: "کارشناس HSE",
      department: "ایمنی و سلامت",
      status: "online",
      xp: 1450,
      lastActive: new Date().toISOString(),
      achievements: [],
      stats: {},
      preferences: {}
    },
    // ویژگی‌های اولیه مطابق با نمونه‌های سازمانی
    skinTone: "#e0ac69",
    hairStyle: "short-straight",
    hairColor: "#3a3a3a",
    expression: "smile",
    outfit: "uniform", // لباس یونیفرم سازمانی
    outfitColor: "#2980b9",
    badgeType: "level",
    badgePosition: "bottom-right",
    glow: true,
    glowColor: "#38bdf8"
  };
  
  // پکیج‌های پیشفرض آواتار
  const defaultPackages = [
    {
      id: "org-default",
      name: "آیتم‌های سازمانی",
      type: "business" as "business",
      icon: Users,
      description: "مجموعه آیتم‌های استاندارد سازمانی برای همه کارکنان",
      items: [],
      isPremium: false,
      isActive: true
    },
    {
      id: "hse-items",
      name: "تجهیزات HSE",
      type: "business" as "business",
      icon: UserCog,
      description: "تجهیزات و پوشش‌های مرتبط با HSE برای کارشناسان",
      items: [],
      isPremium: false,
      isActive: true
    },
    {
      id: "premium-items",
      name: "آیتم‌های ویژه",
      type: "premium" as "premium",
      icon: Sparkles,
      description: "آیتم‌های پیشرفته و ویژه برای شخصی‌سازی حرفه‌ای",
      items: [],
      isPremium: true,
      isActive: false
    }
  ];

  const handleSaveAvatar = (data: any, imageUrl?: string) => {
    setAvatarImage(imageUrl || null);
    
    toast({
      title: "آواتار ذخیره شد",
      description: "آواتار شما با موفقیت ذخیره شد و به پروفایل شما اضافه شد.",
      variant: "default",
    });
  };

  const handleExportAvatar = (imageUrl: string, data: any) => {
    // در اینجا می‌توان اقدامات اضافی برای Export انجام داد
    // مثلاً ذخیره در محیط‌های دیگر یا اشتراک‌گذاری
    
    toast({
      title: "آواتار دانلود شد",
      description: "تصویر آواتار با موفقیت دانلود شد.",
      variant: "default",
    });
  };

  return (
    <div className="container py-6 max-w-[1400px] mx-auto">
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
              استودیوی آواتار پیشرفته
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* عنوان صفحه */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-tiffany">
              استودیوی آواتار پیشرفته
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              آواتار سازمانی خود را با بیش از ۳۰۰ آیتم مختلف و قابلیت‌های حرفه‌ای شخصی‌سازی کنید
            </p>
          </div>

          <div className="flex mt-4 md:mt-0">
            <Button variant="outline" className="ml-2" asChild>
              <Link href="/profile">
                <ChevronRight className="h-5 w-5 ml-1" />
                بازگشت به پروفایل
              </Link>
            </Button>

            <Button variant="outline" className="ml-2 bg-amber-50 hover:bg-amber-100 text-amber-600 hover:text-amber-700 border-amber-200" asChild>
              <Link href="/avatar-shop">
                <ShoppingCart className="h-5 w-5 ml-1" />
                فروشگاه آواتار
              </Link>
            </Button>

            {avatarImage && (
              <Button className="bg-tiffany hover:bg-tiffany-hover">
                <Save className="h-5 w-5 ml-1" />
                ذخیره تغییرات
              </Button>
            )}
          </div>
        </div>

        {/* تب‌های صفحه */}
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b border-slate-200 dark:border-slate-800">
            <TabsList className="bg-transparent h-14 px-0">
              <TabsTrigger
                value="editor"
                className="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-tiffany h-14 px-4"
              >
                <User className="h-5 w-5 ml-2" />
                ویرایشگر آواتار
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-tiffany h-14 px-4"
              >
                <Users className="h-5 w-5 ml-2" />
                گالری آواتارها
                <Badge variant="secondary" className="mr-2 bg-tiffany/10 text-tiffany text-xs">جدید</Badge>
              </TabsTrigger>
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-background data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-tiffany h-14 px-4"
              >
                <LayoutDashboard className="h-5 w-5 ml-2" />
                داشبورد آواتار
                <Badge variant="outline" className="mr-2 text-xs">بزودی</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="editor" className="mt-6">
            {/* استودیوی آواتار پیشرفته */}
            <AvatarStudio
              initialData={initialAvatarData}
              packages={defaultPackages}
              onSave={handleSaveAvatar}
              onExport={handleExportAvatar}
              userId="user-123"
              userRole="کارشناس HSE"
              userName="کاربر سازمانی"
              className="min-h-[700px] h-full"
            />
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="bg-white dark:bg-slate-950 shadow-xl border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">گالری آواتارهای سازمانی</h2>
                <Button variant="outline" size="sm">
                  <Sparkles className="h-4 w-4 ml-1" />
                  مشاهده همه
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* این قسمت در نسخه‌های بعدی با گالری آواتارها پر خواهد شد */}
                <motion.div 
                  className="h-64 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-slate-500 dark:text-slate-400 text-center p-4">
                    گالری آواتارها در نسخه بعدی در دسترس خواهد بود
                  </p>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="mt-6">
            <div className="bg-white dark:bg-slate-950 shadow-xl border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">داشبورد آواتار</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  آمار و اطلاعات استفاده از آواتار شما در سیستم
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {/* این قسمت در نسخه‌های بعدی با آمار و اطلاعات آواتار پر خواهد شد */}
                <motion.div 
                  className="h-64 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-slate-500 dark:text-slate-400 text-center p-4">
                    داشبورد آواتار به زودی در دسترس خواهد بود
                  </p>
                </motion.div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}