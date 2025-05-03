import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  Award, Zap, Gift, ShoppingBag, ShoppingCart, 
  Package, Ticket, Crown, Sparkles, ArrowRight, Tag, Clock, Coins, 
  ThumbsUp, Gem, CalendarCheck, Star, CreditCard, ShieldCheck
} from 'lucide-react';

export interface RewardItem {
  id: number;
  name: string;
  description: string;
  category: 'avatar' | 'badge' | 'theme' | 'feature' | 'physical' | 'coupon';
  image?: string;
  creditCost: number;
  xpRequired?: number;
  levelRequired?: number;
  discount?: number;
  originalCost?: number;
  isLocked: boolean;
  isNew: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  stock?: number;
  totalSold?: number;
  expiresAt?: string;
}

export interface RewardSystemProps {
  userLevel: number;
  userXP: number;
  userCredits: number;
  className?: string;
  onPurchaseItem?: (itemId: number, cost: number) => void;
}

const RewardSystem: React.FC<RewardSystemProps> = ({
  userLevel = 5,
  userXP = 2500,
  userCredits = 1200,
  className,
  onPurchaseItem
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // داده‌های نمونه آیتم‌های پاداش (در نسخه واقعی از API دریافت می‌شود)
  const [rewards, setRewards] = useState<RewardItem[]>([
    {
      id: 1,
      name: "آواتار افسانه‌ای گلکسی",
      description: "یک آواتار ویژه و منحصر به فرد با افکت‌های ویژه",
      category: 'avatar',
      image: "/avatar-images/korean-style/Korean Girl Hijab Long Shirt.png",
      creditCost: 3000,
      xpRequired: 12000,
      levelRequired: 10,
      isLocked: true,
      isNew: false,
      isPopular: true,
      isFeatured: true,
      totalSold: 45
    },
    {
      id: 2,
      name: "آواتار حماسی نینجا",
      description: "آواتار سبک نینجا با قابلیت تغییر رنگ",
      category: 'avatar',
      image: "/avatar-images/Pria Mohawk.png",
      creditCost: 1200,
      xpRequired: 7000,
      levelRequired: 7,
      isLocked: false,
      isNew: false,
      isPopular: true,
      isFeatured: false,
      totalSold: 78
    },
    {
      id: 3,
      name: "نشان ماراتن‌سوار",
      description: "نشان ویژه برای تکمیل چالش ماراتن",
      category: 'badge',
      creditCost: 800,
      isLocked: false,
      isNew: false,
      isPopular: false,
      isFeatured: false,
      totalSold: 32
    },
    {
      id: 4,
      name: "تم تاریک گلکسی",
      description: "تم زیبای گلکسی برای رابط کاربری",
      category: 'theme',
      creditCost: 500,
      isLocked: false,
      isNew: true,
      isPopular: true,
      isFeatured: true,
      totalSold: 156
    },
    {
      id: 5,
      name: "آمار پیشرفته",
      description: "دسترسی به آمار و گزارش‌های پیشرفته سلامتی",
      category: 'feature',
      creditCost: 1500,
      levelRequired: 5,
      isLocked: false,
      isNew: false,
      isPopular: false,
      isFeatured: false,
      totalSold: 87
    },
    {
      id: 6,
      name: "ساعت هوشمند سلامت",
      description: "ساعت هوشمند برای پایش سلامتی",
      category: 'physical',
      creditCost: 15000,
      isLocked: false,
      isNew: false,
      isPopular: true,
      isFeatured: true,
      stock: 3,
      totalSold: 12
    },
    {
      id: 7,
      name: "کوپن تخفیف کافه",
      description: "20% تخفیف در کافه شرکت",
      category: 'coupon',
      creditCost: 300,
      isLocked: false,
      isNew: true,
      isPopular: false,
      isFeatured: false,
      expiresAt: "1402/08/30",
      totalSold: 65
    },
    {
      id: 8,
      name: "ماگ سازمانی",
      description: "ماگ با لوگوی شرکت به همراه نام شما",
      category: 'physical',
      creditCost: 1800,
      isLocked: false,
      isNew: true,
      isPopular: false,
      isFeatured: false,
      stock: 25,
      totalSold: 28
    },
    {
      id: 9,
      name: "صفحه‌های داشبورد اضافی",
      description: "امکان اضافه کردن صفحات سفارشی به داشبورد",
      category: 'feature',
      creditCost: 2500,
      levelRequired: 8,
      isLocked: true,
      isNew: false,
      isPopular: false,
      isFeatured: true,
      totalSold: 36
    },
    {
      id: 10,
      name: "آواتار کمیاب بهاری",
      description: "آواتار مخصوص فصل بهار",
      category: 'avatar',
      image: "/avatar-images/Wanita Urai Topi.png",
      creditCost: 900,
      originalCost: 1200,
      discount: 25,
      xpRequired: 3000,
      levelRequired: 3,
      isLocked: false,
      isNew: false,
      isPopular: false,
      isFeatured: false,
      totalSold: 42
    },
    {
      id: 11,
      name: "کارت هدیه دیجی‌کالا",
      description: "کارت هدیه 200 هزار تومانی دیجی‌کالا",
      category: 'coupon',
      creditCost: 5000,
      isLocked: false,
      isNew: false,
      isPopular: true,
      isFeatured: false,
      stock: 10,
      totalSold: 8
    },
    {
      id: 12,
      name: "یک روز مرخصی تشویقی",
      description: "یک روز مرخصی اضافه با هماهنگی مدیر",
      category: 'coupon',
      creditCost: 8000,
      isLocked: false,
      isNew: true,
      isPopular: true,
      isFeatured: true,
      stock: 5,
      totalSold: 2
    }
  ]);

  // خرید آیتم
  const handlePurchaseItem = (item: RewardItem) => {
    // بررسی اینکه آیا کاربر اعتبار کافی دارد
    if (userCredits < item.creditCost) {
      toast({
        title: "اعتبار ناکافی",
        description: `شما به ${item.creditCost - userCredits} اعتبار بیشتر نیاز دارید`,
        variant: "destructive",
      });
      return;
    }
    
    // بررسی سطح مورد نیاز
    if (item.levelRequired && userLevel < item.levelRequired) {
      toast({
        title: "سطح ناکافی",
        description: `این آیتم به سطح ${item.levelRequired} نیاز دارد`,
        variant: "destructive",
      });
      return;
    }
    
    // بررسی XP مورد نیاز
    if (item.xpRequired && userXP < item.xpRequired) {
      toast({
        title: "XP ناکافی",
        description: `این آیتم به ${item.xpRequired.toLocaleString('fa-IR')} XP نیاز دارد`,
        variant: "destructive",
      });
      return;
    }
    
    // بررسی موجودی
    if (item.stock !== undefined && item.stock <= 0) {
      toast({
        title: "ناموجود",
        description: `این آیتم در حال حاضر ناموجود است`,
        variant: "destructive",
      });
      return;
    }
    
    // خرید آیتم
    toast({
      title: "خرید موفق",
      description: `${item.name} با موفقیت خریداری شد`,
      variant: "success",
    });
    
    // به‌روزرسانی موجودی
    const updatedRewards = rewards.map(r => {
      if (r.id === item.id && r.stock !== undefined) {
        return { ...r, stock: r.stock - 1, totalSold: (r.totalSold || 0) + 1 };
      }
      return r;
    });
    
    setRewards(updatedRewards);
    
    // فراخوانی callback
    if (onPurchaseItem) {
      onPurchaseItem(item.id, item.creditCost);
    }
  };

  // فیلتر کردن آیتم‌ها بر اساس تب فعال
  const filteredRewards = rewards.filter(reward => {
    if (activeTab === 'all') return true;
    if (activeTab === 'featured' && reward.isFeatured) return true;
    if (activeTab === 'new' && reward.isNew) return true;
    if (activeTab === 'popular' && reward.isPopular) return true;
    if (activeTab === 'affordable' && reward.creditCost <= userCredits) return true;
    if (activeTab === reward.category) return true;
    return false;
  });

  // نمایش آیکون مناسب برای هر دسته‌بندی
  const getCategoryIcon = (category: string, className: string = "h-4 w-4 ml-1") => {
    switch (category) {
      case 'avatar': return <UserIcon className={className} />;
      case 'badge': return <Award className={className} />;
      case 'theme': return <Sparkles className={className} />;
      case 'feature': return <Gem className={className} />;
      case 'physical': return <Package className={className} />;
      case 'coupon': return <Ticket className={className} />;
      default: return <Gift className={className} />;
    }
  };

  // نمایش نام فارسی هر دسته‌بندی
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'avatar': return 'آواتار';
      case 'badge': return 'نشان';
      case 'theme': return 'تم';
      case 'feature': return 'ویژگی';
      case 'physical': return 'فیزیکی';
      case 'coupon': return 'کوپن';
      default: return 'پاداش';
    }
  };

  // رنگ مناسب برای هر دسته‌بندی
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'avatar': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'badge': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      case 'theme': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'feature': return 'bg-tiffany/10 text-tiffany dark:bg-tiffany/20';
      case 'physical': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'coupon': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  // تعریف کامپوننت آیکون کاربر
  const UserIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  // نمایش کارت آیتم به صورت گرید
  const renderGridItem = (item: RewardItem) => {
    const isAffordable = userCredits >= item.creditCost;
    const isAvailable = item.stock === undefined || item.stock > 0;
    const isMeetLevel = !item.levelRequired || userLevel >= item.levelRequired;
    const isMeetXP = !item.xpRequired || userXP >= item.xpRequired;
    const canPurchase = isAffordable && isAvailable && isMeetLevel && isMeetXP && !item.isLocked;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className={`overflow-hidden h-full flex flex-col ${!canPurchase ? 'opacity-70' : ''}`}>
          <div className="relative">
            {/* تصویر آیتم */}
            <div className={`h-44 ${item.image ? '' : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center'}`}>
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="rounded-full bg-white/80 dark:bg-slate-700/80 p-6">
                  {getCategoryIcon(item.category, "h-12 w-12 text-slate-700 dark:text-slate-300")}
                </div>
              )}
            </div>
            
            {/* بج‌های روی تصویر */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {item.isNew && (
                <Badge className="bg-blue-500 text-white border-0">
                  <ThumbsUp className="h-3 w-3 ml-1" />
                  جدید
                </Badge>
              )}
              {item.isPopular && (
                <Badge className="bg-amber-500 text-white border-0">
                  <Star className="h-3 w-3 ml-1" />
                  محبوب
                </Badge>
              )}
              {item.discount && (
                <Badge className="bg-red-500 text-white border-0">
                  <Tag className="h-3 w-3 ml-1" />
                  {item.discount}٪
                </Badge>
              )}
            </div>
            
            {/* وضعیت موجودی */}
            {item.stock !== undefined && item.stock <= 5 && (
              <div className="absolute top-2 left-2">
                <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0">
                  {item.stock > 0 ? `${item.stock} عدد موجود` : 'ناموجود'}
                </Badge>
              </div>
            )}
            
            {/* تاریخ انقضا */}
            {item.expiresAt && (
              <div className="absolute bottom-2 left-2">
                <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[10px]">
                  <Clock className="h-3 w-3 ml-1" />
                  تا {item.expiresAt}
                </Badge>
              </div>
            )}
          </div>
          
          <CardHeader className="pb-2 pt-3">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className={getCategoryColor(item.category)}>
                {getCategoryIcon(item.category)}
                {getCategoryName(item.category)}
              </Badge>
              
              {(item.levelRequired || item.xpRequired) && (
                <div className="flex gap-1">
                  {item.levelRequired && (
                    <Badge variant="outline" className={`${isMeetLevel ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'} text-[10px]`}>
                      <Crown className="h-3 w-3 ml-1" />
                      سطح {item.levelRequired}+
                    </Badge>
                  )}
                  {item.xpRequired && (
                    <Badge variant="outline" className={`${isMeetXP ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'} text-[10px]`}>
                      <Zap className="h-3 w-3 ml-1" />
                      {(item.xpRequired / 1000).toFixed(1)}K XP
                    </Badge>
                  )}
                </div>
              )}
            </div>
            <CardTitle className="text-base mt-2">{item.name}</CardTitle>
            <CardDescription className="text-xs line-clamp-2">{item.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="pb-0 pt-0 flex-grow">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <ShoppingCart className="h-4 w-4 ml-1 text-slate-400" />
                <span className="text-slate-500 dark:text-slate-400">{item.totalSold || 0} فروش</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="mt-auto pb-3 pt-3 flex justify-between items-center gap-1">
            <div className="flex items-center">
              <Coins className="h-4 w-4 ml-1 text-amber-500" />
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-bold">{item.creditCost.toLocaleString('fa-IR')}</span>
                  <span className="text-xs mr-1">اعتبار</span>
                </div>
                {item.originalCost && item.discount && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 line-through">
                    {item.originalCost.toLocaleString('fa-IR')}
                  </span>
                )}
              </div>
            </div>
            
            <Button 
              variant={canPurchase ? "default" : "outline"} 
              size="sm"
              className="h-8"
              disabled={!canPurchase}
              onClick={() => handlePurchaseItem(item)}
            >
              <ShoppingBag className="h-4 w-4 ml-1" />
              خرید
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  // نمایش آیتم به صورت لیست
  const renderListItem = (item: RewardItem) => {
    const isAffordable = userCredits >= item.creditCost;
    const isAvailable = item.stock === undefined || item.stock > 0;
    const isMeetLevel = !item.levelRequired || userLevel >= item.levelRequired;
    const isMeetXP = !item.xpRequired || userXP >= item.xpRequired;
    const canPurchase = isAffordable && isAvailable && isMeetLevel && isMeetXP && !item.isLocked;

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`overflow-hidden ${!canPurchase ? 'opacity-70' : ''}`}>
          <div className="flex md:flex-row flex-col">
            {/* تصویر آیتم */}
            <div className={`w-full md:w-40 h-40 md:h-auto ${item.image ? '' : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center'}`}>
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="rounded-full bg-white/80 dark:bg-slate-700/80 p-5">
                    {getCategoryIcon(item.category, "h-10 w-10 text-slate-700 dark:text-slate-300")}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-grow p-4">
              <div className="flex flex-col md:flex-row justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className={getCategoryColor(item.category)}>
                      {getCategoryIcon(item.category)}
                      {getCategoryName(item.category)}
                    </Badge>
                    
                    {item.isNew && (
                      <Badge className="bg-blue-500 text-white border-0">
                        <ThumbsUp className="h-3 w-3 ml-1" />
                        جدید
                      </Badge>
                    )}
                    {item.isPopular && (
                      <Badge className="bg-amber-500 text-white border-0">
                        <Star className="h-3 w-3 ml-1" />
                        محبوب
                      </Badge>
                    )}
                    {item.discount && (
                      <Badge className="bg-red-500 text-white border-0">
                        <Tag className="h-3 w-3 ml-1" />
                        {item.discount}٪
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-base font-semibold">{item.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.levelRequired && (
                      <Badge variant="outline" className={`${isMeetLevel ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'} text-xs`}>
                        <Crown className="h-3 w-3 ml-1" />
                        نیاز به سطح {item.levelRequired}+
                      </Badge>
                    )}
                    {item.xpRequired && (
                      <Badge variant="outline" className={`${isMeetXP ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'} text-xs`}>
                        <Zap className="h-3 w-3 ml-1" />
                        نیاز به {item.xpRequired.toLocaleString('fa-IR')} XP
                      </Badge>
                    )}
                    {item.stock !== undefined && (
                      <Badge variant="outline" className="text-xs">
                        <Package className="h-3 w-3 ml-1" />
                        {item.stock > 0 ? `${item.stock} عدد موجود` : 'ناموجود'}
                      </Badge>
                    )}
                    {item.expiresAt && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 ml-1" />
                        انقضا: {item.expiresAt}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col justify-between items-end gap-3 mt-2 md:mt-0">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      <Coins className="h-4 w-4 ml-1 text-amber-500" />
                      <span className="font-bold text-lg">{item.creditCost.toLocaleString('fa-IR')}</span>
                      <span className="text-xs mr-1">اعتبار</span>
                    </div>
                    {item.originalCost && item.discount && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 line-through">
                        {item.originalCost.toLocaleString('fa-IR')}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    variant={canPurchase ? "default" : "outline"} 
                    disabled={!canPurchase}
                    onClick={() => handlePurchaseItem(item)}
                  >
                    <ShoppingBag className="h-4 w-4 ml-1" />
                    خرید
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className={className}>
      <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl overflow-hidden">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-lg mb-1">فروشگاه پاداش‌ها</CardTitle>
              <CardDescription>
                با اعتبارهای خود آیتم‌های ویژه خریداری کنید
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-amber-100/50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg shadow-sm">
                <Coins className="h-5 w-5 ml-2 text-amber-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userCredits.toLocaleString('fa-IR')} اعتبار</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">سطح {userLevel}</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="h-9">
                <CreditCard className="h-4 w-4 ml-1" />
                تاریخچه
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-8 bg-slate-100 dark:bg-slate-900">
                <TabsTrigger value="all" className="text-xs h-6 px-2">همه</TabsTrigger>
                <TabsTrigger value="featured" className="text-xs h-6 px-2">ویژه</TabsTrigger>
                <TabsTrigger value="new" className="text-xs h-6 px-2">جدید</TabsTrigger>
                <TabsTrigger value="popular" className="text-xs h-6 px-2">محبوب</TabsTrigger>
                <TabsTrigger value="affordable" className="text-xs h-6 px-2">قابل خرید</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="h-8 bg-slate-100 dark:bg-slate-900">
                  <TabsTrigger value="avatar" className="text-xs h-6 px-2">
                    <UserIcon className="h-3 w-3 ml-1" />
                    آواتار
                  </TabsTrigger>
                  <TabsTrigger value="badge" className="text-xs h-6 px-2">
                    <Award className="h-3 w-3 ml-1" />
                    نشان
                  </TabsTrigger>
                  <TabsTrigger value="coupon" className="text-xs h-6 px-2">
                    <Ticket className="h-3 w-3 ml-1" />
                    کوپن
                  </TabsTrigger>
                  <TabsTrigger value="physical" className="text-xs h-6 px-2">
                    <Package className="h-3 w-3 ml-1" />
                    فیزیکی
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex border rounded-md">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                  size="icon" 
                  className="h-8 w-8 rounded-none rounded-r-md"
                  onClick={() => setViewMode('grid')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'ghost'} 
                  size="icon" 
                  className="h-8 w-8 rounded-none rounded-l-md"
                  onClick={() => setViewMode('list')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {filteredRewards.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence>
                  {filteredRewards.map(renderGridItem)}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredRewards.map(renderListItem)}
                </AnimatePresence>
              </div>
            )
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <ShieldCheck className="h-12 w-12 mb-3 text-slate-300 dark:text-slate-600" />
              <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">آیتمی یافت نشد</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1">
                هیچ آیتمی با فیلترهای انتخاب شده یافت نشد. لطفاً فیلترهای دیگری را امتحان کنید.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setActiveTab('all')}
              >
                <ArrowRight className="h-4 w-4 ml-1" />
                مشاهده همه آیتم‌ها
              </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between flex-wrap gap-2">
          <Badge className="h-6 bg-white/80 dark:bg-slate-800/80">
            <ShoppingCart className="h-3 w-3 ml-1" />
            {filteredRewards.length} آیتم
          </Badge>
          
          <Button variant="link" size="sm" className="h-6 text-tiffany">
            <CalendarCheck className="h-3 w-3 ml-1" />
            آیتم‌های جدید هر هفته اضافه می‌شوند
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RewardSystem;