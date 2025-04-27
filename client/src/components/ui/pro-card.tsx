import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const proCardVariants = cva('pro-card', {
  variants: {
    variant: {
      default: '',
      acrylic: 'acrylic',
      premium: 'premium',
      neon: 'neon-card',
    },
    color: {
      default: '',
      tiffany: 'tiffany',
      navy: 'navy',
      aqua: 'aqua',
      yellow: 'yellow',
    },
    size: {
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-6',
      xl: 'p-8',
    },
    hover: {
      default: '',
      scale: 'hover:scale-[1.02] transition-transform duration-300',
      grow: 'hover:scale-[1.01] transition-transform duration-300',
      lift: 'hover:-translate-y-1 transition-transform duration-300',
    },
  },
  defaultVariants: {
    variant: 'default',
    color: 'default',
    size: 'md',
    hover: 'default',
  },
});

export interface ProCardProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof proCardVariants> {
  hideIndicator?: boolean;
  glassmorphism?: boolean;
  innerClassName?: string;
}

const ProCard = React.forwardRef<HTMLDivElement, ProCardProps>(
  ({
    className,
    variant,
    color,
    size,
    hover,
    glassmorphism = false,
    hideIndicator = false,
    innerClassName,
    children,
    ...props
  }, ref) => {
    let cardClasses = proCardVariants({ 
      variant, 
      color: color as "default" | "tiffany" | "navy" | "aqua" | "yellow" | null | undefined, 
      size, 
      hover 
    });
    
    if (glassmorphism) {
      cardClasses = cn(cardClasses, 'backdrop-blur-md bg-white/70 dark:bg-slate-900/70');
    }
    
    return (
      <div
        ref={ref}
        className={cn(cardClasses, className)}
        {...props}
      >
        {!hideIndicator && variant === 'premium' && color && (
          <div className="absolute top-0 left-0 right-0 h-[3px] z-[1]" />
        )}
        <div className={cn("relative z-0", innerClassName)}>
          {children}
        </div>
      </div>
    );
  },
);

ProCard.displayName = 'ProCard';

export { ProCard, proCardVariants };