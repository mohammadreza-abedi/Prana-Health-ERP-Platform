/**
 * @file GamificationHub.tsx
 * @description مرکز گیمیفیکیشن (سیستم بازی‌سازی)
 * 
 * این کامپوننت صفحه اصلی سیستم گیمیفیکیشن را نمایش می‌دهد
 * که شامل چالش‌ها، نشان‌ها، جوایز و جدول رده‌بندی است.
 */

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { 
  Award, 
  Trophy, 
  Target, 
  Gift, 
  Users, 
  Zap,
  Flame,
  Star,
  Clock,
  Sparkles,
  BadgeCheck,
  ChevronRight,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Heart,
  Dumbbell
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/design-system/atoms/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/design-system/atoms/Button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// تعریف موقت کامپوننت ها
const Challenges = ({ data, isLoading, filterCategory, searchQuery }: any) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 mr-3">
                {index % 2 === 0 ? <Dumbbell className="h-5 w-5" /> : <Heart className="h-5 w-5" />}
              </div>
              <CardTitle>چالش {index + 1}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">توضیحات چالش شماره {index + 1}</p>
            <div className="flex justify-between mb-1">
              <span className="text-xs">پیشرفت</span>
              <span className="text-xs font-medium">{Math.floor(Math.random() * 70)}/100</span>
            </div>
            <Progress value={Math.floor(Math.random() * 100)} className="h-2" />
          </CardContent>
          <CardFooter>
            <Button variant="primary" className="w-full">مشاهده جزئیات</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
);

const Achievements = ({ data, isLoading, filterCategory, searchQuery }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <Card key={index} className="text-center p-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30">
            <Award className="h-8 w-8 text-primary-600 dark:text-primary-300" />
          </div>
        </div>
        <CardTitle className="mb-2">نشان {index + 1}</CardTitle>
        <p className="text-muted-foreground mb-4">توضیحات نشان {index + 1}</p>
        <Badge variant="secondary">کسب شده در تاریخ ۱۴۰۲/۸/۱۵</Badge>
      </Card>
    ))}
  </div>
);

const Rewards = ({ data, isLoading, filterCategory, searchQuery }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>جایزه {index + 1}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-900/30">
              <Gift className="h-8 w-8 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
          <p className="text-center mb-2">توضیحات جایزه {index + 1}</p>
          <div className="text-center text-2xl font-bold text-amber-500 mb-4">{(index + 1) * 100} امتیاز</div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">مشاهده جزئیات</Button>
        </CardFooter>
      </Card>
    ))}
  </div>
);

