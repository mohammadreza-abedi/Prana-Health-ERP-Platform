/**
 * @file Rewards.tsx
 * @description کامپوننت جوایز و پاداش‌ها
 * 
 * این کامپوننت فروشگاه جوایز و پاداش‌هایی که کاربران می‌توانند با امتیازات خود بخرند را نمایش می‌دهد.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, 
  ShoppingBag, 
  Star, 
  Ticket, 
  Coffee, 
  Calendar,
  Clock,
  Award,
  Zap,
  Tag,
  ShoppingCart,
  ArrowDown,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/design-system/atoms/Card';
import { Button } from '@/design-system/atoms/Button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// نوع جایزه
interface Reward {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image?: string;
  availability: 'available' | 'limited' | 'out_of_stock' | 'موجود' | 'محدود' | 'ناموجود';
  quantity?: number;
  expiry?: string;
  redemptionType: 'digital' | 'physical' | 'experience' | 'دیجیتال' | 'فیزیکی' | 'تجربه';
  redemptionInfo?: string;
  featured?: boolean;
  discountPercentage?: number;
  isPurchased?: boolean;
}

// پراپس Rewards
interface RewardsProps {
  data: Reward[] | undefined;
  isLoading: boolean;
  filterCategory: string;
  searchQuery: string;
}

// کامپوننت کارت جایزه
const RewardCard: React.FC<{
  reward: Reward;
  onPurchase: (rewardId: number) => void;
  userCredits: number;
}> = ({ reward, onPurchase, userCredits }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'food':
      case 'غذا':
        return <Coffee className="h-5 w-5 text-amber-500" />;
      case 'merchandise':
      case 'کالا':
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case 'voucher':
      case 'بن':
        return <Ticket className="h-5 w-5 text-green-500" />;
      case 'experience':
      case 'تجربه':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      case 'digital':
      case 'دیجیتال':
        return <Zap className="h-5 w-5 text-indigo-500" />;
      case 'premium':
      case 'ویژه':
        return <Star className="h-5 w-5 text-amber-500" />;
      default:
        return <Gift className="h-5 w-5 text-primary-500" />;
    }
  };
  
  const getAvailabilityBadge = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'available':
      case 'موجود':
        return <Badge variant="outline" className="bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300">موجود</Badge>;
      case 'limited':
      case 'محدود':
        return <Badge variant="outline" className="bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300">محدود</Badge>;
      case 'out_of_stock':
      case 'ناموجود':
        return <Badge variant="outline" className="bg-red-100/50 dark:bg-red-900/30 text-red-700 dark:text-red-300">ناموجود</Badge>;
      default:
        return null;
    }
  };
  
  const getRedemptionBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'digital':
      case 'دیجیتال':
        return <Badge variant="outline" className="bg-indigo-100/50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">دیجیتال</Badge>;
      case 'physical':
      case 'فیزیکی':
        return <Badge variant="outline" className="bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">فیزیکی</Badge>;
      case 'experience':
      case 'تجربه':
        return <Badge variant="outline" className="bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">تجربه</Badge>;
      default:
        return null;
    }
  };
  
  const handlePurchaseClick = () => {
    if (userCredits >= reward.price && !reward.isPurchased) {
      setShowConfirmDialog(true);
    }
  };
  
  const handleConfirmPurchase = () => {
    onPurchase(reward.id);
    setShowConfirmDialog(false);
  };
  
  // محاسبه قیمت با تخفیف
  const discountedPrice = reward.discountPercentage ? 
    Math.round(reward.price * (1 - (reward.discountPercentage / 100))) : 
    reward.price;

  const imageUrl = reward.image || `https://ui-avatars.com/api/?name=${reward.name}&background=random&size=128&font-size=0.5`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className={`h-full ${reward.isPurchased ? 'border-green-200 dark:border-green-800/50' : ''}`}>
        {reward.featured && (
          <div className="absolute -top-2 -left-2 z-10">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">ویژه</Badge>
          </div>
        )}
        
        {reward.discountPercentage && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-rose-500">
              {reward.discountPercentage}%- 
            </Badge>
          </div>
        )}
        
        <CardHeader className="pb-2 pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 mr-3">
                {getCategoryIcon(reward.category)}
              </div>
              <div>
                <CardTitle className="text-lg">{reward.name}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-1">
                  {getAvailabilityBadge(reward.availability)}
                  {getRedemptionBadge(reward.redemptionType)}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          {/* Image */}
          <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-md mb-3 flex items-center justify-center overflow-hidden">
            <img 
              src={imageUrl} 
              alt={reward.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {reward.description}
          </p>
          
          {reward.quantity && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Tag className="h-4 w-4 mr-1" />
              <span>{reward.quantity} باقی‌مانده</span>
            </div>
          )}
          
          {reward.expiry && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>انقضا: {reward.expiry}</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0">
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-primary-500 mr-1" />
                <span className="font-medium">
                  {reward.discountPercentage ? (
                    <>
                      <span className="text-muted-foreground line-through text-xs ml-1">{reward.price}</span>
                      {discountedPrice}
                    </>
                  ) : (
                    reward.price
                  )}
                </span>
                <span className="text-xs text-muted-foreground mr-1">امتیاز</span>
              </div>
              
              {reward.isPurchased && (
                <Badge variant="outline" className="bg-green-100/50 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  <Check className="h-3.5 w-3.5 mr-0.5" />
                  خریداری شده
                </Badge>
              )}
            </div>
            
            <Button 
              variant={reward.isPurchased ? "outline" : (userCredits >= reward.price ? "primary" : "outline")}
              className="w-full"
              disabled={reward.isPurchased || userCredits < reward.price || reward.availability.toLowerCase() === 'out_of_stock' || reward.availability.toLowerCase() === 'ناموجود'}
              onClick={handlePurchaseClick}
            >
              {reward.isPurchased ? (
                <>استفاده از جایزه</>
              ) : userCredits < reward.price ? (
                <>امتیاز ناکافی</>
              ) : (
                <>
                  خرید جایزه
                  <ShoppingCart className="mr-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Confirm Purchase Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تایید خرید جایزه</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از خرید "{reward.name}" به قیمت {discountedPrice} امتیاز اطمینان دارید؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="p-3 rounded-lg bg-muted flex items-start">
              <div className="w-12 h-12 rounded flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 mr-3 flex-shrink-0">
                {getCategoryIcon(reward.category)}
              </div>
              <div>
                <p className="font-medium">{reward.name}</p>
                <p className="text-sm text-muted-foreground">{reward.category}</p>
                <div className="flex items-center mt-1">
                  <Zap className="h-4 w-4 text-primary-500 mr-1" />
                  <span className="text-sm">{discountedPrice} امتیاز</span>
                </div>
              </div>
            </div>
            
            {reward.redemptionInfo && (
              <div className="mt-3 text-sm">
                <p className="font-medium">اطلاعات دریافت:</p>
                <p className="text-muted-foreground">{reward.redemptionInfo}</p>
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPurchase}>
              تایید خرید
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

// کامپوننت جایزه ویژه
const FeaturedReward: React.FC<{
  reward: Reward;
  onPurchase: (rewardId: number) => void;
  userCredits: number;
}> = ({ reward, onPurchase, userCredits }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // محاسبه قیمت با تخفیف
  const discountedPrice = reward.discountPercentage ? 
    Math.round(reward.price * (1 - (reward.discountPercentage / 100))) : 
    reward.price;
  
  const handlePurchaseClick = () => {
    if (userCredits >= discountedPrice && !reward.isPurchased) {
      setShowConfirmDialog(true);
    }
  };
  
  const handleConfirmPurchase = () => {
    onPurchase(reward.id);
    setShowConfirmDialog(false);
  };
  
  const imageUrl = reward.image || `https://ui-avatars.com/api/?name=${reward.name}&background=random&size=128&font-size=0.5`;
  
  return (
    <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-6 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
      <div className="absolute inset-0 bg-black/50 z-0" />
      {reward.image && (
        <img 
          src={imageUrl} 
          alt={reward.name} 
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" 
        />
      )}
      
      {reward.discountPercentage && (
        <div className="absolute top-4 right-4 z-20">
          <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-rose-500 px-3 py-1 text-base">
            {reward.discountPercentage}%- 
          </Badge>
        </div>
      )}
      
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
        <div>
          <Badge className="bg-amber-500 text-white border-amber-400 mb-2">جایزه ویژه</Badge>
          <h3 className="text-2xl md:text-3xl font-bold text-white mt-3">{reward.name}</h3>
          <p className="text-white/80 mt-1 md:w-2/3">{reward.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {reward.availability.toLowerCase() !== 'out_of_stock' && reward.availability.toLowerCase() !== 'ناموجود' ? (
              <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                موجود
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-500/20 text-red-200 border-red-500/20">
                ناموجود
              </Badge>
            )}
            
            {reward.quantity && (
              <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                {reward.quantity} باقی‌مانده
              </Badge>
            )}
            
            {reward.expiry && (
              <Badge variant="outline" className="bg-white/20 text-white border-white/20">
                <Clock className="h-3 w-3 mr-1" />
                انقضا: {reward.expiry}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-white/20 rounded-lg text-white backdrop-blur-sm">
              <Zap className="h-6 w-6" />
            </div>
            <div className="mr-3">
              <p className="text-white/80 text-sm">قیمت</p>
              <p className="text-white text-xl font-bold flex items-center">
                {reward.discountPercentage ? (
                  <>
                    <span className="text-white/60 line-through text-sm ml-2">{reward.price}</span>
                    {discountedPrice}
                  </>
                ) : (
                  reward.price
                )}
                <span className="text-sm font-normal mr-1">امتیاز</span>
              </p>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-white text-primary-800 hover:bg-white/90 hover:text-primary-900"
            disabled={reward.isPurchased || userCredits < discountedPrice || reward.availability.toLowerCase() === 'out_of_stock' || reward.availability.toLowerCase() === 'ناموجود'}
            onClick={handlePurchaseClick}
          >
            {reward.isPurchased ? (
              <>استفاده از جایزه</>
            ) : userCredits < discountedPrice ? (
              <>امتیاز ناکافی</>
            ) : (
              <>
                خرید جایزه
                <ShoppingCart className="mr-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
      
      {/* Confirm Purchase Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تایید خرید جایزه ویژه</AlertDialogTitle>
            <AlertDialogDescription>
              آیا از خرید "{reward.name}" به قیمت {discountedPrice} امتیاز اطمینان دارید؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="p-3 rounded-lg bg-muted flex items-start">
              <div className="w-12 h-12 rounded flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 mr-3 flex-shrink-0">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">{reward.name}</p>
                <p className="text-sm text-muted-foreground">{reward.category}</p>
                <div className="flex items-center mt-1">
                  <Zap className="h-4 w-4 text-primary-500 mr-1" />
                  <span className="text-sm">{discountedPrice} امتیاز</span>
                </div>
              </div>
            </div>
            
            {reward.redemptionInfo && (
              <div className="mt-3 text-sm">
                <p className="font-medium">اطلاعات دریافت:</p>
                <p className="text-muted-foreground">{reward.redemptionInfo}</p>
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmPurchase}>
              تایید خرید
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// کامپوننت نمایش وضعیت بارگذاری
const RewardsLoadingSkeleton = () => {
  return (
    <>
      <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-6">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="h-6 w-40" />
                  <div className="flex gap-2 mt-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-32 rounded-md mb-3" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-5/6 mt-2" />
              <div className="flex justify-between mt-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

// کامپوننت اصلی Rewards
const Rewards: React.FC<RewardsProps> = ({ 
  data, 
  isLoading, 
  filterCategory, 
  searchQuery 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // دریافت اطلاعات اعتبار کاربر
  const { data: creditsData, isLoading: isLoadingCredits } = useQuery({
    queryKey: ['/api/gamification/user-credits', user?.id],
    enabled: !!user?.id,
  });
  
  // مقدار اعتبار کاربر
  const userCredits = creditsData?.credits || 0;
  
  // نمونه داده‌های جوایز اگر داده واقعی موجود نباشد
  const sampleRewards: Reward[] = [
    {
      id: 1,
      name: "کارت هدیه دیجی‌کالا",
      description: "کارت هدیه 200 هزار تومانی برای خرید از دیجی‌کالا",
      category: "بن",
      price: 2000,
      redemptionType: "دیجیتال",
      availability: "موجود",
      quantity: 10,
      expiry: "۱۴۰۳/۰۳/۳۱",
      redemptionInfo: "کد هدیه پس از خرید از طریق ایمیل ارسال می‌شود.",
      featured: true,
      discountPercentage: 10
    },
    {
      id: 2,
      name: "اشتراک کافه",
      description: "یک ماه اشتراک قهوه رایگان در کافه شرکت",
      category: "غذا",
      price: 800,
      redemptionType: "فیزیکی",
      availability: "موجود",
      quantity: 15,
      expiry: "۱۴۰۲/۱۲/۲۹",
      redemptionInfo: "کوپن را به کافه تریای شرکت ارائه دهید."
    },
    {
      id: 3,
      name: "کلاس یوگا",
      description: "یک جلسه کلاس یوگا در باشگاه همکار",
      category: "تجربه",
      price: 500,
      redemptionType: "تجربه",
      availability: "محدود",
      quantity: 5,
      expiry: "۱۴۰۲/۱۰/۳۰",
      redemptionInfo: "پس از خرید، امکان رزرو از طریق سامانه باشگاه فعال می‌شود."
    },
    {
      id: 4,
      name: "یک روز مرخصی تشویقی",
      description: "یک روز مرخصی تشویقی با هماهنگی مدیر",
      category: "ویژه",
      price: 3000,
      redemptionType: "دیجیتال",
      availability: "موجود",
      redemptionInfo: "پس از خرید، به صورت خودکار در سیستم ثبت می‌شود."
    },
    {
      id: 5,
      name: "ماگ پرانا",
      description: "ماگ اختصاصی با لوگوی پرانا",
      category: "کالا",
      price: 350,
      redemptionType: "فیزیکی",
      availability: "موجود",
      quantity: 30,
      redemptionInfo: "از واحد اداری قابل دریافت است."
    },
    {
      id: 6,
      name: "کیف لپ‌تاپ",
      description: "کیف لپ‌تاپ با طراحی ارگونومیک",
      category: "کالا",
      price: 1200,
      redemptionType: "فیزیکی",
      availability: "محدود",
      quantity: 8,
      redemptionInfo: "از واحد اداری قابل دریافت است."
    },
    {
      id: 7,
      name: "اشتراک اسپاتیفای",
      description: "اشتراک یک ماهه سرویس موسیقی اسپاتیفای",
      category: "دیجیتال",
      price: 600,
      redemptionType: "دیجیتال",
      availability: "موجود",
      expiry: "۱۴۰۲/۱۲/۲۹",
      redemptionInfo: "کد فعالسازی از طریق ایمیل ارسال می‌شود."
    },
    {
      id: 8,
      name: "کتاب‌های انگیزشی",
      description: "مجموعه سه کتاب انگیزشی برتر",
      category: "کالا",
      price: 900,
      redemptionType: "فیزیکی",
      availability: "ناموجود",
      redemptionInfo: "در حال حاضر ناموجود است. به‌زودی موجود می‌شود."
    },
    {
      id: 9,
      name: "جلسه با مدیرعامل",
      description: "یک جلسه خصوصی نیم ساعته با مدیرعامل",
      category: "تجربه",
      price: 5000,
      redemptionType: "تجربه",
      availability: "محدود",
      quantity: 2,
      expiry: "۱۴۰۲/۱۲/۱۵",
      redemptionInfo: "پس از خرید، دفتر مدیرعامل برای هماهنگی تماس خواهد گرفت."
    }
  ];
  
  // میوتیشن برای خرید جایزه
  const purchaseRewardMutation = useMutation({
    mutationFn: async (rewardId: number) => {
      const res = await apiRequest('POST', '/api/rewards/purchase', {
        rewardId,
        userId: user?.id
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/rewards'] });
      queryClient.invalidateQueries({ queryKey: ['/api/gamification/user-credits'] });
      toast({
        title: 'خرید با موفقیت انجام شد',
        description: 'جایزه شما با موفقیت خریداری شد',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در خرید جایزه',
        description: error.message || 'خطایی در خرید جایزه رخ داد. لطفا دوباره تلاش کنید.',
        variant: 'destructive',
      });
    }
  });
  
  // فیلتر و جستجوی جوایز
  const filteredRewards = () => {
    // استفاده از داده‌های نمونه اگر داده واقعی موجود نباشد
    const allRewards = data || sampleRewards;
    
    return allRewards.filter(reward => {
      // فیلتر بر اساس دسته‌بندی
      const categoryMatch = filterCategory === 'all' || 
                          reward.category.toLowerCase() === filterCategory.toLowerCase();
      
      // فیلتر بر اساس عبارت جستجو
      const searchMatch = !searchQuery || 
                        reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        reward.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  };
  
  // مدیریت خرید جایزه
  const handlePurchaseReward = (rewardId: number) => {
    purchaseRewardMutation.mutate(rewardId);
  };
  
  // وضعیت بارگذاری
  if (isLoading || isLoadingCredits || purchaseRewardMutation.isPending) {
    return <RewardsLoadingSkeleton />;
  }
  
  // جایزه ویژه (اولین جایزه در لیست یا با ویژگی featured)
  const featuredReward = filteredRewards().find(r => r.featured) || filteredRewards()[0];
  const regularRewards = featuredReward ? 
    filteredRewards().filter(r => r.id !== featuredReward.id) : 
    filteredRewards();
  
  return (
    <>
      {/* جایزه ویژه */}
      {featuredReward && (
        <FeaturedReward 
          reward={featuredReward} 
          onPurchase={handlePurchaseReward}
          userCredits={userCredits}
        />
      )}
      
      {/* وضعیت اعتبار کاربر */}
      <div className="bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent rounded-lg border border-gray-100 dark:border-gray-800 p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 mr-3">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">اعتبار شما</p>
            <p className="text-2xl font-bold">{userCredits} <span className="text-sm font-normal text-muted-foreground">امتیاز</span></p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center">
          <div className="h-10 mx-4 border-r border-gray-200 dark:border-gray-700"></div>
          <div className="text-sm">
            <p className="text-muted-foreground">از طریق تکمیل چالش‌ها و کسب دستاوردها،</p>
            <p className="text-muted-foreground">امتیازات بیشتری جمع‌آوری کنید!</p>
          </div>
        </div>
      </div>
      
      {/* لیست جوایز */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {regularRewards.map((reward) => (
          <RewardCard 
            key={reward.id}
            reward={reward}
            onPurchase={handlePurchaseReward}
            userCredits={userCredits}
          />
        ))}
      </div>
      
      {/* بدون نتیجه */}
      {regularRewards.length === 0 && (
        <div className="text-center py-12">
          <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
          <h3 className="text-lg font-medium mb-1">هیچ جایزه‌ای یافت نشد</h3>
          <p className="text-sm text-muted-foreground">
            با تغییر فیلترها یا عبارت جستجو، جوایز بیشتری را جستجو کنید.
          </p>
        </div>
      )}
    </>
  );
};

export default Rewards;