import React, { useState } from 'react';
import { HealthMetricsGrid, type HealthMetricData } from '@/components/dashboards/HealthMetricsCard';
import { Activity, Calendar, User, Users, Heart, Award, Clock, ChevronRight, Trophy, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="relative z-10">
      {/* افکت های پس زمینه */}
      <div className="absolute -top-10 -right-10 w-60 h-60 bg-gradient-radial from-rose-500/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-gradient-radial from-tiffany/5 to-transparent rounded-full blur-3xl"></div>
      
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 mb-10 relative z-10"
      >
        <div className="relative">
          {/* خط تزئینی */}
          <div className="absolute -left-3 top-0 bottom-0 w-1 overflow-hidden">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-tiffany/40 to-transparent"></div>
            <motion.div
              className="absolute top-0 h-[30%] w-full bg-gradient-to-b from-transparent via-white/40 to-transparent"
              animate={{ y: ['-100%', '400%'] }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity,
              }}
            />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tiffany via-aqua to-blue-500 relative">
            داشبورد سلامت و تندرستی
            <motion.span
              className="absolute -top-1 -right-2 text-sm text-rose-400"
              animate={{ 
                y: [0, -3, 0],
                opacity: [1, 0.7, 1]
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
            >
              <Sparkles className="h-5 w-5" />
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-slate-500 dark:text-slate-400 mt-2 mr-1 max-w-lg relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            وضعیت سلامتی خود را پیگیری کنید و به اهداف خود برسید
            <motion.div 
              className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity 
              }}
            />
          </motion.p>
        </div>
        
        <motion.div 
          className="flex items-center space-x-3 space-x-reverse"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Select defaultValue="today">
            <SelectTrigger className="w-[140px] h-10 text-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl">
              <SelectValue placeholder="بازه زمانی" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <motion.div 
                className="absolute inset-0 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <div className="relative z-10">
                <SelectItem value="today">امروز</SelectItem>
                <SelectItem value="week">هفته جاری</SelectItem>
                <SelectItem value="month">ماه جاری</SelectItem>
                <SelectItem value="quarter">سه ماهه اخیر</SelectItem>
              </div>
            </SelectContent>
          </Select>
          
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button variant="outline" size="sm" className="h-10 px-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all rounded-xl">
              <Calendar className="h-4 w-4 ml-2 text-tiffany dark:text-tiffany-light" />
              <span>انتخاب تاریخ</span>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button className="h-10 px-4 bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-hover hover:to-aqua-light text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl border-0 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSAxaDR2NEgtMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <Activity className="h-4 w-4 ml-2 relative z-10" />
              <span className="relative z-10">ثبت داده جدید</span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const InsightCard = ({ insight }: { insight: any }) => {
  // مشخص کردن رنگ‌های مناسب برای هر نوع بینش
  const getCardStyle = () => {
    if (insight.id === '1') return { color: 'tiffany', icon: <Activity className="h-5 w-5" /> };
    if (insight.id === '2') return { color: 'aqua', icon: <Heart className="h-5 w-5" /> };
    if (insight.id === '3') return { color: 'amber', icon: <Clock className="h-5 w-5" /> };
    if (insight.id === '4') return { color: 'fuchsia', icon: <Sparkles className="h-5 w-5" /> };
    return { color: 'tiffany', icon: <Activity className="h-5 w-5" /> };
  };

  const { color, icon } = getCardStyle();
  const colorMap = {
    tiffany: {
      bg: 'bg-tiffany',
      bgLight: 'bg-tiffany/10 dark:bg-tiffany/20',
      text: 'text-tiffany dark:text-tiffany-light',
      gradient: 'from-tiffany to-cyan-500'
    },
    aqua: {
      bg: 'bg-aqua',
      bgLight: 'bg-aqua/10 dark:bg-aqua/20',
      text: 'text-aqua dark:text-aqua-light',
      gradient: 'from-aqua to-blue-500'
    },
    amber: {
      bg: 'bg-amber-500',
      bgLight: 'bg-amber-500/10 dark:bg-amber-500/20',
      text: 'text-amber-500 dark:text-amber-400',
      gradient: 'from-amber-500 to-orange-500'
    },
    fuchsia: {
      bg: 'bg-fuchsia-500',
      bgLight: 'bg-fuchsia-500/10 dark:bg-fuchsia-500/20',
      text: 'text-fuchsia-500 dark:text-fuchsia-400',
      gradient: 'from-fuchsia-500 to-pink-500'
    }
  };

  const colorStyle = colorMap[color];
  const isPositive = insight.impactType === 'positive';
  const trendColor = isPositive ? 'text-success dark:text-success-light' : 'text-error dark:text-error-light';
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className={`overflow-hidden relative shadow-sm hover:shadow-md transition-all duration-300 border-slate-200 dark:border-slate-700 ${isPositive ? 'hover:border-success/30' : 'hover:border-error/30'}`}>
        {/* پس زمینه گرادیانی متحرک */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${colorStyle.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
        
        {/* خط تزئینی بالای کارت */}
        <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
          <div className={`h-full w-full ${colorStyle.bgLight}`}></div>
          <motion.div 
            className={`absolute top-0 h-full w-20 ${colorStyle.bg} opacity-40`}
            animate={{ x: ['-100%', '300%'] }}
            transition={{ 
              duration: 3, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </div>
        
        <CardHeader className="pb-1 relative">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className={`p-1.5 rounded-full ${colorStyle.bgLight}`}>
              <div className={colorStyle.text}>
                {icon}
              </div>
            </div>
            <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {insight.title}
            </CardTitle>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-end">
            <motion.div 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-slate-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {insight.value}
            </motion.div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mr-1 mb-1">{insight.unit}</div>
          </div>
          
          <div className={`mt-3 text-xs ${trendColor} flex items-center`}>
            <motion.div 
              animate={{ 
                y: isPositive ? [0, -3, 0] : [0, 3, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity
              }}
              className="flex items-center"
            >
              {insight.trend === 'up' ? (
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5l7 7-1.41 1.41L13 8.83V19h-2V8.83l-4.59 4.58L5 12l7-7z" fill="currentColor"/>
                </svg>
              ) : (
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none">
                  <path d="M12 19l-7-7 1.41-1.41L11 15.17V5h2v10.17l4.59-4.58L19 12l-7 7z" fill="currentColor"/>
                </svg>
              )}
              <span>{insight.comparison}</span>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
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
          {/* تب‌ها با افکت‌های بصری پیشرفته */}
          <div className="relative overflow-hidden mb-8">
            {/* افکت هاله پشت تب‌ها */}
            <div className="absolute -left-6 -top-6 w-40 h-40 bg-gradient-radial from-fuchsia-500/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -right-6 -top-6 w-40 h-40 bg-gradient-radial from-tiffany/10 to-transparent rounded-full blur-3xl"></div>
            
            {/* خط تزئینی بالای تب‌ها */}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-3 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-tiffany/50 to-transparent"
                animate={{ x: ['-100%', '500%'] }}
                transition={{ 
                  duration: 5, 
                  ease: "easeInOut", 
                  repeat: Infinity
                }}
              />
            </div>
            
            {/* تب‌ها با انیمیشن پیشرفته */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TabsList className="relative z-10 p-1 h-14 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-0 shadow-lg rounded-xl">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-slate-100/80 to-white/80 dark:from-slate-900/80 dark:to-slate-800/80 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* افکت خط جاری تب */}
                <motion.div 
                  className="absolute bottom-0 h-0.5 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-tiffany rounded-full"
                  style={{ 
                    left: activeTab === 'personal' ? '0%' : '50%',
                    width: '50%',
                  }}
                  animate={{ 
                    left: activeTab === 'personal' ? '0%' : '50%',
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  layoutId="activeTabLine"
                />
                
                {/* دکمه تب اول */}
                <TabsTrigger 
                  value="personal" 
                  className={`relative z-20 p-2 px-5 transition-all duration-300 ${
                    activeTab === 'personal' 
                      ? 'text-rose-600 dark:text-rose-400 font-bold' 
                      : 'text-slate-600 dark:text-slate-400'
                  } hover:text-rose-500 dark:hover:text-rose-400 group`}
                >
                  <div className="flex items-center">
                    <div className={`relative p-1.5 rounded-full mr-3 transition-all duration-300 ${
                      activeTab === 'personal' 
                        ? 'bg-gradient-to-br from-rose-500 to-fuchsia-600 shadow-md shadow-rose-500/20'
                        : 'bg-slate-100 dark:bg-slate-700'
                    }`}>
                      <User className={`h-5 w-5 ${
                        activeTab === 'personal' 
                          ? 'text-white' 
                          : 'text-slate-500 dark:text-slate-400'
                      } transition-all duration-300`} />
                      
                      {/* حلقه متحرک */}
                      {activeTab === 'personal' && (
                        <motion.div 
                          className="absolute inset-0 rounded-full"
                          animate={{ 
                            boxShadow: [
                              '0 0 0 0 rgba(244, 63, 94, 0)',
                              '0 0 0 3px rgba(244, 63, 94, 0.2)',
                              '0 0 0 0 rgba(244, 63, 94, 0)'
                            ]
                          }}
                          transition={{ 
                            duration: 2, 
                            ease: "easeInOut", 
                            repeat: Infinity
                          }}
                        />
                      )}
                    </div>
                    
                    <div className="flex flex-col items-start">
                      <span className="font-medium">داده‌های شخصی</span>
                      <span className={`text-[10px] ${
                        activeTab === 'personal' 
                          ? 'text-rose-500 dark:text-rose-400' 
                          : 'text-slate-400 dark:text-slate-500'
                      }`}>گزارش‌های فردی</span>
                    </div>
                    
                    {/* ایکون اشاره‌گر انتخاب شده */}
                    <div className={`absolute left-3 transition-all duration-300 ${
                      activeTab === 'personal' ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <motion.div
                        animate={{ x: [-2, 2, -2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Sparkles className="h-4 w-4 text-rose-500" />
                      </motion.div>
                    </div>
                  </div>
                </TabsTrigger>
                
                {/* دکمه تب دوم */}
                <TabsTrigger 
                  value="team" 
                  className={`relative z-20 p-2 px-5 transition-all duration-300 ${
                    activeTab === 'team' 
                      ? 'text-tiffany dark:text-tiffany-light font-bold' 
                      : 'text-slate-600 dark:text-slate-400'
                  } hover:text-tiffany dark:hover:text-tiffany-light group`}
                >
                  <div className="flex items-center">
                    <div className={`relative p-1.5 rounded-full mr-3 transition-all duration-300 ${
                      activeTab === 'team' 
                        ? 'bg-gradient-to-br from-tiffany to-cyan-500 shadow-md shadow-tiffany/20'
                        : 'bg-slate-100 dark:bg-slate-700'
                    }`}>
                      <Users className={`h-5 w-5 ${
                        activeTab === 'team' 
                          ? 'text-white' 
                          : 'text-slate-500 dark:text-slate-400'
                      } transition-all duration-300`} />
                      
                      {/* حلقه متحرک */}
                      {activeTab === 'team' && (
                        <motion.div 
                          className="absolute inset-0 rounded-full"
                          animate={{ 
                            boxShadow: [
                              '0 0 0 0 rgba(45, 212, 191, 0)',
                              '0 0 0 3px rgba(45, 212, 191, 0.2)',
                              '0 0 0 0 rgba(45, 212, 191, 0)'
                            ]
                          }}
                          transition={{ 
                            duration: 2, 
                            ease: "easeInOut", 
                            repeat: Infinity
                          }}
                        />
                      )}
                    </div>
                    
                    <div className="flex flex-col items-start">
                      <span className="font-medium">سلامت تیمی</span>
                      <span className={`text-[10px] ${
                        activeTab === 'team' 
                          ? 'text-tiffany dark:text-tiffany-light' 
                          : 'text-slate-400 dark:text-slate-500'
                      }`}>عملکرد گروهی</span>
                    </div>
                    
                    {/* ایکون اشاره‌گر انتخاب شده */}
                    <div className={`absolute left-3 transition-all duration-300 ${
                      activeTab === 'team' ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <motion.div
                        animate={{ x: [-2, 2, -2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Award className="h-4 w-4 text-tiffany" />
                      </motion.div>
                    </div>
                  </div>
                </TabsTrigger>
              </TabsList>
            </motion.div>
          </div>
          
          <TabsContent value="personal" className="pro-tab-content mt-6">
            <div className="relative">
              {/* هدر با انیمیشن و افکت */}
              <div className="relative mb-6 overflow-hidden">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 p-0.5">
                      <div className="absolute inset-0 rounded-lg bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSAxaDR2NEgtMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-600 rounded-[7px]">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      
                      {/* افکت هاله متحرک */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg opacity-40"
                        animate={{ 
                          boxShadow: [
                            '0 0 0 0 rgba(244, 63, 94, 0)',
                            '0 0 0 6px rgba(244, 63, 94, 0.1)',
                            '0 0 0 0 rgba(244, 63, 94, 0)'
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          ease: "easeInOut", 
                          repeat: Infinity
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500">
                      وضعیت سلامتی
                      <motion.div 
                        animate={{ rotate: [0, 5, 0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="mr-2 text-rose-500"
                      >
                        <Sparkles className="h-5 w-5" />
                      </motion.div>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                      همین الان دیتای سلامتی شما به‌روز شده است
                    </p>
                  </div>
                </div>
                
                {/* خط دکوراتیو */}
                <div className="h-0.5 w-full mt-6 bg-gradient-to-r from-rose-500/30 via-pink-500/0 to-rose-500/0 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 h-full bg-gradient-to-r from-transparent via-rose-500 to-transparent"
                    style={{ width: '30%' }}
                    animate={{ 
                      left: ['-30%', '100%'],
                    }}
                    transition={{ 
                      duration: 2, 
                      ease: "easeInOut", 
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                </div>
              </div>
              
              {/* افکت های بصری پس زمینه */}
              <div className="absolute top-0 right-0 opacity-20 pointer-events-none">
                <motion.div 
                  className="text-rose-500"
                  animate={{ 
                    y: [0, -15, 0], 
                    opacity: [0.2, 0.5, 0.2]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity
                  }}
                >
                  <Activity className="h-24 w-24" />
                </motion.div>
              </div>
              
              <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none">
                <motion.div 
                  className="text-pink-400"
                  animate={{ 
                    y: [0, 10, 0], 
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ 
                    duration: 5, 
                    delay: 1,
                    repeat: Infinity
                  }}
                >
                  <Clock className="h-20 w-20" />
                </motion.div>
              </div>
              
              {/* محتوای اصلی با انیمیشن ورود */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HealthMetricsGrid metrics={healthMetrics} />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="pro-tab-content mt-6">
            <div className="space-y-8 relative">
              {/* افکت های بصری پس زمینه */}
              <div className="absolute top-40 right-20 opacity-10 pointer-events-none">
                <motion.div 
                  className="text-tiffany"
                  animate={{ 
                    y: [0, -10, 0], 
                    opacity: [0.1, 0.2, 0.1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity
                  }}
                >
                  <Users className="h-32 w-32" />
                </motion.div>
              </div>
              
              <div className="absolute bottom-20 left-10 opacity-10 pointer-events-none">
                <motion.div 
                  className="text-aqua"
                  animate={{ 
                    y: [0, 15, 0], 
                    opacity: [0.1, 0.25, 0.1]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity
                  }}
                >
                  <Award className="h-24 w-24" />
                </motion.div>
              </div>
              
              {/* هدر با انیمیشن و افکت */}
              <div className="relative mb-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-tiffany to-aqua p-0.5">
                      <div className="absolute inset-0 rounded-lg bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSAxaDR2NEgtMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-tiffany to-aqua rounded-[7px]">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      
                      {/* افکت هاله متحرک */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg opacity-40"
                        animate={{ 
                          boxShadow: [
                            '0 0 0 0 rgba(45, 212, 191, 0)',
                            '0 0 0 6px rgba(45, 212, 191, 0.1)',
                            '0 0 0 0 rgba(45, 212, 191, 0)'
                          ]
                        }}
                        transition={{ 
                          duration: 2, 
                          ease: "easeInOut", 
                          repeat: Infinity
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-tiffany to-aqua">
                      سلامت تیمی
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 10, 0] 
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="mr-2 text-tiffany"
                      >
                        <Award className="h-5 w-5" />
                      </motion.div>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                      گزارش عملکرد تیمی در هفته اخیر
                    </p>
                  </div>
                </div>
                
                {/* خط دکوراتیو */}
                <div className="h-0.5 w-full mt-6 bg-gradient-to-r from-tiffany/30 via-aqua/0 to-tiffany/0 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 h-full bg-gradient-to-r from-transparent via-tiffany to-transparent"
                    style={{ width: '30%' }}
                    animate={{ 
                      left: ['-30%', '100%'],
                    }}
                    transition={{ 
                      duration: 2, 
                      ease: "easeInOut", 
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                </div>
              </div>
              
              {/* کارت‌های بینش‌ها با انیمیشن ورود */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {teamInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <InsightCard insight={insight} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* چالش‌های تیمی */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">
                      چالش‌های فعال تیمی
                    </h2>
                  </div>
                  <Button variant="ghost" className="text-amber-500 dark:text-amber-400 flex items-center group">
                    <span>مشاهده همه</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight className="h-4 w-4 mr-1 group-hover:mr-2 transition-all" />
                    </motion.div>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <Card className="pro-card tiffany overflow-hidden group-hover:shadow-lg group-hover:shadow-tiffany/10 dark:group-hover:shadow-tiffany/5 transition-all duration-300">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-tiffany/40 to-transparent rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="absolute top-0 right-0 z-10">
                        <div className="relative flex items-center bg-tiffany text-white text-xs font-medium py-1 pr-2 pl-3 rounded-bl-lg">
                          <span className="relative z-10 flex items-center">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="mr-1"
                            >
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </motion.div>
                            در حال انجام
                          </span>
                          <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-tiffany/80 to-tiffany"></div>
                        </div>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="flex items-start">
                          <Activity className="h-5 w-5 mr-1 text-tiffany flex-shrink-0 mt-1" />
                          <span>چالش ۱۰،۰۰۰ قدم روزانه</span>
                        </CardTitle>
                        <CardDescription className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          <span>۷ روز باقیمانده</span>
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex justify-between text-sm mb-2">
                          <span>پیشرفت تیمی</span>
                          <span className="font-medium text-tiffany">۶۸%</span>
                        </div>
                        
                        <div className="h-3 bg-tiffany/10 dark:bg-tiffany/20 rounded-full overflow-hidden backdrop-blur-sm">
                          <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: '68%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-tiffany to-tiffany-light rounded-full relative"
                          >
                            <div className="absolute inset-0 overflow-hidden">
                              <motion.div 
                                className="w-20 h-full bg-white/20"
                                animate={{ x: ['-100%', '400%'] }}
                                transition={{ 
                                  duration: 2, 
                                  ease: "easeInOut", 
                                  repeat: Infinity,
                                  repeatDelay: 1
                                }}
                              />
                            </div>
                          </motion.div>
                        </div>
                        
                        <div className="mt-4 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1 text-slate-400" />
                            <span>۱۵ مشارکت‌کننده</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-slate-400" />
                            <span>شروع: ۱۴۰۲/۱۱/۱۰</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <Card className="pro-card aqua overflow-hidden group-hover:shadow-lg group-hover:shadow-aqua/10 dark:group-hover:shadow-aqua/5 transition-all duration-300">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-aqua/40 to-transparent rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                      <div className="absolute top-0 right-0 z-10">
                        <div className="relative flex items-center bg-aqua text-white text-xs font-medium py-1 pr-2 pl-3 rounded-bl-lg">
                          <span className="relative z-10 flex items-center">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="mr-1"
                            >
                              <div className="h-2 w-2 rounded-full bg-white"></div>
                            </motion.div>
                            در حال انجام
                          </span>
                          <div className="absolute top-0 right-0 h-full w-full bg-gradient-to-l from-aqua/80 to-aqua"></div>
                        </div>
                      </div>
                      
                      <CardHeader>
                        <CardTitle className="flex items-start">
                          <Heart className="h-5 w-5 mr-1 text-aqua flex-shrink-0 mt-1" />
                          <span>چالش نوشیدن ۲.۵ لیتر آب روزانه</span>
                        </CardTitle>
                        <CardDescription className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                          <span>۱۴ روز باقیمانده</span>
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="flex justify-between text-sm mb-2">
                          <span>پیشرفت تیمی</span>
                          <span className="font-medium text-aqua">۴۵%</span>
                        </div>
                        
                        <div className="h-3 bg-aqua/10 dark:bg-aqua/20 rounded-full overflow-hidden backdrop-blur-sm">
                          <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: '45%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-aqua to-aqua-light rounded-full relative"
                          >
                            <div className="absolute inset-0 overflow-hidden">
                              <motion.div 
                                className="w-20 h-full bg-white/20"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ 
                                  duration: 2, 
                                  ease: "easeInOut", 
                                  repeat: Infinity,
                                  repeatDelay: 1
                                }}
                              />
                            </div>
                          </motion.div>
                        </div>
                        
                        <div className="mt-4 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center">
                            <Users className="h-3.5 w-3.5 mr-1 text-slate-400" />
                            <span>۲۰ مشارکت‌کننده</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-slate-400" />
                            <span>شروع: ۱۴۰۲/۱۱/۱۵</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}