import { useAuth } from "@/lib/useAuth";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import HRAnalyticsCards from "@/components/dashboard/HRAnalyticsCards";
import DepartmentalComparisonChart from "@/components/dashboard/DepartmentalComparisonChart";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Department, User, OrganizationalMetric } from "@/types";
import { GlassCard } from "@/components/ui/glass-card";
import { 
  FilePieChart, 
  Activity, 
  Calendar, 
  Users, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart2,
  Building2,
  Briefcase,
  BookOpen,
  Brain,
  Clipboard,
  ClipboardCheck,
  FileSpreadsheet,
  Shield,
  MessageSquare,
  UserCheck,
  ChevronDown,
  ChevronUp,
  ChevronRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/design-system/atoms/Card";
import { Button } from "@/design-system/atoms/Button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  SafetyComplianceWidget,
  StressHeatmapWidget,
  EmployeeHealthCheckStatus,
  SickLeaveAnalytics,
  PerformanceEvaluationWidget,
  TrainingProgramsWidget,
  PsychologicalAssessmentsWidget,
  HealthAlertSystemWidget,
  MedicalReferralWidget,
  AbsenteeismAnalyticsWidget
} from "@/components/hr/AdvancedHRFeatures";

// Simple component for HR metric card
function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  bgColor 
}: { 
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  bgColor: string;
}) {
  return (
    <motion.div
      className="rounded-xl p-6 shadow-sm hover:scale-[1.02] transition-transform"
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-white/80 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          
          {change !== undefined && (
            <div className="mt-1 flex items-center">
              {change > 0 ? (
                <>
                  <ArrowUpRight className="h-4 w-4 text-green-300 mr-1" />
                  <p className="text-xs text-green-300">افزایش {change}%</p>
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-4 w-4 text-red-300 mr-1" />
                  <p className="text-xs text-red-300">کاهش {Math.abs(change)}%</p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default function HRDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Check if user has HR/HSE access
  if (user && !['hr', 'hse', 'admin'].includes(user.role)) {
    toast({
      title: 'دسترسی محدود',
      description: 'شما به این بخش دسترسی ندارید',
      variant: 'destructive',
    });
    navigate('/');
    return null;
  }
  
  // Fetch departments
  const { data: departments } = useQuery<Department[]>({
    queryKey: ['/api/departments'],
  });
  
  // Fetch users
  const { data: users } = useQuery<User[]>({
    queryKey: ['/api/users'],
  });
  
  // Get current month name
  const getCurrentMonthName = () => {
    const months = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    return months[new Date().getMonth()];
  };
  
  return (
    <>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">داشبورد مدیریتی HR/HSE</h1>
            <p className="text-slate-500 dark:text-slate-400">
              گزارش عملکرد سلامت سازمانی - {getCurrentMonthName()} {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <FileSpreadsheet className="h-4 w-4 ml-1" />
              دانلود گزارش کامل
            </Button>
            <Button variant="primary" size="sm" className="gap-1">
              <Building2 className="h-4 w-4 ml-1" />
              مدیریت واحدها
            </Button>
          </div>
        </div>
      </motion.div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <div className="border-b mb-4">
          <TabsList className="h-10">
            <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <BarChart2 className="h-4 w-4 ml-2" />
              نمای کلی
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Users className="h-4 w-4 ml-2" />
              کارکنان
            </TabsTrigger>
            <TabsTrigger value="safety" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <Shield className="h-4 w-4 ml-2" />
              HSE و ایمنی
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <ClipboardCheck className="h-4 w-4 ml-2" />
              گزارش‌ها
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              <BookOpen className="h-4 w-4 ml-2" />
              آموزش
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview">
          {/* Quick Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="کارکنان فعال"
              value={users?.length || 0}
              change={5}
              icon={<Users className="h-6 w-6 text-white" />}
              bgColor="rgba(129, 216, 208, 0.9)" // Tiffany Blue
            />
            
            <MetricCard
              title="سلامت میانگین"
              value="76/100"
              change={3}
              icon={<Activity className="h-6 w-6 text-white" />}
              bgColor="rgba(0, 0, 128, 0.9)" // Navy Blue
            />
            
            <MetricCard
              title="رویدادهای این ماه"
              value="3"
              icon={<Calendar className="h-6 w-6 text-white" />}
              bgColor="rgba(0, 255, 255, 0.7)" // Aqua
            />
            
            <MetricCard
              title="مجموع ساعات فعالیت"
              value="214 ساعت"
              change={-2}
              icon={<Clock className="h-6 w-6 text-white" />}
              bgColor="rgba(255, 234, 0, 0.7)" // Yellow
            />
          </div>
          
          {/* Department Selector */}
          {departments && departments.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">انتخاب واحد برای نمایش جزئیات:</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-4 py-2 rounded-lg ${!selectedDepartment ? 'bg-tiffany text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-tiffany/10'}`}
                  onClick={() => setSelectedDepartment(null)}
                >
                  همه واحدها
                </button>
                
                {departments.map(dept => (
                  <button 
                    key={dept.id}
                    className={`px-4 py-2 rounded-lg ${selectedDepartment === dept.id ? 'bg-tiffany text-white' : 'bg-slate-100 dark:bg-slate-800 hover:bg-tiffany/10'}`}
                    onClick={() => setSelectedDepartment(dept.id)}
                  >
                    {dept.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Analytics Cards */}
          <HRAnalyticsCards />
          
          {/* Department Comparison Chart */}
          <div className="mt-6">
            <DepartmentalComparisonChart />
          </div>
          
          {/* Health Risk Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <GlassCard className="p-6 rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-semibold text-lg">توزیع ریسک‌های سلامت</h3>
                <div className="flex items-center">
                  <FilePieChart className="h-5 w-5 text-tiffany mr-2" />
                  <span className="text-sm text-tiffany">گزارش کامل</span>
                </div>
              </div>
              
              <div className="h-64">
                <div className="flex h-full items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Pie chart segments */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Low risk (green) - 65% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="rgb(34, 197, 94)"
                        strokeWidth="20"
                        strokeDasharray={`${65 * 2.512} ${100 * 2.512}`}
                        strokeDashoffset="0"
                        transform="rotate(-90, 50, 50)"
                      />
                      
                      {/* Medium risk (yellow) - 25% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="rgb(234, 179, 8)"
                        strokeWidth="20"
                        strokeDasharray={`${25 * 2.512} ${100 * 2.512}`}
                        strokeDashoffset={`-${65 * 2.512}`}
                        transform="rotate(-90, 50, 50)"
                      />
                      
                      {/* High risk (red) - 10% */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="rgb(239, 68, 68)"
                        strokeWidth="20"
                        strokeDasharray={`${10 * 2.512} ${100 * 2.512}`}
                        strokeDashoffset={`-${(65 + 25) * 2.512}`}
                        transform="rotate(-90, 50, 50)"
                      />
                    </svg>
                    
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold">100%</span>
                      <span className="text-xs text-slate-500">کل کارکنان</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4 space-x-reverse mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
                    <span className="text-xs">ریسک پایین (65%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 ml-2"></div>
                    <span className="text-xs">ریسک متوسط (25%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 ml-2"></div>
                    <span className="text-xs">ریسک بالا (10%)</span>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-semibold text-lg">وضعیت مشارکت در برنامه‌ها</h3>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-tiffany mr-2" />
                  <span className="text-sm text-tiffany">جزئیات بیشتر</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">چالش‌های روزانه</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-tiffany w-[82%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">رویدادهای گروهی</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-aqua w-[67%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">وبینارهای آموزشی</span>
                    <span className="text-sm font-medium">54%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-navy w-[54%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">معاینات دوره‌ای</span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-yellow w-[91%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">مشاوره روانشناسی</span>
                    <span className="text-sm font-medium">32%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-red-500 w-[32%]"></div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </TabsContent>
        
        <TabsContent value="employees">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <PerformanceEvaluationWidget />
              <PsychologicalAssessmentsWidget />
            </div>
            <div className="space-y-6">
              <StressHeatmapWidget />
              <SickLeaveAnalytics />
            </div>
          </div>
          
          <div className="mt-6">
            <AbsenteeismAnalyticsWidget />
          </div>
        </TabsContent>
        
        <TabsContent value="safety">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <SafetyComplianceWidget />
              <EmployeeHealthCheckStatus />
            </div>
            <div className="space-y-6">
              <HealthAlertSystemWidget />
            </div>
          </div>
          
          <div className="mt-6">
            <MedicalReferralWidget />
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 text-primary mr-2" />
                گزارش‌های دوره‌ای
              </CardTitle>
              <CardDescription>
                گزارش‌های سلامت، ایمنی و بهداشت سازمانی
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: 'گزارش سلامت کارکنان - خرداد 1402', type: 'ماهانه', date: '1402/03/31', status: 'تکمیل شده', pages: 24 },
                  { title: 'گزارش حوادث و شبه‌حوادث - بهار 1402', type: 'فصلی', date: '1402/03/31', status: 'تکمیل شده', pages: 18 },
                  { title: 'پایش استرس و فرسودگی شغلی - تیر 1402', type: 'ماهانه', date: '1402/04/31', status: 'در انتظار', pages: 0 },
                  { title: 'گزارش معاینات دوره‌ای - نیمه اول 1402', type: 'نیم‌سالانه', date: '1402/06/31', status: 'در انتظار', pages: 0 },
                ].map((report, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div>
                      <h4 className="font-medium">{report.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Badge variant="outline" className="ml-2">
                          {report.type}
                        </Badge>
                        <span>تاریخ: {report.date}</span>
                        {report.status === 'تکمیل شده' && (
                          <span className="mr-2">{report.pages} صفحه</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {report.status === 'تکمیل شده' ? (
                        <Button variant="outline" size="sm">
                          دانلود گزارش
                        </Button>
                      ) : (
                        <Badge variant="outline">
                          {report.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileSpreadsheet className="h-5 w-5 text-teal-600 dark:text-teal-400 mr-2" />
                گزارش‌گیری سفارشی
              </CardTitle>
              <CardDescription>
                ایجاد گزارش سفارشی بر اساس معیارهای مورد نظر
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">نوع گزارش:</label>
                  <Select defaultValue="health">
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب نوع گزارش" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">سلامت کارکنان</SelectItem>
                      <SelectItem value="safety">ایمنی و حوادث</SelectItem>
                      <SelectItem value="training">آموزش‌ها</SelectItem>
                      <SelectItem value="absence">غیبت و مرخصی</SelectItem>
                      <SelectItem value="performance">عملکرد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">بازه زمانی:</label>
                  <Select defaultValue="month">
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب بازه زمانی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">هفتگی</SelectItem>
                      <SelectItem value="month">ماهانه</SelectItem>
                      <SelectItem value="quarter">فصلی</SelectItem>
                      <SelectItem value="year">سالانه</SelectItem>
                      <SelectItem value="custom">سفارشی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">واحد سازمانی:</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب واحد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه واحدها</SelectItem>
                      {departments?.map(dept => (
                        <SelectItem key={dept.id} value={String(dept.id)}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">پیش‌نمایش</Button>
                <Button variant="primary">ایجاد گزارش</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <TrainingProgramsWidget />
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-2" />
                  دوره‌های آموزشی آتی
                </CardTitle>
                <CardDescription>
                  برنامه‌ریزی دوره‌های آموزشی آینده
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: 'TR-1043', title: 'ارگونومی محیط کار', date: '1402/05/15', capacity: 30, enrollment: 18 },
                    { id: 'TR-1047', title: 'مدیریت استرس پیشرفته', date: '1402/05/22', capacity: 25, enrollment: 12 },
                    { id: 'TR-1052', title: 'کمک‌های اولیه', date: '1402/06/05', capacity: 40, enrollment: 25 },
                  ].map((course, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{course.title}</h4>
                        <Badge variant="outline">{course.id}</Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>تاریخ: {course.date}</span>
                        <span>ثبت‌نام: {course.enrollment} از {course.capacity}</span>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>ظرفیت تکمیل شده</span>
                          <span>{Math.round((course.enrollment / course.capacity) * 100)}%</span>
                        </div>
                        <Progress value={Math.round((course.enrollment / course.capacity) * 100)} className="h-1.5" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    <BookOpen className="h-4 w-4 ml-2" />
                    برنامه‌ریزی دوره جدید
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
