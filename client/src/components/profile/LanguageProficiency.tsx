import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Plus, Star } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Language {
  name: string;
  level: string;
  proficiency: number;
}

interface LanguageProficiencyProps {
  languages: Language[];
}

export function LanguageProficiency({ languages }: LanguageProficiencyProps) {
  const [showAddLanguageDialog, setShowAddLanguageDialog] = useState(false);
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  
  // مهارت‌های مرتبط با هر زبان
  const languageSkills = {
    "فارسی": ["نوشتن گزارش", "سخنرانی", "آموزش"],
    "انگلیسی": ["مکاتبات تخصصی", "مقاله‌نویسی", "ارائه"],
    "عربی": ["مکالمه", "متون پایه"],
  };
  
  // رتبه‌بندی سطوح زبان
  const languageLevels = [
    { value: "زبان مادری", label: "زبان مادری", score: 100 },
    { value: "پیشرفته", label: "پیشرفته", score: 90 },
    { value: "متوسط تا پیشرفته", label: "متوسط تا پیشرفته", score: 75 },
    { value: "متوسط", label: "متوسط", score: 60 },
    { value: "پایه تا متوسط", label: "پایه تا متوسط", score: 45 },
    { value: "پایه", label: "پایه", score: 30 },
  ];
  
  // گرفتن رنگ متناسب با سطح تسلط
  const getProgressColor = (proficiency: number) => {
    if (proficiency >= 90) return "bg-green-500";
    if (proficiency >= 70) return "bg-tiffany";
    if (proficiency >= 40) return "bg-amber-500";
    return "bg-slate-500";
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base font-semibold flex items-center">
              <Globe className="mr-2 h-5 w-5 text-blue-500" /> 
              مهارت‌های زبانی
            </CardTitle>
            <CardDescription>
              {languages.length} زبان ثبت شده
            </CardDescription>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setShowAddLanguageDialog(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-5">
          {languages.map((language, index) => (
            <motion.div 
              key={language.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
                transition-all duration-300
                ${hoveredLanguage === language.name ? 'scale-[1.02]' : ''}
              `}
              onMouseEnter={() => setHoveredLanguage(language.name)}
              onMouseLeave={() => setHoveredLanguage(null)}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  {language.name === "انگلیسی" && (
                    <span className="ml-1.5 text-base">🇬🇧</span>
                  )}
                  {language.name === "فارسی" && (
                    <span className="ml-1.5 text-base">🇮🇷</span>
                  )}
                  {language.name === "عربی" && (
                    <span className="ml-1.5 text-base">🇦🇪</span>
                  )}
                  {!["انگلیسی", "فارسی", "عربی"].includes(language.name) && (
                    <span className="ml-1.5 text-base">🌐</span>
                  )}
                  <h3 className="font-medium text-sm">{language.name}</h3>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {language.level}
                </span>
              </div>
              
              <div className="space-y-2">
                <Progress value={language.proficiency} className={`h-1.5 ${getProgressColor(language.proficiency)}`} />
                
                {/* مهارت‌های مرتبط با زبان */}
                {hoveredLanguage === language.name && languageSkills[language.name as keyof typeof languageSkills] && (
                  <motion.div 
                    className="flex flex-wrap gap-1 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {languageSkills[language.name as keyof typeof languageSkills].map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
          
          {/* دکمه افزودن زبان جدید */}
          <Button
            variant="outline"
            className="w-full border-dashed h-12 mt-2"
            onClick={() => setShowAddLanguageDialog(true)}
          >
            <div className="flex items-center justify-center">
              <Plus className="w-4 h-4 ml-2" />
              <span className="text-xs">افزودن زبان جدید</span>
            </div>
          </Button>
        </div>
      </CardContent>
      
      {/* دیالوگ افزودن زبان */}
      <Dialog open={showAddLanguageDialog} onOpenChange={setShowAddLanguageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن زبان جدید</DialogTitle>
            <DialogDescription>
              زبان و سطح تسلط خود را وارد کنید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">نام زبان</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب زبان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="فارسی">فارسی</SelectItem>
                  <SelectItem value="انگلیسی">انگلیسی</SelectItem>
                  <SelectItem value="عربی">عربی</SelectItem>
                  <SelectItem value="فرانسوی">فرانسوی</SelectItem>
                  <SelectItem value="آلمانی">آلمانی</SelectItem>
                  <SelectItem value="اسپانیایی">اسپانیایی</SelectItem>
                  <SelectItem value="ایتالیایی">ایتالیایی</SelectItem>
                  <SelectItem value="روسی">روسی</SelectItem>
                  <SelectItem value="چینی">چینی</SelectItem>
                  <SelectItem value="ژاپنی">ژاپنی</SelectItem>
                  <SelectItem value="کره‌ای">کره‌ای</SelectItem>
                  <SelectItem value="ترکی">ترکی</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">سطح تسلط</label>
              <Select defaultValue="متوسط">
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب سطح" />
                </SelectTrigger>
                <SelectContent>
                  {languageLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">مهارت‌ها (با کاما جدا کنید)</label>
              <Input placeholder="مثال: مکالمه، نوشتن، خواندن متون تخصصی" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium mb-2 block">امتیاز آزمون (اختیاری)</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs">نوع آزمون</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب آزمون" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IELTS">IELTS</SelectItem>
                      <SelectItem value="TOEFL">TOEFL</SelectItem>
                      <SelectItem value="MSRT">MSRT</SelectItem>
                      <SelectItem value="Cambridge">Cambridge</SelectItem>
                      <SelectItem value="DELF">DELF</SelectItem>
                      <SelectItem value="TORFL">TORFL</SelectItem>
                      <SelectItem value="HSK">HSK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs">نمره</label>
                  <Input placeholder="مثال: 7.5 یا 95" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium mb-2 block">ارزیابی مهارت‌ها</label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">مکالمه</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 3 ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">خواندن</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 4 ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">نوشتن</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 3 ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs">گوش دادن</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < 4 ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="has-certificate" className="rounded border-slate-300 dark:border-slate-600" />
                <label htmlFor="has-certificate" className="text-sm">
                  دارای گواهینامه یا مدرک رسمی
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddLanguageDialog(false)}>
              انصراف
            </Button>
            <Button onClick={() => setShowAddLanguageDialog(false)}>
              ذخیره
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}