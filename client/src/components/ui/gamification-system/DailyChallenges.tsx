import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Award, Calendar, CheckCircle2, Clock, RefreshCw, Flame, Trophy, Gift } from 'lucide-react';

export interface Challenge {
  id: number;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  category: 'health' | 'nutrition' | 'activity' | 'mental' | 'sleep' | 'social' | 'work';
  target: number;
  current: number;
  xpReward: number;
  creditReward: number;
  status: 'locked' | 'active' | 'completed' | 'claimed';
  expiresAt: string;
  tags: string[];
  streak?: number;
}

export interface DailyChallengesProps {
  userLevel: number;
  userXP: number;
  nextLevelXP: number;
  dailyStreak: number;
  className?: string;
  onClaimReward?: (challengeId: number, xp: number, credits: number) => void;
}

const DailyChallenges: React.FC<DailyChallengesProps> = ({
  userLevel = 5,
  userXP = 2500,
  nextLevelXP = 5000,
  dailyStreak = 3,
  className,
  onClaimReward
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('daily');
  
  // داده‌های نمونه از چالش‌ها (در نسخه واقعی از API دریافت می‌شود)
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 1,
      title: '10,000 قدم روزانه',
      description: 'امروز 10,000 قدم پیاده‌روی کنید',
      type: 'daily',
      difficulty: 'medium',
      category: 'activity',
      target: 10000,
      current: 7500,
      xpReward: 50,
      creditReward: 10,
      status: 'active',
      expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
      tags: ['فعالیت فیزیکی', 'پیاده‌روی'],
    },
    {
      id: 2,
      title: '8 ساعت خواب',
      description: 'دیشب حداقل 8 ساعت خوابیده‌اید',
      type: 'daily',
      difficulty: 'easy',
      category: 'sleep',
      target: 8,
      current: 8,
      xpReward: 30,
      creditReward: 5,
      status: 'completed',
      expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
      tags: ['خواب', 'استراحت'],
    },
    {
      id: 3,
      title: 'صبحانه سالم',
      description: 'صبحانه سالم شامل میوه و پروتئین میل کنید',
      type: 'daily',
      difficulty: 'easy',
      category: 'nutrition',
      target: 1,
      current: 0,
      xpReward: 20,
      creditReward: 5,
      status: 'active',
      expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
      tags: ['تغذیه', 'صبحانه'],
    },
    {
      id: 4,
      title: '10 دقیقه مدیتیشن',
      description: '10 دقیقه مدیتیشن برای آرامش ذهن',
      type: 'daily',
      difficulty: 'easy',
      category: 'mental',
      target: 10,
      current: 10,
      xpReward: 40,
      creditReward: 8,
      status: 'claimed',
      expiresAt: new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
      tags: ['ذهن‌آگاهی', 'آرامش'],
    },
    {
      id: 5,
      title: '30 دقیقه ورزش',
      description: 'این هفته هر روز 30 دقیقه ورزش کنید',
      type: 'weekly',
      difficulty: 'medium',
      category: 'activity',
      target: 7,
      current: 4,
      xpReward: 200,
      creditReward: 50,
      status: 'active',
      expiresAt: new Date(new Date().setDate(new Date().getDate() + (7 - new Date().getDay()))).toISOString(),
      tags: ['ورزش', 'سلامتی'],
    },
    {
      id: 6,
      title: 'نوشیدن آب کافی',
      description: 'هر روز 8 لیوان آب بنوشید',
      type: 'weekly',
      difficulty: 'easy',
      category: 'nutrition',
      target: 7,
      current: 6,
      xpReward: 150,
      creditReward: 30,
      status: 'active',
      expiresAt: new Date(new Date().setDate(new Date().getDate() + (7 - new Date().getDay()))).toISOString(),
      tags: ['آب', 'هیدراته'],
      streak: 15
    },
    {
      id: 7,
      title: 'چالش ماه رمضان',
      description: 'در ماه رمضان روزه بگیرید و سلامت خود را افزایش دهید',
      type: 'special',
      difficulty: 'hard',
      category: 'health',
      target: 30,
      current: 12,
      xpReward: 1000,
      creditReward: 300,
      status: 'active',
      expiresAt: new Date(new Date().setDate(new Date().getDate() + 18)).toISOString(),
      tags: ['ماه رمضان', 'چالش ویژه'],
    },
    {
      id: 8,
      title: 'پیاده‌روی پاییزی',
      description: 'به مناسبت پاییز، هفته‌ای 3 بار در طبیعت پیاده‌روی کنید',
      type: 'special',
      difficulty: 'medium',
      category: 'activity',
      target: 12,
      current: 5,
      xpReward: 500,
      creditReward: 120,
      status: 'active',
      expiresAt: new Date(new Date().setDate(new Date().getDate() + 25)).toISOString(),
      tags: ['پاییز', 'طبیعت', 'پیاده‌روی'],
    }
  ]);

  // متد دریافت جایزه چالش
  const handleClaimReward = (challenge: Challenge) => {
    // در حالت واقعی اینجا درخواست API برای دریافت جایزه انجام می‌شود
    // به‌روزرسانی وضعیت چالش
    const updatedChallenges = challenges.map(c => {
      if (c.id === challenge.id) {
        return { ...c, status: 'claimed' };
      }
      return c;
    });
    
    setChallenges(updatedChallenges);
    
    // نمایش پیام موفقیت
    toast({
      title: "جایزه دریافت شد!",
      description: `${challenge.xpReward} XP و ${challenge.creditReward} اعتبار به حساب شما اضافه شد`,
      variant: "success",
    });
    
    // فراخوانی callback
    if (onClaimReward) {
      onClaimReward(challenge.id, challenge.xpReward, challenge.creditReward);
    }
  };

  // فیلتر کردن چالش‌ها بر اساس تب فعال
  const filteredChallenges = challenges.filter(challenge => 
    (activeTab === 'daily' && challenge.type === 'daily') ||
    (activeTab === 'weekly' && challenge.type === 'weekly') ||
    (activeTab === 'special' && challenge.type === 'special')
  );

  // محاسبه درصد پیشرفت چالش‌های روزانه
  const dailyProgress = Math.round(
    (challenges
      .filter(c => c.type === 'daily')
      .filter(c => c.status === 'completed' || c.status === 'claimed').length /
      challenges.filter(c => c.type === 'daily').length) * 100
  );

  // محاسبه درصد پیشرفت XP برای سطح بعدی
  const xpProgress = Math.min(100, Math.round((userXP / nextLevelXP) * 100));

  // محاسبه زمان باقی‌مانده تا پایان روز
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const timeRemaining = endOfDay.getTime() - new Date().getTime();
  const hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  // نمایش کارت چالش
  const renderChallengeCard = (challenge: Challenge) => {
    // محاسبه درصد پیشرفت چالش
    const progress = Math.min(100, Math.round((challenge.current / challenge.target) * 100));
    
    const isCompleted = challenge.status === 'completed' || challenge.status === 'claimed';
    const canClaim = challenge.status === 'completed';
    
    // محاسبه زمان باقی‌مانده برای چالش
    const expiresDate = new Date(challenge.expiresAt);
    const now = new Date();
    const diffTime = expiresDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // تعیین رنگ بج دشواری
    const difficultyColors = {
      easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      hard: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      expert: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    };
    
    // تعیین رنگ بج دسته‌بندی
    const categoryColors = {
      health: 'bg-tiffany/10 text-tiffany dark:bg-tiffany/20',
      nutrition: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      activity: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      mental: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      sleep: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
      social: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
      work: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400'
    };
    
    // آیکون مناسب برای هر دسته‌بندی
    const getCategoryIcon = (category: string) => {
      switch (category) {
        case 'health': return <Zap className="h-4 w-4" />;
        case 'nutrition': return <Gift className="h-4 w-4" />;
        case 'activity': return <Flame className="h-4 w-4" />;
        case 'mental': return <Trophy className="h-4 w-4" />;
        case 'sleep': return <Clock className="h-4 w-4" />;
        case 'social': return <Calendar className="h-4 w-4" />;
        case 'work': return <Award className="h-4 w-4" />;
        default: return <CheckCircle2 className="h-4 w-4" />;
      }
    };
    
    return (
      <motion.div
        key={challenge.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`overflow-hidden ${isCompleted ? 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50' : 'bg-white/80 dark:bg-slate-950/80 border-slate-200/80 dark:border-slate-800/80'}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className={categoryColors[challenge.category]}>
                  <span className="flex items-center gap-1">
                    {getCategoryIcon(challenge.category)}
                    {challenge.category === 'health' ? 'سلامت' : 
                     challenge.category === 'nutrition' ? 'تغذیه' : 
                     challenge.category === 'activity' ? 'فعالیت' : 
                     challenge.category === 'mental' ? 'ذهن' : 
                     challenge.category === 'sleep' ? 'خواب' : 
                     challenge.category === 'social' ? 'اجتماعی' : 'کار'}
                  </span>
                </Badge>
                <Badge variant="outline" className={difficultyColors[challenge.difficulty]}>
                  {challenge.difficulty === 'easy' ? 'آسان' : 
                   challenge.difficulty === 'medium' ? 'متوسط' : 
                   challenge.difficulty === 'hard' ? 'سخت' : 'استاد'}
                </Badge>
              </div>
              {challenge.streak && (
                <Badge className="bg-orange-500">
                  <Flame className="h-3 w-3 ml-1" />
                  {challenge.streak} روز متوالی
                </Badge>
              )}
            </div>
            <CardTitle className="text-base">{challenge.title}</CardTitle>
            <CardDescription className="text-xs">{challenge.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-3">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>{challenge.current} / {challenge.target} {
                  challenge.category === 'activity' ? 'قدم' : 
                  challenge.category === 'sleep' ? 'ساعت' :
                  challenge.category === 'nutrition' ? 'وعده' : 'بار'
                }</span>
                <span>{progress}%</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <div className="flex gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center">
                <Zap className="h-3 w-3 ml-1 text-amber-500" />
                {challenge.xpReward} XP
              </span>
              <span className="flex items-center">
                <Award className="h-3 w-3 ml-1 text-tiffany" />
                {challenge.creditReward} اعتبار
              </span>
            </div>
            <div>
              {challenge.status === 'active' && (
                <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-[10px]">
                  <Clock className="h-3 w-3 ml-1" />
                  {diffDays > 0 ? `${diffDays} روز` : `${hoursRemaining}:${minutesRemaining.toString().padStart(2, '0')}`}
                </Badge>
              )}
              {canClaim && (
                <Button 
                  size="sm" 
                  variant="success" 
                  className="text-xs h-7 px-2"
                  onClick={() => handleClaimReward(challenge)}
                >
                  دریافت جایزه
                </Button>
              )}
              {challenge.status === 'claimed' && (
                <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px]">
                  <CheckCircle2 className="h-3 w-3 ml-1" />
                  دریافت شده
                </Badge>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* پنل اطلاعات و آمار */}
        <div className="lg:col-span-1">
          <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">چالش‌های روزانه</CardTitle>
              <CardDescription>امتیازات و چالش‌های فعال خود را ببینید</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* نوار پیشرفت روزانه */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">پیشرفت امروز</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{dailyProgress}%</span>
                </div>
                <Progress value={dailyProgress} className="h-2" />
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>باقی‌مانده: {hoursRemaining}:{minutesRemaining.toString().padStart(2, '0')}</span>
                </div>
              </div>
              
              {/* مسیر سطح */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">مسیر سطح {userLevel}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{xpProgress}%</span>
                </div>
                <Progress value={xpProgress} className="h-2" />
                <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                  <span>{userXP.toLocaleString('fa-IR')} XP</span>
                  <span>{nextLevelXP.toLocaleString('fa-IR')} XP</span>
                </div>
              </div>
              
              {/* آمار چالش */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-gradient-to-br from-tiffany/10 to-blue-200/20 dark:from-tiffany/20 dark:to-blue-900/20 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex flex-col items-center">
                      <Flame className="h-7 w-7 text-tiffany mb-1" />
                      <span className="text-lg font-bold">{dailyStreak}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">روز متوالی</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-100/50 to-amber-200/20 dark:from-amber-900/20 dark:to-amber-800/10 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex flex-col items-center">
                      <Trophy className="h-7 w-7 text-amber-500 mb-1" />
                      <span className="text-lg font-bold">
                        {challenges.filter(c => c.status === 'completed' || c.status === 'claimed').length}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">چالش‌های کامل شده</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* پنل چالش‌ها */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl">
            <CardHeader className="pb-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-2 bg-slate-100 dark:bg-slate-900">
                  <TabsTrigger value="daily" className="flex gap-2 items-center">
                    <Calendar className="h-4 w-4" />
                    <span>روزانه</span>
                  </TabsTrigger>
                  <TabsTrigger value="weekly" className="flex gap-2 items-center">
                    <RefreshCw className="h-4 w-4" />
                    <span>هفتگی</span>
                  </TabsTrigger>
                  <TabsTrigger value="special" className="flex gap-2 items-center">
                    <Award className="h-4 w-4" />
                    <span>ویژه</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {filteredChallenges.length > 0 ? (
                    filteredChallenges.map(challenge => renderChallengeCard(challenge))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center py-6"
                    >
                      <div className="text-slate-400 dark:text-slate-500 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300">تمام چالش‌ها کامل شده‌اند</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1 max-w-xs">
                        تبریک! تمام چالش‌های این دسته را کامل کرده‌اید. فردا چالش‌های جدید اضافه خواهند شد.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenges;