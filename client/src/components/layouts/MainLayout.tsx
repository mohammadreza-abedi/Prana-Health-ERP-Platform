import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import PWAInstallButton from "@/components/pwa/PWAInstallButton";
import { useAvatar } from "@/contexts/AvatarContext";
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
  CloudSun,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { useIsMobile, useToast } from "@/hooks";

// هلپر برای تبدیل رنگ‌ها - Helper Functions for Color
function getActiveGradient(color: string): string {
  const colorMap: Record<string, string> = {
    "tiffany": "bg-gradient-to-l from-tiffany/90 to-green-500 shadow-tiffany/20 dark:shadow-tiffany/10",
    "indigo": "bg-gradient-to-l from-indigo-500/90 to-blue-500 shadow-indigo-500/20 dark:shadow-indigo-500/10",
    "amber": "bg-gradient-to-l from-amber-500/90 to-orange-400 shadow-amber-500/20 dark:shadow-amber-500/10",
    "purple": "bg-gradient-to-l from-purple-500/90 to-fuchsia-400 shadow-purple-500/20 dark:shadow-purple-500/10",
    "rose": "bg-gradient-to-l from-rose-500/90 to-pink-400 shadow-rose-500/20 dark:shadow-rose-500/10",
    "blue": "bg-gradient-to-l from-blue-500/90 to-sky-400 shadow-blue-500/20 dark:shadow-blue-500/10",
    "green": "bg-gradient-to-l from-green-500/90 to-emerald-400 shadow-green-500/20 dark:shadow-green-500/10",
    "red": "bg-gradient-to-l from-red-500/90 to-rose-400 shadow-red-500/20 dark:shadow-red-500/10",
    "slate": "bg-gradient-to-l from-slate-500/90 to-slate-400 shadow-slate-500/20 dark:shadow-slate-500/10",
  };
  
  return colorMap[color] || colorMap["tiffany"];
}

function getHoverColors(color: string): string {
  const colorMap: Record<string, string> = {
    "tiffany": "bg-gradient-to-r from-tiffany/5 to-white/30 dark:from-tiffany/10 dark:to-slate-800/50",
    "indigo": "bg-gradient-to-r from-indigo-400/5 to-white/30 dark:from-indigo-500/10 dark:to-slate-800/50",
    "amber": "bg-gradient-to-r from-amber-400/5 to-white/30 dark:from-amber-500/10 dark:to-slate-800/50",
    "purple": "bg-gradient-to-r from-purple-400/5 to-white/30 dark:from-purple-500/10 dark:to-slate-800/50",
    "rose": "bg-gradient-to-r from-rose-400/5 to-white/30 dark:from-rose-500/10 dark:to-slate-800/50",
    "blue": "bg-gradient-to-r from-blue-400/5 to-white/30 dark:from-blue-500/10 dark:to-slate-800/50",
    "green": "bg-gradient-to-r from-green-400/5 to-white/30 dark:from-green-500/10 dark:to-slate-800/50",
    "red": "bg-gradient-to-r from-red-400/5 to-white/30 dark:from-red-500/10 dark:to-slate-800/50",
    "slate": "bg-gradient-to-r from-slate-300/5 to-white/30 dark:from-slate-400/10 dark:to-slate-800/50",
  };
  
  return colorMap[color] || colorMap["tiffany"];
}

function getTextHoverColor(color: string): string {
  const colorMap: Record<string, string> = {
    "tiffany": "text-tiffany dark:text-tiffany-light",
    "indigo": "text-indigo-500 dark:text-indigo-300",
    "amber": "text-amber-500 dark:text-amber-300",
    "purple": "text-purple-500 dark:text-purple-300",
    "rose": "text-rose-500 dark:text-rose-300",
    "blue": "text-blue-500 dark:text-blue-300",
    "green": "text-green-500 dark:text-green-300",
    "red": "text-red-500 dark:text-red-300",
    "slate": "text-slate-700 dark:text-slate-300",
  };
  
  return colorMap[color] || colorMap["tiffany"];
}

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  color?: string;
  description?: string;
  isNew?: boolean;
  badge?: { text: string; color?: string }
}

