/**
 * @file design-tokens.ts
 * @description سیستم توکن‌های مرکزی برای پلتفرم پرانا
 * 
 * این فایل مجموعه کامل توکن‌های طراحی را تعریف می‌کند که بر اساس استراتژی UI/UX پلتفرم
 * پیاده‌سازی شده است. توکن‌ها به صورت مرکزی در اینجا تعریف می‌شوند تا سازگاری و یکپارچگی
 * در کل پلتفرم حفظ شود.
 */

// رنگ‌های پایه سیستم
export const colorTokens = {
  /**
   * پالت‌های اصلی
   */
  primary: {
    50: '#effbff',
    100: '#def4ff',
    200: '#b6ebfe',
    300: '#79dcfe',
    400: '#36c7f9',
    500: '#13aee6', // رنگ اصلی - تیفانی
    600: '#088dbc',
    700: '#0a7299',
    800: '#0f5e7d',
    900: '#124f68',
    950: '#0b3344',
  },
  secondary: {
    50: '#f4f8ff',
    100: '#e9f1ff',
    200: '#d2e2fe',
    300: '#aec9fe',
    400: '#85a7fb',
    500: '#5d7ef5', // آکوا
    600: '#3e57e8',
    700: '#2e3fd6',
    800: '#2836ae',
    900: '#262f8a',
    950: '#1a1d54',
  },
  
  /**
   * پالت‌های وضعیت
   * برای نمایش وضعیت‌های مختلف کاربردی
   */
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80', 
    500: '#22c55e', // موفقیت
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b', // هشدار
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444', // خطا
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // اطلاعات
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  /**
   * پالت‌های خاکستری
   * برای متن، پس‌زمینه و عناصر خنثی
   */
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af', 
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712',
  },
};

// سایه‌های استاندارد سیستم
export const shadowTokens = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  glow: '0 0 15px 2px rgba(19, 174, 230, 0.3)',
  'error-glow': '0 0 15px 2px rgba(239, 68, 68, 0.3)',
  'success-glow': '0 0 15px 2px rgba(34, 197, 94, 0.3)',
};

// تایپوگرافی (سیستم متن)
export const typographyTokens = {
  fontFamily: {
    // فونت‌های فارسی
    primary: 'Peyda, sans-serif',
    secondary: 'YekanBakh, sans-serif',
    mono: 'monospace',
  },
  fontSize: {
    'xs': '0.75rem',   // 12px
    'sm': '0.875rem',  // 14px
    'base': '1rem',    // 16px 
    'lg': '1.125rem',  // 18px
    'xl': '1.25rem',   // 20px
    '2xl': '1.5rem',   // 24px 
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300', 
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// فاصله‌گذاری (اسپیسینگ)
export const spacingTokens = {
  '0': '0',
  '0.5': '0.125rem', // 2px
  '1': '0.25rem',    // 4px
  '1.5': '0.375rem', // 6px
  '2': '0.5rem',     // 8px
  '2.5': '0.625rem', // 10px 
  '3': '0.75rem',    // 12px
  '4': '1rem',       // 16px
  '5': '1.25rem',    // 20px
  '6': '1.5rem',     // 24px
  '8': '2rem',       // 32px
  '10': '2.5rem',    // 40px
  '12': '3rem',      // 48px
  '16': '4rem',      // 64px
  '20': '5rem',      // 80px
  '24': '6rem',      // 96px
  '32': '8rem',      // 128px
};

// شعاع‌های گردی گوشه
export const radiusTokens = {
  'none': '0',
  'sm': '0.125rem', // 2px
  'md': '0.25rem',  // 4px
  'lg': '0.5rem',   // 8px
  'xl': '0.75rem',  // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  'full': '9999px',
  'card': '0.75rem', // مقدار استاندارد برای کارت‌ها
  'chip': '9999px',  // برای نشانه‌ها/چیپ‌ها
  'button': '0.5rem', // برای دکمه‌ها
};

// زمان‌بندی انیمیشن‌ها
export const animationTokens = {
  duration: {
    'fastest': '50ms',
    'faster': '100ms',
    'fast': '150ms',
    'normal': '200ms',
    'slow': '300ms',
    'slower': '400ms',
    'slowest': '500ms',
  },
  easing: {
    'linear': 'linear',
    'ease': 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  },
};

// اندازه‌های استاندارد عرض/ارتفاع
export const sizeTokens = {
  // ارتفاع مولفه‌های UI
  componentHeight: {
    'xs': '1.5rem',    // 24px - برای اجزای بسیار کوچک
    'sm': '2rem',      // 32px - برای اجزای کوچک
    'md': '2.5rem',    // 40px - استاندارد برای دکمه‌ها و فیلدها
    'lg': '3rem',      // 48px - برای اجزای بزرگتر
    'xl': '3.5rem',    // 56px - برای اجزای بسیار بزرگ
  },
  
  // عرض مولفه‌های UI در حالت‌های مختلف
  width: {
    'xs': '20rem',    // 320px
    'sm': '24rem',    // 384px
    'md': '28rem',    // 448px 
    'lg': '32rem',    // 512px
    'xl': '36rem',    // 576px
    '2xl': '42rem',   // 672px
    '3xl': '48rem',   // 768px
    '4xl': '56rem',   // 896px
    '5xl': '64rem',   // 1024px
    '6xl': '72rem',   // 1152px
    '7xl': '80rem',   // 1280px
  },
  
  // وزن‌های بصری - پیچیدگی اجزا
  visualWeight: {
    lowest: 1,     // برای عناصر پس‌زمینه و تزئینی
    low: 2,        // برای عناصر اطلاعاتی غیرضروری
    medium: 3,     // برای محتوای اصلی و معمولی
    high: 4,       // برای عناصر مهم و برجسته
    highest: 5,    // برای عناصر بحرانی و اکشن‌های اصلی
  }
};

// استراتژی تقسیم‌بندی فضا براساس لایه‌های تعاملی
export const layerTokens = {
  behavioral: {
    passive: 1,    // لایه 1 - نمایشی و غیرتعاملی
    actionable: 2, // لایه 2 - عناصر قابل کلیک، فیلترها، ورودی‌ها
    modal: 3,      // لایه 3 - پاپ‌آپ‌ها و فرم‌های مودال
  },
  
  // z-index استاندارد برای لایه‌های مختلف
  zIndex: {
    background: -10,
    base: 0,
    elevated: 10,
    sticky: 100,
    dropdown: 200, 
    overlay: 300,
    modal: 400,
    toast: 500,
    tooltip: 600,
    highest: 9999,
  }
};

// استراتژی گرید و فضابندی
export const gridTokens = {
  // تعداد ستون‌های گرید
  columns: 12,
  
  // فواصل استاندارد بین آیتم‌های گرید
  gap: {
    xs: '0.5rem',  // 8px 
    sm: '1rem',    // 16px
    md: '1.5rem',  // 24px
    lg: '2rem',    // 32px
    xl: '2.5rem',  // 40px
  },
  
  // مارژین‌های کناری در نماهای مختلف
  horizontalMargin: {
    mobile: '1rem',
    tablet: '2rem',
    desktop: '3rem',
    wide: '4rem',
  },
  
  // تراکم عناصر در یک ناحیه
  density: {
    compact: '0.75',
    normal: '1',
    loose: '1.5',
  },
};

// توکن‌های مرتبط با اصلاح جهت در حالت RTL/LTR
export const directionTokens = {
  start: 'right', // RTL - شروع از راست
  end: 'left',    // RTL - پایان در چپ
  reverse: true,  // معکوس‌کردن فلکس و ترتیب عناصر
  flip: {         // معکوس‌کردن مارژین‌ها/پدینگ‌ها
    margin: {
      marginRight: 'marginLeft',
      marginLeft: 'marginRight',
    },
    padding: {
      paddingRight: 'paddingLeft',
      paddingLeft: 'paddingRight',
    },
  },
};

// اکسپورت نهایی توکن‌های طراحی
export const designTokens = {
  colors: colorTokens,
  shadows: shadowTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  animation: animationTokens,
  size: sizeTokens,
  layer: layerTokens,
  grid: gridTokens,
  direction: directionTokens,
};

export default designTokens;