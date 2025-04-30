/**
 * @file HealthInsights.tsx
 * @description کامپوننت بینش‌های سلامت
 * 
 * این کامپوننت بینش‌ها و تحلیل‌های مربوط به داده‌های سلامت کاربر را نمایش می‌دهد.
 */

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Activity, 
  Moon, 
  Coffee, 
  Utensils, 
  Droplets,
  BarChart,
  Flame
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface HealthInsightsProps {
  data: any[];
  isLoading: boolean;
}

// کامپوننت بینش‌های سلامت
const HealthInsights: React.FC<HealthInsightsProps> = ({ data, isLoading }) => {
  // محاسبه و مرتب‌سازی داده‌ها برای نمایش
  const healthScore = useMemo(() => {
    // در حالت واقعی، محاسبه امتیاز سلامت براساس فاکتورهای مختلف
    return data?.length ? 
      Math.min(100, Math.max(0, 75 + Math.floor(Math.random() * 15))) : 
      87;
  }, [data]);
  
  // داده‌های نمونه برای نمودار رادار سلامت
  const radarData = useMemo(() => [
    { category: 'فعالیت بدنی', value: 78, fullMark: 100 },
    { category: 'خواب', value: 65, fullMark: 100 },
    { category: 'تغذیه', value: 82, fullMark: 100 },
    { category: 'استرس', value: 60, fullMark: 100 },
    { category: 'آب', value: 85, fullMark: 100 },
    { category: 'وزن', value: 72, fullMark: 100 },
  ], []);
  
  // داده‌های نمونه برای نمودار دایره‌ای تقسیم فعالیت‌ها
  const activityData = useMemo(() => [
    { name: 'استراحت', value: 35, color: '#8B5CF6' },
    { name: 'فعالیت شدید', value: 15, color: '#EF4444' },
    { name: 'فعالیت متوسط', value: 20, color: '#F59E0B' },
    { name: 'فعالیت سبک', value: 30, color: '#3B82F6' },
  ], []);
  
  // وضعیت بارگذاری
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6">
        <div className="h-[180px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-[180px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    );
  }
  
  // شاخص‌های اصلی سلامت
  const healthMetrics = [
    { 
      label: 'امتیاز کلی سلامت', 
      value: `${healthScore}/100`, 
      icon: <Heart className="h-5 w-5 text-red-500" />,
      description: 'در وضعیت خوبی هستید',
      trendValue: '+3%',
      trendLabel: 'بهتر از ماه قبل',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    { 
      label: 'میانگین ضربان قلب', 
      value: '73 BPM', 
      icon: <Activity className="h-5 w-5 text-purple-500" />,
      description: 'در محدوده نرمال',
      trendValue: '-2 BPM',
      trendLabel: 'کمتر از ماه قبل',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    { 
      label: 'میانگین ساعات خواب', 
      value: '6.8h', 
      icon: <Moon className="h-5 w-5 text-blue-500" />,
      description: 'کمی کمتر از حد مطلوب',
      trendValue: '+0.3h',
      trendLabel: 'بهتر از ماه قبل',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      label: 'میانگین سطح استرس', 
      value: '32%', 
      icon: <Coffee className="h-5 w-5 text-yellow-500" />,
      description: 'در محدوده قابل قبول',
      trendValue: '-5%',
      trendLabel: 'کمتر از ماه قبل',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    { 
      label: 'مصرف کالری روزانه', 
      value: '2,150', 
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      description: 'در محدوده مناسب',
      trendValue: '+50 kcal',
      trendLabel: 'بیشتر از ماه قبل',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    { 
      label: 'مصرف آب روزانه', 
      value: '2.3L', 
      icon: <Droplets className="h-5 w-5 text-cyan-500" />,
      description: 'مقدار توصیه شده',
      trendValue: '+0.2L',
      trendLabel: 'بهتر از ماه قبل',
      bgColor: 'bg-cyan-50 dark:bg-cyan-900/20'
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* شاخص‌های کلیدی سلامت */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`rounded-lg p-3 ${metric.bgColor}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-full">
                  {metric.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{metric.label}</p>
                  <p className="text-xl font-bold">{metric.value}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">{metric.description}</p>
                <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {metric.trendValue} <span className="text-xs text-gray-500 dark:text-gray-400">{metric.trendLabel}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* نمودار رادار توزیع شاخص‌های سلامت */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-primary-500" />
          شاخص‌های جامع سلامت
        </h3>
        
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#88888833" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#888888', fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#888888', fontSize: 10 }} />
              <Radar
                name="امتیاز"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.4}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* نمودار دایره‌ای توزیع فعالیت‌ها */}
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Utensils className="h-5 w-5 mr-2 text-orange-500" />
          توزیع فعالیت‌های روزانه
        </h3>
        
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HealthInsights;