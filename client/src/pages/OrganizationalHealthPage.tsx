import React, { useState } from 'react';
import { OrganizationalHealthDashboard } from '@/components/reports/OrganizationalHealthDashboard';
import { ProCard } from '@/components/ui/pro-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Calendar, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  FileText,
  Mail,
  Clock,
  Phone,
  BarChart2,
  LineChart,
  PlusCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// داده شرکت‌های زیرمجموعه
const organizations = [
  { 
    id: 'org1', 
    name: 'شرکت فولاد مبارکه', 
    industry: 'صنعت فولاد',
    employees: 12500,
    healthScore: 87,
    riskLevel: 'متوسط',
    lastReport: new Date(2023, 11, 15),
  },
  { 
    id: 'org2', 
    name: 'پتروشیمی بندر امام', 
    industry: 'پتروشیمی',
    employees: 8200,
    healthScore: 78,
    riskLevel: 'بالا',
    lastReport: new Date(2023, 11, 10),
  },
  { 
    id: 'org3', 
    name: 'ایران خودرو', 
    industry: 'خودروسازی',
    employees: 21000,
    healthScore: 82,
    riskLevel: 'متوسط',
    lastReport: new Date(2023, 11, 5),
  },
  { 
    id: 'org4', 
    name: 'فروشگاه‌های زنجیره‌ای رفاه', 
    industry: 'خرده‌فروشی',
    employees: 9500,
    healthScore: 92,
    riskLevel: 'پایین',
    lastReport: new Date(2023, 11, 18),
  },
  { 
    id: 'org5', 
    name: 'شرکت مخابرات ایران', 
    industry: 'مخابرات',
    employees: 18500,
    healthScore: 85,
    riskLevel: 'متوسط',
    lastReport: new Date(2023, 11, 12),
  },
];

// داده صنایع مختلف و وضعیت سلامت کلی آنها
const industryStats = [
  { name: 'صنعت فولاد', healthScore: 82, riskLevel: 'متوسط', organizations: 8, employees: 48000 },
  { name: 'پتروشیمی', healthScore: 76, riskLevel: 'بالا', organizations: 12, employees: 62000 },
  { name: 'خودروسازی', healthScore: 80, riskLevel: 'متوسط', organizations: 6, employees: 45000 },
  { name: 'خرده‌فروشی', healthScore: 89, riskLevel: 'پایین', organizations: 15, employees: 32000 },
  { name: 'مخابرات', healthScore: 84, riskLevel: 'متوسط', organizations: 4, employees: 28000 },
];

// نمودارهای آماری (برای نمایش)
const statCharts = [
  { title: 'روند شاخص سلامت سازمانی', description: 'میانگین صنایع در ۱۲ ماه گذشته', type: 'line', icon: <LineChart className="h-5 w-5" /> },
  { title: 'مقایسه صنایع', description: 'شاخص‌های کلیدی بر اساس نوع صنعت', type: 'bar', icon: <BarChart2 className="h-5 w-5" /> },
];

// برنامه‌های ارزیابی سلامت (اسکجول بازدیدها)
const healthAssessmentPlans = [
  { id: 'plan1', organization: 'شرکت فولاد مبارکه', date: new Date(2023, 11, 28), type: 'بازدید دوره‌ای', status: 'scheduled' },
  { id: 'plan2', organization: 'پتروشیمی بندر امام', date: new Date(2024, 0, 5), type: 'بازدید ویژه', status: 'scheduled' },
  { id: 'plan3', organization: 'ایران خودرو', date: new Date(2023, 11, 20), type: 'پیگیری اقدامات اصلاحی', status: 'completed' },
];

