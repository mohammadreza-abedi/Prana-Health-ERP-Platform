import { useQuery } from "@tanstack/react-query";
import { Challenge, UserChallenge } from "@/types";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { 
  Clock, 
  Mail, 
  Footprints, 
  Droplet, 
  Brain, 
  Heart, 
  Utensils, 
  Dumbbell,
  CheckCircle,
  AlertCircle,
  LockIcon,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Challenges() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const { data: allChallenges, isLoading: loadingChallenges } = useQuery<Challenge[]>({
    queryKey: ['/api/challenges'],
  });
  
  const { data: userChallenges, isLoading: loadingUserChallenges } = useQuery<UserChallenge[]>({
    queryKey: ['/api/user-challenges'],
  });
  
  // Start a new challenge
  const startChallenge = async (challengeId: number) => {
    try {
      // Create start and end dates (1 day from now)
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      
      await apiRequest('POST', '/api/user-challenges', {
        challengeId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        currentValue: 0,
        completed: false
      });
      
      // Invalidate challenges to refresh list
      queryClient.invalidateQueries({ queryKey: ['/api/user-challenges'] });
      
      toast({
        title: 'چالش جدید',
        description: 'چالش جدید با موفقیت شروع شد',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'مشکلی در شروع چالش پیش آمد. لطفا دوباره تلاش کنید',
        variant: 'destructive',
      });
    }
  };
  
  // Update challenge progress
  const updateProgress = async (userChallengeId: number, newValue: number, completed: boolean) => {
    try {
      await apiRequest('PUT', `/api/user-challenges/${userChallengeId}`, {
        currentValue: newValue,
        completed
      });
      
      // Invalidate challenges to refresh list
      queryClient.invalidateQueries({ queryKey: ['/api/user-challenges'] });
      
      if (completed) {
        toast({
          title: 'چالش تکمیل شد',
          description: 'تبریک! چالش با موفقیت تکمیل شد',
          variant: 'default',
        });
      } else {
        toast({
          title: 'پیشرفت ثبت شد',
          description: 'پیشرفت شما در چالش ثبت شد',
          variant: 'default',
        });
      }
    } catch (error) {
      toast({
        title: 'خطا',
        description: 'مشکلی در بروزرسانی پیشرفت چالش پیش آمد',
        variant: 'destructive',
      });
    }
  };
  
  // Get icon for challenge based on type
  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'mental':
        return <Brain className="h-full w-full text-tiffany" />;
      case 'work':
        return <Mail className="h-full w-full text-navy" />;
      case 'physical':
        return <Footprints className="h-full w-full text-green-500" />;
      case 'nutrition':
        return <Utensils className="h-full w-full text-yellow-600" />;
      case 'hydration':
        return <Droplet className="h-full w-full text-aqua" />;
      case 'fitness':
        return <Dumbbell className="h-full w-full text-rose-500" />;
      case 'heart':
        return <Heart className="h-full w-full text-red-500" />;
      default:
        return <Clock className="h-full w-full text-tiffany" />;
    }
  };
  
  // Get background color class based on challenge type
  const getChallengeColorClass = (type: string) => {
    switch (type) {
      case 'mental':
        return 'from-tiffany/10 to-aqua/10 border-tiffany/20';
      case 'work':
        return 'from-navy/10 to-navy-light/5 border-navy/20';
      case 'physical':
        return 'from-green-500/10 to-green-600/5 border-green-500/20';
      case 'nutrition':
        return 'from-yellow-600/10 to-yellow-500/5 border-yellow-600/20';
      case 'hydration':
        return 'from-aqua/10 to-blue-400/5 border-aqua/20';
      case 'fitness':
        return 'from-rose-500/10 to-rose-600/5 border-rose-500/20';
      case 'heart':
        return 'from-red-500/10 to-red-600/5 border-red-500/20';
      default:
        return 'from-slate-200 to-slate-100 border-slate-200 dark:from-slate-800 dark:to-slate-700 dark:border-slate-700';
    }
  };
  
  // Filter user challenges based on selected filter
  const getFilteredChallenges = () => {
    if (!userChallenges) return [];
    
    switch (filter) {
      case 'active':
        return userChallenges.filter(uc => !uc.completed);
      case 'completed':
        return userChallenges.filter(uc => uc.completed);
      default:
        return userChallenges;
    }
  };
  
  // Get available challenges (ones that user hasn't started yet)
  const getAvailableChallenges = () => {
    if (!allChallenges || !userChallenges) return [];
    
    const activeChallengeIds = userChallenges
      .filter(uc => !uc.completed)
      .map(uc => uc.challengeId);
    
    return allChallenges.filter(c => !activeChallengeIds.includes(c.id));
  };
  
  const filteredChallenges = getFilteredChallenges();
  const availableChallenges = getAvailableChallenges();
  
  if (loadingChallenges || loadingUserChallenges) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tiffany"></div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">چالش‌های روزانه</h1>
        <p className="text-slate-500 dark:text-slate-400">
          با تکمیل چالش‌های روزانه امتیاز کسب کنید و سطح خود را ارتقاء دهید
        </p>
      </motion.div>
      
      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button 
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'all' ? 'bg-tiffany text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-tiffany/10'}`}
          onClick={() => setFilter('all')}
        >
          همه چالش‌ها
        </button>
        <button 
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'active' ? 'bg-tiffany text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-tiffany/10'}`}
          onClick={() => setFilter('active')}
        >
          چالش‌های فعال
        </button>
        <button 
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${filter === 'completed' ? 'bg-tiffany text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-tiffany/10'}`}
          onClick={() => setFilter('completed')}
        >
          چالش‌های تکمیل شده
        </button>
      </div>
      
      {/* Active/Filtered Challenges */}
      <div className="mb-8">
        {filteredChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((userChallenge) => {
              const challenge = userChallenge.challenge;
              const progress = (userChallenge.currentValue / challenge.targetValue) * 100;
              
              return (
                <motion.div
                  key={userChallenge.id}
                  className={`bg-gradient-to-r ${getChallengeColorClass(challenge.type)} rounded-xl overflow-hidden border p-4`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 p-2 flex items-center justify-center">
                      {getChallengeIcon(challenge.type)}
                    </div>
                    
                    <div className="mr-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{challenge.title}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-white/50 dark:bg-slate-800/50">
                          {challenge.points} امتیاز
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>پیشرفت</span>
                      <span>
                        {userChallenge.currentValue}/{challenge.targetValue}
                        {challenge.type === 'mental' && ' دقیقه'}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {userChallenge.completed ? (
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          تکمیل شده
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          مهلت: {new Date(userChallenge.endDate).toLocaleDateString('fa-IR')}
                        </span>
                      )}
                    </div>
                    
                    {!userChallenge.completed && (
                      <button 
                        className="text-xs font-medium text-tiffany hover:text-tiffany-light transition-colors"
                        onClick={() => {
                          // For demo purposes, we'll just increment by 25% of target
                          const increment = Math.ceil(challenge.targetValue * 0.25);
                          const newValue = Math.min(userChallenge.currentValue + increment, challenge.targetValue);
                          const completed = newValue >= challenge.targetValue;
                          updateProgress(userChallenge.id, newValue, completed);
                        }}
                      >
                        ثبت پیشرفت
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <GlassCard className="p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-slate-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">چالشی پیدا نشد</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">
              بر اساس فیلتر انتخاب شده، چالشی برای نمایش وجود ندارد.
            </p>
            <button 
              className="px-4 py-2 rounded-lg bg-tiffany text-white hover:bg-tiffany-light transition-colors"
              onClick={() => setFilter('all')}
            >
              نمایش همه چالش‌ها
            </button>
          </GlassCard>
        )}
      </div>
      
      {/* Available Challenges */}
      {filter !== 'completed' && availableChallenges.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4">چالش‌های جدید</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableChallenges.slice(0, 3).map((challenge) => (
              <motion.div
                key={challenge.id}
                className="glass rounded-xl p-5 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 p-2 flex items-center justify-center">
                    {getChallengeIcon(challenge.type)}
                  </div>
                  
                  <div className="mr-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{challenge.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/50 dark:bg-slate-800/50">
                        {challenge.points} امتیاز
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {challenge.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 ml-1" />
                      {challenge.duration} روز
                    </span>
                    <span className="flex items-center">
                      هدف: {challenge.targetValue}
                      {challenge.type === 'mental' && ' دقیقه'}
                    </span>
                  </div>
                </div>
                
                <button 
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-tiffany text-white hover:bg-tiffany-light transition-colors text-sm font-medium flex items-center justify-center"
                  onClick={() => startChallenge(challenge.id)}
                >
                  <span>شروع چالش</span>
                  <ArrowRight className="h-4 w-4 mr-2" />
                </button>
              </motion.div>
            ))}
            
            {availableChallenges.length > 3 && (
              <motion.div
                className="glass rounded-xl p-5 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <LockIcon className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="font-medium mb-2">{availableChallenges.length - 3} چالش بیشتر</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
                  با تکمیل چالش‌های فعلی، چالش‌های جدید را باز کنید
                </p>
                <button className="text-tiffany hover:text-tiffany-light transition-colors flex items-center text-sm">
                  <span>مشاهده همه</span>
                  <ChevronRight className="h-4 w-4 mr-1" />
                </button>
              </motion.div>
            )}
          </div>
        </>
      )}
    </>
  );
}
