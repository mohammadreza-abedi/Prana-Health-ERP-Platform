import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import {
  BarChart3,
  Activity,
  Award,
  AlertCircle,
  Clock,
  CheckCircle,
  FileText,
  ShieldCheck,
  TreePine,
  Wind,
  Sun,
  Calendar,
  Users,
  Heart,
  Factory,
  Target,
  AlertTriangle,
  Eye,
  TrendingUp,
  Battery,
  HardHat,
  Droplets,
  ThumbsUp,
  Filter,
  Download,
  Printer,
  SquarePen,
  Zap,
  Layers,
  LayoutGrid,
  Settings,
  ChevronDown,
  Flame,
  BookOpen,
  CircleOff,
  AlertOctagon,
  Clipboard
} from 'lucide-react';

// داده‌های نمودارها
const healthMetricsData = [
  { name: 'فروردین', کارخانه_A: 4000, کارخانه_B: 2400, امتیاز_ایمنی: 90 },
  { name: 'اردیبهشت', کارخانه_A: 3000, کارخانه_B: 1398, امتیاز_ایمنی: 82 },
  { name: 'خرداد', کارخانه_A: 2000, کارخانه_B: 9800, امتیاز_ایمنی: 75 },
  { name: 'تیر', کارخانه_A: 2780, کارخانه_B: 3908, امتیاز_ایمنی: 88 },
  { name: 'مرداد', کارخانه_A: 1890, کارخانه_B: 4800, امتیاز_ایمنی: 94 },
  { name: 'شهریور', کارخانه_A: 2390, کارخانه_B: 3800, امتیاز_ایمنی: 98 },
];

const incidentTypeData = [
  { name: 'لغزش و سقوط', مقدار: 35 },
  { name: 'برخورد با اشیاء', مقدار: 22 },
  { name: 'حوادث برقی', مقدار: 15 },
  { name: 'مواد شیمیایی', مقدار: 10 },
  { name: 'بلند کردن نادرست', مقدار: 18 },
];

const environmentalDataMonthly = [
  { name: 'فروردین', انتشار_کربن: 240, مصرف_آب: 180, پسماند: 120 },
  { name: 'اردیبهشت', انتشار_کربن: 210, مصرف_آب: 190, پسماند: 110 },
  { name: 'خرداد', انتشار_کربن: 220, مصرف_آب: 170, پسماند: 105 },
  { name: 'تیر', انتشار_کربن: 200, مصرف_آب: 160, پسماند: 90 },
  { name: 'مرداد', انتشار_کربن: 180, مصرف_آب: 150, پسماند: 85 },
  { name: 'شهریور', انتشار_کربن: 160, مصرف_آب: 140, پسماند: 75 },
];

const complianceData = [
  { name: 'استانداردهای ایمنی', وضعیت_فعلی: 92, هدف: 95 },
  { name: 'قوانین محیط زیستی', وضعیت_فعلی: 87, هدف: 90 },
  { name: 'الزامات بهداشتی', وضعیت_فعلی: 94, هدف: 95 },
  { name: 'مدیریت بحران', وضعیت_فعلی: 76, هدف: 85 },
  { name: 'ایمنی تجهیزات', وضعیت_فعلی: 89, هدف: 90 },
];

const safetyRadarData = [
  { subject: 'ایمنی فردی', A: 85, fullMark: 100 },
  { subject: 'ایمنی فرآیند', A: 79, fullMark: 100 },
  { subject: 'آموزش', A: 92, fullMark: 100 },
  { subject: 'تجهیزات', A: 87, fullMark: 100 },
  { subject: 'مدیریت ریسک', A: 76, fullMark: 100 },
  { subject: 'فرهنگ ایمنی', A: 82, fullMark: 100 },
];

