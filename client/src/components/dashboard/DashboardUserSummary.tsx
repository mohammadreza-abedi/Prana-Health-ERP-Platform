import { GlassCard } from "../ui/glass-card";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/useAuth";
import { formatDate } from "@/lib/utils";

export default function DashboardUserSummary() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Calculate XP needed for next level (simple formula: current level * 100)
  const xpForNextLevel = user.level * 100;
  const xpNeeded = xpForNextLevel - user.xp % xpForNextLevel;
  
  return (
    <GlassCard className="p-6 rounded-xl mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold mb-1">سلام، {user.displayName.split(' ')[0]}! 👋</h2>
          <p className="text-slate-500 dark:text-slate-400">
            امروز <span className="text-tiffany font-medium">{formatDate(new Date())}</span> است. آماده‌ای که با انرژی روزت رو شروع کنی؟
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-4 md:mt-0 flex items-center glass dark:glass-dark rounded-lg px-4 py-2 shadow-inner bg-opacity-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <svg className="w-10 h-10 text-yellow" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 3L21.3 13.2H32.1L23.4 19.5L26.7 29.7L18 23.4L9.3 29.7L12.6 19.5L3.9 13.2H14.7L18 3Z" fill="currentColor"/>
          </svg>
          <div className="mr-2">
            <h3 className="text-md font-medium">{user.xp} امتیاز</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{xpNeeded} امتیاز تا سطح بعدی</p>
          </div>
        </motion.div>
      </div>
    </GlassCard>
  );
}
