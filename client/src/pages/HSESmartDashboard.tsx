import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription 
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
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Scatter, ScatterChart, ZAxis, Treemap, 
  ComposedChart, Sankey, RadialBarChart, RadialBar 
} from 'recharts';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Download,
  Filter,
  RefreshCcw,
  Plus,
  Zap,
  Rocket,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Activity,
  Users,
  Layers,
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Award,
  Heart,
  AlertCircle,
  Clock,
  Calendar as CalendarIcon,
  Bell,
  CheckCircle,
  Flag,
  ThumbsUp,
  Speech,
  Target,
  Gauge,
  Clipboard,
  FileText,
  Share2,
  Save,
  Eye,
  Info,
  HelpCircle,
  Settings,
  UserPlus,
  ShieldCheck,
  Map,
  Globe,
  Building,
  TreePine,
  Droplets,
  Wind,
  Sun,
  CloudDrizzle,
  Factory,
  Maximize2,
  X,
  Moon,
  LayoutGrid,
  LayoutList,
  GraduationCap,
  Share
} from 'lucide-react';

// داده‌های ساختگی برای نمودارها و گراف‌ها
const healthMetricsData = [
  { name: 'فروردین', کارخانه_A: 4000, کارخانه_B: 2400, امتیاز_ایمنی: 90 },
  { name: 'اردیبهشت', کارخانه_A: 3000, کارخانه_B: 1398, امتیاز_ایمنی: 82 },
  { name: 'خرداد', کارخانه_A: 2000, کارخانه_B: 9800, امتیاز_ایمنی: 75 },
  { name: 'تیر', کارخانه_A: 2780, کارخانه_B: 3908, امتیاز_ایمنی: 88 },
  { name: 'مرداد', کارخانه_A: 1890, کارخانه_B: 4800, امتیاز_ایمنی: 94 },
  { name: 'شهریور', کارخانه_A: 2390, کارخانه_B: 3800, امتیاز_ایمنی: 98 },
  { name: 'مهر', کارخانه_A: 3490, کارخانه_B: 4300, امتیاز_ایمنی: 92 },
];

const departmentSafetyData = [
  { name: 'تولید', امتیاز: 85, تکمیل: 75 },
  { name: 'انبار', امتیاز: 92, تکمیل: 89 },
  { name: 'خط مونتاژ', امتیاز: 78, تکمیل: 82 },
  { name: 'تعمیرات', امتیاز: 68, تکمیل: 75 },
  { name: 'اداری', امتیاز: 96, تکمیل: 94 },
  { name: 'R&D', امتیاز: 88, تکمیل: 85 },
  { name: 'کنترل کیفیت', امتیاز: 90, تکمیل: 87 },
];

const incidentTypeData = [
  { name: 'لغزش و سقوط', مقدار: 35 },
  { name: 'برخورد با اشیاء', مقدار: 22 },
  { name: 'حوادث برقی', مقدار: 15 },
  { name: 'مواد شیمیایی', مقدار: 10 },
  { name: 'بلند کردن نادرست', مقدار: 18 },
];

const COLORS = ['#2EC4B6', '#52C4B9', '#FFBB00', '#FF9500', '#D72638'];

const environmentalData = [
  { subject: 'کیفیت هوا', A: 85, B: 90, fullMark: 100 },
  { subject: 'مصرف انرژی', A: 68, B: 85, fullMark: 100 },
  { subject: 'بازیافت مواد', A: 90, B: 75, fullMark: 100 },
  { subject: 'مصرف آب', A: 72, B: 95, fullMark: 100 },
  { subject: 'آلودگی صوتی', A: 80, B: 70, fullMark: 100 },
  { subject: 'مدیریت پسماند', A: 75, B: 88, fullMark: 100 },
];

const trainingCompletionData = [
  { name: 'گروه 1', امتیاز: 75 },
  { name: 'گروه 2', امتیاز: 89 },
  { name: 'گروه 3', امتیاز: 96 },
  { name: 'گروه 4', امتیاز: 82 },
  { name: 'گروه 5', امتیاز: 65 },
  { name: 'گروه 6', امتیاز: 78 },
];

const riskAssessmentData = [
  {
    name: 'ریسک‌های بالا', 
    فروردین: 25, اردیبهشت: 23, خرداد: 20, تیر: 16, 
    مرداد: 15, شهریور: 18, مهر: 22
  },
  {
    name: 'ریسک‌های متوسط', 
    فروردین: 45, اردیبهشت: 42, خرداد: 40, تیر: 35, 
    مرداد: 32, شهریور: 30, مهر: 28
  },
  {
    name: 'ریسک‌های پایین', 
    فروردین: 30, اردیبهشت: 35, خرداد: 40, تیر: 49, 
    مرداد: 53, شهریور: 52, مهر: 50
  },
];

const healthIndexScoreData = [
  { name: 'شاخص A', امتیاز: 75, میانگین: 80 },
  { name: 'شاخص B', امتیاز: 80, میانگین: 75 },
  { name: 'شاخص C', امتیاز: 90, میانگین: 85 },
  { name: 'شاخص D', امتیاز: 65, میانگین: 70 },
  { name: 'شاخص E', امتیاز: 85, میانگین: 80 },
  { name: 'شاخص F', امتیاز: 70, میانگین: 75 },
];

const complianceByLocationData = [
  { name: 'کارخانه 1', نسبت: 0.92 },
  { name: 'کارخانه 2', نسبت: 0.85 },
  { name: 'کارخانه 3', نسبت: 0.79 },
  { name: 'کارخانه 4', نسبت: 0.96 },
  { name: 'کارخانه 5', نسبت: 0.88 },
  { name: 'کارخانه 6', نسبت: 0.82 },
  { name: 'کارخانه 7', نسبت: 0.91 },
];

const airQualityData = [
  { name: 'فروردین', AQI: 55, دما: 18, رطوبت: 65 },
  { name: 'اردیبهشت', AQI: 65, دما: 22, رطوبت: 60 },
  { name: 'خرداد', AQI: 80, دما: 28, رطوبت: 55 },
  { name: 'تیر', AQI: 95, دما: 32, رطوبت: 50 },
  { name: 'مرداد', AQI: 110, دما: 35, رطوبت: 45 },
  { name: 'شهریور', AQI: 95, دما: 30, رطوبت: 50 },
  { name: 'مهر', AQI: 75, دما: 25, رطوبت: 60 },
];

const safetyAuditData = [
  { name: 'دوره 1', امتیاز: 78, استاندارد: 75 },
  { name: 'دوره 2', امتیاز: 82, استاندارد: 75 },
  { name: 'دوره 3', امتیاز: 86, استاندارد: 80 },
  { name: 'دوره 4', امتیاز: 84, استاندارد: 80 },
  { name: 'دوره 5', امتیاز: 90, استاندارد: 85 },
  { name: 'دوره 6', امتیاز: 88, استاندارد: 85 },
  { name: 'دوره 7', امتیاز: 92, استاندارد: 85 },
  { name: 'دوره 8', امتیاز: 94, استاندارد: 90 },
];

const budgetAllocationData = [
  { name: 'آموزش', مقدار: 25, fill: '#2EC4B6' },
  { name: 'تجهیزات', مقدار: 35, fill: '#52C4B9' },
  { name: 'پایش', مقدار: 18, fill: '#FFBB00' },
  { name: 'مشاوره', مقدار: 12, fill: '#FF9500' },
  { name: 'متفرقه', مقدار: 10, fill: '#D72638' },
];

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

// کامپوننت‌های داشبورد
// کامپوننت پس‌زمینه داینامیک با افکت‌های انیمیشن
const DynamicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden dark:opacity-40 opacity-20 pointer-events-none">
      {/* گرادیان‌های پس‌زمینه با افکت انیمیشن */}
      <div className="absolute -top-[40%] -right-[30%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-tiffany-light/20 via-tiffany/10 to-transparent blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-[40%] -left-[30%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-blue-500/20 via-violet-500/10 to-transparent blur-3xl animate-pulse-slow animation-delay-2000"></div>
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent blur-2xl animate-pulse-slow animation-delay-1000"></div>
      <div className="absolute bottom-[10%] right-[30%] w-[20%] h-[20%] rounded-full bg-gradient-to-l from-emerald-500/20 via-emerald-400/10 to-transparent blur-2xl animate-pulse-slow animation-delay-3000"></div>
      
      {/* اشکال هندسی متحرک */}
      <div className="absolute top-[15%] left-[10%] w-24 h-24 border border-tiffany/20 rounded-xl rotate-12 animate-float"></div>
      <div className="absolute bottom-[25%] right-[15%] w-32 h-32 border border-amber-500/20 rounded-full rotate-12 animate-float-slow"></div>
      <div className="absolute top-[45%] right-[25%] w-20 h-20 border border-emerald-500/20 rounded-lg rotate-45 animate-float animation-delay-2000"></div>
      
      {/* خطوط اتصال */}
      <div className="absolute top-[30%] left-[20%] w-[60%] h-[1px] bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
      <div className="absolute top-[60%] left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
      
      {/* نقاط درخشان */}
      <div className="absolute top-[10%] left-[40%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(56,189,248,0.5)] animate-pulse"></div>
      <div className="absolute top-[70%] left-[25%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(236,72,153,0.5)] animate-pulse animation-delay-700"></div>
      <div className="absolute top-[30%] left-[80%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(6,182,212,0.5)] animate-pulse animation-delay-1500"></div>
      <div className="absolute top-[55%] left-[65%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_rgba(132,204,22,0.5)] animate-pulse animation-delay-2000"></div>
    </div>
  );
};

