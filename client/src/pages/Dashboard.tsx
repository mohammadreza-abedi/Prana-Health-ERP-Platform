import React, { useState, useEffect, useRef } from 'react';
import { HealthSummaryIsland } from '@/components/islands/HealthSummaryIsland';
import { TeamHealthIsland } from '@/components/islands/TeamHealthIsland';
import { HSEPerformanceIsland } from '@/components/islands/HSEPerformanceIsland';
import { 
  LineChart as ReLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar
} from 'recharts';
import { 
  Activity, AlertTriangle, AlertCircle, Battery, BatteryFull, BatteryMedium, BatteryLow,
  Clock, Calendar, ChevronDown, Circle, CircleCheck, CircleDashed, CircleDot, 
  Cloud, CloudSun, CloudRain, Compass, Cpu, Crosshair, Database, Diamond, 
  FileLineChart, Flame, GitBranch, GitGraph, 
  HardDrive, Heart, HelpCircle, HelpingHand, Info, Laptop, 
  Lock, LockKeyhole, Maximize, Menu, MessageSquare, Minimize, MonitorSmartphone,
  Network, PanelTopOpen, PlayCircle, Plug, PlusSquare, Power, 
  RefreshCw, Save, Settings, Shield, ShieldCheck, ShieldAlert, Signal, 
  Star, SunMedium, Sunrise, Sunset, StopCircle, Target, 
  Terminal, Thermometer, ToggleLeft, ToggleRight, TrendingUp, Users, Wifi, Zap, 
  Bell, Search, Layers, X, XCircle, ArrowUpRight,
  LineChart as LucideLineChart
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
  const [activeTab, setActiveTab] = useState('dashboard'); // برای مدیریت تب فعال
  const [hoverTab, setHoverTab] = useState(''); // برای افکت hover روی تب‌ها
  
  // فرمت تاریخ به فارسی
  const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  const formattedDate = `${currentDate.getDate()} ${persianMonths[currentDate.getMonth()]} ${1403}`;
  
  // تب‌های اصلی داشبورد
  const mainTabs = [
    { id: 'dashboard', label: 'داشبورد', icon: <Layers className="w-4 h-4 ml-1.5" /> },
    { id: 'health', label: 'سلامت فردی', icon: <Heart className="w-4 h-4 ml-1.5" /> },
    { id: 'team', label: 'سلامت تیمی', icon: <Users className="w-4 h-4 ml-1.5" /> },
    { id: 'hse', label: 'HSE', icon: <Shield className="w-4 h-4 ml-1.5" /> },
    { id: 'analytics', label: 'آنالیتیکس', icon: <LucideLineChart className="w-4 h-4 ml-1.5" /> },
    { id: 'challenges', label: 'چالش‌ها', icon: <Target className="w-4 h-4 ml-1.5" /> },
    { id: 'reports', label: 'گزارشات', icon: <FileLineChart className="w-4 h-4 ml-1.5" /> },
  ];
  
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
      {/* نوار بالایی داشبورد با استایل پنل فضاپیمایی */}
      <div className="spacecraft-panel py-4 px-6 rounded-2xl mb-6 relative overflow-hidden">
        {/* اثرات پیشرفته */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tiffany/40 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-2 w-1 bg-gradient-to-b from-transparent via-tiffany/30 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-2 w-1 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tiffany/30 to-transparent"></div>
        
        <div className="absolute left-12 top-0 flex space-x-2 space-x-reverse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-1 w-4 bg-tiffany/20 dark:bg-tiffany/30 rounded-b-full" 
              style={{ height: `${(i) * 2}px`, opacity: 0.4 + (i * 0.1) }}></div>
          ))}
        </div>
        
        <div className="absolute right-12 top-0 flex space-x-2 space-x-reverse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-1 w-4 bg-purple-500/20 dark:bg-purple-500/30 rounded-b-full" 
              style={{ height: `${(6-i) * 2}px`, opacity: 0.4 + ((5-i) * 0.1) }}></div>
          ))}
        </div>
        
        {/* Pulse indicators */}
        <div className="absolute left-3 top-1/2 w-2 h-2 rounded-full bg-tiffany/40 pulse-glow"></div>
        <div className="absolute right-3 top-1/2 w-2 h-2 rounded-full bg-purple-500/40 pulse-glow"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
          <div className="flex items-center">
            <div className="flex flex-col">
              <div className="flex items-center">
                <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-600/30 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-tiffany mr-1" />
                  <h1 className="text-xl font-extrabold text-white">سیستم پایش سلامت فضایی</h1>
                </div>
                <div className="flex items-center ml-3 bg-tiffany/10 px-2 py-1 rounded-lg border border-tiffany/20">
                  <CircleCheck className="h-3 w-3 text-tiffany ml-1" />
                  <span className="text-xs text-tiffany font-medium">آنلاین</span>
                </div>
              </div>
              
              <div className="flex items-center mt-2 text-sm text-slate-400">
                <div className="flex items-center bg-slate-800/40 px-2 py-1 rounded-lg border border-slate-700/30 ml-2">
                  <Calendar className="w-3.5 h-3.5 ml-1 text-amber-400" /> 
                  <span className="text-amber-300">{formattedDate}</span>
                </div>
                <div className="flex items-center bg-slate-800/40 px-2 py-1 rounded-lg border border-slate-700/30 ml-2">
                  <Clock className="w-3.5 h-3.5 ml-1 text-sky-400" />
                  <span className="text-sky-300">{new Date().toLocaleTimeString('fa-IR')}</span>
                </div>
                <div className="flex items-center bg-slate-800/40 px-2 py-1 rounded-lg border border-slate-700/30">
                  <Signal className="w-3.5 h-3.5 ml-1 text-emerald-400" />
                  <span className="text-emerald-300">وضعیت: عالی</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex mt-4 md:mt-0 w-full md:w-auto gap-2">
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="جستجو در سیستم..." 
                className="bg-slate-800/50 py-2 px-4 pl-10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-tiffany focus:border-tiffany/30 border border-slate-700/60 text-tiffany-light"
              />
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-tiffany/70" />
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="control-button p-2 rounded-lg relative inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-tiffany/50 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                      2
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>اعلان‌های جدید</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="control-button p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-tiffany/50 inline-flex items-center justify-center">
                    <HelpingHand className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>راهنمای سیستم</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="control-button p-2 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-tiffany/50 inline-flex items-center justify-center">
                    <Menu className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>منوی اصلی</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* نوار زیرین با وضعیت‌های سیستم */}
        <div className="mt-4 grid grid-cols-4 md:grid-cols-7 gap-2 pt-3 border-t border-slate-700/30">
          <div className="spacecraft-mini-stat">
            <div className="stat-icon health">
              <Heart className="w-3 h-3" />
            </div>
            <span className="stat-value">۹۴٪</span>
            <span className="stat-label">سلامت</span>
          </div>
          
          <div className="spacecraft-mini-stat">
            <div className="stat-icon cpu">
              <Cpu className="w-3 h-3" />
            </div>
            <span className="stat-value">{cpuUsage}٪</span>
            <span className="stat-label">CPU</span>
          </div>
          
          <div className="spacecraft-mini-stat">
            <div className="stat-icon memory">
              <Database className="w-3 h-3" />
            </div>
            <span className="stat-value">{memoryUsage}٪</span>
            <span className="stat-label">حافظه</span>
          </div>
          
          <div className="spacecraft-mini-stat">
            <div className="stat-icon network">
              <Wifi className="w-3 h-3" />
            </div>
            <span className="stat-value">{networkStatus}٪</span>
            <span className="stat-label">شبکه</span>
          </div>
          
          <div className="spacecraft-mini-stat hidden md:flex">
            <div className="stat-icon power">
              <Zap className="w-3 h-3" />
            </div>
            <span className="stat-value">{powerLevel}٪</span>
            <span className="stat-label">انرژی</span>
          </div>
          
          <div className="spacecraft-mini-stat hidden md:flex">
            <div className="stat-icon temp">
              <Thermometer className="w-3 h-3" />
            </div>
            <span className="stat-value">{envTemperature}°C</span>
            <span className="stat-label">دما</span>
          </div>
          
          <div className="spacecraft-mini-stat hidden md:flex">
            <div className="stat-icon security">
              <Lock className="w-3 h-3" />
            </div>
            <span className="stat-value">{securityLevel}٪</span>
            <span className="stat-label">امنیت</span>
          </div>
        </div>
      </div>
      
      {/* تب‌بار پیشرفته */}
      <div className="spacecraft-panel mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        
        <div className="tabs-container flex overflow-x-auto">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-3 flex items-center whitespace-nowrap relative border-b-2 transition-all duration-300 ${
                activeTab === tab.id 
                  ? "text-white border-tiffany font-medium" 
                  : "text-slate-400 border-transparent hover:text-slate-300 hover:border-slate-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoverTab(tab.id)}
              onMouseLeave={() => setHoverTab('')}
            >
              {tab.icon}
              <span>{tab.label}</span>
              
              {/* Glow effect on hover/active */}
              {(activeTab === tab.id || hoverTab === tab.id) && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-tiffany/50 blur-sm"></div>
              )}
            </button>
          ))}
        </div>
        
        {/* آمار و وضعیت فیچرهای فعال */}
        <div className="py-2 px-4 bg-slate-800/40 border-t border-slate-700/30 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center">
              <Cpu className="w-3 h-3 ml-1 text-tiffany" />
              <span className="text-slate-300">دسترسی به <span className="text-tiffany font-medium">238</span> فیچر فعال</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="w-3 h-3 ml-1 text-emerald-400" />
              <span className="text-slate-300">همه سیستم‌ها <span className="text-emerald-400 font-medium">آنلاین</span></span>
            </div>
          </div>
          
          <div>
            <button className="text-slate-400 hover:text-white transition-colors">
              تنظیمات داشبورد <Settings className="w-3 h-3 mr-1 inline-block" />
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
          
          {/* پنل کنترل سیستم */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* نشانگرهای دیجیتال سیستم - ردیف اول */}
            <div className="glass-island deep-space p-4 rounded-2xl">
              <div className="flex items-center mb-3">
                <div className="p-2 rounded-full bg-white/10">
                  <Shield className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-base font-bold mr-2 text-white">وضعیت سیستم</h3>
                <div className="mr-auto">
                  <div className="control-indicator active pulse-glow" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="spacecraft-gauge">
                  <div className="gauge-label flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-300 font-medium">سلامت سیستم</span>
                    <span className="text-xs text-emerald-400">{systemHealth}%</span>
                  </div>
                  <div className="gauge-wrapper">
                    <div className="gauge-base"></div>
                    <div className="gauge-fill" style={{ transform: `rotate(${systemHealth * 1.8}deg)` }}></div>
                    <div className="gauge-center">
                      <Heart className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                </div>
                
                <div className="spacecraft-gauge">
                  <div className="gauge-label flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-300 font-medium">شبکه</span>
                    <span className="text-xs text-tiffany">{networkStatus}%</span>
                  </div>
                  <div className="gauge-wrapper">
                    <div className="gauge-base"></div>
                    <div className="gauge-fill tiffany-fill" style={{ transform: `rotate(${networkStatus * 1.8}deg)` }}></div>
                    <div className="gauge-center">
                      <Signal className="w-3.5 h-3.5 text-tiffany" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="spacecraft-gauge">
                  <div className="gauge-label flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-300 font-medium">امنیت</span>
                    <span className="text-xs text-purple-400">{securityLevel}%</span>
                  </div>
                  <div className="gauge-wrapper">
                    <div className="gauge-base"></div>
                    <div className="gauge-fill purple-fill" style={{ transform: `rotate(${securityLevel * 1.8}deg)` }}></div>
                    <div className="gauge-center">
                      <Lock className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                  </div>
                </div>
                
                <div className="spacecraft-gauge">
                  <div className="gauge-label flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-300 font-medium">قدرت</span>
                    <span className="text-xs text-amber-400">{powerLevel}%</span>
                  </div>
                  <div className="gauge-wrapper">
                    <div className="gauge-base"></div>
                    <div className="gauge-fill amber-fill" style={{ transform: `rotate(${powerLevel * 1.8}deg)` }}></div>
                    <div className="gauge-center">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-700/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="system-control">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">CPU</span>
                      <span className="text-xs text-tiffany flex items-center">
                        {cpuUsage}%
                        <GitBranch className="h-3 w-3 ml-1 text-tiffany-light" />
                      </span>
                    </div>
                    <Progress value={cpuUsage} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-gradient-to-r from-tiffany-light to-tiffany" />
                  </div>
                  
                  <div className="system-control">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">MEM</span>
                      <span className="text-xs text-purple-400 flex items-center">
                        {memoryUsage}%
                        <Database className="h-3 w-3 ml-1 text-purple-300" />
                      </span>
                    </div>
                    <Progress value={memoryUsage} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-gradient-to-r from-purple-300 to-purple-500" />
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleSystemScan}
                disabled={processingData}
                className="w-full mt-4 bg-gradient-to-r from-purple-500/80 to-tiffany/80 hover:from-purple-500 hover:to-tiffany border-none text-white flex items-center justify-center space-x-2 space-x-reverse"
              >
                <RefreshCw className={`w-4 h-4 ml-2 ${processingData ? 'animate-spin' : ''}`} />
                اسکن سیستم
              </Button>
            </div>

            {/* نمایش پنل لاگ سیستم پیشرفته فضاپیمایی */}
            <div className="spacecraft-panel p-4 rounded-2xl relative overflow-hidden">
              {/* اثرات پیشرفته */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500/40 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-2 w-1 bg-gradient-to-b from-transparent via-sky-400/30 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-2 w-1 bg-gradient-to-b from-transparent via-indigo-500/30 to-transparent"></div>
              
              {/* خط اسکن برای افکت لاگ */}
              <div className="scanner-line" style={{ animationDuration: '8s' }}></div>
              
              {/* Radar effect background */}
              {scanActive && (
                <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden z-0">
                  <div className="radar-scanner" style={{ animationDuration: '3s' }}></div>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg flex items-center justify-center bg-slate-800/60">
                    <Terminal className="h-5 w-5 text-sky-400" />
                    <h3 className="text-base font-bold mr-2 text-white">سیستم لاگ فضاپیما</h3>
                  </div>
                  
                  <div className="flex items-center mr-3 bg-sky-500/10 rounded-lg border border-sky-500/20 px-2 py-0.5">
                    <span className="ml-1 text-xs font-medium text-sky-400">{systemLogs.length} پیام</span>
                    {processingData && <RefreshCw className="h-3 w-3 text-sky-400 animate-spin" />}
                  </div>
                </div>
                
                <div className="flex space-x-2 space-x-reverse">
                  <div className="control-indicator active pulse-glow"></div>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => setShowTerminal(!showTerminal)}
                          className="control-button p-1.5 h-7 w-7 flex items-center justify-center"
                        >
                          {showTerminal ? <ChevronDown className="h-4 w-4 transform rotate-180" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{showTerminal ? 'بستن ترمینال' : 'گسترش ترمینال'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="control-button p-1.5 h-7 w-7 flex items-center justify-center">
                          <Save className="h-4 w-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ذخیره لاگ‌ها</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <div className="terminal-frame bg-slate-900/60 border border-slate-700/50 rounded-xl p-2 mt-2 relative overflow-hidden">
                {/* Glowing borders for terminal */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"></div>
                
                <div className={`space-y-0.5 overflow-hidden transition-all duration-500 ${showTerminal ? 'h-64' : 'h-32'}`}>
                  <div className="terminal-logs overflow-y-auto h-full pr-1 font-mono text-xs space-y-1">
                    {systemLogs.map((log, index) => (
                      <div key={index} className="log-entry py-1 flex items-start">
                        <div className="flex-shrink-0 text-[10px] text-slate-500 ml-2 tabular-nums w-14">{log.time}</div>
                        <div className={`rounded-full w-2 h-2 mt-1 mr-1 ml-2 flex-shrink-0 ${
                          log.status === 'success' ? 'bg-emerald-500/80' : 
                          log.status === 'warning' ? 'bg-amber-500/80' :
                          log.status === 'error' ? 'bg-rose-500/80' :
                          'bg-sky-500/80'
                        }`}></div>
                        <div className="flex-1">
                          <span className={`
                            ${log.status === 'success' ? 'text-emerald-300' : 
                              log.status === 'warning' ? 'text-amber-300' :
                              log.status === 'error' ? 'text-rose-300' :
                              'text-sky-300'}
                          `}>{log.message}</span>
                        </div>
                      </div>
                    ))}
                    
                    {processingData && (
                      <div className="log-entry py-1 flex items-start">
                        <div className="flex-shrink-0 text-[10px] text-slate-500 ml-2 tabular-nums w-14">{new Date().toLocaleTimeString('fa-IR')}</div>
                        <div className="rounded-full w-2 h-2 mt-1 mr-1 ml-2 flex-shrink-0 bg-tiffany animate-pulse"></div>
                        <div className="flex-1 text-tiffany">
                          در حال اسکن سیستم...
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Cursor line */}
                <div className="flex items-center mt-2 pt-2 border-t border-slate-700/30">
                  <span className="text-tiffany text-xs ml-1">$</span>
                  <div className="h-4 w-px bg-tiffany animate-pulse"></div>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-3">
                <Button 
                  onClick={handleSystemScan}
                  disabled={processingData}
                  variant="outline" 
                  size="sm"
                  className="text-xs bg-slate-800/60 border-slate-700/50 hover:bg-sky-900/30 hover:text-sky-400 hover:border-sky-500/50 text-slate-300"
                >
                  <RefreshCw className={`w-3 h-3 ml-1.5 ${processingData ? 'animate-spin' : ''}`} />
                  اسکن سیستم
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs bg-slate-800/60 border-slate-700/50 hover:bg-indigo-900/30 hover:text-indigo-400 hover:border-indigo-500/50 text-slate-300"
                >
                  <Network className="w-3 h-3 ml-1.5" />
                  تست اتصال
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs bg-slate-800/60 border-slate-700/50 hover:bg-rose-900/30 hover:text-rose-400 hover:border-rose-500/50 text-slate-300"
                >
                  <X className="w-3 h-3 ml-1.5" />
                  پاک کردن لاگ
                </Button>
              </div>
            </div>
          </div>
          
          {/* جزیره نقشه حرارتی سلامت سازمانی با نمودارهای پیشرفته */}
          <div className="spacecraft-panel p-5 rounded-2xl mt-6 relative overflow-hidden">
            {/* اثرات پیشرفته */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
            <div className="absolute top-0 bottom-0 right-2 w-1 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"></div>
            <div className="absolute top-0 bottom-0 left-2 w-1 bg-gradient-to-b from-transparent via-sky-500/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center">
                <div className="p-2 rounded-lg bg-slate-800/60 flex items-center">
                  <Activity className="h-5 w-5 text-blue-400 ml-1.5" />
                  <h3 className="text-lg font-bold text-white">نقشه حرارتی سلامت سازمانی</h3>
                </div>
                
                <div className="mr-3 bg-slate-800/40 px-2 py-1 text-xs text-slate-300 rounded-lg border border-slate-700/40">
                  به‌روزرسانی: امروز ۱۴:۳۰
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs bg-slate-800/60 border-slate-700/50 hover:bg-blue-900/30 hover:text-blue-400 hover:border-blue-500/50 text-slate-300">
                  <LucideLineChart className="w-3 h-3 ml-1.5" />
                  تغییر نمای نقشه
                </Button>
                
                <Button variant="outline" size="sm" className="text-xs bg-slate-800/60 border-slate-700/50 hover:bg-tiffany/20 hover:text-tiffany hover:border-tiffany/50 text-slate-300">
                  <Activity className="w-3 h-3 ml-1.5" />
                  بروزرسانی آنی
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* نمودار خطی پیشرفته */}
              <div className="lg:col-span-2 spacecraft-chart bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-white">روند سلامت سازمانی</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-tiffany ml-1"></div>
                      <span className="text-xs text-slate-300">HSE</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-400 ml-1"></div>
                      <span className="text-xs text-slate-300">فیزیکی</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-400 ml-1"></div>
                      <span className="text-xs text-slate-300">روانی</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-64 p-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart
                      data={[
                        { name: 'فروردین', hse: 65, physical: 78, mental: 62 },
                        { name: 'اردیبهشت', hse: 59, physical: 73, mental: 65 },
                        { name: 'خرداد', hse: 80, physical: 75, mental: 71 },
                        { name: 'تیر', hse: 81, physical: 80, mental: 74 },
                        { name: 'مرداد', hse: 76, physical: 77, mental: 82 },
                        { name: 'شهریور', hse: 85, physical: 78, mental: 76 },
                        { name: 'مهر', hse: 87, physical: 82, mental: 79 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                      <ReTooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} 
                        itemStyle={{ color: '#e2e8f0' }}
                        labelStyle={{ color: 'white', fontWeight: 'bold' }}
                      />
                      <Legend wrapperStyle={{ color: '#e2e8f0', fontSize: 12 }} />
                      <Line 
                        type="monotone" 
                        dataKey="hse" 
                        name="HSE" 
                        stroke="#5eead4" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} 
                        activeDot={{ r: 6, fill: '#5eead4', stroke: '#0f172a' }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="physical" 
                        name="فیزیکی" 
                        stroke="#60a5fa" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} 
                        activeDot={{ r: 6, fill: '#60a5fa', stroke: '#0f172a' }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="mental" 
                        name="روانی" 
                        stroke="#c084fc" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }} 
                        activeDot={{ r: 6, fill: '#c084fc', stroke: '#0f172a' }}
                      />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* رادار چارت سلامت سازمانی */}
              <div className="spacecraft-chart bg-slate-800/40 rounded-xl p-3 border border-slate-700/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-white">مقایسه ابعاد سلامت</h4>
                  <Button variant="ghost" size="sm" className="h-7 p-1 text-slate-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="h-64 p-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius="70%" data={[
                      { subject: 'فیزیکی', A: 82, B: 65, fullMark: 100 },
                      { subject: 'روانی', A: 75, B: 70, fullMark: 100 },
                      { subject: 'تغذیه', A: 68, B: 73, fullMark: 100 },
                      { subject: 'محیطی', A: 85, B: 75, fullMark: 100 },
                      { subject: 'HSE', A: 84, B: 63, fullMark: 100 },
                      { subject: 'ارگونومی', A: 76, B: 69, fullMark: 100 },
                    ]}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Radar name="امسال" dataKey="A" stroke="#5eead4" fill="#5eead4" fillOpacity={0.3} />
                      <Radar name="سال گذشته" dataKey="B" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.3} />
                      <Legend wrapperStyle={{ color: '#e2e8f0', fontSize: 12 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* ردیف زیرین با کارت‌های آماری */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="stat-card bg-gradient-to-br from-blue-500/20 to-tiffany/20 rounded-xl p-3 border border-blue-500/20">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">نمره کلی سلامت</span>
                    <span className="text-xl font-bold text-white">84</span>
                  </div>
                  <div className="p-2 rounded-full bg-blue-500/20">
                    <Activity className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
                <div className="w-full h-1 bg-slate-700/70 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-tiffany rounded-full" style={{ width: '84%' }}></div>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-slate-500">0</span>
                  <span className="text-[10px] text-tiffany">100</span>
                </div>
              </div>
              
              <div className="stat-card bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-3 border border-purple-500/20">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">سلامت روانی</span>
                    <span className="text-xl font-bold text-white">79</span>
                  </div>
                  <div className="p-2 rounded-full bg-purple-500/20">
                    <Heart className="h-5 w-5 text-purple-400" />
                  </div>
                </div>
                <div className="w-full h-1 bg-slate-700/70 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '79%' }}></div>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-slate-500">0</span>
                  <span className="text-[10px] text-pink-400">100</span>
                </div>
              </div>
              
              <div className="stat-card bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-3 border border-amber-500/20">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">عملکرد HSE</span>
                    <span className="text-xl font-bold text-white">91</span>
                  </div>
                  <div className="p-2 rounded-full bg-amber-500/20">
                    <Shield className="h-5 w-5 text-amber-400" />
                  </div>
                </div>
                <div className="w-full h-1 bg-slate-700/70 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '91%' }}></div>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-slate-500">0</span>
                  <span className="text-[10px] text-orange-400">100</span>
                </div>
              </div>
              
              <div className="stat-card bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl p-3 border border-emerald-500/20">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400">سلامت فیزیکی</span>
                    <span className="text-xl font-bold text-white">88</span>
                  </div>
                  <div className="p-2 rounded-full bg-emerald-500/20">
                    <Activity className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
                <div className="w-full h-1 bg-slate-700/70 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[10px] text-slate-500">0</span>
                  <span className="text-[10px] text-green-400">100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* ستون کناری */}
        <div className="lg:col-span-4 space-y-6">
          {/* جزیره سلامت تیمی */}
          <TeamHealthIsland />
          
          {/* پنل محیطی */}
          <div className="glass-island deep-space p-4 rounded-2xl">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-white/10">
                <Thermometer className="h-5 w-5 text-rose-400" />
              </div>
              <h3 className="text-base font-bold mr-2 text-white">شرایط محیطی</h3>
              <div className="mr-auto">
                <div className="control-indicator active pulse-glow" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/30 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 text-rose-400 ml-1.5" />
                    <span className="text-xs text-slate-300">دما</span>
                  </div>
                  <span className="text-sm font-medium text-white">{envTemperature}°C</span>
                </div>
                <Slider 
                  value={[envTemperature]} 
                  min={16} 
                  max={30} 
                  step={0.5}
                  className="mt-3"
                  onValueChange={(value) => setEnvTemperature(value[0])}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-slate-500">16°C</span>
                  <span className="text-[10px] text-slate-500">30°C</span>
                </div>
              </div>
              
              <div className="bg-slate-800/30 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center">
                    <Cloud className="h-4 w-4 text-sky-400 ml-1.5" />
                    <span className="text-xs text-slate-300">رطوبت</span>
                  </div>
                  <span className="text-sm font-medium text-white">{envHumidity}%</span>
                </div>
                <Slider 
                  value={[envHumidity]} 
                  min={20} 
                  max={70} 
                  step={1}
                  className="mt-3"
                  onValueChange={(value) => setEnvHumidity(value[0])}
                />
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-slate-500">20%</span>
                  <span className="text-[10px] text-slate-500">70%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-700/50 grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xs text-slate-400 ml-2">فیلتر هوا</span>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xs text-slate-400 ml-2">تهویه هوشمند</span>
                </div>
                <Switch checked={true} />
              </div>
            </div>
          </div>
          
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