import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Award,
  User,
  BarChart,
  Menu,
  Moon,
  Sun,
  Activity,
  TrendingUp,
  Shield,
  Users,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Brain,
  FileText,
  CreditCard,
  Bell,
  BellOff,
  Settings,
  Search,
  Filter,
  MessageSquare,
  HelpCircle,
  LogOut,
  Globe,
  BarChart2,
  ClipboardList,
  PanelRight,
  AppWindow,
  Layers,
  LucideIcon,
  BookOpen,
  UserRound,
  History,
  BadgeHelp,
  LayoutDashboard,
  GraduationCap,
  Zap,
  Heart,
  Trophy,
  Star,
  Sparkles,
  Languages,
  ChevronDown,
  Bookmark,
  ArrowLeftRight,
  CircleUser,
  Lightbulb,
  Info,
  LifeBuoy,
  Command,
  Keyboard,
  CircleCheck,
  Clock,
  Monitor,
  Power,
  MailOpen,
  UserPlus,
  UserCog,
  RefreshCw,
  Database,
  CheckCircle2,
  LockKeyhole,
  X
} from "lucide-react";
import useIsMobile from "@/hooks/use-mobile";
import Footer from "./Footer";
import HealthReminders from "@/components/ui/health-reminder";
import { useToast } from "@/hooks/use-toast";
import { NotificationBar, useNotifications } from "@/components/ui/notification-bar";
import PulsingLogo from "@/components/ui/pulsing-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/useAuth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
  const [showHealthReminders, setShowHealthReminders] = useState(true);
  const { toast } = useToast();
  const { user, logout } = useAuth();
  
  // نوتیفیکیشن‌های سیستم
  const { 
    notifications, 
    unreadCount, 
    addNotification, 
    markAsRead, 
    markAllAsRead, 
    clearNotification, 
    clearAllNotifications 
  } = useNotifications();

  // Set initial expanded state based on screen size
  useEffect(() => {
    setIsExpanded(!isMobile);
  }, [isMobile]);
  
  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Menu items
  const menuItems = [
    {
      title: "داشبورد",
      icon: <Home className="h-5 w-5" />,
      path: "/",
    },
    {
      title: "تست‌های روانشناسی",
      icon: <Brain className="h-5 w-5" />,
      path: "/psychological-tests",
    },
    {
      title: "چالش‌ها",
      icon: <Award className="h-5 w-5" />,
      path: "/challenges",
    },
    {
      title: "جدول امتیازات",
      icon: <BarChart className="h-5 w-5" />,
      path: "/leaderboard",
    },
    {
      title: "پروفایل من",
      icon: <User className="h-5 w-5" />,
      path: "/profile",
    },
    {
      title: "داشبورد HR",
      icon: <Users className="h-5 w-5" />,
      path: "/hr-dashboard",
    },
    {
      title: "رویدادها",
      icon: <Calendar className="h-5 w-5" />,
      path: "/events",
    },
    {
      title: "تنظیمات",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];
  
  // Additional links
  const additionalLinks = [
    {
      title: "تعرفه‌ها",
      icon: <CreditCard className="h-5 w-5" />,
      path: "/pricing",
    },
    {
      title: "درباره ما",
      icon: <FileText className="h-5 w-5" />,
      path: "/about",
    },
    {
      title: "قوانین و مقررات",
      icon: <FileText className="h-5 w-5" />,
      path: "/terms",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ width: isMobile ? 0 : 240 }}
          animate={{ width: isExpanded ? 240 : 72 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.3, 0.1, 0.3, 1] 
          }}
          className="h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 relative z-30 flex flex-col"
        >
          {/* Sidebar Header */}
          <div className="p-4 flex items-center justify-between">
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <PulsingLogo size="sm" showText={true} />
              </motion.div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isExpanded ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>

          {/* User info */}
          <div className={`px-4 py-3 flex items-center ${isExpanded ? 'justify-start' : 'justify-center'}`}>
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-tiffany/20 to-aqua/10 flex items-center justify-center text-tiffany font-bold relative border-2 border-white dark:border-slate-800`}>
              <span>م</span>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-slate-800"></div>
            </div>
            
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mr-3 overflow-hidden"
              >
                <h3 className="text-sm font-bold truncate">مدیر سیستم</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  پرانا - دستیار هوشمند سلامت
                </p>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 py-6 overflow-y-auto mica my-4 mx-2 rounded-xl">
            <nav className="px-2">
              <div className="mb-2 px-3">
                <h2 className="text-xs font-medium text-slate-500 dark:text-slate-400">دسترسی سریع</h2>
              </div>
              
              <ul className="space-y-1 mb-4">
                {menuItems.map((item, idx) => {
                  const isActive = location === item.path;
                  return (
                    <li key={idx}>
                      <Link href={item.path}>
                        <div
                          className={`flex items-center px-3 py-3 rounded-lg transition-all ${
                            isActive
                              ? "bg-tiffany/10 text-tiffany dark:bg-tiffany/20"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <div className={`${isActive ? "text-tiffany" : "text-slate-500 dark:text-slate-400"}`}>
                            {item.icon}
                          </div>
                          {isExpanded && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`mr-3 font-medium ${isActive ? "text-tiffany" : ""}`}
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              <div className="mb-2 px-3">
                <h2 className="text-xs font-medium text-slate-500 dark:text-slate-400">اطلاعات و قوانین</h2>
              </div>
              
              <ul className="space-y-1">
                {additionalLinks.map((item, idx) => {
                  const isActive = location === item.path;
                  return (
                    <li key={idx}>
                      <Link href={item.path}>
                        <div
                          className={`flex items-center px-3 py-3 rounded-lg transition-all ${
                            isActive
                              ? "bg-tiffany/10 text-tiffany dark:bg-tiffany/20"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          <div className={`${isActive ? "text-tiffany" : "text-slate-500 dark:text-slate-400"}`}>
                            {item.icon}
                          </div>
                          {isExpanded && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={`mr-3 font-medium ${isActive ? "text-tiffany" : ""}`}
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Bottom actions - Windows 11 style */}
          <div className="p-3 space-y-2">
            {/* Mode toggler with tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-full flex items-center px-3 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ${
                      isExpanded ? "justify-start" : "justify-center"
                    }`}
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <Moon className="h-5 w-5 text-slate-500" />
                    )}
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mr-3 font-medium"
                      >
                        {darkMode ? "حالت روشن" : "حالت تیره"}
                      </motion.span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{darkMode ? "تغییر به حالت روشن" : "تغییر به حالت تیره"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Health notifications toggler with tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      setShowHealthReminders(!showHealthReminders);
                      toast({
                        title: showHealthReminders ? "یادآوری‌های سلامتی غیرفعال شد" : "یادآوری‌های سلامتی فعال شد",
                        description: showHealthReminders ? "دیگر اعلان‌های سلامتی را دریافت نخواهید کرد" : "از این پس اعلان‌های سلامتی را دریافت خواهید کرد",
                        variant: "default",
                      });
                    }}
                    className={`w-full flex items-center px-3 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ${
                      isExpanded ? "justify-start" : "justify-center"
                    }`}
                  >
                    {showHealthReminders ? (
                      <Bell className="h-5 w-5 text-tiffany" />
                    ) : (
                      <BellOff className="h-5 w-5 text-slate-500" />
                    )}
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mr-3 font-medium"
                      >
                        {showHealthReminders ? "بدون یادآوری" : "فعال کردن یادآوری‌ها"}
                      </motion.span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>{showHealthReminders ? "غیرفعال کردن یادآوری‌های سلامتی" : "فعال کردن یادآوری‌های سلامتی"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Logout button with tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={logout}
                    className={`w-full flex items-center px-3 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 hover:text-red-600 transition-all ${
                      isExpanded ? "justify-start" : "justify-center"
                    }`}
                  >
                    <LogOut className="h-5 w-5" />
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mr-3 font-medium"
                      >
                        خروج از حساب
                      </motion.span>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>خروج از حساب کاربری</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto relative bg-slate-50 dark:bg-slate-900 flex flex-col">
        {/* Fixed Header */}
        <div className="sticky top-0 z-20 p-3 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 backdrop-blur-md flex flex-col">
          {/* Top row with logo, menu and actions */}
          <div className="flex items-center justify-between mb-2">
            {/* Left side - Logo and menu button (on mobile) */}
            <div className="flex items-center">
              {isMobile && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 ml-2"
                >
                  <Menu className="h-5 w-5" />
                </button>
              )}
              
              <div className="flex items-center">
                <PulsingLogo size="sm" showText={true} />
              </div>
            </div>
            
            {/* Right side - Action buttons */}
            <div className="flex items-center space-x-2 space-x-reverse">
              {/* Search with tooltip */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                      <Search className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>جستجوی کامل</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Messages */}
              <div className="relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <MessageSquare className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">3</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>پیام‌های دریافتی</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Quick links */}
              <div className="relative hidden md:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Bookmark className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>دسترسی سریع</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Notifications */}
              <NotificationBar 
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onClear={clearNotification}
                onClearAll={clearAllNotifications}
              />
              
              {/* Help */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                      <HelpCircle className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>راهنما و پشتیبانی</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Quick settings */}
              <div className="relative hidden md:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Command className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>تنظیمات سریع (Ctrl+K)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* User profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative focus:outline-none">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tiffany/20 to-aqua/10 flex items-center justify-center text-tiffany font-bold relative border-2 border-white dark:border-slate-800 transition-all hover:ring-2 hover:ring-offset-2 hover:ring-tiffany/20 dark:hover:ring-offset-slate-900">
                      <span>{user?.displayName?.charAt(0) || "م"}</span>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-slate-800"></div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl p-1 mt-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200 dark:border-slate-800">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-medium">{user?.displayName || "کاربر"}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user?.username || "کاربر پرانا"}</p>
                  </div>
                  
                  <div className="p-1">
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2 px-2">
                      <User className="h-4 w-4 ml-2" />
                      <span>پروفایل</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2 px-2">
                      <Settings className="h-4 w-4 ml-2" />
                      <span>تنظیمات</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2 px-2">
                      <UserCog className="h-4 w-4 ml-2" />
                      <span>مدیریت حساب</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 bg-slate-200 dark:bg-slate-700" />
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2 px-2">
                      <Languages className="h-4 w-4 ml-2" />
                      <span>زبان برنامه</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2 px-2">
                      <Keyboard className="h-4 w-4 ml-2" />
                      <span>میانبرهای کیبورد</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1 bg-slate-200 dark:bg-slate-700" />
                    <DropdownMenuItem 
                      className="flex items-center cursor-pointer rounded-lg py-2 px-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4 ml-2" />
                      <span>خروج از حساب</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Enhanced Bottom row with Windows 11-style toolbars */}
          <div className="flex flex-col gap-3">
            {/* Main searchbar with Windows 11-style design */}
            <div className="relative flex-grow max-w-full">
              <div className="flex items-center gap-2 p-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-sm">
                <div className="relative flex-grow">
                  <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input 
                    placeholder="جستجو در برنامه..." 
                    className="pr-10 pl-4 py-2 text-sm h-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                
                <div className="flex items-center gap-1 pl-2 border-r border-slate-200 dark:border-slate-700 pr-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700">
                          <Command className="h-4 w-4 text-slate-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>جستجوی پیشرفته با Ctrl+K</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700">
                          <Filter className="h-4 w-4 text-slate-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>فیلترهای پیشرفته</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-700">
                          <BookOpen className="h-4 w-4 text-slate-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>جستجو در اسناد</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            
            {/* Windows 11-style Tab Group with Sections */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 space-x-reverse p-1 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
                <Button variant="ghost" size="sm" className="rounded-lg bg-tiffany/10 text-tiffany">
                  <LayoutDashboard className="h-4 w-4 ml-1" />
                  میز کار
                </Button>
                <Button variant="ghost" size="sm" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                  <Heart className="h-4 w-4 ml-1" />
                  سلامت شغلی
                </Button>
                <Button variant="ghost" size="sm" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                  <GraduationCap className="h-4 w-4 ml-1" />
                  آموزش
                </Button>
                <Button variant="ghost" size="sm" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                  <Trophy className="h-4 w-4 ml-1" />
                  دستاوردها
                </Button>
                <Button variant="ghost" size="sm" className="rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                  <Users className="h-4 w-4 ml-1" />
                  دپارتمان
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>بخش‌های بیشتر</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Quick Actions */}
              <div className="hidden md:flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-lg h-9">
                        <RefreshCw className="h-4 w-4 ml-1" />
                        بروزرسانی
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>بروزرسانی داده‌ها</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-lg h-9">
                      <Sparkles className="h-4 w-4 ml-1" />
                      عملیات سریع
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl w-56 p-1">
                    <DropdownMenuItem className="rounded-lg cursor-pointer">
                      <UserPlus className="h-4 w-4 ml-2" />
                      <span>افزودن کاربر جدید</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg cursor-pointer">
                      <FileText className="h-4 w-4 ml-2" />
                      <span>ایجاد گزارش</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg cursor-pointer">
                      <Database className="h-4 w-4 ml-2" />
                      <span>سنکرون‌سازی داده‌ها</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page content */}
        <div className="flex-1 p-6">{children}</div>
        
        {/* Footer */}
        <Footer />
        
        {/* Health Reminders */}
        {showHealthReminders && (
          <HealthReminders 
            timeScale={5} // Speed up reminders for demo purposes
            onAction={(reminder) => {
              toast({
                title: `${reminder.title} انجام شد`,
                description: "این فعالیت در سوابق سلامتی شما ثبت شد",
                variant: "default",
              });
            }}
          />
        )}
      </div>
    </div>
  );
}