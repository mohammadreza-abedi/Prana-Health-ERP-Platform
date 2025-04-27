import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Droplets, 
  Dumbbell, 
  Activity, 
  Clock, 
  Eye, 
  Coffee,
  StretchHorizontal,
  XCircle
} from "lucide-react";

interface HealthReminder {
  id: string;
  type: 'water' | 'exercise' | 'eyestrain' | 'posture' | 'break' | 'coffee' | 'activity';
  title: string;
  message: string;
  icon: React.ReactNode;
  color: string;
  actionText?: string;
  interval?: number; // in minutes
  dismissable?: boolean;
}

const healthReminders: HealthReminder[] = [
  {
    id: 'water-reminder',
    type: 'water',
    title: 'یادآوری نوشیدن آب',
    message: 'زمان نوشیدن آب است! نوشیدن مرتب آب به حفظ سلامتی و تمرکز کمک می‌کند.',
    icon: <Droplets />,
    color: 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-800',
    actionText: 'نوشیدم',
    interval: 60, // Every hour
    dismissable: true
  },
  {
    id: 'exercise-reminder',
    type: 'exercise',
    title: 'وقت تحرک و نرمش',
    message: 'چند دقیقه حرکات کششی انجام دهید. کارکردن طولانی مدت بدون استراحت باعث خستگی می‌شود.',
    icon: <Dumbbell />,
    color: 'bg-green-50 border-green-300 dark:bg-green-900/20 dark:border-green-800',
    actionText: 'انجام دادم',
    interval: 120, // Every 2 hours
    dismissable: true
  },
  {
    id: 'eyestrain-reminder',
    type: 'eyestrain',
    title: 'استراحت چشم‌ها',
    message: 'به نقطه‌ای دور دست نگاه کنید و چند بار پلک بزنید تا خستگی چشم را کاهش دهید.',
    icon: <Eye />,
    color: 'bg-purple-50 border-purple-300 dark:bg-purple-900/20 dark:border-purple-800',
    actionText: 'استراحت دادم',
    interval: 30, // Every 30 minutes
    dismissable: true
  },
  {
    id: 'posture-reminder',
    type: 'posture',
    title: 'بررسی وضعیت نشستن',
    message: 'وضعیت نشستن خود را بررسی کنید. نشستن با پوسچر صحیح از آسیب‌های گردن و کمر جلوگیری می‌کند.',
    icon: <StretchHorizontal />,
    color: 'bg-amber-50 border-amber-300 dark:bg-amber-900/20 dark:border-amber-800',
    actionText: 'بررسی کردم',
    interval: 45, // Every 45 minutes
    dismissable: true
  },
  {
    id: 'break-reminder',
    type: 'break',
    title: 'وقت استراحت کوتاه',
    message: 'زمان استراحت کوتاه است. چند دقیقه از پشت میز بلند شوید و قدم بزنید.',
    icon: <Clock />,
    color: 'bg-rose-50 border-rose-300 dark:bg-rose-900/20 dark:border-rose-800',
    actionText: 'استراحت کردم',
    interval: 90, // Every 1.5 hours
    dismissable: true
  },
  {
    id: 'coffee-reminder',
    type: 'coffee',
    title: 'محدودیت کافئین',
    message: 'یادآوری مصرف محدود کافئین در نیمه دوم روز برای بهبود کیفیت خواب.',
    icon: <Coffee />,
    color: 'bg-tiffany/10 border-tiffany dark:bg-tiffany/20 dark:border-tiffany/40',
    actionText: 'متشکرم',
    interval: 240, // Every 4 hours
    dismissable: true
  },
  {
    id: 'activity-reminder',
    type: 'activity',
    title: 'ثبت فعالیت روزانه',
    message: 'فعالیت‌های امروز خود را ثبت کنید تا امتیاز روزانه خود را دریافت کنید.',
    icon: <Activity />,
    color: 'bg-indigo-50 border-indigo-300 dark:bg-indigo-900/20 dark:border-indigo-800',
    actionText: 'ثبت فعالیت',
    interval: 360, // Every 6 hours
    dismissable: true
  }
];

