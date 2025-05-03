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
            <div className="relative px-1">
              {/* افکت‌های بصری پس زمینه - عناصر متحرک و هاله‌ها */}
              <div className="absolute -top-20 -right-10 w-96 h-96 bg-gradient-radial from-rose-500/5 to-transparent rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
              <div className="absolute top-40 -left-20 w-80 h-80 bg-gradient-radial from-pink-500/5 to-transparent rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
              <div className="absolute -bottom-10 right-1/4 w-60 h-60 bg-gradient-radial from-fuchsia-500/5 to-transparent rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
              
              <div className="relative z-10">
                {/* هدر با دیزاین پیشرفته */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-white/30 to-white/10 dark:from-slate-900/30 dark:to-slate-900/10 backdrop-blur-lg rounded-2xl p-5 mb-8 shadow-lg relative overflow-hidden"
                >
                  {/* افکت پترن پس زمینه */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTS0xMyAxM2gyNnYyNmgtMjZ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50"></div>
                  
                  {/* خط تزئینی بالا */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-rose-500/30 to-transparent"></div>
                    <motion.div 
                      className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-rose-500/70 to-transparent"
                      animate={{ x: ['-100%', '500%'] }}
                      transition={{ 
                        duration: 4, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  </div>
                  
                  {/* افکت نقاط پراکنده متحرک */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                      className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-rose-400/30"
                      animate={{ 
                        y: [0, -20, 0],
                        opacity: [0, 1, 0] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                    <motion.div 
                      className="absolute top-2/3 left-1/3 h-1.5 w-1.5 rounded-full bg-pink-400/30"
                      animate={{ 
                        y: [0, -30, 0],
                        opacity: [0, 1, 0] 
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: 1,
                        repeatDelay: 0.5
                      }}
                    />
                    <motion.div 
                      className="absolute top-1/2 left-2/3 h-1 w-1 rounded-full bg-fuchsia-400/30"
                      animate={{ 
                        y: [0, -15, 0],
                        opacity: [0, 1, 0] 
                      }}
                      transition={{ 
                        duration: 3.5, 
                        repeat: Infinity,
                        delay: 0.5
                      }}
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative z-10">
                    <div className="shrink-0">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-2xl p-0.5 bg-gradient-to-br from-rose-500 to-fuchsia-600 relative overflow-hidden shadow-lg shadow-rose-500/10">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSAxaDR2NEgtMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                          <div className="absolute inset-0.5 rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-fuchsia-600"></div>
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-br from-rose-400/80 to-fuchsia-500/80 opacity-0"
                              animate={{ opacity: [0, 0.5, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </div>
                          <div className="absolute inset-0.5 flex items-center justify-center">
                            <Heart className="h-8 w-8 text-white drop-shadow-lg" />
                          </div>
                          
                          {/* خطوط شیار دور آیکون */}
                          <motion.div 
                            className="absolute inset-0 rounded-2xl border border-white/20"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          {/* افکت هاله متحرک */}
                          <motion.div 
                            className="absolute inset-0 rounded-2xl"
                            animate={{ 
                              boxShadow: [
                                '0 0 0 0 rgba(244, 63, 94, 0)',
                                '0 0 0 8px rgba(244, 63, 94, 0.1)',
                                '0 0 0 0 rgba(244, 63, 94, 0)'
                              ]
                            }}
                            transition={{ 
                              duration: 2.5, 
                              ease: "easeInOut", 
                              repeat: Infinity
                            }}
                          />
                        </div>
                        
                        {/* افکت نقطه ضربان */}
                        <motion.div 
                          className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-rose-500"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(244, 63, 94, 0.5)',
                              '0 0 0 3px rgba(244, 63, 94, 0)',
                              '0 0 0 0 rgba(244, 63, 94, 0.5)'
                            ]
                          }}
                          transition={{ 
                            duration: 1.3, 
                            repeat: Infinity,
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-600 drop-shadow-sm flex items-center">
                        وضعیت سلامتی شخصی
                        <motion.div 
                          className="inline-flex mr-2 text-rose-500 drop-shadow"
                          animate={{ 
                            rotate: [0, 10, 0, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 5, repeat: Infinity }}
                        >
                          <Sparkles className="h-6 w-6" />
                        </motion.div>
                      </h2>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-slate-500 dark:text-slate-400">
                        <p className="text-base">
                          داده‌های سلامتی به‌روز شده
                        </p>
                        
                        <div className="flex items-center">
                          <span className="mx-2 hidden sm:inline-block h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                          <span className="font-medium text-xs flex items-center px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                            <motion.div 
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"
                            />
                            <span>فعال</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-1 flex items-center text-xs text-slate-400">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>به‌روزرسانی: دیروز ۱۶:۳۰</span>
                      </div>
                    </div>
                    
                    {/* نمایش امتیاز سلامت - عنصر جدید */}
                    <div className="md:mr-auto bg-gradient-to-br from-slate-50/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-3 backdrop-blur-sm shadow-sm flex flex-col items-center">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">امتیاز سلامت</div>
                      <div className="flex items-end">
                        <motion.div 
                          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tiffany to-green-500"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          8.7
                        </motion.div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 ml-1 mb-0.5">/10</div>
                      </div>
                      
                      <div className="mt-1 flex items-center text-xs text-success font-medium">
                        <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5l7 7-1.41 1.41L13 8.83V19h-2V8.83l-4.59 4.58L5 12l7-7z" fill="currentColor"/>
                        </svg>
                        <span>+۵% از ماه گذشته</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* عناصر تزئینی متحرک */}
              <div className="absolute top-5 -right-5 opacity-10 pointer-events-none">
                <motion.div 
                  className="text-rose-500"
                  animate={{ 
                    y: [0, -20, 0], 
                    rotate: [0, 5, 0],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity
                  }}
                >
                  <Activity className="h-32 w-32" />
                </motion.div>
              </div>
              
              <div className="absolute bottom-10 -left-12 opacity-10 pointer-events-none">
                <motion.div 
                  className="text-fuchsia-500"
                  animate={{ 
                    y: [0, 20, 0], 
                    rotate: [0, -5, 0],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity,
                    delay: 2
                  }}
                >
                  <Clock className="h-28 w-28" />
                </motion.div>
              </div>
              
              {/* محتوای اصلی با انیمیشن ورود پیشرفته */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10"
              >
                <HealthMetricsGrid metrics={healthMetrics} />
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="team" className="pro-tab-content mt-6">
            <div className="relative px-1">
              {/* افکت‌های بصری پس زمینه - عناصر متحرک و هاله‌ها */}
              <div className="absolute -top-20 -right-10 w-96 h-96 bg-gradient-radial from-tiffany/5 to-transparent rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
              <div className="absolute top-40 -left-20 w-80 h-80 bg-gradient-radial from-aqua/5 to-transparent rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
              <div className="absolute -bottom-10 right-1/4 w-60 h-60 bg-gradient-radial from-cyan-500/5 to-transparent rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
              
              <div className="relative z-10">
                {/* هدر با دیزاین پیشرفته */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-white/30 to-white/10 dark:from-slate-900/30 dark:to-slate-900/10 backdrop-blur-lg rounded-2xl p-5 mb-8 shadow-lg relative overflow-hidden"
                >
                  {/* افکت پترن پس زمینه */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTS0xMyAxM2gyNnYyNmgtMjZ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50"></div>
                  
                  {/* خط تزئینی بالا */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-tiffany/30 to-transparent"></div>
                    <motion.div 
                      className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-tiffany/70 to-transparent"
                      animate={{ x: ['-100%', '500%'] }}
                      transition={{ 
                        duration: 4, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  </div>
                  
                  {/* افکت نقاط پراکنده متحرک */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                      className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-tiffany/30"
                      animate={{ 
                        y: [0, -20, 0],
                        opacity: [0, 1, 0] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                    <motion.div 
                      className="absolute top-2/3 left-1/3 h-1.5 w-1.5 rounded-full bg-aqua/30"
                      animate={{ 
                        y: [0, -30, 0],
                        opacity: [0, 1, 0] 
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: 1,
                        repeatDelay: 0.5
                      }}
                    />
                    <motion.div 
                      className="absolute top-1/2 left-2/3 h-1 w-1 rounded-full bg-cyan-400/30"
                      animate={{ 
                        y: [0, -15, 0],
                        opacity: [0, 1, 0] 
                      }}
                      transition={{ 
                        duration: 3.5, 
                        repeat: Infinity,
                        delay: 0.5
                      }}
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 relative z-10">
                    <div className="shrink-0">
                      <div className="relative">
                        <div className="h-16 w-16 rounded-2xl p-0.5 bg-gradient-to-br from-tiffany to-aqua relative overflow-hidden shadow-lg shadow-tiffany/10">
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSAxaDR2NEgtMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                          <div className="absolute inset-0.5 rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-tiffany to-aqua"></div>
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-br from-tiffany/80 to-cyan-500/80 opacity-0"
                              animate={{ opacity: [0, 0.5, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </div>
                          <div className="absolute inset-0.5 flex items-center justify-center">
                            <Users className="h-8 w-8 text-white drop-shadow-lg" />
                          </div>
                          
                          {/* خطوط شیار دور آیکون */}
                          <motion.div 
                            className="absolute inset-0 rounded-2xl border border-white/20"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          {/* افکت هاله متحرک */}
                          <motion.div 
                            className="absolute inset-0 rounded-2xl"
                            animate={{ 
                              boxShadow: [
                                '0 0 0 0 rgba(45, 212, 191, 0)',
                                '0 0 0 8px rgba(45, 212, 191, 0.1)',
                                '0 0 0 0 rgba(45, 212, 191, 0)'
                              ]
                            }}
                            transition={{ 
                              duration: 2.5, 
                              ease: "easeInOut", 
                              repeat: Infinity
                            }}
                          />
                        </div>
                        
                        {/* افکت نقطه ضربان */}
                        <motion.div 
                          className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-tiffany"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              '0 0 0 0 rgba(45, 212, 191, 0.5)',
                              '0 0 0 3px rgba(45, 212, 191, 0)',
                              '0 0 0 0 rgba(45, 212, 191, 0.5)'
                            ]
                          }}
                          transition={{ 
                            duration: 1.3, 
                            repeat: Infinity,
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tiffany via-aqua to-cyan-500 drop-shadow-sm flex items-center">
                        گزارش سلامت تیمی
                        <motion.div 
                          className="inline-flex mr-2 text-tiffany drop-shadow"
                          animate={{ 
                            rotate: [0, 10, 0, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 5, repeat: Infinity }}
                        >
                          <Award className="h-6 w-6" />
                        </motion.div>
                      </h2>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-slate-500 dark:text-slate-400">
                        <p className="text-base">
                          آمار عملکرد سلامت تیمی در هفته جاری
                        </p>
                        
                        <div className="flex items-center">
                          <span className="mx-2 hidden sm:inline-block h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                          <span className="font-medium text-xs flex items-center px-2 py-0.5 rounded-full bg-tiffany/10 dark:bg-tiffany/20 text-tiffany dark:text-tiffany-light">
                            <motion.div 
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="h-1.5 w-1.5 rounded-full bg-tiffany mr-1"
                            />
                            <span>۱۷ عضو فعال</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-1 flex items-center text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>هفته منتهی به ۱۴۰۲/۱۱/۲۸</span>
                      </div>
                    </div>
                    
                    {/* نمایش امتیاز تیمی - عنصر جدید */}
                    <div className="md:mr-auto bg-gradient-to-br from-slate-50/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/60 rounded-xl p-3 backdrop-blur-sm shadow-sm flex flex-col items-center">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">عملکرد تیمی</div>
                      <div className="flex items-end">
                        <motion.div 
                          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          76
                        </motion.div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 ml-1 mb-0.5">%</div>
                      </div>
                      
                      <div className="mt-1 flex items-center text-xs text-success font-medium">
                        <svg className="w-3 h-3 mr-0.5" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5l7 7-1.41 1.41L13 8.83V19h-2V8.83l-4.59 4.58L5 12l7-7z" fill="currentColor"/>
                        </svg>
                        <span>+۸% از هفته قبل</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* کارت‌های بینش‌های تیمی با انیمیشن ورود پیشرفته */}
              <motion.div
                className="relative z-10 mb-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* عنوان بخش با انیمیشن */}
                <motion.div 
                  className="flex items-center mb-5 pb-2 border-b border-slate-200 dark:border-slate-700"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="h-7 w-7 mr-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
                    آمار و ارقام سلامت تیمی
                  </h3>
                  <div className="mr-auto">
                    <motion.div 
                      className="relative h-1.5 w-8 bg-amber-500/20 rounded-full overflow-hidden"
                      whileHover={{ width: '32px' }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {teamInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.15 * index }}
                    >
                      <InsightCard insight={insight} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* چالش‌های تیمی - با طراحی پیشرفته‌تر */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="relative z-10"
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
                  <div className="flex flex-col mb-4 sm:mb-0">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/10">
                        <Trophy className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600 mr-3">
                        چالش‌های فعال تیمی
                      </h3>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mr-12 mt-1">
                      چالش‌های گروهی برای بهبود سلامت سازمانی
                    </p>
                  </div>
                  
                  <Button variant="ghost" className="text-amber-500 dark:text-amber-400 flex items-center group border border-amber-200 dark:border-amber-900/30 hover:bg-amber-50 dark:hover:bg-amber-900/20 h-9 rounded-lg transition-all duration-300">
                    <span>مشاهده همه چالش‌ها</span>
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
                    <Card className="pro-card tiffany overflow-hidden border-0 group-hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-900/80 dark:to-slate-900/40 backdrop-blur-md relative">
                      {/* پس زمینه گرادیانی متحرک */}
                      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-tiffany/30 to-transparent rounded-full blur-3xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      
                      {/* پترن پس زمینه */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTS0xMyAxM2gyNnYyNmgtMjZ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-40"></div>
                      
                      {/* خط تزئینی بالا */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-tiffany/40 to-transparent"></div>
                        <motion.div 
                          className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-tiffany/80 to-transparent"
                          animate={{ x: ['-100%', '500%'] }}
                          transition={{ 
                            duration: 3, 
                            ease: "easeInOut", 
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      </div>
                      
                      {/* برچسب وضعیت */}
                      <div className="absolute top-0 right-0 z-10 overflow-hidden">
                        <div className="relative flex items-center bg-gradient-to-l from-tiffany to-cyan-500 text-white text-xs font-medium py-1.5 px-3 rounded-bl-lg shadow-md">
                          <span className="relative z-10 flex items-center">
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="mr-1.5"
                            >
                              <div className="h-2 w-2 rounded-full bg-white/90 shadow-inner"></div>
                            </motion.div>
                            در حال انجام
                          </span>
                          <div className="absolute top-0 right-0 h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSAxaDR2NEgtMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                        </div>
                      </div>
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-start">
                          <div className="mr-3 bg-gradient-to-br from-tiffany/10 to-cyan-500/10 p-2 rounded-lg">
                            <Activity className="h-6 w-6 text-tiffany" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">چالش ۱۰،۰۰۰ قدم روزانه</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              <span>۷ روز باقیمانده</span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative z-10">
                        <div className="mb-4 bg-gradient-to-r from-white/70 to-white/30 dark:from-slate-800/70 dark:to-slate-800/30 rounded-lg p-3 backdrop-blur-sm">
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            این چالش برای افزایش فعالیت روزانه همه اعضای تیم و بهبود سلامت قلبی-عروقی طراحی شده است.
                          </p>
                        </div>
                        
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">پیشرفت تیمی</span>
                          <span className="font-bold text-tiffany">۶۸%</span>
                        </div>
                        
                        <div className="h-4 bg-tiffany/10 dark:bg-tiffany/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                          <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: '68%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-tiffany to-cyan-500 rounded-full relative"
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
                        
                        <div className="mt-5 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-lg">
                            <Users className="h-4 w-4 mr-1 text-tiffany" />
                            <span>۱۵ مشارکت‌کننده</span>
                          </div>
                          <div className="flex items-center bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-lg">
                            <Calendar className="h-4 w-4 mr-1 text-tiffany" />
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
                    <Card className="pro-card aqua overflow-hidden border-0 group-hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-white/80 to-white/40 dark:from-slate-900/80 dark:to-slate-900/40 backdrop-blur-md relative">
                      {/* پس زمینه گرادیانی متحرک */}
                      <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-aqua/30 to-transparent rounded-full blur-3xl opacity-30 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      
                      {/* پترن پس زمینه */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTS0xMyAxM2gyNnYyNmgtMjZ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-40"></div>
                      
                      {/* خط تزئینی بالا */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-aqua/40 to-transparent"></div>
                        <motion.div 
                          className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-aqua/80 to-transparent"
                          animate={{ x: ['-100%', '500%'] }}
                          transition={{ 
                            duration: 3, 
                            ease: "easeInOut", 
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                      </div>
                      
                      {/* برچسب وضعیت */}
                      <div className="absolute top-0 right-0 z-10 overflow-hidden">
                        <div className="relative flex items-center bg-gradient-to-l from-aqua to-blue-500 text-white text-xs font-medium py-1.5 px-3 rounded-bl-lg shadow-md">
                          <span className="relative z-10 flex items-center">
                            <motion.div
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="mr-1.5"
                            >
                              <div className="h-2 w-2 rounded-full bg-white/90 shadow-inner"></div>
                            </motion.div>
                            در حال انجام
                          </span>
                          <div className="absolute top-0 right-0 h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSAxaDR2NEgtMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
                        </div>
                      </div>
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-start">
                          <div className="mr-3 bg-gradient-to-br from-aqua/10 to-blue-500/10 p-2 rounded-lg">
                            <Heart className="h-6 w-6 text-aqua" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100">چالش نوشیدن ۲.۵ لیتر آب روزانه</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Clock className="h-3.5 w-3.5 mr-1 text-slate-400" />
                              <span>۱۴ روز باقیمانده</span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative z-10">
                        <div className="mb-4 bg-gradient-to-r from-white/70 to-white/30 dark:from-slate-800/70 dark:to-slate-800/30 rounded-lg p-3 backdrop-blur-sm">
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            این چالش برای افزایش هیدراتاسیون مناسب و ترویج عادت نوشیدن آب کافی در طول روز طراحی شده است.
                          </p>
                        </div>
                        
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">پیشرفت تیمی</span>
                          <span className="font-bold text-aqua">۴۵%</span>
                        </div>
                        
                        <div className="h-4 bg-aqua/10 dark:bg-aqua/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                          <motion.div 
                            initial={{ width: '0%' }}
                            animate={{ width: '45%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-aqua to-blue-500 rounded-full relative"
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
                        
                        <div className="mt-5 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-lg">
                            <Users className="h-4 w-4 mr-1 text-aqua" />
                            <span>۲۰ مشارکت‌کننده</span>
                          </div>
                          <div className="flex items-center bg-white/50 dark:bg-slate-800/50 px-2 py-1 rounded-lg">
                            <Calendar className="h-4 w-4 mr-1 text-aqua" />
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