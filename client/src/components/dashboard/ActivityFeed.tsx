/**
 * @file ActivityFeed.tsx
 * @description کامپوننت فید فعالیت‌ها
 * 
 * این کامپوننت فعالیت‌های اخیر کاربر را نمایش می‌دهد.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Footprints, 
  Heart, 
  Dumbbell, 
  FastForward, 
  Clock, 
  CheckCircle2,
  Medal,
  Target,
  Users,
  Calendar,
  BadgeCheck,
  Flame
} from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/design-system/atoms/Button';

interface ActivityFeedProps {
  data: any[];
  isLoading: boolean;
  limit?: number;
}

// نوع اکتیویتی
type ActivityType = 
  | 'achievement' 
  | 'steps' 
  | 'exercise' 
  | 'challenge_complete' 
  | 'challenge_joined' 
  | 'badge' 
  | 'event' 
  | 'team' 
  | 'heart_rate' 
  | 'streak';

// آیتم اکتیویتی
interface ActivityItem {
  id: number;
  type: ActivityType;
  title: string;
  description?: string;
  timestamp: string;
  data?: any;
  user?: {
    id: number;
    name: string;
    avatar?: string;
  };
}

// کامپوننت فید فعالیت‌ها
const ActivityFeed: React.FC<ActivityFeedProps> = ({ data, isLoading, limit = 10 }) => {
  // تعیین آیکون مناسب برای هر نوع فعالیت
  const getActivityIcon = (type: ActivityType) => {
    switch(type) {
      case 'achievement':
        return <Award className="h-5 w-5 text-amber-500" />;
      case 'steps':
        return <Footprints className="h-5 w-5 text-blue-500" />;
      case 'exercise':
        return <Dumbbell className="h-5 w-5 text-purple-500" />;
      case 'challenge_complete':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'challenge_joined':
        return <Target className="h-5 w-5 text-red-500" />;
      case 'badge':
        return <BadgeCheck className="h-5 w-5 text-indigo-500" />;
      case 'event':
        return <Calendar className="h-5 w-5 text-violet-500" />;
      case 'team':
        return <Users className="h-5 w-5 text-teal-500" />;
      case 'heart_rate':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'streak':
        return <Flame className="h-5 w-5 text-orange-500" />;
      default:
        return <FastForward className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // ساخت عنوان مناسب برای هر نوع فعالیت
  const getActivityTitle = (activity: ActivityItem) => {
    if (activity.title) return activity.title;
    
    switch(activity.type) {
      case 'achievement':
        return 'دستاورد جدید';
      case 'steps':
        return `${activity.data?.count || 'تعدادی'} قدم پیاده‌روی`;
      case 'exercise':
        return `${activity.data?.duration || ''} تمرین ${activity.data?.name || 'ورزشی'}`;
      case 'challenge_complete':
        return `تکمیل چالش ${activity.data?.name || ''}`;
      case 'challenge_joined':
        return `پیوستن به چالش ${activity.data?.name || ''}`;
      case 'badge':
        return `دریافت نشان ${activity.data?.name || ''}`;
      case 'event':
        return `شرکت در رویداد ${activity.data?.name || ''}`;
      case 'team':
        return `فعالیت تیمی ${activity.data?.name || ''}`;
      case 'heart_rate':
        return `ثبت ضربان قلب ${activity.data?.value || ''}`;
      case 'streak':
        return `${activity.data?.days || 'چند'} روز متوالی فعالیت`;
      default:
        return 'فعالیت جدید';
    }
  };
  
  // قالب‌بندی تاریخ
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'yyyy/MM/dd HH:mm');
    } catch (e) {
      return dateString;
    }
  };
  
  // داده‌های نمونه
  const sampleActivities: ActivityItem[] = [
    {
      id: 1,
      type: 'steps',
      title: '۹,۵۰۰ قدم پیاده‌روی',
      description: 'هدف روزانه ۱۰,۰۰۰ قدم (۹۵٪ تکمیل شده)',
      timestamp: '2023-04-30T09:15:00Z',
      data: { count: 9500, goal: 10000 }
    },
    {
      id: 2,
      type: 'challenge_complete',
      title: 'تکمیل چالش "هفته سلامت روان"',
      description: '۷ روز متوالی مدیتیشن روزانه',
      timestamp: '2023-04-29T18:30:00Z',
      data: { name: 'هفته سلامت روان', xp: 150 }
    },
    {
      id: 3,
      type: 'exercise',
      title: '۴۵ دقیقه دویدن',
      description: '۵.۲ کیلومتر با سرعت متوسط',
      timestamp: '2023-04-29T07:00:00Z',
      data: { name: 'دویدن', duration: '۴۵ دقیقه', distance: 5.2 }
    },
    {
      id: 4,
      type: 'badge',
      title: 'دریافت نشان "مربی سلامت"',
      description: 'کمک به ۵ همکار برای رسیدن به اهداف سلامتی',
      timestamp: '2023-04-28T14:45:00Z',
      data: { name: 'مربی سلامت', level: 1 }
    },
    {
      id: 5,
      type: 'heart_rate',
      title: 'میانگین ضربان قلب: ۶۸ BPM',
      description: 'وضعیت سلامت قلبی-عروقی: عالی',
      timestamp: '2023-04-28T08:20:00Z',
      data: { value: 68, status: 'excellent' }
    },
    {
      id: 6,
      type: 'streak',
      title: '۱۴ روز متوالی فعالیت',
      description: 'رکورد شخصی جدید!',
      timestamp: '2023-04-27T22:00:00Z',
      data: { days: 14, previousBest: 10 }
    },
    {
      id: 7,
      type: 'event',
      title: 'ثبت‌نام در "همایش سلامت شرکتی"',
      description: 'تاریخ: ۱۵ اردیبهشت - محل: سالن اجتماعات',
      timestamp: '2023-04-27T11:30:00Z',
      data: { name: 'همایش سلامت شرکتی', date: '2023-05-05T10:00:00Z' }
    },
    {
      id: 8,
      type: 'team',
      title: 'مشارکت در چالش تیمی "قدم‌های سبز"',
      description: 'امتیاز تیم: ۸۵/۱۰۰',
      timestamp: '2023-04-26T16:15:00Z',
      data: { name: 'قدم‌های سبز', score: 85 }
    },
    {
      id: 9,
      type: 'achievement',
      title: 'دستاورد "متخصص خواب"',
      description: 'ثبت ۳۰ روز الگوی خواب منظم',
      timestamp: '2023-04-26T09:00:00Z',
      data: { name: 'متخصص خواب', xp: 200 }
    },
    {
      id: 10,
      type: 'challenge_joined',
      title: 'پیوستن به چالش "۲۱ روز بدون قند"',
      description: 'هدف: کاهش مصرف قند و شکر',
      timestamp: '2023-04-25T13:45:00Z',
      data: { name: '۲۱ روز بدون قند', participants: 48 }
    }
  ];
  
  // وضعیت بارگذاری
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: Math.min(5, limit) }).map((_, index) => (
          <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-3 animate-pulse">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // استفاده از داده‌های نمونه
  const activities = sampleActivities.slice(0, limit);
  
  // اگر هیچ فعالیتی نباشد
  if (activities.length === 0) {
    return (
      <div className="text-center p-6">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
        <h3 className="text-lg font-medium mb-1">هیچ فعالیتی یافت نشد</h3>
        <p className="text-sm text-muted-foreground mb-4">
          هنوز هیچ فعالیتی ثبت نشده است.
        </p>
        <Button variant="outline" size="sm">شروع فعالیت</Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-1 divide-y divide-border">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className="py-3 first:pt-0 last:pb-0"
        >
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            <div className="mt-0.5 flex-shrink-0">
              {activity.user ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>
                    {activity.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30">
                  {getActivityIcon(activity.type)}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">
                {getActivityTitle(activity)}
              </p>
              
              {activity.description && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activity.description}
                </p>
              )}
              
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(activity.timestamp)}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {activities.length > 0 && activities.length < sampleActivities.length && (
        <div className="pt-3 text-center">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary-600 dark:text-primary-400"
          >
            مشاهده بیشتر
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;