import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ExternalLink, MapPin, Calendar, MoreHorizontal, Clock, Plus, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface ExperienceCardProps {
  experience: Experience[];
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [showAddExperienceDialog, setShowAddExperienceDialog] = useState(false);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const [sortedExperience, setSortedExperience] = useState<Experience[]>(
    [...experience].sort((a, b) => {
      if (a.endDate === "تاکنون") return -1;
      if (b.endDate === "تاکنون") return 1;
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    })
  );
  
  // محاسبه و نمایش مدت زمان فعالیت
  const calculateDuration = (startDate: string, endDate: string) => {
    if (!startDate) return "";
    
    let start = startDate;
    let end = endDate === "تاکنون" ? new Date().toISOString().split('T')[0] : endDate;
    
    // تبدیل فرمت تاریخ‌های فارسی به تاریخ میلادی (این فقط یک تخمین است)
    if (start.includes('/')) {
      const [year, month] = start.split('/');
      start = `${year}-${month || '01'}-01`;
    }
    
    if (end.includes('/') && end !== "تاکنون") {
      const [year, month] = end.split('/');
      end = `${year}-${month || '01'}-01`;
    }
    
    const startDate_obj = new Date(start);
    const endDate_obj = end === "تاکنون" ? new Date() : new Date(end);
    
    const diffInMonths = 
      (endDate_obj.getFullYear() - startDate_obj.getFullYear()) * 12 + 
      (endDate_obj.getMonth() - startDate_obj.getMonth());
    
    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;
    
    if (years > 0 && months > 0) {
      return `${years} سال و ${months} ماه`;
    } else if (years > 0) {
      return `${years} سال`;
    } else if (months > 0) {
      return `${months} ماه`;
    } else {
      return "کمتر از یک ماه";
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Briefcase className="mr-2 h-5 w-5 text-blue-500" /> 
              سوابق شغلی
            </CardTitle>
            <CardDescription>
              {experience.length} موقعیت شغلی ثبت شده
            </CardDescription>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs"
            onClick={() => setShowAddExperienceDialog(true)}
          >
            <Plus className="h-3 w-3 ml-1" />
            افزودن
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-6 relative">
        {/* خط زمانی */}
        <div className="absolute top-5 bottom-9 right-5 w-0.5 bg-slate-200 dark:bg-slate-700 z-0"></div>
        
        <div className="space-y-6">
          {sortedExperience.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredExperience(exp.id)}
              onMouseLeave={() => setHoveredExperience(null)}
            >
              {/* نقطه روی خط زمان */}
              <div className="absolute right-5 top-2 w-3 h-3 rounded-full bg-blue-500 transform -translate-x-[6px] z-10"></div>
              
              <div className={`
                pl-4 pr-10 py-3 rounded-lg border border-slate-200 dark:border-slate-700 relative 
                transition-all duration-300
                ${activeExperience === exp.id ? 'bg-slate-50 dark:bg-slate-800' : ''}
                ${hoveredExperience === exp.id ? 'border-blue-300 dark:border-blue-700 shadow-sm' : ''}
              `}>
                <div className="flex justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      {exp.logo && (
                        <div className="ml-2 w-8 h-8 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                          <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-semibold text-base">{exp.title}</h3>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                          <span>{exp.company}</span>
                          
                          {exp.location && (
                            <>
                              <span className="mx-1.5 text-slate-300 dark:text-slate-600">•</span>
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-0.5" />
                                {exp.location}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3 w-3 ml-1" />
                      <span>{exp.startDate} - {exp.endDate}</span>
                      <span className="mx-1.5 text-slate-300 dark:text-slate-600">•</span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 ml-1" />
                        {calculateDuration(exp.startDate, exp.endDate)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-48" align="end">
                        <div className="grid gap-1">
                          <Button variant="ghost" size="sm" className="justify-start text-xs">
                            <span>ویرایش</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="justify-start text-xs">
                            <span>اشتراک‌گذاری</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="justify-start text-destructive text-xs">
                            <span>حذف</span>
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                {/* محتوای اصلی */}
                {!activeExperience || activeExperience !== exp.id ? (
                  <div className="mt-2">
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                      {exp.description}
                    </p>
                    
                    {/* دکمه نمایش بیشتر */}
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-6 p-0 mt-1 text-xs text-blue-500"
                      onClick={() => setActiveExperience(exp.id)}
                    >
                      نمایش جزئیات بیشتر...
                    </Button>
                    
                    {/* نمایش مهارت‌ها در حالت خلاصه */}
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {exp.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {exp.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{exp.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <AnimatePresence>
                    <motion.div 
                      className="mt-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-1">شرح وظایف</h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {exp.description}
                          </p>
                        </div>
                        
                        {/* نمایش دستاوردها */}
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-1 flex items-center">
                              <Award className="h-4 w-4 ml-1 text-amber-500" />
                              دستاوردها
                            </h4>
                            <ul className="space-y-1 list-inside list-disc">
                              {exp.achievements.map((achievement, index) => (
                                <li key={index} className="text-sm text-slate-700 dark:text-slate-300">
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* نمایش مهارت‌ها */}
                        {exp.skills && exp.skills.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium mb-1">مهارت‌های مرتبط</h4>
                            <div className="flex flex-wrap gap-1">
                              {exp.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* دکمه بستن جزئیات */}
                        <div className="pt-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs"
                            onClick={() => setActiveExperience(null)}
                          >
                            بستن جزئیات
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
                
                {/* نشان شغل فعلی */}
                {exp.endDate === "تاکنون" && (
                  <div className="absolute -left-1 top-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="block">
                          <Badge className="bg-green-500 font-bold">
                            <div className="flex items-center">
                              <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                              <span>فعلی</span>
                            </div>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">موقعیت شغلی فعلی</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* دکمه افزودن سابقه کاری جدید */}
        <Button
          variant="outline"
          className="w-full border-dashed h-20 mt-4"
          onClick={() => setShowAddExperienceDialog(true)}
        >
          <div className="flex items-center justify-center">
            <Plus className="w-5 h-5 ml-2" />
            <span>افزودن سابقه کاری جدید</span>
          </div>
        </Button>
      </CardContent>
      
      {/* دیالوگ افزودن سابقه شغلی */}
      <Dialog open={showAddExperienceDialog} onOpenChange={setShowAddExperienceDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن سابقه شغلی جدید</DialogTitle>
            <DialogDescription>
              اطلاعات موقعیت شغلی خود را وارد کنید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">عنوان شغلی</label>
                <Input placeholder="مثال: مدیر HSE" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">نام شرکت یا سازمان</label>
                <Input placeholder="مثال: شرکت پتروشیمی ستاره" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">تاریخ شروع</label>
                <Input placeholder="مثال: 1400/01" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">تاریخ پایان</label>
                <Input placeholder="مثال: 1402/06 یا تاکنون" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">محل کار</label>
              <Input placeholder="مثال: تهران" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">شرح وظایف</label>
              <Textarea 
                placeholder="وظایف و مسئولیت‌های خود را در این موقعیت شغلی توضیح دهید..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">دستاوردها</label>
              <Textarea 
                placeholder="دستاوردها و موفقیت‌های خود در این موقعیت شغلی را بنویسید (هر مورد را در یک خط جداگانه)..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">مهارت‌های مرتبط</label>
              <Input placeholder="مهارت‌ها را با کاما جدا کنید" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">لوگوی شرکت (اختیاری)</label>
              <div className="flex items-center gap-2">
                <Input type="file" className="flex-1" />
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddExperienceDialog(false)}>
              انصراف
            </Button>
            <Button onClick={() => setShowAddExperienceDialog(false)}>
              ذخیره
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}