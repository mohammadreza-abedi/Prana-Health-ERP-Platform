import { useState } from "react";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, ChevronRight, CornerUpLeft, Star, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Recommendation {
  id: number;
  author: string;
  position: string;
  avatar: string;
  date: string;
  content: string;
}

interface PeerEndorsementsProps {
  recommendations: Recommendation[];
}

export function PeerEndorsements({ recommendations }: PeerEndorsementsProps) {
  const [activeRecommendation, setActiveRecommendation] = useState<number | null>(null);
  const [showAddRecommendationDialog, setShowAddRecommendationDialog] = useState(false);
  const [showRequestRecommendationDialog, setShowRequestRecommendationDialog] = useState(false);
  const [visibleRecommendationsCount, setVisibleRecommendationsCount] = useState(1);
  
  // توابع مدیریت توصیه‌نامه‌ها
  const loadMoreRecommendations = () => {
    setVisibleRecommendationsCount(Math.min(recommendations.length, visibleRecommendationsCount + 2));
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-blue-500" /> 
            توصیه‌ها و تأییدیه‌ها
          </CardTitle>
          <Badge variant="outline" className="px-2 py-0 text-xs">
            {recommendations.length} توصیه‌نامه
          </Badge>
        </div>
        <CardDescription>
          توصیه‌نامه‌های حرفه‌ای از همکاران و مدیران
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        {recommendations.slice(0, visibleRecommendationsCount).map((recommendation, index) => (
          <motion.div 
            key={recommendation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`
              relative p-4 rounded-lg border border-slate-200 dark:border-slate-700
              ${activeRecommendation === recommendation.id ? 'bg-slate-50 dark:bg-slate-800' : ''}
            `}
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                <AvatarImage src={recommendation.avatar} alt={recommendation.author} />
                <AvatarFallback>{recommendation.author.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-sm">{recommendation.author}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{recommendation.position}</p>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {recommendation.date}
                  </div>
                </div>
                
                {/* نمایش مختصر متن توصیه‌نامه */}
                {activeRecommendation !== recommendation.id && (
                  <div className="mt-2">
                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                      {recommendation.content}
                    </p>
                    <button 
                      className="text-xs text-tiffany mt-1 flex items-center hover:underline"
                      onClick={() => setActiveRecommendation(recommendation.id)}
                    >
                      <span>ادامه مطلب</span>
                      <ChevronRight className="h-3 w-3 mr-1" />
                    </button>
                  </div>
                )}
                
                {/* نمایش کامل متن توصیه‌نامه */}
                <AnimatePresence>
                  {activeRecommendation === recommendation.id && (
                    <motion.div 
                      className="mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {recommendation.content}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <button 
                          className="text-xs text-slate-500 dark:text-slate-400 flex items-center hover:text-slate-700 dark:hover:text-slate-300"
                          onClick={() => setActiveRecommendation(null)}
                        >
                          <CornerUpLeft className="h-3 w-3 ml-1" />
                          <span>بستن</span>
                        </button>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button className="flex items-center text-xs text-slate-500 dark:text-slate-400 hover:text-tiffany">
                            <ThumbsUp className="h-3 w-3 ml-1" />
                            <span>مفید بود</span>
                          </button>
                          <span className="text-xs text-slate-300 dark:text-slate-600">|</span>
                          <button className="flex items-center text-xs text-slate-500 dark:text-slate-400 hover:text-blue-500">
                            <MessageSquare className="h-3 w-3 ml-1" />
                            <span>پاسخ</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* نشان‌های ویژه (اختیاری) */}
            <div className="absolute top-2 left-2">
              <div className="flex space-x-1 space-x-reverse">
                <div className="text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* دکمه نمایش بیشتر */}
        {visibleRecommendationsCount < recommendations.length && (
          <Button 
            variant="outline" 
            className="w-full text-xs"
            onClick={loadMoreRecommendations}
          >
            نمایش توصیه‌نامه‌های بیشتر
          </Button>
        )}
        
        {/* بخش درخواست و افزودن توصیه‌نامه */}
        <div className="flex mt-4 space-x-2 space-x-reverse">
          <Button 
            className="flex-1 text-xs flex items-center justify-center" 
            onClick={() => setShowRequestRecommendationDialog(true)}
          >
            <MessageSquare className="h-4 w-4 ml-1" />
            <span>درخواست توصیه‌نامه</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 text-xs flex items-center justify-center"
            onClick={() => setShowAddRecommendationDialog(true)}
          >
            <Plus className="h-4 w-4 ml-1" />
            <span>افزودن توصیه‌نامه</span>
          </Button>
        </div>
      </CardContent>
      
      {/* دیالوگ افزودن توصیه‌نامه */}
      <Dialog open={showAddRecommendationDialog} onOpenChange={setShowAddRecommendationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن توصیه‌نامه جدید</DialogTitle>
            <DialogDescription>
              توصیه‌نامه‌ای از همکاران یا مدیران خود اضافه کنید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">نام توصیه‌کننده</label>
              <Input placeholder="نام و نام خانوادگی" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">سمت یا موقعیت شغلی</label>
              <Input placeholder="مثال: مدیر پروژه، همکار و..." />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">متن توصیه‌نامه</label>
              <Textarea 
                placeholder="متن توصیه‌نامه را وارد کنید..."
                rows={5}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">تاریخ توصیه‌نامه</label>
              <Input type="text" placeholder="مثال: ۱۴۰۲/۰۱/۱۵" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع ارتباط</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">همکار</Badge>
                <Badge className="cursor-pointer bg-blue-500">مدیر</Badge>
                <Badge variant="outline" className="cursor-pointer">مشتری</Badge>
                <Badge variant="outline" className="cursor-pointer">زیرمجموعه</Badge>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddRecommendationDialog(false)}>
              انصراف
            </Button>
            <Button onClick={() => setShowAddRecommendationDialog(false)}>
              افزودن توصیه‌نامه
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* دیالوگ درخواست توصیه‌نامه */}
      <Dialog open={showRequestRecommendationDialog} onOpenChange={setShowRequestRecommendationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>درخواست توصیه‌نامه</DialogTitle>
            <DialogDescription>
              از همکاران و مدیران خود درخواست توصیه‌نامه کنید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">ایمیل گیرنده</label>
              <Input type="email" placeholder="example@example.com" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">نوع ارتباط</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer">همکار</Badge>
                <Badge className="cursor-pointer bg-blue-500">مدیر</Badge>
                <Badge variant="outline" className="cursor-pointer">مشتری</Badge>
                <Badge variant="outline" className="cursor-pointer">زیرمجموعه</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">پیام شخصی (اختیاری)</label>
              <Textarea 
                placeholder="یک پیام شخصی به همراه درخواست ارسال کنید..."
                rows={3}
              />
            </div>
            
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h4 className="text-sm font-medium mb-2">پیش‌نمایش پیام ارسالی</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                سلام، امیدوارم حالتان خوب باشد. خوشحال می‌شوم اگر بتوانید یک توصیه‌نامه برای پروفایل حرفه‌ای من در پلتفرم پرانا بنویسید. از همکاری شما بسیار سپاسگزارم.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestRecommendationDialog(false)}>
              انصراف
            </Button>
            <Button onClick={() => setShowRequestRecommendationDialog(false)}>
              ارسال درخواست
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}