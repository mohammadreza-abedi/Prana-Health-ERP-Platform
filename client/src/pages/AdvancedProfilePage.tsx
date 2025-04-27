import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  UserCircle, Settings, Share2, FileText, GraduationCap, 
  Award, BarChart, Globe, Clock, Briefcase, Languages, 
  MailOpen, Save, Camera, Plus, Heart, Laptop, User, Edit, 
  MapPin, Calendar, Mail, Phone, Building, Sparkles, ActivitySquare
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// کامپوننت‌های پروفایل
import { ResumeGenerator } from "@/components/profile/ResumeGenerator";
// SkillsCard کامپوننت فعلاً استفاده نمی‌شود، از KeySkillsGrid استفاده می‌کنیم
// import { SkillsCard } from "@/components/profile/SkillsCard";
import { AchievementsCard } from "@/components/profile/AchievementsCard";
import { EducationCard } from "@/components/profile/EducationCard";
import { ExperienceCard } from "@/components/profile/ExperienceCard";
import { KeySkillsGrid } from "@/components/profile/KeySkillsGrid";
import { LanguageProficiency } from "@/components/profile/LanguageProficiency";
import { CareerTimeline } from "@/components/profile/CareerTimeline";
import { DashboardStatsCard } from "@/components/profile/DashboardStatsCard";
import { ProfileCompleteness } from "@/components/profile/ProfileCompleteness";
import { PeerEndorsements } from "@/components/profile/PeerEndorsements";

// داده‌های نمونه
const dummyExperience = [
  {
    id: 1,
    company: "شرکت پتروشیمی ستاره",
    title: "مدیر HSE",
    location: "عسلویه، بوشهر",
    startDate: "1400/01",
    endDate: "تاکنون",
    description: "مدیریت بخش ایمنی، بهداشت و محیط زیست شرکت پتروشیمی ستاره با بیش از 1000 نفر پرسنل. ارتقاء فرهنگ HSE، کاهش حوادث محیط کار، بازرسی‌های ایمنی مستمر و اجرای دوره‌های آموزشی.",
    achievements: [
      "کاهش 40٪ حوادث کاری طی دو سال",
      "دریافت گواهینامه ISO 45001 برای سیستم مدیریت ایمنی و بهداشت حرفه‌ای",
      "اجرای موفقیت‌آمیز طرح «پرشین سیف» برای افزایش آگاهی پرسنل"
    ],
    skills: ["مدیریت HSE", "ارزیابی ریسک", "مدیریت بحران", "بازرسی ایمنی", "ISO 45001", "JSA"],
    logo: "https://via.placeholder.com/40"
  },
  {
    id: 2,
    company: "شرکت فولاد آرین",
    title: "کارشناس ارشد ایمنی",
    location: "اصفهان",
    startDate: "1397/02",
    endDate: "1399/12",
    description: "مسئول ایمنی خطوط تولید، برگزاری دوره‌های آموزشی برای پرسنل، تهیه دستورالعمل‌های ایمنی، ارزیابی ریسک، و بررسی حوادث.",
    achievements: [
      "تدوین ۲۰ دستورالعمل ایمنی جدید",
      "برگزاری بیش از ۵۰۰ نفر-ساعت آموزش ایمنی"
    ],
    skills: ["بازرسی ایمنی", "ایمنی خطوط تولید", "آموزش HSE", "ارزیابی ریسک"],
    logo: "https://via.placeholder.com/40"
  },
  {
    id: 3,
    company: "شرکت نفت پارس",
    title: "کارشناس HSE",
    location: "تهران",
    startDate: "1395/03",
    endDate: "1397/01",
    description: "همکاری در تدوین برنامه‌های HSE، شرکت در بازرسی‌های ایمنی، تهیه گزارش‌های وضعیت ایمنی و برگزاری دوره‌های آموزشی.",
    skills: ["بازرسی HSE", "گزارش‌نویسی", "ارزیابی ریسک"],
    logo: "https://via.placeholder.com/40"
  }
];

