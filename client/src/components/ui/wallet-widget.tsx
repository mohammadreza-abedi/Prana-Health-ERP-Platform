import { useState } from 'react';
import { useCredits } from '@/hooks/use-credits';
import { useAuth } from '@/lib/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  Wallet,
  CreditCard,
  Coins,
  ArrowUp,
  ArrowDown,
  Award,
  Clock,
  Star,
  Plus,
  BarChart,
  Gift,
  ArrowUpRight,
  History,
  RefreshCw,
  Contact
} from 'lucide-react';

interface CreditPlan {
  id: string;
  title: string;
  description: string;
  amount: number;
  price: number;
  discount?: number;
  popular?: boolean;
  features?: string[];
}

const creditPlans: CreditPlan[] = [
  {
    id: 'basic',
    title: 'بسته پایه',
    description: 'مناسب برای استفاده شخصی',
    amount: 100,
    price: 10000,
    features: [
      'دسترسی به ابزارهای پایه',
      'استفاده از چالش‌های روزانه',
      'مشاهده وضعیت سلامت',
    ]
  },
  {
    id: 'premium',
    title: 'بسته ویژه',
    description: 'مناسب برای استفاده حرفه‌ای',
    amount: 300,
    price: 25000,
    discount: 15,
    popular: true,
    features: [
      'دسترسی به همه ابزارها',
      'تحلیل پیشرفته داده‌های سلامت',
      'پشتیبانی از چالش‌های گروهی',
      'آنالیز هوشمند عملکرد',
    ]
  },
  {
    id: 'pro',
    title: 'بسته حرفه‌ای',
    description: 'مناسب برای مدیران ارشد',
    amount: 800,
    price: 60000,
    discount: 20,
    features: [
      'دسترسی به همه امکانات پلتفرم',
      'گزارش‌های اختصاصی سلامت',
      'آنالیز هوشمند عملکرد تیمی',
      'مشاوره آنلاین با متخصصین',
      'ابزارهای پیش‌بینی روندها',
    ]
  }
];

// معادل امتیازات برای تبدیل
const XP_TO_CREDIT_RATIO = 10; // هر 10 امتیاز = 1 اعتبار

