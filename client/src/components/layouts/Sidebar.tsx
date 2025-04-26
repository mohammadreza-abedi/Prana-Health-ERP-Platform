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
  LogOutIcon
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  const isActive = (path: string) => location === path;
  
  const navItems = [
    { path: "/", label: "داشبورد من", icon: <HomeIcon className="h-5 w-5 ml-3" /> },
    { path: "/challenges", label: "چالش‌های روزانه", icon: <ClipboardListIcon className="h-5 w-5 ml-3" /> },
    { path: "/leaderboard", label: "مسابقات و رتبه‌ها", icon: <BarChart3Icon className="h-5 w-5 ml-3" /> },
    { path: "/activities", label: "فعالیت‌های روزانه", icon: <ClockIcon className="h-5 w-5 ml-3" /> },
    { path: "/profile", label: "پروفایل من", icon: <UserIcon className="h-5 w-5 ml-3" /> },
    { path: "/rewards", label: "جوایز و دستاوردها", icon: <GiftIcon className="h-5 w-5 ml-3" /> },
    { path: "/calendar", label: "تقویم سلامت", icon: <CalendarIcon className="h-5 w-5 ml-3" /> },
    { path: "/articles", label: "مقالات سلامت", icon: <BookOpenIcon className="h-5 w-5 ml-3" /> },
  ];
  
  // HR and HSE specific navigation
  if (user.role === "hr" || user.role === "hse" || user.role === "admin") {
    navItems.splice(1, 0, {
      path: "/hr-dashboard",
      label: "داشبورد مدیریتی",
      icon: <BarChart3Icon className="h-5 w-5 ml-3" />
    });
  }
  
  return (
    <aside className="hidden md:flex flex-col w-64 p-4 gap-6 glass dark:glass-dark shadow-lg h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tiffany to-aqua flex items-center justify-center">
          <span className="text-navy font-bold text-lg">پ</span>
        </div>
        <h1 className="text-xl font-medium mr-3 text-tiffany">پرانا</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <a
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-tiffany/10 text-tiffany font-medium"
                      : "hover:bg-slate-200/50 dark:hover:bg-slate-700/30"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
          
          <li>
            <button
              onClick={() => logout()}
              className="w-full flex items-center p-3 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/30 transition-colors text-rose-500"
            >
              <LogOutIcon className="h-5 w-5 ml-3" />
              خروج
            </button>
          </li>
        </ul>
      </nav>
      
      {/* User section */}
      <motion.div 
        className="border-t border-slate-200 dark:border-slate-700 pt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={`تصویر ${user.displayName}`} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-tiffany/20 flex items-center justify-center text-tiffany">
              {user.displayName[0]}
            </div>
          )}
          <div className="mr-3 dir-rtl">
            <p className="font-medium text-sm">{user.displayName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              سطح {user.level} | {user.xp} امتیاز
            </p>
          </div>
        </div>
      </motion.div>
    </aside>
  );
}
