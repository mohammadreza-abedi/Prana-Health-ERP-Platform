import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Users, Layers, Palette, Shield, Database, Code, BarChart2, 
  FilePlus, Trash2, Eye, EyeOff, Lock, Unlock, Save, FileText, 
  RefreshCw, Server, Monitor, PlusCircle, Edit3, X, ChevronDown,
  ChevronRight, ChevronLeft, Search, Check, Activity, AlertTriangle,
  Bell, Calendar, Clock, Command, Copy, Download, ExternalLink,
  Filter, Grid, Layout, List, Mail, MapPin, Menu, MessageSquare,
  MoreHorizontal, Repeat, Sliders, Terminal, Upload, Zap,
  Maximize, Minimize, Globe, HardDrive, Cpu, Wifi, GitBranch, 
  Trello, BarChart, Folder, FolderPlus, Image, Video, Music,
  FileCode, Package, AlertCircle, ArrowUpRight, GitCommit,
  User, UserPlus, UserMinus, UserCheck, Bookmark, Book, Coffee, 
  Columns, ArrowLeft, ArrowRight, FileCheck, CircleCheck,
  Minus, Info, Home, LayoutDashboard, Award, UserCircle, 
  File as FileIcon, ChevronUp, Plus, CheckSquare
} from "lucide-react";
import { keyframes } from "@emotion/react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "wouter";

// مدل‌های داده
interface PageData {
  id: string;
  title: string;
  path: string;
  icon: string;
  component: string;
  isVisible: boolean;
  isProtected: boolean;
  parentId: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  metadata: {
    description?: string;
    keywords?: string[];
    layout?: string;
    layoutSettings?: Record<string, any>;
    customCss?: string;
    customJs?: string;
    permissions?: string[];
  };
}

interface ComponentData {
  id: string;
  name: string;
  type: string;
  code: string;
  isGlobal: boolean;
  dependencies: string[];
  createdAt: string;
  updatedAt: string;
}

interface ThemeData {
  id: string;
  name: string;
  colors: Record<string, string>;
  fonts: {
    primary: string;
    secondary: string;
    monospace: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

interface SystemStat {
  name: string;
  value: string | number;
  trend: 'up' | 'down' | 'neutral';
  change?: number;
  icon: React.ReactNode;
}

interface LogEntry {
  id: string;
  level: 'info' | 'warning' | 'error' | 'debug' | 'critical';
  message: string;
  timestamp: string;
  source: string;
  data?: any;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  timestamp: string;
}

interface Setting {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'json' | 'color' | 'select';
  category: string;
  description: string;
  options?: string[];
}

// کامپوننت‌های واسط کاربری
const AdminHeader = ({ 
  breadcrumbs, 
  title, 
  notifications, 
  onSave, 
  isSaving 
}: { 
  breadcrumbs: Array<{ title: string; path: string }>;
  title: string;
  notifications: Notification[];
  onSave: () => void;
  isSaving: boolean;
}) => {
  return (
    <div className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-1">
            {breadcrumbs.map((item, idx) => (
              <div key={idx} className="flex items-center">
                {idx > 0 && <ChevronRight className="h-3 w-3 mx-1" />}
                <Link to={item.path} className="hover:text-tiffany dark:hover:text-tiffany-light">
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h1>
        </div>
        <div className="flex items-center space-s-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-1"
          >
            {isSaving ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>ذخیره تغییرات</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>اعلان‌ها</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-[300px]">
                {notifications.length === 0 ? (
                  <div className="text-center py-4 text-slate-500 dark:text-slate-400">
                    اعلان جدیدی وجود ندارد
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-3 cursor-default">
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-amber-500' :
                          notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <Badge 
                              variant={notification.isRead ? "outline" : "default"} 
                              className="text-[10px] h-5"
                            >
                              {notification.isRead ? 'خوانده شده' : 'جدید'}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notification.message}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">
                            {new Date(notification.timestamp).toLocaleString('fa-IR')}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </ScrollArea>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-center">
                مشاهده همه اعلان‌ها
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>تنظیمات پنل ادمین</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                <span>کنسول دستورات</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span>بازنشانی پنل</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Shield className="h-4 w-4" />
                <span>خروج از حالت ادمین</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

const AdminSidebar = ({ 
  isExpanded, 
  onToggle, 
  activeSection, 
  onSectionChange
}: { 
  isExpanded: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}) => {
  // آرایه بخش‌های اصلی پنل ادمین
  const sections = [
    { id: 'dashboard', title: 'داشبورد مدیریت', icon: <Layout className="h-4 w-4" /> },
    { id: 'pages', title: 'مدیریت صفحات', icon: <Layers className="h-4 w-4" /> },
    { id: 'components', title: 'مدیریت کامپوننت‌ها', icon: <Code className="h-4 w-4" /> },
    { id: 'ui-editor', title: 'ویرایشگر رابط کاربری', icon: <Palette className="h-4 w-4" /> },
    { id: 'users', title: 'مدیریت کاربران', icon: <Users className="h-4 w-4" /> },
    { id: 'analytics', title: 'آنالیز و آمار', icon: <BarChart2 className="h-4 w-4" /> },
    { id: 'settings', title: 'تنظیمات سیستم', icon: <Settings className="h-4 w-4" /> },
    { id: 'database', title: 'مدیریت دیتابیس', icon: <Database className="h-4 w-4" /> },
    { id: 'logs', title: 'لاگ‌ها و رویدادها', icon: <FileText className="h-4 w-4" /> }
  ];
  
  // آرایه بخش‌های زیرمجموعه برای پنل‌های گسترده‌تر
  const subSections: Record<string, Array<{ id: string; title: string; icon: React.ReactNode }>> = {
    pages: [
      { id: 'pages-list', title: 'لیست صفحات', icon: <List className="h-4 w-4" /> },
      { id: 'page-editor', title: 'ویرایشگر صفحه', icon: <Edit3 className="h-4 w-4" /> },
      { id: 'page-structure', title: 'ساختار صفحات', icon: <GitBranch className="h-4 w-4" /> },
      { id: 'page-templates', title: 'قالب‌های آماده', icon: <Copy className="h-4 w-4" /> }
    ],
    components: [
      { id: 'components-list', title: 'لیست کامپوننت‌ها', icon: <Grid className="h-4 w-4" /> },
      { id: 'component-editor', title: 'ویرایشگر کامپوننت', icon: <Edit3 className="h-4 w-4" /> },
      { id: 'component-library', title: 'کتابخانه کامپوننت‌ها', icon: <Book className="h-4 w-4" /> }
    ],
    'ui-editor': [
      { id: 'themes', title: 'مدیریت تم‌ها', icon: <Palette className="h-4 w-4" /> },
      { id: 'layouts', title: 'لی‌اوت‌ها', icon: <Columns className="h-4 w-4" /> },
      { id: 'widgets', title: 'ویجت‌ها', icon: <Package className="h-4 w-4" /> }
    ],
    users: [
      { id: 'users-list', title: 'لیست کاربران', icon: <User className="h-4 w-4" /> },
      { id: 'roles', title: 'نقش‌ها و دسترسی‌ها', icon: <Lock className="h-4 w-4" /> },
      { id: 'user-activity', title: 'فعالیت کاربران', icon: <Activity className="h-4 w-4" /> }
    ],
    analytics: [
      { id: 'performance', title: 'عملکرد سیستم', icon: <Activity className="h-4 w-4" /> },
      { id: 'user-analytics', title: 'آنالیز کاربران', icon: <UserCheck className="h-4 w-4" /> },
      { id: 'reports', title: 'گزارشات', icon: <FileText className="h-4 w-4" /> }
    ],
    database: [
      { id: 'tables', title: 'جداول', icon: <Trello className="h-4 w-4" /> },
      { id: 'queries', title: 'کوئری‌ها', icon: <Terminal className="h-4 w-4" /> },
      { id: 'backups', title: 'پشتیبان‌گیری', icon: <HardDrive className="h-4 w-4" /> }
    ]
  };
  
  // پویانمایی برای سایدبار
  const sidebarAnimation = {
    open: { width: 280, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { width: 70, transition: { duration: 0.3, ease: "easeInOut" } }
  };
  
  // بررسی اینکه بخش فعلی زیرمجموعه دارد یا خیر
  const hasSubSections = (sectionId: string) => subSections[sectionId]?.length > 0;
  
  // بررسی اینکه آیا بخش یا زیربخش فعال است
  const isActive = (sectionId: string) => activeSection === sectionId || 
    (subSections[activeSection]?.some(sub => sub.id === sectionId));
    
  // بررسی اینکه آیا بخش والد فعال است
  const isParentActive = (sectionId: string) => 
    subSections[sectionId]?.some(sub => sub.id === activeSection);
  
  return (
    <motion.aside
      initial="open"
      animate={isExpanded ? "open" : "closed"}
      variants={sidebarAnimation}
      className="h-screen bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto overflow-x-hidden flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="font-bold text-lg text-slate-900 dark:text-white flex items-center"
          >
            <Shield className="h-5 w-5 ml-2 text-tiffany" />
            <span>پنل ادمین</span>
          </motion.div>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle}>
          {isExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-1">
          {sections.map(section => (
            <div key={section.id} className="mb-2">
              <button
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center p-2 rounded-md transition-all duration-200 
                  ${isActive(section.id) || isParentActive(section.id) 
                    ? 'bg-tiffany/10 text-tiffany dark:bg-tiffany/20 dark:text-tiffany-light'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}
                  ${isExpanded ? 'justify-between' : 'justify-center'}`}
              >
                <span className="flex items-center">
                  <span className="transition-transform duration-200">
                    {section.icon}
                  </span>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mr-3 text-sm font-medium"
                    >
                      {section.title}
                    </motion.span>
                  )}
                </span>
                {isExpanded && hasSubSections(section.id) && (
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    isParentActive(section.id) ? 'transform rotate-180' : ''
                  }`} />
                )}
              </button>
              
              {/* نمایش زیرمجموعه‌ها اگر بخش اصلی فعال است */}
              {isExpanded && hasSubSections(section.id) && isParentActive(section.id) && (
                <div className="mr-3 mt-1 border-r border-slate-200 dark:border-slate-700 pr-2">
                  {subSections[section.id].map(subSection => (
                    <button
                      key={subSection.id}
                      onClick={() => onSectionChange(subSection.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm transition-all duration-200 
                        ${isActive(subSection.id) 
                          ? 'bg-tiffany/10 text-tiffany dark:bg-tiffany/20 dark:text-tiffany-light'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                    >
                      <span className="mr-2">{subSection.icon}</span>
                      <span>{subSection.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t border-slate-200 dark:border-slate-800">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="destructive" 
                size={isExpanded ? "default" : "icon"} 
                className="w-full"
              >
                <Shield className="h-4 w-4" />
                {isExpanded && <span className="mr-2">خروج از حالت ادمین</span>}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>خروج از حالت ادمین</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.aside>
  );
};

// بخش‌های مختلف پنل ادمین
const DashboardSection = () => {
  const stats: SystemStat[] = [
    { 
      name: 'کاربران فعال', 
      value: 2845, 
      trend: 'up', 
      change: 12.5, 
      icon: <Users className="h-5 w-5 text-blue-500" />
    },
    { 
      name: 'تعداد صفحات', 
      value: 48, 
      trend: 'up', 
      change: 5.2, 
      icon: <Layers className="h-5 w-5 text-tiffany" />
    },
    { 
      name: 'کامپوننت‌ها', 
      value: 124, 
      trend: 'up', 
      change: 3.7, 
      icon: <Code className="h-5 w-5 text-purple-500" />
    },
    { 
      name: 'تعداد بازدید', 
      value: '12.6K', 
      trend: 'up', 
      change: 8.1, 
      icon: <Eye className="h-5 w-5 text-green-500" />
    },
    { 
      name: 'زمان لود سرور', 
      value: '245ms', 
      trend: 'down', 
      change: 15.3, 
      icon: <Activity className="h-5 w-5 text-amber-500" />
    },
    { 
      name: 'آخرین به‌روزرسانی', 
      value: 'امروز', 
      trend: 'neutral', 
      icon: <RefreshCw className="h-5 w-5 text-slate-500" />
    },
  ];
  
  const recentLogs: LogEntry[] = [
    {
      id: '1',
      level: 'info',
      message: 'سیستم با موفقیت به‌روزرسانی شد',
      timestamp: new Date().toISOString(),
      source: 'system'
    },
    {
      id: '2',
      level: 'warning',
      message: 'تلاش ناموفق برای ورود به سیستم',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      source: 'auth'
    },
    {
      id: '3',
      level: 'error',
      message: 'خطا در اتصال به پایگاه داده',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      source: 'database'
    },
    {
      id: '4',
      level: 'info',
      message: 'کاربر جدید ثبت‌نام کرد',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      source: 'users'
    },
    {
      id: '5',
      level: 'debug',
      message: 'بررسی عملکرد API',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      source: 'api'
    }
  ];
  
  const systemStatus = [
    { name: 'وضعیت سیستم', status: 'online', indicator: 'success' },
    { name: 'پایگاه داده', status: 'online', indicator: 'success' },
    { name: 'سرور API', status: 'online', indicator: 'success' },
    { name: 'سیستم فایل', status: 'warning', indicator: 'warning' },
    { name: 'سرویس ایمیل', status: 'offline', indicator: 'error' },
  ];
  
  return (
    <div className="space-y-6">
      {/* آمار کلی */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.name}
                </CardTitle>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <div className={`text-xs flex items-center 
                  ${stat.trend === 'up' ? 'text-green-500' : 
                    stat.trend === 'down' ? 'text-red-500' : 'text-slate-500'}`}>
                  {stat.trend === 'up' ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    stat.trend === 'down' ? 
                      <ChevronDown className="h-3 w-3 mr-1" /> : 
                      <Minus className="h-3 w-3 mr-1" />}
                  {stat.change}%
                  <span className="text-slate-400 dark:text-slate-500 mr-1">از هفته قبل</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* جدول سیستم */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">وضعیت سیستم</CardTitle>
            <CardDescription>وضعیت فعلی سرویس‌های سیستم</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 
                      ${item.indicator === 'success' ? 'bg-green-500' : 
                        item.indicator === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <Badge variant={
                    item.indicator === 'success' ? 'success' : 
                    item.indicator === 'warning' ? 'warning' : 'destructive'
                  }>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              <RefreshCw className="h-4 w-4 ml-2" />
              بررسی مجدد وضعیت
            </Button>
          </CardFooter>
        </Card>

        {/* لاگ‌های اخیر */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">لاگ‌های اخیر</CardTitle>
            <CardDescription>آخرین رویدادهای ثبت شده در سیستم</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="flex items-start">
                    <div className={`p-1.5 rounded-md ${
                      log.level === 'info' ? 'bg-blue-50 dark:bg-blue-900/20' : 
                      log.level === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20' :
                      log.level === 'error' ? 'bg-red-50 dark:bg-red-900/20' :
                      log.level === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : 
                      'bg-slate-50 dark:bg-slate-900/20'
                    }`}>
                      {log.level === 'info' ? <Info className="h-4 w-4 text-blue-500" /> :
                       log.level === 'warning' ? <AlertTriangle className="h-4 w-4 text-amber-500" /> :
                       log.level === 'error' ? <AlertCircle className="h-4 w-4 text-red-500" /> :
                       log.level === 'critical' ? <Shield className="h-4 w-4 text-red-600" /> :
                       <Terminal className="h-4 w-4 text-slate-500" />}
                    </div>
                    <div className="mr-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{log.message}</p>
                        <Badge variant="outline" className="ml-2">
                          {log.source}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {new Date(log.timestamp).toLocaleString('fa-IR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" size="sm" className="w-full">
              مشاهده همه لاگ‌ها
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const PagesSection = () => {
  const [pages, setPages] = useState<PageData[]>([
    {
      id: '1',
      title: 'صفحه اصلی',
      path: '/',
      icon: 'Home',
      component: 'HomePage',
      isVisible: true,
      isProtected: false,
      parentId: null,
      order: 1,
      createdAt: '2023-05-10T08:30:00Z',
      updatedAt: '2023-06-15T14:25:00Z',
      metadata: {
        description: 'صفحه اصلی سایت',
        keywords: ['خانه', 'صفحه اصلی'],
        layout: 'default'
      }
    },
    {
      id: '2',
      title: 'داشبورد',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      component: 'DashboardPage',
      isVisible: true,
      isProtected: true,
      parentId: null,
      order: 2,
      createdAt: '2023-05-10T09:00:00Z',
      updatedAt: '2023-06-20T10:15:00Z',
      metadata: {
        description: 'داشبورد کاربر',
        keywords: ['داشبورد', 'پنل کاربری'],
        layout: 'dashboard'
      }
    },
    {
      id: '3',
      title: 'چالش‌ها',
      path: '/challenges',
      icon: 'Award',
      component: 'ChallengesPage',
      isVisible: true,
      isProtected: true,
      parentId: null,
      order: 3,
      createdAt: '2023-05-12T11:20:00Z',
      updatedAt: '2023-06-18T16:40:00Z',
      metadata: {
        description: 'چالش‌های سلامتی',
        keywords: ['چالش', 'سلامتی'],
        layout: 'default'
      }
    },
    {
      id: '4',
      title: 'جدول امتیازات',
      path: '/leaderboard',
      icon: 'BarChart',
      component: 'LeaderboardPage',
      isVisible: true,
      isProtected: true,
      parentId: null,
      order: 4,
      createdAt: '2023-05-15T08:45:00Z',
      updatedAt: '2023-06-22T09:30:00Z',
      metadata: {
        description: 'جدول امتیازات کاربران',
        keywords: ['امتیاز', 'رتبه‌بندی'],
        layout: 'default'
      }
    },
    {
      id: '5',
      title: 'پروفایل',
      path: '/profile',
      icon: 'User',
      component: 'ProfilePage',
      isVisible: true,
      isProtected: true,
      parentId: null,
      order: 5,
      createdAt: '2023-05-18T13:10:00Z',
      updatedAt: '2023-06-25T15:20:00Z',
      metadata: {
        description: 'پروفایل کاربر',
        keywords: ['پروفایل', 'کاربر'],
        layout: 'default'
      }
    },
    {
      id: '6',
      title: 'سفارشی‌سازی آواتار',
      path: '/avatar-customizer',
      icon: 'UserCircle',
      component: 'AvatarCustomizerPage',
      isVisible: true,
      isProtected: true,
      parentId: '5',
      order: 1,
      createdAt: '2023-05-20T10:30:00Z',
      updatedAt: '2023-06-28T11:45:00Z',
      metadata: {
        description: 'سفارشی‌سازی آواتار کاربر',
        keywords: ['آواتار', 'سفارشی‌سازی'],
        layout: 'default'
      }
    },
    {
      id: '7',
      title: 'تنظیمات',
      path: '/settings',
      icon: 'Settings',
      component: 'SettingsPage',
      isVisible: true,
      isProtected: true,
      parentId: null,
      order: 6,
      createdAt: '2023-05-22T09:15:00Z',
      updatedAt: '2023-07-01T08:30:00Z',
      metadata: {
        description: 'تنظیمات کاربر',
        keywords: ['تنظیمات'],
        layout: 'default'
      }
    },
    {
      id: '8',
      title: 'داشبورد مدیریت HSE',
      path: '/hse-smart-dashboard',
      icon: 'Activity',
      component: 'HSESmartDashboardPage',
      isVisible: true,
      isProtected: true,
      parentId: null,
      order: 7,
      createdAt: '2023-06-05T14:20:00Z',
      updatedAt: '2023-07-10T16:35:00Z',
      metadata: {
        description: 'داشبورد مدیریت HSE',
        keywords: ['HSE', 'مدیریت', 'ایمنی'],
        layout: 'fullwidth'
      }
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showInvisible, setShowInvisible] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const { toast } = useToast();
  
  // فیلتر کردن صفحات بر اساس جستجو و نمایش پنهان‌ها
  const filteredPages = useMemo(() => {
    return pages
      .filter(page => (showInvisible || page.isVisible))
      .filter(page => 
        page.title.includes(searchTerm) || 
        page.path.includes(searchTerm) ||
        page.component.includes(searchTerm)
      )
      .sort((a, b) => a.order - b.order);
  }, [pages, searchTerm, showInvisible]);
  
  // تغییر ترتیب صفحات
  const handleReorder = (id: string, direction: 'up' | 'down') => {
    const currentIndex = pages.findIndex(page => page.id === id);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === pages.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const updatedPages = [...pages];
    const [movedPage] = updatedPages.splice(currentIndex, 1);
    updatedPages.splice(newIndex, 0, movedPage);
    
    // به‌روزرسانی ترتیب
    const pagesWithNewOrder = updatedPages.map((page, idx) => ({
      ...page,
      order: idx + 1
    }));
    
    setPages(pagesWithNewOrder);
    
    toast({
      title: "ترتیب صفحات به‌روزرسانی شد",
      description: `صفحه "${movedPage.title}" به موقعیت جدید منتقل شد.`,
    });
  };
  
  // تغییر وضعیت نمایش صفحه
  const handleToggleVisibility = (id: string) => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === id 
          ? { ...page, isVisible: !page.isVisible } 
          : page
      )
    );
    
    const page = pages.find(page => page.id === id);
    
    toast({
      title: `صفحه ${page?.title} ${page?.isVisible ? 'پنهان' : 'نمایان'} شد`,
      description: page?.isVisible 
        ? "این صفحه دیگر برای کاربران نمایش داده نمی‌شود." 
        : "این صفحه اکنون برای کاربران نمایش داده می‌شود.",
    });
  };
  
  // تغییر وضعیت محافظت صفحه
  const handleToggleProtection = (id: string) => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === id 
          ? { ...page, isProtected: !page.isProtected } 
          : page
      )
    );
    
    const page = pages.find(page => page.id === id);
    
    toast({
      title: `صفحه ${page?.title} ${page?.isProtected ? 'آزاد' : 'محافظت شده'} شد`,
      description: page?.isProtected 
        ? "این صفحه اکنون برای تمام کاربران (حتی کاربران مهمان) قابل دسترسی است." 
        : "این صفحه اکنون تنها برای کاربران احراز هویت شده قابل دسترسی است.",
    });
  };
  
  // حذف صفحه
  const handleDeletePage = (id: string) => {
    const pageToDelete = pages.find(page => page.id === id);
    
    // بررسی اینکه آیا صفحه زیرصفحه دارد
    const hasChildren = pages.some(page => page.parentId === id);
    
    if (hasChildren) {
      toast({
        title: "خطا در حذف صفحه",
        description: "این صفحه دارای زیرصفحه است. ابتدا زیرصفحه‌ها را حذف کنید.",
        variant: "destructive",
      });
      return;
    }
    
    setPages(prevPages => prevPages.filter(page => page.id !== id));
    
    toast({
      title: "صفحه حذف شد",
      description: `صفحه "${pageToDelete?.title}" با موفقیت حذف شد.`,
    });
  };
  
  // ویرایش صفحه
  const handleEditPage = (page: PageData) => {
    setSelectedPage(page);
    setIsEditDialogOpen(true);
  };
  
  // افزودن صفحه جدید
  const handleAddPage = () => {
    const newPage: PageData = {
      id: `new-${Date.now()}`,
      title: 'صفحه جدید',
      path: '/new-page',
      icon: 'File',
      component: 'NewPage',
      isVisible: true,
      isProtected: false,
      parentId: null,
      order: pages.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        description: 'توضیحات صفحه جدید',
        keywords: ['جدید'],
        layout: 'default'
      }
    };
    
    setSelectedPage(newPage);
    setIsEditDialogOpen(true);
  };
  
  // ذخیره تغییرات صفحه
  const handleSavePage = (updatedPage: PageData) => {
    if (!selectedPage) return;
    
    // اگر صفحه جدید است
    if (selectedPage.id.startsWith('new-')) {
      setPages([...pages, { ...updatedPage, id: `page-${Date.now()}` }]);
      toast({
        title: "صفحه جدید ایجاد شد",
        description: `صفحه "${updatedPage.title}" با موفقیت ایجاد شد.`,
      });
    } else {
      // اگر ویرایش صفحه موجود است
      setPages(prevPages => 
        prevPages.map(page => 
          page.id === updatedPage.id 
            ? { ...updatedPage, updatedAt: new Date().toISOString() } 
            : page
        )
      );
      toast({
        title: "صفحه به‌روزرسانی شد",
        description: `تغییرات صفحه "${updatedPage.title}" با موفقیت ذخیره شد.`,
      });
    }
    
    setIsEditDialogOpen(false);
    setSelectedPage(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="جستجوی صفحات..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <div className="flex items-center">
            <Label htmlFor="show-invisible" className="ml-2 text-sm">
              نمایش صفحات پنهان
            </Label>
            <Switch
              id="show-invisible"
              checked={showInvisible}
              onCheckedChange={setShowInvisible}
            />
          </div>
        </div>
        <Button onClick={handleAddPage}>
          <PlusCircle className="h-4 w-4 ml-2" />
          افزودن صفحه جدید
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>عنوان صفحه</TableHead>
                <TableHead>مسیر</TableHead>
                <TableHead>کامپوننت</TableHead>
                <TableHead className="w-24 text-center">نمایش</TableHead>
                <TableHead className="w-24 text-center">محافظت</TableHead>
                <TableHead className="w-36 text-center">تاریخ به‌روزرسانی</TableHead>
                <TableHead className="w-48 text-center">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-10 w-10 text-slate-300 dark:text-slate-700" />
                      <p>صفحه‌ای یافت نشد!</p>
                      <Button variant="link" size="sm" onClick={() => {
                        setSearchTerm('');
                        setShowInvisible(true);
                      }}>
                        پاک کردن فیلترها
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPages.map((page, index) => (
                  <TableRow 
                    key={page.id} 
                    className={`
                      ${!page.isVisible ? 'bg-slate-50 dark:bg-slate-900/30' : ''}
                      ${hoveredRow === page.id ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
                    `}
                    onMouseEnter={() => setHoveredRow(page.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell>{page.order}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {page.parentId && (
                          <div className="mr-6 border-r border-slate-200 dark:border-slate-700 h-6"></div>
                        )}
                        <div className="flex items-center gap-2">
                          {page.icon === 'Home' && <Home className="h-4 w-4 text-slate-500" />}
                          {page.icon === 'LayoutDashboard' && <LayoutDashboard className="h-4 w-4 text-slate-500" />}
                          {page.icon === 'Award' && <Award className="h-4 w-4 text-slate-500" />}
                          {page.icon === 'BarChart' && <BarChart className="h-4 w-4 text-slate-500" />}
                          {page.icon === 'User' && <User className="h-4 w-4 text-slate-500" />}
                          {page.icon === 'UserCircle' && <UserCircle className="h-4 w-4 text-slate-500" />}
                          {page.icon === 'Settings' && <Settings className="h-4 w-4 text-slate-500" />}
                          {page.icon === 'Activity' && <Activity className="h-4 w-4 text-slate-500" />}
                          {page.icon === 'File' && <File className="h-4 w-4 text-slate-500" />}
                          <span className={!page.isVisible ? 'text-slate-400 dark:text-slate-500' : ''}>
                            {page.title}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={!page.isVisible ? 'text-slate-400 dark:text-slate-500' : ''}>
                      {page.path}
                    </TableCell>
                    <TableCell className={!page.isVisible ? 'text-slate-400 dark:text-slate-500' : ''}>
                      {page.component}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Switch
                          checked={page.isVisible}
                          onCheckedChange={() => handleToggleVisibility(page.id)}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Switch
                          checked={page.isProtected}
                          onCheckedChange={() => handleToggleProtection(page.id)}
                        />
                      </div>
                    </TableCell>
                    <TableCell className={`text-center ${!page.isVisible ? 'text-slate-400 dark:text-slate-500' : ''}`}>
                      {new Date(page.updatedAt).toLocaleDateString('fa-IR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 justify-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReorder(page.id, 'up')}
                          disabled={index === 0}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReorder(page.id, 'down')}
                          disabled={index === filteredPages.length - 1}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditPage(page)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>حذف صفحه</DialogTitle>
                              <DialogDescription>
                                آیا از حذف صفحه "{page.title}" اطمینان دارید؟
                                این عمل غیرقابل بازگشت است.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button 
                                variant="outline" 
                                onClick={() => document.body.click()}
                              >
                                انصراف
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={() => {
                                  handleDeletePage(page.id);
                                  document.body.click();
                                }}
                              >
                                حذف
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* دیالوگ ویرایش/ایجاد صفحه */}
      {selectedPage && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedPage.id.startsWith('new-') ? 'ایجاد صفحه جدید' : 'ویرایش صفحه'}</DialogTitle>
              <DialogDescription>
                {selectedPage.id.startsWith('new-') 
                  ? 'اطلاعات صفحه جدید را وارد کنید.' 
                  : 'اطلاعات صفحه را ویرایش کنید.'}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="basic">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="basic">اطلاعات اصلی</TabsTrigger>
                <TabsTrigger value="settings">تنظیمات</TabsTrigger>
                <TabsTrigger value="advanced">پیشرفته</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">عنوان صفحه</Label>
                    <Input 
                      id="title" 
                      defaultValue={selectedPage.title} 
                      onChange={e => setSelectedPage({
                        ...selectedPage,
                        title: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="path">مسیر (URL)</Label>
                    <Input 
                      id="path" 
                      defaultValue={selectedPage.path}
                      onChange={e => setSelectedPage({
                        ...selectedPage,
                        path: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="component">کامپوننت</Label>
                    <Input 
                      id="component" 
                      defaultValue={selectedPage.component}
                      onChange={e => setSelectedPage({
                        ...selectedPage,
                        component: e.target.value
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">آیکون</Label>
                    <Select 
                      defaultValue={selectedPage.icon}
                      onValueChange={value => setSelectedPage({
                        ...selectedPage,
                        icon: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب آیکون" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="LayoutDashboard">Dashboard</SelectItem>
                        <SelectItem value="Award">Award</SelectItem>
                        <SelectItem value="BarChart">BarChart</SelectItem>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="UserCircle">UserCircle</SelectItem>
                        <SelectItem value="Settings">Settings</SelectItem>
                        <SelectItem value="Activity">Activity</SelectItem>
                        <SelectItem value="File">File</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent">صفحه والد</Label>
                    <Select 
                      defaultValue={selectedPage.parentId || "null"}
                      onValueChange={value => setSelectedPage({
                        ...selectedPage,
                        parentId: value === "null" ? null : value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="بدون والد" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">بدون والد (صفحه اصلی)</SelectItem>
                        {pages
                          .filter(p => p.id !== selectedPage.id && !p.parentId)
                          .map(page => (
                            <SelectItem key={page.id} value={page.id}>
                              {page.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">ترتیب نمایش</Label>
                    <Input 
                      id="order" 
                      type="number"
                      defaultValue={selectedPage.order}
                      onChange={e => setSelectedPage({
                        ...selectedPage,
                        order: parseInt(e.target.value)
                      })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea 
                    id="description"
                    rows={3}
                    defaultValue={selectedPage.metadata.description || ""}
                    onChange={e => setSelectedPage({
                      ...selectedPage,
                      metadata: {
                        ...selectedPage.metadata,
                        description: e.target.value
                      }
                    })}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="visibility">وضعیت نمایش</Label>
                      <Switch 
                        id="visibility"
                        checked={selectedPage.isVisible}
                        onCheckedChange={checked => setSelectedPage({
                          ...selectedPage,
                          isVisible: checked
                        })}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedPage.isVisible 
                        ? "این صفحه در سایت نمایش داده می‌شود." 
                        : "این صفحه در سایت پنهان خواهد بود."}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="protection">حفاظت صفحه</Label>
                      <Switch 
                        id="protection"
                        checked={selectedPage.isProtected}
                        onCheckedChange={checked => setSelectedPage({
                          ...selectedPage,
                          isProtected: checked
                        })}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedPage.isProtected 
                        ? "این صفحه فقط برای کاربران احراز هویت شده قابل دسترسی است." 
                        : "این صفحه برای همه کاربران (حتی کاربران مهمان) قابل دسترسی است."}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="layout">قالب صفحه</Label>
                  <Select 
                    defaultValue={selectedPage.metadata.layout || "default"}
                    onValueChange={value => setSelectedPage({
                      ...selectedPage,
                      metadata: {
                        ...selectedPage.metadata,
                        layout: value
                      }
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب قالب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">قالب پیش‌فرض</SelectItem>
                      <SelectItem value="dashboard">داشبورد</SelectItem>
                      <SelectItem value="fullwidth">تمام عرض</SelectItem>
                      <SelectItem value="sidebar">با سایدبار</SelectItem>
                      <SelectItem value="blank">خالی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">کلمات کلیدی (با کاما جدا کنید)</Label>
                  <Textarea 
                    id="keywords"
                    rows={2}
                    defaultValue={selectedPage.metadata.keywords?.join(', ') || ""}
                    onChange={e => setSelectedPage({
                      ...selectedPage,
                      metadata: {
                        ...selectedPage.metadata,
                        keywords: e.target.value.split(',').map(k => k.trim())
                      }
                    })}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customCss">CSS سفارشی</Label>
                  <Textarea 
                    id="customCss"
                    className="font-mono text-sm"
                    rows={5}
                    placeholder=".custom-class { color: #2EC4B6; }"
                    defaultValue={selectedPage.metadata.customCss || ""}
                    onChange={e => setSelectedPage({
                      ...selectedPage,
                      metadata: {
                        ...selectedPage.metadata,
                        customCss: e.target.value
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customJs">جاوااسکریپت سفارشی</Label>
                  <Textarea 
                    id="customJs"
                    className="font-mono text-sm"
                    rows={5}
                    placeholder="// JS code here"
                    defaultValue={selectedPage.metadata.customJs || ""}
                    onChange={e => setSelectedPage({
                      ...selectedPage,
                      metadata: {
                        ...selectedPage.metadata,
                        customJs: e.target.value
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permissions">دسترسی‌های لازم (با کاما جدا کنید)</Label>
                  <Input 
                    id="permissions"
                    placeholder="user:read, user:write"
                    defaultValue={selectedPage.metadata.permissions?.join(', ') || ""}
                    onChange={e => setSelectedPage({
                      ...selectedPage,
                      metadata: {
                        ...selectedPage.metadata,
                        permissions: e.target.value.split(',').map(p => p.trim())
                      }
                    })}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedPage(null);
                }}
              >
                انصراف
              </Button>
              <Button onClick={() => handleSavePage(selectedPage)}>
                {selectedPage.id.startsWith('new-') ? 'ایجاد صفحه' : 'ذخیره تغییرات'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const AnalyticsSection = () => {
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [activeTab, setActiveTab] = useState('performance');
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="performance" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="performance">عملکرد سیستم</TabsTrigger>
            <TabsTrigger value="users">آنالیز کاربران</TabsTrigger>
            <TabsTrigger value="pages">آنالیز صفحات</TabsTrigger>
            <TabsTrigger value="reports">گزارش‌های سیستم</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-1">
            <Button 
              variant={dateRange === 'day' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDateRange('day')}
            >
              روزانه
            </Button>
            <Button 
              variant={dateRange === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDateRange('week')}
            >
              هفتگی
            </Button>
            <Button 
              variant={dateRange === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDateRange('month')}
            >
              ماهانه
            </Button>
            <Button 
              variant={dateRange === 'year' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDateRange('year')}
            >
              سالانه
            </Button>
          </div>
        </div>
        
        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  میانگین زمان لود صفحه
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">246ms</div>
                <div className="text-xs flex items-center text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  15.3%
                  <span className="text-slate-400 dark:text-slate-500 mr-1">بهبود نسبت به ماه قبل</span>
                </div>
                
                <div className="mt-4 h-36">
                  {/* نمودار در اینجا */}
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-xs text-slate-500">نمودار زمان لود</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  مصرف منابع سرور
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.6%</div>
                <div className="text-xs flex items-center text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  3.1%
                  <span className="text-slate-400 dark:text-slate-500 mr-1">بهبود نسبت به ماه قبل</span>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">CPU</span>
                      <span className="text-xs font-medium">18.2%</span>
                    </div>
                    <Progress value={18.2} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">RAM</span>
                      <span className="text-xs font-medium">32.5%</span>
                    </div>
                    <Progress value={32.5} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">دیسک</span>
                      <span className="text-xs font-medium">45.8%</span>
                    </div>
                    <Progress value={45.8} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  خطاهای سیستم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs flex items-center text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  68.2%
                  <span className="text-slate-400 dark:text-slate-500 mr-1">کاهش نسبت به ماه قبل</span>
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="p-2 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 ml-2 shrink-0" />
                    <div>
                      <p className="text-xs font-medium">خطای اتصال به دیتابیس</p>
                      <p className="text-[10px] text-slate-500">3 ساعت پیش</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 flex items-start">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 ml-2 shrink-0" />
                    <div>
                      <p className="text-xs font-medium">خطای لاگین کاربر</p>
                      <p className="text-[10px] text-slate-500">5 ساعت پیش</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 ml-2 shrink-0" />
                    <div>
                      <p className="text-xs font-medium">خطای API</p>
                      <p className="text-[10px] text-slate-500">دیروز</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>ترافیک سیستم</CardTitle>
                <CardDescription>ترافیک کاربران در طول زمان</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {/* نمودار در اینجا */}
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-slate-500">نمودار ترافیک سیستم</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>عملکرد API</CardTitle>
                <CardDescription>میانگین زمان پاسخ‌دهی API‌ها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">/api/user</span>
                      <span className="text-sm font-medium">38ms</span>
                    </div>
                    <Progress value={15.2} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">/api/health-metrics</span>
                      <span className="text-sm font-medium">120ms</span>
                    </div>
                    <Progress value={48} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">/api/challenges</span>
                      <span className="text-sm font-medium">95ms</span>
                    </div>
                    <Progress value={38} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">/api/dashboard-stats</span>
                      <span className="text-sm font-medium">188ms</span>
                    </div>
                    <Progress value={75.2} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">/api/leaderboard</span>
                      <span className="text-sm font-medium">74ms</span>
                    </div>
                    <Progress value={29.6} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  کاربران فعال
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,845</div>
                <div className="text-xs flex items-center text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12.5%
                  <span className="text-slate-400 dark:text-slate-500 mr-1">افزایش نسبت به ماه قبل</span>
                </div>
                
                <div className="mt-4 h-36">
                  {/* نمودار در اینجا */}
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-xs text-slate-500">نمودار کاربران فعال</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  کاربران جدید
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">246</div>
                <div className="text-xs flex items-center text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  8.7%
                  <span className="text-slate-400 dark:text-slate-500 mr-1">افزایش نسبت به ماه قبل</span>
                </div>
                
                <div className="mt-4 h-36">
                  {/* نمودار در اینجا */}
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-xs text-slate-500">نمودار کاربران جدید</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  نرخ تبدیل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.6%</div>
                <div className="text-xs flex items-center text-red-500">
                  <ChevronDown className="h-3 w-3 mr-1" />
                  1.2%
                  <span className="text-slate-400 dark:text-slate-500 mr-1">کاهش نسبت به ماه قبل</span>
                </div>
                
                <div className="mt-4 h-36">
                  {/* نمودار در اینجا */}
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-xs text-slate-500">نمودار نرخ تبدیل</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>جزئیات کاربران</CardTitle>
                <CardDescription>اطلاعات کاربران سیستم</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام کاربری</TableHead>
                      <TableHead>آخرین فعالیت</TableHead>
                      <TableHead>نوع کاربر</TableHead>
                      <TableHead>وضعیت</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">user1234</TableCell>
                      <TableCell>امروز</TableCell>
                      <TableCell>معمولی</TableCell>
                      <TableCell><Badge variant="success">فعال</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">admin_user</TableCell>
                      <TableCell>امروز</TableCell>
                      <TableCell>ادمین</TableCell>
                      <TableCell><Badge variant="success">فعال</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">health_manager</TableCell>
                      <TableCell>دیروز</TableCell>
                      <TableCell>مدیر سلامت</TableCell>
                      <TableCell><Badge variant="success">فعال</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">employee5678</TableCell>
                      <TableCell>3 روز پیش</TableCell>
                      <TableCell>کارمند</TableCell>
                      <TableCell><Badge variant="success">فعال</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">john_doe</TableCell>
                      <TableCell>یک هفته پیش</TableCell>
                      <TableCell>معمولی</TableCell>
                      <TableCell><Badge variant="warning">غیرفعال</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>توزیع کاربران</CardTitle>
                <CardDescription>بر اساس نقش و وضعیت</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {/* نمودار در اینجا */}
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-slate-500">نمودار توزیع کاربران</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  بازدید صفحات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,645</div>
                <div className="text-xs flex items-center text-green-500">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  5.2%
                  <span className="text-slate-400 dark:text-slate-500 mr-1">افزایش نسبت به ماه قبل</span>
                </div>
                
                <div className="mt-4 h-36">
                  {/* نمودار در اینجا */}
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-xs text-slate-500">نمودار بازدید صفحات</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  صفحات محبوب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">صفحه اصلی</span>
                      <span className="text-sm font-medium">4,298</span>
                    </div>
                    <Progress value={85} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">داشبورد</span>
                      <span className="text-sm font-medium">3,187</span>
                    </div>
                    <Progress value={63} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">چالش‌ها</span>
                      <span className="text-sm font-medium">2,846</span>
                    </div>
                    <Progress value={56} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">پروفایل</span>
                      <span className="text-sm font-medium">1,924</span>
                    </div>
                    <Progress value={38} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  نرخ خروج
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.4%</div>
                <div className="text-xs flex items-center text-green-500">
                  <ChevronDown className="h-3 w-3 mr-1" />
                  1.8%
                  <span className="text-slate-400 dark:text-slate-500 mr-1">کاهش نسبت به ماه قبل</span>
                </div>
                
                <div className="mt-4 h-36">
                  {/* نمودار در اینجا */}
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-xs text-slate-500">نمودار نرخ خروج</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>عملکرد صفحات</CardTitle>
                <CardDescription>میانگین زمان لود و نرخ خروج</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">صفحه</TableHead>
                      <TableHead className="text-right">بازدید</TableHead>
                      <TableHead className="text-right">زمان لود</TableHead>
                      <TableHead className="text-right">نرخ خروج</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">صفحه اصلی</TableCell>
                      <TableCell className="text-right">4,298</TableCell>
                      <TableCell className="text-right">245ms</TableCell>
                      <TableCell className="text-right">28.4%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">داشبورد</TableCell>
                      <TableCell className="text-right">3,187</TableCell>
                      <TableCell className="text-right">312ms</TableCell>
                      <TableCell className="text-right">18.7%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">چالش‌ها</TableCell>
                      <TableCell className="text-right">2,846</TableCell>
                      <TableCell className="text-right">278ms</TableCell>
                      <TableCell className="text-right">24.1%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">پروفایل</TableCell>
                      <TableCell className="text-right">1,924</TableCell>
                      <TableCell className="text-right">195ms</TableCell>
                      <TableCell className="text-right">32.6%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">جدول امتیازات</TableCell>
                      <TableCell className="text-right">1,635</TableCell>
                      <TableCell className="text-right">265ms</TableCell>
                      <TableCell className="text-right">29.8%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>منابع ورودی</CardTitle>
                <CardDescription>از کجا کاربران وارد سیستم می‌شوند</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  {/* نمودار در اینجا */}
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">
                    <span className="text-slate-500">نمودار منابع ورودی</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>گزارش‌های سیستم</CardTitle>
                <CardDescription>گزارش‌های تولید شده توسط سیستم</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/50">
                          <FileText className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">گزارش عملکرد ماهانه</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">گزارش کاملی از عملکرد سیستم در ماه گذشته</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 ml-2" />
                        دانلود
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4 ml-1" />
                      <span>ایجاد شده در تاریخ ۱۴۰۲/۰۲/۰۱</span>
                      <span className="mx-2">•</span>
                      <span>۵.۲ مگابایت</span>
                      <span className="mx-2">•</span>
                      <span>PDF</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-green-100 dark:bg-green-900/50">
                          <BarChart className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">گزارش آنالیز کاربران</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">اطلاعات کاملی از کاربران سیستم و رفتار آن‌ها</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 ml-2" />
                        دانلود
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4 ml-1" />
                      <span>ایجاد شده در تاریخ ۱۴۰۲/۰۱/۲۵</span>
                      <span className="mx-2">•</span>
                      <span>۳.۷ مگابایت</span>
                      <span className="mx-2">•</span>
                      <span>XLSX</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-amber-100 dark:bg-amber-900/50">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">گزارش خطاهای سیستم</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">لیست کاملی از خطاهای سیستم و موارد بررسی شده</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 ml-2" />
                        دانلود
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4 ml-1" />
                      <span>ایجاد شده در تاریخ ۱۴۰۲/۰۱/۱۸</span>
                      <span className="mx-2">•</span>
                      <span>۲.۱ مگابایت</span>
                      <span className="mx-2">•</span>
                      <span>PDF</span>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-900/50">
                          <Activity className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">گزارش عملکرد چالش‌ها</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">تحلیل جامعی از عملکرد چالش‌های سلامتی و مشارکت کاربران</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 ml-2" />
                        دانلود
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Clock className="h-4 w-4 ml-1" />
                      <span>ایجاد شده در تاریخ ۱۴۰۲/۰۱/۱۰</span>
                      <span className="mx-2">•</span>
                      <span>۴.۸ مگابایت</span>
                      <span className="mx-2">•</span>
                      <span>XLSX</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>تولید گزارش جدید</CardTitle>
                  <CardDescription>ایجاد گزارش سفارشی از سیستم</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 ml-2" />
                  گزارش جدید
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-type">نوع گزارش</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب نوع گزارش" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="performance">عملکرد سیستم</SelectItem>
                          <SelectItem value="users">آنالیز کاربران</SelectItem>
                          <SelectItem value="challenges">چالش‌ها</SelectItem>
                          <SelectItem value="errors">خطاهای سیستم</SelectItem>
                          <SelectItem value="custom">گزارش سفارشی</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-range">بازه زمانی</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب بازه زمانی" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">روز گذشته</SelectItem>
                          <SelectItem value="week">هفته گذشته</SelectItem>
                          <SelectItem value="month">ماه گذشته</SelectItem>
                          <SelectItem value="3month">سه ماه گذشته</SelectItem>
                          <SelectItem value="year">سال گذشته</SelectItem>
                          <SelectItem value="custom">بازه سفارشی</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="format">فرمت گزارش</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب فرمت" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="include-sections">بخش‌های گزارش</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id="summary" />
                        <Label htmlFor="summary" className="text-sm">خلاصه مدیریتی</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id="charts" defaultChecked />
                        <Label htmlFor="charts" className="text-sm">نمودارها</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id="tables" defaultChecked />
                        <Label htmlFor="tables" className="text-sm">جداول آماری</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id="raw-data" />
                        <Label htmlFor="raw-data" className="text-sm">داده‌های خام</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id="recommendations" defaultChecked />
                        <Label htmlFor="recommendations" className="text-sm">توصیه‌ها</Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox id="appendix" />
                        <Label htmlFor="appendix" className="text-sm">پیوست‌ها</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">پیش‌نمایش</Button>
                <Button>تولید گزارش</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// کامپوننت اصلی پنل ادمین
const AdminPanel = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  // نوتیفیکیشن‌های ادمین
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'به‌روزرسانی سیستم',
      message: 'نسخه جدید سیستم با موفقیت نصب شد.',
      type: 'success',
      isRead: false,
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      title: 'خطای سیستم',
      message: 'خطا در اتصال به پایگاه داده.',
      type: 'error',
      isRead: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
      id: '3',
      title: 'کاربر جدید',
      message: 'یک کاربر جدید در سیستم ثبت‌نام کرد.',
      type: 'info',
      isRead: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    }
  ]);
  
  // اعمال ذخیره تغییرات
  const handleSave = () => {
    setIsSaving(true);
    
    // شبیه‌سازی عملیات ذخیره
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "تغییرات با موفقیت ذخیره شد",
        description: "همه تغییرات شما با موفقیت اعمال شد.",
      });
    }, 1500);
  };
  
  // نمایش بخش مناسب بر اساس بخش فعال
  const renderActiveSection = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'pages':
      case 'pages-list':
      case 'page-editor':
      case 'page-structure':
      case 'page-templates':
        return <PagesSection />;
      case 'analytics':
      case 'performance':
      case 'users':
      case 'pages-analytics':
      case 'reports':
        return <AnalyticsSection />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-500">
            <Terminal className="h-16 w-16 mb-4 text-slate-300 dark:text-slate-700" />
            <h2 className="text-xl font-medium mb-2">در حال توسعه</h2>
            <p>این بخش در حال توسعه است و به زودی در دسترس قرار خواهد گرفت.</p>
          </div>
        );
    }
  };
  
  // تعیین نان‌بریدز بر اساس بخش فعال
  const getBreadcrumbs = () => {
    const baseBreadcrumbs = [{ title: 'پنل ادمین', path: '/admin' }];
    
    switch(activeSection) {
      case 'dashboard':
        return [...baseBreadcrumbs, { title: 'داشبورد مدیریت', path: '/admin/dashboard' }];
      case 'pages':
      case 'pages-list':
        return [...baseBreadcrumbs, { title: 'مدیریت صفحات', path: '/admin/pages' }];
      case 'page-editor':
        return [
          ...baseBreadcrumbs, 
          { title: 'مدیریت صفحات', path: '/admin/pages' },
          { title: 'ویرایشگر صفحه', path: '/admin/pages/editor' }
        ];
      case 'page-structure':
        return [
          ...baseBreadcrumbs, 
          { title: 'مدیریت صفحات', path: '/admin/pages' },
          { title: 'ساختار صفحات', path: '/admin/pages/structure' }
        ];
      case 'page-templates':
        return [
          ...baseBreadcrumbs, 
          { title: 'مدیریت صفحات', path: '/admin/pages' },
          { title: 'قالب‌های آماده', path: '/admin/pages/templates' }
        ];
      case 'components':
      case 'components-list':
        return [...baseBreadcrumbs, { title: 'مدیریت کامپوننت‌ها', path: '/admin/components' }];
      case 'ui-editor':
      case 'themes':
        return [...baseBreadcrumbs, { title: 'ویرایشگر رابط کاربری', path: '/admin/ui-editor' }];
      case 'analytics':
      case 'performance':
        return [...baseBreadcrumbs, { title: 'آنالیز و آمار', path: '/admin/analytics' }];
      case 'logs':
        return [...baseBreadcrumbs, { title: 'لاگ‌ها و رویدادها', path: '/admin/logs' }];
      default:
        return baseBreadcrumbs;
    }
  };
  
  // تعیین عنوان بخش فعال
  const getSectionTitle = () => {
    switch(activeSection) {
      case 'dashboard':
        return 'داشبورد مدیریت';
      case 'pages':
      case 'pages-list':
        return 'مدیریت صفحات';
      case 'page-editor':
        return 'ویرایشگر صفحه';
      case 'page-structure':
        return 'ساختار صفحات';
      case 'page-templates':
        return 'قالب‌های آماده';
      case 'components':
      case 'components-list':
        return 'مدیریت کامپوننت‌ها';
      case 'component-editor':
        return 'ویرایشگر کامپوننت';
      case 'component-library':
        return 'کتابخانه کامپوننت‌ها';
      case 'ui-editor':
        return 'ویرایشگر رابط کاربری';
      case 'themes':
        return 'مدیریت تم‌ها';
      case 'layouts':
        return 'لی‌اوت‌ها';
      case 'widgets':
        return 'ویجت‌ها';
      case 'users':
      case 'users-list':
        return 'مدیریت کاربران';
      case 'roles':
        return 'نقش‌ها و دسترسی‌ها';
      case 'user-activity':
        return 'فعالیت کاربران';
      case 'analytics':
      case 'performance':
        return 'آنالیز و آمار';
      case 'user-analytics':
        return 'آنالیز کاربران';
      case 'reports':
        return 'گزارشات';
      case 'settings':
        return 'تنظیمات سیستم';
      case 'database':
      case 'tables':
        return 'مدیریت دیتابیس';
      case 'queries':
        return 'کوئری‌ها';
      case 'backups':
        return 'پشتیبان‌گیری';
      case 'logs':
        return 'لاگ‌ها و رویدادها';
      default:
        return 'پنل مدیریت';
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* سایدبار ادمین */}
      <AdminSidebar
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      {/* محتوای اصلی */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* هدر */}
        <AdminHeader 
          breadcrumbs={getBreadcrumbs()} 
          title={getSectionTitle()} 
          notifications={notifications}
          onSave={handleSave}
          isSaving={isSaving}
        />
        
        {/* محتوای اصلی با اسکرول */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderActiveSection()}
        </div>
      </div>
      
      {/* دکمه دسترسی سریع به پنل ادمین */}
      <div className="fixed left-4 bottom-4 z-50">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="icon" 
              className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-tiffany text-white hover:shadow-xl hover:shadow-tiffany/20 transition-all duration-300"
            >
              <Command className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="start" className="w-80">
            <div className="text-sm font-medium mb-3">دسترسی سریع به پنل ادمین</div>
            <div className="space-y-1.5">
              <Button 
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => setActiveSection('dashboard')}
              >
                <Layout className="h-4 w-4 ml-2" />
                داشبورد مدیریت
              </Button>
              <Button 
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => setActiveSection('pages')}
              >
                <Layers className="h-4 w-4 ml-2" />
                مدیریت صفحات
              </Button>
              <Button 
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => setActiveSection('analytics')}
              >
                <BarChart2 className="h-4 w-4 ml-2" />
                آنالیز و آمار
              </Button>
              <Button 
                variant="ghost"
                className="w-full justify-start text-sm"
                onClick={() => setActiveSection('settings')}
              >
                <Settings className="h-4 w-4 ml-2" />
                تنظیمات سیستم
              </Button>
            </div>
            <Separator className="my-2" />
            <div className="text-xs text-slate-500 dark:text-slate-400">
              دسترسی از طریق کلیدهای میانبر: <kbd className="px-1 py-0.5 text-xs border rounded mx-1">Ctrl</kbd>+<kbd className="px-1 py-0.5 text-xs border rounded mx-1">Shift</kbd>+<kbd className="px-1 py-0.5 text-xs border rounded mx-1">A</kbd>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default AdminPanel;