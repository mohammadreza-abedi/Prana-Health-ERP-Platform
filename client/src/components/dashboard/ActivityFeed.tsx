/**
 * @file ActivityFeed.tsx
 * @description کامپوننت فید فعالیت‌ها
 * 
 * این کامپوننت تاریخچه فعالیت‌های مرتبط با سلامت کاربر را نمایش می‌دهد.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  CheckCircle, 
  Clock, 
  Heart, 
  Loader2, 
  PlayCircle, 
  Zap,
  Users,
  Calendar,
  MessageSquare,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { faIR } from 'date-fns/locale';

interface ActivityFeedProps {
  data: any[];
  isLoading: boolean;
}

// کامپوننت فید فعالیت‌ها
const ActivityFeed: React.FC<ActivityFeedProps> = ({ data, isLoading }) => {
  // تعیین آیکون مناسب برای هر نوع فعالیت
  const getActivityIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'challenge_completed':
      case 'challenge_started':
        return <Award className="h-6 w-6 text-amber-500" />;
      case 'health_update':
      case 'health_improvement':
        return <Heart className="h-6 w-6 text-red-500" />;
      case 'badge_earned':
        return <CheckCircle className="h-6 w-6 text-success-500" />;
      case 'event_joined':
        return <Calendar className="h-6 w-6 text-blue-500" />;
      case 'workout_completed':
        return <Zap className="h-6 w-6 text-purple-500" />;
      case 'goal_achieved':
        return <PlayCircle className="h-6 w-6 text-green-500" />;
      case 'social_interaction':
        return <Users className="h-6 w-6 text-indigo-500" />;
      case 'comment':
        return <MessageSquare className="h-6 w-6 text-teal-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-500" />;
    }
  };
  
  // تعیین عنوان مناسب برای هر نوع فعالیت
  const getActivityTitle = (activity: any) => {
    if (!activity) return '';
    
    const type = activity.type?.toLowerCase();
    
    if (activity.title) return activity.title;
    
    switch (type) {
      case 'challenge_completed':
        return `چالش "${activity.challengeName || 'نامشخص'}" را با موفقیت به پایان رساندید`;
      case 'challenge_started':
        return `چالش "${activity.challengeName || 'نامشخص'}" را شروع کردید`;
      case 'health_update':
        return 'اطلاعات سلامت خود را بروزرسانی کردید';
      case 'health_improvement':
        return `بهبود در شاخص ${activity.metricName || 'سلامت'} ثبت شد`;
      case 'badge_earned':
        return `نشان "${activity.badgeName || 'جدید'}" را دریافت کردید`;
      case 'event_joined':
        return `در رویداد "${activity.eventName || 'نامشخص'}" ثبت‌نام کردید`;
      case 'workout_completed':
        return `تمرین "${activity.workoutName || 'نامشخص'}" را تکمیل کردید`;
      case 'goal_achieved':
        return `به هدف "${activity.goalName || 'نامشخص'}" رسیدید`;
      case 'social_interaction':
        return activity.description || 'تعامل اجتماعی جدید';
      case 'comment':
        return `نظر جدید: ${activity.content || ''}`;
      default:
        return activity.description || 'فعالیت جدید';
    }
  };
  
  // فرمت کردن تاریخ به صورت نسبی (مثلاً "3 روز پیش")
  const formatDate = (dateString: string | number | Date) => {
    if (!dateString) return 'زمان نامشخص';
    
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return formatDistanceToNow(date, { addSuffix: true, locale: faIR });
    } catch (error) {
      return 'زمان نامشخص';
    }
  };
  
  // وضعیت بارگذاری
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }
  
  // وضعیت خالی بودن داده‌ها
  if (!data || data.length === 0) {
    const sampleActivities = [
      {
        id: 1,
        type: 'challenge_started',
        challengeName: 'قدم زدن روزانه',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        description: 'این چالش شامل حداقل 10,000 قدم در روز است',
      },
      {
        id: 2,
        type: 'health_update',
        metricName: 'ضربان قلب',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        description: 'میانگین ضربان قلب شما در حالت استراحت به 68 BPM رسیده است',
      },
      {
        id: 3,
        type: 'badge_earned',
        badgeName: 'قهرمان خواب',
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        description: 'برای داشتن 7 شب متوالی خواب با کیفیت بالا',
      },
      {
        id: 4,
        type: 'event_joined',
        eventName: 'چالش پیاده‌روی تیمی',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        description: 'شما به رویداد چالش پیاده‌روی ماه ملحق شدید',
      },
    ];

    return (
      <div className="space-y-4">
        {sampleActivities.map((activity, index) => (
          <ActivityItem 
            key={index}
            activity={activity} 
            index={index} 
          />
        ))}
      </div>
    );
  }
  
  // نمایش فید فعالیت‌ها
  return (
    <div className="space-y-4">
      {data.map((activity, index) => (
        <ActivityItem 
          key={activity.id || index}
          activity={activity} 
          index={index} 
        />
      ))}
    </div>
  );
};

// کامپوننت نمایش یک آیتم فعالیت
interface ActivityItemProps {
  activity: any;
  index: number;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, index }) => {
  const activityType = activity.type?.toLowerCase() || '';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`
        flex items-start space-x-3 rtl:space-x-reverse p-3 rounded-lg
        ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-transparent'}
        border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700
        transition-colors
      `}
    >
      <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
        {getActivityIcon(activityType)}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {getActivityTitle(activity)}
        </p>
        
        {activity.description && activity.description !== getActivityTitle(activity) && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {activity.description}
          </p>
        )}
        
        <div className="flex items-center mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          {formatDate(activity.timestamp || activity.createdAt || activity.date || new Date())}
          
          {activity.status && (
            <span className="mx-2 inline-block h-1 w-1 rounded-full bg-gray-400"></span>
          )}
          
          {activity.status && (
            <span className={
              activity.status === 'completed' ? 'text-success-500' :
              activity.status === 'in_progress' ? 'text-info-500' :
              activity.status === 'pending' ? 'text-warning-500' :
              'text-gray-500'
            }>
              {activity.status === 'completed' ? 'تکمیل شده' :
               activity.status === 'in_progress' ? 'در حال انجام' :
               activity.status === 'pending' ? 'در انتظار' :
               activity.status}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityFeed;