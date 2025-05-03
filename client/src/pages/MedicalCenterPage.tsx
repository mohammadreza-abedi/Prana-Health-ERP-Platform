import React, { useState } from 'react';
import { GlassMedicalCenterViewer } from '@/components/medical-center/GlassMedicalCenterViewer';
import { ProCard } from '@/components/ui/pro-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, UsersIcon, FileText, Phone, Mail, Clock, MapPin, Calendar, User, Building, ChevronRight, BarChart2, Briefcase, Shield, HeartPulse, Stethoscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// داده‌های مربوط به خدمات مرکز طب کار
const medicalServices = [
  {
    id: 1,
    title: 'معاینات دوره‌ای کارکنان',
    description: 'بررسی سلامت دوره‌ای کارکنان مطابق با قوانین وزارت بهداشت و کار',
    icon: <User className="h-5 w-5" />,
    color: 'tiffany',
    price: '۱,۵۰۰,۰۰۰ ریال',
    duration: '۴۵ دقیقه',
    features: [
      'معاینه فیزیکی کامل',
      'آزمایشات خون و ادرار',
      'اندازه‌گیری فشار خون و BMI',
      'تست بینایی و شنوایی',
      'نوار قلب',
      'ارزیابی ریسک‌های شغلی',
      'مشاوره تغذیه و سلامت',
      'ارائه گزارش جامع به کارفرما'
    ]
  },
  {
    id: 2,
    title: 'معاینات بدو استخدام',
    description: 'ارزیابی سلامت عمومی و شغلی افراد پیش از استخدام',
    icon: <Briefcase className="h-5 w-5" />,
    color: 'navy',
    price: '۲,۲۰۰,۰۰۰ ریال',
    duration: '۶۰ دقیقه',
    features: [
      'معاینه فیزیکی کامل',
      'آزمایشات خون و ادرار',
      'رادیوگرافی قفسه سینه',
      'تست بینایی و شنوایی',
      'ارزیابی روانشناختی',
      'ارزیابی تناسب شغلی',
      'بررسی سابقه بیماری‌ها',
      'ارائه گزارش جامع به کارفرما'
    ]
  },
  {
    id: 3,
    title: 'ارزیابی ریسک‌های محیط کار',
    description: 'بررسی و شناسایی خطرات محیط کار و ارائه راهکارهای کاهش ریسک',
    icon: <Shield className="h-5 w-5" />,
    color: 'success',
    price: '۱۵,۰۰۰,۰۰۰ ریال',
    duration: 'از ۱ تا ۵ روز کاری',
    features: [
      'بازدید از محل کار',
      'اندازه‌گیری فاکتورهای فیزیکی (صدا، نور، گرما)',
      'ارزیابی آلاینده‌های شیمیایی محیط',
      'بررسی ارگونومی ایستگاه‌های کاری',
      'ارزیابی ریسک‌های ایمنی',
      'شناسایی خطرات بالقوه',
      'ارائه راهکارهای کاهش ریسک',
      'گزارش جامع به مدیریت و HSE'
    ]
  },
  {
    id: 4,
    title: 'کارگاه‌های آموزشی HSE',
    description: 'آموزش اصول ایمنی، بهداشت و محیط زیست برای کارکنان',
    icon: <UsersIcon className="h-5 w-5" />,
    color: 'info',
    price: '۸,۰۰۰,۰۰۰ ریال',
    duration: 'از ۴ تا ۸ ساعت',
    features: [
      'آموزش اصول ایمنی در محیط کار',
      'کمک‌های اولیه و اورژانس‌های شغلی',
      'ارگونومی و پیشگیری از آسیب‌های اسکلتی-عضلانی',
      'مدیریت استرس و سلامت روان',
      'ایمنی و بهداشت غذایی',
      'مدیریت بحران و واکنش در شرایط اضطراری',
      'تفکر پیشگیرانه در محیط کار',
      'گواهینامه معتبر برای شرکت‌کنندگان'
    ]
  },
  {
    id: 5,
    title: 'معاینات تخصصی مشاغل سخت',
    description: 'معاینات ویژه برای مشاغل با ریسک بالا و شرایط سخت',
    icon: <HeartPulse className="h-5 w-5" />,
    color: 'error',
    price: '۳,۵۰۰,۰۰۰ ریال',
    duration: '۹۰ دقیقه',
    features: [
      'معاینات تخصصی متناسب با شغل',
      'آزمایشات اختصاصی مواجهات شغلی',
      'تست‌های عملکرد ریوی',
      'ارزیابی سلامت قلبی-عروقی',
      'بررسی‌های ارتفاع‌کاری و فضاهای محصور',
      'ارزیابی مواجهه با مواد شیمیایی',
      'معاینات تکمیلی متناسب با ریسک‌های شغلی',
      'ارائه توصیه‌های حفاظتی اختصاصی'
    ]
  }
];

