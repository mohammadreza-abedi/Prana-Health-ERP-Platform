import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { OrganizationalHealthDashboard } from '@/components/reports/OrganizationalHealthDashboard';
import { ProCard } from '@/components/ui/pro-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <MainLayout>
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
          <TabsList>
            <TabsTrigger value="overview" className="pro-tab">
              <BarChart2 className="h-4 w-4 ml-1.5" />
              نمای کلی
            </TabsTrigger>
            <TabsTrigger value="organizations" className="pro-tab">
              <Building className="h-4 w-4 ml-1.5" />
              سازمان‌ها و شرکت‌ها
            </TabsTrigger>
            <TabsTrigger value="assessment" className="pro-tab">
              <Briefcase className="h-4 w-4 ml-1.5" />
              برنامه‌های ارزیابی
            </TabsTrigger>
            <TabsTrigger value="reports" className="pro-tab">
              <FileText className="h-4 w-4 ml-1.5" />
              گزارشات و تحلیل‌ها
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pro-tab-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <ProCard
                className="md:col-span-2"
                variant="premium"
                color="tiffany"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold">نگاه کلی به صنایع</CardTitle>
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
                  <CardDescription>
                    مقایسه وضعیت سلامت سازمانی در صنایع مختلف
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50">
                          <th className="p-3 text-right border-b">صنعت</th>
                          <th className="p-3 text-right border-b">شاخص سلامت</th>
                          <th className="p-3 text-right border-b">سطح ریسک</th>
                          <th className="p-3 text-right border-b">تعداد سازمان‌ها</th>
                          <th className="p-3 text-right border-b">تعداد کارکنان</th>
                        </tr>
                      </thead>
                      <tbody>
                        {industryStats.map((industry, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                            <td className="p-3 border-b font-medium">{industry.name}</td>
                            <td className="p-3 border-b">
                              <span className={`font-bold ${getHealthScoreColor(industry.healthScore)}`}>
                                {industry.healthScore}%
                              </span>
                            </td>
                            <td className="p-3 border-b">
                              <Badge className={getRiskLevelColor(industry.riskLevel)}>
                                {industry.riskLevel}
                              </Badge>
                            </td>
                            <td className="p-3 border-b">{industry.organizations}</td>
                            <td className="p-3 border-b">{industry.employees.toLocaleString('fa-IR')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </ProCard>
              
              <Card>
                <CardHeader>
                  <CardTitle>اطلاعات تماس</CardTitle>
                  <CardDescription>تیم ارزیابی سلامت سازمانی</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-tiffany ml-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">واحد سلامت شغلی و حرفه‌ای</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        مرکز طب کار پرانا
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-tiffany ml-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">تلفن تماس</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        ۰۲۱-۸۸۶۶۴۴۲۲
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-tiffany ml-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">ایمیل</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        orghealth@pranateb.com
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-tiffany ml-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">ساعات پاسخگویی</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        شنبه تا چهارشنبه: ۸ صبح الی ۱۶<br />
                        پنج‌شنبه: ۸ صبح الی ۱۲
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-3">
                    <Mail className="ml-2 h-4 w-4" />
                    <span>ارسال درخواست</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {statCharts.map((chart, idx) => (
                <Card key={idx}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center text-tiffany ml-3">
                        {chart.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{chart.title}</CardTitle>
                        <CardDescription className="text-xs">{chart.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 w-full flex items-center justify-center">
                      {chart.type === 'line' ? (
                        <LineChart className="h-full w-full text-slate-300 dark:text-slate-700" />
                      ) : (
                        <BarChart2 className="h-full w-full text-slate-300 dark:text-slate-700" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
    </MainLayout>
  );
}