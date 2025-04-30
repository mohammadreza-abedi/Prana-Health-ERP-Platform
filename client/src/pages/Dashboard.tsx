import { useState, useEffect } from "react";
import { Activity, Bell, Calendar, CircleCheck, Clock, Cpu, Database, Heart, HelpingHand, Lock, Search, Settings, 
  ShieldCheck, Signal, Thermometer, User, Wifi, Zap, Menu, Shield, Layout, Leaf, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip as ReTooltip, ResponsiveContainer 
} from 'recharts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HealthSummaryIsland } from "@/components/islands/HealthSummaryIsland";
import { TeamHealthIsland } from "@/components/islands/TeamHealthIsland";
import { HSEPerformanceIsland } from "@/components/islands/HSEPerformanceIsland";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hoverTab, setHoverTab] = useState('');
  
  // مقادیر سیستمی
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memoryUsage, setMemoryUsage] = useState(67);
  const [networkStatus, setNetworkStatus] = useState(94);
  const [powerLevel, setPowerLevel] = useState(88);
  const [envTemperature, setEnvTemperature] = useState(23);
  const [envHumidity, setEnvHumidity] = useState(45);
  const [securityLevel, setSecurityLevel] = useState(91);
  const [systemHealth, setSystemHealth] = useState(89);
  
  // وضعیت‌های سیستم
  const [scanActive, setScanActive] = useState(false);
  const [processingData, setProcessingData] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  
  // داده‌های پیش‌فرض
  const formattedDate = new Date().toLocaleDateString('fa-IR');
  
  const mainTabs = [
    { id: 'dashboard', label: 'داشبورد', icon: <Layout className="h-4 w-4" /> },
    { id: 'health', label: 'پایش سلامت', icon: <Heart className="h-4 w-4" /> },
    { id: 'safety', label: 'ایمنی', icon: <ShieldCheck className="h-4 w-4" /> },
    { id: 'environment', label: 'محیط زیست', icon: <Leaf className="h-4 w-4" /> },
    { id: 'reports', label: 'گزارش‌ها', icon: <BarChart2 className="h-4 w-4" /> },
    { id: 'analytics', label: 'تحلیل داده', icon: <Activity className="h-4 w-4" /> },
    { id: 'settings', label: 'تنظیمات', icon: <Settings className="h-4 w-4" /> },
  ];
  
  const systemLogs = [
    "سیستم پایش سلامت آنلاین است",
    "در حال دریافت داده‌های سنسورها...",
    "همه سرویس‌ها فعال هستند",
    "آخرین به‌روزرسانی: " + new Date().toLocaleTimeString('fa-IR'),
    "درخواست بررسی دریافت شد...",
    "در حال تحلیل داده‌های سلامت کارکنان",
    "تیم HSE در وضعیت استندبای",
    "سیستم در حال کار با راندمان بالا"
  ];
  
  const upcomingTasks = [
    { title: "بررسی شاخص‌های سلامت کارکنان قسمت تولید", dueDate: "1402/08/14", priority: "high" },
    { title: "چکاپ دوره‌ای کارکنان واحد تعمیرات", dueDate: "1402/08/17", priority: "medium" },
    { title: "بررسی ارگونومی ایستگاه‌های کاری", dueDate: "1402/08/21", priority: "low" },
  ];

  // اثر جانبی برای شبیه‌سازی مقادیر سیستم
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 15) + 35);
      setMemoryUsage(Math.floor(Math.random() * 10) + 62);
      setNetworkStatus(Math.floor(Math.random() * 6) + 92);
      setPowerLevel(Math.floor(Math.random() * 5) + 85);
      setEnvTemperature(Math.floor(Math.random() * 2) + 22);
      setEnvHumidity(Math.floor(Math.random() * 5) + 43);
      setSecurityLevel(Math.floor(Math.random() * 4) + 90);
      setSystemHealth(Math.floor(Math.random() * 8) + 85);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // تابع شبیه‌سازی اسکن سیستم
  const handleSystemScan = () => {
    setProcessingData(true);
    setScanActive(true);
    
    setTimeout(() => {
      setProcessingData(false);
      setTimeout(() => setScanActive(false), 2000);
    }, 3500);
  };

  return (
    <div className="dashboard-container">
      {/* افکت‌های زمینه */}
      <div className="space-background"></div>
      <div className="space-grid"></div>
      <div className="space-particles">
        {[...Array(20)].map((_, index) => (
          <div 
            key={index} 
            className="space-particle" 
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* سایدبار راست */}
      <div className="dashboard-sidebar" style={{ width: "220px" }}>
        <div className="flex items-center justify-center gap-2 p-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-tiffany/20 flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 text-tiffany" />
          </div>
          <div className="font-bold text-lg text-white">پرانا</div>
        </div>
        
        {/* منوی اصلی */}
        <nav className="space-y-2 flex-1 px-2">
          {mainTabs.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-2.5 rounded-lg transition-all text-right ${
                activeTab === item.id 
                  ? 'bg-tiffany/10 text-tiffany font-medium'
                  : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg ${activeTab === item.id ? 'bg-tiffany/20' : 'bg-slate-800/50'} flex items-center justify-center ml-3`}>
                {item.icon}
              </div>
              <span>{item.label}</span>
              {activeTab === item.id && <div className="w-1 h-5 bg-tiffany rounded-full mr-auto"></div>}
            </button>
          ))}
        </nav>
        
        {/* دکمه راهنمایی */}
        <div className="p-3 mt-4">
          <Button variant="outline" className="w-full text-sm py-5 bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white">
            <HelpingHand className="w-4 h-4 ml-2" />
            راهنمای سیستم
          </Button>
        </div>
      </div>
      
      {/* محتوای اصلی */}
      <div className="dashboard-main-content flex-1 overflow-hidden flex flex-col">
        <div className="dashboard-content flex-1 overflow-y-auto p-6">
          {/* هدر */}
          <header className="dashboard-navbar mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-lg font-bold text-white ml-3">سیستم پایش سلامت سازمانی</h1>
                <div className="flex items-center bg-tiffany/10 px-2 py-1 rounded-lg border border-tiffany/20">
                  <CircleCheck className="h-3 w-3 text-tiffany ml-1" />
                  <span className="text-xs text-tiffany font-medium">آنلاین</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-800/40 px-2 py-1 rounded-lg border border-slate-700/30 ml-2">
                  <Calendar className="w-3.5 h-3.5 ml-1 text-amber-400" /> 
                  <span className="text-sm text-amber-300">{formattedDate}</span>
                </div>
                
                <div className="flex items-center bg-slate-800/40 px-2 py-1 rounded-lg border border-slate-700/30">
                  <Clock className="w-3.5 h-3.5 ml-1 text-sky-400" />
                  <span className="text-sm text-sky-300">{new Date().toLocaleTimeString('fa-IR')}</span>
                </div>
                
                <div className="relative">
                  <button className="p-2 bg-slate-800/50 rounded-lg relative">
                    <Bell className="w-5 h-5 text-slate-400" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                      2
                    </span>
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 px-3 py-1.5 rounded-lg flex items-center">
                  <div className="w-7 h-7 rounded-lg bg-tiffany/20 flex items-center justify-center ml-2">
                    <User className="h-4 w-4 text-tiffany" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300">مهندس حامد رضاییان</div>
                    <div className="text-[10px] text-slate-500">مدیر بهداشت، ایمنی و محیط زیست</div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* نوار وضعیت */}
          <div className="spacecraft-panel py-2 px-4 rounded-xl mb-4 flex overflow-x-auto hide-scrollbar">
            <div className="spacecraft-mini-stat ml-3">
              <div className="stat-icon health">
                <Heart className="w-3 h-3" />
              </div>
              <span className="stat-value">۹۴٪</span>
              <span className="stat-label">سلامت</span>
            </div>
            
            <div className="spacecraft-mini-stat ml-3">
              <div className="stat-icon cpu">
                <Cpu className="w-3 h-3" />
              </div>
              <span className="stat-value">{cpuUsage}٪</span>
              <span className="stat-label">CPU</span>
            </div>
            
            <div className="spacecraft-mini-stat ml-3">
              <div className="stat-icon memory">
                <Database className="w-3 h-3" />
              </div>
              <span className="stat-value">{memoryUsage}٪</span>
              <span className="stat-label">حافظه</span>
            </div>
            
            <div className="spacecraft-mini-stat ml-3">
              <div className="stat-icon network">
                <Wifi className="w-3 h-3" />
              </div>
              <span className="stat-value">{networkStatus}٪</span>
              <span className="stat-label">شبکه</span>
            </div>
            
            <div className="spacecraft-mini-stat ml-3">
              <div className="stat-icon power">
                <Zap className="w-3 h-3" />
              </div>
              <span className="stat-value">{powerLevel}٪</span>
              <span className="stat-label">انرژی</span>
            </div>
            
            <div className="spacecraft-mini-stat ml-3">
              <div className="stat-icon temp">
                <Thermometer className="w-3 h-3" />
              </div>
              <span className="stat-value">{envTemperature}°C</span>
              <span className="stat-label">دما</span>
            </div>
            
            <div className="spacecraft-mini-stat ml-3">
              <div className="stat-icon security">
                <Lock className="w-3 h-3" />
              </div>
              <span className="stat-value">{securityLevel}٪</span>
              <span className="stat-label">امنیت</span>
            </div>
          </div>
          
          {/* نوار فیلترهای اصلی */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {['سلامت عمومی', 'بهداشت کار', 'ایمنی', 'HSE', 'محیط کار'].map((filter, index) => (
                <button 
                  key={index}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    index === 0 
                      ? 'bg-tiffany/10 text-tiffany border border-tiffany/20' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <input 
                  type="text" 
                  placeholder="جستجو در سیستم..." 
                  className="w-full bg-slate-800/50 py-2 px-4 pl-10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-tiffany focus:border-tiffany/30 border border-slate-700/60 text-tiffany-light"
                />
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-tiffany/70" />
              </div>
              
              <Button variant="outline" size="sm" className="text-xs py-1.5 bg-slate-800/60 border-slate-700/50 text-slate-300">
                <Settings className="w-3.5 h-3.5 ml-1.5" />
                تنظیمات
              </Button>
            </div>
          </div>
          
          {/* گرید اصلی داشبورد */}
          <div className="grid grid-cols-12 gap-6">
            {/* جزیره خلاصه وضعیت سلامت فردی */}
            <div className="col-span-12 lg:col-span-8">
              <HealthSummaryIsland />
            </div>
            
            {/* جزیره سلامت تیمی */}
            <div className="col-span-12 lg:col-span-4">
              <TeamHealthIsland />
            </div>
            
            {/* جزیره عملکرد HSE */}
            <div className="col-span-12">
              <HSEPerformanceIsland />
            </div>
          </div>
        </div>
      </div>
      
      {/* افکت‌های پیشرفته برای محتوای اصلی */}
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
    </div>
  );
};

export default Dashboard;