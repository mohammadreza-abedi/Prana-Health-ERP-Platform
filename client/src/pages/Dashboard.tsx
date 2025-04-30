import React, { useState, useEffect } from 'react';
import { HealthSummaryIsland } from '@/components/islands/HealthSummaryIsland';
import { TeamHealthIsland } from '@/components/islands/TeamHealthIsland';
import { HSEPerformanceIsland } from '@/components/islands/HSEPerformanceIsland';
import { 
  Activity, AlertTriangle, Battery, Clock, Calendar, ChevronDown, 
  Cloud, CloudSun, Database, Heart, HelpCircle, Info, LifeBuoy,
  Lock, Power, RefreshCw, Save, Settings, Shield, Signal, 
  Terminal, Thermometer, TrendingUp, Users, Wifi, ArrowUpRight,
  Bell, Search, Menu, Check, CheckCheck, Zap, GitBranch, LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * داشبورد فضایی پیشرفته با گلسمورفیسم و نورپردازی تعاملی
 * طراحی 2025 با استفاده از 100 فیچر پیشرفته با لیوت جزیره‌ای
 */
const Dashboard = () => {
  const currentDate = new Date();
  
  // وضعیت‌های سیستم
  const [systemHealth, setSystemHealth] = useState(94);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memoryUsage, setMemoryUsage] = useState(56);
  const [networkStatus, setNetworkStatus] = useState(78);
  const [powerLevel, setPowerLevel] = useState(87);
  const [securityLevel, setSecurityLevel] = useState(95);
  const [envTemperature, setEnvTemperature] = useState(22);
  const [envHumidity, setEnvHumidity] = useState(45);
  
  // وضعیت‌های رابط کاربری
  const [processingData, setProcessingData] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  
  // فرمت تاریخ به فارسی
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  const formattedDate = `${currentDate.getDate()} ${persianMonths[currentDate.getMonth()]} ${1403}`;
  
  // داده‌های مثال برای اعلان‌ها
  const notifications = [
    { id: 1, text: 'پیام جدید از مدیر HSE: بروزرسانی دستورالعمل‌های ایمنی', time: '14:35', isNew: true },
    { id: 2, text: 'نتایج چکاپ سلامت شما آماده است', time: '12:03', isNew: true },
    { id: 3, text: 'فرم ارزیابی استرس هفتگی را تکمیل کنید', time: '09:15', isNew: false },
  ];
  
  // داده‌های مثال برای تسک‌ها
  const upcomingTasks = [
    { id: 1, title: 'دوره آموزشی ایمنی محیط کار', date: '1403/02/15', priority: 'high' },
    { id: 2, title: 'تست سلامت فصلی', date: '1403/02/20', priority: 'medium' },
    { id: 3, title: 'کارگاه مدیریت استرس', date: '1403/02/25', priority: 'low' },
  ];
  
  // داده‌های لاگ سیستم
  const [systemLogs, setSystemLogs] = useState([
    { time: '14:42:19', message: 'سیستم ردیابی سلامت فعال شد', status: 'success' },
    { time: '14:38:55', message: 'به‌روزرسانی ماژول HSE تکمیل شد', status: 'info' },
    { time: '14:32:14', message: 'اتصال به سرورهای مرکزی برقرار شد', status: 'success' },
    { time: '14:28:00', message: 'هشدار: نوسان در سطح اکسیژن محیطی', status: 'warning' },
    { time: '14:24:37', message: 'راه‌اندازی سیستم فضاپیما موفقیت‌آمیز بود', status: 'success' }
  ]);
  
  // شبیه‌سازی تغییرات در وضعیت سیستم برای افکت دینامیک
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(prev => Math.max(30, Math.min(85, prev + (Math.random() * 6 - 3))));
      setMemoryUsage(prev => Math.max(40, Math.min(90, prev + (Math.random() * 4 - 2))));
      setNetworkStatus(prev => Math.max(60, Math.min(95, prev + (Math.random() * 5 - 2.5))));
      setPowerLevel(prev => Math.max(80, Math.min(98, prev + (Math.random() * 3 - 1.5))));
    }, 3000);
    
    return () => clearInterval(timer);
  }, []);
  
  // شبیه‌سازی اسکن سیستم
  const handleSystemScan = () => {
    setProcessingData(true);
    setScanActive(true);
    
    // شبیه‌سازی زمان اسکن
    setTimeout(() => {
      // افزودن نتیجه اسکن به لاگ‌ها
      setSystemLogs(prev => [
        { time: new Date().toLocaleTimeString('fa-IR'), message: 'اسکن سیستم تکمیل شد - هیچ تهدیدی یافت نشد', status: 'success' },
        ...prev
      ]);
      
      setProcessingData(false);
      
      // اسکنر برای مدتی فعال بماند
      setTimeout(() => setScanActive(false), 2000);
    }, 3500);
  };

  return (
    <div className="min-h-screen">
      {/* نوار بالایی داشبورد با اطلاعات و اکشن‌ها */}
      <div className="glass py-4 px-6 rounded-2xl backdrop-blur-xl border border-white/20 dark:border-slate-700/30 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">داشبورد سلامت</h1>
              <span className="glass-island tiffany ml-3 px-2 py-1 rounded-lg text-xs font-bold text-tiffany">PRO</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center">
              <Calendar className="w-4 h-4 ml-1" /> 
              {formattedDate} | 
              <Clock className="w-4 h-4 mx-1" />
              سال کاری 1403
            </p>
          </div>
          
          <div className="flex mt-4 md:mt-0 w-full md:w-auto gap-2">
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="جستجو..." 
                className="glass w-full py-2 px-4 pl-10 rounded-xl backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-tiffany/50 focus:border-transparent border border-white/20 dark:border-slate-700/30"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            </div>
            
            <div className="relative">
              <button className="glass p-2 rounded-xl backdrop-blur-sm hover:bg-white/10 dark:hover:bg-slate-700/40 transition-colors border border-white/20 dark:border-slate-700/30 relative">
                <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  2
                </span>
              </button>
              
              {/* منوی اعلان‌ها */}
              <div className="absolute top-12 right-0 w-80 p-3 glass-island rounded-xl shadow-lg z-30 hidden group-hover:block">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm">اعلان‌ها</h3>
                  <button className="text-xs text-tiffany">علامت‌گذاری همه</button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`p-2 rounded-lg ${notification.isNew ? 'glass bg-white/40 dark:bg-slate-700/40' : 'hover:bg-white/5 dark:hover:bg-slate-700/20'}`}
                    >
                      <div className="flex">
                        {notification.isNew && (
                          <span className="w-2 h-2 mt-1.5 mr-1 rounded-full bg-tiffany"></span>
                        )}
                        <div className="flex-1">
                          <p className="text-xs">{notification.text}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <a href="#" className="text-xs text-tiffany flex items-center justify-center">
                    مشاهده همه
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  </a>
                </div>
              </div>
            </div>
            
            <button className="glass p-2 rounded-xl backdrop-blur-sm hover:bg-white/10 dark:hover:bg-slate-700/40 transition-colors border border-white/20 dark:border-slate-700/30">
              <LifeBuoy className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            
            <button className="glass p-2 rounded-xl backdrop-blur-sm hover:bg-white/10 dark:hover:bg-slate-700/40 transition-colors border border-white/20 dark:border-slate-700/30 md:hidden">
              <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>
      </div>
      
      {/* لیوت اصلی جزیره‌ای با گرید سیستم */}
      <div className="islands-container grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* ستون اصلی */}
        <div className="lg:col-span-8 space-y-6">
          {/* جزیره خلاصه وضعیت سلامت فردی */}
          <HealthSummaryIsland />
          
          {/* جزیره عملکرد HSE */}
          <HSEPerformanceIsland />
          
          {/* جزیره نقشه حرارتی سلامت سازمانی */}
          <div className="glass-island tiffany p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">نقشه حرارتی سلامت سازمانی</h3>
              <Button variant="outline" size="sm" className="text-xs">
                تغییر نمای نقشه
              </Button>
            </div>
            
            <div className="bg-white/10 dark:bg-slate-800/20 rounded-xl h-96 p-4 flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-500 dark:text-slate-400 text-sm">نقشه سلامت سازمانی اینجا نمایش داده می‌شود.</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">این بخش در بروزرسانی بعدی اضافه خواهد شد.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* ستون کناری */}
        <div className="lg:col-span-4 space-y-6">
          {/* جزیره سلامت تیمی */}
          <TeamHealthIsland />
          
          {/* جزیره وظایف آینده */}
          <div className="glass-island amber p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">وظایف پیش‌رو</h3>
              <button className="glass px-2 py-1 rounded-lg text-xs text-tiffany font-medium">+ افزودن</button>
            </div>
            
            <div className="space-y-3">
              {upcomingTasks.map(task => (
                <div key={task.id} className="glass p-3 rounded-xl relative overflow-hidden">
                  <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                    task.priority === 'high' ? 'bg-rose-500' :
                    task.priority === 'medium' ? 'bg-amber-500' :
                    'bg-emerald-500'
                  }`}></div>
                  <h4 className="text-sm font-medium text-slate-800 dark:text-white mb-2 pr-1">{task.title}</h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center">
                      <Calendar className="w-3 h-3 ml-1" />
                      {task.date}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      task.priority === 'high' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' :
                      task.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    }`}>
                      {task.priority === 'high' ? 'ضروری' :
                       task.priority === 'medium' ? 'متوسط' :
                       'عادی'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 text-center">
              <a href="#" className="text-xs text-slate-600 dark:text-slate-400 hover:text-tiffany dark:hover:text-tiffany transition-colors flex items-center justify-center">
                نمایش همه وظایف
                <ArrowUpRight className="w-3 h-3 mr-1" />
              </a>
            </div>
          </div>
          
          {/* جزیره اطلاعات شخصی و پروفایل */}
          <div className="glass-island purple p-5 rounded-2xl">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tiffany to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                ع‌م
              </div>
              <div className="mr-3">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">علی محمدی</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">مهندس ارشد HSE</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="glass p-3 rounded-xl text-center">
                <span className="text-2xl font-bold text-purple-500">۸۵</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">امتیاز سلامت</p>
              </div>
              <div className="glass p-3 rounded-xl text-center">
                <span className="text-2xl font-bold text-tiffany">۱۲</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">چالش‌های فعال</p>
              </div>
            </div>
            
            <div className="glass p-3 rounded-xl mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">تکمیل پروفایل شما</span>
                <span className="text-xs font-medium text-tiffany">۸۵٪</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="bg-tiffany h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              مشاهده پروفایل کامل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;