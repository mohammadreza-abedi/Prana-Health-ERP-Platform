import { useState } from 'react';
import { useAuth } from '@/lib/useAuth';
import { useCredits } from '@/hooks/use-credits';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  ActivitySquare, 
  BarChart3, 
  Gauge, 
  HeartPulse, 
  FlaskConical, 
  Music, 
  Clock, 
  AreaChart, 
  Users, 
  BarChart, 
  LucideIcon, 
  Zap, 
  LightbulbIcon,
  PersonStanding,
  Dumbbell,
  Ruler,
  LineChart,
  CalendarDays,
  BookOpen,
  Video,
  PanelLeft,
  PanelTop
} from 'lucide-react';

// تعریف ساختار ابزار هوشمند
interface SmartTool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: 'health' | 'productivity' | 'analysis' | 'education';
  creditCost: number;
  cooldown?: number; // زمان انتظار (به ساعت)
  lastUsed?: Date | null;
  popular?: boolean;
  isPremium?: boolean;
}

// لیست ابزارهای هوشمند
const smartTools: SmartTool[] = [
  {
    id: 'health-assessment',
    title: 'ارزیابی جامع سلامت',
    description: 'تحلیل هوشمند وضعیت سلامت و ارائه گزارش دقیق',
    icon: HeartPulse,
    category: 'health',
    creditCost: 50,
    cooldown: 24,
    popular: true
  },
  {
    id: 'mental-health-analysis',
    title: 'تحلیل سلامت روان',
    description: 'ارزیابی وضعیت سلامت روان و ارائه راهکارهای بهبود',
    icon: Brain,
    category: 'health',
    creditCost: 40,
    cooldown: 72
  },
  {
    id: 'productivity-report',
    title: 'گزارش بهره‌وری',
    description: 'تحلیل الگوهای کاری و ارائه پیشنهادات برای افزایش بهره‌وری',
    icon: BarChart3,
    category: 'productivity',
    creditCost: 30
  },
  {
    id: 'team-performance',
    title: 'تحلیل عملکرد تیمی',
    description: 'بررسی عملکرد تیم‌ها و ارائه راهکارهای بهبود همکاری',
    icon: Users,
    category: 'analysis',
    creditCost: 60,
    isPremium: true
  },
  {
    id: 'sleep-optimization',
    title: 'بهینه‌سازی خواب',
    description: 'تحلیل الگوهای خواب و ارائه برنامه بهبود',
    icon: Clock,
    category: 'health',
    creditCost: 35,
    cooldown: 48
  },
  {
    id: 'stress-management',
    title: 'مدیریت استرس',
    description: 'تحلیل سطح استرس و ارائه تکنیک‌های کاهش آن',
    icon: ActivitySquare,
    category: 'health',
    creditCost: 35
  },
  {
    id: 'nutrition-plan',
    title: 'برنامه تغذیه شخصی',
    description: 'طراحی برنامه غذایی متناسب با شرایط سلامتی و اهداف شما',
    icon: FlaskConical,
    category: 'health',
    creditCost: 50,
    cooldown: 168, // یک هفته
    popular: true
  },
  {
    id: 'personal-coach',
    title: 'مربی شخصی دیجیتال',
    description: 'برنامه تمرینی اختصاصی و پیگیری پیشرفت',
    icon: Dumbbell,
    category: 'health',
    creditCost: 80,
    cooldown: 168, // یک هفته
    isPremium: true
  },
  {
    id: 'focus-music',
    title: 'موسیقی تمرکز',
    description: 'پخش موسیقی مناسب برای افزایش تمرکز در محیط کار',
    icon: Music,
    category: 'productivity',
    creditCost: 10
  },
  {
    id: 'trend-analysis',
    title: 'تحلیل روندها',
    description: 'تحلیل روند شاخص‌های سلامتی در طول زمان',
    icon: LineChart,
    category: 'analysis',
    creditCost: 40
  },
  {
    id: 'body-composition',
    title: 'آنالیز ترکیب بدن',
    description: 'تحلیل و پیگیری ترکیب بدنی و ارائه توصیه‌های بهبود',
    icon: Ruler,
    category: 'health',
    creditCost: 40,
    cooldown: 72
  },
  {
    id: 'wellness-education',
    title: 'آموزش سلامت',
    description: 'محتوای آموزشی سلامت متناسب با نیازهای شما',
    icon: BookOpen,
    category: 'education',
    creditCost: 25
  },
  {
    id: 'workout-videos',
    title: 'ویدیوهای تمرینی',
    description: 'دسترسی به مجموعه ویدیوهای تمرینی متناسب با سطح شما',
    icon: Video,
    category: 'education',
    creditCost: 30,
    cooldown: 24
  },
  {
    id: 'health-calendar',
    title: 'تقویم سلامت',
    description: 'برنامه‌ریزی و یادآوری فعالیت‌های سلامتی',
    icon: CalendarDays,
    category: 'productivity',
    creditCost: 35,
    cooldown: 168
  },
];

export function SmartTools() {
  const { user } = useAuth();
  const { credits, spendCredits } = useCredits();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [showToolDetails, setShowToolDetails] = useState(false);
  const [selectedTool, setSelectedTool] = useState<SmartTool | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  // فیلتر ابزارها براساس دسته‌بندی
  const filteredTools = activeTab === 'all' 
    ? smartTools 
    : smartTools.filter(tool => tool.category === activeTab);

  // استفاده از ابزار هوشمند
  const handleUseTool = async (tool: SmartTool) => {
    if (credits < tool.creditCost) {
      toast({
        title: 'اعتبار ناکافی',
        description: `برای استفاده از این ابزار به ${tool.creditCost} اعتبار نیاز دارید`,
        variant: 'destructive',
      });
      return;
    }
    
    setIsPending(true);
    
    try {
      // ارسال درخواست کسر اعتبار
      await spendCredits({
        amount: tool.creditCost,
        actionType: 'tool_usage',
        description: `استفاده از ابزار: ${tool.title}`,
      });
      
      toast({
        title: 'استفاده از ابزار',
        description: `ابزار "${tool.title}" با موفقیت فعال شد.`,
      });
      
      // شبیه‌سازی ارائه نتیجه
      setTimeout(() => {
        toast({
          title: 'اجرای ابزار',
          description: 'نتایج در پنل کاربری شما قابل مشاهده است.',
        });
        
        setShowToolDetails(false);
      }, 2000);
    } catch (error) {
      toast({
        title: 'خطا در استفاده از ابزار',
        description: 'مشکلی در فرایند استفاده از ابزار رخ داد.',
        variant: 'destructive',
      });
    } finally {
      setIsPending(false);
    }
  };

  // نمایش جزئیات ابزار
  const showToolDetail = (tool: SmartTool) => {
    setSelectedTool(tool);
    setShowToolDetails(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          ابزارهای هوشمند
        </h3>
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
          {smartTools.length} ابزار
        </Badge>
      </div>

      <Card className="overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="p-4 pb-0">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="all" className="text-xs">
                <LightbulbIcon className="h-4 w-4 ml-1" />
                همه
              </TabsTrigger>
              <TabsTrigger value="health" className="text-xs">
                <HeartPulse className="h-4 w-4 ml-1" />
                سلامت
              </TabsTrigger>
              <TabsTrigger value="productivity" className="text-xs">
                <Gauge className="h-4 w-4 ml-1" />
                بهره‌وری
              </TabsTrigger>
              <TabsTrigger value="analysis" className="text-xs">
                <AreaChart className="h-4 w-4 ml-1" />
                تحلیل
              </TabsTrigger>
              <TabsTrigger value="education" className="text-xs">
                <BookOpen className="h-4 w-4 ml-1" />
                آموزش
              </TabsTrigger>
            </TabsList>
          </div>
          
          <ScrollArea className="h-[380px] p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className={`bg-slate-50 dark:bg-slate-800 rounded-lg p-3 transition-all hover:shadow-md cursor-pointer border-2 border-transparent ${tool.isPremium ? 'hover:border-amber-400/50' : 'hover:border-tiffany/50'}`}
                  onClick={() => showToolDetail(tool)}
                >
                  <div className="flex gap-3">
                    <div className={`rounded-full p-2 ${tool.isPremium ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-tiffany/10 text-tiffany'}`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{tool.title}</h4>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs py-0 h-5">
                            {tool.creditCost} <span className="text-[10px] mr-0.5">اعتبار</span>
                          </Badge>
                          {tool.popular && (
                            <Badge className="bg-green-500 text-white border-0 text-[10px] py-0 h-5">
                              محبوب
                            </Badge>
                          )}
                          {tool.isPremium && (
                            <Badge className="bg-amber-500 text-white border-0 text-[10px] py-0 h-5">
                              ویژه
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </Card>

      {/* دیالوگ جزئیات ابزار */}
      {selectedTool && (
        <Dialog open={showToolDetails} onOpenChange={setShowToolDetails}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <selectedTool.icon className={`h-5 w-5 ${selectedTool.isPremium ? 'text-amber-500' : 'text-tiffany'}`} />
                {selectedTool.title}
                {selectedTool.isPremium && (
                  <Badge className="bg-amber-500 text-white border-0 ml-2">
                    ویژه
                  </Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300">
                {selectedTool.description}
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">هزینه استفاده:</span>
                  <span className="font-bold">{selectedTool.creditCost} اعتبار</span>
                </div>
                
                {selectedTool.cooldown && (
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">دوره انتظار:</span>
                    <span className="font-medium">
                      {selectedTool.cooldown >= 24 
                        ? `${Math.floor(selectedTool.cooldown / 24)} روز` 
                        : `${selectedTool.cooldown} ساعت`}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">دسته‌بندی:</span>
                  <Badge variant="outline" className="font-normal">
                    {selectedTool.category === 'health' && 'سلامت'}
                    {selectedTool.category === 'productivity' && 'بهره‌وری'}
                    {selectedTool.category === 'analysis' && 'تحلیل'}
                    {selectedTool.category === 'education' && 'آموزش'}
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">اعتبار شما:</span>
                  <span className={`font-bold ${credits < selectedTool.creditCost ? 'text-red-500' : 'text-green-500'}`}>
                    {credits} اعتبار
                  </span>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">خروجی‌ها و نتایج:</h4>
                <ul className="space-y-1">
                  {selectedTool.category === 'health' && (
                    <>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        گزارش تحلیلی وضعیت سلامت
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        توصیه‌های شخصی‌سازی شده
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        برنامه بهبود حداقل ۳۰ روزه
                      </li>
                    </>
                  )}
                  
                  {selectedTool.category === 'productivity' && (
                    <>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        تحلیل الگوهای کاری
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        شناسایی موانع بهره‌وری
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        راهکارهای شخصی‌سازی شده
                      </li>
                    </>
                  )}
                  
                  {selectedTool.category === 'analysis' && (
                    <>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        گزارش‌های تحلیلی پیشرفته
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        نمودارهای تعاملی روندها
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        پیش‌بینی روندهای آینده
                      </li>
                    </>
                  )}
                  
                  {selectedTool.category === 'education' && (
                    <>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        محتوای آموزشی شخصی‌سازی شده
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        ویدیوها و کتاب‌های الکترونیکی
                      </li>
                      <li className="text-sm flex items-start gap-2">
                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-0.5 text-green-600 dark:text-green-400 mt-1 min-w-[16px] min-h-[16px] flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        برنامه یادگیری متناسب با سطح دانش
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <Separator />
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowToolDetails(false)}>
                  انصراف
                </Button>
                <Button 
                  onClick={() => handleUseTool(selectedTool)}
                  disabled={credits < selectedTool.creditCost || isPending}
                  className={selectedTool.isPremium ? 'bg-amber-500 hover:bg-amber-600' : ''}
                >
                  {isPending ? 'در حال پردازش...' : `استفاده از ابزار (${selectedTool.creditCost} اعتبار)`}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}