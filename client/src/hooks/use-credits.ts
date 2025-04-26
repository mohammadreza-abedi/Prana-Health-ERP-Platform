import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export interface CreditTransaction {
  id: number;
  userId: number;
  amount: number;
  balance: number;
  description: string;
  actionType: string;
  resourceId?: number;
  resourceType?: string;
  createdAt: string;
}

export interface SpendCreditsParams {
  amount: number;
  actionType: string;
  description: string;
  resourceId?: number;
  resourceType?: string;
}

export function useCredits() {
  const { toast } = useToast();

  // Get user credits
  const {
    data: creditsData,
    isLoading: isLoadingCredits,
    error: creditsError,
  } = useQuery({
    queryKey: ['/api/credits'],
    retry: false,
  });

  // Get credit transactions
  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    error: transactionsError,
  } = useQuery({
    queryKey: ['/api/credit-transactions'],
    retry: false,
  });

  // Spend credits mutation
  const spendCreditsMutation = useMutation({
    mutationFn: async ({ amount, actionType, description, resourceId, resourceType }: SpendCreditsParams) => {
      const res = await apiRequest('POST', '/api/credit-transactions', {
        amount: -Math.abs(amount), // Always negative for spending
        actionType,
        description,
        resourceId,
        resourceType,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/credits'] });
      queryClient.invalidateQueries({ queryKey: ['/api/credit-transactions'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطا در کسر اعتبار',
        description: error.message === 'Insufficient credits' 
          ? 'اعتبار شما برای انجام این عملیات کافی نیست.'
          : 'مشکلی در کسر اعتبار بوجود آمد. لطفا دوباره تلاش کنید.',
        variant: 'destructive',
      });
    },
  });

  // Add credits mutation (admin only)
  const addCreditsMutation = useMutation({
    mutationFn: async ({ amount, actionType, description, resourceId, resourceType }: SpendCreditsParams) => {
      const res = await apiRequest('POST', '/api/credit-transactions', {
        amount: Math.abs(amount), // Always positive for adding
        actionType,
        description,
        resourceId,
        resourceType,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/credits'] });
      queryClient.invalidateQueries({ queryKey: ['/api/credit-transactions'] });
      toast({
        title: 'اعتبار اضافه شد',
        description: 'اعتبار با موفقیت به حساب کاربر اضافه شد.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'خطا در افزودن اعتبار',
        description: 'مشکلی در افزودن اعتبار بوجود آمد. لطفا دوباره تلاش کنید.',
        variant: 'destructive',
      });
    },
  });

  return {
    credits: creditsData?.credits || 0,
    isLoadingCredits,
    creditsError,
    transactions: transactions as CreditTransaction[] || [],
    isLoadingTransactions,
    transactionsError,
    spendCredits: spendCreditsMutation.mutate,
    isPendingSpend: spendCreditsMutation.isPending,
    addCredits: addCreditsMutation.mutate,
    isPendingAdd: addCreditsMutation.isPending,
  };
}