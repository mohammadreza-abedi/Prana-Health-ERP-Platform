import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from './use-toast';

export interface HealthAnalyticsData {
  dailySteps: number[];
  weeklyActivity: number[];
  sleepQuality: number[];
  hydrationLevel: number[];
  nutritionScore: number[];
  stressLevel: number[];
  dates: string[];
}

export interface HealthMetric {
  id: number;
  userId: number;
  date: string;
  stepCount: number;
  activityMinutes: number;
  sleepHours: number;
  hydrationMl: number;
  nutritionScore: number;
  stressLevel: number;
  notes?: string;
}

export const useHealthAnalytics = (userId: number, dateRange: [string, string]) => {
  const { toast } = useToast();
  const [analyticsData, setAnalyticsData] = useState<HealthAnalyticsData>({
    dailySteps: [],
    weeklyActivity: [],
    sleepQuality: [],
    hydrationLevel: [],
    nutritionScore: [],
    stressLevel: [],
    dates: []
  });

  const { data: healthMetrics, isLoading, error } = useQuery({
    queryKey: ['/api/health-metrics', userId, dateRange],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', `/api/health-metrics?userId=${userId}&startDate=${dateRange[0]}&endDate=${dateRange[1]}`);
        if (!response.ok) {
          throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
        }
        return await response.json() as HealthMetric[];
      } catch (error) {
        console.error('خطا در دریافت داده‌های سلامتی:', error);
        toast({
          title: 'خطا در دریافت داده‌ها',
          description: 'امکان دریافت اطلاعات سلامت وجود ندارد. لطفاً دوباره تلاش کنید.',
          variant: 'destructive',
        });
        return [];
      }
    },
    enabled: !!userId && !!dateRange[0] && !!dateRange[1],
  });

  const recordHealthMetric = async (metric: Omit<HealthMetric, 'id'>) => {
    try {
      const response = await apiRequest('POST', '/api/health-metrics', metric);
      if (!response.ok) {
        throw new Error(`خطا در ثبت اطلاعات: ${response.status}`);
      }
      queryClient.invalidateQueries({ queryKey: ['/api/health-metrics', userId] });
      toast({
        title: 'داده‌ها با موفقیت ثبت شدند',
        description: 'اطلاعات سلامتی جدید شما ذخیره شد.',
      });
      return await response.json();
    } catch (error) {
      console.error('خطا در ثبت داده‌های سلامتی:', error);
      toast({
        title: 'خطا در ثبت داده‌ها',
        description: 'امکان ثبت اطلاعات سلامت وجود ندارد. لطفاً دوباره تلاش کنید.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // تجزیه و تحلیل پیشرفته برای پیش‌بینی روند سلامتی
  const predictHealthTrend = () => {
    if (!healthMetrics || healthMetrics.length < 7) {
      return null;
    }

    // محاسبه میانگین داده‌های هفته اخیر
    const recentMetrics = healthMetrics.slice(-7);
    const avgSteps = recentMetrics.reduce((sum, m) => sum + m.stepCount, 0) / recentMetrics.length;
    const avgSleep = recentMetrics.reduce((sum, m) => sum + m.sleepHours, 0) / recentMetrics.length;
    const avgStress = recentMetrics.reduce((sum, m) => sum + m.stressLevel, 0) / recentMetrics.length;
    const avgNutrition = recentMetrics.reduce((sum, m) => sum + m.nutritionScore, 0) / recentMetrics.length;

    // شناسایی روند با بررسی تغییرات اخیر
    const stepsImproving = recentMetrics[recentMetrics.length - 1].stepCount > avgSteps;
    const sleepImproving = recentMetrics[recentMetrics.length - 1].sleepHours > avgSleep;
    const stressImproving = recentMetrics[recentMetrics.length - 1].stressLevel < avgStress;
    const nutritionImproving = recentMetrics[recentMetrics.length - 1].nutritionScore > avgNutrition;

    // محاسبه امتیاز کلی سلامت 
    const healthScore = (
      (stepsImproving ? 20 : 10) +
      (sleepImproving ? 25 : 15) +
      (stressImproving ? 20 : 5) +
      (nutritionImproving ? 20 : 10)
    );

    return {
      healthScore,
      improvements: {
        activity: stepsImproving,
        sleep: sleepImproving,
        stress: stressImproving,
        nutrition: nutritionImproving
      },
      recommendation: getHealthRecommendation(stepsImproving, sleepImproving, stressImproving, nutritionImproving)
    };
  };

  const getHealthRecommendation = (activity: boolean, sleep: boolean, stress: boolean, nutrition: boolean) => {
    if (activity && sleep && stress && nutrition) {
      return 'روند سلامتی شما عالی است! به همین مسیر ادامه دهید.';
    } else if (!activity && !sleep) {
      return 'برای بهبود سلامتی، افزایش فعالیت بدنی و خواب بهتر توصیه می‌شود.';
    } else if (!stress) {
      return 'سطح استرس شما بالاست. تمرین‌های آرامسازی و مدیتیشن را امتحان کنید.';
    } else if (!nutrition) {
      return 'تغذیه شما نیاز به بهبود دارد. مصرف میوه و سبزیجات بیشتر توصیه می‌شود.';
    } else {
      return 'روند سلامتی شما در حال بهبود است. به تلاش خود ادامه دهید!';
    }
  };

  // تجزیه و تحلیل داده‌ها برای نمایش
  useEffect(() => {
    if (healthMetrics && healthMetrics.length > 0) {
      const dates = healthMetrics.map(m => {
        const date = new Date(m.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      });
      
      setAnalyticsData({
        dailySteps: healthMetrics.map(m => m.stepCount),
        weeklyActivity: healthMetrics.map(m => m.activityMinutes),
        sleepQuality: healthMetrics.map(m => m.sleepHours),
        hydrationLevel: healthMetrics.map(m => m.hydrationMl / 1000), // convert to liters
        nutritionScore: healthMetrics.map(m => m.nutritionScore),
        stressLevel: healthMetrics.map(m => m.stressLevel),
        dates
      });
    }
  }, [healthMetrics]);

  return {
    analyticsData,
    healthMetrics,
    isLoading,
    error,
    recordHealthMetric,
    predictHealthTrend
  };
};