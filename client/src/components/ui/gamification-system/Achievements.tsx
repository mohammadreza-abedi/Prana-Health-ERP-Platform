import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Award, BadgeCheck, Crown, Gift, Leaf, Medal, Smile, Star, Zap, BookOpen, Compass, HeartPulse, Brain, Footprints, Coffee, Users } from 'lucide-react';

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: 'general' | 'health' | 'activity' | 'nutrition' | 'social' | 'mental' | 'knowledge' | 'career';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'; // سطح دستاورد
  type: 'achievement' | 'badge';  // دستاورد یا نشان
  category: string;
  progress: number;
  total: number;
  xpReward: number;
  creditReward: number;
  unlocked: boolean;
  claimed: boolean;
  secret: boolean;
  dateUnlocked?: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementsProps {
  userLevel: number;
  className?: string;
  onClaimReward?: (achievementId: number, xp: number, credits: number) => void;
}

const Achievements: React.FC<AchievementsProps> = ({
  userLevel = 5,
  className,
  onClaimReward
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [sort, setSort] = useState<'progress' | 'newest' | 'oldest' | 'rarity'>('progress');
  
  // داده‌های نمونه دستاوردها (در نسخه واقعی از API دریافت می‌شود)
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: 'آغازگر راه سلامت',
      description: 'اولین چالش سلامتی خود را به اتمام رساندید',
      icon: 'general',
      tier: 'bronze',
      type: 'achievement',
      category: 'general',
      progress: 1,
      total: 1,
      xpReward: 100,
      creditReward: 25,
      unlocked: true,
      claimed: true,
      secret: false,
      dateUnlocked: '1402/05/12',
      rarity: 'common'
    },
    {
      id: 2,
      title: 'قدم‌های پیوسته',
      description: '10,000 قدم در روز به مدت 7 روز متوالی',
      icon: 'activity',
      tier: 'silver',
      type: 'achievement',
      category: 'activity',
      progress: 5,
      total: 7,
      xpReward: 200,
      creditReward: 50,
      unlocked: false,
      claimed: false,
      secret: false,
      rarity: 'uncommon'
    },
    {
      id: 3,
      title: 'مدیتیشن روزانه',
      description: 'به مدت 30 روز متوالی مدیتیشن کنید',
      icon: 'mental',
      tier: 'gold',
      type: 'achievement',
      category: 'mental',
      progress: 12,
      total: 30,
      xpReward: 500,
      creditReward: 150,
      unlocked: false,
      claimed: false,
      secret: false,
      rarity: 'rare'
    },
    {
      id: 4,
      title: 'نشان استمرار',
      description: 'به مدت 5 روز متوالی از برنامه استفاده کنید',
      icon: 'general',
      tier: 'bronze',
      type: 'badge',
      category: 'general',
      progress: 5,
      total: 5,
      xpReward: 50,
      creditReward: 15,
      unlocked: true,
      claimed: false,
      secret: false,
      dateUnlocked: '1402/06/01',
      rarity: 'common'
    },
    {
      id: 5,
      title: 'رژیم غذایی متعادل',
      description: 'به مدت 14 روز برنامه غذایی متعادل داشته باشید',
      icon: 'nutrition',
      tier: 'silver',
      type: 'achievement',
      category: 'nutrition',
      progress: 14,
      total: 14,
      xpReward: 300,
      creditReward: 75,
      unlocked: true,
      claimed: true,
      secret: false,
      dateUnlocked: '1402/05/28',
      rarity: 'uncommon'
    },
    {
      id: 6,
      title: 'همکار فعال',
      description: '5 همکار را به برنامه دعوت کنید',
      icon: 'social',
      tier: 'gold',
      type: 'achievement',
      category: 'social',
      progress: 3,
      total: 5,
      xpReward: 400,
      creditReward: 100,
      unlocked: false,
      claimed: false,
      secret: false,
      rarity: 'rare'
    },
    {
      id: 7,
      title: 'نشان ماراتن',
      description: 'یک ماراتن کامل (42.2 کیلومتر) را به پایان برسانید',
      icon: 'activity',
      tier: 'platinum',
      type: 'badge',
      category: 'activity',
      progress: 35,
      total: 42.2,
      xpReward: 1000,
      creditReward: 300,
      unlocked: false,
      claimed: false,
      secret: true,
      rarity: 'epic'
    },
    {
      id: 8,
      title: 'دانش سلامت',
      description: '10 مقاله آموزشی در مورد سلامت مطالعه کنید',
      icon: 'knowledge',
      tier: 'silver',
      type: 'achievement',
      category: 'knowledge',
      progress: 7,
      total: 10,
      xpReward: 250,
      creditReward: 60,
      unlocked: false,
      claimed: false,
      secret: false,
      rarity: 'uncommon'
    },
    {
      id: 9,
      title: 'نشان خواب منظم',
      description: 'به مدت 21 روز الگوی خواب منظم داشته باشید',
      icon: 'health',
      tier: 'gold',
      type: 'badge',
      category: 'health',
      progress: 21,
      total: 21,
      xpReward: 400,
      creditReward: 120,
      unlocked: true,
      claimed: true,
      secret: false,
      dateUnlocked: '1402/06/15',
      rarity: 'rare'
    },
    {
      id: 10,
      title: 'قهرمان پله‌ها',
      description: 'به جای آسانسور، از پله‌ها استفاده کنید (100 بار)',
      icon: 'activity',
      tier: 'silver',
      type: 'achievement',
      category: 'activity',
      progress: 85,
      total: 100,
      xpReward: 300,
      creditReward: 70,
      unlocked: false,
      claimed: false,
      secret: false,
      rarity: 'uncommon'
    },
    {
      id: 11,
      title: 'نشان مدیریت استرس',
      description: 'تکنیک‌های مدیریت استرس را به طور مرتب انجام دهید',
      icon: 'mental',
      tier: 'gold',
      type: 'badge',
      category: 'mental',
      progress: 30,
      total: 30,
      xpReward: 500,
      creditReward: 150,
      unlocked: true,
      claimed: false,
      secret: false,
      dateUnlocked: '1402/06/20',
      rarity: 'rare'
    },
    {
      id: 12,
      title: 'استاد سلامت',
      description: 'تمام دستاوردهای اصلی سلامت را به دست آورید',
      icon: 'health',
      tier: 'diamond',
      type: 'achievement',
      category: 'health',
      progress: 8,
      total: 15,
      xpReward: 2000,
      creditReward: 500,
      unlocked: false,
      claimed: false,
      secret: true,
      rarity: 'legendary'
    }
  ]);

  // متد دریافت جایزه دستاورد
  const handleClaimReward = (achievement: Achievement) => {
    // به‌روزرسانی وضعیت دستاورد
    const updatedAchievements = achievements.map(a => {
      if (a.id === achievement.id) {
        return { ...a, claimed: true };
      }
      return a;
    });
    
    setAchievements(updatedAchievements);
    
    // نمایش پیام موفقیت
    toast({
      title: "جایزه دریافت شد!",
      description: `${achievement.xpReward} XP و ${achievement.creditReward} اعتبار به حساب شما اضافه شد`,
      variant: "success",
    });
    
    // فراخوانی callback
    if (onClaimReward) {
      onClaimReward(achievement.id, achievement.xpReward, achievement.creditReward);
    }
  };

  // فیلتر کردن دستاوردها بر اساس تب فعال
  const filteredAchievements = achievements.filter(achievement => {
    // فیلتر بر اساس نوع (دستاورد یا نشان)
    if (activeTab === 'achievements' && achievement.type !== 'achievement') return false;
    if (activeTab === 'badges' && achievement.type !== 'badge') return false;
    
    // فیلتر بر اساس وضعیت
    if (activeTab === 'unlocked' && !achievement.unlocked) return false;
    if (activeTab === 'locked' && achievement.unlocked) return false;
    
    // نمایش دستاوردهای مخفی فقط اگر قفل آنها باز شده باشد
    if (achievement.secret && !achievement.unlocked) {
      return false;
    }
    
    return true;
  });

  // مرتب‌سازی دستاوردها
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    switch (sort) {
      case 'progress':
        // دستاوردهای باز شده در ابتدا، سپس بر اساس درصد پیشرفت
        if (a.unlocked && !b.unlocked) return -1;
        if (!a.unlocked && b.unlocked) return 1;
        return (b.progress / b.total) - (a.progress / a.total);
      case 'newest':
        // دستاوردهای جدیدتر (با شناسه بزرگتر) در ابتدا
        return b.id - a.id;
      case 'oldest':
        // دستاوردهای قدیمی‌تر (با شناسه کوچکتر) در ابتدا
        return a.id - b.id;
      case 'rarity':
        // بر اساس کمیابی
        const rarityOrder = { legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      default:
        return 0;
    }
  });

  // محاسبه آمار دستاوردها
  const totalUnlocked = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const unlockedPercentage = Math.round((totalUnlocked / totalAchievements) * 100);

  // آیکون مناسب برای هر دسته‌بندی
  const getCategoryIcon = (icon: string, size: number = 6) => {
    const className = `h-${size} w-${size}`;
    
    switch (icon) {
      case 'general': return <Award className={className} />;
      case 'health': return <HeartPulse className={className} />;
      case 'activity': return <Footprints className={className} />;
      case 'nutrition': return <Coffee className={className} />;
      case 'mental': return <Brain className={className} />;
      case 'social': return <Users className={className} />;
      case 'knowledge': return <BookOpen className={className} />;
      case 'career': return <Compass className={className} />;
      default: return <Star className={className} />;
    }
  };

  // تعیین رنگ بر اساس سطح
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'text-amber-600 dark:text-amber-500';
      case 'silver': return 'text-slate-400 dark:text-slate-300';
      case 'gold': return 'text-yellow-500 dark:text-yellow-400';
      case 'platinum': return 'text-blue-400 dark:text-blue-300';
      case 'diamond': return 'text-tiffany dark:text-tiffany';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  // تعیین رنگ پس‌زمینه بر اساس سطح
  const getTierBgColor = (tier: string) => {
    switch (tier) {
      case 'bronze': return 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/30';
      case 'silver': return 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700/30';
      case 'gold': return 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800/30';
      case 'platinum': return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800/30';
      case 'diamond': return 'bg-tiffany/5 dark:bg-tiffany/10 border-tiffany/20 dark:border-tiffany/30';
      default: return 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800';
    }
  };

  // تعیین رنگ بج بر اساس کمیابی
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      case 'uncommon': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'rare': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'epic': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'legendary': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  // نمایش کارت دستاورد
  const renderAchievementCard = (achievement: Achievement) => {
    // محاسبه درصد پیشرفت
    const progress = Math.min(100, Math.round((achievement.progress / achievement.total) * 100));
    
    // آیا دستاورد قابل دریافت است؟ (باز شده اما جایزه دریافت نشده)
    const canClaim = achievement.unlocked && !achievement.claimed;
    
    return (
      <motion.div
        key={achievement.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        layout
      >
        <Card className={`overflow-hidden ${getTierBgColor(achievement.tier)}`}>
          <CardHeader className="pb-3 relative">
            <div className="absolute right-4 top-4">
              <div className={`rounded-full p-2 ${getTierColor(achievement.tier)} bg-white/80 dark:bg-slate-800/80`}>
                {getCategoryIcon(achievement.icon)}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex flex-col pt-1">
                <div className="flex gap-2 flex-wrap mb-1">
                  <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                    {achievement.rarity === 'common' ? 'معمولی' : 
                     achievement.rarity === 'uncommon' ? 'غیرمعمول' : 
                     achievement.rarity === 'rare' ? 'کمیاب' : 
                     achievement.rarity === 'epic' ? 'حماسی' : 'افسانه‌ای'}
                  </Badge>
                  <Badge variant="outline" className="bg-white/80 dark:bg-slate-800/80">
                    {achievement.type === 'achievement' ? 'دستاورد' : 'نشان'}
                  </Badge>
                  {achievement.secret && (
                    <Badge variant="outline" className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      مخفی
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base">{achievement.title}</CardTitle>
                <CardDescription className="text-xs">{achievement.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{achievement.progress} / {achievement.total}</span>
                <span>{progress}%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center">
                <Zap className="h-3 w-3 ml-1 text-amber-500" />
                {achievement.xpReward} XP
              </span>
              <span className="flex items-center">
                <Gift className="h-3 w-3 ml-1 text-tiffany" />
                {achievement.creditReward} اعتبار
              </span>
            </div>
            <div>
              {canClaim && (
                <Button 
                  size="sm" 
                  variant="success" 
                  className="text-xs h-7 px-2"
                  onClick={() => handleClaimReward(achievement)}
                >
                  دریافت جایزه
                </Button>
              )}
              {achievement.claimed && (
                <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px]">
                  <BadgeCheck className="h-3 w-3 ml-1" />
                  دریافت شده
                </Badge>
              )}
              {!achievement.unlocked && !achievement.secret && (
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-[10px]">
                  قفل
                </Badge>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* پنل اطلاعات و آمار */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">دستاوردها و نشان‌ها</CardTitle>
              <CardDescription>پیشرفت و جوایز خود را ببینید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* آمار پیشرفت کلی */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">پیشرفت کلی</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{unlockedPercentage}%</span>
                </div>
                <Progress value={unlockedPercentage} className="h-2" />
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>{totalUnlocked} از {totalAchievements} مورد باز شده</span>
                </div>
              </div>
              
              {/* آمار دستاوردها و نشان‌ها */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-gradient-to-br from-slate-100 to-slate-200/20 dark:from-slate-900/70 dark:to-slate-800/20 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex flex-col items-center">
                      <Award className="h-7 w-7 text-slate-600 dark:text-slate-400 mb-1" />
                      <span className="text-lg font-bold">
                        {achievements.filter(a => a.type === 'achievement' && a.unlocked).length}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">دستاوردها</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-100/50 to-yellow-200/20 dark:from-yellow-900/20 dark:to-yellow-800/10 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex flex-col items-center">
                      <Medal className="h-7 w-7 text-yellow-600 dark:text-yellow-500 mb-1" />
                      <span className="text-lg font-bold">
                        {achievements.filter(a => a.type === 'badge' && a.unlocked).length}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">نشان‌ها</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* سطوح دستاوردها */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center">
                  <Crown className="h-4 w-4 ml-1 text-amber-500" />
                  سطوح دستاوردها
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-500">
                      <Crown className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] mt-1">برنز</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <Crown className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] mt-1">نقره</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">
                      <Crown className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] mt-1">طلا</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500">
                      <Crown className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] mt-1">پلاتین</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center text-tiffany">
                      <Crown className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] mt-1">الماس</span>
                  </div>
                </div>
              </div>
              
              {/* کمیابی دستاوردها */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center">
                  <Zap className="h-4 w-4 ml-1 text-amber-500" />
                  کمیابی دستاوردها
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-[10px]">معمولی</Badge>
                  <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px]">غیرمعمول</Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px]">کمیاب</Badge>
                  <Badge variant="outline" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-[10px]">حماسی</Badge>
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-[10px]">افسانه‌ای</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* پنل دستاوردها */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-2 bg-slate-100 dark:bg-slate-900">
                    <TabsTrigger value="all" className="text-xs">همه</TabsTrigger>
                    <TabsTrigger value="achievements" className="text-xs">دستاوردها</TabsTrigger>
                    <TabsTrigger value="badges" className="text-xs">نشان‌ها</TabsTrigger>
                    <TabsTrigger value="unlocked" className="text-xs">باز شده</TabsTrigger>
                    <TabsTrigger value="locked" className="text-xs">قفل</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <select 
                  className="h-8 text-xs px-2 py-1 rounded-md bg-white/80 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 focus:outline-none focus:ring-1 focus:ring-tiffany"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as any)}
                >
                  <option value="progress">پیشرفت</option>
                  <option value="newest">جدیدترین</option>
                  <option value="oldest">قدیمی‌ترین</option>
                  <option value="rarity">کمیابی</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {sortedAchievements.length > 0 ? (
                    sortedAchievements.map(achievement => renderAchievementCard(achievement))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center py-6"
                    >
                      <div className="text-slate-400 dark:text-slate-500 mb-3">
                        <Smile className="w-16 h-16" />
                      </div>
                      <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300">موردی یافت نشد</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1 max-w-xs">
                        دستاوردی در این دسته‌بندی وجود ندارد. به چالش‌های جدید بپردازید تا دستاوردهای بیشتری باز شوند.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Achievements;