import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { toPersianDigits } from '@/lib/utils';
import { 
  Trophy, Award, Medal, Star, Flame, Zap, Target, Calendar, ArrowRight, Gift, 
  Clock, Scroll, ShieldCheck, Crown, Users, TrendingUp, ChevronUp, Sparkles
} from 'lucide-react';

// تایپ‌های داده‌ای
interface QuestType {
  id: number;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'seasonal';
  reward: {
    xp: number;
    credits?: number;
    badges?: number[];
    items?: string[];
  };
  conditions: {
    type: 'steps' | 'activity' | 'sleep' | 'water' | 'nutrition' | 'social' | 'custom';
    target: number;
    current: number;
    unit: string;
  };
  deadline?: string;
  completed: boolean;
  locked?: boolean;
  category: 'health' | 'fitness' | 'nutrition' | 'social' | 'mental' | 'work';
}

interface BadgeType {
  id: number;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  category: 'health' | 'fitness' | 'nutrition' | 'social' | 'mental' | 'work';
  unlocked: boolean;
  progress?: {
    current: number;
    max: number;
  };
  unlockedDate?: string;
}

interface LeaderboardEntry {
  id: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  department: string;
  badges: number;
  challenges: number;
  rank: number;
}

interface SeasonalEvent {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  rewards: {
    badges: BadgeType[];
    credits: number;
    items: string[];
  };
  participants: number;
  progress: number;
  challenges: QuestType[];
  leaderboard: LeaderboardEntry[];
  isActive: boolean;
}

