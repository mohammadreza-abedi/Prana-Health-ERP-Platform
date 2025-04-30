/**
 * @file TrendPrediction.tsx
 * @description کامپوننت پیش‌بینی روند با استفاده از هوش مصنوعی
 * 
 * این کامپوننت پیش‌بینی‌های هوش مصنوعی برای روندهای آینده را نمایش می‌دهد.
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  BarChart, 
  Lightbulb,
  Info,
  Brain,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent } from '@/design-system/atoms/Card';
import { Button } from '@/design-system/atoms/Button';

interface TrendPredictionProps {
  data: string | null;
  isLoading: boolean;
}

// کامپوننت پیش‌بینی روند
const TrendPrediction: React.FC<TrendPredictionProps> = ({ data, isLoading }) => {
  const [parsedData, setParsedData] = useState<any>(null);
  
  // پردازش داده‌های دریافتی از هوش مصنوعی
  useEffect(() => {
    if (data) {
      try {
        // تلاش برای تبدیل به JSON در صورتی که هوش مصنوعی JSON برگردانده باشد
        const jsonData = JSON.parse(data);
        setParsedData(jsonData);
      } catch (error) {
        // اگر JSON نباشد، به عنوان متن در نظر می‌گیریم
        setParsedData({ 
          summary: "پیش‌بینی روند",
          predictions: [{ text: data, confidence: 0.5 }]
        });
      }
    } else {
      setParsedData(null);
    }
  }, [data]);
  
  // وضعیت بارگذاری
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // نمایش پیام اولیه وقتی داده‌ای وجود ندارد
  if (!parsedData) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <Brain className="h-16 w-16 text-primary-400" />
        <h3 className="text-xl font-medium">منتظر پیش‌بینی روند هوش مصنوعی باشید</h3>
        <p className="text-muted-foreground max-w-md">
          برای دریافت پیش‌بینی‌های هوشمند روندهای آینده بر اساس داده‌های موجود، دکمه «پیش‌بینی جدید» را کلیک کنید.
        </p>
      </div>
    );
  }
  
  // تعیین آیکون مناسب برای هر متریک
  const getMetricIcon = (metricName: string) => {
    const metric = metricName.toLowerCase();
    if (metric.includes('step') || metric.includes('قدم')) return <BarChart className="h-5 w-5 text-blue-500" />;
    if (metric.includes('sleep') || metric.includes('خواب')) return <Info className="h-5 w-5 text-purple-500" />;
    if (metric.includes('heart') || metric.includes('قلب')) return <Info className="h-5 w-5 text-red-500" />;
    if (metric.includes('stress') || metric.includes('استرس')) return <Info className="h-5 w-5 text-yellow-500" />;
    if (metric.includes('calorie') || metric.includes('کالری')) return <Info className="h-5 w-5 text-orange-500" />;
    return <Info className="h-5 w-5 text-gray-500" />;
  };
  
  // تعیین آیکون روند برای هر پیش‌بینی
  const getTrendIcon = (prediction: any) => {
    if (!prediction) return null;
    
    // بررسی روند افزایشی یا کاهشی
    const trend = prediction.trend || 
                 (prediction.direction === 'up' || prediction.direction === 'increasing') ? 'up' :
                 (prediction.direction === 'down' || prediction.direction === 'decreasing') ? 'down' : 
                 (typeof prediction.value === 'number' && prediction.value > 0) ? 'up' :
                 (typeof prediction.value === 'number' && prediction.value < 0) ? 'down' :
                 'neutral';
    
    return trend === 'up' ? 
      <TrendingUp className="h-5 w-5 text-success-500" /> : 
      trend === 'down' ? 
      <TrendingDown className="h-5 w-5 text-error-500" /> :
      <Info className="h-5 w-5 text-gray-500" />;
  };
  
  // تعیین کلاس مناسب برای هر سطح اطمینان
  const getConfidenceClass = (confidence: number) => {
    if (confidence > 0.8) return 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300';
    if (confidence > 0.5) return 'bg-info-100 text-info-800 dark:bg-info-900/30 dark:text-info-300';
    return 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300';
  };
  
  // محتوای دریافتی از هوش مصنوعی را در بخش‌ها و کارت‌های مختلف نمایش می‌دهیم
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* خلاصه پیش‌بینی */}
      {(parsedData.summary || parsedData.overview) && (
        <div className="bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent p-4 rounded-lg border border-primary-100 dark:border-primary-800/30">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Lightbulb className="h-6 w-6 text-primary-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-primary-800 dark:text-primary-200">
                {parsedData.summary || parsedData.overview}
              </h3>
              {parsedData.description && (
                <p className="text-primary-700 dark:text-primary-300 mt-1 text-sm">
                  {parsedData.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* پیش‌بینی‌های اصلی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(parsedData.predictions || parsedData.metrics || []).map((prediction: any, index: number) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {getMetricIcon(prediction.metric || prediction.name || '')}
                    <h4 className="font-medium">
                      {prediction.metric || prediction.name || `پیش‌بینی ${index + 1}`}
                    </h4>
                  </div>
                  
                  {getTrendIcon(prediction)}
                </div>
                
                <p className="text-sm mt-2">
                  {prediction.text || prediction.description || prediction.prediction || ''}
                </p>
                
                {/* نمایش سطح اطمینان */}
                {(prediction.confidence !== undefined) && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      سطح اطمینان
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getConfidenceClass(prediction.confidence)}`}>
                      {Math.round(prediction.confidence * 100)}%
                    </span>
                  </div>
                )}
                
                {/* نمایش پیشنهادات */}
                {(prediction.recommendation || prediction.action) && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-start space-x-2 rtl:space-x-reverse">
                      <CheckCircle2 className="h-4 w-4 text-success-500 mt-0.5" />
                      <p className="text-xs text-success-700 dark:text-success-300">
                        {prediction.recommendation || prediction.action}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* پیشنهادات اقدام */}
      {parsedData.recommendations && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2 text-success-500" />
            اقدامات پیشنهادی
          </h3>
          
          <div className="space-y-3">
            {parsedData.recommendations.map((recommendation: any, index: number) => (
              <motion.div
                key={`rec-${index}`}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-2 rtl:space-x-reverse bg-success-50 dark:bg-success-900/20 p-3 rounded-lg"
              >
                <CheckCircle2 className="h-5 w-5 text-success-500 mt-0.5" />
                <div>
                  <p className="font-medium text-success-800 dark:text-success-200">
                    {recommendation.title || 'پیشنهاد'}
                  </p>
                  <p className="text-sm text-success-700 dark:text-success-300 mt-1">
                    {recommendation.text || recommendation.description || recommendation}
                  </p>
                  
                  {recommendation.action && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-success-600 hover:text-success-700 hover:bg-success-100 dark:text-success-400 dark:hover:bg-success-900/30"
                      rightIcon={<ArrowUpRight className="h-3 w-3" />}
                    >
                      {recommendation.action}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      {/* هشدارها */}
      {parsedData.warnings && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-warning-500" />
            هشدارها
          </h3>
          
          <div className="space-y-3">
            {parsedData.warnings.map((warning: any, index: number) => (
              <motion.div
                key={`warning-${index}`}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-2 rtl:space-x-reverse bg-warning-50 dark:bg-warning-900/20 p-3 rounded-lg"
              >
                <AlertCircle className="h-5 w-5 text-warning-500 mt-0.5" />
                <div>
                  <p className="font-medium text-warning-800 dark:text-warning-200">
                    {warning.title || 'هشدار'}
                  </p>
                  <p className="text-sm text-warning-700 dark:text-warning-300 mt-1">
                    {warning.text || warning.description || warning}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TrendPrediction;