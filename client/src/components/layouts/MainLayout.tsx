import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import PWAInstallButton from "@/components/pwa/PWAInstallButton";
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
  Cloud,
  CloudSun,
  Thermometer,
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
  X,
  Volume2,
  Bluetooth,
  Wifi,
  Eye,
  Check,
  CheckCheck,
  AlertTriangle,
  PlusCircle,
  Send,
  Phone,
  Video,
  Pin,
  ArrowDown,
  Smile,
  Paperclip,
  Mic,
  File,
  Image
} from "lucide-react";
import useIsMobile from "@/hooks/use-mobile";
import Footer from "./Footer";
import HealthReminders from "@/components/ui/health-reminder";
import { useToast } from "@/hooks/use-toast";
import { NotificationBar, useNotifications } from "@/components/ui/notification-bar";
import PulsingLogo from "@/components/ui/pulsing-logo";
import AdvancedNotificationBar from "@/components/ui/advanced-notification-bar";
import MessageBox from "@/components/ui/message-box";
import AlertControlCenter from "@/components/ui/alert-control-center";
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
      title: "داشبورد تحلیلی پیشرفته",
      icon: <Zap className="h-5 w-5" />,
      path: "/advanced-analytics",
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
      path: "/user-profile",
    },
    {
      title: "سفارشی‌سازی آواتار",
      icon: <UserRound className="h-5 w-5" />,
      path: "/avatar-customizer",
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
    <div className="flex h-screen overflow-hidden relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background patterns and effects */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03] pointer-events-none z-0"></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-tiffany/5 to-transparent rounded-full blur-3xl pointer-events-none opacity-60 dark:opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-aqua/5 to-transparent rounded-full blur-3xl pointer-events-none opacity-60 dark:opacity-20"></div>
      
      {/* Sidebar with advanced glass effect */}
      <AnimatePresence>
        <motion.aside
          initial={{ width: isMobile ? 0 : 280 }}
          animate={{ width: isExpanded ? 280 : 80 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.19, 1, 0.22, 1] // Expo ease for smooth animation
          }}
          className="h-full glass-effect border-l border-white/20 dark:border-slate-700/30 relative z-30 flex flex-col shadow-[8px_0px_30px_-12px_rgba(0,0,0,0.1)] dark:shadow-[8px_0px_30px_-12px_rgba(0,0,0,0.3)]"
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
          <div className="flex-1 py-6 overflow-y-auto my-4 mx-2 rounded-xl bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm">
            <nav className="px-2">
              <div className="mb-2 px-3">
                <h2 className="text-xs font-semibold text-slate-600 dark:text-slate-300">دسترسی سریع</h2>
              </div>
              
              <ul className="space-y-2 mb-4">
                {menuItems.map((item, idx) => {
                  const isActive = location === item.path;
                  return (
                    <li key={idx}>
                      <Link href={item.path}>
                        <div
                          className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative group
                            ${isActive
                              ? "bg-gradient-to-l from-tiffany/90 to-tiffany text-white shadow-lg shadow-tiffany/20 dark:shadow-tiffany/10 ring-1 ring-white/10"
                              : "hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-md hover:scale-[1.02] dark:hover:shadow-black/5"
                            }`}
                        >
                          <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                            isActive ? "text-white" : "text-slate-500 dark:text-slate-400"
                          }`}>
                            {item.icon}
                          </div>
                          {isExpanded && (
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -5 }}
                              transition={{ duration: 0.3 }}
                              className={`mr-3 font-medium tracking-wide ${isActive ? "text-white" : "group-hover:text-tiffany dark:group-hover:text-tiffany-light"}`}
                            >
                              {item.title}
                            </motion.span>
                          )}
                          {isActive && (
                            <motion.div 
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-tiffany-dark to-tiffany overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              style={{ zIndex: -1 }}
                            >
                              <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
                            </motion.div>
                          )}
                          {!isActive && (
                            <div 
                              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ zIndex: -1 }}
                            >
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-tiffany/5 to-white/30 dark:from-tiffany/10 dark:to-slate-800/50"></div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              {/* داشبوردهای پیشرفته */}
              <div className="mb-2 px-3">
                <h2 className="text-xs font-semibold text-slate-600 dark:text-slate-300">داشبوردهای پیشرفته</h2>
              </div>
              
              <ul className="space-y-2 mb-4">
                {/* دکمه داشبورد هوشمند HSE */}
                <li>
                  <Link href="/hse-smart-dashboard">
                    <div className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative group
                      ${location === '/hse-smart-dashboard' 
                        ? "bg-gradient-to-l from-green-500/90 to-emerald-500 text-white shadow-lg shadow-green-500/20 dark:shadow-green-500/10 ring-1 ring-white/10"
                        : "hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-md hover:scale-[1.02] dark:hover:shadow-black/5"
                      }`}
                    >
                      <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                        location === '/hse-smart-dashboard' ? "text-white" : "text-slate-500 dark:text-slate-400"
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                      </div>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          transition={{ duration: 0.3 }}
                          className={`mr-3 font-medium tracking-wide ${location === '/hse-smart-dashboard' ? "text-white" : "group-hover:text-green-500 dark:group-hover:text-green-300"}`}
                        >
                          داشبورد هوشمند HSE
                        </motion.span>
                      )}
                      {location === '/hse-smart-dashboard' && (
                        <motion.div 
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-600 to-emerald-400 overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ zIndex: -1 }}
                        >
                          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
                        </motion.div>
                      )}
                      {location !== '/hse-smart-dashboard' && (
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ zIndex: -1 }}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/5 to-white/30 dark:from-green-500/10 dark:to-slate-800/50"></div>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
                
                {/* دکمه اطلاعات آب و هوا */}
                <li>
                  <Link href="/weather-info">
                    <div className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative group
                      ${location === '/weather-info' 
                        ? "bg-gradient-to-l from-blue-500/90 to-sky-400 text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 ring-1 ring-white/10"
                        : "hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-md hover:scale-[1.02] dark:hover:shadow-black/5"
                      }`}
                    >
                      <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                        location === '/weather-info' ? "text-white" : "text-slate-500 dark:text-slate-400"
                      }`}>
                        <CloudSun className="h-5 w-5" />
                      </div>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          transition={{ duration: 0.3 }}
                          className={`mr-3 font-medium tracking-wide ${location === '/weather-info' ? "text-white" : "group-hover:text-blue-500 dark:group-hover:text-blue-300"}`}
                        >
                          اطلاعات آب و هوا
                        </motion.span>
                      )}
                      {location === '/weather-info' && (
                        <motion.div 
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-sky-400 overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ zIndex: -1 }}
                        >
                          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
                        </motion.div>
                      )}
                      {location !== '/weather-info' && (
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ zIndex: -1 }}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/5 to-white/30 dark:from-blue-500/10 dark:to-slate-800/50"></div>
                        </div>
                      )}
                      
                      {/* نشانگر ویژگی جدید */}
                      <div className="absolute -left-1 top-1 bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-md shadow-md">
                        جدید
                      </div>
                    </div>
                  </Link>
                </li>
                
                {/* دکمه داشبورد تحلیل پیشرفته */}
                <li>
                  <Link href="/advanced-analysis-dashboard">
                    <div className={`flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 relative group
                      ${location === '/advanced-analysis-dashboard' 
                        ? "bg-gradient-to-l from-purple-500/90 to-violet-500 text-white shadow-lg shadow-purple-500/20 dark:shadow-purple-500/10 ring-1 ring-white/10"
                        : "hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-md hover:scale-[1.02] dark:hover:shadow-black/5"
                      }`}
                    >
                      <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                        location === '/advanced-analysis-dashboard' ? "text-white" : "text-slate-500 dark:text-slate-400"
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <path d="M3 3v18h18"></path>
                          <path d="M18.4 9.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z"></path>
                          <path d="m8 12 4-4 4 4 4-4"></path>
                          <path d="M4 16.5a2.5 2.5 0 0 1 5 0v.5h-5v-.5Z"></path>
                          <path d="M4 11.5a2.5 2.5 0 0 1 5 0v5h-5v-5Z"></path>
                        </svg>
                      </div>
                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          transition={{ duration: 0.3 }}
                          className={`mr-3 font-medium tracking-wide ${location === '/advanced-analysis-dashboard' ? "text-white" : "group-hover:text-purple-500 dark:group-hover:text-purple-300"}`}
                        >
                          داشبورد تحلیل پیشرفته
                        </motion.span>
                      )}
                      {location === '/advanced-analysis-dashboard' && (
                        <motion.div 
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-violet-400 overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ zIndex: -1 }}
                        >
                          <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
                        </motion.div>
                      )}
                      {location !== '/advanced-analysis-dashboard' && (
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ zIndex: -1 }}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/5 to-white/30 dark:from-purple-500/10 dark:to-slate-800/50"></div>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              </ul>
              
              <div className="mb-2 px-3">
                <h2 className="text-xs font-semibold text-slate-600 dark:text-slate-300">اطلاعات و قوانین</h2>
              </div>
              
              <ul className="space-y-2">
                {additionalLinks.map((item, idx) => {
                  const isActive = location === item.path;
                  return (
                    <li key={idx}>
                      <Link href={item.path}>
                        <div
                          className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 relative group
                            ${isActive
                              ? "bg-gradient-to-l from-blue-500/90 to-sky-500 text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 ring-1 ring-white/10"
                              : "hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-md hover:scale-[1.02] dark:hover:shadow-black/5"
                            }`}
                        >
                          <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                            isActive ? "text-white" : "text-slate-500 dark:text-slate-400"
                          }`}>
                            {item.icon}
                          </div>
                          {isExpanded && (
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -5 }}
                              transition={{ duration: 0.3 }}
                              className={`mr-3 font-medium tracking-wide ${isActive ? "text-white" : "group-hover:text-blue-500 dark:group-hover:text-blue-300"}`}
                            >
                              {item.title}
                            </motion.span>
                          )}
                          {isActive && (
                            <motion.div 
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-sky-400 overflow-hidden"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              style={{ zIndex: -1 }}
                            >
                              <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
                            </motion.div>
                          )}
                          {!isActive && (
                            <div 
                              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                              style={{ zIndex: -1 }}
                            >
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/5 to-white/30 dark:from-blue-500/10 dark:to-slate-800/50"></div>
                            </div>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Bottom actions - پیشرفته و مدرن */}
          <div className="p-3 space-y-2">
            {/* دکمه نصب PWA */}
            <div className={`w-full ${isExpanded ? 'px-2' : 'flex justify-center'}`}>
              <PWAInstallButton 
                variant="outline" 
                className={`w-full ${!isExpanded && 'p-2 h-10 w-10'}`} 
              />
            </div>
            
            {/* Mode toggler with advanced effects */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-full flex items-center px-4 py-3.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 
                      ${darkMode 
                        ? "bg-gradient-to-r from-amber-500/10 to-yellow-400/5 dark:from-amber-500/20 dark:to-yellow-400/10" 
                        : "bg-gradient-to-r from-blue-500/10 to-indigo-400/5 dark:from-blue-500/20 dark:to-indigo-400/10"
                      }
                      backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5
                      transition-all duration-300 relative overflow-hidden group
                      ${isExpanded ? "justify-start" : "justify-center"}
                    `}
                  >
                    <div className="relative z-10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                      {darkMode ? (
                        <Sun className="h-5 w-5 text-amber-500" />
                      ) : (
                        <Moon className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.3 }}
                        className={`mr-3 font-medium ${darkMode ? "text-amber-600 dark:text-amber-400" : "text-blue-600 dark:text-blue-400"}`}
                      >
                        {darkMode ? "حالت روشن" : "حالت تیره"}
                      </motion.span>
                    )}
                    
                    {/* پس‌زمینه متحرک */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ zIndex: -1 }}>
                      <div className="absolute inset-0 bg-grid-slate-300/[0.04] dark:bg-grid-slate-100/[0.03] bg-[size:20px_20px]"></div>
                    </div>
                    
                    {/* افکت درخشش */}
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 dark:from-amber-600/10 dark:via-amber-600/5 dark:to-amber-600/10 blur-md opacity-0 group-hover:opacity-100 animate-pulse-slow"></div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-white/95 dark:bg-slate-800/95 border border-slate-200/50 dark:border-slate-700/50 shadow-lg backdrop-blur-sm">
                  <p>{darkMode ? "تغییر به حالت روشن" : "تغییر به حالت تیره"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Health notifications toggler with advanced effects */}
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
                    className={`w-full flex items-center px-4 py-3.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 
                      ${showHealthReminders 
                        ? "bg-gradient-to-r from-tiffany/10 to-green-400/5 dark:from-tiffany/20 dark:to-green-400/10" 
                        : "bg-gradient-to-r from-slate-300/10 to-slate-400/5 dark:from-slate-500/20 dark:to-slate-400/10"
                      }
                      backdrop-blur-sm hover:shadow-lg hover:shadow-tiffany/10 dark:hover:shadow-tiffany/5
                      transition-all duration-300 relative overflow-hidden group
                      ${isExpanded ? "justify-start" : "justify-center"}
                    `}
                  >
                    <div className="relative z-10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                      {showHealthReminders ? (
                        <Bell className="h-5 w-5 text-tiffany" />
                      ) : (
                        <BellOff className="h-5 w-5 text-slate-500" />
                      )}
                    </div>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.3 }}
                        className={`mr-3 font-medium ${showHealthReminders ? "text-tiffany dark:text-tiffany-light" : "text-slate-600 dark:text-slate-400"}`}
                      >
                        {showHealthReminders ? "بدون یادآوری" : "فعال کردن یادآوری‌ها"}
                      </motion.span>
                    )}
                    
                    {/* پس‌زمینه متحرک */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ zIndex: -1 }}>
                      <div className="absolute inset-0 bg-grid-slate-300/[0.04] dark:bg-grid-slate-100/[0.03] bg-[size:20px_20px]"></div>
                    </div>
                    
                    {/* افکت درخشش */}
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-tiffany/10 via-tiffany/5 to-tiffany/10 dark:from-tiffany/10 dark:via-tiffany/5 dark:to-tiffany/10 blur-md opacity-0 group-hover:opacity-100 animate-pulse-slow"></div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-white/95 dark:bg-slate-800/95 border border-slate-200/50 dark:border-slate-700/50 shadow-lg backdrop-blur-sm">
                  <p>{showHealthReminders ? "غیرفعال کردن یادآوری‌های سلامتی" : "فعال کردن یادآوری‌های سلامتی"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Logout button with advanced effects */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={logout}
                    className={`w-full flex items-center px-4 py-3.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 
                      bg-gradient-to-r from-red-500/10 to-rose-400/5 dark:from-red-500/15 dark:to-rose-400/10
                      backdrop-blur-sm hover:shadow-lg hover:shadow-red-500/10 dark:hover:shadow-red-500/5
                      transition-all duration-300 relative overflow-hidden group
                      ${isExpanded ? "justify-start" : "justify-center"}
                    `}
                  >
                    <div className="relative z-10 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
                      <LogOut className="h-5 w-5 text-red-500 dark:text-red-400" />
                    </div>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        transition={{ duration: 0.3 }}
                        className="mr-3 font-medium text-red-600 dark:text-red-400"
                      >
                        خروج از حساب
                      </motion.span>
                    )}
                    
                    {/* پس‌زمینه متحرک */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ zIndex: -1 }}>
                      <div className="absolute inset-0 bg-grid-slate-300/[0.04] dark:bg-grid-slate-100/[0.03] bg-[size:20px_20px]"></div>
                    </div>
                    
                    {/* افکت درخشش */}
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 dark:from-red-600/10 dark:via-red-600/5 dark:to-red-600/10 blur-md opacity-0 group-hover:opacity-100 animate-pulse-slow"></div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-white/95 dark:bg-slate-800/95 border border-slate-200/50 dark:border-slate-700/50 shadow-lg backdrop-blur-sm">
                  <p>خروج از حساب کاربری</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Enhanced Main content area with modernized glass effect */}
      <div className="flex-1 overflow-y-auto relative flex flex-col transition-all duration-300 ease-in-out z-10">
        {/* Advanced animated background with dynamic effects */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-tiffany/10 to-transparent rounded-full blur-3xl animate-float opacity-20 dark:opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1/3 h-1/3 bg-gradient-to-tl from-aqua/10 to-transparent rounded-full blur-3xl animate-float-reverse opacity-20 dark:opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/70 to-white/90 dark:from-slate-900/70 dark:to-slate-950/90 z-10 backdrop-blur-[2px]"></div>
        </div>
        
        {/* Enhanced Fixed Header with advanced glassmorphism */}
        <div className="sticky top-0 z-20 p-4 glass dark:glass-dark border-b border-white/20 dark:border-slate-700/30 backdrop-blur-xl shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_30px_-10px_rgba(0,0,0,0.3)] flex flex-col motion-safe:animate-fade-in transition-all duration-300">
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
            
            {/* Enhanced Right side - Action buttons with interactive effects */}
            <div className="flex items-center space-x-3 space-x-reverse">
              {/* Modernized Search with 3D tooltip effect */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="group p-2 rounded-full bg-white/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 hover:text-tiffany dark:hover:text-tiffany-light hover:shadow-md dark:hover:shadow-tiffany/5 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 relative overflow-hidden">
                      <Search className="h-5 w-5 transition-transform duration-200 group-hover:rotate-[-5deg]" />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-tiffany/10 to-aqua/5 dark:from-tiffany/20 dark:to-aqua/10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/95 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">
                    <p>جستجوی کامل</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Messages - Enhanced */}
              <MessageBox 
                conversations={[
                  {
                    id: '1',
                    participants: [
                      { id: '1', name: 'کاربر فعلی', status: 'online' },
                      { id: '2', name: 'سارا احمدی', status: 'online', avatar: 'https://i.pravatar.cc/150?img=1' }
                    ],
                    messages: [
                      { 
                        id: 'm1', 
                        senderId: '2', 
                        receiverId: '1', 
                        content: 'سلام، گزارش اچ اس ای این ماه کامل شد؟', 
                        timestamp: new Date(Date.now() - 3600000), 
                        status: 'read'
                      },
                      { 
                        id: 'm2', 
                        senderId: '1', 
                        receiverId: '2', 
                        content: 'بله، تکمیل شده و برای بررسی ارسال کردم', 
                        timestamp: new Date(Date.now() - 1800000), 
                        status: 'read'
                      },
                      { 
                        id: 'm3', 
                        senderId: '2', 
                        receiverId: '1', 
                        content: 'عالی، ممنون از پیگیری', 
                        timestamp: new Date(Date.now() - 900000), 
                        status: 'delivered'
                      }
                    ],
                    unreadCount: 1,
                    lastMessageAt: new Date(Date.now() - 900000),
                    isPinned: true
                  },
                  {
                    id: '2',
                    participants: [
                      { id: '1', name: 'کاربر فعلی', status: 'online' },
                      { id: '3', name: 'علی محمدی', status: 'away', avatar: 'https://i.pravatar.cc/150?img=2' }
                    ],
                    messages: [
                      { 
                        id: 'm4', 
                        senderId: '1', 
                        receiverId: '3', 
                        content: 'جلسه ارزیابی ایمنی فردا ساعت ۱۰ برگزار میشه', 
                        timestamp: new Date(Date.now() - 86400000), 
                        status: 'delivered'
                      }
                    ],
                    unreadCount: 0,
                    lastMessageAt: new Date(Date.now() - 86400000)
                  },
                  {
                    id: '3',
                    isGroup: true,
                    groupName: 'گروه HSE',
                    participants: [
                      { id: '1', name: 'کاربر فعلی', status: 'online' },
                      { id: '2', name: 'سارا احمدی', status: 'online', avatar: 'https://i.pravatar.cc/150?img=1' },
                      { id: '3', name: 'علی محمدی', status: 'away', avatar: 'https://i.pravatar.cc/150?img=2' },
                      { id: '4', name: 'مریم کریمی', status: 'offline', avatar: 'https://i.pravatar.cc/150?img=3' }
                    ],
                    messages: [
                      { 
                        id: 'm5', 
                        senderId: '2', 
                        receiverId: 'group', 
                        content: 'گزارش ماهانه آماده بررسی است', 
                        timestamp: new Date(Date.now() - 172800000), 
                        status: 'read'
                      },
                      { 
                        id: 'm6', 
                        senderId: '3', 
                        receiverId: 'group', 
                        content: 'من امروز بررسی می‌کنم', 
                        timestamp: new Date(Date.now() - 86400000), 
                        status: 'read'
                      }
                    ],
                    unreadCount: 2,
                    lastMessageAt: new Date(Date.now() - 86400000)
                  }
                ]}
                currentUser={{ id: '1', name: 'کاربر فعلی', status: 'online' }}
                onSendMessage={(conversationId, content) => {
                  console.log('Message sent:', { conversationId, content });
                  toast({
                    title: 'پیام ارسال شد',
                    description: content,
                  });
                }}
                onMarkAsRead={(conversationId) => {
                  console.log('Conversation marked as read:', conversationId);
                }}
                onCreateConversation={(participants) => {
                  console.log('New conversation created with:', participants);
                }}
              />
              
              {/* Enhanced Quick Access with hover effects and animation */}
              <div className="relative hidden md:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="group p-2 rounded-full bg-white/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 hover:shadow-md dark:hover:shadow-amber/5 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 relative overflow-hidden">
                        <Bookmark className="h-5 w-5 transition-transform duration-200 group-hover:rotate-[-5deg]" />
                        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/10 to-yellow-400/5 dark:from-amber-500/20 dark:to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"></span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/95 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">
                      <p>دسترسی سریع</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Enhanced Notifications */}
              <AdvancedNotificationBar 
                notifications={[
                  {
                    id: '1',
                    title: 'زمان استراحت چشم‌ها',
                    message: 'لطفا ۲۰ ثانیه به فاصله ۲۰ متری نگاه کنید',
                    type: 'info',
                    priority: 'medium',
                    timestamp: new Date(Date.now() - 300000),
                    read: false,
                    actionable: true,
                    actions: [
                      { label: 'انجام شد', action: () => {} },
                      { label: 'یادآوری بعدی', action: () => {} }
                    ],
                    source: {
                      name: 'سیستم سلامت چشم',
                      department: 'سلامت شغلی'
                    }
                  },
                  {
                    id: '2',
                    title: 'نوبت ارزیابی سلامت ماهانه',
                    message: 'فرم ارزیابی سلامت دوره‌ای شما آماده تکمیل است',
                    type: 'system',
                    priority: 'high',
                    timestamp: new Date(Date.now() - 3600000),
                    read: false,
                    link: '/health/assessment'
                  },
                  {
                    id: '3',
                    title: 'دستاورد جدید!',
                    message: 'شما به مدت ۳۰ روز متوالی فعالیت بدنی داشته‌اید',
                    type: 'success',
                    priority: 'low',
                    timestamp: new Date(Date.now() - 86400000),
                    read: true
                  },
                  {
                    id: '4',
                    title: 'هشدار ارگونومی',
                    message: 'الگوی نشستن شما نیاز به اصلاح دارد',
                    type: 'warning',
                    priority: 'high',
                    timestamp: new Date(Date.now() - (86400000 * 2)),
                    read: false,
                    actionable: true,
                    actions: [
                      { label: 'مشاهده راهنما', action: () => {} }
                    ]
                  },
                  {
                    id: '5',
                    title: 'خطر گرمازدگی',
                    message: 'دمای محیط کار بیش از حد مجاز است. لطفا مایعات بیشتری مصرف کنید.',
                    type: 'error',
                    priority: 'critical',
                    timestamp: new Date(Date.now() - (86400000 * 3)),
                    read: true
                  },
                ]}
                onMarkAsRead={(id) => {
                  console.log('Notification marked as read:', id);
                }}
                onMarkAllAsRead={() => {
                  console.log('All notifications marked as read');
                }}
                onClearNotification={(id) => {
                  console.log('Notification cleared:', id);
                }}
                onClearAllNotifications={() => {
                  console.log('All notifications cleared');
                }}
                onAction={(id, actionIndex) => {
                  console.log('Notification action triggered:', { id, actionIndex });
                  toast({
                    title: 'اقدام انجام شد',
                    description: `عملیات روی اعلان ${id} انجام شد`,
                    variant: 'default',
                  });
                }}
              />
              
              {/* Alert Control Center */}
              <AlertControlCenter 
                alerts={[
                  {
                    id: '1',
                    title: 'اضطراری: آلودگی هوا',
                    description: 'شاخص کیفیت هوا به سطح خطرناک رسیده است. لطفاً از ماسک استفاده کنید.',
                    type: 'error',
                    timestamp: new Date(Date.now() - 1800000),
                    isRead: false,
                    source: 'سیستم پایش کیفیت هوا'
                  },
                  {
                    id: '2',
                    title: 'بازنشانی رمز عبور',
                    description: 'رمز عبور شما با موفقیت بازنشانی شد.',
                    type: 'success',
                    timestamp: new Date(Date.now() - 86400000),
                    isRead: true,
                    source: 'سیستم امنیت'
                  },
                  {
                    id: '3',
                    title: 'بروزرسانی سیستم',
                    description: 'بروزرسانی جدید سیستم نصب شد.',
                    type: 'info',
                    timestamp: new Date(Date.now() - 172800000),
                    isRead: false,
                    source: 'سیستم بروزرسانی'
                  },
                  {
                    id: '4',
                    title: 'هشدار دمای بالا',
                    description: 'دمای سرور به سطح هشدار رسیده است.',
                    type: 'warning',
                    timestamp: new Date(Date.now() - 259200000),
                    isRead: false,
                    source: 'سیستم مانیتورینگ تجهیزات',
                    actionable: true,
                    actionLabel: 'بررسی سیستم',
                    onAction: () => {
                      console.log('Server temperature check');
                    }
                  },
                ]}
                systemControls={[
                  {
                    id: 'brightness',
                    name: 'روشنایی صفحه',
                    type: 'slider',
                    icon: <Sun className="h-4 w-4" />,
                    value: 70,
                    options: { min: 0, max: 100, step: 1 }
                  },
                  {
                    id: 'volume',
                    name: 'صدای سیستم',
                    type: 'slider',
                    icon: <Volume2 className="h-4 w-4" />,
                    value: 50,
                    options: { min: 0, max: 100, step: 1 }
                  },
                  {
                    id: 'bluetoothToggle',
                    name: 'بلوتوث',
                    type: 'toggle',
                    icon: <Bluetooth className="h-4 w-4" />,
                    value: true
                  },
                  {
                    id: 'wifiToggle',
                    name: 'وای‌فای',
                    type: 'toggle',
                    icon: <Wifi className="h-4 w-4" />,
                    value: true
                  },
                  {
                    id: 'screenTime',
                    name: 'زمان استراحت چشم',
                    type: 'toggle',
                    icon: <Eye className="h-4 w-4" />,
                    value: true
                  },
                ]}
                onAlertRead={(id) => {
                  console.log('Alert read:', id);
                }}
                onAlertDismiss={(id) => {
                  console.log('Alert dismissed:', id);
                }}
                onControlChange={(id, value) => {
                  console.log('Control changed:', { id, value });
                  toast({
                    title: 'تنظیمات بروز شد',
                    description: `تنظیم ${id} به مقدار ${value} تغییر کرد`,
                  });
                }}
                onToggleNotifications={(enabled) => {
                  console.log('Notifications toggled:', enabled);
                }}
                notificationsEnabled={true}
              />
              
              {/* Enhanced Help button with animation */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="group p-2 rounded-full text-slate-500 hover:text-aqua hover:bg-slate-100/80 hover:shadow-sm dark:hover:bg-slate-800/80 dark:hover:text-aqua-light transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 relative overflow-hidden">
                      <HelpCircle className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12" />
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-aqua/5 to-tiffany/10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-elastic"></span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/95 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">
                    <p>راهنما و پشتیبانی</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {/* Quick settings with visual effects */}
              <div className="relative hidden md:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="group p-2 rounded-full text-slate-500 hover:text-yellow hover:bg-slate-100/80 hover:shadow-sm dark:hover:bg-slate-800/80 dark:hover:text-yellow-light transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 relative overflow-hidden">
                        <Command className="h-5 w-5 transition-transform duration-200 group-hover:rotate-[-5deg]" />
                        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow/5 to-yellow/10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-elastic"></span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/95 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">
                      <div className="flex items-center">
                        <p>تنظیمات سریع</p>
                        <kbd className="mr-1.5 px-1.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded">Ctrl+K</kbd>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Enhanced User profile dropdown with modern effects */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative focus:outline-none group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tiffany/20 to-aqua/10 flex items-center justify-center text-tiffany font-bold relative border-2 border-white dark:border-slate-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-tiffany/20 dark:group-hover:ring-offset-slate-900 group-hover:scale-105 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-tiffany/10 via-aqua/5 to-tiffany/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 group-hover:animate-breathe-soft">{user?.displayName?.charAt(0) || "م"}</span>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-slate-800 shadow-sm">
                        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75 duration-1000"></div>
                      </div>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-60 rounded-xl p-1.5 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 shadow-lg">
                  <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tiffany/15 to-navy/10 flex items-center justify-center text-tiffany font-bold relative border border-white/60 dark:border-slate-800/60">
                      <span>{user?.displayName?.charAt(0) || "م"}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{user?.displayName || "کاربر"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{user?.username || "کاربر پرانا"}</p>
                    </div>
                    <Badge variant="outline" className="mr-auto h-5 bg-tiffany/5 dark:bg-tiffany/10 text-tiffany-dark dark:text-tiffany-light text-[10px] px-1.5 border-tiffany/20">
                      فعال
                    </Badge>
                  </div>
                  
                  <div className="p-1.5 space-y-0.5">
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2.5 px-3 transition-colors duration-200 group/item">
                      <div className="p-1.5 rounded-md mr-0 ml-2.5 bg-gradient-to-r from-tiffany/10 to-aqua/10 dark:from-tiffany/15 dark:to-aqua/15 group-hover/item:bg-gradient-to-r group-hover/item:from-tiffany/20 group-hover/item:to-aqua/20 dark:group-hover/item:from-tiffany/25 dark:group-hover/item:to-aqua/25 transition-all duration-200">
                        <User className="h-4 w-4 text-tiffany/70 dark:text-tiffany-light/70 group-hover/item:text-tiffany dark:group-hover/item:text-tiffany-light transition-all duration-200" />
                      </div>
                      <span className="font-medium">پروفایل</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2.5 px-3 transition-colors duration-200 group/item">
                      <div className="p-1.5 rounded-md mr-0 ml-2.5 bg-gradient-to-r from-navy/10 to-blue/10 dark:from-navy/15 dark:to-blue/15 group-hover/item:bg-gradient-to-r group-hover/item:from-navy/20 group-hover/item:to-blue/20 dark:group-hover/item:from-navy/25 dark:group-hover/item:to-blue/25 transition-all duration-200">
                        <Settings className="h-4 w-4 text-navy/70 dark:text-blue/70 group-hover/item:text-navy dark:group-hover/item:text-blue transition-all duration-200" />
                      </div>
                      <span className="font-medium">تنظیمات</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2.5 px-3 transition-colors duration-200 group/item">
                      <div className="p-1.5 rounded-md mr-0 ml-2.5 bg-gradient-to-r from-yellow/10 to-yellow-light/10 dark:from-yellow/15 dark:to-yellow-light/15 group-hover/item:bg-gradient-to-r group-hover/item:from-yellow/20 group-hover/item:to-yellow-light/20 dark:group-hover/item:from-yellow/25 dark:group-hover/item:to-yellow-light/25 transition-all duration-200">
                        <UserCog className="h-4 w-4 text-yellow/70 dark:text-yellow-light/70 group-hover/item:text-yellow dark:group-hover/item:text-yellow-light transition-all duration-200" />
                      </div>
                      <span className="font-medium">مدیریت حساب</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="my-1.5 bg-slate-200/70 dark:bg-slate-700/70" />
                    
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2.5 px-3 transition-colors duration-200 group/item">
                      <div className="p-1.5 rounded-md mr-0 ml-2.5 bg-gradient-to-r from-violet-600/10 to-purple-500/10 dark:from-violet-600/15 dark:to-purple-500/15 group-hover/item:bg-gradient-to-r group-hover/item:from-violet-600/20 group-hover/item:to-purple-500/20 dark:group-hover/item:from-violet-600/25 dark:group-hover/item:to-purple-500/25 transition-all duration-200">
                        <Languages className="h-4 w-4 text-violet-600/70 dark:text-purple-500/70 group-hover/item:text-violet-600 dark:group-hover/item:text-purple-500 transition-all duration-200" />
                      </div>
                      <span className="font-medium">زبان برنامه</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem className="flex items-center cursor-pointer rounded-lg py-2.5 px-3 transition-colors duration-200 group/item">
                      <div className="p-1.5 rounded-md mr-0 ml-2.5 bg-gradient-to-r from-slate-500/10 to-gray-400/10 dark:from-slate-500/15 dark:to-gray-400/15 group-hover/item:bg-gradient-to-r group-hover/item:from-slate-500/20 group-hover/item:to-gray-400/20 dark:group-hover/item:from-slate-500/25 dark:group-hover/item:to-gray-400/25 transition-all duration-200">
                        <Keyboard className="h-4 w-4 text-slate-600/70 dark:text-gray-400/70 group-hover/item:text-slate-600 dark:group-hover/item:text-gray-400 transition-all duration-200" />
                      </div>
                      <span className="font-medium">میانبرهای کیبورد</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="my-1.5 bg-slate-200/70 dark:bg-slate-700/70" />
                    
                    <DropdownMenuItem 
                      className="flex items-center cursor-pointer rounded-lg py-2.5 px-3 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 group/item"
                      onClick={logout}
                    >
                      <div className="p-1.5 rounded-md mr-0 ml-2.5 bg-gradient-to-r from-red-500/10 to-rose-500/10 dark:from-red-500/15 dark:to-rose-500/15 group-hover/item:bg-gradient-to-r group-hover/item:from-red-500/20 group-hover/item:to-rose-500/20 dark:group-hover/item:from-red-500/25 dark:group-hover/item:to-rose-500/25 transition-all duration-200">
                        <LogOut className="h-4 w-4 text-red-500/70 dark:text-red-400/70 group-hover/item:text-red-500 dark:group-hover/item:text-red-400 transition-all duration-200" />
                      </div>
                      <span className="font-medium group-hover/item:text-red-500 dark:group-hover/item:text-red-400 transition-colors duration-200">خروج از حساب</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Enhanced Bottom row with Windows 11-style toolbars */}
          <div className="flex flex-col gap-3">
            {/* Enhanced searchbar with modern glassmorphism and animations */}
            <div className="relative flex-grow max-w-full">
              <div className="flex items-center gap-2 p-1 bg-white/80 dark:bg-slate-800/75 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/40 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="relative flex-grow">
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-tiffany transition-colors duration-300 w-5 h-5 flex items-center justify-center">
                    <Search className="h-4 w-4 absolute group-hover:animate-pulse" />
                    <div className="absolute inset-0 bg-tiffany/5 dark:bg-tiffany/10 rounded-full scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  <Input 
                    placeholder="جستجو در برنامه..." 
                    className="pr-10 pl-4 py-2 text-sm h-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:transition-colors placeholder:duration-300 focus:placeholder:text-tiffany/70 dark:focus:placeholder:text-tiffany-light/70"
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
            
            {/* Enhanced modern fluid tab navigation with improved aesthetics */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 space-x-reverse p-1.5 bg-white/70 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700/40 backdrop-blur-xl shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-tiffany/3 via-aqua/2 to-tiffany/3 dark:from-tiffany/5 dark:via-aqua/3 dark:to-tiffany/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <Button variant="ghost" size="sm" className="rounded-lg bg-tiffany/10 dark:bg-tiffany/15 text-tiffany dark:text-tiffany-light relative overflow-hidden z-10 font-medium transition-all duration-300 shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-tiffany/10 to-aqua/10 dark:from-tiffany/20 dark:to-aqua/15 opacity-50"></div>
                  <LayoutDashboard className="h-4 w-4 ml-1.5 relative z-10" />
                  <span className="relative z-10">میز کار</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 hover:shadow-sm relative group/btn overflow-hidden">
                  <Heart className="h-4 w-4 ml-1.5 group-hover/btn:text-rose-500 transition-colors duration-300" />
                  <span className="group-hover/btn:font-medium transition-all duration-300">سلامت شغلی</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-rose-400/5 dark:from-rose-500/10 dark:to-rose-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>
                
                <Button variant="ghost" size="sm" className="rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 hover:shadow-sm relative group/btn overflow-hidden">
                  <GraduationCap className="h-4 w-4 ml-1.5 group-hover/btn:text-blue-500 transition-colors duration-300" />
                  <span className="group-hover/btn:font-medium transition-all duration-300">آموزش</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-400/5 dark:from-blue-500/10 dark:to-blue-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>
                
                <Button variant="ghost" size="sm" className="rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 hover:shadow-sm relative group/btn overflow-hidden">
                  <Trophy className="h-4 w-4 ml-1.5 group-hover/btn:text-yellow-500 transition-colors duration-300" />
                  <span className="group-hover/btn:font-medium transition-all duration-300">دستاوردها</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-yellow-400/5 dark:from-yellow-500/10 dark:to-yellow-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>
                
                <Button variant="ghost" size="sm" className="rounded-lg hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 hover:shadow-sm relative group/btn overflow-hidden">
                  <Users className="h-4 w-4 ml-1.5 group-hover/btn:text-violet-500 transition-colors duration-300" />
                  <span className="group-hover/btn:font-medium transition-all duration-300">دپارتمان</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-violet-400/5 dark:from-violet-500/10 dark:to-violet-400/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </Button>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-all duration-300">
                        <ChevronDown className="h-4 w-4 transition-transform duration-300 hover:scale-110" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/95 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">
                      <p>بخش‌های بیشتر</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              {/* Enhanced Quick Actions with modern UI effects */}
              <div className="hidden md:flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="relative overflow-hidden rounded-lg h-9 border-slate-200/70 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/60 backdrop-blur-md hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-sm hover:shadow group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-tiffany/5 to-tiffany-light/5 dark:from-tiffany/10 dark:to-tiffany-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <RefreshCw className="h-4 w-4 ml-1.5 mr-0.5 group-hover:text-tiffany dark:group-hover:text-tiffany-light transition-colors duration-300 group-hover:rotate-180 transition-transform ease-in-out duration-700" />
                        <span className="font-medium group-hover:text-tiffany dark:group-hover:text-tiffany-light transition-colors duration-300 relative z-10">بروزرسانی</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/95 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">
                      <p>بروزرسانی داده‌ها</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="relative overflow-hidden rounded-lg h-9 border-slate-200/70 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/60 backdrop-blur-md hover:bg-white/90 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-sm hover:shadow group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow/5 to-yellow-light/5 dark:from-yellow/10 dark:to-yellow-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Sparkles className="h-4 w-4 ml-1.5 mr-0.5 group-hover:text-yellow dark:group-hover:text-yellow-light transition-colors duration-300 group-hover:animate-pulse" />
                      <span className="font-medium group-hover:text-yellow dark:group-hover:text-yellow-light transition-colors duration-300 relative z-10">عملیات سریع</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl w-60 p-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/40 shadow-lg">
                    <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-700/80 py-2.5 px-3 transition-all duration-200 group/item">
                      <div className="p-1.5 rounded-md mr-0 ml-2.5 bg-gradient-to-r from-tiffany/10 to-aqua/10 dark:from-tiffany/15 dark:to-aqua/15 group-hover/item:bg-gradient-to-r group-hover/item:from-tiffany/20 group-hover/item:to-aqua/20 dark:group-hover/item:from-tiffany/25 dark:group-hover/item:to-aqua/25 transition-all duration-200">
                        <UserPlus className="h-4 w-4 text-tiffany/70 dark:text-tiffany-light/70 group-hover/item:text-tiffany dark:group-hover/item:text-tiffany-light transition-all duration-200" />
                      </div>
                      <span className="font-medium">افزودن کاربر جدید</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-700/80 py-2.5 px-3 transition-all duration-200 group/item">
                      <div className="p-1.5 rounded-md mr-0 ml-2.5 bg-gradient-to-r from-navy/10 to-blue/10 dark:from-navy/15 dark:to-blue/15 group-hover/item:bg-gradient-to-r group-hover/item:from-navy/20 group-hover/item:to-blue/20 dark:group-hover/item:from-navy/25 dark:group-hover/item:to-blue/25 transition-all duration-200">
                        <FileText className="h-4 w-4 text-navy/70 dark:text-blue/70 group-hover/item:text-navy dark:group-hover/item:text-blue transition-all duration-200" />
                      </div>
                      <span className="font-medium">ایجاد گزارش</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-slate-100/80 dark:hover:bg-slate-700/80 py-2.5 px-3 transition-all duration-200 group/item">
                      <div className="p-1.5 rounded-md mr-0 ml-2.5 bg-gradient-to-r from-violet-600/10 to-purple-500/10 dark:from-violet-600/15 dark:to-purple-500/15 group-hover/item:bg-gradient-to-r group-hover/item:from-violet-600/20 group-hover/item:to-purple-500/20 dark:group-hover/item:from-violet-600/25 dark:group-hover/item:to-purple-500/25 transition-all duration-200">
                        <Database className="h-4 w-4 text-violet-600/70 dark:text-purple-500/70 group-hover/item:text-violet-600 dark:group-hover/item:text-purple-500 transition-all duration-200" />
                      </div>
                      <span className="font-medium">سنکرون‌سازی داده‌ها</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page content with enhanced container and subtle decoration */}
        <div className="flex-1 p-6 relative">
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white/20 dark:from-slate-800/30 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 right-0 w-96 h-96 bg-tiffany/3 dark:bg-tiffany/5 rounded-full filter blur-3xl opacity-50 -z-10 animate-drift"></div>
            <div className="absolute top-2/3 left-0 w-64 h-64 bg-aqua/3 dark:bg-aqua/5 rounded-full filter blur-3xl opacity-50 -z-10 animate-drift-slow"></div>
          </div>
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
        {/* Enhanced Footer with improved visualization */}
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