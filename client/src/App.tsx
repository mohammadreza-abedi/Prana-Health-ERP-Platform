import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebSocketProvider } from "@/hooks/use-websocket";
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
import AvatarCustomizer from "@/pages/AvatarCustomizer";
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
import SimpleAdminPanel from "@/pages/SimpleAdminPanel";
import MainLayout from "@/components/layouts/MainLayout";
import LoadingScreen from '@/components/ui/loading-screen';
import AdvancedAnalyticsDashboard from "@/pages/AdvancedAnalyticsDashboard";
import About from "@/pages/About";
import Pricing from "@/pages/Pricing";
import Terms from "@/pages/Terms";
import Register from "@/pages/Register";
import Login from "@/pages/Login";

/**
 * ساختار مسیریابی (Router): سیستم مسیریابی اصلی برنامه
 * این کامپوننت مسیرهای موجود در برنامه را تعریف می‌کند و کامپوننت مناسب را برای هر مسیر بارگذاری می‌کند.
 */
function AppRoutes() {
  // استفاده از هوک location برای دسترسی به مسیر فعلی و دیباگ کردن مسیریابی
  const [location] = useLocation();
  console.log("Current path:", location);
  
  return (
    <Switch>
      {/* صفحات اصلی */}
      <Route path="/" component={EnhancedDashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/enhanced-dashboard" component={EnhancedDashboard} />
      
      {/* داشبوردهای تخصصی */}
      <Route path="/hr-dashboard" component={HRDashboard} />
      <Route path="/health-dashboard" component={HealthDashboard} />
      <Route path="/workout-dashboard" component={WorkoutDashboard} />
      <Route path="/hse-smart-dashboard" component={HSESmartDashboard} />
      <Route path="/advanced-analysis-dashboard" component={AdvancedAnalyticsDashboard} />
      
      {/* صفحات عملکردی */}
      <Route path="/challenges" component={Challenges} />
      <Route path="/achievements" component={Achievements} />
      <Route path="/achievements-dashboard" component={AchievementsDashboard} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/psychological-tests" component={PsychologicalTests} />
      
      {/* صفحات پروفایل و تنظیمات */}
      <Route path="/profile" component={Profile} />
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/advanced-profile" component={AdvancedProfilePage} />
      <Route path="/avatar-customizer" component={AvatarCustomizer} />
      <Route path="/settings" component={Settings} />
      
      {/* صفحات مرکز پزشکی و سلامت سازمانی */}
      <Route path="/medical-center" component={MedicalCenterPage} />
      <Route path="/organizational-health" component={OrganizationalHealthPage} />
      
      {/* صفحات احراز هویت */}
      <Route path="/auto-login" component={AutoLogin} />
      <Route path="/login" component={AdvancedLoginPage} />
      <Route path="/register" component={Register} />
      <Route path="/login-legacy" component={Login} />
      
      {/* صفحات عمومی */}
      <Route path="/about" component={About} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/terms" component={Terms} />
      
      {/* صفحات مدیریتی */}
      <Route path="/admin-panel" component={SimpleAdminPanel} />
      
      {/* صفحه خطای 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * کامپوننت اصلی برنامه
 * این کامپوننت ساختار کلی برنامه و مدیریت حالت‌های بارگذاری را انجام می‌دهد.
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // مدیریت بارگذاری اولیه صفحه
  useEffect(() => {
    // زمان بارگذاری را کاهش می‌دهیم برای تجربه کاربری بهتر
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // نمایش صفحه بارگذاری تا زمانی که آماده‌سازی اولیه تمام شود
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  // پس از بارگذاری، برنامه اصلی با طرح‌بندی کامل نمایش داده می‌شود
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <TooltipProvider>
          <Toaster />
          <PWAManager />
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </TooltipProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