// هدر داشبورد با افکت‌های شیشه‌ای و انیمیشن
const DashboardHeader: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [locationFilter, setLocationFilter] = useState('all');
  
  return (
    <div className="mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tiffany to-blue-500 animate-gradient">
            داشبورد هوشمند HSE
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            نمای 360 درجه از وضعیت سلامت، ایمنی و محیط زیست سازمان
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
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
      </div>
      
      {/* نشانگر اصلی */}
      {keyPerformanceIndicators.filter(kpi => kpi.isPrimary).map((kpi, index) => (
        <div 
          key={index} 
          className="relative overflow-hidden rounded-xl glass-effect border-2 border-tiffany/30 dark:border-tiffany/20 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg mb-6 group hover:shadow-lg hover:shadow-tiffany/5 transition-all duration-300"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tiffany to-transparent opacity-50"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tiffany/5 rounded-full blur-3xl animate-pulse-slow"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4 h-14 w-14 rounded-xl bg-tiffany/10 flex items-center justify-center">
                {kpi.icon}
              </div>
              <div>
                <h2 className="font-bold text-xl">{kpi.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{kpi.description}</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center">
                <span className="text-4xl font-bold">{kpi.value}</span>
                <span className="text-2xl font-bold text-slate-400 ml-1">/ 100</span>
                
                <div className={`ml-3 flex items-center ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-5 w-5 mr-1" />
                  ) : (
                    <TrendingDown className="h-5 w-5 mr-1" />
                  )}
                  <span className="font-medium">{Math.abs(kpi.change)}%</span>
                </div>
              </div>
              
              <div className="flex mt-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-tiffany-light to-tiffany animate-shimmer bg-[length:200%]" 
                  style={{ width: `${kpi.value}%` }}
                ></div>
              </div>
            </div>
            
            <Button variant="ghost" size="sm" className="px-4 h-10 rounded-lg ml-2 hover:bg-tiffany/10 transition-colors">
              <Info className="h-4 w-4 ml-1" />
              <span className="text-xs">جزئیات بیشتر</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

// کامپوننت کارت‌های شاخص عملکرد
const KeyPerformanceCards: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {keyPerformanceIndicators.filter(kpi => !kpi.isPrimary).map((kpi, index) => (
        <div 
          key={index} 
          className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 p-4 group hover:shadow-lg transition-all duration-300"
        >
          {/* هاله رنگی */}
          <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-${kpi.color}/5 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100`}></div>
          
          {/* خط تزئینی بالای کارت */}
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${kpi.color} to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-500`}></div>
          
          <div className="flex items-center mb-3">
            <div className={`h-10 w-10 rounded-lg bg-${kpi.color}/10 flex items-center justify-center mr-3`}>
              {kpi.icon}
            </div>
            <div>
              <h3 className="font-medium text-sm">{kpi.title}</h3>
            </div>
          </div>
          
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold">{kpi.value}</span>
            
            <div className={`flex items-center ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {kpi.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span className="font-medium text-sm">{Math.abs(kpi.change)}%</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-1">{kpi.details}</p>
          
          <div className="flex mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className={`bg-${kpi.color} group-hover:animate-shimmer group-hover:bg-[length:200%] bg-gradient-to-r transition-all duration-300`} 
              style={{ width: `${kpi.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// کارت نمودار سلامت و ایمنی
const HealthMetricsCard: React.FC = () => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('line');
  
  return (
    <Card className="overflow-hidden group hover:shadow-lg dark:shadow-slate-900/10 transition-all duration-300 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="px-6 py-5 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl font-bold group-hover:text-tiffany transition-colors duration-300">
            <span className="inline-flex items-center">
              <Activity className="mr-2 h-5 w-5 text-tiffany" />
              روند شاخص‌های سلامت و ایمنی
            </span>
          </CardTitle>
          <CardDescription>مقایسه شاخص‌های کارخانه‌های A و B در طول سال</CardDescription>
        </div>
        
        <div className="flex space-x-1 space-x-reverse">
          <Button 
            size="sm" 
            variant="ghost" 
            className={`h-8 w-8 p-0 ${chartType === 'line' ? 'bg-tiffany/10 text-tiffany' : 'text-slate-500'}`}
            onClick={() => setChartType('line')}
          >
            <LineChartIcon className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className={`h-8 w-8 p-0 ${chartType === 'bar' ? 'bg-tiffany/10 text-tiffany' : 'text-slate-500'}`}
            onClick={() => setChartType('bar')}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className={`h-8 w-8 p-0 ${chartType === 'area' ? 'bg-tiffany/10 text-tiffany' : 'text-slate-500'}`}
            onClick={() => setChartType('area')}
          >
            <Activity className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-tiffany/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' && (
              <LineChart
                data={healthMetricsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="کارخانه_A" stroke="#2EC4B6" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line yAxisId="left" type="monotone" dataKey="کارخانه_B" stroke="#FFBB00" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line yAxisId="right" type="monotone" dataKey="امتیاز_ایمنی" stroke="#D72638" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            )}
            
            {chartType === 'bar' && (
              <BarChart
                data={healthMetricsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="کارخانه_A" fill="#2EC4B6" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="کارخانه_B" fill="#FFBB00" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="امتیاز_ایمنی" stroke="#D72638" strokeWidth={2} />
              </BarChart>
            )}
            
            {chartType === 'area' && (
              <AreaChart
                data={healthMetricsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="کارخانه_A" fill="#2EC4B699" stroke="#2EC4B6" strokeWidth={2} />
                <Area type="monotone" dataKey="کارخانه_B" fill="#FFBB0099" stroke="#FFBB00" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="امتیاز_ایمنی" stroke="#D72638" strokeWidth={2} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// کارت توزیع انواع حوادث
const IncidentTypesCard: React.FC = () => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg dark:shadow-slate-900/10 transition-all duration-300 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold group-hover:text-amber-500 transition-colors duration-300">
          <span className="inline-flex items-center">
            <PieChartIcon className="mr-2 h-5 w-5 text-amber-500" />
            توزیع انواع حوادث
          </span>
        </CardTitle>
        <CardDescription>فراوانی انواع حوادث در دوره‌ی گزارش</CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={incidentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="مقدار"
              >
                {incidentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity" />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} مورد`, 'تعداد']} />
              <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// کارت‌های دیگر...
// کارت شاخص‌های زیست‌محیطی
const EnvironmentalMetricsCard: React.FC = () => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg dark:shadow-slate-900/10 transition-all duration-300 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold group-hover:text-emerald-500 transition-colors duration-300">
          <span className="inline-flex items-center">
            <TreePine className="mr-2 h-5 w-5 text-emerald-500" />
            شاخص‌های زیست‌محیطی
          </span>
        </CardTitle>
        <CardDescription>مقایسه شاخص‌های محیط زیستی بین واحدها</CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={environmentalData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="واحد A" dataKey="A" stroke="#2EC4B6" fill="#2EC4B6" fillOpacity={0.5} />
              <Radar name="واحد B" dataKey="B" stroke="#FFBB00" fill="#FFBB00" fillOpacity={0.5} />
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// کارت ارزیابی ریسک‌ها
const RiskAssessmentCard: React.FC = () => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg dark:shadow-slate-900/10 transition-all duration-300 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold group-hover:text-rose-500 transition-colors duration-300">
          <span className="inline-flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-rose-500" />
            ارزیابی ریسک‌ها
          </span>
        </CardTitle>
        <CardDescription>توزیع ریسک‌ها بر اساس سطح اهمیت در طول سال</CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={riskAssessmentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="ریسک‌های پایین" stackId="1" stroke="#2EC4B6" fill="#2EC4B6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="ریسک‌های متوسط" stackId="1" stroke="#FFBB00" fill="#FFBB00" fillOpacity={0.6} />
              <Area type="monotone" dataKey="ریسک‌های بالا" stackId="1" stroke="#D72638" fill="#D72638" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// کارت رتبه‌بندی ایمنی دپارتمان‌ها
const DepartmentSafetyCard: React.FC = () => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg dark:shadow-slate-900/10 transition-all duration-300 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold group-hover:text-violet-500 transition-colors duration-300">
          <span className="inline-flex items-center">
            <Building className="mr-2 h-5 w-5 text-violet-500" />
            رتبه‌بندی ایمنی دپارتمان‌ها
          </span>
        </CardTitle>
        <CardDescription>مقایسه امتیازات ایمنی و درصد تکمیل اقدامات</CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentSafetyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value}%`, 'مقدار']} />
              <Legend />
              <Bar dataKey="امتیاز" name="امتیاز ایمنی" fill="#2EC4B6" radius={[0, 4, 4, 0]} />
              <Bar dataKey="تکمیل" name="درصد تکمیل اقدامات" fill="#BD4291" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// کارت هشدارها و اعلانات
const AlertsCard: React.FC = () => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg dark:shadow-slate-900/10 transition-all duration-300 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold group-hover:text-amber-500 transition-colors duration-300">
          <span className="inline-flex items-center">
            <Bell className="mr-2 h-5 w-5 text-amber-500 animate-pulse-subtle" />
            هشدارها و اعلانات
          </span>
        </CardTitle>
        <CardDescription>آخرین هشدارها و اعلانات سیستم</CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          {healthAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`
                relative overflow-hidden p-4 rounded-lg border border-slate-200 dark:border-slate-700/50 
                ${alert.level === 'high' ? 'bg-rose-50/50 dark:bg-rose-500/10' : 
                  alert.level === 'medium' ? 'bg-amber-50/50 dark:bg-amber-500/10' : 
                  'bg-blue-50/50 dark:bg-blue-500/10'}
                backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md
              `}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 
                ${alert.level === 'high' ? 'bg-rose-500' : 
                  alert.level === 'medium' ? 'bg-amber-500' : 
                  'bg-blue-500'}">
              </div>
              
              <div className="flex">
                <div className={`
                  h-10 w-10 rounded-full flex items-center justify-center mr-3
                  ${alert.level === 'high' ? 'bg-rose-100 text-rose-500 dark:bg-rose-500/20' : 
                    alert.level === 'medium' ? 'bg-amber-100 text-amber-500 dark:bg-amber-500/20' : 
                    'bg-blue-100 text-blue-500 dark:bg-blue-500/20'}
                `}>
                  {alert.icon}
                </div>
                
                <div>
                  <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{alert.description}</p>
                  <div className="mt-2 flex items-center text-xs text-slate-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// کارت فعالیت‌های اخیر
const ActivitiesCard: React.FC = () => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg dark:shadow-slate-900/10 transition-all duration-300 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold group-hover:text-blue-500 transition-colors duration-300">
          <span className="inline-flex items-center">
            <Activity className="mr-2 h-5 w-5 text-blue-500" />
            فعالیت‌های اخیر
          </span>
        </CardTitle>
        <CardDescription>آخرین اقدامات و گزارش‌های ثبت شده</CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start p-3 rounded-lg hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors duration-200 group/item"
            >
              <div className="h-8 w-8 rounded-full flex items-center justify-center mr-3 bg-slate-100 dark:bg-slate-700">
                {activity.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <span className="text-xs text-slate-500 group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 transition-colors duration-200">{activity.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" size="sm" className="w-full mt-4 text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-200">
          <span className="text-xs">مشاهده همه فعالیت‌ها</span>
          <ChevronLeft className="h-4 w-4 mr-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

// کارت رویدادهای پیش رو
const UpcomingEventsCard: React.FC = () => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg dark:shadow-slate-900/10 transition-all duration-300 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold group-hover:text-indigo-500 transition-colors duration-300">
          <span className="inline-flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-indigo-500" />
            رویدادهای پیش رو
          </span>
        </CardTitle>
        <CardDescription>برنامه‌های زمان‌بندی شده در روزهای آینده</CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id} 
              className="relative overflow-hidden p-4 rounded-lg border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 transition-transform duration-200 hover:-translate-y-1 hover:shadow-md group/event"
            >
              <div className="absolute right-0 top-0 h-full w-1.5 bg-indigo-500/40 group-hover/event:bg-indigo-500 transition-colors duration-300"></div>
              
              <div className="flex">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mr-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500">
                  {event.icon}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-xs text-slate-500">
                      <Map className="h-3 w-3 mr-1" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" size="sm" className="w-full mt-4 text-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors duration-200">
          <span className="text-xs">مشاهده تقویم رویدادها</span>
          <ChevronLeft className="h-4 w-4 mr-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

// کارت تخصیص بودجه
const BudgetAllocationCard: React.FC = () => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg dark:shadow-slate-900/10 transition-all duration-300 border-slate-200/50 dark:border-slate-700/50 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold group-hover:text-cyan-500 transition-colors duration-300">
          <span className="inline-flex items-center">
            <ChevronRight className="mr-2 h-5 w-5 text-cyan-500" />
            تخصیص بودجه HSE
          </span>
        </CardTitle>
        <CardDescription>توزیع بودجه مصرف شده در بخش‌های مختلف</CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetAllocationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="مقدار"
              >
                {budgetAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity" />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'سهم از بودجه']} />
              <Legend formatter={(value) => <span className="text-sm">{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// کامپوننت گلاس کارد برای ایجاد افکت شیشه‌ای پیشرفته
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  showControls = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // افکت ظاهر شدن برای پنل تنظیمات
  const settingsVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
  };
  
  const cardVariants = {
    normal: { scale: 1 },
    hovered: { scale: 1.01, transition: { duration: 0.3, ease: "easeOut" } }
  };
  
  return (
    <motion.div 
      className={`
        relative overflow-hidden rounded-xl 
        border border-slate-200/50 dark:border-slate-700/50
        bg-white/80 dark:bg-slate-800/70 backdrop-blur-lg
        hover:shadow-xl hover:shadow-slate-200/30 dark:hover:shadow-slate-900/40
        transition-all duration-300 ease-in-out
        group
        ${isExpanded ? 'fixed inset-4 z-[100]' : ''}
        ${className}
      `}
      variants={cardVariants}
      initial="normal"
      whileHover="hovered"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {isExpanded && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1]" onClick={() => setIsExpanded(false)}></div>
      )}
      
      {showControls && (
        <div className="absolute top-2 right-2 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-1 space-x-reverse scale-100 group-hover:scale-100">
          <motion.button 
            className="h-6 w-6 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-lg hover:bg-tiffany/20 border border-slate-200/50 dark:border-slate-600/50 transition-all duration-200 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Maximize2 className="h-3 w-3 text-slate-600 dark:text-slate-300" />
          </motion.button>
          <motion.button 
            className="h-6 w-6 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-lg hover:bg-amber-500/20 border border-slate-200/50 dark:border-slate-600/50 transition-all duration-200 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-3 w-3 text-slate-600 dark:text-slate-300" />
          </motion.button>
          <motion.button 
            className="h-6 w-6 flex items-center justify-center rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-lg hover:bg-rose-500/20 border border-slate-200/50 dark:border-slate-600/50 transition-all duration-200 shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.97 }}
          >
            <X className="h-3 w-3 text-slate-600 dark:text-slate-300" />
          </motion.button>
        </div>
      )}
      
      {/* پنل تنظیمات */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            className="absolute top-10 right-2 z-50 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-lg shadow-lg p-3 border border-slate-200/70 dark:border-slate-700/70"
            variants={settingsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-medium text-slate-900 dark:text-slate-100">تنظیمات نمودار</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 hover:bg-rose-100 dark:hover:bg-slate-700/80"
                onClick={() => setShowSettings(false)}
              >
                <X className="h-3 w-3 text-slate-500" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 dark:text-slate-400">نوع نمایش</label>
                <div className="grid grid-cols-3 gap-1">
                  <button className="p-1.5 text-xs border border-tiffany/40 bg-tiffany/10 rounded-md">خطی</button>
                  <button className="p-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-md hover:bg-tiffany/10 hover:border-tiffany/40">میله‌ای</button>
                  <button className="p-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-md hover:bg-tiffany/10 hover:border-tiffany/40">ترکیبی</button>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 dark:text-slate-400">بازه زمانی</label>
                <select className="w-full text-xs p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <option>هفته اخیر</option>
                  <option>ماه اخیر</option>
                  <option selected>۳ ماه اخیر</option>
                  <option>سال جاری</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 dark:text-slate-400">اندازه فونت</label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="p-1 text-xs border border-slate-200 dark:border-slate-700 w-7 h-7 rounded-md hover:bg-tiffany/10 hover:border-tiffany/40 flex items-center justify-center">-</button>
                  <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-tiffany rounded-full"></div>
                  </div>
                  <button className="p-1 text-xs border border-slate-200 dark:border-slate-700 w-7 h-7 rounded-md hover:bg-tiffany/10 hover:border-tiffany/40 flex items-center justify-center">+</button>
                </div>
              </div>
              
              <div className="flex justify-end pt-1">
                <Button 
                  size="sm" 
                  className="h-7 text-xs bg-tiffany hover:bg-tiffany-dark text-white rounded-lg shadow-md hover:shadow-tiffany/20"
                >
                  اعمال تغییرات
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* افکت هاله در گوشه‌ها - سه لایه با انیمیشن‌های مختلف */}
      <div className={`absolute -top-20 -right-20 w-60 h-60 bg-gradient-radial from-tiffany/10 to-transparent rounded-full blur-3xl transition-opacity duration-500 animate-pulse-slow ${isHovered ? 'opacity-70' : 'opacity-20'}`}></div>
      <div className={`absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-radial from-amber-500/10 to-transparent rounded-full blur-3xl transition-opacity duration-500 animate-pulse-slow animation-delay-1000 ${isHovered ? 'opacity-70' : 'opacity-20'}`}></div>
      <div className={`absolute top-1/3 left-1/3 w-40 h-40 bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl transition-opacity duration-500 animate-pulse-slow animation-delay-2000 ${isHovered ? 'opacity-60' : 'opacity-0'}`}></div>
      
      {/* نقطه‌های درخشان */}
      <div className={`absolute top-[10%] right-[10%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(46,196,182,0.6)] animate-pulse-slow transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`absolute bottom-[15%] right-[30%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,187,0,0.6)] animate-pulse-slow animation-delay-700 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`absolute top-[20%] left-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(79,70,229,0.6)] animate-pulse-slow animation-delay-1500 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* خط تزئینی بالای کارت */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-tiffany/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* خط تزئینی پایین کارت */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {children}
      
      {/* افکت هاور - بوردر متحرک */}
      <div className="absolute inset-0 border-2 border-dashed border-tiffany/0 group-hover:border-tiffany/20 dark:group-hover:border-tiffany/30 opacity-0 group-hover:opacity-100 pointer-events-none rounded-xl transition-all duration-500"></div>
      
      {/* افکت گرادیانت متحرک در حاشیه (متا‌مورفیک) */}
      <div className="absolute inset-[-1px] rounded-[13px] bg-gradient-to-tr from-tiffany/0 via-tiffany/0 to-amber-500/0 group-hover:from-tiffany/20 group-hover:via-blue-500/20 group-hover:to-amber-500/20 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-gradient z-[-1]"></div>
    </motion.div>
  );
};

// کامپوننت قابل درگ با قابلیت تغییر وضعیت و کاستومایز شدن
interface DraggableSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

const DraggableSection: React.FC<DraggableSectionProps> = ({ 
  children, 
  className = "",
  title
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const dragConstraints = useRef(null);
  
  // افکت ظاهر شدن برای پنل تنظیمات
  const settingsVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
  };
  
  // سایه‌های انیمیشنی برای حالت درگ شدن
  const activeShadow = `0 0 0 2px rgba(46, 196, 182, 0.3),
                        0 4px 6px -1px rgba(0, 0, 0, 0.1),
                        0 2px 4px -1px rgba(0, 0, 0, 0.06),
                        0 8px 24px -4px rgba(46, 196, 182, 0.25)`;
  
  return (
    <motion.div 
      className={`relative transition-all duration-300 ${className} ${
        isCollapsed ? 'h-12' : ''
      } ${
        isDragging ? 'z-50' : 'z-auto'
      } rounded-xl overflow-hidden group`}
      drag={isDragging}
      dragConstraints={dragConstraints}
      whileDrag={{ scale: 1.02, boxShadow: activeShadow }}
      animate={{ 
        scale: isDragging ? 1.02 : 1,
        boxShadow: isDragging ? activeShadow : 'none'
      }}
      draggable={true}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      ref={dragConstraints}
      layout
    >
      {/* هدر قابل کلیک برای کارت */}
      {title && (
        <div 
          className={`
            flex justify-between items-center px-4 py-2 
            bg-gradient-to-r from-slate-50/80 to-white/80 dark:from-slate-800/80 dark:to-slate-700/80
            backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/40
            cursor-pointer
          `}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <h3 className="text-sm font-medium">{title}</h3>
          <button className="h-5 w-5 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
      
      {/* منوی کنترل سمت چپ */}
      <div className="absolute top-2 left-2 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
        <div className="relative">
          <Button 
            size="sm" 
            variant="ghost"
            className="h-6 w-6 p-0 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-lg border border-slate-200/50 dark:border-slate-600/50 shadow-sm hover:shadow-md transition-all duration-200"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreVertical className="h-3 w-3 text-slate-600 dark:text-slate-300" />
          </Button>
          
          <AnimatePresence>
            {showActions && (
              <motion.div 
                className="absolute -left-1 top-7 z-50 p-1.5 bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-lg backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex flex-col space-y-1 min-w-[140px]">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs justify-start px-2 hover:bg-slate-100 dark:hover:bg-slate-700/70 rounded-md"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <Settings className="h-3 w-3 mr-1 text-slate-500" />
                    <span>تنظیمات</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs justify-start px-2 hover:bg-slate-100 dark:hover:bg-slate-700/70 rounded-md"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? (
                      <>
                        <Maximize2 className="h-3 w-3 mr-1 text-slate-500" />
                        <span>بازگرداندن</span>
                      </>
                    ) : (
                      <>
                        <Minimize2 className="h-3 w-3 mr-1 text-slate-500" />
                        <span>کوچک کردن</span>
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs justify-start px-2 hover:bg-slate-100 dark:hover:bg-slate-700/70 rounded-md"
                  >
                    <Copy className="h-3 w-3 mr-1 text-slate-500" />
                    <span>تکثیر</span>
                  </Button>
                  
                  <div className="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs justify-start px-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500 rounded-md"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    <span>حذف</span>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* نشانگر قابلیت درگ */}
      <motion.div 
        className="absolute top-2 right-2 z-30 opacity-0 group-hover:opacity-50 hover:opacity-100 transition-all duration-300 cursor-move"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseDown={() => setIsDragging(true)}
      >
        <div className="h-6 w-6 rounded-md flex items-center justify-center hover:bg-slate-100/70 dark:hover:bg-slate-700/70">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
            <path d="M8 6C9.10457 6 10 5.10457 10 4C10 2.89543 9.10457 2 8 2C6.89543 2 6 2.89543 6 4C6 5.10457 6.89543 6 8 6Z" fill="currentColor"/>
            <path d="M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z" fill="currentColor"/>
            <path d="M10 20C10 21.1046 9.10457 22 8 22C6.89543 22 6 21.1046 6 20C6 18.8954 6.89543 18 8 18C9.10457 18 10 18.8954 10 20Z" fill="currentColor"/>
            <path d="M16 6C17.1046 6 18 5.10457 18 4C18 2.89543 17.1046 2 16 2C14.8954 2 14 2.89543 14 4C14 5.10457 14.8954 6 16 6Z" fill="currentColor"/>
            <path d="M18 12C18 13.1046 17.1046 14 16 14C14.8954 14 14 13.1046 14 12C14 10.8954 14.8954 10 16 10C17.1046 10 18 10.8954 18 12Z" fill="currentColor"/>
            <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" fill="currentColor"/>
          </svg>
        </div>
      </motion.div>
      
      {/* پنل تنظیمات کارت */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            className="absolute top-10 left-2 z-50 w-72 bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg rounded-lg shadow-xl p-3 border border-slate-200/70 dark:border-slate-700/70"
            variants={settingsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-medium text-slate-900 dark:text-slate-100">تنظیمات کارت</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 hover:bg-rose-100 dark:hover:bg-slate-700/80"
                onClick={() => setShowSettings(false)}
              >
                <X className="h-3 w-3 text-slate-500" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">اندازه کارت</label>
                <div className="grid grid-cols-4 gap-1.5">
                  <Button variant="outline" size="sm" className="h-8 text-xs py-0 border-tiffany/40 bg-tiffany/5">کوچک</Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs py-0 bg-transparent">متوسط</Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs py-0 bg-transparent">بزرگ</Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs py-0 bg-transparent">کامل</Button>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">دوره زمانی</label>
                <select className="w-full text-xs p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <option>روزانه</option>
                  <option>هفتگی</option>
                  <option selected>ماهانه</option>
                  <option>سالانه</option>
                </select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300">قالب نمایش</label>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 relative">
                    <input 
                      type="radio" 
                      id="template1" 
                      name="template" 
                      className="peer sr-only" 
                      defaultChecked
                    />
                    <label 
                      htmlFor="template1" 
                      className="flex flex-col items-center justify-center h-16 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md peer-checked:border-tiffany peer-checked:bg-tiffany/5 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200 cursor-pointer"
                    >
                      <BarChart3 className="h-4 w-4 mb-1" />
                      <span className="text-[10px]">میله‌ای</span>
                    </label>
                    <div className="absolute -top-0.5 -right-0.5 opacity-0 peer-checked:opacity-100 transition-opacity">
                      <div className="h-3 w-3 rounded-full bg-tiffany text-white flex items-center justify-center shadow-sm">
                        <Check className="h-2 w-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 relative">
                    <input 
                      type="radio" 
                      id="template2" 
                      name="template" 
                      className="peer sr-only" 
                    />
                    <label 
                      htmlFor="template2" 
                      className="flex flex-col items-center justify-center h-16 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md peer-checked:border-tiffany peer-checked:bg-tiffany/5 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200 cursor-pointer"
                    >
                      <LineChartIcon className="h-4 w-4 mb-1" />
                      <span className="text-[10px]">خطی</span>
                    </label>
                    <div className="absolute -top-0.5 -right-0.5 opacity-0 peer-checked:opacity-100 transition-opacity">
                      <div className="h-3 w-3 rounded-full bg-tiffany text-white flex items-center justify-center shadow-sm">
                        <Check className="h-2 w-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 relative">
                    <input 
                      type="radio" 
                      id="template3" 
                      name="template" 
                      className="peer sr-only" 
                    />
                    <label 
                      htmlFor="template3" 
                      className="flex flex-col items-center justify-center h-16 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md peer-checked:border-tiffany peer-checked:bg-tiffany/5 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200 cursor-pointer"
                    >
                      <PieChartIcon className="h-4 w-4 mb-1" />
                      <span className="text-[10px]">دایره‌ای</span>
                    </label>
                    <div className="absolute -top-0.5 -right-0.5 opacity-0 peer-checked:opacity-100 transition-opacity">
                      <div className="h-3 w-3 rounded-full bg-tiffany text-white flex items-center justify-center shadow-sm">
                        <Check className="h-2 w-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs py-0"
                  onClick={() => setShowSettings(false)}
                >
                  انصراف
                </Button>
                
                <Button 
                  size="sm" 
                  className="h-8 px-3 text-xs bg-tiffany hover:bg-tiffany-dark text-white shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => setShowSettings(false)}
                >
                  اعمال تغییرات
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        animate={{ height: isCollapsed ? 0 : 'auto', opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className={`${isCollapsed ? 'invisible' : 'visible'}`}
      >
        {children}
      </motion.div>
      
      {/* سایه و افکت‌های ویژه */}
      <div className="absolute inset-0 pointer-events-none">
        {/* افکت سایه داخلی */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)]"></div>
        
        {/* نشان‌گر درگ و دراپ */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-dashed border-tiffany/0 group-hover:border-tiffany/30 dark:group-hover:border-tiffany/20 rounded-xl"></div>
        
        {/* افکت درخشش در هنگام درگ */}
        {isDragging && (
          <div className="absolute inset-0 bg-gradient-to-tr from-tiffany/10 via-transparent to-transparent rounded-xl"></div>
        )}
      </div>
    </motion.div>
  );
};

// تنظیمات مد تاریک
const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    // تنظیم حالت تاریک به عنوان پیش‌فرض
    if (document.documentElement.classList.contains('light')) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    document.documentElement.classList.toggle('light');
  };
  
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme} 
      className="h-10 w-10 p-0 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-slate-100/80 dark:hover:bg-slate-700/80 border border-slate-200/50 dark:border-slate-700/50 transition-all"
    >
      {isDarkMode ? (
        <Sun className="h-4 w-4 text-amber-500" />
      ) : (
        <Moon className="h-4 w-4 text-slate-600" />
      )}
      <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-xs bg-black/70 text-white px-2 py-1 rounded">تغییر تم</span>
    </Button>
  );
};

// داشبورد اصلی
export default function HSESmartDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [layout, setLayout] = useState<string[]>([
    'kpi', 'health', 'incidents', 'environmental', 'risks', 'departments', 'alerts', 'activities', 'events', 'budget'
  ]);

  // خودکار فعال شدن حالت تاریک
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen relative pt-6 pb-12 dark:bg-slate-900 dark:text-slate-200">
      {/* پس‌زمینه داینامیک با افکت‌های پیشرفته */}
      <DynamicBackground />
      
      {/* نوار ابزار بالای صفحه - با افکت گلس و انیمیشن باکیفیت */}
      <div className="sticky top-0 z-50 py-2 px-4 backdrop-blur-lg bg-white/60 dark:bg-slate-900/60 border-b border-slate-200/50 dark:border-slate-700/30 mb-4 shadow-sm dark:shadow-slate-950/30 animate-appear">
        <div className="container mx-auto max-w-7xl flex justify-between items-center relative">
          {/* افکت نور محو در پس‌زمینه نوار ابزار */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1/2 h-8 bg-tiffany/10 blur-2xl rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-1/3 h-8 bg-amber-500/10 blur-2xl rounded-full"></div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative group">
              <Button 
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
                  <Settings className="h-3.5 w-3.5 mr-1.5" />
                  {showCustomizePanel ? 'در حال شخصی‌سازی' : 'شخصی‌سازی داشبورد'}
                </div>
              </Button>
              
              {/* پنل شخصی‌سازی داشبورد */}
              {showCustomizePanel && (
                <div className="absolute top-full right-0 mt-2 p-4 w-72 bg-white/95 dark:bg-slate-800/95 rounded-lg shadow-xl backdrop-blur-md border border-slate-200/70 dark:border-slate-700/70 z-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">شخصی‌سازی داشبورد</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 hover:bg-rose-100 dark:hover:bg-slate-700/80"
                      onClick={() => setShowCustomizePanel(false)}
                    >
                      <X className="h-4 w-4 text-slate-500" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-xs font-medium mb-2 text-slate-700 dark:text-slate-300">چیدمان صفحه</h5>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="p-2 text-xs bg-tiffany/10 border border-tiffany/40 rounded-md flex items-center justify-center">
                          <LayoutGrid className="h-3.5 w-3.5 ml-1.5" />
                          <span>گرید</span>
                        </button>
                        <button className="p-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md flex items-center justify-center">
                          <LayoutList className="h-3.5 w-3.5 ml-1.5" />
                          <span>لیست</span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-xs font-medium mb-2 text-slate-700 dark:text-slate-300">ترتیب اجزا</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">موارد را با درگ و دراپ جابجا کنید</p>
                      <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
                        {layout.map((item, index) => (
                          <div 
                            key={item} 
                            className="text-xs py-2 px-3 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 cursor-move flex justify-between items-center"
                          >
                            <span>{
                              item === 'kpi' ? 'شاخص‌های کلیدی عملکرد' :
                              item === 'health' ? 'نمودار سلامت و ایمنی' :
                              item === 'incidents' ? 'توزیع حوادث' :
                              item === 'environmental' ? 'شاخص‌های زیست‌محیطی' :
                              item === 'risks' ? 'ارزیابی ریسک‌ها' :
                              item === 'departments' ? 'رتبه‌بندی واحدها' :
                              item === 'alerts' ? 'هشدارها و اعلانات' :
                              item === 'activities' ? 'فعالیت‌های اخیر' :
                              item === 'events' ? 'رویدادهای پیش رو' :
                              item === 'budget' ? 'تخصیص بودجه' : item
                            }</span>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm">
                                <Eye className="h-3 w-3 text-slate-500" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm">
                                <ArrowUp className="h-3 w-3 text-slate-500" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-5 w-5 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-sm">
                                <ArrowDown className="h-3 w-3 text-slate-500" />
                              </Button>
                            </div>
                          </div>
                        ))}
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
            
            <div className="hidden md:flex items-center space-x-3 space-x-reverse">
              <Button 
                variant="ghost"
                className="py-1.5 px-3 text-xs font-medium bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 rounded-lg shadow-sm"
              >
                <FileText className="h-3.5 w-3.5 ml-1.5 text-slate-500" />
                گزارش‌ها
              </Button>
              <Button 
                variant="ghost"
                className="py-1.5 px-3 text-xs font-medium bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 rounded-lg shadow-sm"
              >
                <Bell className="h-3.5 w-3.5 ml-1.5 text-slate-500" />
                اعلانات
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <ThemeToggle />
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 px-3 rounded-lg bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hidden sm:flex"
            >
              <Download className="h-4 w-4 ml-1.5 text-slate-500" />
              <span className="text-xs">خروجی</span>
            </Button>
            
            <Button 
              size="sm" 
              className="h-10 px-3 rounded-lg bg-tiffany hover:bg-tiffany-dark text-white border-none shadow-md hover:shadow-lg transition-all duration-300"
            >
              <RefreshCcw className="h-4 w-4 ml-1.5" />
              <span className="text-xs">به‌روزرسانی</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-2 lg:px-6 space-y-6 container mx-auto max-w-7xl">
        <DashboardHeader />
        
        {/* تب‌های داشبورد با طراحی گلس و انیمیشن */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="mb-6 p-1 bg-white/60 dark:bg-slate-800/50 backdrop-blur-md rounded-xl border border-slate-200/50 dark:border-slate-700/30 shadow-sm overflow-hidden">
            <TabsTrigger 
              value="overview" 
              className="relative py-2.5 px-4 text-sm rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-tiffany/90 data-[state=active]:to-tiffany-dark/90 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-tiffany/0 group-hover:bg-tiffany/10 group-data-[state=active]:bg-transparent rounded-lg transition-colors duration-300"></span>
              <span className="relative flex items-center">
                <Layers className="h-4 w-4 ml-2" />
                نمای کلی
                <span className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-tiffany-light animate-ping group-data-[state=active]:hidden"></span>
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
              className="relative py-2.5 px-4 text-sm rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-rose-500/90 data-[state=active]:to-rose-600/90 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 group-data-[state=active]:bg-transparent rounded-lg transition-colors duration-300"></span>
              <span className="relative flex items-center">
                <Heart className="h-4 w-4 ml-2" />
                سلامت
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="environmental" 
              className="relative py-2.5 px-4 text-sm rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-emerald-500/90 data-[state=active]:to-emerald-600/90 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 group-data-[state=active]:bg-transparent rounded-lg transition-colors duration-300"></span>
              <span className="relative flex items-center">
                <TreePine className="h-4 w-4 ml-2" />
                محیط زیست
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="training" 
              className="relative py-2.5 px-4 text-sm rounded-lg data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500/90 data-[state=active]:to-blue-600/90 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 group-data-[state=active]:bg-transparent rounded-lg transition-colors duration-300"></span>
              <span className="relative flex items-center">
                <GraduationCap className="h-4 w-4 ml-2" />
                آموزش
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* شاخص‌های کلیدی عملکرد با افکت ویژه گروهی */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <KeyPerformanceCards />
            </motion.div>
            
            {/* لایه اصلی با گرید بندی پویا و پیشرفته */}
            <div className="grid grid-cols-12 auto-rows-min gap-6">
              {/* بخش نمودارهای اصلی - کامپوننت ۲/۳ */}
              <motion.div 
                className="col-span-12 lg:col-span-8" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                <DraggableSection className="h-full">
                  <HealthMetricsCard />
                </DraggableSection>
              </motion.div>
              
              {/* بخش نمودار دایره‌ای - کامپوننت ۱/۳ */}
              <motion.div 
                className="col-span-12 lg:col-span-4" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                <DraggableSection className="h-full">
                  <IncidentTypesCard />
                </DraggableSection>
              </motion.div>
              
              {/* بخش شاخص‌های زیست محیطی - کامپوننت ۱/۳ */}
              <motion.div 
                className="col-span-12 md:col-span-6 lg:col-span-4" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              >
                <DraggableSection className="h-full">
                  <EnvironmentalMetricsCard />
                </DraggableSection>
              </motion.div>
              
              {/* بخش ارزیابی ریسک - کامپوننت ۲/۳ */}
              <motion.div 
                className="col-span-12 md:col-span-6 lg:col-span-8" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              >
                <DraggableSection className="h-full">
                  <RiskAssessmentCard />
                </DraggableSection>
              </motion.div>
              
              {/* بخش رتبه‌بندی دپارتمان‌ها - کامپوننت ۲/۳ */}
              <motion.div 
                className="col-span-12 lg:col-span-8" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              >
                <DraggableSection className="h-full">
                  <DepartmentSafetyCard />
                </DraggableSection>
              </motion.div>
              
              {/* بخش هشدارها - کامپوننت ۱/۳ */}
              <motion.div 
                className="col-span-12 lg:col-span-4" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
              >
                <DraggableSection className="h-full">
                  <AlertsCard />
                </DraggableSection>
              </motion.div>
              
              {/* بخش فعالیت‌های اخیر - ۱/۳ */}
              <motion.div 
                className="col-span-12 md:col-span-6 lg:col-span-4" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
              >
                <DraggableSection className="h-full">
                  <ActivitiesCard />
                </DraggableSection>
              </motion.div>
              
              {/* بخش رویدادهای پیش رو - ۱/۳ */}
              <motion.div 
                className="col-span-12 md:col-span-6 lg:col-span-4" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
              >
                <DraggableSection className="h-full">
                  <UpcomingEventsCard />
                </DraggableSection>
              </motion.div>
              
              {/* بخش تخصیص بودجه - ۱/۳ */}
              <motion.div 
                className="col-span-12 md:col-span-6 lg:col-span-4" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.9 }}
              >
                <DraggableSection className="h-full">
                  <BudgetAllocationCard />
                </DraggableSection>
              </motion.div>
            </div>
          </TabsContent>
          
          <TabsContent value="safety" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DraggableSection className="col-span-1 lg:col-span-1">
                <GlassCard className="h-full">
                  <CardHeader className="px-6 py-5">
                    <CardTitle className="text-xl font-bold">روند بازرسی‌های ایمنی</CardTitle>
                    <CardDescription>مقایسه امتیازات بازرسی با استانداردهای سازمانی</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={safetyAuditData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="امتیاز" stroke="#2EC4B6" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="استاندارد" stroke="#FFBB00" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </GlassCard>
              </DraggableSection>
              
              <DraggableSection className="col-span-1 lg:col-span-1">
                <GlassCard className="h-full">
                  <CardHeader className="px-6 py-5">
                    <CardTitle className="text-xl font-bold">تخصیص بودجه ایمنی</CardTitle>
                    <CardDescription>توزیع بودجه بر اساس حوزه‌های کاری</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={budgetAllocationData}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={70}
                            dataKey="مقدار"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {budgetAllocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'سهم از بودجه']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </GlassCard>
              </DraggableSection>
            </div>
            
            <AlertsCard />
          </TabsContent>
          
          <TabsContent value="health" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <DraggableSection className="col-span-1 lg:col-span-2">
                <GlassCard>
                  <CardHeader className="px-6 py-5">
                    <CardTitle className="text-xl font-bold">شاخص‌های سلامت کارکنان</CardTitle>
                    <CardDescription>مقایسه امتیازات شاخص‌های سلامت با میانگین صنعت</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={healthIndexScoreData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="امتیاز" fill="#2EC4B6" barSize={30} radius={[4, 4, 0, 0]} />
                          <Line type="monotone" dataKey="میانگین" stroke="#FFBB00" strokeWidth={2} dot={{ strokeWidth: 2 }} />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </GlassCard>
              </DraggableSection>
              
              <DraggableSection className="col-span-1">
                <GlassCard>
                  <CardHeader className="px-6 py-5">
                    <CardTitle className="text-xl font-bold">تکمیل آموزش‌های سلامت</CardTitle>
                    <CardDescription>درصد تکمیل آموزش‌ها به تفکیک گروه</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={trainingCompletionData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => [`${value}%`, 'درصد تکمیل']} />
                          <Bar dataKey="امتیاز" fill="#2EC4B6" radius={[4, 4, 0, 0]}>
                            {trainingCompletionData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={
                                  entry.امتیاز > 90 ? '#10B981' : 
                                  entry.امتیاز > 75 ? '#2EC4B6' : 
                                  entry.امتیاز > 60 ? '#FFBB00' : 
                                  '#D72638'
                                } 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </GlassCard>
              </DraggableSection>
            </div>
          </TabsContent>
          
          <TabsContent value="environmental" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DraggableSection>
                <GlassCard>
                  <CardHeader className="px-6 py-5">
                    <CardTitle className="text-xl font-bold">کیفیت هوا، دما و رطوبت</CardTitle>
                    <CardDescription>روند شاخص‌های محیطی در طول سال</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={airQualityData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="AQI" stroke="#D72638" strokeWidth={2} />
                          <Line type="monotone" dataKey="دما" stroke="#FFBB00" strokeWidth={2} />
                          <Line type="monotone" dataKey="رطوبت" stroke="#2EC4B6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </GlassCard>
              </DraggableSection>
              
              <DraggableSection>
                <EnvironmentalMetricsCard />
              </DraggableSection>
            </div>
          </TabsContent>
          
          <TabsContent value="training" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <DraggableSection className="col-span-1 lg:col-span-2">
                <GlassCard>
                  <CardHeader className="px-6 py-5">
                    <CardTitle className="text-xl font-bold">پیشرفت برنامه‌های آموزشی</CardTitle>
                    <CardDescription>درصد تکمیل به تفکیک گروه‌های کاری</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={trainingCompletionData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => [`${value}%`, 'درصد تکمیل']} />
                          <Bar dataKey="امتیاز" radius={[4, 4, 0, 0]}>
                            {trainingCompletionData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={
                                  entry.امتیاز > 90 ? '#10B981' : 
                                  entry.امتیاز > 75 ? '#2EC4B6' : 
                                  entry.امتیاز > 60 ? '#FFBB00' : 
                                  '#D72638'
                                } 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </GlassCard>
              </DraggableSection>
              
              <DraggableSection>
                <UpcomingEventsCard />
              </DraggableSection>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 space-y-1">
          <p>* تمام داده‌ها و آمارها بر اساس ورودی‌های واقعی سازمان تولید شده‌اند</p>
          <p>** گزارش‌های تفصیلی در بخش "گزارش‌ها" در دسترس است</p>
        </div>
      </div>
    </div>
  );
}