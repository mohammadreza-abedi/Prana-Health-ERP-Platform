import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// کامپوننت‌های گیمیفیکیشن
import DailyChallenges from '@/components/ui/gamification-system/DailyChallenges';
import Achievements from '@/components/ui/gamification-system/Achievements';
import Leaderboard from '@/components/ui/gamification-system/Leaderboard';
import RewardSystem from '@/components/ui/gamification-system/RewardSystem';

// آیکون‌ها
import { 
  Crown, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Award, 
  Trophy, 
  Target, 
  ChevronRight, 
  Gift, 
  Star, 
  Flame, 
  Users,
  BookOpen,
  BarChart,
  ArrowRight,
  Bell,
  Dumbbell,
  Heart,
  Brain,
  ShoppingCart
} from 'lucide-react';

/**
 * صفحه گیمیفیکیشن سیستم
 * این صفحه تمام ویژگی‌های گیمیفیکیشن سیستم را به کاربر نمایش می‌دهد
 * شامل چالش‌های روزانه، دستاوردها، رده‌بندی و فروشگاه پاداش‌ها
 */
const GamificationPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // اطلاعات کاربر
  const [userData, setUserData] = useState({
    id: 1,
    name: "علی محمدی",
    level: 5,
    xp: 2500,
    nextLevelXP: 5000,
    credits: 1200,
    dailyStreak: 7,
    completedChallenges: 28,
    achievementsCount: 12,
    badgesCount: 5,
    totalMinutesActive: 3240,
    rank: 3,
    rankChange: 2
  });
  
  // اطلاعات آمار
  const [statsData, setStatsData] = useState({
    stepsToday: 7800,
    stepsTarget: 10000,
    sleepHours: 7.5,
    sleepTarget: 8,
    activeMinutesToday: 45,
    activeMinutesTarget: 60,
    waterGlassesToday: 6,
    waterGlassesTarget: 8,
    meditationMinutesToday: 10,
    meditationMinutesTarget: 15
  });
  
  // اعلان‌های سیستم
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "چالش روزانه",
      description: "چالش 10,000 قدم روزانه در دسترس است",
      time: "2 دقیقه پیش",
      type: "challenge"
    },
    {
      id: 2,
      title: "رده‌بندی جدید",
      description: "تبریک! شما به رتبه 3 رده‌بندی سازمانی صعود کردید",
      time: "1 ساعت پیش",
      type: "leaderboard"
    },
    {
      id: 3,
      title: "دستاورد جدید",
      description: "دستاورد «استمرار در ورزش» را باز کردید! 200 XP دریافت کنید",
      time: "3 ساعت پیش",
      type: "achievement"
    }
  ]);
  
  // متد دریافت پاداش چالش
  const handleClaimChallengeReward = (challengeId: number, xp: number, credits: number) => {
    setUserData(prev => ({
      ...prev,
      xp: prev.xp + xp,
      credits: prev.credits + credits,
      completedChallenges: prev.completedChallenges + 1
    }));
    
    // نمایش انیمیشن و تست مدال XP (در نسخه واقعی از کامپوننت استفاده می‌شود)
    showXPAnimation(xp);
  };
  
  // متد دریافت پاداش دستاورد
  const handleClaimAchievementReward = (achievementId: number, xp: number, credits: number) => {
    setUserData(prev => ({
      ...prev,
      xp: prev.xp + xp,
      credits: prev.credits + credits,
      achievementsCount: prev.achievementsCount + 1
    }));
    
    // نمایش انیمیشن و تست مدال XP
    showXPAnimation(xp);
  };
  
  // متد خرید آیتم از فروشگاه
  const handlePurchaseItem = (itemId: number, cost: number) => {
    if (userData.credits >= cost) {
      setUserData(prev => ({
        ...prev,
        credits: prev.credits - cost
      }));
    }
  };
  
  // نمایش انیمیشن XP (پیاده‌سازی مجازی)
  const showXPAnimation = (xp: number) => {
    toast({
      title: `+${xp} XP`,
      description: "امتیاز تجربه اضافه شد",
      variant: "success",
    });
  };
  
  // بررسی سطح بندی
  useEffect(() => {
    // ارتقای سطح اگر XP از حد لازم بیشتر باشد
    if (userData.xp >= userData.nextLevelXP) {
      const newLevel = userData.level + 1;
      const xpRemaining = userData.xp - userData.nextLevelXP;
      const newNextLevelXP = Math.round(userData.nextLevelXP * 1.5); // افزایش XP مورد نیاز برای سطح بعدی
      
      setUserData(prev => ({
        ...prev,
        level: newLevel,
        xp: xpRemaining,
        nextLevelXP: newNextLevelXP
      }));
      
      // نمایش پیام ارتقای سطح
      toast({
        title: `تبریک! ارتقا به سطح ${newLevel}`,
        description: "شما به سطح بالاتر ارتقا یافتید و امکانات جدید باز شد",
        variant: "success",
      });
    }
  }, [userData.xp, userData.nextLevelXP, userData.level]);
  
  // محاسبه درصد پیشرفت XP
  const xpProgress = Math.min(100, Math.round((userData.xp / userData.nextLevelXP) * 100));
  
  // محاسبه درصد پیشرفت آمارها
  const stepsProgress = Math.min(100, Math.round((statsData.stepsToday / statsData.stepsTarget) * 100));
  const sleepProgress = Math.min(100, Math.round((statsData.sleepHours / statsData.sleepTarget) * 100));
  const activeMinutesProgress = Math.min(100, Math.round((statsData.activeMinutesToday / statsData.activeMinutesTarget) * 100));
  const waterProgress = Math.min(100, Math.round((statsData.waterGlassesToday / statsData.waterGlassesTarget) * 100));
  const meditationProgress = Math.min(100, Math.round((statsData.meditationMinutesToday / statsData.meditationMinutesTarget) * 100));
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">سیستم گیمیفیکیشن پرانا</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              چالش‌ها را کامل کنید، امتیاز بگیرید و پاداش‌های ویژه دریافت کنید
            </p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Button variant="outline" size="sm" className="h-9">
                <Bell className="h-4 w-4 ml-1" />
                اعلان‌ها
                <Badge className="mr-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-[10px]">
                  {notifications.length}
                </Badge>
              </Button>
            </div>
            
            <Button variant="default" size="sm" className="h-9">
              <Gift className="h-4 w-4 ml-1" />
              فروشگاه پاداش‌ها
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-800/60 rounded-lg p-1 shadow-sm">
            <TabsList className="w-full bg-slate-100 dark:bg-slate-900 grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                <BarChart className="h-4 w-4 ml-1 hidden md:block" />
                داشبورد
              </TabsTrigger>
              <TabsTrigger value="challenges" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                <Target className="h-4 w-4 ml-1 hidden md:block" />
                چالش‌ها
              </TabsTrigger>
              <TabsTrigger value="achievements" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                <Award className="h-4 w-4 ml-1 hidden md:block" />
                دستاوردها
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                <Trophy className="h-4 w-4 ml-1 hidden md:block" />
                رده‌بندی
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800">
                <ShoppingCart className="h-4 w-4 ml-1 hidden md:block" />
                فروشگاه
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* داشبورد کاربر */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* پروفایل و آمار کلی کاربر */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">پروفایل من</CardTitle>
                    <Badge className="bg-tiffany hover:bg-tiffany/90">
                      <Crown className="h-3 w-3 ml-1" />
                      سطح {userData.level}
                    </Badge>
                  </div>
                  <CardDescription>امتیازات و دستاوردهای شما</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-center">
                    <div className="h-14 w-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Crown className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{userData.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">رتبه {userData.rank} در رده‌بندی سازمانی</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="bg-amber-50/50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30">
                      <CardContent className="p-3">
                        <div className="flex flex-col items-center">
                          <Zap className="h-6 w-6 text-amber-500 mb-1" />
                          <span className="text-lg font-bold">{userData.xp.toLocaleString('fa-IR')}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">XP کل</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-tiffany/5 dark:bg-tiffany/10 border-tiffany/20 dark:border-tiffany/30">
                      <CardContent className="p-3">
                        <div className="flex flex-col items-center">
                          <Gift className="h-6 w-6 text-tiffany mb-1" />
                          <span className="text-lg font-bold">{userData.credits.toLocaleString('fa-IR')}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400">اعتبار</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">پیشرفت سطح</span>
                      <div className="flex items-center">
                        <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                          {userData.xp.toLocaleString('fa-IR')} / {userData.nextLevelXP.toLocaleString('fa-IR')}
                        </span>
                        <span className="text-xs text-amber-500 font-medium">{xpProgress}%</span>
                      </div>
                    </div>
                    <Progress value={xpProgress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                      <div className="flex flex-col items-center">
                        <TrendingUp className="h-5 w-5 text-green-500 mb-1" />
                        <span className="text-lg font-bold">{userData.dailyStreak}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">روز متوالی</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 text-center">
                      <div className="flex flex-col items-center">
                        <Award className="h-5 w-5 text-purple-500 mb-1" />
                        <span className="text-lg font-bold">{userData.achievementsCount + userData.badgesCount}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">دستاوردها</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">آمار امروز</CardTitle>
                  <CardDescription>فعالیت‌های امروز شما</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium">قدم‌ها</h4>
                            <div className="flex items-end gap-1 mt-1">
                              <span className="text-2xl font-bold">{statsData.stepsToday.toLocaleString('fa-IR')}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">/ {statsData.stepsTarget.toLocaleString('fa-IR')}</span>
                            </div>
                          </div>
                          <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Dumbbell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <Progress value={stepsProgress} className="h-1.5 mt-3" />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium">خواب</h4>
                            <div className="flex items-end gap-1 mt-1">
                              <span className="text-2xl font-bold">{statsData.sleepHours}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">/ {statsData.sleepTarget} ساعت</span>
                            </div>
                          </div>
                          <div className="h-9 w-9 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                            <Heart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                        </div>
                        <Progress value={sleepProgress} className="h-1.5 mt-3" />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium">فعالیت</h4>
                            <div className="flex items-end gap-1 mt-1">
                              <span className="text-2xl font-bold">{statsData.activeMinutesToday}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">/ {statsData.activeMinutesTarget} دقیقه</span>
                            </div>
                          </div>
                          <div className="h-9 w-9 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          </div>
                        </div>
                        <Progress value={activeMinutesProgress} className="h-1.5 mt-3" />
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium">آب نوشیدنی</h4>
                            <div className="flex items-end gap-1 mt-1">
                              <span className="text-2xl font-bold">{statsData.waterGlassesToday}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">/ {statsData.waterGlassesTarget} لیوان</span>
                            </div>
                          </div>
                          <div className="h-9 w-9 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600 dark:text-cyan-400">
                              <path d="M12 2v1" /><path d="M20.39 18.39A9 9 0 1 1 5.61 5.61" /><path d="M16.95 16.95A7 7 0 0 0 12 4" />
                              <path d="M12 19a7 7 0 0 0 1-13.9" /><path d="M9 9L9 9" />
                            </svg>
                          </div>
                        </div>
                        <Progress value={waterProgress} className="h-1.5 mt-3" />
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-medium">مدیتیشن</h4>
                            <div className="flex items-end gap-1 mt-1">
                              <span className="text-2xl font-bold">{statsData.meditationMinutesToday}</span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 mb-1">/ {statsData.meditationMinutesTarget} دقیقه</span>
                            </div>
                          </div>
                          <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                        <Progress value={meditationProgress} className="h-1.5 mt-3" />
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* فعالیت‌های اخیر و پیشنهادات */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 lg:col-span-2 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">فعالیت‌های اخیر</CardTitle>
                  <CardDescription>رویدادهای اخیر شما</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification, index) => (
                      <div key={notification.id} className="flex gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          notification.type === 'challenge' ? 'bg-tiffany/10 text-tiffany' :
                          notification.type === 'leaderboard' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                        }`}>
                          {notification.type === 'challenge' ? <Target className="h-5 w-5" /> :
                           notification.type === 'leaderboard' ? <Trophy className="h-5 w-5" /> :
                           <Award className="h-5 w-5" />}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{notification.time}</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{notification.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">پیشنهادات</CardTitle>
                  <CardDescription>توصیه‌های شخصی برای شما</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-3">
                      <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-800/70 flex items-center justify-center">
                          <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm">چالش پیاده‌روی</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400">امروز {10000 - statsData.stepsToday} قدم دیگر بردارید تا جایزه را بگیرید</p>
                        </div>
                      </div>
                      <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                        <ArrowRight className="h-4 w-4 ml-1" />
                        مشاهده چالش
                      </Button>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-lg p-3">
                      <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-800/70 flex items-center justify-center">
                          <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm">دستاورد در حال پیشرفت</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400">تنها 3 روز تا دستاورد "قدم‌های پیوسته" باقی مانده</p>
                        </div>
                      </div>
                      <Button className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                        <ArrowRight className="h-4 w-4 ml-1" />
                        مشاهده دستاورد
                      </Button>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg p-3">
                      <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-800/70 flex items-center justify-center">
                          <Gift className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-medium text-sm">آیتم‌های جدید در فروشگاه</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400">3 آیتم جدید به فروشگاه اضافه شده است</p>
                        </div>
                      </div>
                      <Button className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white" size="sm">
                        <ArrowRight className="h-4 w-4 ml-1" />
                        مشاهده فروشگاه
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* چالش‌ها */}
          <TabsContent value="challenges">
            <DailyChallenges 
              userLevel={userData.level}
              userXP={userData.xp}
              nextLevelXP={userData.nextLevelXP}
              dailyStreak={userData.dailyStreak}
              onClaimReward={handleClaimChallengeReward}
            />
          </TabsContent>
          
          {/* دستاوردها */}
          <TabsContent value="achievements">
            <Achievements 
              userLevel={userData.level}
              onClaimReward={handleClaimAchievementReward}
            />
          </TabsContent>
          
          {/* رده‌بندی */}
          <TabsContent value="leaderboard">
            <Leaderboard 
              userId={userData.id}
            />
          </TabsContent>
          
          {/* فروشگاه */}
          <TabsContent value="rewards">
            <RewardSystem 
              userLevel={userData.level}
              userXP={userData.xp}
              userCredits={userData.credits}
              onPurchaseItem={handlePurchaseItem}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GamificationPage;