import React from 'react';
import { cn } from '@/lib/utils';
import { GlassPanel } from './glassmorphism';
import { motion, MotionProps } from 'framer-motion';
import { Badge } from './badge';

interface AdvancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  withBadge?: boolean;
  badgeText?: string;
  badgeVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'warning';
  withImage?: boolean;
  imageUrl?: string;
  icon?: React.ReactNode;
  glass?: boolean;
  glassDark?: boolean;
  hoverEffect?: boolean;
  glowEffect?: boolean;
  animateOnHover?: boolean;
  withRibbon?: boolean;
  ribbonText?: string;
  ribbonColor?: string;
  bordered?: boolean;
  elevated?: boolean;
  loading?: boolean;
  interactive?: boolean;
  colorAccent?: 'blue' | 'green' | 'amber' | 'red' | 'purple' | 'teal' | 'indigo' | 'none';
  withAnimation?: boolean;
  withMotion?: boolean;
  motionProps?: MotionProps;
  children: React.ReactNode;
}

/**
 * کارت پیشرفته با انیمیشن، افکت‌های گلس، هاور، روبان و امکانات نمایشی متنوع
 */
export function AdvancedCard({
  className,
  title,
  subtitle,
  withBadge = false,
  badgeText = 'جدید',
  badgeVariant = 'default',
  withImage = false,
  imageUrl,
  icon,
  glass = false,
  glassDark = false,
  hoverEffect = true,
  glowEffect = false,
  animateOnHover = false,
  withRibbon = false,
  ribbonText = 'ویژه',
  ribbonColor = 'bg-teal-500',
  bordered = true,
  elevated = false,
  loading = false,
  interactive = false,
  colorAccent = 'none',
  withAnimation = false,
  withMotion = false,
  motionProps,
  children,
  ...props
}: AdvancedCardProps) {
  // Color accent classes based on the selected color
  const colorAccentStyles = {
    none: '',
    blue: 'border-l-4 border-l-blue-500 dark:border-l-blue-400',
    green: 'border-l-4 border-l-green-500 dark:border-l-green-400',
    amber: 'border-l-4 border-l-amber-500 dark:border-l-amber-400',
    red: 'border-l-4 border-l-red-500 dark:border-l-red-400',
    purple: 'border-l-4 border-l-purple-500 dark:border-l-purple-400',
    teal: 'border-l-4 border-l-teal-500 dark:border-l-teal-400',
    indigo: 'border-l-4 border-l-indigo-500 dark:border-l-indigo-400',
  };

  // Basic card styles
  const baseStyles = cn(
    'relative rounded-xl overflow-hidden',
    bordered && !glass ? 'border border-gray-200 dark:border-gray-800' : '',
    elevated && !glass ? 'shadow-md hover:shadow-xl transition-shadow duration-300' : '',
    hoverEffect && !glass ? 'hover:-translate-y-1 transition-transform duration-300' : '',
    loading ? 'animate-pulse' : '',
    interactive ? 'cursor-pointer' : '',
    colorAccentStyles[colorAccent],
    glass || glassDark ? '' : 'bg-white dark:bg-gray-900'
  );

  // Content styles
  const contentStyles = cn(
    'p-4'
  );

  // Render card content
  const renderCardContent = () => (
    <>
      {/* Ribbon */}
      {withRibbon && (
        <div className={`absolute top-0 right-0 z-10 ${ribbonColor} text-white px-3 py-1 shadow-md transform translate-x-8 translate-y-2 rotate-45`}>
          <span className="text-xs font-semibold">{ribbonText}</span>
        </div>
      )}

      {/* Badge */}
      {withBadge && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant={badgeVariant} className="shadow-sm">
            {badgeText}
          </Badge>
        </div>
      )}

      {/* Image Section */}
      {withImage && imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title || "کارت تصویری"} 
            className={`w-full h-full object-cover transform ${animateOnHover ? 'group-hover:scale-110 transition-transform duration-700' : ''}`} 
          />
        </div>
      )}

      {/* Content Section */}
      <div className={contentStyles}>
        {/* Header */}
        {(title || icon) && (
          <div className="flex items-center mb-3">
            {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
            <div>
              {title && <h3 className="font-bold text-xl">{title}</h3>}
              {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{subtitle}</p>}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`${(title || icon) ? 'mt-4' : ''}`}>
          {children}
        </div>
      </div>
    </>
  );

  // If using glass effect
  if (glass) {
    return (
      <GlassPanel
        className={cn(baseStyles, className)}
        intensity="medium"
        hoverEffect={hoverEffect}
        glowEffect={glowEffect}
        animation={animateOnHover ? "breathe" : "none"}
        border={bordered}
        colorScheme={colorAccent !== 'none' ? colorAccent as any : 'blue'}
        interactive={interactive}
        {...props}
      >
        <div className={cn("group", interactive ? "cursor-pointer" : "")}>
          {renderCardContent()}
        </div>
      </GlassPanel>
    );
  }

  // If using motion
  if (withMotion) {
    return (
      <motion.div
        className={cn(baseStyles, className, "group")}
        whileHover={animateOnHover ? { y: -5 } : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...motionProps}
        {...props}
      >
        {renderCardContent()}
      </motion.div>
    );
  }

  // Standard card
  return (
    <div 
      className={cn(
        baseStyles, 
        className,
        "group",
        withAnimation ? 'transform transition-all duration-300' : '',
        glassDark ? 'bg-black/30 backdrop-blur-lg border border-white/10' : ''
      )} 
      {...props}
    >
      {renderCardContent()}
      
      {glowEffect && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity rounded-xl"></div>
      )}
    </div>
  );
}

/**
 * کارت شیشه‌ای با افکت گلسمورفیسم
 */
export function GlassCard({
  className,
  children,
  ...props
}: Omit<AdvancedCardProps, 'glass'>) {
  return (
    <AdvancedCard
      glass={true}
      glowEffect={true}
      hoverEffect={true}
      className={className}
      {...props}
    >
      {children}
    </AdvancedCard>
  );
}

/**
 * کارت با انیمیشن موشن برای محیط‌های تعاملی و پویا
 */
export function MotionCard({
  className,
  children,
  ...props
}: Omit<AdvancedCardProps, 'withMotion'>) {
  return (
    <AdvancedCard
      withMotion={true}
      animateOnHover={true}
      interactive={true}
      elevated={true}
      className={className}
      {...props}
    >
      {children}
    </AdvancedCard>
  );
}

/**
 * کارت ویژگی با آیکون و افکت‌های مناسب برای نمایش ویژگی‌های محصول
 */
export function FeatureCard({
  className,
  title,
  icon,
  children,
  colorAccent = 'blue',
  ...props
}: Omit<AdvancedCardProps, 'withMotion' | 'glass'>) {
  return (
    <motion.div
      className={cn("group", className)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <AdvancedCard
        title={title}
        icon={icon}
        colorAccent={colorAccent}
        bordered={true}
        elevated={true}
        className={cn("h-full transition-all duration-300", className)}
        {...props}
      >
        <div className="text-gray-600 dark:text-gray-300">
          {children}
        </div>
      </AdvancedCard>
    </motion.div>
  );
}

/**
 * کارت غیرشفاف تیره با افکت بلور برای محیط‌های تاریک
 */
export function DarkGlassCard({
  className,
  children,
  ...props
}: Omit<AdvancedCardProps, 'glassDark'>) {
  return (
    <AdvancedCard
      glassDark={true}
      glowEffect={true}
      hoverEffect={true}
      className={cn("text-white", className)}
      {...props}
    >
      {children}
    </AdvancedCard>
  );
}