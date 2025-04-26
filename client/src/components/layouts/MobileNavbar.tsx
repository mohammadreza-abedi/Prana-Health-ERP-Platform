import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { HomeIcon, ClipboardListIcon, BarChart3Icon, UserIcon } from "lucide-react";

export default function MobileNavbar() {
  const [location] = useLocation();
  
  const isActive = (path: string) => location === path;
  
  return (
    <motion.div 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass dark:glass-dark shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex justify-around items-center p-3">
        <Link href="/">
          <a className={`flex flex-col items-center ${isActive("/") ? "text-tiffany" : "text-slate-500"}`}>
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs mt-1">داشبورد</span>
          </a>
        </Link>
        
        <Link href="/challenges">
          <a className={`flex flex-col items-center ${isActive("/challenges") ? "text-tiffany" : "text-slate-500"}`}>
            <ClipboardListIcon className="h-6 w-6" />
            <span className="text-xs mt-1">چالش‌ها</span>
          </a>
        </Link>
        
        <Link href="/leaderboard">
          <a className={`flex flex-col items-center ${isActive("/leaderboard") ? "text-tiffany" : "text-slate-500"}`}>
            <BarChart3Icon className="h-6 w-6" />
            <span className="text-xs mt-1">مسابقات</span>
          </a>
        </Link>
        
        <Link href="/profile">
          <a className={`flex flex-col items-center ${isActive("/profile") ? "text-tiffany" : "text-slate-500"}`}>
            <UserIcon className="h-6 w-6" />
            <span className="text-xs mt-1">پروفایل</span>
          </a>
        </Link>
      </div>
    </motion.div>
  );
}