const dummyEducation = [
  {
    id: 1,
    institution: "دانشگاه تهران",
    degree: "کارشناسی ارشد",
    field: "مهندسی ایمنی صنعتی",
    startDate: "1393",
    endDate: "1395",
    description: "پایان‌نامه: «ارزیابی ریسک ایمنی در صنایع پتروشیمی با استفاده از روش HAZOP» با نمره عالی",
    logo: "https://via.placeholder.com/40"
  },
  {
    id: 2,
    institution: "دانشگاه صنعتی امیرکبیر",
    degree: "کارشناسی",
    field: "مهندسی صنایع",
    startDate: "1389",
    endDate: "1393",
    description: "پروژه پایانی: «بهینه‌سازی سیستم‌های ایمنی در خطوط تولید با رویکرد هزینه-محور»",
    logo: "https://via.placeholder.com/40"
  }
];

const dummySkills = [
  { name: "مدیریت HSE", level: 95, endorsements: 12 },
  { name: "ارزیابی ریسک", level: 90, endorsements: 8 },
  { name: "مدیریت بحران", level: 85, endorsements: 6 },
  { name: "بازرسی ایمنی", level: 88, endorsements: 7 },
  { name: "ISO 45001", level: 92, endorsements: 5 },
  { name: "HAZOP", level: 82, endorsements: 4 },
  { name: "ایمنی فرآیند", level: 78, endorsements: 3 },
  { name: "واکنش اضطراری", level: 80, endorsements: 2 },
  { name: "تجزیه و تحلیل حوادث", level: 85, endorsements: 5 },
  { name: "JSA", level: 75, endorsements: 3 },
  { name: "مدیریت پیمانکاران", level: 70, endorsements: 4 },
  { name: "گزارش‌نویسی", level: 85, endorsements: 6 }
];

const dummyAchievements = [
  {
    id: 1,
    title: "HSE Manager برتر سال",
    issuer: "انجمن صنفی HSE ایران",
    date: "1401",
    description: "کسب عنوان مدیر برتر ایمنی، بهداشت و محیط زیست در بین صنایع پتروشیمی کشور",
    logo: "https://via.placeholder.com/40"
  },
  {
    id: 2,
    title: "گواهینامه مدیریت بحران پیشرفته",
    issuer: "مرکز مدیریت بحران صنایع نفت و گاز",
    date: "1400",
    description: "دریافت گواهینامه دوره پیشرفته مدیریت بحران در صنایع با ریسک بالا",
    logo: "https://via.placeholder.com/40"
  },
  {
    id: 3,
    title: "رتبه اول کاهش حوادث شغلی",
    issuer: "وزارت نفت",
    date: "1399",
    description: "دریافت تقدیرنامه به دلیل دستیابی به بالاترین میزان کاهش حوادث شغلی در بین شرکت‌های همتراز",
    logo: "https://via.placeholder.com/40"
  }
];

const dummyLanguages = [
  { name: "فارسی", level: "زبان مادری", proficiency: 100 },
  { name: "انگلیسی", level: "پیشرفته", proficiency: 85 },
  { name: "عربی", level: "متوسط", proficiency: 55 }
];

