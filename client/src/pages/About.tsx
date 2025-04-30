import { motion } from "framer-motion";
import { 
  Book, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Award,
  BarChart3, 
  Code,
  Database,
  FileSpreadsheet, 
  Flag, 
  Globe, 
  Heart, 
  HeartHandshake, 
  History, 
  LightbulbIcon,
  Medal,
  MessageSquare,
  MilitaryMedal,
  Shield,
  SparklesIcon, 
  Target, 
  ThumbsUp, 
  Bolt,
  UsersRound,
  BadgeCheck,
  LineChart,
  Smartphone,
  Brain,
  HelpingHand
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// تیم رهبری شرکت
const leadershipTeam = [
  {
    name: "دکتر محمد احمدی",
    title: "بنیان‌گذار و مدیرعامل",
    bio: "دکتری روانشناسی صنعتی و سازمانی از دانشگاه تهران با بیش از 15 سال سابقه در زمینه سلامت روان سازمانی و بهبود عملکرد کارکنان",
    image: "https://i.pravatar.cc/300?img=1"
  },
  {
    name: "مهندس سارا محمدی",
    title: "مدیر ارشد فناوری",
    bio: "فارغ‌التحصیل مهندسی کامپیوتر از دانشگاه شریف با تخصص در هوش مصنوعی و تحلیل داده‌های سلامت",
    image: "https://i.pravatar.cc/300?img=5"
  },
  {
    name: "دکتر علی کریمی",
    title: "مدیر ارشد بخش روانشناسی",
    bio: "دکتری روانشناسی بالینی با تخصص در تست‌های روانشناختی و ارزیابی‌های شخصیت",
    image: "https://i.pravatar.cc/300?img=8"
  },
  {
    name: "مهندس نیما رضایی",
    title: "مدیر ارشد محصول",
    bio: "کارشناسی ارشد MBA با بیش از 10 سال تجربه در طراحی و توسعه محصولات نرم‌افزاری در حوزه سلامت",
    image: "https://i.pravatar.cc/300?img=4"
  },
];

// مشتریان و شرکای تجاری
const partners = [
  {
    name: "دانشگاه تهران",
    logo: "https://via.placeholder.com/150",
    type: "academic"
  },
  {
    name: "شرکت صنایع پتروشیمی",
    logo: "https://via.placeholder.com/150",
    type: "corporate"
  },
  {
    name: "انجمن روانشناسی ایران",
    logo: "https://via.placeholder.com/150",
    type: "academic"
  },
  {
    name: "شرکت ملی نفت ایران",
    logo: "https://via.placeholder.com/150",
    type: "corporate"
  },
  {
    name: "سازمان بهداشت و درمان صنعت نفت",
    logo: "https://via.placeholder.com/150",
    type: "healthcare"
  },
  {
    name: "دانشگاه علوم پزشکی تهران",
    logo: "https://via.placeholder.com/150",
    type: "academic"
  },
  {
    name: "بیمه سلامت ایران",
    logo: "https://via.placeholder.com/150",
    type: "healthcare"
  },
  {
    name: "گروه صنعتی گلرنگ",
    logo: "https://via.placeholder.com/150",
    type: "corporate"
  },
];

// ویژگی‌های کلیدی
const keyFeatures = [
  {
    title: "تست‌های روانشناسی معتبر",
    description: "بیش از 25 تست استاندارد روانشناسی با اعتبارسنجی علمی",
    icon: <Brain className="h-10 w-10 text-purple-500" />
  },
  {
    title: "پایش سلامت سازمانی",
    description: "تحلیل و نمایش شاخص‌های سلامت روان در سطح سازمان",
    icon: <LineChart className="h-10 w-10 text-blue-500" />
  },
  {
    title: "چالش‌های سلامت روزانه",
    description: "فعالیت‌های انگیزشی و گیمیفیکیشن برای بهبود سلامت",
    icon: <Target className="h-10 w-10 text-rose-500" />
  },
  {
    title: "هوش مصنوعی پیشرفته",
    description: "الگوریتم‌های یادگیری ماشین برای تحلیل و پیش‌بینی",
    icon: <SparklesIcon className="h-10 w-10 text-amber-500" />
  },
  {
    title: "گزارش‌های هوشمند",
    description: "گزارش‌های سفارشی و داشبوردهای مدیریتی پیشرفته",
    icon: <FileSpreadsheet className="h-10 w-10 text-tiffany" />
  },
  {
    title: "پشتیبانی تخصصی",
    description: "مشاوره و پشتیبانی توسط متخصصان روانشناسی و فناوری",
    icon: <HelpingHand className="h-10 w-10 text-emerald-500" />
  },
];

// داستان شرکت
const companyStory = [
  {
    year: "1398",
    title: "تولد ایده پرانا",
    description: "پس از سال‌ها مطالعه در زمینه سلامت روان سازمانی، دکتر محمد احمدی ایده اولیه پرانا را برای بهبود وضعیت سلامت روان کارکنان مطرح کرد.",
    icon: <LightbulbIcon className="h-6 w-6 text-amber-500" />
  },
  {
    year: "1399",
    title: "تشکیل تیم اولیه",
    description: "تیمی متشکل از متخصصان روانشناسی و مهندسان نرم‌افزار برای توسعه نسخه اولیه پلتفرم گرد هم آمدند.",
    icon: <UsersRound className="h-6 w-6 text-blue-500" />
  },
  {
    year: "1400",
    title: "راه‌اندازی نسخه آزمایشی",
    description: "نسخه آزمایشی پرانا با همکاری چند سازمان پیشرو راه‌اندازی شد و اولین داده‌های سلامت روان سازمانی جمع‌آوری گردید.",
    icon: <Bolt className="h-6 w-6 text-purple-500" />
  },
  {
    year: "1401",
    title: "توسعه فناوری هوش مصنوعی",
    description: "الگوریتم‌های پیشرفته هوش مصنوعی برای تحلیل داده‌های سلامت و ارائه توصیه‌های شخصی به پلتفرم اضافه شد.",
    icon: <Brain className="h-6 w-6 text-tiffany" />
  },
  {
    year: "1402",
    title: "گسترش در سطح ملی",
    description: "پرانا به عنوان پیشرو در حوزه سلامت روان سازمانی با ده‌ها سازمان بزرگ قرارداد همکاری امضا کرد.",
    icon: <Globe className="h-6 w-6 text-green-500" />
  },
  {
    year: "1403",
    title: "آینده پرانا",
    description: "با هدف ارتقای سلامت روان میلیون‌ها کارمند، پرانا در حال توسعه راهکارهای نوآورانه و همکاری‌های بین‌المللی است.",
    icon: <Target className="h-6 w-6 text-rose-500" />
  },
];

// اعتبارسنجی‌ها و گواهینامه‌ها
const certifications = [
  {
    name: "ISO 27001",
    description: "استاندارد بین‌المللی مدیریت امنیت اطلاعات",
    icon: <Shield className="h-8 w-8 text-tiffany" />
  },
  {
    name: "ISO 9001",
    description: "استاندارد بین‌المللی مدیریت کیفیت",
    icon: <BadgeCheck className="h-8 w-8 text-blue-500" />
  },
  {
    name: "انجمن روانشناسی آمریکا (APA)",
    description: "تایید اعتبار علمی تست‌های روانشناختی",
    icon: <Brain className="h-8 w-8 text-purple-500" />
  },
  {
    name: "جایزه نوآوری سلامت دیجیتال",
    description: "برنده جایزه بهترین استارتاپ حوزه سلامت روان",
    icon: <Award className="h-8 w-8 text-amber-500" />
  },
  {
    name: "GDPR Compliant",
    description: "مطابق با استانداردهای حفاظت از داده‌های شخصی",
    icon: <Lock className="h-8 w-8 text-emerald-500" />
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      {/* بخش اصلی معرفی */}
      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 px-3 py-1 bg-tiffany/10 text-tiffany border-tiffany/30">درباره پرانا</Badge>
          <h1 className="text-4xl font-extrabold mb-4">پلتفرم هوشمند <span className="bg-gradient-to-r from-tiffany to-aqua bg-clip-text text-transparent">سلامت و نشاط سازمانی</span></h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            پرانا (پلتفرم روانشناسی، ارزیابی و نشاط اداری) یک سیستم هوشمند مبتنی بر هوش مصنوعی است که با استفاده از تست‌های معتبر روانشناسی، ابزارهای پایش سلامت و تکنیک‌های گیمیفیکیشن، به بهبود سلامت روان و افزایش بهره‌وری کارکنان در سازمان‌ها کمک می‌کند.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mt-0.5 ml-2 text-tiffany" />
              <p className="text-slate-700 dark:text-slate-300">
                <span className="font-semibold">اعتبارسنجی علمی:</span> تمام تست‌ها و ابزارهای ارزیابی پرانا بر اساس استانداردهای علمی روانشناسی طراحی و اعتبارسنجی شده‌اند.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mt-0.5 ml-2 text-tiffany" />
              <p className="text-slate-700 dark:text-slate-300">
                <span className="font-semibold">امنیت اطلاعات:</span> با رعایت بالاترین استانداردهای امنیتی، حریم خصوصی و محرمانگی داده‌های کاربران را تضمین می‌کنیم.
              </p>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mt-0.5 ml-2 text-tiffany" />
              <p className="text-slate-700 dark:text-slate-300">
                <span className="font-semibold">فناوری پیشرفته:</span> با استفاده از هوش مصنوعی و الگوریتم‌های یادگیری ماشین، توصیه‌های شخصی‌سازی شده برای بهبود سلامت ارائه می‌دهیم.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light">
              <HeartHandshake className="h-5 w-5 ml-2" />
              درخواست همکاری
            </Button>
            <Button variant="outline">
              <Calendar className="h-5 w-5 ml-2" />
              رزرو جلسه معرفی
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full max-w-lg aspect-video rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-tiffany/10 to-aqua/10 backdrop-blur-sm"></div>
            <img 
              src="https://via.placeholder.com/700x400" 
              alt="پلتفرم پرانا" 
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-xs bg-white/80 dark:bg-slate-900/80 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2">ماموریت ما</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  ارتقای سلامت روان و بهبود کیفیت زندگی کاری میلیون‌ها نفر از طریق ابزارهای نوآورانه و مبتنی بر شواهد علمی
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* آمار و دستاوردها */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">آمار و دستاوردهای ما</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            پرانا با بهره‌گیری از تیمی متخصص و فناوری‌های پیشرفته، به بهبود سلامت روان هزاران کارمند در سازمان‌های مختلف کمک کرده است
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center border-0 bg-slate-50 dark:bg-slate-800">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
                <UsersRound className="h-6 w-6 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-3xl font-bold mb-1">+۱۵۰,۰۰۰</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">کاربر فعال</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-slate-50 dark:bg-slate-800">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto">
                <Building className="h-6 w-6 text-rose-500" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-3xl font-bold mb-1">+۱۲۰</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">سازمان همکار</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-slate-50 dark:bg-slate-800">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto">
                <Brain className="h-6 w-6 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-3xl font-bold mb-1">+۲,۰۰۰,۰۰۰</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">تست تکمیل شده</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 bg-slate-50 dark:bg-slate-800">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 bg-tiffany/10 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="h-6 w-6 text-tiffany" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-3xl font-bold mb-1">۹۷%</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">رضایت کاربران</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* ویژگی‌های کلیدی */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">ویژگی‌های کلیدی پرانا</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            راهکار جامع سلامت روان سازمانی با ترکیبی از تست‌های روانشناسی، ابزارهای پایش و تکنیک‌های گیمیفیکیشن
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-sm bg-white dark:bg-slate-900">
                <CardHeader>
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* تیم ما */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">تیم رهبری پرانا</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            متخصصان برجسته در زمینه‌های روانشناسی، هوش مصنوعی و توسعه نرم‌افزار
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-sm overflow-hidden bg-white dark:bg-slate-900">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="outline" className="text-xs font-normal bg-slate-100 dark:bg-slate-800">
                    {member.title}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* داستان شرکت */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">داستان پرانا</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            از ایده تا تبدیل شدن به پیشرو در حوزه سلامت روان سازمانی
          </p>
        </div>
        
        <div className="relative border-r-2 border-slate-200 dark:border-slate-700 mr-6 md:mr-0 md:mx-auto md:max-w-3xl pl-4">
          {companyStory.map((milestone, index) => (
            <motion.div 
              key={index}
              className="mb-12 relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute right-[-34px] md:right-[calc(100%+1.5rem)] top-0 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-tiffany z-10 flex items-center justify-center">
                {milestone.icon}
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <Badge className="bg-tiffany/10 text-tiffany border-tiffany/30">
                    {milestone.year}
                  </Badge>
                  <h3 className="font-bold mr-3">{milestone.title}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* اعتبارسنجی‌ها */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">اعتبارسنجی‌ها و گواهینامه‌ها</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            استانداردهای کیفیت و امنیت در سطح جهانی
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-sm text-center bg-white dark:bg-slate-900">
                <CardHeader className="pb-2">
                  <div className="mx-auto mb-4">
                    {cert.icon}
                  </div>
                  <CardTitle className="text-base">{cert.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* همکاران و مشتریان */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">مشتریان و شرکای ما</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            سازمان‌ها و شرکت‌های معتبری که به پرانا اعتماد کرده‌اند
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mx-auto w-fit">
            <TabsTrigger value="all">همه</TabsTrigger>
            <TabsTrigger value="corporate">شرکت‌ها</TabsTrigger>
            <TabsTrigger value="academic">دانشگاه‌ها</TabsTrigger>
            <TabsTrigger value="healthcare">سلامت</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-16 opacity-80 hover:opacity-100 transition-opacity" 
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="corporate" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners
                .filter(p => p.type === 'corporate')
                .map((partner, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-16 opacity-80 hover:opacity-100 transition-opacity" 
                    />
                  </div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="academic" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners
                .filter(p => p.type === 'academic')
                .map((partner, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-16 opacity-80 hover:opacity-100 transition-opacity" 
                    />
                  </div>
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="healthcare" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners
                .filter(p => p.type === 'healthcare')
                .map((partner, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-16 opacity-80 hover:opacity-100 transition-opacity" 
                    />
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* فناوری پرانا */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">فناوری‌های پرانا</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            ترکیبی از آخرین دستاوردهای علم روانشناسی و فناوری‌های پیشرفته هوش مصنوعی
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="pb-2">
              <Badge className="bg-purple-500 text-white w-fit mb-2">روانشناسی</Badge>
              <CardTitle>اعتبارسنجی علمی تست‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                تمام تست‌های روانشناسی پرانا بر اساس استانداردهای بین‌المللی طراحی و اعتبارسنجی شده‌اند. این تست‌ها توسط تیمی از روانشناسان متخصص به طور مداوم بازبینی و به‌روزرسانی می‌شوند.
              </p>
              
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>روش‌های اعتبارسنجی</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pr-5 space-y-2 text-slate-600 dark:text-slate-400">
                      <li>بررسی روایی محتوایی توسط متخصصان</li>
                      <li>محاسبه ضریب آلفای کرونباخ برای سنجش پایایی</li>
                      <li>تحلیل عاملی تاییدی</li>
                      <li>مطالعات روایی همگرا و واگرا</li>
                      <li>استانداردسازی بر روی نمونه‌های متنوع</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>منابع علمی</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      تست‌های روانشناسی پرانا بر اساس منابع علمی معتبر از جمله:
                    </p>
                    <ul className="list-disc pr-5 space-y-1 text-slate-600 dark:text-slate-400">
                      <li>راهنمای تشخیصی و آماری اختلالات روانی (DSM-5)</li>
                      <li>انجمن روانشناسی آمریکا (APA)</li>
                      <li>نشریات علمی معتبر روانشناسی</li>
                      <li>کتاب‌های مرجع روانشناسی صنعتی و سازمانی</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="pb-2">
              <Badge className="bg-tiffany text-white w-fit mb-2">هوش مصنوعی</Badge>
              <CardTitle>فناوری‌های پیشرفته و هوشمند</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                پرانا از الگوریتم‌های پیشرفته هوش مصنوعی و یادگیری ماشین برای تحلیل داده‌ها، شناسایی الگوها و ارائه توصیه‌های شخصی‌سازی شده استفاده می‌کند.
              </p>
              
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>فناوری‌های مورد استفاده</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pr-5 space-y-2 text-slate-600 dark:text-slate-400">
                      <li>الگوریتم‌های یادگیری عمیق برای تحلیل داده‌ها</li>
                      <li>پردازش زبان طبیعی (NLP) برای تحلیل پاسخ‌های متنی</li>
                      <li>مدل‌های پیش‌بینی برای شناسایی ریسک‌های سلامت روان</li>
                      <li>سیستم‌های توصیه‌گر برای ارائه پیشنهادات شخصی‌سازی شده</li>
                      <li>رابط کاربری هوشمند و سازگار با نیازهای کاربر</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>امنیت داده‌ها</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400 mb-2">
                      حفاظت از داده‌های کاربران با استفاده از:
                    </p>
                    <ul className="list-disc pr-5 space-y-1 text-slate-600 dark:text-slate-400">
                      <li>رمزنگاری پیشرفته داده‌ها</li>
                      <li>احراز هویت چند مرحله‌ای</li>
                      <li>ممیزی منظم امنیتی</li>
                      <li>محدودیت دسترسی بر اساس نقش‌ها</li>
                      <li>پروتکل‌های امن انتقال داده</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* تماس با ما */}
      <div className="rounded-2xl bg-gradient-to-r from-tiffany/10 to-aqua/10 dark:from-tiffany/5 dark:to-aqua/5 p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">آماده همکاری با پرانا هستید؟</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            با تیم ما تماس بگیرید تا درباره نحوه استفاده از پرانا در سازمان خود مشاوره رایگان دریافت کنید.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light">
              <HeartHandshake className="h-5 w-5 ml-2" />
              درخواست مشاوره رایگان
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-5 w-5 ml-2" />
              گفتگو با پشتیبانی
            </Button>
            <Button variant="outline">
              <Mail className="h-5 w-5 ml-2" />
              تماس با ما
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// تعریف کامپوننت‌های لوسید که قبلاً موجود نبودند

const Trophy = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const Building = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const Lock = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const HelpingHand = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M4 14v6" />
    <path d="M4 18a4 4 0 0 1 4 4" />
    <path d="M8 22a8 8 0 0 0 8-8" />
    <path d="M12 16a4 4 0 0 0 8 0" />
    <path d="M16 8V4c0-.5.5-1 1-1s1 .5 1 1v4" />
    <path d="M11 7V4c0-.5.5-1 1-1s1 .5 1 1v3" />
    <path d="M6 9V4c0-.5.5-1 1-1s1 .5 1 1v4" />
    <path d="M20 7V6" />
    <path d="M14 4v3" />
    <path d="M8 8v1" />
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