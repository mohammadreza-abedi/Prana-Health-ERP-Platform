import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Heart, 
  Sparkles, 
  Search, 
  Filter, 
  Clock, 
  BarChart3, 
  Trophy,
  Check,
  Star,
  ChevronRight,
  ChevronsUpDown,
  ArrowRight,
  Share2,
  BookOpen,
  Download,
  BarChart4,
  Activity,
  User,
  Users,
  Briefcase,
  Home,
  GraduationCap,
  HeartHandshake,
  CircleOff,
  Play,
  MessagesSquare
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// تعریف انواع تست‌های روانشناسی
interface TestCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// تعریف تست‌های روانشناسی
interface PsychologicalTest {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  timeMinutes: number;
  questions: number;
  color: string;
  icon: React.ReactNode;
  popularity: number; // از 1 تا 100
  difficulty: "آسان" | "متوسط" | "پیشرفته";
  tags: string[];
  isPremium?: boolean;
  isCompleted?: boolean;
  result?: string;
}

// دسته‌بندی‌های اصلی تست‌ها
const testCategories: TestCategory[] = [
  {
    id: "personality",
    name: "شخصیت‌شناسی",
    description: "شناخت خودتان و ویژگی‌های شخصیتی",
    icon: <User className="h-5 w-5" />,
    color: "purple"
  },
  {
    id: "emotional",
    name: "هوش هیجانی",
    description: "ارزیابی توانایی درک و مدیریت احساسات",
    icon: <Heart className="h-5 w-5" />,
    color: "rose"
  },
  {
    id: "cognitive",
    name: "شناختی و ذهنی",
    description: "سنجش استعدادها و توانایی‌های ذهنی",
    icon: <Brain className="h-5 w-5" />,
    color: "indigo"
  },
  {
    id: "career",
    name: "شغلی و حرفه‌ای",
    description: "راهنمایی برای انتخاب مسیر شغلی مناسب",
    icon: <Briefcase className="h-5 w-5" />,
    color: "yellow"
  },
  {
    id: "relationship",
    name: "روابط بین‌فردی",
    description: "بهبود مهارت‌های ارتباطی و اجتماعی",
    icon: <Users className="h-5 w-5" />,
    color: "blue"
  },
  {
    id: "health",
    name: "سلامت روان",
    description: "ارزیابی استرس، اضطراب و سلامت ذهنی",
    icon: <Activity className="h-5 w-5" />,
    color: "tiffany"
  },
  {
    id: "lifestyle",
    name: "سبک زندگی",
    description: "بررسی عادت‌ها و روش‌های زندگی",
    icon: <Home className="h-5 w-5" />,
    color: "emerald"
  },
  {
    id: "educational",
    name: "تحصیلی و آموزشی",
    description: "راهنمایی برای مسیر تحصیلی و یادگیری",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "aqua"
  }
];

