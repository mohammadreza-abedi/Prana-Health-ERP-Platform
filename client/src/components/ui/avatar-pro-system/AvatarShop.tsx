import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AvatarCard from './AvatarCard';
import { 
  ShoppingCart, Store, Sparkles, Crown, Trophy, Gift, Search, 
  Filter, ArrowLeft, User, Tag, Package, Shield, Star, AlertCircle, Undo2
} from 'lucide-react';
import { Link } from 'wouter';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

// مسیرهای تصاویر آواتارها - مجموعه کامل آواتارها
const priaGimbalKacamata = '/avatar-images/Pria Gimbal Kacamata.png'; // آواتار سبز اصلی
const priaMohawk = '/avatar-images/Pria Mohawk.png'; // آواتار پسر با موهای آبی
const wanitaUraiTopi = '/avatar-images/Wanita Urai Topi.png'; // آواتار دختر با کلاه
const wanitaBerhijabBerkacamata = '/avatar-images/Wanita Berhijab Berkacamata.png'; // آواتار دختر با حجاب
const priaGimbalSebelahKacamata = '/avatar-images/Pria Gimbal sebelah Kacamata.png'; // آواتار پسر با طراحی ویژه
const priaPoniBrewokan = '/avatar-images/Pria Poni Brewokan.png'; // آواتار پسر با ریش
const priaRambutLepekTopi = '/avatar-images/Pria Rambut Lepek Topi.png'; // آواتار پسر با کلاه 
const wanitaHijabSweater = '/avatar-images/Wanita Hijab Sweater.png'; // آواتار دختر با حجاب و لباس گرم
const wanitaKuncirTopi = '/avatar-images/Wanita Kuncir Topi.png'; // آواتار دختر با مو بسته و کلاه

export interface ShopItemData {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  type: 'avatar' | 'frame' | 'background' | 'accessory' | 'effect';
  price: number;
  xpPrice?: number;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requiredLevel?: number;
  isAvailable: boolean;
  isLimited?: boolean;
  limitedRemaining?: number;
}

export interface AvatarShopProps {
  initialData?: {
    userLevel: number;
    userXP: number;
    nextLevelXP: number;
    userCredits: number;
  };
  className?: string;
  onPurchase?: (item: ShopItemData) => Promise<boolean>;
}

