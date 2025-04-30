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

// کامپوننت برای مدیریت مسیریابی
function AppRoutes() {
  // استفاده از هوک location برای دسترسی به مسیر فعلی
  const [location] = useLocation();
  
  // چاپ مسیر فعلی برای اشکال‌زدایی
  console.log("Current path:", location);
  
  return (
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
      <Route path="/avatar-customizer" component={AvatarCustomizer} />
      <Route path="/psychological-tests" component={PsychologicalTests} />
      <Route path="/settings" component={Settings} />
      <Route path="/auto-login" component={AutoLogin} />
      <Route path="/login" component={AdvancedLoginPage} />
      <Route path="/hse-smart-dashboard" component={HSESmartDashboard} />
      <Route path="/admin-panel" component={SimpleAdminPanel} />
      <Route component={NotFound} />
    </Switch>
  );
}

// کامپوننت اصلی برنامه با معماری بهینه‌شده
function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // بارگذاری اولیه با زمان کوتاه‌تر
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // زمانی که در حال بارگذاری هستیم، نمایش صفحه بارگذاری بدون منو و لایه‌های دیگر
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  // پس از بارگذاری، نمایش برنامه اصلی با MainLayout
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
