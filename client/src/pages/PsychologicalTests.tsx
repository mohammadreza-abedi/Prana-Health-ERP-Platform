import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { useCredits } from "@/hooks/use-credits";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, toPersianDigits } from "@/lib/utils";
import { 
  Award, 
  Brain, 
  CheckCircle2, 
  Clock, 
  Coins, 
  History, 
  LockKeyhole, 
  Sparkles, 
  Star, 
  Timer, 
  ClipboardCheck,
  HeartHandshake,
  UserCircle2,
  ScrollText,
  Share2
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define test types
interface PsychTest {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  creditCost: number;
  questionsCount: number;
  timeRequired: number;
  popularity: number;
  difficulty: "آسان" | "متوسط" | "پیشرفته";
  resultType: string;
  isNew?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  isFree?: boolean;
}

// Test history interface
interface TestHistory {
  id: number;
  testId: number;
  testTitle: string;
  date: string;
  score?: string;
  result?: string;
}

// Create sample psychological tests
const psychologicalTests: PsychTest[] = [
  {
    id: 1,
    title: "تست شخصیت MBTI",
    description: "شناخت 16 تیپ شخصیتی مایرز-بریگز و تعیین تیپ شخصیتی شما",
    icon: <UserCircle2 className="h-10 w-10" />,
    category: "شخصیت",
    creditCost: 25,
    questionsCount: 93,
    timeRequired: 20,
    popularity: 98,
    difficulty: "متوسط",
    resultType: "16 تیپ شخصیتی",
    isPopular: true,
    isRecommended: true
  },
  {
    id: 2,
    title: "تست هوش هیجانی (EQ)",
    description: "سنجش توانایی درک، شناسایی و مدیریت احساسات خود و دیگران",
    icon: <HeartHandshake className="h-10 w-10" />,
    category: "هوش هیجانی",
    creditCost: 20,
    questionsCount: 70,
    timeRequired: 15,
    popularity: 85,
    difficulty: "متوسط",
    resultType: "نمره و تحلیل چند بعدی",
    isPopular: true
  },
  {
    id: 3,
    title: "تست استرس شغلی HSE",
    description: "ارزیابی سطح استرس شغلی و ارائه راهکارهای کاهش استرس در محیط کار",
    icon: <ClipboardCheck className="h-10 w-10" />,
    category: "استرس",
    creditCost: 15,
    questionsCount: 35,
    timeRequired: 10,
    popularity: 78,
    difficulty: "آسان",
    resultType: "سطح استرس و توصیه‌ها",
    isRecommended: true
  },
  {
    id: 4,
    title: "تست سلامت روان GHQ",
    description: "ارزیابی سلامت روان عمومی و غربالگری اختلالات روانی",
    icon: <Brain className="h-10 w-10" />,
    category: "سلامت روان",
    creditCost: 30,
    questionsCount: 28,
    timeRequired: 8,
    popularity: 92,
    difficulty: "متوسط",
    resultType: "نمره و وضعیت سلامت روان",
    isRecommended: true
  },
  {
    id: 5,
    title: "تست ارزش‌های شغلی (SVS)",
    description: "شناسایی ارزش‌های شغلی و ترجیحات کاری برای انتخاب مسیر شغلی مناسب",
    icon: <Award className="h-10 w-10" />,
    category: "شغلی",
    creditCost: 40,
    questionsCount: 54,
    timeRequired: 12,
    popularity: 75,
    difficulty: "پیشرفته",
    resultType: "پروفایل ارزش‌های شغلی",
    isNew: true
  },
  {
    id: 6,
    title: "تست تیپ شخصیتی انیاگرام",
    description: "شناسایی یکی از 9 تیپ شخصیتی انیاگرام و درک انگیزه‌های درونی",
    icon: <ScrollText className="h-10 w-10" />,
    category: "شخصیت",
    creditCost: 35,
    questionsCount: 144,
    timeRequired: 25,
    popularity: 82,
    difficulty: "پیشرفته",
    resultType: "تیپ اصلی و فرعی",
    isNew: true
  },
  {
    id: 7,
    title: "تست مهارت‌های ارتباطی",
    description: "ارزیابی توانایی‌های ارتباطی، گوش دادن فعال و مدیریت تعارض",
    icon: <Share2 className="h-10 w-10" />,
    category: "مهارت‌های نرم",
    creditCost: 0,
    questionsCount: 20,
    timeRequired: 5,
    popularity: 90,
    difficulty: "آسان",
    resultType: "نمره و توصیه‌های ارتباطی",
    isFree: true
  }
];

// Sample user test history
const userTestHistory: TestHistory[] = [
  {
    id: 1,
    testId: 1,
    testTitle: "تست شخصیت MBTI",
    date: "1402/11/15",
    score: "100%",
    result: "INFJ"
  },
  {
    id: 2,
    testId: 3,
    testTitle: "تست استرس شغلی HSE",
    date: "1402/10/28",
    score: "85%",
    result: "استرس متوسط"
  },
  {
    id: 3,
    testId: 4,
    testTitle: "تست سلامت روان GHQ",
    date: "1402/09/10",
    score: "92%",
    result: "سلامت روان خوب"
  }
];

// Component for test category badges
const CategoryBadge = ({ category }: { category: string }) => {
  const getColorByCategory = () => {
    switch (category) {
      case "شخصیت":
        return "bg-violet-500/10 text-violet-600 dark:bg-violet-600/20 dark:text-violet-400";
      case "هوش هیجانی":
        return "bg-pink-500/10 text-pink-600 dark:bg-pink-600/20 dark:text-pink-400";
      case "استرس":
        return "bg-amber-500/10 text-amber-600 dark:bg-amber-600/20 dark:text-amber-400";
      case "سلامت روان":
        return "bg-tiffany/10 text-tiffany dark:bg-tiffany/20 dark:text-tiffany";
      case "شغلی":
        return "bg-blue-500/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400";
      case "مهارت‌های نرم":
        return "bg-green-500/10 text-green-600 dark:bg-green-600/20 dark:text-green-400";
      default:
        return "bg-slate-500/10 text-slate-600 dark:bg-slate-600/20 dark:text-slate-400";
    }
  };

  return (
    <Badge variant="outline" className={cn("font-normal", getColorByCategory())}>
      {category}
    </Badge>
  );
};

// Component for difficulty badges
const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const getColorByDifficulty = () => {
    switch (difficulty) {
      case "آسان":
        return "bg-green-500/10 text-green-600 dark:bg-green-600/20 dark:text-green-400";
      case "متوسط":
        return "bg-amber-500/10 text-amber-600 dark:bg-amber-600/20 dark:text-amber-400";
      case "پیشرفته":
        return "bg-red-500/10 text-red-600 dark:bg-red-600/20 dark:text-red-400";
      default:
        return "bg-slate-500/10 text-slate-600 dark:bg-slate-600/20 dark:text-slate-400";
    }
  };

  return (
    <Badge variant="outline" className={cn("font-normal", getColorByDifficulty())}>
      {difficulty}
    </Badge>
  );
};

export default function PsychologicalTests() {
  const [selectedTest, setSelectedTest] = useState<PsychTest | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  const { user } = useAuth();
  const { credits, isLoadingCredits } = useCredits();
  
  // Function to start a test
  const startTest = (test: PsychTest) => {
    if (!test.isFree && (credits < test.creditCost)) {
      // Show not enough credits message
      alert("اعتبار کافی ندارید. لطفاً اعتبار خود را افزایش دهید.");
      return;
    }
    
    setSelectedTest(test);
    setConfirmDialogOpen(true);
  };
  
  // Function to confirm starting a test
  const confirmStartTest = () => {
    // Here we would deduct credits and navigate to the test
    setConfirmDialogOpen(false);
    
    // For demo purposes, just alert
    alert(`شروع تست ${selectedTest?.title}. این صفحه در نسخه‌های بعدی تکمیل خواهد شد.`);
  };
  
  // Filter tests by category
  const filteredTests = filterCategory 
    ? psychologicalTests.filter(test => test.category === filterCategory)
    : psychologicalTests;
  
  // Filter tests by tab
  const getTabTests = () => {
    switch(activeTab) {
      case "popular":
        return filteredTests.filter(test => test.isPopular);
      case "recommended":
        return filteredTests.filter(test => test.isRecommended);
      case "new":
        return filteredTests.filter(test => test.isNew);
      case "free":
        return filteredTests.filter(test => test.isFree);
      default:
        return filteredTests;
    }
  };
  
  // Get all unique categories
  const categories = Array.from(new Set(psychologicalTests.map(test => test.category)));
  
  return (
    <>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">تست‌های روانشناختی و شخصیت</h1>
        <p className="text-slate-500 dark:text-slate-400">
          با استفاده از تست‌های استاندارد، خود را بهتر بشناسید و به رشد شخصی و شغلی خود کمک کنید
        </p>
      </motion.div>
      
      {/* Credit Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <GlassCard className="p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center">
              <Coins className="h-6 w-6 text-tiffany" />
            </div>
            <div className="mr-4">
              <h3 className="text-sm text-slate-500 dark:text-slate-400">اعتبار شما</h3>
              <p className="text-2xl font-bold">{isLoadingCredits ? "..." : toPersianDigits(credits)}</p>
            </div>
            <Button className="mr-auto" size="sm">
              افزایش اعتبار
            </Button>
          </div>
        </GlassCard>
        
        <GlassCard className="p-5">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-navy/10 dark:bg-navy/20 flex items-center justify-center">
              <History className="h-6 w-6 text-navy" />
            </div>
            <div className="mr-4">
              <h3 className="text-sm text-slate-500 dark:text-slate-400">سوابق آزمون‌ها</h3>
              <p className="text-2xl font-bold">{toPersianDigits(userTestHistory.length)}</p>
            </div>
            <Button variant="outline" className="mr-auto" size="sm">
              مشاهده سوابق
            </Button>
          </div>
        </GlassCard>
      </div>
      
      {/* Tests Tabs and Filters */}
      <div className="mb-8">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
              <TabsTrigger value="all" className="text-sm">
                همه تست‌ها
              </TabsTrigger>
              <TabsTrigger value="recommended" className="text-sm">
                توصیه شده
              </TabsTrigger>
              <TabsTrigger value="popular" className="text-sm">
                پرطرفدار
              </TabsTrigger>
              <TabsTrigger value="new" className="text-sm">
                جدید
              </TabsTrigger>
              <TabsTrigger value="free" className="text-sm">
                رایگان
              </TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-1 space-x-reverse overflow-x-auto scrollbar-thin">
              <Button 
                variant={filterCategory === null ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilterCategory(null)}
              >
                همه
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Test Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getTabTests().map((test, index) => (
              <motion.div 
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GlassCard className="h-full flex flex-col relative overflow-hidden">
                  {/* Badges for New, Popular, etc. */}
                  <div className="absolute top-0 left-0 p-2 flex flex-col space-y-1">
                    {test.isNew && (
                      <Badge className="bg-blue-500 text-white">جدید</Badge>
                    )}
                    {test.isPopular && (
                      <Badge className="bg-rose-500 text-white">پرطرفدار</Badge>
                    )}
                    {test.isFree && (
                      <Badge className="bg-green-500 text-white">رایگان</Badge>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-tiffany">
                        {test.icon}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm mr-1">{test.popularity}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{test.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      <CategoryBadge category={test.category} />
                      <DifficultyBadge difficulty={test.difficulty} />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg">
                        <Clock className="h-5 w-5 text-slate-500 mb-1" />
                        <span className="text-xs text-center">{test.timeRequired} دقیقه</span>
                      </div>
                      <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-slate-500 mb-1" />
                        <span className="text-xs text-center">{test.questionsCount} سوال</span>
                      </div>
                      <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg">
                        <Sparkles className="h-5 w-5 text-slate-500 mb-1" />
                        <span className="text-xs text-center">{test.resultType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto p-6 pt-0 flex items-center justify-between">
                    <div className="flex items-center">
                      <Coins className="h-5 w-5 text-yellow-500 ml-1" />
                      <span className={`${test.isFree ? 'line-through text-slate-400' : 'font-bold'}`}>
                        {toPersianDigits(test.creditCost)}
                      </span>
                      {test.isFree && (
                        <span className="text-green-500 font-bold mr-2">رایگان</span>
                      )}
                    </div>
                    <Button 
                      className={cn((!test.isFree && credits < test.creditCost) ? "opacity-50" : "")}
                      onClick={() => startTest(test)}
                      disabled={!test.isFree && credits < test.creditCost}
                    >
                      {(!test.isFree && credits < test.creditCost) ? (
                        <LockKeyhole className="h-4 w-4 ml-2" />
                      ) : (
                        <Timer className="h-4 w-4 ml-2" />
                      )}
                      شروع تست
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </Tabs>
      </div>
      
      {/* Recent Test History */}
      <GlassCard className="p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center">
          <History className="h-5 w-5 ml-2 text-tiffany" />
          تاریخچه آزمون‌های اخیر
        </h2>
        
        {userTestHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userTestHistory.map((history, index) => (
              <motion.div
                key={history.id}
                className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">{history.testTitle}</h3>
                  <Badge variant="outline">{history.date}</Badge>
                </div>
                {history.result && (
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-slate-500 dark:text-slate-400">نتیجه:</span>
                    <span className="font-medium">{history.result}</span>
                  </div>
                )}
                {history.score && (
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-slate-500 dark:text-slate-400">امتیاز:</span>
                    <span className="font-medium text-tiffany">{history.score}</span>
                  </div>
                )}
                <div className="mt-3">
                  <Button variant="outline" size="sm" className="w-full">
                    مشاهده جزئیات
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <Brain className="h-16 w-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <p>تاکنون هیچ آزمونی انجام نداده‌اید.</p>
            <p className="mt-2 text-sm">با شرکت در آزمون‌ها، خود را بهتر بشناسید و به رشد شخصی و شغلی خود کمک کنید.</p>
          </div>
        )}
      </GlassCard>
      
      {/* Confirm Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>شروع آزمون {selectedTest?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {!selectedTest?.isFree && (
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-800 dark:text-amber-300">
                  <div className="flex items-center">
                    <Coins className="h-5 w-5 ml-2" />
                    <span>از اعتبار شما <span className="font-bold">{selectedTest?.creditCost}</span> واحد کسر خواهد شد.</span>
                  </div>
                </div>
              )}
              
              <p>این آزمون شامل {selectedTest?.questionsCount} سوال است و حدود {selectedTest?.timeRequired} دقیقه زمان نیاز دارد.</p>
              <p className="mt-2">آیا مایل به شروع آزمون هستید؟</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStartTest}>
              <Timer className="h-4 w-4 ml-1" />
              شروع آزمون
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}