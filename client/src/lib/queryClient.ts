import { QueryClient } from '@tanstack/react-query';

type FetchParams = {
  on401?: 'redirect' | 'returnNull';
};

// ایجاد کلاینت کوئری
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// تابع فچر پیش‌فرض
export const getQueryFn = (params: FetchParams = {}) => {
  return async ({ queryKey }: { queryKey: unknown[] }) => {
    const endpoint = queryKey[0] as string;
    const res = await fetch(endpoint);

    if (res.status === 401) {
      if (params.on401 === 'returnNull') {
        return null;
      }
      
      if (params.on401 === 'redirect') {
        window.location.href = '/auth';
        return null;
      }
      
      throw new Error('Unauthorized');
    }

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    return res.json();
  };
};

// تابع درخواست API کاستوم
export async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  body?: any
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(endpoint, options);
}