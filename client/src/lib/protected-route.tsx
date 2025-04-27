import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'wouter';
import { Loader2 } from 'lucide-react';
import LoadingScreen from '@/components/ui/loading-screen';

// این کامپوننت برای محافظت از صفحات استفاده می‌شود
// صفحاتی که فقط کاربران لاگین شده می‌توانند به آنها دسترسی داشته باشند

interface ProtectedRouteProps {
  path: string;
  component: React.ComponentType;
}

export function ProtectedRoute({ path, component: Component }: ProtectedRouteProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  
  useEffect(() => {
    // بررسی وضعیت لاگین بودن کاربر
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/status');
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // نمایش صفحه بارگذاری تا زمانی که وضعیت لاگین مشخص شود
  if (isLoggedIn === null) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingScreen />
        </div>
      </Route>
    );
  }
  
  // اگر کاربر لاگین نباشد، به صفحه لاگین ریدایرکت می‌شود
  if (!isLoggedIn) {
    return (
      <Route path={path}>
        <Redirect to="/login" />
      </Route>
    );
  }
  
  // اگر کاربر لاگین باشد، کامپوننت را نمایش می‌دهد
  return <Route path={path} component={Component} />;
}