// تست‌های روانشناسی
const psychologicalTests: PsychologicalTest[] = [
  {
    id: 1,
    title: "تست شخصیت MBTI",
    shortDescription: "شناسایی 16 تیپ شخصیتی",
    description: "تست MBTI (شاخص نوع‌شناسی مایرز-بریگز) افراد را در چهار بعد دسته‌بندی می‌کند: برون‌گرایی/درون‌گرایی، حسی/شهودی، فکری/احساسی، و قضاوتی/ادراکی. این تست به شما می‌گوید شما یکی از 16 تیپ شخصیتی ممکن هستید.",
    category: "personality",
    timeMinutes: 30,
    questions: 70,
    color: "purple",
    icon: <User className="h-6 w-6" />,
    popularity: 95,
    difficulty: "متوسط",
    tags: ["تیپ شخصیت", "خودشناسی", "برون‌گرایی", "درون‌گرایی"],
  },
  {
    id: 2,
    title: "تست هوش هیجانی (EQ)",
    shortDescription: "سنجش توانایی درک و مدیریت احساسات",
    description: "تست هوش هیجانی (EQ) توانایی شما در شناخت، درک و مدیریت احساسات خود و دیگران را ارزیابی می‌کند. این تست پنج مهارت کلیدی را اندازه‌گیری می‌کند: خودآگاهی، خودتنظیمی، انگیزش، همدلی و مهارت‌های اجتماعی.",
    category: "emotional",
    timeMinutes: 25,
    questions: 50,
    color: "rose",
    icon: <Heart className="h-6 w-6" />,
    popularity: 90,
    difficulty: "متوسط",
    tags: ["احساسات", "همدلی", "مدیریت استرس"],
    isCompleted: true,
    result: "87/100"
  },
  {
    id: 3,
    title: "آزمون شخصیت بزرگ پنج (Big Five)",
    shortDescription: "پنج ویژگی اصلی شخصیت",
    description: "آزمون شخصیت بزرگ پنج (Big Five) پنج بعد اصلی شخصیت را اندازه‌گیری می‌کند: روان‌رنجوری، برون‌گرایی، گشودگی به تجربه، توافق‌پذیری و وظیفه‌شناسی. این تست یکی از معتبرترین مدل‌های شخصیت‌شناسی در روانشناسی است.",
    category: "personality",
    timeMinutes: 20,
    questions: 44,
    color: "purple",
    icon: <User className="h-6 w-6" />,
    popularity: 85,
    difficulty: "آسان",
    tags: ["شخصیت", "خودشناسی", "روانشناسی علمی"],
  },
  {
    id: 4,
    title: "تست سبک یادگیری VARK",
    shortDescription: "کشف روش یادگیری شخصی شما",
    description: "تست سبک یادگیری VARK سبک‌های ترجیحی شما در دریافت و پردازش اطلاعات را مشخص می‌کند: دیداری (Visual)، شنیداری (Auditory)، خواندن/نوشتن (Read/Write) و جنبشی (Kinesthetic). دانستن این ترجیحات به شما کمک می‌کند روش‌های مطالعه و یادگیری خود را بهینه کنید.",
    category: "educational",
    timeMinutes: 15,
    questions: 16,
    color: "aqua",
    icon: <BookOpen className="h-6 w-6" />,
    popularity: 75,
    difficulty: "آسان",
    tags: ["یادگیری", "آموزش", "مطالعه", "پیشرفت تحصیلی"],
  },
  {
    id: 5,
    title: "ارزیابی استرس شغلی",
    shortDescription: "میزان استرس در محیط کار",
    description: "این تست منابع استرس در محیط کار و نحوه مقابله شما با آن‌ها را ارزیابی می‌کند. فاکتورهایی مانند حجم کار، کنترل، روابط، تغییرات و نقش سازمانی را بررسی می‌کند و استراتژی‌هایی برای مدیریت بهتر استرس ارائه می‌دهد.",
    category: "health",
    timeMinutes: 18,
    questions: 30,
    color: "tiffany",
    icon: <Activity className="h-6 w-6" />,
    popularity: 80,
    difficulty: "متوسط",
    tags: ["استرس", "سلامت روان", "محیط کار", "تعادل کار و زندگی"],
  },
  {
    id: 6,
    title: "تست ارزش‌های شغلی",
    shortDescription: "کشف ارزش‌های کاری شما",
    description: "تست ارزش‌های شغلی به شما کمک می‌کند تا ارزش‌هایی که در محیط کار برای شما مهم هستند را شناسایی کنید: خلاقیت، امنیت، استقلال، همکاری، رهبری، توازن کار-زندگی و غیره. این تست به شما در انتخاب مسیر شغلی سازگار با ارزش‌های شخصی کمک می‌کند.",
    category: "career",
    timeMinutes: 15,
    questions: 36,
    color: "yellow",
    icon: <Briefcase className="h-6 w-6" />,
    popularity: 78,
    difficulty: "متوسط",
    tags: ["ارزش‌ها", "مسیر شغلی", "رضایت شغلی"],
  },
  {
    id: 7,
    title: "آزمون سبک ارتباطی",
    shortDescription: "نحوه ارتباط برقرار کردن با دیگران",
    description: "آزمون سبک ارتباطی نحوه تعامل و ارتباط شما با دیگران را بررسی می‌کند. سبک‌های ارتباطی مختلف شامل قاطعانه، منفعلانه، پرخاشگرانه و منفعل-پرخاشگرانه را ارزیابی می‌کند و به شما کمک می‌کند تا مهارت‌های ارتباطی خود را بهبود بخشید.",
    category: "relationship",
    timeMinutes: 20,
    questions: 28,
    color: "blue",
    icon: <MessagesSquare className="h-6 w-6" />,
    popularity: 75,
    difficulty: "آسان",
    tags: ["ارتباطات", "روابط بین‌فردی", "مهارت‌های اجتماعی"],
  },
  {
    id: 8,
    title: "آزمون استرس ادراک شده",
    shortDescription: "میزان استرس در زندگی روزمره",
    description: "آزمون استرس ادراک شده میزان استرس تجربه شده توسط شما در ماه گذشته را اندازه‌گیری می‌کند. این تست به شما کمک می‌کند تا منابع استرس‌زا و تأثیر آن‌ها بر سلامت جسمی و روانی خود را شناسایی کنید.",
    category: "health",
    timeMinutes: 10,
    questions: 14,
    color: "tiffany",
    icon: <Activity className="h-6 w-6" />,
    popularity: 82,
    difficulty: "آسان",
    tags: ["استرس", "سلامت روان", "مدیریت استرس"],
    isCompleted: true,
    result: "متوسط"
  },
  {
    id: 9,
    title: "تست هوش هیجانی اجتماعی",
    shortDescription: "توانایی درک احساسات در تعاملات اجتماعی",
    description: "تست هوش هیجانی اجتماعی توانایی شما در درک و مدیریت احساسات در موقعیت‌های اجتماعی را ارزیابی می‌کند. این تست مهارت‌های شناخت اجتماعی، آگاهی اجتماعی و مدیریت روابط را بررسی می‌کند.",
    category: "emotional",
    timeMinutes: 25,
    questions: 40,
    color: "rose",
    icon: <Heart className="h-6 w-6" />,
    popularity: 80,
    difficulty: "متوسط",
    tags: ["هوش هیجانی", "روابط اجتماعی", "همدلی"],
    isPremium: true
  },
  {
    id: 10,
    title: "تست سبک زندگی سالم",
    shortDescription: "ارزیابی عادت‌های سالم در زندگی روزمره",
    description: "تست سبک زندگی سالم عادت‌های شما در زمینه‌های تغذیه، فعالیت بدنی، خواب، مدیریت استرس و روابط اجتماعی را ارزیابی می‌کند. این تست به شما کمک می‌کند تا زمینه‌هایی که نیاز به بهبود دارند را شناسایی کنید.",
    category: "lifestyle",
    timeMinutes: 15,
    questions: 35,
    color: "emerald",
    icon: <Home className="h-6 w-6" />,
    popularity: 78,
    difficulty: "آسان",
    tags: ["سلامتی", "تغذیه", "ورزش", "عادت‌های سالم"],
    isCompleted: true,
    result: "72/100"
  },
  {
    id: 11,
    title: "آزمون سبک مقابله با استرس",
    shortDescription: "نحوه مواجهه با شرایط استرس‌زا",
    description: "آزمون سبک مقابله با استرس روش‌های مختلفی که شما برای مقابله با استرس استفاده می‌کنید را ارزیابی می‌کند. سبک‌های مقابله‌ای مختلف شامل مسأله‌محور، هیجان‌محور و اجتنابی را بررسی می‌کند و به شما کمک می‌کند استراتژی‌های مؤثرتری برای مدیریت استرس بیاموزید.",
    category: "health",
    timeMinutes: 20,
    questions: 28,
    color: "tiffany",
    icon: <Activity className="h-6 w-6" />,
    popularity: 76,
    difficulty: "متوسط",
    tags: ["استرس", "سلامت روان", "مقابله با مشکلات"],
  },
  {
    id: 12,
    title: "تست خلاقیت تورنس",
    shortDescription: "سنجش تفکر خلاق و نوآوری",
    description: "تست خلاقیت تورنس توانایی‌های خلاقانه شما را در چهار بعد سیالی (تعداد ایده‌ها)، انعطاف‌پذیری (تنوع ایده‌ها)، اصالت (منحصر به فرد بودن) و بسط (جزئیات) ارزیابی می‌کند. این تست یکی از معتبرترین ابزارهای سنجش خلاقیت است.",
    category: "cognitive",
    timeMinutes: 35,
    questions: 25,
    color: "indigo",
    icon: <Sparkles className="h-6 w-6" />,
    popularity: 75,
    difficulty: "پیشرفته",
    tags: ["خلاقیت", "نوآوری", "حل مسأله", "تفکر واگرا"],
    isPremium: true
  },
  {
    id: 13,
    title: "تست هوش چندگانه گاردنر",
    shortDescription: "شناسایی انواع هوش‌های شما",
    description: "تست هوش چندگانه گاردنر هشت نوع هوش مختلف را ارزیابی می‌کند: زبانی، منطقی-ریاضی، فضایی، موسیقیایی، بدنی-جنبشی، طبیعت‌گرا، درون‌فردی و برون‌فردی. این تست به شما کمک می‌کند تا نقاط قوت و استعدادهای خود را بشناسید.",
    category: "cognitive",
    timeMinutes: 30,
    questions: 64,
    color: "indigo",
    icon: <Brain className="h-6 w-6" />,
    popularity: 85,
    difficulty: "متوسط",
    tags: ["هوش", "استعداد", "یادگیری", "آموزش"],
  },
  {
    id: 14,
    title: "آزمون سبک دلبستگی",
    shortDescription: "الگوهای ارتباطی عاطفی شما",
    description: "آزمون سبک دلبستگی الگوهای ارتباط عاطفی شما با دیگران را بررسی می‌کند. چهار سبک دلبستگی اصلی شامل ایمن، اضطرابی، اجتنابی و آشفته را ارزیابی می‌کند و به شما کمک می‌کند تا الگوهای ارتباطی خود را بهتر درک کنید.",
    category: "relationship",
    timeMinutes: 20,
    questions: 36,
    color: "blue",
    icon: <HeartHandshake className="h-6 w-6" />,
    popularity: 78,
    difficulty: "متوسط",
    tags: ["روابط", "دلبستگی", "عاطفه", "روانشناسی"],
  },
  {
    id: 15,
    title: "ارزیابی جامع شخصیت (CPI)",
    shortDescription: "تصویر کامل از ویژگی‌های شخصیتی",
    description: "ارزیابی جامع شخصیت (CPI) یک تصویر کامل از ویژگی‌های شخصیتی شما در ابعاد مختلف ارائه می‌دهد. این تست ویژگی‌هایی مانند اعتماد به نفس، مسئولیت‌پذیری، استقلال، همدلی، خودکنترلی و بسیاری موارد دیگر را ارزیابی می‌کند.",
    category: "personality",
    timeMinutes: 45,
    questions: 90,
    color: "purple",
    icon: <User className="h-6 w-6" />,
    popularity: 75,
    difficulty: "پیشرفته",
    tags: ["شخصیت", "خودشناسی", "روانشناسی جامع"],
    isPremium: true
  },
  {
    id: 16,
    title: "تست سبک رهبری",
    shortDescription: "شناسایی شیوه مدیریت و رهبری شما",
    description: "تست سبک رهبری روش‌های مدیریت و رهبری ترجیحی شما را ارزیابی می‌کند. این تست سبک‌های مختلف رهبری مانند تحول‌گرا، تبادلی، مشارکتی، دستوری و غیره را بررسی می‌کند و به شما کمک می‌کند تا مهارت‌های رهبری خود را توسعه دهید.",
    category: "career",
    timeMinutes: 25,
    questions: 42,
    color: "yellow",
    icon: <Trophy className="h-6 w-6" />,
    popularity: 72,
    difficulty: "متوسط",
    tags: ["رهبری", "مدیریت", "کسب‌وکار", "تیم‌سازی"],
  },
  {
    id: 17,
    title: "آزمون سلامت روان (MHQ)",
    shortDescription: "ارزیابی جامع وضعیت سلامت روان",
    description: "آزمون سلامت روان (MHQ) وضعیت کلی سلامت روان شما را در ابعاد مختلف ارزیابی می‌کند. این تست جنبه‌های مختلف سلامت روان شامل خلق، اضطراب، استرس، سازگاری و بهزیستی کلی را بررسی می‌کند و توصیه‌هایی برای بهبود سلامت روان ارائه می‌دهد.",
    category: "health",
    timeMinutes: 30,
    questions: 60,
    color: "tiffany",
    icon: <Activity className="h-6 w-6" />,
    popularity: 86,
    difficulty: "متوسط",
    tags: ["سلامت روان", "بهزیستی", "خودمراقبتی"],
  },
  {
    id: 18,
    title: "آزمون تفکر انتقادی واتسون-گلیسر",
    shortDescription: "توانایی تحلیل منطقی و ارزیابی اطلاعات",
    description: "آزمون تفکر انتقادی واتسون-گلیسر توانایی شما در تفکر منطقی، تحلیل اطلاعات و استدلال را ارزیابی می‌کند. این تست مهارت‌های استنباط، تشخیص فرضیات، استنتاج، تفسیر و ارزیابی استدلال‌ها را بررسی می‌کند.",
    category: "cognitive",
    timeMinutes: 40,
    questions: 40,
    color: "indigo",
    icon: <Brain className="h-6 w-6" />,
    popularity: 70,
    difficulty: "پیشرفته",
    tags: ["تفکر انتقادی", "منطق", "استدلال", "تحلیل"],
    isPremium: true
  },
  {
    id: 19,
    title: "تست سبک تصمیم‌گیری",
    shortDescription: "نحوه تصمیم‌گیری در موقعیت‌های مختلف",
    description: "تست سبک تصمیم‌گیری روش‌های ترجیحی شما برای گرفتن تصمیمات را ارزیابی می‌کند. این تست سبک‌های مختلف تصمیم‌گیری مانند منطقی، شهودی، وابسته، اجتنابی و آنی را بررسی می‌کند و به شما کمک می‌کند تا فرآیند تصمیم‌گیری خود را بهبود بخشید.",
    category: "cognitive",
    timeMinutes: 20,
    questions: 25,
    color: "indigo",
    icon: <Brain className="h-6 w-6" />,
    popularity: 75,
    difficulty: "متوسط",
    tags: ["تصمیم‌گیری", "حل مسأله", "مدیریت"],
  },
  {
    id: 20,
    title: "تست سبک یادگیری کلب",
    shortDescription: "چرخه یادگیری و ترجیحات شما",
    description: "تست سبک یادگیری کلب چهار سبک یادگیری را ارزیابی می‌کند: همگرا، واگرا، جذب‌کننده و تطبیق‌دهنده. این تست بر اساس چرخه یادگیری تجربی کلب است و به شما کمک می‌کند تا روش یادگیری خود را بهینه‌سازی کنید.",
    category: "educational",
    timeMinutes: 15,
    questions: 20,
    color: "aqua",
    icon: <BookOpen className="h-6 w-6" />,
    popularity: 74,
    difficulty: "آسان",
    tags: ["یادگیری", "آموزش", "پیشرفت تحصیلی"],
  },
  {
    id: 21,
    title: "آزمون هوش هیجانی در محیط کار",
    shortDescription: "مدیریت احساسات در فضای شغلی",
    description: "آزمون هوش هیجانی در محیط کار توانایی شما در درک و مدیریت احساسات در موقعیت‌های کاری را ارزیابی می‌کند. این تست مهارت‌های ارتباطی، مدیریت استرس، حل تعارض و رهبری عاطفی را در محیط کار بررسی می‌کند.",
    category: "career",
    timeMinutes: 25,
    questions: 35,
    color: "yellow",
    icon: <Briefcase className="h-6 w-6" />,
    popularity: 80,
    difficulty: "متوسط",
    tags: ["هوش هیجانی", "محیط کار", "روابط حرفه‌ای"],
  },
  {
    id: 22,
    title: "تست تاب‌آوری",
    shortDescription: "توانایی سازگاری با چالش‌ها",
    description: "تست تاب‌آوری توانایی شما در سازگاری با استرس، بازیابی از دشواری‌ها و رشد از طریق چالش‌ها را ارزیابی می‌کند. این تست عوامل مختلف تاب‌آوری شامل خودکارآمدی، خوش‌بینی، انعطاف‌پذیری و معناجویی را بررسی می‌کند.",
    category: "health",
    timeMinutes: 15,
    questions: 25,
    color: "tiffany",
    icon: <Activity className="h-6 w-6" />,
    popularity: 82,
    difficulty: "آسان",
    tags: ["تاب‌آوری", "سلامت روان", "مقابله با استرس"],
  },
  {
    id: 23,
    title: "آزمون ارزش‌های شخصی",
    shortDescription: "شناسایی اولویت‌های ارزشی شما",
    description: "آزمون ارزش‌های شخصی اولویت‌های ارزشی شما را در زندگی شناسایی می‌کند. این تست ارزش‌های مختلف مانند موفقیت، قدرت، همنوایی، سنت، خیرخواهی، جهان‌گرایی، خودمختاری و امنیت را ارزیابی می‌کند و به شما کمک می‌کند تا زندگی سازگار با ارزش‌های خود داشته باشید.",
    category: "personality",
    timeMinutes: 20,
    questions: 40,
    color: "purple",
    icon: <Star className="h-6 w-6" />,
    popularity: 78,
    difficulty: "متوسط",
    tags: ["ارزش‌ها", "معنای زندگی", "هویت", "خودشناسی"],
  },
  {
    id: 24,
    title: "تست سبک مدیریت تعارض",
    shortDescription: "نحوه مواجهه با اختلافات و تعارضات",
    description: "تست سبک مدیریت تعارض نحوه برخورد شما با اختلافات و تعارضات را ارزیابی می‌کند. این تست پنج سبک اصلی مدیریت تعارض شامل رقابتی، همکارانه، مصالحه‌جویانه، اجتنابی و سازشی را بررسی می‌کند و به شما کمک می‌کند تا روش مؤثرتری برای حل تعارضات بیاموزید.",
    category: "relationship",
    timeMinutes: 15,
    questions: 30,
    color: "blue",
    icon: <Users className="h-6 w-6" />,
    popularity: 76,
    difficulty: "متوسط",
    tags: ["حل تعارض", "روابط", "ارتباطات", "مذاکره"],
  },
  {
    id: 25,
    title: "آزمون باورهای اساسی",
    shortDescription: "کشف باورهای زیربنایی ذهن",
    description: "آزمون باورهای اساسی دیدگاه‌های زیربنایی شما در مورد خود، دیگران و جهان را شناسایی می‌کند. این تست بر اساس رویکرد شناخت‌درمانی طراحی شده و به شما کمک می‌کند تا باورهای منفی و محدودکننده را شناسایی و بازسازی کنید.",
    category: "health",
    timeMinutes: 25,
    questions: 42,
    color: "tiffany",
    icon: <Brain className="h-6 w-6" />,
    popularity: 72,
    difficulty: "پیشرفته",
    tags: ["شناخت‌درمانی", "باورها", "سلامت روان", "خودشناسی"],
    isPremium: true
  }
];

