import React, { useState, useEffect, createContext } from "react";
import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WebSocketProvider } from "@/hooks/use-websocket";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";
import LoadingScreen from '@/components/ui/loading-screen';

// Auth Context
interface AuthContextType {
  user: any | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {},
});

// Auth Provider Component
function AuthProvider({ children }: { children: React.ReactNode }) {
  // Mock user - این را در نسخه نهایی با احراز هویت واقعی جایگزین کنید
  const [user] = useState({ 
    id: 1, 
    username: 'admin', 
    displayName: 'مدیر سیستم',
    role: 'admin' 
  });
  
  const logout = () => {
    console.log('خروج از سیستم');
    // در نسخه نهایی، کد خروج از سیستم را اینجا قرار دهید
  };
  
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Simple App Routes
function AppRoutes() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router>
              <AppRoutes />
            </Router>
          </TooltipProvider>
        </AuthProvider>
      </WebSocketProvider>
    </QueryClientProvider>
  );
}

export default App;
