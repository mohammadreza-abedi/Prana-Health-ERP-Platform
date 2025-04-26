import { useQuery } from "@tanstack/react-query";
import { UserBadge } from "@/types";
import { GlassCard } from "../ui/glass-card";
import { motion } from "framer-motion";
import { Star, Shield, Coins } from "lucide-react";

export default function BadgesCard() {
  const { data: userBadges, isLoading } = useQuery<UserBadge[]>({
    queryKey: ['/api/user-badges'],
  });

  if (isLoading) {
    return (
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-semibold text-lg">نشان‌های شما</h3>
        </div>
        <div className="h-40 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tiffany"></div>
        </div>
      </GlassCard>
    );
  }

  // Get the badge icon
  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case 'star':
        return <Star className="h-8 w-8 text-tiffany" />;
      case 'shield':
        return <Shield className="h-8 w-8 text-navy" />;
      case 'coins':
        return <Coins className="h-8 w-8 text-yellow" />;
      default:
        return <Star className="h-8 w-8 text-tiffany" />;
    }
  };

  // Get the badge color class
  const getBadgeColorClass = (category: string) => {
    switch (category) {
      case 'steps':
        return 'from-tiffany to-aqua';
      case 'mental':
        return 'from-navy to-navy-light';
      case 'nutrition':
        return 'from-yellow to-yellow-light/50';
      default:
        return 'from-tiffany to-aqua';
    }
  };

  // If there are no badges, show empty state
  if (!userBadges || userBadges.length === 0) {
    return (
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-semibold text-lg">نشان‌های شما</h3>
          <button className="text-sm text-tiffany hover:text-tiffany-light transition-colors">مشاهده همه</button>
        </div>
        <div className="p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            هنوز نشانی دریافت نکرده‌اید.
          </p>
          <p className="text-sm">با انجام چالش‌های روزانه نشان‌های مختلف را کسب کنید.</p>
        </div>
      </GlassCard>
    );
  }

  // Get badges to display (2 earned + 1 locked badge)
  const earnedBadges = userBadges.slice(0, 2);
  const nextBadge = {
    badge: {
      id: 3,
      name: 'متخصص تغذیه',
      icon: 'coins',
      category: 'nutrition',
      requirement: '5_nutrition_challenges',
      description: 'تکمیل ۵ چالش تغذیه'
    }
  };

  return (
    <GlassCard className="p-6 rounded-xl">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-semibold text-lg">نشان‌های شما</h3>
        <button className="text-sm text-tiffany hover:text-tiffany-light transition-colors">مشاهده همه</button>
      </div>
      
      <motion.div 
        className="grid grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {earnedBadges.map((userBadge, index) => (
          <motion.div 
            key={userBadge.id}
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getBadgeColorClass(userBadge.badge.category)} flex items-center justify-center p-1 mb-2`}>
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                {getBadgeIcon(userBadge.badge.icon)}
              </div>
            </div>
            <p className="text-xs font-medium text-center">{userBadge.badge.name}</p>
          </motion.div>
        ))}
        
        <motion.div 
          className="flex flex-col items-center opacity-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getBadgeColorClass(nextBadge.badge.category)} flex items-center justify-center p-1 mb-2`}>
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
              {getBadgeIcon(nextBadge.badge.icon)}
            </div>
          </div>
          <p className="text-xs font-medium text-center">قفل شده: {nextBadge.badge.name}</p>
        </motion.div>
      </motion.div>
      
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">پیشرفت تا نشان بعدی:</p>
          <p className="text-sm font-medium">۶۳٪</p>
        </div>
        <div className="h-2 mt-2 rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div 
            className="h-2 rounded-full bg-yellow"
            initial={{ width: "0%" }}
            animate={{ width: "63%" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.div>
        </div>
        <p className="text-xs mt-2 text-slate-500 dark:text-slate-400">
          برای دریافت نشان "متخصص تغذیه" باید ۵ چالش تغذیه را کامل کنید.
        </p>
      </div>
    </GlassCard>
  );
}
