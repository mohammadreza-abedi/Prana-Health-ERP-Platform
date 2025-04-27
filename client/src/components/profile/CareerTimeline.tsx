import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, GraduationCap, Calendar, MapPin, Timer, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: number;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements?: string[];
  skills?: string[];
  logo?: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
  logo?: string;
}

interface CareerTimelineProps {
  experience: Experience[];
  education: Education[];
}

export function CareerTimeline({ experience, education }: CareerTimelineProps) {
  const [view, setView] = useState<"combined" | "experience" | "education">("combined");
  const [visibleYears, setVisibleYears] = useState<number[]>([]);
  
  // تبدیل هر دو آرایه به یک لیست از وقایع در خط زمانی
  const timelineEvents = [
    ...experience.map(exp => ({
      id: `exp-${exp.id}`,
      type: "experience" as const,
      title: exp.title,
      organization: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      color: "blue",
      icon: <Briefcase className="h-4 w-4" />,
      data: exp
    })),
    ...education.map(edu => ({
      id: `edu-${edu.id}`,
      type: "education" as const,
      title: `${edu.degree} ${edu.field}`,
      organization: edu.institution,
      location: "",
      startDate: edu.startDate,
      endDate: edu.endDate,
      description: edu.description || "",
      color: "purple",
      icon: <GraduationCap className="h-4 w-4" />,
      data: edu
    }))
  ].sort((a, b) => {
    if (a.endDate === "تاکنون") return -1;
    if (b.endDate === "تاکنون") return 1;
    
    // تبدیل تاریخ‌ها به فرمت قابل مقایسه
    const aEndYear = a.endDate.includes('/') ? parseInt(a.endDate.split('/')[0]) : parseInt(a.endDate);
    const bEndYear = b.endDate.includes('/') ? parseInt(b.endDate.split('/')[0]) : parseInt(b.endDate);
    
    return bEndYear - aEndYear;
  });
  
  // گرفتن سال‌های منحصر به فرد برای نمایش در خط زمانی
  const years = Array.from(new Set(
    timelineEvents.flatMap(event => {
      const startYear = event.startDate.includes('/') 
        ? parseInt(event.startDate.split('/')[0]) 
        : parseInt(event.startDate);
        
      const endYear = event.endDate === "تاکنون" 
        ? new Date().getFullYear() 
        : event.endDate.includes('/') 
          ? parseInt(event.endDate.split('/')[0]) 
          : parseInt(event.endDate);
          
      // ایجاد آرایه از تمام سال‌های بین شروع و پایان
      return Array.from(
        { length: endYear - startYear + 1 }, 
        (_, i) => startYear + i
      );
    })
  )).sort((a, b) => b - a); // مرتب‌سازی نزولی
  
  // فیلتر وقایع بر اساس نوع نمایش
  const filteredEvents = timelineEvents.filter(event => {
    if (view === "combined") return true;
    if (view === "experience") return event.type === "experience";
    if (view === "education") return event.type === "education";
    return true;
  });
  
  // تنظیم سال نمایش برای باز/بسته کردن بخش‌های خط زمانی
  const toggleYear = (year: number) => {
    setVisibleYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year) 
        : [...prev, year]
    );
  };
  
  // محاسبه دوره زمانی رویداد
  const calculateDuration = (startDate: string, endDate: string) => {
    let startYear = startDate.includes('/') 
      ? parseInt(startDate.split('/')[0]) 
      : parseInt(startDate);
      
    let endYear = endDate === "تاکنون" 
      ? new Date().getFullYear() 
      : endDate.includes('/') 
        ? parseInt(endDate.split('/')[0]) 
        : parseInt(endDate);
        
    const years = endYear - startYear;
    
    if (years === 0) return "کمتر از یک سال";
    if (years === 1) return "۱ سال";
    return `${years} سال`;
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Timer className="mr-2 h-5 w-5 text-blue-500" /> 
              خط زمانی حرفه‌ای
            </CardTitle>
            <CardDescription>
              مسیر توسعه حرفه‌ای و تحصیلی شما
            </CardDescription>
          </div>
          
          <Tabs value={view} onValueChange={(v) => setView(v as any)}>
            <TabsList>
              <TabsTrigger value="combined" className="text-xs">همه</TabsTrigger>
              <TabsTrigger value="experience" className="text-xs">شغلی</TabsTrigger>
              <TabsTrigger value="education" className="text-xs">تحصیلی</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 relative">
        {/* خط عمودی مرکزی */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-200 dark:bg-slate-700 transform -translate-x-1/2"></div>
        
        <div className="space-y-8">
          {years.map((year, yearIndex) => {
            // وقایع مربوط به این سال
            const yearEvents = filteredEvents.filter(event => {
              const startYear = event.startDate.includes('/') 
                ? parseInt(event.startDate.split('/')[0]) 
                : parseInt(event.startDate);
                
              const endYear = event.endDate === "تاکنون" 
                ? new Date().getFullYear() 
                : event.endDate.includes('/') 
                  ? parseInt(event.endDate.split('/')[0]) 
                  : parseInt(event.endDate);
                  
              return year >= startYear && year <= endYear;
            });
            
            // اگر برای این سال رویدادی وجود نداشت، نمایش نده
            if (yearEvents.length === 0) return null;
            
            const isYearVisible = visibleYears.includes(year);
            
            return (
              <div key={year} className="relative">
                {/* نشانگر سال */}
                <div className="flex justify-center mb-6 relative z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`rounded-full px-4 border-2 ${isYearVisible ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300' : ''}`}
                    onClick={() => toggleYear(year)}
                  >
                    {year}
                  </Button>
                </div>
                
                {/* وقایع این سال */}
                <div className="space-y-6">
                  {yearEvents.map((event, eventIndex) => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * eventIndex }}
                      className={`relative ${eventIndex % 2 === 0 ? "pr-[calc(50%+20px)]" : "pl-[calc(50%+20px)]"}`}
                    >
                      {/* خط افقی به سمت خط عمودی */}
                      <div 
                        className={`absolute top-4 w-[20px] h-0.5 bg-slate-200 dark:bg-slate-700 ${
                          eventIndex % 2 === 0 ? "left-0" : "right-0"
                        }`}
                      ></div>
                      
                      {/* دایره روی خط عمودی */}
                      <div 
                        className={`absolute top-4 w-4 h-4 rounded-full z-10 ${
                          event.type === "experience" 
                            ? "bg-blue-500 border-2 border-white dark:border-slate-900" 
                            : "bg-purple-500 border-2 border-white dark:border-slate-900"
                        } ${
                          eventIndex % 2 === 0 ? "left-[-8px]" : "right-[-8px]"
                        }`}
                      ></div>
                      
                      {/* محتوای رویداد */}
                      <div 
                        className={`
                          p-4 rounded-lg border border-slate-200 dark:border-slate-700
                          ${event.type === "experience" ? "hover:border-blue-300 dark:hover:border-blue-700" : "hover:border-purple-300 dark:hover:border-purple-700"}
                          transition-all duration-300 hover:shadow-sm
                        `}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`
                            w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0
                            ${event.type === "experience" 
                              ? "bg-blue-100 dark:bg-blue-900/20 text-blue-500" 
                              : "bg-purple-100 dark:bg-purple-900/20 text-purple-500"
                            }
                          `}>
                            {event.icon}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-medium text-base">{event.title}</h3>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-slate-500 dark:text-slate-400">
                              <span>{event.organization}</span>
                              
                              {event.location && (
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 ml-0.5" />
                                  {event.location}
                                </span>
                              )}
                              
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 ml-0.5" />
                                {event.startDate} - {event.endDate}
                              </span>
                              
                              <span className="flex items-center">
                                <Timer className="h-3 w-3 ml-0.5" />
                                {calculateDuration(event.startDate, event.endDate)}
                              </span>
                            </div>
                            
                            {event.description && (
                              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                                {event.description.substring(0, 120)}
                                {event.description.length > 120 && "..."}
                              </p>
                            )}
                            
                            {/* مهارت‌ها یا دستاوردها */}
                            {event.type === "experience" && event.data.skills && event.data.skills.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {event.data.skills.slice(0, 3).map((skill, skillIndex) => (
                                  <Badge 
                                    key={skillIndex}
                                    variant="outline" 
                                    className="text-xs bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                                {event.data.skills.length > 3 && (
                                  <span className="text-xs text-slate-500">+{event.data.skills.length - 3}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* نشانگر موقعیت فعلی */}
                        {event.endDate === "تاکنون" && (
                          <div className="mt-2 flex items-center">
                            <Badge className="bg-green-500">
                              <div className="flex items-center">
                                <span className="relative flex h-2 w-2 mr-1">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span>موقعیت فعلی</span>
                              </div>
                            </Badge>
                          </div>
                        )}
                        
                        {/* نشانگر افتخارات */}
                        {event.type === "experience" && event.data.achievements && event.data.achievements.length > 0 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="absolute top-2 right-2">
                                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="text-xs space-y-1">
                                  <p className="font-bold">دستاوردها:</p>
                                  <ul className="list-disc list-inside">
                                    {event.data.achievements.map((achievement, i) => (
                                      <li key={i} className="text-xs">{achievement}</li>
                                    ))}
                                  </ul>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {/* نشانگر شروع خط زمانی */}
          <div className="relative flex justify-center">
            <div className="w-8 h-8 rounded-full border-4 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center z-10">
              <Star className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            </div>
            <div className="absolute bottom-4 left-1/2 w-0.5 h-6 bg-slate-200 dark:bg-slate-700 transform -translate-x-1/2"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}