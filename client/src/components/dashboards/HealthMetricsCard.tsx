import React from 'react';
import { 
  Heart, 
  Activity, 
  Droplets, 
  Scale, 
  Moon, 
  ChevronRight, 
  Flame, 
  Footprints,
  Dumbbell,
  CheckCircle2,
  BarChart3,
  Sparkles,
  TrendingUp,
  ClipboardCheck,
  Clock
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// Define metric trend types
type TrendDirection = 'up' | 'down' | 'neutral';
type TrendImpact = 'positive' | 'negative' | 'neutral';

// Define interface for health metric data
export interface HealthMetricData {
  id: string;
  title: string;
  value: number | string;
  unit?: string;
  category: 'heart' | 'activity' | 'water' | 'weight' | 'sleep' | 'calories' | 'steps' | 'exercise' | 'custom';
  trend?: {
    direction: TrendDirection;
    value: number;
    impact: TrendImpact;
    description?: string;
  };
  goal?: {
    current: number;
    target: number;
    unit?: string;
  };
  timestamp?: Date;
  insights?: string;
  color?: 'tiffany' | 'navy' | 'aqua' | 'yellow' | 'success' | 'error' | 'info';
}

// نقشه رنگ‌ها
const colorStyles: Record<string, {
  bg: string,
  bgHover: string,
  bgLight: string,
  text: string,
  textLight: string,
  border: string,
  gradient: string,
  shadow: string
}> = {
  tiffany: {
    bg: 'bg-tiffany',
    bgHover: 'hover:bg-tiffany-hover',
    bgLight: 'bg-tiffany/10 dark:bg-tiffany/15',
    text: 'text-tiffany',
    textLight: 'dark:text-tiffany-light',
    border: 'border-tiffany/20 dark:border-tiffany/30',
    gradient: 'from-tiffany to-cyan-500',
    shadow: 'shadow-tiffany/10'
  },
  navy: {
    bg: 'bg-navy',
    bgHover: 'hover:bg-navy-hover',
    bgLight: 'bg-navy/10 dark:bg-navy/15',
    text: 'text-navy',
    textLight: 'dark:text-navy-light',
    border: 'border-navy/20 dark:border-navy/30',
    gradient: 'from-navy to-blue-600',
    shadow: 'shadow-navy/10'
  },
  aqua: {
    bg: 'bg-aqua',
    bgHover: 'hover:bg-aqua-hover',
    bgLight: 'bg-aqua/10 dark:bg-aqua/15',
    text: 'text-aqua',
    textLight: 'dark:text-aqua-light',
    border: 'border-aqua/20 dark:border-aqua/30',
    gradient: 'from-aqua to-blue-500',
    shadow: 'shadow-aqua/10'
  },
  yellow: {
    bg: 'bg-yellow-500',
    bgHover: 'hover:bg-yellow-600',
    bgLight: 'bg-yellow-500/10 dark:bg-yellow-500/15',
    text: 'text-yellow-500',
    textLight: 'dark:text-yellow-400',
    border: 'border-yellow-500/20 dark:border-yellow-500/30',
    gradient: 'from-yellow-500 to-amber-500',
    shadow: 'shadow-yellow-500/10'
  },
  success: {
    bg: 'bg-success',
    bgHover: 'hover:bg-success-hover',
    bgLight: 'bg-success/10 dark:bg-success/15',
    text: 'text-success',
    textLight: 'dark:text-success-light',
    border: 'border-success/20 dark:border-success/30',
    gradient: 'from-success to-emerald-500',
    shadow: 'shadow-success/10'
  },
  error: {
    bg: 'bg-error',
    bgHover: 'hover:bg-error-hover',
    bgLight: 'bg-error/10 dark:bg-error/15',
    text: 'text-error',
    textLight: 'dark:text-error-light',
    border: 'border-error/20 dark:border-error/30',
    gradient: 'from-error to-rose-500',
    shadow: 'shadow-error/10'
  },
  info: {
    bg: 'bg-info',
    bgHover: 'hover:bg-info-hover',
    bgLight: 'bg-info/10 dark:bg-info/15',
    text: 'text-info',
    textLight: 'dark:text-info-light',
    border: 'border-info/20 dark:border-info/30',
    gradient: 'from-info to-blue-500',
    shadow: 'shadow-info/10'
  }
};

// Define variants for card styling
const metricCardVariants = cva('relative overflow-hidden transition-all duration-500 ease-out', {
  variants: {
    color: {
      tiffany: 'border-tiffany/20 dark:border-tiffany/30',
      navy: 'border-navy/20 dark:border-navy/30',
      aqua: 'border-aqua/20 dark:border-aqua/30',
      yellow: 'border-yellow-500/20 dark:border-yellow-500/30',
      success: 'border-success/20 dark:border-success/30',
      error: 'border-error/20 dark:border-error/30',
      info: 'border-info/20 dark:border-info/30',
    },
    variant: {
      default: '',
      premium: 'pro-card premium',
    },
  },
  defaultVariants: {
    color: 'tiffany',
    variant: 'default',
  },
});

const trendBadgeVariants = cva('px-2 py-1 text-xs font-medium flex items-center gap-1 rounded-full backdrop-blur-sm shadow-sm', {
  variants: {
    impact: {
      positive: 'bg-success/10 text-success dark:bg-success/20 dark:text-success-light',
      negative: 'bg-error/10 text-error dark:bg-error/20 dark:text-error-light',
      neutral: 'bg-info/10 text-info dark:bg-info/20 dark:text-info-light',
    },
  },
  defaultVariants: {
    impact: 'neutral',
  },
});

// کامپوننت آیکون انیمیشن‌دار
const AnimatedIcon = ({ category, color }: { category: HealthMetricData['category'], color: HealthMetricData['color'] }) => {
  const colorStyle = colorStyles[color || 'tiffany'];
  const iconClass = cn(colorStyle.text, colorStyle.textLight, "drop-shadow");
  const size = 22;
  
  // انیمیشن بر اساس نوع آیکون
  const getAnimationProps = () => {
    switch(category) {
      case 'heart':
        return {
          animate: { scale: [1, 1.15, 1], opacity: [1, 1, 1] },
          transition: { duration: 1.3, repeat: Infinity }
        };
      case 'activity':
      case 'steps':
      case 'exercise':
        return {
          animate: { y: [0, -2, 0], opacity: [1, 1, 1] },
          transition: { duration: 2, repeat: Infinity }
        };
      case 'water':
        return {
          animate: { rotate: [0, 5, 0, -5, 0], y: [0, -1, 0] },
          transition: { duration: 3, repeat: Infinity }
        };
      default:
        return {
          animate: { rotate: [0, 3, 0, -3, 0] },
          transition: { duration: 5, repeat: Infinity }
        };
    }
  };

  return (
    <motion.div {...getAnimationProps()}>
      {renderIcon(category, color, size)}
    </motion.div>
  );
};

const renderIcon = (category: HealthMetricData['category'], color: HealthMetricData['color'] = 'tiffany', size = 20) => {
  const colorStyle = colorStyles[color];
  const iconClass = cn(colorStyle.text, colorStyle.textLight);
  
  switch (category) {
    case 'heart':
      return <Heart className={iconClass} size={size} />;
    case 'activity':
      return <Activity className={iconClass} size={size} />;
    case 'water':
      return <Droplets className={iconClass} size={size} />;
    case 'weight':
      return <Scale className={iconClass} size={size} />;
    case 'sleep':
      return <Moon className={iconClass} size={size} />;
    case 'calories':
      return <Flame className={iconClass} size={size} />;
    case 'steps':
      return <Footprints className={iconClass} size={size} />;
    case 'exercise':
      return <Dumbbell className={iconClass} size={size} />;
    default:
      return <Activity className={iconClass} size={size} />;
  }
};

const renderTrendIndicator = (direction: TrendDirection) => {
  switch (direction) {
    case 'up':
      return (
        <motion.div
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </motion.div>
      );
    case 'down':
      return (
        <motion.div
          animate={{ y: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      );
    default:
      return <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
      </svg>;
  }
};

// کامپوننت برای نقاط متحرک تزئینی
const FloatingDot = ({ delay, size = 4, color = "bg-white/20", right, bottom }: { 
  delay: number, 
  size?: number, 
  color?: string, 
  right: number, 
  bottom: number 
}) => (
  <motion.div 
    className={`absolute w-${size} h-${size} rounded-full ${color}`}
    style={{ right: `${right}px`, bottom: `${bottom}px` }}
    animate={{ 
      y: [0, -10, 0],
      opacity: [0, 0.5, 0],
    }}
    transition={{ 
      duration: 3, 
      delay: delay,
      repeat: Infinity,
      repeatDelay: 1
    }}
  />
);

// کامپوننت برای افکت شیار متحرک روی پیشرفت
const ProgressGlowEffect = ({ progressPercent }: { progressPercent?: number }) => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div 
      className="w-10 h-full bg-white/30"
      animate={{ x: ['-100%', '300%'] }}
      transition={{ 
        duration: 1.5, 
        ease: "easeInOut", 
        repeat: Infinity,
        repeatDelay: 0.5
      }}
      style={{ 
        clipPath: `inset(0 0 0 ${100 - Math.min(progressPercent || 0, 100)}%)`
      }}
    />
  </div>
);

interface HealthMetricsCardProps {
  metric: HealthMetricData;
  variant?: 'default' | 'premium';
  className?: string;
  onClick?: () => void;
}

export function HealthMetricsCard({ metric, variant = 'default', className = '', onClick }: HealthMetricsCardProps) {
  const { title, value, unit, category, trend, goal, insights, color = 'tiffany' } = metric;
  const colorStyle = colorStyles[color];
  const cardClasses = metricCardVariants({ color, variant });
  
  const formattedValue = typeof value === 'number' ? value.toLocaleString('fa-IR') : value;
  const formattedDate = metric.timestamp ? new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(metric.timestamp) : '';
  
  const progressPercent = goal ? (goal.current / goal.target) * 100 : undefined;
  const isTargetReached = goal && goal.current >= goal.target;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card 
        className={`${cardClasses} ${className} cursor-pointer relative overflow-hidden
          backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50
          bg-white/70 dark:bg-slate-900/70 group-hover:shadow-lg group-hover:${colorStyle.shadow}
          dark:group-hover:${colorStyle.shadow} transition-all duration-500`}
        onClick={onClick}
      >
        {/* افکت پیش زمینه گرادیان */}
        <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${colorStyle.gradient}/5 rounded-full blur-3xl opacity-30 group-hover:opacity-40 transition-opacity`}></div>
        <div className={`absolute -bottom-12 -left-12 w-30 h-30 bg-gradient-to-tr ${colorStyle.gradient}/5 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`}></div>
        
        {/* افکت پترن پس زمینه */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTS0xMyAxM2gyNnYyNmgtMjZ6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-30"></div>
        
        {/* خط تزئینی بالا */}
        <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden z-10">
          <div className={`h-full w-full bg-gradient-to-r from-transparent via-${color}/30 to-transparent`}></div>
          <motion.div 
            className={`absolute top-0 h-full w-16 bg-gradient-to-r from-transparent via-${color}/70 to-transparent`}
            animate={{ x: ['-100%', '500%'] }}
            transition={{ 
              duration: 3, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatDelay: 1
            }}
          />
        </div>
        
        {/* نقاط شناور تزئینی */}
        <FloatingDot delay={0} right={20} bottom={20} color={`${colorStyle.bgLight}`} />
        <FloatingDot delay={1.5} size={3} right={45} bottom={35} color={`${colorStyle.bgLight}`} />
        
        {/* نشان هدف محقق شده */}
        {isTargetReached && (
          <div className="absolute top-2 left-2 z-20">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20, 
                delay: 0.2 
              }}
              className="bg-success/10 dark:bg-success/20 p-1 rounded-full"
            >
              <CheckCircle2 className="h-4 w-4 text-success dark:text-success-light" />
            </motion.div>
          </div>
        )}
        
        <div className="relative z-10">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className={`relative p-2.5 rounded-xl ${colorStyle.bgLight} shadow-sm group-hover:shadow-md transition-shadow duration-300`}>
                  <AnimatedIcon category={category} color={color} />
                  
                  {/* حلقه متحرک */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl"
                    animate={{ 
                      boxShadow: [
                        `0 0 0 0 rgba(0, 0, 0, 0)`,
                        `0 0 0 2px ${color === 'tiffany' ? 'rgba(45, 212, 191, 0.2)' : 
                          color === 'aqua' ? 'rgba(56, 189, 248, 0.2)' : 
                          color === 'navy' ? 'rgba(30, 64, 175, 0.2)' : 
                          color === 'yellow' ? 'rgba(234, 179, 8, 0.2)' : 
                          color === 'success' ? 'rgba(34, 197, 94, 0.2)' : 
                          color === 'error' ? 'rgba(239, 68, 68, 0.2)' : 
                          'rgba(14, 165, 233, 0.2)'}`,
                        `0 0 0 0 rgba(0, 0, 0, 0)`
                      ]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      ease: "easeInOut", 
                      repeat: Infinity
                    }}
                  />
                </div>
                
                <div>
                  <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
                    {title}
                  </CardTitle>
                  {formattedDate && (
                    <CardDescription className="text-xs mt-0.5 flex items-center">
                      <Clock className="h-3 w-3 ml-1 text-slate-400" />
                      {formattedDate}
                    </CardDescription>
                  )}
                </div>
              </div>
              
              {trend && (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge className={trendBadgeVariants({ impact: trend.impact })}>
                    {renderTrendIndicator(trend.direction)}
                    <span>{trend.value}%</span>
                  </Badge>
                </motion.div>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            <div className="mt-2 space-y-3">
              <motion.div 
                className="flex items-end"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.span 
                  className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorStyle.gradient}`}
                  animate={{ scale: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {formattedValue}
                </motion.span>
                {unit && <span className="text-sm text-gray-500 dark:text-gray-400 mr-1 mb-1">{unit}</span>}
              </motion.div>
              
              {goal && (
                <motion.div 
                  className="space-y-2 bg-white/30 dark:bg-slate-800/30 p-2 rounded-lg backdrop-blur-sm"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-300 font-medium flex items-center">
                      <ClipboardCheck className="h-3 w-3 ml-1 text-gray-500 dark:text-gray-400" />
                      هدف
                    </span>
                    <span className={`font-semibold ${isTargetReached ? 'text-success dark:text-success-light' : 'text-gray-700 dark:text-gray-200'}`}>
                      {goal.current.toLocaleString('fa-IR')} / {goal.target.toLocaleString('fa-IR')} {goal.unit}
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={progressPercent} 
                      className={`h-2 ${colorStyle.bgLight} rounded-full overflow-hidden`} 
                      indicatorClassName={`bg-gradient-to-r ${colorStyle.gradient} rounded-full`} 
                    />
                    <ProgressGlowEffect progressPercent={progressPercent} />
                  </div>
                </motion.div>
              )}
              
              {insights && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-2"
                >
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-light relative bg-white/30 dark:bg-slate-800/30 p-2 rounded-lg backdrop-blur-sm">
                    <div className="absolute top-0 right-0 w-10 h-10 -mt-1 -mr-1 opacity-10">
                      <BarChart3 className="w-full h-full text-gray-400" />
                    </div>
                    <p className="relative z-10">{insights}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="pt-0">
            <motion.button 
              whileHover={{ x: 3 }}
              className={`${colorStyle.text} ${colorStyle.textLight} text-xs flex items-center mt-3 group/btn focus:outline-none transition-colors`}
            >
              <span className="group-hover/btn:underline">جزئیات بیشتر</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <ChevronRight className="h-3.5 w-3.5 mr-1" />
              </motion.div>
            </motion.button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}

export function HealthMetricsGrid({ metrics, variant = 'default' }: { metrics: HealthMetricData[], variant?: 'default' | 'premium' }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.08 * index
          }}
        >
          <HealthMetricsCard 
            metric={metric} 
            variant={variant}
          />
        </motion.div>
      ))}
    </div>
  );
}