const AvatarShop: React.FC<AvatarShopProps> = ({
  initialData = {
    userLevel: 5,
    userXP: 2500,
    nextLevelXP: 5000,
    userCredits: 1200
  },
  className,
  onPurchase
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userItems, setUserItems] = useState<number[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [filterRarity, setFilterRarity] = useState<'common' | 'rare' | 'epic' | 'legendary' | null>(null);

  // داده‌های فروشگاه (در یک اپلیکیشن واقعی باید از API گرفته شود)
  const shopItems: ShopItemData[] = [
    // آواتارها - مجموعه کامل و متنوع
    {
      id: 101,
      name: "کاراکتر سبز",
      imagePath: priaGimbalKacamata,
      description: "آواتار اصلی سبز با طراحی خاص و عینک",
      type: 'avatar',
      price: 0, // رایگان - پیش‌فرض
      category: "male",
      rarity: "common",
      isAvailable: true
    },
    {
      id: 102,
      name: "کاراکتر آبی",
      imagePath: priaMohawk,
      description: "آواتار پسر با موهای آبی و طرح خاص",
      type: 'avatar',
      price: 500,
      category: "male",
      rarity: "rare",
      requiredLevel: 3,
      isAvailable: true
    },
    {
      id: 103,
      name: "دختر با کلاه",
      imagePath: wanitaUraiTopi,
      description: "آواتار دختر با کلاه و طرح ویژه",
      type: 'avatar',
      price: 500,
      category: "female",
      rarity: "rare",
      requiredLevel: 3,
      isAvailable: true
    },
    {
      id: 104,
      name: "پسر با ریش",
      imagePath: priaPoniBrewokan,
      description: "آواتار پسر با طراحی ریش و موی خاص",
      type: 'avatar',
      price: 700,
      category: "male",
      rarity: "rare",
      requiredLevel: 4,
      isAvailable: true
    },
    {
      id: 105,
      name: "پسر با کلاه",
      imagePath: priaRambutLepekTopi,
      description: "آواتار کاراکتر پسر با کلاه مخصوص",
      type: 'avatar',
      price: 700,
      category: "male",
      rarity: "rare",
      requiredLevel: 4,
      isAvailable: true
    },
    {
      id: 106,
      name: "دختر با حجاب",
      imagePath: wanitaHijabSweater,
      description: "آواتار دختر با حجاب و لباس گرم",
      type: 'avatar',
      price: 1000,
      category: "female",
      rarity: "epic",
      requiredLevel: 6,
      isAvailable: true
    },
    {
      id: 107,
      name: "دختر کلاه‌دار",
      imagePath: wanitaKuncirTopi,
      description: "آواتار دختر با مو بسته و کلاه ویژه",
      type: 'avatar',
      price: 1000,
      category: "female",
      rarity: "epic",
      requiredLevel: 6,
      isAvailable: true
    },
    {
      id: 108,
      name: "دختر با حجاب و عینک",
      imagePath: wanitaBerhijabBerkacamata,
      description: "آواتار ویژه و کمیاب دختر با حجاب و عینک طبی",
      type: 'avatar',
      price: 1200,
      category: "female",
      rarity: "epic",
      requiredLevel: 7,
      isAvailable: true
    },
    {
      id: 109,
      name: "کاراکتر افسانه‌ای",
      imagePath: priaGimbalSebelahKacamata,
      description: "آواتار پسر با طراحی فوق‌العاده خاص و نادر",
      type: 'avatar',
      price: 3000,
      category: "male",
      rarity: "legendary",
      requiredLevel: 12,
      isAvailable: true,
      isLimited: true,
      limitedRemaining: 5
    },
    // فریم‌ها - قاب‌ها
    {
      id: 201,
      name: "قاب طلایی",
      imagePath: "/placeholders/frame-gold.png",
      description: "قاب درخشان طلایی برای آواتار شما",
      type: 'frame',
      price: 300,
      category: "common",
      rarity: "rare",
      isAvailable: true
    },
    {
      id: 202,
      name: "قاب الماسی",
      imagePath: "/placeholders/frame-diamond.png",
      description: "قاب الماسی کمیاب با درخشش ویژه",
      type: 'frame',
      price: 800,
      category: "premium",
      rarity: "epic",
      requiredLevel: 5,
      isAvailable: true
    },
    // پس‌زمینه‌ها
    {
      id: 301,
      name: "پس‌زمینه آسمان",
      imagePath: "/placeholders/bg-sky.png",
      description: "پس‌زمینه آسمان آبی برای آواتار شما",
      type: 'background',
      price: 200,
      category: "nature",
      rarity: "rare",
      isAvailable: true
    },
    {
      id: 302,
      name: "پس‌زمینه کهکشانی",
      imagePath: "/placeholders/bg-galaxy.png",
      description: "پس‌زمینه فضایی با طرح کهکشان",
      type: 'background',
      price: 600,
      category: "space",
      rarity: "epic",
      isAvailable: true
    },
    // افکت‌ها
    {
      id: 401,
      name: "افکت آتش",
      imagePath: "/placeholders/effect-fire.png",
      description: "افکت شعله‌های آتش برای دور آواتار",
      type: 'effect',
      price: 450,
      category: "elements",
      rarity: "rare",
      isAvailable: true
    },
    {
      id: 402,
      name: "افکت رعد و برق",
      imagePath: "/placeholders/effect-lightning.png",
      description: "افکت رعد و برق با درخشش خیره‌کننده",
      type: 'effect',
      price: 950,
      category: "elements",
      rarity: "epic",
      requiredLevel: 8,
      isAvailable: true
    },
    // اکسسوری‌ها
    {
      id: 501,
      name: "تاج سلامتی",
      imagePath: "/placeholders/accessory-crown.png",
      description: "تاج مخصوص فعالان سلامت",
      type: 'accessory',
      price: 400,
      category: "head",
      rarity: "rare",
      isAvailable: true
    },
    {
      id: 502,
      name: "نشان قهرمان",
      imagePath: "/placeholders/accessory-badge.png",
      description: "نشان ویژه قهرمانان سازمان",
      type: 'accessory',
      price: 700,
      category: "neck",
      rarity: "epic",
      requiredLevel: 6,
      isAvailable: true
    }
  ];

  // فیلتر آیتم‌ها بر اساس تب فعال و جستجو
  const getFilteredItems = () => {
    let items = shopItems;

    // فیلتر براساس نوع
    if (activeTab !== 'all') {
      items = items.filter(item => item.type === activeTab);
    }

    // فیلتر براساس کمیابی
    if (filterRarity) {
      items = items.filter(item => item.rarity === filterRarity);
    }

    // فیلتر براساس جستجو
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
      );
    }

    return items;
  };

  // خرید آیتم
  const handlePurchase = async (item: ShopItemData) => {
    if (initialData.userCredits < item.price) {
      toast({
        title: "اعتبار ناکافی",
        description: `شما به ${item.price - initialData.userCredits} اعتبار بیشتر نیاز دارید`,
        variant: "destructive",
      });
      return;
    }

    if (item.requiredLevel && initialData.userLevel < item.requiredLevel) {
      toast({
        title: "سطح ناکافی",
        description: `برای خرید این آیتم به سطح ${item.requiredLevel} نیاز دارید`,
        variant: "destructive",
      });
      return;
    }

    if (userItems.includes(item.id)) {
      toast({
        title: "قبلاً خریداری شده",
        description: "شما این آیتم را قبلاً خریداری کرده‌اید",
        variant: "default",
      });
      return;
    }

    setIsLoading(true);
    setSelectedItemId(item.id);

    try {
      // در یک نسخه واقعی، اینجا API call انجام می‌شود
      const success = onPurchase ? await onPurchase(item) : true;
      
      // شبیه‌سازی تأخیر شبکه
      await new Promise(r => setTimeout(r, 1000));
      
      if (success) {
        // افزودن آیتم به لیست آیتم‌های کاربر
        setUserItems(prev => [...prev, item.id]);
        
        toast({
          title: "خرید موفق",
          description: `آیتم ${item.name} با موفقیت خریداری شد`,
          variant: "success",
        });
      }
    } catch (error) {
      toast({
        title: "خطا در خرید",
        description: "متأسفانه مشکلی در فرایند خرید رخ داد",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setSelectedItemId(null);
    }
  };

  // پیشرفت XP
  const xpProgress = Math.min(100, (initialData.userXP / initialData.nextLevelXP) * 100);

  // شبیه‌سازی لود اطلاعات کاربر
  useEffect(() => {
    // در یک نسخه واقعی، اینجا API call انجام می‌شود
    setUserItems([101, 201]); // فرض کنیم کاربر قبلاً این آیتم‌ها را خریده است
  }, []);

  const filteredItems = getFilteredItems();
  const selectedItem = selectedItemId ? shopItems.find(item => item.id === selectedItemId) : null;

  return (
    <div className={className}>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">فروشگاه آواتار</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">آیتم‌های ویژه برای شخصی‌سازی آواتار</p>
        </div>
        
        <Button variant="outline" className="border-tiffany/30 text-tiffany" asChild>
          <Link href="/avatar-studio">
            <User className="h-5 w-5 ml-1" />
            استودیوی آواتار
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* پنل جستجو و فیلتر */}
        <div className="lg:col-span-3">
          <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="جستجو در فروشگاه..."
                    className="pr-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="outline" size="sm" className="h-10">
                        <Filter className="h-4 w-4 ml-1" />
                        کمیابی
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent align="end" className="w-60">
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          size="sm" 
                          variant={filterRarity === null ? "default" : "outline"}
                          className="w-full text-xs"
                          onClick={() => setFilterRarity(null)}
                        >
                          همه
                        </Button>
                        <Button 
                          size="sm" 
                          variant={filterRarity === "common" ? "default" : "outline"}
                          className="w-full text-xs"
                          onClick={() => setFilterRarity("common")}
                        >
                          معمولی
                        </Button>
                        <Button 
                          size="sm" 
                          variant={filterRarity === "rare" ? "default" : "outline"}
                          className="w-full text-xs bg-blue-500 text-white hover:bg-blue-600"
                          onClick={() => setFilterRarity("rare")}
                        >
                          کمیاب
                        </Button>
                        <Button 
                          size="sm" 
                          variant={filterRarity === "epic" ? "default" : "outline"}
                          className="w-full text-xs bg-purple-500 text-white hover:bg-purple-600"
                          onClick={() => setFilterRarity("epic")}
                        >
                          حماسی
                        </Button>
                        <Button 
                          size="sm" 
                          variant={filterRarity === "legendary" ? "default" : "outline"}
                          className="w-full text-xs bg-amber-500 text-white hover:bg-amber-600"
                          onClick={() => setFilterRarity("legendary")}
                        >
                          افسانه‌ای
                        </Button>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  
                  {filterRarity && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-10"
                      onClick={() => setFilterRarity(null)}
                    >
                      <Undo2 className="h-4 w-4 ml-1" />
                      حذف فیلتر
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* پنل اطلاعات کاربر */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">کیف پول شما</CardTitle>
              <CardDescription>اطلاعات اعتبار و سطح شما</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 ml-2 text-amber-500" />
                  <span className="font-bold">اعتبار</span>
                </div>
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {initialData.userCredits.toLocaleString('fa-IR')}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 ml-1 text-tiffany" />
                    <span className="text-sm font-medium">سطح {initialData.userLevel}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {initialData.userXP.toLocaleString('fa-IR')} / {initialData.nextLevelXP.toLocaleString('fa-IR')} XP
                  </span>
                </div>
                <Progress value={xpProgress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/challenges">
                    <Crown className="h-4 w-4 ml-1" />
                    چالش‌ها
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/wallet">
                    <ShoppingCart className="h-4 w-4 ml-1" />
                    تراکنش‌ها
                  </Link>
                </Button>
              </div>
              
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full mt-2 text-slate-500">
                    <AlertCircle className="h-4 w-4 ml-1" />
                    راهنمای فروشگاه
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent align="center" className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">راهنمای فروشگاه آواتار</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      در فروشگاه آواتار پرانا، شما می‌توانید آواتارهای جدید، قاب‌ها، پس‌زمینه‌ها و موارد دیگر را خریداری کنید. برای خرید آیتم‌ها نیاز به اعتبار دارید که از طریق فعالیت‌های سلامت و تکمیل چالش‌ها به دست می‌آورید.
                    </p>
                    <Separator className="my-2" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Shield className="h-3 w-3 ml-1 text-blue-500" />
                        <span className="text-xs">کمیاب = 500-300</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-3 w-3 ml-1 text-purple-500" />
                        <span className="text-xs">حماسی = 1500-800</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-3 w-3 ml-1 text-amber-500" />
                        <span className="text-xs">افسانه‌ای = 5000-2000</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 ml-1 text-tiffany" />
                        <span className="text-xs">آیتم ویژه = محدود</span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardContent>
          </Card>
        </div>
        
        {/* پنل نمایش محصولات */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 bg-slate-100 dark:bg-slate-900">
                  <TabsTrigger value="all" className="flex gap-2 items-center">
                    <Store className="h-4 w-4" />
                    <span>همه</span>
                  </TabsTrigger>
                  <TabsTrigger value="avatar" className="flex gap-2 items-center">
                    <User className="h-4 w-4" />
                    <span>آواتارها</span>
                  </TabsTrigger>
                  <TabsTrigger value="frame" className="flex gap-2 items-center">
                    <Package className="h-4 w-4" />
                    <span>قاب‌ها</span>
                  </TabsTrigger>
                  <TabsTrigger value="background" className="flex gap-2 items-center">
                    <Tag className="h-4 w-4" />
                    <span>پس‌زمینه‌ها</span>
                  </TabsTrigger>
                  <TabsTrigger value="effect" className="flex gap-2 items-center">
                    <Gift className="h-4 w-4" />
                    <span>افکت‌ها</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="mb-4">
                  <h3 className="text-lg font-bold">
                    {activeTab === 'all' && 'همه آیتم‌ها'}
                    {activeTab === 'avatar' && 'آواتارها'}
                    {activeTab === 'frame' && 'قاب‌ها'}
                    {activeTab === 'background' && 'پس‌زمینه‌ها'}
                    {activeTab === 'effect' && 'افکت‌ها'}
                    {activeTab === 'accessory' && 'اکسسوری‌ها'}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {filteredItems.length} آیتم یافت شد
                  </p>
                </div>
                
                {filteredItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Search className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-4" />
                    <h3 className="text-lg font-medium">نتیجه‌ای یافت نشد</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">لطفاً معیارهای جستجو را تغییر دهید یا فیلترها را حذف کنید</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                      {filteredItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <AvatarCard
                            id={item.id}
                            name={item.name}
                            imagePath={item.type === 'avatar' ? item.imagePath : `/placeholders/${item.type}-${item.rarity}.png`}
                            category={item.category}
                            rarity={item.rarity}
                            price={item.price}
                            isLocked={!userItems.includes(item.id)}
                            isPurchaseable={true}
                            onClick={() => handlePurchase(item)}
                            className={isLoading && selectedItemId === item.id ? "opacity-70 pointer-events-none" : ""}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvatarShop;