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
  Factory
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
  { name: 'آبان', کارخانه_A: 2000, کارخانه_B: 1908, امتیاز_ایمنی: 85 },
  { name: 'آذر', کارخانه_A: 2780, کارخانه_B: 4800, امتیاز_ایمنی: 78 },
  { name: 'دی', کارخانه_A: 1890, کارخانه_B: 3800, امتیاز_ایمنی: 82 },
  { name: 'بهمن', کارخانه_A: 2390, کارخانه_B: 3800, امتیاز_ایمنی: 89 },
  { name: 'اسفند', کارخانه_A: 3490, کارخانه_B: 4300, امتیاز_ایمنی: 93 },
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
    مرداد: 15, شهریور: 18, مهر: 22, آبان: 21,
    آذر: 18, دی: 15, بهمن: 12, اسفند: 10
  },
  {
    name: 'ریسک‌های متوسط', 
    فروردین: 45, اردیبهشت: 42, خرداد: 40, تیر: 35, 
    مرداد: 32, شهریور: 30, مهر: 28, آبان: 25,
    آذر: 30, دی: 31, بهمن: 35, اسفند: 38
  },
  {
    name: 'ریسک‌های پایین', 
    فروردین: 30, اردیبهشت: 35, خرداد: 40, تیر: 49, 
    مرداد: 53, شهریور: 52, مهر: 50, آبان: 54,
    آذر: 52, دی: 54, بهمن: 53, اسفند: 52
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
  { name: 'آبان', AQI: 60, دما: 18, رطوبت: 65 },
  { name: 'آذر', AQI: 45, دما: 12, رطوبت: 70 },
  { name: 'دی', AQI: 40, دما: 8, رطوبت: 75 },
  { name: 'بهمن', AQI: 45, دما: 10, رطوبت: 70 },
  { name: 'اسفند', AQI: 50, دما: 15, رطوبت: 68 },
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
    title: 'شاخص ایمنی', 
    value: 92, 
    change: 8, 
    trend: 'up',
    description: 'بهبود 8% نسبت به دوره قبل',
    icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />
  },
  { 
    title: 'حوادث گزارش شده', 
    value: 14, 
    change: -22, 
    trend: 'down',
    description: 'کاهش 22% نسبت به دوره قبل',
    icon: <AlertCircle className="h-5 w-5 text-amber-500" />
  },
  { 
    title: 'آموزش‌های تکمیل شده', 
    value: 85, 
    change: 12, 
    trend: 'up',
    description: 'بهبود 12% نسبت به دوره قبل',
    icon: <Award className="h-5 w-5 text-cyan-500" />
  },
  { 
    title: 'بازرسی‌های به موقع', 
    value: 96, 
    change: 4, 
    trend: 'up',
    description: 'بهبود 4% نسبت به دوره قبل',
    icon: <Clipboard className="h-5 w-5 text-violet-500" />
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
    description: 'سیستم‌های تهویه بخش تولید به‌روزرسانی شدند',
    time: '3 روز پیش',
    icon: <RefreshCcw className="h-5 w-5 text-amber-500" />
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: 'مانور اضطراری',
    date: '2 فروردین',
    time: '10:00',
    location: 'تمام بخش‌ها',
    type: 'emergency'
  },
  {
    id: 2,
    title: 'آموزش اطفاء حریق',
    date: '8 فروردین',
    time: '14:00',
    location: 'سالن آموزش',
    type: 'training'
  },
  {
    id: 3,
    title: 'ممیزی ISO 45001',
    date: '15 فروردین',
    time: '9:00',
    location: 'اتاق جلسات مرکزی',
    type: 'audit'
  },
  {
    id: 4,
    title: 'کارگاه ارگونومی',
    date: '22 فروردین',
    time: '13:30',
    location: 'سالن کنفرانس',
    type: 'workshop'
  }
];

const taskCompletionData = [
  { name: 'وظیفه 1', تکمیل: 95 },
  { name: 'وظیفه 2', تکمیل: 85 },
  { name: 'وظیفه 3', تکمیل: 100 },
  { name: 'وظیفه 4', تکمیل: 75 },
  { name: 'وظیفه 5', تکمیل: 90 },
  { name: 'وظیفه 6', تکمیل: 80 },
  { name: 'وظیفه 7', تکمیل: 70 },
  { name: 'وظیفه 8', تکمیل: 60 },
];

