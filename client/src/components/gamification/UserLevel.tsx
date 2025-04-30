/**
 * @file UserLevel.tsx
 * @description کامپوننت نمایش سطح کاربر و تجربه
 * 
 * این کامپوننت اطلاعات مربوط به سطح کاربر و میزان تجربه او را نمایش می‌دهد.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, Star, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/atoms/Card';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';

// کامپوننت سطح کاربر
const UserLevel: React.FC = () => {
  const { user } = useAuth();
  
  // دریافت داده‌های سطح کاربر
  const { data, isLoading } = useQuery({
    queryKey: ['/api/gamification/user-level', user?.id],
    enabled: !!user?.id,
  });
  
  // داده‌های پیش‌فرض
  const levelData = data || {
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
    totalXP: 24450,
    xpBonus: 15,
    activeBadgesCount: 3,
    nextLevelBenefits: [
      "دسترسی به چالش‌های جدید",
      "افزایش ضریب امتیازدهی",
      "امکان شرکت در مسابقات ویژه"
    ]
  };
  
  // محاسبه درصد پیشرفت
  const progressPercentage = (levelData.xp / levelData.xpToNextLevel) * 100;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary-500" />
            سطح و تجربه شما
          </div>
          <motion.div 
            className="flex items-center justify-center h-7 w-7 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Star className="h-4 w-4 text-amber-500" />
          </motion.div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-3xl font-bold flex items-center gap-1">
              {levelData.level}
              <span className="text-sm font-normal text-muted-foreground">سطح</span>
            </p>
            <p className="text-sm text-muted-foreground">
              {levelData.xp}/{levelData.xpToNextLevel} XP
            </p>
          </div>
          
          <div className="flex items-center">
            <Trophy className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-sm font-medium">{levelData.totalXP} XP کل</span>
          </div>
        </div>
        
        <div className="mb-3">
          <Progress 
            value={progressPercentage} 
            className="h-2.5 bg-primary-100 dark:bg-primary-900/20"
          />
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
              <ChevronUp className="h-3.5 w-3.5 mr-0.5" />
              {levelData.xpBonus}% ضریب XP
            </Badge>
            
            {levelData.activeBadgesCount > 0 && (
              <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                {levelData.activeBadgesCount} نشان فعال
              </Badge>
            )}
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <p className="mb-1 font-medium">مزایای سطح بعدی:</p>
          <ul className="list-disc list-inside">
            {levelData.nextLevelBenefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserLevel;