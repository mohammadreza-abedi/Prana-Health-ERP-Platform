import { useQuery } from "@tanstack/react-query";
import { User, UserBadge, UserChallenge } from "@/types";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/useAuth";
import { getLevelTitle, formatDate, toPersianDigits } from "@/lib/utils";
import {
  User as UserIcon,
  Trophy,
  Star,
  Medal,
  Settings,
  LogOut,
  Shield,
  Award,
  BarChart,
  Calendar,
  Clock,
  CheckCircle,
  CreditCard,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  ReceiptText
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCredits, type CreditTransaction } from "@/hooks/use-credits";

export default function Profile() {
  const { user, logout } = useAuth();
  
  const { data: userBadges } = useQuery<UserBadge[]>({
    queryKey: ['/api/user-badges'],
  });
  
  const { data: userChallenges } = useQuery<UserChallenge[]>({
    queryKey: ['/api/user-challenges'],
  });
  
  if (!user) return null;
  
  // Calculate XP needed for next level
  const xpForNextLevel = user.level * 100;
  const xpProgress = user.xp % xpForNextLevel;
  const xpPercent = (xpProgress / xpForNextLevel) * 100;
  
  // Count completed challenges
  const completedChallenges = userChallenges?.filter(uc => uc.completed).length || 0;
  const totalChallenges = userChallenges?.length || 0;
  
  // Use the credits hook
  const { 
    credits, 
    isLoadingCredits,
    transactions, 
    isLoadingTransactions 
  } = useCredits();
  
  // Get badge icon
  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case 'star':
        return <Star className="h-6 w-6 text-tiffany" />;
      case 'shield':
        return <Shield className="h-6 w-6 text-navy" />;
      case 'coins':
        return <Trophy className="h-6 w-6 text-yellow" />;
      default:
        return <Medal className="h-6 w-6 text-tiffany" />;
    }
  };
  
  // Get challenge icon color
  const getChallengeColorClass = (type: string) => {
    switch (type) {
      case 'mental':
        return 'text-tiffany';
      case 'work':
        return 'text-navy';
      case 'physical':
        return 'text-green-500';
      case 'nutrition':
        return 'text-yellow-600';
      default:
        return 'text-tiffany';
    }
  };
  
  // Get challenge icon
  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'mental':
        return <Star className={`h-6 w-6 ${getChallengeColorClass(type)}`} />;
      case 'work':
        return <Clock className={`h-6 w-6 ${getChallengeColorClass(type)}`} />;
      case 'physical':
        return <BarChart className={`h-6 w-6 ${getChallengeColorClass(type)}`} />;
      default:
        return <Calendar className={`h-6 w-6 ${getChallengeColorClass(type)}`} />;
    }
  };
  
  return (
    <>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">پروفایل کاربری</h1>
        <p className="text-slate-500 dark:text-slate-400">
          مدیریت پروفایل و مشاهده دستاوردهای سلامت شما
        </p>
      </motion.div>
      
      {/* Profile header */}
      <GlassCard className="p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="flex flex-col items-center md:items-start">
            <div className="relative">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.displayName} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-tiffany/20 flex items-center justify-center text-tiffany text-3xl font-bold border-4 border-white dark:border-slate-800">
                  {user.displayName[0]}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-yellow flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:mr-6 flex-1 text-center md:text-right">
            <h2 className="text-2xl font-bold">{user.displayName}</h2>
            <p className="text-slate-500 dark:text-slate-400">@{user.username}</p>
            
            <div className="mt-4 flex flex-col md:flex-row items-center">
              <div className="flex items-center mb-3 md:mb-0 md:ml-6">
                <Award className="h-5 w-5 ml-1 text-tiffany" />
                <span>سطح {user.level} - {getLevelTitle(user.level)}</span>
              </div>
              
              <div className="flex items-center mb-3 md:mb-0 md:ml-6">
                <Trophy className="h-5 w-5 ml-1 text-yellow" />
                <span>{user.xp} امتیاز</span>
              </div>
              
              <div className="flex items-center">
                <Medal className="h-5 w-5 ml-1 text-navy" />
                <span>{userBadges?.length || 0} نشان</span>
              </div>
            </div>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-2 space-x-reverse">
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700">
              <Settings className="h-5 w-5" />
            </button>
            <button 
              className="p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
              onClick={() => logout()}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm">تا سطح بعدی</span>
            <span className="text-sm">{xpProgress}/{xpForNextLevel}</span>
          </div>
          <Progress value={xpPercent} className="h-2" />
        </div>
      </GlassCard>
      
      {/* Tabs for different profile sections */}
      <Tabs defaultValue="stats" className="mt-6">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="stats" className="text-sm">آمار و دستاوردها</TabsTrigger>
          <TabsTrigger value="badges" className="text-sm">نشان‌ها</TabsTrigger>
          <TabsTrigger value="challenges" className="text-sm">چالش‌ها</TabsTrigger>
          <TabsTrigger value="credits" className="text-sm">اعتبار</TabsTrigger>
        </TabsList>
        
        {/* Stats Tab */}
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div
              className="glass p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-tiffany/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-tiffany" />
                </div>
                <div className="mr-3">
                  <h3 className="font-medium">امتیاز کل</h3>
                  <p className="text-2xl font-bold">{user.xp}</p>
                </div>
              </div>
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-4"></div>
              
              <div className="text-sm text-slate-500 dark:text-slate-400">
                در تلاش برای کسب {user.xp + 100} امتیاز
              </div>
            </motion.div>
            
            <motion.div
              className="glass p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-navy" />
                </div>
                <div className="mr-3">
                  <h3 className="font-medium">چالش‌های تکمیل شده</h3>
                  <p className="text-2xl font-bold">{completedChallenges}/{totalChallenges}</p>
                </div>
              </div>
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-4"></div>
              
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {totalChallenges - completedChallenges} چالش در حال انجام
              </div>
            </motion.div>
            
            <motion.div
              className="glass p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow/10 flex items-center justify-center">
                  <Medal className="h-6 w-6 text-yellow" />
                </div>
                <div className="mr-3">
                  <h3 className="font-medium">نشان‌های افتخار</h3>
                  <p className="text-2xl font-bold">{userBadges?.length || 0}</p>
                </div>
              </div>
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-4"></div>
              
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {userBadges?.length === 0 ? 'هنوز نشانی کسب نکرده‌اید' : 'عالی! به جمع‌آوری نشان‌ها ادامه دهید'}
              </div>
            </motion.div>
          </div>
          
          {/* Achievements timeline */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <Star className="h-5 w-5 ml-2 text-yellow" />
              تاریخچه دستاوردها
            </h3>
            
            <div className="relative border-r-2 border-slate-200 dark:border-slate-700 pr-6">
              {userBadges && userBadges.length > 0 ? (
                userBadges.map((userBadge, index) => (
                  <motion.div
                    key={userBadge.id}
                    className="mb-8 relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="absolute right-[-1.65rem] top-0 w-6 h-6 rounded-full bg-tiffany flex items-center justify-center">
                      <Trophy className="h-3 w-3 text-white" />
                    </div>
                    
                    <div className="flex items-center">
                      <div className="glass p-4 rounded-lg flex-1">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800">
                            {getBadgeIcon(userBadge.badge.icon)}
                          </div>
                          <div className="mr-3">
                            <h4 className="font-medium">{userBadge.badge.name}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {userBadge.badge.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mr-4 text-sm text-slate-500 dark:text-slate-400">
                        {formatDate(userBadge.earnedDate)}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                  <Trophy className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                  <p>هنوز دستاوردی ثبت نشده است.</p>
                  <p className="mt-2 text-sm">با انجام چالش‌ها و فعالیت‌ها دستاورد کسب کنید.</p>
                </div>
              )}
            </div>
          </GlassCard>
        </TabsContent>
        
        {/* Badges Tab */}
        <TabsContent value="badges">
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <Medal className="h-5 w-5 ml-2 text-yellow" />
              نشان‌های افتخار
            </h3>
            
            {userBadges && userBadges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userBadges.map((userBadge, index) => (
                  <motion.div
                    key={userBadge.id}
                    className="glass p-4 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-tiffany/20 to-aqua/10 p-1">
                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                          {getBadgeIcon(userBadge.badge.icon)}
                        </div>
                      </div>
                      
                      <div className="mr-4 flex-1">
                        <h4 className="font-medium">{userBadge.badge.name}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {userBadge.badge.description}
                        </p>
                        <div className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                          دریافت شده در {formatDate(userBadge.earnedDate)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                <Medal className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p>هنوز نشانی دریافت نکرده‌اید.</p>
                <p className="mt-2 text-sm">با انجام چالش‌های مختلف نشان‌های متنوع کسب کنید.</p>
              </div>
            )}
          </GlassCard>
        </TabsContent>
        
        {/* Challenges Tab */}
        <TabsContent value="challenges">
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <Trophy className="h-5 w-5 ml-2 text-yellow" />
              تاریخچه چالش‌ها
            </h3>
            
            {userChallenges && userChallenges.length > 0 ? (
              <div className="space-y-4">
                {userChallenges.map((userChallenge, index) => {
                  const progress = (userChallenge.currentValue / userChallenge.challenge.targetValue) * 100;
                  
                  return (
                    <motion.div
                      key={userChallenge.id}
                      className="glass p-4 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                    >
                      <div className="flex">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800">
                          {getChallengeIcon(userChallenge.challenge.type)}
                        </div>
                        
                        <div className="mr-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{userChallenge.challenge.title}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              userChallenge.completed 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-yellow/10 text-yellow-700 dark:text-yellow'
                            }`}>
                              {userChallenge.completed ? 'تکمیل شده' : 'در حال انجام'}
                            </span>
                          </div>
                          
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {userChallenge.challenge.description}
                          </p>
                          
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>پیشرفت: {Math.round(progress)}%</span>
                              <span>
                                {userChallenge.currentValue}/{userChallenge.challenge.targetValue}
                                {userChallenge.challenge.type === 'mental' && ' دقیقه'}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                          
                          <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>شروع: {formatDate(userChallenge.startDate)}</span>
                            <span>پایان: {formatDate(userChallenge.endDate)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                <Calendar className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p>هنوز در چالشی شرکت نکرده‌اید.</p>
                <p className="mt-2 text-sm">از بخش چالش‌ها یک چالش جدید را شروع کنید.</p>
              </div>
            )}
          </GlassCard>
        </TabsContent>
        
        {/* Credits Tab */}
        <TabsContent value="credits">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div
              className="glass p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Coins className="h-6 w-6 text-green-500" />
                </div>
                <div className="mr-3">
                  <h3 className="font-medium">اعتبار فعلی</h3>
                  <p className="text-2xl font-bold">{isLoadingCredits ? "..." : toPersianDigits(credits)}</p>
                </div>
              </div>
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-4"></div>
              
              <div className="text-sm text-slate-500 dark:text-slate-400">
                اعتبار برای استفاده از خدمات پریمیوم و شرکت در آزمون‌های روانشناسی استفاده می‌شود
              </div>
            </motion.div>
            
            <motion.div
              className="glass p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-tiffany/10 flex items-center justify-center">
                  <ReceiptText className="h-6 w-6 text-tiffany" />
                </div>
                <div className="mr-3">
                  <h3 className="font-medium">تراکنش‌های اخیر</h3>
                  <p className="text-2xl font-bold">{isLoadingTransactions ? "..." : toPersianDigits(transactions.length)}</p>
                </div>
              </div>
              
              <div className="h-px bg-slate-200 dark:bg-slate-700 mb-4"></div>
              
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {transactions.length === 0 ? 
                  'هنوز تراکنشی ثبت نشده است' : 
                  `${toPersianDigits(transactions.filter(t => t.amount > 0).length)} تراکنش افزایش و ${toPersianDigits(transactions.filter(t => t.amount < 0).length)} تراکنش کاهش اعتبار`
                }
              </div>
            </motion.div>
          </div>
          
          {/* Transactions history */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center">
              <CreditCard className="h-5 w-5 ml-2 text-navy" />
              تاریخچه تراکنش‌های اعتباری
            </h3>
            
            {isLoadingTransactions ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tiffany"></div>
              </div>
            ) : transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    className="glass p-4 rounded-lg flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' 
                        : 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
                    }`}>
                      {transaction.amount > 0 ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className="mr-3 flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{transaction.actionType}</h4>
                        <div className={`font-medium ${
                          transaction.amount > 0 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}{toPersianDigits(transaction.amount)}
                        </div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          موجودی: {toPersianDigits(transaction.balance)}
                        </p>
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        {formatDate(new Date(transaction.createdAt))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                <CreditCard className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p>هنوز تراکنشی ثبت نشده است.</p>
                <p className="mt-2 text-sm">با استفاده از خدمات پلتفرم و مشارکت در فعالیت‌ها اعتبار کسب کنید.</p>
              </div>
            )}
          </GlassCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
