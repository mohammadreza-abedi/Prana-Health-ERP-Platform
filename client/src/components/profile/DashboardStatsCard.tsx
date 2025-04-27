import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardStatsCardProps {
  icon: ReactNode;
  title: string;
  value: number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  percent?: number;
  className?: string;
}

export function DashboardStatsCard({
  icon,
  title,
  value,
  subtitle,
  trend = "neutral",
  percent = 0,
  className
}: DashboardStatsCardProps) {
  
  // انتخاب رنگ بر اساس روند
  const trendColorClass = trend === "up" 
    ? "text-green-500" 
    : trend === "down" 
      ? "text-rose-500" 
      : "text-slate-500";
  
  // انتخاب آیکون بر اساس روند
  const trendIcon = trend === "up" 
    ? <ArrowUp className="h-3 w-3" /> 
    : trend === "down" 
      ? <ArrowDown className="h-3 w-3" /> 
      : null;
  
  return (
    <Card className={cn("overflow-hidden h-full", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* آیکون */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
            {icon}
          </div>
          
          {/* محتوا */}
          <div className="flex-1">
            {/* عنوان */}
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-0.5">
              {title}
            </p>
            
            {/* مقدار اصلی */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {new Intl.NumberFormat('fa-IR').format(value)}
              </span>
              
              {/* شاخص تغییرات */}
              {trend !== "neutral" && (
                <div className={`flex items-center text-xs ${trendColorClass}`}>
                  {trendIcon}
                  <span className="ml-0.5">{percent}%</span>
                </div>
              )}
            </div>
            
            {/* زیرعنوان */}
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}