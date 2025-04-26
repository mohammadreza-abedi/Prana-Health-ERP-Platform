import { motion } from "framer-motion";
import { 
  Shield, 
  FileText, 
  Scale, 
  Lock, 
  Eye, 
  HelpCircle, 
  BadgeAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Wallet, 
  BookOpen, 
  Clock, 
  Download,
  BookUserIcon,
  BriefcaseIcon,
  GavelIcon,
  TimerIcon,
  ArrowDownIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// تاریخ به‌روزرسانی
const lastUpdated = "۵ مرداد ۱۴۰۳";

// بخش‌های قوانین و مقررات
const sections = [
  {
    id: "terms",
    title: "شرایط استفاده از خدمات",
    description: "قوانین کلی استفاده از سرویس‌های پرانا",
    icon: <FileText className="h-5 w-5 text-indigo-500" />
  },
  {
    id: "privacy",
    title: "حریم خصوصی",
    description: "نحوه جمع‌آوری، استفاده و حفاظت از داده‌های شما",
    icon: <Lock className="h-5 w-5 text-tiffany" />
  },
  {
    id: "data",
    title: "حفاظت از داده‌ها",
    description: "روش‌های محافظت و مدیریت داده‌های کاربران",
    icon: <Shield className="h-5 w-5 text-green-500" />
  },
  {
    id: "payments",
    title: "شرایط پرداخت",
    description: "قوانین مربوط به پرداخت‌ها، استرداد و صورت‌حساب‌ها",
    icon: <Wallet className="h-5 w-5 text-amber-500" />
  },
  {
    id: "intellectual",
    title: "مالکیت معنوی",
    description: "حقوق مالکیت معنوی محتوا و خدمات",
    icon: <BookUserIcon className="h-5 w-5 text-blue-500" />
  },
  {
    id: "conduct",
    title: "قوانین رفتاری",
    description: "استانداردهای رفتاری مورد انتظار از کاربران",
    icon: <Users className="h-5 w-5 text-rose-500" />
  },
  {
    id: "limitations",
    title: "محدودیت مسئولیت",
    description: "محدودیت‌های مسئولیت پرانا در قبال خدمات",
    icon: <Scale className="h-5 w-5 text-purple-500" />
  },
  {
    id: "termination",
    title: "خاتمه خدمات",
    description: "شرایط تعلیق یا خاتمه دسترسی به خدمات",
    icon: <TimerIcon className="h-5 w-5 text-orange-500" />
  },
];

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12">
      <motion.div 
        className="max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <Badge className="mb-4 px-3 py-1 bg-slate-100 dark:bg-slate-800">
            <Clock className="h-4 w-4 ml-1" />
            آخرین به‌روزرسانی: {lastUpdated}
          </Badge>
          <h1 className="text-3xl font-bold mb-4">قوانین و مقررات استفاده از پرانا</h1>
          <p className="text-slate-600 dark:text-slate-400">
            لطفاً این سند را با دقت مطالعه کنید. استفاده از خدمات پرانا به معنای پذیرش این قوانین و مقررات است.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 ml-2 text-yellow-500" />
              خلاصه قوانین کلیدی
            </CardTitle>
            <CardDescription>
              موارد مهمی که باید از آن‌ها آگاه باشید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mt-0.5 ml-2 text-emerald-500 flex-shrink-0" />
                <span>پرانا یک ابزار کمکی است و جایگزین مشاوره تخصصی پزشکی یا روانشناسی نیست.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mt-0.5 ml-2 text-emerald-500 flex-shrink-0" />
                <span>ما از داده‌های شما محافظت می‌کنیم و آن‌ها را طبق سیاست حریم خصوصی خود استفاده می‌کنیم.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mt-0.5 ml-2 text-emerald-500 flex-shrink-0" />
                <span>کاربران نباید از پلتفرم برای اهداف غیرقانونی یا ارسال محتوای نامناسب استفاده کنند.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mt-0.5 ml-2 text-emerald-500 flex-shrink-0" />
                <span>پرانا می‌تواند در صورت نقض قوانین، دسترسی کاربران را به خدمات محدود یا قطع کند.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {sections.map((section) => (
            <Button 
              key={section.id} 
              variant="outline" 
              className="flex items-center"
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {section.icon}
              <span className="mr-2">{section.title}</span>
            </Button>
          ))}
        </div>
      </motion.div>
      
      {/* بخش اصلی قوانین */}
      <div className="max-w-3xl mx-auto">
        <section id="terms" className="mb-16">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 ml-3 text-indigo-500" />
            <h2 className="text-2xl font-bold">شرایط استفاده از خدمات</h2>
          </div>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">۱. پذیرش شرایط</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                با دسترسی به سایت پرانا یا استفاده از هر یک از خدمات آن، شما موافقت می‌کنید که به این شرایط استفاده، سیاست حریم خصوصی و هرگونه اعلان حقوقی دیگر که توسط ما منتشر می‌شود، پایبند باشید. اگر با این شرایط موافق نیستید، لطفاً از استفاده از خدمات ما خودداری کنید.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۲. تغییرات در شرایط</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                پرانا حق تغییر، اصلاح یا به‌روزرسانی این شرایط را در هر زمان و بدون اطلاع قبلی حفظ می‌کند. تغییرات با انتشار شرایط به‌روزرسانی شده در وب‌سایت ما اعمال می‌شوند. استفاده مداوم شما از خدمات پس از انتشار هرگونه تغییر، به معنای پذیرش این تغییرات است.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۳. شرایط خدمت</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                استفاده از خدمات پرانا مشمول مقررات و محدودیت‌های زیر است:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-slate-600 dark:text-slate-400">
                <li>شما باید حداقل ۱۸ سال سن داشته باشید یا با نظارت والدین یا سرپرست قانونی از خدمات استفاده کنید.</li>
                <li>اطلاعات ارائه شده توسط شما باید دقیق، کامل و به‌روز باشد.</li>
                <li>شما مسئول حفظ محرمانگی اطلاعات حساب خود، از جمله رمز عبور، هستید.</li>
                <li>شما نباید از خدمات برای اهداف غیرقانونی یا غیرمجاز استفاده کنید.</li>
                <li>پرانا یک ابزار کمکی است و جایگزین مشاوره تخصصی پزشکی یا روانشناسی نیست.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۴. ایجاد حساب کاربری</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                برای استفاده از برخی از خدمات پرانا، ممکن است نیاز به ایجاد یک حساب کاربری داشته باشید. در این صورت، شما موافقت می‌کنید که اطلاعات دقیق، کامل و به‌روز را ارائه دهید. اگر اطلاعات ارائه شده نادرست، ناقص یا قدیمی باشد، ممکن است دسترسی شما به حساب کاربری محدود یا لغو شود.
              </p>
            </div>
          </div>
        </section>
        
        <section id="privacy" className="mb-16">
          <div className="flex items-center mb-4">
            <Lock className="h-6 w-6 ml-3 text-tiffany" />
            <h2 className="text-2xl font-bold">سیاست حریم خصوصی</h2>
          </div>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">۱. اطلاعات جمع‌آوری شده</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                ما ممکن است انواع مختلفی از اطلاعات را از کاربران خود جمع‌آوری کنیم، از جمله:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-slate-600 dark:text-slate-400">
                <li><span className="font-medium">اطلاعات شخصی:</span> نام، آدرس ایمیل، شماره تلفن و سایر اطلاعات تماس.</li>
                <li><span className="font-medium">اطلاعات پروفایل:</span> سن، جنسیت، شغل و سایر اطلاعات جمعیت‌شناختی.</li>
                <li><span className="font-medium">اطلاعات سلامت:</span> پاسخ‌های شما به آزمون‌ها، پرسشنامه‌ها و ارزیابی‌ها.</li>
                <li><span className="font-medium">اطلاعات استفاده:</span> نحوه تعامل شما با خدمات ما، از جمله ویژگی‌هایی که استفاده می‌کنید و زمانی که صرف می‌کنید.</li>
                <li><span className="font-medium">اطلاعات دستگاه:</span> نوع دستگاه، سیستم عامل، مرورگر و آدرس IP.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۲. نحوه استفاده از اطلاعات</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                ما ممکن است از اطلاعات جمع‌آوری شده برای اهداف زیر استفاده کنیم:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-slate-600 dark:text-slate-400">
                <li>ارائه، حفظ و بهبود خدمات خود.</li>
                <li>شخصی‌سازی تجربه شما و ارائه محتوا و پیشنهادات متناسب.</li>
                <li>ارتباط با شما در مورد حساب کاربری، به‌روزرسانی‌ها و اطلاعیه‌های مهم.</li>
                <li>تحلیل استفاده از خدمات و بهبود ویژگی‌ها.</li>
                <li>تحقیق و توسعه برای بهبود خدمات پرانا.</li>
                <li>محافظت از حقوق، اموال یا ایمنی پرانا، کاربران ما یا دیگران.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۳. به اشتراک‌گذاری اطلاعات</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                ما اطلاعات شخصی شما را با اشخاص ثالث به اشتراک نمی‌گذاریم، مگر در موارد زیر:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-slate-600 dark:text-slate-400">
                <li><span className="font-medium">ارائه‌دهندگان خدمات:</span> ممکن است اطلاعات را با شرکت‌هایی که خدماتی را از طرف ما انجام می‌دهند، مانند خدمات میزبانی وب یا تحلیل داده‌ها، به اشتراک بگذاریم.</li>
                <li><span className="font-medium">سازمان شما:</span> اگر از طریق سازمان یا کارفرمای خود به پرانا دسترسی دارید، ممکن است اطلاعات تجمیعی و بدون شناسه را با آن سازمان به اشتراک بگذاریم.</li>
                <li><span className="font-medium">الزامات قانونی:</span> ممکن است اطلاعات را در پاسخ به درخواست‌های قانونی، مانند احضاریه یا حکم دادگاه، افشا کنیم.</li>
                <li><span className="font-medium">محافظت از حقوق:</span> ممکن است اطلاعات را برای محافظت از حقوق، اموال یا ایمنی پرانا، کاربران ما یا دیگران افشا کنیم.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۴. حقوق حریم خصوصی شما</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                بسته به موقعیت جغرافیایی شما، ممکن است حقوق خاصی در رابطه با اطلاعات شخصی خود داشته باشید، از جمله:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-slate-600 dark:text-slate-400">
                <li>دسترسی به اطلاعات شخصی که ما درباره شما داریم.</li>
                <li>تصحیح اطلاعات نادرست یا ناقص.</li>
                <li>حذف اطلاعات شخصی شما در شرایط خاص.</li>
                <li>محدود کردن یا اعتراض به پردازش اطلاعات شما.</li>
                <li>دریافت اطلاعات خود در قالب قابل استفاده و انتقال آن به سرویس دیگر.</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
                برای اعمال هر یک از این حقوق، لطفاً از طریق اطلاعات تماس ذکر شده در پایین این صفحه با ما تماس بگیرید.
              </p>
            </div>
          </div>
        </section>
        
        <section id="data" className="mb-16">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 ml-3 text-green-500" />
            <h2 className="text-2xl font-bold">حفاظت از داده‌ها</h2>
          </div>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">۱. امنیت داده‌ها</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                امنیت اطلاعات شما برای ما اهمیت زیادی دارد. ما اقدامات فنی، اداری و فیزیکی مناسبی را برای محافظت از اطلاعات شخصی شما در برابر دسترسی، استفاده یا افشای غیرمجاز اتخاذ می‌کنیم. این اقدامات شامل رمزگذاری داده‌ها، کنترل‌های دسترسی، دیوارهای آتش و شیوه‌های امنیتی استاندارد صنعت است.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۲. نگهداری داده‌ها</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                ما اطلاعات شخصی شما را تا زمانی که برای اهداف مشخص شده در این سیاست حریم خصوصی لازم باشد، نگهداری می‌کنیم. مدت زمان نگهداری به عوامل مختلفی بستگی دارد، از جمله نوع اطلاعات، دلیل جمع‌آوری و الزامات قانونی. پس از پایان دوره نگهداری، اطلاعات شما به صورت امن حذف یا بی‌نام می‌شوند.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۳. انتقال بین‌المللی داده‌ها</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                پرانا یک شرکت ایرانی است و سرورهای ما در داخل کشور قرار دارند. با این حال، برخی از ارائه‌دهندگان خدمات ما ممکن است در خارج از ایران مستقر باشند. هنگامی که اطلاعات شما به خارج از کشور منتقل می‌شود، ما اقدامات مناسبی را برای اطمینان از اینکه اطلاعات شما از سطح مناسبی از حفاظت برخوردار است، انجام می‌دهیم.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۴. نقض داده‌ها</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                در صورت وقوع نقض داده‌ها که ممکن است خطری را برای حقوق و آزادی‌های شما ایجاد کند، ما بدون تأخیر غیرمعقول و در صورت امکان، حداکثر ظرف ۷۲ ساعت پس از آگاهی از آن، به شما اطلاع خواهیم داد. این اطلاعیه شامل ماهیت نقض، اطلاعات تماس مسئول حفاظت از داده‌ها، پیامدهای احتمالی نقض و اقداماتی که برای رسیدگی به آن انجام داده‌ایم یا پیشنهاد می‌کنیم، خواهد بود.
              </p>
            </div>
          </div>
        </section>
        
        <section id="payments" className="mb-16">
          <div className="flex items-center mb-4">
            <Wallet className="h-6 w-6 ml-3 text-amber-500" />
            <h2 className="text-2xl font-bold">شرایط پرداخت</h2>
          </div>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">۱. قیمت‌گذاری و پلن‌ها</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                قیمت‌ها و جزئیات پلن‌های اشتراکی ما در صفحه قیمت‌گذاری وب‌سایت ما ارائه شده است. ما حق تغییر قیمت‌ها یا شرایط پلن‌های اشتراکی را در هر زمان با اطلاع قبلی حفظ می‌کنیم. هرگونه تغییر در قیمت‌گذاری برای دوره صورتحساب فعلی شما اعمال نخواهد شد، بلکه در دوره بعدی اعمال می‌شود.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۲. روش‌های پرداخت</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                ما روش‌های پرداخت مختلفی را از جمله کارت‌های اعتباری/بدهی، درگاه‌های پرداخت آنلاین و پرداخت از طریق حساب بانکی، پشتیبانی می‌کنیم. شما موافقت می‌کنید که اطلاعات پرداخت شما کامل و دقیق است و به ما اجازه می‌دهید (و ارائه‌دهنده خدمات پرداخت ما) هزینه‌های پلن اشتراکی انتخابی شما را از روش پرداخت ارائه شده، دریافت کنیم.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۳. صورتحساب‌ها</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                صورتحساب‌ها بر اساس دوره اشتراک انتخابی شما (ماهانه یا سالانه) صادر می‌شوند. ما صورتحساب‌ها را به صورت الکترونیکی به آدرس ایمیل ثبت شده شما ارسال می‌کنیم. شما مسئول اطمینان از دریافت صورتحساب‌ها هستید و عدم دریافت صورتحساب، شما را از پرداخت به موقع معاف نمی‌کند.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۴. تمدید خودکار و لغو</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                اشتراک‌های ما به صورت خودکار در پایان هر دوره تمدید می‌شوند، مگر اینکه شما قبل از تاریخ تمدید آن را لغو کنید. شما می‌توانید در هر زمان از طریق تنظیمات حساب خود یا تماس با پشتیبانی مشتری، اشتراک خود را لغو کنید. پس از لغو، شما تا پایان دوره پرداخت فعلی به خدمات دسترسی خواهید داشت و پس از آن دسترسی شما محدود یا قطع می‌شود.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۵. سیاست استرداد</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                ما یک دوره ضمانت بازگشت وجه ۱۴ روزه را برای اشتراک‌های جدید ارائه می‌دهیم. اگر از خدمات ما راضی نیستید، می‌توانید در طول این دوره برای استرداد کامل درخواست دهید. پس از این دوره، پرداخت‌ها به طور کلی غیرقابل استرداد هستند، مگر در شرایط خاص که به صلاحدید پرانا تعیین می‌شود. برای درخواست استرداد، لطفاً با پشتیبانی مشتری تماس بگیرید.
              </p>
            </div>
          </div>
        </section>
        
        <section id="intellectual" className="mb-16">
          <div className="flex items-center mb-4">
            <BookUserIcon className="h-6 w-6 ml-3 text-blue-500" />
            <h2 className="text-2xl font-bold">مالکیت معنوی</h2>
          </div>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">۱. مالکیت محتوا</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                تمامی محتوا، نرم‌افزار، گرافیک، لوگوها، علائم تجاری، طراحی‌ها، رابط کاربری، اطلاعات و سایر مواد موجود در پلتفرم پرانا، متعلق به پرانا یا صاحبان مجوز آن است و توسط قوانین مالکیت معنوی محافظت می‌شود. بدون اجازه کتبی قبلی از پرانا، استفاده از این مواد ممنوع است.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۲. مجوز استفاده محدود</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                پرانا به شما یک مجوز محدود، غیرانحصاری، غیرقابل انتقال و قابل فسخ برای دسترسی و استفاده از پلتفرم و خدمات آن برای اهداف شخصی یا تجاری مجاز، طبق این شرایط و هرگونه توافق‌نامه جداگانه با ما، اعطا می‌کند. این مجوز شامل حق تکثیر، تغییر، توزیع، انتشار، انتقال، اجرا عمومی یا نمایش عمومی محتوای پرانا نیست.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۳. محتوای کاربر</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                شما مالک محتوایی که در پلتفرم پرانا ارسال، بارگذاری یا ایجاد می‌کنید، باقی می‌مانید. با این حال، با ارسال یا بارگذاری محتوا، شما به پرانا یک مجوز جهانی، غیرانحصاری، بدون حق امتیاز، قابل انتقال و قابل واگذاری برای استفاده، کپی، تغییر، ایجاد آثار مشتق شده، توزیع، انتشار و اجرای چنین محتوایی در ارتباط با ارائه و بهبود خدمات ما اعطا می‌کنید.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۴. اطلاعیه‌های مالکیت معنوی</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                شما موافقت می‌کنید که تمام اطلاعیه‌های حق نشر، علائم تجاری و سایر اطلاعیه‌های مالکیت معنوی موجود در پلتفرم پرانا را دست نخورده باقی بگذارید و آن‌ها را از هیچ کپی یا بخشی از خدمات یا محتوای ما حذف نکنید.
              </p>
            </div>
          </div>
        </section>
        
        <section id="conduct" className="mb-16">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 ml-3 text-rose-500" />
            <h2 className="text-2xl font-bold">قوانین رفتاری</h2>
          </div>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">۱. استفاده قابل قبول</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                شما موافقت می‌کنید که از خدمات پرانا تنها برای اهداف قانونی و مطابق با این شرایط و هرگونه قوانین و مقررات قابل اجرا استفاده کنید. به طور خاص، شما موافقت می‌کنید که:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-slate-600 dark:text-slate-400">
                <li>از خدمات برای فعالیت‌های غیرقانونی استفاده نکنید.</li>
                <li>هیچ ویروس، کرم، تروجان، بدافزار یا کد مخرب دیگری را به پلتفرم منتقل نکنید.</li>
                <li>در فعالیت‌هایی که می‌تواند به پلتفرم آسیب برساند یا آن را غیرقابل دسترس کند، شرکت نکنید.</li>
                <li>اطلاعات شخصی دیگران را بدون اجازه جمع‌آوری یا ذخیره نکنید.</li>
                <li>خود را به عنوان فرد یا نهاد دیگری معرفی نکنید.</li>
                <li>در تبلیغات ناخواسته یا هرزنامه شرکت نکنید.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۲. محتوای ممنوع</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                شما نباید محتوایی را ارسال، بارگذاری یا به اشتراک بگذارید که:
              </p>
              <ul className="list-disc pr-6 space-y-2 text-slate-600 dark:text-slate-400">
                <li>غیرقانونی، مضر، تهدیدکننده، آزاردهنده، افترا‌آمیز، توهین‌آمیز، نفرت‌انگیز یا از نظر نژادی یا قومی قابل اعتراض باشد.</li>
                <li>حقوق مالکیت معنوی دیگران را نقض کند.</li>
                <li>حاوی ویروس، بدافزار یا کدهای مخرب دیگر باشد.</li>
                <li>حریم خصوصی دیگران را نقض کند.</li>
                <li>برای فریب یا گمراه کردن دیگران طراحی شده باشد.</li>
                <li>از نظر جنسی صریح یا مستهجن باشد.</li>
                <li>خشونت را تبلیغ یا تشویق کند.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۳. گزارش تخلف</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                اگر محتوا یا رفتاری را مشاهده کردید که فکر می‌کنید این قوانین رفتاری یا شرایط استفاده ما را نقض می‌کند، لطفاً آن را به ما از طریق اطلاعات تماس ذکر شده در پایین این صفحه گزارش دهید. ما گزارش‌های مربوط به رفتار نامناسب را بررسی خواهیم کرد و در صورت لزوم اقدامات مناسب را انجام خواهیم داد.
              </p>
            </div>
          </div>
        </section>
        
        <section id="limitations" className="mb-16">
          <div className="flex items-center mb-4">
            <Scale className="h-6 w-6 ml-3 text-purple-500" />
            <h2 className="text-2xl font-bold">محدودیت مسئولیت</h2>
          </div>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">۱. وضعیت ارائه خدمات</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                خدمات پرانا «همانطور که هست» و «طبق دسترسی» بدون هیچگونه ضمانت صریح یا ضمنی ارائه می‌شوند. ما هیچ تضمینی نمی‌کنیم که خدمات ما بدون وقفه، به موقع، ایمن یا عاری از خطا خواهند بود. استفاده از خدمات ما به صلاحدید و خطر خود شماست.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۲. ماهیت مشاوره‌ای</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                پرانا یک ابزار کمکی است و جایگزین مشاوره تخصصی پزشکی یا روانشناسی نیست. محتوا و خدمات ارائه شده توسط پرانا فقط برای اهداف اطلاعاتی و آموزشی است و نباید به عنوان مشاوره پزشکی، تشخیص یا درمان تلقی شود. همیشه با متخصصان مراقبت‌های بهداشتی یا سلامت روان مشورت کنید.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۳. محدودیت خسارت</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                تا حد مجاز قانون، پرانا، مدیران، کارمندان، شرکا یا عوامل آن تحت هیچ شرایطی مسئول هرگونه خسارت مستقیم، غیرمستقیم، تصادفی، خاص، تبعی یا تنبیهی، از جمله اما نه محدود به، خسارت ناشی از از دست دادن سود، داده‌ها، استفاده، نیت خوب، یا سایر خسارت غیرملموس، ناشی از استفاده یا عدم توانایی استفاده از خدمات ما، نخواهند بود.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۴. مسئولیت محتوای کاربر</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                ما مسئول محتوایی که توسط کاربران در پلتفرم ما ارسال، بارگذاری یا به اشتراک گذاشته می‌شود، نیستیم. ما حق حذف هرگونه محتوایی که قوانین ما را نقض می‌کند یا به هر دلیل دیگری نامناسب تشخیص داده می‌شود، حفظ می‌کنیم، اما ملزم به نظارت بر محتوای کاربران نیستیم.
              </p>
            </div>
          </div>
        </section>
        
        <section id="termination" className="mb-16">
          <div className="flex items-center mb-4">
            <TimerIcon className="h-6 w-6 ml-3 text-orange-500" />
            <h2 className="text-2xl font-bold">خاتمه خدمات</h2>
          </div>
          <Separator className="mb-6" />
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">۱. خاتمه توسط کاربر</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                شما می‌توانید در هر زمان استفاده از خدمات ما را متوقف کنید یا اشتراک خود را از طریق تنظیمات حساب خود یا تماس با پشتیبانی مشتری لغو کنید. با لغو یا خاتمه، شما تا پایان دوره پرداخت فعلی خود به خدمات دسترسی خواهید داشت، مگر اینکه به طور صریح درخواست حذف فوری حساب خود را داشته باشید.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۲. خاتمه توسط پرانا</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                ما می‌توانیم دسترسی شما به تمام یا بخشی از خدمات را بدون اطلاع قبلی و به هر دلیلی، از جمله اما نه محدود به، نقض این شرایط، تعلیق یا خاتمه دهیم. در صورت خاتمه به دلیل نقض شرایط، ممکن است حق استرداد وجوه پرداختی را از دست بدهید.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۳. اثرات خاتمه</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                پس از خاتمه یا انقضای دسترسی شما به خدمات، حق شما برای دسترسی یا استفاده از خدمات بلافاصله پایان می‌یابد. تمام مفاد این شرایط که به طور منطقی باید پس از خاتمه ادامه یابند، از جمله مفاد مربوط به مالکیت، رفع مسئولیت ضمانت‌نامه، غرامت و محدودیت مسئولیت، همچنان اعتبار خواهند داشت.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">۴. حفظ و حذف داده‌ها</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                پس از خاتمه، ما ممکن است برخی از اطلاعات شما را برای مدت زمان محدودی برای اهداف قانونی، حسابداری یا گزارش‌دهی حفظ کنیم. با این حال، در صورت درخواست صریح شما برای حذف اطلاعات، ما تمام اطلاعات شخصی شما را از سیستم‌های خود حذف خواهیم کرد، مگر در مواردی که ملزم به حفظ برخی اطلاعات برای اهداف قانونی باشیم.
              </p>
            </div>
          </div>
        </section>
        
        {/* اطلاعات تماس */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 mb-12">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <HelpCircle className="h-5 w-5 ml-2 text-tiffany" />
            سوالات یا نگرانی‌ها؟
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            اگر در مورد این قوانین و مقررات سوال یا نگرانی دارید، لطفاً با ما تماس بگیرید:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Mail className="h-5 w-5 mt-0.5 ml-2 text-tiffany" />
              <div>
                <h3 className="font-medium">ایمیل</h3>
                <p className="text-slate-600 dark:text-slate-400">legal@prana-app.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FileText className="h-5 w-5 mt-0.5 ml-2 text-tiffany" />
              <div>
                <h3 className="font-medium">آدرس پستی</h3>
                <p className="text-slate-600 dark:text-slate-400">تهران، خیابان ولیعصر، پلاک ۱۲۳، شرکت پرانا</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="flex items-center">
              <Download className="h-5 w-5 ml-2" />
              دانلود نسخه PDF
            </Button>
          </div>
        </div>
        
        {/* آخرین بروزرسانی */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          آخرین به‌روزرسانی: {lastUpdated}
        </div>
      </div>
    </div>
  );
}

// تعریف کامپوننت‌های لوسید که قبلاً موجود نبودند
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

const BookUserIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    <circle cx="12" cy="10" r="2" />
    <path d="M12 16v-2a4 4 0 0 1 4-4 4 4 0 0 1-4-4v-2" />
  </svg>
);

const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const GavelIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10" />
    <path d="m16 16 6-6" />
    <path d="m8 8 6-6" />
    <path d="m9 7 8 8" />
    <path d="m21 11-8-8" />
  </svg>
);

const TimerIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M10 2h4" />
    <path d="M12 14v-4" />
    <path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
    <path d="M9 17H4v5" />
  </svg>
);