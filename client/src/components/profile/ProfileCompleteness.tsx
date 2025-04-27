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
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, ChevronRight, Lightbulb, AlertCircle, BarChart4 } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileCompletenessProps {
  completeness: number;
}

export function ProfileCompleteness({ completeness }: ProfileCompletenessProps) {
  const [showTips, setShowTips] = useState(false);
  
  // محاسبه رنگ پیشرفت بر اساس درصد تکمیل
  const getCompletenessColor = () => {
    if (completeness >= 80) return "bg-green-500";
    if (completeness >= 60) return "bg-tiffany";
    if (completeness >= 40) return "bg-amber-500";
    return "bg-rose-500";
  };
  
  // وضعیت تکمیل
  const getCompletenessStatus = () => {
    if (completeness >= 80) return "عالی";
    if (completeness >= 60) return "خوب";
    if (completeness >= 40) return "نیاز به تکمیل";
    return "ناقص";
  };
  
  // موارد تکمیل نشده
  const incompleteSections = [
    { id: 1, name: "گواهینامه‌ها", status: completeness > 78 },
    { id: 2, name: "پروژه‌های اخیر", status: completeness > 84 },
    { id: 3, name: "افزودن نمونه کار", status: completeness > 90 },
    { id: 4, name: "درخواست توصیه‌نامه", status: completeness > 94 },
  ];
  
  // موارد کامل شده
  const completedSections = [
    { id: 1, name: "اطلاعات شخصی", status: true },
    { id: 2, name: "سوابق شغلی", status: true },
    { id: 3, name: "مهارت‌های اصلی", status: true },
    { id: 4, name: "تحصیلات", status: true },
  ];
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-white dark:bg-slate-900 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base font-semibold flex items-center">
              <BarChart4 className="mr-2 h-5 w-5 text-tiffany" />
              تکمیل پروفایل
            </CardTitle>
            <CardDescription>
              پروفایل حرفه‌ای شما {completeness}% تکمیل شده است
            </CardDescription>
          </div>
          
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-tiffany/10 text-tiffany font-bold">
            {completeness}%
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium">پیشرفت تکمیل</span>
              <span className="text-xs">{getCompletenessStatus()}</span>
            </div>
            <Progress 
              value={completeness} 
              className={`h-2 ${getCompletenessColor()}`} 
            />
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {showTips ? (
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium flex items-center">
                    <Lightbulb className="w-4 h-4 ml-1 text-amber-500" />
                    <span>برای تکمیل پروفایل:</span>
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0"
                    onClick={() => setShowTips(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </Button>
                </div>
                
                <ul className="space-y-1.5">
                  {incompleteSections.map(section => (
                    <li key={section.id} className="flex items-center text-sm">
                      {section.status ? (
                        <BadgeCheck className="w-4 h-4 ml-2 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 ml-2 text-amber-500" />
                      )}
                      <span className={section.status ? "line-through text-slate-400" : ""}>
                        {section.name}
                      </span>
                      
                      {!section.status && (
                        <Button variant="link" size="sm" className="h-5 mr-auto p-0 text-xs text-tiffany">
                          <span>تکمیل</span>
                          <ChevronRight className="w-3 h-3 mr-1" />
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
                
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-medium flex items-center mb-1.5">
                    <BadgeCheck className="w-4 h-4 ml-1 text-green-500" />
                    <span>موارد تکمیل شده:</span>
                  </h3>
                  
                  <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                    {completedSections.map(section => (
                      <li key={section.id} className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <div className="w-1 h-1 bg-green-500 rounded-full ml-1.5"></div>
                        <span className="line-through">{section.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-between p-3 border border-dashed border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900">
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 ml-2 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium">چند قدم تا تکمیل!</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      با تکمیل پروفایل شانس دیده شدن را افزایش دهید
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-tiffany text-xs"
                  onClick={() => setShowTips(true)}
                >
                  مشاهده
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <Button 
          size="sm" 
          variant="default" 
          className="text-xs gap-1"
        >
          <span>تکمیل سریع پروفایل</span>
          <ChevronRight className="h-3 w-3" />
        </Button>
        
        <Button
          size="sm"
          variant="ghost"
          className="text-xs gap-1"
        >
          <BarChart4 className="h-3 w-3 ml-1" />
          <span>آمار بازدید</span>
        </Button>
      </CardFooter>
    </Card>
  );
}