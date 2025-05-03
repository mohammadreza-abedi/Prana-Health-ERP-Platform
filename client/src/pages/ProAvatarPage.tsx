import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import AvatarStudio from '@/components/ui/avatar-pro-system/AvatarStudio';
import { ChevronRight, User, Users, Sparkles, LayoutDashboard, ShoppingCart } from 'lucide-react';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import AvatarCard from '@/components/ui/avatar-pro-system/AvatarCard';

// واردات تصاویر آواتارها
import priaGimbalKacamata from '@assets/Pria Gimbal Kacamata.png';
import wanitaHijabSweater from '@assets/Wanita Hijab Sweater.png';
import priaPoniBrewokan from '@assets/Pria Poni Brewokan.png';
import wanitaKuncirTopi from '@assets/Wanita Kuncir Topi.png';

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
      imagePath: priaGimbalKacamata,
      category: "male",
      rarity: "common",
      description: "یک آواتار ساده با موهای سبز",
      isDefault: true
    },
    {
      id: 2,
      name: "کاراکتر بنفش",
      imagePath: wanitaHijabSweater,
      category: "female",
      rarity: "common",
      description: "یک آواتار دختر با حجاب",
      isDefault: true
    },
    {
      id: 3,
      name: "کاراکتر قهوه‌ای",
      imagePath: priaPoniBrewokan,
      category: "male",
      rarity: "common", 
      description: "یک آواتار پسر با ریش",
      isDefault: true
    },
    {
      id: 4,
      name: "کاراکتر صورتی",
      imagePath: wanitaKuncirTopi,
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
    <Container className="max-w-7xl py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
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
              استودیوی آواتار
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* عنوان صفحه */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-tiffany">
              استودیوی آواتار
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              آواتار سازمانی خود را انتخاب کنید یا از فروشگاه آیتم‌های جدید بخرید
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
          </div>
        </div>

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
      </motion.div>
    </Container>
  );
}