import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProCard } from '@/components/ui/pro-card';
import {
  ZoomIn, ZoomOut, Maximize, Minimize, RotateCw, RotateCcw,
  Plus, Minus, MapPin, Info, AlertCircle, FileText, Calendar, Users
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// مناطق مختلف مرکز پزشکی برای نمایش روی تصویر
interface MedicalCenterArea {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  icon?: React.ReactNode;
  color?: string;
  stats?: {
    title: string;
    value: string | number;
  }[];
  services?: string[];
  staff?: {
    name: string;
    role: string;
    schedule?: string;
  }[];
}

export interface MedicalCenterSection {
  id: string;
  name: string;
  description: string;
  color: 'tiffany' | 'navy' | 'aqua' | 'yellow' | 'success' | 'error' | 'info';
  icon: React.ReactNode;
  areas: MedicalCenterArea[];
}

// بخش‌های مرکز طب کار پرانا
const medicalCenterSections: MedicalCenterSection[] = [
  {
    id: 'reception',
    name: 'پذیرش و اطلاعات',
    description: 'بخش پذیرش، ثبت‌نام و راهنمایی مراجعین',
    color: 'tiffany',
    icon: <Info className="h-5 w-5" />,
    areas: [
      {
        id: 'reception-desk',
        title: 'میز پذیرش',
        description: 'ثبت‌نام و راهنمایی مراجعین',
        x: 10,
        y: 20,
        width: 15,
        height: 15,
        icon: <Info />,
        color: 'tiffany',
        stats: [
          { title: 'مراجعین روزانه', value: 85 },
          { title: 'زمان انتظار', value: '۴ دقیقه' }
        ],
        services: [
          'ثبت‌نام مراجعین جدید',
          'راهنمایی به بخش‌های مختلف',
          'پاسخگویی به سؤالات',
          'هماهنگی با پزشکان'
        ],
        staff: [
          { name: 'سارا محمدی', role: 'مسئول پذیرش', schedule: '۸ صبح تا ۱۴' },
          { name: 'علی کریمی', role: 'مسئول پذیرش', schedule: '۱۴ تا ۲۰' }
        ]
      }
    ]
  },
  {
    id: 'examination',
    name: 'معاینات دوره‌ای',
    description: 'اتاق‌های معاینه و بررسی‌های دوره‌ای سلامت کارکنان',
    color: 'navy',
    icon: <FileText className="h-5 w-5" />,
    areas: [
      {
        id: 'general-exam',
        title: 'معاینات عمومی',
        description: 'معاینات عمومی و بررسی سلامت کلی',
        x: 40,
        y: 30,
        width: 20,
        height: 15,
        icon: <FileText />,
        color: 'navy',
        stats: [
          { title: 'معاینات روزانه', value: 35 },
          { title: 'زمان هر معاینه', value: '۱۵ دقیقه' }
        ],
        services: [
          'معاینات جسمانی کامل',
          'ثبت سوابق پزشکی',
          'ارزیابی شاخص‌های سلامت',
          'معاینات دوره‌ای کارکنان'
        ],
        staff: [
          { name: 'دکتر جمشیدی', role: 'پزشک عمومی', schedule: '۸ صبح تا ۱۴' },
          { name: 'دکتر علوی', role: 'پزشک عمومی', schedule: '۱۴ تا ۲۰' }
        ]
      },
      {
        id: 'specialized-exam',
        title: 'معاینات تخصصی',
        description: 'معاینات تخصصی برای مشاغل خاص',
        x: 65,
        y: 30,
        width: 20,
        height: 15,
        icon: <AlertCircle />,
        color: 'navy',
        stats: [
          { title: 'معاینات روزانه', value: 20 },
          { title: 'زمان هر معاینه', value: '۲۵ دقیقه' }
        ],
        staff: [
          { name: 'دکتر حسینی', role: 'متخصص طب کار', schedule: '۸ صبح تا ۱۶' }
        ]
      }
    ]
  },
  {
    id: 'laboratory',
    name: 'آزمایشگاه',
    description: 'آزمایشگاه تشخیصی و آنالیز نمونه‌ها',
    color: 'aqua',
    icon: <Maximize className="h-5 w-5" />,
    areas: [
      {
        id: 'blood-work',
        title: 'آزمایشات خون',
        description: 'آزمایشات خون و بررسی‌های بیوشیمیایی',
        x: 40,
        y: 60,
        width: 25,
        height: 20,
        icon: <Maximize />,
        color: 'aqua',
        stats: [
          { title: 'نمونه‌گیری روزانه', value: 50 },
          { title: 'زمان پاسخدهی', value: '۴۸ ساعت' }
        ]
      }
    ]
  },
  {
    id: 'imaging',
    name: 'تصویربرداری',
    description: 'بخش رادیولوژی و تصویربرداری',
    color: 'yellow',
    icon: <ZoomIn className="h-5 w-5" />,
    areas: [
      {
        id: 'xray',
        title: 'رادیولوژی',
        description: 'تصویربرداری اشعه ایکس و رادیوگرافی',
        x: 80,
        y: 60,
        width: 20,
        height: 20,
        icon: <ZoomIn />,
        color: 'yellow',
        stats: [
          { title: 'تصویربرداری روزانه', value: 25 },
          { title: 'زمان پاسخدهی', value: '۲۴ ساعت' }
        ]
      }
    ]
  },
  {
    id: 'occupational',
    name: 'بهداشت حرفه‌ای',
    description: 'ارزیابی خطرات محیط کار و پیشگیری',
    color: 'success',
    icon: <AlertCircle className="h-5 w-5" />,
    areas: [
      {
        id: 'risk-assessment',
        title: 'ارزیابی خطرات',
        description: 'بررسی و ارزیابی خطرات محیط کار',
        x: 20,
        y: 80,
        width: 20,
        height: 15,
        icon: <AlertCircle />,
        color: 'success',
        stats: [
          { title: 'بازدیدهای میدانی', value: 8 },
          { title: 'گزارش‌های ماهانه', value: 45 }
        ]
      }
    ]
  },
  {
    id: 'consultation',
    name: 'مشاوره و آموزش',
    description: 'مشاوره سلامت و آموزش پیشگیری',
    color: 'info',
    icon: <Users className="h-5 w-5" />,
    areas: [
      {
        id: 'health-edu',
        title: 'آموزش سلامت',
        description: 'کلاس‌های آموزشی و مشاوره سلامت',
        x: 60,
        y: 90,
        width: 25,
        height: 10,
        icon: <Users />,
        color: 'info',
        stats: [
          { title: 'کلاس‌های هفتگی', value: 6 },
          { title: 'شرکت‌کنندگان', value: 120 }
        ]
      }
    ]
  }
];

interface GlassMedicalCenterViewerProps {
  modelPath?: string;
  defaultSection?: string;
  className?: string;
}

export function GlassMedicalCenterViewer({
  modelPath,
  defaultSection = 'reception',
  className
}: GlassMedicalCenterViewerProps) {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  
  // مرکز طب کار فعلی
  const currentSection = medicalCenterSections.find(section => section.id === activeSection) || medicalCenterSections[0];
  const selectedAreaDetail = currentSection.areas.find(area => area.id === selectedArea);

  // افزایش زوم
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };

  // کاهش زوم
  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  // چرخش به راست
  const rotateRight = () => {
    setRotation(prev => (prev + 15) % 360);
  };

  // چرخش به چپ
  const rotateLeft = () => {
    setRotation(prev => (prev - 15 + 360) % 360);
  };

  // تغییر وضعیت نمایش تمام صفحه
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // گوش دادن به رویداد تغییر وضعیت نمایش تمام صفحه
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      ref={viewerRef}
      className={cn(
        "flex flex-col relative rounded-xl overflow-hidden",
        isFullscreen ? "w-screen h-screen p-4" : "w-full h-[700px]",
        className
      )}
    >
      {/* هدر و ابزارها */}
      <div className="flex justify-between items-center mb-2 z-10">
        <h2 className="text-xl font-bold text-tiffany flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          <span>مرکز طب کار پرانا</span>
          <Badge className="mr-2 bg-tiffany/80">نسخه ۲.۰</Badge>
        </h2>
        
        <div className="flex items-center space-x-2 space-x-reverse rtl:space-x-reverse">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={zoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>بزرگنمایی</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={zoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>کوچک‌نمایی</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={rotateRight}>
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>چرخش به راست</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={rotateLeft}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>چرخش به چپ</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isFullscreen ? 'خروج از حالت تمام صفحه' : 'نمایش تمام صفحه'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex flex-grow gap-4">
        {/* منوی بخش‌ها */}
        <div className="w-48 flex-shrink-0">
          <ProCard className="h-full" variant="acrylic" glassmorphism>
            <div className="p-2 flex flex-col h-full">
              <h3 className="text-sm font-bold mb-3 text-slate-800 dark:text-slate-200">بخش‌های مرکز</h3>
              <div className="space-y-1.5 flex-grow">
                {medicalCenterSections.map((section) => (
                  <Button
                    key={section.id}
                    variant={activeSection === section.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full justify-start text-right",
                      activeSection === section.id && `bg-${section.color}/80 hover:bg-${section.color}`
                    )}
                  >
                    <div className={`mr-2 h-4 w-4 text-${section.color}`}>
                      {section.icon}
                    </div>
                    <span>{section.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </ProCard>
        </div>
        
        {/* نمایش مدل و نقشه مرکز */}
        <div className="flex-grow relative flex flex-col">
          <ProCard 
            className="flex-grow relative overflow-hidden bg-gradient-to-br from-tiffany/5 to-aqua/5 dark:from-tiffany/10 dark:to-aqua/10"
            variant="premium"
            color="tiffany"
          >
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              {/* تصویر نقشه یا مدل سه بعدی */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* نقشه پایه - در حالت واقعی باید از نقشه یا مدل واقعی استفاده شود */}
                <div className="w-[600px] h-[400px] bg-white/80 dark:bg-slate-900/80 rounded-lg relative backdrop-blur-sm border border-tiffany/20">
                  {/* عناوین بخش‌ها روی نقشه */}
                  <div className="absolute top-2 left-2 text-lg font-bold text-tiffany">
                    {currentSection.name}
                  </div>

                  {/* نشانگرهای مناطق مختلف */}
                  {currentSection.areas.map((area) => (
                    <div
                      key={area.id}
                      className={cn(
                        "absolute rounded-md border-2 cursor-pointer transition-all",
                        selectedArea === area.id
                          ? `border-${area.color || currentSection.color} bg-${area.color || currentSection.color}/10 dark:bg-${area.color || currentSection.color}/20`
                          : `border-${area.color || currentSection.color}/50 hover:border-${area.color || currentSection.color} hover:bg-${area.color || currentSection.color}/5`
                      )}
                      style={{
                        left: `${area.x}%`,
                        top: `${area.y}%`,
                        width: `${area.width}%`,
                        height: `${area.height}%`
                      }}
                      onClick={() => setSelectedArea(area.id === selectedArea ? null : area.id)}
                    >
                      <div className={cn(
                        "absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center",
                        `bg-${area.color || currentSection.color} text-white`
                      )}>
                        <MapPin className="h-3 w-3" />
                      </div>
                      <div className="absolute bottom-1 right-1 text-xs font-bold">
                        {area.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ProCard>
          
          {/* پنل اطلاعات ناحیه انتخاب شده */}
          {selectedAreaDetail && (
            <ProCard 
              className="mt-4 max-h-60 overflow-y-auto"
              color={selectedAreaDetail.color || currentSection.color as any}
            >
              <Tabs defaultValue="info">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">
                      {selectedAreaDetail.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedAreaDetail.description}
                    </p>
                  </div>
                  
                  <TabsList className="pro-tabs">
                    <TabsTrigger value="info" className="pro-tab">
                      <Info className="h-4 w-4 ml-1.5" />
                      اطلاعات
                    </TabsTrigger>
                    <TabsTrigger value="services" className="pro-tab">
                      <FileText className="h-4 w-4 ml-1.5" />
                      خدمات
                    </TabsTrigger>
                    <TabsTrigger value="staff" className="pro-tab">
                      <Users className="h-4 w-4 ml-1.5" />
                      کادر
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="info" className="pro-tab-content">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedAreaDetail.stats?.map((stat, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {stat.title}
                          </div>
                          <div className="text-2xl font-bold mt-1">
                            {stat.value}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="pro-tab-content">
                  {selectedAreaDetail.services ? (
                    <ul className="space-y-2">
                      {selectedAreaDetail.services.map((service, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`mt-1 mr-2 h-2 w-2 rounded-full bg-${selectedAreaDetail.color || currentSection.color}`} />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">
                      اطلاعات خدمات برای این بخش موجود نیست.
                    </p>
                  )}
                </TabsContent>
                
                <TabsContent value="staff" className="pro-tab-content">
                  {selectedAreaDetail.staff ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedAreaDetail.staff.map((person, i) => (
                        <Card key={i}>
                          <CardContent className="p-4">
                            <div className="font-bold">{person.name}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {person.role}
                            </div>
                            {person.schedule && (
                              <div className="text-xs mt-1 flex items-center text-slate-500">
                                <Calendar className="h-3 w-3 ml-1" />
                                {person.schedule}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 dark:text-slate-400">
                      اطلاعات کادر برای این بخش موجود نیست.
                    </p>
                  )}
                </TabsContent>
              </Tabs>
            </ProCard>
          )}
        </div>
      </div>
    </div>
  );
}