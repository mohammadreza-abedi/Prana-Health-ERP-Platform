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
import AutoLogin from "@/pages/auto-login";
import PsychologicalTests from "@/pages/PsychologicalTests";
import Settings from "@/pages/Settings";
import MainLayout from "@/components/layouts/MainLayout";
import PulsingLogo from "@/components/ui/pulsing-logo";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden">
      {/* Windows 11 style background with blurred circles */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-tiffany/5 to-aqua/5 dark:from-navy/20 dark:to-tiffany/10"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-tiffany/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-aqua/20 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl"></div>
      
      <div className="flex flex-col items-center justify-center z-10">
        {/* Logo Animation */}
        <div className="mb-8">
          <PulsingLogo size="xl" showText={true} />
        </div>
        
        {/* Loading Animation */}
        <div className="neon-card acrylic p-6 rounded-xl flex flex-col items-center justify-center">
          <div className="relative w-14 h-14 mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-tiffany border-r-aqua border-b-navy border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute top-2 left-2 right-2 bottom-2 border-2 border-t-transparent border-r-transparent border-b-transparent border-l-rose-500 rounded-full animate-spin animation-delay-500"></div>
          </div>
          <span className="text-lg font-bold">در حال بارگذاری...</span>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">پلتفرم هوشمند سلامت و ولنس سازمانی</p>
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
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/profile" component={Profile} />
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
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
