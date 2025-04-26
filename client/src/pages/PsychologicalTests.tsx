import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BrainCircuit, 
  Sparkles, 
  PieChart, 
  Heart, 
  LineChart, 
  Lightbulb, 
  HandHeart, 
  Scale, 
  Gem, 
  Award,
  Check,
  ChevronRight,
  Search,
  Tag,
  Filter,
  ArrowRight,
  BarChart3,
  BadgePercent,
  CalendarCheck,
  Timer
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// تست‌های روانشناسی
const psychTests = [
  {
    id: 1,
    title: "ارزیابی هوش هیجانی (EQ)",
    description: "سنجش توانایی شما در درک احساسات خود و دیگران و مدیریت آنها",
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    category: "شخصیت",
    color: "rose",
    questions: 25,
    timeMinutes: 15,
    popularity: 95,
    featured: true
  },
  {
    id: 2,
    title: "تست شخصیت شناسی MBTI",
    description: "شناخت تیپ شخصیتی شما از میان 16 تیپ شخصیتی مختلف",
    icon: <BrainCircuit className="w-6 h-6 text-purple-500" />,
    category: "شخصیت",
    color: "purple",
    questions: 60,
    timeMinutes: 25,
    popularity: 98,
    featured: true
  },
  {
    id: 3,
    title: "استرس شغلی و فرسودگی",
    description: "ارزیابی میزان استرس و فرسودگی شغلی شما",
    icon: <LineChart className="w-6 h-6 text-amber-500" />,
    category: "سلامت روان",
    color: "amber",
    questions: 35,
    timeMinutes: 20,
    popularity: 90,
    featured: false
  },
  {
    id: 4,
    title: "ارزیابی سبک کار تیمی",
    description: "شناسایی نقش‌ها و ویژگی‌های شما در کار تیمی",
    icon: <HandHeart className="w-6 h-6 text-tiffany" />,
    category: "شغلی",
    color: "tiffany",
    questions: 30,
    timeMinutes: 18,
    popularity: 85,
    featured: false
  },
  {
    id: 5,
    title: "هوش چندگانه گاردنر",
    description: "شناسایی انواع هوش‌های برجسته شما از میان 8 نوع هوش",
    icon: <Sparkles className="w-6 h-6 text-blue-500" />,
    category: "هوش و استعداد",
    color: "blue",
    questions: 40,
    timeMinutes: 22,
    popularity: 92,
    featured: true
  },
  {
    id: 6,
    title: "سبک‌های یادگیری VAK",
    description: "شناسایی سبک غالب یادگیری شما (دیداری، شنیداری، حرکتی)",
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    category: "هوش و استعداد",
    color: "yellow",
    questions: 24,
    timeMinutes: 15,
    popularity: 88,
    featured: false
  },
  {
    id: 7,
    title: "ارزش‌های شغلی",
    description: "شناسایی ارزش‌های مهم برای رضایت شغلی شما",
    icon: <Gem className="w-6 h-6 text-indigo-500" />,
    category: "شغلی",
    color: "indigo",
    questions: 32,
    timeMinutes: 20,
    popularity: 86,
    featured: false
  },
  {
    id: 8,
    title: "ارزیابی تاب‌آوری",
    description: "سنجش توانایی شما در مقابله با مشکلات و بازگشت به حالت عادی",
    icon: <Scale className="w-6 h-6 text-emerald-500" />,
    category: "سلامت روان",
    color: "emerald",
    questions: 28,
    timeMinutes: 18,
    popularity: 89,
    featured: false
  },
  {
    id: 9,
    title: "تیپ شخصیتی انیاگرام",
    description: "شناخت تیپ شخصیتی شما از میان 9 تیپ انیاگرام",
    icon: <PieChart className="w-6 h-6 text-navy" />,
    category: "شخصیت",
    color: "navy",
    questions: 45,
    timeMinutes: 25,
    popularity: 94,
    featured: true
  },
  {
    id: 10,
    title: "ارزیابی خلاقیت",
    description: "سنجش توانایی‌های خلاق و تفکر واگرای شما",
    icon: <Award className="w-6 h-6 text-aqua" />,
    category: "هوش و استعداد",
    color: "aqua",
    questions: 30,
    timeMinutes: 20,
    popularity: 87,
    featured: false
  }
];

// آزمون‌های جدید و به‌روز
const newTests = [
  {
    id: 11,
    title: "نیمرخ استرس دیجیتال",
    description: "ارزیابی تأثیر تکنولوژی و حضور آنلاین بر سلامت روان شما",
    icon: <BarChart3 className="w-6 h-6 text-cyan-500" />,
    category: "دیجیتال ولنس",
    color: "cyan",
    questions: 22,
    timeMinutes: 12,
    popularity: 84,
    featured: false
  },
  {
    id: 12,
    title: "ارزیابی فرهنگ سازمانی",
    description: "سنجش ادراک شما از فرهنگ سازمانی و هماهنگی ارزش‌های شما با آن",
    icon: <BadgePercent className="w-6 h-6 text-fuchsia-500" />,
    category: "سازمانی",
    color: "fuchsia",
    questions: 38,
    timeMinutes: 22,
    popularity: 85,
    featured: false
  },
  {
    id: 13,
    title: "سنجش سبک زندگی سالم",
    description: "ارزیابی جامع عادت‌های زندگی و تأثیر آنها بر تندرستی شما",
    icon: <CalendarCheck className="w-6 h-6 text-lime-600" />,
    category: "سلامت",
    color: "lime",
    questions: 42,
    timeMinutes: 24,
    popularity: 91,
    featured: true
  }
];

// ترکیب همه تست‌ها
const allTests = [...psychTests, ...newTests];

// کامپوننت کارت تست
const TestCard = ({ test, onSelect }: { test: typeof psychTests[0], onSelect: () => void }) => {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'rose': 'bg-rose-500',
      'purple': 'bg-purple-500',
      'amber': 'bg-amber-500',
      'tiffany': 'bg-tiffany',
      'blue': 'bg-blue-500',
      'yellow': 'bg-yellow-500',
      'indigo': 'bg-indigo-500',
      'emerald': 'bg-emerald-500',
      'navy': 'bg-navy',
      'aqua': 'bg-aqua',
      'cyan': 'bg-cyan-500',
      'fuchsia': 'bg-fuchsia-500',
      'lime': 'bg-lime-600'
    };
    return colorMap[color] || 'bg-slate-500';
  };

  const getBgClass = (color: string) => {
    const bgMap: Record<string, string> = {
      'rose': 'bg-rose-50 dark:bg-rose-500/10',
      'purple': 'bg-purple-50 dark:bg-purple-500/10',
      'amber': 'bg-amber-50 dark:bg-amber-500/10',
      'tiffany': 'bg-tiffany/10',
      'blue': 'bg-blue-50 dark:bg-blue-500/10',
      'yellow': 'bg-yellow-50 dark:bg-yellow-500/10',
      'indigo': 'bg-indigo-50 dark:bg-indigo-500/10',
      'emerald': 'bg-emerald-50 dark:bg-emerald-500/10',
      'navy': 'bg-navy/10',
      'aqua': 'bg-aqua/10',
      'cyan': 'bg-cyan-50 dark:bg-cyan-500/10',
      'fuchsia': 'bg-fuchsia-50 dark:bg-fuchsia-500/10',
      'lime': 'bg-lime-50 dark:bg-lime-600/10'
    };
    return bgMap[color] || 'bg-slate-50 dark:bg-slate-500/10';
  };

  const getBorderClass = (color: string) => {
    const borderMap: Record<string, string> = {
      'rose': 'border-rose-200 dark:border-rose-500/20',
      'purple': 'border-purple-200 dark:border-purple-500/20',
      'amber': 'border-amber-200 dark:border-amber-500/20',
      'tiffany': 'border-tiffany/20',
      'blue': 'border-blue-200 dark:border-blue-500/20',
      'yellow': 'border-yellow-200 dark:border-yellow-500/20',
      'indigo': 'border-indigo-200 dark:border-indigo-500/20',
      'emerald': 'border-emerald-200 dark:border-emerald-500/20',
      'navy': 'border-navy/20',
      'aqua': 'border-aqua/20',
      'cyan': 'border-cyan-200 dark:border-cyan-500/20',
      'fuchsia': 'border-fuchsia-200 dark:border-fuchsia-500/20',
      'lime': 'border-lime-200 dark:border-lime-600/20'
    };
    return borderMap[color] || 'border-slate-200 dark:border-slate-700';
  };

  const getTextClass = (color: string) => {
    const textMap: Record<string, string> = {
      'rose': 'text-rose-600 dark:text-rose-400',
      'purple': 'text-purple-600 dark:text-purple-400',
      'amber': 'text-amber-600 dark:text-amber-400',
      'tiffany': 'text-tiffany dark:text-tiffany-light',
      'blue': 'text-blue-600 dark:text-blue-400',
      'yellow': 'text-yellow-600 dark:text-yellow-400',
      'indigo': 'text-indigo-600 dark:text-indigo-400',
      'emerald': 'text-emerald-600 dark:text-emerald-400',
      'navy': 'text-navy dark:text-navy-light',
      'aqua': 'text-aqua dark:text-aqua-light',
      'cyan': 'text-cyan-600 dark:text-cyan-400',
      'fuchsia': 'text-fuchsia-600 dark:text-fuchsia-400',
      'lime': 'text-lime-600 dark:text-lime-400'
    };
    return textMap[color] || 'text-slate-600 dark:text-slate-400';
  };

  return (
    <motion.div
      className={`neon-card ${getBgClass(test.color)} border ${getBorderClass(test.color)} rounded-xl overflow-hidden relative cursor-pointer`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={onSelect}
    >
      {test.featured && (
        <div className="absolute top-3 left-3">
          <Badge variant="default" className={`${getColorClass(test.color)} text-white text-xs`}>
            محبوب
          </Badge>
        </div>
      )}
      
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm ${getTextClass(test.color)}`}>
            {test.icon}
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold">{test.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
              {test.description}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">سوالات</div>
            <div className="font-medium text-sm flex items-center mt-1">
              <Tag className="w-3 h-3 ml-1" />
              {test.questions}
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">زمان</div>
            <div className="font-medium text-sm flex items-center mt-1">
              <Timer className="w-3 h-3 ml-1" />
              {test.timeMinutes} دقیقه
            </div>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400">محبوبیت</div>
            <div className="font-medium text-sm flex items-center mt-1">
              <div className="h-1.5 w-12 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-0.5">
                <div 
                  className={`h-full ${getColorClass(test.color)}`} 
                  style={{ width: `${test.popularity}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`px-5 py-3 border-t ${getBorderClass(test.color)} flex justify-between items-center`}>
        <Badge variant="outline" className="text-xs font-normal">
          {test.category}
        </Badge>
        
        <div className={`text-xs ${getTextClass(test.color)} font-medium flex items-center`}>
          شروع آزمون
          <ChevronRight className="w-4 h-4 mr-1" />
        </div>
      </div>
    </motion.div>
  );
};

