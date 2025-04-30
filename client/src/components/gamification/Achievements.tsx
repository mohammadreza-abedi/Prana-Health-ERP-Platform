/**
 * @file Achievements.tsx
 * @description کامپوننت نشان‌ها و دستاوردها
 * 
 * این کامپوننت نشان‌ها و دستاوردهای کاربر را نمایش می‌دهد
 * که با تکمیل چالش‌ها و انجام فعالیت‌های مختلف به دست می‌آیند.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Medal, 
  Trophy, 
  Star, 
  BadgeCheck,
  Clock,
  ChevronRight,
  Layers,
  FileText,
  ShieldCheck,
  Calendar,
  Heart,
  Zap,
  Dumbbell,
  Brain,
  Flame,
  Target,
  CupSoda,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/design-system/atoms/Card';
import { Button } from '@/design-system/atoms/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Badge type
interface Badge {
  id: number;
  name: string;
  description: string;
  category: string;
  level: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'عادی' | 'غیرعادی' | 'نادر' | 'حماسی' | 'افسانه‌ای';
  icon: string;
  unlockedAt?: string;
  progress?: number;
  requirement?: number;
  isUnlocked: boolean;
  xpBonus?: number;
}

// Achievements props
interface AchievementsProps {
  data: Badge[] | undefined;
  isLoading: boolean;
  filterCategory: string;
  searchQuery: string;
}

// Achievement Badge Card
const AchievementBadge: React.FC<{ badge: Badge }> = ({ badge }) => {
  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'award':
        return <Award className="h-8 w-8" />;
      case 'medal':
        return <Medal className="h-8 w-8" />;
      case 'trophy':
        return <Trophy className="h-8 w-8" />;
      case 'star':
        return <Star className="h-8 w-8" />;
      case 'badge':
        return <BadgeCheck className="h-8 w-8" />;
      case 'dumbbell':
        return <Dumbbell className="h-8 w-8" />;
      case 'heart':
        return <Heart className="h-8 w-8" />;
      case 'brain':
        return <Brain className="h-8 w-8" />;
      case 'flame':
        return <Flame className="h-8 w-8" />;
      case 'target':
        return <Target className="h-8 w-8" />;
      case 'calendar':
        return <Calendar className="h-8 w-8" />;
      case 'cup':
        return <CupSoda className="h-8 w-8" />;
      default:
        return <Award className="h-8 w-8" />;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'exercise':
      case 'ورزش':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'nutrition':
      case 'تغذیه':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'health':
      case 'سلامت':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'mental':
      case 'ذهنی':
      case 'سلامت روان':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'sleep':
      case 'خواب':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'social':
      case 'اجتماعی':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'achievement':
      case 'دستاورد':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'special':
      case 'ویژه':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  const getRarityColor = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case 'common':
      case 'عادی':
        return 'text-gray-600 dark:text-gray-400';
      case 'uncommon':
      case 'غیرعادی':
        return 'text-green-600 dark:text-green-400';
      case 'rare':
      case 'نادر':
        return 'text-blue-600 dark:text-blue-400';
      case 'epic':
      case 'حماسی':
        return 'text-purple-600 dark:text-purple-400';
      case 'legendary':
      case 'افسانه‌ای':
        return 'text-amber-600 dark:text-amber-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  const getRarityBackground = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case 'common':
      case 'عادی':
        return 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800';
      case 'uncommon':
      case 'غیرعادی':
        return 'bg-gradient-to-br from-green-200 to-green-300 dark:from-green-700/30 dark:to-green-800/40';
      case 'rare':
      case 'نادر':
        return 'bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-700/30 dark:to-blue-800/40';
      case 'epic':
      case 'حماسی':
        return 'bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-700/30 dark:to-purple-800/40';
      case 'legendary':
      case 'افسانه‌ای':
        return 'bg-gradient-to-br from-amber-200 to-amber-300 dark:from-amber-700/30 dark:to-amber-800/40';
      default:
        return 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800';
    }
  };
  
  const getBadgeBorderColor = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case 'common':
      case 'عادی':
        return 'border-gray-300 dark:border-gray-600';
      case 'uncommon':
      case 'غیرعادی':
        return 'border-green-300 dark:border-green-600';
      case 'rare':
      case 'نادر':
        return 'border-blue-300 dark:border-blue-600';
      case 'epic':
      case 'حماسی':
        return 'border-purple-300 dark:border-purple-600';
      case 'legendary':
      case 'افسانه‌ای':
        return 'border-amber-300 dark:border-amber-600';
      default:
        return 'border-gray-300 dark:border-gray-600';
    }
  };
  
  const getProgressBarColor = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case 'common':
      case 'عادی':
        return 'bg-gray-500';
      case 'uncommon':
      case 'غیرعادی':
        return 'bg-green-500';
      case 'rare':
      case 'نادر':
        return 'bg-blue-500';
      case 'epic':
      case 'حماسی':
        return 'bg-purple-500';
      case 'legendary':
      case 'افسانه‌ای':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getTierText = (level: number) => {
    if (level <= 1) return '';
    return `سطح ${level}`;
  };
  
  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <Card className={`h-full ${!badge.isUnlocked ? 'opacity-70' : ''}`}>
          <CardHeader className="pb-3 pt-6 text-center relative">
            {badge.xpBonus && badge.isUnlocked && (
              <div className="absolute top-2 right-2 z-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs px-1.5 py-0.5 rounded-full">
                      <Zap className="h-3 w-3 mr-0.5" />
                      {badge.xpBonus}%
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>افزایش XP به میزان {badge.xpBonus}%</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
            
            <div className="flex justify-center">
              <div className={`w-20 h-20 flex items-center justify-center rounded-full ${getRarityBackground(badge.rarity)} border-2 ${getBadgeBorderColor(badge.rarity)} relative ${!badge.isUnlocked ? 'grayscale' : ''}`}>
                {!badge.isUnlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 dark:bg-black/60 rounded-full z-10">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                )}
                <div className={getRarityColor(badge.rarity)}>
                  {getIconComponent(badge.icon)}
                </div>
                {getTierText(badge.level) && (
                  <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border border-current">
                    {badge.level}
                  </div>
                )}
              </div>
            </div>
            
            <CardTitle className="mt-3 text-md">{badge.name}</CardTitle>
            
            <Badge className={`${getCategoryColor(badge.category)} mt-1 mx-auto`}>
              {badge.category}
            </Badge>
          </CardHeader>
          
          <CardContent className="text-center pb-3">
            <p className="text-sm text-muted-foreground">
              {badge.description}
            </p>
            
            {!badge.isUnlocked && badge.progress !== undefined && badge.requirement !== undefined && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>پیشرفت</span>
                  <span>{badge.progress}/{badge.requirement}</span>
                </div>
                <Progress
                  value={(badge.progress / badge.requirement) * 100}
                  className={`h-2 ${getProgressBarColor(badge.rarity)}`}
                />
              </div>
            )}
          </CardContent>
          
          <CardFooter className="pt-0 text-center justify-center">
            {badge.isUnlocked ? (
              <div className="text-xs text-muted-foreground flex items-center">
                <BadgeCheck className="h-3.5 w-3.5 text-green-500 mr-1" />
                دریافت شده در {badge.unlockedAt || 'تاریخ نامشخص'}
              </div>
            ) : (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5 mr-1" />
                قفل شده
              </Badge>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
};

// Loading Skeleton
const AchievementsLoadingSkeleton = () => {
  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="text-center pb-3">
              <div className="flex justify-center">
                <Skeleton className="h-20 w-20 rounded-full" />
              </div>
              <Skeleton className="h-5 w-24 mt-3 mx-auto" />
              <Skeleton className="h-4 w-16 mt-1 mx-auto rounded-full" />
            </CardHeader>
            <CardContent className="text-center pb-3">
              <Skeleton className="h-4 w-full mt-1" />
              <Skeleton className="h-4 w-11/12 mt-1 mx-auto" />
            </CardContent>
            <CardFooter className="pt-0 justify-center">
              <Skeleton className="h-4 w-24 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

// Main Achievements component
const Achievements: React.FC<AchievementsProps> = ({ 
  data, 
  isLoading, 
  filterCategory, 
  searchQuery 
}) => {
  const [currentTab, setCurrentTab] = useState<string>('all');
  
  // Sample achievements data if real data is not available yet
  const sampleAchievements: Badge[] = [
    {
      id: 1,
      name: "پیاده‌روی حرفه‌ای",
      description: "100,000 قدم در یک هفته پیاده‌روی کنید",
      category: "ورزش",
      level: 1,
      rarity: "نادر",
      icon: "dumbbell",
      isUnlocked: true,
      unlockedAt: "۱۴۰۲/۰۲/۱۵",
      xpBonus: 5
    },
    {
      id: 2,
      name: "تغذیه سالم",
      description: "30 روز متوالی رژیم غذایی سالم را رعایت کنید",
      category: "تغذیه",
      level: 2,
      rarity: "حماسی",
      icon: "cup",
      isUnlocked: true,
      unlockedAt: "۱۴۰۲/۰۱/۲۰",
      xpBonus: 10
    },
    {
      id: 3,
      name: "استاد مدیتیشن",
      description: "50 ساعت مدیتیشن انجام دهید",
      category: "سلامت روان",
      level: 3,
      rarity: "افسانه‌ای",
      icon: "brain",
      isUnlocked: false,
      progress: 32,
      requirement: 50
    },
    {
      id: 4,
      name: "خواب منظم",
      description: "یک ماه خواب منظم داشته باشید",
      category: "خواب",
      level: 1,
      rarity: "غیرعادی",
      icon: "calendar",
      isUnlocked: true,
      unlockedAt: "۱۴۰۲/۰۳/۰۵"
    },
    {
      id: 5,
      name: "رکورددار قدم",
      description: "در یک روز 20,000 قدم پیاده‌روی کنید",
      category: "ورزش",
      level: 2,
      rarity: "نادر",
      icon: "target",
      isUnlocked: false,
      progress: 15600,
      requirement: 20000
    },
    {
      id: 6,
      name: "مشارکت اجتماعی",
      description: "در 10 چالش تیمی شرکت کنید",
      category: "اجتماعی",
      level: 1,
      rarity: "عادی",
      icon: "medal",
      isUnlocked: true,
      unlockedAt: "۱۴۰۲/۰۲/۱۰"
    },
    {
      id: 7,
      name: "مسیر سلامت قلب",
      description: "3 ماه فعالیت هوازی منظم داشته باشید",
      category: "سلامت",
      level: 2,
      rarity: "حماسی",
      icon: "heart",
      isUnlocked: false,
      progress: 2,
      requirement: 3
    },
    {
      id: 8,
      name: "پیشرو",
      description: "اولین نفری باشید که یک چالش ویژه را تکمیل می‌کند",
      category: "دستاورد",
      level: 1,
      rarity: "افسانه‌ای",
      icon: "trophy",
      isUnlocked: true,
      unlockedAt: "۱۴۰۲/۰۱/۱۵",
      xpBonus: 15
    },
    {
      id: 9,
      name: "مسیر طولانی",
      description: "در کل 1,000,000 قدم پیاده‌روی کنید",
      category: "ورزش",
      level: 3,
      rarity: "افسانه‌ای",
      icon: "award",
      isUnlocked: false,
      progress: 725000,
      requirement: 1000000
    },
    {
      id: 10,
      name: "فعال روزانه",
      description: "30 روز متوالی فعال باشید",
      category: "دستاورد",
      level: 1,
      rarity: "نادر",
      icon: "flame",
      isUnlocked: true,
      unlockedAt: "۱۴۰۲/۰۲/۲۵",
      xpBonus: 5
    },
    {
      id: 11,
      name: "سفیر سلامت",
      description: "10 همکار را به برنامه دعوت کنید",
      category: "اجتماعی",
      level: 2,
      rarity: "حماسی",
      icon: "badge",
      isUnlocked: false,
      progress: 6,
      requirement: 10
    },
    {
      id: 12,
      name: "تکمیل‌کننده چالش",
      description: "50 چالش را با موفقیت تکمیل کنید",
      category: "دستاورد",
      level: 3,
      rarity: "افسانه‌ای",
      icon: "star",
      isUnlocked: false,
      progress: 38,
      requirement: 50
    }
  ];
  
  // Filter and search achievements
  const filteredAchievements = () => {
    // Use sample data if no actual data is available yet
    const allAchievements = data || sampleAchievements;
    
    return allAchievements.filter(badge => {
      // Filter by status (unlocked/locked)
      const statusMatch = currentTab === 'all' || 
                        (currentTab === 'unlocked' && badge.isUnlocked) || 
                        (currentTab === 'locked' && !badge.isUnlocked);
      
      // Filter by category
      const categoryMatch = filterCategory === 'all' || 
                          badge.category.toLowerCase() === filterCategory.toLowerCase();
      
      // Filter by search query
      const searchMatch = !searchQuery || 
                        badge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        badge.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return statusMatch && categoryMatch && searchMatch;
    });
  };
  
  // Counts for the tabs
  const getUnlockedCount = () => {
    return (data || sampleAchievements).filter(badge => badge.isUnlocked).length;
  };
  
  const getLockedCount = () => {
    return (data || sampleAchievements).filter(badge => !badge.isUnlocked).length;
  };
  
  // Is loading state
  if (isLoading) {
    return <AchievementsLoadingSkeleton />;
  }
  
  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mx-auto">
          <TabsList className="grid grid-cols-3 w-[320px]">
            <TabsTrigger value="all" className="text-sm">
              همه ({(data || sampleAchievements).length})
            </TabsTrigger>
            <TabsTrigger value="unlocked" className="text-sm">
              دریافت شده ({getUnlockedCount()})
            </TabsTrigger>
            <TabsTrigger value="locked" className="text-sm">
              قفل شده ({getLockedCount()})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Achievement Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAchievements().map((badge) => (
          <AchievementBadge key={badge.id} badge={badge} />
        ))}
      </div>
      
      {/* No Results */}
      {filteredAchievements().length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
          <h3 className="text-lg font-medium mb-1">هیچ نشانی یافت نشد</h3>
          <p className="text-sm text-muted-foreground">
            با تغییر فیلترها یا عبارت جستجو، نشان‌های بیشتری را جستجو کنید.
          </p>
        </div>
      )}
    </>
  );
};

export default Achievements;