import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
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
  Check
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
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* بنر و هدر پروفایل */}
        <div className="relative rounded-2xl mb-8 overflow-hidden shadow-lg">
          {/* تصویر کاور */}
          <div className="h-64 bg-slate-200 dark:bg-slate-800 relative">
            {userData.coverImage ? (
              <img
                src={userData.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-tiffany to-blue-500" />
            )}
            {/* دکمه ویرایش کاور */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4 bg-black/20 text-white hover:bg-black/30 backdrop-blur-sm"
              onClick={() => toast({
                title: "ویرایش تصویر کاور",
                description: "این قابلیت به زودی اضافه خواهد شد",
              })}
            >
              <Camera className="h-4 w-4 ml-2" />
              تغییر تصویر کاور
            </Button>
          </div>
          
          {/* اطلاعات پروفایل */}
          <div className="bg-white dark:bg-slate-900 p-6 pt-20 relative">
            {/* آواتار */}
            <div className="absolute -top-16 right-8">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-900 shadow-lg bg-white dark:bg-slate-800">
                  <AvatarImage src={userData.avatar} alt={userData.displayName} />
                  <AvatarFallback className="text-3xl">
                    {userData.displayName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute -left-2 -bottom-2 h-8 w-8 p-0 rounded-full bg-tiffany text-white hover:bg-tiffany/90"
                  onClick={() => setShowAvatarEditor(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                {/* نشان لول */}
                <div className="absolute -left-2 -top-2 h-10 w-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold border-2 border-white dark:border-slate-900 shadow-md">
                  {toPersianNumber(userData.level)}
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
              <AvatarImage src={userData.avatar} alt={userData.displayName} />
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