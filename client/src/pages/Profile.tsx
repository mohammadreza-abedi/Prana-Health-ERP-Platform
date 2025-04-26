import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { useCredits } from '@/hooks/use-credits';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  UserRound,
  Mail,
  Phone,
  Building2,
  Calendar,
  Award,
  Shield,
  Star,
  Bookmark,
  Trophy,
  Medal,
  Clock,
  BarChart,
  Activity,
  Heart,
  Brain,
  BookOpen,
  FileCheck,
  FileText,
  SquarePen,
  LineChart,
  User,
  MessageSquare,
  Key,
  Bell,
  Settings,
  ChevronRight,
  Briefcase,
  MapPin,
  GraduationCap,
  Clock3,
  Handshake,
  CheckCircle2,
  Clipboard,
  CreditCard,
  BarChart2,
  PieChart,
  Users,
  Github,
  Linkedin,
  ExternalLink,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import BodyComposition from '@/components/ui/body-composition';
import AvatarBuilder from '@/components/ui/avatar-builder';

interface UserBadge {
  id: number;
  userId: number;
  badgeId: number;
  earnedAt: string;
  badge: {
    id: number;
    title: string;
    description: string;
    icon: string;
  };
}

interface UserChallenge {
  id: number;
  userId: number;
  challengeId: number;
  progress: number;
  completed: boolean;
  completedAt: string | null;
  challenge: {
    id: number;
    title: string;
    description: string;
    type: string;
  };
}

