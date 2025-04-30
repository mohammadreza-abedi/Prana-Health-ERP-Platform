/**
 * @file SentimentAnalysis.tsx
 * @description کامپوننت تحلیل احساسات
 * 
 * این کامپوننت نتایج تحلیل احساسات با هوش مصنوعی را نمایش می‌دهد.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Smile, 
  Frown, 
  Meh, 
  Clock,
  BarChart3
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/design-system/atoms/Button';
import { useToast } from '@/hooks/use-toast';

// کامپوننت تحلیل احساسات
const SentimentAnalysis: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();
  
  // ارسال درخواست تحلیل احساسات
  const analyzeTextMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await apiRequest('POST', '/api/ai/analyze-text', { 
        text,
        analysisType: 'sentiment',
        options: {
          temperature: 0.3,
          format: 'json'
        }
      });
      return await res.json();
    },
    onSuccess: (data) => {
      try {
        const content = JSON.parse(data.content);
        setAnalysis(content);
        toast({
          title: 'تحلیل انجام شد',
          description: 'تحلیل احساسات با موفقیت انجام شد',
        });
      } catch (error) {
        setAnalysis({ sentiment: 'neutral', score: 0.5, text: data.content });
      }
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در تحلیل',
        description: error.message || 'خطایی در تحلیل احساسات رخ داد',
        variant: 'destructive',
      });
    }
  });
  
  // ارسال متن برای تحلیل
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    analyzeTextMutation.mutate(text);
  };
  
  // دریافت آیکون مناسب برای احساس
  const getSentimentIcon = () => {
    if (!analysis) return null;
    
    const sentiment = analysis.sentiment?.toLowerCase() || '';
    const score = analysis.score || 0.5;
    
    if (sentiment.includes('positive') || sentiment.includes('مثبت') || score > 0.6) {
      return <Smile className="h-16 w-16 text-success-500" />;
    } else if (sentiment.includes('negative') || sentiment.includes('منفی') || score < 0.4) {
      return <Frown className="h-16 w-16 text-error-500" />;
    } else {
      return <Meh className="h-16 w-16 text-warning-500" />;
    }
  };
  
  // دریافت رنگ مناسب برای نمایش امتیاز احساس
  const getSentimentColor = () => {
    if (!analysis) return 'bg-gray-200 dark:bg-gray-700';
    
    const sentiment = analysis.sentiment?.toLowerCase() || '';
    const score = analysis.score || 0.5;
    
    if (sentiment.includes('positive') || sentiment.includes('مثبت') || score > 0.6) {
      return 'bg-success-500';
    } else if (sentiment.includes('negative') || sentiment.includes('منفی') || score < 0.4) {
      return 'bg-error-500';
    } else {
      return 'bg-warning-500';
    }
  };
  
  // دریافت متن مناسب برای نمایش احساس
  const getSentimentText = () => {
    if (!analysis) return '';
    
    const sentiment = analysis.sentiment?.toLowerCase() || '';
    const score = analysis.score || 0.5;
    
    if (sentiment.includes('positive') || sentiment.includes('مثبت') || score > 0.6) {
      return 'احساس مثبت';
    } else if (sentiment.includes('negative') || sentiment.includes('منفی') || score < 0.4) {
      return 'احساس منفی';
    } else {
      return 'احساس خنثی';
    }
  };
  
  return (
    <div className="space-y-4">
      {/* فرم ورودی متن برای تحلیل */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label htmlFor="sentiment-text" className="block text-sm font-medium mb-1">
            متن خود را برای تحلیل احساسات وارد کنید
          </label>
          <textarea
            id="sentiment-text"
            rows={3}
            className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="امروز احساس..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={analyzeTextMutation.isPending}
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={analyzeTextMutation.isPending || !text.trim()}
            isLoading={analyzeTextMutation.isPending}
            rightIcon={<Send className="h-4 w-4" />}
          >
            تحلیل احساسات
          </Button>
        </div>
      </form>
      
      {/* نمایش نتیجه تحلیل */}
      {analyzeTextMutation.isPending ? (
        <div className="mt-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 animate-pulse space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/3 mx-auto"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mx-auto"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-2/3 mx-auto"></div>
          </div>
        </div>
      ) : analysis ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            {getSentimentIcon()}
            
            <div>
              <h3 className="text-lg font-medium">{getSentimentText()}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {analysis.explanation || analysis.summary || 'تحلیل احساسات متن شما'}
              </p>
            </div>
            
            {/* نمایش امتیاز احساس */}
            {(analysis.score !== undefined) && (
              <div className="w-full mt-2 space-y-2">
                <div className="flex justify-between text-xs">
                  <span>منفی</span>
                  <span>خنثی</span>
                  <span>مثبت</span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${getSentimentColor()}`}
                    style={{ width: `${Math.max(0, Math.min(100, analysis.score * 100))}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    اکنون
                  </span>
                  
                  <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 py-1 px-2 rounded-full">
                    امتیاز: {(analysis.score * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            )}
            
            {/* نمایش کلیدواژه‌های مهم */}
            {analysis.keywords && (
              <div className="w-full">
                <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  کلیدواژه‌های مهم
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword: string, index: number) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 dark:bg-gray-700 py-1 px-2 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default SentimentAnalysis;