const auditResults = [
  { عنوان: 'شناسایی خطرات', تکمیل_شده: 24, مجموع: 25, درصد: 96, وضعیت: 'تکمیل' },
  { عنوان: 'آموزش ایمنی', تکمیل_شده: 18, مجموع: 20, درصد: 90, وضعیت: 'در حال انجام' },
  { عنوان: 'مدیریت پیمانکاران', تکمیل_شده: 12, مجموع: 15, درصد: 80, وضعیت: 'در حال انجام' },
  { عنوان: 'تجهیزات ایمنی', تکمیل_شده: 30, مجموع: 30, درصد: 100, وضعیت: 'تکمیل' },
  { عنوان: 'آمادگی اضطراری', تکمیل_شده: 22, مجموع: 25, درصد: 88, وضعیت: 'در حال انجام' },
];

const employeeHealthData = [
  { name: 'فروردین', میانگین_ضربان_قلب: 78, فشار_خون: 125, استرس: 65 },
  { name: 'اردیبهشت', میانگین_ضربان_قلب: 76, فشار_خون: 123, استرس: 68 },
  { name: 'خرداد', میانگین_ضربان_قلب: 77, فشار_خون: 124, استرس: 72 },
  { name: 'تیر', میانگین_ضربان_قلب: 79, فشار_خون: 126, استرس: 75 },
  { name: 'مرداد', میانگین_ضربان_قلب: 75, فشار_خون: 122, استرس: 63 },
  { name: 'شهریور', میانگین_ضربان_قلب: 74, فشار_خون: 120, استرس: 60 },
];

const COLORS = ['#2EC4B6', '#52C4B9', '#FFBB00', '#FF9500', '#D72638'];

const departmentSafetyScores = [
  {
    department: 'تولید',
    score: 85,
    trend: 'up',
    issues: 3,
    incidents: 1,
    lastAudit: '1402/03/15',
    manager: 'علی محمدی',
    color: 'emerald'
  },
  {
    department: 'انبار',
    score: 78,
    trend: 'down',
    issues: 5,
    incidents: 2,
    lastAudit: '1402/02/20',
    manager: 'سارا رضایی',
    color: 'amber'
  },
  {
    department: 'مهندسی',
    score: 92,
    trend: 'up',
    issues: 1,
    incidents: 0,
    lastAudit: '1402/03/05',
    manager: 'محمد حسینی',
    color: 'blue'
  },
  {
    department: 'آزمایشگاه',
    score: 88,
    trend: 'up',
    issues: 2,
    incidents: 0,
    lastAudit: '1402/03/10',
    manager: 'مریم کریمی',
    color: 'violet'
  }
];

