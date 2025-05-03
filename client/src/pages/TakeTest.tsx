import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/ui/glass-card";
import { cn, toPersianDigits } from "@/lib/utils";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Crown, 
  AlarmClock,
  BrainCircuit,
  Award,
  Sparkles,
  Lightbulb,
  ThumbsUp,
  Activity
} from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useCredits } from "@/hooks/use-credits";
import { Loader2 } from "lucide-react";

// تعریف انواع تست‌ها
interface Question {
  id: number;
  text: string;
  options: {
    id: number;
    text: string;
    score?: number | { [key: string]: number }; // امتیاز یا امتیازات چند بعدی
  }[];
  imageUrl?: string;
}

interface TestData {
  id: number;
  title: string;
  description: string;
  instructions: string;
  creditCost: number;
  questionsCount: number;
  timeRequired: number;
  questions: Question[];
  resultType: string;
  resultInterpretation: {
    [key: string]: {
      title: string;
      description: string;
      advice: string;
    }
  } | {
    ranges: {
      min: number;
      max: number;
      title: string;
      description: string;
      advice: string;
    }[];
  };
  publisher?: string;
  scoringMethod: "single" | "dimensional";
  dimensions?: {
    id: string;
    title: string;
  }[];
  isFree?: boolean;
}

// تست MBTI کوتاه شده
const mbtiTest: TestData = {
  id: 1,
  title: "تست شخصیت MBTI (فرم کوتاه)",
  description: "شناخت 16 تیپ شخصیتی مایرز-بریگز و تعیین تیپ شخصیتی شما",
  instructions: "در این آزمون، لطفاً گزینه‌ای را انتخاب کنید که بیشتر با ویژگی‌های شما همخوانی دارد. پاسخ‌ها را بر اساس شخصیت واقعی خود انتخاب کنید، نه آنچه دوست دارید باشید.",
  creditCost: 25,
  questionsCount: 20,
  timeRequired: 10,
  scoringMethod: "dimensional",
  dimensions: [
    { id: "E-I", title: "برون‌گرایی - درون‌گرایی" },
    { id: "S-N", title: "حسی - شهودی" },
    { id: "T-F", title: "فکری - احساسی" },
    { id: "J-P", title: "قضاوتی - ادراکی" }
  ],
  questions: [
    {
      id: 1,
      text: "در مهمانی‌ها، شما معمولاً:",
      options: [
        { id: 1, text: "با افراد جدید زیادی گفتگو می‌کنید", score: { "E-I": 2 } },
        { id: 2, text: "با چند نفر که می‌شناسید صحبت می‌کنید", score: { "E-I": 0 } }
      ]
    },
    {
      id: 2,
      text: "شما بیشتر:",
      options: [
        { id: 1, text: "واقع‌بین هستید و به جزئیات توجه می‌کنید", score: { "S-N": 2 } },
        { id: 2, text: "خیال‌پرداز هستید و ایده‌های جدید دارید", score: { "S-N": 0 } }
      ]
    },
    {
      id: 3,
      text: "کدام یک برای شما مهم‌تر است؟",
      options: [
        { id: 1, text: "منطقی و عقلانی بودن تصمیمات", score: { "T-F": 2 } },
        { id: 2, text: "توجه به احساسات افراد در تصمیم‌گیری", score: { "T-F": 0 } }
      ]
    },
    {
      id: 4,
      text: "وقتی برنامه‌ریزی می‌کنید:",
      options: [
        { id: 1, text: "برنامه‌های دقیق و مشخص را ترجیح می‌دهید", score: { "J-P": 2 } },
        { id: 2, text: "انعطاف‌پذیری و تغییر برنامه را ترجیح می‌دهید", score: { "J-P": 0 } }
      ]
    },
    {
      id: 5,
      text: "وقتی در جمع هستید، بعد از مدتی:",
      options: [
        { id: 1, text: "انرژی بیشتری پیدا می‌کنید", score: { "E-I": 2 } },
        { id: 2, text: "انرژی شما تخلیه می‌شود و نیاز به تنهایی دارید", score: { "E-I": 0 } }
      ]
    },
    {
      id: 6,
      text: "در کار کردن، بیشتر تمایل دارید:",
      options: [
        { id: 1, text: "روش‌های اثبات شده و سنتی را دنبال کنید", score: { "S-N": 2 } },
        { id: 2, text: "روش‌های جدید و خلاقانه را امتحان کنید", score: { "S-N": 0 } }
      ]
    },
    {
      id: 7,
      text: "در انتقاد از دیگران:",
      options: [
        { id: 1, text: "صریح و رک هستید", score: { "T-F": 2 } },
        { id: 2, text: "ملاحظه‌کار و دلسوز هستید", score: { "T-F": 0 } }
      ]
    },
    {
      id: 8,
      text: "در مورد کارهای روزانه:",
      options: [
        { id: 1, text: "لیست وظایف و برنامه‌ریزی دقیق دارید", score: { "J-P": 2 } },
        { id: 2, text: "بر اساس شرایط لحظه تصمیم می‌گیرید", score: { "J-P": 0 } }
      ]
    },
    {
      id: 9,
      text: "در گفتگوها، بیشتر دوست دارید:",
      options: [
        { id: 1, text: "با صدای بلند فکر کنید و نظراتتان را بیان کنید", score: { "E-I": 2 } },
        { id: 2, text: "ابتدا فکر کنید و سپس صحبت کنید", score: { "E-I": 0 } }
      ]
    },
    {
      id: 10,
      text: "وقتی به اطلاعات جدید نیاز دارید:",
      options: [
        { id: 1, text: "به داده‌ها و آمار دقیق تکیه می‌کنید", score: { "S-N": 2 } },
        { id: 2, text: "به شهود و حس درونی خود اعتماد می‌کنید", score: { "S-N": 0 } }
      ]
    },
    {
      id: 11,
      text: "در انتخاب شغل، برای شما مهم‌تر است که:",
      options: [
        { id: 1, text: "کار چالش‌برانگیز و منطقی باشد", score: { "T-F": 2 } },
        { id: 2, text: "به افراد کمک کنید و مفید باشید", score: { "T-F": 0 } }
      ]
    },
    {
      id: 12,
      text: "کدام رویکرد را ترجیح می‌دهید؟",
      options: [
        { id: 1, text: "داشتن برنامه و پیروی از آن", score: { "J-P": 2 } },
        { id: 2, text: "بداهه‌کاری و اقتضایی عمل کردن", score: { "J-P": 0 } }
      ]
    },
    {
      id: 13,
      text: "در زمان استراحت، ترجیح می‌دهید:",
      options: [
        { id: 1, text: "با دوستان باشید و فعالیت‌های گروهی انجام دهید", score: { "E-I": 2 } },
        { id: 2, text: "تنها باشید و به کارهای فردی بپردازید", score: { "E-I": 0 } }
      ]
    },
    {
      id: 14,
      text: "کدام یک شما را بهتر توصیف می‌کند؟",
      options: [
        { id: 1, text: "عملگرا و واقع‌بین", score: { "S-N": 2 } },
        { id: 2, text: "خلاق و نوآور", score: { "S-N": 0 } }
      ]
    },
    {
      id: 15,
      text: "در مذاکرات و بحث‌ها، بیشتر:",
      options: [
        { id: 1, text: "منطق و استدلال را ارزش می‌دهید", score: { "T-F": 2 } },
        { id: 2, text: "هماهنگی و توافق را مهم می‌دانید", score: { "T-F": 0 } }
      ]
    },
    {
      id: 16,
      text: "وقتی با پروژه‌ای کار می‌کنید:",
      options: [
        { id: 1, text: "پیش از شروع، همه چیز را برنامه‌ریزی می‌کنید", score: { "J-P": 2 } },
        { id: 2, text: "در حین کار، مسیر را تعیین می‌کنید", score: { "J-P": 0 } }
      ]
    },
    {
      id: 17,
      text: "در یک بحث گروهی، شما معمولاً:",
      options: [
        { id: 1, text: "زود نظر می‌دهید و مشارکت فعال دارید", score: { "E-I": 2 } },
        { id: 2, text: "بیشتر گوش می‌دهید و کمتر صحبت می‌کنید", score: { "E-I": 0 } }
      ]
    },
    {
      id: 18,
      text: "در یادگیری موضوعی جدید:",
      options: [
        { id: 1, text: "قدم به قدم و با جزئیات پیش می‌روید", score: { "S-N": 2 } },
        { id: 2, text: "ابتدا تصویر کلی را می‌بینید و سپس به جزئیات می‌پردازید", score: { "S-N": 0 } }
      ]
    },
    {
      id: 19,
      text: "در انتقاد از کار شما:",
      options: [
        { id: 1, text: "دوست دارید مستقیم و صریح باشند", score: { "T-F": 2 } },
        { id: 2, text: "ترجیح می‌دهید با ملاحظه و مهربانی باشد", score: { "T-F": 0 } }
      ]
    },
    {
      id: 20,
      text: "کدام عبارت شما را بهتر توصیف می‌کند؟",
      options: [
        { id: 1, text: "منظم، دقیق و مرتب", score: { "J-P": 2 } },
        { id: 2, text: "انعطاف‌پذیر، سازگار و اهل ماجراجویی", score: { "J-P": 0 } }
      ]
    }
  ],
  resultType: "تیپ شخصیتی MBTI",
  resultInterpretation: {
    "ISTJ": {
      title: "بازرس (ISTJ)",
      description: "افرادی عملگرا، منظم و دقیق هستید که به جزئیات توجه دارید و مسئولیت‌پذیر هستید.",
      advice: "از توانایی خود در سازماندهی و نظم بهره ببرید، اما سعی کنید گاهی انعطاف‌پذیرتر باشید و به ایده‌های جدید روی خوش نشان دهید."
    },
    "ISFJ": {
      title: "مدافع (ISFJ)",
      description: "فردی وفادار، دلسوز و مسئول هستید که به دیگران کمک می‌کنید و به جزئیات توجه دارید.",
      advice: "از توانایی خود در حمایت از دیگران استفاده کنید، اما مراقب باشید نیازهای خود را فراموش نکنید و گاهی «نه» گفتن را تمرین کنید."
    },
    "INFJ": {
      title: "مشاور (INFJ)",
      description: "فردی خلاق، ایده‌آل‌گرا و عمیق هستید که درک خوبی از انسان‌ها دارید و به آرمان‌های خود متعهد هستید.",
      advice: "از بینش عمیق خود برای کمک به دیگران استفاده کنید، اما مراقب فشارهای ناشی از کمال‌گرایی باشید و زمانی برای استراحت در نظر بگیرید."
    },
    "INTJ": {
      title: "معمار (INTJ)",
      description: "فردی استراتژیست، مستقل و تحلیل‌گر هستید که چشم‌انداز روشنی برای آینده دارید و به دنبال بهبود مداوم هستید.",
      advice: "از توانایی خود در برنامه‌ریزی و تحلیل بهره ببرید، اما سعی کنید به احساسات دیگران نیز توجه کنید و گاهی از دنیای درونی خود خارج شوید."
    },
    "ISTP": {
      title: "تکنسین (ISTP)",
      description: "فردی عملگرا، منطقی و انعطاف‌پذیر هستید که مهارت خوبی در حل مسائل عملی دارید.",
      advice: "از مهارت‌های عملی خود بهره ببرید، اما به تعهدات بلندمدت و ارتباطات عاطفی بیشتر توجه کنید."
    },
    "ISFP": {
      title: "هنرمند (ISFP)",
      description: "فردی حساس، مهربان و حامی هستید که به زیبایی و هماهنگی اهمیت می‌دهید.",
      advice: "از حس زیبایی‌شناسی و مهربانی خود استفاده کنید، اما سعی کنید قاطعیت بیشتری داشته باشید و نظرات خود را صریح‌تر بیان کنید."
    },
    "INFP": {
      title: "میانجی (INFP)",
      description: "فردی ایده‌آل‌گرا، خلاق و حساس هستید که به ارزش‌های انسانی و اصالت اهمیت می‌دهید.",
      advice: "از همدلی و خلاقیت خود بهره ببرید، اما سعی کنید واقع‌بینی بیشتری داشته باشید و مهارت‌های عملی را تقویت کنید."
    },
    "INTP": {
      title: "منطق‌دان (INTP)",
      description: "فردی تحلیل‌گر، مستقل و کنجکاو هستید که به درک عمیق مفاهیم علاقه دارید.",
      advice: "از توانایی تحلیلی و خلاقیت فکری خود استفاده کنید، اما به مهارت‌های ارتباطی و کاربردی کردن ایده‌ها نیز توجه داشته باشید."
    },
    "ESTP": {
      title: "کارآفرین (ESTP)",
      description: "فردی پرانرژی، عمل‌گرا و مردم‌آمیز هستید که از چالش‌ها استقبال می‌کنید.",
      advice: "از توانایی حل مسئله و سازگاری خود بهره ببرید، اما به برنامه‌ریزی بلندمدت و توجه به پیامدهای تصمیمات نیز اهمیت دهید."
    },
    "ESFP": {
      title: "سرگرم‌کننده (ESFP)",
      description: "فردی اجتماعی، پرشور و خلاق هستید که از زندگی لذت می‌برید و به دیگران انرژی می‌دهید.",
      advice: "از روحیه مثبت و انعطاف‌پذیری خود استفاده کنید، اما به مسئولیت‌ها و برنامه‌ریزی آینده نیز توجه بیشتری داشته باشید."
    },
    "ENFP": {
      title: "مبتکر (ENFP)",
      description: "فردی پرشور، خلاق و فرصت‌بین هستید که به امکان‌های جدید علاقه‌مند هستید و به دیگران الهام می‌بخشید.",
      advice: "از شور و اشتیاق و توانایی الهام‌بخشی خود بهره ببرید، اما به اولویت‌بندی اهداف و تکمیل پروژه‌ها نیز توجه داشته باشید."
    },
    "ENTP": {
      title: "بحث‌کننده (ENTP)",
      description: "فردی خلاق، تیزهوش و چالش‌پذیر هستید که از بحث‌های فکری لذت می‌برید و راه‌حل‌های نوآورانه ارائه می‌دهید.",
      advice: "از توانایی خلاقیت و تفکر نقادانه خود استفاده کنید، اما به اتمام پروژه‌ها و توجه به احساسات دیگران نیز اهمیت دهید."
    },
    "ESTJ": {
      title: "مدیر (ESTJ)",
      description: "فردی سازمان‌یافته، قاطع و عمل‌گرا هستید که به نظم و کارایی اهمیت می‌دهید.",
      advice: "از توانایی رهبری و سازماندهی خود بهره ببرید، اما به انعطاف‌پذیری و توجه به نیازهای عاطفی دیگران نیز توجه کنید."
    },
    "ESFJ": {
      title: "حامی (ESFJ)",
      description: "فردی مسئول، مهربان و اجتماعی هستید که به رفاه دیگران اهمیت می‌دهید و به سنت‌ها احترام می‌گذارید.",
      advice: "از مهارت‌های ارتباطی و همدلی خود استفاده کنید، اما نیازهای خود را نیز در نظر بگیرید و گاهی از تغییرات استقبال کنید."
    },
    "ENFJ": {
      title: "پیشوا (ENFJ)",
      description: "فردی الهام‌بخش، متقاعدکننده و همدل هستید که به رشد و توسعه دیگران اهمیت می‌دهید.",
      advice: "از توانایی رهبری و الهام‌بخشی خود بهره ببرید، اما به نیازهای شخصی خود نیز توجه کنید و گاهی استراحت کنید."
    },
    "ENTJ": {
      title: "فرمانده (ENTJ)",
      description: "فردی قاطع، منطقی و رهبر طبیعی هستید که به کارایی و موفقیت اهمیت می‌دهید.",
      advice: "از توانایی برنامه‌ریزی استراتژیک و رهبری خود استفاده کنید، اما به احساسات دیگران و ایجاد تعادل در زندگی نیز توجه داشته باشید."
    }
  },
  publisher: "Myers & Briggs Foundation",
  isFree: false
};

