import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  BellOff, 
  Check, 
  CheckCheck, 
  Clock, 
  Eye, 
  Info, 
  MoreHorizontal, 
  ShieldAlert, 
  Trash2, 
  X, 
  BellRing,
  Filter,
  AlertTriangle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'system';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  timestamp: Date;
  read: boolean;
  actionable?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
  source?: {
    name: string;
    avatar?: string;
    department?: string;
  };
  link?: string;
}

interface AdvancedNotificationBarProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearNotification: (id: string) => void;
  onClearAllNotifications: () => void;
  onAction?: (id: string, actionIndex: number) => void;
  onFilterChange?: (filter: string) => void;
}

// Priority color mapping
const getPriorityColor = (priority: NotificationPriority): string => {
  switch (priority) {
    case 'low': return 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300';
    case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
    case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default: return 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300';
  }
};

// Type icon mapping
const getTypeIcon = (type: NotificationType) => {
  switch (type) {
    case 'info': return <Info className="h-4 w-4" />;
    case 'success': return <Check className="h-4 w-4" />;
    case 'warning': return <AlertTriangle className="h-4 w-4" />;
    case 'error': return <ShieldAlert className="h-4 w-4" />;
    case 'system': return <BellRing className="h-4 w-4" />;
    default: return <Info className="h-4 w-4" />;
  }
};

const getTypeBackground = (type: NotificationType): string => {
  switch (type) {
    case 'info': return 'bg-blue-50 dark:bg-blue-900/20';
    case 'success': return 'bg-green-50 dark:bg-green-900/20';
    case 'warning': return 'bg-amber-50 dark:bg-amber-900/20';
    case 'error': return 'bg-red-50 dark:bg-red-900/20';
    case 'system': return 'bg-purple-50 dark:bg-purple-900/20';
    default: return 'bg-slate-50 dark:bg-slate-800/20';
  }
};

const getTypeBorderColor = (type: NotificationType): string => {
  switch (type) {
    case 'info': return 'border-blue-200 dark:border-blue-800';
    case 'success': return 'border-green-200 dark:border-green-800';
    case 'warning': return 'border-amber-200 dark:border-amber-800';
    case 'error': return 'border-red-200 dark:border-red-800';
    case 'system': return 'border-purple-200 dark:border-purple-800';
    default: return 'border-slate-200 dark:border-slate-700';
  }
};

// Format the time since the notification
const formatTimeSince = (date: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diff < 60) return 'لحظاتی پیش';
  if (diff < 3600) return `${Math.floor(diff / 60)} دقیقه پیش`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ساعت پیش`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} روز پیش`;
  
  const day = date.getDate();
  const month = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'][date.getMonth()];
  return `${day} ${month}`;
};

// Notification item component
const NotificationItem = ({
  notification,
  onMarkAsRead,
  onClearNotification,
  onAction,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onClearNotification: (id: string) => void;
  onAction?: (id: string, actionIndex: number) => void;
}) => {
  // State to track hover
  const [isHovered, setIsHovered] = useState(false);
  
  // Derive color classes based on notification type and priority
  const typeBackground = getTypeBackground(notification.type);
  const typeBorder = getTypeBorderColor(notification.type);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative p-3 rounded-xl border mb-2 transition-all",
        typeBorder,
        typeBackground,
        notification.read ? "opacity-80" : "shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Read/Unread indicator */}
      {!notification.read && (
        <span className="absolute left-3 top-3 w-2 h-2 rounded-full bg-blue-500"></span>
      )}
      
      <div className="flex items-start gap-2">
        {/* Source avatar or type icon */}
        <div className="flex-shrink-0">
          {notification.source?.avatar ? (
            <Avatar className="w-10 h-10 border-2 border-white dark:border-slate-800">
              <img src={notification.source.avatar} alt={notification.source.name} />
            </Avatar>
          ) : (
            <div className={cn(
              "w-10 h-10 flex items-center justify-center rounded-full",
              notification.type === 'info' ? "bg-blue-100 text-blue-600 dark:bg-blue-800/30 dark:text-blue-400" :
              notification.type === 'success' ? "bg-green-100 text-green-600 dark:bg-green-800/30 dark:text-green-400" :
              notification.type === 'warning' ? "bg-amber-100 text-amber-600 dark:bg-amber-800/30 dark:text-amber-400" :
              notification.type === 'error' ? "bg-red-100 text-red-600 dark:bg-red-800/30 dark:text-red-400" :
              "bg-purple-100 text-purple-600 dark:bg-purple-800/30 dark:text-purple-400"
            )}>
              {getTypeIcon(notification.type)}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-1">
            <h3 className={cn(
              "font-semibold text-sm",
              !notification.read ? "text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-300"
            )}>
              {notification.title}
            </h3>
            
            {/* Priority badge */}
            {notification.priority === 'high' || notification.priority === 'critical' ? (
              <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                {notification.priority === 'high' ? 'مهم' : 'ضروری'}
              </Badge>
            ) : null}
          </div>
          
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
            {notification.message}
          </p>
          
          {/* Footer with timestamp and actions */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatTimeSince(notification.timestamp)}</span>
              
              {notification.source?.name && (
                <>
                  <span className="mx-1">•</span>
                  <span>{notification.source.name}</span>
                </>
              )}
            </div>
            
            {/* Action buttons on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-1"
                >
                  {!notification.read && (
                    <button 
                      onClick={() => onMarkAsRead(notification.id)}
                      className="p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/30 text-blue-600 dark:text-blue-400"
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                    </button>
                  )}
                  
                  <button 
                    onClick={() => onClearNotification(notification.id)}
                    className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/30 text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Action buttons if actionable notification */}
          {notification.actionable && notification.actions && (
            <div className="flex mt-2 gap-2 justify-end">
              {notification.actions.map((action, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs rounded-lg"
                  onClick={() => onAction && onAction(notification.id, index)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const AdvancedNotificationBar: React.FC<AdvancedNotificationBarProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearNotification,
  onClearAllNotifications,
  onAction,
  onFilterChange
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } }
  };
  
  // Get unread count
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'unread') return notifications.filter(n => !n.read);
    if (activeTab === 'priority') return notifications.filter(n => 
      n.priority === 'high' || n.priority === 'critical'
    );
    
    // Filter by type
    return notifications.filter(n => n.type === activeTab);
  };
  
  const filteredNotifications = getFilteredNotifications();
  
  // Handle filter change
  const handleFilterChange = (value: string) => {
    setFilter(value);
    if (onFilterChange) onFilterChange(value);
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
              {unreadCount > 0 ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold">
                    {unreadCount}
                  </span>
                </motion.div>
              ) : (
                <Bell className="h-5 w-5" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>اعلان‌ها و هشدارهای سیستم</p>
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
            className="absolute z-50 left-0 mt-2 w-[420px] rounded-xl bg-white/95 dark:bg-slate-900/95 shadow-xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Notification header */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-semibold flex items-center">
                  <Bell className="h-4 w-4 ml-2" />
                  اعلان‌ها و هشدارها
                </h2>
                <div className="flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl p-1">
                      <DropdownMenuLabel>تنظیمات اعلان‌ها</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="rounded-lg cursor-pointer">
                        <Eye className="h-4 w-4 ml-2" />
                        <span>نمایش همه اعلان‌ها</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="rounded-lg cursor-pointer"
                        onClick={onMarkAllAsRead}
                      >
                        <CheckCheck className="h-4 w-4 ml-2" />
                        <span>خواندن همه اعلان‌ها</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="rounded-lg cursor-pointer"
                        onClick={onClearAllNotifications}
                      >
                        <Trash2 className="h-4 w-4 ml-2" />
                        <span>پاک کردن همه اعلان‌ها</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>فیلتر</DropdownMenuLabel>
                        <DropdownMenuRadioGroup value={filter} onValueChange={handleFilterChange}>
                          <DropdownMenuRadioItem className="rounded-lg cursor-pointer" value="all">همه اعلان‌ها</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem className="rounded-lg cursor-pointer" value="unread">خوانده نشده</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem className="rounded-lg cursor-pointer" value="important">مهم و ضروری</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => setOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Filter tabs */}
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 h-8">
                  <TabsTrigger value="all" className="text-xs rounded-md">همه</TabsTrigger>
                  <TabsTrigger value="unread" className="text-xs rounded-md">
                    نخوانده
                    {unreadCount > 0 && (
                      <span className="ml-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] rounded-full px-1.5">
                        {unreadCount}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="priority" className="text-xs rounded-md">مهم</TabsTrigger>
                  <TabsTrigger value="warning" className="text-xs rounded-md">هشدارها</TabsTrigger>
                  <TabsTrigger value="system" className="text-xs rounded-md">سیستم</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Notification content */}
            <ScrollArea className="max-h-[60vh] min-h-[200px]">
              <AnimatePresence initial={false}>
                <div className="p-3">
                  {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={onMarkAsRead}
                        onClearNotification={onClearNotification}
                        onAction={onAction}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-40 text-slate-500 dark:text-slate-400"
                    >
                      <BellOff className="h-12 w-12 mb-3 opacity-20" />
                      <p className="text-sm">هیچ اعلانی وجود ندارد</p>
                      <p className="text-xs">تمام اعلان‌ها مشاهده شده‌اند</p>
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </ScrollArea>
            
            {/* Footer actions */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-lg text-xs h-8 w-full max-w-[200px]"
                onClick={() => setOpen(false)}
              >
                مشاهده همه اعلان‌ها و تنظیمات
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedNotificationBar;