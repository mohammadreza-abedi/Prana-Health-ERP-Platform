import React, { useState, useEffect } from 'react';
import { 
  Activity, AlertTriangle, Battery, Calendar, ChevronDown, ChevronRight, 
  CircleCheck, Clock, Cloud, CloudSun, Cpu, Database,
  DatabaseBackup, Gauge, GitBranch, Heart, HelpCircle, Info, 
  LifeBuoy, LineChart, Lock, LucideIcon, Moon, Network, Power, 
  RefreshCw, Save, Settings, Shield, Signal, Terminal, 
  Thermometer, TrendingUp, Users, Wifi, Zap, Menu, X
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
import { HealthSummaryIsland } from '@/components/islands/HealthSummaryIsland';
import { TeamHealthIsland } from '@/components/islands/TeamHealthIsland';
import { HSEPerformanceIsland } from '@/components/islands/HSEPerformanceIsland';

/**
 * داشبورد فضاپیمایی با گلسمورفیسم پیشرفته 
 * این کامپوننت با الهام از پنل‌های کنترل فضاپیما، رابط کاربری بسیار پیشرفته‌ای ارائه می‌دهد
 */
const SpacecraftDashboard: React.FC = () => {
  // وضعیت‌های داشبورد
  const [systemHealth, setSystemHealth] = useState(94);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memoryUsage, setMemoryUsage] = useState(56);
  const [networkStatus, setNetworkStatus] = useState(78);
  const [powerLevel, setPowerLevel] = useState(87);
  const [securityLevel, setSecurityLevel] = useState(95);
  
  const [systemLogs, setSystemLogs] = useState([
    { time: '10:42:19', message: 'سیستم ردیابی سلامت فعال شد', status: 'success' },
    { time: '10:38:55', message: 'به‌روزرسانی ماژول HSE تکمیل شد', status: 'info' },
    { time: '10:32:14', message: 'اتصال به سرورهای مرکزی برقرار شد', status: 'success' },
    { time: '10:28:00', message: 'هشدار: نوسان در سطح اکسیژن محیطی', status: 'warning' },
    { time: '10:24:37', message: 'راه‌اندازی سیستم فضاپیما موفقیت‌آمیز بود', status: 'success' }
  ]);
  
  const [activeView, setActiveView] = useState('main');
  const [showTerminal, setShowTerminal] = useState(false);
  const [processingData, setProcessingData] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  
  // شبیه‌سازی مقادیر در حال تغییر برای ایجاد اثر داینامیک
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
  
  // اجزای UI برای استایل‌های مختلف داده
  const StatusIndicator = ({ value, type = 'default' }: { value: number, type?: 'default' | 'health' | 'warning' | 'critical' }) => {
    let colorClass = 'from-tiffany to-tiffany-light';
    
    if (type === 'health') {
      colorClass = value > 90 ? 'from-emerald-500 to-emerald-300' :
                 value > 70 ? 'from-tiffany to-tiffany-light' : 
                 value > 50 ? 'from-amber-500 to-amber-300' : 'from-rose-600 to-rose-400';
    } else if (type === 'warning' && value > 75) {
      colorClass = 'from-amber-500 to-amber-300';
    } else if (type === 'critical' && value > 85) {
      colorClass = 'from-rose-600 to-rose-400';
    }
    
    return (
      <div className="w-full">
        <div className="flex justify-between mb-1 text-xs">
          <span className="text-slate-500 dark:text-slate-400">{value}%</span>
          {type === 'health' && (
            <span className={`${value > 90 ? 'text-emerald-500' : value > 70 ? 'text-tiffany' : value > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
              {value > 90 ? 'عالی' : value > 70 ? 'خوب' : value > 50 ? 'متوسط' : 'ضعیف'}
            </span>
          )}
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${colorClass} rounded-full`} 
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };
  
  // کامپوننت نشانگر وضعیت
  const StatusPanel = ({ icon: Icon, title, value, type, className = '' }: { 
    icon: LucideIcon, 
    title: string, 
    value: number, 
    type?: 'default' | 'health' | 'warning' | 'critical',
    className?: string
  }) => (
    <div className={`glass-island ${className} p-4 relative overflow-hidden`}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tiffany/30 to-transparent" />
      {scanActive && <div className="scanner-line" />}
      <div className="flex items-center mb-3">
        <div className="p-2 rounded-full bg-white/10 dark:bg-slate-800/30">
          <Icon className="h-5 w-5 text-tiffany" />
        </div>
        <h3 className="text-sm font-bold mr-2 text-slate-700 dark:text-white">{title}</h3>
        <div className="mr-auto">
          <div className={`control-indicator ${
            value > 90 ? 'active' : 
            value > 70 ? '' : 
            value > 50 ? 'warning' : 
            'danger'
          }`} />
        </div>
      </div>
      
      <StatusIndicator value={value} type={type} />
    </div>
  );
  
  // کامپوننت کنترل سیستم
  const SystemControls = ({ title, actions = [], children }: { 
    title: string, 
    actions?: { icon: LucideIcon, label: string, onClick?: () => void, disabled?: boolean }[], 
    children?: React.ReactNode
  }) => (
    <div className="glass-island deep-space p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      {scanActive && <div className="scanner-line" />}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white flex items-center">
          <Settings className="h-4 w-4 ml-1.5 text-purple-400" />
          {title}
        </h3>
        
        {actions.length > 0 && (
          <div className="flex space-x-2 space-x-reverse">
            {actions.map((action, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={action.onClick} 
                      disabled={action.disabled}
                      className={`control-button ${action.disabled ? 'inactive' : ''} p-1.5 h-8 w-8 flex items-center justify-center`}
                    >
                      <action.icon className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{action.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        )}
      </div>
      
      {children}
    </div>
  );
  
  // کامپوننت نمایش لاگ سیستم
  const SystemLogs = () => (
    <div className="glass-island cosmic-blue p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
      {scanActive && <div className="scanner-line" />}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-white flex items-center">
          <Terminal className="h-4 w-4 ml-1.5 text-sky-400" />
          لاگ سیستم
        </h3>
        
        <div className="flex space-x-2 space-x-reverse">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => setShowTerminal(!showTerminal)}
                  className="control-button p-1.5 h-8 w-8 flex items-center justify-center"
                >
                  {showTerminal ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
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
                <button className="control-button p-1.5 h-8 w-8 flex items-center justify-center">
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
      
      <div className={`space-y-2 overflow-hidden transition-all duration-500 ${showTerminal ? 'h-64' : 'h-32'}`}>
        {systemLogs.map((log, index) => (
          <div 
            key={index} 
            className="text-xs border-r-2 border-slate-600 pr-2 py-1 flex items-start"
            style={{ borderColor: log.status === 'success' ? 'rgba(var(--success-rgb), 0.5)' : 
                                 log.status === 'warning' ? 'rgba(var(--amber-rgb), 0.5)' : 
                                 log.status === 'error' ? 'rgba(var(--error-rgb), 0.5)' : 
                                 'rgba(var(--info-rgb), 0.5)' }}
          >
            <div className="flex-none w-16 text-slate-400">{log.time}</div>
            <div className={`
              flex-1 
              ${log.status === 'success' ? 'text-emerald-300' : 
                log.status === 'warning' ? 'text-amber-300' : 
                log.status === 'error' ? 'text-rose-300' : 
                'text-sky-300'}
            `}>
              {log.message}
            </div>
          </div>
        ))}
        
        {processingData && (
          <div className="text-xs border-r-2 border-tiffany pr-2 py-1 flex items-start">
            <div className="flex-none w-16 text-slate-400">{new Date().toLocaleTimeString('fa-IR')}</div>
            <div className="flex-1 text-tiffany flex items-center">
              <span className="ml-2">در حال اسکن سیستم...</span>
              <div className="animate-pulse">⚡</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  // کامپوننت دیجیتال با نمایش متحرک
  const DigitalGauge = ({ 
    value, 
    title, 
    max = 100, 
    unit = '%', 
    color = 'tiffany',
    icon: Icon,
    size = 'md'
  }: { 
    value: number, 
    title: string, 
    max?: number, 
    unit?: string,
    color?: 'tiffany' | 'amber' | 'purple' | 'success' | 'error',
    icon: LucideIcon,
    size?: 'sm' | 'md' | 'lg'
  }) => {
    const percentage = (value / max) * 100;
    const angleRange = 180; // نیم دایره
    const angle = (percentage * angleRange) / 100;
    
    const colorClasses = {
      tiffany: 'text-tiffany',
      amber: 'text-amber-500',
      purple: 'text-purple-500',
      success: 'text-emerald-500',
      error: 'text-rose-500'
    };
    
    const colorClass = colorClasses[color];
    const height = size === 'sm' ? 'h-36' : size === 'md' ? 'h-48' : 'h-64';
    
    return (
      <div className="glass-island p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tiffany/30 to-transparent" />
        
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-700 dark:text-white">{title}</h3>
          <Icon className={`h-5 w-5 ${colorClass}`} />
        </div>
        
        <div className={`relative ${height} flex flex-col items-center justify-end`}>
          {/* نیم دایره گیج */}
          <div className="relative w-full flex-1 flex items-center justify-center">
            <div className="gauge-container">
              <div className="gauge-base"></div>
              <div className="gauge-fill" style={{ height: `${percentage * 0.75}px` }}></div>
              <div 
                className="gauge-needle" 
                style={{ 
                  height: '75px',
                  transform: `rotate(${angle - 90}deg)` 
                }}
              ></div>
              <div className="gauge-center"></div>
            </div>
          </div>
          
          {/* مقدار دیجیتال */}
          <div className="digital-display large w-full">
            {value.toFixed(1)}{unit}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="py-4">
      {/* Header control panel */}
      <div className="glass-island interactive p-4 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tiffany/30 to-transparent" />
        {scanActive && <div className="scanner-line" />}
        
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-3">
            <div className="flex items-center">
              <div className="p-2.5 bg-gradient-to-br from-tiffany to-tiffany-dark rounded-xl shadow-lg shadow-tiffany/20">
                <Signal className="h-6 w-6 text-white" />
              </div>
              <div className="mr-3">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  داشبورد سلامت پیشرفته
                  <Badge className="mr-2 bg-tiffany/20 text-tiffany dark:bg-tiffany/30 px-2 py-0">
                    نسخه ۲.۰
                  </Badge>
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <span className="ml-2 inline-flex items-center">
                    <Clock className="h-3.5 w-3.5 ml-1" />
                    {new Date().toLocaleDateString('fa-IR')}
                  </span>
                  <span className="inline-flex items-center">
                    <CircleCheck className="h-3.5 w-3.5 ml-1 text-emerald-500" />
                    تمام سیستم‌ها فعال
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3 flex justify-end items-center space-x-3 space-x-reverse">
            <div className="control-panel p-2 flex items-center space-x-3 space-x-reverse bg-slate-900/50 border border-white/10">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-tiffany/50 bg-slate-900/70 text-tiffany hover:bg-slate-900/90 hover:text-tiffany-light flex items-center justify-center h-9"
                onClick={handleSystemScan}
                disabled={processingData}
              >
                {processingData ? (
                  <>
                    <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
                    در حال اسکن...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 ml-2" />
                    اسکن سیستم
                  </>
                )}
              </Button>
              
              <div className="h-8 w-[1px] bg-white/10" />
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="px-2 border-white/10 bg-slate-900/70 text-white hover:bg-slate-900/90"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ذخیره وضعیت</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="px-2 border-white/10 bg-slate-900/70 text-white hover:bg-slate-900/90"
                    >
                      <GitBranch className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>سیستم‌های جانبی</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="px-2 border-white/10 bg-slate-900/70 text-white hover:bg-slate-900/90"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>راهنما</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main console grid */}
      <div className="islands-container grid grid-cols-12 gap-6 mb-6">
        {/* Status panel - left section */}
        <div className="col-span-12 md:col-span-3 space-y-6">
          <div className="glass-island cosmic-blue p-4 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
            {scanActive && <div className="scanner-line" />}
            
            <h3 className="text-sm font-bold text-white mb-3 flex items-center">
              <Activity className="w-4 h-4 ml-1.5 text-sky-400" />
              وضعیت سیستم
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">وضعیت سلامت سیستم</span>
                <span className={`${systemHealth > 90 ? 'text-emerald-400' : systemHealth > 70 ? 'text-sky-400' : 'text-amber-400'}`}>
                  {systemHealth > 90 ? 'عالی' : systemHealth > 70 ? 'خوب' : 'متوسط'}
                </span>
              </div>
              
              <StatusIndicator value={systemHealth} type="health" />
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">CPU</span>
                    <span className={`${cpuUsage > 80 ? 'text-rose-400' : cpuUsage > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {cpuUsage}%
                    </span>
                  </div>
                  <Progress value={cpuUsage} className="h-1.5" 
                    style={{
                      background: 'rgba(17, 24, 39, 0.6)',
                      border: '1px solid rgba(71, 85, 105, 0.2)',
                      '--tw-progress-fill': cpuUsage > 80 ? 'rgb(244, 63, 94)' : cpuUsage > 60 ? 'rgb(245, 158, 11)' : 'rgb(16, 185, 129)'
                    } as React.CSSProperties}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">حافظه</span>
                    <span className={`${memoryUsage > 80 ? 'text-rose-400' : memoryUsage > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {memoryUsage}%
                    </span>
                  </div>
                  <Progress value={memoryUsage} className="h-1.5" 
                    style={{
                      background: 'rgba(17, 24, 39, 0.6)',
                      border: '1px solid rgba(71, 85, 105, 0.2)',
                      '--tw-progress-fill': memoryUsage > 80 ? 'rgb(244, 63, 94)' : memoryUsage > 60 ? 'rgb(245, 158, 11)' : 'rgb(16, 185, 129)'
                    } as React.CSSProperties}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">شبکه</span>
                    <span className="text-emerald-400">{networkStatus}%</span>
                  </div>
                  <Progress value={networkStatus} className="h-1.5" 
                    style={{
                      background: 'rgba(17, 24, 39, 0.6)',
                      border: '1px solid rgba(71, 85, 105, 0.2)',
                      '--tw-progress-fill': 'rgb(56, 189, 248)'
                    } as React.CSSProperties}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">باتری</span>
                    <span className="text-emerald-400">{powerLevel}%</span>
                  </div>
                  <Progress value={powerLevel} className="h-1.5" 
                    style={{
                      background: 'rgba(17, 24, 39, 0.6)',
                      border: '1px solid rgba(71, 85, 105, 0.2)',
                      '--tw-progress-fill': 'rgb(16, 185, 129)'
                    } as React.CSSProperties}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <StatusPanel icon={Shield} title="امنیت سیستم" value={securityLevel} type="health" className="tiffany" />
            <StatusPanel icon={Users} title="وضعیت پرسنل" value={89} type="health" className="purple" />
            <StatusPanel icon={Battery} title="وضعیت انرژی" value={87} type="default" className="amber" />
            <StatusPanel icon={Thermometer} title="دمای محیط" value={72} type="warning" className="cosmic-blue" />
            <StatusPanel icon={Wifi} title="قدرت سیگنال" value={78} type="default" className="deep-space" />
          </div>
        </div>
        
        {/* Main content - center section */}
        <div className="col-span-12 md:col-span-6 space-y-6">
          {/* Hero health metric */}
          <div className="glass-island interactive p-5 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tiffany/30 to-transparent" />
            {scanActive && <div className="scanner-line" />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-tiffany/10 dark:bg-tiffany/20">
                    <Heart className="h-5 w-5 text-tiffany" />
                  </div>
                  <div className="mr-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">شاخص سلامت کلی</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">وضعیت شما در ۲۴ ساعت گذشته</p>
                  </div>
                </div>
                
                <div className="flex items-baseline space-x-4 space-x-reverse mb-4">
                  <div className="text-4xl font-bold text-tiffany">۸۷</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">از 100</div>
                  <div className="text-sm text-emerald-500 flex items-center">
                    <TrendingUp className="h-4 w-4 ml-1" />
                    ۷٪ بهبود
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400">ضربان قلب</span>
                      <span className="text-tiffany">۶۸ BPM</span>
                    </div>
                    <Progress value={68} className="h-1.5" 
                      style={{
                        background: 'rgba(241, 245, 249, 0.2)',
                        '--tw-progress-fill': 'rgb(20, 184, 166)'
                      } as React.CSSProperties}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400">سطح استرس</span>
                      <span className="text-emerald-500">۴۳٪</span>
                    </div>
                    <Progress value={43} className="h-1.5" 
                      style={{
                        background: 'rgba(241, 245, 249, 0.2)',
                        '--tw-progress-fill': 'rgb(16, 185, 129)'
                      } as React.CSSProperties}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-500 dark:text-slate-400">کیفیت خواب</span>
                      <span className="text-amber-500">۶۵٪</span>
                    </div>
                    <Progress value={65} className="h-1.5" 
                      style={{
                        background: 'rgba(241, 245, 249, 0.2)',
                        '--tw-progress-fill': 'rgb(245, 158, 11)'
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="data-visualization text-center p-4 h-full flex flex-col justify-center">
                  <div className="relative aspect-square max-w-[200px] mx-auto">
                    {/* Rendered in final implementation - this is a placeholder for chart */}
                    <div className="absolute inset-0 rounded-full border-8 border-slate-200/10"></div>
                    <div className="absolute inset-[10%] rounded-full border-8 border-slate-200/10"></div>
                    <div className="absolute inset-[20%] rounded-full border-8 border-slate-200/10"></div>
                    <div className="absolute inset-[30%] rounded-full border-8 border-slate-200/10"></div>
                    <div className="absolute inset-[40%] rounded-full border-8 border-slate-200/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-tiffany">۸۷</div>
                    </div>
                    
                    {/* Chart visualization - simplified representation */}
                    <div className="absolute inset-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="rgba(20, 184, 166, 0.2)" 
                          strokeWidth="8"
                        />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="rgba(20, 184, 166, 0.8)" 
                          strokeWidth="8"
                          strokeDasharray="282.7"
                          strokeDashoffset="36.75"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-300 mt-4">شاخص ۲۴ ساعته</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Advanced health metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DigitalGauge 
              value={95} 
              title="اکسیژن خون" 
              icon={Activity} 
              color="tiffany"
              size="sm"
            />
            
            <DigitalGauge 
              value={72} 
              title="ضربان قلب" 
              unit=" BPM" 
              max={200}
              icon={Heart} 
              color="purple"
              size="sm"
            />
            
            <DigitalGauge 
              value={8.1} 
              title="خواب" 
              unit=" hrs" 
              max={10}
              icon={Moon} 
              color="amber"
              size="sm"
            />
          </div>
          
          {/* System Logs */}
          <SystemLogs />
        </div>
        
        {/* Right sidebar - control section */}
        <div className="col-span-12 md:col-span-3 space-y-6">
          {/* System Control Panel */}
          <SystemControls 
            title="کنترل سیستم"
            actions={[
              { icon: RefreshCw, label: 'بارگذاری مجدد', onClick: () => console.log('Reload') },
              { icon: Settings, label: 'تنظیمات', onClick: () => console.log('Settings') },
              { icon: Info, label: 'اطلاعات', onClick: () => console.log('Info') },
            ]}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="control-indicator active mr-0 ml-2" />
                  <span className="text-xs text-slate-200">ماژول سلامت پرسنل</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-emerald-400">فعال</span>
                  <Switch className="ml-4 data-[state=checked]:bg-emerald-500" defaultChecked />
                </div>
              </div>
              
              <Separator className="bg-slate-700" />
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="control-indicator warning mr-0 ml-2" />
                  <span className="text-xs text-slate-200">سیستم هشدار HSE</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-amber-400">نیازمند توجه</span>
                  <Switch className="ml-4 data-[state=checked]:bg-amber-500" defaultChecked />
                </div>
              </div>
              
              <Separator className="bg-slate-700" />
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="control-indicator mr-0 ml-2" />
                  <span className="text-xs text-slate-200">مانیتورینگ محیطی</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-sky-400">فعال</span>
                  <Switch className="ml-4 data-[state=checked]:bg-sky-500" defaultChecked />
                </div>
              </div>
              
              <Separator className="bg-slate-700" />
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <div className="control-indicator mr-0 ml-2" />
                  <span className="text-xs text-slate-200">آنالیز داده‌های بزرگ</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-slate-400">غیرفعال</span>
                  <Switch className="ml-4" />
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">فعال‌سازی همه سیستم‌ها</Button>
              </div>
            </div>
          </SystemControls>
          
          {/* Environment Control */}
          <SystemControls 
            title="وضعیت محیط"
            actions={[
              { icon: CloudSun, label: 'اطلاعات آب و هوا', onClick: () => console.log('Weather') },
              { icon: Thermometer, label: 'تنظیم دما', onClick: () => console.log('Temperature') },
            ]}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white">دمای محیط کار</span>
                <span className="text-xs text-sky-400">۲۲°C</span>
              </div>
              
              <Slider 
                defaultValue={[65]} 
                max={100} 
                step={1} 
                className="h-4"
              />
              
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>۱۸°C</span>
                <span>۲۲°C</span>
                <span>۲۶°C</span>
              </div>
              
              <Separator className="bg-slate-700" />
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-white">سطح رطوبت</span>
                <span className="text-xs text-sky-400">۴۵٪</span>
              </div>
              
              <Slider 
                defaultValue={[45]} 
                max={100} 
                step={1} 
                className="h-4"
              />
              
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>۰٪</span>
                <span>۵۰٪</span>
                <span>۱۰۰٪</span>
              </div>
              
              <Separator className="bg-slate-700" />
              
              <div className="pt-2 flex justify-between items-center">
                <span className="text-xs text-white flex items-center">
                  <Cloud className="h-3.5 w-3.5 ml-1.5" />
                  کیفیت هوا
                </span>
                <Badge className="bg-emerald-500/20 text-emerald-400 px-2">عالی</Badge>
              </div>
              
              <div className="text-[10px] text-emerald-400/70">
                تمام شاخص‌های کیفیت هوا در محدوده مطلوب قرار دارند.
              </div>
            </div>
          </SystemControls>
          
          {/* Resource Management */}
          <SystemControls 
            title="مدیریت منابع"
            actions={[
              { icon: Cpu, label: 'جزئیات پردازنده', onClick: () => console.log('CPU Details') },
              { icon: DatabaseBackup, label: 'پشتیبان‌گیری', onClick: () => console.log('Backup') },
            ]}
          >
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white flex items-center">
                  <Cpu className="h-3.5 w-3.5 ml-1.5" />
                  استفاده از CPU
                </span>
                <span className="text-xs text-amber-400">{cpuUsage}%</span>
              </div>
              
              <Progress value={cpuUsage} className="h-1" 
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(71, 85, 105, 0.2)',
                  '--tw-progress-fill': cpuUsage > 80 ? 'rgb(244, 63, 94)' : cpuUsage > 60 ? 'rgb(245, 158, 11)' : 'rgb(16, 185, 129)'
                } as React.CSSProperties}
              />
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-white flex items-center">
                  <Activity className="h-3.5 w-3.5 ml-1.5" />
                  حافظه سیستم
                </span>
                <span className="text-xs text-amber-400">{memoryUsage}%</span>
              </div>
              
              <Progress value={memoryUsage} className="h-1" 
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(71, 85, 105, 0.2)',
                  '--tw-progress-fill': memoryUsage > 80 ? 'rgb(244, 63, 94)' : memoryUsage > 60 ? 'rgb(245, 158, 11)' : 'rgb(16, 185, 129)'
                } as React.CSSProperties}
              />
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-white flex items-center">
                  <Database className="h-3.5 w-3.5 ml-1.5" />
                  فضای ذخیره‌سازی
                </span>
                <span className="text-xs text-emerald-400">۳۸%</span>
              </div>
              
              <Progress value={38} className="h-1" 
                style={{
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(71, 85, 105, 0.2)',
                  '--tw-progress-fill': 'rgb(16, 185, 129)'
                } as React.CSSProperties}
              />
              
              <Separator className="bg-slate-700 my-3" />
              
              <div className="pt-1">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    <LineChart className="h-3.5 w-3.5 ml-1.5" />
                    گزارش تفصیلی
                  </Button>
                  
                  <Button variant="outline" size="sm" className="text-xs border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    <AlertTriangle className="h-3.5 w-3.5 ml-1.5" />
                    رفع مشکلات
                  </Button>
                </div>
              </div>
            </div>
          </SystemControls>
          
          {/* Quick Controls */}
          <SystemControls 
            title="دسترسی‌های سریع"
            actions={[
              { icon: Menu, label: 'منوی اصلی', onClick: () => console.log('Main Menu') },
            ]}
          >
            <div className="grid grid-cols-3 gap-3 mt-2">
              <button className="control-button aspect-square flex flex-col items-center justify-center p-2">
                <Shield className="h-5 w-5 mb-1" />
                <span className="text-[10px]">امنیت</span>
              </button>
              
              <button className="control-button aspect-square flex flex-col items-center justify-center p-2">
                <Users className="h-5 w-5 mb-1" />
                <span className="text-[10px]">پرسنل</span>
              </button>
              
              <button className="control-button aspect-square flex flex-col items-center justify-center p-2">
                <Heart className="h-5 w-5 mb-1" />
                <span className="text-[10px]">سلامت</span>
              </button>
              
              <button className="control-button aspect-square flex flex-col items-center justify-center p-2">
                <CloudSun className="h-5 w-5 mb-1" />
                <span className="text-[10px]">محیط</span>
              </button>
              
              <button className="control-button aspect-square flex flex-col items-center justify-center p-2">
                <Activity className="h-5 w-5 mb-1" />
                <span className="text-[10px]">گزارش</span>
              </button>
              
              <button className="control-button aspect-square flex flex-col items-center justify-center p-2">
                <Settings className="h-5 w-5 mb-1" />
                <span className="text-[10px]">تنظیمات</span>
              </button>
            </div>
          </SystemControls>
          
          {/* Emergency Control */}
          <div className="glass-island deep-space p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
            {scanActive && <div className="scanner-line" />}
            
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-rose-500 ml-2" />
              <h3 className="text-sm font-bold text-white">کنترل اضطراری</h3>
            </div>
            
            <div className="space-y-3">
              <Button variant="destructive" className="w-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600">
                <Power className="h-4 w-4 ml-2" />
                تخلیه اضطراری
              </Button>
              
              <Button variant="outline" className="w-full border-rose-500/30 text-rose-400 hover:bg-rose-900/20 hover:text-rose-300">
                <Lock className="h-4 w-4 ml-2" />
                قفل ایمنی
              </Button>
              
              <Button variant="outline" className="w-full border-amber-500/30 text-amber-400 hover:bg-amber-900/20 hover:text-amber-300">
                <LifeBuoy className="h-4 w-4 ml-2" />
                تماس با پشتیبانی
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom modules grid */}
      <div className="islands-container grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-island p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 dark:border-slate-700/30 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center">
              <Heart className="w-4 h-4 ml-1.5 text-tiffany" />
              وضعیت سلامت فردی
            </h3>
          </div>
          <div className="p-4">
            <HealthSummaryIsland />
          </div>
        </div>
        
        <div className="glass-island p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 dark:border-slate-700/30 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center">
              <Users className="w-4 h-4 ml-1.5 text-tiffany" />
              وضعیت سلامت تیمی
            </h3>
          </div>
          <div className="p-4">
            <TeamHealthIsland />
          </div>
        </div>
        
        <div className="glass-island p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-white/10 dark:border-slate-700/30 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center">
              <Shield className="w-4 h-4 ml-1.5 text-tiffany" />
              عملکرد HSE
            </h3>
          </div>
          <div className="p-4">
            <HSEPerformanceIsland />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacecraftDashboard;