import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import {
  Filter,
  BarChart3,
  Activity,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle,
  Clock,
  CheckCircle,
  Flag,
  Target,
  Clipboard,
  FileText,
  Info,
  Settings,
  ShieldCheck,
  TreePine,
  Wind,
  Sun,
  Factory,
  GraduationCap,
  ClipboardCheck,
  User,
  Plus,
  Users,
  Heart,
  Calendar
} from 'lucide-react';

// داده‌های ساختگی برای نمودارها
const healthMetricsData = [
  { name: 'فروردین', کارخانه_A: 4000, کارخانه_B: 2400, امتیاز_ایمنی: 90 },
  { name: 'اردیبهشت', کارخانه_A: 3000, کارخانه_B: 1398, امتیاز_ایمنی: 82 },
  { name: 'خرداد', کارخانه_A: 2000, کارخانه_B: 9800, امتیاز_ایمنی: 75 },
  { name: 'تیر', کارخانه_A: 2780, کارخانه_B: 3908, امتیاز_ایمنی: 88 },
  { name: 'مرداد', کارخانه_A: 1890, کارخانه_B: 4800, امتیاز_ایمنی: 94 },
  { name: 'شهریور', کارخانه_A: 2390, کارخانه_B: 3800, امتیاز_ایمنی: 98 },
  { name: 'مهر', کارخانه_A: 3490, کارخانه_B: 4300, امتیاز_ایمنی: 92 },
];

const incidentTypeData = [
  { name: 'لغزش و سقوط', مقدار: 35 },
  { name: 'برخورد با اشیاء', مقدار: 22 },
  { name: 'حوادث برقی', مقدار: 15 },
  { name: 'مواد شیمیایی', مقدار: 10 },
  { name: 'بلند کردن نادرست', مقدار: 18 },
];

const COLORS = ['#2EC4B6', '#52C4B9', '#FFBB00', '#FF9500', '#D72638'];

const trainingCompletionData = [
  { name: 'گروه 1', امتیاز: 75 },
  { name: 'گروه 2', امتیاز: 89 },
  { name: 'گروه 3', امتیاز: 96 },
  { name: 'گروه 4', امتیاز: 82 },
  { name: 'گروه 5', امتیاز: 65 },
  { name: 'گروه 6', امتیاز: 78 },
];

// کامپوننت پس‌زمینه داینامیک با افکت‌های انیمیشن
const DynamicBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden dark:opacity-40 opacity-20 pointer-events-none">
      <div className="absolute -top-[40%] -right-[30%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-tiffany-light/20 via-tiffany/10 to-transparent blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-[40%] -left-[30%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-blue-500/20 via-violet-500/10 to-transparent blur-3xl animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent blur-2xl animate-pulse-slow animation-delay-1000"></div>
      <div className="absolute bottom-[10%] right-[30%] w-[20%] h-[20%] rounded-full bg-gradient-to-l from-emerald-500/20 via-emerald-400/10 to-transparent blur-2xl animate-pulse-slow animation-delay-3000"></div>
    </div>
  );
};