export function AdvancedGamification() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('quests');
  const [userLevel, setUserLevel] = useState(12);
  const [userXP, setUserXP] = useState(2450);
  const [nextLevelXP, setNextLevelXP] = useState(3000);
  const [userStreak, setUserStreak] = useState(14);
  const [streakCheckInDone, setStreakCheckInDone] = useState(false);
  const [userCredits, setUserCredits] = useState(750);
  const [userBadges, setUserBadges] = useState<BadgeType[]>([]);
  const [allBadges, setAllBadges] = useState<BadgeType[]>([]);
  const [quests, setQuests] = useState<QuestType[]>([]);
  const [seasonalEvents, setSeasonalEvents] = useState<SeasonalEvent[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [dailyGoals, setDailyGoals] = useState({
    steps: { current: 7500, target: 10000, unit: 'قدم' },
    water: { current: 1600, target: 2000, unit: 'میلی‌لیتر' },
    sleep: { current: 6.5, target: 8, unit: 'ساعت' },
    activity: { current: 40, target: 60, unit: 'دقیقه' }
  });
  
  // فانکشن‌های مختلف گیمیفیکیشن
  
  // اتمام کوئست
  const completeQuest = (questId: number) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest || quest.completed) return;
    
    setQuests(prev => 
      prev.map(q => q.id === questId ? { ...q, completed: true } : q)
    );
    
    // اعمال پاداش‌ها
    setUserXP(prev => prev + quest.reward.xp);
    if (quest.reward.credits) {
      setUserCredits(prev => prev + quest.reward.credits!);
    }
    
    // بررسی برای لول آپ
    if (userXP + quest.reward.xp >= nextLevelXP) {
      setUserLevel(prev => prev + 1);
      setNextLevelXP(prev => prev + 500); // افزایش XP مورد نیاز برای لول بعدی
      toast({
        title: '🎉 ارتقای سطح!',
        description: `تبریک! شما به سطح ${toPersianDigits(userLevel + 1)} ارتقا یافتید.`,
      });
    }
    
    toast({
      title: 'کوئست تکمیل شد!',
      description: `شما کوئست ${quest.title} را تکمیل کردید و ${toPersianDigits(quest.reward.xp)} امتیاز تجربه دریافت کردید.`,
    });
  };
  
  // چک این روزانه
  const performDailyCheckIn = () => {
    if (streakCheckInDone) return;
    
    setStreakCheckInDone(true);
    setUserStreak(prev => prev + 1);
    setUserXP(prev => prev + 50);
    
    // پاداش‌های ویژه برای استریک‌های خاص
    if ((userStreak + 1) % 7 === 0) {
      // پاداش هفتگی
      setUserXP(prev => prev + 200);
      setUserCredits(prev => prev + 100);
      toast({
        title: '🔥 استریک هفتگی!',
        description: `شما به مدت ${toPersianDigits(userStreak + 1)} روز متوالی در برنامه حضور داشته‌اید. ۱۰۰ اعتبار ویژه دریافت کردید!`,
      });
    } else if ((userStreak + 1) % 30 === 0) {
      // پاداش ماهانه
      setUserXP(prev => prev + 500);
      setUserCredits(prev => prev + 300);
      toast({
        title: '🎖️ استریک ماهانه!',
        description: `شما به مدت ${toPersianDigits(userStreak + 1)} روز متوالی در برنامه حضور داشته‌اید. ۳۰۰ اعتبار ویژه دریافت کردید!`,
      });
    } else {
      toast({
        title: 'چک این روزانه انجام شد!',
        description: `استریک شما اکنون ${toPersianDigits(userStreak + 1)} روز است. ۵۰ امتیاز تجربه دریافت کردید.`,
      });
    }
  };
  
  // آنلاک کردن نشان
  const unlockBadge = (badgeId: number) => {
    setAllBadges(prev => 
      prev.map(b => b.id === badgeId ? { ...b, unlocked: true, unlockedDate: new Date().toISOString() } : b)
    );
    
    const badge = allBadges.find(b => b.id === badgeId);
    if (badge) {
      setUserBadges(prev => [...prev, { ...badge, unlocked: true, unlockedDate: new Date().toISOString() }]);
      
      toast({
        title: '🏆 نشان جدید!',
        description: `شما نشان "${badge.name}" را آنلاک کردید!`,
      });
    }
  };
  
  // شرکت در رویداد فصلی
  const joinSeasonalEvent = (eventId: number) => {
    setSeasonalEvents(prev => 
      prev.map(e => e.id === eventId ? { ...e, participants: e.participants + 1 } : e)
    );
    
    toast({
      title: 'شرکت در رویداد فصلی',
      description: `شما با موفقیت در رویداد فصلی ثبت‌نام کردید!`,
    });
  };
  
  // پر کردن داده‌های نمونه
  useEffect(() => {
    // نمونه نشان‌ها
    const badgesSample: BadgeType[] = [
      {
        id: 1,
        name: 'پیاده‌رو حرفه‌ای',
        description: 'تکمیل ۱۰۰,۰۰۰ قدم در یک هفته',
        image: '/badges/walker.png',
        rarity: 'uncommon',
        category: 'fitness',
        unlocked: true,
        unlockedDate: '2025-03-15'
      },
      {
        id: 2,
        name: 'کاشف آب',
        description: 'نوشیدن مرتب آب به مدت ۳۰ روز متوالی',
        image: '/badges/hydration.png',
        rarity: 'common',
        category: 'health',
        unlocked: true,
        unlockedDate: '2025-03-30'
      },
      {
        id: 3,
        name: 'خوابگرد رویایی',
        description: 'ثبت ۷-۹ ساعت خواب به مدت ۲۱ روز',
        image: '/badges/sleep.png',
        rarity: 'rare',
        category: 'health',
        unlocked: false,
        progress: {
          current: 14,
          max: 21
        }
      },
      {
        id: 4,
        name: 'مدیر استرس',
        description: 'انجام تمرینات مدیتیشن به مدت ۱۴ روز متوالی',
        image: '/badges/stress.png',
        rarity: 'uncommon',
        category: 'mental',
        unlocked: false,
        progress: {
          current: 7,
          max: 14
        }
      },
      {
        id: 5,
        name: 'قهرمان تیمی',
        description: 'شرکت در ۵ چالش گروهی سازمانی',
        image: '/badges/team.png',
        rarity: 'epic',
        category: 'social',
        unlocked: false,
        progress: {
          current: 3,
          max: 5
        }
      }
    ];
    
    // نمونه کوئست‌ها
    const questsSample: QuestType[] = [
      {
        id: 1,
        title: 'پیاده‌روی روزانه',
        description: 'امروز ۱۰,۰۰۰ قدم بردارید',
        type: 'daily',
        reward: {
          xp: 100,
          credits: 20
        },
        conditions: {
          type: 'steps',
          target: 10000,
          current: 7500,
          unit: 'قدم'
        },
        deadline: new Date(new Date().setHours(23, 59, 59)).toISOString(),
        completed: false,
        category: 'fitness'
      },
      {
        id: 2,
        title: 'هیدراته ماندن',
        description: 'امروز حداقل ۸ لیوان آب بنوشید',
        type: 'daily',
        reward: {
          xp: 80,
          credits: 15
        },
        conditions: {
          type: 'water',
          target: 2000,
          current: 1600,
          unit: 'میلی‌لیتر'
        },
        deadline: new Date(new Date().setHours(23, 59, 59)).toISOString(),
        completed: false,
        category: 'health'
      },
      {
        id: 3,
        title: 'خواب با کیفیت',
        description: 'ثبت خواب ۷-۸ ساعته به مدت ۷ روز',
        type: 'weekly',
        reward: {
          xp: 250,
          credits: 50,
          badges: [3]
        },
        conditions: {
          type: 'sleep',
          target: 7,
          current: 5,
          unit: 'روز'
        },
        deadline: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(),
        completed: false,
        category: 'health'
      },
      {
        id: 4,
        title: 'کاهش استرس',
        description: 'انجام تمرینات تنفس عمیق یا مدیتیشن به مدت ۵ روز',
        type: 'weekly',
        reward: {
          xp: 200,
          credits: 40
        },
        conditions: {
          type: 'custom',
          target: 5,
          current: 3,
          unit: 'روز'
        },
        deadline: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
        completed: false,
        category: 'mental'
      },
      {
        id: 5,
        title: 'فعالیت تیمی',
        description: 'مشارکت در چالش سازمانی کاهش وزن',
        type: 'seasonal',
        reward: {
          xp: 500,
          credits: 100,
          badges: [5]
        },
        conditions: {
          type: 'social',
          target: 1,
          current: 0,
          unit: 'مشارکت'
        },
        deadline: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
        completed: false,
        locked: true,
        category: 'social'
      }
    ];
    
    // نمونه رویدادهای فصلی
    const seasonalEventsSample: SeasonalEvent[] = [
      {
        id: 1,
        title: 'چالش بهاری سلامت',
        description: 'در چالش بهاری سلامت با همکاران خود رقابت کنید و جوایز ارزشمندی دریافت کنید.',
        startDate: '2025-04-01',
        endDate: '2025-06-21',
        rewards: {
          badges: badgesSample.filter(b => b.rarity === 'epic'),
          credits: 1000,
          items: ['گجت پایش سلامت', 'کارت هدیه ورزشی']
        },
        participants: 156,
        progress: 35,
        challenges: questsSample.filter(q => q.type === 'seasonal'),
        leaderboard: [],
        isActive: true
      }
    ];
    
    // نمونه لیدربورد
    const leaderboardSample: LeaderboardEntry[] = [
      {
        id: 1,
        name: 'علی محمدی',
        avatar: '/avatars/user1.png',
        level: 24,
        xp: 12500,
        department: 'IT',
        badges: 15,
        challenges: 45,
        rank: 1
      },
      {
        id: 2,
        name: 'سارا رضایی',
        avatar: '/avatars/user2.png',
        level: 23,
        xp: 12100,
        department: 'مالی',
        badges: 14,
        challenges: 42,
        rank: 2
      },
      {
        id: 3,
        name: 'محمد کریمی',
        avatar: '/avatars/user3.png',
        level: 22,
        xp: 11800,
        department: 'منابع انسانی',
        badges: 12,
        challenges: 40,
        rank: 3
      },
      {
        id: 4,
        name: 'فاطمه حسینی',
        avatar: '/avatars/user4.png',
        level: 20,
        xp: 10500,
        department: 'بازاریابی',
        badges: 11,
        challenges: 38,
        rank: 4
      },
      {
        id: 5,
        name: 'رضا نوری',
        avatar: '/avatars/user5.png',
        level: 19,
        xp: 9800,
        department: 'فروش',
        badges: 10,
        challenges: 35,
        rank: 5
      },
      {
        id: 6,
        name: 'کاربر فعلی',
        avatar: '/avatars/user.png',
        level: 12,
        xp: 2450,
        department: 'فناوری',
        badges: 5,
        challenges: 18,
        rank: 24
      }
    ];
    
    // تنظیم داده‌ها
    setAllBadges(badgesSample);
    setUserBadges(badgesSample.filter(b => b.unlocked));
    setQuests(questsSample);
    setSeasonalEvents(seasonalEventsSample);
    setLeaderboard(leaderboardSample);
  }, []);
  
  // تبدیل سطح رریتی به کلاس رنگ
  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'common': return 'bg-gray-500 text-white';
      case 'uncommon': return 'bg-green-500 text-white';
      case 'rare': return 'bg-blue-500 text-white';
      case 'epic': return 'bg-purple-500 text-white';
      case 'legendary': return 'bg-amber-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };
  
  // تبدیل نوع کوئست به نام فارسی
  const getQuestTypeName = (type: string) => {
    switch(type) {
      case 'daily': return 'روزانه';
      case 'weekly': return 'هفتگی';
      case 'monthly': return 'ماهانه';
      case 'seasonal': return 'فصلی';
      default: return type;
    }
  };
  
  // تبدیل نوع کوئست به کلاس رنگ
  const getQuestTypeColor = (type: string) => {
    switch(type) {
      case 'daily': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'weekly': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'monthly': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'seasonal': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };
  
  // تبدیل دسته‌بندی به آیکون
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'health': return <Heart className="h-4 w-4" />;
      case 'fitness': return <Dumbbell className="h-4 w-4" />;
      case 'nutrition': return <Utensils className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      case 'mental': return <Brain className="h-4 w-4" />;
      case 'work': return <Briefcase className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* هدر و خلاصه وضعیت */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* کارت پروفایل و XP */}
        <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm border overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 z-0" />
          <CardHeader className="relative z-10">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src="/avatars/user.png" alt="تصویر کاربر" />
                <AvatarFallback>کاربر</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">سطح {toPersianDigits(userLevel)}</CardTitle>
                <CardDescription className="text-base">
                  {toPersianDigits(userXP)} / {toPersianDigits(nextLevelXP)} XP
                </CardDescription>
                <Progress 
                  className="h-2 mt-2" 
                  value={(userXP / nextLevelXP) * 100} 
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="flex justify-between">
              <div className="text-center">
                <span className="text-sm text-muted-foreground">نشان‌ها</span>
                <p className="text-xl font-semibold">{toPersianDigits(userBadges.length)}</p>
              </div>
              <div className="text-center">
                <span className="text-sm text-muted-foreground">چالش‌ها</span>
                <p className="text-xl font-semibold">{toPersianDigits(quests.filter(q => q.completed).length)}</p>
              </div>
              <div className="text-center">
                <span className="text-sm text-muted-foreground">رتبه</span>
                <p className="text-xl font-semibold">{toPersianDigits(leaderboard.find(l => l.id === 6)?.rank || 0)}</p>
              </div>
              <div className="text-center">
                <span className="text-sm text-muted-foreground">اعتبار</span>
                <p className="text-xl font-semibold">{toPersianDigits(userCredits)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* کارت استریک */}
        <Card className="bg-card/50 backdrop-blur-sm border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              استریک روزانه
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{toPersianDigits(userStreak)}</span>
                  </div>
                  <svg className="w-20 h-20" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#EEEEEE"
                      strokeWidth="3"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#FF6B35"
                      strokeWidth="3"
                      strokeDasharray={`${(userStreak % 7) * 14.28}, 100`}
                    />
                  </svg>
                </div>
              </div>
              <p className="text-center mt-2 text-sm text-muted-foreground">
                {streakCheckInDone ? "امروز چک این انجام شده" : "هنوز امروز چک این نشده"}
              </p>
              <Button 
                className="mt-3 w-full"
                variant={streakCheckInDone ? "secondary" : "default"}
                onClick={performDailyCheckIn}
                disabled={streakCheckInDone}
              >
                {streakCheckInDone ? "انجام شده" : "چک این روزانه"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* کارت پیشرفت روزانه */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              اهداف روزانه
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>قدم‌ها</span>
                  <span>{toPersianDigits(dailyGoals.steps.current)} / {toPersianDigits(dailyGoals.steps.target)} {dailyGoals.steps.unit}</span>
                </div>
                <Progress value={(dailyGoals.steps.current / dailyGoals.steps.target) * 100} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>آب</span>
                  <span>{toPersianDigits(dailyGoals.water.current)} / {toPersianDigits(dailyGoals.water.target)} {dailyGoals.water.unit}</span>
                </div>
                <Progress value={(dailyGoals.water.current / dailyGoals.water.target) * 100} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>خواب</span>
                  <span>{toPersianDigits(dailyGoals.sleep.current)} / {toPersianDigits(dailyGoals.sleep.target)} {dailyGoals.sleep.unit}</span>
                </div>
                <Progress value={(dailyGoals.sleep.current / dailyGoals.sleep.target) * 100} className="h-2" />
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>فعالیت</span>
                  <span>{toPersianDigits(dailyGoals.activity.current)} / {toPersianDigits(dailyGoals.activity.target)} {dailyGoals.activity.unit}</span>
                </div>
                <Progress value={(dailyGoals.activity.current / dailyGoals.activity.target) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* تب‌های اصلی */}
      <Tabs defaultValue="quests" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="quests">کوئست‌ها</TabsTrigger>
          <TabsTrigger value="badges">نشان‌ها</TabsTrigger>
          <TabsTrigger value="leaderboard">لیدربورد</TabsTrigger>
          <TabsTrigger value="seasons">رویدادهای فصلی</TabsTrigger>
        </TabsList>
        
        {/* تب کوئست‌ها */}
        <TabsContent value="quests" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm border">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Scroll className="h-5 w-5 text-primary" />
                  کوئست‌های فعال
                </CardTitle>
                <CardDescription>کوئست‌های موجود برای تکمیل</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quests.filter(q => !q.locked && !q.completed).map((quest) => (
                    <div key={quest.id} className="bg-muted/30 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            {getCategoryIcon(quest.category)}
                            {quest.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{quest.description}</p>
                        </div>
                        <Badge className={`${getQuestTypeColor(quest.type)}`}>
                          {getQuestTypeName(quest.type)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="w-full max-w-[60%]">
                          <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                            <span>پیشرفت</span>
                            <span>{toPersianDigits(quest.conditions.current)} / {toPersianDigits(quest.conditions.target)} {quest.conditions.unit}</span>
                          </div>
                          <Progress value={(quest.conditions.current / quest.conditions.target) * 100} className="h-2" />
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-xs text-muted-foreground">پاداش</span>
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">{toPersianDigits(quest.reward.xp)}</span>
                              <Zap className="h-3 w-3 text-amber-500" />
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            variant={quest.conditions.current >= quest.conditions.target ? "default" : "outline"}
                            disabled={quest.conditions.current < quest.conditions.target}
                            onClick={() => completeQuest(quest.id)}
                          >
                            {quest.conditions.current >= quest.conditions.target ? "دریافت پاداش" : "ناتمام"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {quests.filter(q => !q.locked && !q.completed).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="mb-2">
                        <Award className="h-8 w-8 mx-auto text-muted-foreground/50" />
                      </div>
                      <p>درحال حاضر کوئست فعالی وجود ندارد</p>
                      <p className="text-sm mt-1">به زودی کوئست‌های جدید اضافه خواهند شد</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="outline" size="sm">
                  نمایش همه کوئست‌ها
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  کوئست‌های تکمیل شده
                </CardTitle>
                <CardDescription>دستاوردهای اخیر شما</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quests.filter(q => q.completed).map((quest) => (
                    <div key={quest.id} className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-green-500/20">
                          <ShieldCheck className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{quest.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{quest.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-primary/10">
                              <span className="text-xs flex items-center gap-1">
                                {toPersianDigits(quest.reward.xp)}
                                <Zap className="h-3 w-3 text-amber-500" />
                              </span>
                            </Badge>
                            {quest.reward.credits && (
                              <Badge variant="outline" className="bg-primary/10">
                                <span className="text-xs flex items-center gap-1">
                                  {toPersianDigits(quest.reward.credits)}
                                  <Sparkles className="h-3 w-3 text-blue-500" />
                                </span>
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {quests.filter(q => q.completed).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="mb-2">
                        <Trophy className="h-8 w-8 mx-auto text-muted-foreground/50" />
                      </div>
                      <p>هنوز کوئستی تکمیل نشده است</p>
                      <p className="text-sm mt-1">کوئست‌های فعال را تکمیل کنید</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* تب نشان‌ها */}
        <TabsContent value="badges" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Medal className="h-5 w-5 text-primary" />
                  نشان‌های آنلاک شده
                </CardTitle>
                <CardDescription>دستاوردهایی که کسب کرده‌اید</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {userBadges.map((badge) => (
                    <div key={badge.id} className="bg-muted/30 rounded-lg p-4 flex flex-col items-center text-center">
                      <div className="p-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-3">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      <Badge className={`mb-2 ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity === 'common' ? 'معمولی' : 
                         badge.rarity === 'uncommon' ? 'غیرمعمول' :
                         badge.rarity === 'rare' ? 'کمیاب' :
                         badge.rarity === 'epic' ? 'حماسی' : 'افسانه‌ای'}
                      </Badge>
                      <h3 className="font-medium">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        آنلاک شده: {formatDate(badge.unlockedDate || '')}
                      </p>
                    </div>
                  ))}
                  
                  {userBadges.length === 0 && (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      <div className="mb-2">
                        <Medal className="h-8 w-8 mx-auto text-muted-foreground/50" />
                      </div>
                      <p>هنوز نشانی آنلاک نشده است</p>
                      <p className="text-sm mt-1">برای کسب نشان‌ها، چالش‌ها را تکمیل کنید</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  نشان‌های قابل آنلاک
                </CardTitle>
                <CardDescription>نشان‌هایی که می‌توانید کسب کنید</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allBadges.filter(b => !b.unlocked).map((badge) => (
                    <div key={badge.id} className="bg-muted/30 rounded-lg p-4 flex flex-col items-center text-center relative">
                      <div className="p-3 rounded-full bg-muted mb-3">
                        <Award className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                      <Badge className={`mb-2 ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity === 'common' ? 'معمولی' : 
                         badge.rarity === 'uncommon' ? 'غیرمعمول' :
                         badge.rarity === 'rare' ? 'کمیاب' :
                         badge.rarity === 'epic' ? 'حماسی' : 'افسانه‌ای'}
                      </Badge>
                      <h3 className="font-medium">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                      
                      {badge.progress && (
                        <div className="w-full mt-3">
                          <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                            <span>پیشرفت</span>
                            <span>{toPersianDigits(badge.progress.current)} / {toPersianDigits(badge.progress.max)}</span>
                          </div>
                          <Progress value={(badge.progress.current / badge.progress.max) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* تب لیدربورد */}
        <TabsContent value="leaderboard" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                لیدربورد سازمانی
              </CardTitle>
              <CardDescription>رتبه‌بندی کارمندان بر اساس فعالیت‌های سلامتی</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    برترین‌ها
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-2">
                {leaderboard.slice(0, 3).map((entry) => (
                  <div key={entry.id} className={`rounded-lg p-3 flex items-center gap-4 
                    ${entry.rank === 1 ? 'bg-amber-500/10 border border-amber-500/30' : 
                      entry.rank === 2 ? 'bg-gray-500/10 border border-gray-500/30' : 
                      'bg-orange-800/10 border border-orange-800/30'}`}>
                    <div className={`font-bold text-lg ${
                      entry.rank === 1 ? 'text-amber-500' : 
                      entry.rank === 2 ? 'text-gray-500' : 
                      'text-orange-800'
                    }`}>
                      {toPersianDigits(entry.rank)}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">{entry.name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {entry.department} • سطح {toPersianDigits(entry.level)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{toPersianDigits(entry.xp)} XP</div>
                          <div className="text-xs text-muted-foreground">
                            {toPersianDigits(entry.badges)} نشان
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    سایر رتبه‌ها
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                {leaderboard.slice(3).map((entry) => (
                  <div key={entry.id} className={`rounded-lg p-3 flex items-center gap-4 
                    ${entry.id === 6 ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30'}`}>
                    <div className="font-bold text-lg text-muted-foreground">
                      {toPersianDigits(entry.rank)}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h4 className={`font-medium ${entry.id === 6 ? 'text-primary' : ''}`}>
                            {entry.name}
                            {entry.id === 6 && " (شما)"}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {entry.department} • سطح {toPersianDigits(entry.level)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{toPersianDigits(entry.xp)} XP</div>
                          <div className="text-xs text-muted-foreground">
                            {toPersianDigits(entry.badges)} نشان
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline" size="sm">
                نمایش لیدربورد کامل
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* تب رویدادهای فصلی */}
        <TabsContent value="seasons" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {seasonalEvents.map((event) => (
              <Card key={event.id} className="bg-card/50 backdrop-blur-sm border">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {event.title}
                      </CardTitle>
                      <CardDescription>{event.description}</CardDescription>
                    </div>
                    {event.isActive && (
                      <Badge className="bg-green-500 text-white">فعال</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <div className="text-sm flex justify-between">
                      <span className="text-muted-foreground">تاریخ شروع: {formatDate(event.startDate)}</span>
                      <span className="text-muted-foreground">تاریخ پایان: {formatDate(event.endDate)}</span>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>پیشرفت رویداد</span>
                        <span>{toPersianDigits(event.progress)}%</span>
                      </div>
                      <Progress value={event.progress} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground mt-3">
                      تعداد شرکت‌کنندگان: {toPersianDigits(event.participants)} نفر
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">پاداش‌های رویداد</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="bg-muted/30 rounded-lg p-3 flex flex-col items-center text-center">
                        <Badge className="bg-purple-500 text-white mb-2">نشان حماسی</Badge>
                        <div className="text-sm">{toPersianDigits(event.rewards.badges.length)} عدد</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 flex flex-col items-center text-center">
                        <Badge className="bg-blue-500 text-white mb-2">اعتبار</Badge>
                        <div className="text-sm">{toPersianDigits(event.rewards.credits)}</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 flex flex-col items-center text-center">
                        <Badge className="bg-green-500 text-white mb-2">آیتم</Badge>
                        <div className="text-sm">{toPersianDigits(event.rewards.items.length)} عدد</div>
                      </div>
                      <div className="bg-muted/30 rounded-lg p-3 flex flex-col items-center text-center">
                        <Badge className="bg-amber-500 text-white mb-2">چالش</Badge>
                        <div className="text-sm">{toPersianDigits(event.challenges.length)} عدد</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button onClick={() => joinSeasonalEvent(event.id)}>
                    شرکت در رویداد
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {seasonalEvents.length === 0 && (
              <div className="col-span-full text-center py-12 bg-muted/30 rounded-lg">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                <h3 className="text-lg font-medium">رویداد فصلی فعالی وجود ندارد</h3>
                <p className="text-muted-foreground mt-1">رویدادهای جدید به زودی اعلام خواهند شد</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// تابع کمکی برای فرمت تاریخ
function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fa-IR');
}

// تابع کمکی برای آیکون دسته‌بندی
function getCategoryIcon(category: string) {
  switch(category) {
    case 'health': return <Heart className="h-4 w-4" />;
    case 'fitness': return <Dumbbell className="h-4 w-4" />;
    case 'nutrition': return <Utensils className="h-4 w-4" />;
    case 'social': return <Users className="h-4 w-4" />;
    case 'mental': return <Brain className="h-4 w-4" />;
    case 'work': return <Briefcase className="h-4 w-4" />;
    default: return <Star className="h-4 w-4" />;
  }
}

// آیکون‌های اضافی
import { Dumbbell, Utensils, Brain, Briefcase } from 'lucide-react';