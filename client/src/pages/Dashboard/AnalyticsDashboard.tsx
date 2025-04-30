/**
 * @file AnalyticsDashboard.tsx
 * @description داشبورد تحلیلی هوشمند
 * 
 * این کامپوننت صفحه اصلی داشبورد تحلیلی هوشمند را نمایش می‌دهد
 * که با استفاده از هوش مصنوعی، تحلیل‌های پیشرفته‌ای از داده‌های سلامت ارائه می‌کند.
 */

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { 
  Calendar, 
  Activity, 
  LineChart, 
  TrendingUp, 
  Users, 
  Brain,
  Heart, 
  Zap, 
  Smile,
  AlertTriangle,
  Settings2,
  Filter,
  Trophy,
  Target
} from 'lucide-react';
import { addDays, format, subDays, subMonths } from 'date-fns';
import { Switch } from '@/components/ui/switch';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/design-system/atoms/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/atoms/Card';
import { useToast } from '@/hooks/use-toast';

// کامپوننت‌ها
import MetricsOverview from '@/components/dashboard/MetricsOverview';
import HealthInsights from '@/components/dashboard/HealthInsights';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import TrendPrediction from '@/components/dashboard/TrendPrediction';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import TeamComparison from '@/components/dashboard/TeamComparison';
import AnalyticsWidget from '@/components/dashboard/AnalyticsWidget';
import AIRecommendation from '@/components/dashboard/AIRecommendation';
import SentimentAnalysis from '@/components/dashboard/SentimentAnalysis';
import RiskAssessment from '@/components/dashboard/RiskAssessment';

