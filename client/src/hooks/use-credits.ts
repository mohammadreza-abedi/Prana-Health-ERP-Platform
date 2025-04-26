import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export interface CreditTransaction {
  id: number;
  userId: number;
  amount: number;
  actionType: string;
  description: string;
  resourceId?: number;
  resourceType?: string;
  createdAt: string;
  updatedAt: string;
}

export function useCredits() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Get user credit balance
  const { data: credits, isLoading: isLoadingCredits } = useQuery<number>({
    queryKey: ['/api/credits/balance'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/credits/balance');
        return await response.json();
      } catch (error) {
        console.error('Error fetching credit balance:', error);
        return 0; // Default to 0 if there's an error
      }
    },
  });
  
  // Get credit transactions history
  const { data: transactions, isLoading: isLoadingTransactions } = useQuery<CreditTransaction[]>({
    queryKey: ['/api/credits/transactions'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/credits/transactions');
        return await response.json();
      } catch (error) {
        console.error('Error fetching transactions:', error);
        return []; // Default to empty array if there's an error
      }
    },
  });
  
  // Add credits mutation
  const { mutate: addCredits, isPending: isAddingCredits } = useMutation({
    mutationFn: async ({ amount, actionType, description, resourceId, resourceType }: {
      amount: number;
      actionType: string;
      description: string;
      resourceId?: number;
      resourceType?: string;
    }) => {
      const response = await apiRequest('POST', '/api/credits/add', {
        amount,
        actionType,
        description,
        resourceId,
        resourceType,
      });
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/credits/balance'] });
      queryClient.invalidateQueries({ queryKey: ['/api/credits/transactions'] });
      
      toast({
        title: 'اعتبار افزوده شد',
        description: 'اعتبار با موفقیت به حساب شما اضافه شد.',
        variant: 'default',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در افزودن اعتبار',
        description: error.message || 'مشکلی در افزودن اعتبار پیش آمد. لطفا دوباره تلاش کنید.',
        variant: 'destructive',
      });
    },
  });
  
  // Spend credits mutation
  const { mutate: spendCredits, isPending: isSpendingCredits } = useMutation({
    mutationFn: async ({ amount, actionType, description, resourceId, resourceType }: {
      amount: number;
      actionType: string;
      description: string;
      resourceId?: number;
      resourceType?: string;
    }) => {
      const response = await apiRequest('POST', '/api/credits/spend', {
        amount: -Math.abs(amount), // Ensure amount is negative for spending
        actionType,
        description,
        resourceId,
        resourceType,
      });
      return await response.json();
    },
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/credits/balance'] });
      queryClient.invalidateQueries({ queryKey: ['/api/credits/transactions'] });
      
      toast({
        title: 'اعتبار مصرف شد',
        description: 'اعتبار با موفقیت از حساب شما کسر شد.',
        variant: 'default',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در مصرف اعتبار',
        description: error.message || 'مشکلی در کسر اعتبار پیش آمد. لطفا دوباره تلاش کنید.',
        variant: 'destructive',
      });
    },
  });
  
  // Convert XP to credits mutation
  const { mutate: convertXpToCredits, isPending: isConvertingXpToCredits } = useMutation({
    mutationFn: async (xpAmount: number) => {
      const response = await apiRequest('POST', '/api/credits/convert-xp', {
        xpAmount,
      });
      return await response.json();
    },
    onSuccess: (data) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/credits/balance'] });
      queryClient.invalidateQueries({ queryKey: ['/api/credits/transactions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] }); // To update user XP
      
      toast({
        title: 'تبدیل موفقیت‌آمیز',
        description: `${data.xpAmount} امتیاز تجربه با موفقیت به ${data.creditsAmount} اعتبار تبدیل شد.`,
        variant: 'default',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در تبدیل XP',
        description: error.message || 'مشکلی در تبدیل امتیاز تجربه به اعتبار پیش آمد. لطفا دوباره تلاش کنید.',
        variant: 'destructive',
      });
    },
  });
  
  // Function to check if user has enough credits
  const hasEnoughCredits = (amount: number): boolean => {
    return (credits || 0) >= amount;
  };
  
  return {
    credits,
    transactions,
    isLoadingCredits,
    isLoadingTransactions,
    addCredits,
    isAddingCredits,
    spendCredits,
    isSpendingCredits,
    convertXpToCredits,
    isConvertingXpToCredits,
    hasEnoughCredits,
  };
}