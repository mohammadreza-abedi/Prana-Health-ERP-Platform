import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bell,
  MessageSquare,
  Heart,
  Calendar,
  Award,
  User,
  ChevronDown,
  CheckCircle2,
  X,
  Settings,
  Info,
  AlertTriangle,
  EyeOff,
  Clock,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  type: "system" | "achievement" | "reminder" | "alert" | "message";
  read: boolean;
  actionText?: string;
  actionUrl?: string;
  icon?: React.ReactNode;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date(),
      read: false,
      ...notification,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    return newNotification.id;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications,
  };
}

interface NotificationBarProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClear: (id: string) => void;
  onClearAll: () => void;
}

export function NotificationBar({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onClear,
  onClearAll,
}: NotificationBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  // Pulse animation effect when new notifications arrive
  useEffect(() => {
    if (unreadCount > 0) {
      setHasNewNotification(true);
      const timer = setTimeout(() => {
        setHasNewNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  const getIconForType = (type: string, read: boolean) => {
    const className = cn(
      "h-5 w-5",
      !read && "text-tiffany animate-pulse",
      read && "text-slate-400"
    );

    switch (type) {
      case "system":
        return <Info className={className} />;
      case "achievement":
        return <Award className={className} />;
      case "reminder":
        return <Clock className={className} />;
      case "alert":
        return <AlertTriangle className={className} />;
      case "message":
        return <MessageSquare className={className} />;
      default:
        return <Bell className={className} />;
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case "system":
        return "سیستم";
      case "achievement":
        return "دستاورد";
      case "reminder":
        return "یادآوری";
      case "alert":
        return "هشدار";
      case "message":
        return "پیام";
      default:
        return "اعلان";
    }
  };

  const getNotificationStyles = (type: string, read: boolean) => {
    const baseStyle = "border-r-4 rounded-lg p-4 mb-2 transition-all";
    const readStyle = read ? "bg-slate-50 dark:bg-slate-800/50" : "bg-white dark:bg-slate-800 shadow-md";
    
    switch (type) {
      case "system":
        return cn(baseStyle, "border-blue-500", readStyle);
      case "achievement":
        return cn(baseStyle, "border-yellow-500", readStyle);
      case "reminder":
        return cn(baseStyle, "border-tiffany", readStyle);
      case "alert":
        return cn(baseStyle, "border-red-500", readStyle);
      case "message":
        return cn(baseStyle, "border-purple-500", readStyle);
      default:
        return cn(baseStyle, "border-slate-500", readStyle);
    }
  };

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case "system":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "achievement":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "reminder":
        return "bg-tiffany/10 text-tiffany dark:bg-tiffany/20 dark:text-tiffany/80";
      case "alert":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
      case "message":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300";
    }
  };

  const formatNotificationTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) {
      return "همین الان";
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} دقیقه پیش`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} ساعت پیش`;
    } else {
      return `${Math.floor(diff / 86400)} روز پیش`;
    }
  };

  const filteredNotifications = filter 
    ? notifications.filter(n => n.type === filter) 
    : notifications;

  const filterButtons = [
    { value: null, label: "همه" },
    { value: "achievement", label: "دستاوردها" },
    { value: "reminder", label: "یادآوری‌ها" },
    { value: "alert", label: "هشدارها" },
    { value: "message", label: "پیام‌ها" },
    { value: "system", label: "سیستم" },
  ];

  return (
    <div className="z-50 relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative rounded-full p-2 transition-all", 
          isOpen ? "bg-tiffany text-white" : "bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-tiffany/10",
          hasNewNotification && "animate-shake"
        )}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center"
          >
            {unreadCount}
          </motion.div>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-full sm:w-96 max-h-[80vh] overflow-hidden bg-white dark:bg-slate-900 rounded-xl shadow-xl mica border border-slate-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold flex items-center">
                <Bell className="h-5 w-5 ml-2 text-tiffany" /> 
                اعلان‌ها
                {unreadCount > 0 && (
                  <Badge variant="default" className="mr-2 bg-tiffany">{unreadCount}</Badge>
                )}
              </h3>
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onMarkAllAsRead}
                  disabled={unreadCount === 0}
                  className="text-xs"
                >
                  <CheckCircle2 className="h-4 w-4 ml-1" />
                  خواندن همه
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClearAll}
                  disabled={notifications.length === 0}
                  className="text-xs"
                >
                  <X className="h-4 w-4 ml-1" />
                  پاک کردن همه
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="p-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
              <div className="flex space-x-1 space-x-reverse">
                {filterButtons.map((btn) => (
                  <Button
                    key={btn.value || "all"}
                    variant={filter === btn.value ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                    onClick={() => setFilter(btn.value)}
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[calc(80vh-120px)] overflow-y-auto p-4">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                  <EyeOff className="h-10 w-10 mb-2" />
                  <p>هیچ اعلانی وجود ندارد</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={getNotificationStyles(notification.type, notification.read)}
                    onClick={() => !notification.read && onMarkAsRead(notification.id)}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 pt-1">
                        {notification.icon || getIconForType(notification.type, notification.read)}
                      </div>
                      <div className="mr-3 flex-grow">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <span className="text-xs text-slate-500 font-light">
                            {formatNotificationTime(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="outline" className={cn("text-xs font-light", getBadgeStyles(notification.type))}>
                            {getNotificationTypeLabel(notification.type)}
                          </Badge>
                          <div className="flex space-x-1 space-x-reverse">
                            {notification.actionText && notification.actionUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-tiffany"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onMarkAsRead(notification.id);
                                  window.location.href = notification.actionUrl!;
                                }}
                              >
                                {notification.actionText}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-slate-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                onClear(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-800 p-3 text-center text-xs text-slate-500">
              <Button variant="ghost" size="sm" className="text-xs w-full">
                <Settings className="h-3 w-3 ml-1" />
                تنظیمات اعلان‌ها
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}