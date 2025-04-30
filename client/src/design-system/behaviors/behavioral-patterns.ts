/**
 * @file behavioral-patterns.ts
 * @description الگوهای رفتاری سیستم طراحی پرانا
 * 
 * این فایل شامل توابع و الگوهای استاندارد رفتاری برای کامپوننت‌های سیستم طراحی است.
 * این الگوها به حفظ سازگاری تعاملات کاربری در بین کامپوننت‌های مختلف کمک می‌کنند.
 */

import { designTokens } from "../tokens/design-tokens";

/**
 * الگوهای رفتاری کلیک و ضربه
 * توابع و منطق مرتبط با کلیک‌ها و تعاملات لمسی
 */
export const tappable = {
  // افکت فشرده شدن عناصر قابل کلیک
  pressEffect: "active:scale-95 transition-transform",
  
  // افکت موج ریپل برای دکمه‌ها (میتواند با جاوااسکریپت پیاده‌سازی شود)
  rippleEffect: "overflow-hidden relative",
  
  // فیدبک بصری برای هاور
  hoverFeedback: "hover:brightness-105",
  
  // فیدبک بصری برای کلیک
  activeFeedback: "active:brightness-95",
  
  // ترکیب تمام افکت‌های تعاملی
  interactive: "hover:brightness-105 active:brightness-95 active:scale-[0.98] transition-all",
  
  // بدون افکت تعاملی (برای المان‌های غیرفعال)
  disabled: "opacity-50 pointer-events-none cursor-not-allowed",
};

/**
 * الگوهای رفتاری فوکوس و انتخاب
 * تعریف رفتارهای مرتبط با فوکوس صفحه‌کلید و انتخاب‌ها
 */
export const focusable = {
  // رینگ فوکوس استاندارد
  focusRing: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
  
  // فوکوس خارجی (برای تضاد بیشتر)
  focusOutline: "focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
  
  // فوکوس داخلی (برای المان‌های کوچکتر)
  focusWithin: "focus-within:ring-2 focus-within:ring-primary-500",
  
  // حالت انتخاب برای گزینه‌های قابل انتخاب
  selected: "bg-primary-50 text-primary-900 dark:bg-primary-900 dark:text-primary-50",
  
  // حالت چک شده برای چک‌باکس‌ها و رادیوها
  checked: "bg-primary-500 text-white border-primary-500",
};

/**
 * الگوهای رفتاری درگ و دراپ
 * توابع و کلاس‌های مربوط به قابلیت‌های درگ و دراپ
 */
export const draggable = {
  // المان قابل درگ
  draggable: "cursor-grab active:cursor-grabbing",
  
  // حالت درحال درگ شدن
  dragging: "opacity-50 cursor-grabbing rotate-1 scale-105 shadow-md z-50",
  
  // ناحیه‌های دراپ که میتواند المان‌ها را دریافت کند
  dropzone: "transition-colors border-2 border-dashed border-gray-200",
  
  // حالت هاور روی ناحیه دراپ
  dropzoneHover: "border-primary-500 bg-primary-50 dark:bg-primary-900/20",
  
  // حالت دراپ غیرمجاز
  dropzoneInvalid: "border-error-500 bg-error-50 dark:bg-error-900/20",
};

/**
 * الگوهای رفتاری بارگذاری و انتظار
 * حالت‌های بارگذاری، اسکلتون و وضعیت‌های در حال پردازش
 */
export const loadable = {
  // نمایشگر بارگذاری چرخشی
  spinner: "animate-spin",
  
  // نمایشگر بارگذاری پالسی
  pulse: "animate-pulse",
  
  // لودینگ اسکلتون
  skeleton: "animate-pulse bg-gray-200 dark:bg-gray-700 rounded",
  
  // محتوای در حال لود شدن
  contentLoading: "opacity-60 pointer-events-none",
  
  // قسمت‌های کامل اسکلتون
  skeletonLayout: {
    text: "h-4 bg-gray-200 dark:bg-gray-700 rounded",
    circle: "rounded-full bg-gray-200 dark:bg-gray-700",
    rect: "rounded-md bg-gray-200 dark:bg-gray-700",
  },
};

/**
 * الگوهای رفتاری انیمیشن و حرکت
 * انیمیشن‌های معمول و ترنزیشن‌های کاربردی
 */
export const animatable = {
  // ظاهر شدن با فید
  fadeIn: "animate-fadeIn",
  
  // ناپدید شدن با فید
  fadeOut: "animate-fadeOut",
  
  // اسلاید از پایین
  slideUp: "animate-slideUp",
  
  // اسلاید از بالا
  slideDown: "animate-slideDown",
  
  // بزرگنمایی
  zoomIn: "animate-zoomIn",
  
  // کوچک‌نمایی
  zoomOut: "animate-zoomOut",
  
  // ترنزیشن‌های استاندارد
  transitions: {
    fast: "transition-all duration-150",
    default: "transition-all duration-300",
    slow: "transition-all duration-500",
  },
  
  // ورودی‌های معمول در UI
  entrances: {
    fade: "animate-fadeIn",
    slide: "animate-slideUp",
    zoom: "animate-zoomIn",
    bounce: "animate-bounce",
  },
  
  // خروجی‌های معمول در UI
  exits: {
    fade: "animate-fadeOut",
    slide: "animate-slideDown",
    zoom: "animate-zoomOut",
  },
};

/**
 * الگوهای رفتاری اسکرول و پیمایش
 * مدیریت اسکرول، اسکرولبارها و پیمایش
 */
export const scrollable = {
  // اسکرول نرم به المان‌ها
  smoothScroll: "scroll-smooth",
  
  // قابلیت اسکرول در محتوای سرریز
  scrollable: "overflow-auto",
  
  // اسکرولبار سفارشی برای محتوای طولانی
  customScrollbar: `
    scrollbar-thin 
    scrollbar-thumb-rounded-full 
    scrollbar-track-rounded-full 
    scrollbar-thumb-gray-300 
    scrollbar-track-gray-100 
    dark:scrollbar-thumb-gray-600 
    dark:scrollbar-track-gray-800
  `,
  
  // اسکرول افقی برای محتواهای عرضی
  horizontalScroll: "overflow-x-auto flex flex-row whitespace-nowrap",
  
  // مخفی کردن اسکرولبار
  hideScrollbar: "scrollbar-none",
  
  // اسنپ اسکرول برای گالری‌ها
  snapScroll: "snap-x snap-mandatory scroll-smooth",
  
  // آیتم اسنپ برای اسنپ اسکرول
  snapItem: "snap-center snap-always",
};

/**
 * الگوهای شیشه‌ای (Glassmorphism)
 * توابع و استایل‌های مرتبط با افکت‌های شیشه‌ای و بلور
 */
export const glassMorphism = {
  // پنل شیشه‌ای استاندارد
  glass: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 dark:border-slate-700/20",
  
  // پنل شیشه‌ای با سایه
  glassWithShadow: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/20 dark:border-slate-700/20 shadow-lg",
  
  // افکت مات کردن پشت المان
  frostedGlass: "backdrop-blur-lg backdrop-saturate-150",
  
  // لایه شیشه‌ای برای کارت‌ها
  glassCard: "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/20 dark:border-slate-700/20 shadow-lg",
  
  // دکمه شیشه‌ای
  glassButton: "bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/10 dark:border-slate-700/10 hover:bg-white/30 dark:hover:bg-slate-700/30",
  
  // نوار شیشه‌ای (برای نویگیشن و هدرها)
  glassBar: "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-white/20 dark:border-slate-700/20",
};

/**
 * الگوهای ریسپانسیو و تطبیقی
 * رفتارهای مرتبط با قابلیت پاسخگویی و تطبیق با اندازه‌های مختلف صفحه
 */
export const responsive = {
  // مخفی کردن در موبایل
  hideOnMobile: "hidden sm:block",
  
  // مخفی کردن در دسکتاپ
  hideOnDesktop: "block sm:hidden",
  
  // طرح گرید مشبک برای کارت‌ها با تغییر ستون‌ها در اندازه‌های مختلف
  responsiveGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
  
  // فاصله‌گذاری پاسخگو
  responsiveSpacing: "p-4 sm:p-6 md:p-8 lg:p-10",
  
  // اندازه فونت پاسخگو
  responsiveText: "text-sm sm:text-base md:text-lg lg:text-xl",
  
  // فلکس‌باکس پاسخگو (تغییر جهت در موبایل)
  responsiveFlex: "flex flex-col sm:flex-row",
  
  // محتوای پنهان/آشکار شونده
  collapsible: {
    mobile: "max-sm:hidden",
    tablet: "max-md:hidden",
    desktop: "max-lg:hidden",
  },
};

/**
 * الگوهای دسترس‌پذیری (a11y)
 * بهبود دسترس‌پذیری برای همه کاربران
 */
export const accessibility = {
  // متن مخفی برای اسکرین‌ریدرها
  srOnly: "sr-only",
  
  // متن مخفی که فقط هنگام فوکوس نمایان می‌شود
  srOnlyFocusable: "sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:text-black",
  
  // راهنمای فوکوس حرکتی
  focusGuide: "focus:outline-dashed focus:outline-2 focus:outline-primary-500",
  
  // دکمه‌های بزرگ برای هدف‌گیری آسان
  touchTarget: "min-h-[44px] min-w-[44px]",
  
  // بهبود کنتراست متن روی پس‌زمینه
  enhancedContrast: "text-gray-900 dark:text-white",
  
  // دسترس‌پذیری صفحه‌کلید
  keyboardAccessible: "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
};

/**
 * الگوهای کنتراست و تاریک/روشن
 * سازگاری با حالت‌های مختلف نمایش
 */
export const contrast = {
  // متن برای خوانایی بهتر در پس‌زمینه روشن/تاریک
  text: {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-700 dark:text-gray-300",
    muted: "text-gray-500 dark:text-gray-400",
    inverted: "text-white dark:text-gray-900",
  },
  
  // پس‌زمینه‌های مناسب برای حالت‌های مختلف
  background: {
    primary: "bg-white dark:bg-slate-900",
    secondary: "bg-gray-100 dark:bg-slate-800",
    tertiary: "bg-gray-200 dark:bg-slate-700",
    brand: "bg-primary-500 dark:bg-primary-600",
  },
  
  // حاشیه‌ها با کنتراست مناسب
  border: {
    subtle: "border-gray-200 dark:border-slate-700",
    default: "border-gray-300 dark:border-slate-600",
    strong: "border-gray-400 dark:border-slate-500",
  },
  
  // سایه‌های سازگار با مد تاریک و روشن
  shadow: {
    sm: "shadow-sm dark:shadow-slate-900/10",
    default: "shadow dark:shadow-slate-900/20",
    lg: "shadow-lg dark:shadow-slate-900/30",
  },
};

/**
 * الگوهای نمایش وضعیت
 * نمایش وضعیت‌های مختلف المان‌ها
 */
export const status = {
  // وضعیت‌های معنایی برای نمایش اطلاعات
  info: "bg-info-50 text-info-900 dark:bg-info-900/30 dark:text-info-200 border-info-200 dark:border-info-800",
  success: "bg-success-50 text-success-900 dark:bg-success-900/30 dark:text-success-200 border-success-200 dark:border-success-800",
  warning: "bg-warning-50 text-warning-900 dark:bg-warning-900/30 dark:text-warning-200 border-warning-200 dark:border-warning-800",
  error: "bg-error-50 text-error-900 dark:bg-error-900/30 dark:text-error-200 border-error-200 dark:border-error-800",
  
  // بج‌های وضعیت
  badge: {
    info: "bg-info-100 text-info-800 dark:bg-info-900/50 dark:text-info-200",
    success: "bg-success-100 text-success-800 dark:bg-success-900/50 dark:text-success-200",
    warning: "bg-warning-100 text-warning-800 dark:bg-warning-900/50 dark:text-warning-200",
    error: "bg-error-100 text-error-800 dark:bg-error-900/50 dark:text-error-200",
  },
  
  // متن وضعیت
  text: {
    info: "text-info-600 dark:text-info-400",
    success: "text-success-600 dark:text-success-400",
    warning: "text-warning-600 dark:text-warning-400",
    error: "text-error-600 dark:text-error-400",
  },
  
  // نشانگر وضعیت (دات کوچک)
  indicator: {
    info: "h-2 w-2 rounded-full bg-info-500",
    success: "h-2 w-2 rounded-full bg-success-500",
    warning: "h-2 w-2 rounded-full bg-warning-500",
    error: "h-2 w-2 rounded-full bg-error-500",
    neutral: "h-2 w-2 rounded-full bg-gray-500",
  },
};

/**
 * تمام الگوهای رفتاری در یک آبجکت
 */
export const behavioralPatterns = {
  tappable,
  focusable,
  draggable,
  loadable,
  animatable,
  scrollable,
  glassMorphism,
  responsive,
  accessibility,
  contrast,
  status,
};