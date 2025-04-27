import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProCard } from '@/components/ui/pro-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Building,
  Users,
  Calendar,
  Download,
  FileText,
  AlertTriangle,
  Clipboard,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Clock,
  Award,
  UserX,
  ShieldAlert,
  ThermometerSun,
  Loader2
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define types for organizational health metrics
interface HealthMetricSummary {
  id: string;
  title: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  impact: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  color: string;
  details?: string;
}

interface HealthMetricByDepartment {
  departmentId: string;
  departmentName: string;
  employeeCount: number;
  metrics: {
    id: string;
    title: string;
    value: number;
    target?: number;
    change?: number;
    status: 'good' | 'warning' | 'critical';
  }[];
}

interface IncidentReport {
  id: string;
  date: Date;
  department: string;
  type: 'injury' | 'illness' | 'near-miss' | 'hazard';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'open' | 'investigating' | 'closed';
  affectedEmployees: number;
  rootCause?: string;
  correctionPlan?: string;
}

interface HealthRisk {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impactedDepartments: string[];
  potentialEmployeesAffected: number;
  mitigationStatus: 'not-started' | 'in-progress' | 'implemented';
  responsiblePerson?: string;
  lastUpdated: Date;
}

interface OrganizationalHealthReportProps {
  organizationId: string;
  organizationName: string;
  fromDate: Date;
  toDate: Date;
  className?: string;
  variant?: 'default' | 'premium';
  isLoading?: boolean;
}

const healthMetricsSummary: HealthMetricSummary[] = [
  {
    id: 'absence-rate',
    title: 'نرخ غیبت',
    value: '۳.۲٪',
    change: -0.8,
    trend: 'down',
    impact: 'positive',
    icon: <UserX className="h-5 w-5" />,
    color: 'tiffany',
    details: 'نرخ غیبت کارکنان به دلیل بیماری یا مشکلات سلامتی',
  },
  {
    id: 'incident-rate',
    title: 'نرخ حوادث',
    value: '۱.۵٪',
    change: -1.2,
    trend: 'down',
    impact: 'positive',
    icon: <AlertTriangle className="h-5 w-5" />,
    color: 'success',
    details: 'حوادث ثبت شده به ازای هر ۱۰۰ کارمند',
  },
  {
    id: 'wellness-score',
    title: 'امتیاز سلامت',
    value: '۸۵٪',
    change: 5,
    trend: 'up',
    impact: 'positive',
    icon: <Award className="h-5 w-5" />,
    color: 'aqua',
    details: 'شاخص کلی سلامت و تندرستی کارکنان',
  },
  {
    id: 'environmental-risk',
    title: 'ریسک محیطی',
    value: '۱۲٪',
    change: 2,
    trend: 'up',
    impact: 'negative',
    icon: <ShieldAlert className="h-5 w-5" />,
    color: 'error',
    details: 'میزان ریسک‌های محیطی شناسایی شده در محیط کار',
  },
  {
    id: 'stress-level',
    title: 'سطح استرس',
    value: '۴۲٪',
    change: -3,
    trend: 'down',
    impact: 'positive',
    icon: <ThermometerSun className="h-5 w-5" />,
    color: 'yellow',
    details: 'میانگین سطح استرس گزارش شده توسط کارکنان',
  },
  {
    id: 'program-participation',
    title: 'مشارکت در برنامه‌ها',
    value: '۶۸٪',
    change: 7,
    trend: 'up',
    impact: 'positive',
    icon: <Users className="h-5 w-5" />,
    color: 'navy',
    details: 'میزان مشارکت در برنامه‌های سلامت سازمانی',
  },
];

const healthByDepartment: HealthMetricByDepartment[] = [
  {
    departmentId: 'engineering',
    departmentName: 'مهندسی',
    employeeCount: 120,
    metrics: [
      { id: 'absence', title: 'نرخ غیبت', value: 2.8, target: 3, status: 'good' },
      { id: 'incident', title: 'نرخ حوادث', value: 1.2, target: 2, status: 'good' },
      { id: 'stress', title: 'سطح استرس', value: 45, target: 40, status: 'warning' },
      { id: 'participation', title: 'مشارکت در برنامه‌ها', value: 72, target: 70, status: 'good' },
    ]
  },
  {
    departmentId: 'production',
    departmentName: 'تولید',
    employeeCount: 350,
    metrics: [
      { id: 'absence', title: 'نرخ غیبت', value: 4.2, target: 3, status: 'warning' },
      { id: 'incident', title: 'نرخ حوادث', value: 3.5, target: 2, status: 'critical' },
      { id: 'stress', title: 'سطح استرس', value: 55, target: 40, status: 'critical' },
      { id: 'participation', title: 'مشارکت در برنامه‌ها', value: 58, target: 70, status: 'warning' },
    ]
  },
  {
    departmentId: 'administration',
    departmentName: 'اداری',
    employeeCount: 85,
    metrics: [
      { id: 'absence', title: 'نرخ غیبت', value: 2.1, target: 3, status: 'good' },
      { id: 'incident', title: 'نرخ حوادث', value: 0.5, target: 2, status: 'good' },
      { id: 'stress', title: 'سطح استرس', value: 38, target: 40, status: 'good' },
      { id: 'participation', title: 'مشارکت در برنامه‌ها', value: 82, target: 70, status: 'good' },
    ]
  },
  {
    departmentId: 'logistics',
    departmentName: 'لجستیک',
    employeeCount: 65,
    metrics: [
      { id: 'absence', title: 'نرخ غیبت', value: 3.9, target: 3, status: 'warning' },
      { id: 'incident', title: 'نرخ حوادث', value: 2.2, target: 2, status: 'warning' },
      { id: 'stress', title: 'سطح استرس', value: 48, target: 40, status: 'warning' },
      { id: 'participation', title: 'مشارکت در برنامه‌ها', value: 62, target: 70, status: 'warning' },
    ]
  },
  {
    departmentId: 'sales',
    departmentName: 'فروش',
    employeeCount: 95,
    metrics: [
      { id: 'absence', title: 'نرخ غیبت', value: 3.0, target: 3, status: 'good' },
      { id: 'incident', title: 'نرخ حوادث', value: 0.8, target: 2, status: 'good' },
      { id: 'stress', title: 'سطح استرس', value: 52, target: 40, status: 'warning' },
      { id: 'participation', title: 'مشارکت در برنامه‌ها', value: 75, target: 70, status: 'good' },
    ]
  },
];

const incidentReports: IncidentReport[] = [
  {
    id: 'INC-001',
    date: new Date(2023, 10, 15),
    department: 'تولید',
    type: 'injury',
    severity: 'medium',
    description: 'آسیب دست کارگر در اثر کار با دستگاه بدون رعایت اصول ایمنی',
    status: 'closed',
    affectedEmployees: 1,
    rootCause: 'عدم استفاده از تجهیزات ایمنی',
    correctionPlan: 'برگزاری کلاس آموزشی ایمنی کار با دستگاه‌ها و توزیع دستکش‌های ایمنی',
  },
  {
    id: 'INC-002',
    date: new Date(2023, 10, 22),
    department: 'مهندسی',
    type: 'near-miss',
    severity: 'high',
    description: 'نزدیک بود سقوط تجهیزات سنگین موجب آسیب جدی شود',
    status: 'investigating',
    affectedEmployees: 0,
    rootCause: 'قفسه‌بندی نامناسب',
  },
  {
    id: 'INC-003',
    date: new Date(2023, 11, 5),
    department: 'لجستیک',
    type: 'illness',
    severity: 'medium',
    description: 'چند نفر از کارکنان بخش لجستیک دچار علائم تنفسی شده‌اند',
    status: 'open',
    affectedEmployees: 4,
  },
  {
    id: 'INC-004',
    date: new Date(2023, 11, 10),
    department: 'تولید',
    type: 'hazard',
    severity: 'high',
    description: 'نشت مواد شیمیایی در انبار',
    status: 'investigating',
    affectedEmployees: 0,
  },
];

