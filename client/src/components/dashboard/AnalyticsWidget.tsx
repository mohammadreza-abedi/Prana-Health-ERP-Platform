/**
 * @file AnalyticsWidget.tsx
 * @description کامپوننت ویجت تحلیلی
 * 
 * این کامپوننت یک ویجت تحلیلی قابل استفاده مجدد ارائه می‌دهد که
 * می‌تواند برای نمایش انواع مختلف داده‌های تحلیلی استفاده شود.
 */

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCcw, 
  Maximize2, 
  Minimize2, 
  Info, 
  LineChart,
  ArrowRight, 
  ArrowUp, 
  ArrowDown
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/design-system/atoms/Card';
import { Button } from '@/design-system/atoms/Button';

interface AnalyticsWidgetProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  value?: string | number;
  previousValue?: string | number;
  timeframe?: string;
  change?: number;
  changeLabel?: string;
  loading?: boolean;
  fullWidth?: boolean;
  onRefresh?: () => void;
  onExpand?: () => void;
  expanded?: boolean;
  className?: string;
  footerAction?: {
    label: string;
    onClick: () => void;
  };
  footerContent?: ReactNode;
}

// کامپوننت ویجت تحلیلی
const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({
  title,
  subtitle,
  icon,
  children,
  value,
  previousValue,
  timeframe,
  change,
  changeLabel,
  loading = false,
  fullWidth = false,
  onRefresh,
  onExpand,
  expanded = false,
  className = '',
  footerAction,
  footerContent,
}) => {
  // تعیین رنگ و آیکون تغییرات
  const getChangeColor = (change?: number) => {
    if (change === undefined) return 'text-gray-500 dark:text-gray-400';
    return change > 0 ? 'text-success-500' : change < 0 ? 'text-error-500' : 'text-gray-500 dark:text-gray-400';
  };
  
  const getChangeIcon = (change?: number) => {
    if (change === undefined) return null;
    return change > 0 ? <ArrowUp className="h-3 w-3" /> : 
           change < 0 ? <ArrowDown className="h-3 w-3" /> : null;
  };
  
  // کلاس‌های اختصاصی کارد
  const cardClasses = `
    ${fullWidth ? 'w-full' : ''}
    ${loading ? 'opacity-70 pointer-events-none' : ''}
    transition-all duration-300
    ${className}
  `;
  
  return (
    <Card className={cardClasses}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {icon && <div className="mr-2">{icon}</div>}
            <div>
              <CardTitle className="text-lg flex items-center">
                {title}
                {subtitle && (
                  <span className="text-sm text-muted-foreground ml-2 font-normal">
                    {subtitle}
                  </span>
                )}
              </CardTitle>
              
              {value !== undefined && (
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold">{value}</span>
                  
                  {(previousValue !== undefined || change !== undefined) && (
                    <div className={`flex items-center ml-2 text-xs ${getChangeColor(change)}`}>
                      {getChangeIcon(change)}
                      <span className="ml-0.5">{change !== undefined ? `${change > 0 ? '+' : ''}${change}%` : ''}</span>
                      {changeLabel && <span className="ml-1 text-gray-500">{changeLabel}</span>}
                    </div>
                  )}
                  
                  {timeframe && (
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {timeframe}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {onRefresh && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onRefresh}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
            )}
            
            {onExpand && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onExpand}>
                {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            )}
            
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </CardContent>
      
      {(footerAction || footerContent) && (
        <CardFooter className={`${footerContent ? '' : 'justify-end'} pt-2`}>
          {footerContent}
          
          {footerAction && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30" 
              onClick={footerAction.onClick}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {footerAction.label}
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default AnalyticsWidget;