export default function OrganizationalHealthPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedOrg, setSelectedOrg] = useState('org1');
  const [dateRange, setDateRange] = useState('month');
  
  // تبدیل تاریخ به فرمت فارسی
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR').format(date);
  };
  
  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'پایین': return 'bg-success-lighter text-success dark:bg-success/20 dark:text-success-light';
      case 'متوسط': return 'bg-yellow-lighter text-yellow-900 dark:bg-yellow/20 dark:text-yellow-light';
      case 'بالا': return 'bg-error-lighter text-error dark:bg-error/20 dark:text-error-light';
      default: return 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
    }
  };
  
  const getHealthScoreColor = (score: number) => {
    if (score >= 85) return 'text-success dark:text-success-light';
    if (score >= 70) return 'text-yellow dark:text-yellow-light';
    return 'text-error dark:text-error-light';
  };
  
  const getDateRangeInfo = () => {
    const now = new Date();
    let fromDate = new Date();
    
    switch (dateRange) {
      case 'week':
        fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        return { fromDate, toDate: now };
      case 'month':
        fromDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return { fromDate, toDate: now };
      case 'quarter':
        fromDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        return { fromDate, toDate: now };
      case 'year':
        fromDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        return { fromDate, toDate: now };
      default:
        fromDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return { fromDate, toDate: now };
    }
  };
  
  const { fromDate, toDate } = getDateRangeInfo();
  const selectedOrganization = organizations.find(org => org.id === selectedOrg) || organizations[0];
  
  return (
    <div className="pb-8">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">سلامت سازمانی</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              مدیریت و پایش وضعیت سلامت شغلی و حرفه‌ای در سازمان‌ها
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select 
              defaultValue="month" 
              value={dateRange}
              onValueChange={(value) => setDateRange(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="بازه زمانی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">هفته اخیر</SelectItem>
                <SelectItem value="month">ماه اخیر</SelectItem>
                <SelectItem value="quarter">سه ماه اخیر</SelectItem>
                <SelectItem value="year">سال اخیر</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              defaultValue="org1"
              value={selectedOrg}
              onValueChange={(value) => setSelectedOrg(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="سازمان/شرکت" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button className="bg-tiffany hover:bg-tiffany-hover text-white">
              <FileText className="ml-2 h-4 w-4" />
              <span>گزارش جدید</span>
            </Button>
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="pro-tabs mb-6"
        >
          <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-md p-1.5 overflow-x-auto">
            <TabsList className="bg-slate-100/70 dark:bg-slate-800/70 grid grid-cols-2 md:grid-cols-4 w-full rounded-lg">
              <TabsTrigger 
                value="overview" 
                className={`rounded-lg py-3 px-3 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm ${
                  activeTab === 'overview' 
                    ? 'text-tiffany dark:text-tiffany-light' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-tiffany dark:hover:text-tiffany-light'
                }`}
              >
                <div className="relative overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-r from-tiffany/10 to-aqua/10 dark:from-tiffany/20 dark:to-aqua/15 rounded-md opacity-0 ${
                    activeTab === 'overview' ? 'opacity-100' : 'group-hover:opacity-70'
                  } transition-opacity duration-300`}></div>
                  <BarChart2 className={`h-4 w-4 ml-1.5 ${
                    activeTab === 'overview' ? 'text-tiffany dark:text-tiffany-light' : ''
                  }`} />
                  <span>نمای کلی</span>
                  {activeTab === 'overview' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-tiffany to-aqua"></div>
                  )}
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="organizations" 
                className={`rounded-lg py-3 px-3 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm ${
                  activeTab === 'organizations' 
                    ? 'text-indigo-500 dark:text-indigo-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400'
                }`}
              >
                <div className="relative overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-400/10 dark:from-indigo-500/20 dark:to-blue-400/15 rounded-md opacity-0 ${
                    activeTab === 'organizations' ? 'opacity-100' : 'group-hover:opacity-70'
                  } transition-opacity duration-300`}></div>
                  <Building className={`h-4 w-4 ml-1.5 ${
                    activeTab === 'organizations' ? 'text-indigo-500 dark:text-indigo-400' : ''
                  }`} />
                  <span>سازمان‌ها</span>
                  {activeTab === 'organizations' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-400"></div>
                  )}
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="assessment" 
                className={`rounded-lg py-3 px-3 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm ${
                  activeTab === 'assessment' 
                    ? 'text-green-500 dark:text-green-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-green-500 dark:hover:text-green-400'
                }`}
              >
                <div className="relative overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-400/10 dark:from-green-500/20 dark:to-emerald-400/15 rounded-md opacity-0 ${
                    activeTab === 'assessment' ? 'opacity-100' : 'group-hover:opacity-70'
                  } transition-opacity duration-300`}></div>
                  <Briefcase className={`h-4 w-4 ml-1.5 ${
                    activeTab === 'assessment' ? 'text-green-500 dark:text-green-400' : ''
                  }`} />
                  <span>ارزیابی‌ها</span>
                  {activeTab === 'assessment' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-400"></div>
                  )}
                </div>
              </TabsTrigger>
              
              <TabsTrigger 
                value="reports" 
                className={`rounded-lg py-3 px-3 text-sm font-medium transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm ${
                  activeTab === 'reports' 
                    ? 'text-amber-500 dark:text-amber-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400'
                }`}
              >
                <div className="relative overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-400/10 dark:from-amber-500/20 dark:to-yellow-400/15 rounded-md opacity-0 ${
                    activeTab === 'reports' ? 'opacity-100' : 'group-hover:opacity-70'
                  } transition-opacity duration-300`}></div>
                  <FileText className={`h-4 w-4 ml-1.5 ${
                    activeTab === 'reports' ? 'text-amber-500 dark:text-amber-400' : ''
                  }`} />
                  <span>گزارشات</span>
                  {activeTab === 'reports' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400"></div>
                  )}
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="pro-tab-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2 relative">
                <ProCard
                  className="overflow-hidden"
                  variant="premium"
                  color="tiffany"
                >
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-tiffany via-aqua to-tiffany-light"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-tiffany/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <CardTitle className="text-lg font-bold flex items-center">
                          <div className="w-6 h-6 rounded-md bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center text-tiffany ml-2">
                            <Building className="h-3.5 w-3.5" />
                          </div>
                          نگاه کلی به صنایع
                        </CardTitle>
                        <CardDescription className="mt-1">
                          مقایسه وضعیت سلامت سازمانی در صنایع مختلف
                        </CardDescription>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 px-2 bg-white/50 dark:bg-slate-900/50">
                          <Download className="h-3.5 w-3.5 ml-1" />
                          <span className="text-xs">خروجی اکسل</span>
                        </Button>
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue placeholder="صنعت" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">همه صنایع</SelectItem>
                            <SelectItem value="steel">صنعت فولاد</SelectItem>
                            <SelectItem value="petrochem">پتروشیمی</SelectItem>
                            <SelectItem value="auto">خودروسازی</SelectItem>
                            <SelectItem value="retail">خرده‌فروشی</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="overflow-x-auto rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30">
                            <th className="p-3 text-right border-b">صنعت</th>
                            <th className="p-3 text-right border-b">شاخص سلامت</th>
                            <th className="p-3 text-right border-b">سطح ریسک</th>
                            <th className="p-3 text-right border-b">تعداد سازمان‌ها</th>
                            <th className="p-3 text-right border-b">تعداد کارکنان</th>
                          </tr>
                        </thead>
                        <tbody>
                          {industryStats.map((industry, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="p-3 border-b font-medium">
                                <div className="flex items-center">
                                  <div className={`w-3 h-3 rounded-full ml-2 ${
                                    industry.healthScore > 80 ? 'bg-success' : 
                                    industry.healthScore > 60 ? 'bg-yellow-500' : 'bg-destructive'
                                  }`}></div>
                                  {industry.name}
                                </div>
                              </td>
                              <td className="p-3 border-b">
                                <div className="flex items-center">
                                  <span className={`font-bold ${getHealthScoreColor(industry.healthScore)}`}>
                                    {industry.healthScore}%
                                  </span>
                                  <div className="mr-2 w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${
                                        industry.healthScore > 80 ? 'bg-success' : 
                                        industry.healthScore > 60 ? 'bg-yellow-500' : 'bg-destructive'
                                      }`}
                                      style={{ width: `${industry.healthScore}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 border-b">
                                <Badge className={`rounded-lg ${getRiskLevelColor(industry.riskLevel)}`}>
                                  {industry.riskLevel}
                                </Badge>
                              </td>
                              <td className="p-3 border-b font-medium">{industry.organizations}</td>
                              <td className="p-3 border-b">{industry.employees.toLocaleString('fa-IR')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </ProCard>
              </div>
              
              <div className="relative">
                <Card className="h-full backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 shadow-lg overflow-hidden">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-400 to-indigo-300"></div>
                  <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl -translate-y-1/2 -translate-x-1/2"></div>
                  
                  <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center">
                        <div className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 ml-2">
                          <Users className="h-3.5 w-3.5" />
                        </div>
                        اطلاعات تماس
                      </CardTitle>
                      <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/30">
                        تیم سلامت
                      </Badge>
                    </div>
                    <CardDescription>تیم ارزیابی سلامت سازمانی</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-6 pb-2 space-y-4">
                    <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 p-3">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 ml-3">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">واحد سلامت شغلی و حرفه‌ای</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            مرکز طب کار پرانا
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 p-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-md bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 ml-3">
                            <Phone className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">تلفن تماس</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              ۰۲۱-۸۸۶۶۴۴۲۲
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 p-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 ml-3">
                            <Mail className="h-4 w-4" />
                          </div>
                          <div className="overflow-hidden">
                            <div className="font-medium">ایمیل</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                              orghealth@pranateb.com
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/70 p-3">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 ml-3">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">ساعات پاسخگویی</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            شنبه تا چهارشنبه: ۸ صبح الی ۱۶<br />
                            پنج‌شنبه: ۸ صبح الی ۱۲
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="mt-auto">
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md">
                      <Mail className="ml-2 h-4 w-4" />
                      <span>ارسال درخواست</span>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {statCharts.map((chart, idx) => {
                const colors = [
                  { light: 'from-tiffany/10 to-aqua/5', dark: 'from-tiffany/20 to-aqua/15', text: 'text-tiffany dark:text-tiffany-light', border: 'border-tiffany/20 dark:border-tiffany/30' },
                  { light: 'from-indigo-500/10 to-blue-400/5', dark: 'from-indigo-500/20 to-blue-400/15', text: 'text-indigo-500 dark:text-indigo-400', border: 'border-indigo-500/20 dark:border-indigo-500/30' },
                  { light: 'from-amber-500/10 to-yellow-400/5', dark: 'from-amber-500/20 to-yellow-400/15', text: 'text-amber-500 dark:text-amber-400', border: 'border-amber-500/20 dark:border-amber-500/30' },
                  { light: 'from-green-500/10 to-emerald-400/5', dark: 'from-green-500/20 to-emerald-400/15', text: 'text-green-500 dark:text-green-400', border: 'border-green-500/20 dark:border-green-500/30' }
                ];
                const colorSet = colors[idx % colors.length];
                
                return (
                  <div key={idx} className="relative">
                    <Card className="border-slate-200/60 dark:border-slate-800/60 shadow-md backdrop-blur-sm overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                        idx === 0 ? 'from-tiffany via-aqua to-tiffany-light' : 
                        idx === 1 ? 'from-indigo-500 via-indigo-400 to-blue-400' :
                        idx === 2 ? 'from-amber-500 via-amber-400 to-yellow-400' : 
                        'from-green-500 via-green-400 to-emerald-400'
                      }`}></div>
                      
                      <div className={`absolute -top-8 right-8 w-24 h-24 rounded-full bg-gradient-to-br ${
                        colorSet.dark
                      } opacity-30 blur-2xl`}></div>
                      
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${
                              idx === 0 ? 'from-tiffany/20 to-aqua/20 dark:from-tiffany/30 dark:to-aqua/30' : 
                              idx === 1 ? 'from-indigo-500/20 to-blue-400/20 dark:from-indigo-500/30 dark:to-blue-400/30' :
                              idx === 2 ? 'from-amber-500/20 to-yellow-400/20 dark:from-amber-500/30 dark:to-yellow-400/30' : 
                              'from-green-500/20 to-emerald-400/20 dark:from-green-500/30 dark:to-emerald-400/30'
                            } flex items-center justify-center ${colorSet.text} ml-3 backdrop-blur-sm`}>
                              {chart.icon}
                            </div>
                            <div>
                              <CardTitle className="text-base">{chart.title}</CardTitle>
                              <CardDescription className="text-xs">{chart.description}</CardDescription>
                            </div>
                          </div>
                          
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Badge variant="outline" className={`text-xs rounded-lg bg-white/50 dark:bg-slate-900/50 ${colorSet.border}`}>
                              {idx % 2 === 0 ? 'ماهانه' : 'هفتگی'}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative">
                        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 bg-[size:20px_20px] opacity-30"></div>
                        
                        <div className="h-60 w-full flex items-center justify-center overflow-hidden relative">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-950 opacity-10"></div>
                          
                          <div className="absolute top-4 right-4 flex flex-col items-end">
                            <span className={`font-bold text-xl ${colorSet.text}`}>
                              {idx % 2 === 0 ? '+12.8%' : '+7.3%'}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              از ماه گذشته
                            </span>
                          </div>
                          
                          {chart.type === 'line' ? (
                            <div className="relative h-full w-full py-2">
                              <LineChart className="h-full w-full text-slate-300/50 dark:text-slate-700/50" />
                              <div className={`absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t ${
                                idx === 0 ? 'from-tiffany/5 to-transparent dark:from-tiffany/10' : 
                                idx === 1 ? 'from-indigo-500/5 to-transparent dark:from-indigo-500/10' :
                                idx === 2 ? 'from-amber-500/5 to-transparent dark:from-amber-500/10' : 
                                'from-green-500/5 to-transparent dark:from-green-500/10'
                              }`}></div>
                            </div>
                          ) : (
                            <div className="relative h-full w-full py-2">
                              <BarChart2 className="h-full w-full text-slate-300/50 dark:text-slate-700/50" />
                              <div className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t ${
                                idx === 0 ? 'from-tiffany/5 to-transparent dark:from-tiffany/10' : 
                                idx === 1 ? 'from-indigo-500/5 to-transparent dark:from-indigo-500/10' :
                                idx === 2 ? 'from-amber-500/5 to-transparent dark:from-amber-500/10' : 
                                'from-green-500/5 to-transparent dark:from-green-500/10'
                              }`}></div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
            
            <ProCard
              className="bg-gradient-to-r from-tiffany/10 to-aqua/10 dark:from-tiffany/20 dark:to-aqua/20 border-0 p-6"
              glassmorphism
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-4 md:mb-0 md:ml-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <ShieldCheck className="h-6 w-6 ml-2 text-tiffany" />
                    سیستم مدیریت HSE پرانا
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
                    سیستم جامع مدیریت بهداشت، ایمنی و محیط زیست پرانا با بهره‌گیری از فناوری‌های هوشمند، راهکار کامل برای مدیریت سلامت سازمانی و کاهش ریسک‌های شغلی است. با استفاده از این سیستم، می‌توانید وضعیت سلامت سازمان خود را به طور مستمر پایش کرده و اقدامات اصلاحی را به موقع انجام دهید.
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <Button className="bg-tiffany hover:bg-tiffany-hover">
                    <PlusCircle className="ml-2 h-4 w-4" />
                    <span>اطلاعات بیشتر</span>
                  </Button>
                </div>
              </div>
            </ProCard>
          </TabsContent>
          
          <TabsContent value="organizations" className="pro-tab-content">
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                      <th className="p-3 text-right border-b">نام سازمان</th>
                      <th className="p-3 text-right border-b">صنعت</th>
                      <th className="p-3 text-right border-b">تعداد کارکنان</th>
                      <th className="p-3 text-right border-b">شاخص سلامت</th>
                      <th className="p-3 text-right border-b">سطح ریسک</th>
                      <th className="p-3 text-right border-b">آخرین گزارش</th>
                      <th className="p-3 text-right border-b">عملیات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.map((org) => (
                      <tr key={org.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="p-3 border-b font-medium">{org.name}</td>
                        <td className="p-3 border-b">{org.industry}</td>
                        <td className="p-3 border-b">{org.employees.toLocaleString('fa-IR')}</td>
                        <td className="p-3 border-b">
                          <span className={`font-bold ${getHealthScoreColor(org.healthScore)}`}>
                            {org.healthScore}%
                          </span>
                        </td>
                        <td className="p-3 border-b">
                          <Badge className={getRiskLevelColor(org.riskLevel)}>
                            {org.riskLevel}
                          </Badge>
                        </td>
                        <td className="p-3 border-b">
                          {formatDate(org.lastReport)}
                        </td>
                        <td className="p-3 border-b">
                          <div className="flex space-x-1 space-x-reverse">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8"
                              onClick={() => setSelectedOrg(org.id)}
                            >
                              <FileText className="h-3.5 w-3.5 ml-1" />
                              <span>گزارش</span>
                            </Button>
                            <Button 
                              size="sm"
                              className="h-8"
                            >
                              <Briefcase className="h-3.5 w-3.5 ml-1" />
                              <span>ارزیابی</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assessment" className="pro-tab-content">
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">برنامه‌های ارزیابی</h3>
                
                <div className="flex space-x-2 space-x-reverse">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 ml-1.5" />
                    <span>تقویم</span>
                  </Button>
                  <Button size="sm">
                    <PlusCircle className="h-4 w-4 ml-1.5" />
                    <span>برنامه جدید</span>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                {healthAssessmentPlans.map((plan) => (
                  <Card key={plan.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center text-tiffany ml-3">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold">{plan.organization}</h4>
                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                              <Calendar className="h-3.5 w-3.5 ml-1" />
                              <span>{formatDate(plan.date)}</span>
                              <span className="mx-2">•</span>
                              <span>{plan.type}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Badge className={
                            plan.status === 'completed' 
                              ? 'bg-success-lighter text-success dark:bg-success/20 dark:text-success-light'
                              : 'bg-yellow-lighter text-yellow-900 dark:bg-yellow/20 dark:text-yellow-light'
                          }>
                            {plan.status === 'completed' ? 'انجام شده' : 'برنامه‌ریزی شده'}
                          </Badge>
                          
                          <div className="flex mr-4">
                            <Button variant="outline" size="sm" className="ml-2 h-8">
                              <Calendar className="h-3.5 w-3.5 ml-1" />
                              <span>تقویم</span>
                            </Button>
                            <Button variant={plan.status === 'completed' ? 'outline' : 'default'} size="sm" className="h-8">
                              <FileText className="h-3.5 w-3.5 ml-1" />
                              <span>{plan.status === 'completed' ? 'مشاهده گزارش' : 'ثبت گزارش'}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="pro-tab-content">
            <OrganizationalHealthDashboard
              organizationId={selectedOrganization.id}
              organizationName={selectedOrganization.name}
              fromDate={fromDate}
              toDate={toDate}
              variant="premium"
            />
          </TabsContent>
        </Tabs>
      </div>
  );
}