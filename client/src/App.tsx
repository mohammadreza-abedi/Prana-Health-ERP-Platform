import { useState, useEffect } from "react";
import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebSocketProvider } from "@/hooks/use-websocket";
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
import HomePage from "@/pages/HomePage";
import MainLayout from "@/components/layouts/MainLayout";
import PulsingLogo from "@/components/ui/pulsing-logo";

// استفاده از کامپوننت LoadingScreen جداگانه
import LoadingScreen from '@/components/ui/loading-screen';

// کامپوننت مسیریابی اصلی
function AppRoutes() {
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
    <>
      {/* مسیرهای عمومی بدون MainLayout */}
      <Route path="/" component={HomePage} />
      <Route path="/login" component={AdvancedLoginPage} />
      
      {/* مسیرهای داخلی با MainLayout */}
      <Route path="/dashboard">
        {() => (
          <MainLayout>
            <Dashboard />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/enhanced-dashboard">
        {() => (
          <MainLayout>
            <EnhancedDashboard />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/hr-dashboard">
        {() => (
          <MainLayout>
            <HRDashboard />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/health-dashboard">
        {() => (
          <MainLayout>
            <HealthDashboard />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/workout-dashboard">
        {() => (
          <MainLayout>
            <WorkoutDashboard />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/challenges">
        {() => (
          <MainLayout>
            <Challenges />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/achievements">
        {() => (
          <MainLayout>
            <Achievements />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/achievements-dashboard">
        {() => (
          <MainLayout>
            <AchievementsDashboard />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/medical-center">
        {() => (
          <MainLayout>
            <MedicalCenterPage />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/organizational-health">
        {() => (
          <MainLayout>
            <OrganizationalHealthPage />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/leaderboard">
        {() => (
          <MainLayout>
            <Leaderboard />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/profile">
        {() => (
          <MainLayout>
            <Profile />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/user-profile">
        {() => (
          <MainLayout>
            <UserProfile />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/avatar-customizer">
        {() => (
          <MainLayout>
            <AvatarCustomizer />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/psychological-tests">
        {() => (
          <MainLayout>
            <PsychologicalTests />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/settings">
        {() => (
          <MainLayout>
            <Settings />
          </MainLayout>
        )}
      </Route>
      
      <Route path="/auto-login">
        {() => (
          <MainLayout>
            <AutoLogin />
          </MainLayout>
        )}
      </Route>
      
      {/* صفحه 404 */}
      <Route>
        {() => (
          <MainLayout>
            <NotFound />
          </MainLayout>
        )}
      </Route>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <TooltipProvider>
          <Toaster />
          <Router>
            <Switch>
              <AppRoutes />
            </Switch>
          </Router>
        </TooltipProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
