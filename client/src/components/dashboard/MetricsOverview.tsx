/**
 * @file MetricsOverview.tsx
 * @description کامپوننت مرور و خلاصه متریک‌ها
 * 
 * این کامپوننت مرور کلی از متریک‌های کلیدی سلامت و عملکرد را نمایش می‌دهد.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  Footprints, 
  Coffee, 
  Clock, 
  Calendar,
  BarChart3,
  Flame
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { Card, CardContent } from '@/design-system/atoms/Card';
import { DataCard } from '@/design-system/molecules/DataCard';

interface MetricsOverviewProps {
  data: any[];
  timeRange: string;
  isLoading: boolean;
}

// کامپوننت مرور متریک‌ها
const MetricsOverview: React.FC<MetricsOverviewProps> = ({ data, timeRange, isLoading }) => {
  // داده‌های متریک‌های اصلی
  const metricsData = [
    { 
      title: "قدم‌های روزانه", 
      value: "9,521", 
      trend: { value: 6.2, direction: 'up', timeframe: 'این هفته' },
      icon: <Footprints className="h-5 w-5 text-blue-500" />,
      sparkline: [40, 35, 60, 75, 58, 62, 80, 55, 65, 80],
      state: "positive",
    },
    { 
      title: "سطح استرس", 
      value: "35%", 
      trend: { value: 8.4, direction: 'down', timeframe: 'این هفته' },
      icon: <Coffee className="h-5 w-5 text-orange-500" />,
      sparkline: [65, 70, 55, 58, 45, 48, 40, 42, 35, 30],
      state: "positive",
    },
    { 
      title: "زمان خواب", 
      value: "6.8h", 
      trend: { value: 0.5, direction: 'up', timeframe: 'این هفته' },
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      sparkline: [5.8, 6.2, 6.5, 6.0, 6.3, 6.7, 6.8, 7.0, 6.7, 6.9],
      state: "positive",
    },
    { 
      title: "ضربان قلب", 
      value: "72 BPM", 
      trend: { value: 2.1, direction: 'down', timeframe: 'این هفته' },
      icon: <Heart className="h-5 w-5 text-red-500" />,
      sparkline: [75, 74, 76, 73, 72, 71, 73, 72, 70, 72],
      state: "positive",
    },
    { 
      title: "کالری مصرفی", 
      value: "2,350", 
      trend: { value: 3.8, direction: 'up', timeframe: 'این هفته' },
      icon: <Flame className="h-5 w-5 text-yellow-500" />,
      sparkline: [2100, 2250, 2180, 2300, 2280, 2320, 2350, 2380, 2400, 2350],
      state: "positive",
    },
    { 
      title: "فعالیت هفتگی", 
      value: "5.2h", 
      trend: { value: 12.5, direction: 'up', timeframe: 'این ماه' },
      icon: <Activity className="h-5 w-5 text-green-500" />,
      sparkline: [3.2, 3.5, 4.1, 4.8, 4.5, 5.0, 5.2, 5.5, 5.3, 5.6],
      state: "positive",
    },
    { 
      title: "تکمیل چالش‌ها", 
      value: "68%", 
      trend: { value: 15.0, direction: 'up', timeframe: 'این ماه' },
      icon: <Calendar className="h-5 w-5 text-indigo-500" />,
      sparkline: [45, 48, 52, 55, 60, 62, 65, 68, 70, 72],
      state: "positive",
    },
    { 
      title: "امتیاز سلامت", 
      value: "82", 
      trend: { value: 4.2, direction: 'up', timeframe: 'این ماه' },
      icon: <BarChart3 className="h-5 w-5 text-tiffany" />,
      sparkline: [72, 75, 74, 77, 79, 80, 81, 82, 83, 84],
      state: "positive",
    },
  ];
  
  // داده‌های نمودار روند
  const trendData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    steps: Math.floor(Math.random() * 500) + 100,
    heartRate: Math.floor(Math.random() * 20) + 60,
    calories: Math.floor(Math.random() * 50) + 50,
  }));
  
  // وضعیت بارگذاری
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm h-28 animate-pulse p-4"
            >
              <div className="flex justify-between">
                <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="h-6 w-16 mt-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-full mt-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          ))}
        </div>
        
        <div className="h-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse p-4">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-full w-full mt-4 bg-gray-100 dark:bg-gray-700/30 rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* کارت‌های متریک */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <DataCard
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              trend={metric.trend}
              state={metric.state as any}
              layout="chart"
              sparkline={metric.sparkline}
            />
          </motion.div>
        ))}
      </div>
      
      {/* نمودار روند روزانه */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">روند فعالیت در طول روز</h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#888888" 
                  tickFormatter={(hour) => `${hour}:00`}
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  yAxisId="left"
                  orientation="left"
                />
                <YAxis 
                  stroke="#888888" 
                  fontSize={12} 
                  yAxisId="right" 
                  orientation="right"
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'steps') return [`${value} قدم`, 'قدم‌ها'];
                    if (name === 'heartRate') return [`${value} BPM`, 'ضربان قلب'];
                    if (name === 'calories') return [`${value} کالری`, 'کالری'];
                    return [value, name];
                  }}
                  labelFormatter={(hour) => `ساعت ${hour}:00`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #f0f0f0',
                    borderRadius: '4px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="steps" 
                  name="قدم‌ها"
                  stroke="#3B82F6" 
                  fill="#3B82F650" 
                  yAxisId="left"
                />
                <Area 
                  type="monotone" 
                  dataKey="heartRate" 
                  name="ضربان قلب"
                  stroke="#EF4444" 
                  fill="#EF444450" 
                  yAxisId="right"
                />
                <Area 
                  type="monotone" 
                  dataKey="calories" 
                  name="کالری"
                  stroke="#F59E0B" 
                  fill="#F59E0B50" 
                  yAxisId="left"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;