/**
 * @file AdvancedHRFeatures.tsx
 * @description کامپوننت‌های پیشرفته HR برای داشبورد منابع انسانی
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Briefcase, 
  Award, 
  TrendingUp, 
  FileText, 
  Clock, 
  Activity, 
  Calendar, 
  Zap, 
  User, 
  BarChart2, 
  PieChart, 
  LineChart,
  Layers,
  BookOpen,
  Coffee,
  Brain,
  Heart,
  Smile,
  Mail,
  MessageSquare,
  Star,
  Headphones,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Hexagon,
  Clipboard,
  Table,
  CircleDashed,
  ThumbsUp,
  Settings,
  UserCheck,
  Shield,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/design-system/atoms/Card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/design-system/atoms/Button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

// کارت ویژگی پیشرفته
export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  color,
  children,
  actions
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="h-full">
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex">
              <div className={`w-10 h-10 rounded-md flex items-center justify-center ${color} mr-3`}>
                {icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          </div>
          <div>{children}</div>
          {actions && <div className="mt-4">{actions}</div>}
        </div>
      </GlassCard>
    </motion.div>
  );
};

// منابع انسانی پیشرفته - میزان انطباق با استانداردهای بهداشت و ایمنی
export const SafetyComplianceWidget = () => {
  const complianceData = [
    { category: 'ارگونومی محیط کار', rate: 92, target: 95 },
    { category: 'تجهیزات ایمنی', rate: 88, target: 100 },
    { category: 'پروتکل‌های بهداشتی', rate: 97, target: 95 },
    { category: 'مدیریت بحران', rate: 76, target: 85 },
    { category: 'آموزش ایمنی', rate: 82, target: 90 }
  ];

  return (
    <FeatureCard
      title="انطباق با استانداردهای HSE"
      description="میزان انطباق با استانداردهای بهداشت، ایمنی و محیط کار"
      icon={<Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
      color="bg-blue-100 dark:bg-blue-900/20"
    >
      <div className="space-y-4">
        {complianceData.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{item.category}</span>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${item.rate >= item.target ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {item.rate}%
                </span>
                <span className="text-xs text-muted-foreground mx-1">از</span>
                <span className="text-xs">{item.target}%</span>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.rate >= item.target ? 'bg-green-500' : 'bg-amber-500'}`} 
                style={{ width: `${item.rate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </FeatureCard>
  );
};

// منابع انسانی پیشرفته - نقشه حرارتی استرس کارمندان
export const StressHeatmapWidget = () => {
  const departmentData = [
    { name: 'فناوری اطلاعات', stressLevel: 65, employeeCount: 24, icon: <Settings className="h-4 w-4" /> },
    { name: 'منابع انسانی', stressLevel: 48, employeeCount: 12, icon: <Users className="h-4 w-4" /> },
    { name: 'بازاریابی', stressLevel: 72, employeeCount: 18, icon: <TrendingUp className="h-4 w-4" /> },
    { name: 'تولید', stressLevel: 81, employeeCount: 36, icon: <Layers className="h-4 w-4" /> },
    { name: 'مالی', stressLevel: 58, employeeCount: 14, icon: <BarChart2 className="h-4 w-4" /> },
  ];

  const getStressColor = (level: number) => {
    if (level < 50) return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
    if (level < 70) return 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400';
    return 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400';
  };

  return (
    <FeatureCard
      title="نقشه استرس سازمانی"
      description="سطح استرس بخش‌های مختلف سازمان"
      icon={<Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
      color="bg-purple-100 dark:bg-purple-900/20"
    >
      <div className="space-y-4">
        {departmentData.map((dept, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 mr-3`}>
              {dept.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{dept.name}</span>
                <span className="text-xs text-muted-foreground">{dept.employeeCount} نفر</span>
              </div>
              <div className="h-8 w-full bg-slate-100 dark:bg-slate-800 rounded-md overflow-hidden">
                <div 
                  className={`h-full flex items-center pl-2 text-xs font-medium ${dept.stressLevel < 50 ? 'bg-green-500' : dept.stressLevel < 70 ? 'bg-amber-500' : 'bg-red-500'} text-white`} 
                  style={{ width: `${dept.stressLevel}%` }}
                >
                  {dept.stressLevel}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 ml-1"></div>
          <span className="text-xs">کم (زیر 50%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-amber-500 ml-1"></div>
          <span className="text-xs">متوسط (50-70%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 ml-1"></div>
          <span className="text-xs">زیاد (بالای 70%)</span>
        </div>
      </div>
    </FeatureCard>
  );
};

// منابع انسانی پیشرفته - مراحل بررسی پزشکی کارکنان
export const EmployeeHealthCheckStatus = () => {
  const checkupStages = [
    { label: 'ثبت‌نام اولیه', completed: 158, total: 180, percentage: 88 },
    { label: 'تکمیل پرسشنامه', completed: 142, total: 180, percentage: 79 },
    { label: 'آزمایش خون', completed: 128, total: 180, percentage: 71 },
    { label: 'معاینه فیزیکی', completed: 115, total: 180, percentage: 64 },
    { label: 'مشاوره پزشک', completed: 98, total: 180, percentage: 54 },
    { label: 'دریافت نتایج', completed: 92, total: 180, percentage: 51 },
  ];

  return (
    <FeatureCard
      title="وضعیت چکاپ سلامت کارکنان"
      description="میزان پیشرفت در فرآیند معاینات دوره‌ای"
      icon={<Clipboard className="h-6 w-6 text-teal-600 dark:text-teal-400" />}
      color="bg-teal-100 dark:bg-teal-900/20"
    >
      <div className="space-y-3">
        {checkupStages.map((stage, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{stage.label}</span>
              <span className="text-xs text-muted-foreground">
                {stage.completed} از {stage.total} نفر ({stage.percentage}%)
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button variant="outline" size="sm" className="w-full">مشاهده جزئیات بیشتر</Button>
      </div>
    </FeatureCard>
  );
};

// منابع انسانی پیشرفته - آمار مرخصی استعلاجی
export const SickLeaveAnalytics = () => {
  const monthlyData = [
    { month: 'فروردین', count: 12, hours: 96 },
    { month: 'اردیبهشت', count: 8, hours: 64 },
    { month: 'خرداد', count: 15, hours: 120 },
    { month: 'تیر', count: 14, hours: 112 },
    { month: 'مرداد', count: 7, hours: 56 },
    { month: 'شهریور', count: 10, hours: 80 },
  ];

  const maxCount = Math.max(...monthlyData.map(d => d.count));

  return (
    <FeatureCard
      title="مرخصی استعلاجی"
      description="آمار مرخصی‌های استعلاجی در ماه‌های اخیر"
      icon={<Briefcase className="h-6 w-6 text-red-600 dark:text-red-400" />}
      color="bg-red-100 dark:bg-red-900/20"
    >
      <div className="pt-4">
        <div className="flex justify-between mb-2">
          <div className="text-xs text-muted-foreground">تعداد</div>
          <div className="text-xs text-muted-foreground">ماه</div>
        </div>
        <div className="space-y-3">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 text-xs text-left">{data.count}</div>
              <div className="flex-1 mx-2">
                <div className="h-5 bg-red-100 dark:bg-red-900/20 rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-red-500 dark:bg-red-600" 
                    style={{ width: `${(data.count / maxCount) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-20 text-xs">{data.month}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-sm font-medium">مجموع ساعات:</div>
          <div className="text-sm font-medium">{monthlyData.reduce((sum, data) => sum + data.hours, 0)} ساعت</div>
        </div>
      </div>
      <div className="mt-4">
        <Button variant="secondary" size="sm" className="w-full">گزارش کامل</Button>
      </div>
    </FeatureCard>
  );
};

// منابع انسانی پیشرفته - سیستم ارزیابی عملکرد کارکنان
export const PerformanceEvaluationWidget = () => {
  const performanceCategories = [
    { title: 'تکمیل شده', count: 32, color: 'bg-green-100 dark:bg-green-900/20', icon: <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" /> },
    { title: 'در جریان', count: 15, color: 'bg-amber-100 dark:bg-amber-900/20', icon: <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" /> },
    { title: 'تاخیر دارد', count: 8, color: 'bg-red-100 dark:bg-red-900/20', icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" /> },
    { title: 'برنامه‌ریزی شده', count: 24, color: 'bg-blue-100 dark:bg-blue-900/20', icon: <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" /> },
  ];

  return (
    <FeatureCard
      title="ارزیابی عملکرد کارکنان"
      description="وضعیت ارزیابی‌های دوره‌ای عملکرد پرسنل"
      icon={<Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
      color="bg-amber-100 dark:bg-amber-900/20"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">ارزیابی جدید</Button>
          <Button variant="primary" size="sm" className="flex-1">گزارش‌ها</Button>
        </div>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        {performanceCategories.map((category, index) => (
          <div key={index} className={`rounded-lg p-3 ${category.color}`}>
            <div className="flex items-center justify-between">
              <div className="font-medium">{category.title}</div>
              {category.icon}
            </div>
            <div className="text-2xl font-bold mt-2">{category.count}</div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm">پیشرفت کلی</span>
          <span className="text-sm font-medium">40%</span>
        </div>
        <Progress value={40} className="h-2" />
      </div>
    </FeatureCard>
  );
};

// منابع انسانی پیشرفته - برنامه‌های آموزشی کارکنان
export const TrainingProgramsWidget = () => {
  const trainingData = [
    { title: 'آموزش ایمنی و بهداشت', participants: 54, completed: 38, daysLeft: 0, status: 'completed' },
    { title: 'مدیریت استرس و تاب‌آوری', participants: 30, completed: 22, daysLeft: 4, status: 'active' },
    { title: 'ارگونومی و سلامت اسکلتی-عضلانی', participants: 45, completed: 27, daysLeft: 7, status: 'active' },
    { title: 'تغذیه و سبک زندگی سالم', participants: 38, completed: 0, daysLeft: 14, status: 'upcoming' },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      case 'active': return 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400';
      case 'upcoming': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
      default: return 'bg-slate-100 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'تکمیل شده';
      case 'active': return 'در حال برگزاری';
      case 'upcoming': return 'پیش رو';
      default: return '';
    }
  };

  return (
    <FeatureCard
      title="برنامه‌های آموزشی کارکنان"
      description="وضعیت دوره‌های آموزشی سلامت و بهداشت"
      icon={<BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
      color="bg-indigo-100 dark:bg-indigo-900/20"
    >
      <div className="space-y-4">
        {trainingData.map((program, index) => (
          <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-lg p-3">
            <div className="flex justify-between">
              <h4 className="font-medium text-sm">{program.title}</h4>
              <Badge className={getStatusColor(program.status)}>
                {getStatusText(program.status)}
              </Badge>
            </div>
            
            <div className="mt-3 flex items-center text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5 mr-1" />
              <span>{program.participants} شرکت‌کننده</span>
              
              {program.status !== 'upcoming' && (
                <>
                  <span className="mx-2">•</span>
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  <span>{program.completed} تکمیل شده</span>
                </>
              )}
              
              {program.status === 'active' && (
                <>
                  <span className="mx-2">•</span>
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{program.daysLeft} روز باقیمانده</span>
                </>
              )}
              
              {program.status === 'upcoming' && (
                <>
                  <span className="mx-2">•</span>
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{program.daysLeft} روز تا شروع</span>
                </>
              )}
            </div>
            
            {program.status === 'active' && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs">پیشرفت</span>
                  <span className="text-xs font-medium">{Math.round((program.completed / program.participants) * 100)}%</span>
                </div>
                <Progress value={Math.round((program.completed / program.participants) * 100)} className="h-1.5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </FeatureCard>
  );
};

// منابع انسانی پیشرفته - ارزیابی‌های روانشناختی
export const PsychologicalAssessmentsWidget = () => {
  const assessmentTypes = [
    { name: 'استرس شغلی', completionRate: 68, threshold: 65, status: 'good' },
    { name: 'رضایت کاری', completionRate: 56, threshold: 70, status: 'warning' },
    { name: 'فرسودگی شغلی', completionRate: 42, threshold: 60, status: 'critical' },
    { name: 'اضطراب و افسردگی', completionRate: 71, threshold: 65, status: 'good' },
  ];

  return (
    <FeatureCard
      title="ارزیابی‌های روانشناختی"
      description="اطلاعات ارزیابی‌های روانشناختی در سازمان"
      icon={<Smile className="h-6 w-6 text-violet-600 dark:text-violet-400" />}
      color="bg-violet-100 dark:bg-violet-900/20"
    >
      <div className="space-y-3">
        {assessmentTypes.map((type, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{type.name}</span>
              <div className="flex items-center">
                <span 
                  className={`text-sm font-medium ${
                    type.status === 'good' ? 'text-green-600 dark:text-green-400' : 
                    type.status === 'warning' ? 'text-amber-600 dark:text-amber-400' : 
                    'text-red-600 dark:text-red-400'
                  }`}
                >
                  {type.completionRate}%
                </span>
                <span className="text-xs text-muted-foreground mr-1">/ هدف {type.threshold}%</span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-2 rounded-full ${
                  type.status === 'good' ? 'bg-green-500' : 
                  type.status === 'warning' ? 'bg-amber-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${type.completionRate}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Button variant="outline" size="sm" className="w-full">
          برنامه‌ریزی ارزیابی جدید
        </Button>
      </div>
    </FeatureCard>
  );
};

// منابع انسانی پیشرفته - سیستم اطلاع‌رسانی سلامت
export const HealthAlertSystemWidget = () => {
  const alerts = [
    { 
      title: 'هشدار افزایش استرس', 
      description: 'افزایش 23% در سطح استرس کارکنان واحد فناوری اطلاعات', 
      severity: 'high',
      time: '3 ساعت پیش',
      unread: true
    },
    { 
      title: 'یادآوری معاینات دوره‌ای', 
      description: '27 نفر از کارکنان هنوز معاینات دوره‌ای را انجام نداده‌اند', 
      severity: 'medium',
      time: '6 ساعت پیش',
      unread: true
    },
    { 
      title: 'برنامه پایش سلامت', 
      description: 'گزارش ماهانه پایش سلامت کارکنان آماده بررسی است', 
      severity: 'low',
      time: '1 روز پیش',
      unread: false
    },
    { 
      title: 'شیوع بیماری فصلی', 
      description: 'افزایش مرخصی‌های استعلاجی به دلیل شیوع آنفولانزا', 
      severity: 'medium',
      time: '2 روز پیش',
      unread: false
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400';
      case 'medium': return 'bg-amber-100 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400';
      case 'low': return 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400';
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'اولویت بالا';
      case 'medium': return 'اولویت متوسط';
      case 'low': return 'اولویت پایین';
      default: return '';
    }
  };

  return (
    <FeatureCard
      title="سیستم هشدار سلامت"
      description="اعلان‌ها و هشدارهای مرتبط با سلامت سازمانی"
      icon={<AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />}
      color="bg-orange-100 dark:bg-orange-900/20"
      actions={
        <Button variant="outline" size="sm" className="w-full">
          مشاهده همه هشدارها
        </Button>
      }
    >
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div key={index} className={`p-3 border rounded-md ${alert.unread ? 'border-primary/30 bg-primary/5' : 'border-slate-200 dark:border-slate-800'}`}>
            <div className="flex justify-between">
              <h4 className="font-medium text-sm flex items-center">
                {alert.unread && <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>}
                {alert.title}
              </h4>
              <Badge className={getSeverityColor(alert.severity)}>
                {getSeverityText(alert.severity)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {alert.description}
            </p>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">{alert.time}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                پیگیری
              </Button>
            </div>
          </div>
        ))}
      </div>
    </FeatureCard>
  );
};

// منابع انسانی پیشرفته - مدیریت فرآیندهای ارجاع پزشکی
export const MedicalReferralWidget = () => {
  const [activeTab, setActiveTab] = useState('pending');
  
  const referrals = {
    pending: [
      { id: 'REF-1042', name: 'علی محمدی', department: 'فنی', type: 'متخصص ارتوپد', date: '1402/02/15', status: 'در انتظار تایید' },
      { id: 'REF-1039', name: 'مریم کریمی', department: 'مالی', type: 'روانشناس', date: '1402/02/12', status: 'در انتظار تایید' },
    ],
    approved: [
      { id: 'REF-1035', name: 'محمد حسینی', department: 'فناوری اطلاعات', type: 'متخصص قلب', date: '1402/02/08', status: 'تایید شده' },
      { id: 'REF-1031', name: 'سارا علوی', department: 'بازاریابی', type: 'متخصص چشم', date: '1402/02/05', status: 'تایید شده' },
    ],
    completed: [
      { id: 'REF-1024', name: 'رضا تقوی', department: 'منابع انسانی', type: 'فیزیوتراپی', date: '1402/01/22', status: 'انجام شده' },
      { id: 'REF-1018', name: 'فاطمه میرزایی', department: 'فروش', type: 'متخصص تغذیه', date: '1402/01/15', status: 'انجام شده' },
    ]
  };

  return (
    <FeatureCard
      title="مدیریت ارجاعات پزشکی"
      description="مدیریت فرآیندهای ارجاع کارکنان به پزشکان متخصص"
      icon={<UserCheck className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />}
      color="bg-cyan-100 dark:bg-cyan-900/20"
    >
      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="pending" className="text-xs">در انتظار تایید</TabsTrigger>
          <TabsTrigger value="approved" className="text-xs">تایید شده</TabsTrigger>
          <TabsTrigger value="completed" className="text-xs">انجام شده</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="mt-4">
          <div className="space-y-2">
            {referrals.pending.map((referral, index) => (
              <div key={index} className="p-3 border border-slate-200 dark:border-slate-800 rounded-md">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary mr-2">
                      {referral.name.substring(0, 1)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{referral.name}</div>
                      <div className="text-xs text-muted-foreground">{referral.department} • {referral.type}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="h-6">
                    {referral.id}
                  </Badge>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-xs text-muted-foreground">تاریخ درخواست: {referral.date}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">رد</Button>
                    <Button variant="primary" size="sm" className="h-7 px-2 text-xs">تایید</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="approved" className="mt-4">
          <div className="space-y-2">
            {referrals.approved.map((referral, index) => (
              <div key={index} className="p-3 border border-slate-200 dark:border-slate-800 rounded-md">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-2">
                      {referral.name.substring(0, 1)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{referral.name}</div>
                      <div className="text-xs text-muted-foreground">{referral.department} • {referral.type}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="h-6">
                    {referral.id}
                  </Badge>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-xs text-muted-foreground">تاریخ تایید: {referral.date}</span>
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs">پیگیری وضعیت</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="space-y-2">
            {referrals.completed.map((referral, index) => (
              <div key={index} className="p-3 border border-slate-200 dark:border-slate-800 rounded-md">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-2">
                      {referral.name.substring(0, 1)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{referral.name}</div>
                      <div className="text-xs text-muted-foreground">{referral.department} • {referral.type}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="h-6">
                    {referral.id}
                  </Badge>
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-xs text-muted-foreground">تاریخ انجام: {referral.date}</span>
                  <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">مشاهده گزارش</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </FeatureCard>
  );
};

// منابع انسانی پیشرفته - آمار غیبت کارکنان
export const AbsenteeismAnalyticsWidget = () => {
  return (
    <FeatureCard
      title="آمار غیبت کارکنان"
      description="تحلیل غیبت‌ها و دلایل آن در بخش‌های مختلف"
      icon={<Clock className="h-6 w-6 text-rose-600 dark:text-rose-400" />}
      color="bg-rose-100 dark:bg-rose-900/20"
    >
      <div className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium">روند غیبت‌ها (30 روز اخیر)</h4>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] h-8 text-xs">
              <SelectValue placeholder="همه بخش‌ها" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه بخش‌ها</SelectItem>
              <SelectItem value="it">فناوری اطلاعات</SelectItem>
              <SelectItem value="hr">منابع انسانی</SelectItem>
              <SelectItem value="marketing">بازاریابی</SelectItem>
              <SelectItem value="finance">مالی</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-40 relative overflow-hidden">
          {/* Simple chart visualization */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
              <path
                d="M0,50 C20,40 40,80 60,70 C80,60 100,30 120,40 C140,50 160,20 180,30 C200,40 220,60 240,50 C260,40 280,55 300,50"
                fill="none"
                stroke="rgba(244, 63, 94, 0.5)"
                strokeWidth="2"
              />
              <path
                d="M0,50 C20,40 40,80 60,70 C80,60 100,30 120,40 C140,50 160,20 180,30 C200,40 220,60 240,50 C260,40 280,55 300,50"
                fill="rgba(244, 63, 94, 0.1)"
                strokeWidth="0"
              />
            </svg>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <div className="text-xs text-muted-foreground">میانگین روزانه</div>
            <div className="text-xl font-bold mt-1">4.2%</div>
            <div className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
              <ArrowDown className="h-3 w-3 ml-1" />
              1.3% نسبت به ماه قبل
            </div>
          </div>
          
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
            <div className="text-xs text-muted-foreground">بیشترین دلیل</div>
            <div className="text-md font-bold mt-1">بیماری (68%)</div>
            <div className="text-xs text-rose-600 dark:text-rose-400 flex items-center mt-1">
              <ArrowUp className="h-3 w-3 ml-1" />
              5.2% نسبت به ماه قبل
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">توزیع دلایل غیبت</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>بیماری</span>
                <span>68%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>مشکلات خانوادگی</span>
                <span>14%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '14%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>فرسودگی شغلی</span>
                <span>12%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>سایر دلایل</span>
                <span>6%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '6%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FeatureCard>
  );
};

// Eye component for view count
const Eye = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);