import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar, MoreHorizontal, Plus, BookOpen, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

interface EducationCardProps {
  education: Education[];
}

export function EducationCard({ education }: EducationCardProps) {
  const [activeEducation, setActiveEducation] = useState<number | null>(null);
  const [showAddEducationDialog, setShowAddEducationDialog] = useState(false);
  const [hoveredEducation, setHoveredEducation] = useState<number | null>(null);
  const [sortedEducation, setSortedEducation] = useState<Education[]>(
    [...education].sort((a, b) => {
      return parseInt(b.endDate) - parseInt(a.endDate);
    })
  );
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-purple-500" /> 
              سوابق تحصیلی
            </CardTitle>
            <CardDescription>
              {education.length} مورد سابقه تحصیلی ثبت شده
            </CardDescription>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs"
            onClick={() => setShowAddEducationDialog(true)}
          >
            <Plus className="h-3 w-3 ml-1" />
            افزودن
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          {sortedEducation.map((edu, index) => (
            <motion.div 
              key={edu.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
                p-4 rounded-lg border border-slate-200 dark:border-slate-700 relative
                transition-all duration-300
                ${activeEducation === edu.id ? 'bg-slate-50 dark:bg-slate-800' : ''}
                ${hoveredEducation === edu.id ? 'border-purple-300 dark:border-purple-700 shadow-sm' : ''}
              `}
              onMouseEnter={() => setHoveredEducation(edu.id)}
              onMouseLeave={() => setHoveredEducation(null)}
            >
              <div className="flex justify-between">
                <div className="flex items-start gap-3">
                  {edu.logo ? (
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                      <img src={edu.logo} alt={edu.institution} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center bg-purple-100 dark:bg-purple-900/20 text-purple-500">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <h3 className="font-semibold text-base">{edu.degree} {edu.field}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{edu.institution}</p>
                      </div>
                      
                      <div className="flex-shrink-0 mr-5">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7"
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
                                <span>افزودن گواهینامه</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="justify-start text-destructive text-xs">
                                <span>حذف</span>
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-1 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3 w-3 ml-1" />
                      <span>{edu.startDate} - {edu.endDate}</span>
                    </div>
                    
                    {/* توضیحات */}
                    {edu.description && (
                      <div className="mt-2">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className={`h-6 p-0 text-xs text-purple-500 ${activeEducation === edu.id ? 'hidden' : ''}`}
                          onClick={() => setActiveEducation(edu.id)}
                        >
                          نمایش جزئیات بیشتر...
                        </Button>
                        
                        {activeEducation === edu.id && (
                          <div className="mt-1 space-y-2">
                            <p className="text-sm text-slate-700 dark:text-slate-300">
                              {edu.description}
                            </p>
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 px-2 text-xs"
                              onClick={() => setActiveEducation(null)}
                            >
                              <span>بستن</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* نشانگر افتخارات (برای مثال) */}
              {edu.field.includes("ایمنی") && (
                <div className="absolute -left-1 top-4">
                  <div className="bg-amber-500 text-white text-xs py-0.5 px-2 rounded-l-none rounded-r-md">
                    رتبه برتر
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* دکمه افزودن سابقه تحصیلی جدید */}
        <Button
          variant="outline"
          className="w-full border-dashed mt-4 h-16"
          onClick={() => setShowAddEducationDialog(true)}
        >
          <div className="flex items-center justify-center">
            <Plus className="w-5 h-5 ml-2" />
            <span>افزودن سابقه تحصیلی جدید</span>
          </div>
        </Button>
      </CardContent>
      
      {/* دیالوگ افزودن سابقه تحصیلی */}
      <Dialog open={showAddEducationDialog} onOpenChange={setShowAddEducationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن سابقه تحصیلی جدید</DialogTitle>
            <DialogDescription>
              اطلاعات تحصیلی خود را وارد کنید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">نام دانشگاه یا مؤسسه</label>
              <Input placeholder="مثال: دانشگاه تهران" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">مقطع تحصیلی</label>
                <select className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
                  <option value="">انتخاب کنید</option>
                  <option value="diploma">دیپلم</option>
                  <option value="associate">کاردانی</option>
                  <option value="bachelor">کارشناسی</option>
                  <option value="master">کارشناسی ارشد</option>
                  <option value="phd">دکتری</option>
                  <option value="postdoc">پسا دکتری</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">رشته تحصیلی</label>
                <Input placeholder="مثال: مهندسی ایمنی صنعتی" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">سال شروع</label>
                <Input placeholder="مثال: 1394" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">سال پایان</label>
                <Input placeholder="مثال: 1396" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">توضیحات (اختیاری)</label>
              <Textarea 
                placeholder="توضیحات مربوط به دوره تحصیلی، پروژه‌ها، افتخارات و..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">لوگوی مؤسسه (اختیاری)</label>
              <div className="flex items-center gap-2">
                <Input type="file" className="flex-1" />
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="add-certificate" className="rounded border-slate-300 dark:border-slate-600" />
                <label htmlFor="add-certificate" className="text-sm">
                  افزودن مدرک/گواهینامه مرتبط
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEducationDialog(false)}>
              انصراف
            </Button>
            <Button onClick={() => setShowAddEducationDialog(false)}>
              ذخیره
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}