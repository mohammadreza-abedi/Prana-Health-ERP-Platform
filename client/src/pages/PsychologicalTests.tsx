import { useState, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { useCredits } from "@/hooks/use-credits";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { GlassCard } from "@/components/ui/glass-card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, toPersianDigits } from "@/lib/utils";
import { 
  Activity,
  AlertCircle,
  Award, 
  BrainCircuit,
  Brain, 
  Baby,
  BarChart3,
  BarChart4,
  BookOpen,
  Building2,
  Briefcase,
  ClipboardCheck,
  Cloud,
  Cog,
  CheckCircle2, 
  Clock, 
  CloudSun,
  Compass,
  Coins,
  Coffee,
  Diamond,
  Dna,
  Droplets,
  Eye,
  Flower2,
  Flame,
  Gauge,
  Hand,
  HeartHandshake,
  HeartPulse,
  Hash,
  History, 
  HelpCircle,
  LampDesk,
  Lightbulb,
  LineChart,
  Link,
  LockKeyhole,
  MessagesSquare,
  Network,
  Paintbrush,
  Puzzle,
  PersonStanding,
  PencilRuler,
  ScrollText,
  Scale,
  Search,
  Settings,
  Sigma,
  SlidersHorizontal,
  ShieldCheck,
  Share2,
  Sparkles, 
  Star,
  Stethoscope,
  Timer, 
  Target,
  Trophy,
  Unplug,
  UserCircle2,
  Utensils,
  Zap
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define test types
interface PsychTest {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  subcategory?: string;
  creditCost: number;
  questionsCount: number;
  timeRequired: number;
  popularity: number;
  difficulty: "آسان" | "متوسط" | "پیشرفته";
  resultType: string;
  isNew?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  isFree?: boolean;
  isRequired?: boolean;
  requiredFrequencyDays?: number; // چند روز یکبار تکرار شود
  requiredNextDate?: string; // تاریخ بعدی انجام تست الزامی
  publisher?: string; // انتشارات یا موسسه منتشر کننده تست
  targetAudience?: string[]; // گروه هدف مانند مدیران، کارمندان و غیره
  validityScore?: number; // امتیاز اعتبار تست از 100
  benefits?: string[]; // مزایای انجام این تست
  sampleQuestions?: { question: string, options: string[] }[]; // نمونه سوالات
  previewImage?: string; // تصویر پیش نمایش تست
  tags?: string[]; // برچسب‌های مرتبط
  certifiable?: boolean; // آیا گواهی دارد؟
  hasReminder?: boolean; // یادآوری برای تکمیل
  completionTime?: number; // متوسط زمان تکمیل به دقیقه
  releaseDate?: string; // تاریخ انتشار نسخه فعلی
  lastUpdated?: string; // تاریخ آخرین بروزرسانی
  version?: string; // نسخه تست
  followUpTests?: number[]; // آی‌دی تست‌های پیشنهادی بعدی
  instantAnalysis?: boolean; // قابلیت تحلیل لحظه‌ای
}

// Test history interface
interface TestHistory {
  id: number;
  testId: number;
  testTitle: string;
  date: string;
  score?: string;
  result?: string;
}

// تست‌های متعدد روانشناسی بر اساس منابع معتبر
const psychologicalTests: PsychTest[] = [
  // شخصیت
  {
    id: 1,
    title: "تست شخصیت MBTI",
    description: "شناخت 16 تیپ شخصیتی مایرز-بریگز و تعیین تیپ شخصیتی شما، ابزاری قدرتمند برای خودشناسی و رشد فردی",
    icon: <UserCircle2 className="h-10 w-10" />,
    category: "شخصیت",
    subcategory: "تیپ‌شناسی",
    creditCost: 25,
    questionsCount: 93,
    timeRequired: 20,
    popularity: 98,
    difficulty: "متوسط",
    resultType: "16 تیپ شخصیتی",
    isPopular: true,
    isRecommended: true,
    publisher: "The Myers & Briggs Foundation",
    validityScore: 94,
    version: "Form M",
    targetAudience: ["همه افراد", "مدیران", "کارمندان"],
    benefits: ["شناخت نقاط قوت و ضعف", "یافتن مسیر شغلی مناسب", "بهبود روابط فردی"],
    sampleQuestions: [
      {
        question: "ترجیح می‌دهید در محیط کار:",
        options: ["انعطاف‌پذیر باشید و بر اساس شرایط تصمیم بگیرید", "ساختار مشخص و برنامه دقیق داشته باشید"]
      }
    ],
    instantAnalysis: true,
    tags: ["شخصیت‌شناسی", "خودشناسی", "استخدام", "منابع انسانی"]
  },
  {
    id: 2,
    title: "تست شخصیت نئو (NEO)",
    description: "ارزیابی جامع 5 بعد اصلی شخصیت: روان‌رنجوری، برون‌گرایی، گشودگی، توافق‌پذیری و وظیفه‌شناسی",
    icon: <Network className="h-10 w-10" />,
    category: "شخصیت",
    subcategory: "پنج عامل بزرگ",
    creditCost: 35,
    questionsCount: 240,
    timeRequired: 45,
    popularity: 95,
    difficulty: "پیشرفته",
    resultType: "نیم‌رخ شخصیتی پنج عاملی",
    isPopular: true,
    isRequired: true,
    requiredFrequencyDays: 180,
    publisher: "Psychological Assessment Resources",
    validityScore: 97,
    version: "NEO PI-R",
    targetAudience: ["متخصصان منابع انسانی", "روانشناسان", "مشاوران شغلی"],
    certifiable: true
  },
  {
    id: 3,
    title: "تست تیپ شخصیتی انیاگرام",
    description: "شناسایی یکی از 9 تیپ شخصیتی انیاگرام و درک انگیزه‌های درونی و الگوهای رفتاری",
    icon: <Network className="h-10 w-10" />,
    category: "شخصیت",
    subcategory: "نُه‌گانه شخصیتی",
    creditCost: 30,
    questionsCount: 144,
    timeRequired: 25,
    popularity: 82,
    difficulty: "پیشرفته",
    resultType: "تیپ اصلی و فرعی",
    isNew: true,
    publisher: "The Enneagram Institute",
    validityScore: 89
  },
  {
    id: 4,
    title: "تست شخصیت DISC",
    description: "بررسی سبک رفتاری در چهار بعد: سلطه‌گری، تأثیرگذاری، ثبات و وظیفه‌گرایی",
    icon: <LineChart className="h-10 w-10" />,
    category: "شخصیت",
    subcategory: "سبک رفتاری",
    creditCost: 20,
    questionsCount: 28,
    timeRequired: 10,
    popularity: 87,
    difficulty: "آسان",
    resultType: "پروفایل رفتاری",
    publisher: "TTI Success Insights",
    validityScore: 93,
    instantAnalysis: true
  },
  {
    id: 5,
    title: "تست شخصیت‌شناسی هالند",
    description: "شناسایی علایق و گرایش‌های شغلی بر اساس مدل RIASEC (واقع‌گرا، جستجوگر، هنری، اجتماعی، متهور و قراردادی)",
    icon: <Compass className="h-10 w-10" />,
    category: "شخصیت",
    subcategory: "علایق شغلی",
    creditCost: 15,
    questionsCount: 180,
    timeRequired: 30,
    popularity: 80,
    difficulty: "متوسط",
    resultType: "کد هالند",
    isRequired: true,
    requiredFrequencyDays: 365
  },
  
  // هوش هیجانی
  {
    id: 6,
    title: "تست هوش هیجانی (EQ)",
    description: "سنجش توانایی درک، شناسایی و مدیریت احساسات خود و دیگران",
    icon: <HeartHandshake className="h-10 w-10" />,
    category: "هوش هیجانی",
    subcategory: "ارزیابی جامع",
    creditCost: 20,
    questionsCount: 70,
    timeRequired: 15,
    popularity: 85,
    difficulty: "متوسط",
    resultType: "نمره و تحلیل چند بعدی",
    isPopular: true,
    publisher: "Multi-Health Systems",
    validityScore: 91,
    isRecommended: true
  },
  {
    id: 7,
    title: "تست هوش هیجانی مدیران",
    description: "ارزیابی مهارت‌های هوش هیجانی مخصوص مدیران و رهبران سازمان‌ها",
    icon: <Target className="h-10 w-10" />,
    category: "هوش هیجانی",
    subcategory: "رهبری",
    creditCost: 40,
    questionsCount: 58,
    timeRequired: 20,
    popularity: 83,
    difficulty: "پیشرفته",
    resultType: "نیمرخ هوش هیجانی رهبری",
    isRequired: true,
    targetAudience: ["مدیران", "رهبران سازمانی", "سرپرستان"],
    requiredFrequencyDays: 90
  },
  {
    id: 8,
    title: "تست خودآگاهی هیجانی",
    description: "سنجش میزان آگاهی از احساسات خود و تأثیر آن بر رفتار و تصمیم‌گیری",
    icon: <Eye className="h-10 w-10" />,
    category: "هوش هیجانی",
    subcategory: "خودآگاهی",
    creditCost: 15,
    questionsCount: 35,
    timeRequired: 10,
    popularity: 76,
    difficulty: "آسان",
    resultType: "سطح خودآگاهی هیجانی",
    isFree: true
  },
  {
    id: 9,
    title: "تست مدیریت استرس هیجانی",
    description: "ارزیابی توانایی در مدیریت استرس و فشارهای هیجانی در محیط کار",
    icon: <Activity className="h-10 w-10" />,
    category: "هوش هیجانی",
    subcategory: "مدیریت استرس",
    creditCost: 20,
    questionsCount: 42,
    timeRequired: 15,
    popularity: 80,
    difficulty: "متوسط",
    resultType: "راهکارهای مدیریت استرس",
    isNew: true
  },
  
  // استرس و سلامت روان
  {
    id: 10,
    title: "تست استرس شغلی HSE",
    description: "ارزیابی سطح استرس شغلی و ارائه راهکارهای کاهش استرس در محیط کار",
    icon: <Activity className="h-10 w-10" />,
    category: "استرس",
    subcategory: "استرس شغلی",
    creditCost: 15,
    questionsCount: 35,
    timeRequired: 10,
    popularity: 78,
    difficulty: "آسان",
    resultType: "سطح استرس و توصیه‌ها",
    isRecommended: true,
    isRequired: true,
    requiredFrequencyDays: 90,
    publisher: "Health and Safety Executive",
    validityScore: 88
  },
  {
    id: 11,
    title: "تست سلامت روان GHQ",
    description: "ارزیابی سلامت روان عمومی و غربالگری اختلالات روانی",
    icon: <Brain className="h-10 w-10" />,
    category: "سلامت روان",
    subcategory: "غربالگری",
    creditCost: 30,
    questionsCount: 28,
    timeRequired: 8,
    popularity: 92,
    difficulty: "متوسط",
    resultType: "نمره و وضعیت سلامت روان",
    isRecommended: true,
    isRequired: true,
    requiredFrequencyDays: 120,
    publisher: "Oxford University Press",
    validityScore: 94
  },
  {
    id: 12,
    title: "تست اضطراب بک (BAI)",
    description: "سنجش میزان اضطراب و شناسایی علائم فیزیکی و روانی آن",
    icon: <HeartPulse className="h-10 w-10" />,
    category: "سلامت روان",
    subcategory: "اضطراب",
    creditCost: 20,
    questionsCount: 21,
    timeRequired: 5,
    popularity: 88,
    difficulty: "آسان",
    resultType: "شدت اضطراب",
    publisher: "The Psychological Corporation",
    validityScore: 92
  },
  {
    id: 13,
    title: "تست افسردگی بک (BDI)",
    description: "ارزیابی وجود و شدت علائم افسردگی",
    icon: <CloudSun className="h-10 w-10" />,
    category: "سلامت روان",
    subcategory: "افسردگی",
    creditCost: 20,
    questionsCount: 21,
    timeRequired: 5,
    popularity: 90,
    difficulty: "آسان",
    resultType: "سطح افسردگی",
    publisher: "The Psychological Corporation",
    validityScore: 93
  },
  {
    id: 14,
    title: "تست فرسودگی شغلی (MBI)",
    description: "ارزیابی سه بعد فرسودگی شغلی: خستگی عاطفی، مسخ شخصیت و کاهش موفقیت فردی",
    icon: <Unplug className="h-10 w-10" />,
    category: "استرس",
    subcategory: "فرسودگی شغلی",
    creditCost: 25,
    questionsCount: 22,
    timeRequired: 10,
    popularity: 85,
    difficulty: "متوسط",
    resultType: "نیمرخ فرسودگی شغلی",
    isRequired: true,
    requiredFrequencyDays: 180,
    publisher: "Mind Garden, Inc.",
    validityScore: 90
  },
  {
    id: 15,
    title: "تست تاب‌آوری CD-RISC",
    description: "سنجش میزان تاب‌آوری و توانایی بازگشت به حالت طبیعی پس از مشکلات و چالش‌ها",
    icon: <ShieldCheck className="h-10 w-10" />,
    category: "سلامت روان",
    subcategory: "تاب‌آوری",
    creditCost: 15,
    questionsCount: 25,
    timeRequired: 8,
    popularity: 82,
    difficulty: "آسان",
    resultType: "سطح تاب‌آوری",
    publisher: "Connor-Davidson",
    validityScore: 87
  },
  
  // شغلی
  {
    id: 16,
    title: "تست ارزش‌های شغلی (SVS)",
    description: "شناسایی ارزش‌های شغلی و ترجیحات کاری برای انتخاب مسیر شغلی مناسب",
    icon: <Award className="h-10 w-10" />,
    category: "شغلی",
    subcategory: "ارزش‌های کاری",
    creditCost: 40,
    questionsCount: 54,
    timeRequired: 12,
    popularity: 75,
    difficulty: "پیشرفته",
    resultType: "پروفایل ارزش‌های شغلی",
    isNew: true,
    publisher: "Super's Work Values",
    validityScore: 89
  },
  {
    id: 17,
    title: "تست رضایت شغلی (JSS)",
    description: "ارزیابی میزان رضایت از جنبه‌های مختلف شغل و محیط کاری",
    icon: <Star className="h-10 w-10" />,
    category: "شغلی",
    subcategory: "رضایتمندی",
    creditCost: 20,
    questionsCount: 36,
    timeRequired: 10,
    popularity: 84,
    difficulty: "متوسط",
    resultType: "نمره رضایت در 9 بعد شغلی",
    isRequired: true,
    requiredFrequencyDays: 180,
    publisher: "Paul Spector",
    validityScore: 91
  },
  {
    id: 18,
    title: "تست مسیر شغلی شاین",
    description: "شناسایی لنگرگاه‌های مسیر شغلی و ارزش‌های کاری اصلی شما",
    icon: <Compass className="h-10 w-10" />,
    category: "شغلی",
    subcategory: "مسیر شغلی",
    creditCost: 35,
    questionsCount: 40,
    timeRequired: 15,
    popularity: 78,
    difficulty: "متوسط",
    resultType: "لنگرگاه‌های مسیر شغلی",
    publisher: "Edgar Schein",
    validityScore: 86
  },
  {
    id: 19,
    title: "تست بازخورد 360 درجه",
    description: "جمع‌آوری بازخورد از همکاران، مدیران و زیردستان برای ارزیابی جامع عملکرد",
    icon: <UserCircle2 className="h-10 w-10" />,
    category: "شغلی",
    subcategory: "ارزیابی عملکرد",
    creditCost: 50,
    questionsCount: 60,
    timeRequired: 30,
    popularity: 88,
    difficulty: "پیشرفته",
    resultType: "گزارش تحلیلی چند بعدی",
    isRequired: true,
    requiredFrequencyDays: 365,
    publisher: "Center for Creative Leadership",
    targetAudience: ["مدیران", "رهبران تیم", "کارشناسان ارشد"],
    certifiable: true
  },
  {
    id: 20,
    title: "تست تیپ‌های شخصیتی کاری بلبین",
    description: "شناسایی 9 نقش تیمی و نحوه مشارکت فرد در کار گروهی",
    icon: <UserCircle2 className="h-10 w-10" />,
    category: "شغلی",
    subcategory: "نقش‌های تیمی",
    creditCost: 30,
    questionsCount: 56,
    timeRequired: 20,
    popularity: 82,
    difficulty: "متوسط",
    resultType: "نقش‌های تیمی اصلی و فرعی",
    publisher: "Belbin Associates",
    validityScore: 88
  },
  
  // مهارت‌های نرم
  {
    id: 21,
    title: "تست مهارت‌های ارتباطی",
    description: "ارزیابی توانایی‌های ارتباطی، گوش دادن فعال و مدیریت تعارض",
    icon: <Share2 className="h-10 w-10" />,
    category: "مهارت‌های نرم",
    subcategory: "ارتباطات",
    creditCost: 0,
    questionsCount: 20,
    timeRequired: 5,
    popularity: 90,
    difficulty: "آسان",
    resultType: "نمره و توصیه‌های ارتباطی",
    isFree: true,
    publisher: "Communication Research Associates",
    validityScore: 84
  },
  {
    id: 22,
    title: "تست سبک رهبری",
    description: "شناسایی سبک رهبری و مدیریتی شما از میان 6 سبک اصلی رهبری",
    icon: <Trophy className="h-10 w-10" />,
    category: "مهارت‌های نرم",
    subcategory: "رهبری",
    creditCost: 35,
    questionsCount: 36,
    timeRequired: 15,
    popularity: 86,
    difficulty: "متوسط",
    resultType: "پروفایل سبک رهبری",
    publisher: "Hay Group",
    targetAudience: ["مدیران", "رهبران", "کاندیداهای ارتقاء"],
    validityScore: 90
  },
  {
    id: 23,
    title: "تست مدیریت زمان",
    description: "ارزیابی مهارت‌های مدیریت زمان و شناسایی نقاط قابل بهبود",
    icon: <Clock className="h-10 w-10" />,
    category: "مهارت‌های نرم",
    subcategory: "مدیریت زمان",
    creditCost: 10,
    questionsCount: 25,
    timeRequired: 7,
    popularity: 80,
    difficulty: "آسان",
    resultType: "امتیاز و راهکارهای بهبود",
    isFree: true,
    instantAnalysis: true
  },
  {
    id: 24,
    title: "تست سبک حل مسئله",
    description: "شناسایی روش‌های شما در مواجهه با مشکلات و حل چالش‌ها",
    icon: <Puzzle className="h-10 w-10" />,
    category: "مهارت‌های نرم",
    subcategory: "حل مسئله",
    creditCost: 15,
    questionsCount: 32,
    timeRequired: 10,
    popularity: 75,
    difficulty: "متوسط",
    resultType: "سبک‌های حل مسئله",
    publisher: "Problem Solving Inventory",
    validityScore: 83
  },
  {
    id: 25,
    title: "تست مهارت‌های مذاکره",
    description: "ارزیابی توانایی‌های مذاکره، متقاعدسازی و رسیدن به توافق",
    icon: <MessagesSquare className="h-10 w-10" />,
    category: "مهارت‌های نرم",
    subcategory: "مذاکره",
    creditCost: 25,
    questionsCount: 30,
    timeRequired: 12,
    popularity: 78,
    difficulty: "متوسط",
    resultType: "نیمرخ مذاکره‌کننده",
    publisher: "Harvard Negotiation Project",
    validityScore: 87
  },
  
  // سنجش خلاقیت
  {
    id: 26,
    title: "تست خلاقیت تورنس",
    description: "ارزیابی تفکر خلاق و توانایی نوآوری در ابعاد مختلف",
    icon: <Lightbulb className="h-10 w-10" />,
    category: "خلاقیت",
    subcategory: "تفکر خلاق",
    creditCost: 35,
    questionsCount: 60,
    timeRequired: 45,
    popularity: 79,
    difficulty: "پیشرفته",
    resultType: "نمره خلاقیت در چهار بعد",
    publisher: "Scholastic Testing Service",
    validityScore: 89
  },
  {
    id: 27,
    title: "تست سبک تفکر KAI",
    description: "سنجش سبک تفکر انطباقی در مقابل نوآورانه",
    icon: <BrainCircuit className="h-10 w-10" />,
    category: "خلاقیت",
    subcategory: "سبک تفکر",
    creditCost: 30,
    questionsCount: 32,
    timeRequired: 15,
    popularity: 72,
    difficulty: "متوسط",
    resultType: "طیف انطباق-نوآوری",
    publisher: "KAI Distribution Centre",
    validityScore: 86
  },
  {
    id: 28,
    title: "تست تفکر واگرا",
    description: "سنجش توانایی تولید ایده‌های متنوع و متعدد برای حل مسائل",
    icon: <Paintbrush className="h-10 w-10" />,
    category: "خلاقیت",
    subcategory: "تفکر واگرا",
    creditCost: 20,
    questionsCount: 25,
    timeRequired: 20,
    popularity: 73,
    difficulty: "متوسط",
    resultType: "نمره سیالی، انعطاف‌پذیری و اصالت",
    isNew: true
  },
  
  // هوش شناختی
  {
    id: 29,
    title: "آزمون هوش وکسلر بزرگسالان",
    description: "سنجش جامع هوش با ارزیابی توانایی‌های کلامی و عملی",
    icon: <Brain className="h-10 w-10" />,
    category: "هوش",
    subcategory: "هوش عمومی",
    creditCost: 60,
    questionsCount: 105,
    timeRequired: 90,
    popularity: 92,
    difficulty: "پیشرفته",
    resultType: "IQ کل و خرده‌مقیاس‌ها",
    publisher: "Pearson",
    validityScore: 95,
    certifiable: true
  },
  {
    id: 30,
    title: "تست هوش ریون",
    description: "سنجش هوش سیال و استدلال غیرکلامی",
    icon: <Sigma className="h-10 w-10" />,
    category: "هوش",
    subcategory: "هوش سیال",
    creditCost: 30,
    questionsCount: 60,
    timeRequired: 40,
    popularity: 88,
    difficulty: "متوسط",
    resultType: "نمره و رتبه‌بندی",
    publisher: "Pearson",
    validityScore: 93
  },
  {
    id: 31,
    title: "آزمون حافظه وکسلر",
    description: "ارزیابی جامع انواع حافظه شامل حافظه کوتاه‌مدت، بلندمدت و کاری",
    icon: <BookOpen className="h-10 w-10" />,
    category: "هوش",
    subcategory: "حافظه",
    creditCost: 40,
    questionsCount: 75,
    timeRequired: 45,
    popularity: 84,
    difficulty: "پیشرفته",
    resultType: "نیمرخ حافظه",
    publisher: "Pearson",
    validityScore: 92
  },
  {
    id: 32,
    title: "تست هوش هیجانی-اجتماعی",
    description: "ارزیابی هوش هیجانی، اجتماعی و فرهنگی",
    icon: <HeartHandshake className="h-10 w-10" />,
    category: "هوش",
    subcategory: "هوش چندگانه",
    creditCost: 45,
    questionsCount: 58,
    timeRequired: 25,
    popularity: 83,
    difficulty: "متوسط",
    resultType: "پروفایل هوش چندگانه",
    publisher: "Six Seconds",
    validityScore: 91
  },
  
  // سبک زندگی و سلامت
  {
    id: 33,
    title: "پرسشنامه سبک زندگی سالم",
    description: "ارزیابی جامع عادات و رفتارهای مرتبط با سلامت جسمی و روانی",
    icon: <Utensils className="h-10 w-10" />,
    category: "سبک زندگی",
    subcategory: "سلامت عمومی",
    creditCost: 0,
    questionsCount: 40,
    timeRequired: 15,
    popularity: 76,
    difficulty: "آسان",
    resultType: "نمره سلامت در ابعاد مختلف",
    isFree: true,
    isRequired: true,
    requiredFrequencyDays: 90,
    instantAnalysis: true
  },
  {
    id: 34,
    title: "تست الگوی خواب",
    description: "بررسی کیفیت، مدت و الگوی خواب و تشخیص مشکلات احتمالی",
    icon: <CloudSun className="h-10 w-10" />,
    category: "سبک زندگی",
    subcategory: "خواب",
    creditCost: 10,
    questionsCount: 19,
    timeRequired: 5,
    popularity: 75,
    difficulty: "آسان",
    resultType: "نمره کیفیت خواب",
    isFree: true,
    publisher: "Pittsburgh Sleep Quality Index",
    validityScore: 85
  },
  {
    id: 35,
    title: "آزمون سنجش تغذیه سالم",
    description: "ارزیابی عادات غذایی و تشخیص نقاط نیازمند بهبود",
    icon: <Utensils className="h-10 w-10" />,
    category: "سبک زندگی",
    subcategory: "تغذیه",
    creditCost: 5,
    questionsCount: 25,
    timeRequired: 8,
    popularity: 72,
    difficulty: "آسان",
    resultType: "پروفایل تغذیه و توصیه‌ها",
    isFree: true,
    publisher: "Dietary Assessment Tools",
    validityScore: 82
  },
  
  // ده‌ها تست دیگر که به تدریج اضافه می‌شوند...
  {
    id: 36,
    title: "تست سبک یادگیری VARK",
    description: "شناسایی ترجیح‌های یادگیری دیداری، شنیداری، خواندنی/نوشتنی و جنبشی",
    icon: <BookOpen className="h-10 w-10" />,
    category: "یادگیری",
    subcategory: "سبک یادگیری",
    creditCost: 15,
    questionsCount: 16,
    timeRequired: 10,
    popularity: 85,
    difficulty: "آسان",
    resultType: "سبک‌های یادگیری",
    isFree: true,
    publisher: "VARK Learn Limited",
    validityScore: 78,
    instantAnalysis: true
  },
  
  // نمونه تست با تحلیل لحظه‌ای
  {
    id: 37,
    title: "ارزیابی لحظه‌ای استرس",
    description: "تست کوتاه برای سنجش سطح استرس فعلی و دریافت راهکارهای سریع",
    icon: <Gauge className="h-10 w-10" />,
    category: "سلامت روان",
    subcategory: "تحلیل لحظه‌ای",
    creditCost: 0,
    questionsCount: 5,
    timeRequired: 2,
    popularity: 94,
    difficulty: "آسان",
    resultType: "وضعیت لحظه‌ای و توصیه‌ها",
    isFree: true,
    instantAnalysis: true
  },
  
  // و نمونه‌های بیشتر تا رسیدن به 100 تست...
  {
    id: 38,
    title: "تست هوش چندگانه گاردنر",
    description: "ارزیابی 8 نوع هوش مختلف شامل زبانی، منطقی، فضایی، موسیقیایی و...",
    icon: <Dna className="h-10 w-10" />,
    category: "هوش",
    subcategory: "هوش چندگانه",
    creditCost: 25,
    questionsCount: 80,
    timeRequired: 20,
    popularity: 87,
    difficulty: "متوسط",
    resultType: "نیمرخ هوش‌های چندگانه",
    publisher: "Multiple Intelligences Research Group",
    validityScore: 88
  },
  
  {
    id: 39,
    title: "تست ارزش‌های زندگی شوارتز",
    description: "شناسایی 10 ارزش اصلی در زندگی شخصی و اولویت‌بندی آنها",
    icon: <Diamond className="h-10 w-10" />,
    category: "شخصیت",
    subcategory: "ارزش‌ها",
    creditCost: 20,
    questionsCount: 40,
    timeRequired: 15,
    popularity: 82,
    difficulty: "متوسط",
    resultType: "ساختار ارزشی فردی",
    publisher: "European Social Survey",
    validityScore: 92
  },
  
  {
    id: 40,
    title: "تست سنجش انگیزه در کار",
    description: "ارزیابی عوامل انگیزشی و محرک‌های فعالیت شغلی",
    icon: <Zap className="h-10 w-10" />,
    category: "شغلی",
    subcategory: "انگیزش",
    creditCost: 15,
    questionsCount: 30,
    timeRequired: 10,
    popularity: 81,
    difficulty: "آسان",
    resultType: "پروفایل انگیزشی",
    publisher: "Work Motivation Inventory",
    validityScore: 85
  }
  
  // تست‌های دیگر تا رسیدن به 100 تست حذف شده‌اند برای کوتاه‌تر کردن کد
];

// Sample user test history
const userTestHistory: TestHistory[] = [
  {
    id: 1,
    testId: 1,
    testTitle: "تست شخصیت MBTI",
    date: "1402/11/15",
    score: "100%",
    result: "INFJ"
  },
  {
    id: 2,
    testId: 3,
    testTitle: "تست استرس شغلی HSE",
    date: "1402/10/28",
    score: "85%",
    result: "استرس متوسط"
  },
  {
    id: 3,
    testId: 4,
    testTitle: "تست سلامت روان GHQ",
    date: "1402/09/10",
    score: "92%",
    result: "سلامت روان خوب"
  }
];

// Component for test category badges
const CategoryBadge = ({ category }: { category: string }) => {
  const getColorByCategory = () => {
    switch (category) {
      case "شخصیت":
        return "bg-violet-500/10 text-violet-600 dark:bg-violet-600/20 dark:text-violet-400";
      case "هوش هیجانی":
        return "bg-pink-500/10 text-pink-600 dark:bg-pink-600/20 dark:text-pink-400";
      case "استرس":
        return "bg-amber-500/10 text-amber-600 dark:bg-amber-600/20 dark:text-amber-400";
      case "سلامت روان":
        return "bg-tiffany/10 text-tiffany dark:bg-tiffany/20 dark:text-tiffany";
      case "شغلی":
        return "bg-blue-500/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400";
      case "مهارت‌های نرم":
        return "bg-green-500/10 text-green-600 dark:bg-green-600/20 dark:text-green-400";
      default:
        return "bg-slate-500/10 text-slate-600 dark:bg-slate-600/20 dark:text-slate-400";
    }
  };

  return (
    <Badge variant="outline" className={cn("font-normal", getColorByCategory())}>
      {category}
    </Badge>
  );
};

// Component for difficulty badges
const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const getColorByDifficulty = () => {
    switch (difficulty) {
      case "آسان":
        return "bg-green-500/10 text-green-600 dark:bg-green-600/20 dark:text-green-400";
      case "متوسط":
        return "bg-amber-500/10 text-amber-600 dark:bg-amber-600/20 dark:text-amber-400";
      case "پیشرفته":
        return "bg-red-500/10 text-red-600 dark:bg-red-600/20 dark:text-red-400";
      default:
        return "bg-slate-500/10 text-slate-600 dark:bg-slate-600/20 dark:text-slate-400";
    }
  };

  return (
    <Badge variant="outline" className={cn("font-normal", getColorByDifficulty())}>
      {difficulty}
    </Badge>
  );
};

export default function PsychologicalTests() {
  const [selectedTest, setSelectedTest] = useState<PsychTest | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const { user } = useAuth();
  const { credits, isLoadingCredits } = useCredits();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Function to start a test
  const startTest = (test: PsychTest) => {
    if (!test.isFree && (credits !== undefined && credits < test.creditCost)) {
      // Show not enough credits message
      toast({
        title: "اعتبار ناکافی",
        description: "اعتبار شما برای انجام این تست کافی نیست. لطفاً اعتبار خود را افزایش دهید.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedTest(test);
    setConfirmDialogOpen(true);
  };
  
  // Function to confirm starting a test
  const confirmStartTest = () => {
    setConfirmDialogOpen(false);
    
    if (selectedTest) {
      // هدایت کاربر به صفحه انجام تست
      if (completedTests.includes(selectedTest.id)) {
        setLocation(`/tests/${selectedTest.id}`);
      } else {
        toast({
          title: "تست فعال نیست",
          description: "این تست هنوز فعال نشده است.",
          variant: "destructive"
        });
      }
    }
  };
  
  // Filter tests by category
  const filteredTests = filterCategory 
    ? psychologicalTests.filter(test => test.category === filterCategory)
    : psychologicalTests;
  
  // آزمون‌های فعال و کامل
  const completedTests = [1, 12, 36]; // آی‌دی آزمون‌هایی که کامل شده‌اند
  
  // نمایش آیکون فعال یا غیرفعال برای هر تست
  const getTestStatusBadge = (testId: number) => {
    if (completedTests.includes(testId)) {
      return (
        <div className="absolute top-3 left-3 bg-tiffany/15 dark:bg-tiffany/25 p-1.5 rounded-full">
          <CheckCircle2 className="h-4 w-4 text-tiffany" />
        </div>
      );
    }
    return (
      <div className="absolute top-3 left-3 bg-slate-200/50 dark:bg-slate-700/50 p-1.5 rounded-full">
        <LockKeyhole className="h-4 w-4 text-slate-500 dark:text-slate-400" />
      </div>
    );
  };
  
  // Filter tests by tab
  const getTabTests = () => {
    // آزمون‌های فعال (کامل شده) باید اول باشند
    const activeTests = filteredTests.filter(test => completedTests.includes(test.id));
    const inactiveTests = filteredTests.filter(test => !completedTests.includes(test.id));
    
    // بر اساس تب انتخاب شده فیلتر می‌کنیم
    let activeFiltered;
    let inactiveFiltered;
    
    switch(activeTab) {
      case "popular":
        activeFiltered = activeTests.filter(test => test.isPopular);
        inactiveFiltered = inactiveTests.filter(test => test.isPopular);
        break;
      case "recommended":
        activeFiltered = activeTests.filter(test => test.isRecommended);
        inactiveFiltered = inactiveTests.filter(test => test.isRecommended);
        break;
      case "new":
        activeFiltered = activeTests.filter(test => test.isNew);
        inactiveFiltered = inactiveTests.filter(test => test.isNew);
        break;
      case "free":
        activeFiltered = activeTests.filter(test => test.isFree);
        inactiveFiltered = inactiveTests.filter(test => test.isFree);
        break;
      default:
        activeFiltered = activeTests;
        inactiveFiltered = inactiveTests;
        break;
    }
    
    // آزمون‌های فعال اول، سپس غیرفعال‌ها
    return [...activeFiltered, ...inactiveFiltered];
  };
  
  // Get all unique categories
  const categories = Array.from(new Set(psychologicalTests.map(test => test.category)));
  
  return (
    <>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">تست‌های روانشناختی و شخصیت</h1>
        <p className="text-slate-500 dark:text-slate-400">
          با استفاده از تست‌های استاندارد، خود را بهتر بشناسید و به رشد شخصی و شغلی خود کمک کنید
        </p>
      </motion.div>
      
      {/* Credit Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <GlassCard className="p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center">
              <Coins className="h-6 w-6 text-tiffany" />
            </div>
            <div className="mr-4">
              <h3 className="text-sm text-slate-500 dark:text-slate-400">اعتبار شما</h3>
              <p className="text-2xl font-bold">{isLoadingCredits ? "..." : toPersianDigits(credits || 0)}</p>
            </div>
            <Button className="mr-auto" size="sm">
              افزایش اعتبار
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-navy/10 dark:bg-navy/20 flex items-center justify-center">
              <History className="h-6 w-6 text-navy" />
            </div>
            <div className="mr-4">
              <h3 className="text-sm text-slate-500 dark:text-slate-400">سوابق آزمون‌ها</h3>
              <p className="text-2xl font-bold">{toPersianDigits(userTestHistory.length)}</p>
            </div>
            <Button variant="outline" className="mr-auto" size="sm">
              مشاهده سوابق
            </Button>
          </div>
        </GlassCard>
      </div>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-tiffany/5 to-cyan-500/5 blur-3xl opacity-50"
          animate={{ 
            y: [0, -50, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-fuchsia-500/5 to-purple-500/5 blur-3xl opacity-50"
          animate={{ 
            y: [0, 50, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-amber-500/5 to-yellow-500/5 blur-3xl opacity-30"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
      </div>
      
      {/* Tests Tabs and Filters */}
      <div className="mb-8">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="tests-tabs">
          {/* Tab and Category Selection Bar - Advanced Design */}
          <div className="relative mb-10 overflow-visible">
            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-radial from-fuchsia-500/5 via-tiffany/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-radial from-tiffany/10 to-transparent rounded-full blur-3xl"></div>
            
            {/* Animated Top Decorative Line */}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-tiffany/30 to-transparent mb-8 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-tiffany/70 to-transparent"
                animate={{ x: ['-100%', '500%'] }}
                transition={{ 
                  duration: 4, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              />
            </div>
            
            {/* Tabs and Filter Container */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              {/* Advanced Tabs with Animation */}
              <motion.div 
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-auto"
              >
                <TabsList className="relative h-14 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-0 shadow-lg rounded-xl overflow-visible p-1.5">
                  {/* Background gradient effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-slate-100/80 to-white/80 dark:from-slate-800/80 dark:to-slate-700/80 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Animated active indicator */}
                  <motion.div 
                    className="absolute bottom-1 h-1 rounded-full bg-gradient-to-r from-tiffany via-cyan-400 to-blue-400"
                    style={{ 
                      left: activeTab === 'all' ? '10%' : 
                             activeTab === 'recommended' ? '30%' : 
                             activeTab === 'popular' ? '50%' : 
                             activeTab === 'new' ? '70%' : '90%',
                      width: '15%'
                    }}
                    animate={{ 
                      left: activeTab === 'all' ? '2%' : 
                             activeTab === 'recommended' ? '22%' : 
                             activeTab === 'popular' ? '42%' : 
                             activeTab === 'new' ? '65%' : '82%',
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    layoutId="activeTabLine"
                  />
                
                  {/* Tab Triggers with Icons and Visual Enhancements */}
                  <TabsTrigger 
                    value="all" 
                    className={`relative z-20 py-1.5 px-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'all' 
                        ? 'text-tiffany font-bold' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 space-x-reverse">
                      <motion.div 
                        animate={activeTab === 'all' ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 1, repeat: activeTab === 'all' ? Infinity : 0, repeatDelay: 1 }}
                        className={`p-1 rounded-full ${activeTab === 'all' ? 'bg-tiffany/10' : ''}`}
                      >
                        <CheckCircle2 className={`h-4 w-4 ${activeTab === 'all' ? 'text-tiffany' : 'text-slate-500'}`} />
                      </motion.div>
                      <span>همه تست‌ها</span>
                      {activeTab === 'all' && (
                        <motion.div 
                          className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-tiffany"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="recommended" 
                    className={`relative z-20 py-1.5 px-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'recommended' 
                        ? 'text-tiffany font-bold' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 space-x-reverse">
                      <motion.div 
                        animate={activeTab === 'recommended' ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 1, repeat: activeTab === 'recommended' ? Infinity : 0, repeatDelay: 1 }}
                        className={`p-1 rounded-full ${activeTab === 'recommended' ? 'bg-tiffany/10' : ''}`}
                      >
                        <Award className={`h-4 w-4 ${activeTab === 'recommended' ? 'text-tiffany' : 'text-slate-500'}`} />
                      </motion.div>
                      <span>توصیه شده</span>
                      {activeTab === 'recommended' && (
                        <motion.div 
                          className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-tiffany"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="popular" 
                    className={`relative z-20 py-1.5 px-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'popular' 
                        ? 'text-tiffany font-bold' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 space-x-reverse">
                      <motion.div 
                        animate={activeTab === 'popular' ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 1, repeat: activeTab === 'popular' ? Infinity : 0, repeatDelay: 1 }}
                        className={`p-1 rounded-full ${activeTab === 'popular' ? 'bg-tiffany/10' : ''}`}
                      >
                        <Star className={`h-4 w-4 ${activeTab === 'popular' ? 'text-tiffany' : 'text-slate-500'}`} />
                      </motion.div>
                      <span>پرطرفدار</span>
                      {activeTab === 'popular' && (
                        <motion.div 
                          className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-tiffany"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="new" 
                    className={`relative z-20 py-1.5 px-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'new' 
                        ? 'text-tiffany font-bold' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 space-x-reverse">
                      <motion.div 
                        animate={activeTab === 'new' ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 1, repeat: activeTab === 'new' ? Infinity : 0, repeatDelay: 1 }}
                        className={`p-1 rounded-full ${activeTab === 'new' ? 'bg-tiffany/10' : ''}`}
                      >
                        <Sparkles className={`h-4 w-4 ${activeTab === 'new' ? 'text-tiffany' : 'text-slate-500'}`} />
                      </motion.div>
                      <span>جدید</span>
                      {activeTab === 'new' && (
                        <motion.div 
                          className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-tiffany"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="free" 
                    className={`relative z-20 py-1.5 px-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'free' 
                        ? 'text-tiffany font-bold' 
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 space-x-reverse">
                      <motion.div 
                        animate={activeTab === 'free' ? { scale: [1, 1.15, 1] } : {}}
                        transition={{ duration: 1, repeat: activeTab === 'free' ? Infinity : 0, repeatDelay: 1 }}
                        className={`p-1 rounded-full ${activeTab === 'free' ? 'bg-tiffany/10' : ''}`}
                      >
                        <Coins className={`h-4 w-4 ${activeTab === 'free' ? 'text-tiffany' : 'text-slate-500'}`} />
                      </motion.div>
                      <span>رایگان</span>
                      {activeTab === 'free' && (
                        <motion.div 
                          className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-tiffany"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  </TabsTrigger>
                </TabsList>
              </motion.div>
              
              {/* Enhanced Category Filter Buttons */}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 w-full md:w-auto flex flex-wrap sm:flex-nowrap justify-start items-center gap-2 md:gap-1 overflow-x-auto scrollbar-thin max-w-full md:max-w-[500px]"
              >
                <Button 
                  variant={filterCategory === null ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterCategory(null)}
                  className={`flex items-center rounded-xl px-3 py-1.5 border transition-all transform ${
                    filterCategory === null 
                      ? 'bg-gradient-to-r from-tiffany to-cyan-500 text-white shadow-md hover:shadow-lg border-0' 
                      : 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-tiffany/10 hover:text-tiffany dark:hover:text-tiffany-light border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <motion.div 
                    animate={filterCategory === null ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: filterCategory === null ? Infinity : 0, duration: 2 }}
                  >
                    <CheckCircle2 className={`h-4 w-4 ${filterCategory === null ? 'ml-1.5' : 'ml-1.5 opacity-70'}`} />
                  </motion.div>
                  <span>همه</span>
                </Button>
                
                {categories.map((category, index) => {
                  const isActive = filterCategory === category;
                  
                  // Define color schemes for each category
                  const getColorScheme = () => {
                    switch(category) {
                      case "شخصیت": 
                        return { 
                          gradient: "from-violet-500 to-fuchsia-500",
                          hover: "bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400",
                          icon: <UserCircle2 className="h-4 w-4" />
                        };
                      case "هوش هیجانی": 
                        return { 
                          gradient: "from-rose-500 to-pink-500",
                          hover: "bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400",
                          icon: <HeartHandshake className="h-4 w-4" />
                        };
                      case "استرس": 
                        return {
                          gradient: "from-amber-500 to-orange-500",
                          hover: "bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400",
                          icon: <ClipboardCheck className="h-4 w-4" />
                        };
                      case "سلامت روان": 
                        return {
                          gradient: "from-tiffany to-green-500",
                          hover: "bg-tiffany/10 hover:text-tiffany dark:hover:text-tiffany-light",
                          icon: <Brain className="h-4 w-4" />
                        };
                      case "شغلی": 
                        return {
                          gradient: "from-blue-500 to-cyan-500",
                          hover: "bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400",
                          icon: <Award className="h-4 w-4" />
                        };
                      case "مهارت‌های نرم": 
                        return {
                          gradient: "from-green-500 to-lime-500",
                          hover: "bg-green-500/10 hover:text-green-600 dark:hover:text-green-400",
                          icon: <Share2 className="h-4 w-4" />
                        };
                      default: 
                        return {
                          gradient: "from-slate-500 to-slate-700",
                          hover: "bg-slate-500/10 hover:text-slate-600 dark:hover:text-slate-400",
                          icon: <CheckCircle2 className="h-4 w-4" />
                        };
                    }
                  };
                  
                  const colorScheme = getColorScheme();
                  
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                      whileHover={{ scale: isActive ? 1 : 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterCategory(category)}
                        className={`flex items-center whitespace-nowrap rounded-xl px-3 py-1.5 border transition-all transform ${
                          isActive 
                            ? `bg-gradient-to-r ${colorScheme.gradient} text-white shadow-md hover:shadow-lg border-0` 
                            : `bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm ${colorScheme.hover} border-slate-200 dark:border-slate-700`
                        }`}
                      >
                        <motion.div 
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
                          className="ml-1.5"
                        >
                          {colorScheme.icon}
                        </motion.div>
                        <span>{category}</span>
                      </Button>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
          
          {/* Test Count and Result Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 flex justify-between items-center"
          >
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-tiffany to-cyan-500 flex items-center justify-center mr-2 shadow-sm">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                </motion.div>
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                <span className="font-bold text-tiffany">{toPersianDigits(getTabTests().length)}</span> آزمون{' '}
                {activeTab === 'all' ? 'در دسترس' : 
                 activeTab === 'recommended' ? 'توصیه شده' : 
                 activeTab === 'popular' ? 'پرطرفدار' : 
                 activeTab === 'new' ? 'جدید' : 'رایگان'}{' '}
                {filterCategory ? `در دسته ${filterCategory}` : ''}
              </span>
            </div>
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
              <span className="font-medium text-tiffany mr-1">پاداش: </span>
              <span>+۵ اعتبار پس از هر آزمون</span>
            </div>
          </motion.div>
          
          {/* No Results State */}
          {getTabTests().length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-8 rounded-2xl text-center shadow-sm border border-slate-200/50 dark:border-slate-700/50"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <Brain className="h-10 w-10 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg font-bold mb-2">هیچ آزمونی یافت نشد!</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">برای دسته‌بندی و فیلتر انتخاب شده نتیجه‌ای یافت نشد.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveTab('all');
                  setFilterCategory(null);
                }}
              >
                <Sparkles className="h-4 w-4 ml-1.5" />
                نمایش تمام آزمون‌ها
              </Button>
            </motion.div>
          )}
          
          {/* Enhanced Test Cards Grid */}
          {getTabTests().length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTabTests().map((test, index) => {
                // Get color scheme based on category
                const getCategoryColors = () => {
                  switch(test.category) {
                    case "شخصیت": 
                      return { 
                        gradient: "from-violet-500 to-fuchsia-500",
                        light: "bg-violet-500/10",
                        color: "text-violet-500",
                        border: "border-violet-200 dark:border-violet-800/30",
                        shadow: "shadow-violet-500/5",
                        glow: "bg-violet-500/5"
                      };
                    case "هوش هیجانی": 
                      return { 
                        gradient: "from-rose-500 to-pink-500",
                        light: "bg-rose-500/10",
                        color: "text-rose-500",
                        border: "border-rose-200 dark:border-rose-800/30",
                        shadow: "shadow-rose-500/5",
                        glow: "bg-rose-500/5"
                      };
                    case "استرس": 
                      return {
                        gradient: "from-amber-500 to-orange-500",
                        light: "bg-amber-500/10",
                        color: "text-amber-500",
                        border: "border-amber-200 dark:border-amber-800/30",
                        shadow: "shadow-amber-500/5",
                        glow: "bg-amber-500/5"
                      };
                    case "سلامت روان": 
                      return {
                        gradient: "from-tiffany to-green-500",
                        light: "bg-tiffany/10",
                        color: "text-tiffany",
                        border: "border-tiffany/20 dark:border-tiffany/10",
                        shadow: "shadow-tiffany/5",
                        glow: "bg-tiffany/5"
                      };
                    case "شغلی": 
                      return {
                        gradient: "from-blue-500 to-cyan-500",
                        light: "bg-blue-500/10",
                        color: "text-blue-500",
                        border: "border-blue-200 dark:border-blue-800/30",
                        shadow: "shadow-blue-500/5",
                        glow: "bg-blue-500/5"
                      };
                    case "مهارت‌های نرم": 
                      return {
                        gradient: "from-green-500 to-lime-500",
                        light: "bg-green-500/10",
                        color: "text-green-500",
                        border: "border-green-200 dark:border-green-800/30",
                        shadow: "shadow-green-500/5",
                        glow: "bg-green-500/5"
                      };
                    default: 
                      return {
                        gradient: "from-slate-500 to-slate-700",
                        light: "bg-slate-500/10",
                        color: "text-slate-500",
                        border: "border-slate-200 dark:border-slate-700",
                        shadow: "shadow-slate-500/5",
                        glow: "bg-slate-500/5"
                      };
                  }
                };
                
                const colors = getCategoryColors();
                const isActive = completedTests.includes(test.id);
                const canStart = isActive && (test.isFree || (credits !== undefined && credits >= test.creditCost));
                
                return (
                  <motion.div 
                    key={test.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className={cn(
                      "group",
                      !completedTests.includes(test.id) ? "opacity-75" : ""
                    )}
                  >
                    <GlassCard 
                      className={cn(
                        "h-full flex flex-col relative overflow-hidden border shadow-lg hover:shadow-xl transition-all duration-500",
                        completedTests.includes(test.id) 
                          ? "border-tiffany/30 dark:border-tiffany/30 group-hover:border-tiffany/70 dark:group-hover:border-tiffany/50" 
                          : "border-slate-200/60 dark:border-slate-700/60 group-hover:border-slate-300 dark:group-hover:border-slate-600",
                        completedTests.includes(test.id) ? "cursor-pointer" : "cursor-not-allowed"
                      )}
                    >
                      {/* Status Indicator Badge */}
                      {getTestStatusBadge(test.id)}
                      {/* Category-based gradient background effect */}
                      <div className={`absolute -top-32 -right-20 w-64 h-64 bg-gradient-radial from-${test.category === "شخصیت" ? 'violet' : test.category === "هوش هیجانی" ? 'rose' : test.category === "استرس" ? 'amber' : test.category === "سلامت روان" ? 'tiffany' : test.category === "شغلی" ? 'blue' : 'green'}-500/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                      
                      {/* Animated decorative patterns */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <motion.div 
                          className={`absolute top-1/4 right-10 h-1 w-1 rounded-full ${colors.color}`}
                          animate={{ 
                            y: [0, -15, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0.8, 1.2, 0.8]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            repeatDelay: 1
                          }}
                        />
                        <motion.div 
                          className={`absolute bottom-1/3 left-5 h-1.5 w-1.5 rounded-full ${colors.color}`}
                          animate={{ 
                            y: [0, -20, 0],
                            opacity: [0, 0.6, 0],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            delay: 1,
                            repeatDelay: 2
                          }}
                        />
                      </div>
                      
                      {/* Enhanced badge container with animation */}
                      <div className="absolute top-2 left-2 flex flex-col space-y-1.5 z-10">
                        {test.isNew && (
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                          >
                            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium border-0 shadow-md rounded-full px-2.5 py-0.5">
                              <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="mr-0.5"
                              >
                                <Sparkles className="h-3 w-3 inline-block mr-0.5" />
                              </motion.div>
                              جدید
                            </Badge>
                          </motion.div>
                        )}
                        {test.isPopular && (
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                          >
                            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium border-0 shadow-md rounded-full px-2.5 py-0.5">
                              <motion.div
                                animate={{ 
                                  rotate: [0, 10, 0, -10, 0],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="mr-0.5"
                              >
                                <Star className="h-3 w-3 inline-block mr-0.5 fill-white" />
                              </motion.div>
                              پرطرفدار
                            </Badge>
                          </motion.div>
                        )}
                        {test.isFree && (
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                          >
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium border-0 shadow-md rounded-full px-2.5 py-0.5">
                              <motion.div
                                animate={{ y: [0, -2, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="mr-0.5"
                              >
                                <Coins className="h-3 w-3 inline-block mr-0.5" />
                              </motion.div>
                              رایگان
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Recommendation badge - when recommended */}
                      {test.isRecommended && (
                        <div className="absolute top-4 right-0 z-10">
                          <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                          >
                            <div className="bg-gradient-to-l from-amber-500 to-amber-400 text-white text-xs font-medium py-1 pl-3 pr-1 rounded-l-full shadow-md flex items-center">
                              <motion.div
                                animate={{ rotate: [0, 10, 0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Award className="h-3.5 w-3.5 mr-1" />
                              </motion.div>
                              پیشنهاد ویژه
                            </div>
                          </motion.div>
                        </div>
                      )}
                      
                      <div className="p-6 pb-0 relative z-0">
                        {/* Enhanced icon container with animated background */}
                        <div className="flex justify-between items-start mb-6">
                          <div className="relative">
                            <motion.div 
                              className={`absolute inset-0 rounded-xl ${colors.glow} blur-xl opacity-0 group-hover:opacity-60`}
                              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0, 0.6, 0] }}
                              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                            />
                            <div className={`relative w-18 h-18 rounded-xl ${colors.light} flex items-center justify-center p-3 ${colors.border} border shadow-lg ${colors.shadow} group-hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                              {/* Gradient background */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                              
                              {/* Animated icon */}
                              <motion.div 
                                className={colors.color}
                                animate={{ 
                                  scale: [1, 1.05, 1],
                                  rotate: [0, 2, 0, -2, 0]
                                }}
                                transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                              >
                                {test.icon}
                              </motion.div>
                              
                              {/* Decorative circles in corners */}
                              <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-white/30"></div>
                              <div className="absolute bottom-1 left-1 h-1 w-1 rounded-full bg-white/30"></div>
                            </div>
                          </div>
                          
                          {/* Enhanced popularity indicator */}
                          <div className="relative">
                            <motion.div 
                              className="absolute -inset-2 bg-yellow-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                              animate={{ scale: [0.8, 1.2, 0.8] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                              <div className="flex items-center">
                                <div className="relative">
                                  <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                                  </div>
                                  <motion.div 
                                    className="absolute inset-0 rounded-full"
                                    animate={{ 
                                      boxShadow: [
                                        '0 0 0 0 rgba(234, 179, 8, 0)',
                                        '0 0 0 3px rgba(234, 179, 8, 0.2)',
                                        '0 0 0 0 rgba(234, 179, 8, 0)'
                                      ]
                                    }}
                                    transition={{ 
                                      duration: 2, 
                                      repeat: Infinity,
                                      repeatDelay: 1
                                    }}
                                  />
                                </div>
                                <span className="text-xs font-bold mr-1.5 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-500">
                                  {test.popularity}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Title with animated hover effect */}
                        <div className="mb-4 relative overflow-hidden">
                          <h3 className="text-xl font-bold relative group-hover:text-tiffany dark:group-hover:text-tiffany-light transition-colors duration-300">
                            {test.title}
                            <motion.div 
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-tiffany to-transparent scale-x-0 origin-center opacity-0 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-500"
                            />
                          </h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                            {test.description}
                          </p>
                        </div>
                        
                        {/* Enhanced category and difficulty badges */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          <motion.div
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <CategoryBadge category={test.category} />
                          </motion.div>
                          <motion.div
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <DifficultyBadge difficulty={test.difficulty} />
                          </motion.div>
                        </div>
                        
                        {/* Enhanced test info with animation and glassmorphism */}
                        <div className="grid grid-cols-3 gap-3 mb-5">
                          <motion.div 
                            className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700/50 p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          >
                            <div className="flex flex-col items-center justify-center">
                              <div className={`w-8 h-8 rounded-full ${colors.light} flex items-center justify-center mb-2`}>
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                  className="relative"
                                >
                                  <Clock className={`h-4.5 w-4.5 ${colors.color}`} />
                                </motion.div>
                              </div>
                              <span className="text-xs font-medium text-center">
                                {test.timeRequired} دقیقه
                              </span>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700/50 p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          >
                            <div className="flex flex-col items-center justify-center">
                              <div className={`w-8 h-8 rounded-full ${colors.light} flex items-center justify-center mb-2`}>
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="relative"
                                >
                                  <CheckCircle2 className={`h-4.5 w-4.5 ${colors.color}`} />
                                </motion.div>
                              </div>
                              <span className="text-xs font-medium text-center">
                                {test.questionsCount} سوال
                              </span>
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-100 dark:border-slate-700/50 p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300"
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          >
                            <div className="flex flex-col items-center justify-center">
                              <div className={`w-8 h-8 rounded-full ${colors.light} flex items-center justify-center mb-2`}>
                                <motion.div
                                  animate={{ 
                                    rotate: [0, 5, 0, -5, 0],
                                    scale: [1, 1.1, 1]
                                  }}
                                  transition={{ duration: 3, repeat: Infinity }}
                                  className="relative"
                                >
                                  <Sparkles className={`h-4.5 w-4.5 ${colors.color}`} />
                                </motion.div>
                              </div>
                              <span className="text-xs font-medium text-center">
                                {test.resultType}
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Enhanced bottom section with credit display and button */}
                      <div className="mt-auto p-6 pt-0 relative">
                        {/* Decorative divider */}
                        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
                        
                        <div className="flex items-center justify-between">
                          {/* Credit cost with animation */}
                          <div className="flex items-center">
                            <motion.div
                              className="mr-1 relative"
                              animate={{ rotate: [0, 10, 0, -10, 0] }}
                              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                            >
                              <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center">
                                <Coins className="h-5 w-5 text-amber-500" />
                              </div>
                              {/* Decorative glow on hover */}
                              <motion.div 
                                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                                animate={{ 
                                  boxShadow: [
                                    '0 0 0 0 rgba(245, 158, 11, 0)',
                                    '0 0 0 4px rgba(245, 158, 11, 0.1)',
                                    '0 0 0 0 rgba(245, 158, 11, 0)'
                                  ]
                                }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity,
                                  repeatDelay: 0.5
                                }}
                              />
                            </motion.div>
                            
                            <div className="flex flex-col ml-1.5">
                              <div className="flex items-baseline">
                                <span className={`text-lg font-bold ${test.isFree ? 'line-through text-slate-400 dark:text-slate-500' : colors.color}`}>
                                  {toPersianDigits(test.creditCost)}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">اعتبار</span>
                              </div>
                              {test.isFree && (
                                <span className="text-xs font-bold text-green-500">رایگان</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Enhanced test start button */}
                          <motion.div
                            whileHover={{ scale: canStart ? 1.05 : 1 }}
                            whileTap={{ scale: canStart ? 0.95 : 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button 
                              onClick={() => startTest(test)}
                              disabled={!canStart}
                              className={`relative overflow-hidden ${
                                canStart 
                                  ? `bg-gradient-to-r ${colors.gradient} text-white hover:shadow-lg border-0 shadow-md`
                                  : "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {/* Interior pattern for button */}
                              {canStart && (
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSAxaDR2NEgtMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-20"></div>
                              )}
                              
                              {/* Animated hover effect */}
                              {canStart && (
                                <motion.div 
                                  className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                                  initial={{ x: '-100%' }}
                                  whileHover={{ x: '100%' }}
                                  transition={{ duration: 0.6 }}
                                />
                              )}
                              
                              {/* Icon animation */}
                              <motion.div
                                animate={
                                  canStart 
                                    ? { rotate: [0, 10, 0, -10, 0], scale: [1, 1.1, 1] } 
                                    : {}
                                }
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                className="mr-1 relative z-10"
                              >
                                {!canStart ? (
                                  <LockKeyhole className="h-4 w-4 ml-1.5" />
                                ) : (
                                  <Timer className="h-4 w-4 ml-1.5" />
                                )}
                              </motion.div>
                              
                              <span className="relative z-10">شروع تست</span>
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          )}
        </Tabs>
      </div>
      
      {/* Enhanced Recent Test History with visual improvements */}
      <div className="mb-10 relative">
        {/* Background decorative elements */}
        <div className="absolute -top-20 -left-10 w-80 h-80 bg-gradient-radial from-indigo-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-radial from-fuchsia-500/5 to-transparent rounded-full blur-3xl"></div>
        
        {/* Section title with animation */}
        <motion.div 
          className="flex items-center mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-10 w-10 rounded-xl p-0.5 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden shadow-lg shadow-indigo-500/10 mr-3">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxwYXRoIGQ9Ik0tMSAxaDR2NEgtMXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"></div>
            <div className="absolute inset-0.5 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600"></div>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-indigo-400/80 to-purple-500/80 opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <History className="h-5 w-5 text-white drop-shadow-lg" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-600">
            تاریخچه آزمون‌های روانشناختی
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
            />
          </h2>
          
          <div className="ml-auto flex space-x-2 space-x-reverse">
            <motion.div 
              className="relative h-1.5 w-8 bg-indigo-500/20 rounded-full overflow-hidden"
              whileHover={{ width: '32px' }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>
        
        <GlassCard className="p-6 relative backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-xl overflow-hidden">
          {/* Decorative pattern background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTS0xMyAxM2gyNnYyNmgtMjZ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-30"></div>
          
          {/* Gradient background effects */}
          <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
            <motion.div 
              className="absolute top-0 h-full w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 4, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </div>
          
          {userTestHistory.length > 0 ? (
            <div className="relative z-10">
              <div className="mb-6 flex justify-between items-center">
                <div className="flex items-center">
                  <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 mr-1.5">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-1"
                    />
                    {toPersianDigits(userTestHistory.length)} آزمون
                  </Badge>
                  <span className="text-sm text-slate-500 dark:text-slate-400">آخرین آزمون: {userTestHistory[0].date}</span>
                </div>
                <Button variant="outline" size="sm" className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                  <History className="h-3.5 w-3.5 ml-1.5" />
                  مشاهده همه
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {userTestHistory.map((history, index) => {
                  // Define a color scheme based on index for varied cards
                  const getCardColor = () => {
                    switch(index % 5) {
                      case 0: return { 
                        border: "border-indigo-200/40 dark:border-indigo-800/20", 
                        badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
                        glow: "from-indigo-500/5", 
                        text: "text-indigo-600 dark:text-indigo-400",
                        hover: "group-hover:border-indigo-300 dark:group-hover:border-indigo-700"
                      };
                      case 1: return { 
                        border: "border-fuchsia-200/40 dark:border-fuchsia-800/20", 
                        badge: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400", 
                        glow: "from-fuchsia-500/5",
                        text: "text-fuchsia-600 dark:text-fuchsia-400",
                        hover: "group-hover:border-fuchsia-300 dark:group-hover:border-fuchsia-700"
                      };
                      case 2: return { 
                        border: "border-tiffany/20 dark:border-tiffany/10", 
                        badge: "bg-tiffany/10 text-tiffany dark:text-tiffany-light",
                        glow: "from-tiffany/5", 
                        text: "text-tiffany dark:text-tiffany-light",
                        hover: "group-hover:border-tiffany/40 dark:group-hover:border-tiffany/20"
                      };
                      case 3: return { 
                        border: "border-amber-200/40 dark:border-amber-800/20", 
                        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                        glow: "from-amber-500/5", 
                        text: "text-amber-600 dark:text-amber-400",
                        hover: "group-hover:border-amber-300 dark:group-hover:border-amber-700"
                      };
                      default: return { 
                        border: "border-violet-200/40 dark:border-violet-800/20", 
                        badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
                        glow: "from-violet-500/5", 
                        text: "text-violet-600 dark:text-violet-400",
                        hover: "group-hover:border-violet-300 dark:group-hover:border-violet-700"
                      };
                    }
                  };
                  
                  const colors = getCardColor();
                  
                  // Get nice icons for different test types
                  const getTestIcon = () => {
                    if (history.testTitle.includes("MBTI")) return <UserCircle2 className="h-5 w-5" />;
                    if (history.testTitle.includes("هوش")) return <HeartHandshake className="h-5 w-5" />;
                    if (history.testTitle.includes("استرس")) return <ClipboardCheck className="h-5 w-5" />;
                    if (history.testTitle.includes("سلامت")) return <Brain className="h-5 w-5" />;
                    if (history.testTitle.includes("شغلی")) return <Award className="h-5 w-5" />;
                    if (history.testTitle.includes("ارتباط")) return <Share2 className="h-5 w-5" />;
                    if (history.testTitle.includes("انیاگرام")) return <ScrollText className="h-5 w-5" />;
                    return <Brain className="h-5 w-5" />;
                  };
                  
                  return (
                    <motion.div
                      key={history.id}
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <div className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-5 border ${colors.border} ${colors.hover} shadow-lg transition-all duration-300 relative overflow-hidden h-full`}>
                        {/* Decorative background glow */}
                        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-radial ${colors.glow} to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                        
                        {/* Date badge */}
                        <Badge variant="outline" className={`absolute top-4 left-4 ${colors.badge}`}>
                          {history.date}
                        </Badge>
                        
                        {/* Test title with icon */}
                        <div className="flex items-start mb-6 mt-2">
                          <div className={`p-2 rounded-lg ${colors.badge} flex-shrink-0 mr-3`}>
                            <motion.div
                              animate={{ 
                                rotate: [0, 5, 0, -5, 0]
                              }}
                              transition={{ duration: 4, repeat: Infinity }}
                            >
                              {getTestIcon()}
                            </motion.div>
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-1">{history.testTitle}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              برگزار شده در تاریخ {history.date}
                            </p>
                          </div>
                        </div>
                        
                        {/* Results displayed in elegant cards */}
                        <div className="space-y-4 mb-6">
                          {history.result && (
                            <div className="bg-slate-50/80 dark:bg-slate-900/50 p-3 rounded-lg relative overflow-hidden">
                              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Award className="h-4 w-4 text-slate-400 mr-2" />
                                  <span className="text-sm text-slate-500 dark:text-slate-400">نتیجه:</span>
                                </div>
                                <span className={`font-bold ${colors.text}`}>{history.result}</span>
                              </div>
                            </div>
                          )}
                          
                          {history.score && (
                            <div className="bg-slate-50/80 dark:bg-slate-900/50 p-3 rounded-lg relative overflow-hidden">
                              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Sparkles className="h-4 w-4 text-slate-400 mr-2" />
                                  <span className="text-sm text-slate-500 dark:text-slate-400">امتیاز:</span>
                                </div>
                                <div className="flex items-center">
                                  <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                  >
                                    <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 ml-1" />
                                  </motion.div>
                                  <span className={`font-bold ${colors.text}`}>{history.score}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Additional stats - created dynamically based on test type */}
                          <div className="bg-slate-50/80 dark:bg-slate-900/50 p-3 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-slate-400 mr-2" />
                                <span className="text-sm text-slate-500 dark:text-slate-400">زمان:</span>
                              </div>
                              <span className="text-sm font-medium">
                                {index === 0 ? '15 دقیقه' : index === 1 ? '9 دقیقه' : '12 دقیقه'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action buttons with animation and hover effects */}
                        <div className="flex space-x-2 space-x-reverse">
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full"
                          >
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full bg-white/80 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                              <ScrollText className="h-3.5 w-3.5 ml-1.5" />
                              جزئیات کامل
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="w-10 h-9 p-0 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <motion.div 
              className="text-center py-10 px-4 relative z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-radial from-indigo-500/10 to-transparent rounded-full blur-xl"></div>
                <div className="relative w-full h-full rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center shadow-xl">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <Brain className="h-12 w-12 text-indigo-400/70 dark:text-indigo-500/50" />
                  </motion.div>
                </div>
                <motion.div 
                  className="absolute inset-0 rounded-full"
                  animate={{ 
                    boxShadow: [
                      '0 0 0 0 rgba(99, 102, 241, 0)',
                      '0 0 0 8px rgba(99, 102, 241, 0.1)',
                      '0 0 0 0 rgba(99, 102, 241, 0)'
                    ]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    ease: "easeInOut", 
                    repeat: Infinity
                  }}
                />
              </div>
              
              <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">تاکنون آزمونی انجام نداده‌اید</h3>
              
              <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
                با شرکت در آزمون‌های روانشناختی، خود را بهتر بشناسید و به رشد شخصی و شغلی خود کمک کنید. نتایج آزمون‌ها به صورت محرمانه نگهداری می‌شوند.
              </p>
              
              <div className="flex justify-center space-x-3 space-x-reverse">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 shadow-md hover:shadow-lg">
                    <Sparkles className="h-4 w-4 ml-1.5" />
                    انجام اولین آزمون
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" className="border-slate-200 dark:border-slate-700">
                    <CheckCircle2 className="h-4 w-4 ml-1.5" />
                    مشاهده تست‌های رایگان
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </div>
      
      {/* Confirm Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>شروع آزمون {selectedTest?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {!selectedTest?.isFree && (
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-300">
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 ml-2" />
                    <span>از اعتبار شما <span className="font-bold">{selectedTest?.creditCost}</span> واحد کسر خواهد شد.</span>
                  </div>
                </div>
              )}
              
              <p>این آزمون شامل {selectedTest?.questionsCount} سوال است و حدود {selectedTest?.timeRequired} دقیقه زمان نیاز دارد.</p>
              <p className="mt-2">آیا مایل به شروع آزمون هستید؟</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStartTest}>
              <Timer className="h-4 w-4 ml-1" />
              شروع آزمون
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}