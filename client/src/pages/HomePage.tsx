import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PulsingLogo from '@/components/ui/pulsing-logo';
import { 
  Shield, 
  Users, 
  Briefcase, 
  HeartPulse, 
  BarChart2, 
  Activity, 
  ChevronRight, 
  GraduationCap,
  Award,
  Zap,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  LogIn
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color, delay }) => {
  // Convert color string (like "tiffany") to actual CSS class (like "border-tiffany")
  const borderColorClass = `border-${color}`;
  const textColorClass = `text-${color}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass h-full ${borderColorClass}`}
    >
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
      </CardContent>
    </motion.div>
  );
};

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  bgColor: string;
  delay: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon, path, color, bgColor, delay }) => {
  const [, navigate] = useLocation();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.03 }}
      className="glass-card cursor-pointer relative overflow-hidden border border-white/20 dark:border-white/10 rounded-xl h-full"
      onClick={() => navigate(path)}
    >
      <CardContent className="p-5 flex flex-col h-full">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription className="text-sm mb-4">{description}</CardDescription>
        <div className="mt-auto flex justify-end">
          <Button variant="ghost" size="sm" className={`text-xs text-${color.replace('bg-', '')}`}>
            ورود به بخش <ArrowRight className="h-3 w-3 mr-1" />
          </Button>
        </div>
      </CardContent>
    </motion.div>
  );
};