// کامپوننت اصلی صفحه تست‌های روانشناسی
export default function PsychologicalTests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTest, setSelectedTest] = useState<typeof psychTests[0] | null>(null);
  const [showTestDetails, setShowTestDetails] = useState(false);
  
  // فیلتر کردن تست‌ها بر اساس جستجو و دسته‌بندی
  const filteredTests = allTests.filter(test => {
    const matchesSearch = test.title.includes(searchQuery) || 
                        test.description.includes(searchQuery);
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // دسته‌بندی‌های منحصر به فرد
  const uniqueCategories = Array.from(new Set(allTests.map(test => test.category)));
  
  return (
    <>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-2">آزمون‌های روانشناسی و ارزیابی سلامت</h1>
        <p className="text-slate-500 dark:text-slate-400">
          از تست‌های استاندارد روانشناسی و ارزیابی سلامت برای شناخت بهتر خود و بهبود سلامت روان استفاده کنید
        </p>
      </motion.div>
      
      {/* جستجو و فیلتر */}
      <div className="mb-8 glass p-4 rounded-xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
            <Input 
              placeholder="جستجوی آزمون..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="whitespace-nowrap"
              size="sm"
            >
              <Filter className="h-4 w-4 ml-2" />
              همه دسته‌بندی‌ها
            </Button>
            
            {uniqueCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* آزمون‌های محبوب */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">آزمون‌های محبوب</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredTests
            .filter(test => test.featured)
            .map(test => (
              <TestCard 
                key={test.id} 
                test={test} 
                onSelect={() => {
                  setSelectedTest(test);
                  setShowTestDetails(true);
                }}
              />
            ))}
        </div>
        
        {/* همه آزمون‌ها */}
        <h2 className="text-xl font-bold mb-4">همه آزمون‌ها</h2>
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full lg:w-1/2 h-auto flex flex-wrap">
            <TabsTrigger value="all" className="flex-1">همه آزمون‌ها</TabsTrigger>
            <TabsTrigger value="personality" className="flex-1">شخصیت شناسی</TabsTrigger>
            <TabsTrigger value="mental" className="flex-1">سلامت روان</TabsTrigger>
            <TabsTrigger value="professional" className="flex-1">شغلی و حرفه‌ای</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests
                .filter(test => !test.featured)
                .map(test => (
                  <TestCard 
                    key={test.id} 
                    test={test} 
                    onSelect={() => {
                      setSelectedTest(test);
                      setShowTestDetails(true);
                    }}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="personality" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests
                .filter(test => test.category === "شخصیت")
                .map(test => (
                  <TestCard 
                    key={test.id} 
                    test={test} 
                    onSelect={() => {
                      setSelectedTest(test);
                      setShowTestDetails(true);
                    }}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="mental" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests
                .filter(test => test.category === "سلامت روان")
                .map(test => (
                  <TestCard 
                    key={test.id} 
                    test={test} 
                    onSelect={() => {
                      setSelectedTest(test);
                      setShowTestDetails(true);
                    }}
                  />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="professional" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests
                .filter(test => test.category === "شغلی")
                .map(test => (
                  <TestCard 
                    key={test.id} 
                    test={test} 
                    onSelect={() => {
                      setSelectedTest(test);
                      setShowTestDetails(true);
                    }}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
      
      {/* دیالوگ مشاهده جزئیات آزمون */}
      <Dialog open={showTestDetails} onOpenChange={setShowTestDetails}>
        <DialogContent className="max-w-3xl">
          {selectedTest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-xl">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedTest.color === 'tiffany' ? 'bg-tiffany/10 text-tiffany' : `bg-${selectedTest.color}-100 text-${selectedTest.color}-500 dark:bg-${selectedTest.color}-500/10`}`}>
                    {selectedTest.icon}
                  </div>
                  {selectedTest.title}
                  {selectedTest.featured && (
                    <Badge className="bg-tiffany">محبوب</Badge>
                  )}
                </DialogTitle>
                <DialogDescription className="text-base mt-2">
                  {selectedTest.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-500">تعداد سوالات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedTest.questions}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-500">زمان تقریبی</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedTest.timeMinutes} دقیقه</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-500">دسته‌بندی</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{selectedTest.category}</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h3 className="font-bold mb-2">درباره این آزمون</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  این آزمون با استفاده از پرسشنامه‌های استاندارد طراحی شده و به شما کمک می‌کند تا {selectedTest.title.toLowerCase()} خود را ارزیابی کنید. 
                  نتایج این آزمون به صورت گرافیکی و با توضیحات کامل در اختیار شما قرار می‌گیرد و می‌توانید از آن برای بهبود 
                  عملکرد خود استفاده کنید.
                </p>
                
                <h3 className="font-bold mt-4 mb-2">چگونه کار می‌کند؟</h3>
                <ol className="text-sm text-slate-600 dark:text-slate-300 space-y-1 pr-5 list-decimal">
                  <li>به تمام سوالات با صداقت کامل پاسخ دهید</li>
                  <li>سیستم به صورت خودکار پاسخ‌های شما را تحلیل می‌کند</li>
                  <li>نتایج به همراه نمودار و توضیحات نمایش داده می‌شود</li>
                  <li>می‌توانید نتایج را ذخیره کرده و با دیگران به اشتراک بگذارید</li>
                </ol>
              </div>
              
              <div className="flex justify-between mt-4">
                <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                  <Badge variant="outline" className="mr-2">
                    محبوبیت
                  </Badge>
                  <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mr-2">
                    <div 
                      className={`h-full ${selectedTest.color === 'tiffany' ? 'bg-tiffany' : `bg-${selectedTest.color}-500`}`} 
                      style={{ width: `${selectedTest.popularity}%` }}
                    />
                  </div>
                  {selectedTest.popularity}%
                </div>
                
                <Badge variant="outline">{selectedTest.questions} سوال</Badge>
              </div>
              
              <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowTestDetails(false)}>
                  بازگشت
                </Button>
                
                <Button className="flex items-center">
                  شروع آزمون
                  <ArrowRight className="h-4 w-4 mr-2" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}