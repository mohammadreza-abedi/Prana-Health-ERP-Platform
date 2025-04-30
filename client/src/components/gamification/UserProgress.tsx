/**
 * @file UserProgress.tsx
 * @description کامپوننت نمایش پیشرفت کاربر
 * 
 * این کامپوننت پیشرفت کاربر را در چالش‌های مختلف و فعالیت‌های سلامتی نمایش می‌دهد.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Activity, Target, ChevronRight, PieChart, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/design-system/atoms/Card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/design-system/atoms/Button';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';

// کامپوننت پیشرفت کاربر
const UserProgress: React.FC = () => {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  
  // دریافت داده‌های پیشرفت کاربر
  const { data, isLoading } = useQuery({
    queryKey: ['/api/gamification/user-progress', user?.id],
    enabled: !!user?.id,
  });
  
  // داده‌های پیش‌فرض
  const progressData = data || {
    activeGoals: [
      {
        name: "پیاده‌روی روزانه",
        current: 8500,
        target: 10000,
        unit: "قدم",
        percentage: 85
      },
      {
        name: "مصرف آب",
        current: 6,
        target: 8,
        unit: "لیوان",
        percentage: 75
      },
      {
        name: "ورزش هفتگی",
        current: 2,
        target: 3,
        unit: "جلسه",
        percentage: 67
      }
    ],
    weeklyProgress: {
      completedChallenges: 4,
      totalChallenges: 7,
      percentage: 57,
      comparison: "+23%"
    },
    monthlyStats: {
      totalXP: 3450,
      totalBadges: 5,
      averageActivity: 82
    }
  };
  
  // مدیریت کلیک روی دکمه
  const handleViewAllClick = () => {
    setLocation('/gamification');
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-indigo-500" />
            پیشرفت فعالیت‌های شما
          </div>
          
          <motion.div 
            className="flex items-center justify-center h-7 w-7 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <PieChart className="h-4 w-4 text-indigo-500" />
          </motion.div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* نمایش اهداف فعال */}
        <div className="space-y-4">
          {progressData.activeGoals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-1">
                <span className="text-sm">{goal.name}</span>
                <span className="text-sm text-muted-foreground">
                  {goal.current}/{goal.target} {goal.unit}
                </span>
              </div>
              <Progress 
                value={goal.percentage} 
                className="h-2 bg-indigo-100 dark:bg-indigo-900/20"
              />
            </motion.div>
          ))}
        </div>
        
        {/* آمار هفتگی */}
        <motion.div
          className="mt-5 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100/30 dark:from-indigo-900/20 dark:to-indigo-800/10 border border-indigo-200/50 dark:border-indigo-800/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 mr-3">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">پیشرفت هفتگی</p>
                <p className="text-sm text-muted-foreground">
                  {progressData.weeklyProgress.completedChallenges} از {progressData.weeklyProgress.totalChallenges} چالش تکمیل شده
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">{progressData.weeklyProgress.percentage}%</span>
              <p className="text-xs text-green-600 dark:text-green-400">{progressData.weeklyProgress.comparison}</p>
            </div>
          </div>
        </motion.div>
        
        {/* آمار ماهانه خلاصه */}
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <motion.div
            className="p-2 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <p className="text-lg font-bold">{progressData.monthlyStats.totalXP}</p>
            <p className="text-xs text-muted-foreground">XP ماهانه</p>
          </motion.div>
          
          <motion.div
            className="p-2 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <p className="text-lg font-bold">{progressData.monthlyStats.totalBadges}</p>
            <p className="text-xs text-muted-foreground">نشان جدید</p>
          </motion.div>
          
          <motion.div
            className="p-2 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <p className="text-lg font-bold">{progressData.monthlyStats.averageActivity}%</p>
            <p className="text-xs text-muted-foreground">میانگین فعالیت</p>
          </motion.div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
          onClick={handleViewAllClick}
        >
          مشاهده همه فعالیت‌ها
          <ChevronRight className="mr-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProgress;