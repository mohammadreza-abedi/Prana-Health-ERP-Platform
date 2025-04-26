import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Award,
  User,
  BarChart,
  Settings,
  LogOut,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import useIsMobile from "@/hooks/use-mobile";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [, navigate] = useLocation();
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast({
        title: "خروج موفقیت‌آمیز",
        description: "با موفقیت از سیستم خارج شدید.",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Menu items based on user role
  const menuItems = [
    {
      title: "داشبورد",
      icon: <Home className="h-5 w-5" />,
      path: "/",
      roles: ["user", "hr", "hse", "admin"],
    },
    {
      title: "چالش‌ها",
      icon: <Award className="h-5 w-5" />,
      path: "/challenges",
      roles: ["user", "hr", "hse", "admin"],
    },
    {
      title: "جدول امتیازات",
      icon: <BarChart className="h-5 w-5" />,
      path: "/leaderboard",
      roles: ["user", "hr", "hse", "admin"],
    },
    {
      title: "پروفایل من",
      icon: <User className="h-5 w-5" />,
      path: "/profile",
      roles: ["user", "hr", "hse", "admin"],
    },
    {
      title: "داشبورد HR",
      icon: <Users className="h-5 w-5" />,
      path: "/hr-dashboard",
      roles: ["hr", "admin"],
    },
    {
      title: "داشبورد HSE",
      icon: <Shield className="h-5 w-5" />,
      path: "/hse-dashboard",
      roles: ["hse", "admin"],
    },
    {
      title: "رویدادها",
      icon: <Calendar className="h-5 w-5" />,
      path: "/events",
      roles: ["user", "hr", "hse", "admin"],
    },
    {
      title: "گزارش‌ها",
      icon: <TrendingUp className="h-5 w-5" />,
      path: "/reports",
      roles: ["hr", "hse", "admin"],
    },
    {
      title: "پایش سلامت",
      icon: <Activity className="h-5 w-5" />,
      path: "/health-monitoring",
      roles: ["user", "hse", "admin"],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = user
    ? menuItems.filter((item) => item.roles.includes(user.role))
    : [];

  if (!user) return null;

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
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-tiffany to-aqua flex items-center justify-center">
                  <span className="text-white font-black text-sm">پ</span>
                </div>
                <h1 className="text-lg font-bold mr-2 bg-gradient-to-r from-tiffany to-aqua bg-clip-text text-transparent">پرانا</h1>
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
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                user.displayName[0]
              )}
              <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-slate-800"></div>
            </div>
            
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mr-3 overflow-hidden"
              >
                <h3 className="text-sm font-bold truncate">{user.displayName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user.role === 'hr' ? 'مدیر منابع انسانی' : 
                   user.role === 'hse' ? 'کارشناس HSE' : 
                   user.role === 'admin' ? 'مدیر سیستم' : 'کاربر'}
                </p>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 py-6 overflow-y-auto mica my-4 mx-2 rounded-xl">
            <nav className="px-2">
              <ul className="space-y-1">
                {filteredMenuItems.map((item, idx) => {
                  const isActive = location === item.path;
                  return (
                    <li key={idx}>
                      <Link href={item.path}>
                        <a
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
                        </a>
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
                <Sun className="h-5 w-5 text-yellow" />
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
              onClick={handleLogout}
              className={`w-full flex items-center px-3 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 ${
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
                  خروج
                </motion.span>
              )}
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto relative bg-slate-50 dark:bg-slate-900">
        {/* Mobile header */}
        {isMobile && (
          <div className="sticky top-0 z-20 p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-tiffany to-aqua flex items-center justify-center">
                <span className="text-white font-black text-sm">پ</span>
              </div>
              <h1 className="text-lg font-bold mr-2 bg-gradient-to-r from-tiffany to-aqua bg-clip-text text-transparent">پرانا</h1>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-tiffany font-bold">{user.displayName[0]}</span>
              )}
            </div>
          </div>
        )}

        {/* Page content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}