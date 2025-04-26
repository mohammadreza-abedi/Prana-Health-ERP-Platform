import { useState } from "react";
import { motion } from "framer-motion";
import { 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Building, 
  CheckCircle2, 
  CreditCard, 
  FileSpreadsheet, 
  HelpCircle, 
  Shield, 
  Star, 
  Users, 
  Zap,
  Activity,
  Brain,
  Dumbbell,
  LineChart,
  Fingerprint,
  Landmark,
  CalendarClock,
  HeartHandshake,
  Headphones,
  MessageSquare,
  Award,
  BadgeCheck,
  ClipboardList,
  Lock,
  Sparkles,
  Download
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// تعرفه‌های استاندارد
const standardPlans = [
  {
    id: "starter",
    name: "پایه",
    description: "برای افراد و شرکت‌های کوچک",
    price: {
      monthly: 149_000,
      yearly: 1_490_000,
    },
    features: [
      { name: "دسترسی به 5 تست روانشناسی پایه", included: true },
      { name: "پنل داشبورد شخصی", included: true },
      { name: "ثبت اطلاعات سلامت روزانه", included: true },
      { name: "چالش‌های روزانه (3 چالش در هفته)", included: true },
      { name: "گزارش‌های ماهانه", included: true },
      { name: "خروجی PDF از نتایج تست‌ها", included: false },
      { name: "تست‌های حرفه‌ای و پیشرفته", included: false },
      { name: "داشبورد مدیریتی", included: false },
      { name: "تحلیل هوشمند داده‌ها", included: false },
      { name: "دسترسی API", included: false },
      { name: "پشتیبانی 24/7", included: false },
    ],
    popularFeature: "دسترسی به تست‌های روانشناسی",
    ctaText: "شروع رایگان (14 روز)",
    badge: null,
  },
  {
    id: "pro",
    name: "حرفه‌ای",
    description: "برای متخصصان و کسب‌وکارهای متوسط",
    price: {
      monthly: 399_000,
      yearly: 3_990_000,
    },
    features: [
      { name: "دسترسی به تمام تست‌های روانشناسی", included: true },
      { name: "پنل داشبورد شخصی پیشرفته", included: true },
      { name: "ثبت اطلاعات سلامت روزانه", included: true },
      { name: "چالش‌های روزانه نامحدود", included: true },
      { name: "گزارش‌های هفتگی و ماهانه", included: true },
      { name: "خروجی PDF از نتایج تست‌ها", included: true },
      { name: "دسترسی به 15 تست حرفه‌ای", included: true },
      { name: "داشبورد مدیریتی پایه", included: true },
      { name: "تحلیل هوشمند داده‌ها", included: true },
      { name: "دسترسی API محدود", included: false },
      { name: "پشتیبانی 24/7", included: false },
    ],
    popularFeature: "داشبورد حرفه‌ای و تحلیل داده‌ها",
    ctaText: "انتخاب پلن حرفه‌ای",
    badge: "محبوب‌ترین",
  },
  {
    id: "enterprise",
    name: "سازمانی",
    description: "برای سازمان‌ها و شرکت‌های بزرگ",
    price: {
      monthly: 999_000,
      yearly: 9_990_000,
    },
    features: [
      { name: "دسترسی به تمام خدمات پلتفرم", included: true },
      { name: "پنل داشبورد شخصی پیشرفته", included: true },
      { name: "ثبت اطلاعات سلامت روزانه با یادآوری", included: true },
      { name: "چالش‌های اختصاصی سازمانی", included: true },
      { name: "گزارش‌های سفارشی", included: true },
      { name: "خروجی PDF، Excel و API", included: true },
      { name: "دسترسی به تمام تست‌های حرفه‌ای", included: true },
      { name: "داشبورد مدیریتی پیشرفته", included: true },
      { name: "تحلیل هوشمند داده‌ها با هوش مصنوعی", included: true },
      { name: "دسترسی API کامل", included: true },
      { name: "پشتیبانی 24/7 اختصاصی", included: true },
    ],
    popularFeature: "راهکار جامع سازمانی",
    ctaText: "تماس با ما",
    badge: "ویژه سازمان‌ها",
  },
];

// ویژگی‌های مقایسه پلن‌ها
const planFeatures = [
  { 
    category: "تست‌های روانشناسی", 
    features: [
      { name: "تست‌های پایه", tooltip: "شامل تست‌های شخصیت، استرس و هوش هیجانی پایه" },
      { name: "تست‌های پیشرفته", tooltip: "شامل تست‌های شخصیت MBTI، هالند، بیگ فایو و..." },
      { name: "تست‌های حرفه‌ای", tooltip: "شامل آزمون‌های تخصصی روانشناسی صنعتی و سازمانی" },
      { name: "تست‌های اختصاصی", tooltip: "امکان طراحی تست‌های اختصاصی برای سازمان شما" },
    ],
    icon: <Brain className="h-5 w-5 text-purple-500" />
  },
  { 
    category: "ابزارهای سلامت", 
    features: [
      { name: "ثبت داده‌های سلامت", tooltip: "ثبت اطلاعات سلامت روزانه مانند خواب، استرس، فعالیت و..." },
      { name: "چالش‌های سلامت", tooltip: "دسترسی به چالش‌های هفتگی مرتبط با سلامت جسمی و روانی" },
      { name: "یادآوری و برنامه‌ریزی", tooltip: "سیستم یادآوری و برنامه‌ریزی اختصاصی" },
      { name: "پایش سلامت سازمانی", tooltip: "امکان ردیابی و تحلیل وضعیت سلامت کارکنان" },
    ],
    icon: <Activity className="h-5 w-5 text-rose-500" />
  },
  { 
    category: "داشبورد و گزارش‌ها", 
    features: [
      { name: "داشبورد فردی", tooltip: "نمایش وضعیت فردی و پیشرفت در یک نمای کلی" },
      { name: "گزارش‌های دوره‌ای", tooltip: "گزارش‌های هفتگی، ماهانه و سالانه از وضعیت سلامت" },
      { name: "داشبورد مدیریتی", tooltip: "نمایش وضعیت کلی سلامت کارکنان برای مدیران" },
      { name: "گزارش‌های سفارشی", tooltip: "امکان ایجاد گزارش‌های اختصاصی با فیلترها و نمودارهای دلخواه" },
    ],
    icon: <LineChart className="h-5 w-5 text-tiffany" />
  },
  { 
    category: "ابزارهای سازمانی", 
    features: [
      { name: "مدیریت کاربران", tooltip: "مدیریت کاربران و تنظیم سطوح دسترسی" },
      { name: "برندینگ اختصاصی", tooltip: "شخصی‌سازی رابط کاربری با لوگو و برند سازمان" },
      { name: "تحلیل سازمانی", tooltip: "ابزارهای پیشرفته تحلیل داده‌ها در سطح سازمان" },
      { name: "یکپارچه‌سازی", tooltip: "امکان یکپارچه‌سازی با سیستم‌های مدیریت منابع انسانی" },
    ],
    icon: <Building className="h-5 w-5 text-blue-500" />
  },
  { 
    category: "پشتیبانی و خدمات", 
    features: [
      { name: "پشتیبانی آنلاین", tooltip: "دسترسی به پشتیبانی آنلاین در ساعات کاری" },
      { name: "آموزش و راهنما", tooltip: "دسترسی به مستندات و ویدیوهای آموزشی" },
      { name: "پشتیبانی 24/7", tooltip: "دسترسی به پشتیبانی در تمام ساعات شبانه‌روز" },
      { name: "مدیر اختصاصی", tooltip: "تخصیص مدیر حساب اختصاصی برای پاسخگویی و پیگیری" },
    ],
    icon: <Headphones className="h-5 w-5 text-amber-500" />
  },
];

// ویژگی‌های ویژه قابل اضافه شدن
const addOns = [
  {
    name: "مشاوره تخصصی",
    description: "دسترسی به جلسات مشاوره آنلاین با روانشناسان متخصص",
    price: 799_000,
    priceLabel: "ماهانه",
    icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
    features: [
      "4 جلسه مشاوره آنلاین در ماه",
      "انتخاب از بین روانشناسان متخصص",
      "رزرو آنلاین جلسات",
      "پیگیری وضعیت با مشاور اختصاصی"
    ]
  },
  {
    name: "گزارش‌های پیشرفته",
    description: "دسترسی به ابزارهای تحلیلی و گزارش‌های پیشرفته",
    price: 349_000,
    priceLabel: "ماهانه",
    icon: <FileSpreadsheet className="h-8 w-8 text-tiffany" />,
    features: [
      "گزارش‌های تحلیلی پیشرفته",
      "نمودارهای تعاملی",
      "خروجی در فرمت‌های مختلف",
      "تنظیم گزارش‌های سفارشی"
    ]
  },
  {
    name: "آموزش سازمانی",
    description: "برگزاری دوره‌های آموزشی سلامت روان در سازمان",
    price: 1_999_000,
    priceLabel: "دوره‌ای",
    icon: <Users className="h-8 w-8 text-blue-500" />,
    features: [
      "کارگاه‌های آموزشی حضوری/آنلاین",
      "محتوای آموزشی اختصاصی",
      "گواهینامه معتبر",
      "پیگیری و ارزیابی نتایج"
    ]
  },
  {
    name: "API اختصاصی",
    description: "دسترسی کامل به API پلتفرم برای یکپارچه‌سازی",
    price: 599_000,
    priceLabel: "ماهانه",
    icon: <Zap className="h-8 w-8 text-amber-500" />,
    features: [
      "دسترسی به تمام endpoint ها",
      "مستندات کامل API",
      "پشتیبانی فنی اختصاصی",
      "10,000 درخواست روزانه"
    ]
  }
];

// سوالات متداول
const faqs = [
  {
    question: "آیا می‌توانم قبل از خرید اشتراک، پلتفرم را آزمایش کنم؟",
    answer: "بله، تمام پلن‌های پرانا شامل یک دوره آزمایشی 14 روزه رایگان هستند. در این مدت می‌توانید به تمام امکانات پلن انتخابی خود دسترسی داشته باشید و بدون هیچ محدودیتی پلتفرم را آزمایش کنید. در پایان دوره آزمایشی، تنها در صورت رضایت از پلتفرم، اشتراک شما فعال خواهد شد."
  },
  {
    question: "آیا امکان ارتقا یا تغییر پلن وجود دارد؟",
    answer: "بله، شما می‌توانید در هر زمان پلن خود را ارتقا دهید و از امکانات بیشتر بهره‌مند شوید. هزینه ارتقا به صورت متناسب با زمان باقی‌مانده از اشتراک فعلی شما محاسبه می‌شود. برای تغییر به پلن پایین‌تر، این تغییر در پایان دوره اشتراک فعلی اعمال خواهد شد."
  },
  {
    question: "داده‌های من چگونه محافظت می‌شوند؟",
    answer: "امنیت و محرمانگی داده‌های کاربران یکی از اولویت‌های اصلی پرانا است. تمام داده‌ها به صورت رمزنگاری‌شده ذخیره می‌شوند و تنها توسط افراد مجاز قابل دسترسی هستند. زیرساخت‌های ما مطابق با استانداردهای امنیتی بین‌المللی ISO 27001 طراحی شده‌اند و به طور منظم تحت ممیزی‌های امنیتی قرار می‌گیرند."
  },
  {
    question: "آیا می‌توانم اطلاعاتم را از پلتفرم خارج کنم؟",
    answer: "بله، در تمام پلن‌ها امکان دریافت خروجی از داده‌ها و گزارش‌ها وجود دارد. بسته به نوع پلن، فرمت‌های مختلفی مانند PDF، Excel و JSON در دسترس هستند. همچنین طبق قوانین حفاظت از داده‌ها، شما می‌توانید درخواست حذف کامل داده‌های خود را از سیستم داشته باشید."
  },
  {
    question: "آیا پرانا برای سازمان‌های کوچک هم مناسب است؟",
    answer: "بله، پرانا برای سازمان‌ها با هر اندازه‌ای طراحی شده است. برای سازمان‌های کوچک، پلن‌های پایه و حرفه‌ای با قیمت‌های مقرون به صرفه ارائه می‌شوند که شامل امکانات اصلی مورد نیاز برای مدیریت سلامت کارکنان هستند. با رشد سازمان، می‌توانید به راحتی پلن خود را ارتقا دهید."
  },
  {
    question: "آیا پشتیبانی فنی و آموزش استفاده از پلتفرم وجود دارد؟",
    answer: "بله، تمام پلن‌های پرانا شامل دسترسی به پشتیبانی فنی و مستندات آموزشی هستند. در پلن‌های پیشرفته‌تر، خدمات پشتیبانی گسترده‌تر مانند پشتیبانی 24/7 و مدیر حساب اختصاصی نیز ارائه می‌شود. همچنین، برای همه کاربران ویدیوهای آموزشی و وبینارهای رایگان برگزار می‌شود."
  },
  {
    question: "آیا امکان شخصی‌سازی پلتفرم مطابق با نیازهای سازمان ما وجود دارد؟",
    answer: "بله، به ویژه در پلن سازمانی، امکانات گسترده‌ای برای شخصی‌سازی پلتفرم وجود دارد. این شامل برندینگ اختصاصی، طراحی تست‌های سفارشی، تنظیم گزارش‌های اختصاصی و یکپارچه‌سازی با سیستم‌های موجود سازمان می‌شود. تیم ما می‌تواند با شما همکاری کرده تا پلتفرم کاملاً متناسب با نیازهای سازمان شما پیاده‌سازی شود."
  }
];

// تبدیل عدد به فرمت پول
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
};

// کامپوننت اصلی صفحه قیمت‌گذاری
export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>("pro");
  
  // محاسبه درصد تخفیف سالانه
  const getDiscountPercentage = (monthlyPrice: number, yearlyPrice: number) => {
    const monthlyCostPerYear = monthlyPrice * 12;
    const discount = monthlyCostPerYear - yearlyPrice;
    return Math.round((discount / monthlyCostPerYear) * 100);
  };
  
  return (
    <div className="container mx-auto py-12">
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge className="mb-4 px-3 py-1 bg-tiffany/10 text-tiffany border-tiffany/30">قیمت‌گذاری شفاف</Badge>
        <h1 className="text-4xl font-extrabold mb-4">تعرفه‌ها و پلن‌های اشتراکی پرانا</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          پلن متناسب با نیاز خود را انتخاب کنید و از مزایای پلتفرم هوشمند سلامت و نشاط سازمانی بهره‌مند شوید
        </p>
        
        <div className="flex items-center justify-center mb-8">
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-full">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'monthly' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              پرداخت ماهانه
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'yearly' 
                  ? 'bg-white dark:bg-slate-700 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              پرداخت سالانه
              <Badge className="mr-2 bg-green-500 text-white">
                20% تخفیف
              </Badge>
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* کارت‌های قیمت‌گذاری */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {standardPlans.map((plan, index) => {
          const isSelected = selectedPlan === plan.id;
          const discount = getDiscountPercentage(plan.price.monthly, plan.price.yearly);
          
          return (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <Card className={`border-2 h-full flex flex-col justify-between transition-all ${
                isSelected 
                  ? 'border-tiffany shadow-lg shadow-tiffany/10 dark:shadow-tiffany/5 scale-105 z-10' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-tiffany/30'
              }`}>
                {plan.badge && (
                  <div className="absolute -top-3 right-0 left-0 flex justify-center">
                    <Badge className="bg-amber-500 text-white px-3 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={`${plan.badge ? 'pt-6' : 'pt-4'}`}>
                  <CardTitle className="text-xl flex items-center">
                    {plan.id === 'starter' && <Activity className="h-5 w-5 ml-2 text-blue-500" />}
                    {plan.id === 'pro' && <Zap className="h-5 w-5 ml-2 text-amber-500" />}
                    {plan.id === 'enterprise' && <Building className="h-5 w-5 ml-2 text-purple-500" />}
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center">
                      <span className="text-3xl font-bold">
                        {formatCurrency(billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly)}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 mr-2">
                        {billingPeriod === 'monthly' ? '/ ماهانه' : '/ سالانه'}
                      </span>
                    </div>
                    
                    {billingPeriod === 'yearly' && (
                      <div className="mt-2 text-green-600 dark:text-green-400 text-sm flex items-center">
                        <CheckCircle2 className="h-4 w-4 ml-1" />
                        {discount}% تخفیف نسبت به پرداخت ماهانه
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-tiffany mb-3">
                      <Star className="h-4 w-4 ml-1" />
                      {plan.popularFeature}
                    </div>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <CheckCircle2 className="h-5 w-5 ml-2 text-emerald-500 flex-shrink-0" />
                          ) : (
                            <CircleDashed className="h-5 w-5 ml-2 text-slate-400 flex-shrink-0" />
                          )}
                          <span className={feature.included ? '' : 'text-slate-500 dark:text-slate-400'}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button 
                    className={`w-full ${
                      plan.id === 'pro'
                        ? 'bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light'
                        : plan.id === 'enterprise' 
                          ? 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100' 
                          : ''
                    }`}
                    variant={plan.id === 'starter' ? 'outline' : 'default'}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.ctaText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {/* جدول مقایسه پلن‌ها */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">مقایسه پلن‌ها</h2>
          <p className="text-slate-600 dark:text-slate-400">مقایسه کامل ویژگی‌های تمام پلن‌ها</p>
        </div>
        
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                <TableHead className="text-right w-1/4">ویژگی‌ها</TableHead>
                <TableHead className="text-center">پایه</TableHead>
                <TableHead className="text-center bg-tiffany/5 dark:bg-tiffany/10">
                  <div className="flex flex-col items-center">
                    <span>حرفه‌ای</span>
                    <Badge className="mt-1 bg-amber-500 text-white">پیشنهادی</Badge>
                  </div>
                </TableHead>
                <TableHead className="text-center">سازمانی</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planFeatures.map((category, index) => (
                <>
                  <TableRow key={`category-${index}`} className="bg-slate-50/50 dark:bg-slate-800/20">
                    <TableCell colSpan={4} className="font-medium">
                      <div className="flex items-center">
                        {category.icon}
                        <span className="mr-2">{category.category}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  {category.features.map((feature, featureIndex) => (
                    <TableRow key={`feature-${index}-${featureIndex}`}>
                      <TableCell className="border-r">
                        <div className="flex items-center">
                          <span>{feature.name}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 mr-1 text-slate-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell className="text-center border-r">
                        {featureIndex < 1 ? (
                          <CheckCircle2 className="h-5 w-5 mx-auto text-emerald-500" />
                        ) : (
                          <CircleDashed className="h-5 w-5 mx-auto text-slate-300 dark:text-slate-600" />
                        )}
                      </TableCell>
                      <TableCell className="text-center border-r bg-tiffany/5 dark:bg-tiffany/10">
                        {featureIndex < 3 ? (
                          <CheckCircle2 className="h-5 w-5 mx-auto text-emerald-500" />
                        ) : (
                          <CircleDashed className="h-5 w-5 mx-auto text-slate-300 dark:text-slate-600" />
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <CheckCircle2 className="h-5 w-5 mx-auto text-emerald-500" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      
      {/* افزونه‌های اختیاری */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">خدمات و افزونه‌های اختیاری</h2>
          <p className="text-slate-600 dark:text-slate-400">این خدمات را می‌توانید به هر پلن اضافه کنید</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {addOns.map((addon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-dashed hover:border-tiffany hover:shadow-sm transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
                    {addon.icon}
                  </div>
                  <CardTitle className="text-base">{addon.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {addon.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {addon.priceLabel}
                    </span>
                    <span className="font-bold">
                      {formatCurrency(addon.price)}
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {addon.features.map((feature, featIndex) => (
                      <li key={featIndex} className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 ml-2 text-emerald-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">افزودن به پلن</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* تعرفه‌های سازمانی */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-tiffany/20 to-aqua/20 dark:from-tiffany/10 dark:to-aqua/10 p-8 rounded-2xl relative overflow-hidden">
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-tiffany/20 to-aqua/20 rounded-full blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          <div className="relative z-10 md:max-w-2xl">
            <Badge className="bg-white dark:bg-slate-800 text-tiffany mb-4">ویژه سازمان‌ها</Badge>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              راهکارهای اختصاصی برای سازمان‌های بزرگ
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-6">
              برای سازمان‌های با بیش از 50 کاربر، راهکارهای اختصاصی با تعرفه‌های ویژه ارائه می‌دهیم. تیم ما آماده همکاری با شما برای طراحی و پیاده‌سازی راهکاری متناسب با نیازهای خاص سازمان شماست.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100">
                <HeartHandshake className="h-5 w-5 ml-2" />
                تماس با کارشناسان فروش
              </Button>
              <Button variant="outline" className="bg-white/80 dark:bg-transparent">
                <FileSpreadsheet className="h-5 w-5 ml-2" />
                دریافت کاتالوگ سازمانی
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* سوالات متداول */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">سوالات متداول</h2>
          <p className="text-slate-600 dark:text-slate-400">پاسخ به سوالات رایج درباره تعرفه‌ها و پلن‌ها</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      {/* بخش تماس با ما */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-3">هنوز سوالی دارید؟</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          تیم پشتیبانی ما آماده پاسخگویی به تمام سوالات شما درباره پلن‌ها و خدمات پرانا است
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="flex items-center">
            <MessageSquare className="h-5 w-5 ml-2" />
            گفتگو با پشتیبانی
          </Button>
          <Button variant="outline" className="flex items-center">
            <Mail className="h-5 w-5 ml-2" />
            ارسال ایمیل
          </Button>
          <Button variant="outline" className="flex items-center">
            <Phone className="h-5 w-5 ml-2" />
            تماس با ما
          </Button>
        </div>
      </div>
    </div>
  );
}

// تعریف کامپوننت‌های لوسید که قبلاً موجود نبودند
const Phone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CircleDashed = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M10.1 2.182C6.547 2.96 3.818 5.838 3.182 9.4" />
    <path d="M2.18 13.9c.778 3.553 3.656 6.282 7.218 6.918" />
    <path d="M13.9 21.818c3.553-.778 6.282-3.656 6.918-7.218" />
    <path d="M21.818 10.1c-.778-3.553-3.656-6.282-7.218-6.918" />
  </svg>
);

const Mail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);