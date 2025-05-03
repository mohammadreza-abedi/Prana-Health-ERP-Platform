import React, { useState } from 'react';
import { HealthMetricsGrid, type HealthMetricData } from '@/components/dashboards/HealthMetricsCard';
import { Activity, Calendar, User, Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// منتخب داده‌های سلامتی برای نمایش
const healthMetrics: HealthMetricData[] = [
  {
    id: '1',
    title: 'ضربان قلب',
    value: 72,
    unit: 'BPM',
    category: 'heart',
    color: 'tiffany',
    trend: {
      direction: 'down',
      value: 5,
      impact: 'positive',
    },
    timestamp: new Date(),
    insights: 'ضربان قلب شما در محدوده سالم است. ادامه دهید!',
  },
  {
    id: '2',
    title: 'فعالیت روزانه',
    value: 68,
    unit: 'دقیقه',
    category: 'activity',
    color: 'yellow',
    goal: {
      current: 68,
      target: 90,
      unit: 'دقیقه',
    },
    trend: {
      direction: 'up',
      value: 12,
      impact: 'positive',
    },
    timestamp: new Date(),
  },
  {
    id: '3',
    title: 'مصرف آب',
    value: 1.8,
    unit: 'لیتر',
    category: 'water',
    color: 'aqua',
    goal: {
      current: 1.8,
      target: 2.5,
      unit: 'لیتر',
    },
    trend: {
      direction: 'up',
      value: 8,
      impact: 'positive',
    },
    timestamp: new Date(),
    insights: 'برای حفظ سلامتی بیشتر آب بنوشید.',
  },
  {
    id: '4',
    title: 'وزن',
    value: 78.5,
    unit: 'کیلوگرم',
    category: 'weight',
    color: 'navy',
    trend: {
      direction: 'down',
      value: 2,
      impact: 'positive',
    },
    timestamp: new Date(),
  },
  {
    id: '5',
    title: 'خواب',
    value: 6.5,
    unit: 'ساعت',
    category: 'sleep',
    color: 'info',
    goal: {
      current: 6.5,
      target: 8,
      unit: 'ساعت',
    },
    trend: {
      direction: 'neutral',
      value: 0,
      impact: 'neutral',
    },
    timestamp: new Date(),
    insights: 'کیفیت خواب شما خوب است، اما سعی کنید زمان خواب را افزایش دهید.',
  },
  {
    id: '6',
    title: 'کالری مصرفی',
    value: 1840,
    unit: 'کالری',
    category: 'calories',
    color: 'error',
    goal: {
      current: 1840,
      target: 2000,
      unit: 'کالری',
    },
    trend: {
      direction: 'down',
      value: 3,
      impact: 'negative',
    },
    timestamp: new Date(),
  },
];

const teamInsights = [
  {
    id: '1',
    title: 'میانگین فعالیت بدنی',
    value: '58',
    unit: 'دقیقه/روز',
    comparison: '+12% نسبت به هفته گذشته',
    trend: 'up',
    impactType: 'positive',
  },
  {
    id: '2',
    title: 'درصد هیدراتاسیون',
    value: '74',
    unit: '%',
    comparison: '-3% نسبت به هفته گذشته',
    trend: 'down',
    impactType: 'negative',
  },
  {
    id: '3',
    title: 'میانگین خواب',
    value: '6.8',
    unit: 'ساعت',
    comparison: '+5% نسبت به هفته گذشته',
    trend: 'up',
    impactType: 'positive',
  },
  {
    id: '4',
    title: 'میزان استرس',
    value: '65',
    unit: '%',
    comparison: '+8% نسبت به هفته گذشته',
    trend: 'up',
    impactType: 'negative',
  },
];

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          داشبورد سلامت و تندرستی
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          وضعیت سلامتی خود را پیگیری کنید و به اهداف خود برسید
        </p>
      </div>
      
      <div className="flex items-center space-x-3 space-x-reverse">
        <Select defaultValue="today">
          <SelectTrigger className="w-[140px] h-9 text-sm bg-white dark:bg-slate-800">
            <SelectValue placeholder="بازه زمانی" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="today">امروز</SelectItem>
            <SelectItem value="week">هفته جاری</SelectItem>
            <SelectItem value="month">ماه جاری</SelectItem>
            <SelectItem value="quarter">سه ماهه اخیر</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="sm" className="h-9">
          <Calendar className="h-4 w-4 ml-1" />
          <span>انتخاب تاریخ</span>
        </Button>
        
        <Button className="h-9 bg-tiffany text-white hover:bg-tiffany-hover">
          <Activity className="h-4 w-4 ml-1" />
          <span>ثبت داده جدید</span>
        </Button>
      </div>
    </div>
  );
};

