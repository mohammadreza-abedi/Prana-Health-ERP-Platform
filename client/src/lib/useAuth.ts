import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';

// مدل داده‌ی کاربر
interface User {
  id: number;
  username: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  role: string;
  department?: string;
  level: number;
  xp: number;
  createdAt: string;
}

// تابع دریافت اطلاعات کاربر
export function useAuth() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  // تابع ورود کاربر
  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'خطا در ورود');
      }

      return await res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['/api/auth/me'], user);
    },
  });

  // تابع ثبت‌نام کاربر
  const registerMutation = useMutation({
    mutationFn: async (userData: {
      username: string;
      password: string;
      email: string;
      displayName?: string;
    }) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'خطا در ثبت‌نام');
      }

      return await res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(['/api/auth/me'], user);
    },
  });

  // تابع خروج کاربر
  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    queryClient.setQueryData(['/api/auth/me'], null);
    queryClient.invalidateQueries();
  };

  return {
    user,
    isLoading,
    error,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoginPending: loginMutation.isPending,
    isRegisterPending: registerMutation.isPending,
  };
}