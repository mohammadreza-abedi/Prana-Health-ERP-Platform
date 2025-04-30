import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Check } from 'lucide-react';

interface AdvancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'outline'
    | 'glass'
    | 'gradient'
    | 'soft'
    | 'shine'
    | 'neon'
    | 'blur';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  success?: boolean;
  ripple?: boolean;
  hoverScale?: boolean;
  pulse?: boolean;
  glow?: boolean;
  outlined?: boolean;
  colorScheme?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'teal' | 'indigo';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * دکمه پیشرفته با قابلیت‌های متنوع و افکت‌های جذاب
 */
export function AdvancedButton({
  className,
  variant = 'primary',
  size = 'md',
  rounded = 'md',
  loading = false,
  success = false,
  icon,
  iconPosition = 'left',
  ripple = true,
  hoverScale = true,
  pulse = false,
  glow = false,
  outlined = false,
  colorScheme = 'blue',
  onClick,
  children,
  ...props
}: AdvancedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [isRippling, setIsRippling] = useState(false);

  // رنگ‌بندی برای واریانت‌های مختلف
  const colorSchemes = {
    blue: {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white',
      soft: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
      outline: 'border-blue-500 text-blue-600 hover:bg-blue-50',
      ghost: 'text-blue-600 hover:bg-blue-50',
      neon: 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]',
      blur: 'bg-blue-600/80 backdrop-blur-md text-white',
    },
    green: {
      primary: 'bg-green-600 hover:bg-green-700 text-white',
      secondary: 'bg-green-100 hover:bg-green-200 text-green-800',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white',
      soft: 'bg-green-50 hover:bg-green-100 text-green-700',
      outline: 'border-green-500 text-green-600 hover:bg-green-50',
      ghost: 'text-green-600 hover:bg-green-50',
      neon: 'bg-green-600 text-white shadow-[0_0_15px_rgba(22,163,74,0.5)]',
      blur: 'bg-green-600/80 backdrop-blur-md text-white',
    },
    amber: {
      primary: 'bg-amber-500 hover:bg-amber-600 text-white',
      secondary: 'bg-amber-100 hover:bg-amber-200 text-amber-800',
      gradient: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white',
      soft: 'bg-amber-50 hover:bg-amber-100 text-amber-700',
      outline: 'border-amber-500 text-amber-600 hover:bg-amber-50',
      ghost: 'text-amber-600 hover:bg-amber-50',
      neon: 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]',
      blur: 'bg-amber-500/80 backdrop-blur-md text-white',
    },
    red: {
      primary: 'bg-red-600 hover:bg-red-700 text-white',
      secondary: 'bg-red-100 hover:bg-red-200 text-red-800',
      gradient: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white',
      soft: 'bg-red-50 hover:bg-red-100 text-red-700',
      outline: 'border-red-500 text-red-600 hover:bg-red-50',
      ghost: 'text-red-600 hover:bg-red-50',
      neon: 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]',
      blur: 'bg-red-600/80 backdrop-blur-md text-white',
    },
    purple: {
      primary: 'bg-purple-600 hover:bg-purple-700 text-white',
      secondary: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
      gradient: 'bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white',
      soft: 'bg-purple-50 hover:bg-purple-100 text-purple-700',
      outline: 'border-purple-500 text-purple-600 hover:bg-purple-50',
      ghost: 'text-purple-600 hover:bg-purple-50',
      neon: 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]',
      blur: 'bg-purple-600/80 backdrop-blur-md text-white',
    },
    teal: {
      primary: 'bg-teal-600 hover:bg-teal-700 text-white',
      secondary: 'bg-teal-100 hover:bg-teal-200 text-teal-800',
      gradient: 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white',
      soft: 'bg-teal-50 hover:bg-teal-100 text-teal-700',
      outline: 'border-teal-500 text-teal-600 hover:bg-teal-50',
      ghost: 'text-teal-600 hover:bg-teal-50',
      neon: 'bg-teal-600 text-white shadow-[0_0_15px_rgba(13,148,136,0.5)]',
      blur: 'bg-teal-600/80 backdrop-blur-md text-white',
    },
    indigo: {
      primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      secondary: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800',
      gradient: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white',
      soft: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700',
      outline: 'border-indigo-500 text-indigo-600 hover:bg-indigo-50',
      ghost: 'text-indigo-600 hover:bg-indigo-50',
      neon: 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]',
      blur: 'bg-indigo-600/80 backdrop-blur-md text-white',
    },
  };

  // سایزهای مختلف دکمه
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
    icon: 'p-2',
  };

  // گرد بودن گوشه‌های دکمه
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // افکت ریپل برای دکمه‌ها
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button || !ripple) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    setRippleStyle({
      width: `${size}px`,
      height: `${size}px`,
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
    });

    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 600);
  };

  // اضافه کردن بازخورد لمسی به دکمه
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleRipple(e);
    if (onClick) onClick(e);
  };

  // انتخاب واریانت و سایز
  const variantStyle = variant === 'glass' 
    ? 'bg-white/10 backdrop-blur-md border border-white/20 dark:bg-slate-900/10 dark:border-slate-700/20'
    : variant === 'shine'
      ? 'relative overflow-hidden bg-gradient-to-r before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shine'
      : variant === 'accent'
        ? colorSchemes[colorScheme].primary // اگر واریانت accent باشد، از primary استفاده می‌کنیم
        : colorSchemes[colorScheme][variant as keyof typeof colorSchemes[typeof colorScheme]];

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        'relative flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none overflow-hidden',
        variantStyle,
        sizeClasses[size],
        roundedClasses[rounded],
        hoverScale ? 'hover:scale-105 active:scale-100' : '',
        pulse ? 'animate-pulse' : '',
        glow ? `after:absolute after:inset-0 after:rounded-inherit after:bg-white/20 after:opacity-0 hover:after:opacity-100 after:transition-opacity` : '',
        outlined ? 'border-2' : variant === 'outline' ? 'border' : '',
        'transform transition-transform',
        loading || success ? 'relative text-transparent' : '',
        className
      )}
      disabled={loading || success || props.disabled}
      {...props}
    >
      {/* آیکون سمت راست */}
      {icon && iconPosition === 'left' && (
        <span className={`mr-2 ${loading || success ? 'invisible' : ''}`}>{icon}</span>
      )}
      
      {/* متن دکمه */}
      <span className={loading || success ? 'opacity-0' : ''}>{children}</span>
      
      {/* آیکون سمت چپ */}
      {icon && iconPosition === 'right' && (
        <span className={`ml-2 ${loading || success ? 'invisible' : ''}`}>{icon}</span>
      )}
      
      {/* انیمیشن لودینگ */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin h-5 w-5" />
        </span>
      )}
      
      {/* آیکون موفقیت */}
      {success && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Check className="h-5 w-5" />
        </span>
      )}
      
      {/* افکت ریپل */}
      {isRippling && (
        <span
          className="absolute rounded-full bg-white/30 animate-ripple"
          style={rippleStyle}
        />
      )}
    </button>
  );
}