// کامپوننت کارت تست
const TestCard = ({ test, onClick }: { test: PsychologicalTest, onClick: () => void }) => {
  const getColor = () => {
    const colorMap: Record<string, string> = {
      'purple': 'bg-purple-500',
      'rose': 'bg-rose-500',
      'indigo': 'bg-indigo-500',
      'yellow': 'bg-yellow-500',
      'blue': 'bg-blue-500',
      'tiffany': 'bg-tiffany',
      'emerald': 'bg-emerald-500',
      'aqua': 'bg-aqua'
    };
    return colorMap[test.color] || 'bg-slate-500';
  };
  
  const getBgColor = () => {
    const colorMap: Record<string, string> = {
      'purple': 'bg-purple-50 dark:bg-purple-950/20',
      'rose': 'bg-rose-50 dark:bg-rose-950/20',
      'indigo': 'bg-indigo-50 dark:bg-indigo-950/20',
      'yellow': 'bg-yellow-50 dark:bg-yellow-950/20',
      'blue': 'bg-blue-50 dark:bg-blue-950/20',
      'tiffany': 'bg-tiffany/5 dark:bg-tiffany/10',
      'emerald': 'bg-emerald-50 dark:bg-emerald-950/20',
      'aqua': 'bg-aqua/5 dark:bg-aqua/10'
    };
    return colorMap[test.color] || 'bg-slate-50 dark:bg-slate-800/20';
  };
  
  const getBorderColor = () => {
    const colorMap: Record<string, string> = {
      'purple': 'border-purple-200 dark:border-purple-500/20',
      'rose': 'border-rose-200 dark:border-rose-500/20',
      'indigo': 'border-indigo-200 dark:border-indigo-500/20',
      'yellow': 'border-yellow-200 dark:border-yellow-500/20',
      'blue': 'border-blue-200 dark:border-blue-500/20',
      'tiffany': 'border-tiffany/20',
      'emerald': 'border-emerald-200 dark:border-emerald-500/20',
      'aqua': 'border-aqua/20'
    };
    return colorMap[test.color] || 'border-slate-200 dark:border-slate-700';
  };
  
  const getTextColor = () => {
    const colorMap: Record<string, string> = {
      'purple': 'text-purple-600 dark:text-purple-400',
      'rose': 'text-rose-600 dark:text-rose-400',
      'indigo': 'text-indigo-600 dark:text-indigo-400',
      'yellow': 'text-yellow-600 dark:text-yellow-400',
      'blue': 'text-blue-600 dark:text-blue-400',
      'tiffany': 'text-tiffany',
      'emerald': 'text-emerald-600 dark:text-emerald-400',
      'aqua': 'text-aqua'
    };
    return colorMap[test.color] || 'text-slate-600 dark:text-slate-400';
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-xl border ${getBorderColor()} ${getBgColor()} p-5 cursor-pointer neon-card h-full flex flex-col`}
      onClick={onClick}
    >
      <div className="flex justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${getBgColor()} ${getTextColor()}`}>
          {test.icon}
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          {test.isPremium && (
            <Badge className="bg-amber-500 text-white text-xs">ویژه</Badge>
          )}
          {test.isCompleted && (
            <Badge className="bg-emerald-500 text-white text-xs">انجام شده</Badge>
          )}
        </div>
      </div>
      
      <h3 className={`font-bold text-base ${getTextColor()}`}>{test.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{test.shortDescription}</p>
      
      <div className="flex items-center mt-3 space-x-3 space-x-reverse">
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5 ml-1" />
          {test.timeMinutes} دقیقه
        </div>
        <div className="flex items-center text-xs text-slate-500">
          <Check className="w-3.5 h-3.5 ml-1" />
          {test.questions} سوال
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div>
          {test.isCompleted ? (
            <div className="flex items-center text-sm text-emerald-500">
              <Check className="w-4 h-4 ml-1" />
              {test.result ? `${test.result}` : "تکمیل شده"}
            </div>
          ) : (
            <div className="flex items-center">
              <Badge variant="outline" className={`${getTextColor()} border-${test.color === 'tiffany' ? 'tiffany/30' : test.color + '-300'}`}>
                {test.difficulty}
              </Badge>
            </div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`${getTextColor()} hover:bg-${test.color === 'tiffany' ? 'tiffany/10' : test.color + '-100 dark:hover:bg-' + test.color + '-900/20'}`}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

// کامپوننت دکمه دسته‌بندی
const CategoryButton = ({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: TestCategory, 
  isActive: boolean, 
  onClick: () => void 
}) => {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      className={`px-4 rounded-full ${
        isActive 
          ? `bg-${category.color === 'tiffany' ? 'tiffany' : category.color + '-500'} hover:bg-${category.color === 'tiffany' ? 'tiffany-dark' : category.color + '-600'} text-white` 
          : `hover:bg-${category.color === 'tiffany' ? 'tiffany/10' : category.color + '-100 dark:hover:bg-' + category.color + '-900/20'} text-${category.color === 'tiffany' ? 'tiffany' : category.color + '-500'} border-${category.color === 'tiffany' ? 'tiffany/30' : category.color + '-200 dark:border-' + category.color + '-800'}`
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="ml-2">
          {category.icon}
        </div>
        {category.name}
      </div>
    </Button>
  );
};

// کامپوننت دیالوگ جزئیات تست
const TestDetailDialog = ({ 
  test, 
  isOpen, 
  onClose 
}: { 
  test: PsychologicalTest | null, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  if (!test) return null;
  
  const getColor = () => {
    const colorMap: Record<string, string> = {
      'purple': 'bg-purple-500',
      'rose': 'bg-rose-500',
      'indigo': 'bg-indigo-500',
      'yellow': 'bg-yellow-500',
      'blue': 'bg-blue-500',
      'tiffany': 'bg-tiffany',
      'emerald': 'bg-emerald-500',
      'aqua': 'bg-aqua'
    };
    return colorMap[test.color] || 'bg-slate-500';
  };
  
  const getTextColor = () => {
    const colorMap: Record<string, string> = {
      'purple': 'text-purple-600 dark:text-purple-400',
      'rose': 'text-rose-600 dark:text-rose-400',
      'indigo': 'text-indigo-600 dark:text-indigo-400',
      'yellow': 'text-yellow-600 dark:text-yellow-400',
      'blue': 'text-blue-600 dark:text-blue-400',
      'tiffany': 'text-tiffany',
      'emerald': 'text-emerald-600 dark:text-emerald-400',
      'aqua': 'text-aqua'
    };
    return colorMap[test.color] || 'text-slate-600 dark:text-slate-400';
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <div className={`p-2 rounded-lg ${getColor()} text-white`}>
              {test.icon}
            </div>
            {test.title}
            {test.isPremium && (
              <Badge className="bg-amber-500 text-white">ویژه</Badge>
            )}
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            {test.shortDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
            <Clock className="h-5 w-5 mb-1.5 text-slate-500" />
            <span className="text-sm font-medium">{test.timeMinutes} دقیقه</span>
            <span className="text-xs text-slate-500">زمان تقریبی</span>
          </div>
          
          <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
            <Check className="h-5 w-5 mb-1.5 text-slate-500" />
            <span className="text-sm font-medium">{test.questions} سوال</span>
            <span className="text-xs text-slate-500">تعداد سوالات</span>
          </div>
          
          <div className="flex flex-col items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
            <BarChart3 className="h-5 w-5 mb-1.5 text-slate-500" />
            <span className="text-sm font-medium">{test.difficulty}</span>
            <span className="text-xs text-slate-500">سطح دشواری</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
            <h3 className="font-medium mb-2">توضیحات تست</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {test.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">برچسب‌ها</h3>
            <div className="flex flex-wrap gap-2">
              {test.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">میزان محبوبیت</h3>
            <div className="flex items-center">
              <Progress value={test.popularity} className="h-2" />
              <span className="text-sm ml-2 text-slate-600">{test.popularity}%</span>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose}>
            بازگشت
          </Button>
          
          <Button className={`${getColor()} hover:${getColor()}/90`}>
            شروع آزمون
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// صفحه اصلی تست‌های روانشناسی
export default function PsychologicalTests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTest, setSelectedTest] = useState<PsychologicalTest | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  
  // فیلتر تست‌ها بر اساس جستجو و دسته‌بندی
  const filteredTests = psychologicalTests.filter(test => {
    const matchesSearch = 
      searchQuery === "" || 
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === null || 
      test.category === selectedCategory;
    
    const matchesCompletion = 
      !showCompleted || 
      test.isCompleted;
    
    return matchesSearch && matchesCategory && matchesCompletion;
  });
  
  // باز کردن دیالوگ جزئیات تست
  const handleOpenTestDetail = (test: PsychologicalTest) => {
    setSelectedTest(test);
    setIsDialogOpen(true);
  };
  
  // مدیریت انتخاب دسته‌بندی
  const handleCategorySelect = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };
  
  // رندر محتوای اصلی صفحه
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-2">تست‌های روانشناسی و سلامت</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            مجموعه‌ای از معتبرترین آزمون‌های روانشناختی برای آگاهی بیشتر از خود و ارتقای سلامت روان
          </p>
        </motion.div>
        
        {/* بخش جستجو و فیلتر */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute top-2.5 right-3 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="جستجوی تست..." 
              className="pl-4 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:w-auto w-full">
                <Filter className="h-4 w-4 ml-2" />
                فیلترها
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>فیلتر تست‌ها</SheetTitle>
                <SheetDescription>
                  تست‌های مورد نظر خود را براساس ویژگی‌های مختلف فیلتر کنید.
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-4">
                <h3 className="mb-3 font-medium">دسته‌بندی‌ها</h3>
                <div className="space-y-2">
                  {testCategories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        className="ml-2"
                        checked={selectedCategory === category.id}
                        onChange={() => handleCategorySelect(category.id)}
                      />
                      <label 
                        htmlFor={`category-${category.id}`}
                        className="flex items-center text-sm cursor-pointer"
                      >
                        <div className={`ml-2 w-4 h-4 rounded-full bg-${category.color === 'tiffany' ? 'tiffany' : category.color + '-500'}`}></div>
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="mb-3 font-medium">وضعیت</h3>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="completed-filter"
                    className="ml-2"
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.target.checked)}
                  />
                  <label htmlFor="completed-filter" className="text-sm cursor-pointer">
                    فقط تست‌های تکمیل شده
                  </label>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => {
                    setSelectedCategory(null);
                    setShowCompleted(false);
                  }}>
                    پاک کردن فیلترها
                  </Button>
                  <SheetClose asChild>
                    <Button>اعمال فیلترها</Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Button 
            variant={showCompleted ? "default" : "outline"}
            className={showCompleted ? "bg-emerald-500 hover:bg-emerald-600" : ""}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            <Check className="h-4 w-4 ml-2" />
            تکمیل شده
          </Button>
        </div>
        
        {/* اسکرول افقی دسته‌بندی‌ها */}
        <ScrollArea className="whitespace-nowrap pb-4 mb-6">
          <div className="flex space-x-3 space-x-reverse">
            {testCategories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={selectedCategory === category.id}
                onClick={() => handleCategorySelect(category.id)}
              />
            ))}
          </div>
        </ScrollArea>
        
        {/* نمایش اطلاعات فیلتر */}
        {(selectedCategory || searchQuery || showCompleted) && (
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-slate-500 ml-2">نتایج فیلتر شده:</span>
              {selectedCategory && (
                <Badge variant="outline" className="ml-2">
                  {testCategories.find(c => c.id === selectedCategory)?.name}
                  <button 
                    className="mr-1 hover:text-rose-500"
                    onClick={() => setSelectedCategory(null)}
                  >
                    <CircleOff className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="outline" className="ml-2">
                  {searchQuery}
                  <button 
                    className="mr-1 hover:text-rose-500"
                    onClick={() => setSearchQuery("")}
                  >
                    <CircleOff className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {showCompleted && (
                <Badge variant="outline" className="ml-2">
                  تست‌های تکمیل شده
                  <button 
                    className="mr-1 hover:text-rose-500"
                    onClick={() => setShowCompleted(false)}
                  >
                    <CircleOff className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
            <span className="text-sm text-slate-500">{filteredTests.length} تست یافت شد</span>
          </div>
        )}
      </div>
      
      {/* تب‌های اصلی */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full sm:w-auto grid-cols-3 h-auto">
          <TabsTrigger value="all" className="flex items-center">
            <Brain className="h-4 w-4 ml-2" />
            <span>همه تست‌ها</span>
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex items-center">
            <Star className="h-4 w-4 ml-2" />
            <span>محبوب‌ترین‌ها</span>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center">
            <Check className="h-4 w-4 ml-2" />
            <span>تکمیل شده</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {filteredTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  onClick={() => handleOpenTestDetail(test)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <CircleOff className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">تستی یافت نشد</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                با تغییر معیارهای جستجو یا فیلترها، می‌توانید تست‌های دیگری را مشاهده کنید.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setShowCompleted(false);
                }}
              >
                پاک کردن همه فیلترها
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="popular" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {psychologicalTests
              .filter(test => test.popularity >= 80)
              .sort((a, b) => b.popularity - a.popularity)
              .map((test) => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  onClick={() => handleOpenTestDetail(test)}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          {psychologicalTests.filter(test => test.isCompleted).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {psychologicalTests
                .filter(test => test.isCompleted)
                .map((test) => (
                  <TestCard 
                    key={test.id} 
                    test={test} 
                    onClick={() => handleOpenTestDetail(test)}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Play className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">هنوز تستی تکمیل نشده است</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                با تکمیل تست‌های روانشناسی، نتایج آن‌ها در این بخش نمایش داده می‌شوند.
              </p>
              <Button className="mt-4">
                شروع اولین تست
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* پیشنهادهای ویژه */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Sparkles className="h-5 w-5 ml-2 text-amber-500" />
          پیشنهادهای ویژه برای شما
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {psychologicalTests
            .filter(test => test.isPremium)
            .slice(0, 3)
            .map((test) => (
              <Card key={test.id} className="neon-card">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <div className={`p-2 rounded-lg bg-${test.color === 'tiffany' ? 'tiffany/10' : test.color + '-50 dark:bg-' + test.color + '-950/20'} text-${test.color === 'tiffany' ? 'tiffany' : test.color + '-500'} ml-2`}>
                      {test.icon}
                    </div>
                    {test.title}
                  </CardTitle>
                  <CardDescription>{test.shortDescription}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {test.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge className="bg-amber-500">ویژه</Badge>
                    <Badge variant="outline">{test.questions} سوال</Badge>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleOpenTestDetail(test)}
                  >
                    شروع تست
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
      
      {/* اطلاعات کمکی */}
      <div className="mb-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>تست‌های روانشناسی چگونه به من کمک می‌کنند؟</AccordionTrigger>
            <AccordionContent>
              <p className="text-slate-600 dark:text-slate-400">
                تست‌های روانشناسی ابزارهایی هستند که به شما کمک می‌کنند خود، نقاط قوت، ضعف، ترجیحات و الگوهای رفتاری‌تان را بهتر بشناسید. این تست‌ها به شما بینش‌های ارزشمندی درباره شخصیت، هوش هیجانی، سبک‌های یادگیری، استعدادها و مهارت‌های شما ارائه می‌دهند. با این اطلاعات می‌توانید تصمیمات آگاهانه‌تری در زندگی شخصی و حرفه‌ای خود بگیرید، روابط بهتری برقرار کنید و مسیر توسعه فردی مناسب‌تری را انتخاب کنید.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>آیا نتایج این تست‌ها دقیق و معتبر هستند؟</AccordionTrigger>
            <AccordionContent>
              <p className="text-slate-600 dark:text-slate-400">
                تست‌های ارائه شده در این پلتفرم بر اساس نظریه‌ها و مدل‌های علمی معتبر در روانشناسی طراحی شده‌اند. با این حال، هیچ تست روانشناسی 100% دقیق و قطعی نیست. نتایج این تست‌ها باید به عنوان راهنما و نقطه شروعی برای خودشناسی بیشتر در نظر گرفته شوند، نه تشخیص قطعی. عوامل متعددی مانند شرایط روحی هنگام پاسخ‌دهی، صداقت در پاسخ‌ها و تفسیر نتایج می‌توانند بر دقت آزمون تأثیر بگذارند. همچنین، برای تشخیص‌های بالینی یا مشکلات جدی روانشناختی، حتماً باید به متخصصان سلامت روان مراجعه کنید.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>چگونه باید به سؤالات تست‌ها پاسخ دهم؟</AccordionTrigger>
            <AccordionContent>
              <p className="text-slate-600 dark:text-slate-400">
                برای دریافت نتایج دقیق‌تر، توصیه می‌شود:
                <ul className="list-disc mr-6 mt-2 space-y-1">
                  <li>با صداقت کامل پاسخ دهید (نه آنگونه که فکر می‌کنید باید باشید)</li>
                  <li>در محیطی آرام و بدون حواس‌پرتی به سؤالات پاسخ دهید</li>
                  <li>به اولین واکنش طبیعی خود اعتماد کنید و زیاد روی هر سؤال توقف نکنید</li>
                  <li>سعی کنید از پاسخ‌های خنثی و میانه مانند "نظری ندارم" زیاد استفاده نکنید</li>
                  <li>پیش از شروع تست، دستورالعمل‌ها را با دقت مطالعه کنید</li>
                </ul>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {/* دیالوگ جزئیات تست */}
      <TestDetailDialog 
        test={selectedTest}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}