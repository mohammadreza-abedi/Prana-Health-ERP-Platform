/**
 * @file behavioral-patterns.ts
 * @description الگوهای رفتاری سیستم طراحی پرانا
 * 
 * این فایل اصول و الگوهای تعاملی و رفتاری برای کامپوننت‌های سیستم طراحی را تعریف می‌کند.
 * بر اساس اصل "لایه‌گذاری رفتاری" در استراتژی UI/UX پرانا، این الگوها برای ایجاد یک سیستم تعاملی
 * منسجم طراحی شده‌اند که با افزایش پیچیدگی وظیفه، عمق تعامل را افزایش می‌دهد.
 */

import { designTokens } from "../tokens/design-tokens";

/**
 * الگوهای پایه تعامل برای کاربر
 * این الگوها سطوح مختلف تعامل را تعریف می‌کنند
 */
export const interactionPatterns = {
  /**
   * تعامل برای عناصر پایه مانند دکمه‌ها و لینک‌ها
   */
  primary: {
    idle: {
      transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.smooth}`,
      transform: "scale(1)",
      opacity: 1,
    },
    hover: {
      transform: "scale(1.02)",
      boxShadow: designTokens.shadows.md,
    },
    active: {
      transform: "scale(0.98)",
    },
    focus: {
      outline: `2px solid ${designTokens.colors.primary[500]}`,
      outlineOffset: "2px",
    },
    disabled: {
      opacity: 0.6,
      pointerEvents: "none",
    },
  },

  /**
   * تعامل برای کارت‌ها و کانتینرها
   */
  container: {
    idle: {
      transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.smooth}`,
      transform: "translateY(0)",
    },
    hover: {
      transform: "translateY(-2px)",
      boxShadow: designTokens.shadows.lg,
    },
    active: {
      transform: "translateY(0)",
    },
    focus: {
      outline: `2px solid ${designTokens.colors.primary[500]}`,
      outlineOffset: "2px",
    },
  },

  /**
   * تعامل مخصوص برای عناصر لیستی و جدولی
   */
  listItem: {
    idle: {
      transition: `all ${designTokens.animation.duration.normal} ${designTokens.animation.easing.smooth}`,
      backgroundColor: "transparent",
    },
    hover: {
      backgroundColor: designTokens.colors.gray[100],
    },
    active: {
      backgroundColor: designTokens.colors.gray[200],
    },
    selected: {
      backgroundColor: designTokens.colors.primary[50],
      borderLeft: `3px solid ${designTokens.colors.primary[500]}`,
    },
  },
};

/**
 * الگوهای انیمیشن‌های سیستم
 * این انیمیشن‌ها برای حالت‌های مختلف عناصر UI استفاده می‌شوند
 */
export const animationPatterns = {
  /**
   * انیمیشن ورود عناصر به صفحه
   */
  enter: {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      }
    },
    slideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    },
    slideDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    },
    slideRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    },
    slideLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { 
        duration: 0.3, 
        ease: designTokens.animation.easing.bounce 
      }
    },
  },
  
  /**
   * انیمیشن خروج عناصر از صفحه
   */
  exit: {
    fade: {
      exit: { opacity: 0 },
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      }
    },
    slideDown: {
      exit: { opacity: 0, y: 20 },
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      }
    },
    slideUp: {
      exit: { opacity: 0, y: -20 },
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      }
    },
    scale: {
      exit: { opacity: 0, scale: 0.95 },
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      }
    },
  },
  
  /**
   * انیمیشن‌های تأکیدی برای جلب توجه کاربر
   */
  attention: {
    pulse: {
      animate: { 
        scale: [1, 1.05, 1],
      },
      transition: { 
        duration: 0.6, 
        repeat: 1,
      }
    },
    shake: {
      animate: { 
        x: [0, -5, 5, -5, 5, 0],
      },
      transition: { 
        duration: 0.4,
      }
    },
    glow: {
      animate: { 
        boxShadow: [
          "0 0 0 0 rgba(19, 174, 230, 0)",
          "0 0 0 8px rgba(19, 174, 230, 0.3)",
          "0 0 0 0 rgba(19, 174, 230, 0)"
        ],
      },
      transition: { 
        duration: 1.5,
      }
    },
  },
};

/**
 * الگوهای بازخورد سیستم
 * برای ارائه بازخورد به کاربر در شرایط مختلف
 */
export const feedbackPatterns = {
  /**
   * بازخورد در حین بارگیری
   */
  loading: {
    spinner: {
      component: "Spinner",
      size: "md",
      color: designTokens.colors.primary[500],
    },
    skeleton: {
      baseColor: designTokens.colors.gray[200],
      highlightColor: designTokens.colors.gray[300],
      duration: 1.5,
    },
    progressBar: {
      height: "4px",
      color: designTokens.colors.primary[500],
      bgColor: designTokens.colors.gray[200],
    }
  },
  
  /**
   * بازخورد پس از عملیات موفق
   */
  success: {
    toast: {
      duration: 3000,
      type: "success",
      position: "bottom-center",
    },
    animation: {
      name: "checkmark",
      duration: 0.5,
      color: designTokens.colors.success[500],
    },
  },
  
  /**
   * بازخورد در صورت خطا
   */
  error: {
    toast: {
      duration: 5000,
      type: "error",
      position: "bottom-center",
    },
    animation: {
      name: "exclamation",
      duration: 0.5,
      color: designTokens.colors.error[500],
    },
    shake: {
      intensity: 5,
      duration: 0.4,
    }
  },
};

/**
 * الگوهای راهنمای درون‌خطی
 * برای هدایت کاربر در حین تعامل با سیستم
 */
export const guidancePatterns = {
  /**
   * راهنمای لحظه‌ای در هنگام تعامل با اجزای مختلف
   */
  tooltip: {
    delay: 500,
    duration: "auto",
    position: "top",
    maxWidth: 250,
    padding: designTokens.spacing[2],
    borderRadius: designTokens.radius.md,
    backgroundColor: designTokens.colors.gray[900],
    color: designTokens.colors.gray[100],
  },
  
  /**
   * راهنمای درون-محتوایی برای مناطق پیچیده
   */
  inlineHelp: {
    icon: "Info",
    color: designTokens.colors.info[500],
    position: "inline-end",
    expandable: true,
  },
  
  /**
   * تورهای راهنما برای آشنایی کاربر با بخش‌های جدید
   */
  guide: {
    steps: {
      highlight: true,
      overlay: true,
      position: "auto",
    },
    controls: {
      showProgress: true,
      allowSkip: true,
    }
  },
};

/**
 * الگوهای ناوبری و حرکت در سیستم
 */
export const navigationPatterns = {
  /**
   * نوع انتقال بین صفحات
   */
  pageTransition: {
    default: "fade",
    complex: "slideUp",
    duration: 0.3,
  },
  
  /**
   * مسیرهای استاندارد ناوبری
   */
  paths: {
    primary: {
      animation: "slideRight",
      breadcrumb: true,
    },
    secondary: {
      animation: "fade",
      breadcrumb: true,
    },
    modal: {
      animation: "scale",
      breadcrumb: false,
    },
  },
  
  /**
   * استراتژی‌های برگشت و حرکت در تاریخچه
   */
  historyStrategy: {
    backButton: true,
    backGesture: true,
    statePreservation: true,
  },
};

/**
 * ترکیب تمام الگوهای رفتاری سیستم
 */
export const behavioralPatterns = {
  interaction: interactionPatterns,
  animation: animationPatterns,
  feedback: feedbackPatterns,
  guidance: guidancePatterns,
  navigation: navigationPatterns,
};

export default behavioralPatterns;