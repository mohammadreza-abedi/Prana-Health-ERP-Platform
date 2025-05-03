import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
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
import AvatarEditor from "@/pages/AvatarEditor";
import ProAvatarPage from "@/pages/ProAvatarPage";
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
import MainLayout from "@/components/layouts/MainLayout";
import PulsingLogo from "@/components/ui/pulsing-logo";

// استفاده از کامپوننت LoadingScreen جداگانه
import LoadingScreen from '@/components/ui/loading-screen';

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
        <Route path="/avatar-customizer" component={AvatarCustomizer} />
        <Route path="/avatar-editor" component={AvatarEditor} />
        <Route path="/avatar-studio" component={ProAvatarPage} />
        <Route path="/psychological-tests" component={PsychologicalTests} />
        <Route path="/settings" component={Settings} />
        <Route path="/auto-login" component={AutoLogin} />
        <Route path="/login" component={AdvancedLoginPage} />
        <Route path="/hse-smart-dashboard" component={HSESmartDashboard} />
        <Route path="/weather-info" component={WeatherInfo} />
        <Route path="/ai-analytics" component={AIAnalyticsDashboard} />
        <Route path="/advanced-analysis-dashboard" component={AIAnalyticsDashboard} />
        <Route path="/gamification" component={GamificationHub} />
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
          <PWAManager />
          <Router />
        </TooltipProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