// تست اضطراب بک (فرم کوتاه)
const anxietyTest: TestData = {
  id: 12,
  title: "تست اضطراب بک (BAI) - فرم کوتاه",
  description: "سنجش میزان اضطراب و شناسایی علائم فیزیکی و روانی آن",
  instructions: "هر یک از موارد زیر را بخوانید و میزان ناراحتی خود را از هر کدام از این علائم طی هفته گذشته (شامل امروز) انتخاب کنید.",
  creditCost: 20,
  questionsCount: 10,
  timeRequired: 5,
  scoringMethod: "single",
  questions: [
    {
      id: 1,
      text: "کرختی یا مورمور شدن",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    },
    {
      id: 2,
      text: "احساس گرما",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    },
    {
      id: 3,
      text: "لرزش در پاها",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    },
    {
      id: 4,
      text: "ناتوانی در آرامش",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    },
    {
      id: 5,
      text: "ترس از وقوع حادثه بد",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    },
    {
      id: 6,
      text: "سرگیجه یا سبکی سر",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    },
    {
      id: 7,
      text: "تپش قلب یا افزایش ضربان قلب",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    },
    {
      id: 8,
      text: "احساس عدم تعادل",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    },
    {
      id: 9,
      text: "وحشت‌زدگی",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    },
    {
      id: 10,
      text: "عصبی بودن",
      options: [
        { id: 1, text: "اصلاً", score: 0 },
        { id: 2, text: "خفیف (خیلی آزارم نمی‌دهد)", score: 1 },
        { id: 3, text: "متوسط (ناخوشایند است، اما قابل تحمل است)", score: 2 },
        { id: 4, text: "شدید (به سختی می‌توانم تحمل کنم)", score: 3 }
      ]
    }
  ],
  resultType: "سطح اضطراب",
  resultInterpretation: {
    ranges: [
      {
        min: 0,
        max: 7,
        title: "اضطراب کم",
        description: "شما سطح پایینی از اضطراب را تجربه می‌کنید که طبیعی است و تأثیر منفی بر زندگی شما ندارد.",
        advice: "به فعالیت‌های عادی خود ادامه دهید و به تکنیک‌های ساده مدیریت استرس مانند تنفس عمیق و ورزش منظم توجه کنید."
      },
      {
        min: 8,
        max: 15,
        title: "اضطراب خفیف تا متوسط",
        description: "شما سطح خفیف تا متوسطی از اضطراب را تجربه می‌کنید که ممکن است گاهی بر زندگی روزمره شما تأثیر بگذارد.",
        advice: "تکنیک‌های مدیریت استرس مانند مدیتیشن، یوگا و تنفس عمیق را امتحان کنید. فعالیت بدنی منظم و خواب کافی می‌تواند به کاهش اضطراب کمک کند."
      },
      {
        min: 16,
        max: 23,
        title: "اضطراب متوسط تا شدید",
        description: "شما سطح متوسط تا شدیدی از اضطراب را تجربه می‌کنید که احتمالاً بر کیفیت زندگی شما تأثیر می‌گذارد.",
        advice: "توصیه می‌شود با یک متخصص سلامت روان مشورت کنید. تکنیک‌های مدیریت استرس را به طور منظم انجام دهید و از محرک‌های اضطراب‌آور اجتناب کنید."
      },
      {
        min: 24,
        max: 30,
        title: "اضطراب شدید",
        description: "شما سطح بالایی از اضطراب را تجربه می‌کنید که به طور قابل توجهی بر زندگی روزمره شما تأثیر می‌گذارد.",
        advice: "توصیه می‌شود فوراً با یک متخصص سلامت روان مشورت کنید. اضطراب شدید می‌تواند نیاز به درمان تخصصی داشته باشد."
      }
    ]
  },
  publisher: "Beck Institute for Cognitive Behavior Therapy",
  isFree: true
};

