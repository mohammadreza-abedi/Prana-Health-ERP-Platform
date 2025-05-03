import { Link } from "wouter";
import {
  Building2,
  CreditCard,
  ExternalLink,
  Globe2,
  Heart,
  HelpCircle,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Star,
  ThumbsUp,
  Trophy,
  Users,
  Award,
  FileText,
  Sparkles,
  AlertCircle,
  Brain,
  Settings,
  Handshake,
  User,
  Headphones,
  Coffee,
  Cloud,
  Database,
  Book,
  BookOpen,
  BarChart2,
  Map,
  Gift,
  PieChart,
  Laptop,
  Smartphone
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // مجموعه ویژگی های حرفه ای فوتر
  const featuredItems = [
    { icon: <Cloud className="h-4 w-4" />, label: "امنیت ابری" },
    { icon: <Shield className="h-4 w-4" />, label: "حریم خصوصی" },
    { icon: <Database className="h-4 w-4" />, label: "داده کاوی هوشمند" },
    { icon: <BarChart2 className="h-4 w-4" />, label: "آنالیز پیشرفته" },
    { icon: <Book className="h-4 w-4" />, label: "منابع آموزشی" },
    { icon: <Headphones className="h-4 w-4" />, label: "پشتیبانی 24/7" },
    { icon: <Globe2 className="h-4 w-4" />, label: "چندزبانه" },
    { icon: <Coffee className="h-4 w-4" />, label: "محیط کاری سالم" },
    { icon: <Gift className="h-4 w-4" />, label: "جوایز انگیزشی" },
    { icon: <Map className="h-4 w-4" />, label: "نقشه راه سلامت" },
    { icon: <PieChart className="h-4 w-4" />, label: "آمار پیشرفت" },
    { icon: <BookOpen className="h-4 w-4" />, label: "مقالات علمی" },
    { icon: <Laptop className="h-4 w-4" />, label: "دسترسی چندسکویی" },
    { icon: <Smartphone className="h-4 w-4" />, label: "اپلیکیشن موبایل" },
    { icon: <Heart className="h-4 w-4" />, label: "سلامت روان" },
    { icon: <Award className="h-4 w-4" />, label: "گواهینامه معتبر" },
    { icon: <ThumbsUp className="h-4 w-4" />, label: "رضایت کاربران" },
    { icon: <AlertCircle className="h-4 w-4" />, label: "یادآوری هوشمند" },
    { icon: <Sparkles className="h-4 w-4" />, label: "ویژگی‌های خلاقانه" },
    { icon: <HelpCircle className="h-4 w-4" />, label: "راهنمای کاربری" },
  ];
  
  return (
    <footer className="relative bg-slate-50/50 dark:bg-slate-900/50 py-12 border-t backdrop-blur-md">
      {/* خط تزئینی بالای فوتر */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-700/50 to-transparent"></div>
      
      {/* افکت‌های نور محیطی سبک‌تر */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-tiffany/5 rounded-full blur-2xl opacity-30 dark:opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl opacity-30 dark:opacity-20 pointer-events-none"></div>
      {/* نوار ویژگی‌های حرفه‌ای */}
      <div className="container mx-auto mb-8 relative z-10">
        <div className="relative bg-white/50 dark:bg-slate-800/50 rounded-xl p-4 shadow-md border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm">
          {/* افکت نور بالایی */}
          <div className="absolute -top-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-tiffany/20 to-transparent"></div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {featuredItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-2 space-x-reverse text-sm text-slate-600 dark:text-slate-300 hover:text-tiffany transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-tiffany/10 border border-transparent group-hover:border-tiffany/20 transition-all duration-300">
                  <div className="text-slate-500 dark:text-slate-400 group-hover:text-tiffany">
                    {item.icon}
                  </div>
                </div>
                <span className="font-medium text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* ستون اول - درباره پرانا */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tiffany to-aqua flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-lg">پ</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-tiffany to-aqua bg-clip-text text-transparent mr-2">پرانا</h3>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400">
              پرانا (پلتفرم روانشناسی، ارزیابی و نشاط اداری) یک سیستم هوشمند مبتنی بر هوش مصنوعی برای ارتقای سلامت و نشاط کارکنان در سازمان‌هاست.
            </p>
            
            <div className="flex space-x-3 space-x-reverse">
              <Badge variant="outline" className="text-xs font-normal border-tiffany/30 text-tiffany">
                <Shield className="h-3 w-3 ml-1" />
                استاندارد ISO 27001
              </Badge>
              <Badge variant="outline" className="text-xs font-normal border-amber-300 text-amber-600 dark:text-amber-400">
                <Star className="h-3 w-3 ml-1" />
                امتیاز 4.9/5
              </Badge>
            </div>
            
            <div className="pt-3">
              <h4 className="text-sm font-medium mb-2">گواهینامه‌ها و استانداردها</h4>
              <div className="flex flex-wrap gap-4">
                {/* گواهی ISO */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
                  <div className="relative px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center space-x-3 space-x-reverse shadow-lg hover:shadow-blue-500/20 transition-all duration-300 group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-blue-600 dark:text-blue-400">
                      <div className="text-2xl font-bold">ISO</div>
                      <div className="text-xs">9001:2015</div>
                    </div>
                  </div>
                </div>
                
                {/* گواهی APA */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
                  <div className="relative px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center space-x-3 space-x-reverse shadow-lg hover:shadow-purple-500/20 transition-all duration-300 group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-purple-600 dark:text-purple-400">
                      <div className="text-2xl font-bold">APA</div>
                      <div className="text-xs">Certified</div>
                    </div>
                  </div>
                </div>
                
                {/* انجمن روانشناسی */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-tiffany rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
                  <div className="relative px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center space-x-3 space-x-reverse shadow-lg hover:shadow-green-500/20 transition-all duration-300 group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-green-600 dark:text-green-400">
                      <div className="text-2xl font-bold">PSY</div>
                      <div className="text-xs">عضو رسمی</div>
                    </div>
                  </div>
                </div>
                
                {/* جایزه نوآوری */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
                  <div className="relative px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center space-x-3 space-x-reverse shadow-lg hover:shadow-amber-500/20 transition-all duration-300 group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-amber-600 dark:text-amber-400">
                      <Award className="h-5 w-5 mb-1" />
                      <div className="text-xs">جایزه نوآوری</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* ستون دوم - ناوبری سریع */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm">
              <li className="transition hover:text-tiffany">
                <Link href="/">
                  <a className="flex items-center">
                    <Sparkles className="h-4 w-4 ml-2 text-tiffany" />
                    داشبورد پیشرفته
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/psychological-tests">
                  <a className="flex items-center">
                    <Brain className="h-4 w-4 ml-2 text-purple-500" />
                    تست‌های روانشناسی
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/challenges">
                  <a className="flex items-center">
                    <Trophy className="h-4 w-4 ml-2 text-amber-500" />
                    چالش‌های روزانه
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/leaderboard">
                  <a className="flex items-center">
                    <Award className="h-4 w-4 ml-2 text-yellow-600" />
                    لیدربورد و رتبه‌بندی
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/profile">
                  <a className="flex items-center">
                    <User className="h-4 w-4 ml-2 text-blue-500" />
                    پروفایل کاربری
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/hr-dashboard">
                  <a className="flex items-center">
                    <Users className="h-4 w-4 ml-2 text-indigo-500" />
                    داشبورد مدیریتی
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/settings">
                  <a className="flex items-center">
                    <Settings className="h-4 w-4 ml-2 text-slate-500" />
                    تنظیمات
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* ستون سوم - همکاری */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">همکاری با پرانا</h3>
            <ul className="space-y-2 text-sm">
              <li className="transition hover:text-tiffany">
                <Link href="/enterprise">
                  <a className="flex items-center">
                    <Building2 className="h-4 w-4 ml-2 text-slate-600" />
                    راهکارهای سازمانی
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/pricing">
                  <a className="flex items-center">
                    <CreditCard className="h-4 w-4 ml-2 text-green-600" />
                    تعرفه‌ها و قیمت‌گذاری
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/partnership">
                  <a className="flex items-center">
                    <Handshake className="h-4 w-4 ml-2 text-amber-600" />
                    همکاری و مشارکت
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/case-studies">
                  <a className="flex items-center">
                    <FileText className="h-4 w-4 ml-2 text-blue-500" />
                    مطالعات موردی
                  </a>
                </Link>
              </li>
              <li className="transition hover:text-tiffany">
                <Link href="/api">
                  <a className="flex items-center">
                    <Globe2 className="h-4 w-4 ml-2 text-violet-500" />
                    API و یکپارچه‌سازی
                  </a>
                </Link>
              </li>
            </ul>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">مشتریان ما</h4>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white dark:bg-slate-800 p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-tiffany/30 dark:hover:border-tiffany/30 transition-all duration-300 hover:scale-105">
                  <img src="https://via.placeholder.com/40" alt="شرکت الف" className="h-6 w-auto opacity-70 hover:opacity-100 transition" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-tiffany/30 dark:hover:border-tiffany/30 transition-all duration-300 hover:scale-105">
                  <img src="https://via.placeholder.com/40" alt="شرکت ب" className="h-6 w-auto opacity-70 hover:opacity-100 transition" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-tiffany/30 dark:hover:border-tiffany/30 transition-all duration-300 hover:scale-105">
                  <img src="https://via.placeholder.com/40" alt="شرکت ج" className="h-6 w-auto opacity-70 hover:opacity-100 transition" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-2 rounded-md border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-tiffany/30 dark:hover:border-tiffany/30 transition-all duration-300 hover:scale-105">
                  <img src="https://via.placeholder.com/40" alt="شرکت د" className="h-6 w-auto opacity-70 hover:opacity-100 transition" />
                </div>
              </div>
            </div>
          </div>
          
          {/* ستون چهارم - پشتیبانی و تماس */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">پشتیبانی و ارتباط</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-slate-600 dark:text-slate-400">
                <Phone className="h-4 w-4 ml-2 text-tiffany" />
                <span>021-88888888</span>
              </li>
              <li className="flex items-center text-slate-600 dark:text-slate-400">
                <Mail className="h-4 w-4 ml-2 text-tiffany" />
                <span>info@prana-app.com</span>
              </li>
              <li className="flex items-center text-slate-600 dark:text-slate-400">
                <MessageSquare className="h-4 w-4 ml-2 text-tiffany" />
                <span>چت آنلاین (۸ صبح تا ۸ شب)</span>
              </li>
              <li className="flex items-center text-slate-600 dark:text-slate-400">
                <HelpCircle className="h-4 w-4 ml-2 text-tiffany" />
                <span>راهنما و آموزش</span>
              </li>
            </ul>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">ما را دنبال کنید</h4>
              <div className="flex space-x-3 space-x-reverse">
                <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-tiffany/10 text-slate-600 hover:text-tiffany transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-tiffany/10 text-slate-600 hover:text-tiffany transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-tiffany/10 text-slate-600 hover:text-tiffany transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-tiffany/10 text-slate-600 hover:text-tiffany transition">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="pt-3">
              <Button className="w-full bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light">دریافت مشاوره رایگان</Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* بخش پایینی فوتر */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/about">
              <a className="text-xs text-slate-600 dark:text-slate-400 hover:text-tiffany">درباره ما</a>
            </Link>
            <Link href="/terms">
              <a className="text-xs text-slate-600 dark:text-slate-400 hover:text-tiffany">قوانین و مقررات</a>
            </Link>
            <Link href="/privacy">
              <a className="text-xs text-slate-600 dark:text-slate-400 hover:text-tiffany">حریم خصوصی</a>
            </Link>
            <Link href="/cookies">
              <a className="text-xs text-slate-600 dark:text-slate-400 hover:text-tiffany">کوکی‌ها</a>
            </Link>
            <Link href="/faq">
              <a className="text-xs text-slate-600 dark:text-slate-400 hover:text-tiffany">سوالات متداول</a>
            </Link>
          </div>
          
          <div className="flex items-center text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center ml-4">
              <Lock className="h-3 w-3 ml-1 text-emerald-500" />
              <span>اطلاعات شما ایمن است</span>
            </div>
            <div>
              کلیه حقوق محفوظ است &copy; {currentYear} پرانا
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// تعریف کامپوننت‌های ایکون اضافی که در lucide وجود ندارند
// از آنجایی که قبلا این آیکون‌ها از lucide import شده‌اند، نیازی به تعریف مجدد نیست