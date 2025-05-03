import React, { useState, useEffect } from 'react';
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
  const [activeTab, setActiveTab] = useState('avatars');
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | undefined>(initialData.activeAvatarId);
  const [isLoading, setIsLoading] = useState(false);
  const [userAvatarList, setUserAvatarList] = useState<AvatarData[]>([]);

  // داده‌های آواتارهای پیش‌فرض (در نسخه واقعی باید از API گرفته شود)
  const defaultAvatars: AvatarData[] = [
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
      name: "کاراکتر سبز",
      imagePath: "/avatar-images/Pria Gimbal Kacamata.png",
      category: "male",
      rarity: "common",
      description: "یک آواتار ساده با موهای سبز",
      isDefault: true
    },
    {
      id: 3,
      name: "کاراکتر سبز",
      imagePath: "/avatar-images/Pria Gimbal Kacamata.png",
      category: "male",
      rarity: "common", 
      description: "یک آواتار ساده با موهای سبز",
      isDefault: true
    },
    {
      id: 4,
      name: "کاراکتر سبز",
      imagePath: "/avatar-images/Pria Gimbal Kacamata.png",
      category: "male",
      rarity: "common",
      description: "یک آواتار ساده با موهای سبز",
      isDefault: true
    },
    {
      id: 5,
      name: "کاراکتر سبز",
      imagePath: "/avatar-images/Pria Gimbal Kacamata.png",
      category: "male",
      rarity: "rare",
      description: "یک آواتار ساده با موهای سبز",
      isDefault: false
    },
    {
      id: 6,
      name: "کاراکتر سبز",
      imagePath: "/avatar-images/Pria Gimbal Kacamata.png",
      category: "male",
      rarity: "rare",
      description: "یک آواتار ساده با موهای سبز",
      isDefault: false
    },
    {
      id: 7,
      name: "کاراکتر سبز",
      imagePath: "/avatar-images/Pria Gimbal Kacamata.png",
      category: "male",
      rarity: "epic",
      description: "یک آواتار ساده با موهای سبز",
      isDefault: false
    },
    {
      id: 8,
      name: "کاراکتر سبز",
      imagePath: "/avatar-images/Pria Gimbal Kacamata.png",
      category: "male",
      rarity: "legendary",
      description: "یک آواتار ساده با موهای سبز",
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

  // ذخیره آواتار انتخابی
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
    
    // شبیه‌سازی API call
    setTimeout(() => {
      setIsLoading(false);
      
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
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">انتخاب آواتار</h3>
                    
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
                  
                  {/* گرید آواتارها */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                      {defaultAvatars.map((avatar) => {
                        const isLocked = isAvatarLocked(avatar);
                        const isSelected = avatar.id === selectedAvatarId;
                        
                        return (
                          <motion.div
                            key={avatar.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: avatar.id * 0.05 }}
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
                      })}
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