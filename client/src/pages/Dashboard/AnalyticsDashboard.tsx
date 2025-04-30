/**
 * @file AnalyticsDashboard.tsx
 * @description داشبورد تحلیلی پیشرفته مبتنی بر هوش مصنوعی
 * 
 * این کامپوننت داشبورد اصلی تحلیلی با اتصال به هوش مصنوعی را نمایش می‌دهد
 * و شامل ویژگی‌های مختلف تحلیلی، نمودارها و بینش‌های هوشمند است.
 */

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  Activity, BrainCircuit, Calendar, Clock, BarChart3, 
  Users, TrendingUp, LineChart, AlertTriangle, Heart,
  BarChart, PieChart, Radar, Target, Zap, Award, 
  BookOpen, ChevronDown, ChevronRight, Settings, Filter,
  RefreshCcw, Download, Share2, Save, Menu,
  Maximize2, Minimize2, Info
} from 'lucide-react';

// کامپوننت‌های داشبورد
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

// کامپوننت‌های UI
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/design-system/atoms/Card';
import { Button } from '@/design-system/atoms/Button';
import { DataCard } from '@/design-system/molecules/DataCard';

// تایپ‌های داده
type TimeRange = '1d' | '7d' | '30d' | '90d' | '1y' | 'all';

// پلتفرم تحلیلی پیشرفته
const AnalyticsDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    metrics: true,
    health: true,
    performance: true,
    trends: true,
    activities: true,
    teams: true,
    predictions: false,
    risks: false,
  });
  
  // دریافت داده‌های مترکیس
  const { data: healthMetrics, isLoading: isLoadingMetrics } = useQuery({
    queryKey: ['/api/health-metrics'],
    enabled: !!user,
  });
  
  // دریافت چالش‌های کاربر
  const { data: challenges, isLoading: isLoadingChallenges } = useQuery({
    queryKey: ['/api/user-challenges'],
    enabled: !!user,
  });
  
  // دریافت بینش‌های سلامت با هوش مصنوعی
  const { data: aiHealthInsights, isLoading: isLoadingHealthInsights, refetch: refetchHealthInsights } = useQuery({
    queryKey: ['/api/ai/health-insights'],
    enabled: false, // به صورت دستی اجرا می‌شود
  });
  
  // درخواست تحلیل توسط هوش مصنوعی
  const analyzeWithAIMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/ai/analyze", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "تحلیل انجام شد",
        description: "نتایج تحلیل با هوش مصنوعی با موفقیت دریافت شد",
      });
      setIsAIGenerating(false);
    },
    onError: (error: any) => {
      toast({
        title: "خطا در تحلیل",
        description: error.message || "خطایی در تحلیل با هوش مصنوعی رخ داد",
        variant: "destructive",
      });
      setIsAIGenerating(false);
    }
  });
  
  // درخواست پیش‌بینی روند توسط هوش مصنوعی
  const predictTrendsMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/ai/predict-trends", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "پیش‌بینی روند انجام شد",
        description: "نتایج پیش‌بینی روند با هوش مصنوعی با موفقیت دریافت شد",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطا در پیش‌بینی روند",
        description: error.message || "خطایی در پیش‌بینی روند با هوش مصنوعی رخ داد",
        variant: "destructive",
      });
    }
  });
  
  // دریافت بینش‌های سلامت
  const generateHealthInsights = async () => {
    setIsAIGenerating(true);
    try {
      await refetchHealthInsights();
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطایی در دریافت بینش‌های سلامت رخ داد",
        variant: "destructive",
      });
      setIsAIGenerating(false);
    }
  };
  
  // پیش‌بینی روند داده‌ها
  const generateTrendPrediction = async (data: any) => {
    setIsAIGenerating(true);
    try {
      await predictTrendsMutation.mutateAsync({
        data: data,
        timeframe: 'next quarter',
        options: {
          temperature: 0.4,
          format: 'json'
        }
      });
    } catch (error) {
      setIsAIGenerating(false);
    }
  };
  
  // تغییر وضعیت بخش‌های گسترش‌یافته
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // داده‌های نمایشی خلاصه
  const summaryData = [
    { 
      title: "امتیاز سلامت", 
      value: 87, 
      trend: { value: 3.2, direction: 'up', timeframe: 'هفتگی' },
      icon: <Heart className="h-5 w-5 text-tiffany" />,
      state: "positive",
    },
    { 
      title: "تکمیل چالش‌ها", 
      value: "68%", 
      trend: { value: 5.7, direction: 'up', timeframe: 'ماهانه' },
      icon: <Award className="h-5 w-5 text-amber-500" />,
      state: "positive",
    },
    { 
      title: "فعالیت روزانه", 
      value: "7.3", 
      trend: { value: 1.5, direction: 'down', timeframe: 'هفتگی' },
      icon: <Activity className="h-5 w-5 text-error-500" />,
      state: "negative",
    },
    { 
      title: "سطح استرس", 
      value: "42%", 
      trend: { value: 8.1, direction: 'down', timeframe: 'ماهانه' },
      icon: <Zap className="h-5 w-5 text-green-500" />,
      state: "positive",
    },
  ];
  
  return (
    <div className="flex flex-col w-full bg-dmr-background p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* هدر داشبورد */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <BrainCircuit className="mr-2 h-8 w-8 text-primary-600" />
            داشبورد تحلیلی هوشمند
          </h1>
          <p className="text-muted-foreground mt-1">
            تحلیل‌های پیشرفته و بینش‌های هوشمند مبتنی بر هوش مصنوعی
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* فیلتر زمانی */}
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm flex items-center p-1">
            {['1d', '7d', '30d', '90d', '1y', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as TimeRange)}
                className={`px-3 py-1.5 text-xs rounded-md ${
                  timeRange === range 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {range === '1d' ? 'امروز' : 
                 range === '7d' ? '۱ هفته' : 
                 range === '30d' ? '۱ ماه' : 
                 range === '90d' ? '۳ ماه' : 
                 range === '1y' ? '۱ سال' : 'همه'}
              </button>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<RefreshCcw className="h-4 w-4" />}
          >
            بروزرسانی
          </Button>
          
          <Button 
            variant="primary" 
            size="sm"
            leftIcon={<Filter className="h-4 w-4" />}
          >
            فیلترها
          </Button>
        </div>
      </div>
      
      {/* کارت‌های خلاصه */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {summaryData.map((item, index) => (
          <DataCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
            trend={item.trend}
            state={item.state as any}
            layout="simple"
          />
        ))}
      </div>
      
      {/* بخش بینش‌های هوش مصنوعی */}
      <Card className="mb-6 border-2 border-tiffany/20 bg-gradient-to-br from-white to-tiffany/5 dark:from-gray-900 dark:to-tiffany/10">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl flex items-center">
              <BrainCircuit className="mr-2 h-6 w-6 text-tiffany" />
              بینش‌های هوشمند با هوش مصنوعی
            </CardTitle>
            
            <Button
              variant="outline"
              size="sm"
              leftIcon={<RefreshCcw className="h-4 w-4" />}
              onClick={generateHealthInsights}
              disabled={isAIGenerating}
            >
              {isAIGenerating ? 'در حال تحلیل...' : 'تحلیل جدید'}
            </Button>
          </div>
          <CardDescription>
            بینش‌های تولید شده توسط هوش مصنوعی بر اساس داده‌های سلامت شما
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <AIRecommendation 
            insights={aiHealthInsights?.content || null}
            isLoading={isLoadingHealthInsights || isAIGenerating}
          />
        </CardContent>
      </Card>
      
      {/* بخش اصلی داشبورد با ویژگی‌های متنوع */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون اول */}
        <div className="lg:col-span-2 space-y-6">
          {/* چارت عملکرد */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center cursor-pointer" onClick={() => toggleSection('performance')}>
                  {expandedSections.performance ? <ChevronDown className="h-5 w-5 mr-1" /> : <ChevronRight className="h-5 w-5 mr-1" />}
                  <BarChart3 className="h-5 w-5 mr-2 text-primary-600" />
                  تحلیل عملکرد سلامت
                </CardTitle>
                
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            {expandedSections.performance && (
              <CardContent>
                <PerformanceChart 
                  data={healthMetrics || []} 
                  timeRange={timeRange}
                  isLoading={isLoadingMetrics}
                />
              </CardContent>
            )}
          </Card>
          
          {/* پیش‌بینی روند */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center cursor-pointer" onClick={() => toggleSection('trends')}>
                  {expandedSections.trends ? <ChevronDown className="h-5 w-5 mr-1" /> : <ChevronRight className="h-5 w-5 mr-1" />}
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  پیش‌بینی روندها
                </CardTitle>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateTrendPrediction(healthMetrics || [])}
                  disabled={predictTrendsMutation.isPending}
                >
                  {predictTrendsMutation.isPending ? 'در حال پیش‌بینی...' : 'پیش‌بینی جدید'}
                </Button>
              </div>
            </CardHeader>
            
            {expandedSections.trends && (
              <CardContent>
                <TrendPrediction
                  data={predictTrendsMutation.data?.content || null}
                  isLoading={predictTrendsMutation.isPending}
                />
              </CardContent>
            )}
          </Card>
          
          {/* تحلیل ریسک */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center cursor-pointer" onClick={() => toggleSection('risks')}>
                  {expandedSections.risks ? <ChevronDown className="h-5 w-5 mr-1" /> : <ChevronRight className="h-5 w-5 mr-1" />}
                  <AlertTriangle className="h-5 w-5 mr-2 text-warning-500" />
                  ارزیابی ریسک
                </CardTitle>
              </div>
            </CardHeader>
            
            {expandedSections.risks && (
              <CardContent>
                <RiskAssessment
                  data={healthMetrics || []}
                  isLoading={isLoadingMetrics}
                />
              </CardContent>
            )}
          </Card>
        </div>
        
        {/* ستون دوم */}
        <div className="space-y-6">
          {/* بینش‌های سلامت */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center cursor-pointer" onClick={() => toggleSection('health')}>
                  {expandedSections.health ? <ChevronDown className="h-5 w-5 mr-1" /> : <ChevronRight className="h-5 w-5 mr-1" />}
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  بینش‌های سلامت
                </CardTitle>
              </div>
            </CardHeader>
            
            {expandedSections.health && (
              <CardContent>
                <HealthInsights 
                  data={healthMetrics || []} 
                  isLoading={isLoadingMetrics}
                />
              </CardContent>
            )}
          </Card>
          
          {/* فید فعالیت‌ها */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center cursor-pointer" onClick={() => toggleSection('activities')}>
                  {expandedSections.activities ? <ChevronDown className="h-5 w-5 mr-1" /> : <ChevronRight className="h-5 w-5 mr-1" />}
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  فعالیت‌های اخیر
                </CardTitle>
              </div>
            </CardHeader>
            
            {expandedSections.activities && (
              <CardContent>
                <ActivityFeed 
                  data={challenges || []} 
                  isLoading={isLoadingChallenges}
                />
              </CardContent>
            )}
          </Card>
          
          {/* مقایسه تیمی */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center cursor-pointer" onClick={() => toggleSection('teams')}>
                  {expandedSections.teams ? <ChevronDown className="h-5 w-5 mr-1" /> : <ChevronRight className="h-5 w-5 mr-1" />}
                  <Users className="h-5 w-5 mr-2 text-purple-500" />
                  مقایسه با تیم
                </CardTitle>
              </div>
            </CardHeader>
            
            {expandedSections.teams && (
              <CardContent>
                <TeamComparison 
                  userId={user?.id}
                  isLoading={false}
                />
              </CardContent>
            )}
          </Card>
          
          {/* تحلیل احساسات */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Radar className="h-5 w-5 mr-2 text-amber-500" />
                  تحلیل احساسات
                </CardTitle>
              </div>
            </CardHeader>
            
            <CardContent>
              <SentimentAnalysis />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;