const InsightCard = ({ insight }: { insight: any }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{insight.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end">
          <div className="text-2xl font-bold">{insight.value}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mr-1 mb-1">{insight.unit}</div>
        </div>
        <div className={`mt-2 text-xs ${insight.impactType === 'positive' ? 'text-success dark:text-success-light' : 'text-error dark:text-error-light'} flex items-center`}>
          {insight.trend === 'up' ? (
            <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none">
              <path d="M12 5l7 7-1.41 1.41L13 8.83V19h-2V8.83l-4.59 4.58L5 12l7-7z" fill="currentColor"/>
            </svg>
          ) : (
            <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none">
              <path d="M12 19l-7-7 1.41-1.41L11 15.17V5h2v10.17l4.59-4.58L19 12l-7 7z" fill="currentColor"/>
            </svg>
          )}
          <span>{insight.comparison}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function HealthDashboard() {
  const [activeTab, setActiveTab] = useState('personal');
  
  return (
    <div className="space-y-6">
        <DashboardHeader />
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="pro-tabs"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="personal" className="pro-tab">
              <User className="h-4 w-4 ml-1.5" />
              داده‌های شخصی
            </TabsTrigger>
            <TabsTrigger value="team" className="pro-tab">
              <Users className="h-4 w-4 ml-1.5" />
              سلامت تیمی
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="pro-tab-content">
            <h2 className="text-xl font-bold mb-4">وضعیت سلامتی</h2>
            <HealthMetricsGrid metrics={healthMetrics} />
          </TabsContent>
          
          <TabsContent value="team" className="pro-tab-content">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">سلامت تیمی</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {teamInsights.map(insight => (
                    <InsightCard key={insight.id} insight={insight} />
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">چالش‌های فعال تیمی</h2>
                  <Button variant="link" className="text-tiffany dark:text-tiffany-light">
                    مشاهده همه
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <Card className="pro-card tiffany overflow-hidden">
                    <div className="absolute top-0 right-0 bg-tiffany/10 dark:bg-tiffany/20 text-tiffany dark:text-tiffany-light text-xs font-medium py-1 px-2.5 rounded-bl-lg">
                      در حال انجام
                    </div>
                    <CardHeader>
                      <CardTitle>چالش ۱۰،۰۰۰ قدم روزانه</CardTitle>
                      <CardDescription>۷ روز باقیمانده</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm mb-2">
                        <span>پیشرفت تیمی</span>
                        <span className="font-medium">۶۸%</span>
                      </div>
                      <div className="h-2 bg-tiffany/10 dark:bg-tiffany/20 rounded-full overflow-hidden">
                        <div className="h-full bg-tiffany dark:bg-tiffany-light rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <div className="mt-4 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>۱۵ مشارکت‌کننده</span>
                        <span>شروع: ۱۴۰۲/۱۱/۱۰</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="pro-card aqua overflow-hidden">
                    <div className="absolute top-0 right-0 bg-aqua/10 dark:bg-aqua/20 text-aqua dark:text-aqua-light text-xs font-medium py-1 px-2.5 rounded-bl-lg">
                      در حال انجام
                    </div>
                    <CardHeader>
                      <CardTitle>چالش نوشیدن ۲.۵ لیتر آب روزانه</CardTitle>
                      <CardDescription>۱۴ روز باقیمانده</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm mb-2">
                        <span>پیشرفت تیمی</span>
                        <span className="font-medium">۴۵%</span>
                      </div>
                      <div className="h-2 bg-aqua/10 dark:bg-aqua/20 rounded-full overflow-hidden">
                        <div className="h-full bg-aqua dark:bg-aqua-light rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <div className="mt-4 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                        <span>۲۰ مشارکت‌کننده</span>
                        <span>شروع: ۱۴۰۲/۱۱/۱۵</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}