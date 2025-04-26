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
} from "lucide-react";
import useIsMobile from "@/hooks/use-mobile";
import Footer from "./Footer";

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
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto relative bg-slate-50 dark:bg-slate-900 flex flex-col">
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
              <span className="text-tiffany font-bold">م</span>
            </div>
          </div>
        )}

        {/* Page content */}
        <div className="flex-1 p-6">{children}</div>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}