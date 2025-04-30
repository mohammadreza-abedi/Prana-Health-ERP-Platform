/**
 * @file Button.tsx
 * @description کامپوننت دکمه اتمیک در سیستم طراحی پرانا
 * 
 * این کامپوننت براساس اصول سیستم طراحی و الگوهای رفتاری تعریف شده، 
 * یک دکمه قابل تنظیم و استاندارد فراهم می‌کند.
 */

import React, { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { designTokens } from "../../tokens/design-tokens";
import { behavioralPatterns } from "../../behaviors/behavioral-patterns";

// تعریف واریانت‌های دکمه با استفاده از CVA
const buttonVariants = cva(
  // پایه مشترک بین تمام دکمه‌ها
  "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      // واریانت‌های اصلی دکمه
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        
        // دکمه نمایان با استایل برند
        primary: "bg-tiffany hover:bg-tiffany-dark text-white shadow-sm hover:shadow-md",
        
        // دکمه ثانویه با حاشیه
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        
        // دکمه با حاشیه
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        
        // دکمه شبه-متنی با هاور خاص
        ghost: "hover:bg-accent hover:text-accent-foreground",
        
        // دکمه با استایل لینک
        link: "underline-offset-4 hover:underline text-primary",
        
        // دکمه خنثی
        subtle: "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200",
        
        // دکمه موفقیت
        success: "bg-success-500 hover:bg-success-600 text-white shadow-sm hover:shadow-md",
        
        // دکمه خطا
        error: "bg-error-500 hover:bg-error-600 text-white shadow-sm hover:shadow-md",
        
        // دکمه هشدار
        warning: "bg-warning-500 hover:bg-warning-600 text-white shadow-sm hover:shadow-md",
        
        // دکمه اطلاعات
        info: "bg-info-500 hover:bg-info-600 text-white shadow-sm hover:shadow-md",
      },
      
      // سایزهای مختلف دکمه
      size: {
        xs: "h-8 px-2.5 rounded-md text-xs",
        sm: "h-9 px-3 rounded-md text-sm",
        md: "h-10 px-4 rounded-md text-sm",
        lg: "h-11 px-5 rounded-md text-base",
        xl: "h-12 px-6 rounded-md text-lg",
        icon: "h-10 w-10 rounded-full p-0",  // برای دکمه‌های آیکون
      },
      
      // وضعیت کشیدگی دکمه
      fullWidth: {
        true: "w-full",
      },
      
      // وضعیت گرد بودن دکمه
      rounded: {
        none: "rounded-none", 
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      
      // وضعیت در حال بارگذاری دکمه
      isLoading: {
        true: "opacity-80 pointer-events-none",
      },
      
      // وضعیت غیرفعال بودن دکمه
      disabled: {
        true: "opacity-50 pointer-events-none cursor-not-allowed",
      },
      
      // وضعیت انتخاب شده برای دکمه‌های toggle
      selected: {
        true: "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
      },
    },
    
    // پیش‌فرض‌های دکمه
    defaultVariants: {
      variant: "default",
      size: "md",
      fullWidth: false,
      rounded: "md",
      isLoading: false,
      disabled: false,
      selected: false,
    },
  }
);

// اکسپورت کردن تایپ تنظیمات دکمه برای استفاده در جاهای دیگر
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  // پراپس اضافی برای دکمه
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loadingText?: string;
  iconSpacing?: string;
  elevation?: "none" | "sm" | "md" | "lg";
}

/**
 * کامپوننت دکمه سیستم طراحی پرانا
 * یک دکمه همه‌منظوره با قابلیت تنظیم و استایل‌های متنوع
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    rounded, 
    isLoading, 
    disabled, 
    selected, 
    children, 
    leftIcon, 
    rightIcon, 
    loadingText, 
    iconSpacing = "mr-2", 
    elevation = "none",
    ...props 
  }, ref) => {
    // ایجاد کلاس‌های سایه براساس پارامتر elevation
    const shadowClasses = {
      none: "",
      sm: "shadow-sm hover:shadow",
      md: "shadow hover:shadow-md",
      lg: "shadow-md hover:shadow-lg",
    };
    
    return (
      <button
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
            fullWidth, 
            rounded, 
            isLoading, 
            disabled: disabled || isLoading, 
            selected, 
            className 
          }),
          shadowClasses[elevation]
        )}
        ref={ref}
        disabled={disabled || isLoading ? true : undefined}
        aria-disabled={disabled || isLoading ? true : undefined}
        data-state={
          isLoading ? "loading" : disabled ? "disabled" : selected ? "selected" : "idle"
        }
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full border-2 border-r-transparent border-current animate-spin" />
          </div>
        )}
        
        <span className={cn("flex items-center", isLoading && "opacity-0")}>
          {leftIcon && (
            <span className={cn("inline-flex", iconSpacing, "rtl:ml-2 rtl:mr-0")}>
              {leftIcon}
            </span>
          )}
          
          {children}
          
          {rightIcon && (
            <span className={cn("inline-flex", "ml-2", "rtl:mr-2 rtl:ml-0")}>
              {rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };