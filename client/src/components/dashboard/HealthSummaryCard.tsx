import { useQuery } from "@tanstack/react-query";
import { HealthMetric } from "@/types";
import { GlassCard } from "../ui/glass-card";
import { ProgressRing } from "../ui/progress-ring";
import { motion } from "framer-motion";

export default function HealthSummaryCard() {
  const { data: healthMetrics, isLoading } = useQuery<HealthMetric[]>({
    queryKey: ['/api/health-metrics'],
  });

  // Get today's metrics or use default values
  const todayMetrics = healthMetrics?.[0] || {
    steps: 0,
    sleepHours: 0,
    waterIntake: 0,
    stressLevel: 0
  };

  // Define targets
  const targetSteps = 10000;
  const targetSleep = 8;
  const targetWater = 2000;
  const stressLevel = todayMetrics.stressLevel;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <GlassCard className="p-6 rounded-xl mb-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-semibold text-lg">خلاصه وضعیت امروز</h3>
        </div>
        <div className="h-40 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tiffany"></div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-6 rounded-xl">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-semibold text-lg">خلاصه وضعیت امروز</h3>
        <button className="text-sm text-tiffany hover:text-tiffany-light transition-colors">مشاهده جزئیات</button>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Steps */}
        <motion.div 
          className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex flex-col items-center"
          variants={item}
        >
          <div className="w-16 h-16 mb-2 relative">
            <ProgressRing 
              value={todayMetrics.steps} 
              max={targetSteps} 
              valueClassName="text-tiffany"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-1">گام‌های روزانه</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              {todayMetrics.steps.toLocaleString()} / {targetSteps.toLocaleString()}
            </p>
          </div>
        </motion.div>
        
        {/* Sleep */}
        <motion.div 
          className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex flex-col items-center"
          variants={item}
        >
          <div className="w-16 h-16 mb-2 relative">
            <ProgressRing 
              value={todayMetrics.sleepHours} 
              max={targetSleep}
              valueClassName="text-navy"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-1">کیفیت خواب</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              {todayMetrics.sleepHours} ساعت / {targetSleep} ساعت
            </p>
          </div>
        </motion.div>
        
        {/* Water */}
        <motion.div 
          className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex flex-col items-center"
          variants={item}
        >
          <div className="w-16 h-16 mb-2 relative">
            <ProgressRing 
              value={todayMetrics.waterIntake} 
              max={targetWater}
              valueClassName="text-aqua"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-1">مصرف آب</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              {(todayMetrics.waterIntake / 1000).toFixed(1)} لیتر / {(targetWater / 1000)} لیتر
            </p>
          </div>
        </motion.div>
        
        {/* Stress */}
        <motion.div 
          className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 flex flex-col items-center"
          variants={item}
        >
          <div className="w-16 h-16 mb-2 relative">
            <ProgressRing 
              value={100 - stressLevel} 
              max={100}
              valueClassName="text-yellow"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium mb-1">سطح استرس</p>
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              {stressLevel <= 30 ? "پایین" : stressLevel <= 70 ? "متوسط" : "بالا"}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </GlassCard>
  );
}