// داده‌های مربوط به آمار مرکز طب کار
const medicalCenterStats = [
  { title: 'معاینات دوره‌ای سالانه', value: '۱۲,۰۰۰+', icon: <Stethoscope className="h-5 w-5" />, color: 'tiffany' },
  { title: 'شرکت‌های تحت پوشش', value: '۱۵۰+', icon: <Building className="h-5 w-5" />, color: 'navy' },
  { title: 'پزشکان متخصص', value: '۱۲', icon: <User className="h-5 w-5" />, color: 'aqua' },
  { title: 'سال‌های تجربه', value: '۱۵+', icon: <Clock className="h-5 w-5" />, color: 'yellow' }
];

// داده‌های مربوط به شرکت‌های تحت پوشش
const corporateClients = [
  { id: 1, name: 'شرکت فولاد مبارکه', employees: 12000, industry: 'صنعت فولاد', services: ['معاینات دوره‌ای', 'ارزیابی ریسک'] },
  { id: 2, name: 'پتروشیمی امیرکبیر', employees: 8500, industry: 'پتروشیمی', services: ['معاینات دوره‌ای', 'آموزش HSE'] },
  { id: 3, name: 'صنایع ماشین‌سازی اراک', employees: 5200, industry: 'ماشین‌سازی', services: ['معاینات دوره‌ای', 'تست‌های تخصصی'] },
  { id: 4, name: 'ایران خودرو', employees: 21000, industry: 'خودروسازی', services: ['معاینات دوره‌ای', 'ارزیابی ریسک'] },
  { id: 5, name: 'سایپا', employees: 19000, industry: 'خودروسازی', services: ['معاینات بدو استخدام', 'معاینات دوره‌ای'] },
  { id: 6, name: 'شرکت نفت فلات قاره', employees: 7800, industry: 'نفت و گاز', services: ['معاینات دوره‌ای', 'مشاغل سخت'] }
];

// داده‌های مربوط به پزشکان مرکز
const doctors = [
  { 
    id: 1, 
    name: 'دکتر علی محمدی', 
    specialty: 'متخصص طب کار', 
    experience: '15 سال', 
    education: 'دانشگاه علوم پزشکی تهران',
    schedule: [
      { day: 'شنبه تا چهارشنبه', hours: '۸ صبح الی ۱۴' }
    ],
    certifications: ['انجمن طب کار ایران', 'انجمن طب کار آمریکا']
  },
  { 
    id: 2, 
    name: 'دکتر سارا رضایی', 
    specialty: 'متخصص طب کار و بیماری‌های شغلی', 
    experience: '12 سال', 
    education: 'دانشگاه شهید بهشتی',
    schedule: [
      { day: 'یکشنبه و سه‌شنبه', hours: '۸ صبح الی ۱۴' },
      { day: 'شنبه و دوشنبه', hours: '۱۴ الی ۲۰' }
    ],
    certifications: ['انجمن طب کار ایران', 'بورد تخصصی طب کار']
  },
  { 
    id: 3, 
    name: 'دکتر مهرداد حسینی', 
    specialty: 'متخصص بیماری‌های داخلی و طب کار', 
    experience: '18 سال', 
    education: 'دانشگاه تربیت مدرس',
    schedule: [
      { day: 'شنبه تا پنج‌شنبه', hours: '۱۴ الی ۲۰' }
    ],
    certifications: ['انجمن بیماری‌های داخلی', 'انجمن طب کار ایران']
  },
];

const ServiceCard = ({ service }: { service: typeof medicalServices[0] }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <ProCard 
      className="overflow-hidden h-full"
      variant={showDetails ? 'premium' : 'default'}
      color={service.color as any}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg bg-${service.color}/10 dark:bg-${service.color}/20 text-${service.color}`}>
              {service.icon}
            </div>
            <div>
              <CardTitle className="text-base">{service.title}</CardTitle>
              <CardDescription className="mt-1">{service.description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 ml-1 text-slate-400" />
            <span>{service.duration}</span>
          </div>
          <div className="font-semibold">{service.price}</div>
        </div>
        
        {showDetails && (
          <div className="mt-2 space-y-2">
            <h4 className="text-sm font-semibold mb-2">ویژگی‌ها و جزئیات:</h4>
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <div className={`mt-1 mr-2 h-1.5 w-1.5 rounded-full bg-${service.color}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      
      <div className="px-6 pb-4">
        <Button 
          variant="ghost" 
          className={`w-full justify-center text-${service.color}`}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'بستن جزئیات' : 'مشاهده جزئیات'}
          <ChevronRight className={`h-4 w-4 mr-1 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
        </Button>
      </div>
    </ProCard>
  );
};

const ContactInfo = () => (
  <Card>
    <CardHeader>
      <CardTitle>اطلاعات تماس</CardTitle>
      <CardDescription>راه‌های ارتباطی با مرکز طب کار پرانا</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-start">
        <MapPin className="h-5 w-5 text-tiffany ml-4 mt-0.5" />
        <div>
          <h4 className="font-semibold">آدرس:</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            تهران، خیابان ولیعصر، بالاتر از میدان ونک، خیابان شهید خدامی، پلاک 72، مرکز طب کار پرانا
          </p>
        </div>
      </div>
      
      <div className="flex items-center">
        <Phone className="h-5 w-5 text-tiffany ml-4" />
        <div>
          <h4 className="font-semibold">تلفن تماس:</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            ۰۲۱-۸۸۶۶۴۴۲۲ - ۰۲۱-۸۸۶۶۱۱۴۴
          </p>
        </div>
      </div>
      
      <div className="flex items-center">
        <Mail className="h-5 w-5 text-tiffany ml-4" />
        <div>
          <h4 className="font-semibold">ایمیل:</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            info@pranateb.com
          </p>
        </div>
      </div>
      
      <div className="flex items-start">
        <Clock className="h-5 w-5 text-tiffany ml-4 mt-0.5" />
        <div>
          <h4 className="font-semibold">ساعات کاری:</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            شنبه تا چهارشنبه: ۸ صبح الی ۸ شب<br />
            پنجشنبه: ۸ صبح الی ۲ بعدازظهر<br />
            جمعه: تعطیل
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function MedicalCenterPage() {
  const [activeTab, setActiveTab] = useState('center');
  
  return (
    <div className="pb-8">
      <ProCard 
        className="mb-6 bg-gradient-to-r from-tiffany-alpha to-aqua-alpha dark:from-tiffany/30 dark:to-aqua/20 border-0 p-8"
        variant="acrylic"
        glassmorphism
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:ml-6">
            <h1 className="text-3xl font-bold mb-2 text-tiffany">مرکز طب کار پرانا</h1>
            <p className="text-slate-700 dark:text-slate-300 mb-4 max-w-2xl">
              مرکز تخصصی طب کار پرانا، ارائه‌دهنده خدمات جامع معاینات دوره‌ای، ارزیابی ریسک محیط کار و آموزش‌های HSE برای سازمان‌ها و شرکت‌های صنعتی با بیش از ۱۵ سال تجربه درخشان
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-tiffany hover:bg-tiffany-hover">معاینات دوره‌ای</Badge>
              <Badge className="bg-navy hover:bg-navy-hover">بهداشت حرفه‌ای</Badge>
              <Badge className="bg-aqua hover:bg-aqua-hover">ارزیابی ریسک</Badge>
              <Badge className="bg-success hover:bg-success-hover">آموزش HSE</Badge>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <Button size="lg" className="bg-tiffany hover:bg-tiffany-hover">
              <Phone className="ml-2 h-5 w-5" />
              تماس با ما
            </Button>
            <Button size="lg" variant="outline">
              <Calendar className="ml-2 h-5 w-5" />
              رزرو نوبت
            </Button>
          </div>
        </div>
      </ProCard>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {medicalCenterStats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6 flex items-center">
              <div className={`w-12 h-12 rounded-full bg-${stat.color}/10 dark:bg-${stat.color}/20 flex items-center justify-center text-${stat.color} ml-4`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="pro-tabs mb-6"
      >
        <TabsList>
          <TabsTrigger value="center" className="pro-tab">
            <Building className="h-4 w-4 ml-1.5" />
            مرکز طب کار
          </TabsTrigger>
          <TabsTrigger value="services" className="pro-tab">
            <Briefcase className="h-4 w-4 ml-1.5" />
            خدمات
          </TabsTrigger>
          <TabsTrigger value="doctors" className="pro-tab">
            <Stethoscope className="h-4 w-4 ml-1.5" />
            پزشکان
          </TabsTrigger>
          <TabsTrigger value="clients" className="pro-tab">
            <BarChart2 className="h-4 w-4 ml-1.5" />
            مشتریان
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="center" className="pro-tab-content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GlassMedicalCenterViewer />
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <ContactInfo />
              
              <Card>
                <CardHeader>
                  <CardTitle>درباره مرکز طب کار پرانا</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-justify">
                    مرکز طب کار پرانا با بیش از ۱۵ سال سابقه درخشان در ارائه خدمات تخصصی طب کار، بهداشت حرفه‌ای و ایمنی محیط کار، یکی از پیشروترین مراکز تخصصی این حوزه در کشور است.
                  </p>
                  <p className="text-justify">
                    این مرکز با بهره‌گیری از کادر مجرب پزشکی، تجهیزات پیشرفته و استانداردهای بین‌المللی، خدمات جامعی را به سازمان‌ها و صنایع مختلف ارائه می‌دهد. تمرکز اصلی ما بر پیشگیری از بیماری‌های شغلی، ارتقای سلامت کارکنان و ایمن‌سازی محیط‌های کاری است.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="services" className="pro-tab-content">
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold">خدمات مرکز طب کار</h2>
            
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="نوع خدمات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه خدمات</SelectItem>
                  <SelectItem value="periodic">معاینات دوره‌ای</SelectItem>
                  <SelectItem value="risk">ارزیابی ریسک</SelectItem>
                  <SelectItem value="training">آموزش</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <FileText className="h-4 w-4 ml-1.5" />
                دانلود تعرفه
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {medicalServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="doctors" className="pro-tab-content">
          <h2 className="text-2xl font-bold mb-6">پزشکان متخصص مرکز</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <ProCard key={doctor.id} className="h-full">
                <CardHeader>
                  <CardTitle>{doctor.name}</CardTitle>
                  <CardDescription>{doctor.specialty}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500 dark:text-slate-400">سابقه</div>
                      <div className="font-medium">{doctor.experience}</div>
                    </div>
                    <div>
                      <div className="text-slate-500 dark:text-slate-400">تحصیلات</div>
                      <div className="font-medium">{doctor.education}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2">روزهای حضور:</h4>
                    {doctor.schedule.map((item, idx) => (
                      <div key={idx} className="flex items-start mb-1 text-sm">
                        <Calendar className="h-3.5 w-3.5 ml-1.5 mt-0.5 text-tiffany" />
                        <span>{item.day}: {item.hours}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-2">گواهینامه‌ها:</h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </ProCard>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="clients" className="pro-tab-content">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">شرکت‌های تحت پوشش</h2>
            <p className="text-slate-600 dark:text-slate-400">
              بیش از ۱۵۰ شرکت و سازمان معتبر در صنایع مختلف از خدمات مرکز طب کار پرانا بهره می‌برند
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-3 text-right border-b">نام شرکت</th>
                  <th className="p-3 text-right border-b">تعداد کارکنان</th>
                  <th className="p-3 text-right border-b">صنعت</th>
                  <th className="p-3 text-right border-b">خدمات دریافتی</th>
                </tr>
              </thead>
              <tbody>
                {corporateClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 border-b">
                      <div className="font-medium">{client.name}</div>
                    </td>
                    <td className="p-3 border-b">{client.employees.toLocaleString('fa-IR')}</td>
                    <td className="p-3 border-b">{client.industry}</td>
                    <td className="p-3 border-b">
                      <div className="flex flex-wrap gap-1">
                        {client.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8">
            <ProCard className="bg-gradient-to-r from-tiffany/5 to-aqua/5 dark:from-tiffany/10 dark:to-aqua/10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-4 md:mb-0 md:ml-6">
                    <h3 className="text-xl font-bold mb-2">همکاری با شرکت شما</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      برای دریافت اطلاعات بیشتر درباره خدمات و تعرفه‌ها با ما تماس بگیرید
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Button className="bg-tiffany hover:bg-tiffany-hover">
                      <FileText className="ml-2 h-4 w-4" />
                      درخواست همکاری
                    </Button>
                  </div>
                </div>
              </CardContent>
            </ProCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}