const Leaderboard = ({ data, isLoading }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>جدول رده‌بندی</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex items-center p-3 rounded-lg bg-muted/40">
            <div className="w-8 text-center font-bold">{index + 1}</div>
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback>{String.fromCharCode(65 + index)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">کاربر {index + 1}</p>
              <p className="text-xs text-muted-foreground">سطح {10 - Math.floor(index / 2)}</p>
            </div>
            <div className="font-bold">{1000 - index * 50} XP</div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const UserLevel = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Star className="h-5 w-5 text-amber-500 mr-2" />
        سطح کاربری
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">سطح ۱۲</div>
        <div className="text-muted-foreground mb-3">۲۴۵۰ از ۳۰۰۰ امتیاز تا سطح بعدی</div>
        <Progress value={82} className="h-2 w-full mb-3" />
      </div>
    </CardContent>
  </Card>
);

const DailyStreak = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Flame className="h-5 w-5 text-orange-500 mr-2" />
        روزهای متوالی
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col items-center">
        <div className="text-4xl font-bold text-orange-500 mb-2">۱۶</div>
        <div className="text-muted-foreground mb-3">روز متوالی فعالیت</div>
        <div className="flex justify-between w-full">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${index < 5 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' : 'bg-muted text-muted-foreground'}`}>
                {index < 5 ? <CheckCircle2 className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
              </div>
              <span className="text-xs">{['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][index]}</span>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const UserProgress = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <Target className="h-5 w-5 text-green-500 mr-2" />
        اهداف و پیشرفت
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">پیاده‌روی روزانه</span>
            <span className="text-sm">۸۵٪</span>
          </div>
          <Progress value={85} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">مصرف آب</span>
            <span className="text-sm">۶۵٪</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm">خواب کافی</span>
            <span className="text-sm">۴۰٪</span>
          </div>
          <Progress value={40} className="h-2" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// GamificationHub component
const GamificationHub: React.FC = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('challenges');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Fetch user's gamification data
  const { data: gamificationData, isLoading: isLoadingGamification } = useQuery({
    queryKey: ['/api/gamification/user-data', user?.id],
    enabled: !!user?.id,
  });
  
  // Fetch challenges
  const { data: challengesData, isLoading: isLoadingChallenges } = useQuery({
    queryKey: ['/api/challenges', filterCategory, searchQuery],
    enabled: activeTab === 'challenges',
  });
  
  // Fetch achievements/badges
  const { data: achievementsData, isLoading: isLoadingAchievements } = useQuery({
    queryKey: ['/api/badges', user?.id],
    enabled: activeTab === 'achievements',
  });
  
  // Fetch rewards
  const { data: rewardsData, isLoading: isLoadingRewards } = useQuery({
    queryKey: ['/api/rewards', user?.id],
    enabled: activeTab === 'rewards',
  });
  
  // Fetch leaderboard
  const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useQuery({
    queryKey: ['/api/leaderboard'],
    enabled: activeTab === 'leaderboard',
  });
  
  // Combined loading state
  const isLoading = isLoadingUser || isLoadingGamification || 
                   (activeTab === 'challenges' && isLoadingChallenges) || 
                   (activeTab === 'achievements' && isLoadingAchievements) || 
                   (activeTab === 'rewards' && isLoadingRewards) || 
                   (activeTab === 'leaderboard' && isLoadingLeaderboard);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // User stats summary
  const UserStatsSummary = () => {
    const userStats = gamificationData?.stats || {
      level: 12,
      xp: 2450,
      xpToNextLevel: 3000,
      streak: 16,
      challengesCompleted: 32,
      activeChallenges: 3,
      badges: 18,
      credits: 1250
    };
    
    return (
      <div className="w-full bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent rounded-lg border border-primary-100 dark:border-primary-800/30 p-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center">
            {user?.avatar ? (
              <Avatar className="h-16 w-16 border-2 border-primary-200 dark:border-primary-800">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-lg">{user?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-16 w-16 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-800/50 text-primary-600 dark:text-primary-300 text-2xl font-bold">
                {user?.name?.substring(0, 2).toUpperCase() || 'U'}
              </div>
            )}
            
            <div className="mr-4">
              <h3 className="text-xl font-bold">{user?.name || 'کاربر پرانا'}</h3>
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <Badge variant="outline" className="bg-primary-100/50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800/40">
                  <Trophy className="h-3.5 w-3.5 mr-1" />
                  رتبه ۱۴
                </Badge>
                <Badge variant="outline" className="bg-orange-100/50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/40">
                  <Flame className="h-3.5 w-3.5 mr-1" />
                  {userStats.streak} روز متوالی
                </Badge>
                <Badge variant="outline" className="bg-violet-100/50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/40">
                  <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                  {userStats.badges} نشان
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex-1 md:max-w-xs">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">سطح {userStats.level}</span>
              <span className="text-sm font-medium">{userStats.xp}/{userStats.xpToNextLevel} XP</span>
            </div>
            <div className="w-full h-3 bg-primary-100 dark:bg-primary-900/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700"
                style={{ width: `${(userStats.xp / userStats.xpToNextLevel) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">چالش‌های فعال</p>
              <p className="text-2xl font-bold">{userStats.activeChallenges}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">اعتبار</p>
              <p className="text-2xl font-bold flex items-center">
                {userStats.credits}
                <span className="text-xs ml-1 text-muted-foreground">امتیاز</span>
              </p>
            </div>
            <Button 
              variant="primary"
              size="sm"
              leftIcon={<Gift className="h-4 w-4" />}
              onClick={() => setActiveTab('rewards')}
            >
              فروشگاه
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <motion.h1 
            className="text-2xl md:text-3xl font-bold flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Trophy className="h-7 w-7 text-amber-500 mr-2" />
            مرکز چالش‌ها و جوایز
          </motion.h1>
          <motion.p 
            className="text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            با چالش‌های سلامت، کسب امتیاز و دریافت جوایز، سلامتی خود را ارتقا دهید
          </motion.p>
        </div>
      </div>
      
      {/* User stats summary */}
      {!isLoading && <UserStatsSummary />}
      
      {/* Quick stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <UserLevel />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <DailyStreak />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <UserProgress />
        </motion.div>
      </div>
      
      {/* Main tabs */}
      <Tabs
        defaultValue="challenges"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList className="grid grid-cols-4 md:w-fit">
            <TabsTrigger value="challenges" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">چالش‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-1">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">دستاوردها</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-1">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">جوایز</span>
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">رتبه‌بندی</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Search and filters */}
          {(activeTab === 'challenges' || activeTab === 'achievements' || activeTab === 'rewards') && (
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو..."
                  className="pl-9 w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="exercise">ورزش</SelectItem>
                  <SelectItem value="nutrition">تغذیه</SelectItem>
                  <SelectItem value="mental">سلامت روان</SelectItem>
                  <SelectItem value="sleep">خواب</SelectItem>
                  <SelectItem value="social">اجتماعی</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        {/* Tab content */}
        <TabsContent value="challenges" className="space-y-4">
          <Challenges 
            data={challengesData}
            isLoading={isLoadingChallenges}
            filterCategory={filterCategory}
            searchQuery={searchQuery}
          />
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <Achievements 
            data={achievementsData}
            isLoading={isLoadingAchievements}
            filterCategory={filterCategory}
            searchQuery={searchQuery}
          />
        </TabsContent>
        
        <TabsContent value="rewards" className="space-y-4">
          <Rewards 
            data={rewardsData}
            isLoading={isLoadingRewards}
            filterCategory={filterCategory}
            searchQuery={searchQuery}
          />
        </TabsContent>
        
        <TabsContent value="leaderboard" className="space-y-4">
          <Leaderboard 
            data={leaderboardData}
            isLoading={isLoadingLeaderboard}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamificationHub;