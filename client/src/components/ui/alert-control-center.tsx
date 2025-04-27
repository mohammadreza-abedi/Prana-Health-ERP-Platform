import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Info, 
  Activity, 
  X, 
  Check, 
  Bell, 
  Settings,
  MoreHorizontal,
  Filter,
  Eye,
  EyeOff,
  Battery,
  Signal,
  Wifi,
  Volume2,
  MonitorSmartphone,
  Bluetooth,
  Moon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'system';

export interface Alert {
  id: string;
  title: string;
  description?: string;
  type: AlertType;
  timestamp: Date;
  isRead: boolean;
  source?: string;
  actionable?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export interface SystemControl {
  id: string;
  name: string;
  type: 'toggle' | 'slider';
  icon: React.ReactNode;
  value: boolean | number;
  options?: {
    min?: number;
    max?: number;
    step?: number;
  };
}

interface AlertControlCenterProps {
  alerts: Alert[];
  systemControls: SystemControl[];
  onAlertRead: (id: string) => void;
  onAlertDismiss: (id: string) => void;
  onControlChange: (id: string, value: boolean | number) => void;
  onToggleNotifications?: (enabled: boolean) => void;
  notificationsEnabled?: boolean;
}

// Format time
const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('fa-IR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

// Format date
const formatDate = (date: Date): string => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return 'امروز';
  } else if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return 'دیروز';
  }
  
  return new Intl.DateTimeFormat('fa-IR', {
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Get alert icon based on type
const getAlertIcon = (type: AlertType) => {
  switch (type) {
    case 'info':
      return <Info className="h-5 w-5 text-blue-500" />;
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case 'error':
      return <Shield className="h-5 w-5 text-red-500" />;
    case 'system':
      return <Activity className="h-5 w-5 text-purple-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

// Get alert background color based on type
const getAlertBackground = (type: AlertType) => {
  switch (type) {
    case 'info':
      return 'bg-blue-50 dark:bg-blue-900/20';
    case 'success':
      return 'bg-green-50 dark:bg-green-900/20';
    case 'warning':
      return 'bg-amber-50 dark:bg-amber-900/20';
    case 'error':
      return 'bg-red-50 dark:bg-red-900/20';
    case 'system':
      return 'bg-purple-50 dark:bg-purple-900/20';
    default:
      return 'bg-slate-50 dark:bg-slate-800/50';
  }
};

// Group alerts by date
type GroupedAlerts = {
  [date: string]: Alert[];
};

const groupAlertsByDate = (alerts: Alert[]): GroupedAlerts => {
  return alerts.reduce((groups: GroupedAlerts, alert) => {
    const date = formatDate(alert.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(alert);
    return groups;
  }, {});
};

// Alert item component
const AlertItem = ({
  alert,
  onRead,
  onDismiss,
}: {
  alert: Alert;
  onRead: (id: string) => void;
  onDismiss: (id: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative p-4 rounded-xl mb-2 border transition-all",
        getAlertBackground(alert.type),
        alert.isRead ? "border-slate-200 dark:border-slate-700" : "border-slate-300 dark:border-slate-600"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Unread indicator */}
      {!alert.isRead && (
        <span className="absolute left-3 top-4 w-2 h-2 rounded-full bg-blue-500"></span>
      )}
      
      <div className="flex">
        <div className="mr-3 mt-1 flex-shrink-0">
          {getAlertIcon(alert.type)}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className={cn(
              "font-semibold mb-1",
              alert.isRead ? "text-slate-700 dark:text-slate-300" : "text-slate-900 dark:text-white"
            )}>
              {alert.title}
            </h3>
            <div className="text-xs text-slate-500 whitespace-nowrap">
              {formatTime(alert.timestamp)}
            </div>
          </div>
          
          {alert.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              {alert.description}
            </p>
          )}
          
          {alert.source && (
            <p className="text-xs text-slate-500 mt-2">
              {alert.source}
            </p>
          )}
          
          {alert.actionable && alert.actionLabel && (
            <div className="mt-2 flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-xs rounded-lg"
                onClick={alert.onAction}
              >
                {alert.actionLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Actions on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-2 left-2 flex gap-1"
          >
            {!alert.isRead && (
              <button
                onClick={() => onRead(alert.id)}
                className="p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/30 text-blue-600 dark:text-blue-400"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
            )}
            
            <button
              onClick={() => onDismiss(alert.id)}
              className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/30 text-red-600 dark:text-red-400"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Control Item component
const ControlItem = ({
  control,
  onChange
}: {
  control: SystemControl;
  onChange: (id: string, value: boolean | number) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-xl mb-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
          {control.icon}
        </div>
        <span className="font-medium text-slate-800 dark:text-slate-200">{control.name}</span>
      </div>
      
      <div>
        {control.type === 'toggle' ? (
          <Switch
            checked={control.value as boolean}
            onCheckedChange={(checked) => onChange(control.id, checked)}
          />
        ) : (
          <div className="w-24">
            <Slider
              value={[control.value as number]}
              min={control.options?.min || 0}
              max={control.options?.max || 100}
              step={control.options?.step || 1}
              onValueChange={(value) => onChange(control.id, value[0])}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const AlertControlCenter: React.FC<AlertControlCenterProps> = ({
  alerts,
  systemControls,
  onAlertRead,
  onAlertDismiss,
  onControlChange,
  onToggleNotifications,
  notificationsEnabled = true
}) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'alerts' | 'controls'>('alerts');
  
  // Calculate unread count
  const unreadCount = alerts.filter(alert => !alert.isRead).length;
  
  // Group alerts by date
  const groupedAlerts = groupAlertsByDate(alerts);
  
  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } }
  };
  
  return (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative"
            >
              <Shield className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold">
                  {unreadCount}
                </span>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>مرکز کنترل و هشدارها</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-0 mt-2 w-[400px] rounded-xl bg-white/95 dark:bg-slate-900/95 shadow-xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm overflow-hidden z-50"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold flex items-center">
                  {activeTab === 'alerts' ? (
                    <>
                      <Bell className="h-4 w-4 ml-2" />
                      مرکز هشدارها
                    </>
                  ) : (
                    <>
                      <Settings className="h-4 w-4 ml-2" />
                      کنترل‌های سیستم
                    </>
                  )}
                </h2>
                
                <div className="flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl p-1 min-w-[180px]">
                      <DropdownMenuItem
                        className="rounded-lg cursor-pointer"
                        onClick={() => onToggleNotifications && onToggleNotifications(!notificationsEnabled)}
                      >
                        {notificationsEnabled ? (
                          <>
                            <EyeOff className="h-4 w-4 ml-2" />
                            <span>غیرفعال کردن اعلان‌ها</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 ml-2" />
                            <span>فعال کردن اعلان‌ها</span>
                          </>
                        )}
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem className="rounded-lg cursor-pointer">
                        <Filter className="h-4 w-4 ml-2" />
                        <span>فیلتر هشدارها</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem className="rounded-lg cursor-pointer">
                        <Settings className="h-4 w-4 ml-2" />
                        <span>تنظیمات هشدارها</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => setOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-2">
                <Button
                  variant={activeTab === 'alerts' ? 'default' : 'outline'}
                  className="flex-1 rounded-lg"
                  onClick={() => setActiveTab('alerts')}
                >
                  <Bell className="h-4 w-4 ml-2" />
                  هشدارها
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="mr-1 h-5 min-w-5 font-normal">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
                
                <Button
                  variant={activeTab === 'controls' ? 'default' : 'outline'}
                  className="flex-1 rounded-lg"
                  onClick={() => setActiveTab('controls')}
                >
                  <Settings className="h-4 w-4 ml-2" />
                  کنترل‌ها
                </Button>
              </div>
            </div>
            
            {/* Content */}
            <ScrollArea className="max-h-[60vh] min-h-[200px]">
              <div className="p-4">
                {activeTab === 'alerts' ? (
                  <div>
                    {Object.keys(groupedAlerts).length > 0 ? (
                      Object.entries(groupedAlerts).map(([date, dateAlerts]) => (
                        <div key={date} className="mb-4">
                          <h4 className="text-sm font-semibold text-slate-500 mb-2 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm py-1">
                            {date}
                          </h4>
                          
                          <AnimatePresence initial={false}>
                            {dateAlerts.map(alert => (
                              <AlertItem
                                key={alert.id}
                                alert={alert}
                                onRead={onAlertRead}
                                onDismiss={onAlertDismiss}
                              />
                            ))}
                          </AnimatePresence>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-slate-500">
                        <Shield className="h-12 w-12 mb-3 opacity-20" />
                        <p className="text-sm">هیچ هشداری وجود ندارد</p>
                        <p className="text-xs">سیستم در حال حاضر بدون هشدار است</p>
                      </div>
                    )}
                  </div>
                ) : (
                  // Controls tab
                  <div className="space-y-3">
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                        کنترل‌های سریع
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex flex-col items-center justify-center p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                          <Wifi className="h-5 w-5 mb-1 text-slate-700 dark:text-slate-300" />
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">وای‌فای</span>
                        </button>
                        
                        <button className="flex flex-col items-center justify-center p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                          <Bluetooth className="h-5 w-5 mb-1 text-slate-700 dark:text-slate-300" />
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">بلوتوث</span>
                        </button>
                        
                        <button className="flex flex-col items-center justify-center p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                          <Moon className="h-5 w-5 mb-1 text-slate-700 dark:text-slate-300" />
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">حالت شب</span>
                        </button>
                        
                        <button className="flex flex-col items-center justify-center p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                          <MonitorSmartphone className="h-5 w-5 mb-1 text-slate-700 dark:text-slate-300" />
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">نمایشگر</span>
                        </button>
                      </div>
                    </div>
                    
                    {systemControls.map(control => (
                      <ControlItem
                        key={control.id}
                        control={control}
                        onChange={onControlChange}
                      />
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Footer */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
              <span className="text-xs text-slate-500">
                {activeTab === 'alerts' ? 'مرکز مدیریت هشدارها' : 'تنظیمات سیستم'}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs rounded-lg"
                onClick={() => setOpen(false)}
              >
                بستن
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertControlCenter;