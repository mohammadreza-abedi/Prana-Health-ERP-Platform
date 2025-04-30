import React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
  blurIntensity?: number;
  glowEffect?: boolean;
  animation?: 'pulse' | 'float' | 'breathe' | 'none';
  border?: boolean;
  pattern?: 'dots' | 'grid' | 'noise' | 'none';
  colorScheme?: 'blue' | 'purple' | 'teal' | 'orange' | 'neutral';
  interactive?: boolean;
}

/**
 * کامپوننت پنل شیشه‌ای با افکت گلسمورفیسم
 * امکان تنظیم شدت بلور، افکت درخشش، انیمیشن، الگوی پترن و غیره
 */
export function GlassPanel({
  intensity = 'medium',
  className,
  children,
  hoverEffect = false,
  blurIntensity = 8,
  glowEffect = false,
  animation = 'none',
  border = true,
  pattern = 'none',
  colorScheme = 'blue',
  interactive = false,
  ...props
}: GlassPanelProps) {
  
  // تعیین شدت بلور براساس پارامتر intensity
  const blurMap = {
    light: blurIntensity,
    medium: blurIntensity * 1.5,
    heavy: blurIntensity * 2,
  };
  
  // تعیین رنگ‌ها براساس طرح رنگی انتخاب شده
  const colorMap = {
    blue: {
      bgLight: 'bg-blue-50/30 dark:bg-blue-900/20',
      bgDark: 'bg-blue-100/40 dark:bg-blue-800/30',
      border: 'border-blue-200/50 dark:border-blue-700/30',
      glow: 'before:bg-blue-400/20 dark:before:bg-blue-500/10',
      textAccent: 'text-blue-700 dark:text-blue-300',
    },
    purple: {
      bgLight: 'bg-purple-50/30 dark:bg-purple-900/20',
      bgDark: 'bg-purple-100/40 dark:bg-purple-800/30',
      border: 'border-purple-200/50 dark:border-purple-700/30',
      glow: 'before:bg-purple-400/20 dark:before:bg-purple-500/10',
      textAccent: 'text-purple-700 dark:text-purple-300',
    },
    teal: {
      bgLight: 'bg-teal-50/30 dark:bg-teal-900/20',
      bgDark: 'bg-teal-100/40 dark:bg-teal-800/30',
      border: 'border-teal-200/50 dark:border-teal-700/30',
      glow: 'before:bg-teal-400/20 dark:before:bg-teal-500/10',
      textAccent: 'text-teal-700 dark:text-teal-300',
    },
    orange: {
      bgLight: 'bg-orange-50/30 dark:bg-orange-900/20',
      bgDark: 'bg-orange-100/40 dark:bg-orange-800/30',
      border: 'border-orange-200/50 dark:border-orange-700/30',
      glow: 'before:bg-orange-400/20 dark:before:bg-orange-500/10',
      textAccent: 'text-orange-700 dark:text-orange-300',
    },
    neutral: {
      bgLight: 'bg-slate-50/30 dark:bg-slate-900/20',
      bgDark: 'bg-slate-100/40 dark:bg-slate-800/30',
      border: 'border-slate-200/50 dark:border-slate-700/30',
      glow: 'before:bg-slate-400/20 dark:before:bg-slate-500/10',
      textAccent: 'text-slate-700 dark:text-slate-300',
    },
  };
  
  // تعیین الگوی پترن
  const patternClasses = {
    dots: 'before:bg-[radial-gradient(circle,_rgba(255,255,255,0.2)_1px,_transparent_1px)] before:bg-[length:14px_14px]',
    grid: 'before:bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] before:bg-[size:14px_14px]',
    noise: 'before:bg-noise before:opacity-[0.05]',
    none: '',
  };
  
  // تعیین انیمیشن
  const animationClasses = {
    pulse: 'animate-pulse-subtle',
    float: 'animate-float',
    breathe: 'animate-breathe',
    none: '',
  };
  
  return (
    <div
      className={cn(
        'relative rounded-xl overflow-hidden backdrop-blur-md',
        border ? 'border' : '',
        colorMap[colorScheme].border,
        colorMap[colorScheme].bgLight,
        interactive ? 'transition-all duration-300' : '',
        hoverEffect ? `hover:${colorMap[colorScheme].bgDark} hover:shadow-lg hover:-translate-y-0.5` : '',
        glowEffect ? 'before:absolute before:inset-0 before:rounded-xl before:blur-xl before:opacity-40 before:-z-10' : '',
        glowEffect ? colorMap[colorScheme].glow : '',
        animationClasses[animation],
        patternClasses[pattern],
        className
      )}
      style={{ 
        backdropFilter: `blur(${blurMap[intensity]}px)`,
        WebkitBackdropFilter: `blur(${blurMap[intensity]}px)`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * کامپوننت کارت شیشه‌ای با افکت گلسمورفیسم
 */
export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <GlassPanel
      className={cn('p-6 transition-all duration-300 hover:shadow-xl', className)}
      intensity="medium"
      hoverEffect={true}
      glowEffect={true}
      border={true}
      interactive={true}
      {...props}
    >
      {children}
    </GlassPanel>
  );
}

/**
 * کامپوننت دکمه شیشه‌ای با افکت گلسمورفیسم
 */
export function GlassButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'relative overflow-hidden backdrop-blur-md bg-white/20 dark:bg-slate-900/20 border border-white/30 dark:border-slate-700/30',
        'px-4 py-2 rounded-lg text-sm font-medium',
        'transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
        'active:translate-y-0 active:scale-[0.98]',
        'before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        'after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:transition-opacity after:bg-glow-spread hover:after:opacity-30',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/**
 * کامپوننت نوار جداکننده شیشه‌ای
 */
export function GlassDivider({
  className,
  vertical = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { vertical?: boolean }) {
  return (
    <div
      className={cn(
        'backdrop-blur-sm',
        vertical
          ? 'h-auto w-px bg-gradient-to-b from-transparent via-gray-200/50 dark:via-gray-700/30 to-transparent'
          : 'h-px w-full bg-gradient-to-r from-transparent via-gray-200/50 dark:via-gray-700/30 to-transparent',
        className
      )}
      {...props}
    />
  );
}

// اضافه کردن افکت‌های جدید به global styles
if (typeof document !== 'undefined') {
  // اضافه کردن استایل نویز به صفحه اگر از قبل وجود نداشته باشد
  if (!document.getElementById('glass-effects-style')) {
    const style = document.createElement('style');
    style.id = 'glass-effects-style';
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.01); }
      }
      
      @keyframes pulse-subtle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.9; }
      }
      
      .animate-float {
        animation: float 4s ease-in-out infinite;
      }
      
      .animate-breathe {
        animation: breathe 5s ease-in-out infinite;
      }
      
      .animate-pulse-subtle {
        animation: pulse-subtle 3s ease-in-out infinite;
      }
      
      .bg-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      }
      
      .bg-glow-spread {
        background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
      }
    `;
    document.head.appendChild(style);
  }
}