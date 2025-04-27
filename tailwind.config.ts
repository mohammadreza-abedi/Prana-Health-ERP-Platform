import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // رنگ‌های جدید اختصاصی پرانا
        tiffany: {
          DEFAULT: "#2EC4B6",
          light: "#4DD8CB", 
          dark: "#189E91",
        },
        aqua: {
          DEFAULT: "#5BCEFA",
          light: "#99E6FF",
          dark: "#00A3E0",
        },
        amber: {
          DEFAULT: "#FFBB00",
          light: "#FFCC44",
          dark: "#CC9600",
        },
        rose: {
          DEFAULT: "#D72638",
          light: "#E95666",
          dark: "#B3081B",
        },
        
        // رنگ‌های گرادیانت
        gradient: {
          "tiffany-blue": "linear-gradient(135deg, #2EC4B6 0%, #5BCEFA 100%)",
          "amber-rose": "linear-gradient(135deg, #FFBB00 0%, #D72638 100%)",
          "slate-zinc": "linear-gradient(135deg, #64748b 0%, #52525b 100%)",
          "emerald-aqua": "linear-gradient(135deg, #10b981 0%, #5BCEFA 100%)",
          "purple-indigo": "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
        },
        
        // رنگ‌های نمودار با مقیاس بیشتر
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
          "6": "#2EC4B6",
          "7": "#5BCEFA",
          "8": "#FFBB00",
          "9": "#D72638",
          "10": "#6366f1",
          "11": "#10b981",
          "12": "#a855f7",
        },
        
        // سایدبار و کامپوننت‌های مخصوص
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        
        // رنگ‌های اتمی برای سیستم آلرت
        status: {
          success: "#10b981",
          warning: "#FFBB00",
          error: "#D72638",
          info: "#5BCEFA",
          disabled: "#9ca3af",
          pending: "#a855f7",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "progress": {
          "0%": { 
            backgroundPosition: "0% 50%", 
            width: "0%" 
          },
          "50%": { 
            width: "60%" 
          },
          "100%": { 
            backgroundPosition: "100% 50%", 
            width: "100%" 
          },
        },
        "gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "float-up": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-20px)", opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "subtle-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        "ping-slow": {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "70%": { transform: "scale(2)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        "beat": {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "shine": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(46, 196, 182, 0.5)" },
          "50%": { opacity: "0.7", boxShadow: "0 0 40px rgba(46, 196, 182, 0.8)" },
        },
        "appear": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        
        // انیمیشن‌های جدید برای تجربه کاربری پیشرفته
        "fade-in-bottom": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "70%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "expand": {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        "rubber-band": {
          "0%": { transform: "scale3d(1, 1, 1)" },
          "30%": { transform: "scale3d(1.25, 0.75, 1)" },
          "40%": { transform: "scale3d(0.75, 1.25, 1)" },
          "50%": { transform: "scale3d(1.15, 0.85, 1)" },
          "65%": { transform: "scale3d(0.95, 1.05, 1)" },
          "75%": { transform: "scale3d(1.05, 0.95, 1)" },
          "100%": { transform: "scale3d(1, 1, 1)" },
        },
        "spinner": {
          "0%": { transform: "rotate(0deg)", strokeDashoffset: "100" },
          "50%": { strokeDashoffset: "0" },
          "100%": { transform: "rotate(360deg)", strokeDashoffset: "100" },
        },
        "wave": {
          "0%": { transform: "translateY(0)" },
          "25%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(0)" },
          "75%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(0)" },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "25%": { backgroundPosition: "100% 25%" },
          "50%": { backgroundPosition: "100% 50%" },
          "75%": { backgroundPosition: "0% 75%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "blur-in": {
          "0%": { filter: "blur(12px)", opacity: "0" },
          "100%": { filter: "blur(0)", opacity: "1" },
        },
        "breath": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(0.95)", opacity: "0.7" },
        },
        "hue-rotate": {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        "text-glitch": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        "flip-x": {
          "0%": { transform: "perspective(400px) rotateX(90deg)", opacity: "0" },
          "40%": { transform: "perspective(400px) rotateX(-20deg)" },
          "60%": { transform: "perspective(400px) rotateX(10deg)" },
          "80%": { transform: "perspective(400px) rotateX(-5deg)" },
          "100%": { transform: "perspective(400px) rotateX(0deg)", opacity: "1" },
        },
        "flip-y": {
          "0%": { transform: "perspective(400px) rotateY(90deg)", opacity: "0" },
          "40%": { transform: "perspective(400px) rotateY(-20deg)" },
          "60%": { transform: "perspective(400px) rotateY(10deg)" },
          "80%": { transform: "perspective(400px) rotateY(-5deg)" },
          "100%": { transform: "perspective(400px) rotateY(0deg)", opacity: "1" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "fadeInOut": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "rotating-shine": {
          "0%": { backgroundPosition: "0% 0%", opacity: "0.5" },
          "25%": { opacity: "0.7" },
          "50%": { backgroundPosition: "100% 100%", opacity: "1" },
          "75%": { opacity: "0.7" },
          "100%": { backgroundPosition: "0% 0%", opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "progress": "progress 3s ease-in-out infinite",
        "gradient": "gradient 5s ease infinite",
        "float-up": "float-up 1s ease-out forwards",
        "float": "float 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        "subtle-bounce": "subtle-bounce 2s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "beat": "beat 1s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "shine": "shine 3s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
        "appear": "appear 0.3s ease-out forwards", 
        "rotate-slow": "rotate-slow 20s linear infinite",
        
        // انیمیشن‌های جدید
        "fade-in-bottom": "fade-in-bottom 0.5s ease-out forwards",
        "fade-in-right": "fade-in-right 0.5s ease-out forwards",
        "fade-in-left": "fade-in-left 0.5s ease-out forwards",
        "bounce-in": "bounce-in 0.8s ease-out forwards",
        "expand": "expand 0.3s ease-out forwards",
        "slide-down": "slide-down 0.3s ease-out forwards",
        "slide-up": "slide-up 0.3s ease-out forwards",
        "shake": "shake 0.5s ease-in-out",
        "rubber-band": "rubber-band 0.8s ease-out",
        "spinner": "spinner 2s linear infinite",
        "wave": "wave 1.5s ease-in-out infinite",
        "gradient-flow": "gradient-flow 8s ease infinite",
        "blur-in": "blur-in 0.5s ease-out forwards",
        "breath": "breath 4s ease-in-out infinite",
        "hue-rotate": "hue-rotate 10s linear infinite",
        "text-glitch": "text-glitch 0.3s linear",
        "flip-x": "flip-x 0.8s ease-out forwards",
        "flip-y": "flip-y 0.8s ease-out forwards",
        "marquee": "marquee 10s linear infinite",
        "fadeInOut": "fadeInOut 3s ease-in-out infinite",
        "rotating-shine": "rotating-shine 8s linear infinite",
        
        // تأخیرها در انیمیشن‌ها
        "fade-in-bottom-delay-100": "fade-in-bottom 0.5s ease-out 0.1s forwards",
        "fade-in-bottom-delay-200": "fade-in-bottom 0.5s ease-out 0.2s forwards",
        "fade-in-bottom-delay-300": "fade-in-bottom 0.5s ease-out 0.3s forwards",
        "fade-in-bottom-delay-400": "fade-in-bottom 0.5s ease-out 0.4s forwards",
        "fade-in-bottom-delay-500": "fade-in-bottom 0.5s ease-out 0.5s forwards",
        "fade-in-bottom-delay-600": "fade-in-bottom 0.5s ease-out 0.6s forwards",
        "fade-in-bottom-delay-700": "fade-in-bottom 0.5s ease-out 0.7s forwards",
        "fade-in-bottom-delay-800": "fade-in-bottom 0.5s ease-out 0.8s forwards",
        "fade-in-bottom-delay-900": "fade-in-bottom 0.5s ease-out 0.9s forwards",
        "fade-in-bottom-delay-1000": "fade-in-bottom 0.5s ease-out 1s forwards",
        
        // ترکیب انیمیشن‌ها
        "float-glow": "float 4s ease-in-out infinite, glow 2s ease-in-out infinite",
        "scale-rotate": "subtle-bounce 2s ease-in-out infinite, rotate-slow 20s linear infinite",
        "pulse-hue": "pulse-subtle 3s ease-in-out infinite, hue-rotate 10s linear infinite",
        "shimmer-bounce": "shimmer 2s linear infinite, subtle-bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