// تست سبک یادگیری VARK (فرم کوتاه)
const learningStyleTest: TestData = {
  id: 36,
  title: "تست سبک یادگیری VARK (فرم کوتاه)",
  description: "شناسایی ترجیح‌های یادگیری دیداری، شنیداری، خواندنی/نوشتنی و جنبشی",
  instructions: "برای هر موقعیت، گزینه‌ای را انتخاب کنید که بیشتر با روش ترجیحی شما همخوانی دارد. می‌توانید بیش از یک گزینه را انتخاب کنید اگر واقعاً مناسب شما باشد، اما سعی کنید به گزینه‌هایی محدود شوید که واقعاً به شما مربوط می‌شوند.",
  creditCost: 15,
  questionsCount: 8,
  timeRequired: 10,
  scoringMethod: "dimensional",
  dimensions: [
    { id: "V", title: "دیداری (Visual)" },
    { id: "A", title: "شنیداری (Aural)" },
    { id: "R", title: "خواندنی/نوشتنی (Read/Write)" },
    { id: "K", title: "جنبشی (Kinesthetic)" }
  ],
  questions: [
    {
      id: 1,
      text: "برای یادگیری یک مهارت جدید (مانند یک برنامه کامپیوتری جدید)، ترجیح می‌دهید:",
      options: [
        { id: 1, text: "از تصاویر و نمودارها استفاده کنید", score: { "V": 1 } },
        { id: 2, text: "به توضیحات شفاهی گوش دهید", score: { "A": 1 } },
        { id: 3, text: "دستورالعمل‌ها را بخوانید", score: { "R": 1 } },
        { id: 4, text: "به صورت عملی آن را امتحان کنید", score: { "K": 1 } }
      ]
    },
    {
      id: 2,
      text: "هنگام خواندن یک کتاب در اوقات فراغت، ترجیح می‌دهید:",
      options: [
        { id: 1, text: "کتابی با تصاویر و نمودارهای زیاد", score: { "V": 1 } },
        { id: 2, text: "کتاب صوتی گوش کنید", score: { "A": 1 } },
        { id: 3, text: "کتابی با توضیحات متنی جزئی", score: { "R": 1 } },
        { id: 4, text: "کتابی با داستان‌های واقعی و تجربیات عملی", score: { "K": 1 } }
      ]
    },
    {
      id: 3,
      text: "برای یادگیری یک موضوع جدید، ترجیح می‌دهید:",
      options: [
        { id: 1, text: "از نمودارها و تصاویر استفاده کنید", score: { "V": 1 } },
        { id: 2, text: "با کسی درباره آن صحبت کنید", score: { "A": 1 } },
        { id: 3, text: "کتاب‌ها و مقالات مرتبط را مطالعه کنید", score: { "R": 1 } },
        { id: 4, text: "به صورت عملی آن را تجربه کنید", score: { "K": 1 } }
      ]
    },
    {
      id: 4,
      text: "هنگام نیاز به راهنمایی برای رسیدن به یک مکان جدید، ترجیح می‌دهید:",
      options: [
        { id: 1, text: "از نقشه استفاده کنید", score: { "V": 1 } },
        { id: 2, text: "مسیر را بپرسید و به دستورات شفاهی گوش دهید", score: { "A": 1 } },
        { id: 3, text: "دستورالعمل‌های نوشته شده را دنبال کنید", score: { "R": 1 } },
        { id: 4, text: "از GPS استفاده کنید و مسیر را عملاً طی کنید", score: { "K": 1 } }
      ]
    },
    {
      id: 5,
      text: "برای به خاطر سپردن یک شماره تلفن جدید، ترجیح می‌دهید:",
      options: [
        { id: 1, text: "آن را تصور کنید یا الگوی آن را روی صفحه کلید ببینید", score: { "V": 1 } },
        { id: 2, text: "آن را با صدای بلند چندین بار تکرار کنید", score: { "A": 1 } },
        { id: 3, text: "آن را یادداشت کنید", score: { "R": 1 } },
        { id: 4, text: "آن را چندین بار بنویسید یا وارد کنید", score: { "K": 1 } }
      ]
    },
    {
      id: 6,
      text: "هنگام یادگیری یک مهارت ورزشی یا رقص جدید، ترجیح می‌دهید:",
      options: [
        { id: 1, text: "حرکات را مشاهده کنید و از تصاویر استفاده کنید", score: { "V": 1 } },
        { id: 2, text: "به توضیحات شفاهی گوش دهید", score: { "A": 1 } },
        { id: 3, text: "دستورالعمل‌های نوشته شده را مطالعه کنید", score: { "R": 1 } },
        { id: 4, text: "حرکات را عملاً تمرین کنید", score: { "K": 1 } }
      ]
    },
    {
      id: 7,
      text: "برای توضیح یک ایده جدید به دیگران، ترجیح می‌دهید:",
      options: [
        { id: 1, text: "از نمودارها و تصاویر استفاده کنید", score: { "V": 1 } },
        { id: 2, text: "آن را توضیح دهید و بحث کنید", score: { "A": 1 } },
        { id: 3, text: "آن را بنویسید یا از متن‌های توضیحی استفاده کنید", score: { "R": 1 } },
        { id: 4, text: "با مثال‌های عملی و تجربی آن را نشان دهید", score: { "K": 1 } }
      ]
    },
    {
      id: 8,
      text: "هنگام خرید یک وسیله جدید، ترجیح می‌دهید:",
      options: [
        { id: 1, text: "به ظاهر و طراحی آن توجه کنید", score: { "V": 1 } },
        { id: 2, text: "با فروشنده درباره ویژگی‌های آن صحبت کنید", score: { "A": 1 } },
        { id: 3, text: "بروشور و مشخصات فنی آن را بخوانید", score: { "R": 1 } },
        { id: 4, text: "آن را امتحان کنید و با آن کار کنید", score: { "K": 1 } }
      ]
    }
  ],
  resultType: "سبک یادگیری VARK",
  resultInterpretation: {
    "V": {
      title: "یادگیرنده دیداری (Visual)",
      description: "شما از طریق دیدن و مشاهده بهتر یاد می‌گیرید. تصاویر، نمودارها، فیلم‌ها و نمایش‌های بصری به شما کمک می‌کنند.",
      advice: "از نقشه‌های ذهنی، نمودارها، رنگ‌ها، فلش‌کارت‌های تصویری و ویدیوها برای یادگیری استفاده کنید. اطلاعات را به شکل نمودار یا تصویر درآورید."
    },
    "A": {
      title: "یادگیرنده شنیداری (Aural)",
      description: "شما از طریق شنیدن و گوش دادن بهتر یاد می‌گیرید. سخنرانی‌ها، بحث‌ها و توضیحات شفاهی برای شما مؤثرتر است.",
      advice: "در کلاس‌ها شرکت کنید، به فایل‌های صوتی گوش دهید، با صدای بلند مطالعه کنید و با دیگران درباره موضوعات بحث کنید. توضیحات شفاهی را ضبط کنید و بعداً گوش دهید."
    },
    "R": {
      title: "یادگیرنده خواندنی/نوشتنی (Read/Write)",
      description: "شما از طریق خواندن و نوشتن بهتر یاد می‌گیرید. متن‌ها، کتاب‌ها و یادداشت‌برداری برای شما مفید است.",
      advice: "یادداشت‌برداری کنید، خلاصه‌نویسی کنید، از واژه‌نامه‌ها استفاده کنید و مطالب را به زبان خودتان بازنویسی کنید. فهرست‌ها و تعاریف را مطالعه کنید."
    },
    "K": {
      title: "یادگیرنده جنبشی (Kinesthetic)",
      description: "شما از طریق انجام دادن و تجربه کردن بهتر یاد می‌گیرید. فعالیت‌های عملی، آزمایش‌ها و تمرین‌های واقعی برای شما مؤثرتر است.",
      advice: "از مثال‌های واقعی استفاده کنید، آزمایش‌ها را انجام دهید، از مطالعات موردی استفاده کنید و مفاهیم را به شکل عملی تجربه کنید. در حین مطالعه حرکت کنید و از رویکردهای عملی استفاده کنید."
    },
    "VA": {
      title: "یادگیرنده دیداری-شنیداری",
      description: "شما ترجیح می‌دهید از طریق دیدن و شنیدن یاد بگیرید. ویدیوها و سخنرانی‌های تصویری برای شما مؤثر است.",
      advice: "از ویدیوهای آموزشی استفاده کنید، در بحث‌های گروهی شرکت کنید و از نمودارها همراه با توضیحات صوتی استفاده کنید."
    },
    "VR": {
      title: "یادگیرنده دیداری-خواندنی",
      description: "شما از طریق دیدن تصاویر و خواندن متن‌ها بهتر یاد می‌گیرید.",
      advice: "از کتاب‌های تصویری، نمودارهای متنی و یادداشت‌برداری تصویری استفاده کنید."
    },
    "VK": {
      title: "یادگیرنده دیداری-جنبشی",
      description: "شما از طریق مشاهده و انجام دادن بهتر یاد می‌گیرید.",
      advice: "از شبیه‌سازی‌ها، آزمایش‌های عملی همراه با تصاویر و نمودارها استفاده کنید."
    },
    "AR": {
      title: "یادگیرنده شنیداری-خواندنی",
      description: "شما از طریق شنیدن و خواندن بهتر یاد می‌گیرید.",
      advice: "مطالب را با صدای بلند بخوانید، در گروه‌های مطالعه شرکت کنید و مباحث را یادداشت‌برداری کنید."
    },
    "AK": {
      title: "یادگیرنده شنیداری-جنبشی",
      description: "شما از طریق شنیدن و انجام دادن بهتر یاد می‌گیرید.",
      advice: "در بحث‌ها و فعالیت‌های عملی شرکت کنید و در حین گوش دادن یادداشت‌برداری کنید."
    },
    "RK": {
      title: "یادگیرنده خواندنی-جنبشی",
      description: "شما از طریق خواندن و انجام دادن بهتر یاد می‌گیرید.",
      advice: "دستورالعمل‌ها را بخوانید و سپس آن‌ها را عملی کنید، از نمونه‌های واقعی استفاده کنید."
    },
    "VAR": {
      title: "یادگیرنده دیداری-شنیداری-خواندنی",
      description: "شما از طریق دیدن، شنیدن و خواندن بهتر یاد می‌گیرید.",
      advice: "از ترکیبی از منابع تصویری، صوتی و متنی استفاده کنید."
    },
    "VAK": {
      title: "یادگیرنده دیداری-شنیداری-جنبشی",
      description: "شما از طریق دیدن، شنیدن و انجام دادن بهتر یاد می‌گیرید.",
      advice: "از روش‌های آموزشی تعاملی و چندرسانه‌ای استفاده کنید."
    },
    "VRK": {
      title: "یادگیرنده دیداری-خواندنی-جنبشی",
      description: "شما از طریق دیدن، خواندن و انجام دادن بهتر یاد می‌گیرید.",
      advice: "از کتاب‌های تمرینی همراه با تصاویر و فعالیت‌های عملی استفاده کنید."
    },
    "ARK": {
      title: "یادگیرنده شنیداری-خواندنی-جنبشی",
      description: "شما از طریق شنیدن، خواندن و انجام دادن بهتر یاد می‌گیرید.",
      advice: "در بحث‌ها شرکت کنید، یادداشت‌برداری کنید و مفاهیم را به صورت عملی تجربه کنید."
    },
    "VARK": {
      title: "یادگیرنده چندوجهی (Multimodal)",
      description: "شما از طریق ترکیبی از روش‌های دیداری، شنیداری، خواندنی و جنبشی یاد می‌گیرید.",
      advice: "از روش‌های متنوع یادگیری استفاده کنید و بسته به موضوع، روش مناسب را انتخاب کنید."
    }
  },
  publisher: "VARK Learn Limited",
  isFree: true
};

// دیکشنری تست‌ها برای دسترسی آسان
const tests: { [key: number]: TestData } = {
  1: mbtiTest,
  12: anxietyTest,
  36: learningStyleTest
};

export default function TakeTest() {
  const [match, params] = useRoute<{ id: string }>("/tests/:id");
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { credits, updateCredits } = useCredits();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number[] }>({});
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [testData, setTestData] = useState<TestData | null>(null);
  const [testResult, setTestResult] = useState<any | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // بارگذاری اطلاعات تست
  useEffect(() => {
    if (match && params?.id) {
      const testId = parseInt(params.id);
      const test = tests[testId];
      
      if (test) {
        setTestData(test);
        if (test.timeRequired) {
          setTimeLeft(test.timeRequired * 60); // تبدیل به ثانیه
        }
      } else {
        toast({
          title: "خطا",
          description: "تست مورد نظر یافت نشد.",
          variant: "destructive"
        });
        setLocation("/tests");
      }
    }
  }, [match, params, setLocation, toast]);

  // شمارنده زمان
  useEffect(() => {
    if (testStarted && timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime !== null && prevTime > 0) {
            return prevTime - 1;
          }
          return 0;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [testStarted, timeLeft]);

  // تنظیم و نمایش زمان باقی‌مانده
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${toPersianDigits(minutes)}:${toPersianDigits(remainingSeconds.toString().padStart(2, '0'))}`;
  };

  // شروع تست
  const startTest = () => {
    if (!testData) return;
    
    if (!testData.isFree && (credits !== undefined && credits < testData.creditCost)) {
      toast({
        title: "اعتبار ناکافی",
        description: "اعتبار شما برای انجام این تست کافی نیست.",
        variant: "destructive"
      });
      return;
    }
    
    setTestStarted(true);
    setAnswers({});
    setCurrentQuestion(0);
    setTestFinished(false);
    setTestResult(null);
  };

  // انتخاب یک گزینه
  const selectOption = (questionId: number, optionId: number) => {
    setAnswers({
      ...answers,
      [questionId]: [optionId]
    });
  };

  // حرکت به سوال بعدی
  const nextQuestion = () => {
    if (!testData) return;
    
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishTest();
    }
  };

  // حرکت به سوال قبلی
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // محاسبه امتیاز و پایان تست
  const finishTest = async () => {
    if (!testData) return;
    
    setLoading(true);
    
    // محاسبه نتیجه بر اساس روش نمره‌دهی
    let result: any = {};
    
    if (testData.scoringMethod === "single") {
      // نمره‌دهی ساده (مجموع امتیازات)
      let totalScore = 0;
      
      Object.entries(answers).forEach(([questionId, selectedOptionIds]) => {
        const question = testData.questions.find(q => q.id === parseInt(questionId));
        if (question) {
          selectedOptionIds.forEach(optionId => {
            const option = question.options.find(o => o.id === optionId);
            if (option && typeof option.score === 'number') {
              totalScore += option.score;
            }
          });
        }
      });
      
      result = { score: totalScore };
      
      // تفسیر نتیجه برای تست‌هایی با نمره‌دهی ساده
      if ('ranges' in testData.resultInterpretation) {
        const interpretation = testData.resultInterpretation.ranges.find(
          range => totalScore >= range.min && totalScore <= range.max
        );
        
        if (interpretation) {
          result.interpretation = interpretation;
        }
      }
    } else if (testData.scoringMethod === "dimensional") {
      // نمره‌دهی چند بعدی (مثل MBTI یا VARK)
      const dimensionScores: {[key: string]: number} = {};
      
      // مقداردهی اولیه ابعاد
      if (testData.dimensions) {
        testData.dimensions.forEach(dim => {
          dimensionScores[dim.id] = 0;
        });
      }
      
      // محاسبه امتیاز هر بعد
      Object.entries(answers).forEach(([questionId, selectedOptionIds]) => {
        const question = testData.questions.find(q => q.id === parseInt(questionId));
        if (question) {
          selectedOptionIds.forEach(optionId => {
            const option = question.options.find(o => o.id === optionId);
            if (option && typeof option.score === 'object') {
              Object.entries(option.score).forEach(([dimension, score]) => {
                dimensionScores[dimension] = (dimensionScores[dimension] || 0) + score;
              });
            }
          });
        }
      });
      
      result = { dimensionScores };
      
      // تفسیر مخصوص برای تست MBTI
      if (testData.id === 1) {
        // محاسبه تیپ MBTI
        const E = dimensionScores["E-I"] || 0;
        const S = dimensionScores["S-N"] || 0;
        const T = dimensionScores["T-F"] || 0;
        const J = dimensionScores["J-P"] || 0;
        
        const personality = [
          E >= testData.questions.filter(q => q.options.some(o => o.score && typeof o.score === 'object' && "E-I" in o.score)).length ? "E" : "I",
          S >= testData.questions.filter(q => q.options.some(o => o.score && typeof o.score === 'object' && "S-N" in o.score)).length ? "S" : "N",
          T >= testData.questions.filter(q => q.options.some(o => o.score && typeof o.score === 'object' && "T-F" in o.score)).length ? "T" : "F",
          J >= testData.questions.filter(q => q.options.some(o => o.score && typeof o.score === 'object' && "J-P" in o.score)).length ? "J" : "P",
        ].join("");
        
        result.type = personality;
        result.interpretation = testData.resultInterpretation[personality];
      }
      
      // تفسیر مخصوص برای تست VARK
      if (testData.id === 36) {
        // محاسبه سبک یادگیری VARK
        const dimensions = ["V", "A", "R", "K"];
        const highScores = dimensions.filter(dim => 
          dimensionScores[dim] >= Math.floor(testData.questions.length / 4)
        ).sort();
        
        const learningStyle = highScores.length > 0 ? highScores.join("") : "VARK";
        
        result.type = learningStyle;
        result.interpretation = testData.resultInterpretation[learningStyle] || testData.resultInterpretation["VARK"];
      }
    }
    
    setTestResult(result);
    setTestFinished(true);
    
    // اگر تست رایگان نبود، اعتبار کم شود
    if (!testData.isFree) {
      try {
        await apiRequest("POST", "/api/credits/use", {
          amount: testData.creditCost,
          description: `انجام تست ${testData.title}`,
          resourceType: "test",
          resourceId: testData.id
        });
        
        // به‌روزرسانی اعتبار کاربر
        queryClient.invalidateQueries(["/api/credits/balance"]);
        
        toast({
          title: "کسر اعتبار",
          description: `${toPersianDigits(testData.creditCost)} اعتبار از حساب شما کسر شد.`,
        });
      } catch (error) {
        console.error("Error deducting credits:", error);
        toast({
          title: "خطا در کسر اعتبار",
          description: "مشکلی در کسر اعتبار رخ داد، لطفاً با پشتیبانی تماس بگیرید.",
          variant: "destructive"
        });
      }
    }
    
    // ذخیره نتیجه تست در تاریخچه
    try {
      await apiRequest("POST", "/api/tests/history", {
        testId: testData.id,
        testTitle: testData.title,
        date: new Date().toISOString(),
        score: result.score !== undefined ? `${toPersianDigits(result.score)}` : "",
        result: result.type || (result.interpretation ? result.interpretation.title : "")
      });
      
      toast({
        title: "ذخیره تاریخچه",
        description: "نتیجه تست در تاریخچه شما ذخیره شد.",
      });
    } catch (error) {
      console.error("Error saving test history:", error);
    }
    
    setLoading(false);
  };

  // اگر هنوز داده‌های تست لود نشده است
  if (!testData) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="h-10 w-10 animate-spin text-tiffany" />
      </div>
    );
  }

  // نمایش صفحه نتایج
  if (testFinished && testResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{testData.title}</h1>
            <p className="text-slate-500 dark:text-slate-400">{testData.description}</p>
          </div>
          <Button variant="outline" onClick={() => setLocation("/tests")}>
            <ArrowRight className="h-4 w-4 ml-2" />
            بازگشت به لیست تست‌ها
          </Button>
        </div>

        <GlassCard className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-tiffany" />
              </div>
              <div className="mr-4">
                <h2 className="text-lg font-bold">نتیجه تست</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  {testData.resultType}
                </p>
              </div>
            </div>
            
            <Badge 
              variant="outline" 
              className="bg-tiffany/10 text-tiffany dark:bg-tiffany/20"
            >
              {testResult.score !== undefined ? `امتیاز: ${toPersianDigits(testResult.score)}` : 
               testResult.type ? `نوع: ${testResult.type}` : ''}
            </Badge>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
            {testResult.interpretation && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-tiffany">{testResult.interpretation.title}</h3>
                <p className="text-slate-700 dark:text-slate-300 leading-7">
                  {testResult.interpretation.description}
                </p>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4 mt-4">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-5 w-5 text-amber-500 ml-2" />
                    <h4 className="font-bold">پیشنهاد و توصیه</h4>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    {testResult.interpretation.advice}
                  </p>
                </div>
              </div>
            )}

            {testResult.dimensionScores && testData.dimensions && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">نیمرخ ابعاد</h3>
                <div className="space-y-4">
                  {testData.dimensions.map(dimension => (
                    <div key={dimension.id} className="space-y-1">
                      <div className="flex justify-between">
                        <span>{dimension.title}</span>
                        <span className="font-medium">
                          {toPersianDigits(testResult.dimensionScores[dimension.id] || 0)}
                        </span>
                      </div>
                      <Progress 
                        value={(testResult.dimensionScores[dimension.id] || 0) / testData.questions.filter(
                          q => q.options.some(o => o.score && typeof o.score === 'object' && dimension.id in o.score)
                        ).length * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={() => {
            setTestStarted(false);
            setTestFinished(false);
            setTestResult(null);
          }}>
            <ThumbsUp className="h-4 w-4 ml-2" />
            انجام مجدد تست
          </Button>
          <Button onClick={() => setLocation("/tests")}>
            <Activity className="h-4 w-4 ml-2" />
            تست‌های دیگر
          </Button>
        </div>
      </motion.div>
    );
  }

  // نمایش صفحه شروع تست
  if (!testStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{testData.title}</h1>
            <p className="text-slate-500 dark:text-slate-400">{testData.description}</p>
          </div>
          <Button variant="outline" onClick={() => setLocation("/tests")}>
            <ArrowRight className="h-4 w-4 ml-2" />
            بازگشت به لیست تست‌ها
          </Button>
        </div>

        <GlassCard className="p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center">
              <BrainCircuit className="h-6 w-6 text-tiffany" />
            </div>
            <div className="mr-4">
              <h2 className="text-lg font-bold">درباره این تست</h2>
              <p className="text-slate-500 dark:text-slate-400">
                اطلاعات کلی و نحوه انجام
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <Clock className="h-5 w-5 text-slate-500 ml-2" />
              <div>
                <p className="text-slate-700 dark:text-slate-300">زمان تقریبی</p>
                <p className="font-bold">{toPersianDigits(testData.timeRequired)} دقیقه</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <CheckCircle2 className="h-5 w-5 text-slate-500 ml-2" />
              <div>
                <p className="text-slate-700 dark:text-slate-300">تعداد سوالات</p>
                <p className="font-bold">{toPersianDigits(testData.questionsCount)} سوال</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <Award className="h-5 w-5 text-slate-500 ml-2" />
              <div>
                <p className="text-slate-700 dark:text-slate-300">نوع نتیجه</p>
                <p className="font-bold">{testData.resultType}</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <Crown className="h-5 w-5 text-slate-500 ml-2" />
              <div>
                <p className="text-slate-700 dark:text-slate-300">اعتبار مورد نیاز</p>
                <p className="font-bold">
                  {testData.isFree ? "رایگان" : toPersianDigits(testData.creditCost)}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <h3 className="font-bold mb-3">راهنمای تست</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-7">
              {testData.instructions}
            </p>
          </div>
        </GlassCard>

        <div className="flex justify-center">
          <Button onClick={startTest} size="lg" className="w-full md:w-auto">
            <AlarmClock className="h-5 w-5 ml-2" />
            شروع تست
          </Button>
        </div>
      </motion.div>
    );
  }

  // صفحه اصلی سوالات تست
  const currentQ = testData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / testData.questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{testData.title}</h1>
          <div className="flex items-center">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              سوال {toPersianDigits(currentQuestion + 1)} از {toPersianDigits(testData.questions.length)}
            </span>
            {timeLeft !== null && (
              <span className="flex items-center mr-4 text-sm">
                <Clock className="h-4 w-4 ml-1 text-slate-500" />
                <span className="text-slate-500 dark:text-slate-400">
                  زمان باقی‌مانده: {formatTime(timeLeft)}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      <Progress value={progress} className="mb-6 h-2" />

      <GlassCard className="p-6 mb-6">
        <h2 className="text-xl font-bold mb-6">{currentQ.text}</h2>

        <div className="space-y-3">
          {currentQ.options.map(option => (
            <div
              key={option.id}
              className={cn(
                "p-4 rounded-lg border-2 cursor-pointer transition-all",
                answers[currentQ.id]?.includes(option.id)
                  ? "border-tiffany bg-tiffany/5"
                  : "border-slate-200 dark:border-slate-700 hover:border-tiffany/50"
              )}
              onClick={() => selectOption(currentQ.id, option.id)}
            >
              <div className="flex items-start">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 mt-0.5 ml-3 flex items-center justify-center",
                    answers[currentQ.id]?.includes(option.id)
                      ? "border-tiffany bg-tiffany text-white"
                      : "border-slate-300 dark:border-slate-600"
                  )}
                >
                  {answers[currentQ.id]?.includes(option.id) && (
                    <CheckCircle2 className="h-4 w-4" />
                  )}
                </div>
                <span className="text-lg">{option.text}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowRight className="h-4 w-4 ml-2" />
          سوال قبلی
        </Button>

        <Button
          onClick={nextQuestion}
          disabled={!answers[currentQ.id] || loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 ml-2 animate-spin" />
          ) : (
            <>
              {currentQuestion < testData.questions.length - 1 ? (
                <>
                  سوال بعدی
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </>
              ) : (
                <>
                  پایان تست
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}