interface MenuCategory {
  category: string;
  icon: React.ReactNode;
  items: MenuItem[];
}

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const darkMode = theme === "dark";
  const { activeAvatar } = useAvatar();
  const [showHealthReminders, setShowHealthReminders] = useState(true);

  useEffect(() => {
    if (isMobile) {
      setIsExpanded(false);
    }
  }, [isMobile]);

  const toggleDarkMode = () => {
    setTheme(darkMode ? "light" : "dark");
  };

  const logout = () => {
    console.log("Logging out");
    // Add your logout logic here
  };

  // تعریف دسته‌بندی‌های اصلی منو - Main menu categories
  const mainMenuCategories: MenuCategory[] = [
    {
      category: "منوی اصلی",
      icon: <Home className="h-5 w-5" />,
      items: [
        {
          title: "داشبورد",
          path: "/",
          icon: <Activity className="h-5 w-5" />,
          description: "دید کلی و وضعیت سلامت",
          color: "tiffany"
        },
        {
          title: "پروفایل من",
          path: "/profile",
          icon: <User className="h-5 w-5" />,
          description: "مشاهده و مدیریت مشخصات",
          color: "blue"
        }
      ]
    },
    {
      category: "سلامت و فعالیت",
      icon: <Activity className="h-5 w-5" />,
      items: [
        {
          title: "چالش‌های روزانه",
          path: "/challenges",
          icon: <Award className="h-5 w-5" />,
          description: "فعالیت‌های موثر برای سلامتی",
          color: "amber"
        },
        {
          title: "دستاوردها",
          path: "/achievements",
          icon: <Shield className="h-5 w-5" />,
          description: "نشان‌ها و جوایز کسب شده",
          color: "rose"
        },
        {
          title: "جدول رتبه‌بندی",
          path: "/leaderboard",
          icon: <BarChart className="h-5 w-5" />,
          description: "رتبه‌بندی کاربران",
          color: "indigo"
        },
        {
          title: "روند پیشرفت",
          path: "/progress",
          icon: <TrendingUp className="h-5 w-5" />,
          description: "ارزیابی پیشرفت سلامتی",
          color: "green",
          isNew: true
        }
      ]
    },
    {
      category: "سرویس‌های هوشمند",
      icon: <Brain className="h-5 w-5" />,
      items: [
        {
          title: "اطلاعات آب و هوا",
          path: "/weather-info",
          icon: <CloudSun className="h-5 w-5" />,
          description: "وضعیت آب و هوا و پیش‌بینی‌ها",
          color: "blue",
          isNew: true
        },
        {
          title: "تحلیل پیشرفته",
          path: "/ai-analytics",
          icon: <BarChart className="h-5 w-5" />,
          description: "تحلیل‌های هوشمند با هوش مصنوعی",
          color: "purple"
        },
        {
          title: "داشبورد هوشمند HSE",
          path: "/hse-smart-dashboard",
          icon: <Shield className="h-5 w-5" />,
          description: "ایمنی و سلامت شغلی",
          color: "tiffany"
        }
      ]
    },
    {
      category: "سازمانی",
      icon: <Users className="h-5 w-5" />,
      items: [
        {
          title: "رویدادهای سازمانی",
          path: "/events",
          icon: <Calendar className="h-5 w-5" />,
          description: "رویدادها و برنامه‌های شرکتی",
          color: "indigo"
        },
        {
          title: "کیف پول سلامتی",
          path: "/wallet",
          icon: <CreditCard className="h-5 w-5" />,
          description: "مدیریت امتیازات و جوایز",
          color: "amber"
        }
      ]
    }
  ];

  // لینک‌های اضافی در انتهای منو - Additional links at the bottom
  const additionalLinks: MenuItem[] = [
    {
      title: "راهنما",
      icon: <HelpCircle className="h-5 w-5" />,
      path: "/help",
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
          initial={{ width: isMobile ? 0 : 280 }}
          animate={{ width: isExpanded ? 280 : 80 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.19, 1, 0.22, 1] // Expo ease for smooth animation
          }}
          className="h-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-l border-slate-200/60 dark:border-slate-800/40 relative z-30 flex flex-col shadow-[8px_0px_30px_-12px_rgba(0,0,0,0.05)] dark:shadow-[8px_0px_30px_-12px_rgba(0,0,0,0.2)] backdrop-blur-sm"
        >
          {/* Sidebar Header */}
          <div className="p-4 flex items-center justify-between">
            {isExpanded && (
              <div className="flex items-center">
                <div className="w-9 h-9 bg-gradient-to-tr from-tiffany to-blue-400 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-tiffany/20">
                  P
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mr-2 font-bold text-slate-700 dark:text-slate-300"
                >
                  پرانا
                </motion.div>
              </div>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-800/80 transition-colors"
            >
              {isExpanded ? <ChevronRight className="h-5 w-5 text-slate-500" /> : <ChevronLeft className="h-5 w-5 text-slate-500" />}
            </button>
          </div>
          
          {/* User Profile */}
          <div className="px-4 py-2">
            <div className="p-3 rounded-xl bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-800/30 shadow-sm flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 border border-slate-300/50 dark:border-slate-600/50">
                  {activeAvatar && activeAvatar.imageUrl ? (
                    <img 
                      src={activeAvatar.imageUrl} 
                      alt="Avatar" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <User className="h-6 w-6 m-2 text-slate-400 dark:text-slate-500" />
                  )}
                </div>
                
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.3 }}
                    className="mr-3 overflow-hidden flex-1 min-w-0"
                  >
                    <div className="font-medium text-slate-700 dark:text-slate-300 truncate">کاربر پرانا</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">مدیر سیستم</div>
                  </motion.div>
                )}
              </div>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            setShowHealthReminders(!showHealthReminders);
                            toast({
                              title: showHealthReminders 
                                ? "یادآوری‌های سلامتی غیرفعال شد" 
                                : "یادآوری‌های سلامتی فعال شد",
                              variant: showHealthReminders ? "destructive" : "default",
                            });
                          }}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
                        >
                          {showHealthReminders ? (
                            <Bell className="h-4 w-4 text-tiffany dark:text-tiffany-light" />
                          ) : (
                            <BellOff className="h-4 w-4 text-slate-400" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{showHealthReminders ? "غیرفعال کردن اعلان‌ها" : "فعال کردن اعلان‌ها"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              )}
            </div>
          </div>

          {/* Navigation - منوی اصلی با طراحی پیشرفته */}
          <div className="flex-1 py-6 overflow-y-auto my-4 mx-2 rounded-xl bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <nav className="px-2">
              {/* نمایش دسته‌بندی‌های اصلی منو */}
              {mainMenuCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-6">
                  {/* عنوان دسته‌بندی با آیکون و خط جداکننده */}
                  <div className="mb-3 px-3 flex items-center gap-2">
                    {isExpanded ? (
                      <>
                        <div className="flex-shrink-0 text-slate-500 dark:text-slate-400">{category.icon}</div>
                        <h2 className="text-xs font-semibold text-slate-600 dark:text-slate-300">{category.category}</h2>
                        <div className="flex-1 h-px bg-gradient-to-l from-slate-200 dark:from-slate-700 to-transparent"></div>
                      </>
                    ) : (
                      <div className="w-full flex justify-center">
                        <div className="flex-shrink-0 text-slate-500 dark:text-slate-400">{category.icon}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* آیتم‌های منو در این دسته‌بندی */}
                  <ul className="space-y-2 mb-2">
                    {category.items.map((item, itemIndex) => {
                      const isActive = location === item.path;
                      // تعیین رنگ‌ها بر اساس ویژگی‌های هر آیتم
                      const itemColor = item.color || "tiffany";
                      const activeGradient = getActiveGradient(itemColor);
                      const hoverColors = getHoverColors(itemColor);
                      const textHoverColor = getTextHoverColor(itemColor);
                      
                      return (
                        <li key={itemIndex}>
                          <Link href={item.path}>
                            <div className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 relative group
                              ${isActive
                                ? activeGradient + " text-white shadow-lg ring-1 ring-white/10"
                                : "hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-md hover:scale-[1.01] dark:hover:shadow-black/5"
                              }`}
                            >
                              <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                                isActive ? "text-white" : "text-slate-500 dark:text-slate-400"
                              }`}>
                                {item.icon}
                              </div>
                              
                              {isExpanded && (
                                <div className="mr-3 flex-1 min-w-0">
                                  <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col"
                                  >
                                    <span className={`font-medium tracking-wide truncate ${isActive ? "text-white" : `group-hover:${textHoverColor}`}`}>
                                      {item.title}
                                    </span>
                                    
                                    {item.description && (
                                      <span className="text-[10px] text-slate-500/80 dark:text-slate-400/70 line-clamp-1 mt-0.5 group-hover:text-opacity-100 transition-opacity">
                                        {item.description}
                                      </span>
                                    )}
                                  </motion.div>
                                </div>
                              )}
                              
                              {/* نشانگر آیتم فعال */}
                              {isActive && (
                                <motion.div 
                                  className={`absolute inset-0 rounded-xl overflow-hidden ${activeGradient.replace("bg-gradient-to-l", "bg-gradient-to-r")}`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  style={{ zIndex: -1 }}
                                >
                                  <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]"></div>
                                </motion.div>
                              )}
                              
                              {/* افکت هاور */}
                              {!isActive && (
                                <div 
                                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  style={{ zIndex: -1 }}
                                >
                                  <div className={`absolute inset-0 rounded-xl ${hoverColors}`}></div>
                                </div>
                              )}
                              
                              {/* نشانگر آیتم جدید */}
                              {item.isNew && (
                                <div className="absolute -left-1 top-1 bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-md shadow-md">
                                  جدید
                                </div>
                              )}
                              
                              {/* نشانگر badge */}
                              {item.badge && (
                                <div className={`absolute left-1 -top-1 bg-${item.badge.color || "amber"}-500 text-white text-[10px] px-1.5 py-0.5 rounded-md shadow-md z-10`}>
                                  {item.badge.text}
                                </div>
                              )}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              
              {/* لینک‌های اضافی */}
              <div className="mb-3 px-3 flex items-center gap-2">
                {isExpanded ? (
                  <>
                    <div className="flex-shrink-0 text-slate-500 dark:text-slate-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h2 className="text-xs font-semibold text-slate-600 dark:text-slate-300">اطلاعات و قوانین</h2>
                    <div className="flex-1 h-px bg-gradient-to-l from-slate-200 dark:from-slate-700 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full flex justify-center">
                    <div className="flex-shrink-0 text-slate-500 dark:text-slate-400">
                      <FileText className="h-5 w-5" />
                    </div>
                  </div>
                )}
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
                              ? "bg-gradient-to-l from-slate-400/90 to-slate-500 text-white shadow-lg shadow-slate-400/20 dark:shadow-slate-400/10 ring-1 ring-white/10"
                              : "hover:bg-white dark:hover:bg-slate-800/80 hover:shadow-md hover:scale-[1.01] dark:hover:shadow-black/5"
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
                              className={`mr-3 font-medium tracking-wide ${isActive ? "text-white" : "group-hover:text-slate-700 dark:group-hover:text-slate-300"}`}
                            >
                              {item.title}
                            </motion.span>
                          )}
                          {isActive && (
                            <motion.div 
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-600 to-slate-400 overflow-hidden"
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
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-slate-300/5 to-white/30 dark:from-slate-400/10 dark:to-slate-800/50"></div>
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
          
          {/* User controls and settings */}
          <div className="p-4 border-t border-slate-200/60 dark:border-slate-800/40 flex flex-col gap-2">
            {/* Dark mode toggle */}
            <div className="flex items-center justify-between">
              {isExpanded && (
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">حالت تاریک</span>
              )}
              <button
                onClick={toggleDarkMode}
                className={`${isExpanded ? '' : 'mx-auto'} w-9 h-5 rounded-full flex items-center transition-colors duration-300 ${
                  darkMode ? 'bg-tiffany justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md flex items-center justify-center text-[10px] mx-0.5">
                  {darkMode ? <Moon className="h-2.5 w-2.5 text-tiffany" /> : <Sun className="h-2.5 w-2.5 text-amber-400" />}
                </div>
              </button>
            </div>
            
            {/* PWA Install Button */}
            <PWAInstallButton isExpanded={isExpanded} />
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 h-full relative overflow-hidden">
        <div className="absolute inset-0 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {/* Backdrop Blur Header */}
          <div className="sticky top-0 z-10">
            <div className="h-16 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 px-6 flex items-center justify-between shadow-sm">
              {/* App Description */}
              <div className="flex items-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-9 h-9 flex md:hidden items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 mr-3 transition-colors"
                >
                  <Menu className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </button>
                
                <div className="hidden sm:block">
                  <div className="text-lg font-semibold text-slate-700 dark:text-white">ارتقای سلامت سازمانی</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">پرانا - دستیار هوشمند سلامت</div>
                </div>
              </div>
              
              {/* Right side controls */}
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Search className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>جستجو</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <Filter className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>فیلترها</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          toast({
                            title: "اعلان‌ها",
                            description: "شما هیچ اعلان جدیدی ندارید",
                          });
                        }}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Bell className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>اعلان‌ها</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          toast({
                            title: "پیام‌ها",
                            description: "شما هیچ پیام جدیدی ندارید",
                          });
                        }}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>پیام‌ها</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => {
                          toast({
                            title: "تنظیمات",
                            description: "تنظیمات در دسترس نیست",
                          });
                        }}
                        className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>تنظیمات</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <div className="h-9 w-0.5 bg-slate-200 dark:bg-slate-700 mx-1"></div>
                
                <button
                  onClick={logout}
                  className="hidden sm:flex h-9 text-xs items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors"
                >
                  <div className="mr-1 flex-shrink-0">خروج</div>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <main className="p-6">
            {children}
            
            {/* Health reminders notification */}
            {showHealthReminders && (
              <div className="fixed bottom-6 left-6 z-50">
                <button
                  onClick={() => {
                    setShowHealthReminders(false);
                    toast({
                      title: "یادآوری‌های سلامتی غیرفعال شد",
                      variant: "default",
                    });
                  }}
                  className="bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Bell className="h-6 w-6 text-tiffany dark:text-tiffany-light" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}