// نوار اصلی (header) داشبورد با فیلترهای پیشرفته
const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
      <div>
        <h1 className="text-2xl font-bold flex items-center text-slate-800 dark:text-slate-100">
          <Zap className="inline-block ml-2 h-6 w-6 text-tiffany" />
          داشبورد تحلیلی پیشرفته
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          تحلیل کامل شاخص‌های سلامت و ایمنی شغلی در سطح سازمان
        </p>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
        <div className="relative">
          <div className="absolute right-3 top-2.5">
            <CalendarIcon className="h-5 w-5 text-slate-400" />
          </div>
          <Select defaultValue="فروردین - اسفند 1403">
            <SelectTrigger className="h-10 pl-3 pr-10 min-w-[240px] border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="انتخاب بازه زمانی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="فروردین - اسفند 1403">فروردین - اسفند 1403</SelectItem>
              <SelectItem value="فروردین - اسفند 1402">فروردین - اسفند 1402</SelectItem>
              <SelectItem value="فروردین - اسفند 1401">فروردین - اسفند 1401</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline" size="sm" className="h-10 px-3 border-slate-200 dark:border-slate-700">
            <Filter className="h-4 w-4 ml-2" />
            فیلترها
          </Button>
          <Button variant="outline" size="sm" className="h-10 px-3 border-slate-200 dark:border-slate-700">
            <Download className="h-4 w-4 ml-2" />
            خروجی
          </Button>
          <Button variant="outline" size="sm" className="h-10 px-3 border-slate-200 dark:border-slate-700">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// کارت‌های شاخص‌های کلیدی عملکرد
