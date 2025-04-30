/**
 * @file PerformanceChart.tsx
 * @description کامپوننت نمودار عملکرد
 * 
 * این کامپوننت نمودارهای تحلیلی برای نمایش عملکرد سلامت کاربر را فراهم می‌کند.
 */

import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area 
} from 'recharts';
import { motion } from 'framer-motion';
import { ChartBar, LineChart as LineChartIcon, BarChart3 } from 'lucide-react';

interface PerformanceChartProps {
  data: any[];
  timeRange: string;
  isLoading: boolean;
}

type ChartType = 'line' | 'bar' | 'area';

// کامپوننت نمودار تحلیلی عملکرد
const PerformanceChart: React.FC<PerformanceChartProps> = ({ data, timeRange, isLoading }) => {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [activeMetric, setActiveMetric] = useState<string>('steps');
  
  // داده‌های نمونه برای نمایش در حالت بارگذاری یا خالی بودن داده‌ها
  const sampleData = useMemo(() => [
    { date: '۱ فروردین', steps: 8500, calories: 2100, heartRate: 72, sleep: 7.2, stress: 35 },
    { date: '۲ فروردین', steps: 10200, calories: 2300, heartRate: 75, sleep: 6.8, stress: 42 },
    { date: '۳ فروردین', steps: 7800, calories: 1950, heartRate: 71, sleep: 7.5, stress: 38 },
    { date: '۴ فروردین', steps: 9300, calories: 2250, heartRate: 73, sleep: 7.0, stress: 40 },
    { date: '۵ فروردین', steps: 11500, calories: 2450, heartRate: 78, sleep: 6.5, stress: 45 },
    { date: '۶ فروردین', steps: 8900, calories: 2150, heartRate: 74, sleep: 7.3, stress: 36 },
    { date: '۷ فروردین', steps: 10800, calories: 2350, heartRate: 77, sleep: 6.9, stress: 41 },
  ], []);
  
  // فیلتر داده‌ها بر اساس بازه زمانی انتخاب شده
  const filteredData = useMemo(() => {
    if (data.length === 0) return sampleData;
    
    // در حالت واقعی، فیلتر داده‌ها بر اساس timeRange
    return data;
  }, [data, timeRange, sampleData]);
  
  // تنظیمات رنگ و نمایش برای متریک‌های مختلف
  const metricConfig = {
    steps: { 
      label: 'قدم‌ها', 
      color: '#3B82F6', 
      yAxisProps: { domain: [0, 15000], tickCount: 5 },
      formatter: (value: number) => `${value.toLocaleString()} قدم`,
    },
    calories: { 
      label: 'کالری', 
      color: '#F97316', 
      yAxisProps: { domain: [0, 3000], tickCount: 6 },
      formatter: (value: number) => `${value.toLocaleString()} کالری`,
    },
    heartRate: { 
      label: 'ضربان قلب', 
      color: '#EF4444', 
      yAxisProps: { domain: [50, 100], tickCount: 5 },
      formatter: (value: number) => `${value} ضربان در دقیقه`,
    },
    sleep: { 
      label: 'ساعات خواب', 
      color: '#8B5CF6', 
      yAxisProps: { domain: [0, 10], tickCount: 5 },
      formatter: (value: number) => `${value} ساعت`,
    },
    stress: { 
      label: 'سطح استرس', 
      color: '#EC4899', 
      yAxisProps: { domain: [0, 100], tickCount: 5 },
      formatter: (value: number) => `${value}%`,
    },
  };
  
  // وضعیت بارگذاری
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-4 min-h-[350px]">
        <div className="flex space-x-4 rtl:space-x-reverse">
          {['line', 'bar', 'area'].map((type) => (
            <div key={type} className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
        
        <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto py-1">
          {Object.keys(metricConfig).map((metric) => (
            <div key={metric} className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-shrink-0"></div>
          ))}
        </div>
        
        <div className="h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    );
  }
  
  // انتخاب کامپوننت نمودار بر اساس نوع انتخاب شده
  const renderChart = () => {
    const config = metricConfig[activeMetric as keyof typeof metricConfig];
    
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
            <XAxis dataKey="date" stroke="#888888" fontSize={12} />
            <YAxis 
              {...config.yAxisProps}
              stroke="#888888" 
              fontSize={12}
            />
            <Tooltip 
              formatter={config.formatter}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={activeMetric} 
              name={config.label}
              stroke={config.color} 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 1 }}
            />
          </LineChart>
        );
        
      case 'bar':
        return (
          <BarChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
            <XAxis dataKey="date" stroke="#888888" fontSize={12} />
            <YAxis 
              {...config.yAxisProps}
              stroke="#888888" 
              fontSize={12}
            />
            <Tooltip 
              formatter={config.formatter}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey={activeMetric} 
              name={config.label}
              fill={config.color} 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
        
      case 'area':
        return (
          <AreaChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
            <XAxis dataKey="date" stroke="#888888" fontSize={12} />
            <YAxis 
              {...config.yAxisProps}
              stroke="#888888" 
              fontSize={12}
            />
            <Tooltip 
              formatter={config.formatter}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey={activeMetric} 
              name={config.label}
              stroke={config.color} 
              fill={`${config.color}33`}
            />
          </AreaChart>
        );
    }
  };
  
  return (
    <div className="space-y-4">
      {/* کنترل‌های نوع نمودار */}
      <div className="flex space-x-2 rtl:space-x-reverse">
        <button
          onClick={() => setChartType('line')}
          className={`p-2 rounded-md ${chartType === 'line' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
        >
          <LineChartIcon className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => setChartType('bar')}
          className={`p-2 rounded-md ${chartType === 'bar' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
        >
          <BarChart3 className="h-5 w-5" />
        </button>
        
        <button
          onClick={() => setChartType('area')}
          className={`p-2 rounded-md ${chartType === 'area' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
        >
          <ChartBar className="h-5 w-5" />
        </button>
      </div>
      
      {/* انتخاب متریک */}
      <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto pb-2">
        {Object.entries(metricConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActiveMetric(key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
              activeMetric === key 
                ? `bg-[${config.color}] text-white` 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{ backgroundColor: activeMetric === key ? config.color : undefined }}
          >
            {config.label}
          </button>
        ))}
      </div>
      
      {/* نمودار */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-[300px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default PerformanceChart;