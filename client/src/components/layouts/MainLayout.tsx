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
  BarChart2
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

          {/* Bottom actions */}
          <div className="p-3 space-y-2">
            <button
              onClick={toggleDarkMode}
              className={`w-full flex items-center px-3 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
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
            
            <button
              onClick={() => {
                setShowHealthReminders(!showHealthReminders);
                toast({
                  title: showHealthReminders ? "یادآوری‌های سلامتی غیرفعال شد" : "یادآوری‌های سلامتی فعال شد",
                  description: showHealthReminders ? "دیگر اعلان‌های سلامتی را دریافت نخواهید کرد" : "از این پس اعلان‌های سلامتی را دریافت خواهید کرد",
                  variant: "default",
                });
              }}
              className={`w-full flex items-center px-3 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
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
              {/* Search */}
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Search className="h-5 w-5" />
              </button>
              
              {/* Messages */}
              <div className="relative">
                <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <MessageSquare className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">3</span>
                </button>
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
              <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
                <HelpCircle className="h-5 w-5" />
              </button>
              
              {/* User profile */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tiffany/20 to-aqua/10 flex items-center justify-center text-tiffany font-bold relative border-2 border-white dark:border-slate-800">
                <span>م</span>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-slate-800"></div>
              </div>
            </div>
          </div>
          
          {/* Bottom row with search, filters and sections */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Search bar */}
            <div className="relative flex-grow max-w-md">
              <Search className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input 
                placeholder="جستجو..." 
                className="pr-10 py-2 text-sm h-10 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            
            {/* Sections/Tabs */}
            <div className="flex items-center space-x-1 space-x-reverse overflow-auto">
              <Button variant="default" size="sm" className="rounded-lg">
                میز کار
              </Button>
              <Button variant="ghost" size="sm" className="rounded-lg">
                سلامت شغلی
              </Button>
              <Button variant="ghost" size="sm" className="rounded-lg">
                آموزش
              </Button>
              <Button variant="ghost" size="sm" className="rounded-lg">
                دستاوردها
              </Button>
              <Button variant="ghost" size="sm" className="rounded-lg">
                دپارتمان
              </Button>
            </div>
            
            {/* Advanced filter */}
            <Button variant="outline" size="sm" className="rounded-lg whitespace-nowrap">
              <Filter className="h-4 w-4 ml-1" />
              فیلتر پیشرفته
            </Button>
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