/**
 * دکمه گرادیانتی با افکت‌های بصری پیشرفته
 */
export function GradientButton({
  className,
  children,
  colorScheme = 'blue',
  ...props
}: Omit<AdvancedButtonProps, 'variant'>) {
  return (
    <AdvancedButton
      variant="gradient"
      hoverScale={true}
      glow={true}
      ripple={true}
      colorScheme={colorScheme}
      className={cn(className)}
      {...props}
    >
      {children}
    </AdvancedButton>
  );
}

/**
 * دکمه شیشه‌ای با افکت گلسمورفیسم
 */
export function GlassButton({
  className,
  children,
  ...props
}: Omit<AdvancedButtonProps, 'variant'>) {
  return (
    <AdvancedButton
      variant="glass"
      ripple={true}
      hoverScale={true}
      className={cn('backdrop-blur-md', className)}
      {...props}
    >
      {children}
    </AdvancedButton>
  );
}

/**
 * دکمه نئونی با افکت درخشش
 */
export function NeonButton({
  className,
  children,
  colorScheme = 'blue',
  ...props
}: Omit<AdvancedButtonProps, 'variant'>) {
  return (
    <AdvancedButton
      variant="neon"
      colorScheme={colorScheme}
      glow={true}
      ripple={true}
      className={cn(className)}
      {...props}
    >
      {children}
    </AdvancedButton>
  );
}

// اضافه کردن استایل‌های مورد نیاز برای افکت‌های دکمه
if (typeof document !== 'undefined') {
  if (!document.getElementById('advanced-button-style')) {
    const style = document.createElement('style');
    style.id = 'advanced-button-style';
    style.textContent = `
      @keyframes ripple {
        from {
          transform: scale(0);
          opacity: 0.8;
        }
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      @keyframes shine {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(100%);
        }
      }
      
      .animate-ripple {
        animation: ripple 0.6s linear;
      }
      
      .animate-shine:before {
        animation: shine 1.5s infinite;
      }
    `;
    document.head.appendChild(style);
  }
}