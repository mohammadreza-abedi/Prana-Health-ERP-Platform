import { useState } from "react";
import DashboardUserSummary from "@/components/dashboard/DashboardUserSummary";
import HealthSummaryCard from "@/components/dashboard/HealthSummaryCard";
import WeeklyProgressCard from "@/components/dashboard/WeeklyProgressCard";
import DailyChallengeCard from "@/components/dashboard/DailyChallengeCard";
import BadgesCard from "@/components/dashboard/BadgesCard";
import LeaderboardCard from "@/components/dashboard/LeaderboardCard";
import UpcomingEventsCard from "@/components/dashboard/UpcomingEventsCard";
import HRAnalyticsCards from "@/components/dashboard/HRAnalyticsCards";
import DepartmentalComparisonChart from "@/components/dashboard/DepartmentalComparisonChart";
import ClientCarousel from "@/components/ui/client-carousel";
import NotificationSender from "@/components/ui/notification-sender";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  CircleUser, 
  Dumbbell, 
  FileText, 
  Filter, 
  HeartPulse, 
  PanelTop, 
  Plus, 
  SearchCheck, 
  SlackIcon,
  Sparkles, 
  Star, 
  Target, 
  TrendingUp, 
  Trophy, 
  Users 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const QuickActions = () => {
  const actions = [
    { icon: <HeartPulse className="h-5 w-5" />, label: "ثبت سلامت روزانه", href: "/health-check" },
    { icon: <Dumbbell className="h-5 w-5" />, label: "چالش جدید", href: "/new-challenge" },
    { icon: <SlackIcon className="h-5 w-5" />, label: "پیام رسان", href: "/messages" },
    { icon: <Target className="h-5 w-5" />, label: "تنظیم هدف", href: "/set-goal" },
    { icon: <Star className="h-5 w-5" />, label: "پاداش ها", href: "/rewards" },
    { icon: <FileText className="h-5 w-5" />, label: "گزارش سلامت", href: "/health-report" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm mb-6 mica">
      <h3 className="text-sm font-medium mb-3 text-slate-500 dark:text-slate-400">اقدامات سریع</h3>
      <div className="grid grid-cols-6 gap-2">
        {actions.map((action, idx) => (
          <Link key={idx} href={action.href}>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center text-tiffany mb-2">
                {action.icon}
              </div>
              <span className="text-xs text-center">{action.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// آنالیز حرفه‌ای سلامت
const ProfessionalHealthAnalysis = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm mt-6 mica">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <h3 className="font-bold">آنالیز حرفه‌ای سلامت</h3>
        <Tabs defaultValue="week">
          <TabsList className="grid grid-cols-2 h-8">
            <TabsTrigger value="week">هفتگی</TabsTrigger>
            <TabsTrigger value="month">ماهانه</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week">
            <div className="grid grid-cols-4 gap-4 p-4">
              <div className="p-4 bg-tiffany/10 dark:bg-tiffany/20 rounded-lg flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3">
                  <HeartPulse className="h-6 w-6 text-tiffany" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">ضربان قلب</span>
                <span className="text-2xl font-bold mt-1 text-tiffany">78 BPM</span>
              </div>
              <div className="p-4 bg-aqua/10 dark:bg-aqua/20 rounded-lg flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3">
                  <Dumbbell className="h-6 w-6 text-aqua" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">فعالیت بدنی</span>
                <span className="text-2xl font-bold mt-1 text-aqua">85%</span>
              </div>
              <div className="p-4 bg-yellow/10 dark:bg-yellow/20 rounded-lg flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3">
                  <TrendingUp className="h-6 w-6 text-yellow" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">کالری مصرفی</span>
                <span className="text-2xl font-bold mt-1 text-yellow">2140</span>
              </div>
              <div className="p-4 bg-navy/10 dark:bg-navy/20 rounded-lg flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-navy" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">کیفیت خواب</span>
                <span className="text-2xl font-bold mt-1 text-navy">72%</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-slate-400">نمودار آنالیز سلامت هفتگی</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="month">
            <div className="grid grid-cols-4 gap-4 p-4">
              <div className="p-4 bg-tiffany/10 dark:bg-tiffany/20 rounded-lg flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3">
                  <HeartPulse className="h-6 w-6 text-tiffany" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">ضربان قلب</span>
                <span className="text-2xl font-bold mt-1 text-tiffany">74 BPM</span>
              </div>
              <div className="p-4 bg-aqua/10 dark:bg-aqua/20 rounded-lg flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3">
                  <Dumbbell className="h-6 w-6 text-aqua" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">فعالیت بدنی</span>
                <span className="text-2xl font-bold mt-1 text-aqua">78%</span>
              </div>
              <div className="p-4 bg-yellow/10 dark:bg-yellow/20 rounded-lg flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3">
                  <TrendingUp className="h-6 w-6 text-yellow" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">کالری مصرفی</span>
                <span className="text-2xl font-bold mt-1 text-yellow">1980</span>
              </div>
              <div className="p-4 bg-navy/10 dark:bg-navy/20 rounded-lg flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-navy" />
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">کیفیت خواب</span>
                <span className="text-2xl font-bold mt-1 text-navy">68%</span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-slate-400">نمودار آنالیز سلامت ماهانه</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="text-tiffany">
            <FileText className="h-4 w-4 ml-2" />
            دریافت گزارش کامل
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-500">
            <Filter className="h-4 w-4 ml-2" />
            فیلترها
          </Button>
        </div>
      </div>
    </div>
  );
};

// ویجت پیشرفت مهارت‌های سلامتی
const HealthSkillsProgress = () => {
  const skills = [
    { name: "مدیریت استرس", progress: 75, color: "bg-tiffany" },
    { name: "تغذیه سالم", progress: 60, color: "bg-aqua" },
    { name: "فعالیت بدنی", progress: 85, color: "bg-navy" },
    { name: "کیفیت خواب", progress: 50, color: "bg-yellow" }
  ];
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm mica">
      <h3 className="font-bold mb-4">مهارت‌های سلامتی</h3>
      <div className="space-y-4">
        {skills.map((skill, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{skill.name}</span>
              <span className="text-sm font-medium">{skill.progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${skill.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full ${skill.color}`}
              />
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-4 w-full">
        <PanelTop className="h-4 w-4 ml-2" />
        مشاهده جزئیات بیشتر
      </Button>
    </div>
  );
};

// توصیه‌های هوشمند
const SmartRecommendations = () => {
  const recommendations = [
    { 
      id: 1, 
      title: "افزایش کیفیت خواب", 
      description: "توصیه می‌شود ساعت خواب خود را منظم کنید و قبل از خواب از دستگاه‌های الکترونیکی استفاده نکنید.",
      icon: <Sparkles className="h-6 w-6" />,
      color: "border-yellow"
    },
    { 
      id: 2, 
      title: "کاهش استرس روزانه", 
      description: "15 دقیقه مدیتیشن در طول روز به کاهش 30% استرس شما کمک خواهد کرد.",
      icon: <HeartPulse className="h-6 w-6" />,
      color: "border-tiffany"
    },
    { 
      id: 3, 
      title: "بهبود تغذیه", 
      description: "افزودن سبزیجات بیشتر و کاهش قند مصرفی به بهبود انرژی روزانه کمک می‌کند.",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "border-aqua"
    }
  ];
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-sm mica">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">توصیه‌های هوشمند</h3>
        <Button variant="ghost" size="sm" className="text-slate-500">
          <SearchCheck className="h-4 w-4 ml-2" />
          بروزرسانی
        </Button>
      </div>
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <motion.div 
            key={rec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 border-r-4 ${rec.color} bg-slate-50 dark:bg-slate-800 rounded-lg`}
          >
            <div className="flex">
              <div className="ml-3 pt-1 text-tiffany">
                {rec.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm">{rec.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{rec.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-4 w-full">
        <Plus className="h-4 w-4 ml-2" />
        مشاهده همه توصیه‌ها
      </Button>
    </div>
  );
};

export default function Dashboard() {
  // We show HR dashboard by default as there's no login system now
  const showHRDashboard = true;
  
  return (
    <>
      {/* User welcome and profile summary */}
      <DashboardUserSummary />
      
      {/* Quick Actions */}
      <QuickActions />
      
      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Health Status */}
        <div className="space-y-6">
          <HealthSummaryCard />
          <WeeklyProgressCard />
          <HealthSkillsProgress />
        </div>
        
        {/* Column 2: Gamification */}
        <div className="space-y-6">
          <DailyChallengeCard />
          <BadgesCard />
          <ProfessionalHealthAnalysis />
        </div>
        
        {/* Column 3: Leaderboard and Events */}
        <div className="space-y-6">
          <LeaderboardCard />
          <UpcomingEventsCard />
          <SmartRecommendations />
        </div>
      </div>
      
      {/* HR/HSE Manager Dashboard Preview */}
      {showHRDashboard && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">داشبورد مدیران HR/HSE</h2>
            <Link href="/hr-dashboard">
              <div className="text-sm text-tiffany hover:text-tiffany-light transition-colors flex items-center cursor-pointer">
                <span>مشاهده کامل</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </div>
          
          <HRAnalyticsCards />
          <DepartmentalComparisonChart />
          
          {/* Client Carousel - لوگوی مشتریان */}
          <ClientCarousel />
        </div>
      )}
    </>
  );
}
