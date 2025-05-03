import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAvatar } from "@/contexts/AvatarContext";
import { 
  Activity, 
  Sparkles,
  Heart,
  Brain,
  Dumbbell,
  LineChart,
  BadgePercent,
  Gem,
  CalendarCheck,
  BarChart3,
  Calculator,
  Timer,
  Droplet,
  UtensilsCrossed,
  Scale as ScaleIcon,
  BellRing,
  Clock,
  TrendingUp,
  Download,
  PieChart,
  CheckCircle,
  Star,
  ArrowRight,
  Share2,
  Medal,
  Users,
  ChevronRight,
  Mail,
  GraduationCap,
  BookOpenCheck,
  MousePointerClick,
  PanelLeftOpen,
  Search,
  Settings,
  Target,
  Trophy
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";

// داده‌های نمودار
const userActivityData = [60, 25, 78, 45, 85, 66, 32, 92, 80, 58, 70, 45, 82, 70];
const weekLabels = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

// آمار سلامت روزانه
type HealthStat = {
  current: number;
  target: number;
  unit: string;
  lowerIsBetter?: boolean;
};

const dailyHealthStats: Record<string, HealthStat> = {
  sleep: { current: 7.5, target: 8, unit: "ساعت" },
  hydration: { current: 2.2, target: 3, unit: "لیتر" },
  steps: { current: 7845, target: 10000, unit: "قدم" },
  calories: { current: 1850, target: 2200, unit: "کالری" },
  stress: { current: 3, target: 5, unit: "سطح", lowerIsBetter: true },
  heartRate: { current: 72, target: 75, unit: "BPM", lowerIsBetter: true }
};

// تست‌های برجسته
const highlightedTests = [
  {
    id: 1,
    title: "ارزیابی هوش هیجانی",
    description: "درک و مدیریت احساسات",
    icon: <Heart className="w-8 h-8 text-rose-500" />,
    questions: 25,
    timeMinutes: 15,
    color: "rose"
  },
  {
    id: 2,
    title: "تست شخصیت MBTI",
    description: "شناخت تیپ شخصیتی",
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    questions: 60,
    timeMinutes: 25,
    color: "purple"
  },
  {
    id: 3,
    title: "سبک زندگی سالم",
    description: "ارزیابی عادت‌های زندگی",
    icon: <Activity className="w-8 h-8 text-tiffany" />,
    questions: 42,
    timeMinutes: 24,
    color: "tiffany"
  }
];

// چالش‌های برجسته
const highlightedChallenges = [
  {
    id: 1,
    title: "چالش پیاده‌روی",
    description: "10,000 قدم در روز",
    icon: <Dumbbell className="h-8 w-8 text-emerald-500" />,
    duration: 7,
    progress: 45,
    pointsReward: 150,
    color: "emerald"
  },
  {
    id: 2,
    title: "خواب منظم",
    description: "8 ساعت خواب هر شب",
    icon: <Clock className="h-8 w-8 text-indigo-500" />,
    duration: 14,
    progress: 71,
    pointsReward: 200,
    color: "indigo"
  },
  {
    id: 3,
    title: "کاهش استرس",
    description: "مدیتیشن روزانه",
    icon: <Sparkles className="h-8 w-8 text-amber-500" />,
    duration: 21,
    progress: 32,
    pointsReward: 250,
    color: "amber"
  }
];

// ابزارهای تحلیلی و محاسبه‌گرها
const analyticTools = [
  {
    id: 1,
    title: "محاسبه BMI",
    description: "شاخص توده بدنی",
    icon: <ScaleIcon className="w-6 h-6 text-tiffany" />,
    estimatedTime: "1 دقیقه",
    path: "/tools/bmi"
  },
  {
    id: 2,
    title: "کالری مورد نیاز",
    description: "محاسبه‌گر کالری",
    icon: <Calculator className="w-6 h-6 text-aqua" />,
    estimatedTime: "2 دقیقه",
    path: "/tools/calories"
  },
  {
    id: 3,
    title: "ارزیابی خواب",
    description: "تحلیل کیفیت خواب",
    icon: <Activity className="w-6 h-6 text-indigo-500" />,
    estimatedTime: "3 دقیقه",
    path: "/tools/sleep"
  },
  {
    id: 4,
    title: "آب مورد نیاز",
    description: "محاسبه‌گر آب روزانه",
    icon: <Droplet className="w-6 h-6 text-blue-500" />,
    estimatedTime: "1 دقیقه",
    path: "/tools/water"
  },
  {
    id: 5,
    title: "تقویم غذایی",
    description: "برنامه غذایی هفتگی",
    icon: <UtensilsCrossed className="w-6 h-6 text-rose-500" />,
    estimatedTime: "5 دقیقه",
    path: "/tools/meal-plan"
  }
];

// اعضای تیم (نمونه برای داشبورد HR)
const teamMembers = [
  {
    id: 1,
    name: "آرش محمدی",
    position: "توسعه‌دهنده ارشد",
    avatar: "https://i.pravatar.cc/150?img=1",
    status: "آنلاین",
    level: 8,
    lastActive: "اکنون فعال",
    wellnessScore: 87
  },
  {
    id: 2,
    name: "سارا احمدی",
    position: "طراح UX/UI",
    avatar: "https://i.pravatar.cc/150?img=5",
    status: "آفلاین",
    level: 9,
    lastActive: "1 ساعت پیش",
    wellnessScore: 92
  },
  {
    id: 3,
    name: "امیر حسینی",
    position: "مدیر محصول",
    avatar: "https://i.pravatar.cc/150?img=8",
    status: "مرخصی",
    level: 7,
    lastActive: "2 روز پیش",
    wellnessScore: 79
  },
  {
    id: 4,
    name: "مریم فتحی",
    position: "متخصص منابع انسانی",
    avatar: "https://i.pravatar.cc/150?img=9",
    status: "آنلاین",
    level: 10,
    lastActive: "5 دقیقه پیش",
    wellnessScore: 94
  }
];

// بخش تلاش برای ارتقاء (بخش گمیفیکیشن)
const LevelUpSection = () => {
  // اطلاعات کاربر فعلی
  const currentUser = {
    name: "مدیر سیستم",
    level: 7,
    xp: 720,
    xpToNextLevel: 1000,
    recentActivities: [
      { activity: "تکمیل چالش پیاده‌روی روزانه", points: 25, time: "امروز، 9:30" },
      { activity: "تکمیل تست هوش هیجانی", points: 100, time: "دیروز، 14:15" },
      { activity: "ثبت داده‌های سلامت روزانه", points: 15, time: "دیروز، 8:00" }
    ]
  };
  
  // محاسبه درصد پیشرفت سطح
  const levelProgress = (currentUser.xp / currentUser.xpToNextLevel) * 100;
  
  return (
    <Card className="mica">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Medal className="mr-2 h-5 w-5 text-yellow" />
          ارتقاء سطح و امتیازات
        </CardTitle>
        <CardDescription>کسب امتیاز و ارتقاء به سطح بالاتر</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full bg-tiffany/10 flex items-center justify-center">
            <span className="text-xl font-bold text-tiffany">{currentUser.level}</span>
            <div className="absolute inset-0 rounded-full border-4 border-tiffany/30 border-r-tiffany animate-spin-slow"></div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">سطح {currentUser.level}</span>
              <span className="text-slate-500">{currentUser.xp}/{currentUser.xpToNextLevel} XP</span>
            </div>
            <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-tiffany"
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {currentUser.xpToNextLevel - currentUser.xp} امتیاز تا سطح {currentUser.level + 1}
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">فعالیت‌های اخیر</h4>
          <div className="space-y-2">
            {currentUser.recentActivities.map((activity, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm py-1 border-b border-slate-100 dark:border-slate-800 last:border-0">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>{activity.activity}</span>
                </div>
                <div className="flex items-center text-yellow">
                  <Star className="h-4 w-4 mr-1" />
                  <span>+{activity.points}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Button className="w-full mt-4 bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light text-white" size="sm">
          <BadgePercent className="h-4 w-4 mr-2" />
          مشاهده پاداش‌های بیشتر
        </Button>
      </CardContent>
    </Card>
  );
};

// بخش آخرین نتایج تست‌ها
const TestResultsSection = () => {
  const results = [
    {
      id: 1,
      title: "هوش هیجانی",
      date: "2 هفته پیش",
      score: 87,
      maxScore: 100,
      insight: "مهارت‌های همدلی بالا، نیاز به بهبود در خودتنظیمی",
      color: "rose"
    },
    {
      id: 2,
      title: "تیپ شخصیتی MBTI",
      date: "1 ماه پیش",
      result: "ENFJ",
      insight: "رهبر الهام‌بخش، متمرکز بر رشد دیگران",
      color: "purple"
    },
    {
      id: 3,
      title: "سبک زندگی سالم",
      date: "2 روز پیش",
      score: 72,
      maxScore: 100,
      insight: "نقاط قوت در تغذیه، نیاز به بهبود در خواب",
      color: "tiffany"
    }
  ];
  
  return (
    <Card className="mica">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <LineChart className="mr-2 h-5 w-5 text-indigo-500" />
          آخرین نتایج تست‌ها
        </CardTitle>
        <CardDescription>نتایج و بینش‌های تست‌های روانشناسی شما</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {results.map((result) => (
            <div 
              key={result.id} 
              className={`p-4 rounded-lg border border-${result.color === 'tiffany' ? 'tiffany/20' : result.color + '-200 dark:border-' + result.color + '-500/20'} 
                          bg-${result.color === 'tiffany' ? 'tiffany/5' : result.color + '-50 dark:bg-' + result.color + '-500/5'}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{result.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{result.date}</p>
                </div>
                {result.score ? (
                  <Badge className={`bg-${result.color === 'tiffany' ? 'tiffany' : result.color + '-500'}`}>
                    {result.score}/{result.maxScore}
                  </Badge>
                ) : (
                  <Badge className={`bg-${result.color === 'tiffany' ? 'tiffany' : result.color + '-500'}`}>
                    {result.result}
                  </Badge>
                )}
              </div>
              
              <p className="text-sm mt-2">{result.insight}</p>
              
              <div className="flex mt-3 gap-2">
                <Button variant="outline" size="sm" className="text-xs font-normal">
                  <Download className="h-3 w-3 mr-1" />
                  دانلود
                </Button>
                <Button variant="outline" size="sm" className="text-xs font-normal">
                  <Share2 className="h-3 w-3 mr-1" />
                  اشتراک‌گذاری
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="outline" className="w-full mt-4" size="sm">
          مشاهده همه نتایج
        </Button>
      </CardContent>
    </Card>
  );
};

// کامپوننت چهارخانه آمارها (مینی ویجت)
const StatCard = ({ title, value, icon, description, change, isPositive, color = "tiffany" }: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  change?: number;
  isPositive?: boolean;
  color?: string;
}) => {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'rose': 'text-rose-500',
      'purple': 'text-purple-500',
      'amber': 'text-amber-500',
      'tiffany': 'text-tiffany',
      'blue': 'text-blue-500',
      'yellow': 'text-yellow-500',
      'indigo': 'text-indigo-500',
      'emerald': 'text-emerald-500',
      'navy': 'text-navy',
      'aqua': 'text-aqua',
      'lime': 'text-lime-600'
    };
    return colorMap[color] || 'text-slate-600';
  };

  const getBgClass = (color: string) => {
    const bgMap: Record<string, string> = {
      'rose': 'bg-rose-50 dark:bg-rose-500/10',
      'purple': 'bg-purple-50 dark:bg-purple-500/10',
      'amber': 'bg-amber-50 dark:bg-amber-500/10',
      'tiffany': 'bg-tiffany/10',
      'blue': 'bg-blue-50 dark:bg-blue-500/10',
      'yellow': 'bg-yellow-50 dark:bg-yellow-500/10',
      'indigo': 'bg-indigo-50 dark:bg-indigo-500/10',
      'emerald': 'bg-emerald-50 dark:bg-emerald-500/10',
      'navy': 'bg-navy/10',
      'aqua': 'bg-aqua/10',
      'lime': 'bg-lime-50 dark:bg-lime-600/10'
    };
    return bgMap[color] || 'bg-slate-50 dark:bg-slate-500/10';
  };
  
  return (
    <div className="rounded-xl bg-white dark:bg-slate-800 shadow-sm p-4 hover:shadow-md transition-shadow neon-card">
      <div className="flex items-start justify-between mb-2">
        <div className={`p-2 rounded-lg ${getBgClass(color)}`}>
          <div className={getColorClass(color)}>
            {icon}
          </div>
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-xs ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <h3 className="text-sm text-slate-500 dark:text-slate-400">{title}</h3>
        <p className="text-xl font-bold mt-1">{value}</p>
        {description && (
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

// کامپوننت کارت ابزار
const ToolCard = ({ tool, onClick }: { tool: typeof analyticTools[0], onClick: () => void }) => {
  return (
    <motion.div
      className="rounded-lg p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer mica"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-3 rounded-full bg-tiffany/10 text-tiffany">
          {tool.icon}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-sm">{tool.title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tool.description}</p>
          
          <div className="flex justify-between items-center mt-3">
            <Badge variant="outline" className="text-xs font-normal">
              <Timer className="h-3 w-3 ml-1" />
              {tool.estimatedTime}
            </Badge>
            
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// کامپوننت کارت عضو تیم
const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => {
  const getWellnessColor = (score: number) => {
    if (score >= 90) return "text-emerald-500";
    if (score >= 75) return "text-tiffany";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };
  
  return (
    <motion.div
      className="rounded-lg p-4 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer mica"
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={member.avatar} 
            alt={member.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${member.status === 'آنلاین' ? 'bg-emerald-500' : member.status === 'آفلاین' ? 'bg-slate-400' : 'bg-amber-500'}`}></div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium">{member.name}</h3>
            <Badge className="bg-tiffany text-white text-xs">سطح {member.level}</Badge>
          </div>
          
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{member.position}</p>
          
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-slate-500">
              {member.lastActive}
            </div>
            
            <div className={`text-xs flex items-center ${getWellnessColor(member.wellnessScore)}`}>
              <Activity className="h-3 w-3 mr-1" />
              {member.wellnessScore}%
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// کامپوننت وضعیت سلامت روزانه
const DailyHealthStatus = () => {
  return (
    <Card className="mica">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Heart className="mr-2 h-5 w-5 text-rose-500" />
          وضعیت سلامت امروز
        </CardTitle>
        <CardDescription>آمار سلامت ثبت شده امروز</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(dailyHealthStats).map(([key, data]) => {
            const progress = Math.min(100, (data.current / data.target) * 100);
            const label = key === 'sleep' 
              ? 'خواب' 
              : key === 'hydration' 
                ? 'آب' 
                : key === 'steps' 
                  ? 'قدم‌ها' 
                  : key === 'calories' 
                    ? 'کالری' 
                    : key === 'stress' 
                      ? 'استرس' 
                      : 'ضربان قلب';
            
            // آیکون مناسب برای هر آمار
            const icon = key === 'sleep' 
              ? <Clock className="h-4 w-4" />
              : key === 'hydration' 
                ? <Droplet className="h-4 w-4" />
                : key === 'steps' 
                  ? <Activity className="h-4 w-4" />
                  : key === 'calories' 
                    ? <UtensilsCrossed className="h-4 w-4" />
                    : key === 'stress' 
                      ? <Brain className="h-4 w-4" />
                      : <Heart className="h-4 w-4" />;
            
            return (
              <div key={key} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {icon}
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    {data.current} / {data.target} {data.unit}
                  </span>
                </div>
                
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      data.lowerIsBetter 
                        ? (data.current <= data.target ? 'bg-tiffany' : 'bg-amber-500')
                        : (data.current >= data.target ? 'bg-tiffany' : 'bg-amber-500')
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex justify-between">
          <div>
            <h4 className="text-sm font-medium">وضعیت کلی</h4>
            <div className="flex items-center mt-1">
              <Badge className="bg-emerald-500 text-white">عالی</Badge>
              <span className="text-xs text-slate-500 mr-2">نسبت به هفته قبل 12% بهبود</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            ثبت داده‌های سلامت
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// کامپوننت نمودار فعالیت هفتگی
const WeeklyActivityChart = () => {
  return (
    <Card className="mica">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-indigo-500" />
          فعالیت هفتگی
        </CardTitle>
        <CardDescription>آمار فعالیت‌های سلامت شما در هفته جاری</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-end h-40 gap-1">
          {userActivityData.map((value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t-sm bg-tiffany/70 hover:bg-tiffany transition-colors cursor-pointer"
                style={{ height: `${value}%` }}
              ></div>
              {idx < 7 && (
                <div className="text-xs mt-1 text-slate-500">{weekLabels[idx]}</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-6 border-t pt-4 border-slate-100 dark:border-slate-800">
          <div>
            <Badge variant="outline" className="mr-2">امتیاز هفتگی</Badge>
            <Badge variant="outline" className="bg-tiffany/10 text-tiffany border-tiffany/20">870 XP</Badge>
          </div>
          
          <Button variant="outline" size="sm">
            <PieChart className="h-4 w-4 mr-2" />
            مشاهده آمار کامل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// بخش دوره‌های آموزشی سلامت
const HealthCoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "مدیریت استرس و تاب‌آوری",
      instructor: "دکتر سعید احمدی",
      duration: "5 ساعت",
      modules: 8,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=300&auto=format&fit=crop",
      progress: 35,
      color: "amber"
    },
    {
      id: 2,
      title: "اصول تغذیه سالم",
      instructor: "مهسا بهرامی",
      duration: "7 ساعت",
      modules: 12,
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=300&auto=format&fit=crop",
      progress: 70,
      color: "emerald"
    },
    {
      id: 3,
      title: "تکنیک‌های بهبود خواب",
      instructor: "دکتر مهدی کاظمی",
      duration: "3 ساعت",
      modules: 6,
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=300&auto=format&fit=crop",
      progress: 20,
      color: "indigo"
    }
  ];
  
  return (
    <Card className="mica">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BookOpenCheck className="mr-2 h-5 w-5 text-yellow" />
          دوره‌های آموزشی سلامت
        </CardTitle>
        <CardDescription>آموزش‌های تخصصی برای ارتقای سلامت</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="flex items-center gap-4">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-16 h-16 rounded-lg object-cover" 
              />
              
              <div className="flex-1">
                <h4 className="font-medium text-sm">{course.title}</h4>
                <p className="text-xs text-slate-500 mt-1">
                  {course.instructor} • {course.modules} ماژول • {course.duration}
                </p>
                
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{course.progress}% تکمیل شده</span>
                    <span>{Math.round(course.progress * course.modules / 100)}/{course.modules}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${course.color === 'amber' ? 'bg-amber-500' : course.color === 'emerald' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4" size="sm">
          <GraduationCap className="h-4 w-4 mr-2" />
          مشاهده همه دوره‌ها
        </Button>
      </CardContent>
    </Card>
  );
};

// منوی قابلیت‌های جدید
const NewFeatureMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <BellRing className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>قابلیت‌های جدید</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72">
          <div className="p-2">
            <div className="mb-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-tiffany/10 flex items-center justify-center text-tiffany">
                  <Brain className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">تست‌های روانشناسی</h4>
                  <p className="text-xs text-slate-500">20 تست جدید اضافه شد</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">آنالیز خواب</h4>
                  <p className="text-xs text-slate-500">ابزار جدید تحلیل کیفیت خواب</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">گزارش‌های سازمانی</h4>
                  <p className="text-xs text-slate-500">نمودارهای تحلیلی پیشرفته</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Badge className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">چالش‌های تیمی</h4>
                  <p className="text-xs text-slate-500">چالش‌های گروهی با همکاران</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">پایش استرس</h4>
                  <p className="text-xs text-slate-500">ابزار اندازه‌گیری و مدیریت استرس</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// کامپوننت اصلی داشبورد پیشرفته
// کامپوننت کارت شخصی (مینیمال و حرفه‌ای)
const PersonalCard = () => {
  const { activeAvatarUrl, avatarName } = useAvatar();
  // داده‌های نمونه برای کارت شخصی
  const userInfo = {
    id: 'EMP-1024',
    name: 'مدیر سیستم',
    position: 'مدیر ارشد منابع انسانی',
    department: 'بخش منابع انسانی',
    avatar: 'https://i.pravatar.cc/150?img=8',
    joiningDate: '1399/02/15',
    accessLevel: 'ادمین سیستم',
    workStatus: 'حاضر',
    healthScore: 92,
    level: 7,
    skills: ['مدیریت تیم', 'هوش عاطفی', 'مدیریت پروژه'],
    contact: {
      email: 'admin@prana-health.com',
      phone: '021-88776655'
    },
    achievements: [
      { icon: "🏆", label: "رهبر تیم برتر" },
      { icon: "🌟", label: "مدیر نمونه سال" },
      { icon: "📊", label: "بهره‌وری بالا" }
    ]
  };

  return (
    <motion.div 
      className="mb-6 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-xl relative overflow-hidden border-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(121, 218, 232, 0.1)" }}
    >
      {/* افکت‌های پس‌زمینه خاص */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-tiffany/3 via-white/0 to-aqua/3 dark:from-tiffany/5 dark:via-slate-800/0 dark:to-aqua/5"></div>
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-tiffany/60 to-aqua/60"></div>
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-aqua/5 dark:bg-aqua/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-tiffany/5 dark:bg-tiffany/10 blur-3xl"></div>
      
      {/* اطلاعات کاربر - با طراحی پیشرفته و انیمیشن‌های خاص */}
      <div className="relative z-10 px-6 pt-6 pb-3 overflow-hidden">
        {/* افکت‌های پس‌زمینه و تزئینی */}
        <motion.div
          className="absolute -top-[150px] -right-[150px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-tiffany/5 to-aqua/10 dark:from-tiffany/10 dark:to-aqua/20 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: 360 
          }}
          transition={{ 
            duration: 15, 
            ease: "linear", 
            repeat: Infinity 
          }}
        />
        
        <motion.div
          className="absolute -bottom-[100px] -left-[100px] w-[200px] h-[200px] rounded-full bg-gradient-to-tr from-purple-400/5 to-indigo-500/10 dark:from-purple-400/10 dark:to-indigo-500/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: -360 
          }}
          transition={{ 
            duration: 18, 
            ease: "linear", 
            repeat: Infinity 
          }}
        />
        
        {/* حالت شیشه‌ای و سایه‌های مدرن برای کل بخش */}
        <motion.div 
          className="relative backdrop-blur-sm bg-white/30 dark:bg-slate-900/30 rounded-xl border border-white/20 dark:border-slate-700/20 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col md:flex-row gap-6 p-4">
            {/* بخش اصلی پروفایل با افکت‌های پیشرفته */}
            <div className="flex bg-gradient-to-br from-white/80 to-white/50 dark:from-slate-800/80 dark:to-slate-800/50 p-3 rounded-lg shadow-inner relative overflow-hidden">
              {/* پترن سایه دکوراتیو */}
              <div className="absolute inset-0 bg-grid-slate-200/[0.05] dark:bg-grid-slate-50/[0.03]"></div>
              
              {/* ذرات معلق متحرک */}
              <div className="particle-container">
                <motion.div
                  className="absolute h-1 w-1 rounded-full bg-tiffany/40"
                  animate={{
                    x: [0, 20, 0],
                    y: [0, 30, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ top: '20%', left: '10%' }}
                />
                <motion.div
                  className="absolute h-1 w-1 rounded-full bg-aqua/40"
                  animate={{
                    x: [0, -30, 0],
                    y: [0, 20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  style={{ top: '50%', right: '10%' }}
                />
                <motion.div
                  className="absolute h-0.5 w-0.5 rounded-full bg-indigo-500/60"
                  animate={{
                    x: [0, 15, 0],
                    y: [0, -15, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  style={{ bottom: '30%', left: '30%' }}
                />
              </div>
              
              {/* آواتار با افکت‌های پیشرفته */}
              <div className="flex-shrink-0 relative z-10">
                <motion.div 
                  className="w-[88px] h-[88px] rounded-xl overflow-hidden shadow-2xl ring-2 ring-white/50 dark:ring-slate-700/50 mr-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* هاله متحرک دور آواتار */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-tr from-tiffany to-aqua rounded-xl opacity-30 blur-sm z-0"
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ 
                      duration: 8, 
                      ease: "linear", 
                      repeat: Infinity 
                    }}
                  />
                  
                  {/* لایه آواتار */}
                  <div className="absolute inset-[2px] rounded-lg overflow-hidden z-10">
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-aqua/30 to-tiffany/30 mix-blend-overlay z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                    <img 
                      src={activeAvatarUrl || userInfo.avatar} 
                      alt={avatarName || userInfo.name} 
                      className="w-full h-full object-cover relative z-0" 
                    />
                    
                    {/* افکت شیشه‌ای روی عکس */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent z-20"
                      animate={{ 
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        repeatType: "reverse" 
                      }}
                    />
                  </div>
                </motion.div>
                
                {/* نشانگر آنلاین با انیمیشن پالس لایه‌ای */}
                <div className="absolute -bottom-1 -right-1 flex items-center justify-center z-20">
                  <motion.div
                    className="absolute w-7 h-7 rounded-full bg-emerald-500/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute w-5 h-5 rounded-full bg-emerald-500/30"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.2, 0.7] }}
                    transition={{ duration: 2, delay: 0.3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 z-30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                  >
                    <span className="sr-only">آنلاین</span>
                  </motion.div>
                </div>
              </div>
              
              {/* اطلاعات شخصی با انیمیشن‌های پیشرفته */}
              <div className="pr-2 relative z-10">
                <div className="flex items-center gap-2">
                  <motion.h2 
                    className="text-xl font-bold text-slate-900 dark:text-white bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {userInfo.name}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <Badge className="bg-gradient-to-r from-tiffany to-aqua text-white text-[10px] py-0.5 px-2.5 h-5 font-medium shadow-md">
                      {userInfo.accessLevel}
                    </Badge>
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="inline-block w-2 h-2 bg-tiffany/50 rounded-full mr-1.5"></span>
                  {userInfo.position}
                </motion.p>
                
                {/* اطلاعات تکمیلی با افکت‌های مدرن */}
                <motion.div 
                  className="flex mt-3 gap-4 text-[11px] text-slate-500 dark:text-slate-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="flex items-center bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded-md shadow-sm"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(121, 218, 232, 0.1)" }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-indigo-500/80 to-blue-600/80 flex items-center justify-center mr-1.5 shadow-sm">
                      <span className="text-[8px] text-white font-bold">#</span>
                    </div>
                    <span className="font-medium">{userInfo.id}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded-md shadow-sm"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(121, 218, 232, 0.1)" }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-amber-500/80 to-orange-600/80 flex items-center justify-center mr-1.5 shadow-sm">
                      <span className="text-[8px] text-white font-bold">📅</span>
                    </div>
                    <span className="font-medium">{userInfo.joiningDate}</span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            
            {/* شاخص‌های کلیدی عملکرد با طراحی سه بعدی و انیمیشن */}
            <div className="flex-1 grid grid-cols-4 gap-x-3 gap-y-4 border-t md:border-t-0 md:border-r pt-4 md:pt-1 md:pr-6 mt-4 md:mt-0 border-slate-100 dark:border-slate-700/20 relative">
              {/* ترسیم خط نور تزئینی */}
              <motion.div 
                className="hidden md:block absolute top-[10%] right-0 w-px h-[80%] bg-gradient-to-b from-transparent via-tiffany/30 to-transparent" 
                animate={{ 
                  opacity: [0.2, 0.6, 0.2], 
                  height: ['70%', '80%', '70%'],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity 
                }}
              />
              
              {/* شاخص امتیاز سلامت - طراحی پیشرفته */}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-14 h-14 mb-2">
                  {/* سایه پشت دایره */}
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-md transform scale-110"></div>
                  
                  {/* حلقه خارجی با انیمیشن چرخش */}
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-emerald-400/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* دایره پیشرفت */}
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    {/* دایره پشت زمینه */}
                    <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-slate-200 dark:text-slate-700" />
                    
                    {/* دایره نور پشت پیشرفت */}
                    <motion.circle 
                      cx="18" cy="18" r="16" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      strokeDasharray="100" 
                      strokeDashoffset={100 - userInfo.healthScore}
                      className="text-emerald-500/20 blur-[1px]" 
                      strokeLinecap="round"
                    />
                    
                    {/* دایره پیشرفت اصلی */}
                    <motion.circle 
                      cx="18" cy="18" r="16" 
                      fill="none" 
                      stroke="url(#healthGradient)" 
                      strokeWidth="2.5"
                      strokeDasharray="100" 
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 100 - userInfo.healthScore }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="drop-shadow-md" 
                      strokeLinecap="round"
                    />
                    
                    {/* گرادیان برای دایره پیشرفت */}
                    <defs>
                      <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* عدد وسط با انیمیشن شمارش */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span 
                      className="text-sm font-bold bg-gradient-to-br from-emerald-600 to-emerald-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {userInfo.healthScore}
                    </motion.span>
                  </div>
                </div>
                
                {/* عنوان با افکت هاور */}
                <motion.span 
                  className="text-[11px] font-medium text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md bg-white/50 dark:bg-slate-800/50 shadow-sm"
                  whileHover={{ 
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    color: "#10b981"
                  }}
                >
                  امتیاز سلامت
                </motion.span>
              </motion.div>
              
              {/* شاخص سطح - طراحی پیشرفته */}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-14 h-14 mb-2 flex items-center justify-center">
                  {/* افکت هاله پشت */}
                  <div className="absolute w-11 h-11 rounded-lg bg-tiffany/10 blur-md"></div>
                  
                  {/* کادر اصلی */}
                  <motion.div 
                    className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-tiffany/80 to-aqua/80 shadow-lg"
                    whileHover={{ 
                      boxShadow: "0 0 15px rgba(121, 218, 232, 0.5)",
                    }}
                  >
                    {/* افکت شیشه‌ای روی عدد */}
                    <div className="absolute inset-0 rounded-lg bg-white/20 opacity-50"></div>
                    
                    {/* شماره سطح */}
                    <motion.span 
                      className="text-white font-bold text-lg z-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.6 }}
                    >
                      {userInfo.level}
                    </motion.span>
                    
                    {/* ذرات تزئینی اطراف عدد */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-white/80"
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-1 -left-1 w-1 h-1 rounded-full bg-white/80"
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{ 
                        duration: 2,
                        delay: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse" 
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* عنوان با افکت هاور */}
                <motion.span 
                  className="text-[11px] font-medium text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md bg-white/50 dark:bg-slate-800/50 shadow-sm"
                  whileHover={{ 
                    backgroundColor: "rgba(121, 218, 232, 0.1)",
                    color: "#2dd4bf"
                  }}
                >
                  سطح
                </motion.span>
              </motion.div>
              
              {/* وضعیت آنلاین - طراحی پیشرفته */}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-14 h-14 mb-2 flex items-center justify-center">
                  {/* حلقه‌های پالس متحرک */}
                  <motion.div
                    className="absolute w-10 h-10 rounded-full border border-emerald-400/30"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0, 0.7]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                  <motion.div
                    className="absolute w-7 h-7 rounded-full border border-emerald-400/50"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: 0.3,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                  />
                  
                  {/* نقطه مرکزی */}
                  <motion.div 
                    className="relative w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-400/20"
                    animate={{ 
                      boxShadow: [
                        "0 0 8px rgba(52, 211, 153, 0.4)",
                        "0 0 16px rgba(52, 211, 153, 0.6)",
                        "0 0 8px rgba(52, 211, 153, 0.4)"
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {/* افکت درخشش روی نقطه */}
                    <motion.div 
                      className="absolute -inset-1 bg-emerald-400/30 rounded-full blur-sm z-0"
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  </motion.div>
                </div>
                
                {/* عنوان با افکت هاور */}
                <motion.span 
                  className="text-[11px] font-medium text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md bg-white/50 dark:bg-slate-800/50 shadow-sm"
                  whileHover={{ 
                    backgroundColor: "rgba(52, 211, 153, 0.1)",
                    color: "#10b981"
                  }}
                >
                  حاضر
                </motion.span>
              </motion.div>
              
              {/* بخش کاری - طراحی پیشرفته */}
              <motion.div 
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-14 h-14 mb-2 flex items-center justify-center">
                  {/* زمینه آیکون با گرادیان */}
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/5 flex items-center justify-center"
                    whileHover={{ 
                      background: "linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))"
                    }}
                  >
                    {/* افکت نور پشت آیکون */}
                    <motion.div 
                      className="absolute w-8 h-8 rounded-full bg-indigo-500/20 blur-sm"
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                    
                    {/* آیکون با انیمیشن */}
                    <motion.div
                      className="relative z-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 5, 0, -5, 0] }}
                      transition={{ 
                        scale: { type: "spring", stiffness: 300, delay: 0.8 },
                        rotate: { 
                          duration: 6, 
                          repeat: Infinity, 
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: 2
                        }
                      }}
                    >
                      <Users className="w-6 h-6 text-indigo-500" />
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* عنوان با افکت هاور */}
                <motion.span 
                  className="text-[11px] font-medium text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md bg-white/50 dark:bg-slate-800/50 shadow-sm"
                  whileHover={{ 
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    color: "#6366f1"
                  }}
                >
                  منابع انسانی
                </motion.span>
              </motion.div>
            </div>
          </div>
          
          {/* نوار دستاوردها - با طراحی سه بعدی پیشرفته */}
          <div className="mt-2 px-4 pb-3 pt-1 relative">
            {/* خط جداکننده با افکت نورانی */}
            <motion.div 
              className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-tiffany/30 to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* عنوان بخش */}
            <motion.div 
              className="flex items-center mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">دستاوردها</span>
            </motion.div>
            
            {/* نوار اسکرول دستاوردها */}
            <div className="flex items-center overflow-x-auto scrollbar-hide pb-1 relative">
              {/* سایه کناری برای اسکرول */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/90 to-transparent dark:from-slate-900/90 z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/90 to-transparent dark:from-slate-900/90 z-10 pointer-events-none"></div>
              
              {/* دستاوردها */}
              {userInfo.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 mr-3 px-3 py-1.5 rounded-full bg-gradient-to-br from-white/90 to-white/50 dark:from-slate-800/90 dark:to-slate-800/50 flex items-center shadow-md relative overflow-hidden backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + (index * 0.1),
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    y: -3, 
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.05)",
                    scale: 1.05
                  }}
                >
                  {/* افکت گرادیان متحرک */}
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-300/10 via-amber-400/30 to-amber-300/10 blur-sm"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "linear",
                      delay: index * 0.2
                    }}
                  />
                  
                  {/* محتوای دستاورد */}
                  <div className="z-10 flex items-center">
                    <span className="w-5 h-5 flex items-center justify-center bg-amber-100 dark:bg-amber-500/20 rounded-full mr-2 text-amber-500">
                      {achievement.icon}
                    </span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                      {achievement.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* نوار پایین - مهارت‌ها و عملکردها (طراحی پیشرفته) */}
      <div className="relative backdrop-blur-md bg-white/40 dark:bg-slate-800/40 border-t border-white/20 dark:border-slate-700/20 rounded-b-xl overflow-hidden shadow-sm">
        {/* افکت‌های پس‌زمینه تزئینی */}
        <div className="absolute inset-0 bg-grid-slate-200/[0.03] dark:bg-grid-slate-50/[0.02]"></div>
        <motion.div
          className="absolute -left-32 -bottom-32 w-64 h-64 rounded-full bg-tiffany/5 dark:bg-tiffany/10 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        />
        
        <div className="px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <motion.div 
              className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center mb-2 md:mb-0 md:ml-3"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Trophy className="w-3.5 h-3.5 text-tiffany ml-1.5" />
              <span className="uppercase tracking-wider">مهارت‌ها</span>
            </motion.div>
            
            <div className="flex flex-wrap gap-2">
              {userInfo.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1) }}
                >
                  {/* افکت هاله در حالت هاور */}
                  <motion.div 
                    className="absolute -inset-1 rounded-md bg-gradient-to-r from-tiffany/30 to-aqua/30 opacity-0 blur-sm group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  {/* محتوای مهارت */}
                  <div className="relative z-10 text-[11px] py-1 px-2.5 rounded-md bg-gradient-to-br from-white/90 to-white/60 dark:from-slate-800/90 dark:to-slate-800/60 text-slate-700 dark:text-slate-300 border border-white/50 dark:border-slate-700/50 shadow-sm backdrop-blur-sm overflow-hidden">
                    {/* افکت حرکت گرادیان در حالت هاور */}
                    <motion.div 
                      className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/20 dark:via-slate-500/10 to-transparent skew-x-12 opacity-0 group-hover:opacity-100"
                      initial={false}
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                      }}
                    />
                    
                    <span className="relative z-10 font-medium">{skill}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* آیکون‌های عملکردی پیشرفته */}
          <div className="flex gap-1">
            {/* دکمه ایمیل با افکت */}
            <motion.button 
              className="relative p-2 rounded-full bg-white/60 dark:bg-slate-700/60 shadow-md overflow-hidden group backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* افکت هاله در حالت هاور */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200"
              />
              
              {/* افکت درخشش در هاور */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-tr from-transparent via-blue-400/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse-slow"
              />
              
              <Mail className="w-4 h-4 text-blue-500 dark:text-blue-400 relative z-10" />
              
              {/* تولتیپ */}
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 shadow-lg px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-200 pointer-events-none">
                ارسال پیام
              </div>
            </motion.button>
            
            {/* دکمه پنل با افکت */}
            <motion.button 
              className="relative p-2 rounded-full bg-white/60 dark:bg-slate-700/60 shadow-md overflow-hidden group backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* افکت هاله در حالت هاور */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200"
              />
              
              {/* افکت درخشش در هاور */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-tr from-transparent via-purple-400/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse-slow"
              />
              
              <PanelLeftOpen className="w-4 h-4 text-purple-500 dark:text-purple-400 relative z-10" />
              
              {/* تولتیپ */}
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 shadow-lg px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-200 pointer-events-none">
                باز کردن پنل
              </div>
            </motion.button>
            
            {/* دکمه تنظیمات با افکت */}
            <motion.button 
              className="relative p-2 rounded-full bg-white/60 dark:bg-slate-700/60 shadow-md overflow-hidden group backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {/* افکت هاله در حالت هاور */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-amber-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200"
              />
              
              {/* افکت درخشش در هاور */}
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-tr from-transparent via-amber-400/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse-slow"
              />
              
              {/* آیکون چرخان در هاور */}
              <motion.div 
                className="relative z-10"
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Settings className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              </motion.div>
              
              {/* تولتیپ */}
              <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 shadow-lg px-2 py-1 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100 duration-200 pointer-events-none">
                تنظیمات
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function EnhancedDashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [selectedTool, setSelectedTool] = useState<(typeof analyticTools)[0] | null>(null);
  const [showToolModal, setShowToolModal] = useState(false);
  
  const [isAdmin, setIsAdmin] = useState(true); // برای نمایش بخش‌های مدیریتی
  
  return (
    <>
      {/* کارت شخصی کاربر */}
      <PersonalCard />
      
      <div className="mb-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold mb-1">
            سلام مدیر 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            امروز <span className="text-tiffany font-medium">{formatDate(new Date())}</span> است. خلاصه سلامت و فعالیت‌های شما
          </p>
        </motion.div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <NewFeatureMenu />
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* منوی سربرگ‌ها */}
      <div className="mb-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="flex items-center">
              <Activity className="h-4 w-4 ml-2" />
              <span>خلاصه</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center">
              <Heart className="h-4 w-4 ml-2" />
              <span>سلامت</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center">
              <Brain className="h-4 w-4 ml-2" />
              <span>تست‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <PieChart className="h-4 w-4 ml-2" />
              <span>آنالیز</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            {/* آمارهای سربرگ */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard 
                title="امتیاز سلامت" 
                value="87/100" 
                icon={<Heart className="h-6 w-6" />} 
                change={12} 
                isPositive={true} 
                color="rose"
              />
              <StatCard 
                title="تکمیل چالش‌ها" 
                value="8 چالش" 
                icon={<Target className="h-6 w-6" />} 
                change={5} 
                isPositive={true} 
                color="blue"
              />
              <StatCard 
                title="امتیاز کل" 
                value="2,450 XP" 
                icon={<Trophy className="h-6 w-6" />} 
                change={18} 
                isPositive={true} 
                color="yellow"
              />
              <StatCard 
                title="سطح فعلی" 
                value="سطح 7" 
                icon={<Sparkles className="h-6 w-6" />} 
                description="450 امتیاز تا سطح بعدی" 
                color="tiffany"
              />
            </div>
            
            {/* بخش اصلی */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ستون اول */}
              <div className="space-y-6">
                <DailyHealthStatus />
                <LevelUpSection />
              </div>
              
              {/* ستون دوم */}
              <div className="space-y-6">
                <WeeklyActivityChart />
                <TestResultsSection />
              </div>
              
              {/* ستون سوم */}
              <div className="space-y-6">
                <HealthCoursesSection />
                
                {/* آزمون‌های برتر */}
                <Card className="mica">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Brain className="mr-2 h-5 w-5 text-purple-500" />
                      آزمون‌های برتر
                    </CardTitle>
                    <CardDescription>
                      آزمون‌های برتر روانشناسی و سلامت
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                      {highlightedTests.map((test) => (
                        <Link key={test.id} href="/psychological-tests">
                          <div 
                            className={`p-4 rounded-lg bg-${test.color === 'tiffany' ? 'tiffany/10' : test.color + '-50 dark:bg-' + test.color + '-500/10'} 
                                      hover:bg-${test.color === 'tiffany' ? 'tiffany/20' : test.color + '-100 dark:hover:bg-' + test.color + '-500/20'} 
                                      cursor-pointer transition-colors`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="bg-white dark:bg-slate-800 p-2 rounded-lg">
                                {test.icon}
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-medium">{test.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                  {test.description}
                                </p>
                              </div>
                              
                              <Button variant="ghost" size="icon">
                                <ArrowRight className="h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      <MousePointerClick className="h-4 w-4 ml-2" />
                      مشاهده همه آزمون‌ها
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-6 mt-6">
            {/* بخش سلامت */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>آمار فعالیت بدنی</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400">
                      نمودار فعالیت بدنی اینجا قرار می‌گیرد
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>آمار خواب</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400">
                      نمودار آمار خواب اینجا قرار می‌گیرد
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>مدیریت استرس</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center">
                    <div className="text-slate-400">
                      نمودار مدیریت استرس اینجا قرار می‌گیرد
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ابزارهای ارزیابی سلامت</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analyticTools.slice(0, 3).map((tool) => (
                      <ToolCard 
                        key={tool.id} 
                        tool={tool} 
                        onClick={() => {
                          setSelectedTool(tool);
                          setShowToolModal(true);
                        }}
                      />
                    ))}
                  </div>
                  
                  <Button className="w-full mt-4" variant="outline">
                    مشاهده همه ابزارها
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>چالش‌های سلامت</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {highlightedChallenges.map((challenge) => (
                      <div 
                        key={challenge.id} 
                        className={`p-4 rounded-lg bg-${challenge.color === 'tiffany' ? 'tiffany/10' : challenge.color + '-50 dark:bg-' + challenge.color + '-500/10'} 
                                  border border-${challenge.color === 'tiffany' ? 'tiffany/20' : challenge.color + '-200 dark:border-' + challenge.color + '-500/20'}`}
                      >
                        <div className="flex gap-3">
                          <div className="bg-white dark:bg-slate-800 p-2 rounded-lg">
                            {challenge.icon}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{challenge.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              {challenge.description}
                            </p>
                            
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>پیشرفت: {challenge.progress}%</span>
                                <span>{challenge.pointsReward} امتیاز</span>
                              </div>
                              <Progress value={challenge.progress} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-4" variant="outline">
                    مشاهده همه چالش‌ها
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tests" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* محتوای تست‌ها */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>تست‌های روانشناسی و ارزیابی</CardTitle>
                  <CardDescription>
                    آخرین تست‌های تکمیل شده و تست‌های محبوب
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {highlightedTests.map((test) => (
                      <Link key={test.id} href="/psychological-tests">
                        <div 
                          className={`p-4 rounded-lg bg-${test.color === 'tiffany' ? 'tiffany/10' : test.color + '-50 dark:bg-' + test.color + '-500/10'} 
                                    hover:bg-${test.color === 'tiffany' ? 'tiffany/20' : test.color + '-100 dark:hover:bg-' + test.color + '-500/20'} 
                                    cursor-pointer transition-colors`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-slate-800 p-2 rounded-lg">
                              {test.icon}
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="font-medium">{test.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                {test.description}
                              </p>
                              
                              <div className="flex justify-between mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {test.questions} سوال
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {test.timeMinutes} دقیقه
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    مشاهده همه تست‌ها
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="row-span-2">
                <CardHeader>
                  <CardTitle>نتایج اخیر</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">تست MBTI</h3>
                          <Badge>ENFJ</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          تاریخ: 2 هفته پیش
                        </p>
                        <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
                          <p className="text-sm">رهبر الهام‌بخش، متمرکز بر رشد دیگران</p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" className="text-xs w-full">
                            جزئیات بیشتر
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-500/10">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">هوش هیجانی</h3>
                          <Badge className="bg-rose-500">87/100</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          تاریخ: 1 ماه پیش
                        </p>
                        <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
                          <p className="text-sm">مهارت‌های همدلی بالا، نیاز به بهبود در خودتنظیمی</p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" className="text-xs w-full">
                            جزئیات بیشتر
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-tiffany/10">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">سبک زندگی سالم</h3>
                          <Badge className="bg-tiffany">72/100</Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          تاریخ: 3 روز پیش
                        </p>
                        <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
                          <p className="text-sm">نقاط قوت در تغذیه، نیاز به بهبود در خواب</p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" className="text-xs w-full">
                            جزئیات بیشتر
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>تست‌های پیشنهادی</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="bg-tiffany/10 p-2 rounded-lg text-tiffany">
                          <Activity className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">ارزیابی تاب‌آوری</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            سنجش مقاومت در برابر استرس
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow/10 p-2 rounded-lg text-yellow">
                          <Gem className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">ارزش‌های شغلی</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            شناسایی ارزش‌های مهم شغلی شما
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-500/10 p-2 rounded-lg text-purple-500">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">نیمرخ استرس دیجیتال</h4>
                          <p className="text-xs text-slate-500 mt-1">
                            ارزیابی تأثیر تکنولوژی بر سلامت روان
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6 mt-6">
            {isAdmin && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <StatCard 
                    title="میانگین سلامت" 
                    value="83/100" 
                    icon={<Heart className="h-6 w-6" />} 
                    change={7} 
                    isPositive={true} 
                    color="rose"
                  />
                  <StatCard 
                    title="کاربران فعال" 
                    value="85%" 
                    icon={<Users className="h-6 w-6" />} 
                    change={12} 
                    isPositive={true} 
                    color="blue"
                  />
                  <StatCard 
                    title="چالش‌های تکمیل شده" 
                    value="348" 
                    icon={<CheckCircle className="h-6 w-6" />} 
                    change={15} 
                    isPositive={true} 
                    color="emerald"
                  />
                  <StatCard 
                    title="میانگین امتیاز" 
                    value="1,650 XP" 
                    icon={<Trophy className="h-6 w-6" />} 
                    change={8} 
                    isPositive={true} 
                    color="amber"
                  />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>آمار سلامت سازمانی</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80 flex items-center justify-center">
                        <div className="text-slate-400">
                          نمودار آمار سلامت سازمانی اینجا قرار می‌گیرد
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>اعضای تیم</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {teamMembers.map((member) => (
                          <TeamMemberCard key={member.id} member={member} />
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full mt-4">
                        <Mail className="h-4 w-4 ml-2" />
                        مدیریت اعضای تیم
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
            
            {!isAdmin && (
              <div className="flex flex-col items-center justify-center p-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <PanelLeftOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">بخش آنالیز داده‌ها</h3>
                <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
                  این قسمت برای مدیران و مسئولین HR قابل دسترسی است. 
                  برای مشاهده گزارش‌های شخصی خود از بخش "تست‌ها" استفاده کنید.
                </p>
                <Button>
                  بازگشت به داشبورد
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* دیالوگ ابزار */}
      <Dialog open={showToolModal} onOpenChange={setShowToolModal}>
        <DialogContent className="max-w-lg">
          {selectedTool && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-tiffany/10 text-tiffany">
                    {selectedTool.icon}
                  </div>
                  {selectedTool.title}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedTool.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <h3 className="font-medium mb-2">این ابزار چگونه کار می‌کند؟</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    این ابزار با دریافت اطلاعات دقیق از شما، محاسبات تخصصی را انجام داده و نتایج معتبر علمی 
                    را در اختیار شما قرار می‌دهد. نتایج به همراه توضیحات و توصیه‌های سلامتی ارائه می‌شود.
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <Badge variant="outline" className="flex items-center">
                    <Timer className="h-3 w-3 ml-1" />
                    {selectedTool.estimatedTime}
                  </Badge>
                  <Badge variant="outline">ابزار معتبر</Badge>
                </div>
              </div>
              
              <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setShowToolModal(false)}>
                  بعداً
                </Button>
                
                <Button>
                  استفاده از ابزار
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}