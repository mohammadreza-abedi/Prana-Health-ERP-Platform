import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layouts/MainLayout";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Heart, 
  Clock, 
  Coffee, 
  Star,
  Download,
  Share2,
  Edit3,
  PenTool,
  FileText,
  Code,
  BarChart2,
  Book,
  Globe,
  MessageSquare,
  Eye,
  Zap,
  Smile
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResumeGenerator } from "@/components/profile/ResumeGenerator";
import { SkillsCard } from "@/components/profile/SkillsCard";
import { AchievementsCard } from "@/components/profile/AchievementsCard";
import { EducationCard } from "@/components/profile/EducationCard";
import { ExperienceCard } from "@/components/profile/ExperienceCard";
import { HealthBadgesCard } from "@/components/profile/HealthBadgesCard";
import { PortfolioCard } from "@/components/profile/PortfolioCard";
import { ProfileSettings } from "@/components/profile/ProfileSettings";
import { KeySkillsGrid } from "@/components/profile/KeySkillsGrid";
import { LanguageProficiency } from "@/components/profile/LanguageProficiency";
import { CareerTimeline } from "@/components/profile/CareerTimeline";
import { DashboardStatsCard } from "@/components/profile/DashboardStatsCard";
import { PersonalBrandingCard } from "@/components/profile/PersonalBrandingCard";
import { ConnectNetworkCard } from "@/components/profile/ConnectNetworkCard";
import { CoursesCertifications } from "@/components/profile/CoursesCertifications";
import { ProjectsShowcase } from "@/components/profile/ProjectsShowcase";
import { ProfessionalGoalsCard } from "@/components/profile/ProfessionalGoalsCard";
import { ProfileCompleteness } from "@/components/profile/ProfileCompleteness";
import { PeerEndorsements } from "@/components/profile/PeerEndorsements";
import { OccupationalRecommendations } from "@/components/profile/OccupationalRecommendations";

export default function AdvancedProfilePage() {
  const [activeTab, setActiveTab] = useState("main");
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState<"standard" | "resume" | "card">("standard");

  // پیش‌نمایش حالت چاپ/PDF
  const [isPrintPreview, setIsPrintPreview] = useState(false);

  // اطلاعات کاربر (در دنیای واقعی از API دریافت می‌شود)
  const userProfile = {
    id: 1,
    name: "سارا رضایی",
    displayName: "سارا رضایی",
    title: "مهندس HSE ارشد | متخصص ایمنی صنعتی",
    avatar: "https://i.pravatar.cc/150?img=5",
    coverPhoto: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    department: "ایمنی و بهداشت",
    location: "تهران، ایران",
    email: "sara.rezaei@example.com",
    phone: "0912-345-6789",
    bio: "متخصص HSE با ۷ سال سابقه در صنایع نفت و گاز و پتروشیمی. متمرکز بر کاهش حوادث شغلی و بهبود فرآیندهای ایمنی. دارای گواهینامه‌های NEBOSH و ISO 45001.",
    joinDate: "1399/03/15",
    website: "www.example.com/sara",
    social: {
      linkedin: "linkedin.com/in/sara-rezaei",
      twitter: "twitter.com/sara_rezaei",
      instagram: "instagram.com/sara.rezaei",
    },
    skills: [
      { name: "مدیریت ریسک", level: 95, endorsements: 12 },
      { name: "ارزیابی ایمنی", level: 88, endorsements: 9 },
      { name: "ISO 45001", level: 92, endorsements: 14 },
      { name: "تحقیقات حوادث", level: 85, endorsements: 7 },
      { name: "آموزش HSE", level: 90, endorsements: 11 },
      { name: "HAZOP", level: 82, endorsements: 8 },
    ],
    languages: [
      { name: "فارسی", level: "زبان مادری", proficiency: 100 },
      { name: "انگلیسی", level: "پیشرفته", proficiency: 85 },
      { name: "عربی", level: "متوسط", proficiency: 60 },
    ],
    experience: [
      {
        id: 1,
        company: "شرکت پتروشیمی ستاره",
        title: "مدیر HSE",
        location: "عسلویه",
        startDate: "1400/01",
        endDate: "تاکنون",
        description: "مدیریت تیم ۱۲ نفره HSE. کاهش نرخ حوادث به میزان ۳۵٪ طی دو سال. پیاده‌سازی سیستم مدیریت ایمنی مطابق با ISO 45001.",
        achievements: [
          "راه‌اندازی سیستم گزارش‌دهی آنلاین شبه‌حوادث",
          "کسب جایزه برتر ایمنی صنعتی در سال ۱۴۰۱",
          "کاهش ۴۰٪ هزینه‌های مرتبط با حوادث",
        ],
        skills: ["مدیریت ریسک", "ISO 45001", "آموزش HSE"],
        logo: "https://via.placeholder.com/50",
      },
      {
        id: 2,
        company: "مجتمع فولاد مبارکه",
        title: "کارشناس ارشد HSE",
        location: "اصفهان",
        startDate: "1397/05",
        endDate: "1399/12",
        description: "نظارت بر اجرای استانداردهای ایمنی در خطوط تولید. برگزاری دوره‌های آموزشی HSE برای بیش از ۵۰۰ پرسنل.",
        achievements: [
          "توسعه و پیاده‌سازی برنامه‌های مقابله با شرایط اضطراری",
          "بهبود ۲۵٪ شاخص‌های ایمنی",
        ],
        skills: ["ارزیابی ریسک", "آموزش HSE", "مدیریت بحران"],
        logo: "https://via.placeholder.com/50",
      },
    ],
    education: [
      {
        id: 1,
        institution: "دانشگاه صنعتی شریف",
        degree: "کارشناسی ارشد",
        field: "مهندسی ایمنی صنعتی",
        startDate: "1394",
        endDate: "1396",
        description: "پایان‌نامه: «تحلیل و مدل‌سازی ریسک‌های فرآیندی در صنایع پتروشیمی» با نمره عالی",
        logo: "https://via.placeholder.com/50",
      },
      {
        id: 2,
        institution: "دانشگاه تهران",
        degree: "کارشناسی",
        field: "مهندسی شیمی",
        startDate: "1390",
        endDate: "1394",
        description: "پروژه پایانی در زمینه ایمنی فرآیندهای شیمیایی. عضو انجمن علمی دانشکده فنی.",
        logo: "https://via.placeholder.com/50",
      },
    ],
    certificates: [
      {
        id: 1,
        name: "NEBOSH IGC",
        issuer: "NEBOSH",
        date: "1399",
        expires: "1402",
        credentialID: "NGC-123456",
        credentialURL: "https://example.com/verify",
        logo: "https://via.placeholder.com/50",
      },
      {
        id: 2,
        name: "ISO 45001 Lead Auditor",
        issuer: "SGS",
        date: "1398",
        expires: "1401",
        credentialID: "ISO-789012",
        credentialURL: "https://example.com/verify",
        logo: "https://via.placeholder.com/50",
      },
      {
        id: 3,
        name: "IOSH Managing Safely",
        issuer: "IOSH",
        date: "1397",
        expires: "1400",
        credentialID: "IOSH-345678",
        credentialURL: "https://example.com/verify",
        logo: "https://via.placeholder.com/50",
      },
    ],
    projects: [
      {
        id: 1,
        title: "سیستم مدیریت ریسک یکپارچه",
        description: "طراحی و پیاده‌سازی سیستم مدیریت ریسک یکپارچه برای فازهای تولیدی پتروشیمی",
        startDate: "1400/03",
        endDate: "1400/09",
        skills: ["مدیریت ریسک", "نرم‌افزار HSE", "تحلیل داده"],
        results: "کاهش 30% زمان ارزیابی ریسک و افزایش 45% دقت در شناسایی خطرات",
        images: ["https://via.placeholder.com/150"],
      },
      {
        id: 2,
        title: "برنامه آمادگی و واکنش در شرایط اضطراری",
        description: "تدوین و اجرای برنامه جامع آمادگی و واکنش در شرایط اضطراری",
        startDate: "1399/08",
        endDate: "1400/02",
        skills: ["مدیریت بحران", "برنامه‌ریزی اضطراری", "آموزش"],
        results: "کاهش زمان واکنش در شرایط اضطراری به میزان 40% و بهبود هماهنگی تیم‌های واکنش",
        images: ["https://via.placeholder.com/150"],
      },
    ],
    achievements: [
      {
        id: 1,
        title: "مدیر HSE نمونه سال ۱۴۰۱",
        issuer: "انجمن صنفی HSE ایران",
        date: "1401",
        description: "انتخاب به عنوان مدیر برتر HSE در بین شرکت‌های پتروشیمی کشور",
        logo: "https://via.placeholder.com/50",
      },
      {
        id: 2,
        title: "پروژه برتر ایمنی",
        issuer: "وزارت نفت",
        date: "1400",
        description: "دریافت جایزه پروژه برتر ایمنی برای سیستم مدیریت ریسک یکپارچه",
        logo: "https://via.placeholder.com/50",
      },
    ],
    publications: [
      {
        id: 1,
        title: "روش‌های نوین ارزیابی ریسک در صنایع فرآیندی",
        publisher: "مجله علمی مهندسی ایمنی",
        date: "1399",
        url: "https://example.com/article1",
        citation: "رضایی، س. (۱۳۹۹). روش‌های نوین ارزیابی ریسک در صنایع فرآیندی. مجله علمی مهندسی ایمنی، ۱۵(۲)، ۴۵-۶۰.",
      },
    ],
    courses: [
      {
        id: 1,
        title: "مدیریت پیشرفته ایمنی فرآیند (PSM)",
        provider: "دانشگاه صنعتی شریف",
        date: "1400",
        duration: "40 ساعت",
        certificate: true,
        description: "دوره تخصصی مدیریت ایمنی فرآیند با تمرکز بر صنایع پتروشیمی",
      },
      {
        id: 2,
        title: "تکنیک‌های پیشرفته HAZOP",
        provider: "انجمن مهندسی شیمی ایران",
        date: "1399",
        duration: "24 ساعت",
        certificate: true,
        description: "آموزش پیشرفته روش‌های شناسایی خطر و عملیات پذیری",
      },
    ],
    recommendations: [
      {
        id: 1,
        author: "علی محمدی",
        position: "مدیر عامل شرکت پتروشیمی ستاره",
        avatar: "https://i.pravatar.cc/150?img=1",
        date: "1401/05",
        content: "سارا یکی از متخصصان برجسته HSE است که با دانش و تعهد خود توانست سیستم ایمنی شرکت ما را به طور قابل توجهی ارتقا دهد. ابتکار عمل و توانایی او در مدیریت بحران‌ها بسیار ارزشمند است.",
      },
      {
        id: 2,
        author: "مریم صادقی",
        position: "رئیس انجمن صنفی HSE ایران",
        avatar: "https://i.pravatar.cc/150?img=2",
        date: "1400/11",
        content: "همکاری با سارا در پروژه‌های مختلف، توانایی‌های تخصصی و مدیریتی او را به خوبی نشان داده است. تحلیل‌های دقیق و راهکارهای عملی او همیشه راهگشاست.",
      },
    ],
    interests: ["ایمنی فرآیند", "مدیریت ریسک", "بهداشت صنعتی", "محیط زیست", "سیستم‌های مدیریت یکپارچه"],
    jobPreferences: {
      title: ["مدیر HSE", "مدیر ایمنی", "مشاور ایمنی فرآیند"],
      industries: ["نفت و گاز", "پتروشیمی", "فولاد", "نیروگاهی"],
      locations: ["تهران", "بوشهر", "اصفهان", "خوزستان"],
      remoteWork: true,
      salaryRange: "15-25 میلیون تومان",
    },
    personalBranding: {
      slogan: "ایمنی اولویت اول، هر روز و همه روز",
      keywords: ["متخصص HSE", "مدیریت ریسک", "ایمنی فرآیند", "ISO 45001", "NEBOSH"],
      story: "من کارم را از یک حادثه جدی در یک کارخانه شروع کردم که باعث شد به اهمیت ایمنی در محیط کار پی ببرم. از آن زمان، هدفم ایجاد محیط‌های کاری ایمن‌تر و سالم‌تر برای همه بوده است...",
    },
    healthMetrics: {
      overallHealth: 87,
      stressLevel: "متوسط",
      workLifeBalance: "خوب",
      dailySteps: 7500,
      sleepQuality: "عالی",
      healthGoals: ["کاهش استرس", "افزایش فعالیت بدنی", "بهبود خواب"],
    },
    careerDevelopment: {
      shortTermGoals: ["کسب گواهینامه CSP", "ارتقا به مدیر HSE ارشد", "انتشار مقاله علمی"],
      longTermGoals: ["راه‌اندازی شرکت مشاوره ایمنی", "تدریس در دانشگاه", "تألیف کتاب تخصصی"],
      mentors: [
        { name: "دکتر رضا کریمی", position: "استاد دانشگاه و متخصص ایمنی", avatar: "https://i.pravatar.cc/150?img=3" },
      ],
      mentees: [
        { name: "نیما رضایی", position: "کارشناس جدید HSE", avatar: "https://i.pravatar.cc/150?img=4" },
      ],
    },
    profileCompleteness: 84,
    endorsements: 47,
    views: 1254,
    connections: 312,
    pending: 8,
  };

  return (
    <MainLayout>
      <div className="container mx-auto pb-10">
        {/* سربرگ پروفایل با عکس کاور */}
        <motion.div 
          className="relative w-full h-64 rounded-xl overflow-hidden mb-20 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={userProfile.coverPhoto} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
          
          {/* اطلاعات اصلی کاربر */}
          <div className="absolute -bottom-16 left-10 flex items-end">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-900 shadow-xl">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>
            <div className="mb-2 mr-6">
              <h1 className="text-white text-3xl font-bold">{userProfile.name}</h1>
              <p className="text-white/90 font-medium">{userProfile.title}</p>
              <div className="flex items-center mt-1 space-x-2 space-x-reverse text-white/80">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm">{userProfile.department}</span>
                <span className="text-slate-300">•</span>
                <span className="text-sm">{userProfile.location}</span>
              </div>
            </div>
          </div>
          
          {/* دکمه‌های اصلی */}
          <div className="absolute top-4 right-4 flex space-x-2 space-x-reverse">
            <Button size="sm" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30">
              <PenTool className="w-4 h-4" />
              <span>ویرایش پروفایل</span>
            </Button>
            
            <div className="flex space-x-1 space-x-reverse">
              <Button size="sm" variant="ghost" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white">
                <Download className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white">
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* بخش آمار و ارقام */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <ProfileCompleteness completeness={userProfile.profileCompleteness} />
          
          <DashboardStatsCard 
            icon={<Star className="w-5 h-5 text-amber-500" />}
            title="تأییدها"
            value={userProfile.endorsements}
            subtitle="از 27 همکار"
            trend="up"
            percent={12}
          />
          
          <DashboardStatsCard 
            icon={<Eye className="w-5 h-5 text-blue-500" />}
            title="بازدیدها"
            value={userProfile.views}
            subtitle="در 30 روز گذشته"
            trend="up"
            percent={24}
          />
          
          <DashboardStatsCard 
            icon={<MessageSquare className="w-5 h-5 text-tiffany" />}
            title="ارتباطات"
            value={userProfile.connections}
            subtitle={`${userProfile.pending} درخواست جدید`}
            trend="up"
            percent={5}
          />
        </div>
        
        {/* تب‌های اصلی پروفایل */}
        <Tabs defaultValue="main" className="mt-6" onValueChange={setActiveTab}>
          <TabsList className="mb-6 bg-white dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 shadow-sm">
            <TabsTrigger value="main" className="font-medium">
              <User className="w-4 h-4 ml-2" />
              پروفایل اصلی
            </TabsTrigger>
            <TabsTrigger value="resume" className="font-medium">
              <FileText className="w-4 h-4 ml-2" />
              رزومه و سوابق
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="font-medium">
              <Briefcase className="w-4 h-4 ml-2" />
              نمونه کارها و پروژه‌ها
            </TabsTrigger>
            <TabsTrigger value="skills" className="font-medium">
              <Code className="w-4 h-4 ml-2" />
              مهارت‌ها و تخصص‌ها
            </TabsTrigger>
            <TabsTrigger value="network" className="font-medium">
              <Globe className="w-4 h-4 ml-2" />
              شبکه ارتباطی
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-medium">
              <BarChart2 className="w-4 h-4 ml-2" />
              تحلیل حرفه‌ای
            </TabsTrigger>
            <TabsTrigger value="health" className="font-medium">
              <Heart className="w-4 h-4 ml-2" />
              سلامت و تندرستی
            </TabsTrigger>
            <TabsTrigger value="learning" className="font-medium">
              <Book className="w-4 h-4 ml-2" />
              آموزش و یادگیری
            </TabsTrigger>
          </TabsList>
          
          {/* محتوای تب اصلی */}
          <TabsContent value="main" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ستون اول - اطلاعات شخصی و تخصصی */}
              <div className="space-y-6">
                <Card className="overflow-hidden shadow-md">
                  <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-3">
                    <CardTitle className="text-lg font-semibold">درباره من</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-slate-700 dark:text-slate-300 text-justify leading-relaxed">
                      {userProfile.bio}
                    </p>
                    
                    <Separator className="my-4" />
                    
                    <div className="grid gap-3">
                      <div className="flex items-start">
                        <Briefcase className="w-4 h-4 mt-1 ml-3 text-slate-500" />
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">سِمت</h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{userProfile.title}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="w-4 h-4 mt-1 ml-3 text-slate-500" />
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">تاریخ پیوستن</h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300">{userProfile.joinDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Coffee className="w-4 h-4 mt-1 ml-3 text-slate-500" />
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">علاقه‌مندی‌ها</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {userProfile.interests.map((interest, index) => (
                              <Badge key={index} variant="outline" className="bg-slate-100 dark:bg-slate-800">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* کارت زبان‌ها */}
                <LanguageProficiency languages={userProfile.languages} />
                
                {/* کارت توصیه‌های شغلی */}
                <OccupationalRecommendations jobPrefs={userProfile.jobPreferences} />
              </div>
              
              {/* ستون دوم - تجربیات و مهارت‌ها */}
              <div className="space-y-6">
                {/* کارت مهارت‌ها */}
                <SkillsCard skills={userProfile.skills} />
                
                {/* مجموعه‌ای از دستاوردها */}
                <AchievementsCard achievements={userProfile.achievements} />
                
                {/* برندینگ شخصی */}
                <PersonalBrandingCard branding={userProfile.personalBranding} />
              </div>
              
              {/* ستون سوم - سابقه تحصیلی، دوره‌ها و توصیه‌ها */}
              <div className="space-y-6">
                {/* تحصیلات */}
                <EducationCard education={userProfile.education} />
                
                {/* تجربیات شغلی */}
                <ExperienceCard experience={userProfile.experience} />
                
                {/* توصیه‌ها و تأییدها */}
                <PeerEndorsements recommendations={userProfile.recommendations} />
              </div>
            </div>
          </TabsContent>
          
          {/* محتوای تب رزومه */}
          <TabsContent value="resume" className="space-y-6">
            <ResumeGenerator 
              userProfile={userProfile} 
              viewMode={viewMode} 
              setViewMode={setViewMode}
            />
          </TabsContent>
          
          {/* محتوای تب نمونه کارها */}
          <TabsContent value="portfolio" className="space-y-6">
            <ProjectsShowcase projects={userProfile.projects} />
            <PortfolioCard 
              publications={userProfile.publications}
              certificates={userProfile.certificates}
            />
          </TabsContent>
          
          {/* محتوای تب مهارت‌ها */}
          <TabsContent value="skills" className="space-y-6">
            <KeySkillsGrid skills={userProfile.skills} />
            <CoursesCertifications 
              courses={userProfile.courses}
              certificates={userProfile.certificates}
            />
          </TabsContent>
          
          {/* محتوای تب شبکه ارتباطی */}
          <TabsContent value="network" className="space-y-6">
            <ConnectNetworkCard 
              connections={userProfile.connections}
              pending={userProfile.pending}
            />
          </TabsContent>
          
          {/* محتوای تب تحلیل حرفه‌ای */}
          <TabsContent value="analytics" className="space-y-6">
            <CareerTimeline 
              experience={userProfile.experience}
              education={userProfile.education}
            />
            <ProfessionalGoalsCard goals={userProfile.careerDevelopment} />
          </TabsContent>
          
          {/* محتوای تب سلامت */}
          <TabsContent value="health" className="space-y-6">
            <HealthBadgesCard health={userProfile.healthMetrics} />
          </TabsContent>
          
          {/* محتوای تب آموزش */}
          <TabsContent value="learning" className="space-y-6">
            <CoursesCertifications 
              courses={userProfile.courses}
              certificates={userProfile.certificates}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}