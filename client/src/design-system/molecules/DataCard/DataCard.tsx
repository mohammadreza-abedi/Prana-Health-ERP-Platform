/**
 * @file DataCard.tsx
 * @description کامپوننت کارت داده-محور که براساس اصل "طراحی روایی داده-محور" ایجاد شده است
 * 
 * این کامپوننت یک مولکول است که از اتم‌های Card استفاده می‌کند و آن‌ها را با لایه‌های اطلاعاتی
 * و اکشن‌ها ترکیب می‌کند تا یک واحد روایی از داده را نمایش دهد.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "../../atoms/Card";
import { Button } from "../../atoms/Button";
import { designTokens } from "../../tokens/design-tokens";
import { behavioralPatterns } from "../../behaviors/behavioral-patterns";
import { ArrowUpRight, TrendingDown, TrendingUp, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";

// تعریف واریانت‌های کارت داده با استفاده از CVA
const dataCardVariants = cva("", {
  variants: {
    // واریانت‌های نمایشی کارت داده
    variant: {
      default: "",
      metric: "", // برای نمایش متریک‌های عددی
      insight: "", // برای نمایش بینش‌ها و اطلاعات تحلیلی
      action: "", // برای نمایش اکشن‌های کاربر
      status: "", // برای نمایش وضعیت‌ها
    },
    
    // سایزهای مختلف کارت داده
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    
    // استراتژی نمایش داده
    layout: {
      simple: "", // فقط مقدار اصلی و عنوان
      detailed: "", // با توضیحات و مقایسه‌ها
      chart: "", // همراه با نمودار کوچک
      split: "", // دو ستونه برای مقایسه
    },
    
    // حالت‌های وضعیتی
    state: {
      neutral: "",
      positive: "",
      negative: "",
      warning: "",
      info: "",
    },
    
    // وضعیت قابلیت گسترش (کلیک روی کارت)
    expandable: {
      true: "",
    },
  },
  
  // پیش‌فرض‌های کارت داده
  defaultVariants: {
    variant: "default",
    size: "md",
    layout: "simple",
    state: "neutral",
    expandable: false,
  },
});

// مدل‌سازی رنگ‌های وضعیت برای استفاده در UI
const stateColors = {
  neutral: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-800 dark:text-gray-200",
    accent: "text-gray-500 dark:text-gray-400",
    icon: "text-gray-500 dark:text-gray-400"
  },
  positive: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-200",
    accent: "text-green-600 dark:text-green-400",
    icon: "text-green-500"
  },
  negative: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-200",
    accent: "text-red-600 dark:text-red-400",
    icon: "text-red-500"
  },
  warning: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-800 dark:text-amber-200",
    accent: "text-amber-600 dark:text-amber-400",
    icon: "text-amber-500"
  },
  info: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-200",
    accent: "text-blue-600 dark:text-blue-400",
    icon: "text-blue-500"
  },
};

// اکسپورت کردن تایپ تنظیمات کارت داده برای استفاده در جاهای دیگر
export interface DataCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataCardVariants> {
  // پراپس اصلی
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  
  // اطلاعات روند و مقایسه
  trend?: {
    value: number;
    label?: string;
    direction: 'up' | 'down' | 'neutral';
    timeframe?: string;
  };
  
  // اکشن‌ها
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  
  // اطلاعات نمودار
  sparkline?: number[];
  
  // سایر پراپس
  loading?: boolean;
  formatter?: (value: string | number) => string;
}

/**
 * کامپوننت DataCard
 * یک کارت داده-محور که براساس استراتژی طراحی روایی داده-محور ایجاد شده است.
 */
