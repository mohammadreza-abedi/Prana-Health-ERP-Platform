import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useAvatar } from "@/contexts/AvatarContext";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  User,
  Users,
  UserPlus,
  Settings,
  Shield,
  Award,
  Trophy,
  Medal,
  Heart,
  Activity,
  Calendar,
  Clock,
  Edit,
  Camera,
  FileText,
  Wallet,
  Briefcase,
  ChevronRight,
  Tag,
  Gift,
  Sparkles,
  MessageSquare,
  Bell,
  Paperclip,
  Share2,
  LogOut,
  Check,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// داده‌های دمو برای نمایش پروفایل کاربر
interface UserData {
  id: string;
  displayName: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  bio: string;
  department: string;
  position: string;
  joinDate: string;
  level: number;
  xp: number;
  credits: number;
  statistics: {
    challengesCompleted: number;
    badgesEarned: number;
    healthScore: number;
    streakDays: number;
    healthyHabits: number;
    eventsAttended: number;
  };
  healthMetrics: {
    date: string;
    steps: number;
    sleep: number;
    water: number;
    exercise: number;
    stress: number;
    calories: number;
  }[];
  achievements: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    earnedDate: string;
    progress: number;
    maxProgress: number;
    isEarned: boolean;
    xpReward: number;
    category: string;
  }[];
  badges: {
    id: string;
    name: string;
    icon: React.ReactNode;
    rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
    earnedDate: string;
    isEquipped: boolean;
  }[];
  preferences: {
    darkMode: boolean;
    notifications: boolean;
    emailNotifications: boolean;
    privacyLevel: "public" | "team" | "private";
    language: "fa" | "en";
  };
  friends: {
    id: string;
    name: string;
    avatar: string;
    level: number;
    isOnline: boolean;
  }[];
  recentActivities: {
    id: string;
    type: string;
    description: string;
    date: string;
    icon: React.ReactNode;
  }[];
  credits_history: {
    id: string;
    amount: number;
    description: string;
    date: string;
    type: "earned" | "spent";
  }[];
}

// تابع کمکی برای فارسی‌سازی اعداد
const toPersianNumber = (num: number) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

// تابع کمکی برای قالب‌بندی تاریخ
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  // تبدیل به فرمت فارسی
  return new Intl.DateTimeFormat("fa-IR").format(date);
};

// تابع کمکی برای محاسبه XP مورد نیاز برای لول بعدی
const calculateRequiredXP = (level: number) => {
  return level * 500;
};

// تابع کمکی برای محاسبه درصد پیشرفت در لول فعلی
const calculateLevelProgress = (xp: number, level: number) => {
  const currentLevelMinXP = (level - 1) * 500;
  const nextLevelMinXP = level * 500;
  return Math.floor(((xp - currentLevelMinXP) / (nextLevelMinXP - currentLevelMinXP)) * 100);
};

// کلاس‌های رنگی برای نادر بودن نشان‌ها
const rarityClasses = {
  common: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  uncommon: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  rare: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  epic: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  legendary: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
};

// ترجمه فارسی برای نادر بودن نشان‌ها
const rarityTranslation = {
  common: "معمولی",
  uncommon: "غیرمعمول",
  rare: "کمیاب",
  epic: "حماسی",
  legendary: "افسانه‌ای",
};

