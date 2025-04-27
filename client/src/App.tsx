import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebSocketProvider } from "@/hooks/use-websocket";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import EnhancedDashboard from "@/pages/EnhancedDashboard";
import HRDashboard from "@/pages/HRDashboard";
import Challenges from "@/pages/Challenges";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";
import UserProfile from "@/pages/UserProfile";
import AvatarCustomizer from "@/pages/AvatarCustomizer";
import AutoLogin from "@/pages/auto-login";
import PsychologicalTests from "@/pages/PsychologicalTests";
import Settings from "@/pages/Settings";
import Achievements from "@/pages/Achievements";
import MainLayout from "@/components/layouts/MainLayout";
import PulsingLogo from "@/components/ui/pulsing-logo";

function LoadingScreen() {
  // متن‌های تصادفی برای نمایش در مرحله بارگذاری
  const loadingTips = [
    "بیش از ۵۰٪ بیماری‌ها با سبک زندگی سالم قابل پیشگیری هستند.",
    "نوشیدن روزانه ۸ لیوان آب به سلامت کلیه‌ها و پوست کمک می‌کند.",
    "تنفس عمیق و آگاهانه می‌تواند استرس را تا ۷۰٪ کاهش دهد.",
    "۱۵ دقیقه پیاده‌روی روزانه، خطر بیماری‌های قلبی را ۳۰٪ کاهش می‌دهد.",
    "هر خنده عمیق، سیستم ایمنی بدن را تا ۱۲ ساعت تقویت می‌کند.",
    "خواب منظم شبانه، بهره‌وری روزانه را تا ۴۰٪ افزایش می‌دهد.",
    "کار مداوم بدون استراحت، کارایی ذهنی را پس از ۹۰ دقیقه کاهش می‌دهد.",
    "پرانا با هوش مصنوعی، برنامه ورزشی شما را تا ۹۰٪ شخصی‌سازی می‌کند.",
    "تنظیم ۱۰ دقیقه مدیتیشن در روز، خلاقیت را تا ۶۰٪ افزایش می‌دهد.",
    "پرانا روند بهبود سلامت شما را با بیش از ۲۰۰ شاخص ارزیابی می‌کند.",
  ];
  
  // انتخاب یک متن تصادفی
  const randomTip = loadingTips[Math.floor(Math.random() * loadingTips.length)];
  
  // مراحل بارگذاری برای نمایش
  const loadingSteps = [
    { id: 1, text: "بارگذاری نمودارها و داشبورد" },
    { id: 2, text: "آماده‌سازی اطلاعات سلامت" },
    { id: 3, text: "بررسی چالش‌های جدید" },
    { id: 4, text: "بارگذاری موتور هوش مصنوعی" },
    { id: 5, text: "تنظیم رابط کاربری" },
    { id: 6, text: "اتصال به پایگاه داده" }
  ];
  
  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* افکت‌های پس‌زمینه - استایل ویندوز 11 */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-tiffany/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-aqua/20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl"></div>
        
        {/* افکت‌های متحرک پس‌زمینه */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-tiffany rounded-full animate-ping-slow"></div>
          <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-aqua rounded-full animate-ping-slow" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-yellow-500 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-500 rounded-full animate-ping-slow" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-2/3 left-1/5 w-3 h-3 bg-rose-500 rounded-full animate-ping-slow" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center z-10 px-4 max-w-2xl w-full">
        {/* انیمیشن لوگو */}
        <div className="mb-8">
          <PulsingLogo size="xl" showText={true} />
        </div>
        
        {/* نوار پیشرفت و متن بارگذاری */}
        <div className="neon-card acrylic backdrop-blur-lg p-6 md:p-8 rounded-xl flex flex-col items-center justify-center w-full shadow-2xl shadow-tiffany/5 border border-white/10 dark:border-white/5">
          {/* انیمیشن بارگذاری پیشرفته */}
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-tiffany border-r-tiffany/70 border-b-aqua border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute top-3 left-3 right-3 bottom-3 border-4 border-t-transparent border-r-transparent border-b-transparent border-l-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* اضافه کردن حلقه سوم با انیمیشن متفاوت */}
            <div className="absolute top-6 left-6 right-6 bottom-6 border-3 border-t-yellow-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '2.5s' }}></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tiffany to-aqua animate-gradient text-xs font-bold">پرانا</span>
            </div>
          </div>
          
          {/* متن نکته سلامتی */}
          <div className="bg-tiffany/5 dark:bg-tiffany/10 p-3 mb-6 rounded-lg border border-tiffany/10 max-w-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-tiffany/30 to-aqua/30"></div>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="text-tiffany font-bold">💡 نکته سلامتی: </span>
              {randomTip}
            </p>
          </div>
          
          {/* نوار پیشرفت با انیمیشن جدید */}
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-tiffany via-aqua to-tiffany rounded-full animate-progress"></div>
          </div>
          
          {/* مراحل بارگذاری با انیمیشن‌های پیشرفته */}
          <div className="w-full mb-3">
            <div className="flex flex-wrap justify-center gap-2">
              {loadingSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`flex items-center bg-white/50 dark:bg-slate-800/50 px-3 py-1 rounded-full text-xs border border-slate-200 dark:border-slate-700 transition-all ${index === 0 ? 'animate-pulse-subtle' : ''}`}
                  style={{ 
                    opacity: 1 - (index * 0.15),
                    transform: `scale(${1 - (index * 0.05)})`,
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  <div className={`w-2 h-2 rounded-full mr-2 ${index === 0 ? 'bg-tiffany animate-beat' : 'bg-slate-400'}`}></div>
                  {step.text}
                </div>
              ))}
            </div>
          </div>
          
          <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-tiffany via-purple-500 to-aqua animate-gradient">
            در حال آماده‌سازی پرانا...
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
            پلتفرم هوشمند سلامت و ولنس با بیش از 60 ابزار پیشرفته
            <span className="animate-subtle-bounce inline-block ml-1">🚀</span>
          </p>
        </div>
      </div>
      
      {/* نسخه و اطلاعات پایین صفحه */}
      <div className="absolute bottom-4 w-full flex justify-center">
        <div className="flex items-center text-xs text-slate-400 dark:text-slate-600">
          <span>نسخه ۲.۶.۰</span>
          <span className="mx-2">•</span>
          <span>حافظه در حال استفاده: ۳۲۴ مگابایت</span>
          <span className="mx-2">•</span>
          <span>زمان پاسخ سرور: ۵۸ میلی‌ثانیه</span>
        </div>
      </div>
    </div>
  );
}

function Router() {
  const [isLoading, setIsLoading] = useState(true);
  
  // شبیه‌سازی بارگذاری اولیه
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // نمایش صفحه بارگذاری تا زمانی که داده‌ها آماده شوند
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={EnhancedDashboard} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/enhanced-dashboard" component={EnhancedDashboard} />
        <Route path="/hr-dashboard" component={HRDashboard} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/achievements" component={Achievements} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/avatar-customizer" component={AvatarCustomizer} />
        <Route path="/psychological-tests" component={PsychologicalTests} />
        <Route path="/settings" component={Settings} />
        <Route path="/auto-login" component={AutoLogin} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
