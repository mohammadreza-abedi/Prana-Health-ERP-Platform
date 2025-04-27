import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { BadgeCard, BadgeGrid, BadgeData } from '@/components/achievements/BadgeCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Trophy, Star, Filter, Crown, BadgeCheck, BadgePlus, Medal } from 'lucide-react';
import { ProCard } from '@/components/ui/pro-card';

// دیتای موفقیت‌ها
const achievements: BadgeData[] = [
  {
    id: '1',
    title: 'قهرمان پیاده‌روی',
    description: 'بیش از ۱۰،۰۰۰ قدم در روز به مدت ۷ روز متوالی',
    type: 'achievement',
    category: 'fitness',
    rarity: 'uncommon',
    achievedAt: new Date(2023, 10, 5),
    color: 'tiffany'
  },
  {
    id: '2',
    title: 'خواب منظم',
    description: 'خواب منظم بین ۷ تا ۸ ساعت در شبانه‌روز به مدت ۱۴ روز',
    type: 'achievement',
    category: 'sleep',
    rarity: 'rare',
    progress: {
      current: 10,
      max: 14
    },
    color: 'navy'
  },
  {
    id: '3',
    title: 'متخصص تغذیه',
    description: 'مصرف روزانه ۵ وعده میوه و سبزیجات به مدت ۳۰ روز',
    type: 'badge',
    category: 'nutrition',
    rarity: 'epic',
    progress: {
      current: 18,
      max: 30
    },
    color: 'success'
  },
  {
    id: '4',
    title: 'مدیتیشن پیشرفته',
    description: 'انجام ۱۰۰ جلسه مدیتیشن در اپلیکیشن',
    type: 'medal',
    category: 'mental',
    rarity: 'legendary',
    achievedAt: new Date(2023, 11, 10),
    special: true,
    color: 'aqua'
  },
  {
    id: '5',
    title: 'مراقب قلب',
    description: 'حفظ ضربان قلب در محدوده ایده‌آل به مدت ۲۰ روز',
    type: 'achievement',
    category: 'health',
    rarity: 'uncommon',
    progress: {
      current: 15,
      max: 20
    },
    color: 'error'
  },
  {
    id: '6',
    title: 'پیشگام سلامتی',
    description: 'تکمیل ۵ چالش سلامتی متوالی',
    type: 'certificate',
    category: 'challenge',
    rarity: 'rare',
    achievedAt: new Date(2023, 9, 22),
    color: 'yellow'
  },
  {
    id: '7',
    title: 'ورزشکار نمونه',
    description: 'انجام ۵۰ جلسه تمرین با شدت متوسط به بالا',
    type: 'badge',
    category: 'fitness',
    rarity: 'epic',
    progress: {
      current: 42,
      max: 50
    },
    color: 'tiffany'
  },
  {
    id: '8',
    title: 'یکصد روز پایداری',
    description: 'ثبت اطلاعات سلامتی به مدت ۱۰۰ روز متوالی',
    type: 'medal',
    category: 'streak',
    rarity: 'legendary',
    progress: {
      current: 78,
      max: 100
    },
    special: true,
    color: 'info'
  }
];

// دیتای بج‌های تیمی
const teamBadges: BadgeData[] = [
  {
    id: 't1',
    title: 'تیم برتر ماه',
    description: 'کسب بالاترین امتیاز تیمی در ماه گذشته',
    type: 'medal',
    category: 'team',
    rarity: 'epic',
    achievedAt: new Date(2023, 10, 30),
    color: 'navy'
  },
  {
    id: 't2',
    title: 'چالش آب رسانی',
    description: 'تکمیل چالش نوشیدن آب کافی توسط تمام اعضای تیم',
    type: 'badge',
    category: 'team',
    rarity: 'rare',
    progress: {
      current: 8,
      max: 10
    },
    color: 'aqua'
  },
  {
    id: 't3',
    title: 'همکاری برتر',
    description: 'مشارکت در ۵ چالش تیمی با موفقیت',
    type: 'achievement',
    category: 'team',
    rarity: 'uncommon',
    achievedAt: new Date(2023, 11, 15),
    color: 'yellow'
  },
  {
    id: 't4',
    title: 'تیم سلامت محور',
    description: 'حفظ میانگین سلامتی تیم بالای ۸۰٪ به مدت ۳۰ روز',
    type: 'certificate',
    category: 'team',
    rarity: 'legendary',
    progress: {
      current: 22,
      max: 30
    },
    special: true,
    color: 'success'
  }
];

// دیتای آماری
const stats = [
  { label: 'موفقیت‌های کسب شده', value: 14, icon: <BadgeCheck className="h-5 w-5" /> },
  { label: 'موفقیت‌های در دست اقدام', value: 8, icon: <BadgePlus className="h-5 w-5" /> },
  { label: 'رتبه در بین همکاران', value: 3, icon: <Trophy className="h-5 w-5" /> },
  { label: 'نشان‌های تیمی', value: 6, icon: <Star className="h-5 w-5" /> },
];

