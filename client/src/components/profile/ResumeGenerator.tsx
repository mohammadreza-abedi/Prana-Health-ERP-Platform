import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Download, Share2, Edit, Copy, Eye, Printer, FileDown, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ResumeGeneratorProps {
  profileCompleteness: number;
}

export function ResumeGenerator({ profileCompleteness }: ResumeGeneratorProps) {
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("professional");
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "profile",
    "experience",
    "education",
    "skills",
    "languages",
  ]);
  const [exportStatus, setExportStatus] = useState<"idle" | "generating" | "success" | "error">("idle");
  
  // نمونه قالب‌های رزومه
  const resumeTemplates = [
    { id: "professional", name: "حرفه‌ای", color: "bg-blue-500", icon: "💼" },
    { id: "creative", name: "خلاقانه", color: "bg-purple-500", icon: "🎨" },
    { id: "modern", name: "مدرن", color: "bg-tiffany", icon: "🌟" },
    { id: "classic", name: "کلاسیک", color: "bg-amber-500", icon: "📄" },
    { id: "executive", name: "مدیریتی", color: "bg-red-500", icon: "👔" },
  ];
  
  // بخش‌های قابل انتخاب برای رزومه
  const resumeSections = [
    { id: "profile", name: "اطلاعات شخصی", required: true },
    { id: "summary", name: "خلاصه حرفه‌ای" },
    { id: "experience", name: "سوابق شغلی" },
    { id: "education", name: "سوابق تحصیلی" },
    { id: "skills", name: "مهارت‌ها" },
    { id: "languages", name: "زبان‌ها" },
    { id: "achievements", name: "دستاوردها" },
    { id: "projects", name: "پروژه‌ها" },
    { id: "certificates", name: "گواهینامه‌ها" },
    { id: "publications", name: "انتشارات" },
    { id: "interests", name: "علایق" },
    { id: "references", name: "مراجع و توصیه‌نامه‌ها" },
  ];
  
  // فرمت‌های خروجی
  const exportFormats = [
    { id: "pdf", name: "PDF", icon: <FileText className="h-4 w-4 ml-1" /> },
    { id: "docx", name: "Word (DOCX)", icon: <FileDown className="h-4 w-4 ml-1" /> },
    { id: "json", name: "JSON", icon: <Copy className="h-4 w-4 ml-1" /> },
  ];
  
  // تغییر وضعیت انتخاب بخش‌ها
  const toggleSection = (sectionId: string) => {
    // اگر required است، نمی‌توان غیرفعالش کرد
    const section = resumeSections.find(s => s.id === sectionId);
    if (section?.required) return;
    
    setSelectedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(s => s !== sectionId)
        : [...prev, sectionId]
    );
  };
  
  // شبیه‌سازی عملیات صادر کردن
  const handleExport = () => {
    setExportStatus("generating");
    
    // شبیه‌سازی زمان پردازش
    setTimeout(() => {
      setExportStatus("success");
      
      // بعد از چند ثانیه، برگشت به حالت اولیه
      setTimeout(() => {
        setExportStatus("idle");
        setShowExportDialog(false);
      }, 2000);
    }, 2500);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5 text-tiffany" /> 
              رزومه‌ساز هوشمند
            </CardTitle>
            <CardDescription>
              رزومه حرفه‌ای خود را با فرمت‌های مختلف ایجاد کنید
            </CardDescription>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs"
            onClick={() => setShowExportDialog(true)}
          >
            <Download className="h-3 w-3 ml-1" />
            دریافت رزومه
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* پیش‌نمایش قالب */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 relative overflow-hidden">
            {/* علامت وضعیت تکمیل */}
            <div className="absolute top-3 left-3">
              <Badge 
                variant="outline" 
                className={`
                  px-2 text-xs
                  ${profileCompleteness >= 80 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' 
                    : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                  }
                `}
              >
                <div className="flex items-center">
                  {profileCompleteness >= 80 ? (
                    <CheckCircle2 className="h-3 w-3 ml-1" />
                  ) : (
                    <FileText className="h-3 w-3 ml-1" />
                  )}
                  <span>{profileCompleteness}% تکمیل</span>
                </div>
              </Badge>
            </div>
            
            {/* پیش‌نمایش رزومه */}
            <div className="w-full pt-6 relative">
              {/* نوار ابزار فوقانی */}
              <div className="flex items-center justify-center mb-3 space-x-2 space-x-reverse">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Eye className="h-3 w-3 ml-1" />
                  <span>پیش‌نمایش</span>
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Edit className="h-3 w-3 ml-1" />
                  <span>ویرایش</span>
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Printer className="h-3 w-3 ml-1" />
                  <span>چاپ</span>
                </Button>
              </div>
              
              {/* محتوای رزومه */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg aspect-[1/1.414] max-h-72 mx-auto overflow-hidden relative shadow-sm">
                {/* رزومه نمایش داده می‌شود */}
                <div className="absolute inset-0 p-5">
                  {/* سربرگ رزومه */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold">علی احمدی</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">مدیر HSE و متخصص ایمنی صنعتی</p>
                    </div>
                    
                    <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-tiffany overflow-hidden">
                      {/* آواتار کاربر */}
                    </div>
                  </div>
                  
                  {/* بخش اطلاعات تماس */}
                  <div className="flex items-center justify-between text-xs mt-3 text-slate-500 dark:text-slate-400">
                    <span>ایمیل: ali@example.com</span>
                    <span>موبایل: ۰۹۱۲۳۴۵۶۷۸۹</span>
                    <span>تهران، ایران</span>
                  </div>
                  
                  {/* خط جداکننده */}
                  <div className="h-0.5 bg-tiffany/20 mt-3 mb-4"></div>
                  
                  {/* بخش‌های رزومه */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-bold flex items-center">
                        <span className="w-1.5 h-1.5 bg-tiffany rounded-full ml-1 inline-block"></span>
                        سوابق شغلی
                      </h3>
                      <div className="pl-3 mt-1 space-y-2">
                        <div>
                          <p className="text-xs font-semibold">مدیر HSE | شرکت پتروشیمی ستاره</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">۱۴۰۰ - تاکنون</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold">کارشناس ایمنی | شرکت فولاد</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">۱۳۹۷ - ۱۴۰۰</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-bold flex items-center">
                        <span className="w-1.5 h-1.5 bg-tiffany rounded-full ml-1 inline-block"></span>
                        تحصیلات
                      </h3>
                      <div className="pl-3 mt-1">
                        <p className="text-xs font-semibold">کارشناسی ارشد مهندسی ایمنی</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">دانشگاه تهران | ۱۳۹۵ - ۱۳۹۷</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-bold flex items-center">
                        <span className="w-1.5 h-1.5 bg-tiffany rounded-full ml-1 inline-block"></span>
                        مهارت‌ها
                      </h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="inline-flex text-[10px] py-0.5 px-1.5 rounded-full bg-tiffany/10 border border-tiffany/20 text-tiffany">ارزیابی ریسک</span>
                        <span className="inline-flex text-[10px] py-0.5 px-1.5 rounded-full bg-tiffany/10 border border-tiffany/20 text-tiffany">مدیریت بحران</span>
                        <span className="inline-flex text-[10px] py-0.5 px-1.5 rounded-full bg-tiffany/10 border border-tiffany/20 text-tiffany">HSE</span>
                        <span className="inline-flex text-[10px] py-0.5 px-1.5 rounded-full bg-tiffany/10 border border-tiffany/20 text-tiffany">ISO 45001</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* نوار برند */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-tiffany"></div>
              </div>
              
              {/* لیبل قالب */}
              <div className="mt-3 flex items-center justify-center">
                <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 text-xs">
                  <div className="flex items-center">
                    <span className="ml-1">💼</span>
                    <span>قالب حرفه‌ای</span>
                  </div>
                </Badge>
              </div>
            </div>
          </div>
          
          {/* اطلاعات و توصیه‌ها */}
          <div className="p-3 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            <h3 className="text-sm font-medium mb-2">برای رزومه بهتر:</h3>
            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
              <li className="flex items-center">
                <span className="w-1 h-1 bg-tiffany rounded-full ml-1 inline-block"></span>
                اطلاعات پروفایل خود را تکمیل کنید
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-tiffany rounded-full ml-1 inline-block"></span>
                حداقل سه مهارت کلیدی خود را مشخص کنید
              </li>
              <li className="flex items-center">
                <span className="w-1 h-1 bg-tiffany rounded-full ml-1 inline-block"></span>
                دستاوردها و گواهینامه‌های مهم خود را اضافه کنید
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <Button 
          variant="default" 
          className="text-xs flex-1"
          onClick={() => setShowExportDialog(true)}
        >
          <Download className="h-4 w-4 ml-1" />
          <span>دانلود رزومه</span>
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9"
            onClick={() => setShowExportDialog(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-9 w-9"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
      
      {/* دیالوگ خروجی رزومه */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>خروجی رزومه</DialogTitle>
            <DialogDescription>
              تنظیمات خروجی رزومه خود را مشخص کنید.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="template" className="mt-1">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="template" className="text-xs">قالب</TabsTrigger>
              <TabsTrigger value="sections" className="text-xs">بخش‌ها</TabsTrigger>
              <TabsTrigger value="export" className="text-xs">خروجی</TabsTrigger>
            </TabsList>
            
            <TabsContent value="template" className="py-2 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">انتخاب قالب</label>
                <div className="grid grid-cols-2 gap-2">
                  {resumeTemplates.map(template => (
                    <div 
                      key={template.id}
                      className={`
                        p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer
                        transition-all duration-300
                        ${selectedTemplate === template.id 
                          ? `border-2 border-${template.color.split('-')[1]}-500 dark:border-${template.color.split('-')[1]}-700 shadow-sm` 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'}
                      `}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className={`w-8 h-8 rounded-full ${template.color} text-white flex items-center justify-center`}>
                          <span>{template.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{template.name}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">قالب {template.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">زبان رزومه</label>
                <Select defaultValue="fa">
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب زبان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fa">فارسی</SelectItem>
                    <SelectItem value="en">انگلیسی</SelectItem>
                    <SelectItem value="ar">عربی</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="include-photo" />
                  <label htmlFor="include-photo" className="text-sm">
                    شامل عکس پروفایل
                  </label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sections" className="py-2 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">انتخاب بخش‌ها</label>
                <div className="max-h-[250px] overflow-y-auto pr-1 space-y-2">
                  {resumeSections.map(section => (
                    <div 
                      key={section.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          id={`section-${section.id}`}
                          checked={selectedSections.includes(section.id)}
                          onCheckedChange={() => toggleSection(section.id)}
                          disabled={section.required}
                        />
                        <label htmlFor={`section-${section.id}`} className="text-sm">
                          {section.name}
                        </label>
                        {section.required && (
                          <Badge variant="outline" className="text-[10px]">الزامی</Badge>
                        )}
                      </div>
                      
                      <Badge 
                        variant="outline" 
                        className={`text-[10px] ${
                          section.id === "profile" || section.id === "experience" || section.id === "education" || section.id === "skills"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                            : "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                        }`}
                      >
                        {section.id === "profile" || section.id === "experience" || section.id === "education" || section.id === "skills"
                          ? "تکمیل شده"
                          : "نیاز به تکمیل"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="export" className="py-2 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">فرمت خروجی</label>
                <div className="space-y-2">
                  {exportFormats.map(format => (
                    <div 
                      key={format.id}
                      className={`
                        p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer
                        transition-all duration-300
                        ${selectedFormat === format.id 
                          ? 'border-2 border-blue-500 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10 shadow-sm' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800'}
                      `}
                      onClick={() => setSelectedFormat(format.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {format.icon}
                          <span className="text-sm font-medium">{format.name}</span>
                        </div>
                        
                        {selectedFormat === format.id && (
                          <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="include-contact" defaultChecked />
                  <label htmlFor="include-contact" className="text-sm">
                    شامل اطلاعات تماس
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              انصراف
            </Button>
            <Button 
              onClick={handleExport}
              disabled={exportStatus === "generating"}
            >
              {exportStatus === "idle" && (
                <>
                  <Download className="h-4 w-4 ml-1" />
                  <span>دریافت رزومه</span>
                </>
              )}
              
              {exportStatus === "generating" && (
                <>
                  <svg className="animate-spin h-4 w-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>در حال آماده‌سازی...</span>
                </>
              )}
              
              {exportStatus === "success" && (
                <>
                  <CheckCircle2 className="h-4 w-4 ml-1" />
                  <span>رزومه آماده شد!</span>
                </>
              )}
              
              {exportStatus === "error" && (
                <>
                  <span>خطا در ایجاد رزومه</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}