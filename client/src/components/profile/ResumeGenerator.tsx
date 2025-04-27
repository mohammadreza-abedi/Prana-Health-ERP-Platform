import { useState, useRef } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Printer, 
  Share2, 
  ChevronDown, 
  FileText, 
  Copy, 
  PenTool,
  Check,
  Palette,
  Layout,
  Type,
  CreditCard,
  Image
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

// تعریف انواع رزومه
const resumeTypes = [
  { id: "professional", name: "حرفه‌ای", icon: <FileText className="w-4 h-4" /> },
  { id: "creative", name: "خلاقانه", icon: <PenTool className="w-4 h-4" /> },
  { id: "simple", name: "ساده", icon: <CreditCard className="w-4 h-4" /> },
  { id: "academic", name: "دانشگاهی", icon: <Layout className="w-4 h-4" /> },
  { id: "executive", name: "مدیریتی", icon: <Image className="w-4 h-4" /> },
];

// تعریف رنگ‌های قالب رزومه
const resumeColors = [
  { name: "آبی کلاسیک", value: "blue", hex: "#1E40AF" },
  { name: "سبز پویا", value: "green", hex: "#047857" },
  { name: "بنفش خلاق", value: "purple", hex: "#7E22CE" },
  { name: "نارنجی انرژی بخش", value: "orange", hex: "#EA580C" },
  { name: "فیروزه‌ای مدرن", value: "teal", hex: "#0D9488" },
  { name: "خاکستری حرفه‌ای", value: "gray", hex: "#4B5563" },
];

// تعریف قالب‌های رزومه
const resumeTemplates = [
  { id: "modern", name: "مدرن", description: "قالب مدرن با طراحی مینیمال" },
  { id: "classic", name: "کلاسیک", description: "قالب سنتی و رسمی" },
  { id: "creative", name: "خلاقانه", description: "طراحی خلاقانه با المان‌های گرافیکی" },
  { id: "timeline", name: "خط زمانی", description: "نمایش سوابق به صورت خط زمانی" },
  { id: "simple", name: "ساده", description: "قالب ساده و کاربردی" },
  { id: "elegant", name: "شیک", description: "طراحی شیک و حرفه‌ای" },
  { id: "corporate", name: "سازمانی", description: "مناسب برای محیط‌های سازمانی" },
  { id: "academic", name: "دانشگاهی", description: "مناسب برای محیط‌های علمی" },
];

// تعریف قلم‌های رزومه
const resumeFonts = [
  { id: "peyda", name: "پیدا", family: "Peyda" },
  { id: "vazir", name: "وزیر", family: "Vazir" },
  { id: "yekan", name: "یکان", family: "YekanBakh" },
  { id: "samim", name: "صمیم", family: "Samim" },
  { id: "sahel", name: "ساحل", family: "Sahel" },
];

interface ResumeGeneratorProps {
  userProfile: any;
  viewMode: "standard" | "resume" | "card";
  setViewMode: (mode: "standard" | "resume" | "card") => void;
}

export function ResumeGenerator({ userProfile, viewMode, setViewMode }: ResumeGeneratorProps) {
  const [activeTab, setActiveTab] = useState("design");
  const [resumeType, setResumeType] = useState("professional");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedFont, setSelectedFont] = useState("peyda");
  const [showHeader, setShowHeader] = useState(true);
  const [showContact, setShowContact] = useState(true);
  const [showPhoto, setShowPhoto] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [spacing, setSpacing] = useState([12]);
  const [fontSize, setFontSize] = useState([14]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [aiSuggestionEnabled, setAiSuggestionEnabled] = useState(true);
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "personal", "summary", "experience", "education", "skills", 
    "certificates", "languages", "projects", "achievements"
  ]);
  
  const resumeRef = useRef<HTMLDivElement>(null);
  
  // شبیه‌سازی تولید رزومه
  const generateResume = () => {
    setIsGenerating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
          }, 500);
        }
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 300);
  };
  
  // شبیه‌سازی چاپ رزومه
  const printResume = () => {
    window.print();
  };
  
  // شبیه‌سازی دانلود رزومه
  const downloadResume = () => {
    alert('در حال دانلود رزومه...');
  };
  
  // شبیه‌سازی کپی لینک رزومه
  const copyResumeLink = () => {
    navigator.clipboard.writeText('https://example.com/resume/123456');
    alert('لینک رزومه کپی شد!');
  };
  
  // تنظیم بخش‌های رزومه
  const toggleSection = (section: string) => {
    setSelectedSections((prev) => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };
  
  // تبدیل اعشار به زمان
  const formatDate = (dateString: string) => {
    if (dateString.includes('/')) {
      const [year, month] = dateString.split('/');
      const persianMonths = [
        "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
        "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
      ];
      return `${persianMonths[parseInt(month) - 1]} ${year}`;
    }
    return dateString;
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ستون ابزارها و تنظیمات */}
      <div className="space-y-4">
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <span>ابزار ساخت رزومه</span>
              <Badge variant={aiSuggestionEnabled ? "default" : "outline"} className="mr-2">
                هوش مصنوعی
              </Badge>
            </CardTitle>
            <CardDescription>
              رزومه حرفه‌ای خود را با ابزارهای پیشرفته بسازید
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-3">
            <Tabs defaultValue="design" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid grid-cols-4 w-full">
                <TabsTrigger value="design" className="text-xs">طراحی</TabsTrigger>
                <TabsTrigger value="content" className="text-xs">محتوا</TabsTrigger>
                <TabsTrigger value="sections" className="text-xs">بخش‌ها</TabsTrigger>
                <TabsTrigger value="export" className="text-xs">خروجی</TabsTrigger>
              </TabsList>
              
              {/* تب طراحی */}
              {activeTab === "design" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">نوع رزومه</Label>
                    <RadioGroup 
                      defaultValue={resumeType}
                      onValueChange={setResumeType}
                      className="grid grid-cols-3 gap-2"
                    >
                      {resumeTypes.map(type => (
                        <div key={type.id} className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value={type.id} id={`type-${type.id}`} />
                          <Label htmlFor={`type-${type.id}`} className="flex items-center text-xs">
                            <span className="ml-1">{type.icon}</span> {type.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">قالب رزومه</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {resumeTemplates.slice(0, 4).map(template => (
                        <div 
                          key={template.id}
                          className={`p-2 text-center rounded-lg cursor-pointer border transition-all
                            ${selectedTemplate === template.id 
                              ? "border-tiffany bg-tiffany/5 dark:bg-tiffany/10" 
                              : "border-slate-200 dark:border-slate-700 hover:border-tiffany/50"
                            }
                          `}
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <p className="text-xs font-medium">{template.name}</p>
                        </div>
                      ))}
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full mt-1 text-xs">
                          بیشتر <ChevronDown className="h-3 w-3 mr-1" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px]">
                        <div className="grid grid-cols-2 gap-2">
                          {resumeTemplates.slice(4).map(template => (
                            <div 
                              key={template.id}
                              className={`p-2 text-center rounded-lg cursor-pointer border transition-all
                                ${selectedTemplate === template.id 
                                  ? "border-tiffany bg-tiffany/5" 
                                  : "border-slate-200 dark:border-slate-700 hover:border-tiffany/50"
                                }
                              `}
                              onClick={() => setSelectedTemplate(template.id)}
                            >
                              <p className="text-xs font-medium">{template.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{template.description}</p>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">رنگ اصلی</Label>
                    <div className="flex flex-wrap gap-2">
                      {resumeColors.map(color => (
                        <button
                          key={color.value}
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            selectedColor === color.value 
                              ? "border-slate-950 dark:border-white shadow-md scale-110" 
                              : "border-slate-200 dark:border-slate-700"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => setSelectedColor(color.value)}
                          title={color.name}
                        ></button>
                      ))}
                      <button
                        className="w-6 h-6 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500"
                        onClick={() => setIsCustomizing(true)}
                        title="انتخاب رنگ سفارشی"
                      ></button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">فونت</Label>
                    <Select
                      defaultValue={selectedFont}
                      onValueChange={setSelectedFont}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="انتخاب فونت" />
                      </SelectTrigger>
                      <SelectContent>
                        {resumeFonts.map(font => (
                          <SelectItem key={font.id} value={font.id}>
                            <span style={{ fontFamily: font.family }}>{font.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">اندازه فونت</Label>
                    <Slider
                      defaultValue={fontSize}
                      max={20}
                      min={10}
                      step={1}
                      onValueChange={setFontSize}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>کوچک</span>
                      <span>{fontSize}px</span>
                      <span>بزرگ</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">فاصله بین عناصر</Label>
                    <Slider
                      defaultValue={spacing}
                      max={24}
                      min={4}
                      step={1}
                      onValueChange={setSpacing}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>کم</span>
                      <span>{spacing}px</span>
                      <span>زیاد</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">المان‌های نمایش</h4>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-header" className="cursor-pointer">سربرگ</Label>
                      <Switch
                        id="show-header"
                        checked={showHeader}
                        onCheckedChange={setShowHeader}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-contact" className="cursor-pointer">اطلاعات تماس</Label>
                      <Switch
                        id="show-contact"
                        checked={showContact}
                        onCheckedChange={setShowContact}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-photo" className="cursor-pointer">عکس پروفایل</Label>
                      <Switch
                        id="show-photo"
                        checked={showPhoto}
                        onCheckedChange={setShowPhoto}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-footer" className="cursor-pointer">پاورقی</Label>
                      <Switch
                        id="show-footer"
                        checked={showFooter}
                        onCheckedChange={setShowFooter}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* تب محتوا */}
              {activeTab === "content" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">پیشنهاد هوشمند محتوا</Label>
                      <Switch
                        checked={aiSuggestionEnabled}
                        onCheckedChange={setAiSuggestionEnabled}
                      />
                    </div>
                    
                    {aiSuggestionEnabled && (
                      <div className="bg-tiffany/5 dark:bg-tiffany/10 p-3 rounded-lg border border-tiffany/20 text-xs text-slate-700 dark:text-slate-300">
                        با استفاده از هوش مصنوعی، محتوای رزومه شما به صورت خودکار بهینه‌سازی می‌شود. لحن نوشتاری، کلمات کلیدی و ساختار به صورت هوشمند متناسب با موقعیت شغلی شما تنظیم می‌شود.
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="personal">
                      <AccordionTrigger className="text-sm">اطلاعات شخصی</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label className="text-xs">عنوان شغلی</Label>
                            <Input defaultValue={userProfile.title} className="text-xs h-8" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">درباره من</Label>
                            <Textarea 
                              defaultValue={userProfile.bio} 
                              className="text-xs resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="skills">
                      <AccordionTrigger className="text-sm">مهارت‌ها</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {userProfile.skills.map((skill: any, index: number) => (
                            <div key={index} className="flex items-center justify-between gap-2">
                              <Input 
                                defaultValue={skill.name} 
                                className="text-xs h-8" 
                              />
                              <Select defaultValue={skill.level.toString()}>
                                <SelectTrigger className="w-24 h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="100">استاد</SelectItem>
                                  <SelectItem value="90">پیشرفته</SelectItem>
                                  <SelectItem value="75">متوسط</SelectItem>
                                  <SelectItem value="50">مبتدی</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            <span>افزودن مهارت</span>
                            <span className="ml-1">+</span>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="experience">
                      <AccordionTrigger className="text-sm">سوابق شغلی</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {userProfile.experience.map((exp: any, index: number) => (
                            <div key={index} className="p-2 border rounded-lg space-y-2">
                              <div className="flex justify-between items-center">
                                <h4 className="text-xs font-medium">{exp.company}</h4>
                                <div className="flex space-x-1 space-x-reverse">
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <PenTool className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive">
                                    <span className="sr-only">حذف</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Label className="text-xs">سمت</Label>
                                  <Input defaultValue={exp.title} className="text-xs h-7" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">محل</Label>
                                  <Input defaultValue={exp.location} className="text-xs h-7" />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Label className="text-xs">تاریخ شروع</Label>
                                  <Input defaultValue={exp.startDate} className="text-xs h-7" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">تاریخ پایان</Label>
                                  <Input defaultValue={exp.endDate} className="text-xs h-7" placeholder="تاکنون" />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">شرح وظایف</Label>
                                <Textarea 
                                  defaultValue={exp.description} 
                                  className="text-xs resize-none"
                                  rows={2}
                                />
                              </div>
                            </div>
                          ))}
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            <span>افزودن سابقه شغلی</span>
                            <span className="ml-1">+</span>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="education">
                      <AccordionTrigger className="text-sm">سوابق تحصیلی</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3">
                          {userProfile.education.map((edu: any, index: number) => (
                            <div key={index} className="p-2 border rounded-lg space-y-2">
                              <div className="flex justify-between items-center">
                                <h4 className="text-xs font-medium">{edu.institution}</h4>
                                <div className="flex space-x-1 space-x-reverse">
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                    <PenTool className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive">
                                    <span className="sr-only">حذف</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                                  </Button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Label className="text-xs">مقطع</Label>
                                  <Input defaultValue={edu.degree} className="text-xs h-7" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">رشته</Label>
                                  <Input defaultValue={edu.field} className="text-xs h-7" />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Label className="text-xs">تاریخ شروع</Label>
                                  <Input defaultValue={edu.startDate} className="text-xs h-7" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">تاریخ پایان</Label>
                                  <Input defaultValue={edu.endDate} className="text-xs h-7" />
                                </div>
                              </div>
                            </div>
                          ))}
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            <span>افزودن سابقه تحصیلی</span>
                            <span className="ml-1">+</span>
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
              
              {/* تب بخش‌ها */}
              {activeTab === "sections" && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="ml-2"
                          checked={selectedSections.includes("personal")}
                          onChange={() => toggleSection("personal")}
                        />
                        اطلاعات شخصی
                      </Label>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="ml-2"
                          checked={selectedSections.includes("summary")}
                          onChange={() => toggleSection("summary")}
                        />
                        خلاصه حرفه‌ای
                      </Label>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="ml-2"
                          checked={selectedSections.includes("experience")}
                          onChange={() => toggleSection("experience")}
                        />
                        سوابق شغلی
                      </Label>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="ml-2"
                          checked={selectedSections.includes("education")}
                          onChange={() => toggleSection("education")}
                        />
                        سوابق تحصیلی
                      </Label>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="ml-2"
                          checked={selectedSections.includes("skills")}
                          onChange={() => toggleSection("skills")}
                        />
                        مهارت‌ها
                      </Label>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="ml-2"
                          checked={selectedSections.includes("certificates")}
                          onChange={() => toggleSection("certificates")}
                        />
                        گواهینامه‌ها
                      </Label>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="ml-2"
                          checked={selectedSections.includes("languages")}
                          onChange={() => toggleSection("languages")}
                        />
                        زبان‌ها
                      </Label>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="ml-2"
                          checked={selectedSections.includes("projects")}
                          onChange={() => toggleSection("projects")}
                        />
                        پروژه‌ها
                      </Label>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="ml-2"
                          checked={selectedSections.includes("achievements")}
                          onChange={() => toggleSection("achievements")}
                        />
                        دستاوردها
                      </Label>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                      </Button>
                    </div>
                    
                    <Button variant="outline" size="sm" className="text-xs w-full mt-2">
                      <span>افزودن بخش جدید</span>
                      <span className="ml-1">+</span>
                    </Button>
                  </div>
                </div>
              )}
              
              {/* تب خروجی */}
              {activeTab === "export" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">فرمت خروجی</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <input 
                          type="radio" 
                          id="format-pdf" 
                          name="format" 
                          defaultChecked
                        />
                        <Label htmlFor="format-pdf" className="flex items-center cursor-pointer">
                          <span className="ml-1">
                            <FileText className="w-4 h-4 text-rose-500" />
                          </span>
                          PDF
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <input 
                          type="radio" 
                          id="format-docx" 
                          name="format"
                        />
                        <Label htmlFor="format-docx" className="flex items-center cursor-pointer">
                          <span className="ml-1">
                            <FileText className="w-4 h-4 text-blue-500" />
                          </span>
                          Word
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">تنظیمات صفحه</h4>
                    <div className="flex space-x-3 space-x-reverse">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <input 
                          type="radio" 
                          id="page-a4" 
                          name="page" 
                          defaultChecked
                        />
                        <Label htmlFor="page-a4" className="text-xs cursor-pointer">A4</Label>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <input 
                          type="radio" 
                          id="page-letter" 
                          name="page"
                        />
                        <Label htmlFor="page-letter" className="text-xs cursor-pointer">Letter</Label>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <input 
                          type="radio" 
                          id="page-legal" 
                          name="page"
                        />
                        <Label htmlFor="page-legal" className="text-xs cursor-pointer">Legal</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-qr" className="text-sm font-medium cursor-pointer">افزودن کد QR</Label>
                      <Switch id="include-qr" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      با اضافه کردن کد QR، دیگران می‌توانند به راحتی به نسخه آنلاین رزومه شما دسترسی داشته باشند.
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="include-digital-signature" className="text-sm font-medium cursor-pointer">امضای دیجیتال</Label>
                      <Switch id="include-digital-signature" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      افزودن امضای دیجیتال جهت تأیید اصالت رزومه
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={downloadResume}
                    >
                      <Download className="ml-1 h-3 w-3" />
                      دانلود
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={printResume}
                    >
                      <Printer className="ml-1 h-3 w-3" />
                      چاپ
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={copyResumeLink}
                    >
                      <Copy className="ml-1 h-3 w-3" />
                      کپی لینک
                    </Button>
                  </div>
                </div>
              )}
            </Tabs>
          </CardContent>
          
          <CardFooter className="pt-0">
            <Button
              onClick={generateResume}
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <div className="w-full">
                  <div className="flex items-center justify-center gap-2">
                    <span>در حال ساخت رزومه...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-1 mt-1" />
                </div>
              ) : (
                <span>ساخت رزومه</span>
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="shadow-md text-center bg-slate-50 dark:bg-slate-900 border-dashed pb-2">
          <div className="p-4">
            <h3 className="text-sm font-medium mb-2">نیاز به کمک بیشتر در نوشتن رزومه؟</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              دستیار هوشمند ما می‌تواند به شما کمک کند.
            </p>
            <Button size="sm" variant="default" className="w-full text-xs">
              <Zap className="ml-1 w-3 h-3" />
              کمک هوشمند
            </Button>
          </div>
        </Card>
      </div>
      
      {/* پیش‌نمایش رزومه */}
      <div className="col-span-2">
        <div className="flex justify-between mb-3">
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "standard" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("standard")}
              className="text-xs"
            >
              پیش‌نمایش استاندارد
            </Button>
            <Button 
              variant={viewMode === "resume" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("resume")}
              className="text-xs"
            >
              قالب PDF
            </Button>
            <Button 
              variant={viewMode === "card" ? "default" : "outline"} 
              size="sm"
              onClick={() => setViewMode("card")}
              className="text-xs"
            >
              کارت رزومه
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              <Printer className="ml-1 w-3 h-3" />
              چاپ
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <Share2 className="ml-1 w-3 h-3" />
              اشتراک‌گذاری
            </Button>
          </div>
        </div>
        
        <Card className="shadow-md overflow-hidden">
          <div className="h-[600px] overflow-auto">
            <div ref={resumeRef} className="p-4 min-h-full bg-white dark:bg-slate-900">
              {viewMode === "standard" && (
                <div className="space-y-6">
                  {showHeader && (
                    <div className="border-b pb-4 flex justify-between items-center">
                      <div>
                        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                        <p className="text-slate-600 dark:text-slate-400">{userProfile.title}</p>
                      </div>
                      {showPhoto && (
                        <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-slate-200">
                          <img src={userProfile.avatar} alt={userProfile.name} className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {showContact && (
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        <span>{userProfile.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <span>{userProfile.email}</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span>{userProfile.location}</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedSections.includes("summary") && (
                    <div>
                      <h2 className="text-lg font-bold mb-2">خلاصه</h2>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">{userProfile.bio}</p>
                    </div>
                  )}
                  
                  {selectedSections.includes("skills") && (
                    <div>
                      <h2 className="text-lg font-bold mb-2">مهارت‌ها</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {userProfile.skills.map((skill: any, index: number) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{skill.name}</span>
                              <span>{Math.round(skill.level)}%</span>
                            </div>
                            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${selectedColor === "blue" ? "bg-blue-600" : selectedColor === "green" ? "bg-green-600" : selectedColor === "teal" ? "bg-tiffany" : selectedColor === "purple" ? "bg-purple-600" : selectedColor === "orange" ? "bg-orange-600" : "bg-slate-600"}`}
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedSections.includes("experience") && (
                    <div>
                      <h2 className="text-lg font-bold mb-2">سوابق شغلی</h2>
                      <div className="space-y-4">
                        {userProfile.experience.map((exp: any, index: number) => (
                          <div key={index} className="border-r-2 pr-4 border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold">{exp.title}</h3>
                            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                              <span>{exp.company}, {exp.location}</span>
                              <span>
                                {formatDate(exp.startDate)} - {exp.endDate === 'تاکنون' ? exp.endDate : formatDate(exp.endDate)}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{exp.description}</p>
                            {exp.achievements && exp.achievements.length > 0 && (
                              <div className="mt-2">
                                <h4 className="text-sm font-medium">دستاوردها:</h4>
                                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300">
                                  {exp.achievements.map((achievement: string, i: number) => (
                                    <li key={i}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedSections.includes("education") && (
                    <div>
                      <h2 className="text-lg font-bold mb-2">سوابق تحصیلی</h2>
                      <div className="space-y-4">
                        {userProfile.education.map((edu: any, index: number) => (
                          <div key={index} className="flex justify-between">
                            <div>
                              <h3 className="font-bold">{edu.degree} {edu.field}</h3>
                              <p className="text-sm text-slate-700 dark:text-slate-300">{edu.institution}</p>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{edu.description}</p>
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {edu.startDate} - {edu.endDate}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedSections.includes("languages") && (
                    <div>
                      <h2 className="text-lg font-bold mb-2">زبان‌ها</h2>
                      <div className="flex flex-wrap gap-4">
                        {userProfile.languages.map((lang: any, index: number) => (
                          <div key={index} className="space-y-1">
                            <span className="text-sm">{lang.name} - {lang.level}</span>
                            <div className="h-2 w-20 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${selectedColor === "blue" ? "bg-blue-600" : selectedColor === "green" ? "bg-green-600" : selectedColor === "teal" ? "bg-tiffany" : selectedColor === "purple" ? "bg-purple-600" : selectedColor === "orange" ? "bg-orange-600" : "bg-slate-600"}`}
                                style={{ width: `${lang.proficiency}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedSections.includes("certificates") && userProfile.certificates && (
                    <div>
                      <h2 className="text-lg font-bold mb-2">گواهینامه‌ها</h2>
                      <div className="grid grid-cols-2 gap-4">
                        {userProfile.certificates.map((cert: any, index: number) => (
                          <div key={index} className="border p-3 rounded-lg">
                            <h3 className="font-bold text-sm">{cert.name}</h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400">صادر کننده: {cert.issuer}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              تاریخ: {cert.date} {cert.expires && `(انقضا: ${cert.expires})`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {showFooter && (
                    <div className="border-t pt-4 mt-8 flex justify-between text-xs text-slate-500 dark:text-slate-500">
                      <span>به روز شده در: ۱۴۰۲/۰۲/۱۵</span>
                      <span>صفحه ۱ از ۱</span>
                    </div>
                  )}
                </div>
              )}
              
              {viewMode === "resume" && (
                <div className="space-y-6 bg-white p-8 shadow-lg">
                  <div className="flex justify-between items-center border-b pb-6">
                    <div>
                      <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                      <p className="text-lg text-slate-600">{userProfile.title}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                        <div className="flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                          <span>{userProfile.phone}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                          <span>{userProfile.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          <span>{userProfile.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-slate-200">
                      <img src={userProfile.avatar} alt={userProfile.name} className="h-full w-full object-cover" />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-3 border-b pb-1">خلاصه حرفه‌ای</h2>
                    <p className="text-justify">{userProfile.bio}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-3 border-b pb-1">سوابق شغلی</h2>
                    <div className="space-y-6">
                      {userProfile.experience.map((exp: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg">{exp.title}</h3>
                            <span className="text-sm font-medium text-slate-600">
                              {formatDate(exp.startDate)} - {exp.endDate === 'تاکنون' ? exp.endDate : formatDate(exp.endDate)}
                            </span>
                          </div>
                          <p className="text-slate-700 font-medium">{exp.company}, {exp.location}</p>
                          <p className="mt-2">{exp.description}</p>
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="mt-2">
                              <h4 className="font-medium">دستاوردها:</h4>
                              <ul className="list-disc list-inside text-slate-700">
                                {exp.achievements.map((achievement: string, i: number) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-3 border-b pb-1">سوابق تحصیلی</h2>
                    <div className="space-y-4">
                      {userProfile.education.map((edu: any, index: number) => (
                        <div key={index}>
                          <div className="flex justify-between items-center">
                            <h3 className="font-bold">{edu.degree} {edu.field}</h3>
                            <span className="text-sm font-medium text-slate-600">
                              {edu.startDate} - {edu.endDate}
                            </span>
                          </div>
                          <p className="text-slate-700 font-medium">{edu.institution}</p>
                          <p className="mt-1 text-sm">{edu.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-xl font-bold mb-3 border-b pb-1">مهارت‌ها</h2>
                      <div className="space-y-3">
                        {userProfile.skills.map((skill: any, index: number) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-slate-600">{Math.round(skill.level)}%</span>
                            </div>
                            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${selectedColor === "blue" ? "bg-blue-600" : selectedColor === "green" ? "bg-green-600" : selectedColor === "teal" ? "bg-tiffany" : selectedColor === "purple" ? "bg-purple-600" : selectedColor === "orange" ? "bg-orange-600" : "bg-slate-600"}`}
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold mb-3 border-b pb-1">گواهینامه‌ها</h2>
                      <div className="space-y-3">
                        {userProfile.certificates.map((cert: any, index: number) => (
                          <div key={index} className="grid grid-cols-[auto,1fr] gap-3">
                            <div className="p-2 bg-slate-100 rounded-md">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600"><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2Z"></path><path d="M9 3v18"></path><path d="M13 7h4"></path><path d="M13 11h4"></path></svg>
                            </div>
                            <div>
                              <h3 className="font-medium">{cert.name}</h3>
                              <p className="text-sm text-slate-600">
                                {cert.issuer} • {cert.date} {cert.expires && `(انقضا: ${cert.expires})`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <h2 className="text-xl font-bold mb-3 border-b pb-1 mt-6">زبان‌ها</h2>
                      <div className="space-y-3">
                        {userProfile.languages.map((lang: any, index: number) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="font-medium">{lang.name}</span>
                            <span className="text-sm text-slate-600">{lang.level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4 mt-6 flex justify-between text-sm text-slate-500">
                    <span>
                      <span className="ml-1">🌐</span>
                      {userProfile.website}
                    </span>
                    <span>صفحه ۱ از ۱</span>
                  </div>
                </div>
              )}
              
              {viewMode === "card" && (
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                    <div className="h-32 bg-gradient-to-r from-tiffany to-cyan-400"></div>
                    <div className="relative px-6 py-8 -mt-16 space-y-4">
                      <div className="flex flex-col items-center">
                        <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg mb-2">
                          <img 
                            src={userProfile.avatar} 
                            alt={userProfile.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h2 className="text-2xl font-bold text-center">{userProfile.name}</h2>
                        <p className="text-slate-600 text-center">{userProfile.title}</p>
                        
                        <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                          <span>{userProfile.location}</span>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-1">
                        <div className="flex justify-center space-x-3 space-x-reverse mt-4">
                          <a href="#" className="p-2 bg-tiffany/10 rounded-full text-tiffany hover:bg-tiffany/20 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                          </a>
                          
                          <a href="#" className="p-2 bg-blue-500/10 rounded-full text-blue-500 hover:bg-blue-500/20 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                          </a>
                          
                          <a href="#" className="p-2 bg-pink-500/10 rounded-full text-pink-500 hover:bg-pink-500/20 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                          </a>
                          
                          <a href="#" className="p-2 bg-slate-500/10 rounded-full text-slate-500 hover:bg-slate-500/20 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.371 5.066c-1.822 0-3.307 1.48-3.307 3.31 0 1.813 1.485 3.3 3.307 3.3 1.826 0 3.312-1.487 3.312-3.3 0-1.83-1.486-3.31-3.312-3.31zm10.306 9.066v4.792H0V14.13c0-2.002 3.34-3.107 8.371-3.107 5.025 0 8.371 1.104 8.371 3.107"></path></svg>
                          </a>
                        </div>
                      </div>
                      
                      <p className="text-sm text-center text-slate-600 border-t border-b py-3 my-3">{userProfile.bio}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                          <h3 className="font-bold text-lg">{userProfile.experience.length}</h3>
                          <p className="text-xs text-slate-500">سال تجربه</p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-lg text-center">
                          <h3 className="font-bold text-lg">{userProfile.skills.length}</h3>
                          <p className="text-xs text-slate-500">مهارت کلیدی</p>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button size="sm" className="w-full">
                          <span>مشاهده رزومه کامل</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}