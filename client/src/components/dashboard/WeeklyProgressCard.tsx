import { GlassCard } from "../ui/glass-card";
import { motion } from "framer-motion";

const days = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

// Mock data for weekly progress
const weeklyData = [
  { day: "ش", value: 60, active: false },
  { day: "ی", value: 75, active: false },
  { day: "د", value: 45, active: false },
  { day: "س", value: 90, active: false },
  { day: "چ", value: 70, active: true },
  { day: "پ", value: 0, active: false },
  { day: "ج", value: 0, active: false }
];

export default function WeeklyProgressCard() {
  // Calculate weekly average
  const activeValues = weeklyData.filter(d => d.value > 0);
  const weeklyAverage = activeValues.length > 0 
    ? Math.round(activeValues.reduce((acc, curr) => acc + curr.value, 0) / activeValues.length)
    : 0;
  
  return (
    <GlassCard className="p-6 rounded-xl">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-semibold text-lg">پیشرفت هفتگی</h3>
        <div className="flex space-x-2 space-x-reverse">
          <button className="text-sm text-slate-500 dark:text-slate-400 hover:text-tiffany transition-colors">هفته قبل</button>
          <button className="text-sm text-tiffany font-medium">این هفته</button>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-7 h-40 gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {weeklyData.map((day, index) => (
          <motion.div 
            key={day.day}
            className="flex flex-col items-center"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex-1 w-full bg-slate-100 dark:bg-slate-800 rounded-md relative">
              <motion.div 
                className={`absolute bottom-0 right-0 left-0 rounded-md ${
                  day.active ? "bg-aqua" : "bg-tiffany"
                }`}
                initial={{ height: "0%" }}
                animate={{ height: `${day.value}%` }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              ></motion.div>
            </div>
            <span className={`text-xs mt-2 ${day.active ? "text-aqua font-medium" : ""}`}>{day.day}</span>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">پیشرفت کلی هفته</p>
          <p className="text-sm font-medium">{weeklyAverage}٪</p>
        </div>
        <div className="h-2 mt-2 rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div 
            className="h-2 rounded-full bg-tiffany"
            initial={{ width: "0%" }}
            animate={{ width: `${weeklyAverage}%` }}
            transition={{ duration: 0.8, delay: 0.5 }}
          ></motion.div>
        </div>
      </div>
    </GlassCard>
  );
}