const demoUserData: UserData = {
  id: "u123456",
  displayName: "مهدی رضایی",
  username: "mahdi.rezaei",
  email: "mahdi.rezaei@example.com",
  avatar: "https://i.pravatar.cc/300?img=11",
  coverImage: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2607&q=80",
  bio: "کارشناس سلامت و ایمنی شغلی با ۵ سال سابقه در صنعت نفت و پتروشیمی. علاقه‌مند به پیاده‌روی و یوگا.",
  department: "HSE",
  position: "کارشناس ارشد ایمنی",
  joinDate: "2021-08-15",
  level: 7,
  xp: 3250,
  credits: 1750,
  statistics: {
    challengesCompleted: 14,
    badgesEarned: 9,
    healthScore: 86,
    streakDays: 23,
    healthyHabits: 7,
    eventsAttended: 5,
  },
  healthMetrics: [
    { date: "2023-06-01", steps: 8500, sleep: 7.2, water: 6, exercise: 45, stress: 30, calories: 2100 },
    { date: "2023-06-02", steps: 9200, sleep: 7.5, water: 8, exercise: 30, stress: 35, calories: 2000 },
    { date: "2023-06-03", steps: 7800, sleep: 6.8, water: 5, exercise: 20, stress: 40, calories: 2200 },
    { date: "2023-06-04", steps: 10500, sleep: 8.1, water: 7, exercise: 60, stress: 25, calories: 1950 },
    { date: "2023-06-05", steps: 9700, sleep: 7.7, water: 8, exercise: 40, stress: 30, calories: 2050 },
  ],
  achievements: [
    {
      id: "a1",
      name: "قدم‌زن حرفه‌ای",
      description: "بیش از ۱۰۰،۰۰۰ قدم در یک ماه پیاده‌روی کنید",
      icon: <Activity />,
      earnedDate: "2023-05-15",
      progress: 100,
      maxProgress: 100,
      isEarned: true,
      xpReward: 300,
      category: "فعالیت بدنی",
    },
    {
      id: "a2",
      name: "مدیتیشن منظم",
      description: "۱۰ روز متوالی مدیتیشن کنید",
      icon: <Heart />,
      earnedDate: "",
      progress: 7,
      maxProgress: 10,
      isEarned: false,
      xpReward: 200,
      category: "ذهن‌آگاهی",
    },
    {
      id: "a3",
      name: "خواب کافی",
      description: "به مدت یک ماه، روزانه حداقل ۷ ساعت بخوابید",
      icon: <Clock />,
      earnedDate: "2023-04-20",
      progress: 100,
      maxProgress: 100,
      isEarned: true,
      xpReward: 250,
      category: "سلامت عمومی",
    },
    {
      id: "a4",
      name: "متخصص ارگونومی",
      description: "همه آموزش‌های ارگونومی محل کار را تکمیل کنید",
      icon: <Shield />,
      earnedDate: "",
      progress: 3,
      maxProgress: 5,
      isEarned: false,
      xpReward: 350,
      category: "آموزش‌ها",
    },
    {
      id: "a5",
      name: "نوشیدن آب کافی",
      description: "۱۴ روز متوالی حداقل ۸ لیوان آب بنوشید",
      icon: <Heart />,
      earnedDate: "2023-05-28",
      progress: 100,
      maxProgress: 100,
      isEarned: true,
      xpReward: 150,
      category: "سلامت عمومی",
    },
  ],
  badges: [
    {
      id: "b1",
      name: "پیشگام سلامت",
      icon: <Award />,
      rarity: "epic",
      earnedDate: "2023-05-10",
      isEquipped: true,
    },
    {
      id: "b2",
      name: "قهرمان ورزش",
      icon: <Trophy />,
      rarity: "rare",
      earnedDate: "2023-04-18",
      isEquipped: true,
    },
    {
      id: "b3",
      name: "ذهن آگاه",
      icon: <Shield />,
      rarity: "uncommon",
      earnedDate: "2023-03-22",
      isEquipped: false,
    },
    {
      id: "b4",
      name: "متخصص ایمنی",
      icon: <Shield />,
      rarity: "legendary",
      earnedDate: "2023-02-05",
      isEquipped: true,
    },
    {
      id: "b5",
      name: "دونده صبحگاهی",
      icon: <Activity />,
      rarity: "common",
      earnedDate: "2023-01-30",
      isEquipped: false,
    },
  ],
  preferences: {
    darkMode: true,
    notifications: true,
    emailNotifications: false,
    privacyLevel: "team",
    language: "fa",
  },
  friends: [
    { id: "f1", name: "سارا احمدی", avatar: "https://i.pravatar.cc/150?img=5", level: 9, isOnline: true },
    { id: "f2", name: "علی محمدی", avatar: "https://i.pravatar.cc/150?img=12", level: 6, isOnline: false },
    { id: "f3", name: "زهرا کریمی", avatar: "https://i.pravatar.cc/150?img=9", level: 8, isOnline: true },
    { id: "f4", name: "حسین نوری", avatar: "https://i.pravatar.cc/150?img=15", level: 5, isOnline: false },
  ],
  recentActivities: [
    {
      id: "ra1",
      type: "challenge",
      description: "چالش «پله‌نوردی هفتگی» را تکمیل کرد",
      date: "2023-06-04T09:30:00",
      icon: <Trophy />,
    },
    {
      id: "ra2",
      type: "badge",
      description: "نشان «قهرمان آب‌رسانی» را دریافت کرد",
      date: "2023-06-03T14:15:00",
      icon: <Award />,
    },
    {
      id: "ra3",
      type: "event",
      description: "در رویداد «کارگاه مدیریت استرس» شرکت کرد",
      date: "2023-06-02T11:00:00",
      icon: <Calendar />,
    },
    {
      id: "ra4",
      type: "health",
      description: "رکورد ۱۲۰۰۰ قدم در روز را ثبت کرد",
      date: "2023-06-01T18:45:00",
      icon: <Activity />,
    },
  ],
  credits_history: [
    {
      id: "ch1",
      amount: 200,
      description: "تکمیل چالش «پیاده‌روی پاییزی»",
      date: "2023-06-03T10:20:00",
      type: "earned",
    },
    {
      id: "ch2",
      amount: 150,
      description: "خرید آیتم آواتار ویژه",
      date: "2023-06-02T15:30:00",
      type: "spent",
    },
    {
      id: "ch3",
      amount: 100,
      description: "حضور منظم در هفته",
      date: "2023-06-01T09:00:00",
      type: "earned",
    },
    {
      id: "ch4",
      amount: 300,
      description: "اتمام دوره آموزشی «ارگونومی پیشرفته»",
      date: "2023-05-28T14:15:00",
      type: "earned",
    },
  ],
};