export default function Profile() {
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState("main");
  const [showAvatarBuilder, setShowAvatarBuilder] = useState(false);

  const { data: userBadges } = useQuery<UserBadge[]>({
    queryKey: ['/api/user-badges'],
  });
  
  const { data: userChallenges } = useQuery<UserChallenge[]>({
    queryKey: ['/api/user-challenges'],
  });
  
  if (!user) return null;
  
  // Calculate XP needed for next level
  const xpForNextLevel = user.level * 100;
  const xpProgress = user.xp % xpForNextLevel;
  const xpPercent = (xpProgress / xpForNextLevel) * 100;
  
  // Count completed challenges
  const completedChallenges = userChallenges?.filter(uc => uc.completed).length || 0;
  const totalChallenges = userChallenges?.length || 0;
  
  // Use the credits hook
  const { 
    credits, 
    isLoadingCredits,
    transactions, 
    isLoadingTransactions 
  } = useCredits();
  
  // Get badge icon
  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case 'star':
        return <Star className="h-6 w-6 text-tiffany" />;
      case 'shield':
        return <Shield className="h-6 w-6 text-navy" />;
      case 'coins':
        return <Trophy className="h-6 w-6 text-yellow" />;
      default:
        return <Medal className="h-6 w-6 text-tiffany" />;
    }
  };
  
  // Get challenge icon color
  const getChallengeColorClass = (type: string) => {
    switch (type) {
      case 'mental':
        return 'text-tiffany';
      case 'work':
        return 'text-navy';
      case 'physical':
        return 'text-green-500';
      case 'nutrition':
        return 'text-yellow-600';
      default:
        return 'text-tiffany';
    }
  };
  
  // Get challenge icon
  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'mental':
        return <Star className={`h-6 w-6 ${getChallengeColorClass(type)}`} />;
      case 'work':
        return <Clock className={`h-6 w-6 ${getChallengeColorClass(type)}`} />;
      case 'physical':
        return <BarChart className={`h-6 w-6 ${getChallengeColorClass(type)}`} />;
      default:
        return <Calendar className={`h-6 w-6 ${getChallengeColorClass(type)}`} />;
    }
  };

  // معلومات کاربر
  const userInfo = {
    displayName: user.displayName || "کاربر پرانا",
    position: "متخصص منابع انسانی",
    department: "دپارتمان منابع انسانی",
    email: "user@example.com",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    location: "ساختمان مرکزی - طبقه دوم",
    employeeId: "EMP-1001",
    joinDate: "۱۴۰۱/۰۶/۱۵",
    previousRoles: [
      { title: "کارشناس آموزش", period: "۱۴۰۰-۱۴۰۱" },
      { title: "دستیار مدیر منابع انسانی", period: "۱۳۹۹-۱۴۰۰" }
    ],
    keyResponsibilities: "توسعه و اجرای برنامه‌های ارزیابی سلامت کارکنان، مدیریت چالش‌های سلامتی گروهی، تحلیل داده‌های سلامت سازمانی",
    // اطلاعات مدارک
    documents: [
      { id: 1, name: "مدرک تحصیلی", status: "تایید شده", expiryDate: null },
      { id: 2, name: "گواهی دوره مدیریت", status: "تایید شده", expiryDate: "۱۴۰۴/۰۲/۱۰" },
      { id: 3, name: "مدرک زبان انگلیسی", status: "در انتظار تایید", expiryDate: null },
      { id: 4, name: "گواهی مهارت‌های نرم", status: "تایید شده", expiryDate: null },
    ],
    // اطلاعات عملکرد
    performance: {
      score: 87,
      goalAchievement: 92,
      teamwork: 85,
      initiative: 78,
      lastReviewDate: "۱۴۰۲/۰۵/۱۲",
    },
    // دوره‌های آموزشی
    courses: [
      { id: 1, title: "دوره مدیریت منابع انسانی پیشرفته", completionDate: "۱۴۰۱/۱۱/۲۵", certificate: true },
      { id: 2, title: "کارگاه مدیریت استعداد", completionDate: "۱۴۰۱/۰۸/۱۴", certificate: true },
      { id: 3, title: "دوره مهارت‌های ارتباطی", completionDate: "۱۴۰۱/۰۴/۲۰", certificate: true },
      { id: 4, title: "سمینار سلامت سازمانی", completionDate: "۱۴۰۲/۰۲/۰۵", certificate: false },
    ],
    // سوابق سلامتی
    health: {
      lastCheckup: "۱۴۰۲/۰۳/۱۰",
      status: "سالم",
      recommendations: "افزایش فعالیت بدنی روزانه، کاهش مصرف قند و نمک",
      upcomingAppointment: "۱۴۰۲/۰۹/۱۵",
    },
    // پروژه‌ها
    projects: [
      { id: 1, title: "پیاده‌سازی سیستم ارزیابی عملکرد", status: "تکمیل شده", completion: 100 },
      { id: 2, title: "برنامه توسعه فردی کارکنان", status: "در حال انجام", completion: 75 },
      { id: 3, title: "برنامه‌ریزی چالش‌های سلامتی فصلی", status: "در حال انجام", completion: 40 },
    ],
    // فعالیت‌های اجتماعی
    socialActivities: [
      { id: 1, title: "سفیر سلامت سازمانی", date: "از ۱۴۰۱" },
      { id: 2, title: "مربی برنامه منتورشیپ", date: "از ۱۴۰۲" },
      { id: 3, title: "عضو تیم مسئولیت‌های اجتماعی", date: "از ۱۴۰۰" },
    ],
  };

  return (
    <>
      {showAvatarBuilder ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">ساخت آواتار</h1>
            <Button 
              variant="outline" 
              onClick={() => setShowAvatarBuilder(false)}
            >
              بازگشت به پروفایل
            </Button>
          </div>
          
          <AvatarBuilder 
            onSave={(options, imageUrl) => {
              // در یک پیاده‌سازی واقعی، این اطلاعات به سرور ارسال می‌شود
              console.log("آواتار ذخیره شد:", options, imageUrl);
              setShowAvatarBuilder(false);
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">پروفایل من</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => setShowAvatarBuilder(true)}
              >
                <User className="h-4 w-4 ml-1" />
                ساخت آواتار
              </Button>
            </div>
          </div>
          
          {/* بخش اصلی (Hero Section) */}
          <GlassCard className="p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* آواتار و اطلاعات اصلی */}
              <div className="flex flex-col items-center text-center md:text-right md:w-64">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.displayName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-tiffany to-sky-700 text-white">
                        <span className="text-3xl font-bold">{user.displayName?.[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -left-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 shadow"></div>
                  <button 
                    className="absolute bottom-0 right-0 bg-slate-900/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setShowAvatarBuilder(true)}
                  >
                    <SquarePen className="h-4 w-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold mt-4">{userInfo.displayName}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{userInfo.position}</p>
                <div className="flex items-center mt-1 text-xs">
                  <Badge variant="outline" className="rounded-full px-2 bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">
                    آنلاین
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  شناسه پرسنلی: {userInfo.employeeId}
                </p>
                
                <div className="flex flex-col items-center w-full mt-6 space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-500">سطح</span>
                      <Badge variant="outline" className="rounded-full px-2 bg-tiffany/10 text-tiffany border-tiffany/20">
                        {user.level}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>XP: {user.xp}</span>
                        <span>{xpForNextLevel - xpProgress} تا سطح بعدی</span>
                      </div>
                      <Progress value={xpPercent} className="h-2 bg-slate-200 dark:bg-slate-700" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 w-full">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <MessageSquare className="h-4 w-4 ml-2" />
                      ارسال پیام
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="h-4 w-4 ml-2" />
                      گزارش عملکرد
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* اطلاعات کاربر - بخش راست */}
              <div className="flex-1">
                <Tabs defaultValue="info" className="w-full">
                  <TabsList>
                    <TabsTrigger value="info" className="text-xs">
                      <User className="h-4 w-4 ml-1" />
                      اطلاعات پایه
                    </TabsTrigger>
                    <TabsTrigger value="career" className="text-xs">
                      <Briefcase className="h-4 w-4 ml-1" />
                      اطلاعات شغلی
                    </TabsTrigger>
                    <TabsTrigger value="achievements" className="text-xs">
                      <Award className="h-4 w-4 ml-1" />
                      دستاوردها
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="text-xs">
                      <Settings className="h-4 w-4 ml-1" />
                      تنظیمات
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* تب اطلاعات پایه */}
                  <TabsContent value="info" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">اطلاعات تماس</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-3">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-tiffany/10 flex items-center justify-center mt-0.5">
                              <Mail className="h-4 w-4 text-tiffany" />
                            </div>
                            <div className="mr-3">
                              <p className="text-xs text-slate-500 dark:text-slate-400">ایمیل سازمانی</p>
                              <p className="text-sm font-medium">{userInfo.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mt-0.5">
                              <Phone className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="mr-3">
                              <p className="text-xs text-slate-500 dark:text-slate-400">شماره تماس</p>
                              <p className="text-sm font-medium">{userInfo.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mt-0.5">
                              <Building2 className="h-4 w-4 text-slate-500" />
                            </div>
                            <div className="mr-3">
                              <p className="text-xs text-slate-500 dark:text-slate-400">دپارتمان</p>
                              <p className="text-sm font-medium">{userInfo.department}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mt-0.5">
                              <MapPin className="h-4 w-4 text-slate-500" />
                            </div>
                            <div className="mr-3">
                              <p className="text-xs text-slate-500 dark:text-slate-400">محل کار</p>
                              <p className="text-sm font-medium">{userInfo.location}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">وضعیت پرسنلی</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-3">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-tiffany/10 flex items-center justify-center mt-0.5">
                              <Calendar className="h-4 w-4 text-tiffany" />
                            </div>
                            <div className="mr-3">
                              <p className="text-xs text-slate-500 dark:text-slate-400">تاریخ استخدام</p>
                              <p className="text-sm font-medium">{userInfo.joinDate}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mt-0.5">
                              <Shield className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="mr-3">
                              <p className="text-xs text-slate-500 dark:text-slate-400">وضعیت استخدام</p>
                              <p className="text-sm font-medium">رسمی</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mt-0.5">
                              <GraduationCap className="h-4 w-4 text-green-500" />
                            </div>
                            <div className="mr-3">
                              <p className="text-xs text-slate-500 dark:text-slate-400">تحصیلات</p>
                              <p className="text-sm font-medium">کارشناسی ارشد منابع انسانی</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mt-0.5">
                              <Clock3 className="h-4 w-4 text-slate-500" />
                            </div>
                            <div className="mr-3">
                              <p className="text-xs text-slate-500 dark:text-slate-400">سابقه کاری</p>
                              <p className="text-sm font-medium">3 سال و 4 ماه</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">مهارت‌ها و تخصص‌ها</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-tiffany/10 text-tiffany hover:bg-tiffany/20 border-0">مدیریت منابع انسانی</Badge>
                          <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 border-0">توسعه سازمانی</Badge>
                          <Badge className="bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/30 border-0">مدیریت عملکرد</Badge>
                          <Badge className="bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30 border-0">آموزش و توسعه</Badge>
                          <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30 border-0">مربیگری</Badge>
                          <Badge className="bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 border-0">مدیریت تغییر</Badge>
                          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 border-0">تحلیل داده</Badge>
                          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 border-0">ارتباطات سازمانی</Badge>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* تب اطلاعات شغلی */}
                  <TabsContent value="career" className="mt-4 space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">سمت‌های قبلی</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="space-y-4">
                          {userInfo.previousRoles.map((role, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mt-0.5">
                                <Briefcase className="h-5 w-5 text-slate-500" />
                              </div>
                              <div className="mr-3">
                                <p className="text-sm font-medium">{role.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{role.period}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">شرح وظایف کلیدی</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <p className="text-sm">{userInfo.keyResponsibilities}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">پروژه‌های جاری</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="space-y-4">
                          {userInfo.projects.map((project) => (
                            <div key={project.id} className="space-y-2">
                              <div className="flex justify-between">
                                <p className="text-sm font-medium">{project.title}</p>
                                <Badge 
                                  variant="outline"
                                  className={`text-xs ${
                                    project.status === "تکمیل شده" 
                                      ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400" 
                                      : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                                  }`}
                                >
                                  {project.status}
                                </Badge>
                              </div>
                              <Progress value={project.completion} className="h-1.5" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">عملکرد</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 dark:text-slate-400">امتیاز کلی عملکرد</p>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-tiffany text-white flex items-center justify-center">
                                <span className="text-xs font-bold">{userInfo.performance.score}</span>
                              </div>
                              <Progress
                                value={userInfo.performance.score}
                                className="h-1.5 flex-1 mr-2"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 dark:text-slate-400">تحقق اهداف</p>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                                <span className="text-xs font-bold">{userInfo.performance.goalAchievement}</span>
                              </div>
                              <Progress
                                value={userInfo.performance.goalAchievement}
                                className="h-1.5 flex-1 mr-2"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 dark:text-slate-400">همکاری تیمی</p>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                <span className="text-xs font-bold">{userInfo.performance.teamwork}</span>
                              </div>
                              <Progress
                                value={userInfo.performance.teamwork}
                                className="h-1.5 flex-1 mr-2"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-xs text-slate-500 dark:text-slate-400">نوآوری و ابتکار</p>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
                                <span className="text-xs font-bold">{userInfo.performance.initiative}</span>
                              </div>
                              <Progress
                                value={userInfo.performance.initiative}
                                className="h-1.5 flex-1 mr-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                          آخرین ارزیابی: {userInfo.performance.lastReviewDate}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* تب دستاوردها */}
                  <TabsContent value="achievements" className="mt-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">مدال‌ها</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                                <Trophy className="h-8 w-8 text-white" />
                              </div>
                              <p className="text-xs font-medium mt-2">قهرمان سلامت</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md">
                                <Activity className="h-8 w-8 text-white" />
                              </div>
                              <p className="text-xs font-medium mt-2">فعال برتر</p>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
                                <Brain className="h-8 w-8 text-white" />
                              </div>
                              <p className="text-xs font-medium mt-2">متفکر خلاق</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">گواهینامه‌ها</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                          <div className="space-y-3">
                            {userInfo.courses
                              .filter(course => course.certificate)
                              .map(course => (
                                <div key={course.id} className="flex items-start">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mt-0.5">
                                    <FileCheck className="h-4 w-4 text-tiffany" />
                                  </div>
                                  <div className="mr-3">
                                    <p className="text-sm font-medium">{course.title}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">تاریخ دریافت: {course.completionDate}</p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">فعالیت‌های اجتماعی</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="space-y-3">
                          {userInfo.socialActivities.map(activity => (
                            <div key={activity.id} className="flex items-start">
                              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mt-0.5">
                                <Handshake className="h-4 w-4 text-blue-500" />
                              </div>
                              <div className="mr-3">
                                <p className="text-sm font-medium">{activity.title}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{activity.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">امتیازات کسب شده</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="flex flex-col space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-tiffany/10 flex items-center justify-center">
                                <Award className="h-5 w-5 text-tiffany" />
                              </div>
                              <div className="mr-3">
                                <p className="text-sm font-medium">امتیاز کلی</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">مجموع امتیازات فعالیت‌ها</p>
                              </div>
                            </div>
                            <div className="text-xl font-bold text-tiffany">{user.xp} XP</div>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">چالش‌ها</p>
                              <p className="text-lg font-bold">{completedChallenges}/{totalChallenges}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">دستاوردها</p>
                              <p className="text-lg font-bold">{userBadges?.length || 0}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">سطح</p>
                              <p className="text-lg font-bold">{user.level}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* تب تنظیمات */}
                  <TabsContent value="settings" className="mt-4 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">تنظیمات امنیتی</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                          <div className="space-y-4">
                            <Button variant="outline" className="w-full justify-start" size="sm">
                              <Key className="h-4 w-4 ml-2" />
                              تغییر رمز عبور
                            </Button>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Shield className="h-4 w-4 ml-2 text-tiffany" />
                                <span className="text-sm">احراز هویت دو مرحله‌ای</span>
                              </div>
                              <input
                                type="checkbox"
                                className="toggle toggle-sm"
                                checked={false}
                                readOnly
                              />
                            </div>
                            <Button variant="outline" className="w-full justify-start" size="sm">
                              <UserRound className="h-4 w-4 ml-2" />
                              مدیریت دسترسی‌ها
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">تنظیمات اعلان‌ها</h3>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Bell className="h-4 w-4 ml-2" />
                                <span className="text-sm">اعلان‌های درون برنامه‌ای</span>
                              </div>
                              <input
                                type="checkbox"
                                className="toggle toggle-sm"
                                checked={true}
                                readOnly
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 ml-2" />
                                <span className="text-sm">اعلان‌های ایمیلی</span>
                              </div>
                              <input
                                type="checkbox"
                                className="toggle toggle-sm"
                                checked={true}
                                readOnly
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 ml-2" />
                                <span className="text-sm">پیام‌های یادآوری</span>
                              </div>
                              <input
                                type="checkbox"
                                className="toggle toggle-sm"
                                checked={true}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">حساب‌های متصل</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                <Github className="h-4 w-4" />
                              </div>
                              <span className="text-sm mr-2">GitHub</span>
                            </div>
                            <Button variant="outline" size="sm">اتصال</Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                <Linkedin className="h-4 w-4 text-blue-500" />
                              </div>
                              <span className="text-sm mr-2">LinkedIn</span>
                            </div>
                            <Button variant="outline" size="sm">اتصال</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">تنظیمات نمایش</h3>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Settings className="h-4 w-4 ml-2" />
                              <span className="text-sm">حالت تاریک</span>
                            </div>
                            <input
                              type="checkbox"
                              className="toggle toggle-sm"
                              checked={false}
                              readOnly
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Bell className="h-4 w-4 ml-2" />
                              <span className="text-sm">نمایش یادآوری‌های سلامتی</span>
                            </div>
                            <input
                              type="checkbox"
                              className="toggle toggle-sm"
                              checked={true}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </GlassCard>
          
          {/* بخش وضعیت مدارک و اسناد */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">وضعیت مدارک و اسناد</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h4 className="font-medium flex items-center">
                    <FileCheck className="h-4 w-4 ml-2 text-tiffany" />
                    لیست مدارک
                  </h4>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {userInfo.documents.map(doc => (
                      <div key={doc.id} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-slate-500" />
                          </div>
                          <div className="mr-3">
                            <p className="text-sm font-medium">{doc.name}</p>
                            {doc.expiryDate && (
                              <p className="text-xs text-slate-500 dark:text-slate-400">تاریخ انقضا: {doc.expiryDate}</p>
                            )}
                          </div>
                        </div>
                        <Badge 
                          variant="outline"
                          className={`text-xs ${
                            doc.status === "تایید شده" 
                              ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900/50" 
                              : "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50"
                          }`}
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-b-xl">
                  <Button variant="outline" size="sm" className="w-full">
                    <FileText className="h-4 w-4 ml-2" />
                    افزودن مدرک جدید
                  </Button>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h4 className="font-medium flex items-center">
                    <Clipboard className="h-4 w-4 ml-2 text-blue-500" />
                    وضعیت مدارک
                  </h4>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                      <div className="relative">
                        <svg className="w-16 h-16" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e6e6e6"
                            strokeWidth="3"
                            strokeDasharray="100, 100"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeDasharray="75, 100"
                          />
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium">75%</div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-blue-500">3 از 4 مدرک تکمیل شده</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">1 مدرک در انتظار تایید است</p>
                    <div className="grid grid-cols-2 gap-3 w-full">
                      <Button variant="outline" size="sm">
                        <CheckCircle2 className="h-4 w-4 ml-2" />
                        بررسی وضعیت
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 ml-2" />
                        پیگیری مدارک
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
          
          {/* بخش آموزش و توسعه */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">آموزش و توسعه</h3>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                <h4 className="font-medium flex items-center">
                  <BookOpen className="h-4 w-4 ml-2 text-blue-500" />
                  دوره‌های آموزشی
                </h4>
              </div>
              <div className="p-4">
                <div className="space-y-5">
                  {userInfo.courses.map(course => (
                    <div key={course.id} className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mt-0.5">
                          <GraduationCap className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="mr-3">
                          <p className="text-sm font-medium">{course.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">تاریخ اتمام: {course.completionDate}</p>
                        </div>
                      </div>
                      <div>
                        {course.certificate ? (
                          <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-900/50">
                            دارای گواهی
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700">
                            بدون گواهی
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded-b-xl">
                <Button className="w-full">
                  <BookOpen className="h-4 w-4 ml-2" />
                  مشاهده همه دوره‌ها
                </Button>
              </div>
            </div>
          </GlassCard>
          
          {/* بخش سلامت شغلی */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">سلامت شغلی و ایمنی</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                  <h4 className="font-medium flex items-center">
                    <Heart className="h-4 w-4 ml-2 text-red-500" />
                    خلاصه وضعیت سلامت
                  </h4>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">آخرین معاینه</span>
                        <Badge className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-0">
                          {userInfo.health.lastCheckup}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">وضعیت سلامت</span>
                        <Badge className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-0">
                          {userInfo.health.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 dark:text-slate-400">معاینه بعدی</span>
                        <Badge className="bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border-0">
                          {userInfo.health.upcomingAppointment}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                      <h5 className="text-sm font-medium mb-2">توصیه‌های سلامتی</h5>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {userInfo.health.recommendations}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <BodyComposition />
            </div>
          </GlassCard>
          
          {/* بخش فعالیت‌های داوطلبانه و اجتماعی */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold mb-4">فعالیت‌های داوطلبانه و اجتماعی</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {userInfo.socialActivities.map(activity => (
                <div key={activity.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-3">
                    <Handshake className="h-8 w-8 text-blue-500" />
                  </div>
                  <h4 className="font-bold">{activity.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{activity.date}</p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <ExternalLink className="h-3 w-3 ml-2" />
                    جزئیات بیشتر
                  </Button>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </>
  );
}