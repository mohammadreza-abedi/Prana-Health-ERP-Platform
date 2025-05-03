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

  const rarityPatterns = {
    common: '',
    rare: 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[length:10px_10px]',
    epic: 'bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.07)_1px,transparent_1px)] bg-[length:8px_8px]',
    legendary: 'bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_1px,transparent_1px)] bg-[length:6px_6px]'
  };

  const rarityBadgeEffects = {
    common: '',
    rare: 'animate-pulse-slow',
    epic: 'animate-pulse-slow',
    legendary: 'animate-pulse-slow shadow-[0_0_5px_rgba(245,158,11,0.5)]'
  };
  
  // رنگ‌بندی و استایل دکمه‌ها
  const buttonStyles = {
    common: 'bg-slate-500 hover:bg-slate-600',
    rare: 'bg-blue-500 hover:bg-blue-600',
    epic: 'bg-purple-500 hover:bg-purple-600',
    legendary: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600'
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
        "relative overflow-hidden transition-all duration-300 border-2 hover:scale-[1.02]",
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
          rarity !== 'common' ? buttonStyles[rarity] : 'bg-slate-500',
          rarityBadgeEffects[rarity]
        )}
      >
        {rarity !== 'common' && rarity !== 'rare' && (
          <Sparkles className="h-3 w-3 ml-1" />
        )}
        {rarityNames[rarity]}
      </Badge>
      
      {/* نشان انتخاب شده */}
      {isSelected && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute left-2 top-2 z-10 bg-tiffany text-white rounded-full h-6 w-6 flex items-center justify-center"
        >
          <Check className="h-4 w-4" />
        </motion.div>
      )}
      
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {/* تصویر آواتار با پس‌زمینه خاص بر اساس کمیابی */}
          <div className={cn(
            "w-full h-44 flex items-center justify-center overflow-hidden bg-gradient-to-tr",
            rarity === 'common' && 'from-white to-slate-100 dark:from-slate-900 dark:to-slate-800',
            rarity === 'rare' && 'from-blue-50 to-slate-100 dark:from-slate-900 dark:to-blue-900/20',
            rarity === 'epic' && 'from-purple-50 to-slate-100 dark:from-slate-900 dark:to-purple-900/20',
            rarity === 'legendary' && 'from-amber-50 to-slate-100 dark:from-slate-900 dark:to-amber-900/20',
            rarityPatterns[rarity]
          )}>
            {/* افکت‌های ویژه برای آواتارهای افسانه‌ای */}
            {rarity === 'legendary' && (
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 animate-pulse-slow"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
              </div>
            )}
            
            {/* افکت‌های ویژه برای آواتارهای حماسی */}
            {rarity === 'epic' && (
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"></div>
              </div>
            )}
            
            <motion.img 
              src={imagePath} 
              alt={name}
              className={cn(
                "object-contain w-32 h-32 relative z-10",
                isLocked && "opacity-60 blur-[1px]",
                rarity === 'legendary' && 'drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]',
                rarity === 'epic' && 'drop-shadow-[0_0_5px_rgba(168,85,247,0.2)]',
              )}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* لایه قفل */}
            {isLocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[1px]">
                {isPurchaseable ? (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ShoppingCart className="h-8 w-8 text-white mb-2" />
                    </motion.div>
                    {price && (
                      <motion.div
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Badge 
                          className={cn(
                            "text-xs font-bold px-2", 
                            priceStyles[rarity]
                          )}
                        >
                          {price.toLocaleString('fa-IR')} اعتبار
                        </Badge>
                      </motion.div>
                    )}
                    {xpRequired && (
                      <motion.div
                        initial={{ y: 5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="mt-1 text-xs text-white border-white/50"
                        >
                          <Trophy className="h-3 w-3 ml-1" />
                          سطح {Math.ceil(xpRequired / 1000)}
                        </Badge>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Lock className="h-8 w-8 text-white" />
                  </motion.div>
                )}
              </div>
            )}
          </div>
          
          {/* بخش اطلاعات آواتار */}
          <div className={cn(
            "p-3",
            rarity === 'legendary' && 'bg-gradient-to-b from-amber-50/20 to-transparent dark:from-amber-900/5 dark:to-transparent',
            rarity === 'epic' && 'bg-gradient-to-b from-purple-50/20 to-transparent dark:from-purple-900/5 dark:to-transparent'
          )}>
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
                  "w-full text-white text-xs group overflow-hidden",
                  isPurchaseable && isLocked ? buttonStyles[rarity] : "bg-tiffany hover:bg-tiffany-hover"
                )}
                disabled={isSelected && !isPurchaseable}
                variant={isSelected && !isPurchaseable ? "outline" : "default"}
              >
                {isSelected && !isPurchaseable ? (
                  <>
                    <Check className="h-4 w-4 ml-1" />
                    <span>انتخاب شده</span>
                  </>
                ) : isLocked && isPurchaseable ? (
                  <>
                    <ShoppingCart className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:scale-110" />
                    <span>خرید</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:scale-110" />
                    <span>انتخاب</span>
                  </>
                )}
                
                {/* افکت موج دکمه */}
                <span className="absolute -inset-full top-0 block bg-gradient-to-r from-transparent via-white opacity-20 group-hover:animate-[button-shine_1.5s_ease-in-out]"></span>
              </Button>
            </div>
            
            {/* تخفیف */}
            {discount && discount > 0 && (
              <div className="absolute -left-6 top-6 bg-gradient-to-r from-red-500 to-rose-600 text-white transform rotate-[-45deg] px-6 py-1 text-xs font-bold shadow-md">
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