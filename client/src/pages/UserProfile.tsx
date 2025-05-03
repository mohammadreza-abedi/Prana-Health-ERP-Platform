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
      icon: <Sparkles className="h-5 w-5 text-tiffany" />,
      description: "بنر پیش‌فرض با گرادیان زیبا",
      isLocked: false,
      price: 0,
      component: () => (
        <div className="w-full h-full bg-gradient-to-r from-tiffany via-cyan-500 to-sky-500 relative overflow-hidden">
          {/* الگوی هندسی متحرک */}
          <motion.div 
            className="absolute inset-0 bg-grid-white/[0.08] bg-[size:20px_20px]"
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
            className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-white/20 blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.15, 0.3],
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror"
            }}
          ></motion.div>

          <motion.div
            className="absolute -bottom-10 -left-20 w-80 h-80 rounded-full bg-white/15 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
              delay: 1
            }}
          ></motion.div>

          {/* ذرات شناور */}
          <div className="absolute inset-0">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={`default-particle-${i}`}
                className="absolute rounded-full bg-white/60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 2}px`,
                  height: `${Math.random() * 3 + 2}px`,
                  filter: "blur(1px)"
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>

          {/* آیکون‌های دکوراتیو */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className="relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 30,
                ease: "linear",
                repeat: Infinity
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={`default-icon-${i}`}
                  className="absolute opacity-10 text-white"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-40px)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                >
                  <Sparkles className="h-8 w-8" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* خطوط نور مورب */}
          <motion.div
            className="absolute top-0 right-0 bottom-0 left-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-[200%] w-[5px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
                style={{
                  left: `${30 + i * 20}%`,
                  top: '-100%',
                  transform: 'rotate(35deg)'
                }}
                animate={{
                  top: ['-100%', '100%'],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 7,
                  ease: "linear",
                  repeat: Infinity,
                  delay: i * 2
                }}
              />
            ))}
          </motion.div>
        </div>
      )
    },
    {
      id: "heartbeat",
      name: "نوار قلب",
      type: "animated",
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      description: "نمایش ضربان قلب به صورت انیمیشن",
      isLocked: false,
      price: 500,
      component: () => (
        <div className="w-full h-full bg-gradient-to-br from-rose-800 via-purple-800 to-violet-900 relative overflow-hidden">
          {/* پس‌زمینه شبکه‌ای */}
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px]"></div>
          
          {/* پالس‌های قلب در پس‌زمینه */}
          <div className="absolute inset-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`pulse-${i}`}
                className="absolute top-1/2 left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-pink-500/10"
                initial={{ width: 0, height: 0 }}
                animate={{
                  width: [0, 300],
                  height: [0, 300],
                  opacity: [0.3, 0]
                }}
                transition={{
                  duration: 3,
                  ease: "easeOut",
                  repeat: Infinity,
                  delay: i * 1.5
                }}
              />
            ))}
          </div>
          
          {/* خط نوار قلب اصلی */}
          <div className="absolute inset-0 flex items-center">
            <motion.div 
              className="h-px w-full bg-gradient-to-r from-transparent via-rose-500 to-transparent"
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
          
          {/* قلب متحرک و پالس قلب */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
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
            {/* هاله پشت قلب */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-rose-500/20 blur-xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <svg width="140" height="140" viewBox="0 0 24 24" className="fill-rose-500/70">
              <motion.path 
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                animate={{
                  fill: ["#f43f5e", "#ec4899", "#f43f5e"]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
            </svg>
          </motion.div>
          
          {/* نوار قلب انیمیشن */}
          <div className="absolute top-2/3 left-0 right-0">
            <svg 
              viewBox="0 0 1200 60" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-full h-20 overflow-visible opacity-50"
            >
              <motion.path
                d="M0,30 Q50,30 60,30 T70,30 80,30 90,30 100,30 110,10 120,50 130,0 140,40 150,30 160,30 170,30 180,30 190,30 200,30 210,30 220,30 230,30 240,30 250,30 260,10 270,50 280,0 290,40 300,30 310,30 320,30 330,30 340,30 350,30 360,30 370,30 380,30 390,30 400,30 410,10 420,50 430,0 440,40 450,30 460,30 470,30 480,30 490,30 500,30 510,30 520,30 530,30 540,30 550,30 560,10 570,50 580,0 590,40 600,30 610,30 620,30 630,30 640,30 650,30 660,30 670,30 680,30 690,30 700,30 710,10 720,50 730,0 740,40 750,30 760,30 770,30 780,30 790,30 800,30 810,30 820,30 830,30 840,30 850,30 860,10 870,50 880,0 890,40 900,30 910,30 920,30 930,30 940,30 950,30 960,30 970,30 980,30 990,30 1000,30 1010,10 1020,50 1030,0 1040,40 1050,30 1060,30 1070,30 1080,30 1090,30 1100,30 1110,30 1120,30 1130,30 1140,30 1150,30 1160,10 1170,50 1180,0 1190,40 1200,30"
                stroke="#ec4899"
                strokeWidth="2"
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
                  x: { duration: 15, ease: "linear", repeat: Infinity }
                }}
              />
            </svg>
          </div>
          
          {/* ایکون‌های پزشکی متحرک */}
          <div className="absolute inset-0">
            {[
              { icon: <Activity className="h-6 w-6" />, left: '20%', top: '20%' },
              { icon: <Clock className="h-5 w-5" />, left: '80%', top: '25%' },
              { icon: <Heart className="h-4 w-4" />, left: '75%', top: '70%' },
              { icon: <Activity className="h-5 w-5" />, left: '15%', top: '75%' }
            ].map((item, i) => (
              <motion.div
                key={`health-icon-${i}`}
                className="absolute text-rose-300/30"
                style={{ left: item.left, top: item.top }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{
                  duration: 5 + i,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                {item.icon}
              </motion.div>
            ))}
          </div>
          
          {/* افکت درخشندگی */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-transparent"
            animate={{
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </div>
      )
    },
    {
      id: "digital",
      name: "دیجیتالی",
      type: "tech",
      icon: <FileText className="h-5 w-5 text-tiffany" />,
      description: "بنر با طراحی فناوری پیشرفته",
      isLocked: true,
      price: 1200,
      component: () => (
        <div className="w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900 relative overflow-hidden">
          {/* پس‌زمینه شبکه‌ای */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:15px_15px]"></div>
          
          {/* افکت کد در پس‌زمینه */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <motion.div 
              className="relative h-full w-full flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 150,
                ease: "linear",
                repeat: Infinity
              }}
            >
              <div className="absolute h-[150%] w-[150%] border-[40px] border-tiffany/5 rounded-full" />
              <div className="absolute h-[200%] w-[200%] border-[20px] border-blue-500/5 rounded-full" />
              <div className="absolute h-[250%] w-[250%] border-[10px] border-cyan-500/5 rounded-full" />
            </motion.div>
          </div>
          
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
                  opacity: [0, 0.7, 0],
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
                className="absolute w-px bg-blue-500/30"
                style={{ 
                  left: `${index * 3.33}%`, 
                  top: '0',
                  bottom: '0'
                }}
                animate={{
                  opacity: [0, 0.5, 0],
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
          
          {/* نقاط داده متحرک */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`data-dot-${i}`}
                className="absolute rounded-full bg-tiffany"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 3 + 1,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
          
          {/* نمودار داده متحرک */}
          <div className="absolute bottom-0 left-0 right-0 h-48 z-10">
            <svg 
              viewBox="0 0 1000 200" 
              className="w-full h-full"
            >
              <defs>
                <linearGradient id="digitalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5eead4" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="digitalGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* نمودار اول */}
              <motion.path
                d="M0,150 L50,145 L100,160 L150,140 L200,155 L250,135 L300,165 L350,130 L400,145 L450,125 L500,150 L550,135 L600,155 L650,130 L700,150 L750,125 L800,160 L850,140 L900,155 L950,135 L1000,150 L1000,200 L0,200 Z"
                fill="url(#digitalGradient)"
                stroke="#5eead4"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 0.7,
                  x: [-1000, 0]
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  x: { duration: 25, ease: "linear", repeat: Infinity }
                }}
              />
              
              {/* نمودار دوم */}
              <motion.path
                d="M0,170 L50,175 L100,155 L150,165 L200,140 L250,170 L300,150 L350,175 L400,160 L450,170 L500,155 L550,175 L600,145 L650,165 L700,140 L750,170 L800,150 L850,165 L900,140 L950,160 L1000,170 L1000,200 L0,200 Z"
                fill="url(#digitalGradient2)"
                stroke="#3b82f6"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 0.6,
                  x: [-1000, 0]
                }}
                transition={{
                  opacity: { duration: 0.5 },
                  x: { duration: 20, ease: "linear", repeat: Infinity, delay: 2 }
                }}
              />
            </svg>
          </div>
          
          {/* HUD عناصر متحرک */}
          <div className="absolute top-4 left-4 right-4 flex justify-between text-cyan-400/70 text-xs font-mono">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-cyan-400/70 mr-2"></div>
                SYS.ACTIVE [0x2F4A]
              </div>
            </motion.div>
            
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <div className="flex items-center">
                MEMEX.ONLINE
                <div className="h-2 w-2 rounded-full bg-cyan-400/70 ml-2"></div>
              </div>
            </motion.div>
          </div>
          
          {/* عناصر کد متحرک */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs text-tiffany/30 font-mono flex flex-wrap max-w-lg opacity-70">
              {Array.from({ length: 30 }, (_, i) => (
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
          
          {/* عناصر HUD دیگر */}
          <div className="absolute bottom-4 right-4 text-cyan-400/70 font-mono text-xs">
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              STATUS: ACTIVE [v.4.0.2]
            </motion.div>
          </div>
          
          {/* دایره مرکزی متحرک */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-tiffany/50 flex items-center justify-center"
              animate={{ 
                rotate: [0, 360],
                borderColor: ['rgba(45,212,191,0.5)', 'rgba(59,130,246,0.5)', 'rgba(45,212,191,0.5)']
              }}
              transition={{ 
                rotate: { duration: 10, ease: "linear", repeat: Infinity },
                borderColor: { duration: 5, ease: "easeInOut", repeat: Infinity }
              }}
            >
              <motion.div
                className="w-10 h-10 rounded-full border border-blue-500/50 flex items-center justify-center"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, ease: "linear", repeat: Infinity }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full bg-gradient-to-br from-tiffany/70 to-blue-500/70"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    background: ['linear-gradient(to bottom right, rgba(45,212,191,0.7), rgba(59,130,246,0.7))', 
                                'linear-gradient(to bottom right, rgba(59,130,246,0.7), rgba(45,212,191,0.7))']
                  }}
                  transition={{ 
                    scale: { duration: 2, ease: "easeInOut", repeat: Infinity },
                    background: { duration: 3, repeat: Infinity }
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: "nature",
      name: "طبیعت",
      type: "relax",
      icon: <Activity className="h-5 w-5 text-green-500" />,
      description: "بنر با طرح طبیعت آرامش‌بخش",
      isLocked: true,
      price: 800,
      component: () => (
        <div className="w-full h-full bg-gradient-to-r from-emerald-800 via-green-700 to-teal-700 relative overflow-hidden">
          {/* پس‌زمینه طبیعت */}
          <div className="absolute inset-0 bg-nature-pattern opacity-5"></div>
          
          {/* آسمان و ابرهای متحرک */}
          <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-b from-sky-700/20 to-transparent">
            <motion.div
              className="absolute top-2 left-10 w-40 h-10 rounded-full bg-white/40 blur-xl"
              animate={{
                x: [0, 20, 0],
                opacity: [0.4, 0.6, 0.4]
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
                x: [0, -25, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 14,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                delay: 1
              }}
            ></motion.div>
            
            <motion.div
              className="absolute top-20 left-1/3 w-32 h-6 rounded-full bg-white/20 blur-xl"
              animate={{
                x: [0, 15, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 12,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
                delay: 2
              }}
            ></motion.div>
          </div>
          
          {/* پرندگان در آسمان */}
          <div className="absolute top-10 left-0 right-0 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.svg
                key={`bird-${i}`}
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="white"
                className="absolute opacity-30"
                style={{
                  top: `${10 + Math.random() * 15}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 100],
                  y: [0, Math.random() * 10 - 5],
                }}
                transition={{
                  duration: 20 + i * 5,
                  ease: "linear",
                  repeat: Infinity,
                  delay: i * 2
                }}
              >
                <path d="M0,1 Q3,0 6,4 Q9,0 12,1 L10,2 Q8,2 6,5 Q4,2 2,2 L0,1" />
              </motion.svg>
            ))}
          </div>
          
          {/* امواج آب */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full opacity-40">
              <motion.path 
                fill="#0099ff" 
                fillOpacity="0.2"
                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,218.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              ></motion.path>
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full absolute bottom-0 opacity-30">
              <motion.path 
                fill="#0099ff" 
                fillOpacity="0.3"
                d="M0,128L34.3,149.3C68.6,171,137,213,206,229.3C274.3,245,343,235,411,202.7C480,171,549,117,617,106.7C685.7,96,754,128,823,170.7C891.4,213,960,267,1029,266.7C1097.1,267,1166,213,1234,176C1302.9,139,1371,117,1406,106.7L1440,96L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 1
                }}
              ></motion.path>
            </svg>
          </div>
          
          {/* عناصر طبیعی */}
          <div className="absolute bottom-10 right-10 z-10">
            <motion.div 
              className="w-4 h-24 bg-amber-900 rounded-sm"
              animate={{ skewX: [-2, 2, -2] }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity
              }}
            >
              <motion.div 
                className="absolute -top-16 -left-12 w-28 h-28 rounded-full bg-green-600 opacity-80"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0]
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              ></motion.div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-20 left-20 z-10">
            <motion.div 
              className="w-3 h-18 bg-amber-800 rounded-sm"
              animate={{ skewX: [2, -2, 2] }}
              transition={{
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.5
              }}
            >
              <motion.div 
                className="absolute -top-14 -left-10 w-24 h-24 rounded-full bg-green-500 opacity-80"
                animate={{ 
                  scale: [1, 1.03, 1],
                  rotate: [0, -1, 0]
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.5
                }}
              ></motion.div>
            </motion.div>
          </div>
          
          {/* گلها و گیاهان */}
          <div className="absolute bottom-5 inset-x-0 flex justify-around">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`flower-${i}`}
                className="relative"
                style={{
                  height: `${20 + Math.random() * 15}px`,
                  width: '2px',
                  background: 'linear-gradient(to top, #065f46, #059669)',
                  transformOrigin: 'bottom',
                  marginBottom: '5px'
                }}
                animate={{
                  rotate: [Math.random() > 0.5 ? -2 : 2, Math.random() > 0.5 ? 2 : -2, Math.random() > 0.5 ? -2 : 2]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              >
                <motion.div
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 rounded-full"
                  style={{
                    background: Math.random() > 0.5 ? '#fb7185' : '#c4b5fd',
                    width: '6px',
                    height: '6px',
                  }}
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* ذرات نور خورشید */}
          <div className="absolute top-0 left-0 right-0 bottom-1/3 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`sunlight-${i}`}
                className="absolute rounded-full bg-amber-200"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${20 + Math.random() * 80}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.1,
                  transformOrigin: 'top',
                  transform: `rotate(${90 - Math.random() * 10}deg)`
                }}
                animate={{
                  opacity: [0, 0.2, 0],
                  height: [`${20 + Math.random() * 80}px`, `${20 + Math.random() * 100}px`]
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      id: "galaxy",
      name: "کهکشان",
      type: "premium",
      icon: <Sparkles className="h-5 w-5 text-purple-400" />,
      description: "بنر ویژه با طرح کهکشانی",
      isLocked: true,
      price: 2000,
      component: () => (
        <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900 relative overflow-hidden">
          {/* زمینه‌ی ستاره‌ای */}
          <div className="absolute inset-0">
            {Array.from({ length: 150 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                }}
                animate={{
                  opacity: [Math.random() * 0.3 + 0.2, Math.random() * 0.5 + 0.5, Math.random() * 0.3 + 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: Math.random() * 4 + 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
          
          {/* ستاره‌های درخشان */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => {
              const size = Math.random() * 3 + 2;
              return (
                <motion.div
                  key={`bright-star-${i}`}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                >
                  <div
                    className="rounded-full bg-white relative z-10"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                  />
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                      width: `${size * 6}px`,
                      height: `${size * 6}px`,
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      ease: "easeInOut",
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
          
          {/* سحابی رنگی */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(253,186,116,0.5) 0%, rgba(236,72,153,0.3) 50%, rgba(0,0,0,0) 70%)"
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
          
          <motion.div
            className="absolute -bottom-50 -left-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(125,99,205,0.3) 50%, rgba(0,0,0,0) 70%)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 12,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 2
            }}
          />
          
          {/* مرکز کهکشان */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-30 blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(217,70,239,0.6) 0%, rgba(139,92,246,0.4) 30%, rgba(67,56,202,0.2) 70%, rgba(0,0,0,0) 100%)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
          
          {/* دیسک کهکشان */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-56 rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(167,139,250,0.1) 0%, rgba(0,0,0,0) 70%)",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.05, 1]
            }}
            transition={{
              rotate: {
                duration: 40,
                ease: "linear",
                repeat: Infinity
              },
              scale: {
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity
              }
            }}
          >
            {/* بازوهای کهکشان */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`arm-${i}`}
                className="absolute top-1/2 left-1/2 w-[200px] h-1 opacity-50"
                style={{
                  background: "linear-gradient(90deg, rgba(124,58,237,0.7) 0%, rgba(139,92,246,0.5) 50%, rgba(0,0,0,0) 100%)",
                  transformOrigin: "left center",
                  transform: `rotate(${i * 90}deg)`,
                }}
                animate={{
                  width: ["200px", "250px", "200px"],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i
                }}
              />
            ))}
          </motion.div>
          
          {/* سیاره‌های کوچک */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full"
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 80,
              ease: "linear",
              repeat: Infinity
            }}
            style={{
              transformOrigin: "center",
            }}
          >
            {/* چند سیاره در مدار */}
            {Array.from({ length: 5 }).map((_, i) => {
              const angle = (i * 72) * (Math.PI / 180);
              const radius = 220 + (i * 15);
              const colors = [
                "bg-violet-500", 
                "bg-fuchsia-500", 
                "bg-pink-500", 
                "bg-blue-500", 
                "bg-cyan-500"
              ];
              
              return (
                <motion.div
                  key={`planet-${i}`}
                  className={`absolute rounded-full ${colors[i]} shadow-lg`}
                  style={{
                    width: `${6 + Math.random() * 4}px`,
                    height: `${6 + Math.random() * 4}px`,
                    left: `${radius * Math.cos(angle)}px`,
                    top: `${radius * Math.sin(angle)}px`,
                    transform: "translate(-50%, -50%)"
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 5px ${i % 2 === 0 ? '#c4b5fd' : '#f0abfc'}`, 
                      `0 0 10px ${i % 2 === 0 ? '#a78bfa' : '#e879f9'}`, 
                      `0 0 5px ${i % 2 === 0 ? '#c4b5fd' : '#f0abfc'}`
                    ]
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </motion.div>
          
          {/* شهاب سنگ‌ها */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={`meteor-${i}`}
                className="absolute h-px bg-white"
                style={{
                  width: `${30 + Math.random() * 50}px`,
                  top: `${Math.random() * 70}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${215 + Math.random() * 30}deg)`,
                  transformOrigin: "left center",
                  opacity: 0
                }}
                animate={{
                  opacity: [0, 0.7, 0],
                  left: [null, "-10%"],
                  top: [null, `${parseFloat(i * Math.random() * 70) + 20}%`]
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 10 + i * 5,
                  times: [0, 0.3, 1]
                }}
              >
                <div className="absolute left-0 top-1/2 w-1 h-1 bg-white rounded-full -translate-y-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "neon",
      name: "نئون",
      type: "vip",
      icon: <Activity className="h-5 w-5 text-fuchsia-400" />,
      description: "بنر نئونی با افکت‌های سایبرپانک",
      isLocked: true,
      price: 1500,
      component: () => (
        <div className="w-full h-full bg-gradient-to-r from-slate-950 to-slate-900 relative overflow-hidden">
          {/* پس‌زمینه شهری */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
          
          {/* خطوط نئونی افقی */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, index) => (
              <motion.div 
                key={`h-neon-${index}`}
                className="absolute h-px"
                style={{ 
                  top: `${10 + index * 20}%`, 
                  left: '5%',
                  right: '5%',
                  backgroundImage: 'linear-gradient(90deg, transparent, #f0abfc, #c026d3, #f0abfc, transparent)',
                  boxShadow: '0 0 20px #c026d3, 0 0 40px #c026d3'
                }}
                animate={{
                  opacity: [0, 1, 0.5, 1, 0],
                  scaleX: [0.5, 1, 0.8, 1, 0.5],
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: index * 0.7,
                  times: [0, 0.2, 0.5, 0.8, 1]
                }}
              />
            ))}
          </div>
          
          {/* خطوط نئونی عمودی */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, index) => (
              <motion.div 
                key={`v-neon-${index}`}
                className="absolute w-px"
                style={{ 
                  left: `${10 + index * 12}%`, 
                  top: '10%',
                  bottom: '10%',
                  backgroundImage: 'linear-gradient(0deg, transparent, #22d3ee, #06b6d4, #22d3ee, transparent)',
                  boxShadow: '0 0 20px #06b6d4, 0 0 40px #06b6d4'
                }}
                animate={{
                  opacity: [0, 0.7, 0.3, 0.7, 0],
                  scaleY: [0.3, 1, 0.7, 1, 0.3],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: index * 0.3,
                  times: [0, 0.2, 0.5, 0.8, 1]
                }}
              />
            ))}
          </div>
          
          {/* گویهای نئونی */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => {
              const colors = [
                'rgba(240,171,252,0.8)', // fuchsia
                'rgba(192,38,211,0.8)', // purple
                'rgba(34,211,238,0.8)',  // cyan
                'rgba(147,51,234,0.8)'   // violet
              ];
              const shadows = [
                '0 0 20px #c026d3, 0 0 40px #c026d3',
                '0 0 20px #7c3aed, 0 0 40px #7c3aed',
                '0 0 20px #06b6d4, 0 0 40px #06b6d4',
                '0 0 20px #9333ea, 0 0 40px #9333ea'
              ];
              const colorIndex = i % colors.length;
              
              return (
                <motion.div
                  key={`neon-orb-${i}`}
                  className="absolute rounded-full"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                    width: `${2 + Math.random() * 6}px`,
                    height: `${2 + Math.random() * 6}px`,
                    backgroundColor: colors[colorIndex],
                    boxShadow: shadows[colorIndex],
                  }}
                  animate={{
                    opacity: [0, 1, 0.5, 1, 0],
                    scale: [0, 1, 0.7, 1, 0],
                    y: [0, -20, -10, -30, -40],
                    x: [0, 5, -5, 10, 0],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: Math.random() * 10,
                    times: [0, 0.2, 0.5, 0.8, 1]
                  }}
                />
              );
            })}
          </div>
          
          {/* دایره نئونی مرکزی */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="relative w-32 h-32 rounded-full"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, rgba(147,51,234,0.1) 70%, transparent 100%)',
              }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(147,51,234,0.3), 0 0 40px rgba(147,51,234,0.2)',
                  '0 0 30px rgba(147,51,234,0.6), 0 0 60px rgba(147,51,234,0.3)',
                  '0 0 20px rgba(147,51,234,0.3), 0 0 40px rgba(147,51,234,0.2)',
                ],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity
              }}
            >
              {/* حلقه‌های نئونی */}
              <motion.div
                className="absolute inset-0 rounded-full border border-fuchsia-500"
                animate={{
                  boxShadow: [
                    '0 0 5px #c026d3, inset 0 0 5px #c026d3',
                    '0 0 10px #c026d3, inset 0 0 10px #c026d3',
                    '0 0 5px #c026d3, inset 0 0 5px #c026d3',
                  ],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
              
              <motion.div
                className="absolute inset-4 rounded-full border border-cyan-500"
                animate={{
                  boxShadow: [
                    '0 0 5px #06b6d4, inset 0 0 5px #06b6d4',
                    '0 0 10px #06b6d4, inset 0 0 10px #06b6d4',
                    '0 0 5px #06b6d4, inset 0 0 5px #06b6d4',
                  ],
                  opacity: [0.5, 1, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  opacity: {
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 0.5
                  },
                  rotate: {
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity
                  }
                }}
              />
              
              <motion.div
                className="absolute inset-8 rounded-full border border-violet-500"
                animate={{
                  boxShadow: [
                    '0 0 5px #7c3aed, inset 0 0 5px #7c3aed',
                    '0 0 10px #7c3aed, inset 0 0 10px #7c3aed',
                    '0 0 5px #7c3aed, inset 0 0 5px #7c3aed',
                  ],
                  opacity: [0.5, 1, 0.5],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  opacity: {
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: 1
                  },
                  rotate: {
                    duration: 25,
                    ease: "linear",
                    repeat: Infinity
                  }
                }}
              />
              
              {/* مرکز درخشان */}
              <motion.div
                className="absolute inset-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(192,38,211,0.7), 0 0 20px rgba(192,38,211,0.5), 0 0 30px rgba(192,38,211,0.3)',
                    '0 0 15px rgba(192,38,211,0.9), 0 0 30px rgba(192,38,211,0.7), 0 0 45px rgba(192,38,211,0.5)',
                    '0 0 10px rgba(192,38,211,0.7), 0 0 20px rgba(192,38,211,0.5), 0 0 30px rgba(192,38,211,0.3)',
                  ],
                  opacity: [0.8, 1, 0.8],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
            </motion.div>
          </div>
          
          {/* تأثیر مه نئونی */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* سایه‌های رنگی در گوشه‌ها */}
          <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-fuchsia-500/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-cyan-500/5 blur-3xl" />
          
          {/* خطوط زیگزاگ */}
          <svg className="absolute inset-0 w-full h-full z-10 opacity-20">
            <motion.path
              d="M0,150 L50,120 L100,180 L150,90 L200,170 L250,100 L300,160 L350,80 L400,140 L450,70 L500,130 L550,60 L600,120 L650,50 L700,110 L750,40 L800,100 L850,30 L900,90 L950,20 L1000,80"
              fill="none"
              stroke="rgba(147,51,234,0.7)"
              strokeWidth="1"
              strokeDasharray="4,4"
              initial={{
                opacity: 0,
                pathOffset: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
                pathOffset: [0, 1],
              }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              }}
            />
          </svg>
        </div>
      )
    },
    {
      id: "abstract",
      name: "انتزاعی",
      type: "creative",
      icon: <Sparkles className="h-5 w-5 text-indigo-400" />,
      description: "طرح انتزاعی با رنگ‌های متنوع",
      isLocked: true,
      price: 1800,
      component: () => (
        <div className="w-full h-full bg-gradient-to-r from-slate-900 to-gray-900 relative overflow-hidden">
          {/* پس‌زمینه با الگوی ریز */}
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:8px_8px]"></div>
          
          {/* اشکال اصلی متحرک */}
          <motion.div
            className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 mix-blend-screen blur-3xl"
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [0, -20, 0, 20, 0],
              scale: [1, 1.1, 1, 0.9, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-500/30 to-teal-500/30 mix-blend-screen blur-3xl"
            animate={{
              x: [0, -20, 0, 20, 0],
              y: [0, 20, 0, -20, 0],
              scale: [1, 0.9, 1, 1.1, 1],
              rotate: [0, -90, -180, -270, -360],
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: 2
            }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-orange-500/20 to-yellow-500/20 mix-blend-screen blur-3xl"
            animate={{
              scale: [1, 1.2, 1, 0.8, 1],
              filter: ["blur(30px)", "blur(40px)", "blur(30px)", "blur(20px)", "blur(30px)"],
              opacity: [0.3, 0.4, 0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          {/* اشکال هندسی کوچک */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => {
              const shapes = [
                "w-6 h-6 rounded-full",
                "w-6 h-6 rotate-45",
                "w-4 h-8 rounded-full rotate-[30deg]",
                "w-3 h-3 rounded-sm rotate-[15deg]",
                "w-5 h-5 rounded-md"
              ];
              const colors = [
                "bg-indigo-500/40",
                "bg-purple-500/40",
                "bg-blue-500/40",
                "bg-teal-500/40",
                "bg-fuchsia-500/40",
                "bg-pink-500/40"
              ];
              
              return (
                <motion.div
                  key={`shape-${i}`}
                  className={`absolute ${shapes[i % shapes.length]} ${colors[i % colors.length]}`}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    filter: "blur(1px)",
                    willChange: "transform, opacity"
                  }}
                  animate={{
                    x: [0, Math.random() * 30 - 15, 0, Math.random() * 30 - 15, 0],
                    y: [0, Math.random() * 30 - 15, 0, Math.random() * 30 - 15, 0],
                    opacity: [0.4, 0.7, 0.4, 0.7, 0.4],
                    rotate: [0, 180, 360, 540, 720],
                    scale: [1, 1.2, 1, 0.8, 1],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 20,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: Math.random() * 5
                  }}
                />
              );
            })}
          </div>
          
          {/* خطوط متحرک */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 8 }).map((_, i) => {
              const colors = [
                "rgba(99,102,241,0.4)",
                "rgba(168,85,247,0.4)",
                "rgba(236,72,153,0.4)",
                "rgba(45,212,191,0.4)"
              ];
              
              return (
                <motion.path
                  key={`line-${i}`}
                  d={`M${Math.random() * 100},${Math.random() * 100} C${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
                  stroke={colors[i % colors.length]}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0, 0.5, 0],
                    strokeDasharray: ["5,5", "10,10", "5,5"]
                  }}
                  transition={{
                    duration: 10 + i,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.5
                  }}
                />
              );
            })}
          </svg>
          
          {/* ذرات نقطه‌ای */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute bg-white rounded-full"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0],
                  y: [0, -30, -60],
                  x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  ease: "easeOut",
                  repeat: Infinity,
                  delay: Math.random() * 10
                }}
              />
            ))}
          </div>
          
          {/* افکت تابش نوری */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50"></div>
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