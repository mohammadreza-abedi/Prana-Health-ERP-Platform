/**
 * @file PerformanceChart.tsx
 * @description کامپوننت نمودار عملکرد
 * 
 * این کامپوننت نمودار عملکرد کاربر را برای متریک‌های مختلف نمایش می‌دهد.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity, 
  Heart,
  Footprints, 
  Flame,
  BadgeCheck
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
  Area, 
  AreaChart,
  Bar,
  BarChart
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Card, CardContent } from '@/design-system/atoms/Card';

interface PerformanceChartProps {
  data: any[];
  isLoading: boolean;
  simplified?: boolean;
}

// کامپوننت نمودار عملکرد
const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, isLoading, simplified = false }) => {
  const [activeMetric, setActiveMetric] = useState<string>('steps');
  const [chartType, setChartType] = useState<string>('line');
  const [timeRange, setTimeRange] = useState<string>('week');
  
  // داده‌های نمونه
  const performanceData = {
    steps: [
      { day: 'شنبه', value: 8500, goal: 10000 },
      { day: 'یکشنبه', value: 10200, goal: 10000 },
      { day: 'دوشنبه', value: 9300, goal: 10000 },
      { day: 'سه‌شنبه', value: 11500, goal: 10000 },
      { day: 'چهارشنبه', value: 9800, goal: 10000 },
      { day: 'پنج‌شنبه', value: 12300, goal: 10000 },
      { day: 'جمعه', value: 8900, goal: 10000 },
    ],
    heartRate: [
      { day: 'شنبه', value: 72, min: 65, max: 78 },
      { day: 'یکشنبه', value: 70, min: 64, max: 75 },
      { day: 'دوشنبه', value: 74, min: 68, max: 80 },
      { day: 'سه‌شنبه', value: 71, min: 64, max: 76 },
      { day: 'چهارشنبه', value: 69, min: 62, max: 74 },
      { day: 'پنج‌شنبه', value: 73, min: 67, max: 79 },
      { day: 'جمعه', value: 75, min: 68, max: 82 },
    ],
    calories: [
      { day: 'شنبه', value: 1850, target: 2000 },
      { day: 'یکشنبه', value: 2100, target: 2000 },
      { day: 'دوشنبه', value: 1950, target: 2000 },
      { day: 'سه‌شنبه', value: 2250, target: 2000 },
      { day: 'چهارشنبه', value: 2050, target: 2000 },
      { day: 'پنج‌شنبه', value: 2300, target: 2000 },
      { day: 'جمعه', value: 1900, target: 2000 },
    ],
    exercise: [
      { day: 'شنبه', value: 45, type: 'دویدن' },
      { day: 'یکشنبه', value: 30, type: 'دوچرخه' },
      { day: 'دوشنبه', value: 0, type: 'استراحت' },
      { day: 'سه‌شنبه', value: 60, type: 'باشگاه' },
      { day: 'چهارشنبه', value: 25, type: 'پیاده‌روی' },
      { day: 'پنج‌شنبه', value: 50, type: 'شنا' },
      { day: 'جمعه', value: 0, type: 'استراحت' },
    ],
    points: [
      { day: 'شنبه', value: 120 },
      { day: 'یکشنبه', value: 150 },
      { day: 'دوشنبه', value: 80 },
      { day: 'سه‌شنبه', value: 200 },
      { day: 'چهارشنبه', value: 110 },
      { day: 'پنج‌شنبه', value: 170 },
      { day: 'جمعه', value: 90 },
    ],
  };
  
  // دریافت عنوان متریک مربوطه
  const getMetricTitle = (metric: string) => {
    switch(metric) {
      case 'steps':
        return 'قدم‌های روزانه';
      case 'heartRate':
        return 'ضربان قلب';
      case 'calories':
        return 'کالری مصرفی';
      case 'exercise':
        return 'زمان ورزش';
      case 'points':
        return 'امتیازات سلامت';
      default:
        return metric;
    }
  };
  
  // دریافت رنگ متریک مربوطه
  const getMetricColor = (metric: string) => {
    switch(metric) {
      case 'steps':
        return '#3B82F6'; // آبی
      case 'heartRate':
        return '#EF4444'; // قرمز
      case 'calories':
        return '#F59E0B'; // نارنجی
      case 'exercise':
        return '#8B5CF6'; // بنفش
      case 'points':
        return '#10B981'; // سبز
      default:
        return '#6B7280';
    }
  };
  
  // دریافت آیکون متریک مربوطه
  const getMetricIcon = (metric: string) => {
    switch(metric) {
      case 'steps':
        return <Footprints className="h-5 w-5" />;
      case 'heartRate':
        return <Heart className="h-5 w-5" />;
      case 'calories':
        return <Flame className="h-5 w-5" />;
      case 'exercise':
        return <Activity className="h-5 w-5" />;
      case 'points':
        return <BadgeCheck className="h-5 w-5" />;
      default:
        return <BarChart3 className="h-5 w-5" />;
    }
  };
  
  // دریافت واحد متریک مربوطه
  const getMetricUnit = (metric: string) => {
    switch(metric) {
      case 'steps':
        return 'قدم';
      case 'heartRate':
        return 'BPM';
      case 'calories':
        return 'کالری';
      case 'exercise':
        return 'دقیقه';
      case 'points':
        return 'امتیاز';
      default:
        return '';
    }
  };
  
  // دریافت داده‌های نمودار بر اساس متریک انتخابی
  const getChartData = () => {
    return performanceData[activeMetric as keyof typeof performanceData] || [];
  };
  
  // دریافت نوع چارت
  const getChartComponent = () => {
    const chartData = getChartData();
    const color = getMetricColor(activeMetric);
    const unit = getMetricUnit(activeMetric);
    
    const tooltipFormatter = (value: number) => [`${value} ${unit}`, getMetricTitle(activeMetric)];
    
    const tooltipStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid #f0f0f0',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    };
    
    switch(chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ReChartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
              <XAxis dataKey="day" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip 
                formatter={tooltipFormatter} 
                contentStyle={tooltipStyle}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                name={getMetricTitle(activeMetric)} 
                stroke={color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              {activeMetric === 'steps' && (
                <Line 
                  type="monotone" 
                  dataKey="goal" 
                  name="هدف" 
                  stroke="#D1D5DB" 
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
              {activeMetric === 'calories' && (
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name="هدف" 
                  stroke="#D1D5DB" 
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
              {activeMetric === 'heartRate' && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="min" 
                    name="حداقل" 
                    stroke="#D1D5DB" 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="max" 
                    name="حداکثر" 
                    stroke="#D1D5DB" 
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </>
              )}
            </ReChartsLineChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
              <XAxis dataKey="day" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip 
                formatter={tooltipFormatter} 
                contentStyle={tooltipStyle}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="value" 
                name={getMetricTitle(activeMetric)} 
                stroke={color}
                fill={`${color}40`} // 25% opacity
              />
              {activeMetric === 'steps' && (
                <Line 
                  type="monotone" 
                  dataKey="goal" 
                  name="هدف" 
                  stroke="#D1D5DB"
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
              {activeMetric === 'calories' && (
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name="هدف" 
                  stroke="#D1D5DB"
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
              <XAxis dataKey="day" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip 
                formatter={tooltipFormatter} 
                contentStyle={tooltipStyle}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                name={getMetricTitle(activeMetric)} 
                fill={color}
                radius={[4, 4, 0, 0]}
              />
              {activeMetric === 'steps' && (
                <Line 
                  type="monotone" 
                  dataKey="goal" 
                  name="هدف" 
                  stroke="#D1D5DB" 
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
              {activeMetric === 'calories' && (
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  name="هدف" 
                  stroke="#D1D5DB" 
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };
  
  // وضعیت بارگذاری
  if (isLoading) {
    return (
      <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
    );
  }
  
  // حالت ساده‌شده (برای استفاده در کارت‌های کوچک‌تر)
  if (simplified) {
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={getChartData()}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getMetricColor(activeMetric)} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={getMetricColor(activeMetric)} stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} />
            <YAxis hide />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#00000011" />
            <Tooltip 
              formatter={(value: number) => [`${value} ${getMetricUnit(activeMetric)}`, getMetricTitle(activeMetric)]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={getMetricColor(activeMetric)} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  // حالت کامل با کنترل‌های بیشتر
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Tabs 
            value={activeMetric} 
            onValueChange={setActiveMetric} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="steps" className="flex items-center space-x-1 rtl:space-x-reverse">
                <Footprints className="h-4 w-4" />
                <span className="hidden sm:inline">قدم‌ها</span>
              </TabsTrigger>
              <TabsTrigger value="heartRate" className="flex items-center space-x-1 rtl:space-x-reverse">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">ضربان</span>
              </TabsTrigger>
              <TabsTrigger value="calories" className="flex items-center space-x-1 rtl:space-x-reverse">
                <Flame className="h-4 w-4" />
                <span className="hidden sm:inline">کالری</span>
              </TabsTrigger>
              <TabsTrigger value="exercise" className="flex items-center space-x-1 rtl:space-x-reverse">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">ورزش</span>
              </TabsTrigger>
              <TabsTrigger value="points" className="flex items-center space-x-1 rtl:space-x-reverse">
                <BadgeCheck className="h-4 w-4" />
                <span className="hidden sm:inline">امتیازات</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[110px]">
              {chartType === 'line' ? <LineChart className="h-4 w-4 mr-2" /> : 
               chartType === 'area' ? <BarChart3 className="h-4 w-4 mr-2" /> : 
               <PieChart className="h-4 w-4 mr-2" />}
              <SelectValue placeholder="نوع نمودار" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">خطی</SelectItem>
              <SelectItem value="area">منطقه‌ای</SelectItem>
              <SelectItem value="bar">ستونی</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="بازه زمانی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">هفته</SelectItem>
              <SelectItem value="month">ماه</SelectItem>
              <SelectItem value="year">سال</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="h-80">
        <motion.div
          key={`${activeMetric}-${chartType}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          {getChartComponent()}
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-full bg-blue-50 dark:bg-blue-900/30 mr-3`}>
                {getMetricIcon(activeMetric)}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">میانگین</p>
                <p className="text-xl font-bold">
                  {Math.round(getChartData().reduce((acc, item) => acc + item.value, 0) / getChartData().length)}
                  <span className="text-sm text-muted-foreground ml-1">
                    {getMetricUnit(activeMetric)}
                  </span>
                </p>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300`}>
              نرمال
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-full bg-green-50 dark:bg-green-900/30 mr-3`}>
                <LineChart className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">بیشترین</p>
                <p className="text-xl font-bold">
                  {Math.max(...getChartData().map(item => item.value))}
                  <span className="text-sm text-muted-foreground ml-1">
                    {getMetricUnit(activeMetric)}
                  </span>
                </p>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-300`}>
              +12%
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-full bg-amber-50 dark:bg-amber-900/30 mr-3`}>
                <BarChart3 className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">هدف</p>
                <p className="text-xl font-bold">
                  {activeMetric === 'steps' ? getChartData()[0]?.goal : 
                   activeMetric === 'calories' ? getChartData()[0]?.target : 
                   '-'}
                  <span className="text-sm text-muted-foreground ml-1">
                    {getMetricUnit(activeMetric)}
                  </span>
                </p>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              activeMetric === 'steps' || activeMetric === 'calories' ? 
                'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' : 
                'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}>
              {activeMetric === 'steps' || activeMetric === 'calories' ? 
                `${Math.round((getChartData().reduce((acc, item) => acc + item.value, 0) / getChartData().length) / 
                  (activeMetric === 'steps' ? getChartData()[0]?.goal : getChartData()[0]?.target) * 100)}%` : 
                '-'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceChart;