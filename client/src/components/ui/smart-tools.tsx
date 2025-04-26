import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCredits } from '@/hooks/use-credits';
import { useToast } from '@/hooks/use-toast';
import {
  Activity,
  Brain,
  Droplets,
  Heart,
  HeartPulse,
  Moon,
  Utensils,
  Dumbbell,
  Timer,
  ListChecks,
  RefreshCw,
  ArrowRight,
  Play,
  Zap,
  Lightbulb,
  Apple,
  Watch,
  BarChart3,
} from 'lucide-react';

export function SmartTools() {
  const { credits } = useCredits();
  const { toast } = useToast();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // ابزار های هوشمند پرانا
  const smartTools = [
    {
      id: 'health-metrics',
      name: 'ثبت معیارهای سلامتی',
      description: 'ثبت و پیگیری معیارهای سلامتی روزانه',
      icon: <HeartPulse className="h-6 w-6 text-red-500" />,
      cost: 2,
      category: 'health',
    },
    {
      id: 'water-reminder',
      name: 'یادآور آب',
      description: 'برنامه‌ریزی و یادآوری نوشیدن آب در طول روز',
      icon: <Droplets className="h-6 w-6 text-blue-500" />,
      cost: 1,
      category: 'health',
    },
    {
      id: 'sleep-tracker',
      name: 'ردیاب خواب',
      description: 'تحلیل کیفیت و مدت زمان خواب',
      icon: <Moon className="h-6 w-6 text-indigo-500" />,
      cost: 3,
      category: 'health',
    },
    {
      id: 'nutrition-analyzer',
      name: 'تحلیلگر تغذیه',
      description: 'تحلیل و پیشنهاد رژیم غذایی متناسب',
      icon: <Utensils className="h-6 w-6 text-green-500" />,
      cost: 5,
      category: 'health',
    },
    {
      id: 'workout-assistant',
      name: 'دستیار تمرین',
      description: 'برنامه‌ریزی و راهنمایی تمرینات ورزشی',
      icon: <Dumbbell className="h-6 w-6 text-orange-500" />,
      cost: 4,
      category: 'fitness',
    },
    {
      id: 'mental-wellness',
      name: 'سلامت روان',
      description: 'تکنیک‌های مدیتیشن و کاهش استرس',
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      cost: 3,
      category: 'mental',
    },
    {
      id: 'focus-timer',
      name: 'تایمر تمرکز',
      description: 'افزایش بهره‌وری با تکنیک پومودورو',
      icon: <Timer className="h-6 w-6 text-cyan-500" />,
      cost: 2,
      category: 'productivity',
    },
    {
      id: 'habit-tracker',
      name: 'ردیاب عادت‌ها',
      description: 'ایجاد و پیگیری عادت‌های سالم',
      icon: <ListChecks className="h-6 w-6 text-teal-500" />,
      cost: 3,
      category: 'productivity',
    },
    {
      id: 'smart-watch-sync',
      name: 'همگام‌سازی ساعت هوشمند',
      description: 'همگام‌سازی داده‌های سلامتی از ساعت هوشمند',
      icon: <Watch className="h-6 w-6 text-slate-500" />,
      cost: 5,
      category: 'integration',
    },
    {
      id: 'health-ai',
      name: 'هوش مصنوعی سلامت',
      description: 'تحلیل هوشمند داده‌های سلامتی و ارائه پیشنهادات شخصی‌سازی شده',
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
      cost: 10,
      category: 'ai',
    },
  ];

  // دسته بندی ابزارها
  const categories = [
    { id: 'all', name: 'همه', icon: <Zap className="h-4 w-4" /> },
    { id: 'health', name: 'سلامت عمومی', icon: <Heart className="h-4 w-4" /> },
    { id: 'fitness', name: 'تناسب اندام', icon: <Activity className="h-4 w-4" /> },
    { id: 'mental', name: 'سلامت روان', icon: <Brain className="h-4 w-4" /> },
    { id: 'productivity', name: 'بهره‌وری', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'ai', name: 'هوش مصنوعی', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'integration', name: 'اتصال دستگاه‌ها', icon: <RefreshCw className="h-4 w-4" /> },
  ];

  // فیلتر ابزارها براساس دسته بندی
  const filterTools = (category: string) => {
    if (category === 'all') return smartTools;
    return smartTools.filter(tool => tool.category === category);
  };

  // استفاده از ابزار
  const handleUseTool = (toolId: string) => {
    const tool = smartTools.find(t => t.id === toolId);
    if (!tool) return;

    if (credits < tool.cost) {
      toast({
        title: 'اعتبار ناکافی',
        description: `برای استفاده از این ابزار به ${tool.cost} اعتبار نیاز دارید.`,
        variant: 'destructive',
      });
      return;
    }

    // در اینجا منطق استفاده از ابزار و کم کردن اعتبار اجرا می‌شود
    // ...

    toast({
      title: 'ابزار فعال شد',
      description: `ابزار ${tool.name} با موفقیت فعال شد و ${tool.cost} اعتبار از حساب شما کسر شد.`,
    });
  };

  // نمایش جزئیات ابزار انتخاب شده
  const renderToolDetails = () => {
    if (!selectedTool) return null;
    
    const tool = smartTools.find(t => t.id === selectedTool);
    if (!tool) return null;

    return (
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                {tool.icon}
              </div>
              <div>
                <CardTitle>{tool.name}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {tool.cost} اعتبار
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {tool.id === 'health-metrics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                  <Input id="weight" type="number" min="30" max="200" placeholder="75" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">قد (سانتی‌متر)</Label>
                  <Input id="height" type="number" min="100" max="220" placeholder="175" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">فشار خون (mmHg)</Label>
                  <Input id="bloodPressure" placeholder="120/80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heartRate">ضربان قلب (bpm)</Label>
                  <Input id="heartRate" type="number" min="40" max="200" placeholder="75" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sleepHours">ساعات خواب</Label>
                <Input id="sleepHours" type="number" min="0" max="24" placeholder="8" />
              </div>
            </div>
          )}

          {tool.id === 'water-reminder' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>هدف روزانه</Label>
                <div className="flex items-center gap-4">
                  <Input type="number" min="1" max="10" placeholder="2.5" />
                  <span className="text-sm text-muted-foreground">لیتر</span>
                </div>
              </div>
              <div>
                <Label className="mb-2 block">پیشرفت امروز</Label>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">0.8 لیتر</span>
                  <span className="text-sm font-medium">2.5 لیتر</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <Droplets className="h-8 w-8 mb-1" />
                  <span>250 میلی‌لیتر</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Droplets className="h-8 w-8 mb-1" />
                  <span>500 میلی‌لیتر</span>
                </Button>
              </div>
            </div>
          )}

          {tool.id === 'habit-tracker' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-card p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Apple className="h-4 w-4 text-green-600" />
                  </div>
                  <span>خوردن میوه</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">5 روز پیاپی</Badge>
                  <Button size="sm" variant="ghost">✓</Button>
                </div>
              </div>
              <div className="flex justify-between items-center bg-card p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Droplets className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>نوشیدن 2 لیتر آب</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">12 روز پیاپی</Badge>
                  <Button size="sm" variant="ghost">✓</Button>
                </div>
              </div>
              <div className="flex justify-between items-center bg-card p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-purple-600" />
                  </div>
                  <span>10 دقیقه مدیتیشن</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">3 روز پیاپی</Badge>
                  <Button size="sm" variant="ghost">✓</Button>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                افزودن عادت جدید
              </Button>
            </div>
          )}

          {![
            'health-metrics',
            'water-reminder',
            'habit-tracker',
          ].includes(tool.id) && (
            <div className="py-8 text-center">
              <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 inline-block mb-4">
                {tool.icon}
              </div>
              <p className="text-muted-foreground mb-4">
                برای شروع استفاده از این ابزار، دکمه زیر را فشار دهید. {tool.cost} اعتبار از حساب شما کسر خواهد شد.
              </p>
              <Button>
                <Play className="h-4 w-4 ml-2" />
                شروع استفاده
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-between border-t pt-4">
          <Button variant="ghost" onClick={() => setSelectedTool(null)}>
            بازگشت به لیست ابزارها
          </Button>
          <Button onClick={() => handleUseTool(tool.id)} disabled={credits < tool.cost}>
            {credits < tool.cost ? 'اعتبار ناکافی' : 'استفاده از ابزار'}
            <ArrowRight className="h-4 w-4 mr-2" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {selectedTool ? (
        renderToolDetails()
      ) : (
        <>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 flex flex-nowrap overflow-x-auto p-1">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1 text-xs">
                  {category.icon}
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map(category => (
              <TabsContent key={category.id} value={category.id} className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterTools(category.id).map(tool => (
                    <Card 
                      key={tool.id} 
                      className="hover:border-primary/50 transition-colors cursor-pointer" 
                      onClick={() => setSelectedTool(tool.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800">
                            {tool.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base">{tool.name}</CardTitle>
                            <CardDescription className="text-xs line-clamp-1">
                              {tool.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardFooter className="pt-0 pb-3 flex justify-between items-center">
                        <Badge 
                          variant="outline" 
                          className={`${credits >= tool.cost ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}
                        >
                          {tool.cost} اعتبار
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="rounded-lg border p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
            <div className="flex gap-2">
              <Lightbulb className="h-5 w-5 mt-0.5" />
              <div className="text-sm">
                <span className="font-semibold block mb-1">راهنما:</span>
                <p>هر ابزار نیاز به اعتبار مشخصی برای استفاده دارد. اعتبار فعلی شما: <strong>{credits}</strong></p>
                <p className="mt-1">برای افزایش اعتبار می‌توانید از بخش کیف پول اقدام به خرید یا تبدیل امتیاز XP به اعتبار کنید.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}