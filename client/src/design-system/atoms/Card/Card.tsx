/**
 * @file Card.tsx
 * @description کامپوننت کارت اتمیک در سیستم طراحی پرانا
 * 
 * کارت‌ها کانتینرهای محتوایی هستند که برای گروه‌بندی اطلاعات مرتبط و 
 * ارائه آن‌ها در قالب‌های منسجم و قابل خواندن استفاده می‌شوند.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { designTokens } from "../../tokens/design-tokens";
import { behavioralPatterns } from "../../behaviors/behavioral-patterns";

// تعریف واریانت‌های کارت با استفاده از CVA
const cardVariants = cva(
  // پایه مشترک بین تمام کارت‌ها
  "rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
  {
    variants: {
      // واریانت‌های اصلی کارت
      variant: {
        default: "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800",
        primary: "bg-primary-50 dark:bg-primary-950 border-primary-100 dark:border-primary-900 text-primary-900 dark:text-primary-50",
        secondary: "bg-secondary-50 dark:bg-secondary-950 border-secondary-100 dark:border-secondary-900 text-secondary-900 dark:text-secondary-50",
        success: "bg-success-50 dark:bg-success-950 border-success-100 dark:border-success-900 text-success-900 dark:text-success-50",
        warning: "bg-warning-50 dark:bg-warning-950 border-warning-100 dark:border-warning-900 text-warning-900 dark:text-warning-50",
        error: "bg-error-50 dark:bg-error-950 border-error-100 dark:border-error-900 text-error-900 dark:text-error-50",
        info: "bg-info-50 dark:bg-info-950 border-info-100 dark:border-info-900 text-info-900 dark:text-info-50",
        ghost: "bg-transparent border-0 shadow-none",
      },
      
      // سایزهای مختلف کارت
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      
      // وضعیت نمایان‌تر کارت با سایه
      elevation: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow",
        lg: "shadow-md",
        xl: "shadow-lg",
      },
      
      // وضعیت گرد بودن گوشه‌های کارت
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-3xl",
      },
      
      // اثر هاور روی کارت
      hover: {
        none: "",
        elevate: "transition-shadow hover:shadow-md",
        scale: "transition-transform hover:scale-[1.02]",
        border: "transition-colors hover:border-primary-300 dark:hover:border-primary-700",
        highlight: "transition-all hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md",
      },
      
      // حالت‌های تعاملی کارت
      interactive: {
        true: "cursor-pointer transition-all",
      },
      
      // بورداستایل
      borderStyle: {
        none: "border-0",
        thin: "border",
        thick: "border-2",
        dashed: "border border-dashed",
        dotted: "border border-dotted",
      },
      
      // جهت چیدمان محتوا درون کارت
      direction: {
        row: "flex flex-row",
        column: "flex flex-col",
      },
      
      // استایل بک‌گراند شیشه‌ای
      glassmorphism: {
        true: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-white/20 dark:border-slate-700/20",
      },
    },
    
    // پیش‌فرض‌های کارت
    defaultVariants: {
      variant: "default",
      size: "md",
      elevation: "sm",
      rounded: "lg",
      hover: "none",
      interactive: false,
      borderStyle: "thin",
      direction: "column",
      glassmorphism: false,
    },
  }
);

// اکسپورت کردن تایپ تنظیمات کارت برای استفاده در جاهای دیگر
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  // پراپس اضافی برای کارت
  as?: React.ElementType;
}

/**
 * کامپوننت اصلی کارت
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    elevation, 
    rounded, 
    hover, 
    interactive, 
    borderStyle, 
    direction, 
    glassmorphism, 
    as: Component = "div", 
    ...props 
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          cardVariants({ 
            variant, 
            size, 
            elevation, 
            rounded, 
            hover, 
            interactive, 
            borderStyle, 
            direction, 
            glassmorphism, 
            className 
          })
        )}
        data-state={interactive ? "interactive" : undefined}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

/**
 * هدر کارت - برای نمایش عنوان و توضیحات
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * عنوان کارت
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: React.ElementType }
>(({ className, as: Component = "h3", ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * توضیحات کارت
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * محتوای اصلی کارت
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * فوتر کارت - برای اکشن‌ها و اطلاعات تکمیلی
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };