import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ProCard } from '@/components/ui/pro-card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Medal, Zap, Clock } from 'lucide-react';

export interface BadgeData {
  id: string;
  title: string;
  description: string;
  type: 'achievement' | 'badge' | 'medal' | 'certificate';
  category: 'health' | 'fitness' | 'nutrition' | 'sleep' | 'mental' | 'streak' | 'challenge' | 'team';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  progress?: {
    current: number;
    max: number;
  };
  achievedAt?: Date;
  icon?: string;
  color?: 'tiffany' | 'navy' | 'aqua' | 'yellow' | 'success' | 'error' | 'info';
  special?: boolean;
}

const rarityColors = {
  common: 'bg-slate-400 dark:bg-slate-500',
  uncommon: 'bg-tiffany dark:bg-tiffany-light',
  rare: 'bg-blue-500 dark:bg-blue-400',
  epic: 'bg-purple-500 dark:bg-purple-400',
  legendary: 'bg-amber-500 dark:bg-amber-400'
};

const rarityGlows = {
  common: '',
  uncommon: 'shadow-sm shadow-tiffany/30',
  rare: 'shadow-md shadow-blue-500/40',
  epic: 'shadow-md shadow-purple-500/40',
  legendary: 'shadow-lg shadow-amber-500/50'
};

const categoryIcons = {
  health: <Trophy className="h-5 w-5" />,
  fitness: <Zap className="h-5 w-5" />,
  nutrition: <Award className="h-5 w-5" />,
  sleep: <Star className="h-5 w-5" />,
  mental: <Medal className="h-5 w-5" />,
  streak: <Clock className="h-5 w-5" />,
  challenge: <Trophy className="h-5 w-5" />,
  team: <Trophy className="h-5 w-5" />
};

interface BadgeCardProps {
  badge: BadgeData;
  className?: string;
  variant?: 'default' | 'premium' | 'compact';
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ 
  badge, 
  className,
  variant = 'default'
}) => {
  const { 
    title, 
    description, 
    category,
    rarity, 
    progress, 
    achievedAt,
    icon,
    color = 'tiffany',
    special
  } = badge;
  
  const isAchieved = achievedAt || (progress && progress.current >= progress.max);
  const progressPercent = progress ? Math.min(100, (progress.current / progress.max) * 100) : 0;
  
  const formattedDate = achievedAt ? new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(achievedAt) : '';
  
  if (variant === 'compact') {
    return (
      <div className={cn(
        "group relative flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300",
        className
      )}>
        <div className={cn(
          "relative rounded-full w-12 h-12 flex items-center justify-center mb-2",
          isAchieved ? rarityColors[rarity] : "bg-slate-300/50 dark:bg-slate-700/50",
          isAchieved ? rarityGlows[rarity] : ""
        )}>
          {icon ? (
            <img src={icon} alt={title} className="w-8 h-8" />
          ) : (
            categoryIcons[category] || <Trophy className="h-5 w-5" />
          )}
          
          {!isAchieved && progress && (
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-slate-200 dark:text-slate-800 stroke-current" 
                strokeWidth="6" 
                strokeLinecap="round" 
                fill="transparent" 
                r="45" 
                cx="50" 
                cy="50" 
              />
              <circle 
                className={`text-${color} dark:text-${color}-light stroke-current`}
                strokeWidth="6" 
                strokeLinecap="round" 
                fill="transparent" 
                r="45" 
                cx="50" 
                cy="50" 
                style={{
                  strokeDasharray: 283,
                  strokeDashoffset: 283 - (283 * progressPercent) / 100
                }}
                transform="rotate(-90 50 50)" 
              />
            </svg>
          )}
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-medium truncate max-w-[120px]">{title}</h3>
          {isAchieved ? (
            <span className="text-xs text-slate-500 dark:text-slate-400">{formattedDate}</span>
          ) : (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {progress ? `${progress.current}/${progress.max}` : 'قفل شده'}
            </span>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <ProCard 
      className={cn(
        "overflow-hidden",
        special && "border-none",
        className
      )}
      variant={special ? 'premium' : 'default'}
      color={color as "default" | "tiffany" | "navy" | "aqua" | "yellow" | undefined}
    >
      <div className="relative px-1">
        {special && (
          <div className="absolute top-1 left-1 z-10">
            <Badge variant="outline" className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs border-amber-300 text-amber-600 dark:text-amber-300">
              ویژه
            </Badge>
          </div>
        )}
        
        {rarity === 'legendary' && (
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-transparent to-transparent pointer-events-none" />
        )}
        
        <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
          <div className="space-y-1">
            <CardTitle className="text-base">{title}</CardTitle>
            {isAchieved ? (
              <CardDescription className="text-xs">
                دریافت شده در {formattedDate}
              </CardDescription>
            ) : (
              <Badge variant="secondary" className="text-xs">
                {progress ? 'در حال پیشرفت' : 'قفل شده'}
              </Badge>
            )}
          </div>
          
          <div className={cn(
            "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
            isAchieved ? rarityColors[rarity] : "bg-slate-200 dark:bg-slate-700",
            isAchieved ? rarityGlows[rarity] : ""
          )}>
            {icon ? (
              <img src={icon} alt={title} className={`w-7 h-7 ${!isAchieved ? 'opacity-50' : ''}`} />
            ) : (
              categoryIcons[category] || <Trophy className="h-5 w-5" />
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {description}
          </p>
          
          {progress && !isAchieved && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500 dark:text-slate-400">پیشرفت</span>
                <span>{progress.current}/{progress.max}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${color} dark:bg-${color}-light rounded-full`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </div>
    </ProCard>
  );
};

export const BadgeGrid: React.FC<{
  badges: BadgeData[];
  variant?: 'default' | 'premium' | 'compact';
  className?: string;
}> = ({ badges, variant = 'default', className }) => {
  return (
    <div className={cn(
      "grid gap-4",
      variant === 'compact' 
        ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8" 
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      className
    )}>
      {badges.map(badge => (
        <BadgeCard 
          key={badge.id} 
          badge={badge} 
          variant={variant}
        />
      ))}
    </div>
  );
};