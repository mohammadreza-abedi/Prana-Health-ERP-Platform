import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Award,
  BadgeCheck,
  Calendar,
  Clock,
  Crown,
  Flame,
  GanttChart,
  Gift,
  Heart,
  Hourglass,
  Lightning,
  Medal,
  PartyPopper,
  Shield,
  Sparkles,
  Star,
  Swords,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";

// دستاوردها صفحه - Advanced Gamification Page
export default function Achievements() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("achievements");

  // Fetch user achievements
  const { data: userAchievements, isLoading: isLoadingAchievements } = useQuery({
    queryKey: ['/api/user-achievements'],
    enabled: !!user,
  });

  // Fetch user streaks
  const { data: userStreaks, isLoading: isLoadingStreaks } = useQuery({
    queryKey: ['/api/streaks'],
    enabled: !!user,
  });

  // Fetch user quests
  const { data: userQuests, isLoading: isLoadingQuests } = useQuery({
    queryKey: ['/api/quests'],
    enabled: !!user,
  });

  // Fetch seasonal challenges
  const { data: seasonalChallenges, isLoading: isLoadingSeasonalChallenges } = useQuery({
    queryKey: ['/api/seasonal-challenges'],
    enabled: !!user,
  });

  // Mock data for demonstration until API is fully implemented
  const mockAchievements = [
    {
      id: 1,
      name: "قدم‌زن حرفه‌ای",
      description: "۱۰,۰۰۰ قدم در یک روز",
      icon: "steps",
      progress: 85,
      completed: false,
      rarity: "common",
      xpReward: 100,
      category: "physical",
    },
    {
      id: 2,
      name: "ساعی در تغذیه",
      description: "۷ روز متوالی رژیم غذایی متعادل",
      icon: "nutrition",
      progress: 100,
      completed: true,
      rarity: "uncommon",
      xpReward: 200,
      category: "nutrition",
    },
    {
      id: 3,
      name: "ذهن آرام",
      description: "۱۰ ساعت مدیتیشن در ماه",
      icon: "meditation",
      progress: 40,
      completed: false,
      rarity: "rare",
      xpReward: 300,
      category: "mental",
    },
    {
      id: 4,
      name: "خواب منظم",
      description: "۱۴ روز متوالی خواب با کیفیت",
      icon: "sleep",
      progress: 100,
      completed: true,
      rarity: "uncommon",
      xpReward: 200,
      category: "health",
    },
    {
      id: 5,
      name: "متعادل در آب",
      description: "۲ لیتر آب در روز به مدت ۱۰ روز",
      icon: "water",
      progress: 70,
      completed: false,
      rarity: "common",
      xpReward: 100,
      category: "health",
    },
  ];

  const mockStreaks = [
    {
      id: 1,
      type: "login",
      currentStreak: 12,
      longestStreak: 15,
      lastUpdateDate: "2025-04-26",
    },
    {
      id: 2,
      type: "water",
      currentStreak: 5,
      longestStreak: 21,
      lastUpdateDate: "2025-04-26",
    },
    {
      id: 3,
      type: "steps",
      currentStreak: 8,
      longestStreak: 30,
      lastUpdateDate: "2025-04-26",
    },
    {
      id: 4,
      type: "meditation",
      currentStreak: 3,
      longestStreak: 7,
      lastUpdateDate: "2025-04-26",
    },
  ];
  
  const mockDailyQuests = [
    {
      id: 1,
      title: "پیاده‌روی روزانه",
      description: "حداقل ۵,۰۰۰ قدم امروز پیاده‌روی کنید",
      category: "daily",
      metricType: "steps",
      targetValue: 5000,
      currentValue: 3200,
      xpReward: 50,
      expiryDate: "2025-04-26T23:59:59",
      isCompleted: false,
    },
    {
      id: 2,
      title: "آب کافی",
      description: "حداقل ۸ لیوان آب امروز بنوشید",
      category: "daily",
      metricType: "water",
      targetValue: 8,
      currentValue: 5,
      xpReward: 30,
      expiryDate: "2025-04-26T23:59:59",
      isCompleted: false,
    },
    {
      id: 3,
      title: "مدیتیشن صبحگاهی",
      description: "۱۰ دقیقه مدیتیشن انجام دهید",
      category: "daily",
      metricType: "meditation",
      targetValue: 10,
      currentValue: 10,
      xpReward: 40,
      expiryDate: "2025-04-26T23:59:59",
      isCompleted: true,
    },
  ];
  
  const mockWeeklyQuests = [
    {
      id: 4,
      title: "استراحت فعال",
      description: "سه روز در این هفته ورزش کنید",
      category: "weekly",
      metricType: "workout",
      targetValue: 3,
      currentValue: 2,
      xpReward: 100,
      expiryDate: "2025-04-30T23:59:59",
      isCompleted: false,
    },
    {
      id: 5,
      title: "خواب منظم",
      description: "به مدت ۵ روز، حداقل ۷ ساعت بخوابید",
      category: "weekly",
      metricType: "sleep",
      targetValue: 5,
      currentValue: 3,
      xpReward: 120,
      expiryDate: "2025-04-30T23:59:59",
      isCompleted: false,
    },
  ];
  
  const mockSeasonalChallenges = [
    {
      id: 1,
      title: "چالش بهار ۱۴۰۳",
      description: "۳۰ روز سبک زندگی سالم برای شروع فصل بهار",
      season: "بهار ۱۴۰۳",
      targetValue: 30,
      currentValue: 16,
      targetMetric: "days",
      theme: "بهار سالم",
      startDate: "2025-03-21",
      endDate: "2025-06-21",
      xpReward: 500,
      creditReward: 1000,
      isCompleted: false,
      progress: 53,
    },
    {
      id: 2,
      title: "کاهش استرس محل کار",
      description: "۲۰ روز تکنیک‌های مدیریت استرس را در محل کار تمرین کنید",
      season: "بهار ۱۴۰۳",
      targetValue: 20,
      currentValue: 8,
      targetMetric: "days",
      theme: "سلامت روان محیط کار",
      startDate: "2025-04-01",
      endDate: "2025-05-15",
      xpReward: 300,
      creditReward: 600,
      isCompleted: false,
      progress: 40,
    },
  ];

  // Get rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-slate-600";
      case "uncommon":
        return "bg-emerald-600";
      case "rare":
        return "bg-blue-600";
      case "epic":
        return "bg-purple-600";
      case "legendary":
        return "bg-amber-500";
      default:
        return "bg-slate-600";
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string, size: number = 6) => {
    const className = `h-${size} w-${size}`;
    
    switch (category) {
      case "physical":
        return <Lightning className={className} />;
      case "nutrition":
        return <Heart className={className} />;
      case "mental":
        return <Sparkles className={className} />;
      case "health":
        return <Shield className={className} />;
      case "sleep":
        return <Moon className={className} />;
      case "water":
        return <Droplets className={className} />;
      case "steps":
        return <Footprints className={className} />;
      case "meditation":
        return <Zap className={className} />;
      case "login":
        return <UserRound className={className} />;
      case "workout":
        return <Dumbbell className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  return (
    <div className="container px-4 py-8">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">سیستم گیمیفیکیشن پرانا</h1>
        <p className="text-slate-500 dark:text-slate-400">
          با تکمیل چالش‌ها، دستاوردها و ماموریت‌ها امتیاز کسب کنید و سطح خود را ارتقاء دهید
        </p>
      </motion.div>

      {/* Player Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Card className="p-6 bg-gradient-to-br from-tiffany/20 to-navy/10 backdrop-blur-md border-2 border-tiffany/20 shadow-lg rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-tiffany to-navy flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-slate-800 mb-2">
                <span>{user?.level || 1}</span>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border-2 border-tiffany">
                  <Crown className="h-6 w-6 text-amber-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold">{user?.displayName || "کاربر"}</h3>
              <p className="text-sm text-slate-500">سطح {user?.level || 1} - عضو فعال</p>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">XP</span>
                <span className="text-sm font-medium">{user?.xp || 0} / {((user?.level || 1) * 100)}</span>
              </div>
              <Progress value={user?.xp % ((user?.level || 1) * 100) / ((user?.level || 1) * 100) * 100 || 0} className="h-3 mb-4" />
              
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-tiffany/20 flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-tiffany" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">دستاوردها</p>
                    <p className="text-sm font-bold">{mockAchievements.filter(a => a.completed).length} / {mockAchievements.length}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Flame className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">استریک</p>
                    <p className="text-sm font-bold">{mockStreaks[0]?.currentStreak || 0} روز</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h4 className="text-sm font-medium mb-2">وضعیت روزانه</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center bg-white/50 dark:bg-slate-800/50 p-2 rounded-lg">
                  <Lightning className="h-5 w-5 text-amber-500 mb-1" />
                  <span className="text-xs font-medium">فعالیت</span>
                  <span className="text-xl font-bold">۶۸<span className="text-xs">%</span></span>
                </div>
                
                <div className="flex flex-col items-center bg-white/50 dark:bg-slate-800/50 p-2 rounded-lg">
                  <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                  <span className="text-xs font-medium">آب</span>
                  <span className="text-xl font-bold">۵<span className="text-xs">/۸</span></span>
                </div>
                
                <div className="flex flex-col items-center bg-white/50 dark:bg-slate-800/50 p-2 rounded-lg">
                  <Footprints className="h-5 w-5 text-green-500 mb-1" />
                  <span className="text-xs font-medium">قدم</span>
                  <span className="text-xl font-bold">۶.۳<span className="text-xs">K</span></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-3">
              <h4 className="text-sm font-medium mb-1">ماموریت‌های روزانه</h4>
              
              {mockDailyQuests.slice(0, 2).map((quest) => (
                <div key={quest.id} className="bg-white/50 dark:bg-slate-800/50 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${quest.isCompleted ? 'bg-green-500/20' : 'bg-slate-500/20'}`}>
                      {quest.isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-slate-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">{quest.title}</p>
                      <Progress 
                        value={(quest.currentValue / quest.targetValue) * 100} 
                        className="h-1.5 mt-1" 
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="link" 
                size="sm" 
                onClick={() => setActiveTab("quests")}
                className="text-sm text-tiffany px-0"
              >
                مشاهده همه ماموریت‌ها
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tabs for different gamification elements */}
      <Tabs 
        defaultValue="achievements" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-8"
      >
        <TabsList className="grid grid-cols-4 mb-8 bg-white/50 dark:bg-slate-800/50 p-1 rounded-xl">
          <TabsTrigger value="achievements" className="rounded-lg text-sm">
            <Trophy className="h-4 w-4 ml-2" />
            دستاوردها
          </TabsTrigger>
          <TabsTrigger value="streaks" className="rounded-lg text-sm">
            <Flame className="h-4 w-4 ml-2" />
            استریک‌ها
          </TabsTrigger>
          <TabsTrigger value="quests" className="rounded-lg text-sm">
            <GanttChart className="h-4 w-4 ml-2" />
            ماموریت‌ها
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="rounded-lg text-sm">
            <Calendar className="h-4 w-4 ml-2" />
            چالش‌های فصلی
          </TabsTrigger>
        </TabsList>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <h2 className="text-xl font-bold flex items-center">
            <Trophy className="h-5 w-5 ml-2 text-amber-500" />
            دستاوردهای من
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAchievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <Card className={`overflow-hidden transition-all ${achievement.completed ? 'border-2 border-green-500/30' : 'hover:shadow-md'}`}>
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${getRarityColor(achievement.rarity)} text-white`}>
                        {achievement.rarity === "common" ? "معمولی" : 
                         achievement.rarity === "uncommon" ? "غیرمعمول" : 
                         achievement.rarity === "rare" ? "کمیاب" : 
                         achievement.rarity === "epic" ? "حماسی" : 
                         "افسانه‌ای"}
                      </Badge>
                      <span className="text-xs text-slate-500 flex items-center">
                        <Sparkles className="h-3 w-3 ml-1 text-amber-500" />
                        {achievement.xpReward} XP
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.category === "physical" ? "bg-amber-500/20" : 
                                     achievement.category === "nutrition" ? "bg-green-500/20" :
                                     achievement.category === "mental" ? "bg-purple-500/20" :
                                     "bg-tiffany/20"}`}>
                        {getCategoryIcon(achievement.category)}
                      </div>
                      <div className="mr-3">
                        <CardTitle className="text-base">{achievement.name}</CardTitle>
                        <CardDescription className="text-xs">{achievement.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>پیشرفت</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  </CardContent>
                  <CardFooter className={`p-3 flex justify-between ${achievement.completed ? 'bg-green-500/10' : 'bg-slate-100 dark:bg-slate-800'}`}>
                    {achievement.completed ? (
                      <Badge variant="outline" className="border-green-500 bg-green-500/10 text-green-500">
                        <BadgeCheck className="h-3 w-3 ml-1" />
                        تکمیل شده
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-slate-400 bg-slate-400/10 text-slate-400">
                        <Clock className="h-3 w-3 ml-1" />
                        در حال پیشرفت
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      جزئیات
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Streaks Tab */}
        <TabsContent value="streaks" className="space-y-6">
          <h2 className="text-xl font-bold flex items-center">
            <Flame className="h-5 w-5 ml-2 text-red-500" />
            استریک‌های فعالیت
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockStreaks.map((streak) => (
              <motion.div
                key={streak.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <Card className="hover:shadow-md">
                  <CardHeader className="p-4 pb-0 text-center">
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-red-500/20 to-amber-500/20 mb-2">
                      {getCategoryIcon(streak.type, 8)}
                    </div>
                    <CardTitle className="text-base">
                      {streak.type === "login" ? "ورود روزانه" :
                       streak.type === "water" ? "نوشیدن آب" :
                       streak.type === "steps" ? "پیاده‌روی" :
                       streak.type === "meditation" ? "مدیتیشن" : 
                       streak.type}
                    </CardTitle>
                    <div className="text-3xl font-bold text-amber-500 mt-1 mb-1 flex items-center justify-center">
                      {streak.currentStreak}
                      <span className="text-sm font-normal mr-1">روز</span>
                    </div>
                    <CardDescription className="text-xs">استریک فعلی</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-slate-500 flex items-center justify-center">
                      <Trophy className="h-4 w-4 ml-1 text-amber-400" />
                      رکورد: {streak.longestStreak} روز
                    </div>
                    {streak.currentStreak === streak.longestStreak && (
                      <Badge variant="outline" className="mx-auto mt-2 bg-amber-500/10 border-amber-500 text-amber-500">
                        <Star className="h-3 w-3 ml-1 text-amber-500" />
                        رکورد جدید!
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter className="p-3 bg-slate-100 dark:bg-slate-800 flex justify-between text-xs">
                    <span className="text-slate-500">آخرین بروزرسانی:</span>
                    <span className="font-medium">امروز</span>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <Alert className="bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-400">
            <Flame className="h-4 w-4" />
            <AlertTitle>استریک‌ها چگونه کار می‌کنند؟</AlertTitle>
            <AlertDescription>
              با انجام فعالیت‌های روزانه خود به طور منظم، استریک شما افزایش می‌یابد. اگر یک روز را از دست بدهید، استریک خود را از دست خواهید داد. با حفظ استریک‌ها، پاداش‌های ویژه‌ای دریافت خواهید کرد.
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Quests Tab */}
        <TabsContent value="quests" className="space-y-6">
          <h2 className="text-xl font-bold flex items-center">
            <GanttChart className="h-5 w-5 ml-2 text-navy" />
            ماموریت‌های روزانه و هفتگی
          </h2>
          
          <div className="space-y-8">
            {/* Daily Quests */}
            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">ماموریت‌های روزانه</h3>
                <Badge className="bg-navy mr-2">
                  <Clock className="h-3 w-3 ml-1" />
                  امروز
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockDailyQuests.map((quest) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className={`transition-all ${quest.isCompleted ? 'border-2 border-green-500/30' : 'hover:shadow-md'}`}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              quest.metricType === "steps" ? "bg-emerald-500/20" :
                              quest.metricType === "water" ? "bg-blue-500/20" :
                              quest.metricType === "meditation" ? "bg-purple-500/20" :
                              "bg-slate-500/20"
                            }`}>
                              {getCategoryIcon(quest.metricType)}
                            </div>
                            <div className="mr-3">
                              <CardTitle className="text-base">{quest.title}</CardTitle>
                              <CardDescription className="text-xs line-clamp-1">{quest.description}</CardDescription>
                            </div>
                          </div>
                          <div className="p-1">
                            {quest.isCompleted ? (
                              <BadgeCheck className="h-5 w-5 text-green-500" />
                            ) : (
                              <Timer className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>پیشرفت</span>
                            <span>{quest.currentValue} / {quest.targetValue}</span>
                          </div>
                          <Progress value={(quest.currentValue / quest.targetValue) * 100} className="h-2" />
                        </div>
                      </CardContent>
                      <CardFooter className={`p-3 flex justify-between ${quest.isCompleted ? 'bg-green-500/10' : 'bg-slate-100 dark:bg-slate-800'}`}>
                        <div className="text-xs text-slate-500 flex items-center">
                          <Sparkles className="h-3 w-3 ml-1 text-amber-500" />
                          {quest.xpReward} XP
                        </div>
                        {quest.isCompleted ? (
                          <Button variant="outline" size="sm" className="text-xs h-7 text-green-500 border-green-500/30" disabled>
                            دریافت شده
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" className="text-xs h-7" 
                            onClick={() => {
                              toast({
                                title: "ماموریت در حال انجام",
                                description: "با تکمیل این ماموریت، پاداش آن به شما تعلق می‌گیرد",
                              });
                            }}
                          >
                            جزئیات
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Weekly Quests */}
            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">ماموریت‌های هفتگی</h3>
                <Badge className="bg-tiffany mr-2">
                  <Calendar className="h-3 w-3 ml-1" />
                  این هفته
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockWeeklyQuests.map((quest) => (
                  <motion.div
                    key={quest.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card className={`transition-all ${quest.isCompleted ? 'border-2 border-green-500/30' : 'hover:shadow-md'}`}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              quest.metricType === "workout" ? "bg-red-500/20" :
                              quest.metricType === "sleep" ? "bg-indigo-500/20" :
                              "bg-slate-500/20"
                            }`}>
                              {getCategoryIcon(quest.metricType)}
                            </div>
                            <div className="mr-3">
                              <CardTitle className="text-base">{quest.title}</CardTitle>
                              <CardDescription className="text-xs line-clamp-1">{quest.description}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="outline" className="border-amber-500 text-amber-500 bg-amber-500/10">
                            <Gift className="h-3 w-3 ml-1" />
                            {quest.xpReward} XP
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>پیشرفت</span>
                            <span>{quest.currentValue} / {quest.targetValue}</span>
                          </div>
                          <Progress value={(quest.currentValue / quest.targetValue) * 100} className="h-2" />
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 bg-slate-100 dark:bg-slate-800 flex justify-between text-xs">
                        <div className="text-slate-500 flex items-center">
                          <Hourglass className="h-3 w-3 ml-1" />
                          <span>باقیمانده: ۴ روز</span>
                        </div>
                        <Button variant="link" size="sm" className="text-xs h-7 text-tiffany p-0" 
                          onClick={() => {
                            toast({
                              title: "ماموریت هفتگی",
                              description: "این ماموریت تا پایان هفته فعال است",
                            });
                          }}
                        >
                          مشاهده جزئیات
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Seasonal Challenges Tab */}
        <TabsContent value="seasonal" className="space-y-6">
          <h2 className="text-xl font-bold flex items-center">
            <Calendar className="h-5 w-5 ml-2 text-indigo-500" />
            چالش‌های فصلی
          </h2>
          
          <div className="space-y-8">
            {mockSeasonalChallenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="relative h-40 bg-gradient-to-r from-indigo-600 to-purple-500 flex items-end">
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-indigo-600 dark:bg-white/90 dark:text-indigo-600">
                      <PartyPopper className="h-3 w-3 ml-1" />
                      {challenge.season}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="border-white/50 text-white bg-white/10">
                      <Clock className="h-3 w-3 ml-1" />
                      <span>
                        {new Date(challenge.startDate).toLocaleDateString('fa-IR', { month: 'long', day: 'numeric' })} تا {new Date(challenge.endDate).toLocaleDateString('fa-IR', { month: 'long', day: 'numeric' })}
                      </span>
                    </Badge>
                  </div>
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{challenge.title}</h3>
                    <p className="text-white/80 line-clamp-1">{challenge.description}</p>
                  </div>
                </div>
                
                <div className="p-6 bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <Swords className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{challenge.theme}</h4>
                        <p className="text-sm text-slate-500">هدف: {challenge.targetValue} {challenge.targetMetric === "days" ? "روز" : challenge.targetMetric}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">{challenge.progress}%</div>
                      <p className="text-xs text-slate-500">پیشرفت</p>
                    </div>
                  </div>
                  
                  <Progress value={challenge.progress} className="h-2 mb-4" />
                  
                  <div className="flex flex-wrap justify-between gap-4">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">پاداش‌ها</h5>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800">
                          <Sparkles className="h-3 w-3 ml-1" />
                          {challenge.xpReward} XP
                        </Badge>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800">
                          <Coins className="h-3 w-3 ml-1" />
                          {challenge.creditReward} اعتبار
                        </Badge>
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                      onClick={() => {
                        toast({
                          title: `${challenge.title}`,
                          description: "جزئیات این چالش فصلی نمایش داده شد",
                        });
                      }}
                    >
                      <PartyPopper className="h-4 w-4 ml-2" />
                      شرکت در چالش
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Some additional components used in the page
import { useState } from "react";
import { Bookmark, BookOpen, CheckCircle, Coins, Droplets, Dumbbell, Footprints, Moon, UserRound } from "lucide-react";