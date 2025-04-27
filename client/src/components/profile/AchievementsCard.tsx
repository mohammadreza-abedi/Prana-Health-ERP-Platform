import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Sparkles, Plus, CalendarDays, ExternalLink, Image } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Achievement {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  logo?: string;
}

interface AchievementsCardProps {
  achievements: Achievement[];
}

export function AchievementsCard({ achievements }: AchievementsCardProps) {
  const [showAddAchievementDialog, setShowAddAchievementDialog] = useState(false);
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);
  const [isViewingAll, setIsViewingAll] = useState(false);
  
  const achievementTypes = [
    { id: "award", label: "جایزه", color: "bg-amber-500" },
    { id: "certificate", label: "گواهینامه", color: "bg-blue-500" },
    { id: "recognition", label: "تقدیرنامه", color: "bg-green-500" },
    { id: "publication", label: "انتشارات", color: "bg-purple-500" },
    { id: "project", label: "پروژه", color: "bg-tiffany" },
  ];
  
  const displayedAchievements = isViewingAll ? achievements : achievements.slice(0, 2);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Award className="mr-2 h-5 w-5 text-amber-500" /> 
              دستاوردها و افتخارات
            </CardTitle>
            <CardDescription>
              {achievements.length} دستاورد ثبت شده
            </CardDescription>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs"
            onClick={() => setShowAddAchievementDialog(true)}
          >
            <Plus className="h-3 w-3 ml-1" />
            افزودن
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          {displayedAchievements.map((achievement, index) => (
            <motion.div 
              key={achievement.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`
                p-4 rounded-lg border border-slate-200 dark:border-slate-700 relative
                transition-all duration-300
                ${hoveredAchievement === achievement.id ? 'border-amber-300 dark:border-amber-700 shadow-sm' : ''}
              `}
              onMouseEnter={() => setHoveredAchievement(achievement.id)}
              onMouseLeave={() => setHoveredAchievement(null)}
            >
              <div className="flex items-start gap-3">
                {achievement.logo ? (
                  <div className="w-12 h-12 rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                    <img src={achievement.logo} alt={achievement.issuer} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-md bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-500 flex-shrink-0">
                    <Sparkles className="h-6 w-6" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-base">{achievement.title}</h3>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <CalendarDays className="h-3 w-3 ml-1" />
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.issuer}</p>
                  
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    {achievement.description}
                  </p>
                </div>
              </div>
              
              <div className="absolute top-2 left-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm">
                        <span className="text-[10px]">A+</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">دستاورد ویژه</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </motion.div>
          ))}
          
          {/* دکمه نمایش بیشتر */}
          {achievements.length > 2 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => setIsViewingAll(!isViewingAll)}
            >
              {isViewingAll ? "نمایش کمتر" : `نمایش ${achievements.length - 2} مورد دیگر`}
            </Button>
          )}
          
          {/* دکمه افزودن دستاورد جدید */}
          <Button
            variant="outline"
            className="w-full border-dashed mt-2 h-16"
            onClick={() => setShowAddAchievementDialog(true)}
          >
            <div className="flex items-center justify-center">
              <Plus className="w-5 h-5 ml-2" />
              <span>افزودن دستاورد جدید</span>
            </div>
          </Button>
        </div>
      </CardContent>
      
      {/* دیالوگ افزودن دستاورد */}
      <Dialog open={showAddAchievementDialog} onOpenChange={setShowAddAchievementDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن دستاورد جدید</DialogTitle>
            <DialogDescription>
              دستاوردها و افتخارات حرفه‌ای خود را ثبت کنید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">عنوان دستاورد</label>
              <Input placeholder="مثال: مدیر HSE نمونه سال ۱۴۰۱" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع دستاورد</label>
              <div className="flex flex-wrap gap-2">
                {achievementTypes.map(type => (
                  <Badge 
                    key={type.id} 
                    className={`cursor-pointer ${type.id === 'award' ? type.color : 'bg-transparent text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300'}`}
                  >
                    {type.label}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">صادر کننده / سازمان</label>
              <Input placeholder="مثال: انجمن صنفی HSE ایران" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">تاریخ دریافت</label>
              <Input placeholder="مثال: 1401" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">توضیحات</label>
              <Textarea 
                placeholder="توضیحات مربوط به دستاورد، نحوه کسب آن و اهمیت آن..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">تصویر یا لوگو (اختیاری)</label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Image className="h-8 w-8 text-slate-400 mb-2" />
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    فایل تصویر را بکشید و رها کنید یا
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    انتخاب فایل
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">پیوست گواهی (اختیاری)</label>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <Input type="file" className="text-sm" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="add-to-resume" className="rounded border-slate-300 dark:border-slate-600" />
                <label htmlFor="add-to-resume" className="text-sm">
                  نمایش در رزومه
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddAchievementDialog(false)}>
              انصراف
            </Button>
            <Button onClick={() => setShowAddAchievementDialog(false)}>
              ذخیره
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}