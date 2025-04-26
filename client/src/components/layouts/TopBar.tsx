import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/ui/theme-provider";
import { Bell, Sun, Moon, Menu } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { useLocation } from "wouter";

export default function TopBar() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const [location] = useLocation();
  const [title, setTitle] = useState("داشبورد سلامت");
  
  useEffect(() => {
    switch (location) {
      case "/":
        setTitle("داشبورد سلامت");
        break;
      case "/hr-dashboard":
        setTitle("داشبورد مدیریتی");
        break;
      case "/challenges":
        setTitle("چالش‌های روزانه");
        break;
      case "/leaderboard":
        setTitle("مسابقات و رتبه‌بندی");
        break;
      case "/profile":
        setTitle("پروفایل کاربری");
        break;
      default:
        setTitle("داشبورد سلامت");
    }
  }, [location]);
  
  if (!user) return null;
  
  return (
    <motion.div 
      className="flex justify-between items-center mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <div className="md:hidden ml-3">
          <button className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/30">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4 space-x-reverse">
        <button 
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/30"
        >
          {theme === "light" ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </button>
        
        <button className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/30 relative">
          <Bell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">۳</span>
        </button>
      </div>
    </motion.div>
  );
}
