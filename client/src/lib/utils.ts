import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date to Persian format
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  
  // Using Iranian calendar
  // This is a simplified version - in a production app, consider using a proper Persian date library
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];
  
  const weekdays = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const weekday = weekdays[date.getDay()];
  
  return `${weekday} ${day} ${month} ${year}`;
}

/**
 * Calculate remaining time from now to a given date
 */
export function getRemainingTime(endDate: Date): string {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  
  if (diff <= 0) {
    return 'پایان یافته';
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} روز مانده`;
  }
  
  if (hours > 0) {
    return `${hours} ساعت مانده`;
  }
  
  return `${minutes} دقیقه مانده`;
}

/**
 * Helper to get a user's level title
 */
export function getLevelTitle(level: number): string {
  const titles = [
    'تازه‌کار',
    'مبتدی',
    'فعال',
    'حرفه‌ای',
    'ماهر',
    'متخصص',
    'قهرمان',
    'افسانه',
    'اسطوره'
  ];
  
  if (level <= 0) return titles[0];
  if (level > titles.length) return `اسطوره سطح ${level - titles.length + 1}`;
  
  return titles[level - 1];
}

/**
 * Convert number to Persian digits
 */
export function toPersianDigits(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
}
