import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Search, Plus, Sparkles, Star, X, Award, MessageSquare, Code, ArrowRight, Zap } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Skill {
  name: string;
  level: number;
  endorsements?: number;
}

interface KeySkillsGridProps {
  skills: Skill[];
}

export function KeySkillsGrid({ skills }: KeySkillsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillView, setSkillView] = useState<"grid" | "radar" | "sunburst">("grid");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showEndorsementDialog, setShowEndorsementDialog] = useState(false);
  const [showAddSkillDialog, setShowAddSkillDialog] = useState(false);
  const [skillsCategory, setSkillsCategory] = useState<"all" | "technical" | "soft" | "tools">("all");
  
  // مهارت‌های فیلتر شده بر اساس جستجو و دسته بندی
  const filteredSkills = skills
    .filter(skill => 
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.level - a.level);
  
  // مقدارهای منحصر به فرد برای اندوزمنت ها
  const uniqueEndorsementCounts = [...new Set(skills.map(s => s.endorsements))].filter(Boolean);
  
  // گرفتن رنگ مهارت بر اساس سطح
  const getSkillColor = (level: number) => {
    if (level >= 90) return "bg-green-500 border-green-600 text-white";
    if (level >= 80) return "bg-tiffany border-tiffany-dark text-white";
    if (level >= 60) return "bg-amber-500 border-amber-600 text-white";
    return "bg-slate-500 border-slate-600 text-white";
  };
  
  // گرفتن سایز مهارت بر اساس سطح
  const getSkillSize = (level: number) => {
    if (level >= 90) return "col-span-2 row-span-2";
    if (level >= 80) return "col-span-2";
    return "col-span-1";
  };
  
  // گرفتن آیکون مهارت بر اساس تعداد تأییدیه‌ها
  const getEndorsementIcon = (endorsements?: number) => {
    if (!endorsements) return null;
    if (endorsements >= 10) return <Award className="h-3 w-3" />;
    if (endorsements >= 5) return <Star className="h-3 w-3" />;
    return <MessageSquare className="h-3 w-3" />;
  };
  
  return (
    <Card className="overflow-hidden shadow-md">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-amber-500" /> 
              مهارت‌های کلیدی
            </CardTitle>
            <CardDescription>
              نمایش گرافیکی مهارت‌ها و تخصص‌های حرفه‌ای
            </CardDescription>
          </div>
          
          <Tabs defaultValue="grid" onValueChange={(v) => setSkillView(v as any)}>
            <TabsList className="bg-slate-100 dark:bg-slate-800">
              <TabsTrigger value="grid" className="text-xs">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span>#</span>
                  <span>شبکه‌ای</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="radar" className="text-xs">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <BarChart className="h-3 w-3" />
                  <span>راداری</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="sunburst" className="text-xs">
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span>🔆</span>
                  <span>درختی</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="flex space-x-2 space-x-reverse mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="جستجوی مهارت..." 
              className="pr-8 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute left-2 top-2.5 text-slate-400 hover:text-slate-600"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline" 
                  size="icon" 
                  onClick={() => setShowAddSkillDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">افزودن مهارت جدید</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse mb-4 overflow-x-auto pb-2 scrollbar-thin">
          <Badge 
            variant={skillsCategory === "all" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSkillsCategory("all")}
          >
            همه
          </Badge>
          <Badge 
            variant={skillsCategory === "technical" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSkillsCategory("technical")}
          >
            تخصصی
          </Badge>
          <Badge 
            variant={skillsCategory === "soft" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSkillsCategory("soft")}
          >
            نرم
          </Badge>
          <Badge 
            variant={skillsCategory === "tools" ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSkillsCategory("tools")}
          >
            ابزارها
          </Badge>
          
          {/* جداکننده */}
          <div className="border-r border-slate-200 dark:border-slate-700 h-5"></div>
          
          {/* فیلتر بر اساس تعداد تأییدیه‌ها */}
          {uniqueEndorsementCounts.map(count => (
            <Badge 
              key={`endorsement-${count}`}
              variant="outline"
              className="bg-slate-100 dark:bg-slate-800 text-xs font-normal"
            >
              <Star className="h-3 w-3 ml-1 text-amber-500" />
              {count}+
            </Badge>
          ))}
        </div>
        
        {skillView === "grid" && (
          <div className="grid grid-cols-6 gap-2 auto-rows-min">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className={`${getSkillSize(skill.level)} relative group`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div 
                  className={`${getSkillColor(skill.level)} p-3 rounded-lg border group-hover:scale-[1.02] transition-all cursor-pointer h-full`}
                  onClick={() => setSelectedSkill(skill)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm">{skill.name}</h3>
                    <div className="rounded-full text-xs px-1.5 py-0.5 bg-white/20">{skill.level}%</div>
                  </div>
                  
                  {skill.endorsements && (
                    <div className="absolute bottom-2 right-2 flex items-center text-xs text-white/70">
                      {getEndorsementIcon(skill.endorsements)}
                      <span className="ml-1">{skill.endorsements}</span>
                    </div>
                  )}
                  
                  <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1 space-x-reverse">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                              <Plus className="h-3 w-3 text-white" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">تأیید این مهارت</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {skillView === "radar" && (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto relative">
                <div className="absolute inset-0 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-full"></div>
                <div className="absolute inset-[15%] border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-full"></div>
                <div className="absolute inset-[35%] border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-full"></div>
                
                {/* نقاط نمودار راداری */}
                {filteredSkills.slice(0, 8).map((skill, index) => {
                  const angle = (Math.PI * 2 * index) / 8;
                  const radius = (skill.level / 100) * 64; // حداکثر شعاع 64 پیکسل
                  const x = 64 + radius * Math.cos(angle);
                  const y = 64 + radius * Math.sin(angle);
                  
                  return (
                    <motion.div
                      key={skill.name}
                      className="absolute w-3 h-3 rounded-full bg-tiffany border-2 border-white dark:border-slate-900 cursor-pointer z-10"
                      style={{ left: x, top: y }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-full h-full rounded-full"></div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            <p className="font-bold">{skill.name}</p>
                            <p>{skill.level}%</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  );
                })}
                
                {/* خطوط اتصال نقاط */}
                <svg className="absolute inset-0" viewBox="0 0 128 128">
                  <polygon
                    points={filteredSkills.slice(0, 8).map((skill, index) => {
                      const angle = (Math.PI * 2 * index) / 8;
                      const radius = (skill.level / 100) * 64;
                      const x = 64 + radius * Math.cos(angle);
                      const y = 64 + radius * Math.sin(angle);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="rgba(46, 196, 182, 0.2)"
                    stroke="rgba(46, 196, 182, 0.8)"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                نمودار راداری مهارت‌های برتر
              </p>
            </div>
          </div>
        )}
        
        {skillView === "sunburst" && (
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="relative h-64 w-64 mx-auto">
                {/* حلقه‌های دایره‌ای برای نمایش درختی */}
                <div className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-700"></div>
                
                {filteredSkills.slice(0, 12).map((skill, index) => {
                  const angle = (Math.PI * 2 * index) / 12;
                  const distance = 40 + (skill.level / 100) * 50; // فاصله از مرکز
                  const x = 128 + distance * Math.cos(angle);
                  const y = 128 + distance * Math.sin(angle);
                  const size = 24 + (skill.level / 100) * 30; // اندازه حباب
                  
                  return (
                    <motion.div
                      key={skill.name}
                      className={`absolute rounded-full flex items-center justify-center cursor-pointer ${index % 3 === 0 ? 'bg-tiffany' : index % 3 === 1 ? 'bg-amber-500' : 'bg-blue-500'} text-white`}
                      style={{ 
                        left: x - size/2, 
                        top: y - size/2,
                        width: size,
                        height: size,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="text-[8px] font-medium px-1 truncate">
                            {skill.name}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs space-y-1">
                            <p className="font-bold">{skill.name}</p>
                            <div className="flex items-center">
                              <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-tiffany"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                              <span className="ml-1">{skill.level}%</span>
                            </div>
                            {skill.endorsements && (
                              <p className="flex items-center">
                                <Star className="w-3 h-3 mr-1 text-amber-500" />
                                <span>{skill.endorsements} تأییدیه</span>
                              </p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  );
                })}
                
                {/* نقطه مرکزی */}
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  مهارت‌ها
                </motion.div>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                نمایش درختی مهارت‌ها بر اساس سطح و دسته‌بندی
              </p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="bg-slate-50 dark:bg-slate-900 flex justify-between py-2">
        <Button variant="link" size="sm" className="text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center">
            <span>مدیریت مهارت‌ها</span>
            <ArrowRight className="h-3 w-3 mr-1" />
          </div>
        </Button>
        
        <Button variant="link" size="sm" className="text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center">
            <Code className="h-3 w-3 ml-1" />
            <span>رتبه‌بندی مهارت‌ها</span>
          </div>
        </Button>
      </CardFooter>
      
      {/* دیالوگ جزئیات مهارت */}
      <Dialog open={!!selectedSkill} onOpenChange={(open) => !open && setSelectedSkill(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Code className="mr-2 h-5 w-5 text-tiffany" />
              {selectedSkill?.name}
            </DialogTitle>
            <DialogDescription>
              جزئیات و آمار مربوط به این مهارت
            </DialogDescription>
          </DialogHeader>
          
          {selectedSkill && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">سطح مهارت</span>
                  <span className="text-sm">{selectedSkill.level}%</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getSkillColor(selectedSkill.level)}`}
                    style={{ width: `${selectedSkill.level}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">تأییدشده توسط</span>
                  <span className="text-sm">{selectedSkill.endorsements || 0} نفر</span>
                </div>
                
                <div className="flex mt-2">
                  {[...Array(Math.min(selectedSkill.endorsements || 0, 5))].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full -ml-2 first:ml-0 border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                      {i < 3 ? (
                        <img src={`https://i.pravatar.cc/32?img=${i+1}`} alt="User" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-medium">+{selectedSkill.endorsements! - 3}</span>
                      )}
                    </div>
                  ))}
                  
                  {(selectedSkill.endorsements || 0) === 0 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      این مهارت هنوز توسط کسی تأیید نشده است.
                    </p>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg">
                <h3 className="text-sm font-medium mb-2">چه کسانی این مهارت را دارند؟</h3>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">
                    <span className="ml-1">👨‍💻</span>
                    ۱۲ نفر در سازمان
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <span className="ml-1">🏢</span>
                    ۳ نفر در دپارتمان شما
                  </Badge>
                </div>
              </div>
              
              <div className="flex space-x-2 space-x-reverse">
                <Button 
                  variant="default" 
                  className="flex-1"
                  onClick={() => {
                    setShowEndorsementDialog(true);
                    setSelectedSkill(null);
                  }}
                >
                  <div className="flex items-center">
                    <Star className="h-4 w-4 ml-2" />
                    <span>تأیید این مهارت</span>
                  </div>
                </Button>
                
                <Button variant="outline" className="flex-1">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 ml-2" />
                    <span>ارتقای مهارت</span>
                  </div>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* دیالوگ تأیید مهارت */}
      <Dialog open={showEndorsementDialog} onOpenChange={setShowEndorsementDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>تأیید مهارت</DialogTitle>
            <DialogDescription>
              لطفاً تجربه خود با این مهارت را توضیح دهید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">توضیحات</label>
              <textarea 
                className="w-full h-24 p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
                placeholder="توضیح دهید چگونه این مهارت را در عمل دیده‌اید..."
              ></textarea>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">سطح مهارت</label>
              <div className="flex items-center space-x-2 space-x-reverse">
                {[1, 2, 3, 4, 5].map(level => (
                  <button key={level} className="p-1">
                    <Star className={`h-6 w-6 ${level <= 3 ? "text-amber-500 fill-amber-500" : "text-slate-300 dark:text-slate-600"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEndorsementDialog(false)}>
              انصراف
            </Button>
            <Button onClick={() => setShowEndorsementDialog(false)}>
              ثبت تأییدیه
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* دیالوگ افزودن مهارت جدید */}
      <Dialog open={showAddSkillDialog} onOpenChange={setShowAddSkillDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن مهارت جدید</DialogTitle>
            <DialogDescription>
              مهارت‌ها و تخصص‌های خود را اضافه کنید.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">نام مهارت</label>
              <Input placeholder="مثال: مدیریت پروژه، برنامه‌نویسی Python و..." />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">سطح مهارت</label>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>مبتدی</span>
                  <span>متوسط</span>
                  <span>پیشرفته</span>
                  <span>خبره</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  step="1" 
                  defaultValue="75"
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-tiffany"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">دسته‌بندی</label>
              <div className="flex flex-wrap gap-2">
                <Badge className="cursor-pointer bg-tiffany">تخصصی</Badge>
                <Badge variant="outline" className="cursor-pointer">نرم</Badge>
                <Badge variant="outline" className="cursor-pointer">ابزار</Badge>
                <Badge variant="outline" className="cursor-pointer">مدیریتی</Badge>
                <Badge variant="outline" className="cursor-pointer">فنی</Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">مثال‌های استفاده از این مهارت</label>
              <textarea 
                className="w-full h-24 p-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
                placeholder="مثال‌هایی از تجربیات واقعی خود در استفاده از این مهارت را بنویسید..."
              ></textarea>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSkillDialog(false)}>
              انصراف
            </Button>
            <Button onClick={() => setShowAddSkillDialog(false)}>
              افزودن مهارت
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* منوی پاپ‌آور راهنمای رتبه‌بندی */}
      <Popover>
        <PopoverTrigger className="hidden">
          <Button variant="link" size="sm">
            راهنمای رتبه‌بندی
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-4 border-b">
            <h4 className="font-medium">راهنمای رتبه‌بندی مهارت‌ها</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              نحوه رتبه‌بندی مهارت‌ها بر اساس سطح تخصص
            </p>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
              <div>
                <p className="text-xs font-medium">خبره (90-100%)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">توانایی آموزش و هدایت دیگران</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-tiffany ml-2"></div>
              <div>
                <p className="text-xs font-medium">پیشرفته (80-89%)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">تسلط کامل و استفاده روزمره</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 ml-2"></div>
              <div>
                <p className="text-xs font-medium">متوسط (60-79%)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">آشنایی خوب و کاربرد منظم</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-slate-500 ml-2"></div>
              <div>
                <p className="text-xs font-medium">مبتدی (کمتر از 60%)</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">آشنایی اولیه و کاربرد محدود</p>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </Card>
  );
}