// نمایش پروفایل کاربر
const UserProfile: React.FC = () => {
  const userData = demoUserData; // در یک برنامه واقعی، این از API می‌آید
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const { toast } = useToast();
  const { activeAvatarUrl, avatarName } = useAvatar();
  
  const levelProgress = calculateLevelProgress(userData.xp, userData.level);
  const nextLevelXP = calculateRequiredXP(userData.level);
  
  // رندر شدن نوار پیشرفت لول
  const renderLevelProgress = () => (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>XP: {toPersianNumber(userData.xp)} / {toPersianNumber(nextLevelXP)}</span>
        <span>{toPersianNumber(levelProgress)}%</span>
      </div>
      <Progress value={levelProgress} className="h-2" />
    </div>
  );
  
  // رندر شدن نشان‌های اکوییپ شده
  const renderEquippedBadges = () => {
    const equippedBadges = userData.badges.filter(badge => badge.isEquipped);
    
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {equippedBadges.map(badge => (
          <Badge 
            key={badge.id} 
            variant="outline" 
            className={`rounded-full ${rarityClasses[badge.rarity]} p-1.5 flex items-center gap-1`}
          >
            <span className="w-4 h-4">{badge.icon}</span>
            <span className="text-xs">{badge.name}</span>
          </Badge>
        ))}
      </div>
    );
  };
  
  // رندر شدن کارت‌های آمار
  const renderStatCards = () => {
    const stats = [
      { title: "چالش‌های تکمیل شده", value: userData.statistics.challengesCompleted, icon: <Trophy className="h-4 w-4 text-amber-500" /> },
      { title: "نشان‌های کسب شده", value: userData.statistics.badgesEarned, icon: <Award className="h-4 w-4 text-purple-500" /> },
      { title: "روزهای متوالی", value: userData.statistics.streakDays, icon: <Activity className="h-4 w-4 text-red-500" /> },
      { title: "امتیاز سلامتی", value: userData.statistics.healthScore, icon: <Heart className="h-4 w-4 text-tiffany" /> },
      { title: "عادت‌های سالم", value: userData.statistics.healthyHabits, icon: <Check className="h-4 w-4 text-green-500" /> },
      { title: "رویدادهای شرکت کرده", value: userData.statistics.eventsAttended, icon: <Calendar className="h-4 w-4 text-blue-500" /> },
    ];
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-slate-200 dark:border-slate-800">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="mb-2 p-2 rounded-full bg-slate-100 dark:bg-slate-800">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold">{toPersianNumber(stat.value)}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{stat.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
  
  // مجموعه بنرهای قابل انتخاب برای پروفایل
  const profileBanners = [
    {
      id: "default",
      name: "پیش‌فرض",
      type: "gradient",
      description: "بنر پیش‌فرض با گرادیان زیبا",
      isLocked: false,
      price: 0,
      component: () => (
        <div className="w-full h-full bg-gradient-to-r from-tiffany to-blue-500 relative overflow-hidden">
          {/* الگوی هندسی متحرک */}
          <motion.div 
            className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
          ></motion.div>

          {/* هاله‌های متحرک */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror"
            }}
          ></motion.div>

          <motion.div
            className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-white/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1
            }}
          ></motion.div>
        </div>
      )
    },
    {
      id: "heartbeat",
      name: "نوار قلب",
      type: "animated",
      description: "نمایش ضربان قلب به صورت انیمیشن",
      isLocked: false,
      price: 500,
      component: () => (
        <div className="w-full h-full bg-gradient-to-br from-purple-600/90 to-indigo-900/90 relative overflow-hidden">
          {/* پس‌زمینه شبکه‌ای */}
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px]"></div>
          
          {/* خط نوار قلب */}
          <div className="absolute inset-0 flex items-center">
            <motion.div 
              className="h-px w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent"
              initial={{ width: 0, x: 0, opacity: 0 }}
              animate={{
                width: ["0%", "100%", "100%", "0%"],
                x: ["0%", "0%", "0%", "100%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                times: [0, 0.4, 0.6, 1]
              }}
            ></motion.div>
          </div>
          
          {/* قلب متحرک و ضربان قلب */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" className="fill-pink-500 opacity-30">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
          
          {/* نوار قلب انیمیشن */}
          <div className="absolute top-1/2 left-0 right-0">
            <svg 
              viewBox="0 0 1200 60" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-20 overflow-visible opacity-30"
            >
              <motion.path
                d="M0,30 Q50,30 60,30 T70,30 80,30 90,30 100,30 110,10 120,50 130,0 140,40 150,30 160,30 170,30 180,30 190,30 200,30 210,30 220,30 230,30 240,30 250,30 260,10 270,50 280,0 290,40 300,30 310,30 320,30 330,30 340,30 350,30 360,30 370,30 380,30 390,30 400,30 410,10 420,50 430,0 440,40 450,30 460,30 470,30 480,30 490,30 500,30 510,30 520,30 530,30 540,30 550,30 560,10 570,50 580,0 590,40 600,30 610,30 620,30 630,30 640,30 650,30 660,30 670,30 680,30 690,30 700,30 710,10 720,50 730,0 740,40 750,30 760,30 770,30 780,30 790,30 800,30 810,30 820,30 830,30 840,30 850,30 860,10 870,50 880,0 890,40 900,30 910,30 920,30 930,30 940,30 950,30 960,30 970,30 980,30 990,30 1000,30 1010,10 1020,50 1030,0 1040,40 1050,30 1060,30 1070,30 1080,30 1090,30 1100,30 1110,30 1120,30 1130,30 1140,30 1150,30 1160,10 1170,50 1180,0 1190,40 1200,30"
                stroke="#ec4899"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: 1,
                  x: [0, -1200]
                }}
                transition={{
                  pathLength: { duration: 2, ease: "easeInOut" },
                  opacity: { duration: 0.5 },
                  x: { duration: 20, ease: "linear", repeat: Infinity }
                }}
              />
            </svg>
          </div>
        </div>
      )
    },
    {
      id: "digital",
      name: "دیجیتالی",
      type: "tech",
      description: "بنر با طراحی فناوری پیشرفته",
      isLocked: true,
      price: 1200,
      component: () => (
        <div className="w-full h-full bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden">
          {/* خطوط متحرک افقی */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, index) => (
              <motion.div 
                key={`h-line-${index}`}
                className="absolute h-px bg-tiffany/30"
                style={{ 
                  top: `${index * 5}%`, 
                  left: '0',
                  right: '0'
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  scaleX: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: index * 0.1,
                  repeatDelay: 1
                }}
              />
            ))}
          </div>
          
          {/* خطوط متحرک عمودی */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, index) => (
              <motion.div 
                key={`v-line-${index}`}
                className="absolute w-px bg-blue-500/20"
                style={{ 
                  left: `${index * 3.33}%`, 
                  top: '0',
                  bottom: '0'
                }}
                animate={{
                  opacity: [0, 0.3, 0],
                  scaleY: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: index * 0.05,
                  repeatDelay: 3
                }}
              />
            ))}
          </div>
          
          {/* نمودار داده متحرک */}
          <div className="absolute bottom-0 left-0 right-0 h-20">
            <svg 
              viewBox="0 0 1000 100" 
              className="w-full opacity-50"
            >
              <defs>
                <linearGradient id="digitalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,50 L50,45 L100,60 L150,40 L200,55 L250,35 L300,60 L350,30 L400,45 L450,25 L500,50 L550,35 L600,55 L650,30 L700,50 L750,25 L800,60 L850,40 L900,55 L950,35 L1000,50 L1000,100 L0,100 Z"
                fill="url(#digitalGradient)"
                stroke="#5eead4"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  x: [-1000, 0]
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  x: { duration: 20, ease: "linear", repeat: Infinity }
                }}
              />
            </svg>
          </div>
          
          {/* عناصر کد متحرک */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs text-tiffany/20 font-mono flex flex-wrap max-w-lg opacity-20">
              {Array.from({ length: 50 }, (_, i) => (
                <motion.div
                  key={i}
                  className="m-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 3,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 5
                  }}
                >
                  {Math.random() > 0.5 ? '01' : Math.random() > 0.5 ? '10' : Math.random() > 0.5 ? '{...}' : '</>'}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: "nature",
      name: "طبیعت",
      type: "relax",
      description: "بنر با طرح طبیعت آرامش‌بخش",
      isLocked: true,
      price: 800,
      component: () => (
        <div className="w-full h-full bg-gradient-to-r from-green-800 to-emerald-700 relative overflow-hidden">
          {/* ابرهای متحرک */}
          <motion.div
            className="absolute top-2 left-10 w-40 h-10 rounded-full bg-white/40 blur-xl"
            animate={{
              x: [0, 10, 0],
              opacity: [0.4, 0.5, 0.4]
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror"
            }}
          ></motion.div>
          
          <motion.div
            className="absolute top-10 right-20 w-60 h-8 rounded-full bg-white/30 blur-xl"
            animate={{
              x: [0, -15, 0],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{
              duration: 14,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1
            }}
          ></motion.div>
          
          {/* امواج متحرک */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full opacity-30">
              <motion.path 
                fill="#ffffff" 
                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,218.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              ></motion.path>
            </svg>
          </div>
          
          {/* عناصر درخت */}
          <div className="absolute bottom-10 right-10">
            <motion.div 
              className="w-4 h-20 bg-amber-800 rounded-sm"
              animate={{ skewX: [-2, 2, -2] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity
              }}
            >
              <motion.div 
                className="absolute -top-16 -left-12 w-28 h-28 rounded-full bg-green-500 opacity-70"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              ></motion.div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-15 left-20">
            <motion.div 
              className="w-3 h-14 bg-amber-800 rounded-sm"
              animate={{ skewX: [2, -2, 2] }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.5
              }}
            >
              <motion.div 
                className="absolute -top-10 -left-8 w-20 h-20 rounded-full bg-green-600 opacity-70"
                animate={{ 
                  scale: [1, 1.03, 1],
                  rotate: [0, -1, 0]
                }}
                transition={{
                  duration: 3.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.5
                }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: "galaxy",
      name: "کهکشان",
      type: "premium",
      description: "بنر ویژه با طرح کهکشانی",
      isLocked: true,
      price: 2000,
      component: () => (
        <div className="w-full h-full bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 relative overflow-hidden">
          {/* زمینه‌ی ستاره‌ای */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
          
          {/* مرکز کهکشان */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/5 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
              rotate: [0, 360]
            }}
            transition={{
              scale: {
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
              },
              opacity: {
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
              },
              rotate: {
                duration: 60,
                ease: "linear",
                repeat: Infinity
              }
            }}
          />
          
          {/* دیسک کهکشان */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full bg-gradient-radial from-purple-500/30 via-fuchsia-500/20 to-transparent"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(217,70,239,0.2) 50%, rgba(0,0,0,0) 100%)"
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: {
                duration: 30,
                ease: "linear",
                repeat: Infinity
              },
              scale: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity
              }
            }}
          />
          
          {/* بازوهای کهکشان */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96"
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity
            }}
          >
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent"
              animate={{
                scale: [0.8, 1, 0.8],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
            <motion.div 
              className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-violet-500/40 to-transparent"
              animate={{
                scale: [0.8, 1, 0.8],
                opacity: [0.6, 0.8, 0.6]
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1
              }}
            />
          </motion.div>
        </div>
      )
    }
  ];

  // حالت فعلی بنر انتخاب شده
  const [selectedBanner, setSelectedBanner] = useState("default");
  
  // رندر کردن مودال انتخاب بنر
  const [showBannerSelector, setShowBannerSelector] = useState(false);
  
  const renderBannerSelector = () => (
    <Dialog open={showBannerSelector} onOpenChange={setShowBannerSelector}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>انتخاب بنر پروفایل</DialogTitle>
          <DialogDescription>
            بنر دلخواه خود را انتخاب کنید. برخی بنرها نیاز به خرید با اعتبار دارند.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {profileBanners.map((banner) => (
            <div 
              key={banner.id} 
              className={`border rounded-lg overflow-hidden ${selectedBanner === banner.id ? 'ring-2 ring-tiffany' : ''}`}
            >
              <div className="h-32 relative">
                {React.createElement(banner.component)}
                
                {banner.isLocked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                      <Lock className="h-6 w-6 text-white/70" />
                      <p className="text-xs text-white/70 mt-1">{toPersianNumber(banner.price)} اعتبار</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-3 bg-white dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{banner.name}</h3>
                  <Badge variant="outline" className="text-xs">
                    {banner.type}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {banner.description}
                </p>
                <div className="mt-3">
                  {banner.isLocked ? (
                    <Button 
                      className="w-full text-xs h-8"
                      onClick={() => {
                        if (userData.credits >= banner.price) {
                          toast({
                            title: "بنر با موفقیت خریداری شد",
                            description: `${toPersianNumber(banner.price)} اعتبار از حساب شما کسر شد`,
                          });
                          // در یک برنامه واقعی، اینجا با API ارتباط برقرار می‌شود
                          setSelectedBanner(banner.id);
                          setShowBannerSelector(false);
                        } else {
                          toast({
                            title: "اعتبار ناکافی",
                            description: "اعتبار کافی برای خرید این بنر ندارید",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      خرید با {toPersianNumber(banner.price)} اعتبار
                    </Button>
                  ) : (
                    <Button 
                      variant={selectedBanner === banner.id ? "default" : "outline"}
                      className="w-full text-xs h-8"
                      onClick={() => {
                        setSelectedBanner(banner.id);
                        setShowBannerSelector(false);
                      }}
                    >
                      {selectedBanner === banner.id ? 'انتخاب شده' : 'انتخاب بنر'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  // رندر شدن فعالیت‌های اخیر
  const renderRecentActivities = () => {
    return (
      <Card className="border border-slate-200 dark:border-slate-800 mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">فعالیت‌های اخیر</CardTitle>
          <CardDescription>آخرین فعالیت‌های شما در سیستم</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userData.recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 py-2">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {activity.icon}
                </div>
                <div className="flex-grow">
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(activity.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="ghost" className="ml-auto text-xs">
            مشاهده همه فعالیت‌ها
            <ChevronRight className="h-4 w-4 mr-1" />
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  // رندر شدن دستاوردها
  const renderAchievements = () => {
    return (
      <div className="space-y-6">
        {/* دستاوردهای کسب شده */}
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">دستاوردهای کسب شده</CardTitle>
            <CardDescription>
              شما تاکنون {toPersianNumber(userData.achievements.filter(a => a.isEarned).length)} دستاورد کسب کرده‌اید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.achievements
                .filter(achievement => achievement.isEarned)
                .map((achievement) => (
                  <div key={achievement.id} className="flex gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                      {achievement.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{achievement.name}</h4>
                        <Badge className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          +{toPersianNumber(achievement.xpReward)} XP
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        کسب شده در {formatDate(achievement.earnedDate)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        {/* دستاوردهای در حال پیشرفت */}
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">دستاوردهای در حال پیشرفت</CardTitle>
            <CardDescription>
              تلاش‌های شما برای کسب دستاوردهای جدید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.achievements
                .filter(achievement => !achievement.isEarned)
                .map((achievement) => (
                  <div key={achievement.id} className="flex gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      {achievement.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{achievement.name}</h4>
                        <Badge variant="outline">
                          +{toPersianNumber(achievement.xpReward)} XP
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {achievement.description}
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>پیشرفت: {toPersianNumber(achievement.progress)} / {toPersianNumber(achievement.maxProgress)}</span>
                          <span>{toPersianNumber(Math.floor((achievement.progress / achievement.maxProgress) * 100))}%</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // رندر شدن نشان‌ها
  const renderBadges = () => {
    return (
      <div className="space-y-6">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">نشان‌های شما</CardTitle>
              <Badge className="rounded-full">
                {toPersianNumber(userData.badges.length)} / {toPersianNumber(30)}
              </Badge>
            </div>
            <CardDescription>
              نشان‌های کسب شده که نمایانگر موفقیت‌های شما در برنامه هستند
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userData.badges.map((badge) => (
                <div 
                  key={badge.id} 
                  className={`border rounded-xl overflow-hidden ${
                    badge.isEquipped 
                      ? "ring-2 ring-tiffany ring-offset-2 dark:ring-offset-slate-900" 
                      : ""
                  }`}
                >
                  <div className={`aspect-square ${rarityClasses[badge.rarity]} flex items-center justify-center p-4`}>
                    <div className="w-16 h-16">
                      {badge.icon}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm">{badge.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {rarityTranslation[badge.rarity]}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      کسب شده در {formatDate(badge.earnedDate)}
                    </p>
                    <Button 
                      variant={badge.isEquipped ? "default" : "outline"}
                      size="sm"
                      className="w-full mt-2 text-xs h-8"
                      onClick={() => {
                        toast({
                          title: badge.isEquipped ? "نشان برداشته شد" : "نشان نمایش داده شد",
                          description: badge.isEquipped ? "نشان از پروفایل شما برداشته شد" : "نشان به پروفایل شما اضافه شد",
                        });
                        // در یک برنامه واقعی، اینجا با API ارتباط برقرار می‌شود
                        // userData.badges.find(b => b.id === badge.id)!.isEquipped = !badge.isEquipped;
                      }}
                    >
                      {badge.isEquipped ? "برداشتن نشان" : "نمایش نشان"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  // رندر شدن تنظیمات
  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-lg">تنظیمات پروفایل</CardTitle>
            <CardDescription>
              ترجیحات و تنظیمات شخصی خود را مدیریت کنید
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* تنظیمات اعلان‌ها */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">اعلان‌ها</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">اعلان‌های برنامه</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">دریافت اعلان‌های درون برنامه‌ای</p>
                  </div>
                  <Switch checked={userData.preferences.notifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">اعلان‌های ایمیلی</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">دریافت اعلان‌ها از طریق ایمیل</p>
                  </div>
                  <Switch checked={userData.preferences.emailNotifications} />
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* تنظیمات حریم خصوصی */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">حریم خصوصی</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium">سطح حریم خصوصی پروفایل</h4>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="radio" 
                        id="privacy-public" 
                        name="privacy-level" 
                        checked={userData.preferences.privacyLevel === "public"} 
                        className="h-4 w-4 text-tiffany"
                      />
                      <label htmlFor="privacy-public" className="text-sm">عمومی - همه می‌توانند پروفایل شما را ببینند</label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="radio" 
                        id="privacy-team" 
                        name="privacy-level" 
                        checked={userData.preferences.privacyLevel === "team"} 
                        className="h-4 w-4 text-tiffany"
                      />
                      <label htmlFor="privacy-team" className="text-sm">تیم - فقط اعضای تیم شما می‌توانند پروفایل شما را ببینند</label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <input 
                        type="radio" 
                        id="privacy-private" 
                        name="privacy-level" 
                        checked={userData.preferences.privacyLevel === "private"} 
                        className="h-4 w-4 text-tiffany"
                      />
                      <label htmlFor="privacy-private" className="text-sm">خصوصی - فقط شما می‌توانید پروفایل خود را ببینید</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* تنظیمات حساب */}
            <div className="space-y-4">
              <h3 className="text-md font-medium">حساب کاربری</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 ml-2" />
                  دانلود داده‌های حساب
                </Button>
                <Button variant="outline" className="w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                  <Shield className="h-4 w-4 ml-2" />
                  تغییر رمز عبور
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <LogOut className="h-4 w-4 ml-2" />
                  خروج از همه دستگاه‌ها
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-4">
            <Button variant="outline">انصراف</Button>
            <Button variant="default">ذخیره تغییرات</Button>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  // رندر شدن دوستان و همکاران
  const renderFriends = () => {
    return (
      <Card className="border border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">دوستان و همکاران</CardTitle>
          <CardDescription>
            همکاران شما در سیستم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userData.friends.map((friend) => (
              <div key={friend.id} className="flex items-center gap-3 p-3 border rounded-xl bg-white dark:bg-slate-900">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800">
                    <AvatarImage src={friend.avatar} alt={friend.name} />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 left-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 ${friend.isOnline ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                </div>
                <div>
                  <div className="font-medium text-sm">{friend.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <Award className="h-3 w-3 text-amber-500" />
                    لول {toPersianNumber(friend.level)}
                  </div>
                </div>
                <div className="ml-auto">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="outline" className="w-full">
            <UserPlus className="h-4 w-4 ml-2" />
            یافتن همکاران بیشتر
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  // رندر شدن کیف پول و کردیت‌ها
  const renderWallet = () => {
    return (
      <div className="space-y-6">
        <Card className="border border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Wallet className="h-5 w-5 ml-2 text-amber-500" />
                کیف پول شما
              </CardTitle>
              <Button variant="outline" className="rounded-full">
                <Tag className="h-4 w-4 ml-2" />
                خرید کردیت
              </Button>
            </div>
            <CardDescription>
              کردیت‌های خود را مدیریت کنید و جوایز بگیرید
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-xl text-white">
              <div>
                <div className="text-sm font-medium">موجودی شما</div>
                <div className="text-2xl font-bold mt-1">{toPersianNumber(userData.credits)}</div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                <span className="text-lg">کردیت</span>
              </div>
            </div>
            
            <h3 className="text-md font-medium mt-4">تاریخچه تراکنش‌ها</h3>
            <div className="space-y-2">
              {userData.credits_history.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'earned' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {transaction.type === 'earned' ? <Gift className="h-5 w-5" /> : <Tag className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{transaction.description}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold ${
                    transaction.type === 'earned' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'earned' ? '+' : '-'}{toPersianNumber(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" className="ml-auto text-xs">
              مشاهده همه تراکنش‌ها
              <ChevronRight className="h-4 w-4 mr-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  // نمای اصلی کامپوننت پروفایل
  {renderBannerSelector()}

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* بنر و هدر پروفایل */}
        <div className="relative rounded-2xl mb-8 overflow-hidden shadow-lg">
          {/* تصویر کاور */}
          <div className="h-64 bg-slate-200 dark:bg-slate-800 relative">
            {/* رندر بنر انتخاب شده */}
            {React.createElement(profileBanners.find(banner => banner.id === selectedBanner)?.component || profileBanners[0].component)}
            
            {/* دکمه ویرایش بنر */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4 bg-black/20 text-white hover:bg-black/30 backdrop-blur-sm"
              onClick={() => setShowBannerSelector(true)}
            >
              <Camera className="h-4 w-4 ml-2" />
              تغییر بنر پروفایل
            </Button>
          </div>
          
          {/* اطلاعات پروفایل */}
          <div className="bg-white dark:bg-slate-900 p-6 pt-20 relative">
            {/* آواتار با افکت‌های پیشرفته */}
            <div className="absolute -top-16 right-8">
              <div className="relative">
                {/* پس‌زمینه حرفه‌ای با افکت‌های پیشرفته */}
                <div className="w-32 h-32 relative">
                  {/* افکت‌های پس‌زمینه آواتار */}
                  <div className="absolute inset-0 rounded-full overflow-hidden z-0">
                    {/* لایه گرادیان اصلی و پس‌زمینه */}
                    <div className="absolute inset-0 bg-gradient-to-br from-tiffany/20 to-aqua/10 z-0"></div>
                    
                    {/* الگوی هندسی متحرک */}
                    <motion.div 
                      className="absolute inset-0 bg-grid-slate-300/[0.02] dark:bg-grid-slate-100/[0.02] bg-[size:20px_20px] z-0"
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                      }}
                      transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    ></motion.div>
                    
                    {/* هاله‌های رنگی متحرک */}
                    <motion.div
                      className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-tiffany/20 blur-xl"
                      animate={{ 
                        top: ['-5rem', '-3rem', '-5rem'],
                        left: ['-5rem', '-3rem', '-5rem'],
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{ 
                        duration: 8, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatType: "mirror"
                      }}
                    ></motion.div>
                    
                    <motion.div
                      className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-aqua/20 blur-xl"
                      animate={{ 
                        bottom: ['-5rem', '-3rem', '-5rem'],
                        right: ['-5rem', '-3rem', '-5rem'],
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                      }}
                      transition={{ 
                        duration: 8, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: 0.5
                      }}
                    ></motion.div>
                    
                    {/* خطوط نور ظریف متحرک */}
                    <motion.div
                      className="absolute top-1/2 h-px w-full bg-gradient-to-r from-transparent via-tiffany/30 to-transparent"
                      animate={{ 
                        opacity: [0, 0.8, 0],
                        width: ['0%', '100%', '0%'],
                        left: ['0%', '0%', '100%']
                      }}
                      transition={{ 
                        duration: 3, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 1
                      }}
                    ></motion.div>
                    
                    <motion.div
                      className="absolute left-1/2 w-px h-full bg-gradient-to-b from-transparent via-tiffany/30 to-transparent"
                      animate={{ 
                        opacity: [0, 0.8, 0],
                        height: ['0%', '100%', '0%'],
                        top: ['0%', '0%', '100%']
                      }}
                      transition={{ 
                        duration: 3, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 1.2,
                        delay: 0.5
                      }}
                    ></motion.div>
                    
                    {/* افکت درخشندگی حلقوی */}
                    <motion.div 
                      className="absolute inset-1 rounded-full border-2 border-white/20 dark:border-white/10"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ 
                        duration: 3, 
                        ease: "easeInOut", 
                        repeat: Infinity, 
                        repeatType: "reverse" 
                      }}
                    ></motion.div>
                    
                    {/* افکت شیشه‌ای */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent dark:from-white/5 z-0"></div>
                    
                    {/* هاله داخلی */}
                    <div className="absolute inset-2 rounded-full shadow-[inset_0_0_15px_rgba(45,212,191,0.3)] dark:shadow-[inset_0_0_15px_rgba(45,212,191,0.2)]"></div>
                  </div>
                  
                  {/* آواتار اصلی */}
                  <div className="absolute inset-1 rounded-full overflow-hidden border-4 border-white dark:border-slate-900 z-10 bg-white dark:bg-slate-800 shadow-lg">
                    <Link href="/avatar-studio">
                      {activeAvatarUrl ? (
                        <img 
                          src={activeAvatarUrl} 
                          alt={avatarName || userData.displayName}
                          className="h-full w-full object-cover relative z-10"
                        />
                      ) : userData.avatar ? (
                        <img 
                          src={userData.avatar} 
                          alt={userData.displayName}
                          className="h-full w-full object-cover relative z-10"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-slate-500 dark:text-slate-400 text-3xl font-bold z-10">
                          {userData.displayName.charAt(0)}
                        </div>
                      )}
                      
                      {/* نقطه‌های درخشان روی آواتار */}
                      <motion.div
                        className="absolute top-[15%] left-[15%] w-2 h-2 rounded-full bg-tiffany/60 z-20"
                        animate={{ 
                          opacity: [0, 0.8, 0],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ 
                          duration: 2, 
                          ease: "easeInOut", 
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      ></motion.div>
                      
                      <motion.div
                        className="absolute bottom-[20%] right-[20%] w-1 h-1 rounded-full bg-aqua/70 z-20"
                        animate={{ 
                          opacity: [0, 0.8, 0],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ 
                          duration: 2, 
                          ease: "easeInOut", 
                          repeat: Infinity,
                          repeatType: "loop",
                          delay: 0.5
                        }}
                      ></motion.div>
                      
                      {/* افکت شیشه‌ای روی آواتار */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent dark:from-white/2 z-30"
                        animate={{ 
                          opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          repeatType: "reverse" 
                        }}
                      ></motion.div>
                    </Link>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -left-2 -bottom-2 h-8 w-8 p-0 rounded-full bg-tiffany text-white hover:bg-tiffany/90 shadow-lg shadow-tiffany/20 dark:shadow-tiffany/10 z-40"
                  onClick={() => setShowAvatarEditor(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                {/* نشان لول با افکت‌های جدید */}
                <div className="absolute -left-2 -top-2 h-10 w-10 overflow-hidden rounded-full z-40">
                  {/* پس‌زمینه گرادیانی متحرک */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-400 z-0"
                    animate={{ 
                      background: ['linear-gradient(to right, #f59e0b, #fbbf24)', 'linear-gradient(to right, #fbbf24, #f59e0b)'],
                    }}
                    transition={{ 
                      duration: 2, 
                      ease: "easeInOut", 
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  ></motion.div>
                  
                  {/* خطوط درخشان */}
                  <motion.div 
                    className="absolute top-1/2 h-px w-full bg-white/50 z-10"
                    animate={{ 
                      opacity: [0, 0.5, 0],
                      x: ['-100%', '100%'],
                    }}
                    transition={{ 
                      duration: 2, 
                      ease: "easeInOut", 
                      repeat: Infinity,
                      repeatDelay: 0.5
                    }}
                  ></motion.div>
                  
                  {/* پترن هندسی ظریف */}
                  <div className="absolute inset-0 bg-grid-white/10 bg-[size:5px_5px] opacity-20 z-10"></div>
                  
                  {/* مقدار لول */}
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-white border-2 border-white dark:border-slate-900 rounded-full shadow-md z-20">
                    {toPersianNumber(userData.level)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* اطلاعات اصلی */}
            <div className="flex justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center">
                  <h1 className="text-2xl font-bold">{userData.displayName}</h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 ml-2"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center text-slate-500 dark:text-slate-400 gap-4 mt-1">
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 ml-1" />
                    <span className="text-sm">{userData.position}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 ml-1" />
                    <span className="text-sm">{userData.department}</span>
                  </div>
                </div>
                
                <p className="mt-3 text-slate-600 dark:text-slate-300">{userData.bio}</p>
                
                {/* نشان‌های اکوییپ شده */}
                {renderEquippedBadges()}
                
                {/* نوار پیشرفت لول */}
                {renderLevelProgress()}
              </div>
              
              {/* دکمه‌های اکشن */}
              <div className="flex flex-col gap-2">
                <Link href="/avatar-customizer">
                  <Button className="rounded-full">
                    <Edit className="h-4 w-4 ml-2" />
                    سفارشی‌سازی آواتار
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>اشتراک‌گذاری پروفایل</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ارسال پیام</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>تنظیم یادآوری</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* کارت‌های آمار */}
        {renderStatCards()}
        
        {/* تب‌های بخش‌های مختلف پروفایل */}
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full border-b border-slate-200 dark:border-slate-800 bg-transparent h-auto p-0 space-x-8 space-x-reverse justify-start">
              <TabsTrigger 
                value="overview" 
                className="px-0 py-3 h-auto data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-tiffany data-[state=active]:border-b-2 data-[state=active]:border-tiffany rounded-none"
              >
                <User className="h-4 w-4 ml-2" />
                نمای کلی
              </TabsTrigger>
              <TabsTrigger 
                value="achievements" 
                className="px-0 py-3 h-auto data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-tiffany data-[state=active]:border-b-2 data-[state=active]:border-tiffany rounded-none"
              >
                <Trophy className="h-4 w-4 ml-2" />
                دستاوردها
              </TabsTrigger>
              <TabsTrigger 
                value="badges" 
                className="px-0 py-3 h-auto data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-tiffany data-[state=active]:border-b-2 data-[state=active]:border-tiffany rounded-none"
              >
                <Award className="h-4 w-4 ml-2" />
                نشان‌ها
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="px-0 py-3 h-auto data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-tiffany data-[state=active]:border-b-2 data-[state=active]:border-tiffany rounded-none"
              >
                <Settings className="h-4 w-4 ml-2" />
                تنظیمات
              </TabsTrigger>
              <TabsTrigger 
                value="friends" 
                className="px-0 py-3 h-auto data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-tiffany data-[state=active]:border-b-2 data-[state=active]:border-tiffany rounded-none"
              >
                <Users className="h-4 w-4 ml-2" />
                همکاران
              </TabsTrigger>
              <TabsTrigger 
                value="wallet" 
                className="px-0 py-3 h-auto data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-tiffany data-[state=active]:border-b-2 data-[state=active]:border-tiffany rounded-none"
              >
                <Wallet className="h-4 w-4 ml-2" />
                کیف پول
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    {renderRecentActivities()}
                  </div>
                  <div className="lg:col-span-1">
                    {renderFriends()}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="achievements">
                {renderAchievements()}
              </TabsContent>
              
              <TabsContent value="badges">
                {renderBadges()}
              </TabsContent>
              
              <TabsContent value="settings">
                {renderSettings()}
              </TabsContent>
              
              <TabsContent value="friends">
                {renderFriends()}
              </TabsContent>
              
              <TabsContent value="wallet">
                {renderWallet()}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      
      {/* مودال ویرایش پروفایل */}
      {isEditing && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>ویرایش اطلاعات پروفایل</DialogTitle>
              <DialogDescription>
                اطلاعات پروفایل خود را ویرایش کنید
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right">نام نمایشی</label>
                <input
                  type="text"
                  value={userData.displayName}
                  className="col-span-3 p-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right">بیوگرافی</label>
                <textarea
                  value={userData.bio}
                  className="col-span-3 p-2 border rounded-md min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right">سمت</label>
                <input
                  type="text"
                  value={userData.position}
                  className="col-span-3 p-2 border rounded-md"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right">دپارتمان</label>
                <input
                  type="text"
                  value={userData.department}
                  className="col-span-3 p-2 border rounded-md"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                انصراف
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "تغییرات ذخیره شد",
                    description: "اطلاعات پروفایل شما با موفقیت به‌روزرسانی شد",
                  });
                  setIsEditing(false);
                }}
              >
                ذخیره تغییرات
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* مودال سفارشی‌سازی آواتار */}
      <Dialog open={showAvatarEditor} onOpenChange={setShowAvatarEditor}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>سفارشی‌سازی آواتار</DialogTitle>
            <DialogDescription>
              برای سفارشی‌سازی کامل آواتار به بخش ساخت آواتار بروید
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-4">
            <Avatar className="w-32 h-32 border-4 border-slate-200 dark:border-slate-700">
              <AvatarImage src={activeAvatarUrl || userData.avatar} alt={avatarName || userData.displayName} />
              <AvatarFallback className="text-3xl">
                {userData.displayName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">
                <Paperclip className="h-4 w-4 ml-2" />
                آپلود تصویر
              </Button>
              <Button size="sm">
                <Camera className="h-4 w-4 ml-2" />
                عکس جدید
              </Button>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowAvatarEditor(false)}>
              انصراف
            </Button>
            <Link href="/avatar-customizer" className="w-full sm:w-auto">
              <Button className="w-full">
                <Edit className="h-4 w-4 ml-2" />
                ساخت آواتار سفارشی
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;