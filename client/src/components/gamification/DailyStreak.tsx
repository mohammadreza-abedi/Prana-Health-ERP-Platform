/**
 * @file DailyStreak.tsx
 * @description کامپوننت نمایش تداوم روزانه
 * 
 * این کامپوننت تداوم روزانه فعالیت کاربر را نمایش می‌دهد.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, CheckCircle, X, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/atoms/Card';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';

// کامپوننت تداوم روزانه
const DailyStreak: React.FC = () => {
  const { user } = useAuth();
  
  // دریافت داده‌های تداوم روزانه
  const { data, isLoading } = useQuery({
    queryKey: ['/api/gamification/daily-streak', user?.id],
    enabled: !!user?.id,
  });
  
  // داده‌های پیش‌فرض
  const streakData = data || {
    currentStreak: 16,
    longestStreak: 45,
    nextMilestone: 20,
    nextReward: "100 امتیاز + نشان تلاشگر",
    lastWeek: [
      { day: "شنبه", completed: true },
      { day: "یک‌شنبه", completed: true },
      { day: "دوشنبه", completed: true },
      { day: "سه‌شنبه", completed: true },
      { day: "چهارشنبه", completed: true },
      { day: "پنج‌شنبه", completed: true },
      { day: "جمعه", completed: false, isToday: true }
    ]
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            تداوم روزانه شما
          </div>
          
          <motion.div 
            className="flex items-center justify-center h-7 w-7 rounded-full bg-orange-50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <span className="text-sm font-bold text-orange-600 dark:text-orange-300">{streakData.currentStreak}</span>
          </motion.div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-3xl font-bold text-orange-500">{streakData.currentStreak}</p>
            <p className="text-xs text-muted-foreground">روز متوالی</p>
          </motion.div>
          
          <div className="h-10 border-r border-gray-200 dark:border-gray-700"></div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-lg font-bold">{streakData.longestStreak}</p>
            <p className="text-xs text-muted-foreground">بیشترین تداوم</p>
          </motion.div>
          
          <div className="h-10 border-r border-gray-200 dark:border-gray-700"></div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <p className="text-lg font-bold">{streakData.nextMilestone}</p>
            <p className="text-xs text-muted-foreground">هدف بعدی</p>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex justify-between mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          {streakData.lastWeek.map((day, index) => (
            <div key={index} className="text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 mx-auto ${
                day.isToday 
                  ? 'bg-orange-500 text-white border-2 border-orange-200 dark:border-orange-400/30' 
                  : (day.completed 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500')
              }`}>
                {day.isToday && !day.completed ? (
                  <PlusCircle className="h-4 w-4" />
                ) : (
                  day.completed ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />
                )}
              </div>
              <p className="text-xs">{day.day.substring(0, 1)}</p>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-4 p-2.5 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100/30 dark:from-orange-900/20 dark:to-orange-800/10 border border-orange-200/50 dark:border-orange-800/30 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">جایزه بعدی در {streakData.nextMilestone - streakData.currentStreak} روز آینده:</p>
              <p className="text-xs text-muted-foreground mt-0.5">{streakData.nextReward}</p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default DailyStreak;