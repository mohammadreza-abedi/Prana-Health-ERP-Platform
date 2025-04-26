import { useQuery } from "@tanstack/react-query";
import { UserChallenge } from "@/types";
import { GlassCard } from "../ui/glass-card";
import { motion } from "framer-motion";
import { Clock, Mail } from "lucide-react";

export default function DailyChallengeCard() {
  const { data: userChallenges, isLoading } = useQuery<UserChallenge[]>({
    queryKey: ['/api/user-challenges'],
  });

  if (isLoading) {
    return (
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg">چالش روزانه</h3>
        </div>
        <div className="h-40 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tiffany"></div>
        </div>
      </GlassCard>
    );
  }

  if (!userChallenges || userChallenges.length === 0) {
    return (
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg">چالش روزانه</h3>
        </div>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            هنوز چالشی برای امروز ندارید. 
          </p>
          <button className="mt-4 px-4 py-2 rounded-lg bg-tiffany hover:bg-tiffany-light text-white font-medium transition-colors">
            دریافت چالش جدید
          </button>
        </div>
      </GlassCard>
    );
  }

  // Sort challenges by progress (in-progress first, then not started)
  const sortedChallenges = [...userChallenges].sort((a, b) => {
    if (a.currentValue > 0 && b.currentValue === 0) return -1;
    if (a.currentValue === 0 && b.currentValue > 0) return 1;
    return 0;
  });

  // Take the first two challenges
  const displayChallenges = sortedChallenges.slice(0, 2);

  const getIconForChallenge = (type: string) => {
    switch (type) {
      case 'mental':
        return <Clock className="h-5 w-5 text-tiffany" />;
      case 'work':
        return <Mail className="h-5 w-5 text-navy" />;
      default:
        return <Clock className="h-5 w-5 text-tiffany" />;
    }
  };

  return (
    <GlassCard className="p-6 rounded-xl">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-lg">چالش روزانه</h3>
        <div className="bg-yellow/20 text-yellow-700 dark:text-yellow px-3 py-1 rounded-full text-xs font-medium">۲ ساعت مانده</div>
      </div>
      
      {displayChallenges.map((challenge, index) => {
        const progress = Math.round((challenge.currentValue / challenge.challenge.targetValue) * 100);
        const isFirstChallenge = index === 0;
        
        return (
          <motion.div
            key={challenge.id}
            className={`${
              challenge.challenge.type === 'mental' 
                ? "bg-gradient-to-r from-tiffany/10 to-aqua/10 border border-tiffany/20" 
                : "bg-gradient-to-r from-navy/10 to-navy-light/5 border border-navy/20"
            } rounded-lg p-4 ${isFirstChallenge ? 'mb-4' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-2">
              <div className={`w-10 h-10 rounded-full ${
                challenge.challenge.type === 'mental' 
                  ? "bg-tiffany/20" 
                  : "bg-navy/20"
              } flex items-center justify-center`}>
                {getIconForChallenge(challenge.challenge.type)}
              </div>
              <div className="mr-3">
                <h4 className="font-medium">{challenge.challenge.title}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">{challenge.challenge.description}</p>
              </div>
            </div>
            <div className="h-2 mt-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div 
                className={`h-2 rounded-full ${
                  challenge.challenge.type === 'mental' ? "bg-tiffany" : "bg-navy"
                }`}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400">پیشرفت: {progress}٪</span>
              <span className={`text-xs font-medium ${
                challenge.challenge.type === 'mental' ? "text-tiffany" : "text-navy"
              }`}>
                {challenge.currentValue > 0 
                  ? `${challenge.currentValue} ${challenge.challenge.type === 'mental' ? 'دقیقه' : ''} انجام شده` 
                  : 'هنوز شروع نشده'}
              </span>
            </div>
          </motion.div>
        );
      })}
      
      <motion.button 
        className="mt-4 w-full py-3 rounded-lg bg-tiffany hover:bg-tiffany-light text-white font-medium transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        تکمیل چالش امروز
      </motion.button>
    </GlassCard>
  );
}