const KeyPerformanceCards: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {keyPerformanceIndicators.map((kpi, index) => (
      <Card key={index} className="glass kpi-card overflow-hidden">
        <CardContent className="p-5">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{kpi.title}</p>
              <h3 className="text-3xl font-bold mt-1">
                {kpi.value}
                {kpi.title.includes('درصد') && '%'}
              </h3>
              <p className={`text-xs font-medium flex items-center mt-1.5 ${
                kpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
              }`}>
                {kpi.trend === 'up' ? (
                  <ArrowUp className="h-3.5 w-3.5 ml-1" />
                ) : (
                  <ArrowDown className="h-3.5 w-3.5 ml-1" />
                )}
                {Math.abs(kpi.change)}%
                <span className="text-slate-400 dark:text-slate-500 mr-1">{kpi.description}</span>
              </p>
            </div>
            <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800">
              {kpi.icon}
            </div>
          </div>
          <div className="mt-4">
            <Progress value={kpi.value} className="h-1.5 bg-slate-100 dark:bg-slate-700" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// کارت نمودار ترکیبی شاخص‌های سلامت
const HealthMetricsCard: React.FC = () => {
  const [chartType, setChartType] = useState('bar');
  return (
    <Card className="col-span-1 lg:col-span-2 overflow-hidden">
      <CardHeader className="px-6 py-5 flex flex-col sm:flex-row justify-between">
        <div>
          <CardTitle className="text-xl font-bold">شاخص‌های سلامت و ایمنی</CardTitle>
          <CardDescription>مقایسه عملکرد واحدها در بازه زمانی</CardDescription>
        </div>
        <div className="flex mt-3 sm:mt-0 space-x-2 space-x-reverse">
          <Button
            size="sm"
            variant={chartType === 'bar' ? "default" : "outline"}
            className={`px-2.5 h-9 ${chartType === 'bar' ? 'bg-tiffany hover:bg-tiffany-dark text-white' : ''}`}
            onClick={() => setChartType('bar')}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={chartType === 'line' ? "default" : "outline"}
            className={`px-2.5 h-9 ${chartType === 'line' ? 'bg-tiffany hover:bg-tiffany-dark text-white' : ''}`}
            onClick={() => setChartType('line')}
          >
            <LineChartIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={chartType === 'area' ? "default" : "outline"}
            className={`px-2.5 h-9 ${chartType === 'area' ? 'bg-tiffany hover:bg-tiffany-dark text-white' : ''}`}
            onClick={() => setChartType('area')}
          >
            <Layers className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {(() => {
              if (chartType === 'bar') {
                return (
                  <BarChart
                    data={healthMetricsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="کارخانه_A" fill="#2EC4B6" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="کارخانه_B" fill="#52C4B9" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="امتیاز_ایمنی" fill="#FFBB00" radius={[4, 4, 0, 0]} />
                  </BarChart>
                );
              } else if (chartType === 'line') {
                return (
                  <LineChart
                    data={healthMetricsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="کارخانه_A" stroke="#2EC4B6" activeDot={{ r: 8 }} />
                    <Line yAxisId="left" type="monotone" dataKey="کارخانه_B" stroke="#52C4B9" />
                    <Line yAxisId="right" type="monotone" dataKey="امتیاز_ایمنی" stroke="#FFBB00" />
                  </LineChart>
                );
              } else {
                return (
                  <AreaChart
                    data={healthMetricsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="کارخانه_A" stroke="#2EC4B6" fill="#2EC4B6" fillOpacity={0.4} />
                    <Area type="monotone" dataKey="کارخانه_B" stroke="#52C4B9" fill="#52C4B9" fillOpacity={0.4} />
                    <Area type="monotone" dataKey="امتیاز_ایمنی" stroke="#FFBB00" fill="#FFBB00" fillOpacity={0.4} />
                  </AreaChart>
                );
              }
            })()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// کارت نمودار پای برای انواع حوادث
const IncidentTypesCard: React.FC = () => (
  <Card className="col-span-1 overflow-hidden">
    <CardHeader className="px-6 py-5">
      <CardTitle className="text-xl font-bold">توزیع انواع حوادث</CardTitle>
      <CardDescription>تفکیک حوادث گزارش شده براساس نوع</CardDescription>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={incidentTypeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              innerRadius={50}
              fill="#8884d8"
              dataKey="مقدار"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {incidentTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} مورد`, 'تعداد']} />
            <Legend verticalAlign="bottom" layout="horizontal" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

// کارت رادار برای شاخص‌های زیست‌محیطی
const EnvironmentalMetricsCard: React.FC = () => (
  <Card className="col-span-1 overflow-hidden">
    <CardHeader className="px-6 py-5">
      <CardTitle className="text-xl font-bold">شاخص‌های زیست‌محیطی</CardTitle>
      <CardDescription>مقایسه عملکرد شاخص‌های زیست‌محیطی دو واحد</CardDescription>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius={130} data={environmentalData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="واحد A" dataKey="A" stroke="#2EC4B6" fill="#2EC4B6" fillOpacity={0.3} />
            <Radar name="واحد B" dataKey="B" stroke="#FFBB00" fill="#FFBB00" fillOpacity={0.3} />
            <Legend />
            <Tooltip formatter={(value) => [`${value}`, 'امتیاز']} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

// کارت نمودار ناحیه‌ای برای ارزیابی ریسک‌ها
const RiskAssessmentCard: React.FC = () => (
  <Card className="col-span-1 lg:col-span-2 overflow-hidden">
    <CardHeader className="px-6 py-5">
      <CardTitle className="text-xl font-bold">ارزیابی ریسک‌ها</CardTitle>
      <CardDescription>روند تغییرات سطوح ریسک در طول سال</CardDescription>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={riskAssessmentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Area type="monotone" dataKey="ریسک‌های بالا" stroke="#D72638" fill="#D72638" stackId="1" fillOpacity={0.5} />
            <Area type="monotone" dataKey="ریسک‌های متوسط" stroke="#FFBB00" fill="#FFBB00" stackId="1" fillOpacity={0.5} />
            <Area type="monotone" dataKey="ریسک‌های پایین" stroke="#2EC4B6" fill="#2EC4B6" stackId="1" fillOpacity={0.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

// کارت نمودار رتبه‌بندی ایمنی واحدها
const DepartmentSafetyCard: React.FC = () => (
  <Card className="col-span-1 lg:col-span-2 overflow-hidden">
    <CardHeader className="px-6 py-5">
      <CardTitle className="text-xl font-bold">رتبه‌بندی ایمنی واحدها</CardTitle>
      <CardDescription>مقایسه امتیاز ایمنی و درصد تکمیل اقدامات</CardDescription>
    </CardHeader>
    <CardContent className="px-6 pb-6">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={departmentSafetyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip formatter={(value) => [`${value}`, 'امتیاز']} />
            <Legend />
            <Bar dataKey="امتیاز" fill="#2EC4B6" name="امتیاز ایمنی" radius={[0, 4, 4, 0]} />
            <Bar dataKey="تکمیل" fill="#FFBB00" name="درصد تکمیل اقدامات" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

// کارت هشدارها و اعلانات مهم
const AlertsCard: React.FC = () => (
  <Card className="col-span-1 overflow-hidden">
    <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-bold">هشدارها و اعلانات</CardTitle>
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
          {healthAlerts.length} مورد
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="max-h-[420px] overflow-y-auto">
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {healthAlerts.map((alert) => (
            <li key={alert.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex">
                <div className={`p-2 rounded-full mr-3 ${
                  alert.level === 'high' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                  alert.level === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                }`}>
                  {alert.icon}
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">{alert.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{alert.description}</p>
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 block">{alert.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
    <CardFooter className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
      <Button variant="ghost" size="sm" className="text-tiffany hover:text-tiffany-dark dark:text-tiffany-light dark:hover:text-tiffany">
        مشاهده همه هشدارها
      </Button>
      <Button variant="ghost" size="sm">
        <CheckCircle className="h-4 w-4 ml-1" />
        خواندن همه
      </Button>
    </CardFooter>
  </Card>
);

// کارت فعالیت‌های اخیر
const RecentActivitiesCard: React.FC = () => (
  <Card className="col-span-1 overflow-hidden">
    <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
      <CardTitle className="text-xl font-bold">فعالیت‌های اخیر</CardTitle>
    </CardHeader>
    <CardContent className="p-0">
      <div className="max-h-[420px] overflow-y-auto">
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex">
                <div className="p-2 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 mr-3">
                  {activity.icon}
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">{activity.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{activity.description}</p>
                  <span className="text-xs text-slate-400 dark:text-slate-500 mt-2 block">{activity.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
    <CardFooter className="px-4 py-3 border-t border-slate-100 dark:border-slate-800">
      <Button variant="ghost" size="sm" className="text-tiffany hover:text-tiffany-dark dark:text-tiffany-light dark:hover:text-tiffany w-full">
        مشاهده همه فعالیت‌ها
      </Button>
    </CardFooter>
  </Card>
);

// کارت رویدادهای آینده
const UpcomingEventsCard: React.FC = () => (
  <Card className="col-span-1 overflow-hidden">
    <CardHeader className="px-6 py-5 border-b border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-center">
        <CardTitle className="text-xl font-bold">رویدادهای آینده</CardTitle>
        <div className="flex space-x-1 space-x-reverse">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="max-h-[290px] overflow-y-auto">
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {upcomingEvents.map((event) => (
            <li key={event.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-start">
                <div className={`h-12 w-12 flex flex-col items-center justify-center rounded-lg mr-3 ${
                  event.type === 'emergency' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                  event.type === 'training' ? 'bg-tiffany-100 text-tiffany-600 dark:bg-tiffany-900/30 dark:text-tiffany-400' :
                  event.type === 'audit' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                }`}>
                  <span className="text-xs font-medium">{event.date.split(' ')[0]}</span>
                  <span className="text-lg font-bold">{event.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">{event.title}</h4>
                  <div className="flex items-center mt-1 space-x-2 space-x-reverse">
                    <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
                      <Clock className="h-3 w-3 ml-1" />
                      {event.time}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
                      <Map className="h-3 w-3 ml-1" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </CardContent>
    <CardFooter className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
      <Button variant="ghost" size="sm" className="text-tiffany hover:text-tiffany-dark dark:text-tiffany-light dark:hover:text-tiffany">
        مشاهده تقویم کامل
      </Button>
      <Button variant="outline" size="sm">
        <Plus className="h-4 w-4 ml-1" />
        افزودن رویداد
      </Button>
    </CardFooter>
  </Card>
);

// داشبورد اصلی
export default function AdvancedAnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="px-4 py-6 lg:px-6 space-y-6">
      <DashboardHeader />
      
      {/* تب‌های داشبورد */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-2">
        <TabsList className="bg-slate-100 dark:bg-slate-800/60 p-1 mb-6">
          <TabsTrigger value="overview" className="py-2.5 px-4 text-sm">
            <Layers className="h-4 w-4 ml-2" />
            نمای کلی
          </TabsTrigger>
          <TabsTrigger value="safety" className="py-2.5 px-4 text-sm">
            <ShieldCheck className="h-4 w-4 ml-2" />
            ایمنی
          </TabsTrigger>
          <TabsTrigger value="health" className="py-2.5 px-4 text-sm">
            <Heart className="h-4 w-4 ml-2" />
            سلامت
          </TabsTrigger>
          <TabsTrigger value="environment" className="py-2.5 px-4 text-sm">
            <TreePine className="h-4 w-4 ml-2" />
            محیط زیست
          </TabsTrigger>
          <TabsTrigger value="training" className="py-2.5 px-4 text-sm">
            <Clipboard className="h-4 w-4 ml-2" />
            آموزش
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <KeyPerformanceCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HealthMetricsCard />
            <IncidentTypesCard />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RiskAssessmentCard />
            <RecentActivitiesCard />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DepartmentSafetyCard />
            <UpcomingEventsCard />
          </div>
        </TabsContent>
        
        <TabsContent value="safety" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 overflow-hidden">
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
            </Card>
            
            <Card className="col-span-1 overflow-hidden">
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
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 overflow-hidden">
              <CardHeader className="px-6 py-5">
                <CardTitle className="text-xl font-bold">پیشرفت وظایف ایمنی</CardTitle>
                <CardDescription>درصد تکمیل وظایف کلیدی ایمنی</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={taskCompletionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={70} />
                      <Tooltip formatter={(value) => [`${value}%`, 'درصد تکمیل']} />
                      <Bar dataKey="تکمیل" fill="#2EC4B6" radius={[0, 4, 4, 0]}>
                        {taskCompletionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.تکمیل > 90 ? '#10B981' : entry.تکمیل > 70 ? '#2EC4B6' : '#FFBB00'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 lg:col-span-2 overflow-hidden">
              <CardHeader className="px-6 py-5">
                <CardTitle className="text-xl font-bold">انطباق با استانداردها به تفکیک واحد</CardTitle>
                <CardDescription>نسبت انطباق با استانداردهای ایمنی</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="20%" 
                      outerRadius="90%" 
                      barSize={20} 
                      data={complianceByLocationData}
                    >
                      <RadialBar
                        label={{ position: 'insideStart', fill: '#666', fontSize: 12 }}
                        background
                        dataKey="نسبت"
                        name="name"
                        fill="#2EC4B6"
                      />
                      <Legend 
                        iconSize={10} 
                        layout="vertical" 
                        verticalAlign="bottom"
                        align="center"
                        wrapperStyle={{ paddingTop: '20px' }}
                      />
                      <Tooltip formatter={(value: number) => [`${(value * 100).toFixed(0)}%`, 'نسبت انطباق']} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <AlertsCard />
        </TabsContent>
        
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 overflow-hidden">
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
            </Card>
            
            <Card className="col-span-1 overflow-hidden">
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
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="environment" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="col-span-1 overflow-hidden">
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
            </Card>
            
            <Card className="col-span-1 overflow-hidden">
              <CardHeader className="px-6 py-5">
                <CardTitle className="text-xl font-bold">شاخص‌های زیست‌محیطی</CardTitle>
                <CardDescription>مقایسه عملکرد شاخص‌های زیست‌محیطی</CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius={130} data={environmentalData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="واحد A" dataKey="A" stroke="#2EC4B6" fill="#2EC4B6" fillOpacity={0.3} />
                      <Radar name="واحد B" dataKey="B" stroke="#FFBB00" fill="#FFBB00" fillOpacity={0.3} />
                      <Legend />
                      <Tooltip formatter={(value: number) => [`${value}`, 'امتیاز']} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="training" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 overflow-hidden">
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
            </Card>
            
            <UpcomingEventsCard />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center text-sm text-slate-500 dark:text-slate-400 space-y-1">
        <p>* تمام داده‌ها و آمارها بر اساس ورودی‌های واقعی سازمان تولید شده‌اند</p>
        <p>** گزارش‌های تفصیلی در بخش "گزارش‌ها" در دسترس است</p>
      </div>
    </div>
  );
}