import { useState, useEffect, createContext } from "react";
import { Switch, Route, Router } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebSocketProvider } from "@/hooks/use-websocket";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";
import LoadingScreen from "@/components/ui/loading-screen";

// Auth Context برای استفاده در سراسر برنامه
interface AuthContextType {
  user: any | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {}
});

// Auth Provider Component
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState({ 
    id: 1, 
    username: 'admin', 
    displayName: 'مدیر سیستم',
    role: 'admin' 
  });
  
  const logout = () => {
    console.log('خروج از سیستم انجام شد');
  };
  
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// اپلیکیشن با پشتیبانی از کامپوننت‌های اصلی و انیمیشن
function App() {
  // نمایش لودینگ اسکرین هنگام بارگذاری
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // شبیه‌سازی بارگذاری
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router>
              <Switch>
                <Route path="/" component={HomePage} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </TooltipProvider>
        </AuthProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
