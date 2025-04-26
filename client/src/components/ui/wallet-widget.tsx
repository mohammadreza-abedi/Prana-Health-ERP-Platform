import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Loader2, CreditCard, Wallet, RefreshCw, TrendingUp, ArrowRight, Check, Sparkles, Trophy, Zap } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCredits } from '@/hooks/use-credits';
import { useAuth } from '@/lib/useAuth';
import { formatDate, formatNumber } from '@/lib/utils';
import { checkSecrets } from '@/lib/utils';
import { askForStripeKeys } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export function WalletWidget() {
  const { credits, transactions, convertXpToCredits, isConvertingXpToCredits } = useCredits();
  const { user } = useAuth();
  const [xpAmount, setXpAmount] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [stripeKeysAvailable, setStripeKeysAvailable] = useState<boolean>(false);
  
  // بررسی وجود کلیدهای Stripe
  useQuery({
    queryKey: ['stripe-keys-check'],
    queryFn: async () => {
      const results = await checkSecrets(['VITE_STRIPE_PUBLIC_KEY', 'STRIPE_SECRET_KEY']);
      setStripeKeysAvailable(results[0] && results[1]);
      return results;
    },
    staleTime: Infinity, // این بررسی نیاز به اجرای مجدد ندارد
  });
  
  // طرح‌های خرید اعتبار
  const creditPlans = [
    {
      id: 'basic',
      name: 'پایه',
      credits: 100,
      price: 50000,
      discount: 0,
      features: ['دسترسی به ابزارهای پایه', 'پشتیبانی ۲۴/۷', 'به‌روزرسانی‌های رایگان'],
      popular: false,
      color: 'bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-800 dark:to-zinc-950',
    },
    {
      id: 'standard',
      name: 'استاندارد',
      credits: 250,
      price: 100000,
      discount: 20,
      features: ['همه موارد طرح پایه', 'دسترسی به ابزارهای پیشرفته', '۱۰٪ پاداش اضافی در چالش‌ها'],
      popular: true,
      color: 'bg-gradient-to-br from-blue-200 to-blue-400 dark:from-blue-800 dark:to-blue-950',
    },
    {
      id: 'premium',
      name: 'پریمیوم',
      credits: 500,
      price: 180000,
      discount: 30,
      features: ['همه موارد طرح استاندارد', 'نشان‌های انحصاری', '۲۰٪ پاداش اضافی در چالش‌ها', 'تحلیل پیشرفته سلامت'],
      popular: false,
      color: 'bg-gradient-to-br from-purple-200 to-purple-400 dark:from-purple-800 dark:to-purple-950',
    },
  ];
  
  // محاسبه قیمت نهایی با تخفیف
  const calculateFinalPrice = (plan: any) => {
    if (!plan.discount) return plan.price;
    return plan.price * (1 - plan.discount / 100);
  };
  
  // محاسبه مقدار اعتبار حاصل از تبدیل XP
  const calculateCreditsFromXP = () => {
    return Math.floor(xpAmount / 10);
  };
  
  // مدیریت تبدیل XP به اعتبار
  const handleConvertXP = () => {
    if (xpAmount <= 0 || !user || xpAmount > (user.xp || 0)) return;
    convertXpToCredits(xpAmount);
  };
  
  // مدیریت خرید اعتبار
  const handleBuyCredits = () => {
    if (!selectedPlan) return;
    
    if (!stripeKeysAvailable) {
      askForStripeKeys(); // تابعی که از کاربر درخواست کلیدهای Stripe می‌کند
      return;
    }
    
    // در اینجا فرآیند پرداخت با Stripe انجام می‌شود
    // ...
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-primary" />
                کیف پول
              </CardTitle>
              <Badge className="px-3 h-7 bg-primary/10 hover:bg-primary/20 text-primary border-primary/30">
                {formatNumber(credits || 0)} اعتبار
              </Badge>
            </div>
            <CardDescription>
              از اعتبار برای استفاده از ابزارهای هوشمند و ویژگی‌های پیشرفته استفاده کنید.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <div className="grid grid-cols-2 gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <CreditCard className="h-4 w-4 mr-2" />
                    خرید اعتبار
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>خرید اعتبار</DialogTitle>
                    <DialogDescription>
                      یکی از طرح‌های زیر را انتخاب کنید تا اعتبار به حساب شما اضافه شود.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    {creditPlans.map((plan) => (
                      <Card 
                        key={plan.id}
                        className={`relative overflow-hidden ${
                          selectedPlan?.id === plan.id 
                            ? 'ring-2 ring-primary' 
                            : 'ring-1 ring-border hover:ring-primary/50'
                        } cursor-pointer transition-all`}
                        onClick={() => setSelectedPlan(plan)}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 right-0 bg-primary text-xs px-2 py-1 text-primary-foreground">
                            پرطرفدار
                          </div>
                        )}
                        <div className={`${plan.color} h-12 flex items-center justify-center`}>
                          <span className="font-bold text-white text-xl drop-shadow-md">
                            {plan.name}
                          </span>
                        </div>
                        <CardContent className="pt-4 px-3 text-center">
                          <div className="text-3xl font-bold mb-1">
                            {formatNumber(plan.credits)}
                          </div>
                          <div className="text-sm text-muted-foreground mb-3">اعتبار</div>
                          
                          <div className="mb-3">
                            {plan.discount > 0 && (
                              <div className="text-sm text-destructive line-through mb-1">
                                {formatNumber(plan.price)} تومان
                              </div>
                            )}
                            <div className="text-lg font-bold">
                              {formatNumber(calculateFinalPrice(plan))} تومان
                            </div>
                          </div>
                          
                          {selectedPlan?.id === plan.id && (
                            <div className="absolute bottom-3 right-3">
                              <Check className="h-5 w-5 text-primary" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" type="button">
                      انصراف
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={!selectedPlan}
                      onClick={handleBuyCredits}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      پرداخت و خرید اعتبار
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    تبدیل XP به اعتبار
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>تبدیل امتیاز تجربه به اعتبار</DialogTitle>
                    <DialogDescription>
                      امتیاز تجربه (XP) خود را به اعتبار تبدیل کنید. هر 10 امتیاز تجربه معادل 1 اعتبار است.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium flex items-center">
                        <Trophy className="h-4 w-4 mr-1 text-amber-500" />
                        امتیاز تجربه فعلی:
                      </div>
                      <div className="font-bold">{formatNumber(user?.xp || 0)} XP</div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">مقدار XP برای تبدیل:</label>
                      <Input
                        type="number"
                        min="10"
                        step="10"
                        max={user?.xp || 0}
                        value={xpAmount}
                        onChange={(e) => setXpAmount(parseInt(e.target.value) || 0)}
                        className="text-left"
                      />
                      <div className="text-xs text-muted-foreground">
                        * حداقل 10 امتیاز و مضربی از 10
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg">
                      <div className="text-sm font-medium flex items-center">
                        <Zap className="h-4 w-4 mr-1 text-primary" />
                        اعتبار دریافتی:
                      </div>
                      <div className="font-bold">{formatNumber(calculateCreditsFromXP())} اعتبار</div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" type="button">
                      انصراف
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={xpAmount <= 0 || xpAmount > (user?.xp || 0) || xpAmount % 10 !== 0 || isConvertingXpToCredits}
                      onClick={handleConvertXP}
                    >
                      {isConvertingXpToCredits ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                      )}
                      تبدیل به اعتبار
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                گزارش تراکنش‌ها
              </CardTitle>
              <Badge variant="outline" className="px-3">
                {transactions?.length || 0} تراکنش
              </Badge>
            </div>
            <CardDescription>
              تاریخچه خرید، مصرف و دریافت اعتبار در سیستم
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-3">
            <ScrollArea className="h-[200px] rounded-md border p-2">
              {transactions && transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div 
                      key={transaction.id} 
                      className={`flex justify-between items-center p-2 rounded-md border ${
                        transaction.amount > 0 
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      }`}
                    >
                      <div>
                        <div className="font-medium text-sm">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(transaction.createdAt)}
                        </div>
                      </div>
                      <div className={`font-bold ${transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {transaction.amount > 0 ? '+' : ''}{formatNumber(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  هیچ تراکنشی یافت نشد
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <Card className="w-full overflow-hidden border bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-indigo-950">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rtl:divide-x-reverse">
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">خرید اعتبار</h3>
            <p className="text-sm text-muted-foreground mb-4">
              اعتبار خریداری کنید و از تمام امکانات پیشرفته پلتفرم استفاده کنید.
            </p>
            <Button className="w-full" variant="outline">
              خرید آنی
              <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
          </div>
          
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">تبدیل XP به اعتبار</h3>
            <p className="text-sm text-muted-foreground mb-4">
              از امتیازات خود برای تبدیل به اعتبار استفاده کنید. هر 10 امتیاز = 1 اعتبار
            </p>
            <Button className="w-full" variant="outline">
              تبدیل سریع
              <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
          </div>
          
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">اعتبار رایگان</h3>
            <p className="text-sm text-muted-foreground mb-4">
              با تکمیل چالش‌های ویژه و مأموریت‌های پرانا، اعتبار رایگان دریافت کنید.
            </p>
            <Button className="w-full" variant="outline">
              مشاهده چالش‌ها
              <ArrowRight className="h-4 w-4 mr-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}