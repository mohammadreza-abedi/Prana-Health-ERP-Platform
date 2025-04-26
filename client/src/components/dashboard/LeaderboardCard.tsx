import { useQuery } from "@tanstack/react-query";
import { LeaderboardEntry } from "@/types";
import { GlassCard } from "../ui/glass-card";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";

export default function LeaderboardCard() {
  const [leaderboardType, setLeaderboardType] = useState<'internal' | 'public'>('internal');
  const { user } = useAuth();
  
  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard'],
  });
  
  if (isLoading) {
    return (
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-semibold text-lg">برترین‌های این ماه</h3>
        </div>
        <div className="h-56 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tiffany"></div>
        </div>
      </GlassCard>
    );
  }
  
  if (!leaderboard || leaderboard.length === 0) {
    return (
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-semibold text-lg">برترین‌های این ماه</h3>
        </div>
        <div className="p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            در حال حاضر اطلاعاتی برای نمایش وجود ندارد.
          </p>
        </div>
      </GlassCard>
    );
  }
  
  // Get top 3 users
  const topThree = leaderboard.slice(0, 3);
  
  // Get other users for the list (position 4-6)
  const otherUsers = leaderboard.slice(3, 6);
  
  // Find current user's position if they're not in top 6
  const currentUserEntry = user && !leaderboard.slice(0, 6).some(entry => entry.id === user.id)
    ? leaderboard.find(entry => entry.id === user.id)
    : null;
  
  const currentUserPosition = currentUserEntry 
    ? leaderboard.findIndex(entry => entry.id === currentUserEntry.id) + 1
    : null;

  return (
    <GlassCard className="p-6 rounded-xl">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-semibold text-lg">برترین‌های این ماه</h3>
        <div className="flex space-x-2 space-x-reverse">
          <button 
            className={`text-sm ${leaderboardType === 'internal' ? 'text-tiffany font-medium' : 'text-slate-500 dark:text-slate-400 hover:text-tiffany transition-colors'}`}
            onClick={() => setLeaderboardType('internal')}
          >
            داخلی
          </button>
          <button 
            className={`text-sm ${leaderboardType === 'public' ? 'text-tiffany font-medium' : 'text-slate-500 dark:text-slate-400 hover:text-tiffany transition-colors'}`}
            onClick={() => setLeaderboardType('public')}
          >
            عمومی
          </button>
        </div>
      </div>
      
      {/* Top 3 users */}
      <motion.div 
        className="flex justify-center items-end mb-10 space-x-4 space-x-reverse h-32"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* 2nd Place */}
        {topThree.length >= 2 && (
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {topThree[1].avatar ? (
              <img 
                src={topThree[1].avatar} 
                alt={`کاربر دوم`}
                className="w-12 h-12 rounded-full border-2 border-navy mb-2 object-cover" 
              />
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-navy mb-2 bg-navy/20 flex items-center justify-center text-navy">
                {topThree[1].displayName[0]}
              </div>
            )}
            <p className="text-xs font-medium">{topThree[1].displayName}</p>
            <div className="glass dark:glass-dark h-16 w-12 flex items-center justify-center text-sm font-bold">
              {topThree[1].xp}
            </div>
            <p className="text-xs text-navy font-bold">۲</p>
          </motion.div>
        )}
        
        {/* 1st Place */}
        {topThree.length >= 1 && (
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {topThree[0].avatar ? (
                <img 
                  src={topThree[0].avatar} 
                  alt={`کاربر اول`}
                  className="w-16 h-16 rounded-full border-2 border-yellow mb-2 object-cover" 
                />
              ) : (
                <div className="w-16 h-16 rounded-full border-2 border-yellow mb-2 bg-yellow/20 flex items-center justify-center text-yellow-700 dark:text-yellow">
                  {topThree[0].displayName[0]}
                </div>
              )}
              <svg className="w-6 h-6 absolute -top-2 -left-2 text-yellow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <p className="text-xs font-medium">{topThree[0].displayName}</p>
            <div className="glass dark:glass-dark h-24 w-14 flex items-center justify-center text-sm font-bold">
              {topThree[0].xp}
            </div>
            <p className="text-xs text-yellow font-bold">۱</p>
          </motion.div>
        )}
        
        {/* 3rd Place */}
        {topThree.length >= 3 && (
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {topThree[2].avatar ? (
              <img 
                src={topThree[2].avatar} 
                alt={`کاربر سوم`}
                className="w-12 h-12 rounded-full border-2 border-tiffany mb-2 object-cover" 
              />
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-tiffany mb-2 bg-tiffany/20 flex items-center justify-center text-tiffany">
                {topThree[2].displayName[0]}
              </div>
            )}
            <p className="text-xs font-medium">{topThree[2].displayName}</p>
            <div className="glass dark:glass-dark h-12 w-12 flex items-center justify-center text-sm font-bold">
              {topThree[2].xp}
            </div>
            <p className="text-xs text-tiffany font-bold">۳</p>
          </motion.div>
        )}
      </motion.div>
      
      {/* Other ranks */}
      <motion.ul 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {otherUsers.map((entry, index) => (
          <motion.li 
            key={entry.id}
            className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
          >
            <span className="mr-1 font-bold text-slate-400 dark:text-slate-500 w-5">{index + 4}</span>
            {entry.avatar ? (
              <img 
                src={entry.avatar} 
                alt={entry.displayName}
                className="w-8 h-8 rounded-full mx-2 object-cover" 
              />
            ) : (
              <div className="w-8 h-8 rounded-full mx-2 bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
                {entry.displayName[0]}
              </div>
            )}
            <span className="flex-1 font-medium text-sm">{entry.displayName}</span>
            <span className="text-sm font-bold">{entry.xp}</span>
          </motion.li>
        ))}
        
        {/* Current user's position if not in top 6 */}
        {currentUserEntry && currentUserPosition && (
          <motion.li 
            className="flex items-center bg-tiffany/10 rounded-lg p-3 border border-tiffany/20"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <span className="mr-1 font-bold text-tiffany w-5">{currentUserPosition}</span>
            {currentUserEntry.avatar ? (
              <img 
                src={currentUserEntry.avatar} 
                alt="شما"
                className="w-8 h-8 rounded-full mx-2 object-cover" 
              />
            ) : (
              <div className="w-8 h-8 rounded-full mx-2 bg-tiffany/20 flex items-center justify-center text-tiffany">
                {currentUserEntry.displayName[0]}
              </div>
            )}
            <span className="flex-1 font-medium text-sm">شما</span>
            <span className="text-sm font-bold">{currentUserEntry.xp}</span>
          </motion.li>
        )}
      </motion.ul>
    </GlassCard>
  );
}