// آمار کلی پیشرفت
const progressStats = [
  { category: 'سلامت جسمی', value: 78 },
  { category: 'تغذیه', value: 65 },
  { category: 'خواب', value: 82 },
  { category: 'فعالیت بدنی', value: 70 },
  { category: 'سلامت روان', value: 85 },
];

// کامپوننت ProgressRing
const ProgressRing = ({ 
  value, 
  size = 120, 
  strokeWidth = 8, 
  color = 'tiffany' 
}: { 
  value: number; 
  size?: number; 
  strokeWidth?: number; 
  color?: string; 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          stroke="currentColor"
          className="text-slate-200 dark:text-slate-800"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="currentColor"
          className={`text-${color} dark:text-${color}-light`}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{value}%</span>
      </div>
    </div>
  );
};

const AchievementHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">موفقیت‌های من</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            مسیر پیشرفت شما در جهت بهبود سلامتی
          </p>
        </div>
        
        <div className="flex mt-4 md:mt-0 space-x-3 space-x-reverse">
          <Select defaultValue="all">
            <SelectTrigger className="w-[130px] h-9 text-sm">
              <SelectValue placeholder="دسته‌بندی" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">همه موارد</SelectItem>
              <SelectItem value="fitness">تناسب اندام</SelectItem>
              <SelectItem value="nutrition">تغذیه</SelectItem>
              <SelectItem value="sleep">خواب</SelectItem>
              <SelectItem value="mental">سلامت روان</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="h-4 w-4 ml-1.5" />
            <span>فیلتر</span>
          </Button>
          
          <Button className="h-9 bg-tiffany text-white hover:bg-tiffany-hover">
            <Crown className="h-4 w-4 ml-1.5" />
            <span>نمایش رتبه‌بندی</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center">
              <div className={`w-10 h-10 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center text-tiffany dark:text-tiffany-light mr-3`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProgressOverview = () => {
  return (
    <ProCard className="mb-6" variant="premium" color="tiffany">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">پیشرفت کلی</CardTitle>
          <Medal className="w-6 h-6 text-tiffany" />
        </div>
        <CardDescription>
          خلاصه پیشرفت شما در دسته‌بندی‌های مختلف
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-shrink-0 flex justify-center mb-6 lg:mb-0 lg:mr-8">
            <ProgressRing value={76} />
          </div>
          
          <div className="flex-grow space-y-5">
            {progressStats.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1.5 text-sm">
                  <span>{item.category}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${index % 2 === 0 ? 'bg-tiffany dark:bg-tiffany-light' : 'bg-aqua dark:bg-aqua-light'} rounded-full`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </ProCard>
  );
};

export default function AchievementsDashboard() {
  const [activeTab, setActiveTab] = useState('personal');
  
  return (
    <MainLayout>
      <div className="pb-8">
        <AchievementHeader />
        
        <ProgressOverview />
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="pro-tabs mb-6"
        >
          <TabsList>
            <TabsTrigger value="personal" className="pro-tab">
              <Award className="h-4 w-4 ml-1.5" />
              موفقیت‌های فردی
            </TabsTrigger>
            <TabsTrigger value="team" className="pro-tab">
              <Trophy className="h-4 w-4 ml-1.5" />
              موفقیت‌های تیمی
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="pro-tab-content">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <Star className="h-5 w-5 ml-2 text-yellow-500" />
                    موفقیت‌های ویژه
                  </h2>
                  <Button variant="ghost" className="text-tiffany">
                    نمایش همه
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {achievements
                    .filter(badge => badge.special && badge.achievedAt)
                    .map(badge => (
                      <BadgeCard key={badge.id} badge={badge} />
                    ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">همه موفقیت‌ها</h2>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="مرتب‌سازی" />
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectItem value="all">همه</SelectItem>
                      <SelectItem value="achieved">دریافت شده</SelectItem>
                      <SelectItem value="inprogress">در دست اقدام</SelectItem>
                      <SelectItem value="locked">قفل شده</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <BadgeGrid badges={achievements} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="pro-tab-content">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">موفقیت‌های تیمی</h2>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  تیم: واحد توسعه نرم‌افزار
                </span>
              </div>
              
              <BadgeGrid badges={teamBadges} />
            </div>
          </TabsContent>
        </Tabs>
        
        <ProCard className="bg-gradient-to-r from-tiffany/10 to-navy/10 dark:from-tiffany/20 dark:to-navy/20 border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="flex-shrink-0 mb-4 sm:mb-0 sm:ml-6">
                <div className="w-20 h-20 rounded-full bg-tiffany/20 dark:bg-tiffany/30 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-tiffany dark:text-tiffany-light" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">آماده برای چالش‌های جدید؟</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  چالش‌های جدید سلامتی هر هفته منتشر می‌شوند. با شرکت در چالش‌ها، شانس کسب موفقیت‌های ویژه و امتیازات بیشتر را داشته باشید.
                </p>
                <Button>مشاهده چالش‌های فعال</Button>
              </div>
            </div>
          </CardContent>
        </ProCard>
      </div>
    </MainLayout>
  );
}