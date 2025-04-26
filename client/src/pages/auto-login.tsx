import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, LogIn } from 'lucide-react';

type User = {
  id: number;
  username: string;
  displayName: string;
  avatar: string | null;
  level: number;
  xp: number;
  role: string;
};

export default function AutoLogin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    // Fetch available users on component mount
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users/sample');
        if (!response.ok) {
          throw new Error('Failed to fetch sample users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError('خطا در دریافت لیست کاربران. لطفا دوباره تلاش کنید.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = async (username: string) => {
    setLoginInProgress(true);
    try {
      const response = await fetch(`/api/auth/auto-login/${username}`);
      if (!response.ok) {
        throw new Error('Login failed');
      }
      await response.json();
      
      // Redirect to dashboard after successful login
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('خطا در ورود به سیستم. لطفا دوباره تلاش کنید.');
      setLoginInProgress(false);
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'admin': return 'مدیر سیستم';
      case 'hr': return 'مدیر منابع انسانی';
      case 'hse': return 'کارشناس HSE';
      default: return 'کاربر';
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">در حال بارگذاری...</p>
      </div>
    );
  }

  // اگر کاربری وجود نداشت، کاربران پیش‌فرض را نمایش دهیم
  const defaultUsers = users.length > 0 ? users : [
    { id: 1, username: 'admin', displayName: 'مدیر سیستم', role: 'admin', level: 10, xp: 5000, avatar: null },
    { id: 2, username: 'test_user', displayName: 'کاربر آزمایشی', role: 'user', level: 3, xp: 800, avatar: null },
    { id: 3, username: 'hr_manager', displayName: 'مدیر منابع انسانی', role: 'hr', level: 5, xp: 1500, avatar: null }
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg mica">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-tiffany to-aqua rounded-xl mx-auto flex items-center justify-center mb-2">
              <span className="text-white font-black text-2xl">پ</span>
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-tiffany to-aqua bg-clip-text text-transparent">
              پرانا - دستیار هوشمند سلامت
            </CardTitle>
            <CardDescription>
              انتخاب کنید با کدام حساب کاربری می‌خواهید وارد سیستم شوید
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 mb-4">
                {error}
              </div>
            )}
            
            {defaultUsers.map((user) => (
              <Button
                key={user.id}
                className="w-full justify-between py-6 group transition-all"
                onClick={() => handleLogin(user.username)}
                disabled={loginInProgress}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-tiffany/20 to-aqua/20 flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.displayName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-tiffany font-bold">{user.displayName[0]}</span>
                    )}
                  </div>
                  <div className="text-right mr-3">
                    <div className="font-bold">{user.displayName}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {getRoleName(user.role)}
                    </div>
                  </div>
                </div>
                <LogIn className="h-5 w-5 transform transition-transform group-hover:translate-x-[-4px]" />
              </Button>
            ))}
          </CardContent>
          <CardFooter className="justify-center text-xs text-slate-500 dark:text-slate-400">
            پرانا - مزایای سلامتی به شکل گیمیفیکیشن
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}