const healthRisks: HealthRisk[] = [
  {
    id: 'RISK-001',
    title: 'مواجهه با مواد شیمیایی',
    description: 'کارکنان بخش تولید در معرض مواد شیمیایی مضر قرار دارند',
    severity: 'high',
    impactedDepartments: ['تولید', 'آزمایشگاه'],
    potentialEmployeesAffected: 180,
    mitigationStatus: 'in-progress',
    responsiblePerson: 'احمد رضایی',
    lastUpdated: new Date(2023, 10, 25),
  },
  {
    id: 'RISK-002',
    title: 'استرس ناشی از فشار کاری',
    description: 'فشار کاری زیاد در بخش فروش و حسابداری منجر به افزایش استرس شده است',
    severity: 'medium',
    impactedDepartments: ['فروش', 'مالی'],
    potentialEmployeesAffected: 150,
    mitigationStatus: 'not-started',
    lastUpdated: new Date(2023, 11, 2),
  },
  {
    id: 'RISK-003',
    title: 'مشکلات ارگونومیک',
    description: 'کارکنان بخش اداری به دلیل نشستن طولانی مدت دچار مشکلات اسکلتی-عضلانی هستند',
    severity: 'medium',
    impactedDepartments: ['اداری', 'مالی', 'منابع انسانی', 'فروش'],
    potentialEmployeesAffected: 205,
    mitigationStatus: 'in-progress',
    responsiblePerson: 'سارا محمدی',
    lastUpdated: new Date(2023, 11, 8),
  },
  {
    id: 'RISK-004',
    title: 'آلودگی صوتی',
    description: 'سطح صدا در سالن تولید بالاتر از استاندارد است',
    severity: 'high',
    impactedDepartments: ['تولید'],
    potentialEmployeesAffected: 350,
    mitigationStatus: 'implemented',
    responsiblePerson: 'علی حسینی',
    lastUpdated: new Date(2023, 9, 15),
  },
  {
    id: 'RISK-005',
    title: 'کیفیت نامناسب هوا',
    description: 'سیستم تهویه نامناسب در ساختمان اداری',
    severity: 'low',
    impactedDepartments: ['اداری', 'منابع انسانی', 'مالی'],
    potentialEmployeesAffected: 120,
    mitigationStatus: 'not-started',
    lastUpdated: new Date(2023, 11, 1),
  },
];

