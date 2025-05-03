import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date using Intl.DateTimeFormat
 */
export function formatDate(date: Date | string, locale: string = 'fa-IR') {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

/**
 * Formats a number using Intl.NumberFormat
 */
export function formatNumber(number: number, locale: string = 'fa-IR') {
  return new Intl.NumberFormat(locale).format(number);
}

/**
 * Formats currency amount
 */
export function formatCurrency(amount: number, locale: string = 'fa-IR', currency: string = 'IRR') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Truncates text to a certain length
 */
export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Converts Unix timestamp to a formatted date string
 */
export function formatTimestamp(timestamp: number, locale: string = 'fa-IR'): string {
  const date = new Date(timestamp * 1000);
  return formatDate(date, locale);
}

/**
 * Checks whether the required secrets/API keys are available
 */
export async function checkSecrets(secretKeys: string[]): Promise<boolean[]> {
  try {
    const response = await fetch('/api/check-secrets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ secretKeys }),
    });

    if (!response.ok) {
      return secretKeys.map(() => false);
    }

    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error('Error checking secrets:', error);
    return secretKeys.map(() => false);
  }
}

/**
 * Calculates time ago from a given date
 */
export function timeAgo(date: Date | string, locale: string = 'fa-IR'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  
  const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) {
    return formatter.format(-Math.floor(interval), 'year');
  }
  
  interval = seconds / 2592000;
  if (interval > 1) {
    return formatter.format(-Math.floor(interval), 'month');
  }
  
  interval = seconds / 86400;
  if (interval > 1) {
    return formatter.format(-Math.floor(interval), 'day');
  }
  
  interval = seconds / 3600;
  if (interval > 1) {
    return formatter.format(-Math.floor(interval), 'hour');
  }
  
  interval = seconds / 60;
  if (interval > 1) {
    return formatter.format(-Math.floor(interval), 'minute');
  }
  
  return formatter.format(-Math.floor(seconds), 'second');
}

/**
 * Calculates user level from XP
 */
export function calculateLevelFromXP(xp: number): { level: number; progress: number } {
  // هر سطح نیاز به 500 امتیاز تجربه دارد
  const baseXP = 500;
  const level = Math.floor(xp / baseXP) + 1;
  
  // محاسبه درصد پیشرفت به سطح بعدی
  const currentLevelXP = (level - 1) * baseXP;
  const nextLevelXP = level * baseXP;
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  
  return { level, progress };
}

/**
 * Get readable file size
 */
export function getReadableFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 بایت';
  
  const k = 1024;
  const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت', 'ترابایت'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * Deep merge objects
 */
export function deepMerge<T>(target: T, source: Partial<T>): T {
  const output = { ...target };
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

/**
 * Check if value is an object
 */
function isObject(item: any): item is Record<string, any> {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Get random element from array
 */
export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generate a random ID
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Ask for Stripe API keys
 */
export function askForStripeKeys(): void {
  alert(`برای استفاده از سیستم پرداخت نیاز به کلیدهای API استرایپ دارید:

1. به داشبورد استرایپ خود مراجعه کنید: https://dashboard.stripe.com/apikeys
2. کلید قابل انتشار (VITE_STRIPE_PUBLIC_KEY) را کپی کنید (با pk_ شروع می‌شود)
3. کلید مخفی (STRIPE_SECRET_KEY) را کپی کنید (با sk_ شروع می‌شود)
4. کلیدها را به مدیر سیستم ارائه دهید تا آن‌ها را تنظیم کند

پس از تنظیم کلیدها، می‌توانید از سیستم پرداخت استفاده کنید.`);
}

/**
 * Converts English digits to Persian digits
 */
export function toPersianDigits(n: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}