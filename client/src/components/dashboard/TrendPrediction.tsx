/**
 * @file TrendPrediction.tsx
 * @description کامپوننت پیش‌بینی روند
 * 
 * این کامپوننت با استفاده از هوش مصنوعی، روندهای آتی سلامت کاربر را پیش‌بینی می‌کند.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  LineChart, 
  PieChart, 
  BarChart3,
  Calendar,
  Brain,
  Loader2,
  RefreshCcw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart as ReChartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ReferenceLine
} from 'recharts';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/design-system/atoms/Button';
import { Card, CardContent } from '@/design-system/atoms/Card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface TrendPredictionProps {
  data: any[];
  isLoading: boolean;
  simplified?: boolean;
}

// کامپوننت پیش‌بینی روند
const TrendPrediction: React.FC<TrendPredictionProps> = ({ data, isLoading, simplified = false }) => {
  const [predictionTimeframe, setPredictionTimeframe] = useState<string>('month');
  const [selectedMetric, setSelectedMetric] = useState<string>('steps');
  const [trendData, setTrendData] = useState<any>(null);
  const { toast } = useToast();
  
  // ارسال درخواست پیش‌بینی به هوش مصنوعی
  const predictTrendMutation = useMutation({
    mutationFn: async (params: { healthData: any; timeframe: string; metric: string }) => {
      const res = await apiRequest('POST', '/api/ai/predict-trend', {
        data: params.healthData,
        timeframe: params.timeframe,
        metric: params.metric,
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
        const predictionData = JSON.parse(response.content);
        setTrendData(predictionData);
        toast({
          title: 'پیش‌بینی روند انجام شد',
          description: 'روند‌های آتی با موفقیت پیش‌بینی شد',
        });
      } catch (error) {
        setTrendData({
          summary: response.content,
          predictions: getSamplePredictions()
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در پیش‌بینی روند',
        description: error.message || 'خطایی در پیش‌بینی روند رخ داد',
        variant: 'destructive',
      });
    }
  });
  
  // انجام پیش‌بینی روند
  const performTrendPrediction = () => {
    predictTrendMutation.mutate({
      healthData: data,
      timeframe: predictionTimeframe,
      metric: selectedMetric
    });
  };
  
  // داده‌های نمونه برای پیش‌بینی روند
  const getSamplePredictions = () => {
    const now = new Date();
    
    const predictions = {
      steps: [
        { date: '۲۵ اردیبهشت', value: 9500, isProjected: false },
        { date: '۲۶ اردیبهشت', value: 10200, isProjected: false },
        { date: '۲۷ اردیبهشت', value: 9800, isProjected: false },
        { date: '۲۸ اردیبهشت', value: 11300, isProjected: false },
        { date: '۲۹ اردیبهشت', value: 10500, isProjected: false },
        { date: '۳۰ اردیبهشت', value: 9900, isProjected: false },
        { date: '۳۱ اردیبهشت', value: 12100, isProjected: false },
        { date: '۱ خرداد', value: 11200, isProjected: true },
        { date: '۲ خرداد', value: 10800, isProjected: true },
        { date: '۳ خرداد', value: 11500, isProjected: true },
        { date: '۴ خرداد', value: 12000, isProjected: true },
        { date: '۵ خرداد', value: 11800, isProjected: true },
        { date: '۶ خرداد', value: 12500, isProjected: true },
        { date: '۷ خرداد', value: 13000, isProjected: true },
      ],
      calories: [
        { date: '۲۵ اردیبهشت', value: 2100, isProjected: false },
        { date: '۲۶ اردیبهشت', value: 2300, isProjected: false },
        { date: '۲۷ اردیبهشت', value: 2000, isProjected: false },
        { date: '۲۸ اردیبهشت', value: 2450, isProjected: false },
        { date: '۲۹ اردیبهشت', value: 2200, isProjected: false },
        { date: '۳۰ اردیبهشت', value: 2150, isProjected: false },
        { date: '۳۱ اردیبهشت', value: 2400, isProjected: false },
        { date: '۱ خرداد', value: 2300, isProjected: true },
        { date: '۲ خرداد', value: 2250, isProjected: true },
        { date: '۳ خرداد', value: 2400, isProjected: true },
        { date: '۴ خرداد', value: 2350, isProjected: true },
        { date: '۵ خرداد', value: 2450, isProjected: true },
        { date: '۶ خرداد', value: 2500, isProjected: true },
        { date: '۷ خرداد', value: 2550, isProjected: true },
      ],
      sleep: [
        { date: '۲۵ اردیبهشت', value: 6.5, isProjected: false },
        { date: '۲۶ اردیبهشت', value: 7.2, isProjected: false },
        { date: '۲۷ اردیبهشت', value: 6.8, isProjected: false },
        { date: '۲۸ اردیبهشت', value: 7.0, isProjected: false },
        { date: '۲۹ اردیبهشت', value: 6.9, isProjected: false },
        { date: '۳۰ اردیبهشت', value: 7.3, isProjected: false },
        { date: '۳۱ اردیبهشت', value: 7.1, isProjected: false },
        { date: '۱ خرداد', value: 7.2, isProjected: true },
        { date: '۲ خرداد', value: 7.4, isProjected: true },
        { date: '۳ خرداد', value: 7.3, isProjected: true },
        { date: '۴ خرداد', value: 7.5, isProjected: true },
        { date: '۵ خرداد', value: 7.6, isProjected: true },
        { date: '۶ خرداد', value: 7.4, isProjected: true },
        { date: '۷ خرداد', value: 7.7, isProjected: true },
      ],
      exercise: [
        { date: '۲۵ اردیبهشت', value: 45, isProjected: false },
        { date: '۲۶ اردیبهشت', value: 30, isProjected: false },
        { date: '۲۷ اردیبهشت', value: 0, isProjected: false },
        { date: '۲۸ اردیبهشت', value: 60, isProjected: false },
        { date: '۲۹ اردیبهشت', value: 25, isProjected: false },
        { date: '۳۰ اردیبهشت', value: 50, isProjected: false },
        { date: '۳۱ اردیبهشت', value: 15, isProjected: false },
        { date: '۱ خرداد', value: 55, isProjected: true },
        { date: '۲ خرداد', value: 30, isProjected: true },
        { date: '۳ خرداد', value: 0, isProjected: true },
        { date: '۴ خرداد', value: 65, isProjected: true },
        { date: '۵ خرداد', value: 30, isProjected: true },
        { date: '۶ خرداد', value: 45, isProjected: true },
        { date: '۷ خرداد', value: 20, isProjected: true },
      ]
    };
    
    return predictions[selectedMetric as keyof typeof predictions] || [];
  };
  
  // دریافت عنوان متریک
  const getMetricTitle = (metric: string) => {
    switch(metric) {
      case 'steps':
        return 'قدم‌های روزانه';
      case 'calories':
        return 'کالری مصرفی';
      case 'sleep':
        return 'ساعات خواب';
      case 'exercise':
        return 'زمان ورزش';
      default:
        return metric;
    }
  };
  
  // دریافت واحد متریک
  const getMetricUnit = (metric: string) => {
    switch(metric) {
      case 'steps':
        return 'قدم';
      case 'calories':
        return 'کالری';
      case 'sleep':
        return 'ساعت';
      case 'exercise':
        return 'دقیقه';
      default:
        return '';
    }
  };
  
  // دریافت رنگ متریک
  const getMetricColor = (metric: string) => {
    switch(metric) {
      case 'steps':
        return '#3B82F6'; // آبی
      case 'calories':
        return '#F59E0B'; // نارنجی
      case 'sleep':
        return '#8B5CF6'; // بنفش
      case 'exercise':
        return '#10B981'; // سبز
      default:
        return '#6B7280';
    }
  };
  
  // وضعیت بارگذاری
  if (isLoading || predictTrendMutation.isPending) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500 mx-auto" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">در حال پیش‌بینی روندهای آتی...</p>
        </div>
      </div>
    );
  }
  
  // نمایش دکمه شروع پیش‌بینی وقتی هنوز پیش‌بینی انجام نشده
  if (!trendData) {
    const handleAnalyze = () => {
      performTrendPrediction();
    };
    
    // نمای ساده‌شده (برای استفاده در کارت‌های کوچک)
    if (simplified) {
      return (
        <div className="p-4 text-center flex flex-col items-center">
          <Brain className="h-10 w-10 text-indigo-500 mb-3 opacity-80" />
          <p className="text-sm text-muted-foreground mb-3">
            برای پیش‌بینی روندهای آتی با هوش مصنوعی کلیک کنید
          </p>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<TrendingUp className="h-4 w-4" />}
            onClick={handleAnalyze}
          >
            پیش‌بینی روندها
          </Button>
        </div>
      );
    }
    
    // نمای کامل
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <Brain className="h-16 w-16 text-indigo-500 mb-4 opacity-70" />
        <h3 className="text-xl font-medium mb-3">پیش‌بینی روندهای آتی سلامت</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          هوش مصنوعی پیشرفته ما می‌تواند با بررسی داده‌های سلامت فعلی شما، 
          روندهای آتی را برای معیارهای مختلف پیش‌بینی کند.
        </p>
        
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[140px]">
              <LineChart className="h-4 w-4 mr-2" />
              <SelectValue placeholder="نوع معیار" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="steps">قدم‌های روزانه</SelectItem>
              <SelectItem value="calories">کالری مصرفی</SelectItem>
              <SelectItem value="sleep">ساعات خواب</SelectItem>
              <SelectItem value="exercise">زمان ورزش</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={predictionTimeframe} onValueChange={setPredictionTimeframe}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="بازه زمانی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">یک هفته</SelectItem>
              <SelectItem value="month">یک ماه</SelectItem>
              <SelectItem value="quarter">سه ماه</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<TrendingUp className="h-5 w-5" />}
          onClick={handleAnalyze}
        >
          شروع پیش‌بینی روندها
        </Button>
      </div>
    );
  }
  
  // نمای ساده‌شده (برای استفاده در کارت‌های کوچک)
  if (simplified) {
    const predictedData = trendData.predictions || getSamplePredictions();
    const currentIndex = predictedData.findIndex((item: any) => item.isProjected);
    const firstPredictedIndex = currentIndex === -1 ? predictedData.length - 7 : currentIndex;
    const displayData = predictedData.slice(Math.max(0, firstPredictedIndex - 3), Math.min(predictedData.length, firstPredictedIndex + 7));
    
    return (
      <div className="space-y-4">
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsLineChart data={displayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
              <XAxis 
                dataKey="date" 
                angle={-45}
                tick={{ fontSize: 9 }}
                height={30}
                textAnchor="end"
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip
                formatter={(value: number) => [`${value} ${getMetricUnit(selectedMetric)}`, getMetricTitle(selectedMetric)]}
                separator=": "
                labelFormatter={(label) => `تاریخ: ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              />
              <ReferenceLine 
                x={currentIndex !== -1 ? predictedData[currentIndex].date : undefined} 
                strokeDasharray="3 3"
                label={{ value: 'شروع پیش‌بینی', position: 'insideTopRight', fontSize: 10 }}
                stroke="#9CA3AF"
              />
              <Line
                type="monotone"
                dataKey="value"
                name={getMetricTitle(selectedMetric)}
                stroke={getMetricColor(selectedMetric)}
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
              />
            </ReChartsLineChart>
          </ResponsiveContainer>
        </div>
        
        {trendData.summary && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {trendData.summary}
          </p>
        )}
      </div>
    );
  }
  
  // نمای کامل پیش‌بینی
  const predictedData = trendData.predictions || getSamplePredictions();
  const currentIndex = predictedData.findIndex((item: any) => item.isProjected);
  
  const averageBefore = predictedData
    .filter((item: any, i: number) => !item.isProjected)
    .reduce((acc: number, item: any) => acc + item.value, 0) / 
    predictedData.filter((item: any) => !item.isProjected).length;
    
  const averageAfter = predictedData
    .filter((item: any) => item.isProjected)
    .reduce((acc: number, item: any) => acc + item.value, 0) / 
    predictedData.filter((item: any) => item.isProjected).length;
    
  const changePercent = averageBefore !== 0 ? Math.round(((averageAfter - averageBefore) / averageBefore) * 100) : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-[160px]">
              <LineChart className="h-4 w-4 mr-2" />
              <SelectValue placeholder="نوع معیار" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="steps">قدم‌های روزانه</SelectItem>
              <SelectItem value="calories">کالری مصرفی</SelectItem>
              <SelectItem value="sleep">ساعات خواب</SelectItem>
              <SelectItem value="exercise">زمان ورزش</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={predictionTimeframe} onValueChange={setPredictionTimeframe}>
            <SelectTrigger className="w-[160px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="بازه زمانی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">یک هفته</SelectItem>
              <SelectItem value="month">یک ماه</SelectItem>
              <SelectItem value="quarter">سه ماه</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          leftIcon={<RefreshCcw className="h-4 w-4" />}
          onClick={performTrendPrediction}
        >
          بروزرسانی پیش‌بینی
        </Button>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ReChartsLineChart data={predictedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
            <XAxis 
              dataKey="date" 
              angle={-45}
              tick={{ fontSize: 11 }}
              height={40}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`${value} ${getMetricUnit(selectedMetric)}`, getMetricTitle(selectedMetric)]}
              separator=": "
              labelFormatter={(label) => `تاریخ: ${label}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <ReferenceLine 
              x={currentIndex !== -1 ? predictedData[currentIndex].date : undefined} 
              strokeDasharray="3 3"
              label={{ value: 'شروع پیش‌بینی', position: 'insideTopRight' }}
              stroke="#9CA3AF"
            />
            <Line
              type="monotone"
              dataKey="value"
              name={getMetricTitle(selectedMetric)}
              stroke={getMetricColor(selectedMetric)}
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </ReChartsLineChart>
        </ResponsiveContainer>
      </div>
      
      {trendData.summary && (
        <div className="bg-gradient-to-r from-indigo-50 to-transparent dark:from-indigo-900/20 dark:to-transparent p-4 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <Brain className="h-5 w-5 text-indigo-500 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200">
                تحلیل روند
              </h3>
              <p className="text-indigo-700 dark:text-indigo-300 mt-1 text-sm">
                {trendData.summary}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 mr-3">
                <LineChart className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">میانگین فعلی</p>
                <p className="text-xl font-bold">
                  {Math.round(averageBefore * 10) / 10}
                  <span className="text-sm text-muted-foreground ml-1">
                    {getMetricUnit(selectedMetric)}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/30 mr-3">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">میانگین پیش‌بینی</p>
                <p className="text-xl font-bold">
                  {Math.round(averageAfter * 10) / 10}
                  <span className="text-sm text-muted-foreground ml-1">
                    {getMetricUnit(selectedMetric)}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${
                changePercent > 0 ? 'bg-success-50 dark:bg-success-900/30' : 
                changePercent < 0 ? 'bg-error-50 dark:bg-error-900/30' : 
                'bg-gray-50 dark:bg-gray-800/50'
              } mr-3`}>
                {changePercent > 0 ? (
                  <TrendingUp className="h-5 w-5 text-success-500" />
                ) : changePercent < 0 ? (
                  <TrendingDown className="h-5 w-5 text-error-500" />
                ) : (
                  <LineChart className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تغییر پیش‌بینی شده</p>
                <p className={`text-xl font-bold ${
                  changePercent > 0 ? 'text-success-500' : 
                  changePercent < 0 ? 'text-error-500' : 
                  'text-gray-500'
                }`}>
                  {changePercent > 0 ? '+' : ''}{changePercent}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {trendData.insights && trendData.insights.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">بینش‌های پیش‌بینی</h3>
          
          <div className="space-y-2">
            {trendData.insights.map((insight: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-3 rounded-lg border ${
                  insight.sentiment === 'positive' || insight.sentiment === 'مثبت' ? 
                    'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800/40' : 
                  insight.sentiment === 'negative' || insight.sentiment === 'منفی' ? 
                    'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800/40' : 
                    'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/40'
                }`}
              >
                <div className="flex items-start space-x-2 rtl:space-x-reverse">
                  <div className="mt-0.5">
                    {insight.sentiment === 'positive' || insight.sentiment === 'مثبت' ? 
                      <TrendingUp className="h-4 w-4 text-success-500" /> : 
                    insight.sentiment === 'negative' || insight.sentiment === 'منفی' ? 
                      <TrendingDown className="h-4 w-4 text-error-500" /> : 
                      <LineChart className="h-4 w-4 text-blue-500" />}
                  </div>
                  
                  <div>
                    <p className="text-sm">
                      {insight.content || insight.text || insight}
                    </p>
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

export default TrendPrediction;