export function OrganizationalHealthDashboard({
  organizationId,
  organizationName,
  fromDate,
  toDate,
  className,
  variant = 'default',
  isLoading = false,
}: OrganizationalHealthReportProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedDepts, setExpandedDepts] = useState<string[]>([]);
  
  const toggleDeptExpand = (deptId: string) => {
    setExpandedDepts(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId) 
        : [...prev, deptId]
    );
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fa-IR').format(date);
  };
  
  const getSeverityColor = (severity: IncidentReport['severity'] | HealthRisk['severity']) => {
    switch (severity) {
      case 'low': return 'bg-info text-info-foreground';
      case 'medium': return 'bg-yellow text-yellow-foreground';
      case 'high': return 'bg-error text-error-foreground';
      case 'critical': return 'bg-error text-error-foreground font-bold';
      default: return 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
    }
  };
  
  const getStatusColor = (status: IncidentReport['status']) => {
    switch (status) {
      case 'open': return 'bg-error-lighter text-error dark:bg-error/20 dark:text-error-light';
      case 'investigating': return 'bg-yellow-lighter text-yellow-900 dark:bg-yellow/20 dark:text-yellow-light';
      case 'closed': return 'bg-success-lighter text-success dark:bg-success/20 dark:text-success-light';
      default: return 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
    }
  };
  
  const getMitigationStatusColor = (status: HealthRisk['mitigationStatus']) => {
    switch (status) {
      case 'not-started': return 'bg-error-lighter text-error dark:bg-error/20 dark:text-error-light';
      case 'in-progress': return 'bg-yellow-lighter text-yellow-900 dark:bg-yellow/20 dark:text-yellow-light';
      case 'implemented': return 'bg-success-lighter text-success dark:bg-success/20 dark:text-success-light';
      default: return 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
    }
  };
  
  const getMetricStatusColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good': return 'text-success dark:text-success-light';
      case 'warning': return 'text-yellow dark:text-yellow-light';
      case 'critical': return 'text-error dark:text-error-light';
      default: return 'text-slate-500 dark:text-slate-400';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 text-tiffany animate-spin mb-4" />
        <p className="text-lg text-slate-600 dark:text-slate-300">در حال بارگذاری گزارش سلامت سازمانی...</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <ProCard 
        className="mb-6"
        variant={variant}
        color="tiffany"
      >
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <div className="flex items-center">
                <Building className="text-tiffany h-6 w-6 ml-2" />
                <h2 className="text-xl font-bold">{organizationName}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                گزارش سلامت سازمانی از {formatDate(fromDate)} تا {formatDate(toDate)}
              </p>
            </div>
            
            <div className="flex mt-4 md:mt-0 space-x-2 space-x-reverse">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 ml-1" />
                <span>فیلتر</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <Calendar className="h-4 w-4 ml-1" />
                <span>تغییر بازه زمانی</span>
              </Button>
              <Button className="h-9">
                <Download className="h-4 w-4 ml-1" />
                <span>خروجی PDF</span>
              </Button>
            </div>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="pro-tabs"
          >
            <TabsList>
              <TabsTrigger value="overview" className="pro-tab">
                <BarChart className="h-4 w-4 ml-1.5" />
                نمای کلی
              </TabsTrigger>
              <TabsTrigger value="departments" className="pro-tab">
                <Building className="h-4 w-4 ml-1.5" />
                واحدها و دپارتمان‌ها
              </TabsTrigger>
              <TabsTrigger value="incidents" className="pro-tab">
                <AlertTriangle className="h-4 w-4 ml-1.5" />
                حوادث و رویدادها
              </TabsTrigger>
              <TabsTrigger value="risks" className="pro-tab">
                <ShieldAlert className="h-4 w-4 ml-1.5" />
                ریسک‌ها و مخاطرات
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pro-tab-content">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">شاخص‌های سلامت سازمانی</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {healthMetricsSummary.map((metric) => (
                    <Card key={metric.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 flex items-center">
                              <div className={`text-${metric.color} mr-1`}>{metric.icon}</div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className="cursor-help">
                                    {metric.title}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{metric.details}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <div className="text-2xl font-bold">{metric.value}</div>
                          </div>
                          
                          <div className={`flex items-center text-xs ${
                            metric.impact === 'positive' 
                              ? 'text-success dark:text-success-light' 
                              : metric.impact === 'negative'
                                ? 'text-error dark:text-error-light'
                                : 'text-slate-500 dark:text-slate-400'
                          }`}>
                            {metric.trend === 'up' ? (
                              <TrendingUp className="h-3.5 w-3.5 ml-1" />
                            ) : metric.trend === 'down' ? (
                              <TrendingDown className="h-3.5 w-3.5 ml-1" />
                            ) : null}
                            <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">روند نرخ غیبت</CardTitle>
                      <CardDescription>مقایسه ۶ ماه اخیر</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-60 w-full flex items-center justify-center">
                        <LineChart className="h-full w-full text-slate-300 dark:text-slate-700" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">توزیع علل غیبت‌ها</CardTitle>
                      <CardDescription>بر اساس داده‌های گزارش شده</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-60 w-full flex items-center justify-center">
                        <PieChart className="h-full w-full text-slate-300 dark:text-slate-700" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="departments" className="pro-tab-content">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">وضعیت سلامت به تفکیک واحدها</h3>
                  
                  <div className="flex items-center">
                    <Select defaultValue="absence">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="شاخص مقایسه" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="absence">نرخ غیبت</SelectItem>
                        <SelectItem value="incident">نرخ حوادث</SelectItem>
                        <SelectItem value="stress">سطح استرس</SelectItem>
                        <SelectItem value="participation">مشارکت در برنامه‌ها</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {healthByDepartment.map((dept) => (
                    <Card key={dept.departmentId} className="overflow-hidden">
                      <div 
                        className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        onClick={() => toggleDeptExpand(dept.departmentId)}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Building className="h-5 w-5 ml-2 text-slate-400" />
                            <div>
                              <h4 className="font-bold">{dept.departmentName}</h4>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                {dept.employeeCount} کارمند
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="flex items-center ml-6">
                              {dept.metrics.map((metric, idx) => (
                                <div
                                  key={metric.id}
                                  className={`w-2.5 h-2.5 rounded-full ml-1 ${
                                    metric.status === 'good' 
                                      ? 'bg-success' 
                                      : metric.status === 'warning'
                                        ? 'bg-yellow'
                                        : 'bg-error'
                                  }`}
                                />
                              ))}
                            </div>
                            
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              {expandedDepts.includes(dept.departmentId) ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {expandedDepts.includes(dept.departmentId) && (
                        <CardContent className="border-t pt-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {dept.metrics.map((metric) => (
                              <div key={metric.id} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <div className="text-sm font-medium">{metric.title}</div>
                                  <div className={`text-sm font-semibold ${getMetricStatusColor(metric.status)}`}>
                                    {metric.value}%
                                  </div>
                                </div>
                                
                                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      metric.status === 'good' 
                                        ? 'bg-success' 
                                        : metric.status === 'warning'
                                          ? 'bg-yellow'
                                          : 'bg-error'
                                    }`}
                                    style={{ width: `${(metric.value / (metric.target || 100)) * 100}%` }}
                                  />
                                </div>
                                
                                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                                  <span>هدف: {metric.target}%</span>
                                  <span>
                                    {metric.change && (
                                      <>
                                        {metric.change > 0 ? (
                                          <ArrowUpRight className="inline h-3 w-3 text-error" />
                                        ) : (
                                          <ArrowDownRight className="inline h-3 w-3 text-success" />
                                        )}
                                        <span className="mr-1">{Math.abs(metric.change)}%</span>
                                      </>
                                    )}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Action buttons */}
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" className="ml-2">
                              <FileText className="h-4 w-4 ml-1" />
                              گزارش کامل
                            </Button>
                            <Button size="sm">
                              <Building className="h-4 w-4 ml-1" />
                              مدیریت واحد
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="incidents" className="pro-tab-content">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">حوادث و رویدادها</h3>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="نوع رویداد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">همه موارد</SelectItem>
                        <SelectItem value="injury">آسیب‌ها</SelectItem>
                        <SelectItem value="illness">بیماری‌ها</SelectItem>
                        <SelectItem value="near-miss">وضعیت‌های خطرناک</SelectItem>
                        <SelectItem value="hazard">مخاطرات</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 ml-1" />
                      گزارش جدید
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800/60">
                        <th className="p-3 text-right border-b">شناسه</th>
                        <th className="p-3 text-right border-b">تاریخ</th>
                        <th className="p-3 text-right border-b">واحد</th>
                        <th className="p-3 text-right border-b">نوع</th>
                        <th className="p-3 text-right border-b">شدت</th>
                        <th className="p-3 text-right border-b">وضعیت</th>
                        <th className="p-3 text-right border-b">افراد متأثر</th>
                        <th className="p-3 text-right border-b">توضیحات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {incidentReports.map((incident) => (
                        <tr key={incident.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="p-3 border-b font-medium">{incident.id}</td>
                          <td className="p-3 border-b">{formatDate(incident.date)}</td>
                          <td className="p-3 border-b">{incident.department}</td>
                          <td className="p-3 border-b">
                            {incident.type === 'injury' && 'آسیب'}
                            {incident.type === 'illness' && 'بیماری'}
                            {incident.type === 'near-miss' && 'وضعیت خطرناک'}
                            {incident.type === 'hazard' && 'مخاطره'}
                          </td>
                          <td className="p-3 border-b">
                            <Badge className={getSeverityColor(incident.severity)}>
                              {incident.severity === 'low' && 'کم'}
                              {incident.severity === 'medium' && 'متوسط'}
                              {incident.severity === 'high' && 'زیاد'}
                              {incident.severity === 'critical' && 'بحرانی'}
                            </Badge>
                          </td>
                          <td className="p-3 border-b">
                            <Badge className={getStatusColor(incident.status)}>
                              {incident.status === 'open' && 'باز'}
                              {incident.status === 'investigating' && 'در حال بررسی'}
                              {incident.status === 'closed' && 'بسته شده'}
                            </Badge>
                          </td>
                          <td className="p-3 border-b text-center">{incident.affectedEmployees}</td>
                          <td className="p-3 border-b">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-sm">
                                  <div className="space-y-2">
                                    <p><strong>توضیحات:</strong> {incident.description}</p>
                                    {incident.rootCause && (
                                      <p><strong>علت اصلی:</strong> {incident.rootCause}</p>
                                    )}
                                    {incident.correctionPlan && (
                                      <p><strong>اقدامات اصلاحی:</strong> {incident.correctionPlan}</p>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4">
                  <ProCard className="bg-gradient-to-r from-yellow/10 to-yellow/5">
                    <CardContent className="p-4 flex items-center">
                      <AlertTriangle className="h-10 w-10 text-yellow mr-4 flex-shrink-0" />
                      <div>
                        <h3 className="font-bold mb-1">تحلیل روند حوادث</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          در مقایسه با دوره مشابه سال قبل، تعداد حوادث ۲۲٪ کاهش داشته است، اما حوادث در بخش تولید همچنان بالاتر از استاندارد است. پیشنهاد می‌شود برنامه آموزشی ایمنی برای این بخش تقویت شود.
                        </p>
                      </div>
                    </CardContent>
                  </ProCard>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="risks" className="pro-tab-content">
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">ریسک‌ها و مخاطرات</h3>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="وضعیت کاهش ریسک" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">همه موارد</SelectItem>
                        <SelectItem value="not-started">شروع نشده</SelectItem>
                        <SelectItem value="in-progress">در حال انجام</SelectItem>
                        <SelectItem value="implemented">اجرا شده</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="sm">
                      <Clipboard className="h-4 w-4 ml-1" />
                      ثبت ریسک جدید
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {healthRisks.map((risk) => (
                    <Card key={risk.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                          <div className="space-y-2 mb-4 lg:mb-0">
                            <div className="flex items-start">
                              <ShieldAlert className="h-5 w-5 mt-0.5 ml-2 text-error" />
                              <div>
                                <h4 className="font-bold flex items-center">
                                  {risk.title}
                                  <Badge className={`mr-2 ${getSeverityColor(risk.severity)}`}>
                                    {risk.severity === 'low' && 'کم'}
                                    {risk.severity === 'medium' && 'متوسط'}
                                    {risk.severity === 'high' && 'زیاد'}
                                    {risk.severity === 'critical' && 'بحرانی'}
                                  </Badge>
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                                  {risk.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center text-xs text-slate-500 dark:text-slate-400 mt-2 gap-4">
                              <div className="flex items-center">
                                <Building className="h-3.5 w-3.5 ml-1" />
                                <span>واحدهای متأثر: {risk.impactedDepartments.join('، ')}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3.5 w-3.5 ml-1" />
                                <span>افراد در معرض: {risk.potentialEmployeesAffected} نفر</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 ml-1" />
                                <span>آخرین بروزرسانی: {formatDate(risk.lastUpdated)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <Badge className={getMitigationStatusColor(risk.mitigationStatus)}>
                              {risk.mitigationStatus === 'not-started' && 'اقدام نشده'}
                              {risk.mitigationStatus === 'in-progress' && 'در حال انجام'}
                              {risk.mitigationStatus === 'implemented' && 'اجرا شده'}
                            </Badge>
                            
                            {risk.responsiblePerson && (
                              <div className="text-sm">
                                <span className="text-slate-500 dark:text-slate-400 ml-1">مسئول:</span>
                                <span>{risk.responsiblePerson}</span>
                              </div>
                            )}
                            
                            <Button variant="outline" size="sm">مشاهده جزئیات</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProCard className="bg-gradient-to-r from-tiffany/5 to-aqua/5">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 flex items-center">
                        <Award className="h-5 w-5 ml-2 text-tiffany" />
                        توصیه‌های بهبود
                      </h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-tiffany mt-1.5 ml-2 flex-shrink-0"></div>
                          <span>برگزاری دوره‌های آموزشی ایمنی برای کارکنان بخش تولید با تمرکز بر کاهش ریسک مواجهه با مواد شیمیایی</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-tiffany mt-1.5 ml-2 flex-shrink-0"></div>
                          <span>ارتقای سیستم تهویه در ساختمان اداری برای بهبود کیفیت هوای داخل</span>
                        </li>
                        <li className="flex items-start">
                          <div className="h-2 w-2 rounded-full bg-tiffany mt-1.5 ml-2 flex-shrink-0"></div>
                          <span>اجرای برنامه مدیریت استرس برای کارکنان بخش فروش</span>
                        </li>
                      </ul>
                    </CardContent>
                  </ProCard>
                  
                  <ProCard className="bg-gradient-to-r from-success/5 to-success/10">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2 flex items-center">
                        <LineChart className="h-5 w-5 ml-2 text-success" />
                        پیشرفت برنامه‌های کاهش ریسک
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>شناسایی ریسک‌ها</span>
                            <span>100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>تدوین برنامه‌های کاهش ریسک</span>
                            <span>85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>اجرای برنامه‌ها</span>
                            <span>60%</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>پایش و ارزیابی نتایج</span>
                            <span>40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </ProCard>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ProCard>
    </div>
  );
}