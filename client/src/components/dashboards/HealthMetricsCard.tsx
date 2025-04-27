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
  Dumbbell
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

// Define variants for card styling
const metricCardVariants = cva('relative overflow-hidden transition-all duration-500 ease-out hover:shadow-lg', {
  variants: {
    color: {
      tiffany: 'border-tiffany/20 dark:border-tiffany/30',
      navy: 'border-navy/20 dark:border-navy/30',
      aqua: 'border-aqua/20 dark:border-aqua/30',
      yellow: 'border-yellow/20 dark:border-yellow/30',
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

const trendBadgeVariants = cva('px-2 py-0.5 text-xs font-medium flex items-center gap-1 rounded-full', {
  variants: {
    impact: {
      positive: 'bg-success-lighter text-success dark:bg-success/20 dark:text-success-light',
      negative: 'bg-error-lighter text-error dark:bg-error/20 dark:text-error-light',
      neutral: 'bg-info-lighter text-info dark:bg-info/20 dark:text-info-light',
    },
  },
  defaultVariants: {
    impact: 'neutral',
  },
});

const renderIcon = (category: HealthMetricData['category'], color: HealthMetricData['color'] = 'tiffany', size = 20) => {
  const iconClass = `text-${color} dark:text-${color}-light`;
  
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
      return <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>;
    case 'down':
      return <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>;
    default:
      return <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
      </svg>;
  }
};

interface HealthMetricsCardProps {
  metric: HealthMetricData;
  variant?: 'default' | 'premium';
  className?: string;
  onClick?: () => void;
}

export function HealthMetricsCard({ metric, variant = 'default', className = '', onClick }: HealthMetricsCardProps) {
  const { title, value, unit, category, trend, goal, insights, color = 'tiffany' } = metric;
  const cardClasses = metricCardVariants({ color, variant });
  
  const formattedValue = typeof value === 'number' ? value.toLocaleString('fa-IR') : value;
  const formattedDate = metric.timestamp ? new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(metric.timestamp) : '';
  
  const progressPercent = goal ? (goal.current / goal.target) * 100 : undefined;
  
  return (
    <Card 
      className={`pro-card ${cardClasses} ${className} cursor-pointer`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-${color}/10 dark:bg-${color}/15`}>
              {renderIcon(category, color)}
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              {formattedDate && (
                <CardDescription className="text-xs mt-0.5">
                  {formattedDate}
                </CardDescription>
              )}
            </div>
          </div>
          
          {trend && (
            <Badge className={trendBadgeVariants({ impact: trend.impact })}>
              {renderTrendIndicator(trend.direction)}
              <span>{trend.value}%</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="mt-1 space-y-3">
          <div className="flex items-end">
            <span className="text-2xl font-bold">{formattedValue}</span>
            {unit && <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">{unit}</span>}
          </div>
          
          {goal && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">هدف</span>
                <span className="font-medium">{goal.current} / {goal.target} {goal.unit}</span>
              </div>
              <Progress value={progressPercent} className={`h-1.5 bg-${color}/10 dark:bg-${color}/5`} 
                indicatorClassName={`bg-${color} dark:bg-${color}-light`} />
            </div>
          )}
          
          {insights && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 font-light">
              {insights}
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <button className={`text-${color} dark:text-${color}-light text-xs flex items-center mt-3 hover:underline focus:outline-none transition-colors`}>
          <span>جزئیات بیشتر</span>
          <ChevronRight className="h-3 w-3 mr-1" />
        </button>
      </CardFooter>
    </Card>
  );
}

export function HealthMetricsGrid({ metrics, variant = 'default' }: { metrics: HealthMetricData[], variant?: 'default' | 'premium' }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map(metric => (
        <HealthMetricsCard 
          key={metric.id} 
          metric={metric} 
          variant={variant}
        />
      ))}
    </div>
  );
}