// کارت شیشه‌ای با افکت‌های بصری
const GlassCard = ({ children, className = "" }) => {
  return (
    <Card className={`relative overflow-hidden rounded-xl glass-effect bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      {children}
    </Card>
  );
};

// شاخص‌های کلیدی عملکرد
const keyPerformanceIndicators = [
  { 
    title: 'شاخص HSE سازمانی', 
    value: 94, 
    change: 12, 
    trend: 'up',
    description: 'بهبود 12% نسبت به دوره قبل',
    icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
    color: 'emerald',
    isPrimary: true
  },
  { 
    title: 'حوادث بدون توقف کار', 
    value: 5, 
    change: -35, 
    trend: 'down',
    description: 'کاهش 35% نسبت به دوره قبل',
    icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    color: 'amber',
    details: '2 مورد کمتر از ماه گذشته'
  },
  { 
    title: 'روزهای بدون حادثه', 
    value: 183, 
    change: 15, 
    trend: 'up',
    description: '6 ماه بدون حادثه اصلی',
    icon: <Clock className="h-5 w-5 text-blue-500" />,
    color: 'blue',
    details: 'رکورد جدید برای واحد تولید'
  },
  { 
    title: 'شاخص زیست محیطی', 
    value: 89, 
    change: 8, 
    trend: 'up',
    description: 'بهبود 8% نسبت به دوره قبل',
    icon: <TreePine className="h-5 w-5 text-tiffany" />,
    color: 'tiffany',
    details: 'کاهش کربن در تمام واحدها'
  },
  { 
    title: 'تکمیل آموزش‌های HSE', 
    value: 92, 
    change: 7, 
    trend: 'up',
    description: 'بهبود 7% نسبت به دوره قبل',
    icon: <Award className="h-5 w-5 text-violet-500" />,
    color: 'violet',
    details: '24 دوره آموزشی تکمیل شده'
  },
  { 
    title: 'ممیزی‌های داخلی', 
    value: 97, 
    change: 4, 
    trend: 'up',
    description: 'بهبود 4% نسبت به دوره قبل',
    icon: <Clipboard className="h-5 w-5 text-indigo-500" />,
    color: 'indigo',
    details: '32 مورد ممیزی کامل شده'
  },
  { 
    title: 'گزارش‌های شبه حادثه', 
    value: 76, 
    change: 18, 
    trend: 'up',
    description: '18% افزایش گزارش‌دهی',
    icon: <Flag className="h-5 w-5 text-rose-500" />,
    color: 'rose',
    details: 'مشارکت فعال کارکنان'
  },
  { 
    title: 'شاخص کیفیت هوا', 
    value: 87, 
    change: 5, 
    trend: 'up',
    description: 'بهبود 5% نسبت به دوره قبل',
    icon: <Wind className="h-5 w-5 text-cyan-500" />,
    color: 'cyan',
    details: 'کاهش آلاینده‌های صنعتی'
  }
];

// هشدارهای سلامت
const healthAlerts = [
  {
    id: 1,
    title: 'هشدار گرمازدگی',
    description: 'پیش‌بینی دمای بالای 38 درجه در روز آینده. لطفا تمهیدات لازم را بیندیشید.',
    level: 'high',
    time: '2 ساعت پیش',
    icon: <Sun className="h-5 w-5" />
  },
  {
    id: 2,
    title: 'شاخص آلودگی هوا',
    description: 'شاخص کیفیت هوا در محدوده هشدار قرار دارد. استفاده از ماسک توصیه می‌شود.',
    level: 'medium',
    time: '4 ساعت پیش',
    icon: <Wind className="h-5 w-5" />
  },
  {
    id: 3,
    title: 'یادآوری معاینات دوره‌ای',
    description: 'معاینات دوره‌ای کارکنان بخش تولید در هفته آینده انجام می‌شود.',
    level: 'info',
    time: '1 روز پیش',
    icon: <Calendar className="h-5 w-5" />
  },
  {
    id: 4,
    title: 'بروزرسانی دستورالعمل‌ها',
    description: 'دستورالعمل‌های جدید ایمنی در بخش تعمیرات به‌روزرسانی شد.',
    level: 'info',
    time: '2 روز پیش',
    icon: <FileText className="h-5 w-5" />
  }
];

// فعالیت‌های اخیر
const recentActivities = [
  {
    id: 1,
    title: 'بازرسی دوره‌ای',
    description: 'بازرسی دوره‌ای بخش تولید انجام شد',
    time: '30 دقیقه پیش',
    icon: <CheckCircle className="h-5 w-5 text-emerald-500" />
  },
  {
    id: 2,
    title: 'گزارش حادثه',
    description: 'یک حادثه جزئی در بخش انبار گزارش شد',
    time: '2 ساعت پیش',
    icon: <Flag className="h-5 w-5 text-rose-500" />
  },
  {
    id: 3,
    title: 'آموزش ایمنی',
    description: 'جلسه آموزش ایمنی برای کارکنان جدید برگزار شد',
    time: '1 روز پیش',
    icon: <Users className="h-5 w-5 text-blue-500" />
  },
  {
    id: 4,
    title: 'تعویض تجهیزات',
    description: 'تجهیزات ایمنی در بخش تولید به‌روزرسانی شد',
    time: '2 روز پیش',
    icon: <Settings className="h-5 w-5 text-amber-500" />
  },
  {
    id: 5,
    title: 'ممیزی استانداردها',
    description: 'ممیزی استانداردهای ISO در بخش اداری انجام شد',
    time: '3 روز پیش',
    icon: <FileText className="h-5 w-5 text-indigo-500" />
  }
];

// رویدادهای آینده
const upcomingEvents = [
  {
    id: 1,
    title: 'آموزش اطفاء حریق',
    description: 'آموزش عملی اطفاء حریق برای گروه‌های A و B',
    time: 'فردا، 10:00',
    location: 'محوطه آموزشی شرقی',
    icon: <Activity className="h-5 w-5 text-rose-500" />
  },
  {
    id: 2,
    title: 'معاینات دوره‌ای',
    description: 'معاینات دوره‌ای کارکنان بخش تولید',
    time: 'پنج‌شنبه، تمام روز',
    location: 'مرکز بهداشت شرکت',
    icon: <Heart className="h-5 w-5 text-emerald-500" />
  },
  {
    id: 3,
    title: 'جلسه کمیته HSE',
    description: 'بررسی وضعیت ایمنی فصل گذشته و برنامه‌ریزی آتی',
    time: 'شنبه، 14:00',
    location: 'سالن جلسات مرکزی',
    icon: <Users className="h-5 w-5 text-blue-500" />
  }
];

// هدر داشبورد با فیلترها
const DashboardHeader = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [locationFilter, setLocationFilter] = useState('all');
  
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">داشبورد هوشمند HSE</h1>
          <p className="text-slate-500 dark:text-slate-400">
            نمای 360 درجه از وضعیت سلامت، ایمنی و محیط زیست سازمان
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <FileText className="h-4 w-4 ml-1" />
            دانلود گزارش
          </Button>
          <Button variant="default" size="sm" className="gap-1">
            <Settings className="h-4 w-4 ml-1" />
            تنظیمات
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-32 h-9 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg">
            <SelectValue placeholder="دوره زمانی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">روزانه</SelectItem>
            <SelectItem value="week">هفتگی</SelectItem>
            <SelectItem value="month">ماهانه</SelectItem>
            <SelectItem value="quarter">فصلی</SelectItem>
            <SelectItem value="year">سالانه</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-32 h-9 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg">
            <SelectValue placeholder="همه مکان‌ها" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه مکان‌ها</SelectItem>
            <SelectItem value="loc-1">کارخانه 1</SelectItem>
            <SelectItem value="loc-2">کارخانه 2</SelectItem>
            <SelectItem value="loc-3">کارخانه 3</SelectItem>
            <SelectItem value="loc-4">دفتر مرکزی</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger className="w-32 h-9 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-lg">
            <SelectValue placeholder="دپارتمان" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه دپارتمان‌ها</SelectItem>
            <SelectItem value="prod">تولید</SelectItem>
            <SelectItem value="eng">مهندسی</SelectItem>
            <SelectItem value="qa">کنترل کیفیت</SelectItem>
            <SelectItem value="maint">تعمیرات</SelectItem>
            <SelectItem value="hr">منابع انسانی</SelectItem>
          </SelectContent>
        </Select>
        
        <Button 
          size="sm" 
          className="h-9 rounded-lg bg-gradient-to-r from-tiffany to-tiffany-dark text-white transition-all duration-300 border-none animate-shimmer bg-[length:200%]"
        >
          <Filter className="h-4 w-4 ml-1" />
          فیلتر پیشرفته
        </Button>
      </div>
    </motion.div>
  );
};

// نمایش شاخص اصلی
const MainIndicator = () => {
  const mainKpi = keyPerformanceIndicators.find(kpi => kpi.isPrimary);
  
  if (!mainKpi) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="relative overflow-hidden rounded-xl glass-effect border-2 border-tiffany/30 dark:border-tiffany/20 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg group hover:shadow-lg hover:shadow-tiffany/5 transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tiffany to-transparent opacity-50"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tiffany/5 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-4 h-14 w-14 rounded-xl bg-tiffany/10 flex items-center justify-center">
              {mainKpi.icon}
            </div>
            <div>
              <h2 className="font-bold text-xl">{mainKpi.title}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{mainKpi.description}</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center">
              <span className="text-4xl font-bold">{mainKpi.value}</span>
              <span className="text-2xl font-bold text-slate-400 ml-1">/ 100</span>
              
              <div className={`ml-3 flex items-center ${mainKpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {mainKpi.trend === 'up' ? (
                  <TrendingUp className="h-5 w-5 mr-1" />
                ) : (
                  <TrendingDown className="h-5 w-5 mr-1" />
                )}
                <span className="font-medium">{Math.abs(mainKpi.change)}%</span>
              </div>
            </div>
            
            <div className="flex mt-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-tiffany-light to-tiffany animate-shimmer bg-[length:200%]" 
                style={{ width: `${mainKpi.value}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// کامپوننت شاخص های کلیدی عملکرد
const KPISection = () => {
  const otherKpis = keyPerformanceIndicators.filter(kpi => !kpi.isPrimary);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {otherKpis.map((kpi, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard className="group">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <div className={`h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-3`}>
                  {kpi.icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{kpi.title}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xl font-bold mr-1">{kpi.value}</span>
                    <div className={`ml-2 flex items-center text-xs ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {kpi.trend === 'up' ? (
                        <ArrowUp className="h-3 w-3 mr-0.5" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-0.5" />
                      )}
                      <span>{Math.abs(kpi.change)}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <Progress 
                value={kpi.value} 
                className="h-1.5 bg-slate-200/50 dark:bg-slate-700/50" 
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {kpi.details || kpi.description}
              </p>
            </CardContent>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
};

// کامپوننت نمودار روند ایمنی
const SafetyTrendChart = () => {
  return (
    <GlassCard className="col-span-2">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">روند شاخص‌های ایمنی</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            <BarChart3 className="h-4 w-4 ml-1" />
            گزارش کامل
          </Button>
        </div>
        <CardDescription>مقایسه شاخص‌های ایمنی در ماه‌های اخیر</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={healthMetricsData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ opacity: 0.2 }}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ opacity: 0.2 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="امتیاز_ایمنی" 
                stroke="#2EC4B6" 
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="کارخانه_A" 
                stroke="#FF9F1C" 
                strokeWidth={2} 
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="کارخانه_B" 
                stroke="#9381FF" 
                strokeWidth={2} 
                dot={{ r: 3, strokeWidth: 1 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </GlassCard>
  );
};

// کامپوننت نمودار توزیع حوادث
const IncidentDistributionChart = () => {
  return (
    <GlassCard className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">توزیع حوادث</CardTitle>
        <CardDescription>نوع حوادث در دوره جاری</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={incidentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={35}
                fill="#2EC4B6"
                dataKey="مقدار"
                nameKey="name"
              >
                {incidentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {incidentTypeData.map((item, index) => (
            <div key={index} className="flex items-center">
              <span 
                className="inline-block w-3 h-3 rounded-sm mr-1"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></span>
              <span className="text-xs">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
};

// کامپوننت نمودار برنامه آموزشی
const TrainingCompletionChart = () => {
  return (
    <GlassCard className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">تکمیل آموزش‌ها</CardTitle>
        <CardDescription>میزان تکمیل برنامه‌های آموزشی</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trainingCompletionData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ opacity: 0.2 }}
              />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={{ opacity: 0.2 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }} 
              />
              <Bar 
                dataKey="امتیاز" 
                fill="#2EC4B6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </GlassCard>
  );
};

// کامپوننت هشدارهای سلامت
const HealthAlertsSection = () => {
  return (
    <GlassCard className="col-span-1">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">هشدارها و اعلان‌ها</CardTitle>
          <Badge variant="outline" className="text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50">
            {healthAlerts.length} مورد فعال
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[320px] overflow-y-auto">
          {healthAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`
                border-b border-slate-200/50 dark:border-slate-700/50 py-3 px-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors
                ${alert.level === 'high' ? 'border-r-4 border-r-rose-500' : 
                  alert.level === 'medium' ? 'border-r-4 border-r-amber-500' : 
                  'border-r-4 border-r-blue-500'}
              `}
            >
              <div className="flex items-start">
                <div 
                  className={`
                    h-8 w-8 rounded-lg mr-3 flex items-center justify-center flex-shrink-0
                    ${alert.level === 'high' ? 'bg-rose-100 dark:bg-rose-950/30 text-rose-500' : 
                      alert.level === 'medium' ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-500' : 
                      'bg-blue-100 dark:bg-blue-950/30 text-blue-500'}
                  `}
                >
                  {alert.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                    {alert.description}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-slate-400 dark:text-slate-500 text-xs">{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
};

// کامپوننت فعالیت‌های اخیر
const RecentActivitiesSection = () => {
  return (
    <GlassCard className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">فعالیت‌های اخیر</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[320px] overflow-y-auto">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="border-b border-slate-200/50 dark:border-slate-700/50 py-3 px-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 mr-3 flex items-center justify-center flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                    {activity.description}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-slate-400 dark:text-slate-500 text-xs">{activity.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
};

// کامپوننت رویدادهای آینده
const UpcomingEventsSection = () => {
  return (
    <GlassCard className="col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">رویدادهای آینده</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[320px] overflow-y-auto">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              className="border-b border-slate-200/50 dark:border-slate-700/50 py-3 px-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 mr-3 flex items-center justify-center flex-shrink-0">
                  {event.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-slate-400 dark:text-slate-500 text-xs flex items-center">
                      <Clock className="h-3 w-3 ml-1 text-slate-400" />
                      {event.time}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs flex items-center">
                      <Factory className="h-3 w-3 ml-1 text-slate-400" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  );
};

// کامپوننت اصلی داشبورد HSE
export default function HSESmartDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  
  return (
    <div className="relative min-h-screen">
      <DynamicBackground />
      
      <div className="px-4 py-6 mx-auto container">
        <DashboardHeader />
        
        <div className="mb-6 relative">
          <div className="sticky top-0 z-30 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-xl mb-4 p-1 shadow-sm border border-slate-200/70 dark:border-slate-700/30">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-2">
              <div className="flex items-center">
                <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="bg-transparent p-1">
                    <TabsTrigger 
                      value="overview" 
                      className="relative py-2.5 px-4 text-sm rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-tiffany/90 data-[state=active]:to-tiffany-dark/90 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
                    >
                      <span className="absolute inset-0 bg-tiffany/0 group-hover:bg-tiffany/10 group-data-[state=active]:bg-transparent rounded-lg transition-colors duration-300"></span>
                      <span className="relative flex items-center">
                        <Activity className="h-4 w-4 ml-2" />
                        نمای کلی
                      </span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="safety" 
                      className="relative py-2.5 px-4 text-sm rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-amber-500/90 data-[state=active]:to-amber-600/90 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
                    >
                      <span className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 group-data-[state=active]:bg-transparent rounded-lg transition-colors duration-300"></span>
                      <span className="relative flex items-center">
                        <ShieldCheck className="h-4 w-4 ml-2" />
                        ایمنی
                      </span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="health" 
                      className="relative py-2.5 px-4 text-sm rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500/90 data-[state=active]:to-emerald-600/90 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
                    >
                      <span className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 group-data-[state=active]:bg-transparent rounded-lg transition-colors duration-300"></span>
                      <span className="relative flex items-center">
                        <Activity className="h-4 w-4 ml-2" />
                        سلامت
                      </span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="environment" 
                      className="relative py-2.5 px-4 text-sm rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500/90 data-[state=active]:to-blue-600/90 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
                    >
                      <span className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 group-data-[state=active]:bg-transparent rounded-lg transition-colors duration-300"></span>
                      <span className="relative flex items-center">
                        <TreePine className="h-4 w-4 ml-2" />
                        محیط زیست
                      </span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="training" 
                      className="relative py-2.5 px-4 text-sm rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-violet-500/90 data-[state=active]:to-violet-600/90 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
                    >
                      <span className="absolute inset-0 bg-violet-500/0 group-hover:bg-violet-500/10 group-data-[state=active]:bg-transparent rounded-lg transition-colors duration-300"></span>
                      <span className="relative flex items-center">
                        <GraduationCap className="h-4 w-4 ml-2" />
                        آموزش
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="relative mt-3 md:mt-0">
                <Button
                  variant="ghost"
                  className={`
                    py-1.5 px-3 rounded-lg text-xs font-medium
                    ${showCustomizePanel 
                      ? 'bg-tiffany hover:bg-tiffany-dark text-white' 
                      : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-tiffany/10 dark:hover:bg-tiffany/10 border border-slate-200/50 dark:border-slate-700/50'}
                    transition-all duration-300 ease-in-out shadow-sm
                  `}
                  onClick={() => setShowCustomizePanel(!showCustomizePanel)}
                >
                  <div className="flex items-center">
                    <Settings className="h-3.5 w-3.5 ml-1.5" />
                    {showCustomizePanel ? 'در حال شخصی‌سازی' : 'شخصی‌سازی داشبورد'}
                  </div>
                </Button>
                
                {showCustomizePanel && (
                  <div className="absolute top-full right-0 mt-2 p-4 w-72 bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-xl backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70 z-50">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">شخصی‌سازی داشبورد</h4>
                      <Button 
                        variant="ghost"
                        className="h-6 w-6 p-0 rounded-full text-slate-500"
                        onClick={() => setShowCustomizePanel(false)}
                      >
                        <span className="sr-only">بستن</span>
                        <Plus className="h-4 w-4 rotate-45" />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-xs font-medium mb-2">ترتیب نمایش ویجت‌ها</h5>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-slate-100/80 dark:bg-slate-900/80 rounded-md p-2">
                            <span className="text-xs">شاخص‌های کلیدی</span>
                            <div className="flex items-center">
                              <Button variant="ghost" className="h-6 w-6 p-0 rounded-full text-slate-500">
                                <span className="sr-only">بالا</span>
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" className="h-6 w-6 p-0 rounded-full text-slate-500">
                                <span className="sr-only">پایین</span>
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between bg-slate-100/80 dark:bg-slate-900/80 rounded-md p-2">
                            <span className="text-xs">نمودار روند ایمنی</span>
                            <div className="flex items-center">
                              <Button variant="ghost" className="h-6 w-6 p-0 rounded-full text-slate-500">
                                <span className="sr-only">بالا</span>
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" className="h-6 w-6 p-0 rounded-full text-slate-500">
                                <span className="sr-only">پایین</span>
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between bg-slate-100/80 dark:bg-slate-900/80 rounded-md p-2">
                            <span className="text-xs">هشدارها و اعلان‌ها</span>
                            <div className="flex items-center">
                              <Button variant="ghost" className="h-6 w-6 p-0 rounded-full text-slate-500">
                                <span className="sr-only">بالا</span>
                                <ArrowUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" className="h-6 w-6 p-0 rounded-full text-slate-500">
                                <span className="sr-only">پایین</span>
                                <ArrowDown className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <Button className="w-full bg-tiffany hover:bg-tiffany-dark text-white text-xs py-2">
                          ذخیره تنظیمات
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <TabsContent value="overview" className="mt-0 p-0">
            <div className="space-y-6">
              <MainIndicator />
              
              <KPISection />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SafetyTrendChart />
                <IncidentDistributionChart />
                <TrainingCompletionChart />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <HealthAlertsSection />
                <RecentActivitiesSection />
                <UpcomingEventsSection />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="safety" className="mt-0 p-0">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium">داشبورد ایمنی</h3>
              <p className="text-slate-500 dark:text-slate-400">این بخش در حال توسعه است</p>
            </div>
          </TabsContent>
          
          <TabsContent value="health" className="mt-0 p-0">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium">داشبورد سلامت</h3>
              <p className="text-slate-500 dark:text-slate-400">این بخش در حال توسعه است</p>
            </div>
          </TabsContent>
          
          <TabsContent value="environment" className="mt-0 p-0">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium">داشبورد محیط زیست</h3>
              <p className="text-slate-500 dark:text-slate-400">این بخش در حال توسعه است</p>
            </div>
          </TabsContent>
          
          <TabsContent value="training" className="mt-0 p-0">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium">داشبورد آموزش</h3>
              <p className="text-slate-500 dark:text-slate-400">این بخش در حال توسعه است</p>
            </div>
          </TabsContent>
        </div>
      </div>
    </div>
  );
}