export default function HomePage() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

  // مدیریت انیمیشن بک‌گراند براساس حرکت موس
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setBgPosition({ x, y });
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950"
      style={{
        backgroundImage: `
          radial-gradient(circle at ${bgPosition.x * 100}% ${bgPosition.y * 100}%, rgba(46, 196, 182, 0.15) 0%, rgba(46, 196, 182, 0) 50%),
          radial-gradient(circle at ${100 - bgPosition.x * 100}% ${bgPosition.y * 50}%, rgba(0, 43, 69, 0.1) 0%, rgba(0, 43, 69, 0) 50%),
          radial-gradient(circle at ${bgPosition.x * 80}% ${100 - bgPosition.y * 100}%, rgba(255, 187, 0, 0.1) 0%, rgba(255, 187, 0, 0) 50%)
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onMouseMove={handleMouseMove}
    >
      {/* هدر اصلی */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <PulsingLogo size="sm" showText={true} />
          </div>

          <div className="flex items-center space-x-6 space-x-reverse">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="hidden md:block">
              <TabsList className="bg-white/20 dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/50">
                <TabsTrigger value="overview">معرفی</TabsTrigger>
                <TabsTrigger value="modules">ماژول‌ها</TabsTrigger>
                <TabsTrigger value="benefits">مزایا</TabsTrigger>
              </TabsList>
            </Tabs>

            <Button 
              size="sm" 
              className="bg-tiffany hover:bg-tiffany-dark text-white" 
              onClick={() => navigate('/login')}
            >
              <LogIn className="h-4 w-4 ml-1" />
              ورود به سیستم
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* بخش اول - هرو */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:order-1 order-2"
          >
            <Badge variant="outline" className="bg-tiffany/10 text-tiffany border-tiffany/20 mb-4">
              پیشرفته‌ترین سیستم مدیریت سلامت
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="block mb-2">پرانا،</span>
              <span className="text-tiffany">دستیار هوشمند سلامت</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg leading-relaxed">
              سامانه جامع مدیریت سلامت و ایمنی شغلی با امکانات پیشرفته گیمیفیکیشن، هوش مصنوعی و تحلیل داده برای محیط‌های کاری سالم‌تر و کارآمدتر
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-tiffany hover:bg-tiffany-dark text-white"
                onClick={() => navigate('/login')}
              >
                شروع استفاده از پرانا
                <ChevronRight className="h-4 w-4 mr-1" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setActiveTab('benefits')}
              >
                مشاهده قابلیت‌ها
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl font-bold text-tiffany">۹۹٪</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 text-center">رضایت کاربران</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl font-bold text-navy">۶۷٪</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 text-center">بهبود سلامت شغلی</span>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
                <span className="text-2xl font-bold text-yellow">۴۲٪</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 text-center">افزایش بهره‌وری</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="md:order-2 order-1 flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-tiffany/20 to-navy/20 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <PulsingLogo size="xl" showText={false} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* بخش دوم - تب‌ها */}
        <div className="mb-16">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="md:hidden mb-6">
            <TabsList className="bg-white/20 dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/50 w-full">
              <TabsTrigger value="overview" className="flex-1">معرفی</TabsTrigger>
              <TabsTrigger value="modules" className="flex-1">ماژول‌ها</TabsTrigger>
              <TabsTrigger value="benefits" className="flex-1">مزایا</TabsTrigger>
            </TabsList>
          </Tabs>

          <TabsContent value="overview" className="mt-0">
            <h2 className="text-2xl font-bold mb-8 text-center">درباره پرانا</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Shield className="w-10 h-10 text-tiffany" />}
                title="سلامت شغلی"
                description="پرانا به عنوان دستیار هوشمند سلامت، الگوهای کاری ناسالم را شناسایی کرده و پیشنهادات شخصی‌سازی شده برای بهبود سلامت شغلی ارائه می‌دهد."
                color="tiffany"
                delay={0.1}
              />
              
              <FeatureCard
                icon={<HeartPulse className="w-10 h-10 text-navy" />}
                title="پایش سلامت"
                description="سیستم هوشمند پایش وضعیت سلامت که به صورت مداوم شاخص‌های مهم سلامتی را رصد کرده و هشدارهای به موقع ارائه می‌دهد."
                color="navy"
                delay={0.2}
              />
              
              <FeatureCard
                icon={<BarChart2 className="w-10 h-10 text-aqua" />}
                title="تحلیل داده"
                description="با استفاده از الگوریتم‌های پیشرفته هوش مصنوعی، داده‌های سلامت سازمان را تحلیل کرده و راهکارهای بهبود ارائه می‌دهد."
                color="aqua"
                delay={0.3}
              />
              
              <FeatureCard
                icon={<Building2 className="w-10 h-10 text-yellow" />}
                title="مدیریت یکپارچه"
                description="یکپارچه‌سازی تمام فرآیندهای مرتبط با سلامت و ایمنی شغلی در قالب یک سیستم واحد با دسترسی آسان برای تمام کارکنان و مدیران."
                color="yellow"
                delay={0.4}
              />
              
              <FeatureCard
                icon={<Activity className="w-10 h-10 text-success" />}
                title="گیمیفیکیشن"
                description="استفاده از تکنیک‌های بازی‌سازی برای ایجاد انگیزه در کارکنان جهت بهبود سلامت فردی و تیمی با امکان رقابت و دریافت جوایز."
                color="success"
                delay={0.5}
              />
              
              <FeatureCard
                icon={<Users className="w-10 h-10 text-error" />}
                title="همکاری تیمی"
                description="ایجاد فرهنگ سلامت سازمانی از طریق چالش‌های گروهی، رویدادها و سیستم پاداش که تعامل بین کارکنان را افزایش می‌دهد."
                color="error"
                delay={0.6}
              />
            </div>
          </TabsContent>

          <TabsContent value="modules" className="mt-0">
            <h2 className="text-2xl font-bold mb-8 text-center">ماژول‌های اصلی پرانا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModuleCard
                title="داشبورد سلامت"
                description="مشاهده وضعیت کلی سلامت، شاخص‌های کلیدی و پیشنهادات شخصی‌سازی شده"
                icon={<Activity className="h-6 w-6 text-tiffany" />}
                path="/health-dashboard"
                color="bg-tiffany/15"
                bgColor="bg-tiffany/5"
                delay={0.1}
              />
              
              <ModuleCard
                title="چالش‌های سلامت"
                description="مشارکت در چالش‌های روزانه و هفتگی برای بهبود سلامت فردی و تیمی"
                icon={<Award className="h-6 w-6 text-navy" />}
                path="/challenges"
                color="bg-navy/15"
                bgColor="bg-navy/5"
                delay={0.2}
              />
              
              <ModuleCard
                title="ارزیابی روان‌شناختی"
                description="تست‌های روان‌شناختی استاندارد برای ارزیابی سلامت روان و استرس شغلی"
                icon={<GraduationCap className="h-6 w-6 text-aqua" />}
                path="/psychological-tests"
                color="bg-aqua/15"
                bgColor="bg-aqua/5"
                delay={0.3}
              />
              
              <ModuleCard
                title="برنامه تمرینی"
                description="برنامه‌های شخصی‌سازی شده ورزشی متناسب با نیازهای شغلی و سلامتی"
                icon={<Zap className="h-6 w-6 text-yellow" />}
                path="/workout-dashboard"
                color="bg-yellow/15"
                bgColor="bg-yellow/5"
                delay={0.4}
              />
              
              <ModuleCard
                title="سلامت سازمانی"
                description="تحلیل و مدیریت وضعیت سلامت در سطح سازمان برای مدیران منابع انسانی و HSE"
                icon={<Briefcase className="h-6 w-6 text-success" />}
                path="/organizational-health"
                color="bg-success/15"
                bgColor="bg-success/5"
                delay={0.5}
              />
              
              <ModuleCard
                title="مرکز پزشکی پرانا"
                description="دسترسی به خدمات پزشکی، مشاوره آنلاین و نوبت‌دهی به متخصصین سلامت"
                icon={<HeartPulse className="h-6 w-6 text-error" />}
                path="/medical-center"
                color="bg-error/15"
                bgColor="bg-error/5"
                delay={0.6}
              />
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="mt-0">
            <h2 className="text-2xl font-bold mb-8 text-center">مزایای استفاده از پرانا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4 text-tiffany">برای کارکنان</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-tiffany mt-0.5 ml-2 flex-shrink-0" />
                    <span>بهبود سلامت جسمی و روانی با پیشنهادات شخصی‌سازی شده</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-tiffany mt-0.5 ml-2 flex-shrink-0" />
                    <span>کسب امتیاز و دریافت پاداش برای فعالیت‌های سلامت‌محور</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-tiffany mt-0.5 ml-2 flex-shrink-0" />
                    <span>دسترسی به منابع آموزشی برای مدیریت بهتر سلامت شغلی</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-tiffany mt-0.5 ml-2 flex-shrink-0" />
                    <span>مشارکت در چالش‌ها و رقابت‌های سلامتی با همکاران</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-tiffany mt-0.5 ml-2 flex-shrink-0" />
                    <span>پیگیری و ثبت پیشرفت سلامتی به صورت شخصی</span>
                  </li>
                </ul>
              </div>
              
              <div className="glass p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-4 text-navy">برای سازمان‌ها</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-navy mt-0.5 ml-2 flex-shrink-0" />
                    <span>کاهش غیبت‌های ناشی از بیماری و افزایش بهره‌وری کارکنان</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-navy mt-0.5 ml-2 flex-shrink-0" />
                    <span>تحلیل داده‌های سلامت سازمانی برای تصمیم‌گیری بهتر</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-navy mt-0.5 ml-2 flex-shrink-0" />
                    <span>مدیریت ریسک‌های سلامت و ایمنی شغلی در محیط کار</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-navy mt-0.5 ml-2 flex-shrink-0" />
                    <span>ایجاد فرهنگ سازمانی سلامت‌محور و افزایش رضایت کارکنان</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-navy mt-0.5 ml-2 flex-shrink-0" />
                    <span>کاهش هزینه‌های درمانی و بیمه‌ای با پیشگیری از مشکلات سلامتی</span>
                  </li>
                </ul>
              </div>
              
              <div className="glass p-6 flex flex-col h-full md:col-span-2">
                <h3 className="text-xl font-bold mb-4 text-yellow">ویژگی‌های متمایز</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-4 bg-white/30 dark:bg-slate-800/30 rounded-lg">
                    <Sparkles className="h-8 w-8 text-yellow mb-2" />
                    <h4 className="font-bold mb-1">هوش مصنوعی پیشرفته</h4>
                    <p className="text-sm">تحلیل و پیش‌بینی الگوهای سلامتی با دقت بالا</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 bg-white/30 dark:bg-slate-800/30 rounded-lg">
                    <Shield className="h-8 w-8 text-yellow mb-2" />
                    <h4 className="font-bold mb-1">مطابق با استانداردها</h4>
                    <p className="text-sm">پیاده‌سازی استانداردهای HSE و ایزو ۴۵۰۰۱</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center p-4 bg-white/30 dark:bg-slate-800/30 rounded-lg">
                    <Activity className="h-8 w-8 text-yellow mb-2" />
                    <h4 className="font-bold mb-1">سیستم گیمیفیکیشن</h4>
                    <p className="text-sm">ایجاد رقابت سالم و انگیزه برای بهبود سلامت</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>

        {/* بخش سوم - دکمه اقدام (CTA) */}
        <div className="text-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass acrylic p-8 md:p-12 max-w-4xl mx-auto rounded-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tiffany via-navy to-yellow"></div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">آماده ارتقای سطح سلامت سازمان خود هستید؟</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              با استفاده از پرانا، دستیار هوشمند سلامت، وارد عصر جدیدی از مدیریت سلامت و ایمنی شغلی شوید.
            </p>
            <Button 
              size="lg" 
              className="bg-tiffany hover:bg-tiffany-dark text-white"
              onClick={() => navigate('/login')}
            >
              <LogIn className="h-5 w-5 ml-2" />
              ورود به سیستم
            </Button>
          </motion.div>
        </div>
      </main>

      {/* فوتر */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-8 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <PulsingLogo size="sm" showText={true} />
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                دستیار هوشمند مدیریت سلامت و ایمنی شغلی
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                © ۱۴۰۴ - تمامی حقوق محفوظ است
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}