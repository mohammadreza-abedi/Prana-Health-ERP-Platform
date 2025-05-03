import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import AvatarStudio from '@/components/ui/avatar-pro-system/AvatarStudio';
import { ChevronRight, User, Users, Sparkles, LayoutDashboard, ShoppingCart, Settings } from 'lucide-react';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import AvatarCard from '@/components/ui/avatar-pro-system/AvatarCard';

// این صفحه آواتار پیشرفته را نمایش می‌دهد
export default function ProAvatarPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("studio");
  const [selectedAvatarId, setSelectedAvatarId] = useState<number>(1);
  const [userAvatars, setUserAvatars] = useState<number[]>([1, 2, 3, 4]); // آواتارهای دیفالت
  
  // داده‌های آواتارهای پیش‌فرض
  const defaultAvatars = [
    {
      id: 1,
      name: "کاراکتر سبز",
      imagePath: "/avatar-images/Pria Gimbal Kacamata.png",
      category: "male",
      rarity: "common",
      description: "یک آواتار ساده با موهای سبز",
      isDefault: true
    },
    {
      id: 2,
      name: "کاراکتر بنفش",
      imagePath: "/avatar-images/Wanita Hijab Sweater.png",
      category: "female",
      rarity: "common",
      description: "یک آواتار دختر با حجاب",
      isDefault: true
    },
    {
      id: 3,
      name: "کاراکتر قهوه‌ای",
      imagePath: "/avatar-images/Pria Poni Brewokan.png",
      category: "male",
      rarity: "common", 
      description: "یک آواتار پسر با ریش",
      isDefault: true
    },
    {
      id: 4,
      name: "کاراکتر صورتی",
      imagePath: "/avatar-images/Wanita Kuncir Topi.png",
      category: "female",
      rarity: "common",
      description: "یک آواتار دختر با کلاه",
      isDefault: true
    }
  ];

  // فعال‌سازی آواتار
  const handleActivateAvatar = (avatarId: number) => {
    setSelectedAvatarId(avatarId);
    
    toast({
      title: "آواتار فعال شد",
      description: "آواتار انتخابی شما با موفقیت فعال شد.",
      variant: "success",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-4">
      {/* نوار آدرس و نویگیشن بهبودیافته */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 py-3 px-4 mb-6 shadow-sm">
        <Container className="max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <Breadcrumb className="flex items-center backdrop-blur py-1 px-3 rounded-md bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="text-slate-600 hover:text-tiffany transition-colors dark:text-slate-300 flex items-center">
                  <Link href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    خانه
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="text-slate-600 hover:text-tiffany transition-colors dark:text-slate-300 flex items-center">
                  <Link href="/profile">
                    <User className="h-4 w-4 ml-1" />
                    پروفایل
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="text-tiffany dark:text-tiffany font-medium flex items-center">
                  <Sparkles className="h-4 w-4 ml-1" />
                  استودیوی آواتار
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            
            <div className="flex mt-3 sm:mt-0 space-x-2 space-x-reverse">
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-tiffany hover:bg-slate-100/70 dark:hover:bg-slate-800/70 hover:shadow-sm transition-all">
                  <ChevronRight className="h-4 w-4 ml-1" />
                  پروفایل
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-tiffany hover:bg-slate-100/70 dark:hover:bg-slate-800/70 hover:shadow-sm transition-all">
                  <LayoutDashboard className="h-4 w-4 ml-1" />
                  داشبورد
                </Button>
              </Link>
              <Link href="/avatar-shop">
                <Button variant="default" size="sm" className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white hover:shadow-md transition-all">
                  <ShoppingCart className="h-4 w-4 ml-1" />
                  فروشگاه آواتار
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container className="max-w-7xl pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* عنوان صفحه */}
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-lg p-6 shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-tiffany to-blue-500 bg-clip-text text-transparent">
                  استودیوی آواتار
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  آواتار سازمانی خود را انتخاب کنید یا از فروشگاه آیتم‌های جدید بخرید
                </p>
              </div>

              <Tabs defaultValue="avatars" className="w-full md:w-auto mt-4 md:mt-0">
                <TabsList className="bg-slate-100/70 dark:bg-slate-800/70 p-1 border border-slate-200/60 dark:border-slate-700/60 rounded-md">
                  <TabsTrigger value="avatars" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
                    <User className="h-4 w-4 ml-1" />
                    آواتارها
                  </TabsTrigger>
                  <TabsTrigger value="shop" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
                    <ShoppingCart className="h-4 w-4 ml-1" />
                    فروشگاه
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
                    <Settings className="h-4 w-4 ml-1" />
                    تنظیمات
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* تب‌های صفحه آواتار */}
          <Tabs defaultValue="avatars" className="w-full">
            <TabsContent value="avatars" className="mt-0">
              {/* استودیوی آواتار - سیستم جدید با آواتارهای پیش‌فرض */}
              <AvatarStudio
                initialData={{
                  userLevel: 5,
                  userXP: 2500,
                  nextLevelXP: 5000,
                  userCredits: 1200,
                  activeAvatarId: selectedAvatarId
                }}
                className="min-h-[500px]"
                userName="کاربر پرانا"
                userRole="کارشناس HSE"
                onSave={handleActivateAvatar}
              />
            </TabsContent>
            
            <TabsContent value="shop" className="mt-0">
              <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-lg p-6 shadow-md">
                <div className="text-center p-8">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-amber-500" />
                  <h3 className="text-xl font-bold mb-2">فروشگاه آواتار</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    برای مشاهده و خرید آیتم‌های جدید به فروشگاه آواتار مراجعه کنید
                  </p>
                  <Button asChild className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700">
                    <Link href="/avatar-shop">
                      <ShoppingCart className="h-5 w-5 ml-2" />
                      رفتن به فروشگاه
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="mt-0">
              <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-lg p-6 shadow-md">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3">تنظیمات نمایش آواتار</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      تنظیمات مربوط به نحوه نمایش آواتار خود را انجام دهید
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h4 className="font-medium mb-2 flex items-center">
                          <User className="h-4 w-4 ml-2 text-tiffany" />
                          نمایش نام کاربری
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                          نمایش نام کاربری در کنار آواتار شما
                        </p>
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline" className="w-24 justify-center">
                            فعال
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Badge className="h-4 w-4 ml-2 text-tiffany" />
                          نمایش نشان‌ها
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                          نمایش نشان‌های کسب‌شده در پروفایل
                        </p>
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline" className="w-24 justify-center">
                            فعال
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-3">اعلان‌ها</h3>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                      <h4 className="font-medium mb-2">دریافت اعلان‌ها</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                        دریافت اعلان‌های مربوط به آواتار و آیتم‌های جدید
                      </p>
                      <div className="flex justify-end">
                        <Button size="sm" variant="outline" className="w-24 justify-center">
                          فعال
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </Container>
    </div>
  );
}