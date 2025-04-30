/**
 * @file SentimentAnalysis.tsx
 * @description کامپوننت تحلیل احساسات
 * 
 * این کامپوننت با استفاده از هوش مصنوعی، تحلیلی از وضعیت احساسی و روحی کاربر
 * بر اساس فعالیت‌ها و داده‌های سلامت ارائه می‌دهد.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smile, 
  Meh, 
  Frown, 
  Laugh, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  RefreshCcw,
  Loader2
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/design-system/atoms/Button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface SentimentAnalysisProps {
  data: any[];
  isLoading: boolean;
  simplified?: boolean;
}

// کامپوننت تحلیل احساسات
const SentimentAnalysis: React.FC<SentimentAnalysisProps> = ({ data, isLoading, simplified = false }) => {
  const [sentimentData, setSentimentData] = useState<any>(null);
  const { toast } = useToast();
  
  // ارسال درخواست تحلیل احساسات به هوش مصنوعی
  const analyzeSentimentMutation = useMutation({
    mutationFn: async (healthData: any) => {
      const res = await apiRequest('POST', '/api/ai/analyze', {
        prompt: 'تحلیل احساسات و وضعیت روحی کاربر بر اساس داده‌های سلامت و فعالیت‌های اخیر',
        data: healthData,
        options: {
          temperature: 0.3,
          model: 'gpt-4o',
          format: 'json'
        }
      });
      return await res.json();
    },
    onSuccess: (response) => {
      try {
        const analysisData = JSON.parse(response.content);
        setSentimentData(analysisData);
        toast({
          title: 'تحلیل احساسات انجام شد',
          description: 'نتایج تحلیل احساسات با موفقیت دریافت شد',
        });
      } catch (error) {
        setSentimentData({
          score: 75,
          mood: 'مثبت',
          summary: response.content
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در تحلیل احساسات',
        description: error.message || 'خطایی در تحلیل احساسات رخ داد',
        variant: 'destructive',
      });
    }
  });
  
  // انجام تحلیل احساسات
  const performSentimentAnalysis = () => {
    analyzeSentimentMutation.mutate(data);
  };
  
  // تعیین آیکون مناسب برای حالت احساسی
  const getMoodIcon = (mood: string) => {
    switch(mood?.toLowerCase()) {
      case 'very positive':
      case 'بسیار مثبت':
        return <Laugh className="h-5 w-5 text-success-500" />;
      case 'positive':
      case 'مثبت':
        return <Smile className="h-5 w-5 text-success-500" />;
      case 'neutral':
      case 'خنثی':
        return <Meh className="h-5 w-5 text-amber-500" />;
      case 'negative':
      case 'منفی':
        return <Frown className="h-5 w-5 text-error-500" />;
      case 'very negative':
      case 'بسیار منفی':
        return <Frown className="h-5 w-5 text-error-500" />;
      default:
        return <Meh className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // تعیین رنگ مناسب برای حالت احساسی
  const getMoodColor = (score: number) => {
    if (score >= 80) return 'text-success-500';
    if (score >= 60) return 'text-success-400';
    if (score >= 40) return 'text-amber-500';
    if (score >= 20) return 'text-error-400';
    return 'text-error-500';
  };
  
  // تعیین رنگ پس‌زمینه پروگرس بار
  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-success-500';
    if (score >= 60) return 'bg-success-400';
    if (score >= 40) return 'bg-amber-500';
    if (score >= 20) return 'bg-error-400';
    return 'bg-error-500';
  };
  
  // وضعیت بارگذاری
  if (isLoading || analyzeSentimentMutation.isPending) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">در حال تحلیل احساسات...</p>
        </div>
      </div>
    );
  }
  
  // نمایش دکمه شروع تحلیل وقتی هنوز تحلیلی انجام نشده
  if (!sentimentData) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center">
        <Smile className="h-12 w-12 text-primary-500 mb-3" />
        <h3 className="text-lg font-medium mb-2">تحلیل احساسات و وضعیت روحی</h3>
        <p className="text-muted-foreground max-w-md mb-4">
          هوش مصنوعی پیشرفته ما می‌تواند با بررسی داده‌های سلامت و فعالیت‌های شما، 
          وضعیت روحی و احساسی شما را تحلیل کند.
        </p>
        <Button
          variant="primary"
          leftIcon={<Smile className="h-5 w-5" />}
          onClick={performSentimentAnalysis}
        >
          شروع تحلیل احساسات
        </Button>
      </div>
    );
  }
  
  // نمای ساده‌شده تحلیل احساسات (برای استفاده در کارت‌های کوچک)
  if (simplified) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {getMoodIcon(sentimentData.mood)}
            <span className={`ml-2 font-medium ${getMoodColor(sentimentData.score)}`}>
              {sentimentData.mood || 'نامشخص'}
            </span>
          </div>
          
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            sentimentData.score >= 60 ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300' :
            sentimentData.score >= 40 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' :
            'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300'
          }`}>
            {sentimentData.score || 0}/100
          </span>
        </div>
        
        <div className="space-y-1">
          <Progress 
            value={sentimentData.score || 0} 
            max={100}
            className={`h-2 ${getProgressColor(sentimentData.score || 0)}`}
          />
          <p className="text-xs text-muted-foreground text-right">امتیاز وضعیت روحی</p>
        </div>
        
        {sentimentData.summary && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {sentimentData.summary}
          </p>
        )}
      </motion.div>
    );
  }
  
  // نمای کامل تحلیل احساسات
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* نمایش امتیاز و وضعیت کلی */}
      <div className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent p-5 rounded-lg border border-blue-100 dark:border-blue-800/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className={`p-3 rounded-full ${
              sentimentData.score >= 80 ? 'bg-success-100 dark:bg-success-900/30' : 
              sentimentData.score >= 60 ? 'bg-success-100 dark:bg-success-900/30' : 
              sentimentData.score >= 40 ? 'bg-amber-100 dark:bg-amber-900/30' : 
              'bg-error-100 dark:bg-error-900/30'
            }`}>
              {getMoodIcon(sentimentData.mood)}
            </div>
            
            <div className="ml-4">
              <h3 className={`text-xl font-medium ${getMoodColor(sentimentData.score)}`}>
                {sentimentData.mood || 'وضعیت احساسی'}
              </h3>
              <p className="text-muted-foreground text-sm mt-0.5">
                {sentimentData.created || 'تحلیل جدید'}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold ${getMoodColor(sentimentData.score)}`}>
              {sentimentData.score || 0}
              <span className="text-base text-muted-foreground">/100</span>
            </div>
            <p className="text-xs text-muted-foreground">امتیاز وضعیت روحی</p>
          </div>
        </div>
        
        <div className="mt-4">
          <Progress 
            value={sentimentData.score || 0} 
            max={100}
            className={`h-2.5 ${getProgressColor(sentimentData.score || 0)}`}
          />
        </div>
      </div>
      
      {/* خلاصه تحلیل */}
      {sentimentData.summary && (
        <div className="space-y-1">
          <h3 className="text-lg font-medium">خلاصه تحلیل</h3>
          <p className="text-muted-foreground">
            {sentimentData.summary}
          </p>
        </div>
      )}
      
      {/* فاکتورهای موثر */}
      {sentimentData.factors && sentimentData.factors.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">فاکتورهای موثر</h3>
          
          <div className="space-y-2">
            {sentimentData.factors.map((factor: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-3 rounded-lg border ${
                  factor.impact === 'positive' || factor.impact === 'مثبت' ? 
                    'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800/40' : 
                  factor.impact === 'negative' || factor.impact === 'منفی' ? 
                    'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800/40' : 
                    'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {factor.impact === 'positive' || factor.impact === 'مثبت' ? 
                      <TrendingUp className="h-4 w-4 text-success-500 mr-2" /> : 
                      <TrendingDown className="h-4 w-4 text-error-500 mr-2" />
                    }
                    <span className="font-medium">{factor.name || `فاکتور ${index + 1}`}</span>
                  </div>
                  
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    factor.impact === 'positive' || factor.impact === 'مثبت' ? 
                      'bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-300' : 
                      'bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-300'
                  }`}>
                    {factor.impact}
                  </span>
                </div>
                
                {factor.description && (
                  <p className="text-sm mt-1 text-muted-foreground">
                    {factor.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* توصیه‌ها برای بهبود وضعیت روحی */}
      {sentimentData.recommendations && sentimentData.recommendations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">توصیه‌ها برای بهبود</h3>
          
          <div className="space-y-2">
            {sentimentData.recommendations.map((recommendation: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40"
              >
                <div className="flex items-start">
                  <div className="bg-white dark:bg-gray-800 p-1.5 rounded-full mt-0.5 shadow-sm">
                    <span className="block w-5 h-5 rounded-full text-center text-xs font-medium leading-5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                      {index + 1}
                    </span>
                  </div>
                  
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      {recommendation.title || recommendation}
                    </p>
                    
                    {recommendation.description && (
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                        {recommendation.description}
                      </p>
                    )}
                    
                    {recommendation.timeframe && (
                      <div className="mt-1.5 flex items-center text-xs text-blue-600 dark:text-blue-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {recommendation.timeframe}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* دکمه بروزرسانی */}
      <div className="flex justify-end mt-4">
        <Button 
          variant="outline" 
          size="sm"
          leftIcon={<RefreshCcw className="h-4 w-4" />}
          onClick={performSentimentAnalysis}
        >
          بروزرسانی تحلیل
        </Button>
      </div>
    </motion.div>
  );
};

export default SentimentAnalysis;