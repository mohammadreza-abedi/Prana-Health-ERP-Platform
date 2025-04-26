import { useState } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/useAuth";
import {
  HomeIcon,
  ClipboardListIcon,
  BarChart3Icon,
  ClockIcon,
  UserIcon,
  GiftIcon,
  CalendarIcon,
  BookOpenIcon,
  LogOutIcon,
  Brain,
  LineChart,
  Activity,
  Sparkles,
  BadgePercent,
  Layers,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [expanded, setExpanded] = useState(true);
  
  if (!user) return null;
  
  const isActive = (path: string) => location === path;
  
  const navItems = [
    { path: "/", label: "داشبورد پیشرفته", icon: <HomeIcon className="h-5 w-5 ml-3" />, highlight: true },
    { path: "/dashboard", label: "داشبورد ساده", icon: <Activity className="h-5 w-5 ml-3" /> },
    { path: "/psychological-tests", label: "تست‌های روانشناسی", icon: <Brain className="h-5 w-5 ml-3" />, highlight: true },
    { path: "/challenges", label: "چالش‌های روزانه", icon: <ClipboardListIcon className="h-5 w-5 ml-3" /> },
    { path: "/leaderboard", label: "مسابقات و رتبه‌ها", icon: <BarChart3Icon className="h-5 w-5 ml-3" /> },
    { path: "/profile", label: "پروفایل من", icon: <UserIcon className="h-5 w-5 ml-3" /> },
    { path: "/rewards", label: "جوایز و دستاوردها", icon: <GiftIcon className="h-5 w-5 ml-3" /> },
  ];
  
  // بخش دوم منو - ابزارها و تنظیمات
  const secondaryNavItems = [
    { path: "/calendar", label: "تقویم سلامت", icon: <CalendarIcon className="h-5 w-5 ml-3" /> },
    { path: "/articles", label: "مقالات سلامت", icon: <BookOpenIcon className="h-5 w-5 ml-3" /> },
    { path: "/analytics", label: "آنالیز پیشرفته", icon: <LineChart className="h-5 w-5 ml-3" /> },
    { path: "/settings", label: "تنظیمات", icon: <Settings className="h-5 w-5 ml-3" /> },
  ];
  
  // HR and HSE specific navigation
  if (user.role === "hr" || user.role === "hse" || user.role === "admin") {
    navItems.splice(1, 0, {
      path: "/hr-dashboard",
      label: "داشبورد مدیریتی",
      icon: <BarChart3Icon className="h-5 w-5 ml-3" />,
      highlight: true
    });
  }
  
  return (
    <aside className="hidden md:flex flex-col w-72 gap-4 h-screen sticky top-0 acrylic neon-card border-l z-50">
      {/* Logo */}
      <div className="flex items-center p-6 border-b border-b-slate-200/20 dark:border-b-slate-700/20">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tiffany to-aqua flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-xl">پ</span>
        </div>
        <div className="mr-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-tiffany to-aqua bg-clip-text text-transparent">پرانا</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">پلتفرم هوشمند سلامت و ولنس</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2">
        <div className="mb-2 px-3">
          <h2 className="text-xs font-medium text-slate-500 dark:text-slate-400">دسترسی سریع</h2>
        </div>
        <ul className="space-y-1.5">
          {navItems.map((item) => (
            <motion.li 
              key={item.path}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Link href={item.path}>
                <a
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-tiffany/20 to-aqua/10 text-tiffany font-medium"
                      : "hover:bg-slate-200/30 dark:hover:bg-slate-700/30"
                  } ${item.highlight ? "relative overflow-hidden" : ""}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  
                  {item.highlight && !isActive(item.path) && (
                    <div className="absolute top-0 right-0 w-1.5 h-full bg-tiffany rounded-r-lg opacity-60"></div>
                  )}
                  
                  {isActive(item.path) && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-tiffany/10 z-0"></div>
                  )}
                </a>
              </Link>
            </motion.li>
          ))}
          
          <div className="h-px bg-slate-200/30 dark:bg-slate-700/30 my-3"></div>
          
          <div className="mb-2 px-3">
            <h2 className="text-xs font-medium text-slate-500 dark:text-slate-400">ابزارها و تنظیمات</h2>
          </div>
          
          {secondaryNavItems.map((item) => (
            <motion.li 
              key={item.path}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Link href={item.path}>
                <a
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-tiffany/20 to-aqua/10 text-tiffany font-medium"
                      : "hover:bg-slate-200/30 dark:hover:bg-slate-700/30"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </Link>
            </motion.li>
          ))}
          
          <div className="h-px bg-slate-200/30 dark:bg-slate-700/30 my-3"></div>
          
          <motion.li 
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <button
              onClick={() => logout()}
              className="w-full flex items-center px-3 py-2.5 rounded-lg hover:bg-rose-500/10 transition-all text-rose-500"
            >
              <LogOutIcon className="h-5 w-5 ml-3" />
              خروج
            </button>
          </motion.li>
        </ul>
      </nav>
      
      {/* User section */}
      <motion.div 
        className="border-t border-t-slate-200/20 dark:border-t-slate-700/20 p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center bg-white/5 dark:bg-slate-800/40 rounded-xl p-3 neon-card-dim">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={`تصویر ${user.displayName}`} 
              className="w-12 h-12 rounded-xl object-cover border-2 border-tiffany/20"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tiffany/30 to-aqua/30 flex items-center justify-center text-white font-bold">
              {user.displayName[0]}
            </div>
          )}
          <div className="mr-3 dir-rtl">
            <p className="font-medium text-sm">{user.displayName}</p>
            <div className="flex items-center mt-1 text-xs text-slate-500 dark:text-slate-400">
              <BadgePercent className="h-3.5 w-3.5 ml-1 text-tiffany" />
              سطح {user.level} | {user.xp} امتیاز
            </div>
          </div>
          
          <Link href="/profile">
            <a className="mr-auto bg-tiffany/10 hover:bg-tiffany/20 transition-colors p-1.5 rounded-lg">
              <Settings className="h-4 w-4 text-tiffany" />
            </a>
          </Link>
        </div>
      </motion.div>
    </aside>
  );
}
