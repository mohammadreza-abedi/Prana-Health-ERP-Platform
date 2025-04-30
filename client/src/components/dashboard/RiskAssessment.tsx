/**
 * @file RiskAssessment.tsx
 * @description کامپوننت ارزیابی ریسک
 * 
 * این کامپوننت ارزیابی ریسک‌های سلامت و توصیه‌های پیشگیرانه را نمایش می‌دهد.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Activity,
  Heart,
  Brain,
  Thermometer,
  ThumbsUp,
  Loader2,
  RefreshCcw,
  Moon
} from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/design-system/atoms/Button';
import { useToast } from '@/hooks/use-toast';

interface RiskAssessmentProps {
  data: any[];
  isLoading: boolean;
}

// کامپوننت ارزیابی ریسک
const RiskAssessment: React.FC<RiskAssessmentProps> = ({ data, isLoading }) => {
  const [riskAnalysis, setRiskAnalysis] = useState<any>(null);
  const { toast } = useToast();
  
  // ارسال درخواست ارزیابی ریسک به هوش مصنوعی
  const analyzeRiskMutation = useMutation({
    mutationFn: async (healthData: any) => {
      const res = await apiRequest('POST', '/api/ai/analyze', {
        prompt: 'شناسایی الگوهای خطرناک در داده‌های سلامت و ارائه هشدارهای پیشگیرانه',
        data: healthData,
        options: {
          temperature: 0.2,
          model: 'gpt-4o',
          format: 'json'
        }
      });
      return await res.json();
    },
    onSuccess: (response) => {
      try {
        const analysisData = JSON.parse(response.content);
        setRiskAnalysis(analysisData);
        toast({
          title: 'ارزیابی ریسک انجام شد',
          description: 'نتایج ارزیابی ریسک با موفقیت دریافت شد',
        });
      } catch (error) {
        setRiskAnalysis({
          summary: 'نتیجه ارزیابی ریسک',
          risks: [{ description: response.content }]
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در ارزیابی ریسک',
        description: error.message || 'خطایی در ارزیابی ریسک رخ داد',
        variant: 'destructive',
      });
    }
  });
  
  // انجام ارزیابی ریسک
  const performRiskAssessment = () => {
    analyzeRiskMutation.mutate(data);
  };
  
  // تعیین آیکون مناسب برای هر سطح ریسک
  const getRiskIcon = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'بالا':
        return <ShieldAlert className="h-5 w-5 text-error-500" />;
      case 'medium':
      case 'متوسط':
        return <AlertTriangle className="h-5 w-5 text-warning-500" />;
      case 'low':
      case 'پایین':
        return <ShieldCheck className="h-5 w-5 text-success-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // تعیین کلاس مناسب برای هر سطح ریسک
  const getRiskClass = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'بالا':
        return 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800/40 text-error-800 dark:text-error-200';
      case 'medium':
      case 'متوسط':
        return 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800/40 text-warning-800 dark:text-warning-200';
      case 'low':
      case 'پایین':
        return 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800/40 text-success-800 dark:text-success-200';
      default:
        return 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200';
    }
  };
  
  // وضعیت بارگذاری
  if (isLoading || analyzeRiskMutation.isPending) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">در حال ارزیابی ریسک‌های سلامت...</p>
        </div>
      </div>
    );
  }
  
  // نمایش دکمه شروع ارزیابی وقتی هنوز ارزیابی‌ای انجام نشده
  if (!riskAnalysis) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <ShieldAlert className="h-16 w-16 text-warning-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">ارزیابی ریسک‌های سلامت</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          هوش مصنوعی پیشرفته ما می‌تواند با بررسی داده‌های سلامت شما، ریسک‌های احتمالی را شناسایی کرده و توصیه‌های پیشگیرانه ارائه دهد.
        </p>
        <Button
          variant="primary"
          leftIcon={<Activity className="h-5 w-5" />}
          onClick={performRiskAssessment}
        >
          شروع ارزیابی ریسک
        </Button>
      </div>
    );
  }
  
  // محتوای ارزیابی دریافتی از هوش مصنوعی را نمایش می‌دهیم
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* خلاصه ارزیابی */}
      {riskAnalysis.summary && (
        <div className="bg-gradient-to-r from-warning-50 to-transparent dark:from-warning-900/20 dark:to-transparent p-4 rounded-lg border border-warning-100 dark:border-warning-800/30">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <ShieldAlert className="h-6 w-6 text-warning-500 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-warning-800 dark:text-warning-200">
                {riskAnalysis.summary}
              </h3>
              {riskAnalysis.description && (
                <p className="text-warning-700 dark:text-warning-300 mt-1 text-sm">
                  {riskAnalysis.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* ریسک‌های شناسایی شده */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">ریسک‌های شناسایی شده</h3>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<RefreshCcw className="h-4 w-4" />}
            onClick={performRiskAssessment}
          >
            بروزرسانی
          </Button>
        </div>
        
        {riskAnalysis.risks?.length === 0 ? (
          <div className="p-4 rounded-lg bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800/40 text-center">
            <ThumbsUp className="h-8 w-8 text-success-500 mx-auto mb-2" />
            <p className="text-success-800 dark:text-success-200 font-medium">هیچ ریسک قابل توجهی شناسایی نشد!</p>
            <p className="text-success-700 dark:text-success-300 text-sm mt-1">
              براساس داده‌های موجود، وضعیت سلامت شما در محدوده مطلوبی قرار دارد.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {(riskAnalysis.risks || []).map((risk: any, index: number) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${getRiskClass(risk.severity)}`}
              >
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="mt-0.5">
                    {getRiskIcon(risk.severity)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{risk.title || `ریسک ${index + 1}`}</h4>
                      
                      {risk.severity && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          risk.severity?.toLowerCase() === 'high' || risk.severity?.toLowerCase() === 'بالا' ? 
                            'bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-200' : 
                          risk.severity?.toLowerCase() === 'medium' || risk.severity?.toLowerCase() === 'متوسط' ? 
                            'bg-warning-100 text-warning-800 dark:bg-warning-900/50 dark:text-warning-200' : 
                            'bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-200'
                        }`}>
                          {risk.severity}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm mt-1">
                      {risk.description || risk.text || ''}
                    </p>
                    
                    {risk.recommendation && (
                      <div className="mt-2 pt-2 border-t border-current border-opacity-20">
                        <p className="text-sm font-medium flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-1" />
                          توصیه: {risk.recommendation}
                        </p>
                      </div>
                    )}
                    
                    {risk.metrics && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {risk.metrics.map((metric: string, mIndex: number) => (
                          <span key={mIndex} className="text-xs px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                            {metric}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* توصیه‌های عمومی */}
      {riskAnalysis.recommendations && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">توصیه‌های پیشگیرانه</h3>
          
          <div className="space-y-3">
            {riskAnalysis.recommendations.map((recommendation: any, index: number) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40"
              >
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <div className="mt-0.5">
                    {recommendation.type === 'nutrition' ? <Thermometer className="h-5 w-5 text-blue-500" /> :
                     recommendation.type === 'exercise' ? <Activity className="h-5 w-5 text-blue-500" /> :
                     recommendation.type === 'sleep' ? <Moon className="h-5 w-5 text-blue-500" /> :
                     recommendation.type === 'mental' ? <Brain className="h-5 w-5 text-blue-500" /> :
                     recommendation.type === 'heart' ? <Heart className="h-5 w-5 text-blue-500" /> :
                     <ShieldCheck className="h-5 w-5 text-blue-500" />}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">
                      {recommendation.title || `توصیه ${index + 1}`}
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {recommendation.description || recommendation.text || recommendation}
                    </p>
                    
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
    </motion.div>
  );
};

export default RiskAssessment;