export function WalletWidget() {
  const { user } = useAuth();
  const { credits, isLoadingCredits, transactions, spendCredits } = useCredits();
  const [activeTab, setActiveTab] = useState('overview');
  const [showConvertXP, setShowConvertXP] = useState(false);
  const [convertAmount, setConvertAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // اطلاعات کاربر
  const userXP = user?.xp || 0;
  const userLevel = user?.level || 1;
  
  // محاسبه حداکثر اعتباری که می‌توان از امتیازات تبدیل کرد
  const maxConvertibleCredits = Math.floor(userXP / XP_TO_CREDIT_RATIO);
  
  // آخرین تراکنش‌ها
  const recentTransactions = transactions?.slice(0, 5) || [];
  
  // تبدیل تاریخ به فرمت فارسی
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // استفاده از Intl برای فرمت فارسی
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // دریافت نوع آیکون برای هر تراکنش
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <CreditCard className="h-4 w-4 text-blue-500" />;
      case 'spend':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      case 'reward':
        return <Gift className="h-4 w-4 text-green-500" />;
      case 'convert':
        return <RefreshCw className="h-4 w-4 text-purple-500" />;
      default:
        return <History className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // فرایند تبدیل XP به اعتبار
  const handleConvertXP = async () => {
    if (convertAmount <= 0 || convertAmount > maxConvertibleCredits) {
      toast({
        title: 'خطا در تبدیل',
        description: 'مقدار وارد شده معتبر نیست',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // فراخوانی API برای تبدیل XP به اعتبار
      const response = await apiRequest('POST', '/api/convert-xp', {
        amount: convertAmount,
        xpAmount: convertAmount * XP_TO_CREDIT_RATIO,
      });
      
      if (response.ok) {
        toast({
          title: 'تبدیل موفقیت‌آمیز',
          description: `${convertAmount * XP_TO_CREDIT_RATIO} امتیاز با موفقیت به ${convertAmount} اعتبار تبدیل شد`,
        });
        setShowConvertXP(false);
        setConvertAmount(0);
      } else {
        throw new Error('خطا در تبدیل امتیاز به اعتبار');
      }
    } catch (error) {
      toast({
        title: 'خطا در تبدیل',
        description: 'مشکلی در فرایند تبدیل رخ داد. لطفا دوباره تلاش کنید',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // خرید اعتبار
  const handlePurchasePlan = async (plan: CreditPlan) => {
    try {
      // در اینجا به صفحه پرداخت منتقل می‌شویم
      toast({
        title: 'انتقال به درگاه پرداخت',
        description: `در حال آماده‌سازی خرید بسته ${plan.title}`,
      });
      
      // ارسال کاربر به صفحه پرداخت (شبیه‌سازی شده)
      // در پروژه واقعی، اینجا باید ارتباط با درگاه پرداخت برقرار شود
      setTimeout(() => {
        toast({
          title: 'خرید موفقیت‌آمیز',
          description: `${plan.amount} اعتبار با موفقیت به حساب شما اضافه شد`,
        });
      }, 2000);
    } catch (error) {
      toast({
        title: 'خطا در خرید',
        description: 'مشکلی در فرایند خرید رخ داد. لطفا دوباره تلاش کنید',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wallet className="h-5 w-5 text-tiffany" />
          کیف پول دیجیتال
        </h3>
        <Badge variant="outline" className="bg-tiffany/10 text-tiffany border-tiffany/20">
          {credits} اعتبار
        </Badge>
      </div>

      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview" className="text-xs">
              <BarChart className="h-4 w-4 ml-1" />
              وضعیت کلی
            </TabsTrigger>
            <TabsTrigger value="buy" className="text-xs">
              <CreditCard className="h-4 w-4 ml-1" />
              خرید اعتبار
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs">
              <Clock className="h-4 w-4 ml-1" />
              تراکنش‌ها
            </TabsTrigger>
          </TabsList>
          
          {/* بخش وضعیت کلی */}
          <TabsContent value="overview" className="mt-0 p-4 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-4">
              <div className="flex justify-between">
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">موجودی اعتبار</span>
                  <div className="text-2xl font-bold text-tiffany flex items-center gap-1">
                    <Coins className="h-5 w-5" />
                    {credits}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">امتیاز (XP)</span>
                  <div className="text-2xl font-bold text-amber-500 flex items-center gap-1">
                    <Star className="h-5 w-5" />
                    {userXP}
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">تبدیل XP به اعتبار</span>
                  </div>
                  <Dialog open={showConvertXP} onOpenChange={setShowConvertXP}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="text-xs">
                        <RefreshCw className="h-3 w-3 ml-1" />
                        تبدیل
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>تبدیل امتیاز به اعتبار</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex justify-between text-sm">
                          <span>امتیاز قابل تبدیل:</span>
                          <span className="font-bold">{userXP}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>حداکثر اعتبار قابل دریافت:</span>
                          <span className="font-bold">{maxConvertibleCredits}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>نرخ تبدیل:</span>
                          <span>هر {XP_TO_CREDIT_RATIO} امتیاز = ۱ اعتبار</span>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <label htmlFor="convert-amount" className="text-sm font-medium">
                            میزان اعتبار مورد نظر برای تبدیل:
                          </label>
                          <input
                            id="convert-amount"
                            type="number"
                            min="1"
                            max={maxConvertibleCredits}
                            value={convertAmount}
                            onChange={(e) => setConvertAmount(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-tiffany"
                          />
                          <div className="text-sm text-slate-500">
                            {convertAmount > 0 ? (
                              <span>با این تبدیل، {convertAmount * XP_TO_CREDIT_RATIO} امتیاز مصرف خواهد شد.</span>
                            ) : (
                              <span>لطفاً مقدار مورد نظر خود را وارد کنید.</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowConvertXP(false)}
                        >
                          انصراف
                        </Button>
                        <Button 
                          onClick={handleConvertXP} 
                          disabled={convertAmount <= 0 || convertAmount > maxConvertibleCredits || isSubmitting}
                        >
                          {isSubmitting ? 'در حال پردازش...' : 'تبدیل امتیاز'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    می‌توانید امتیازات خود را به اعتبار تبدیل کنید و از آن برای استفاده از ابزارهای پیشرفته استفاده نمایید.
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white dark:bg-slate-900 rounded-lg p-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">تراکنش‌های اخیر</span>
                    <span className="text-lg font-bold">{transactions?.length || 0}</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-lg p-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">سطح کاربری</span>
                    <span className="text-lg font-bold">{userLevel}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button size="sm" variant="ghost" className="text-xs" onClick={() => setActiveTab('buy')}>
                  خرید اعتبار بیشتر
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* بخش خرید اعتبار */}
          <TabsContent value="buy" className="mt-0 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {creditPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`rounded-lg border ${plan.popular ? 'border-tiffany shadow-md dark:border-opacity-50' : 'border-slate-200 dark:border-slate-800'} overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="bg-tiffany text-white text-center py-1 text-xs font-medium">
                      پیشنهاد ویژه
                    </div>
                  )}
                  <div className="p-4 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg">{plan.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-extrabold">{plan.amount}</span>
                      <span className="text-slate-500 dark:text-slate-400 text-sm mb-1">اعتبار</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {plan.discount ? (
                        <>
                          <span className="text-lg font-bold">{Math.round(plan.price * (1 - plan.discount / 100)).toLocaleString()}</span>
                          <span className="text-slate-500 line-through text-sm">{plan.price.toLocaleString()} تومان</span>
                          <Badge variant="outline" className="bg-red-50 text-red-500 border-red-100 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                            {plan.discount}٪ تخفیف
                          </Badge>
                        </>
                      ) : (
                        <span className="text-lg font-bold">{plan.price.toLocaleString()} تومان</span>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <span className="text-sm font-medium">ویژگی‌ها:</span>
                      <ul className="space-y-1">
                        {plan.features?.map((feature, index) => (
                          <li key={index} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 min-w-[18px] min-h-[18px] flex items-center justify-center mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-tiffany hover:bg-tiffany/90' : ''}`}
                      onClick={() => handlePurchasePlan(plan)}
                    >
                      خرید بسته
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* بخش تراکنش‌ها */}
          <TabsContent value="transactions" className="mt-0 p-4">
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-3">تاریخچه تراکنش‌ها</h3>
              
              <ScrollArea className="h-[240px]">
                <div className="space-y-3">
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="bg-white dark:bg-slate-900 rounded-lg p-3 flex justify-between items-center">
                        <div className="flex gap-3 items-center">
                          <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-2">
                            {getTransactionIcon(transaction.actionType)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{transaction.description}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(transaction.createdAt)}</p>
                          </div>
                        </div>
                        <div className={`font-bold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                      <History className="h-10 w-10 mx-auto mb-2 opacity-20" />
                      <p>هیچ تراکنشی ثبت نشده است</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}