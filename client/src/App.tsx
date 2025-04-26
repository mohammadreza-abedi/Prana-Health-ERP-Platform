import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import HRDashboard from "@/pages/HRDashboard";
import Challenges from "@/pages/Challenges";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import AutoLogin from "@/pages/auto-login";
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "./lib/useAuth";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden">
      {/* Windows 11 style background with blurred circles */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-tiffany/5 to-aqua/5 dark:from-navy/20 dark:to-tiffany/10"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-tiffany/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-aqua/20 blur-3xl"></div>
      
      <div className="flex flex-col items-center justify-center z-10">
        {/* Logo Animation */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-tiffany to-aqua flex items-center justify-center mb-8 shadow-lg animate-pulse">
          <span className="text-white font-black text-3xl">پ</span>
        </div>
        
        {/* Loading Animation */}
        <div className="glass p-6 rounded-xl flex items-center justify-center">
          <div className="relative w-12 h-12">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-tiffany border-r-aqua border-b-navy border-l-transparent rounded-full animate-spin"></div>
          </div>
          <span className="mr-4 text-lg font-bold">در حال بارگذاری...</span>
        </div>
      </div>
    </div>
  );
}

function Router() {
  // بدون بررسی وضعیت ورود کاربر، مستقیم به داشبورد می‌رویم
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/hr-dashboard" component={HRDashboard} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/profile" component={Profile} />
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