export const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({
    className,
    variant = "default",
    size = "md",
    layout = "simple",
    state = "neutral",
    expandable = false,
    title,
    value,
    icon,
    description,
    trend,
    primaryAction,
    secondaryAction,
    sparkline,
    loading = false,
    formatter = (val) => String(val),
    ...props
  }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // انتخاب استایل‌های مناسب بر اساس وضعیت کارت
    const stateStyle = stateColors[state as keyof typeof stateColors] || stateColors.neutral;
    
    // نمایش آیکون روند (مثبت/منفی)
    const renderTrendIcon = () => {
      if (!trend) return null;
      
      if (trend.direction === "up") {
        return <TrendingUp className={cn("h-4 w-4", stateStyle.icon)} />;
      } else if (trend.direction === "down") {
        return <TrendingDown className={cn("h-4 w-4", stateStyle.icon)} />;
      }
      
      return null;
    };
    
    // تولید کلاس روند بر اساس جهت آن
    const getTrendClass = () => {
      if (!trend) return "";
      
      return trend.direction === "up" 
        ? "text-green-600 dark:text-green-400" 
        : trend.direction === "down" 
          ? "text-red-600 dark:text-red-400" 
          : "text-gray-600 dark:text-gray-400";
    };
    
    // تولید متن روند
    const getTrendText = () => {
      if (!trend) return null;
      
      const prefix = trend.direction === "up" ? "+" : "";
      return `${prefix}${trend.value}%`;
    };
    
    return (
      <Card
        ref={ref}
        variant={state === "neutral" ? "default" : (state as any)}
        hover={expandable ? "elevate" : "none"}
        elevation={expandable ? "md" : "sm"}
        interactive={expandable}
        size={size}
        className={cn(
          "transition-all duration-300",
          expandable && "cursor-pointer",
          dataCardVariants({ variant, size, layout, state, expandable }),
          className
        )}
        onClick={expandable ? () => setIsExpanded(!isExpanded) : undefined}
        {...props}
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {icon && (
                <div className={cn("mr-2 p-2 rounded-full", stateStyle.bg)}>
                  {icon}
                </div>
              )}
              <CardTitle className="text-base">{title}</CardTitle>
            </div>
            
            {expandable && (
              <Button
                variant="ghost" 
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col">
            {/* مقدار اصلی */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {loading ? (
                <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
              ) : (
                <div className="text-2xl font-bold">{formatter(value)}</div>
              )}
              
              {/* نمایش روند تغییرات */}
              {trend && (
                <div className={cn("flex items-center text-sm", getTrendClass())}>
                  {renderTrendIcon()}
                  <span className="ml-1">{getTrendText()}</span>
                  {trend.timeframe && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      ({trend.timeframe})
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {/* توضیحات */}
            {description && (
              <CardDescription className="mt-1 text-xs">
                {description}
              </CardDescription>
            )}
            
            {/* نمایش نمودار کوچک */}
            {layout === "chart" && sparkline && (
              <div className="mt-3 h-10">
                {/* اینجا می‌توان یک نمودار خطی کوچک قرار داد */}
                <div className="flex items-end h-full space-x-0.5 rtl:space-x-reverse">
                  {sparkline.map((value, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-1 transition-all rounded-t",
                        state === "positive" ? "bg-green-400" : 
                        state === "negative" ? "bg-red-400" : 
                        state === "warning" ? "bg-amber-400" : 
                        state === "info" ? "bg-blue-400" : 
                        "bg-primary-400"
                      )}
                      style={{ height: `${Math.max(10, Math.min(100, value))}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* محتوای گسترش‌یافته */}
          {expandable && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t"
            >
              {/* محتوای اضافی در حالت گسترش‌یافته */}
              <div className="text-sm">
                {/* اینجا می‌توان اطلاعات تکمیلی را قرار داد */}
                <p className="text-muted-foreground">اطلاعات تکمیلی و جزئیات بیشتر...</p>
              </div>
            </motion.div>
          )}
        </CardContent>
        
        {/* فوتر برای اکشن‌ها */}
        {(primaryAction || secondaryAction) && (
          <CardFooter className="pt-2 flex gap-2">
            {primaryAction && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  primaryAction.onClick();
                }}
                rightIcon={<ArrowUpRight className="h-3 w-3" />}
              >
                {primaryAction.label}
              </Button>
            )}
            
            {secondaryAction && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  secondaryAction.onClick();
                }}
              >
                {secondaryAction.label}
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    );
  }
);

DataCard.displayName = "DataCard";

export { dataCardVariants };