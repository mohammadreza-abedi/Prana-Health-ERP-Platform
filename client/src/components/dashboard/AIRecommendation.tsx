/**
 * @file AIRecommendation.tsx
 * @description کامپوننت توصیه‌های هوش مصنوعی
 * 
 * این کامپوننت توصیه‌های هوش مصنوعی برای بهبود سلامت و عملکرد را نمایش می‌دهد.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, Lightbulb } from 'lucide-react';

interface AIRecommendationProps {
  insights: string | null;
  isLoading: boolean;
}

// کامپوننت نمایش توصیه‌های هوش مصنوعی
const AIRecommendation: React.FC<AIRecommendationProps> = ({ insights, isLoading }) => {
  const [parsedInsights, setParsedInsights] = useState<any>(null);
  
  // پردازش داده‌های دریافتی از هوش مصنوعی
  useEffect(() => {
    if (insights) {
      try {
        // تلاش برای تبدیل به JSON در صورتی که هوش مصنوعی JSON برگردانده باشد
        const data = JSON.parse(insights);
        setParsedInsights(data);
      } catch (error) {
        // اگر JSON نباشد، به عنوان متن در نظر می‌گیریم
        setParsedInsights({ 
          summary: "بینش‌های هوش مصنوعی", 
          insights: [{ text: insights, type: "info" }] 
        });
      }
    } else {
      setParsedInsights(null);
    }
  }, [insights]);
  
  // وضعیت بارگذاری
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
        
        {[1, 2, 3].map((i) => (
          <div key={i} className="border-l-4 border-gray-200 dark:border-gray-700 pr-4 py-2 space-y-2">
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }
  
  // نمایش پیام اولیه وقتی داده‌ای وجود ندارد
  if (!parsedInsights) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <Lightbulb className="h-16 w-16 text-amber-400" />
        <h3 className="text-xl font-medium">منتظر بینش‌های هوش مصنوعی باشید</h3>
        <p className="text-muted-foreground max-w-md">
          برای دریافت توصیه‌ها و بینش‌های هوشمند بر اساس داده‌های سلامت خود، دکمه «تحلیل جدید» را کلیک کنید.
        </p>
      </div>
    );
  }
  
  // تعیین آیکون مناسب برای هر نوع توصیه
  const getInsightIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-success-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-info-500" />;
    }
  };
  
  // تعیین کلاس مناسب برای حاشیه هر نوع توصیه
  const getInsightBorderClass = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'warning':
        return 'border-warning-500';
      case 'success':
        return 'border-success-500';
      case 'info':
      default:
        return 'border-info-500';
    }
  };
  
  // نمایش بینش‌های دریافتی از هوش مصنوعی
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* خلاصه */}
      {parsedInsights.summary && (
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Lightbulb className="h-6 w-6 text-amber-500" />
          <h3 className="text-lg font-medium">{parsedInsights.summary}</h3>
        </div>
      )}
      
      {/* توصیه‌ها و بینش‌ها */}
      <div className="space-y-4">
        {(parsedInsights.insights || parsedInsights.recommendations || []).map((insight: any, index: number) => (
          <motion.div
            key={index}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`border-r-4 ${getInsightBorderClass(insight.type)} pr-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-l shadow-sm`}
          >
            <div className="flex items-start space-x-2 rtl:space-x-reverse">
              <div className="mt-0.5">
                {getInsightIcon(insight.type)}
              </div>
              <div>
                <p className="font-medium">{insight.title || 'توصیه هوشمند'}</p>
                <p className="text-muted-foreground text-sm mt-1">{insight.text || insight.description || insight}</p>
                {insight.action && (
                  <p className="text-sm font-medium text-primary-600 mt-2">پیشنهاد: {insight.action}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* پشتیبانی از ساختارهای مختلف JSON که هوش مصنوعی ممکن است تولید کند */}
        {parsedInsights.health_insights && (
          <div className="space-y-4">
            {parsedInsights.health_insights.map((insight: any, index: number) => (
              <motion.div
                key={`health-${index}`}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-r-4 border-tiffany pr-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-l shadow-sm"
              >
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                  <div className="mt-0.5">
                    <Info className="h-5 w-5 text-tiffany" />
                  </div>
                  <div>
                    <p className="font-medium">{insight.category || 'بینش سلامت'}</p>
                    <p className="text-muted-foreground text-sm mt-1">{insight.insight || insight.description}</p>
                    {insight.recommendation && (
                      <p className="text-sm font-medium text-primary-600 mt-2">توصیه: {insight.recommendation}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIRecommendation;