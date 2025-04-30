/**
 * @file design-tokens.ts
 * @description توکن‌های طراحی سیستم پرانا
 * 
 * این فایل شامل تمام توکن‌های طراحی سیستم است که به عنوان منبع اصلی
 * برای تنظیمات بصری و سبک‌های کاربری استفاده می‌شود.
 */

/**
 * رنگ‌های سیستم
 * پالت رنگی اصلی برای استفاده در سراسر اپلیکیشن
 */
export const colors = {
  // رنگ‌های اصلی برند
  brand: {
    primary: {
      50: "#ebf9f7",
      100: "#c9eee8",
      200: "#a0ddd3",
      300: "#6ec8bb",
      400: "#48b5a7",
      500: "#379c8f", // رنگ اصلی برند (فیروزه‌ای)
      600: "#2d7f75",
      700: "#236158",
      800: "#19433e",
      900: "#0d221f",
      950: "#041110"
    },
    tiffany: {
      // فیروزه‌ای غنی برای المان‌های کلیدی
      DEFAULT: "#18B5B5", 
      light: "#72D6D6",
      dark: "#108282",
    },
    secondary: {
      50: "#fdf4f3",
      100: "#fce8e7",
      200: "#fbd6d3",
      300: "#f7b9b4",
      400: "#f08e86", // رنگ ثانویه برند (مرجانی)
      500: "#e56a5f",
      600: "#d34940",
      700: "#b23028",
      800: "#942c25",
      900: "#7c2c26",
      950: "#431411"
    },
  },
  
  // رنگ‌های معنایی (وضعیت‌ها)
  semantic: {
    success: {
      50: "#ebfbee",
      100: "#d2f5d7",
      200: "#a7eab2",
      300: "#6fd886",
      400: "#37c05d",
      500: "#1ca442", // رنگ موفقیت
      600: "#178539",
      700: "#176a31",
      800: "#17522c",
      900: "#154428",
      950: "#062614"
    },
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444", // رنگ خطا
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a"
    },
    warning: {
      50: "#fffbea",
      100: "#fff3c4",
      200: "#fce589",
      300: "#fbd24e",
      400: "#f8ba22",
      500: "#f59e0b", // رنگ هشدار
      600: "#d97706",
      700: "#b45309",
      800: "#92400d",
      900: "#783610",
      950: "#421c03"
    },
    info: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6", // رنگ اطلاعات
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554"
    },
  },
  
  // رنگ‌های خنثی (متن، پس‌زمینه، حاشیه و...)
  neutral: {
    50: "#f7f8fa",
    100: "#eef0f3",
    200: "#d9dde3",
    300: "#b9c0cd",
    400: "#909cb1",
    500: "#707D96",
    600: "#58647b",
    700: "#434e61",
    800: "#384051",
    900: "#1f2937",
    950: "#111827"
  },
  
  // رنگ‌های دی‌ام‌آر (DMR: Dark Mode Ready)
  // برای استفاده در حالت دارک و لایت
  dmr: {
    background: {
      light: "#ffffff",
      DEFAULT: "#f7f8fa",
      dark: "#111827",
    },
    surface: {
      light: "#f7f8fa",
      DEFAULT: "#ffffff",
      dark: "#1f2937",
    },
    border: {
      light: "#eef0f3",
      DEFAULT: "#d9dde3",
      dark: "#384051",
    },
    text: {
      primary: {
        light: "#1f2937",
        dark: "#ffffff",
      },
      secondary: {
        light: "#58647b",
        dark: "#b9c0cd",
      },
      muted: {
        light: "#909cb1",
        dark: "#707D96",
      },
    },
  },
  
  // گرادیان‌های طراحی
  gradients: {
    primary: "linear-gradient(135deg, #379c8f 0%, #18B5B5 100%)",
    secondary: "linear-gradient(135deg, #e56a5f 0%, #f08e86 100%)",
    success: "linear-gradient(135deg, #1ca442 0%, #37c05d 100%)",
    error: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
    warning: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
    info: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    glass: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
    glassDark: "linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(17, 24, 39, 0.7) 100%)",
  },
};

/**
 * فاصله‌گذاری
 * استاندارد فاصله‌گذاری برای حاشیه، پدینگ و فضاهای خالی
 */
export const spacing = {
  0: "0px",
  0.5: "0.125rem", // 2px
  1: "0.25rem",   // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem",    // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem",   // 12px
  3.5: "0.875rem", // 14px
  4: "1rem",      // 16px
  5: "1.25rem",   // 20px
  6: "1.5rem",    // 24px
  7: "1.75rem",   // 28px
  8: "2rem",      // 32px
  9: "2.25rem",   // 36px
  10: "2.5rem",   // 40px
  11: "2.75rem",  // 44px
  12: "3rem",     // 48px
  14: "3.5rem",   // 56px
  16: "4rem",     // 64px
  20: "5rem",     // 80px
  24: "6rem",     // 96px
  28: "7rem",     // 112px
  32: "8rem",     // 128px
  36: "9rem",     // 144px
  40: "10rem",    // 160px
  44: "11rem",    // 176px
  48: "12rem",    // 192px
  52: "13rem",    // 208px
  56: "14rem",    // 224px
  60: "15rem",    // 240px
  64: "16rem",    // 256px
  72: "18rem",    // 288px
  80: "20rem",    // 320px
  96: "24rem",    // 384px
};

/**
 * تایپوگرافی و فونت‌ها
 * تنظیمات مربوط به متن و فونت‌ها
 */
export const typography = {
  // فونت‌های اصلی
  fontFamily: {
    primary: "'Peyda', 'Tahoma', 'sans-serif'", // فونت اصلی فارسی
    secondary: "'Peyda', 'Arial', 'sans-serif'", // فونت ثانویه
    mono: "'Roboto Mono', 'monospace'", // فونت مونو برای کدها
  },
  
  // وزن‌های فونت
  fontWeight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  
  // اندازه‌های فونت
  fontSize: {
    xs: "0.75rem",     // 12px
    sm: "0.875rem",    // 14px
    base: "1rem",      // 16px
    lg: "1.125rem",    // 18px
    xl: "1.25rem",     // 20px
    "2xl": "1.5rem",   // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem",  // 36px
    "5xl": "3rem",     // 48px
    "6xl": "3.75rem",  // 60px
    "7xl": "4.5rem",   // 72px
    "8xl": "6rem",     // 96px
    "9xl": "8rem",     // 128px
  },
  
  // ارتفاع خطوط
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  
  // تراکم حروف
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
};

/**
 * شعاع گوشه‌ها
 * تنظیمات مربوط به گرد بودن گوشه‌های المان‌ها
 */
export const borderRadius = {
  none: "0px",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px", // دایره کامل
};

/**
 * سایه‌ها
 * تنظیمات مربوط به سایه‌ها برای ایجاد عمق و برجستگی
 */
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  // سایه‌های شیشه‌ای
  glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
  glassDark: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
  // سایه‌های نیومورفیک
  neumorphic: "10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff",
  neumorphicDark: "10px 10px 20px #151b29, -10px -10px 20px #1d253a",
  // سایه‌های برجسته
  elevated: "0px 10px 20px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)",
};

/**
 * انیمیشن‌ها و ترنزیشن‌ها
 * تنظیمات مربوط به حرکت‌ها و جلوه‌های بصری پویا
 */
export const animation = {
  // مدت زمان‌های ترنزیشن
  duration: {
    75: "75ms",
    100: "100ms",
    150: "150ms",
    200: "200ms",
    300: "300ms",
    500: "500ms",
    700: "700ms",
    1000: "1000ms",
  },
  
  // توابع زمان‌بندی ترنزیشن
  easing: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    // تابع زمان‌بندی سفارشی برای حرکت‌های طبیعی
    natural: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
  
  // انیمیشن‌های از پیش تعریف شده
  presets: {
    spin: "spin 1s linear infinite",
    ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    bounce: "bounce 1s infinite",
    fadeIn: "fadeIn 0.3s ease-in-out",
    fadeOut: "fadeOut 0.3s ease-in-out",
    slideUp: "slideUp 0.3s ease-in-out",
    slideDown: "slideDown 0.3s ease-in-out",
    slideLeft: "slideLeft 0.3s ease-in-out",
    slideRight: "slideRight 0.3s ease-in-out",
    zoomIn: "zoomIn 0.3s ease-in-out",
    zoomOut: "zoomOut 0.3s ease-in-out",
  },
};

/**
 * ویژگی‌های قابلیت پاسخگویی
 * نقاط شکست برای طراحی ریسپانسیو
 */
export const breakpoints = {
  xs: "320px",    // موبایل کوچک
  sm: "640px",    // موبایل
  md: "768px",    // تبلت
  lg: "1024px",   // لپ‌تاپ
  xl: "1280px",   // دسکتاپ
  "2xl": "1536px", // صفحه نمایش بزرگ
};

/**
 * ویژگی‌های تم و مد
 * تم‌های از پیش تعریف شده برای اپلیکیشن
 */
export const themes = {
  light: {
    background: colors.dmr.background.light,
    foreground: colors.dmr.text.primary.light,
    muted: colors.dmr.text.muted.light,
    border: colors.dmr.border.light,
  },
  dark: {
    background: colors.dmr.background.dark,
    foreground: colors.dmr.text.primary.dark,
    muted: colors.dmr.text.muted.dark,
    border: colors.dmr.border.dark,
  },
};

/**
 * تنظیمات شیشه‌ای (Glassmorphism)
 * مقادیر فیلتر برای ایجاد افکت شیشه‌ای
 */
export const glass = {
  light: {
    background: "rgba(255, 255, 255, 0.7)",
    blur: "backdrop-filter: blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    shadow: shadows.glass,
  },
  dark: {
    background: "rgba(17, 24, 39, 0.7)",
    blur: "backdrop-filter: blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    shadow: shadows.glassDark,
  },
};

/**
 * تمام توکن‌های طراحی در یک آبجکت
 */
export const designTokens = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  animation,
  breakpoints,
  themes,
  glass,
};