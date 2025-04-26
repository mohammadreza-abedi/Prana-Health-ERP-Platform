import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from './queryClient';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/types';

export function useAuth() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const { data: user, error } = useQuery<User | null>({
    queryKey: ['/api/auth/me'],
    onSettled: () => {
      setIsLoading(false);
    },
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      setIsLoading(false);
    }
  }, [error]);

  const login = async (username: string, password: string) => {
    try {
      const res = await apiRequest('POST', '/api/auth/login', { username, password });
      const userData = await res.json();
      
      await queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      
      toast({
        title: 'ورود موفق',
        description: `${userData.displayName} خوش آمدید`,
        variant: 'default',
      });
      
      return userData;
    } catch (error) {
      toast({
        title: 'خطا در ورود',
        description: 'نام کاربری یا رمز عبور اشتباه است',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout');
      
      queryClient.setQueryData(['/api/auth/me'], null);
      queryClient.invalidateQueries();
      
      toast({
        title: 'خروج موفق',
        description: 'با موفقیت از حساب کاربری خود خارج شدید',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'خطا در خروج',
        description: 'مشکلی در خروج از حساب کاربری رخ داد',
        variant: 'destructive',
      });
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
