import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Skill {
  name: string;
  level: number;
  endorsements?: number;
}

interface SkillsCardProps {
  skills: Skill[];
}

export function SkillsCard({ skills }: SkillsCardProps) {
  const [visibleSkills, setVisibleSkills] = useState(5);
  const [skillFilter, setSkillFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"level" | "name" | "endorsements">("level");
  
  // فیلتر و مرتب‌سازی مهارت‌ها
  const filteredAndSortedSkills = [...skills]
    .filter(skill => !skillFilter || skill.name.includes(skillFilter))
    .sort((a, b) => {
      if (sortOrder === "level") {
        return b.level - a.level;
      } else if (sortOrder === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return (b.endorsements || 0) - (a.endorsements || 0);
      }
    });
  
  // دسته‌بندی مهارت‌ها بر اساس سطح
  const skillCategories = {
    expert: filteredAndSortedSkills.filter(skill => skill.level >= 90),
    advanced: filteredAndSortedSkills.filter(skill => skill.level >= 80 && skill.level < 90),
    intermediate: filteredAndSortedSkills.filter(skill => skill.level >= 60 && skill.level < 80),
    beginner: filteredAndSortedSkills.filter(skill => skill.level < 60),
  };
  
  const showMoreSkills = () => {
    setVisibleSkills(prev => prev + 5);
  };
  
  // گرفتن رنگ پیشرفت بر اساس سطح مهارت
  const getSkillColor = (level: number) => {
    if (level >= 90) return "bg-green-500";
    if (level >= 80) return "bg-tiffany";
    if (level >= 60) return "bg-amber-500";
    return "bg-slate-500";
  };
  
  // رندر یک مهارت به همراه انیمیشن
  const renderSkill = (skill: Skill, index: number) => (
    <motion.div 
      key={skill.name}
      className="relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <div className="flex flex-col p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-tiffany/50 dark:hover:border-tiffany/50 transition-colors group">
        <div className="flex justify-between items-center mb-1">
          <h3 className="font-medium text-sm group-hover:text-tiffany transition-colors">{skill.name}</h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">{skill.level}%</span>
        </div>
        
        <Progress value={skill.level} className={`h-1.5 ${getSkillColor(skill.level)}`} />
        
        {skill.endorsements !== undefined && (
          <div className="flex mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span>تأیید شده توسط {skill.endorsements} نفر</span>
            
            <div className="mr-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <Plus className="h-3 w-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">تأیید این مهارت</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Code className="mr-2 h-5 w-5 text-tiffany" /> 
              مهارت‌ها و تخصص‌ها
            </CardTitle>
            <CardDescription>
              {filteredAndSortedSkills.length} مهارت ثبت شده
            </CardDescription>
          </div>
          
          <div className="flex gap-1">
            <Badge 
              variant={sortOrder === "level" ? "default" : "outline"} 
              className="cursor-pointer text-xs"
              onClick={() => setSortOrder("level")}
            >
              سطح
            </Badge>
            <Badge 
              variant={sortOrder === "name" ? "default" : "outline"} 
              className="cursor-pointer text-xs"
              onClick={() => setSortOrder("name")}
            >
              نام
            </Badge>
            <Badge 
              variant={sortOrder === "endorsements" ? "default" : "outline"} 
              className="cursor-pointer text-xs"
              onClick={() => setSortOrder("endorsements")}
            >
              تأییدها
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {skillCategories.expert.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">مهارت‌های تخصصی</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skillCategories.expert.map((skill, index) => renderSkill(skill, index))}
            </div>
          </div>
        )}
        
        {skillCategories.advanced.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">مهارت‌های پیشرفته</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skillCategories.advanced.map((skill, index) => renderSkill(skill, index))}
            </div>
          </div>
        )}
        
        {skillCategories.intermediate.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">مهارت‌های متوسط</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skillCategories.intermediate.map((skill, index) => renderSkill(skill, index))}
            </div>
          </div>
        )}
        
        {skillCategories.beginner.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">مهارت‌های پایه</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {skillCategories.beginner.map((skill, index) => renderSkill(skill, index))}
            </div>
          </div>
        )}
        
        {filteredAndSortedSkills.length > visibleSkills && (
          <div className="text-center mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={showMoreSkills} 
              className="text-xs"
            >
              نمایش مهارت‌های بیشتر
            </Button>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">افزودن مهارت جدید</h3>
            <Button size="sm" variant="default" className="text-xs h-7 px-2">
              <Plus className="h-3 w-3 ml-1" />
              افزودن
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}