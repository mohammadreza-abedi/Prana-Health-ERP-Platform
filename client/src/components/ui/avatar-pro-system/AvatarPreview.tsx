import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";
import { Sparkles, Award, GraduationCap, Trophy, Crown, ThumbsUp, User, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface AvatarPreviewProps {
  avatarImage?: string;
  avatarName?: string;
  userName?: string;
  userRole?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStats?: boolean;
  showBadges?: boolean;
  showControls?: boolean;
  isActive?: boolean;
  xp?: number;
  level?: number;
  credits?: number;
  onActivate?: () => void;
  onPurchase?: () => void;
  badges?: Array<{
    id: string;
    name: string;
    icon: React.ReactNode;
  }>;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked?: boolean;
  price?: number;
}

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  avatarImage = '/placeholders/default-avatar.png',
  avatarName = 'آواتار پیش‌فرض',
  userName = 'کاربر پرانا',
  userRole = 'کارشناس HSE',
  className,
  size = 'lg',
  showStats = true,
  showBadges = true,
  showControls = false,
  isActive = false,
  xp = 2500,
  level = 5,
  credits = 1200,
  onActivate,
  onPurchase,
  badges = [
    { id: '1', name: 'پیشرو سلامتی', icon: <ThumbsUp className="h-3 w-3" /> },
    { id: '2', name: 'قهرمان پیشگیری', icon: <Crown className="h-3 w-3" /> },
  ],
  rarity = 'common',
  unlocked = true,
  price
}) => {
  const [showParticles, setShowParticles] = useState(false);
  
  // نمایش افکت ذرات در زمان‌های خاص
  useEffect(() => {
    if (rarity === 'legendary' || rarity === 'epic') {
      const timer = setInterval(() => {
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 2000);
      }, 8000);
      
      return () => clearInterval(timer);
    }
  }, [rarity]);
  
  const sizeClasses = {
    sm: 'h-28 w-28',
    md: 'h-36 w-36',
    lg: 'h-44 w-44', 
    xl: 'h-60 w-60'
  };

  const mainSize = sizeClasses[size];
  
  // مشخص کردن رنگ‌های مختلف بر اساس کمیابی
  const rarityColors = {
    common: 'shadow-md',
    rare: 'shadow-[0_0_15px_rgba(59,130,246,0.5)]',
    epic: 'shadow-[0_0_20px_rgba(168,85,247,0.6)]',
    legendary: 'shadow-[0_0_25px_rgba(245,158,11,0.8)]'
  };
  
  const rarityGradients = {
    common: 'from-slate-50 to-slate-200 dark:from-slate-800 dark:to-slate-950',
    rare: 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20',
    epic: 'from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20',
    legendary: 'from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/20'
  };
  
  const rarityBorderColors = {
    common: 'border-slate-300 dark:border-slate-700',
    rare: 'border-blue-300 dark:border-blue-700',
    epic: 'border-purple-300 dark:border-purple-700',
    legendary: 'border-amber-300 dark:border-amber-700'
  };

  const rarityTextColor = {
    common: 'text-slate-700 dark:text-slate-300',
    rare: 'text-blue-700 dark:text-blue-300',
    epic: 'text-purple-700 dark:text-purple-300',
    legendary: 'text-amber-700 dark:text-amber-300'
  };
  
  // تعریف ذرات درخشان برای نمایش در قالب sparkles
  const Particles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 6 + 2;
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 0.5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        let color;
        if (rarity === 'legendary') color = 'bg-amber-400';
        else if (rarity === 'epic') color = 'bg-purple-400';
        else if (rarity === 'rare') color = 'bg-blue-400';
        else color = 'bg-white';
        
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${color}`}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              opacity: 0
            }}
            animate={{
              y: -50 - Math.random() * 50,
              x: (Math.random() - 0.5) * 40,
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5]
            }}
            transition={{
              duration,
              delay,
              ease: 'easeOut'
            }}
          />
        );
      })}
    </div>
  );
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <motion.div 
        className={cn(
          "relative flex items-center justify-center rounded-full overflow-hidden border-4",
          rarityBorderColors[rarity],
          rarityColors[rarity],
          isActive && "ring-4 ring-tiffany ring-offset-2 dark:ring-offset-slate-800",
          mainSize
        )}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {/* پس‌زمینه حرفه‌ای با افکت‌های پیشرفته */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-full">
          {/* لایه گرادیان اصلی */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br",
            rarityGradients[rarity]
          )}></div>
          
          {/* پترن هندسی متحرک */}
          <motion.div 
            className="absolute inset-0 bg-grid-slate-300/[0.025] dark:bg-grid-slate-100/[0.025] bg-[size:20px_20px]"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
          ></motion.div>
          
          {/* هاله‌های رنگی متحرک */}
          <motion.div
            className={cn(
              "absolute -top-16 -left-16 w-32 h-32 rounded-full opacity-60 blur-xl",
              rarity === 'legendary' ? "bg-amber-400/30" :
              rarity === 'epic' ? "bg-purple-400/30" :
              rarity === 'rare' ? "bg-blue-400/30" : "bg-tiffany/20"
            )}
            animate={{ 
              top: ['-4rem', '-2rem', '-4rem'],
              left: ['-4rem', '-2rem', '-4rem'],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "mirror"
            }}
          ></motion.div>
          
          <motion.div
            className={cn(
              "absolute -bottom-16 -right-16 w-32 h-32 rounded-full opacity-60 blur-xl",
              rarity === 'legendary' ? "bg-amber-500/30" :
              rarity === 'epic' ? "bg-purple-500/30" :
              rarity === 'rare' ? "bg-blue-500/30" : "bg-aqua/20"
            )}
            animate={{ 
              bottom: ['-4rem', '-3rem', '-4rem'],
              right: ['-4rem', '-3rem', '-4rem'],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: 7, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "mirror",
              delay: 0.5
            }}
          ></motion.div>
          
          {/* خطوط نور متحرک */}
          <motion.div
            className={cn(
              "absolute h-px w-full top-1/3 left-0 right-0",
              rarity === 'legendary' ? "bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" :
              rarity === 'epic' ? "bg-gradient-to-r from-transparent via-purple-300/40 to-transparent" :
              rarity === 'rare' ? "bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" :
              "bg-gradient-to-r from-transparent via-tiffany/30 to-transparent"
            )}
            animate={{ 
              opacity: [0, 0.8, 0],
              width: ['0%', '100%', '0%'],
              left: ['0%', '0%', '100%']
            }}
            transition={{ 
              duration: 3, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 2
            }}
          ></motion.div>
          
          <motion.div
            className={cn(
              "absolute w-px h-full top-0 bottom-0 left-2/3",
              rarity === 'legendary' ? "bg-gradient-to-b from-transparent via-amber-300/40 to-transparent" :
              rarity === 'epic' ? "bg-gradient-to-b from-transparent via-purple-300/40 to-transparent" :
              rarity === 'rare' ? "bg-gradient-to-b from-transparent via-blue-300/40 to-transparent" :
              "bg-gradient-to-b from-transparent via-tiffany/30 to-transparent"
            )}
            animate={{ 
              opacity: [0, 0.8, 0],
              height: ['0%', '100%', '0%'],
              top: ['0%', '0%', '100%']
            }}
            transition={{ 
              duration: 3, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 3,
              delay: 1
            }}
          ></motion.div>
          
          {/* افکت شیشه‌ای */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent dark:from-white/5"></div>
        </div>
        
        {/* لایه تیره برای آواتارهای قفل شده */}
        {!unlocked && (
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-20 flex items-center justify-center flex-col">
            <Sparkles className="h-8 w-8 text-amber-400 mb-2" />
            <div className="text-white text-xs font-bold px-2 py-1 rounded-full bg-amber-600/80 backdrop-blur-sm">
              {price?.toLocaleString('fa-IR')} 
            </div>
          </div>
        )}
        
        {/* شکل حلقوی نور لبه‌ای */}
        <div className="absolute inset-[2px] rounded-full overflow-hidden border border-white/10 dark:border-white/5 z-10"></div>
        
        {/* دایره داخلی با افکت هاله */}
        <div className={cn(
          "absolute inset-[4px] rounded-full overflow-hidden z-10",
          rarity === 'legendary' ? "shadow-[inset_0_0_15px_rgba(245,158,11,0.3)]" :
          rarity === 'epic' ? "shadow-[inset_0_0_15px_rgba(168,85,247,0.3)]" :
          rarity === 'rare' ? "shadow-[inset_0_0_15px_rgba(59,130,246,0.3)]" :
          "shadow-[inset_0_0_15px_rgba(45,212,191,0.2)]"
        )}>
          {/* نقطه‌های درخشان روی عکس */}
          <motion.div
            className={cn(
              "absolute top-[15%] left-[15%] w-2 h-2 rounded-full",
              rarity === 'legendary' ? "bg-amber-300/60" :
              rarity === 'epic' ? "bg-purple-300/60" :
              rarity === 'rare' ? "bg-blue-300/60" :
              "bg-tiffany/50"
            )}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "loop"
            }}
          ></motion.div>
          
          <motion.div
            className={cn(
              "absolute bottom-[20%] right-[20%] w-1 h-1 rounded-full",
              rarity === 'legendary' ? "bg-amber-300/70" :
              rarity === 'epic' ? "bg-purple-300/70" :
              rarity === 'rare' ? "bg-blue-300/70" :
              "bg-aqua/60"
            )}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 2, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.5
            }}
          ></motion.div>
          
          {/* کانتینر آواتار */}
          <div className="relative w-full h-full bg-slate-50 dark:bg-slate-800 z-10">
            {avatarImage ? (
              <img 
                src={avatarImage} 
                alt={avatarName}
                className={cn(
                  "h-full w-full object-contain relative z-20",
                  !unlocked && "filter blur-sm"
                )}
              />
            ) : (
              <User className="h-1/2 w-1/2 text-slate-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" />
            )}
            
            {/* افکت شیشه‌ای روی آواتار */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent dark:from-white/5 z-30"
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            ></motion.div>
          </div>
        </div>
        
        {/* نشان نمایش آواتار فعال */}
        {isActive && (
          <div className="absolute -bottom-1 -left-1 bg-tiffany text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-slate-800 z-40 shadow-lg">
            <Zap className="h-3 w-3" />
          </div>
        )}
        
        {/* نمایش کمیابی */}
        {rarity !== 'common' && (
          <div className="absolute -top-1 -right-1 rounded-full h-7 w-7 flex items-center justify-center text-xs font-bold border-2 border-white dark:border-slate-800 bg-gradient-to-r z-40 shadow-lg">
            {rarity === 'rare' && <Badge className="bg-blue-500 hover:bg-blue-600 text-[10px] px-1">R</Badge>}
            {rarity === 'epic' && <Badge className="bg-purple-500 hover:bg-purple-600 text-[10px] px-1">E</Badge>}
            {rarity === 'legendary' && <Badge className="bg-amber-500 hover:bg-amber-600 text-[10px] px-1">L</Badge>}
          </div>
        )}
        
        {/* افکت ذرات درخشان */}
        <AnimatePresence>
          {showParticles && <Particles />}
        </AnimatePresence>
      </motion.div>
      
      {/* نام آواتار */}
      {avatarName && (
        <div className="text-center mt-3">
          <h3 className={cn("font-bold text-sm md:text-base", rarityTextColor[rarity])}>{avatarName}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{isActive ? 'آواتار فعال' : ''}</p>
        </div>
      )}
      
      {/* نام کاربر و نقش */}
      {userName && (
        <div className="text-center mt-1">
          <h4 className="text-xs font-medium text-slate-700 dark:text-slate-300">{userName}</h4>
          {userRole && <p className="text-xs text-slate-500 dark:text-slate-400">{userRole}</p>}
        </div>
      )}
      
      {/* آمار کاربر */}
      {showStats && (
        <Card className="mt-3 w-full max-w-[200px] bg-slate-50/80 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/40 shadow-sm">
          <CardContent className="p-3">
            <div className="flex justify-between items-center text-center">
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">سطح</span>
                <div className="flex items-center bg-tiffany/10 text-tiffany px-2 py-1 rounded-full text-xs">
                  <GraduationCap className="h-3 w-3 ml-1" />
                  {level}
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">امتیاز</span>
                <div className="flex items-center bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full text-xs">
                  <Award className="h-3 w-3 ml-1" />
                  {xp.toLocaleString('fa-IR')}
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mb-1">اعتبار</span>
                <div className="flex items-center bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-full text-xs">
                  <Sparkles className="h-3 w-3 ml-1" />
                  {credits.toLocaleString('fa-IR')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* دکمه‌های کنترل */}
      {showControls && (
        <div className="mt-3 flex gap-2 w-full max-w-[200px]">
          {unlocked ? (
            <Button 
              size="sm" 
              variant={isActive ? "secondary" : "default"}
              className="w-full"
              onClick={onActivate}
              disabled={isActive}
            >
              {isActive ? 'فعال شده' : 'فعال‌سازی'}
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="outline"
              className="w-full bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700"
              onClick={onPurchase}
            >
              <Sparkles className="h-4 w-4 ml-1" />
              خرید
            </Button>
          )}
        </div>
      )}
      
      {/* نشان‌های کاربر */}
      {showBadges && badges.length > 0 && (
        <div className="flex flex-wrap gap-1 justify-center mt-3">
          {badges.map((badge) => (
            <Badge 
              key={badge.id}
              variant="outline"
              className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 rounded-full text-xs py-1"
            >
              {badge.icon}
              <span className="mr-1">{badge.name}</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarPreview;