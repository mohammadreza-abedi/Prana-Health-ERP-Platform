import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Activity, Brain, Calculator, Calendar, Clock, Cpu, FileText, 
  Heart, LineChart, Zap, Search, User, Smile, BarChart, BookOpen,
  Coffee, Compass, Droplet, Flame, GitBranch, Music, Sun, ThumbsUp, 
  Umbrella, Video, Wind, MessageSquare, Pin, Thermometer, Globe
} from 'lucide-react';
import { useCredits } from '@/hooks/use-credits';
import { useToast } from '@/hooks/use-toast';
import { toPersianDigits } from '@/lib/utils';

type ToolCategory = 'سلامت جسمی' | 'سلامت روانی' | 'سازمانی' | 'انگیزشی' | 'تحلیلی';

interface SmartTool {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  category: ToolCategory;
  creditCost: number;
  premium: boolean;
  action: () => void;
  actionLabel: string;
}

export function SmartTools() {
  const { credits, spendCredits, hasEnoughCredits } = useCredits();
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState<SmartTool | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'همه'>('همه');
  const [toolResults, setToolResults] = useState<{[key: string]: any}>({});

  // آیکون‌ها با استایل یکسان
  const renderIcon = (Icon: any) => (
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
      <Icon className="h-5 w-5 text-primary" />
    </div>
  );

  // لیست ابزارهای هوشمند
  const smartTools: SmartTool[] = [
    {
      id: 'physical-assessment',
      name: 'ارزیابی وضعیت جسمانی',
      description: 'تحلیل وضعیت سلامتی شما براساس داده‌های روزانه و ارائه پیشنهادهای بهبود',
      icon: renderIcon(Activity),
      category: 'سلامت جسمی',
      creditCost: 25,
      premium: false,
      action: () => handleRunTool('physical-assessment'),
      actionLabel: 'شروع ارزیابی'
    },
    {
      id: 'stress-analyzer',
      name: 'تحلیلگر استرس',
      description: 'بررسی و تحلیل سطح استرس شما براساس الگوهای رفتاری و فیزیولوژیکی',
      icon: renderIcon(Brain),
      category: 'سلامت روانی',
      creditCost: 30,
      premium: false,
      action: () => handleRunTool('stress-analyzer'),
      actionLabel: 'شروع تحلیل'
    },
    {
      id: 'productivity-optimizer',
      name: 'بهینه‌ساز بهره‌وری',
      description: 'آنالیز الگوهای کاری و ارائه راهکارهای افزایش بهره‌وری فردی و تیمی',
      icon: renderIcon(LineChart),
      category: 'سازمانی',
      creditCost: 40,
      premium: true,
      action: () => handleRunTool('productivity-optimizer'),
      actionLabel: 'دریافت راهکارها'
    },
    {
      id: 'nutrition-planner',
      name: 'برنامه‌ریز تغذیه',
      description: 'طراحی برنامه تغذیه اختصاصی با توجه به اهداف سلامتی و عادات غذایی شما',
      icon: renderIcon(Coffee),
      category: 'سلامت جسمی',
      creditCost: 35,
      premium: false,
      action: () => handleRunTool('nutrition-planner'),
      actionLabel: 'دریافت برنامه'
    },
    {
      id: 'sleep-analyzer',
      name: 'تحلیلگر خواب',
      description: 'تحلیل الگوی خواب و ارائه راهکارهای بهبود کیفیت استراحت',
      icon: renderIcon(Moon),
      category: 'سلامت جسمی',
      creditCost: 30,
      premium: false,
      action: () => handleRunTool('sleep-analyzer'),
      actionLabel: 'تحلیل خواب'
    },
    {
      id: 'organizational-compatibility',
      name: 'سازگاری سازمانی',
      description: 'تحلیل میزان سازگاری شما با فرهنگ سازمانی و تیم کاری',
      icon: renderIcon(Users),
      category: 'سازمانی',
      creditCost: 45,
      premium: true,
      action: () => handleRunTool('organizational-compatibility'),
      actionLabel: 'شروع تحلیل'
    },
    {
      id: 'mental-clarity',
      name: 'تقویت ذهن',
      description: 'مجموعه تمرین‌های تقویت تمرکز، حافظه و چابکی ذهنی',
      icon: renderIcon(Zap),
      category: 'سلامت روانی',
      creditCost: 25,
      premium: false,
      action: () => handleRunTool('mental-clarity'),
      actionLabel: 'مشاهده تمرین‌ها'
    },
    {
      id: 'work-life-balance',
      name: 'تعادل کار و زندگی',
      description: 'تحلیل تعادل بین زندگی شخصی و کاری و ارائه راهکارهای بهبود',
      icon: renderIcon(Scale),
      category: 'سازمانی',
      creditCost: 35,
      premium: false,
      action: () => handleRunTool('work-life-balance'),
      actionLabel: 'دریافت تحلیل'
    },
    {
      id: 'positivity-radar',
      name: 'رادار مثبت‌اندیشی',
      description: 'سنجش میزان مثبت‌اندیشی و نگرش شما به چالش‌های روزمره',
      icon: renderIcon(Smile),
      category: 'انگیزشی',
      creditCost: 20,
      premium: false,
      action: () => handleRunTool('positivity-radar'),
      actionLabel: 'سنجش نگرش'
    },
    {
      id: 'performance-analytics',
      name: 'تحلیل عملکرد',
      description: 'آنالیز جامع عملکرد فردی و مقایسه با اهداف تعیین شده',
      icon: renderIcon(BarChart),
      category: 'تحلیلی',
      creditCost: 50,
      premium: true,
      action: () => handleRunTool('performance-analytics'),
      actionLabel: 'دریافت گزارش'
    },
    {
      id: 'breathing-exercises',
      name: 'تمرین‌های تنفسی',
      description: 'مجموعه تمرین‌های تنفسی برای کاهش استرس و افزایش تمرکز',
      icon: renderIcon(Wind),
      category: 'سلامت روانی',
      creditCost: 15,
      premium: false,
      action: () => handleRunTool('breathing-exercises'),
      actionLabel: 'شروع تمرین'
    },
    {
      id: 'goal-tracker',
      name: 'پیگیری اهداف',
      description: 'تنظیم و پیگیری اهداف شخصی و سازمانی با دیدگاه ساختاریافته',
      icon: renderIcon(Target),
      category: 'انگیزشی',
      creditCost: 30,
      premium: false,
      action: () => handleRunTool('goal-tracker'),
      actionLabel: 'تنظیم اهداف'
    },
    {
      id: 'team-dynamics',
      name: 'پویایی تیمی',
      description: 'تحلیل دینامیک تیمی و ارائه راهکارهای بهبود همکاری گروهی',
      icon: renderIcon(GitBranch),
      category: 'سازمانی',
      creditCost: 45,
      premium: true,
      action: () => handleRunTool('team-dynamics'),
      actionLabel: 'تحلیل تیم'
    },
    {
      id: 'hydration-manager',
      name: 'مدیریت آب‌رسانی',
      description: 'محاسبه نیاز روزانه به آب و یادآوری نوشیدن آب در طول روز',
      icon: renderIcon(Droplet),
      category: 'سلامت جسمی',
      creditCost: 15,
      premium: false,
      action: () => handleRunTool('hydration-manager'),
      actionLabel: 'تنظیم برنامه'
    },
    {
      id: 'career-compass',
      name: 'قطب‌نمای شغلی',
      description: 'تحلیل مسیر شغلی و شناسایی فرصت‌های رشد در سازمان',
      icon: renderIcon(Compass),
      category: 'تحلیلی',
      creditCost: 40,
      premium: true,
      action: () => handleRunTool('career-compass'),
      actionLabel: 'مشاهده مسیر'
    }
  ];

  // آیکون‌های اضافی
  const Moon = (props: any) => (
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );

  const Users = (props: any) => (
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const Scale = (props: any) => (
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
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );

  const Target = (props: any) => (
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );

  // فیلتر ابزارها براساس جستجو و دسته
  const filteredTools = smartTools.filter(tool => {
    const matchesSearch = 
      tool.name.includes(searchTerm) || 
      tool.description.includes(searchTerm);
    
    const matchesCategory = 
      activeCategory === 'همه' || 
      tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // اجرای ابزار هوشمند
  const handleRunTool = (toolId: string) => {
    const tool = smartTools.find(t => t.id === toolId);
    if (!tool) return;
    
    if (!hasEnoughCredits(tool.creditCost)) {
      toast({
        title: "اعتبار ناکافی",
        description: `برای استفاده از این ابزار به ${toPersianDigits(tool.creditCost)} اعتبار نیاز دارید.`,
        variant: "destructive",
      });
      return;
    }
    
    // نمایش وضعیت اجرا
    setToolResults({ ...toolResults, [toolId]: { status: 'running', progress: 0 } });
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setToolResults(prev => ({
        ...prev,
        [toolId]: { ...prev[toolId], progress }
      }));
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // مصرف اعتبار پس از اتمام اجرا
        spendCredits({
          amount: tool.creditCost,
          actionType: 'TOOL_USAGE',
          description: `استفاده از ابزار ${tool.name}`,
          resourceId: Date.now(),
          resourceType: 'SMART_TOOL',
        });
        
        // تولید نتیجه مصنوعی برای ابزار
        const results = generateToolResults(toolId);
        setToolResults(prev => ({
          ...prev,
          [toolId]: { 
            status: 'completed', 
            progress: 100,
            results 
          }
        }));
        
        toast({
          title: "ابزار با موفقیت اجرا شد",
          description: `نتایج ابزار ${tool.name} آماده مشاهده است.`,
          variant: "default",
        });
      }
    }, 100);
  };

  // تولید نتیجه تست برای هر ابزار
  const generateToolResults = (toolId: string) => {
    const results: any = {};
    
    switch(toolId) {
      case 'physical-assessment':
        results.healthScore = Math.floor(Math.random() * 40) + 60; // 60-100
        results.strengths = ['انعطاف‌پذیری خوب', 'استقامت قلبی-تنفسی مناسب'];
        results.weakPoints = ['قدرت عضلانی کمتر از حد مطلوب', 'تعادل نیازمند بهبود'];
        results.recommendations = [
          'افزایش تمرینات قدرتی با وزنه (۳ بار در هفته)',
          'انجام تمرینات تعادلی روزانه (۱۰ دقیقه)',
          'حفظ برنامه هوازی فعلی'
        ];
        break;
        
      case 'stress-analyzer':
        results.stressLevel = Math.floor(Math.random() * 60) + 20; // 20-80
        results.physicalSigns = ['ضربان قلب بالاتر از حد نرمال در ساعات کاری', 'الگوی تنفس نامنظم'];
        results.mentalSigns = ['تمرکز کمتر در ساعات عصر', 'نگرانی درباره مسائل کاری'];
        results.recommendations = [
          'انجام تمرینات تنفس عمیق (۵ دقیقه، ۳ بار در روز)',
          'پیاده‌روی ۱۵ دقیقه‌ای در زمان استراحت ناهار',
          'محدود کردن مصرف کافئین به صبح‌ها'
        ];
        break;
        
      case 'productivity-optimizer':
        results.productivityScore = Math.floor(Math.random() * 30) + 65; // 65-95
        results.peakHours = ['۹ تا ۱۱ صبح', '۴ تا ۵ عصر'];
        results.distractions = ['چک کردن مکرر ایمیل', 'جلسات طولانی بدون دستور کار مشخص'];
        results.recommendations = [
          'تنظیم بلوک‌های زمانی ۹۰ دقیقه‌ای برای کارهای عمیق',
          'محدود کردن چک کردن ایمیل به ۳ بار در روز',
          'استفاده از تکنیک پومودورو برای وظایف کوچک‌تر'
        ];
        break;
        
      case 'nutrition-planner':
        results.calorieNeeds = 2200 + Math.floor(Math.random() * 400);
        results.macroRatio = {protein: '25%', carbs: '50%', fat: '25%'};
        results.mealPlan = {
          breakfast: 'املت سبزیجات + نان سبوس‌دار + چای سبز',
          snack1: 'میوه فصل + مغزهای خام',
          lunch: 'خوراک مرغ و سبزیجات + برنج قهوه‌ای',
          snack2: 'ماست کم‌چرب + عسل + دانه چیا',
          dinner: 'سالاد کینوا با سبزیجات و تخم مرغ'
        };
        break;
        
      // و سایر ابزارها...
      
      default:
        results.score = Math.floor(Math.random() * 50) + 50;
        results.summary = 'نتایج تحلیل نشان می‌دهد که وضعیت فعلی شما در سطح متوسط به بالا قرار دارد.';
        results.recommendations = [
          'پیشنهاد ۱: بهبود عادت‌های روزانه',
          'پیشنهاد ۲: تنظیم اهداف کوتاه‌مدت واقع‌بینانه',
          'پیشنهاد ۳: بررسی پیشرفت به صورت هفتگی'
        ];
    }
    
    return results;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10 pr-3" 
              placeholder="جستجوی ابزار..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-shrink-0">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-1">
            <TabsTrigger value="همه" onClick={() => setActiveCategory('همه')}>همه</TabsTrigger>
            <TabsTrigger value="سلامت جسمی" onClick={() => setActiveCategory('سلامت جسمی')}>جسمی</TabsTrigger>
            <TabsTrigger value="سلامت روانی" onClick={() => setActiveCategory('سلامت روانی')}>روانی</TabsTrigger>
            <TabsTrigger value="سازمانی" onClick={() => setActiveCategory('سازمانی')}>سازمانی</TabsTrigger>
            <TabsTrigger value="انگیزشی" onClick={() => setActiveCategory('انگیزشی')}>انگیزشی</TabsTrigger>
            <TabsTrigger value="تحلیلی" onClick={() => setActiveCategory('تحلیلی')}>تحلیلی</TabsTrigger>
          </TabsList>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <Card 
            key={tool.id} 
            className={`overflow-hidden transition-all hover:shadow-md ${
              tool.premium ? 'border-primary/30' : ''
            }`}
          >
            {tool.premium && (
              <div className="bg-primary text-primary-foreground text-xs text-center py-1">
                ویژه
              </div>
            )}
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {tool.icon}
                  <div>
                    <CardTitle className="text-base">{tool.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {tool.category}
                    </CardDescription>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className="flex gap-1 items-center"
                >
                  <Zap className="h-3 w-3 text-primary" />
                  {toPersianDigits(tool.creditCost)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-muted-foreground">{tool.description}</p>
              
              {toolResults[tool.id] && (
                <div className="mt-3 space-y-2">
                  {toolResults[tool.id].status === 'running' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>در حال تحلیل...</span>
                        <span>{toPersianDigits(toolResults[tool.id].progress)}%</span>
                      </div>
                      <Progress value={toolResults[tool.id].progress} />
                    </div>
                  )}
                  
                  {toolResults[tool.id].status === 'completed' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full">
                          مشاهده نتایج
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {tool.icon}
                            <span>نتایج {tool.name}</span>
                          </DialogTitle>
                          <DialogDescription>
                            تحلیل و پیشنهادهای هوشمند براساس داده‌های شما
                          </DialogDescription>
                        </DialogHeader>
                        
                        <ScrollArea className="h-[60vh] rounded-md border p-4">
                          <ToolResultContent toolId={tool.id} results={toolResults[tool.id].results} />
                        </ScrollArea>
                        
                        <DialogFooter className="flex justify-between items-center">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              // اشتراک‌گذاری (در نسخه واقعی)
                              toast({
                                title: "اشتراک‌گذاری",
                                description: "لینک نتایج کپی شد.",
                              });
                            }}
                          >
                            <Share className="h-4 w-4" />
                            اشتراک‌گذاری
                          </Button>
                          <Button 
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              // دانلود (در نسخه واقعی)
                              toast({
                                title: "دانلود نتایج",
                                description: "فایل PDF نتایج در حال دانلود است.",
                              });
                            }}
                          >
                            <Download className="h-4 w-4" />
                            دانلود PDF
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                size="sm"
                variant={hasEnoughCredits(tool.creditCost) ? "default" : "outline"}
                disabled={toolResults[tool.id]?.status === 'running'}
                onClick={() => tool.action()}
              >
                {toolResults[tool.id]?.status === 'running' ? (
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  toolResults[tool.id]?.status === 'completed' ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Cpu className="h-4 w-4 mr-2" />
                  )
                )}
                {toolResults[tool.id]?.status === 'running' ? 'در حال اجرا...' : 
                 toolResults[tool.id]?.status === 'completed' ? 'اجرا شده' : 
                 tool.actionLabel}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// کامپوننت نمایش نتایج ابزار
function ToolResultContent({ toolId, results }: { toolId: string, results: any }) {
  if (!results) return null;
  
  // نمایش متناسب با نوع ابزار
  switch(toolId) {
    case 'physical-assessment':
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-transparent border-t-primary"
                style={{ 
                  transform: `rotate(${results.healthScore * 3.6}deg)`,
                  transition: 'transform 1s ease-in-out'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold">{toPersianDigits(results.healthScore)}</span>
                <span className="text-xs text-muted-foreground">امتیاز سلامت</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <ThumbsUp className="h-4 w-4 mr-2 text-green-500" />
                نقاط قوت
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {results.strengths.map((item: string, i: number) => (
                  <li key={i} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                نقاط نیازمند بهبود
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {results.weakPoints.map((item: string, i: number) => (
                  <li key={i} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2 text-blue-500" />
                توصیه‌های هوشمند
              </h4>
              <ul className="list-decimal list-inside space-y-1">
                {results.recommendations.map((item: string, i: number) => (
                  <li key={i} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
      
    case 'stress-analyzer':
      return (
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-2">سطح استرس شما</h4>
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-green-600">پایین</div>
                <div className="text-xs text-amber-500">متوسط</div>
                <div className="text-xs text-red-500">بالا</div>
              </div>
              <div className="overflow-hidden h-2 flex rounded bg-slate-200">
                <div
                  style={{ width: `${results.stressLevel}%` }}
                  className={`h-full rounded ${
                    results.stressLevel < 33 ? 'bg-green-500' :
                    results.stressLevel < 66 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                ></div>
              </div>
              <div className="mt-1 text-center">
                <span className="text-sm font-medium">{toPersianDigits(results.stressLevel)}%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-red-400" />
                نشانه‌های جسمی
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {results.physicalSigns.map((item: string, i: number) => (
                  <li key={i} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center">
                <Brain className="h-4 w-4 mr-2 text-purple-400" />
                نشانه‌های ذهنی
              </h4>
              <ul className="list-disc list-inside space-y-1">
                {results.mentalSigns.map((item: string, i: number) => (
                  <li key={i} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center">
              <HeartPulse className="h-4 w-4 mr-2 text-blue-500" />
              توصیه‌های کاهش استرس
            </h4>
            <ul className="list-decimal list-inside space-y-1">
              {results.recommendations.map((item: string, i: number) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      );
      
    case 'nutrition-planner':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">نیاز کالری روزانه</h4>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-center">
                <span className="text-2xl font-bold">{toPersianDigits(results.calorieNeeds)}</span>
                <span className="text-sm text-muted-foreground"> کالری</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">نسبت درشت‌مغذی‌ها</h4>
              <div className="flex h-8 rounded-md overflow-hidden">
                <div 
                  className="bg-blue-500 text-white text-xs flex items-center justify-center"
                  style={{width: results.macroRatio.protein}}
                >
                  پروتئین
                </div>
                <div 
                  className="bg-green-500 text-white text-xs flex items-center justify-center"
                  style={{width: results.macroRatio.carbs}}
                >
                  کربوهیدرات
                </div>
                <div 
                  className="bg-amber-500 text-white text-xs flex items-center justify-center"
                  style={{width: results.macroRatio.fat}}
                >
                  چربی
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">برنامه غذایی پیشنهادی</h4>
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">صبحانه</div>
                <div className="text-sm">{results.mealPlan.breakfast}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">میان‌وعده صبح</div>
                <div className="text-sm">{results.mealPlan.snack1}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">ناهار</div>
                <div className="text-sm">{results.mealPlan.lunch}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">میان‌وعده عصر</div>
                <div className="text-sm">{results.mealPlan.snack2}</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">شام</div>
                <div className="text-sm">{results.mealPlan.dinner}</div>
              </div>
            </div>
          </div>
        </div>
      );
      
    default:
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <span className="text-4xl font-bold">{toPersianDigits(results.score)}%</span>
              </div>
            </div>
            <div className="mt-4 text-sm">{results.summary}</div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">توصیه‌ها</h4>
            <ul className="list-disc list-inside space-y-1">
              {results.recommendations.map((item: string, i: number) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      );
  }
}

// کامپوننت‌های آیکون اضافی
const AlertTriangle = (props: any) => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const Lightbulb = (props: any) => (
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
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const HeartPulse = (props: any) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </svg>
);

const Loader = (props: any) => (
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
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const Share = (props: any) => (
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
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" x2="12" y1="2" y2="15" />
  </svg>
);

const Download = (props: any) => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const Check = (props: any) => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);