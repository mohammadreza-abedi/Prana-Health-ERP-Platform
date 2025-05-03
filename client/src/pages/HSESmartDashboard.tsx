import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
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
  Calendar
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

const COLORS = ['#2EC4B6', '#52C4B9', '#FFBB00', '#FF9500', '#D72638'];

export default function HSESmartDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">داشبورد هوشمند HSE</h1>
            <p className="text-slate-500 dark:text-slate-400">
              نمای 360 درجه از وضعیت سلامت، ایمنی و محیط زیست سازمان
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="gap-1">
              <FileText className="h-4 w-4 ml-1" />
              دانلود گزارش
            </Button>
            <Button variant="default" size="sm" className="gap-1">
              <Activity className="h-4 w-4 ml-1" />
              بروزرسانی
            </Button>
          </div>
        </div>
      </header>
      
      {/* شاخص اصلی HSE */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-5 rounded-xl border border-green-100 dark:border-green-900/50 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:px-6 md:border-l border-green-200 dark:border-green-800/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                <ShieldCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold">شاخص HSE سازمانی</h2>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">بهبود 12% نسبت به دوره قبل</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-end justify-center md:justify-start">
              <span className="text-4xl md:text-5xl font-bold">94</span>
              <span className="text-xl md:text-2xl text-slate-400 ml-2 mb-1">/100</span>
              <span className="ml-4 px-2 py-1 text-sm bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-md">+12%</span>
            </div>
            
            <div className="mt-3 w-full bg-white dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* کارت‌های شاخص‌های کلیدی */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-amber-200 dark:border-amber-800/30">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 mr-3 text-amber-500">
                <AlertCircle className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">حوادث بدون توقف کار</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end">
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-rose-500 ml-2 mb-1">▼ 35%</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">کاهش 35% نسبت به دوره قبل</p>
            <Progress value={5} max={20} className="h-1.5 mt-2"/>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 dark:border-blue-800/30">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 mr-3 text-blue-500">
                <Clock className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">روزهای بدون حادثه</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end">
              <p className="text-3xl font-bold">183</p>
              <p className="text-sm text-emerald-500 ml-2 mb-1">▲ 15%</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">6 ماه بدون حادثه اصلی</p>
            <Progress value={183} max={365} className="h-1.5 mt-2 bg-blue-100 dark:bg-blue-950/30">
              <div className="h-full bg-blue-500"></div>
            </Progress>
          </CardContent>
        </Card>
        
        <Card className="border-tiffany-200 dark:border-tiffany-800/30">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-tiffany-50 dark:bg-tiffany-900/20 mr-3 text-tiffany">
                <TreePine className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">شاخص زیست محیطی</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end">
              <p className="text-3xl font-bold">89</p>
              <p className="text-sm text-emerald-500 ml-2 mb-1">▲ 8%</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">بهبود 8% نسبت به دوره قبل</p>
            <Progress value={89} max={100} className="h-1.5 mt-2 bg-tiffany-100 dark:bg-tiffany-950/30">
              <div className="h-full bg-tiffany"></div>
            </Progress>
          </CardContent>
        </Card>
        
        <Card className="border-violet-200 dark:border-violet-800/30">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-900/20 mr-3 text-violet-500">
                <Award className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">تکمیل آموزش‌های HSE</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end">
              <p className="text-3xl font-bold">92</p>
              <p className="text-sm text-emerald-500 ml-2 mb-1">▲ 7%</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">بهبود 7% نسبت به دوره قبل</p>
            <Progress value={92} max={100} className="h-1.5 mt-2 bg-violet-100 dark:bg-violet-950/30">
              <div className="h-full bg-violet-500"></div>
            </Progress>
          </CardContent>
        </Card>
      </div>
      
      {/* نمودارها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>روند شاخص‌های ایمنی</CardTitle>
              <Badge variant="outline">ماهانه</Badge>
            </div>
            <CardDescription>مقایسه شاخص‌های ایمنی در ماه‌های اخیر</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={healthMetricsData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
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
                  <Tooltip />
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
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>توزیع حوادث</CardTitle>
            <CardDescription>نوع حوادث در دوره جاری</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incidentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={30}
                    fill="#2EC4B6"
                    dataKey="مقدار"
                    nameKey="name"
                  >
                    {incidentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
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
        </Card>
      </div>
      
      {/* اعلانات و هشدارها */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-amber-500" />
                هشدارهای سلامت
              </CardTitle>
              <Badge className="bg-amber-500">4 مورد</Badge>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="max-h-64 overflow-y-auto">
              <div className="border-r-4 border-r-amber-500 border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                <h4 className="font-medium">هشدار گرمازدگی</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">پیش‌بینی دمای بالای 38 درجه در روز آینده</p>
                <p className="text-xs text-slate-400 mt-1">2 ساعت پیش</p>
              </div>
              <div className="border-r-4 border-r-blue-500 border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                <h4 className="font-medium">یادآوری معاینات دوره‌ای</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">معاینات دوره‌ای کارکنان بخش تولید</p>
                <p className="text-xs text-slate-400 mt-1">1 روز پیش</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              فعالیت‌های اخیر
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="max-h-64 overflow-y-auto">
              <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                <h4 className="font-medium">بازرسی دوره‌ای</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">بازرسی دوره‌ای بخش تولید انجام شد</p>
                <p className="text-xs text-slate-400 mt-1">30 دقیقه پیش</p>
              </div>
              <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                <h4 className="font-medium">گزارش حادثه</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">یک حادثه جزئی در بخش انبار گزارش شد</p>
                <p className="text-xs text-slate-400 mt-1">2 ساعت پیش</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              رویدادهای آینده
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <div className="max-h-64 overflow-y-auto">
              <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                <h4 className="font-medium">آموزش اطفاء حریق</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">آموزش عملی اطفاء حریق برای گروه‌های A و B</p>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-slate-400">فردا، 10:00</p>
                  <p className="text-xs text-slate-400">محوطه آموزشی شرقی</p>
                </div>
              </div>
              <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                <h4 className="font-medium">معاینات دوره‌ای</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">معاینات دوره‌ای کارکنان بخش تولید</p>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-slate-400">پنج‌شنبه، تمام روز</p>
                  <p className="text-xs text-slate-400">مرکز بهداشت شرکت</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}