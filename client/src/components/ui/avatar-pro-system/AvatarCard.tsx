import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, ShoppingCart, Check, Info, Sparkles, Trophy } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface AvatarCardProps {
  id: number;
  name: string;
  imagePath: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  isLocked?: boolean;
  isSelected?: boolean;
  isPurchaseable?: boolean;
  xpRequired?: number;
  price?: number;
  onClick?: () => void;
  className?: string;
  discount?: number;
}

const AvatarCard: React.FC<AvatarCardProps> = ({
  id,
  name,
  imagePath,
  category,
  rarity = 'common',
  isLocked = false,
  isSelected = false,
  isPurchaseable = false,
  xpRequired,
  price,
  onClick,
  className,
  discount
}) => {
  // تعریف رنگ‌ها و استایل‌ها بر اساس کمیابی
  const rarityColors = {
    common: 'bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-700',
    rare: 'bg-blue-50 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700',
    epic: 'bg-purple-50 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700',
    legendary: 'bg-amber-50 border-amber-300 dark:bg-amber-900/30 dark:border-amber-700'
  };
  
  const rarityText = {
    common: 'text-slate-600 dark:text-slate-300',
    rare: 'text-blue-600 dark:text-blue-300',
    epic: 'text-purple-600 dark:text-purple-300',
    legendary: 'text-amber-600 dark:text-amber-300'
  };
  
  const rarityNames = {
    common: 'معمولی',
    rare: 'کمیاب',
    epic: 'حماسی',
    legendary: 'افسانه‌ای'
  };
  
  const rarityGlow = {
    common: '',
    rare: 'shadow-[0_0_12px_rgba(59,130,246,0.4)]',
    epic: 'shadow-[0_0_12px_rgba(168,85,247,0.5)]',
    legendary: 'shadow-[0_0_15px_rgba(245,158,11,0.6)]'
  };
  
  // رنگ‌بندی و استایل دکمه‌ها
  const buttonStyles = {
    common: 'bg-slate-500 hover:bg-slate-600',
    rare: 'bg-blue-500 hover:bg-blue-600',
    epic: 'bg-purple-500 hover:bg-purple-600',
    legendary: 'bg-amber-500 hover:bg-amber-600'
  };
  
  // استایل قیمت بر اساس کمیابی
  const priceStyles = {
    common: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
    rare: 'bg-blue-200 text-blue-800 dark:bg-blue-800/40 dark:text-blue-200',
    epic: 'bg-purple-200 text-purple-800 dark:bg-purple-800/40 dark:text-purple-200',
    legendary: 'bg-amber-200 text-amber-800 dark:bg-amber-800/40 dark:text-amber-200'
  };

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 border-2",
        rarityColors[rarity],
        isSelected && "ring-2 ring-tiffany ring-offset-2 dark:ring-offset-slate-900",
        isLocked && "opacity-90",
        rarityGlow[rarity],
        className
      )}
    >
      {/* نشان کمیابی */}
      <Badge 
        className={cn(
          "absolute right-2 top-2 z-10 px-2 border-none",
          rarity !== 'common' ? buttonStyles[rarity] : 'bg-slate-500'
        )}
      >
        {rarityNames[rarity]}
      </Badge>
      
      {/* نشان انتخاب شده */}
      {isSelected && (
        <div className="absolute left-2 top-2 z-10 bg-tiffany text-white rounded-full h-6 w-6 flex items-center justify-center">
          <Check className="h-4 w-4" />
        </div>
      )}
      
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {/* تصویر آواتار */}
          <div className={cn(
            "w-full h-44 flex items-center justify-center overflow-hidden bg-gradient-to-tr",
            rarity === 'common' && 'from-white to-slate-100 dark:from-slate-900 dark:to-slate-800',
            rarity === 'rare' && 'from-blue-50 to-slate-100 dark:from-slate-900 dark:to-blue-900/20',
            rarity === 'epic' && 'from-purple-50 to-slate-100 dark:from-slate-900 dark:to-purple-900/20',
            rarity === 'legendary' && 'from-amber-50 to-slate-100 dark:from-slate-900 dark:to-amber-900/20'
          )}>
            <motion.img 
              src={imagePath} 
              alt={name}
              className={cn(
                "object-contain w-32 h-32",
                isLocked && "opacity-60 blur-[1px]"
              )}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* لایه قفل */}
            {isLocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[1px]">
                {isPurchaseable ? (
                  <>
                    <ShoppingCart className="h-8 w-8 text-white mb-2" />
                    {price && (
                      <Badge 
                        className={cn(
                          "text-xs font-bold px-2", 
                          priceStyles[rarity]
                        )}
                      >
                        {price.toLocaleString('fa-IR')} اعتبار
                      </Badge>
                    )}
                    {xpRequired && (
                      <Badge 
                        variant="outline" 
                        className="mt-1 text-xs text-white border-white/50"
                      >
                        <Trophy className="h-3 w-3 ml-1" />
                        سطح {Math.ceil(xpRequired / 1000)}
                      </Badge>
                    )}
                  </>
                ) : (
                  <Lock className="h-8 w-8 text-white" />
                )}
              </div>
            )}
          </div>
          
          {/* بخش اطلاعات آواتار */}
          <div className="p-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={cn("font-bold text-sm", rarityText[rarity])}>
                  {name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {category === 'male' ? 'آواتار مرد' : 'آواتار زن'}
                </p>
              </div>
              
              {!isLocked && !isPurchaseable && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="cursor-help">
                        <Info className="h-4 w-4 text-slate-400" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">کلیک کنید تا انتخاب شود</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            
            {/* دکمه انتخاب یا خرید */}
            <div className="mt-3">
              <Button 
                onClick={onClick}
                className={cn(
                  "w-full text-white text-xs",
                  isPurchaseable && isLocked ? buttonStyles[rarity] : "bg-tiffany hover:bg-tiffany-hover"
                )}
                disabled={isSelected && !isPurchaseable}
                variant={isSelected && !isPurchaseable ? "outline" : "default"}
              >
                {isSelected && !isPurchaseable ? (
                  <>
                    <Check className="h-4 w-4 ml-1" />
                    انتخاب شده
                  </>
                ) : isLocked && isPurchaseable ? (
                  <>
                    <ShoppingCart className="h-4 w-4 ml-1" />
                    خرید
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 ml-1" />
                    انتخاب
                  </>
                )}
              </Button>
            </div>
            
            {/* تخفیف */}
            {discount && discount > 0 && (
              <div className="absolute -left-6 top-6 bg-red-500 text-white transform rotate-[-45deg] px-6 py-1 text-xs font-bold shadow-md">
                {discount}% تخفیف
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvatarCard;