import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Avatar as AvatarType, UserAvatar } from '@shared/avatar-schema';

type AvatarPreviewProps = {
  avatar: AvatarType | UserAvatar; 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
};

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({ 
  avatar, 
  size = 'md', 
  className = '',
  showBadge = true
}) => {
  // تعیین اندازه بر اساس پارامتر size
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const sizeClass = sizeClasses[size];
  
  // پیدا کردن مسیر تصویر
  const imagePath = 'imagePath' in avatar 
    ? avatar.imagePath as string
    : 'avatarPath' in avatar 
      ? avatar.avatarPath as string
      : '';
      
  // پیدا کردن نام
  const name = 'name' in avatar 
    ? avatar.name 
    : 'customName' in avatar && avatar.customName 
      ? avatar.customName 
      : 'آواتار';
  
  // پیدا کردن رتبه کمیابی
  const rarity = 'rarity' in avatar ? avatar.rarity as string : undefined;
      
  // رنگ‌های متناسب با کمیابی
  const rarityColors = {
    common: 'bg-slate-400 text-slate-900',
    rare: 'bg-blue-500 text-white',
    epic: 'bg-purple-500 text-white',
    legendary: 'bg-amber-500 text-black',
  };
  
  const rarityStyling = rarity ? 
    (rarityColors[rarity as keyof typeof rarityColors] || rarityColors.common) : 
    '';

  return (
    <div className={`relative ${className}`}>
      <Avatar className={`${sizeClass} border-2 border-primary`}>
        <AvatarImage 
          src={imagePath} 
          alt={name} 
        />
        <AvatarFallback>
          {name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      
      {showBadge && rarity && (
        <Badge 
          className={`absolute -bottom-2 right-0 text-xs ${rarityStyling}`}
          variant="outline"
        >
          {rarity.toUpperCase()}
        </Badge>
      )}
    </div>
  );
};