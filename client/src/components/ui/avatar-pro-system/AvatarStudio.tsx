import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AvatarPreview from './AvatarPreview';
import AvatarCard from './AvatarCard';
import { 
  UserRound, Shield, Crown, Gift, Sparkles, Rocket, 
  ChevronLeft, ChevronRight, Info, AlertCircle, Zap, ShoppingBag
} from 'lucide-react';
import { Link } from 'wouter';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAvatar } from '@/contexts/AvatarContext';

// تعریف تایپ‌های مورد نیاز
export interface AvatarData {
  id: number;
  name: string;
  imagePath: string;
  category: string;
  rarity: string;
  description?: string;
  isDefault: boolean;
}

export interface AvatarStudioProps {
  initialData?: {
    userLevel: number;
    userXP: number;
    nextLevelXP: number;
    userCredits: number;
    activeAvatarId?: number;
  };
  className?: string;
  userId?: string;
  userName?: string;
  userRole?: string;
  onSave?: (avatarId: number) => void;
  onExport?: () => void;
}

const AvatarStudio: React.FC<AvatarStudioProps> = ({
  initialData = {
    userLevel: 5,
    userXP: 2500,
    nextLevelXP: 5000,
    userCredits: 1200,
    activeAvatarId: 1
  },
  className,
  userId = "user-123",
  userName = "کاربر پرانا",
  userRole = "کارشناس HSE",
  onSave,
  onExport
}) => {
  const { toast } = useToast();
  const { activeAvatarUrl, setActiveAvatarUrl, avatarName, setAvatarName } = useAvatar();
  const [activeTab, setActiveTab] = useState('avatars');
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | undefined>(initialData.activeAvatarId);
  const [isLoading, setIsLoading] = useState(false);
  const [userAvatarList, setUserAvatarList] = useState<AvatarData[]>([]);
  
  // حالت‌های فیلتر و جستجو
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null); // 'male', 'female' یا null
  const [styleFilter, setStyleFilter] = useState<string | null>(null); // 'korean' یا null
  const [rarityFilter, setRarityFilter] = useState<string | null>(null); // 'legendary', 'epic', 'rare', 'common' یا null
  const [ownedFilter, setOwnedFilter] = useState<boolean | null>(null); // true, false یا null
  const [sortBy, setSortBy] = useState<string>('newest'); // 'newest', 'oldest', 'rarity', 'price'

  // داده‌های آواتارهای پیش‌فرض و متنوع (در نسخه واقعی باید از API گرفته شود)
  const defaultAvatars: AvatarData[] = [
    // آواتارهای اصلی
    {
      id: 1,
      name: "آقای عینکی",
      imagePath: "/avatar-images/Pria Gimbal Kacamata.png",
      category: "male",
      rarity: "common",
      description: "آواتار مرد با موهای فر و عینک",
      isDefault: true
    },
    {
      id: 2,
      name: "آقای مو فرفری",
      imagePath: "/avatar-images/Pria Keriting Kacamata.png",
      category: "male",
      rarity: "common",
      description: "آواتار مرد با موهای فرفری و عینک",
      isDefault: true
    },
    {
      id: 3,
      name: "آقای خاص",
      imagePath: "/avatar-images/Pria Mohawk.png",
      category: "male",
      rarity: "rare", 
      description: "آواتار مرد با استایل موهاک",
      isDefault: true
    },
    {
      id: 4,
      name: "آقای کلاه به سر",
      imagePath: "/avatar-images/Pria Rambut Lepek Topi.png",
      category: "male",
      rarity: "common",
      description: "آواتار مرد با کلاه اسپرت",
      isDefault: true
    },
    {
      id: 5,
      name: "خانم محجبه",
      imagePath: "/avatar-images/Wanita Berhijab Berkacamata.png",
      category: "female",
      rarity: "rare",
      description: "آواتار خانم محجبه با عینک",
      isDefault: true
    },
    {
      id: 6,
      name: "خانم اسپرت",
      imagePath: "/avatar-images/Wanita Kuncir Topi.png",
      category: "female",
      rarity: "common",
      description: "آواتار خانم با موی بسته و کلاه",
      isDefault: true
    },
    {
      id: 7,
      name: "خانم کلاه دار",
      imagePath: "/avatar-images/Wanita Urai Topi.png",
      category: "female",
      rarity: "common",
      description: "آواتار خانم با موهای باز و کلاه",
      isDefault: true
    },
    {
      id: 8,
      name: "خانم با حجاب",
      imagePath: "/avatar-images/Wanita Hijab Sweater.png",
      category: "female",
      rarity: "rare",
      description: "آواتار خانم با حجاب و لباس اسپرت",
      isDefault: true
    },
    
    // آواتارهای کره‌ای جدید
    {
      id: 9,
      name: "پسر کلاه‌دار",
      imagePath: "/avatar-images/korean-style/Korean Boy Pony Hat.png",
      category: "male",
      rarity: "epic",
      description: "آواتار پسر با کلاه سبک کره‌ای",
      isDefault: false
    },
    {
      id: 10,
      name: "پسر هودی",
      imagePath: "/avatar-images/korean-style/Korean Boy Short Hair Jacket.png",
      category: "male",
      rarity: "epic",
      description: "آواتار پسر با هودی خاکستری سبک کره‌ای",
      isDefault: false
    },
    {
      id: 11,
      name: "دختر محجبه",
      imagePath: "/avatar-images/korean-style/Korean Girl Hijab Jacket.png",
      category: "female",
      rarity: "epic",
      description: "آواتار دختر با حجاب زرد و هودی صورتی سبک کره‌ای",
      isDefault: false
    },
    {
      id: 12,
      name: "دختر محجبه عینکی",
      imagePath: "/avatar-images/korean-style/Korean Girl Hijab Long Shirt.png",
      category: "female",
      rarity: "legendary",
      description: "آواتار دختر محجبه با عینک بنفش سبک کره‌ای",
      isDefault: false
    },
    
    // آواتارهای جدید
    {
      id: 13,
      name: "آقای ریش‌دار",
      imagePath: "/avatar-images/Pria Keriting Brewokan.png",
      category: "male",
      rarity: "rare",
      description: "آواتار مرد با موهای فرفری و ریش قرمز",
      isDefault: false
    },
    {
      id: 14,
      name: "آقای ورزشکار",
      imagePath: "/avatar-images/Pria Keriting Jaket.png",
      category: "male",
      rarity: "rare",
      description: "آواتار مرد با ژاکت ورزشی سبز",
      isDefault: false
    },
    {
      id: 15,
      name: "آقای کلاه قرمز",
      imagePath: "/avatar-images/Pria Keriting Topi.png",
      category: "male",
      rarity: "rare",
      description: "آواتار مرد با کلاه قرمز اسپرت",
      isDefault: false
    },
    {
      id: 16,
      name: "مرد با ریش",
      imagePath: "/avatar-images/Pria Rambut Pendek Brewokan.png",
      category: "male",
      rarity: "epic",
      description: "آواتار مرد با موی کوتاه و ریش",
      isDefault: false
    },
    {
      id: 17,
      name: "پسر کلاه سبز",
      imagePath: "/avatar-images/Pria Rambut Pendek Topi.png",
      category: "male",
      rarity: "epic",
      description: "آواتار پسر با کلاه سبز و بنفش",
      isDefault: false
    },
    {
      id: 18,
      name: "پسر موآبی",
      imagePath: "/avatar-images/Pria Rambut Pendek.png",
      category: "male",
      rarity: "epic",
      description: "آواتار پسر با موهای آبی و لباس سبز",
      isDefault: false
    },
    {
      id: 19,
      name: "خانم محجبه آبی",
      imagePath: "/avatar-images/Wanita Hijab Kacamata.png",
      category: "female",
      rarity: "legendary",
      description: "آواتار خانم با حجاب زرد و چهره آبی",
      isDefault: false
    }
  ];

  // چک کردن آیا آواتار مورد نظر قفل است یا نه
  const isAvatarLocked = (avatar: AvatarData): boolean => {
    // آواتارهای پیش‌فرض همیشه باز هستند
    if (avatar.isDefault) return false;

    // بررسی اینکه آیا کاربر آواتار را قبلاً خریداری کرده است
    const userHasAvatar = userAvatarList.some(userAvatar => userAvatar.id === avatar.id);
    if (userHasAvatar) return false;

    // سایر آواتارها قفل هستند
    return true;
  };

  // محاسبه امتیاز مورد نیاز برای آواتار
  const getRequiredXPForAvatar = (avatar: AvatarData): number => {
    if (avatar.rarity === 'rare') return 3000;
    if (avatar.rarity === 'epic') return 7000;
    if (avatar.rarity === 'legendary') return 12000;
    return 0;
  };

  // محاسبه قیمت آواتار
  const getAvatarPrice = (avatar: AvatarData): number => {
    if (avatar.rarity === 'rare') return 500;
    if (avatar.rarity === 'epic') return 1200;
    if (avatar.rarity === 'legendary') return 3000;
    return 0;
  };

  // شبیه‌سازی لود اطلاعات کاربر
  useEffect(() => {
    // در یک اپلیکیشن واقعی، اینجا API call انجام می‌شود
    setUserAvatarList(defaultAvatars.filter(avatar => avatar.isDefault));
  }, []);

  // تغییر آواتار انتخابی
  const handleAvatarSelect = (avatarId: number) => {
    setSelectedAvatarId(avatarId);
  };

  // ذخیره آواتار انتخابی و به‌روزرسانی آواتار فعال در کانتکست
  const handleSaveAvatar = () => {
    if (!selectedAvatarId) {
      toast({
        title: "خطا",
        description: "لطفاً ابتدا یک آواتار انتخاب کنید",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // یافتن آواتار انتخاب شده
    const avatar = defaultAvatars.find(a => a.id === selectedAvatarId);
    if (!avatar) {
      toast({
        title: "خطا",
        description: "آواتار انتخاب شده یافت نشد",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // شبیه‌سازی API call
    setTimeout(() => {
      setIsLoading(false);
      
      // به‌روزرسانی آواتار فعال در کانتکست
      setActiveAvatarUrl(avatar.imagePath);
      setAvatarName(avatar.name);
      
      toast({
        title: "موفقیت‌آمیز",
        description: "آواتار شما با موفقیت ذخیره شد",
        variant: "success",
      });
      
      // فراخوانی callback
      if (onSave) {
        onSave(selectedAvatarId);
      }
      
    }, 1000);
  };

  // خرید آواتار جدید
  const handlePurchaseAvatar = (avatar: AvatarData) => {
    const price = getAvatarPrice(avatar);
    
    if (initialData.userCredits < price) {
      toast({
        title: "اعتبار ناکافی",
        description: `شما به ${price - initialData.userCredits} اعتبار بیشتر نیاز دارید`,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // شبیه‌سازی API call
    setTimeout(() => {
      setIsLoading(false);
      
      // افزودن آواتار به لیست آواتارهای کاربر
      setUserAvatarList(prev => [...prev, avatar]);
      
      // انتخاب آواتار جدید
      setSelectedAvatarId(avatar.id);
      
      toast({
        title: "خرید موفق",
        description: `آواتار ${avatar.name} با موفقیت خریداری شد`,
        variant: "success",
      });
      
    }, 1000);
  };

  // فیلتر کردن و مرتب‌سازی آواتارها
  const filteredAvatars = useMemo(() => {
    let result = [...defaultAvatars];
    
    // اعمال فیلتر جستجو
    if (searchTerm) {
      result = result.filter(avatar => 
        avatar.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        avatar.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // اعمال فیلتر جنسیت
    if (categoryFilter) {
      result = result.filter(avatar => avatar.category === categoryFilter);
    }
    
    // اعمال فیلتر سبک کره‌ای
    if (styleFilter === 'korean') {
      result = result.filter(avatar => avatar.imagePath.includes('korean'));
    }
    
    // اعمال فیلتر کمیابی
    if (rarityFilter) {
      result = result.filter(avatar => avatar.rarity === rarityFilter);
    }
    
    // اعمال فیلتر مالکیت
    if (ownedFilter !== null) {
      if (ownedFilter) {
        // فقط آواتارهای مالکیت شده
        const ownedIds = userAvatarList.map(a => a.id);
        result = result.filter(avatar => ownedIds.includes(avatar.id));
      } else {
        // فقط آواتارهای قفل شده
        result = result.filter(avatar => isAvatarLocked(avatar));
      }
    }
    
    // مرتب‌سازی نتایج
    return result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.id - b.id;
        case 'newest':
          return b.id - a.id;
        case 'rarity':
          const rarityOrder = { legendary: 4, epic: 3, rare: 2, common: 1 };
          return rarityOrder[b.rarity as keyof typeof rarityOrder] - rarityOrder[a.rarity as keyof typeof rarityOrder];
        case 'price':
          return getAvatarPrice(b) - getAvatarPrice(a);
        default:
          return 0;
      }
    });
  }, [defaultAvatars, searchTerm, categoryFilter, styleFilter, rarityFilter, ownedFilter, sortBy, userAvatarList]);

  // تعداد آواتارهای فیلتر شده
  const filteredCount = filteredAvatars.length;
  
  // پاکسازی همه فیلترها
  const clearAllFilters = () => {
    setSearchTerm('');
    setCategoryFilter(null);
    setStyleFilter(null);
    setRarityFilter(null);
    setOwnedFilter(null);
    setSortBy('newest');
  };

  // پیش‌نمایش آواتار انتخاب شده
  const selectedAvatar = defaultAvatars.find(avatar => avatar.id === selectedAvatarId);

  // درصد پیشرفت XP
  const xpProgress = Math.min(100, (initialData.userXP / initialData.nextLevelXP) * 100);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* پنل پیش‌نمایش */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <motion.div 
                  key={selectedAvatarId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <AvatarPreview 
                    avatarImage={selectedAvatar?.imagePath}
                    avatarName={selectedAvatar?.name}
                    userName={userName}
                    userRole={userRole}
                    size="xl"
                    showStats={true}
                    showBadges={true}
                    rarity={selectedAvatar?.rarity as 'common' | 'rare' | 'epic' | 'legendary'}
                    level={initialData.userLevel}
                    xp={initialData.userXP}
                    credits={initialData.userCredits}
                  />
                </motion.div>

                <div className="w-full mt-6 space-y-4">
                  {/* نوار پیشرفت */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500 dark:text-slate-400">سطح {initialData.userLevel}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {initialData.userXP.toLocaleString('fa-IR')} / {initialData.nextLevelXP.toLocaleString('fa-IR')} XP
                      </span>
                    </div>
                    <Progress value={xpProgress} className="h-2" />
                  </div>
                  
                  {/* دکمه‌های عملیات */}
                  <div className="flex gap-3">
                    <Button 
                      className="w-full" 
                      onClick={handleSaveAvatar}
                      disabled={isLoading || !selectedAvatarId}
                    >
                      {isLoading ? 'در حال ذخیره...' : 'فعال‌سازی آواتار'} 
                    </Button>
                    
                    <Button asChild variant="outline" className="flex-shrink-0">
                      <Link href="/avatar-shop">
                        <ShoppingBag className="h-5 w-5 ml-2" />
                        فروشگاه
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* پنل انتخاب و تنظیم */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 bg-slate-100 dark:bg-slate-900">
                  <TabsTrigger value="avatars" className="flex gap-2 items-center">
                    <UserRound className="h-4 w-4" />
                    <span>آواتارها</span>
                  </TabsTrigger>
                  <TabsTrigger value="info" className="flex gap-2 items-center">
                    <Info className="h-4 w-4" />
                    <span>اطلاعات</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="avatars" className="space-y-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold">انتخاب آواتار</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        از میان {defaultAvatars.length} آواتار متنوع انتخاب کنید یا آواتارهای جدید را از فروشگاه خریداری کنید
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 px-2">
                            <AlertCircle className="h-4 w-4 ml-1" />
                            راهنما
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent align="end" className="w-80">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">راهنمای آواتارها</h4>
                            <p className="text-xs">
                              آواتارهای پیش‌فرض با رنگ معمولی نمایش داده می‌شوند. آواتارهای قفل شده را می‌توانید با XP یا اعتبار باز کنید.
                            </p>
                            <div className="flex flex-col gap-1 mt-3">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px]">معمولی</Badge>
                                <span className="text-xs">آواتارهای پیش‌فرض</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px]">کمیاب</Badge>
                                <span className="text-xs">نیاز به 3000 XP</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-[10px]">حماسی</Badge>
                                <span className="text-xs">نیاز به 7000 XP</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-[10px]">افسانه‌ای</Badge>
                                <span className="text-xs">نیاز به 12000 XP</span>
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </div>
                  
                  {/* فیلترهای آواتار */}
                  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={!categoryFilter && !styleFilter && !rarityFilter && ownedFilter === null ? "default" : "outline"}
                        size="sm" 
                        onClick={clearAllFilters}
                        className={!categoryFilter && !styleFilter && !rarityFilter && ownedFilter === null 
                            ? "bg-tiffany text-white text-xs" 
                            : "bg-white/80 dark:bg-slate-800/80 text-xs"
                        }
                      >
                        همه آواتارها
                      </Button>
                      
                      <Button 
                        variant={categoryFilter === 'male' ? "default" : "outline"}
                        size="sm" 
                        onClick={() => setCategoryFilter(categoryFilter === 'male' ? null : 'male')}
                        className={categoryFilter === 'male' 
                            ? "bg-blue-500 text-white text-xs" 
                            : "bg-white/80 dark:bg-slate-800/80 text-xs"
                        }
                      >
                        مرد
                        <span className="bg-white/20 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center mr-1">
                          {defaultAvatars.filter(a => a.category === 'male').length}
                        </span>
                      </Button>
                      
                      <Button 
                        variant={categoryFilter === 'female' ? "default" : "outline"}
                        size="sm" 
                        onClick={() => setCategoryFilter(categoryFilter === 'female' ? null : 'female')}
                        className={categoryFilter === 'female' 
                            ? "bg-pink-500 text-white text-xs" 
                            : "bg-white/80 dark:bg-slate-800/80 text-xs"
                        }
                      >
                        زن
                        <span className="bg-white/20 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center mr-1">
                          {defaultAvatars.filter(a => a.category === 'female').length}
                        </span>
                      </Button>
                      
                      <Badge 
                        className={`ml-2 flex items-center ${
                          styleFilter === 'korean' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        } cursor-pointer`}
                        onClick={() => setStyleFilter(styleFilter === 'korean' ? null : 'korean')}
                      >
                        سبک کره‌ای
                        <span className={`${
                          styleFilter === 'korean' 
                            ? 'bg-white/20 text-white' 
                            : 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                        } text-[10px] rounded-full w-4 h-4 flex items-center justify-center mr-1 ml-1`}>
                          {defaultAvatars.filter(a => a.imagePath.includes('korean')).length}
                        </span>
                      </Badge>
                      
                      <Badge 
                        className={`flex items-center ${
                          rarityFilter === 'legendary' 
                            ? 'bg-amber-500 text-white' 
                            : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        } cursor-pointer`}
                        onClick={() => setRarityFilter(rarityFilter === 'legendary' ? null : 'legendary')}
                      >
                        افسانه‌ای
                        <span className={`${
                          rarityFilter === 'legendary' 
                            ? 'bg-white/20 text-white' 
                            : 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                        } text-[10px] rounded-full w-4 h-4 flex items-center justify-center mr-1 ml-1`}>
                          {defaultAvatars.filter(a => a.rarity === 'legendary').length}
                        </span>
                      </Badge>
                      
                      <Badge 
                        className={`flex items-center ${
                          rarityFilter === 'epic' 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        } cursor-pointer`}
                        onClick={() => setRarityFilter(rarityFilter === 'epic' ? null : 'epic')}
                      >
                        حماسی
                        <span className={`${
                          rarityFilter === 'epic' 
                            ? 'bg-white/20 text-white' 
                            : 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'
                        } text-[10px] rounded-full w-4 h-4 flex items-center justify-center mr-1 ml-1`}>
                          {defaultAvatars.filter(a => a.rarity === 'epic').length}
                        </span>
                      </Badge>
                      
                      <Badge 
                        className={`flex items-center ${
                          ownedFilter === true 
                            ? 'bg-tiffany text-white' 
                            : 'bg-white/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                        } cursor-pointer`}
                        onClick={() => setOwnedFilter(ownedFilter === true ? null : true)}
                      >
                        آواتارهای من
                        <span className={`${
                          ownedFilter === true 
                            ? 'bg-white/20 text-white' 
                            : 'bg-tiffany/10 text-tiffany dark:bg-tiffany/20 dark:text-tiffany'
                        } text-[10px] rounded-full w-4 h-4 flex items-center justify-center mr-1 ml-1`}>
                          {userAvatarList.length}
                        </span>
                      </Badge>
                    </div>
                  </div>
                  
                  {/* جستجو و مرتب‌سازی */}
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-auto">
                      <input 
                        className="h-9 w-full md:w-64 px-3 py-2 rounded-md bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-sm focus:outline-none focus:ring-2 focus:ring-tiffany focus:border-transparent"
                        placeholder="جستجوی آواتارها..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center">
                        {searchTerm ? (
                          <button 
                            onClick={() => setSearchTerm('')}
                            className="w-4 h-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 items-center w-full md:w-auto">
                      <span className="text-xs text-slate-500 dark:text-slate-400">مرتب‌سازی:</span>
                      <select 
                        className="h-9 px-3 py-1 text-sm rounded-md bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-tiffany"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="newest">جدیدترین</option>
                        <option value="oldest">قدیمی‌ترین</option>
                        <option value="rarity">کمیابی</option>
                        <option value="price">قیمت</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* اطلاعات فیلتر */}
                  <div className="flex justify-between items-center">
                    <div>
                      {(searchTerm || categoryFilter || styleFilter || rarityFilter || ownedFilter !== null) && (
                        <div className="flex items-center">
                          <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">فیلترهای فعال:</span>
                          {searchTerm && (
                            <Badge variant="outline" className="text-xs mr-1">
                              جستجو: {searchTerm}
                            </Badge>
                          )}
                          {categoryFilter && (
                            <Badge variant="outline" className="text-xs mr-1">
                              {categoryFilter === 'male' ? 'مرد' : 'زن'}
                            </Badge>
                          )}
                          {styleFilter === 'korean' && (
                            <Badge variant="outline" className="text-xs mr-1">
                              سبک کره‌ای
                            </Badge>
                          )}
                          {rarityFilter && (
                            <Badge variant="outline" className="text-xs mr-1">
                              {
                                rarityFilter === 'legendary' ? 'افسانه‌ای' : 
                                rarityFilter === 'epic' ? 'حماسی' :
                                rarityFilter === 'rare' ? 'کمیاب' : 'معمولی'
                              }
                            </Badge>
                          )}
                          {ownedFilter !== null && (
                            <Badge variant="outline" className="text-xs mr-1">
                              {ownedFilter ? 'فقط آواتارهای من' : 'فقط آواتارهای قفل شده'}
                            </Badge>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={clearAllFilters} 
                            className="h-6 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 px-2 mr-1"
                          >
                            پاک کردن
                          </Button>
                        </div>
                      )}
                    </div>
                    <div>
                      <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80">
                        {filteredCount} آواتار
                      </Badge>
                    </div>
                  </div>
                  
                  {/* گرید آواتارها */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                      {filteredAvatars.length > 0 ? (
                        filteredAvatars.map((avatar) => {
                          const isLocked = isAvatarLocked(avatar);
                          const isSelected = avatar.id === selectedAvatarId;
                          
                          return (
                            <motion.div
                              key={avatar.id}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.05 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              layout
                            >
                              <AvatarCard
                                id={avatar.id}
                                name={avatar.name}
                                imagePath={avatar.imagePath}
                                category={avatar.category}
                                rarity={avatar.rarity as 'common' | 'rare' | 'epic' | 'legendary'}
                                isLocked={isLocked}
                                isSelected={isSelected}
                                xpRequired={isLocked ? getRequiredXPForAvatar(avatar) : undefined}
                                price={isLocked ? getAvatarPrice(avatar) : undefined}
                                onClick={() => isLocked ? handlePurchaseAvatar(avatar) : handleAvatarSelect(avatar.id)}
                              />
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
                          <div className="text-slate-400 dark:text-slate-500 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                            </svg>
                          </div>
                          <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300">آواتاری یافت نشد</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1 max-w-xs">
                            با استفاده از فیلترهای دیگر جستجو کنید یا فیلترهای فعلی را حذف کنید.
                          </p>
                          <Button onClick={clearAllFilters} variant="outline" size="sm" className="mt-4">
                            نمایش همه آواتارها
                          </Button>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </TabsContent>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                    <h3 className="text-lg font-bold mb-3">درباره سیستم آواتار</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      سیستم آواتار پرانا به شما امکان شخصی‌سازی نمایه خود را می‌دهد. برای رسیدن به آواتارهای کمیاب‌تر، نیاز به کسب XP بیشتر دارید. 
                      همچنین می‌توانید با استفاده از اعتبار سیستم، آواتارهای ویژه را خریداری کنید.
                    </p>
                    
                    <div className="mt-4 space-y-2">
                      <h4 className="font-semibold text-sm flex items-center">
                        <Crown className="h-4 w-4 ml-1 text-amber-500" />
                        سطوح آواتار
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                          <Shield className="h-8 w-8 ml-2 text-slate-400" />
                          <div>
                            <h5 className="text-sm font-medium">آواتارهای معمولی</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400">برای همه کاربران در دسترس</p>
                          </div>
                        </div>
                        <div className="flex items-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                          <Shield className="h-8 w-8 ml-2 text-blue-400" />
                          <div>
                            <h5 className="text-sm font-medium">آواتارهای کمیاب</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400">نیاز به 3000 XP</p>
                          </div>
                        </div>
                        <div className="flex items-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                          <Shield className="h-8 w-8 ml-2 text-purple-400" />
                          <div>
                            <h5 className="text-sm font-medium">آواتارهای حماسی</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400">نیاز به 7000 XP</p>
                          </div>
                        </div>
                        <div className="flex items-center p-2 bg-white dark:bg-slate-800 rounded-lg">
                          <Shield className="h-8 w-8 ml-2 text-amber-400" />
                          <div>
                            <h5 className="text-sm font-medium">آواتارهای افسانه‌ای</h5>
                            <p className="text-xs text-slate-500 dark:text-slate-400">نیاز به 12000 XP</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <h4 className="font-semibold text-sm flex items-center">
                        <Zap className="h-4 w-4 ml-1 text-amber-500" />
                        نحوه کسب XP
                      </h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-slate-600 dark:text-slate-400">
                        <li>تکمیل چالش‌های روزانه سلامت (+10 تا +50 XP)</li>
                        <li>شرکت در رویدادهای سازمانی (+100 XP)</li>
                        <li>تکمیل پروفایل و اطلاعات سلامت (+200 XP)</li>
                        <li>دعوت از همکاران به سیستم (+300 XP)</li>
                        <li>کسب دستاوردها و نشان‌ها (+500 XP)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvatarStudio;