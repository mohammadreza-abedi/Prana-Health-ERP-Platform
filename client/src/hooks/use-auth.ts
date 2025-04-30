/**
 * @file use-auth.ts
 * @description هوک احراز هویت کاربر
 * 
 * این هوک دسترسی به اطلاعات کاربر احراز هویت شده را فراهم می‌کند.
 */

import { useQuery } from '@tanstack/react-query';

// تایپ کاربر
export interface User {
  id: number;
  username: string;
  displayName: string;
  avatar?: string;
  level: number;
  xp: number;
  role: string;
}

// هوک احراز هویت
export function useAuth() {
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  return {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    error,
  };
}

export default useAuth;