const dummyPeerEndorsements = [
  {
    id: 1,
    author: "محمد کریمی",
    position: "مدیر عامل شرکت پتروشیمی ستاره",
    avatar: "https://via.placeholder.com/40",
    date: "۳ ماه پیش",
    content: "علی یکی از بهترین متخصصان HSE است که تا به حال با او کار کرده‌ام. توانایی او در مدیریت تیم، برنامه‌ریزی استراتژیک و اجرای اصول ایمنی باعث کاهش چشمگیر حوادث در مجموعه ما شده است. او نه تنها دانش تخصصی عمیقی دارد، بلکه مهارت‌های ارتباطی قوی و توانایی متقاعدسازی بالایی نیز دارد که برای ایجاد فرهنگ ایمنی ضروری است."
  },
  {
    id: 2,
    author: "سارا محمدی",
    position: "مدیر منابع انسانی شرکت فولاد آرین",
    avatar: "https://via.placeholder.com/40",
    date: "۶ ماه پیش",
    content: "همکاری با علی در دوران فعالیتش در شرکت ما تجربه‌ای ارزشمند بود. او سیستم‌های آموزشی HSE را به طور کامل بازنگری کرد و برنامه‌های جامعی را توسعه داد که هنوز هم در شرکت ما استفاده می‌شود. تعهد او به استانداردهای بالا و توجه به جزئیات، او را به یک متخصص برجسته در حوزه ایمنی تبدیل کرده است."
  },
  {
    id: 3,
    author: "رضا حسینی",
    position: "سرپرست ایمنی شرکت نفت پارس",
    avatar: "https://via.placeholder.com/40",
    date: "۱ سال پیش",
    content: "علی از ابتدای ورود به تیم ما، استعداد خاصی در شناسایی ریسک‌ها و ارائه راهکارهای عملی نشان داد. دانش تخصصی او در زمینه ارزیابی ریسک و مدیریت بحران به ما کمک کرد تا استانداردهای ایمنی خود را ارتقا دهیم. همچنین توانایی او در آموزش مفاهیم پیچیده HSE به زبانی ساده، تأثیر زیادی در افزایش آگاهی کارکنان داشت."
  }
];

const AdvancedProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  const [profileCompleteness, setProfileCompleteness] = useState(75);
  
  useEffect(() => {
    // محاسبه درصد تکمیل پروفایل بر اساس داده‌های موجود
    const calculateProfileCompleteness = () => {
      // این مقدار به صورت واقعی باید بر اساس داده‌های کاربر محاسبه شود
      const completeness = 75;
      setProfileCompleteness(completeness);
    };
    
    calculateProfileCompleteness();
  }, []);
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6 max-w-7xl">
        <div className="grid grid-cols-1 gap-6">
          {/* هدر پروفایل */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-tiffany p-6 text-white">
            {/* اثر نور و گرادیان */}
            <div className="absolute top-0 left-0 right-0 bottom-0">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-white opacity-10 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="w-24 h-24 border-4 border-white/20">
                  <AvatarImage src="https://via.placeholder.com/96" alt="علی احمدی" />
                  <AvatarFallback className="text-2xl">ع.ا</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold">علی احمدی</h1>
                      <p className="text-blue-100">مدیر HSE و متخصص ایمنی صنعتی</p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">
                          <Building className="h-3 w-3 ml-1" />
                          <span>شرکت پتروشیمی ستاره</span>
                        </span>
                        <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">
                          <MapPin className="h-3 w-3 ml-1" />
                          <span>عسلویه، بوشهر</span>
                        </span>
                        <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">
                          <Mail className="h-3 w-3 ml-1" />
                          <span>ali@example.com</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm" className="text-xs" onClick={() => setShowEditProfileDialog(true)}>
                        <Edit className="h-3 w-3 ml-1" />
                        <span>ویرایش پروفایل</span>
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs bg-white/10 hover:bg-white/20 border-white/20">
                        <Share2 className="h-3 w-3 ml-1" />
                        <span>اشتراک‌گذاری</span>
                      </Button>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm text-blue-100 max-w-3xl">
                    متخصص HSE با بیش از 7 سال سابقه در صنایع نفت، گاز و پتروشیمی. تجربه مدیریت تیم‌های ایمنی و بهداشت، طراحی و اجرای سیستم‌های مدیریت HSE و تدوین دستورالعمل‌های ایمنی. دارای گواهینامه‌های بین‌المللی NEBOSH و ISO 45001 Lead Auditor.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <DashboardStatsCard
                  icon={<ActivitySquare className="h-6 w-6 text-tiffany" />}
                  title="تجربه کاری"
                  value={7}
                  subtitle="سال سابقه تخصصی"
                  trend="up"
                  percent={15}
                  className="bg-white/10 border-white/20 backdrop-blur-sm"
                />
                <DashboardStatsCard
                  icon={<GraduationCap className="h-6 w-6 text-amber-400" />}
                  title="تعداد گواهینامه‌ها"
                  value={8}
                  subtitle="گواهینامه تخصصی"
                  trend="up"
                  percent={25}
                  className="bg-white/10 border-white/20 backdrop-blur-sm"
                />
                <DashboardStatsCard
                  icon={<Award className="h-6 w-6 text-amber-400" />}
                  title="دستاوردها"
                  value={12}
                  subtitle="افتخارات و جوایز"
                  trend="neutral"
                  className="bg-white/10 border-white/20 backdrop-blur-sm"
                />
                <DashboardStatsCard
                  icon={<Sparkles className="h-6 w-6 text-tiffany" />}
                  title="مهارت‌ها"
                  value={18}
                  subtitle="مهارت تخصصی"
                  trend="up"
                  percent={10}
                  className="bg-white/10 border-white/20 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
          
          {/* تب‌های پروفایل */}
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-1 shadow-sm mb-6">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 w-full">
                <TabsTrigger value="profile" className="text-xs">
                  <User className="h-4 w-4 ml-1" />
                  <span>پروفایل</span>
                </TabsTrigger>
                <TabsTrigger value="resume" className="text-xs">
                  <FileText className="h-4 w-4 ml-1" />
                  <span>رزومه</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="text-xs">
                  <Laptop className="h-4 w-4 ml-1" />
                  <span>مهارت‌ها</span>
                </TabsTrigger>
                <TabsTrigger value="career" className="text-xs">
                  <Briefcase className="h-4 w-4 ml-1" />
                  <span>سوابق</span>
                </TabsTrigger>
                <TabsTrigger value="certificates" className="text-xs">
                  <Award className="h-4 w-4 ml-1" />
                  <span>دستاوردها</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs">
                  <Settings className="h-4 w-4 ml-1" />
                  <span>تنظیمات</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* محتوای تب پروفایل */}
            <TabsContent value="profile" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <ProfileCompleteness completeness={profileCompleteness} />
                  <CareerTimeline experience={dummyExperience} education={dummyEducation} />
                  <PeerEndorsements recommendations={dummyPeerEndorsements} />
                </div>
                
                <div className="space-y-6">
                  <ResumeGenerator profileCompleteness={profileCompleteness} />
                  <KeySkillsGrid skills={dummySkills} />
                  <LanguageProficiency languages={dummyLanguages} />
                </div>
              </div>
            </TabsContent>
            
            {/* محتوای تب رزومه */}
            <TabsContent value="resume" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ResumeGenerator profileCompleteness={profileCompleteness} />
                </div>
                
                <div className="space-y-6">
                  <ProfileCompleteness completeness={profileCompleteness} />
                </div>
              </div>
            </TabsContent>
            
            {/* محتوای تب مهارت‌ها */}
            <TabsContent value="skills" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <KeySkillsGrid skills={dummySkills} />
                </div>
                
                <div className="space-y-6">
                  <LanguageProficiency languages={dummyLanguages} />
                </div>
              </div>
            </TabsContent>
            
            {/* محتوای تب سوابق */}
            <TabsContent value="career" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <ExperienceCard experience={dummyExperience} />
                  <EducationCard education={dummyEducation} />
                </div>
                
                <div className="space-y-6">
                  <CareerTimeline experience={dummyExperience} education={dummyEducation} />
                </div>
              </div>
            </TabsContent>
            
            {/* محتوای تب دستاوردها */}
            <TabsContent value="certificates" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AchievementsCard achievements={dummyAchievements} />
                </div>
                
                <div className="space-y-6">
                  <PeerEndorsements recommendations={dummyPeerEndorsements} />
                </div>
              </div>
            </TabsContent>
            
            {/* محتوای تب تنظیمات */}
            <TabsContent value="settings" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                      <Settings className="mr-2 h-5 w-5 text-slate-500" />
                      تنظیمات پروفایل
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">نام و نام خانوادگی</label>
                          <Input placeholder="نام و نام خانوادگی" defaultValue="علی احمدی" />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">عنوان شغلی</label>
                          <Input placeholder="عنوان شغلی" defaultValue="مدیر HSE و متخصص ایمنی صنعتی" />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">ایمیل</label>
                          <Input placeholder="ایمیل" defaultValue="ali@example.com" />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">شماره تماس</label>
                          <Input placeholder="شماره تماس" defaultValue="09123456789" />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">موقعیت جغرافیایی</label>
                          <Input placeholder="موقعیت جغرافیایی" defaultValue="عسلویه، بوشهر" />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">شرکت فعلی</label>
                          <Input placeholder="شرکت فعلی" defaultValue="شرکت پتروشیمی ستاره" />
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">درباره من</label>
                          <textarea 
                            className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-md"
                            rows={3}
                            placeholder="درباره من"
                            defaultValue="متخصص HSE با بیش از 7 سال سابقه در صنایع نفت، گاز و پتروشیمی. تجربه مدیریت تیم‌های ایمنی و بهداشت، طراحی و اجرای سیستم‌های مدیریت HSE و تدوین دستورالعمل‌های ایمنی. دارای گواهینامه‌های بین‌المللی NEBOSH و ISO 45001 Lead Auditor."
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2 flex justify-end">
                        <Button>
                          <Save className="h-4 w-4 ml-1" />
                          <span>ذخیره تغییرات</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-semibold mb-4">تصویر پروفایل</h2>
                    
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-32 h-32 border-2 border-slate-200 dark:border-slate-700">
                        <AvatarImage src="https://via.placeholder.com/128" alt="علی احمدی" />
                        <AvatarFallback className="text-2xl">ع.ا</AvatarFallback>
                      </Avatar>
                      
                      <Button variant="outline" size="sm" className="mt-2">
                        <Camera className="h-4 w-4 ml-1" />
                        <span>تغییر تصویر</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-semibold mb-4">حریم خصوصی</h2>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">نمایش ایمیل به دیگران</label>
                        <input type="checkbox" className="toggle toggle-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">نمایش شماره تماس به دیگران</label>
                        <input type="checkbox" className="toggle toggle-primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm">دریافت اعلان‌های ایمیلی</label>
                        <input type="checkbox" className="toggle toggle-primary" checked />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* دیالوگ ویرایش پروفایل */}
      <Dialog open={showEditProfileDialog} onOpenChange={setShowEditProfileDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>ویرایش پروفایل</DialogTitle>
            <DialogDescription>
              اطلاعات پروفایل خود را ویرایش کنید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">نام و نام خانوادگی</label>
              <Input placeholder="نام و نام خانوادگی" defaultValue="علی احمدی" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان شغلی</label>
              <Input placeholder="عنوان شغلی" defaultValue="مدیر HSE و متخصص ایمنی صنعتی" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">ایمیل</label>
              <Input placeholder="ایمیل" defaultValue="ali@example.com" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">شماره تماس</label>
              <Input placeholder="شماره تماس" defaultValue="09123456789" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">موقعیت جغرافیایی</label>
              <Input placeholder="موقعیت جغرافیایی" defaultValue="عسلویه، بوشهر" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">شرکت فعلی</label>
              <Input placeholder="شرکت فعلی" defaultValue="شرکت پتروشیمی ستاره" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">درباره من</label>
              <textarea 
                className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-md"
                rows={3}
                placeholder="درباره من"
                defaultValue="متخصص HSE با بیش از 7 سال سابقه در صنایع نفت، گاز و پتروشیمی. تجربه مدیریت تیم‌های ایمنی و بهداشت، طراحی و اجرای سیستم‌های مدیریت HSE و تدوین دستورالعمل‌های ایمنی. دارای گواهینامه‌های بین‌المللی NEBOSH و ISO 45001 Lead Auditor."
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditProfileDialog(false)}>
              انصراف
            </Button>
            <Button onClick={() => setShowEditProfileDialog(false)}>
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default AdvancedProfilePage;