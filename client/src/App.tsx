import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebSocketProvider } from "@/hooks/use-websocket";
import { AvatarProvider } from "@/contexts/AvatarContext"; // افزودن AvatarProvider
import PWAManager from "@/components/pwa/PWAManager";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import EnhancedDashboard from "@/pages/EnhancedDashboard";
import HRDashboard from "@/pages/HRDashboard";
import HealthDashboard from "@/pages/HealthDashboard";
import WorkoutDashboard from "@/pages/WorkoutDashboard";
import Challenges from "@/pages/Challenges";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";
import UserProfile from "@/pages/UserProfile";
import ProAvatarPage from "@/pages/ProAvatarPage";
import AvatarShopPage from "@/pages/AvatarShopPage";
import AutoLogin from "@/pages/auto-login";
import PsychologicalTests from "@/pages/PsychologicalTests";
import Settings from "@/pages/Settings";
import Achievements from "@/pages/Achievements";
import AchievementsDashboard from "@/pages/AchievementsDashboard";
import MedicalCenterPage from "@/pages/MedicalCenterPage";
import OrganizationalHealthPage from "@/pages/OrganizationalHealthPage";
import AdvancedLoginPage from "@/pages/AdvancedLoginPage";
import HSESmartDashboard from "@/pages/HSESmartDashboard";
import AdvancedProfilePage from "@/pages/AdvancedProfilePage";
import WeatherInfo from "@/pages/WeatherInfo";
import AIAnalyticsDashboard from "@/pages/Dashboard/AnalyticsDashboard";
import GamificationHub from "@/pages/Gamification/GamificationHub";
import GamificationPage from "@/pages/GamificationPage";
import MainLayout from "@/components/layouts/MainLayout";
import MinimalApp from "./MinimalApp"; // برای عیب‌یابی
import SimplestApp from "./SimplestApp"; // برای عیب‌یابی

// استفاده از کامپوننت LoadingScreen جداگانه
import LoadingScreen from '@/components/ui/loading-screen';

// استفاده از روتر اصلی برنامه
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
        <Route path="/health-dashboard" component={HealthDashboard} />
        <Route path="/workout-dashboard" component={WorkoutDashboard} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/achievements" component={Achievements} />
        <Route path="/achievements-dashboard" component={AchievementsDashboard} />
        <Route path="/medical-center" component={MedicalCenterPage} />
        <Route path="/organizational-health" component={OrganizationalHealthPage} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/advanced-profile" component={AdvancedProfilePage} />
        <Route path="/avatar-studio" component={ProAvatarPage} />
        <Route path="/avatar-shop" component={AvatarShopPage} />
        <Route path="/psychological-tests" component={PsychologicalTests} />
        <Route path="/settings" component={Settings} />
        <Route path="/auto-login" component={AutoLogin} />
        <Route path="/login" component={AdvancedLoginPage} />
        <Route path="/hse-smart-dashboard" component={HSESmartDashboard} />
        <Route path="/weather-info" component={WeatherInfo} />
        <Route path="/ai-analytics" component={AIAnalyticsDashboard} />
        <Route path="/advanced-analysis-dashboard" component={AIAnalyticsDashboard} />
        <Route path="/gamification" component={GamificationHub} />
        <Route path="/gamification-system" component={GamificationPage} />
        <Route path="/minimal" component={MinimalApp} />
        <Route path="/simplest" component={SimplestApp} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

// متغیر برای تعیین حالت برنامه (عادی یا عیب‌یابی)
const APP_MODE = window.localStorage.getItem('prana_app_mode') || 'NORMAL';

function App() {
  // دستور اگر مشکل دارید، این خط را اجرا کنید:
  // localStorage.setItem('prana_app_mode', 'MINIMAL');
  
  // استفاده از نسخه‌های ساده‌تر برای عیب‌یابی
  if (APP_MODE === 'SIMPLEST') {
    return <SimplestApp />;
  }
  
  if (APP_MODE === 'MINIMAL') {
    return (
      <QueryClientProvider client={queryClient}>
        <AvatarProvider>
          <TooltipProvider>
            <Toaster />
            <MinimalApp />
          </TooltipProvider>
        </AvatarProvider>
      </QueryClientProvider>
    );
  }
  
  // نسخه کامل برنامه - وب‌سوکت موقتاً غیرفعال شده است
  return (
    <QueryClientProvider client={queryClient}>
      {/* WebSocketProvider موقتاً حذف شده تا عیب‌یابی آسان‌تر شود */}
      <AvatarProvider>
        <TooltipProvider>
          <Toaster />
          <PWAManager />
          <Router />
        </TooltipProvider>
      </AvatarProvider>
    </QueryClientProvider>
  );
}

export default App;