// کامپوننت داشبورد تحلیلی هوشمند
const AnalyticsDashboard: React.FC = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  const [timeRange, setTimeRange] = useState<string>('week');
  const [viewMode, setViewMode] = useState<string>('comprehensive');
  const [aiEnabled, setAiEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // دریافت داده‌های سلامت کاربر
  const { data: healthData, isLoading: isLoadingHealthData } = useQuery({
    queryKey: ['/api/health-metrics', user?.id, timeRange],
    enabled: !!user?.id,
  });
  
  // دریافت داده‌های فعالیت کاربر
  const { data: activityData, isLoading: isLoadingActivityData } = useQuery({
    queryKey: ['/api/activities', user?.id, timeRange],
    enabled: !!user?.id,
  });
  
  // دریافت داده‌های چالش‌ها
  const { data: challengesData, isLoading: isLoadingChallengesData } = useQuery({
    queryKey: ['/api/challenges', user?.id],
    enabled: !!user?.id,
  });
  
  // محاسبه تاریخ‌ها برای فیلتر زمانی
  const getDateRangeLabel = () => {
    const today = new Date();
    switch(timeRange) {
      case 'day':
        return `امروز (${format(today, 'yyyy/MM/dd')})`;
      case 'week':
        return `هفته اخیر (${format(subDays(today, 6), 'yyyy/MM/dd')} تا ${format(today, 'yyyy/MM/dd')})`;
      case 'month':
        return `ماه اخیر (${format(subDays(today, 29), 'yyyy/MM/dd')} تا ${format(today, 'yyyy/MM/dd')})`;
      case 'quarter':
        return `سه ماه اخیر (${format(subMonths(today, 3), 'yyyy/MM/dd')} تا ${format(today, 'yyyy/MM/dd')})`;
      default:
        return '';
    }
  };
  
  // تغییر حالت نمایش در صورت عدم وجود کلید OpenAI
  useEffect(() => {
    if (!aiEnabled) {
      toast({
        title: 'هوش مصنوعی غیرفعال شد',
        description: 'تحلیل‌های مبتنی بر هوش مصنوعی در دسترس نیستند',
      });
    }
  }, [aiEnabled, toast]);
  
  // وضعیت بارگذاری
  const isLoading = isLoadingUser || isLoadingHealthData || isLoadingActivityData || isLoadingChallengesData;
  
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* هدر صفحه */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.h1 
            className="text-2xl md:text-3xl font-bold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            داشبورد تحلیلی هوشمند
          </motion.h1>
          <motion.p 
            className="text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {getDateRangeLabel()}
          </motion.p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="بازه زمانی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">امروز</SelectItem>
              <SelectItem value="week">هفته اخیر</SelectItem>
              <SelectItem value="month">ماه اخیر</SelectItem>
              <SelectItem value="quarter">سه ماه اخیر</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={viewMode} onValueChange={setViewMode}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="حالت نمایش" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comprehensive">نمای جامع</SelectItem>
              <SelectItem value="performance">تمرکز بر عملکرد</SelectItem>
              <SelectItem value="health">تمرکز بر سلامت</SelectItem>
              <SelectItem value="prediction">تمرکز بر پیش‌بینی</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Switch
              checked={aiEnabled}
              onCheckedChange={setAiEnabled}
              id="ai-mode"
            />
            <label htmlFor="ai-mode" className="text-sm cursor-pointer">
              تحلیل هوشمند
            </label>
          </div>
          
          <Button 
            variant="outline"
            size="sm"
            leftIcon={<Settings2 className="h-4 w-4" />}
          >
            تنظیمات
          </Button>
          
          <Button 
            variant="default"
            size="sm"
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            leftIcon={<Trophy className="h-4 w-4" />}
            onClick={() => setLocation('/gamification')}
          >
            سیستم گیمیفیکیشن
          </Button>
        </div>
      </div>
      
      {/* تب‌های داشبورد */}
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-5 md:w-fit">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">نمای کلی</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">بینش‌ها</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">عملکرد</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">مقایسه تیمی</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">ارزیابی ریسک</span>
          </TabsTrigger>
        </TabsList>
        
        {/* نمای کلی */}
        <TabsContent value="overview" className="space-y-6">
          <MetricsOverview 
            data={healthData || []} 
            timeRange={timeRange}
            isLoading={isLoading}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AnalyticsWidget
                title="روند فعالیت‌های اخیر"
                icon={<LineChart className="h-5 w-5 text-primary-500" />}
                onRefresh={() => {}}
                onExpand={() => setActiveTab('performance')}
              >
                <div className="h-64">
                  <PerformanceChart 
                    data={activityData || []} 
                    isLoading={isLoading}
                    simplified={true}
                  />
                </div>
              </AnalyticsWidget>
            </div>
            
            <div>
              <AnalyticsWidget
                title="پیش‌بینی روندها"
                icon={<TrendingUp className="h-5 w-5 text-indigo-500" />}
                onRefresh={() => {}}
                onExpand={() => {}}
                footerAction={{
                  label: "مشاهده جزئیات",
                  onClick: () => setActiveTab('insights')
                }}
              >
                {aiEnabled ? (
                  <TrendPrediction 
                    data={healthData || []} 
                    isLoading={isLoading}
                    simplified={true}
                  />
                ) : (
                  <div className="h-52 flex items-center justify-center flex-col text-center p-4">
                    <Brain className="h-12 w-12 text-muted-foreground mb-2 opacity-30" />
                    <p className="text-muted-foreground mb-2">تحلیل هوشمند غیرفعال است</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAiEnabled(true)}
                    >
                      فعال‌سازی
                    </Button>
                  </div>
                )}
              </AnalyticsWidget>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <AnalyticsWidget
                title="فعالیت‌های اخیر"
                icon={<Zap className="h-5 w-5 text-amber-500" />}
                onRefresh={() => {}}
                onExpand={() => {}}
              >
                <ActivityFeed 
                  data={activityData || []} 
                  isLoading={isLoading}
                  limit={5}
                />
              </AnalyticsWidget>
            </div>
            
            <div>
              <AnalyticsWidget
                title="چالش‌های فعال"
                subtitle="سیستم گیمیفیکیشن"
                icon={<Trophy className="h-5 w-5 text-amber-500" />}
                onRefresh={() => {}}
                onExpand={() => {}}
                footerAction={{
                  label: "مشاهده همه چالش‌ها",
                  onClick: () => setLocation('/gamification')
                }}
              >
                <div className="p-1 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-900/30">
                        <Target className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">پیاده‌روی روزانه</p>
                        <p className="text-xs text-muted-foreground">۸۵٪ تکمیل شده</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => setLocation('/gamification')}
                    >
                      مشاهده
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                        <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">تمرین یوگا</p>
                        <p className="text-xs text-muted-foreground">۳ روز از ۷ روز</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => setLocation('/gamification')}
                    >
                      مشاهده
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30">
                        <Smile className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">تغذیه سالم</p>
                        <p className="text-xs text-muted-foreground">فقط ۳ روز باقی مانده</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => setLocation('/gamification')}
                    >
                      مشاهده
                    </Button>
                  </div>
                </div>
              </AnalyticsWidget>
            </div>
          </div>
        </TabsContent>
        
        {/* بینش‌ها */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 text-purple-500 mr-2" />
                    بینش‌های هوشمند
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {aiEnabled ? (
                    <AIRecommendation
                      data={healthData || []} 
                      isLoading={isLoading}
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center flex-col text-center">
                      <Brain className="h-16 w-16 text-muted-foreground mb-3 opacity-30" />
                      <p className="text-lg text-muted-foreground mb-2">تحلیل هوشمند غیرفعال است</p>
                      <p className="text-muted-foreground mb-4 max-w-md">
                        با فعال‌سازی تحلیل هوشمند، هوش مصنوعی داده‌های سلامت شما را بررسی کرده و 
                        توصیه‌های شخصی‌سازی شده ارائه می‌دهد.
                      </p>
                      <Button 
                        variant="primary"
                        onClick={() => setAiEnabled(true)}
                      >
                        فعال‌سازی تحلیل هوشمند
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-indigo-500 mr-2" />
                    پیش‌بینی روندها
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {aiEnabled ? (
                    <TrendPrediction
                      data={healthData || []} 
                      isLoading={isLoading}
                      simplified={false}
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">تحلیل هوشمند غیرفعال است</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smile className="h-5 w-5 text-green-500 mr-2" />
                    تحلیل احساسات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {aiEnabled ? (
                    <SentimentAnalysis
                      data={healthData || []} 
                      isLoading={isLoading}
                      simplified={false}
                    />
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">تحلیل هوشمند غیرفعال است</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    سلامت قلبی-عروقی
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <HealthInsights
                    data={healthData || []} 
                    isLoading={isLoading}
                    type="heart"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* عملکرد */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 text-blue-500 mr-2" />
                تحلیل عملکرد
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <PerformanceChart
                data={activityData || []} 
                isLoading={isLoading}
                simplified={false}
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 text-green-500 mr-2" />
                  فعالیت‌های اخیر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityFeed
                  data={activityData || []} 
                  isLoading={isLoading}
                  limit={10}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
                  روند پیشرفت
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* دیتا نداریم، فعلا خالی باشد */}
                <div className="min-h-[300px]"></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* مقایسه تیمی */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                مقایسه با تیم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TeamComparison
                userId={user?.id} 
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* ارزیابی ریسک */}
        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-warning-500 mr-2" />
                ارزیابی ریسک سلامت
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aiEnabled ? (
                <RiskAssessment
                  data={healthData || []} 
                  isLoading={isLoading}
                />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center flex-col text-center p-6">
                  <AlertTriangle className="h-16 w-16 text-muted-foreground mb-3 opacity-30" />
                  <p className="text-lg text-muted-foreground mb-2">ارزیابی ریسک غیرفعال است</p>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    با فعال‌سازی تحلیل هوشمند، هوش مصنوعی داده‌های سلامت شما را بررسی کرده و 
                    ریسک‌های احتمالی را شناسایی می‌کند.
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => setAiEnabled(true)}
                  >
                    فعال‌سازی ارزیابی ریسک
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;