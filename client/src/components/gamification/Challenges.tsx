/**
 * @file Challenges.tsx
 * @description کامپوننت چالش‌های سلامت
 * 
 * این کامپوننت لیست چالش‌های سلامت را نمایش می‌دهد
 * که کاربران می‌توانند در آن‌ها شرکت کنند و امتیاز کسب کنند.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Trophy, 
  Target, 
  Zap,
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Check,
  Timer,
  Dumbbell,
  Salad,
  Heart,
  Brain,
  Moon, 
  Users,
  PlusCircle,
  BarChart2,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/design-system/atoms/Card';
import { Button } from '@/design-system/atoms/Button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/hooks/use-auth';

// Challenge type
interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'آسان' | 'متوسط' | 'سخت';
  type: 'daily' | 'weekly' | 'monthly' | 'one-time' | 'روزانه' | 'هفتگی' | 'ماهانه' | 'یکباره';
  xp: number;
  credits: number;
  durationDays: number;
  startDate?: string;
  endDate?: string;
  icon?: string;
  goal: number;
  targetMetric: string;
  progress?: number;
  isActive?: boolean;
  isCompleted?: boolean;
  participants?: number;
  status?: 'not_started' | 'in_progress' | 'completed' | 'expired' | 'شروع نشده' | 'در حال انجام' | 'تکمیل شده' | 'منقضی شده';
}

// Challenge props
interface ChallengesProps {
  data: Challenge[] | undefined;
  isLoading: boolean;
  filterCategory: string;
  searchQuery: string;
}

// Challenge card component
const ChallengeCard: React.FC<{
  challenge: Challenge;
  onJoin: (challengeId: number) => void;
  onUpdate: (challengeId: number, progress: number) => void;
}> = ({ challenge, onJoin, onUpdate }) => {
  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'exercise':
      case 'ورزش':
        return <Dumbbell className="h-5 w-5 text-purple-500" />;
      case 'nutrition':
      case 'تغذیه':
        return <Salad className="h-5 w-5 text-green-500" />;
      case 'health':
      case 'سلامت':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'mental':
      case 'ذهنی':
      case 'سلامت روان':
        return <Brain className="h-5 w-5 text-blue-500" />;
      case 'sleep':
      case 'خواب':
        return <Moon className="h-5 w-5 text-indigo-500" />;
      case 'social':
      case 'اجتماعی':
        return <Users className="h-5 w-5 text-orange-500" />;
      default:
        return <Target className="h-5 w-5 text-primary-500" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
      case 'آسان':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
      case 'متوسط':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard':
      case 'سخت':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getTypeStyle = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'daily':
      case 'روزانه':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300';
      case 'weekly':
      case 'هفتگی':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'monthly':
      case 'ماهانه':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'one-time':
      case 'یکباره':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'not_started':
      case 'شروع نشده':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'in_progress':
      case 'در حال انجام':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'completed':
      case 'تکمیل شده':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'expired':
      case 'منقضی شده':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [progressUpdate, setProgressUpdate] = useState(challenge.progress || 0);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgressUpdate(Number(e.target.value));
  };

  const handleUpdateProgress = () => {
    onUpdate(challenge.id, progressUpdate);
    setShowUpdateDialog(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className={`h-full ${challenge.isCompleted ? 'bg-success-50 dark:bg-success-900/10 border-success-200 dark:border-success-800/30' : ''}`}>
        {challenge.isCompleted && (
          <div className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-success-100 dark:bg-success-900/30 border border-success-200 dark:border-success-800/30">
            <Check className="h-5 w-5 text-success-600 dark:text-success-400" />
          </div>
        )}
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 mr-3">
                {getCategoryIcon(challenge.category)}
              </div>
              <CardTitle className="text-lg">{challenge.title}</CardTitle>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className={getDifficultyColor(challenge.difficulty)}>
              {challenge.difficulty}
            </Badge>
            <Badge className={getTypeStyle(challenge.type)}>
              {challenge.type}
            </Badge>
            {challenge.status && (
              <Badge className={getStatusColor(challenge.status)}>
                {challenge.status}
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {challenge.description}
          </p>
          
          {/* Challenge progress */}
          {challenge.isActive && (
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs">پیشرفت</span>
                <span className="text-xs font-medium">{challenge.progress || 0}/{challenge.goal}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700"
                  style={{ width: `${Math.min(100, ((challenge.progress || 0) / challenge.goal) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Challenge Rewards */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex items-center">
                <Trophy className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium">{challenge.xp} XP</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-sm font-medium">{challenge.credits} امتیاز</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">{challenge.durationDays} روز</span>
            </div>
          </div>
          
          {/* Participants */}
          {challenge.participants && (
            <div className="mt-3 flex items-center">
              <Users className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">{challenge.participants} شرکت‌کننده</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-2">
          {!challenge.isActive && !challenge.isCompleted ? (
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => onJoin(challenge.id)}
            >
              شروع چالش
              <PlusCircle className="mr-2 h-4 w-4" />
            </Button>
          ) : challenge.isActive && !challenge.isCompleted ? (
            <div className="w-full flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowUpdateDialog(true)}
              >
                به‌روزرسانی
                <BarChart2 className="mr-2 h-4 w-4" />
              </Button>
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => setShowUpdateDialog(true)}
              >
                ثبت پیشرفت
                <ChevronRight className="mr-1 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="w-full text-center">
              <span className="flex items-center justify-center text-success-600 dark:text-success-400 font-medium">
                <Check className="h-5 w-5 mr-1" />
                تکمیل شده
              </span>
            </div>
          )}
        </CardFooter>
      </Card>
      
      {/* Update Progress Dialog */}
      <AlertDialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>به‌روزرسانی پیشرفت چالش</AlertDialogTitle>
            <AlertDialogDescription>
              میزان پیشرفت خود در چالش "{challenge.title}" را وارد کنید.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm">مقدار فعلی: {progressUpdate}</span>
              <span className="text-sm">هدف: {challenge.goal} {challenge.targetMetric}</span>
            </div>
            <input
              type="range"
              min="0"
              max={challenge.goal}
              value={progressUpdate}
              onChange={handleProgressChange}
              className="w-full"
            />
            <div className="mt-4">
              <Progress
                value={(progressUpdate / challenge.goal) * 100}
                className="h-2.5"
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdateProgress}>
              ثبت پیشرفت
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

// Featured Challenge Component
const FeaturedChallenge: React.FC<{
  challenge: Challenge;
  onJoin: (challengeId: number) => void;
}> = ({ challenge, onJoin }) => {
  return (
    <div className="relative w-full h-44 md:h-64 rounded-2xl overflow-hidden mb-6 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900">
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/10 z-0" />
      <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
        <div>
          <Badge className="bg-white/20 text-white hover:bg-white/25 border-white/20">چالش ویژه</Badge>
          <h3 className="text-2xl font-bold text-white mt-3">{challenge.title}</h3>
          <p className="text-white/80 mt-1 md:w-2/3 line-clamp-2">{challenge.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-amber-300 mr-1" />
              <span className="text-white font-medium">{challenge.xp} XP</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-300 mr-1" />
              <span className="text-white font-medium">{challenge.participants} شرکت‌کننده</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-300 mr-1" />
              <span className="text-white font-medium">{challenge.durationDays} روز</span>
            </div>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => onJoin(challenge.id)}
          >
            شروع چالش
            <PlusCircle className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton
const ChallengesLoadingSkeleton = () => {
  return (
    <>
      <div className="w-full h-44 md:h-64 rounded-2xl overflow-hidden mb-6">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <div className="flex gap-2 mt-3">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-5/6 mt-2" />
              <Skeleton className="h-2 w-full mt-4 rounded-full" />
              <div className="flex justify-between mt-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

// Main Challenges component
const Challenges: React.FC<ChallengesProps> = ({ 
  data, 
  isLoading, 
  filterCategory, 
  searchQuery 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Sample challenge data if real data is not available yet
  const sampleChallenges: Challenge[] = [
    {
      id: 1,
      title: "چالش 10,000 قدم روزانه",
      description: "برای بهبود سلامت قلبی-عروقی، هر روز 10,000 قدم پیاده‌روی کنید.",
      category: "exercise",
      difficulty: "متوسط",
      type: "روزانه",
      xp: 500,
      credits: 200,
      durationDays: 30,
      goal: 10000,
      targetMetric: "قدم",
      participants: 248
    },
    {
      id: 2,
      title: "رژیم سبزیجات",
      description: "برای یک هفته، روزانه حداقل 5 واحد سبزیجات مصرف کنید.",
      category: "nutrition",
      difficulty: "آسان",
      type: "هفتگی",
      xp: 300,
      credits: 150,
      durationDays: 7,
      goal: 35,
      targetMetric: "واحد",
      participants: 145
    },
    {
      id: 3,
      title: "تمرین مدیتیشن روزانه",
      description: "هر روز 15 دقیقه مدیتیشن برای کاهش استرس و بهبود تمرکز.",
      category: "mental",
      difficulty: "آسان",
      type: "روزانه",
      xp: 250,
      credits: 100,
      durationDays: 21,
      goal: 315,
      targetMetric: "دقیقه",
      isActive: true,
      progress: 120,
      participants: 320
    },
    {
      id: 4,
      title: "چالش 8 ساعت خواب",
      description: "برای بهبود سلامت جسمی و روانی، 30 روز متوالی حداقل 8 ساعت در شب بخوابید.",
      category: "sleep",
      difficulty: "متوسط",
      type: "ماهانه",
      xp: 700,
      credits: 350,
      durationDays: 30,
      goal: 240,
      targetMetric: "ساعت",
      participants: 189
    },
    {
      id: 5,
      title: "چالش 30 روز ورزش",
      description: "هر روز به مدت 30 روز، حداقل 30 دقیقه ورزش کنید.",
      category: "exercise",
      difficulty: "سخت",
      type: "ماهانه",
      xp: 1000,
      credits: 500,
      durationDays: 30,
      goal: 900,
      targetMetric: "دقیقه",
      isCompleted: true,
      progress: 900,
      participants: 156
    },
    {
      id: 6,
      title: "چالش نوشیدن آب",
      description: "روزانه 8 لیوان آب بنوشید تا هیدراته بمانید.",
      category: "nutrition",
      difficulty: "آسان",
      type: "روزانه",
      xp: 200,
      credits: 100,
      durationDays: 14,
      goal: 112,
      targetMetric: "لیوان",
      participants: 425
    },
    {
      id: 7,
      title: "ایجاد ارتباط اجتماعی",
      description: "هر هفته با یک همکار جدید صحبت کنید و شبکه ارتباطی خود را گسترش دهید.",
      category: "social",
      difficulty: "متوسط",
      type: "هفتگی",
      xp: 350,
      credits: 175,
      durationDays: 42,
      goal: 6,
      targetMetric: "نفر",
      isActive: true,
      progress: 2,
      participants: 97
    }
  ];
  
  // Join challenge mutation
  const joinChallengeMutation = useMutation({
    mutationFn: async (challengeId: number) => {
      const res = await apiRequest('POST', '/api/user-challenges', {
        challengeId,
        userId: user?.id
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/challenges'] });
      queryClient.invalidateQueries({ queryKey: ['/api/gamification/user-data'] });
      toast({
        title: 'چالش با موفقیت شروع شد',
        description: 'اکنون می‌توانید پیشرفت خود را در این چالش ثبت کنید',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در شروع چالش',
        description: error.message || 'خطایی در شروع چالش رخ داد. لطفا دوباره تلاش کنید.',
        variant: 'destructive',
      });
    }
  });
  
  // Update challenge progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ challengeId, progress }: { challengeId: number; progress: number }) => {
      const res = await apiRequest('PATCH', `/api/user-challenges/${challengeId}`, {
        progress,
        userId: user?.id
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/challenges'] });
      queryClient.invalidateQueries({ queryKey: ['/api/gamification/user-data'] });
      toast({
        title: 'پیشرفت به‌روزرسانی شد',
        description: 'پیشرفت شما در چالش با موفقیت ثبت شد',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'خطا در به‌روزرسانی پیشرفت',
        description: error.message || 'خطایی در به‌روزرسانی پیشرفت چالش رخ داد. لطفا دوباره تلاش کنید.',
        variant: 'destructive',
      });
    }
  });
  
  // Handle join challenge
  const handleJoinChallenge = (challengeId: number) => {
    joinChallengeMutation.mutate(challengeId);
  };
  
  // Handle update progress
  const handleUpdateProgress = (challengeId: number, progress: number) => {
    updateProgressMutation.mutate({ challengeId, progress });
  };
  
  // Filter and search challenges
  const filteredChallenges = () => {
    // Use sample data if no actual data is available yet
    const allChallenges = data || sampleChallenges;
    
    return allChallenges.filter(challenge => {
      // Filter by category
      const categoryMatch = filterCategory === 'all' || 
                            challenge.category.toLowerCase() === filterCategory.toLowerCase();
      
      // Filter by search query
      const searchMatch = !searchQuery || 
                          challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  };
  
  // Is loading state
  if (isLoading || joinChallengeMutation.isPending || updateProgressMutation.isPending) {
    return <ChallengesLoadingSkeleton />;
  }
  
  // Featured challenge (first challenge in the list or most popular)
  const featuredChallenge = filteredChallenges()[0] || sampleChallenges[0];
  const regularChallenges = filteredChallenges().slice(1);
  
  return (
    <>
      {/* Featured Challenge */}
      <FeaturedChallenge 
        challenge={featuredChallenge} 
        onJoin={handleJoinChallenge} 
      />
      
      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularChallenges.map((challenge) => (
          <ChallengeCard 
            key={challenge.id}
            challenge={challenge}
            onJoin={handleJoinChallenge}
            onUpdate={handleUpdateProgress}
          />
        ))}
      </div>
      
      {/* No Results */}
      {regularChallenges.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
          <h3 className="text-lg font-medium mb-1">هیچ چالشی یافت نشد</h3>
          <p className="text-sm text-muted-foreground">
            با تغییر فیلترها یا عبارت جستجو، چالش‌های بیشتری را جستجو کنید.
          </p>
        </div>
      )}
      
      {/* Challenge Categories Explanation */}
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="categories" className="border rounded-lg">
            <AccordionTrigger className="px-4">
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                دسته‌بندی‌های چالش‌ها
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 flex-shrink-0">
                    <Dumbbell className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">ورزش</h4>
                    <p className="text-sm text-muted-foreground">چالش‌های مرتبط با فعالیت‌های فیزیکی، پیاده‌روی و ورزش</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 flex-shrink-0">
                    <Salad className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">تغذیه</h4>
                    <p className="text-sm text-muted-foreground">چالش‌های مرتبط با رژیم غذایی سالم، نوشیدن آب و تغذیه مناسب</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 flex-shrink-0">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">سلامت روان</h4>
                    <p className="text-sm text-muted-foreground">چالش‌های مرتبط با مدیتیشن، تمرکز و کاهش استرس</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 flex-shrink-0">
                    <Moon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">خواب</h4>
                    <p className="text-sm text-muted-foreground">چالش‌های مرتبط با خواب مناسب و الگوی خواب منظم</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 flex-shrink-0">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">اجتماعی</h4>
                    <p className="text-sm text-muted-foreground">چالش‌های مرتبط با تعاملات اجتماعی و ارتباطات</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 flex-shrink-0">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">سلامت</h4>
                    <p className="text-sm text-muted-foreground">چالش‌های مرتبط با سلامت جسمی، بهداشت و مراقبت شخصی</p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Challenges;