interface HealthRemindersProps {
  onAction?: (reminder: HealthReminder) => void;
  disabledTypes?: string[];
  timeScale?: number; // To speed up reminders for demo purposes
}

export default function HealthReminders({
  onAction,
  disabledTypes = [],
  timeScale = 1
}: HealthRemindersProps) {
  const [activeReminders, setActiveReminders] = useState<HealthReminder[]>([]);
  const [dismissedReminders, setDismissedReminders] = useState<Record<string, number>>({});
  
  // Initialize reminders
  useEffect(() => {
    // Filter out disabled reminders
    const enabledReminders = healthReminders.filter(
      reminder => !disabledTypes.includes(reminder.type)
    );
    
    // Set up timers for each reminder
    const timers = enabledReminders.map(reminder => {
      const intervalTime = ((reminder.interval || 60) * 60 * 1000) / timeScale;
      
      // Initial delay randomized between 10-30 seconds for demo purposes
      const initialDelay = timeScale === 1 ? intervalTime : (Math.random() * 20000 + 10000);
      
      const timerId = setTimeout(() => {
        showReminder(reminder);
        
        // Set up recurring interval
        const recurringId = setInterval(() => {
          showReminder(reminder);
        }, intervalTime);
        
        // Store the recurring interval ID
        return () => clearInterval(recurringId);
      }, initialDelay);
      
      // Return a cleanup function for the initial timeout
      return () => clearTimeout(timerId);
    });
    
    // Cleanup function
    return () => {
      timers.forEach(cleanup => cleanup());
    };
  }, [disabledTypes, timeScale]);
  
  // Show a reminder
  const showReminder = (reminder: HealthReminder) => {
    // Check if this reminder was recently dismissed
    const lastDismissed = dismissedReminders[reminder.id] || 0;
    const now = Date.now();
    
    // If dismissed in the last interval, don't show it again
    if (now - lastDismissed < (reminder.interval || 60) * 60 * 1000 / 2) {
      return;
    }
    
    // Add to active reminders if not already shown
    if (!activeReminders.some(r => r.id === reminder.id)) {
      setActiveReminders(prev => [...prev, reminder]);
      
      // Auto-dismiss after 30 seconds
      setTimeout(() => {
        dismissReminder(reminder.id);
      }, 30000);
    }
  };
  
  // Dismiss a reminder
  const dismissReminder = (id: string) => {
    setActiveReminders(prev => prev.filter(r => r.id !== id));
    setDismissedReminders(prev => ({
      ...prev,
      [id]: Date.now()
    }));
  };
  
  // Handle the action button click
  const handleAction = (reminder: HealthReminder) => {
    if (onAction) {
      onAction(reminder);
    }
    dismissReminder(reminder.id);
  };
  
  if (activeReminders.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 left-4 z-50 flex flex-col space-y-2 max-w-sm">
      <AnimatePresence>
        {activeReminders.map((reminder) => (
          <motion.div
            key={reminder.id}
            className={`rounded-lg shadow-lg border p-4 ${reminder.color} backdrop-blur-sm`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex">
              <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-white/30 dark:bg-white/10 text-slate-700 dark:text-white">
                {reminder.icon}
              </div>
              <div className="mr-3 flex-1">
                <h4 className="text-sm font-medium">{reminder.title}</h4>
                <p className="text-xs mt-1 text-slate-600 dark:text-slate-300">{reminder.message}</p>
                <div className="mt-2 flex justify-between">
                  {reminder.actionText && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => handleAction(reminder)}
                    >
                      {reminder.actionText}
                    </Button>
                  )}
                  
                  {reminder.dismissable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 text-slate-500"
                      onClick={() => dismissReminder(reminder.id)}
                    >
                      <XCircle className="h-4 w-4 ml-1" />
                      بستن
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}