export default function HSESmartDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("month");
  const [department, setDepartment] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="p-4 lg:p-6 max-w-[1500px] mx-auto">
      {/* هدر حرفه‌ای با فیلترها و اقدامات */}
      <header className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2 flex items-center">
              <ShieldCheck className="h-6 w-6 ml-2 text-tiffany" />
              داشبورد هوشمند HSE
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              نمای 360 درجه از وضعیت سلامت، ایمنی و محیط زیست سازمان
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1 h-9">
              <Download className="h-4 w-4 ml-1" />
              <span>دانلود گزارش</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 h-9">
              <Printer className="h-4 w-4 ml-1" />
              <span>چاپ</span>
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-1 h-9 bg-gradient-to-r from-tiffany to-tiffany-dark text-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 ml-1" />
              <span>فیلترها</span>
              <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
        
        {/* بخش فیلترهای پیشرفته */}
        {showFilters && (
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 mb-4 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block text-slate-600 dark:text-slate-300">بازه زمانی</label>
                <select 
                  className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="day">روزانه</option>
                  <option value="week">هفتگی</option>
                  <option value="month">ماهانه</option>
                  <option value="quarter">فصلی</option>
                  <option value="year">سالانه</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block text-slate-600 dark:text-slate-300">دپارتمان</label>
                <select 
                  className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="all">همه دپارتمان‌ها</option>
                  <option value="production">تولید</option>
                  <option value="warehouse">انبار</option>
                  <option value="engineering">مهندسی</option>
                  <option value="laboratory">آزمایشگاه</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block text-slate-600 dark:text-slate-300">محل</label>
                <select className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm">
                  <option value="all">تمام مکان‌ها</option>
                  <option value="site1">کارخانه 1</option>
                  <option value="site2">کارخانه 2</option>
                  <option value="headquarters">دفتر مرکزی</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full bg-tiffany hover:bg-tiffany-dark">اعمال فیلتر</Button>
              </div>
            </div>
          </div>
        )}
        
        {/* تب‌های اصلی داشبورد */}
        <Tabs
          defaultValue="dashboard"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl mb-6 border border-slate-200 dark:border-slate-700/50 flex flex-wrap">
            <TabsTrigger 
              value="dashboard" 
              className="rounded-lg px-4 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm flex items-center gap-1.5"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">داشبورد کلی</span>
              <span className="sm:hidden">کلی</span>
            </TabsTrigger>
            <TabsTrigger 
              value="safety" 
              className="rounded-lg px-4 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm flex items-center gap-1.5"
            >
              <HardHat className="h-4 w-4" />
              <span className="hidden sm:inline">مدیریت ایمنی</span>
              <span className="sm:hidden">ایمنی</span>
            </TabsTrigger>
            <TabsTrigger 
              value="health" 
              className="rounded-lg px-4 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm flex items-center gap-1.5"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">سلامت کارکنان</span>
              <span className="sm:hidden">سلامت</span>
            </TabsTrigger>
            <TabsTrigger 
              value="environment" 
              className="rounded-lg px-4 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm flex items-center gap-1.5"
            >
              <TreePine className="h-4 w-4" />
              <span className="hidden sm:inline">شاخص‌های زیست‌محیطی</span>
              <span className="sm:hidden">محیط زیست</span>
            </TabsTrigger>
            <TabsTrigger 
              value="compliance" 
              className="rounded-lg px-4 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm flex items-center gap-1.5"
            >
              <Clipboard className="h-4 w-4" />
              <span className="hidden sm:inline">انطباق و ممیزی</span>
              <span className="sm:hidden">ممیزی</span>
            </TabsTrigger>
          </TabsList>

          {/* محتوای تب داشبورد کلی */}
          <TabsContent value="dashboard" className="space-y-6 animate-in fade-in duration-300">
            {/* شاخص اصلی HSE - ارتقا یافته */}
            <div className="bg-gradient-to-r from-tiffany-50 via-emerald-50 to-tiffany-50 dark:from-tiffany-950/30 dark:via-emerald-950/30 dark:to-tiffany-950/30 p-5 rounded-xl border border-tiffany-100 dark:border-tiffany-900/50 mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="md:px-6 md:border-l border-tiffany-200 dark:border-tiffany-800/50">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-tiffany/10 rounded-xl">
                      <ShieldCheck className="h-8 w-8 text-tiffany" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">شاخص HSE سازمانی</h2>
                      <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="h-4 w-4" />
                        <span>بهبود 12% نسبت به دوره قبل</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-end justify-center md:justify-start">
                    <span className="text-4xl md:text-5xl font-bold text-tiffany">94</span>
                    <span className="text-xl md:text-2xl text-slate-400 ml-2 mb-1">/100</span>
                    <span className="ml-4 px-2 py-1 text-sm bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-md flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      +12%
                    </span>
                  </div>
                  
                  <div className="mt-3 w-full bg-white dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-tiffany to-emerald-500 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* شاخص‌های کلیدی عملکرد - ارتقا یافته با افکت‌های بهتر */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border-amber-200 dark:border-amber-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 mr-3 text-amber-500">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">حوادث بدون توقف کار</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">5</p>
                    <div className="flex items-center text-rose-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5 rotate-180" />
                      35%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">کاهش 35% نسبت به دوره قبل</p>
                  <Progress value={5} max={20} className="h-1.5 mt-2"/>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <p className="text-xs text-slate-500">2 مورد کمتر از ماه گذشته</p>
                </CardFooter>
              </Card>
              
              <Card className="border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 mr-3 text-blue-500">
                      <Clock className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">روزهای بدون حادثه</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">183</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                      15%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">6 ماه بدون حادثه اصلی</p>
                  <Progress value={183} max={365} className="h-1.5 mt-2 bg-blue-100 dark:bg-blue-950/30">
                    <div className="h-full bg-blue-500"></div>
                  </Progress>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <p className="text-xs text-slate-500">رکورد جدید برای واحد تولید</p>
                </CardFooter>
              </Card>
              
              <Card className="border-tiffany-200 dark:border-tiffany-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-tiffany-50 dark:bg-tiffany-900/20 mr-3 text-tiffany">
                      <TreePine className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">شاخص زیست محیطی</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">89</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                      8%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">بهبود 8% نسبت به دوره قبل</p>
                  <Progress value={89} max={100} className="h-1.5 mt-2 bg-tiffany-100 dark:bg-tiffany-950/30">
                    <div className="h-full bg-tiffany"></div>
                  </Progress>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <p className="text-xs text-slate-500">کاهش کربن در تمام واحدها</p>
                </CardFooter>
              </Card>
              
              <Card className="border-violet-200 dark:border-violet-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-900/20 mr-3 text-violet-500">
                      <Award className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">تکمیل آموزش‌های HSE</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">92</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                      7%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">بهبود 7% نسبت به دوره قبل</p>
                  <Progress value={92} max={100} className="h-1.5 mt-2 bg-violet-100 dark:bg-violet-950/30">
                    <div className="h-full bg-violet-500"></div>
                  </Progress>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <p className="text-xs text-slate-500">24 دوره آموزشی تکمیل شده</p>
                </CardFooter>
              </Card>
            </div>
            
            {/* نمودارها - ارتقا یافته */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-slate-200 dark:border-slate-700/70">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5 text-blue-500" />
                        روند شاخص‌های ایمنی
                      </CardTitle>
                      <CardDescription>مقایسه شاخص‌های ایمنی در ماه‌های اخیر</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50">
                      ماهانه
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pl-0 pr-4">
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={healthMetricsData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 11 }}
                          tickLine={false}
                          axisLine={{ opacity: 0.2 }}
                        />
                        <YAxis 
                          tick={{ fontSize: 11 }}
                          tickLine={false}
                          axisLine={{ opacity: 0.2 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(0, 0, 0, 0.05)'
                          }} 
                        />
                        <Legend iconType="circle" />
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
                <CardFooter className="pt-0 flex justify-between items-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">آخرین بروزرسانی: امروز، 08:45</p>
                  <Button variant="link" size="sm" className="h-7 text-xs text-tiffany p-0">
                    مشاهده جزئیات بیشتر
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-slate-200 dark:border-slate-700/70">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-rose-500" />
                        توزیع حوادث
                      </CardTitle>
                      <CardDescription>نوع حوادث در دوره جاری</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8">
                      <BarChart3 className="h-4 w-4 ml-1.5" />
                      <span>تغییر نمودار</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incidentTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          innerRadius={40}
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
                            border: '1px solid rgba(0, 0, 0, 0.05)'
                          }} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {incidentTypeData.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <span 
                          className="inline-block w-3 h-3 rounded-sm mr-1.5"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></span>
                        <span className="text-xs">{item.name}: {item.مقدار}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* جدول دپارتمان‌ها */}
            <div className="mb-6">
              <Card className="shadow-sm border-slate-200 dark:border-slate-700/70">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-indigo-500" />
                      وضعیت HSE دپارتمان‌ها
                    </CardTitle>
                    <Button variant="outline" size="sm" className="h-8">
                      <Eye className="h-4 w-4 ml-1.5" />
                      <span>نمایش همه</span>
                    </Button>
                  </div>
                  <CardDescription>
                    مقایسه شاخص‌های HSE در دپارتمان‌های مختلف سازمان
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-right py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-300">دپارتمان</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-300">امتیاز HSE</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-300">روند</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-300">مسائل باز</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-300">حوادث اخیر</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-300">آخرین ممیزی</th>
                          <th className="text-center py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-300">مدیر مسئول</th>
                        </tr>
                      </thead>
                      <tbody>
                        {departmentSafetyScores.map((dept, index) => (
                          <tr 
                            key={index} 
                            className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="py-3 px-4 text-sm">
                              <div className="flex items-center">
                                <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-${dept.color}-500`}></div>
                                <span className="font-medium">{dept.department}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center">
                                <span className="text-sm font-medium">{dept.score}</span>
                                <Progress value={dept.score} max={100} className="w-16 h-1 ml-2" />
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${dept.trend === 'up' ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30' : 'bg-rose-50 text-rose-500 dark:bg-rose-950/30'}`}>
                                <TrendingUp className={`h-4 w-4 ${dept.trend === 'down' && 'rotate-180'}`} />
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className={`${dept.issues > 3 ? 'border-amber-200 text-amber-600 bg-amber-50 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-400' : 'border-slate-200 text-slate-600 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}>
                                {dept.issues}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="outline" className={`${dept.incidents > 0 ? 'border-rose-200 text-rose-600 bg-rose-50 dark:border-rose-800/50 dark:bg-rose-950/30 dark:text-rose-400' : 'border-emerald-200 text-emerald-600 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-400'}`}>
                                {dept.incidents}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-center text-sm text-slate-600 dark:text-slate-400">
                              {dept.lastAudit}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <div className="flex items-center justify-center">
                                <Avatar className="h-7 w-7 ml-2">
                                  <AvatarFallback className="text-xs bg-slate-100 dark:bg-slate-800">
                                    {dept.manager.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{dept.manager}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* اعلانات و هشدارها */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-amber-200 dark:border-amber-800/30">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      هشدارهای سلامت
                    </CardTitle>
                    <Badge className="bg-amber-500">4 مورد</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-64 overflow-y-auto">
                    <div className="border-r-4 border-r-rose-500 border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <h4 className="font-medium">هشدار گرمازدگی</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">پیش‌بینی دمای بالای 38 درجه در روز آینده</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        2 ساعت پیش
                      </p>
                    </div>
                    <div className="border-r-4 border-r-amber-500 border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <h4 className="font-medium">شاخص آلودگی هوا</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">شاخص کیفیت هوا در محدوده هشدار قرار دارد</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        4 ساعت پیش
                      </p>
                    </div>
                    <div className="border-r-4 border-r-blue-500 border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <h4 className="font-medium">یادآوری معاینات دوره‌ای</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">معاینات دوره‌ای کارکنان بخش تولید</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        1 روز پیش
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="link" size="sm" className="h-7 text-xs text-amber-600 dark:text-amber-400 p-0 mx-auto">
                    مشاهده همه هشدارها
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-emerald-200 dark:border-emerald-800/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    فعالیت‌های اخیر
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-64 overflow-y-auto">
                    <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <h4 className="font-medium">بازرسی دوره‌ای</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">بازرسی دوره‌ای بخش تولید انجام شد</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        30 دقیقه پیش
                      </p>
                    </div>
                    <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <h4 className="font-medium">گزارش حادثه</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">یک حادثه جزئی در بخش انبار گزارش شد</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        2 ساعت پیش
                      </p>
                    </div>
                    <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <h4 className="font-medium">آموزش ایمنی</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">جلسه آموزش ایمنی برای کارکنان جدید برگزار شد</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        1 روز پیش
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="link" size="sm" className="h-7 text-xs text-emerald-600 dark:text-emerald-400 p-0 mx-auto">
                    مشاهده همه فعالیت‌ها
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-blue-200 dark:border-blue-800/30">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    رویدادهای آینده
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-64 overflow-y-auto">
                    <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <h4 className="font-medium">آموزش اطفاء حریق</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">آموزش عملی اطفاء حریق برای گروه‌های A و B</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-slate-400 flex items-center">
                          <Clock className="h-3 w-3 ml-1" />
                          فردا، 10:00
                        </p>
                        <p className="text-xs text-slate-400 flex items-center">
                          <Factory className="h-3 w-3 ml-1" />
                          محوطه آموزشی شرقی
                        </p>
                      </div>
                    </div>
                    <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <h4 className="font-medium">معاینات دوره‌ای</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">معاینات دوره‌ای کارکنان بخش تولید</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-slate-400 flex items-center">
                          <Clock className="h-3 w-3 ml-1" />
                          پنج‌شنبه، تمام روز
                        </p>
                        <p className="text-xs text-slate-400 flex items-center">
                          <Factory className="h-3 w-3 ml-1" />
                          مرکز بهداشت
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="link" size="sm" className="h-7 text-xs text-blue-600 dark:text-blue-400 p-0 mx-auto">
                    مشاهده تقویم رویدادها
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* محتوای تب مدیریت ایمنی */}
          <TabsContent value="safety" className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border-rose-200 dark:border-rose-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/20 mr-3 text-rose-500">
                      <Flame className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">آتش‌سوزی‌های گزارش شده</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">0</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                      100%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">بدون آتش‌سوزی در 12 ماه گذشته</p>
                  <Progress value={0} max={10} className="h-1.5 mt-2 bg-rose-100 dark:bg-rose-950/30" />
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 dark:border-amber-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 mr-3 text-amber-500">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">شبه حوادث</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">14</p>
                    <div className="flex items-center text-rose-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                      18%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">افزایش گزارش‌دهی توسط کارکنان</p>
                  <Progress value={14} max={20} className="h-1.5 mt-2 bg-amber-100 dark:bg-amber-950/30">
                    <div className="h-full bg-amber-500"></div>
                  </Progress>
                </CardContent>
              </Card>
              
              <Card className="border-emerald-200 dark:border-emerald-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 mr-3 text-emerald-500">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">آموزش‌های ایمنی</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">24</p>
                    <span className="text-sm text-slate-500 ml-2 mb-1">از 25</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">دوره‌های آموزشی تکمیل شده</p>
                  <Progress value={24} max={25} className="h-1.5 mt-2 bg-emerald-100 dark:bg-emerald-950/30">
                    <div className="h-full bg-emerald-500"></div>
                  </Progress>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 mr-3 text-blue-500">
                      <HardHat className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">بازرسی‌های ایمنی</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">37</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                      12%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">بازرسی‌های انجام شده در ماه جاری</p>
                  <Progress value={37} max={40} className="h-1.5 mt-2 bg-blue-100 dark:bg-blue-950/30">
                    <div className="h-full bg-blue-500"></div>
                  </Progress>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-tiffany" />
                    ارزیابی جامع ایمنی
                  </CardTitle>
                  <CardDescription>وضعیت ایمنی سازمان در حوزه‌های مختلف</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={safetyRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar
                          name="امتیاز فعلی"
                          dataKey="A"
                          stroke="#2EC4B6"
                          fill="#2EC4B6"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CircleOff className="h-5 w-5 text-amber-500" />
                    نتایج ممیزی ایمنی
                  </CardTitle>
                  <CardDescription>پیشرفت در ممیزی‌های ایمنی سازمان</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditResults.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{item.عنوان}</span>
                            <Badge 
                              variant="outline" 
                              className={`mr-2 ${
                                item.وضعیت === 'تکمیل' 
                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-800/30 dark:bg-emerald-950/30 dark:text-emerald-400' 
                                  : 'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800/30 dark:bg-amber-950/30 dark:text-amber-400'
                              }`}
                            >
                              {item.وضعیت}
                            </Badge>
                          </div>
                          <span className="text-sm text-slate-500 dark:text-slate-400">{item.تکمیل_شده} از {item.مجموع}</span>
                        </div>
                        <Progress 
                          value={item.درصد} 
                          max={100} 
                          className="h-2"
                        >
                          <div 
                            className={`h-full rounded-full ${
                              item.درصد === 100 
                                ? 'bg-emerald-500' 
                                : item.درصد >= 80 
                                  ? 'bg-tiffany' 
                                  : 'bg-amber-500'
                            }`}
                          ></div>
                        </Progress>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* محتوای تب سلامت کارکنان */}
          <TabsContent value="health" className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border-tiffany-200 dark:border-tiffany-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-tiffany-50 dark:bg-tiffany-900/20 mr-3 text-tiffany">
                      <Heart className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">شاخص سلامت کارکنان</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">87</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                      5%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">بهبود 5% نسبت به دوره قبل</p>
                  <Progress value={87} max={100} className="h-1.5 mt-2 bg-tiffany-100 dark:bg-tiffany-950/30">
                    <div className="h-full bg-tiffany"></div>
                  </Progress>
                </CardContent>
              </Card>
              
              <Card className="border-violet-200 dark:border-violet-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-900/20 mr-3 text-violet-500">
                      <Battery className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">میزان استرس عمومی</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">63</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5 rotate-180" />
                      12%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">کاهش 12% نسبت به دوره قبل</p>
                  <Progress value={63} max={100} className="h-1.5 mt-2 bg-violet-100 dark:bg-violet-950/30">
                    <div className="h-full bg-violet-500"></div>
                  </Progress>
                </CardContent>
              </Card>
              
              <Card className="border-emerald-200 dark:border-emerald-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 mr-3 text-emerald-500">
                      <ThumbsUp className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">رضایت از سلامت</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">78</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                      8%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">بر اساس نظرسنجی ماهانه</p>
                  <Progress value={78} max={100} className="h-1.5 mt-2 bg-emerald-100 dark:bg-emerald-950/30">
                    <div className="h-full bg-emerald-500"></div>
                  </Progress>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 mr-3 text-blue-500">
                      <Award className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">معاینات دوره‌ای</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">85</p>
                    <span className="text-sm text-slate-500 ml-2 mb-1">%</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">درصد تکمیل معاینات دوره‌ای سال جاری</p>
                  <Progress value={85} max={100} className="h-1.5 mt-2 bg-blue-100 dark:bg-blue-950/30">
                    <div className="h-full bg-blue-500"></div>
                  </Progress>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500" />
                  روند شاخص‌های سلامت کارکنان
                </CardTitle>
                <CardDescription>مقایسه شاخص‌های مختلف سلامت در ماه‌های اخیر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={employeeHealthData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ opacity: 0.3 }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="میانگین_ضربان_قلب" name="میانگین ضربان قلب" stroke="#FF9F1C" strokeWidth={2} />
                      <Line type="monotone" dataKey="فشار_خون" name="فشار خون" stroke="#F15BB5" strokeWidth={2} />
                      <Line type="monotone" dataKey="استرس" name="سطح استرس" stroke="#2EC4B6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* محتوای تب شاخص‌های زیست‌محیطی */}
          <TabsContent value="environment" className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card className="border-emerald-200 dark:border-emerald-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 mr-3 text-emerald-500">
                      <Zap className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">انتشار کربن</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">160</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5 rotate-180" />
                      15%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">تن CO2 در ماه جاری</p>
                  <Progress value={160} max={240} className="h-1.5 mt-2 bg-emerald-100 dark:bg-emerald-950/30">
                    <div className="h-full bg-emerald-500"></div>
                  </Progress>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <p className="text-xs text-slate-500">کاهش 15% نسبت به ابتدای سال</p>
                </CardFooter>
              </Card>
              
              <Card className="border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 mr-3 text-blue-500">
                      <Droplets className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">مصرف آب</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">140</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5 rotate-180" />
                      22%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">هزار متر مکعب در ماه جاری</p>
                  <Progress value={140} max={180} className="h-1.5 mt-2 bg-blue-100 dark:bg-blue-950/30">
                    <div className="h-full bg-blue-500"></div>
                  </Progress>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <p className="text-xs text-slate-500">کاهش 22% نسبت به ابتدای سال</p>
                </CardFooter>
              </Card>
              
              <Card className="border-amber-200 dark:border-amber-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 mr-3 text-amber-500">
                      <Layers className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">پسماند تولیدی</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">75</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5 rotate-180" />
                      37%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">تن پسماند در ماه جاری</p>
                  <Progress value={75} max={120} className="h-1.5 mt-2 bg-amber-100 dark:bg-amber-950/30">
                    <div className="h-full bg-amber-500"></div>
                  </Progress>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <p className="text-xs text-slate-500">کاهش 37% نسبت به ابتدای سال</p>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-tiffany" />
                  روند شاخص‌های زیست‌محیطی
                </CardTitle>
                <CardDescription>روند تغییرات شاخص‌های زیست‌محیطی در ماه‌های اخیر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={environmentalDataMonthly}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="انتشار_کربن" 
                        name="انتشار کربن (تن)" 
                        stackId="1"
                        stroke="#4ade80" 
                        fill="#4ade80" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="مصرف_آب" 
                        name="مصرف آب (هزار متر مکعب)" 
                        stackId="2"
                        stroke="#60a5fa" 
                        fill="#60a5fa" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="پسماند" 
                        name="پسماند (تن)" 
                        stackId="3"
                        stroke="#fbbf24" 
                        fill="#fbbf24" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* محتوای تب انطباق و ممیزی */}
          <TabsContent value="compliance" className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card className="border-tiffany-200 dark:border-tiffany-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-tiffany-50 dark:bg-tiffany-900/20 mr-3 text-tiffany">
                      <Clipboard className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">انطباق با استانداردها</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">89</p>
                    <span className="text-sm text-slate-500 ml-2 mb-1">%</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">میزان انطباق با استانداردهای HSE</p>
                  <Progress value={89} max={100} className="h-1.5 mt-2 bg-tiffany-100 dark:bg-tiffany-950/30">
                    <div className="h-full bg-tiffany"></div>
                  </Progress>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200 dark:border-blue-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 mr-3 text-blue-500">
                      <SquarePen className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">ممیزی‌های انجام شده</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">12</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                      25%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">تعداد ممیزی‌های سه ماهه اخیر</p>
                  <Progress value={12} max={15} className="h-1.5 mt-2 bg-blue-100 dark:bg-blue-950/30">
                    <div className="h-full bg-blue-500"></div>
                  </Progress>
                </CardContent>
              </Card>
              
              <Card className="border-amber-200 dark:border-amber-800/30 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 mr-3 text-amber-500">
                      <AlertOctagon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">عدم انطباق‌ها</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end">
                    <p className="text-3xl font-bold">8</p>
                    <div className="flex items-center text-emerald-500 text-sm font-medium ml-2 mb-1">
                      <TrendingUp className="h-3.5 w-3.5 mr-0.5 rotate-180" />
                      20%
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">موارد عدم انطباق باز</p>
                  <Progress value={8} max={20} className="h-1.5 mt-2 bg-amber-100 dark:bg-amber-950/30">
                    <div className="h-full bg-amber-500"></div>
                  </Progress>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  انطباق با استانداردها
                </CardTitle>
                <CardDescription>وضعیت فعلی انطباق با استانداردهای مختلف HSE</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={complianceData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="وضعیت_فعلی" name="وضعیت فعلی" fill="#2EC4B6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="هدف" name="هدف" fill="#9381FF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </header>
    </div>
  );
}