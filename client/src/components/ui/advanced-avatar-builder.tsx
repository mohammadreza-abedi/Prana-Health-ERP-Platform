import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import html2canvas from 'html2canvas';

import {
  User,
  Upload,
  Download,
  Image,
  Save,
  RefreshCcw,
  Sparkles,
  Lightbulb,
  UserRound,
  Glasses,
  Shirt,
  Palette,
  Smile,
  Frown,
  Meh,
  Crown,
  Eraser,
  Shapes,
  Braces,
  Heart,
  BadgeCheck,
  Camera,
  Hexagon,
  CheckCircle2,
  CircleEllipsis,
  Zap,
  FileImage,
  Wand2,
  BrainCircuit,
  Layers,
  Settings,
  Scale,
  CalendarRange
} from "lucide-react";

// استایل‌های اضافی برای انیمیشن‌ها
const animationVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  rotate: {
    rotate: [0, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }
  },
  breathe: {
    opacity: [0.8, 1, 0.8],
    scale: [0.98, 1, 0.98],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  shimmer: {
    background: [
      "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)",
      "linear-gradient(45deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)",
      "linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// انواع بک‌گراند‌های پیشرفته
const advancedBackgrounds = [
  {
    id: "gradient-1",
    name: "شیب آبی",
    value: "linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)"
  },
  {
    id: "gradient-2",
    name: "شیب سبز",
    value: "linear-gradient(45deg, #56ab2f, #a8e063)"
  },
  {
    id: "gradient-3",
    name: "شیب گلبهی",
    value: "linear-gradient(45deg, #ff6b6b, #f99185, #ffeaa7)"
  },
  {
    id: "gradient-4",
    name: "شیب نئون",
    value: "linear-gradient(45deg, #0c0c0c, #380036, #0cbaba)"
  },
  {
    id: "pattern-1",
    name: "موزاییک",
    value: "repeating-linear-gradient(45deg, #3d3d3d, #3d3d3d 10px, #333 10px, #333 20px)"
  },
  {
    id: "pattern-2",
    name: "دات ماتریکس",
    value: "radial-gradient(#00ff00 1px, transparent 1px), radial-gradient(#00ff00 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 10px 10px"
  },
  {
    id: "pattern-3",
    name: "رتروویو",
    value: "repeating-radial-gradient(circle at 50% 50%, rgba(200, 100, 255, 0.2) 0%, rgba(100, 200, 255, 0.3) 15%)",
    backgroundSize: "20px 20px"
  },
  {
    id: "svg-1",
    name: "موج دیجیتال",
    value: "url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 0 50 C 20 30, 40 70, 60 50 C 80 30, 100 70, 120 50\" stroke=\"rgba(100,200,255,0.2)\" fill=\"none\" stroke-width=\"12\" /></svg>')",
    backgroundSize: "40px 40px"
  }
];

// استایل‌های مو با SVG
const hairStyles = [
  {
    id: "short-straight",
    name: "کوتاه صاف",
    svgPath: `<path d="M50 30 C 30 30, 20 50, 25 80" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M50 30 C 70 30, 80 50, 75 80" stroke="currentColor" stroke-width="2" fill="none" />`
  },
  {
    id: "medium-wavy",
    name: "متوسط موج‌دار",
    svgPath: `<path d="M50 25 C 20 25, 15 40, 15 60 Q 15 80, 25 90" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M50 25 C 80 25, 85 40, 85 60 Q 85 80, 75 90" stroke="currentColor" stroke-width="2" fill="none" />`
  },
  {
    id: "long-straight",
    name: "بلند صاف",
    svgPath: `<path d="M50 25 C 20 25, 10 50, 10 100" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M50 25 C 80 25, 90 50, 90 100" stroke="currentColor" stroke-width="2" fill="none" />`
  },
  {
    id: "curly",
    name: "فرفری",
    svgPath: `<path d="M50 25 C 30 25, 20 30, 15 40 Q 10 50, 15 60 Q 20 70, 15 80 Q 10 90, 15 100" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M50 25 C 70 25, 80 30, 85 40 Q 90 50, 85 60 Q 80 70, 85 80 Q 90 90, 85 100" stroke="currentColor" stroke-width="2" fill="none" />`
  },
  {
    id: "mohawk",
    name: "موهاک",
    svgPath: `<path d="M50 20 L 50 35 M 50 20 L 40 25 M 50 20 L 60 25 M 50 20 L 45 23 M 50 20 L 55 23" stroke="currentColor" stroke-width="3" fill="none" />`
  },
  {
    id: "bald",
    name: "طاس",
    svgPath: `<path d="M40 50 Q 50 40, 60 50" stroke="rgba(0,0,0,0.1)" stroke-width="1" fill="none" />`
  }
];

// اکسسوری‌های جدید و پیشرفته با SVG
const accessories = [
  {
    id: "glasses-round",
    name: "عینک گرد",
    svgPath: `<circle cx="35" cy="45" r="10" stroke="currentColor" stroke-width="2" fill="none" />
              <circle cx="65" cy="45" r="10" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M45 45 L 55 45" stroke="currentColor" stroke-width="2" fill="none" />`
  },
  {
    id: "glasses-square",
    name: "عینک مستطیلی",
    svgPath: `<rect x="25" y="40" width="20" height="10" rx="2" stroke="currentColor" stroke-width="2" fill="none" />
              <rect x="55" y="40" width="20" height="10" rx="2" stroke="currentColor" stroke-width="2" fill="none" />
              <path d="M45 45 L 55 45" stroke="currentColor" stroke-width="2" fill="none" />`
  },
  {
    id: "crown",
    name: "تاج",
    svgPath: `<path d="M30 35 L 40 25 L 50 35 L 60 25 L 70 35 L 65 40 L 35 40 L 30 35" stroke="currentColor" stroke-width="2" fill="currentColor" />`
  },
  {
    id: "earrings",
    name: "گوشواره",
    svgPath: `<circle cx="25" cy="50" r="3" stroke="currentColor" stroke-width="1" fill="currentColor" />
              <circle cx="75" cy="50" r="3" stroke="currentColor" stroke-width="1" fill="currentColor" />`
  },
  {
    id: "mask",
    name: "ماسک",
    svgPath: `<path d="M30 50 Q 50 60, 70 50 L 70 60 Q 50 70, 30 60 L 30 50" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.5" />`
  },
  {
    id: "beard",
    name: "ریش",
    svgPath: `<path d="M40 55 Q 50 75, 60 55" stroke="currentColor" stroke-width="3" fill="currentColor" opacity="0.7" />`
  },
  {
    id: "headphone",
    name: "هدفون",
    svgPath: `<path d="M30 30 L 30 50 L 35 50 L 35 40 L 30 30" stroke="currentColor" stroke-width="2" fill="currentColor" />
              <path d="M70 30 L 70 50 L 65 50 L 65 40 L 70 30" stroke="currentColor" stroke-width="2" fill="currentColor" />
              <path d="M30 30 Q 50 20, 70 30" stroke="currentColor" stroke-width="2" fill="none" />`
  }
];

// نشان‌های حرفه‌ای با SVG
const badges = [
  {
    id: "level",
    name: "سطح",
    svgComponent: (level: number) => (
      <div className="absolute bottom-0 right-0 bg-gradient-to-r from-tiffany to-blue-500 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
        <span className="text-xs font-bold">{level}</span>
      </div>
    )
  },
  {
    id: "pro",
    name: "حرفه‌ای",
    svgComponent: () => (
      <div className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-300 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
        <Crown className="w-4 h-4" />
      </div>
    )
  },
  {
    id: "verified",
    name: "تایید شده",
    svgComponent: () => (
      <div className="absolute bottom-0 right-0 bg-gradient-to-r from-green-500 to-emerald-400 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
        <CheckCircle2 className="w-4 h-4" />
      </div>
    )
  },
  {
    id: "expert",
    name: "متخصص",
    svgComponent: () => (
      <div className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-violet-500 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
        <BrainCircuit className="w-4 h-4" />
      </div>
    )
  },
  {
    id: "founder",
    name: "بنیانگذار",
    svgComponent: () => (
      <div className="absolute bottom-0 right-0 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
        <BadgeCheck className="w-4 h-4" />
      </div>
    )
  }
];

// افکت‌های مختلف قابل اعمال به آواتار
const avatarEffects = [
  {
    id: "none",
    name: "بدون افکت",
    cssFilters: ""
  },
  {
    id: "duotone",
    name: "دوتن",
    cssFilters: "saturate(0.5) contrast(1.2) sepia(0.3)"
  },
  {
    id: "cyberpunk",
    name: "سایبرپانک",
    cssFilters: "saturate(1.5) contrast(1.3) hue-rotate(30deg)"
  },
  {
    id: "retro",
    name: "رترو",
    cssFilters: "grayscale(0.5) sepia(0.4) contrast(1.1) brightness(1.05)"
  },
  {
    id: "neon",
    name: "نئون",
    cssFilters: "brightness(1.2) contrast(1.3) saturate(1.5) drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))"
  },
  {
    id: "vintage",
    name: "وینتیج",
    cssFilters: "sepia(0.7) saturate(0.8) contrast(1.1) brightness(0.9)"
  },
  {
    id: "blueprint",
    name: "نقشه",
    cssFilters: "grayscale(1) brightness(1.3) hue-rotate(210deg) saturate(6) contrast(1.2)"
  }
];

// تنظیمات پیشفرض آواتار
export interface AdvancedAvatarOptions {
  // ویژگی‌های چهره
  faceShape: "round" | "square" | "hexagon" | "oval" | "heart";
  skinTone: string;
  skinShader: boolean;
  expression: "smile" | "neutral" | "serious";
  eyeColor: string;
  
  // ویژگی‌های مو
  hairStyle: string;
  hairColor: string;
  beardStyle: string;
  beardColor: string;
  
  // ویژگی‌های پوشش
  clothingStyle: "formal" | "casual" | "sporty" | "uniform" | "cyberpunk";
  clothingColor: string;
  clothingPattern: string;
  
  // ویژگی‌های اکسسوری
  accessories: string[];
  accessoryColor: string;
  
  // ویژگی‌های افکت
  background: string;
  backgroundPattern: boolean;
  effect: string;
  glow: boolean;
  glowColor: string;
  animation: string;
  
  // ویژگی‌های تنظیمات
  size: "small" | "medium" | "large";
  borderWidth: number;
  borderColor: string;
  borderStyle: "solid" | "dashed" | "dotted" | "double";
  badgeType: string;
  badgePosition: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  
  // ویژگی‌های متادیتا
  metaInfo: {
    level: number;
    role: string;
    lastActive: string;
    status: "online" | "away" | "busy" | "offline";
    xp: number;
  };
}

const defaultAvatarOptions: AdvancedAvatarOptions = {
  // ویژگی‌های چهره
  faceShape: "round",
  skinTone: "#f8d5c2",
  skinShader: true,
  expression: "smile",
  eyeColor: "#4682b4",
  
  // ویژگی‌های مو
  hairStyle: "short-straight",
  hairColor: "#3a3a3a",
  beardStyle: "",
  beardColor: "#5a3825",
  
  // ویژگی‌های پوشش
  clothingStyle: "casual",
  clothingColor: "#2980b9",
  clothingPattern: "",
  
  // ویژگی‌های اکسسوری
  accessories: [],
  accessoryColor: "#ffd700",
  
  // ویژگی‌های افکت
  background: "#ffffff",
  backgroundPattern: false,
  effect: "none",
  glow: false,
  glowColor: "#38bdf8",
  animation: "",
  
  // ویژگی‌های تنظیمات
  size: "medium",
  borderWidth: 0,
  borderColor: "#e2e8f0",
  borderStyle: "solid",
  badgeType: "",
  badgePosition: "bottom-right",
  
  // ویژگی‌های متادیتا
  metaInfo: {
    level: 1,
    role: "کاربر",
    lastActive: new Date().toISOString(),
    status: "online",
    xp: 0
  }
};

interface AdvancedAvatarBuilderProps {
  initialOptions?: Partial<AdvancedAvatarOptions>;
  onSave?: (options: AdvancedAvatarOptions, dataUrl: string) => void;
  userLevel?: number;
  userRole?: string;
  userStatus?: "online" | "away" | "busy" | "offline";
  userXp?: number;
  className?: string;
}

export default function AdvancedAvatarBuilder({
  initialOptions,
  onSave,
  userLevel = 1,
  userRole = "کاربر",
  userStatus = "online",
  userXp = 0,
  className
}: AdvancedAvatarBuilderProps) {
  const { toast } = useToast();
  const [options, setOptions] = useState<AdvancedAvatarOptions>({
    ...defaultAvatarOptions,
    ...initialOptions,
    metaInfo: {
      ...defaultAvatarOptions.metaInfo,
      level: userLevel,
      role: userRole,
      status: userStatus,
      xp: userXp,
      lastActive: new Date().toISOString()
    }
  });

  const [activeTab, setActiveTab] = useState("character");
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"normal" | "live">("normal");
  const [scalePercent, setScalePercent] = useState(100);
  const avatarRef = useRef<HTMLDivElement>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  
  // پالت‌های رنگی
  const skinTones = [
    "#f8d5c2", // روشن
    "#eeceb3", // کمی تیره
    "#e0ac69", // متوسط
    "#c68642", // قهوه‌ای روشن
    "#89581a", // قهوه‌ای
    "#553016", // قهوه‌ای تیره
  ];
  
  const colorPalette = [
    "#3a3a3a", // تیره
    "#8b4513", // قهوه‌ای
    "#a52a2a", // آجری
    "#d2b48c", // خاکی
    "#ffd700", // طلایی
    "#ff0000", // قرمز
    "#0000ff", // آبی
    "#008000", // سبز
    "#800080", // بنفش
    "#ffc0cb", // صورتی
  ];
  
  const eyeColors = [
    "#4682b4", // آبی
    "#8b4513", // قهوه‌ای
    "#2e8b57", // سبز
    "#800080", // بنفش
    "#708090", // خاکستری
    "#000000", // سیاه
  ];

  // فرم صورت با آیکون
  const faceShapes = [
    { id: "round", name: "گرد", icon: <UserRound className="h-4 w-4" /> },
    { id: "square", name: "مربعی", icon: <Shapes className="h-4 w-4" /> },
    { id: "hexagon", name: "شش‌ضلعی", icon: <Hexagon className="h-4 w-4" /> },
    { id: "oval", name: "بیضی", icon: <User className="h-4 w-4" /> },
    { id: "heart", name: "قلبی", icon: <Heart className="h-4 w-4" /> },
  ];

  // حالت چهره با آیکون
  const expressions = [
    { id: "smile", name: "لبخند", icon: <Smile className="h-4 w-4" /> },
    { id: "neutral", name: "خنثی", icon: <Meh className="h-4 w-4" /> },
    { id: "serious", name: "جدی", icon: <Frown className="h-4 w-4" /> },
  ];
  
  // استایل‌های لباس
  const clothingStyles = [
    { id: "casual", name: "معمولی" },
    { id: "formal", name: "رسمی" },
    { id: "sporty", name: "ورزشی" },
    { id: "uniform", name: "فرم سازمانی" },
    { id: "cyberpunk", name: "سایبرپانک" },
  ];

  // بروزرسانی یک ویژگی
  const updateOption = <K extends keyof AdvancedAvatarOptions>(
    key: K,
    value: AdvancedAvatarOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  // بروزرسانی اطلاعات متا
  const updateMetaInfo = <K extends keyof AdvancedAvatarOptions["metaInfo"]>(
    key: K,
    value: AdvancedAvatarOptions["metaInfo"][K]
  ) => {
    setOptions((prev) => ({
      ...prev,
      metaInfo: { ...prev.metaInfo, [key]: value }
    }));
  };

  // تغییر وضعیت اکسسوری
  const toggleAccessory = (accessory: string) => {
    setOptions((prev) => {
      const accessories = [...prev.accessories];
      const index = accessories.indexOf(accessory);

      if (index > -1) {
        accessories.splice(index, 1);
      } else {
        accessories.push(accessory);
      }

      return { ...prev, accessories };
    });
  };

  // آپلود تصویر سفارشی
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomImageUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // بازنشانی به تنظیمات پیشفرض
  const resetToDefault = () => {
    setOptions({
      ...defaultAvatarOptions,
      metaInfo: {
        ...defaultAvatarOptions.metaInfo,
        level: userLevel,
        role: userRole,
        status: userStatus,
        xp: userXp,
        lastActive: new Date().toISOString()
      }
    });
    setCustomImageUrl(null);
    setScalePercent(100);
    setPreviewMode("normal");
  };

  // شبیه‌سازی تولید آواتار با هوش مصنوعی
  const generateAIAvatar = () => {
    setAiGenerating(true);
    
    // شبیه‌سازی زمان تولید
    setTimeout(() => {
      // مقادیر تصادفی برای نمایش قابلیت
      const randomSkinTone = skinTones[Math.floor(Math.random() * skinTones.length)];
      const randomHairStyle = hairStyles[Math.floor(Math.random() * hairStyles.length)].id;
      const randomHairColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const randomExpression = ["smile", "neutral", "serious"][Math.floor(Math.random() * 3)] as "smile" | "neutral" | "serious";
      const randomClothingColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      
      setOptions(prev => ({
        ...prev,
        skinTone: randomSkinTone,
        hairStyle: randomHairStyle,
        hairColor: randomHairColor,
        expression: randomExpression,
        clothingColor: randomClothingColor,
        animation: animationVariants ? Object.keys(animationVariants)[Math.floor(Math.random() * Object.keys(animationVariants).length)] : "",
        glow: Math.random() > 0.5,
        glowColor: colorPalette[Math.floor(Math.random() * colorPalette.length)]
      }));
      
      setAiGenerating(false);
      
      toast({
        title: "آواتار هوشمند ساخته شد",
        description: "آواتار با استفاده از هوش مصنوعی با موفقیت ایجاد شد.",
        variant: "default",
      });
    }, 2000);
  };

  // ذخیره آواتار
  const handleSave = async () => {
    if (avatarRef.current) {
      try {
        const canvas = await html2canvas(avatarRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        
        if (onSave) {
          onSave(options, dataUrl);
        }
        
        toast({
          title: "آواتار ذخیره شد",
          description: "آواتار شما با موفقیت ذخیره شد.",
          variant: "default",
        });
      } catch (error) {
        console.error('Error generating avatar image:', error);
        toast({
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره‌سازی آواتار به وجود آمد.",
          variant: "destructive",
        });
      }
    }
  };

  // دانلود آواتار
  const handleDownload = async () => {
    if (avatarRef.current) {
      try {
        const canvas = await html2canvas(avatarRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `avatar-${new Date().getTime()}.png`;
        link.href = dataUrl;
        link.click();
        
        toast({
          title: "آواتار دانلود شد",
          description: "تصویر آواتار با موفقیت دانلود شد.",
          variant: "default",
        });
      } catch (error) {
        console.error('Error downloading avatar image:', error);
        toast({
          title: "خطا در دانلود",
          description: "مشکلی در دانلود آواتار به وجود آمد.",
          variant: "destructive",
        });
      }
    }
  };

  // تبدیل آواتار به Live Mode
  useEffect(() => {
    if (previewMode === "live" && options.animation) {
      // فعال‌سازی انیمیشن
    }
  }, [previewMode, options.animation]);

  return (
    <div className={cn("rounded-xl bg-white dark:bg-slate-950 shadow-lg border border-slate-200 dark:border-slate-800", className)}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">سازنده آواتار پیشرفته</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              آواتار خود را با ویژگی‌های متنوع و حرفه‌ای شخصی‌سازی کنید
            </p>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" onClick={generateAIAvatar} disabled={aiGenerating}>
                    {aiGenerating ? (
                      <>
                        <Sparkles className="h-4 w-4 ml-1 animate-pulse" />
                        <span>در حال تولید...</span>
                      </>
                    ) : (
                      <>
                        <BrainCircuit className="h-4 w-4 ml-1" />
                        <span>تولید هوشمند</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>تولید آواتار با استفاده از هوش مصنوعی</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="ghost" onClick={resetToDefault}>
                    <RefreshCcw className="h-4 w-4 ml-1" />
                    <span>بازنشانی</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>بازنشانی تنظیمات به حالت پیش‌فرض</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* پنل پیش‌نمایش آواتار */}
          <div className="md:col-span-5 flex flex-col items-center space-y-4">
            <div className="flex justify-between w-full mb-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Layers className="h-3 w-3" />
                <span>پیش‌نمایش</span>
              </Badge>
              
              <Select
                value={previewMode}
                onValueChange={(value) => setPreviewMode(value as "normal" | "live")}
              >
                <SelectTrigger className="h-7 w-32 text-xs">
                  <SelectValue placeholder="حالت نمایش" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">نمایش عادی</SelectItem>
                  <SelectItem value="live">نمایش زنده</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div
              ref={avatarRef}
              className={cn(
                "relative overflow-hidden transition-all duration-300",
                options.faceShape === "round" && "rounded-full",
                options.faceShape === "square" && "rounded-lg",
                options.faceShape === "hexagon" && "hexagon-shape",
                options.faceShape === "oval" && "oval-shape",
                options.faceShape === "heart" && "heart-shape",
                {
                  "w-24 h-24": options.size === "small",
                  "w-40 h-40": options.size === "medium",
                  "w-56 h-56": options.size === "large",
                },
                options.glow && "ring ring-offset-2 ring-offset-white dark:ring-offset-slate-950",
              )}
              style={{
                backgroundColor: options.background,
                borderWidth: options.borderWidth,
                borderColor: options.borderColor,
                borderStyle: options.borderStyle,
                boxShadow: options.glow ? `0 0 15px ${options.glowColor}` : 'none',
                filter: avatarEffects.find(e => e.id === options.effect)?.cssFilters || '',
                transform: `scale(${scalePercent / 100})`,
                backgroundImage: options.backgroundPattern ? 
                  advancedBackgrounds.find(bg => bg.id === options.background)?.value || 'none' : 
                  'none',
                backgroundSize: options.backgroundPattern ? 
                  advancedBackgrounds.find(bg => bg.id === options.background)?.backgroundSize || '100% 100%' : 
                  '100% 100%',
                backgroundPosition: options.backgroundPattern ?
                  advancedBackgrounds.find(bg => bg.id === options.background)?.backgroundPosition || 'center' :
                  'center',
              }}
            >
              {customImageUrl ? (
                <img 
                  src={customImageUrl} 
                  alt="آواتار شخصی" 
                  className="w-full h-full object-cover"
                  style={{
                    filter: avatarEffects.find(e => e.id === options.effect)?.cssFilters || '',
                  }}
                />
              ) : (
                <motion.div 
                  className="w-full h-full flex items-center justify-center"
                  animate={options.animation && previewMode === "live" ? 
                    // @ts-ignore - نادیده گرفتن خطای تایپ برای آبجکت انیمیشن
                    animationVariants[options.animation] : 
                    {}
                  }
                >
                  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    {/* سر و صورت */}
                    <circle cx="50" cy="50" r="30" fill={options.skinTone} />
                    
                    {/* سایه‌های صورت */}
                    {options.skinShader && (
                      <>
                        <ellipse cx="40" cy="55" rx="10" ry="5" fill="rgba(0,0,0,0.05)" opacity="0.3" />
                        <ellipse cx="60" cy="55" rx="10" ry="5" fill="rgba(0,0,0,0.05)" opacity="0.3" />
                      </>
                    )}
                    
                    {/* چشم‌ها */}
                    {options.expression === "smile" && (
                      <>
                        <circle cx="40" cy="40" r="5" fill="white" />
                        <circle cx="40" cy="40" r="3" fill={options.eyeColor} />
                        <circle cx="40" cy="39" r="1" fill="white" />
                        
                        <circle cx="60" cy="40" r="5" fill="white" />
                        <circle cx="60" cy="40" r="3" fill={options.eyeColor} />
                        <circle cx="60" cy="39" r="1" fill="white" />
                      </>
                    )}
                    
                    {options.expression === "neutral" && (
                      <>
                        <circle cx="40" cy="40" r="5" fill="white" />
                        <circle cx="40" cy="40" r="3" fill={options.eyeColor} />
                        <circle cx="40" cy="39" r="1" fill="white" />
                        
                        <circle cx="60" cy="40" r="5" fill="white" />
                        <circle cx="60" cy="40" r="3" fill={options.eyeColor} />
                        <circle cx="60" cy="39" r="1" fill="white" />
                      </>
                    )}
                    
                    {options.expression === "serious" && (
                      <>
                        <circle cx="40" cy="40" r="4" fill="white" />
                        <circle cx="40" cy="40" r="2.5" fill={options.eyeColor} />
                        <circle cx="40" cy="39.5" r="0.8" fill="white" />
                        
                        <circle cx="60" cy="40" r="4" fill="white" />
                        <circle cx="60" cy="40" r="2.5" fill={options.eyeColor} />
                        <circle cx="60" cy="39.5" r="0.8" fill="white" />
                      </>
                    )}
                    
                    {/* دهان */}
                    {options.expression === "smile" && (
                      <path d="M40 60 Q50 70, 60 60" stroke="black" strokeWidth="2" fill="none" />
                    )}
                    
                    {options.expression === "neutral" && (
                      <line x1="40" y1="60" x2="60" y2="60" stroke="black" strokeWidth="2" />
                    )}
                    
                    {options.expression === "serious" && (
                      <path d="M40 62 Q50 55, 60 62" stroke="black" strokeWidth="2" fill="none" />
                    )}
                    
                    {/* مو */}
                    {options.hairStyle && (
                      <g fill={options.hairColor} stroke={options.hairColor}>
                        {hairStyles.find(style => style.id === options.hairStyle)?.svgPath &&
                          <g dangerouslySetInnerHTML={{ __html: hairStyles.find(style => style.id === options.hairStyle)?.svgPath || '' }} />
                        }
                      </g>
                    )}
                    
                    {/* اکسسوری‌ها */}
                    {options.accessories.map((acc) => (
                      <g key={acc} fill={options.accessoryColor} stroke={options.accessoryColor}>
                        {accessories.find(a => a.id === acc)?.svgPath &&
                          <g dangerouslySetInnerHTML={{ __html: accessories.find(a => a.id === acc)?.svgPath || '' }} />
                        }
                      </g>
                    ))}
                    
                    {/* لباس */}
                    <path
                      d={
                        options.clothingStyle === "formal" ? 
                        "M25 85 L35 65 L50 75 L65 65 L75 85" :
                        options.clothingStyle === "casual" ?
                        "M30 85 L35 65 L50 70 L65 65 L70 85" :
                        options.clothingStyle === "sporty" ?
                        "M30 85 L35 65 L50 68 L65 65 L70 85 Z" :
                        options.clothingStyle === "uniform" ?
                        "M25 85 L35 65 L50 70 L65 65 L75 85 M40 70 L45 70 M55 70 L60 70" :
                        "M25 85 L35 65 L50 75 L65 65 L75 85 M40 70 L60 70"
                      }
                      fill={options.clothingColor}
                      stroke={options.clothingColor}
                      strokeWidth="1"
                    />
                  </svg>
                </motion.div>
              )}
              
              {/* نشان */}
              {options.badgeType && badges.find(b => b.id === options.badgeType)?.svgComponent(options.metaInfo.level)}
              
              {/* استیکر استاتوس */}
              {options.metaInfo.status !== "offline" && (
                <div 
                  className={cn(
                    "absolute w-4 h-4 rounded-full border-2 border-white dark:border-slate-900",
                    {
                      "bg-green-500": options.metaInfo.status === "online",
                      "bg-amber-500": options.metaInfo.status === "away",
                      "bg-red-500": options.metaInfo.status === "busy"
                    },
                    {
                      "top-0 right-0": options.badgePosition === "top-right",
                      "top-0 left-0": options.badgePosition === "top-left",
                      "bottom-0 right-0": options.badgePosition === "bottom-right",
                      "bottom-0 left-0": options.badgePosition === "bottom-left"
                    }
                  )}
                />
              )}
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="font-medium">پیش‌نمایش آواتار</h3>
              <div className="flex items-center justify-center space-x-1 space-x-reverse">
                <span className={cn(
                  "w-2 h-2 rounded-full",
                  {
                    "bg-green-500": options.metaInfo.status === "online",
                    "bg-amber-500": options.metaInfo.status === "away",
                    "bg-red-500": options.metaInfo.status === "busy",
                    "bg-slate-300": options.metaInfo.status === "offline"
                  }
                )}></span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {options.metaInfo.role} • سطح {options.metaInfo.level}
                </p>
              </div>
            </div>
            
            <div className="space-y-3 w-full max-w-xs">
              <div>
                <div className="flex justify-between">
                  <Label className="mb-2 block text-xs">اندازه (٪)</Label>
                  <span className="text-xs text-slate-500">{scalePercent}%</span>
                </div>
                <Slider
                  value={[scalePercent]}
                  min={50}
                  max={150}
                  step={5}
                  onValueChange={(value) => setScalePercent(value[0])}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="glow-toggle" className="text-xs">افکت درخشش</Label>
                <Switch
                  id="glow-toggle"
                  checked={options.glow}
                  onCheckedChange={(checked) => updateOption("glow", checked)}
                />
              </div>
              
              {options.glow && (
                <div>
                  <Label className="mb-2 block text-xs">رنگ درخشش</Label>
                  <div className="flex flex-wrap gap-2">
                    {["#38bdf8", "#f43f5e", "#22c55e", "#f59e0b", "#8b5cf6", "#ec4899"].map((color) => (
                      <TooltipProvider key={color}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className={cn(
                                "w-6 h-6 rounded-full",
                                options.glowColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                              )}
                              style={{ backgroundColor: color }}
                              onClick={() => updateOption("glowColor", color)}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{color}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-6 space-y-3">
                <div className="flex space-x-2 space-x-reverse">
                  <Button 
                    className="w-1/2"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4 ml-2" />
                    ذخیره آواتار
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-1/2"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4 ml-2" />
                    دانلود
                  </Button>
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  <Upload className="h-4 w-4 ml-2" />
                  آپلود تصویر
                </Button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
          
          {/* پنل ویرایشگر */}
          <div className="md:col-span-7">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="character" className="text-xs">
                  <UserRound className="h-3.5 w-3.5 ml-1" />
                  چهره
                </TabsTrigger>
                <TabsTrigger value="hair" className="text-xs">
                  <Scale className="h-3.5 w-3.5 ml-1" />
                  مو
                </TabsTrigger>
                <TabsTrigger value="clothing" className="text-xs">
                  <Shirt className="h-3.5 w-3.5 ml-1" />
                  لباس
                </TabsTrigger>
                <TabsTrigger value="accessories" className="text-xs">
                  <Glasses className="h-3.5 w-3.5 ml-1" />
                  اکسسوری
                </TabsTrigger>
                <TabsTrigger value="effects" className="text-xs">
                  <Settings className="h-3.5 w-3.5 ml-1" />
                  تنظیمات
                </TabsTrigger>
              </TabsList>
              
              <Card>
                <CardContent className="p-5">
                  <ScrollArea className="h-[400px] pr-3">
                    <TabsContent value="character" className="space-y-5 mt-0">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">فرم چهره</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {faceShapes.map((shape) => (
                            <Button
                              key={shape.id}
                              variant={options.faceShape === shape.id ? "default" : "outline"}
                              className="flex flex-col items-center justify-center h-auto py-2 text-xs"
                              onClick={() => updateOption("faceShape", shape.id as AdvancedAvatarOptions["faceShape"])}
                            >
                              {shape.icon}
                              <span className="mt-1">{shape.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">رنگ پوست</Label>
                        <div className="flex flex-wrap gap-2">
                          {skinTones.map((color) => (
                            <TooltipProvider key={color}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className={cn(
                                      "w-8 h-8 rounded-full transition-transform hover:scale-110",
                                      options.skinTone === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                    )}
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateOption("skinTone", color)}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{color}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="skin-shader-toggle" className="text-sm">سایه‌پردازی پوست</Label>
                        <Switch
                          id="skin-shader-toggle"
                          checked={options.skinShader}
                          onCheckedChange={(checked) => updateOption("skinShader", checked)}
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">رنگ چشم</Label>
                        <div className="flex flex-wrap gap-2">
                          {eyeColors.map((color) => (
                            <TooltipProvider key={color}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className={cn(
                                      "w-8 h-8 rounded-full transition-transform hover:scale-110",
                                      options.eyeColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                    )}
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateOption("eyeColor", color)}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{color}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">حالت چهره</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {expressions.map((expression) => (
                            <Button
                              key={expression.id}
                              variant={options.expression === expression.id ? "default" : "outline"}
                              className="flex flex-col items-center justify-center h-auto py-2 text-xs"
                              onClick={() => updateOption("expression", expression.id as AdvancedAvatarOptions["expression"])}
                            >
                              {expression.icon}
                              <span className="mt-1">{expression.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="hair" className="space-y-5 mt-0">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">مدل مو</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {hairStyles.map((style) => (
                            <Button
                              key={style.id}
                              variant={options.hairStyle === style.id ? "default" : "outline"}
                              className="flex flex-col items-center justify-center h-auto py-2 text-xs"
                              onClick={() => updateOption("hairStyle", style.id)}
                            >
                              <div className="w-10 h-10 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" width="30" height="30">
                                  <g dangerouslySetInnerHTML={{ __html: style.svgPath }} />
                                </svg>
                              </div>
                              <span className="mt-1">{style.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">رنگ مو</Label>
                        <div className="flex flex-wrap gap-2">
                          {colorPalette.map((color) => (
                            <TooltipProvider key={color}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className={cn(
                                      "w-8 h-8 rounded-full transition-transform hover:scale-110",
                                      options.hairColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                    )}
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateOption("hairColor", color)}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{color}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-8 h-8 p-0 rounded-full">
                                <Palette className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="space-y-2">
                                <Label>رنگ سفارشی</Label>
                                <Input
                                  type="color"
                                  value={options.hairColor}
                                  onChange={(e) => updateOption("hairColor", e.target.value)}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">مدل ریش</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant={options.beardStyle === "" ? "default" : "outline"}
                            className="h-auto py-2 text-xs"
                            onClick={() => updateOption("beardStyle", "")}
                          >
                            بدون ریش
                          </Button>
                          <Button
                            variant={options.beardStyle === "beard" ? "default" : "outline"}
                            className="h-auto py-2 text-xs"
                            onClick={() => updateOption("beardStyle", "beard")}
                          >
                            <span className="ml-1">ریش</span>
                            <svg viewBox="0 0 100 100" width="20" height="20">
                              <g dangerouslySetInnerHTML={{ __html: accessories.find(a => a.id === 'beard')?.svgPath || '' }} />
                            </svg>
                          </Button>
                        </div>
                      </div>
                      
                      {options.beardStyle && (
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">رنگ ریش</Label>
                          <div className="flex flex-wrap gap-2">
                            {colorPalette.slice(0, 5).map((color) => (
                              <button
                                key={color}
                                className={cn(
                                  "w-8 h-8 rounded-full transition-transform hover:scale-110",
                                  options.beardColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                )}
                                style={{ backgroundColor: color }}
                                onClick={() => updateOption("beardColor", color)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="clothing" className="space-y-5 mt-0">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">استایل لباس</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {clothingStyles.map((style) => (
                            <Button
                              key={style.id}
                              variant={options.clothingStyle === style.id ? "default" : "outline"}
                              className="text-xs"
                              onClick={() => updateOption("clothingStyle", style.id as AdvancedAvatarOptions["clothingStyle"])}
                            >
                              {style.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">رنگ لباس</Label>
                        <div className="flex flex-wrap gap-2">
                          {colorPalette.map((color) => (
                            <TooltipProvider key={color}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    className={cn(
                                      "w-8 h-8 rounded-full transition-transform hover:scale-110",
                                      options.clothingColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                    )}
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateOption("clothingColor", color)}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{color}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-8 h-8 p-0 rounded-full">
                                <Palette className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="space-y-2">
                                <Label>رنگ سفارشی</Label>
                                <Input
                                  type="color"
                                  value={options.clothingColor}
                                  onChange={(e) => updateOption("clothingColor", e.target.value)}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="accessories" className="space-y-5 mt-0">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">انتخاب اکسسوری‌ها</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {accessories.map((acc) => (
                            <Button
                              key={acc.id}
                              variant={options.accessories.includes(acc.id) ? "default" : "outline"}
                              className="flex flex-col items-center justify-center h-auto py-2 text-xs"
                              onClick={() => toggleAccessory(acc.id)}
                            >
                              <div className="w-10 h-10 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" width="30" height="30">
                                  <g dangerouslySetInnerHTML={{ __html: acc.svgPath }} />
                                </svg>
                              </div>
                              <span className="mt-1">{acc.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      {options.accessories.length > 0 && (
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">رنگ اکسسوری</Label>
                          <div className="flex flex-wrap gap-2">
                            {["#ffd700", "#c0c0c0", "#cd7f32", "#000000", "#ffffff", "#ff0000"].map((color) => (
                              <TooltipProvider key={color}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      className={cn(
                                        "w-8 h-8 rounded-full transition-transform hover:scale-110",
                                        color === "#ffffff" && "border border-slate-200",
                                        options.accessoryColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                      )}
                                      style={{ backgroundColor: color }}
                                      onClick={() => updateOption("accessoryColor", color)}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{color}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-8 h-8 p-0 rounded-full">
                                  <Palette className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <div className="space-y-2">
                                  <Label>رنگ سفارشی</Label>
                                  <Input
                                    type="color"
                                    value={options.accessoryColor}
                                    onChange={(e) => updateOption("accessoryColor", e.target.value)}
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">نشان</Label>
                        <RadioGroup
                          value={options.badgeType}
                          onValueChange={(value) => updateOption("badgeType", value)}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="" id="badge-none" />
                            <Label htmlFor="badge-none" className="text-sm cursor-pointer">بدون نشان</Label>
                          </div>
                          {badges.map((badge) => (
                            <div key={badge.id} className="flex items-center space-x-2 space-x-reverse">
                              <RadioGroupItem value={badge.id} id={`badge-${badge.id}`} />
                              <Label htmlFor={`badge-${badge.id}`} className="text-sm cursor-pointer">{badge.name}</Label>
                              <div className="mr-auto">
                                {badge.svgComponent(options.metaInfo.level)}
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      {options.badgeType && (
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">موقعیت نشان</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant={options.badgePosition === "bottom-right" ? "default" : "outline"}
                              className="text-xs"
                              onClick={() => updateOption("badgePosition", "bottom-right")}
                            >
                              پایین راست
                            </Button>
                            <Button
                              variant={options.badgePosition === "bottom-left" ? "default" : "outline"}
                              className="text-xs"
                              onClick={() => updateOption("badgePosition", "bottom-left")}
                            >
                              پایین چپ
                            </Button>
                            <Button
                              variant={options.badgePosition === "top-right" ? "default" : "outline"}
                              className="text-xs"
                              onClick={() => updateOption("badgePosition", "top-right")}
                            >
                              بالا راست
                            </Button>
                            <Button
                              variant={options.badgePosition === "top-left" ? "default" : "outline"}
                              className="text-xs"
                              onClick={() => updateOption("badgePosition", "top-left")}
                            >
                              بالا چپ
                            </Button>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="effects" className="space-y-5 mt-0">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">پس‌زمینه</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {advancedBackgrounds.map((bg) => (
                            <Button
                              key={bg.id}
                              variant={options.background === bg.id ? "default" : "outline"}
                              className="h-10 p-0 overflow-hidden"
                              style={{
                                background: bg.value,
                                backgroundSize: bg.backgroundSize || "cover",
                                backgroundPosition: bg.backgroundPosition || "center",
                              }}
                              onClick={() => {
                                updateOption("background", bg.id);
                                updateOption("backgroundPattern", true);
                              }}
                            >
                              <span className="p-1 bg-white/80 dark:bg-black/60 text-[10px] rounded">
                                {bg.name}
                              </span>
                            </Button>
                          ))}
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="h-10">
                                <Palette className="h-4 w-4 ml-1" />
                                <span className="text-xs">سفارشی</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="space-y-2">
                                <Label>رنگ پس‌زمینه</Label>
                                <Input
                                  type="color"
                                  value={options.background.startsWith('#') ? options.background : "#ffffff"}
                                  onChange={(e) => {
                                    updateOption("background", e.target.value);
                                    updateOption("backgroundPattern", false);
                                  }}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">افکت تصویر</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {avatarEffects.map((effect) => (
                            <Button
                              key={effect.id}
                              variant={options.effect === effect.id ? "default" : "outline"}
                              className="text-xs"
                              onClick={() => updateOption("effect", effect.id)}
                            >
                              {effect.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">انیمیشن (در حالت زنده)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant={options.animation === "" ? "default" : "outline"}
                            className="text-xs"
                            onClick={() => updateOption("animation", "")}
                          >
                            بدون انیمیشن
                          </Button>
                          {Object.keys(animationVariants).map((animation) => (
                            <Button
                              key={animation}
                              variant={options.animation === animation ? "default" : "outline"}
                              className="text-xs"
                              onClick={() => updateOption("animation", animation)}
                            >
                              {animation === "pulse" ? "ضربان" :
                               animation === "float" ? "شناور" :
                               animation === "rotate" ? "چرخش" :
                               animation === "breathe" ? "تنفس" : 
                               animation === "shimmer" ? "درخشش" : animation}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">اندازه آواتار</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {["small", "medium", "large"].map((size) => (
                            <Button
                              key={size}
                              variant={options.size === size ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateOption("size", size as "small" | "medium" | "large")}
                              className="text-xs"
                            >
                              {size === "small" ? "کوچک" : size === "medium" ? "متوسط" : "بزرگ"}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">حاشیه</Label>
                        <div>
                          <div className="flex justify-between">
                            <Label className="mb-2 block text-xs">ضخامت حاشیه</Label>
                            <span className="text-xs text-slate-500">{options.borderWidth}px</span>
                          </div>
                          <Slider
                            value={[options.borderWidth]}
                            min={0}
                            max={10}
                            step={1}
                            onValueChange={(value) => updateOption("borderWidth", value[0])}
                            className="w-full"
                          />
                        </div>
                        
                        {options.borderWidth > 0 && (
                          <>
                            <div className="grid grid-cols-3 gap-2">
                              <Button
                                variant={options.borderStyle === "solid" ? "default" : "outline"}
                                className="text-xs"
                                onClick={() => updateOption("borderStyle", "solid")}
                              >
                                ساده
                              </Button>
                              <Button
                                variant={options.borderStyle === "dashed" ? "default" : "outline"}
                                className="text-xs"
                                onClick={() => updateOption("borderStyle", "dashed")}
                              >
                                خط چین
                              </Button>
                              <Button
                                variant={options.borderStyle === "dotted" ? "default" : "outline"}
                                className="text-xs"
                                onClick={() => updateOption("borderStyle", "dotted")}
                              >
                                نقطه چین
                              </Button>
                            </div>
                            
                            <div>
                              <Label className="mb-2 block text-xs">رنگ حاشیه</Label>
                              <div className="flex flex-wrap gap-2">
                                {["#e2e8f0", "#000000", "#38bdf8", "#f43f5e", "#22c55e", "#f59e0b"].map((color) => (
                                  <button
                                    key={color}
                                    className={cn(
                                      "w-8 h-8 rounded-full transition-transform hover:scale-110",
                                      color === "#ffffff" && "border border-slate-200",
                                      options.borderColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                    )}
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateOption("borderColor", color)}
                                  />
                                ))}
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-8 h-8 p-0 rounded-full">
                                      <Palette className="h-4 w-4" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <div className="space-y-2">
                                      <Label>رنگ سفارشی</Label>
                                      <Input
                                        type="color"
                                        value={options.borderColor}
                                        onChange={(e) => updateOption("borderColor", e.target.value)}
                                      />
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">وضعیت کاربر</Label>
                        <RadioGroup
                          value={options.metaInfo.status}
                          onValueChange={(value) => updateMetaInfo("status", value as AdvancedAvatarOptions["metaInfo"]["status"])}
                          className="grid grid-cols-2 gap-2"
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="online" id="status-online" />
                            <Label htmlFor="status-online" className="text-sm cursor-pointer flex items-center">
                              <span className="w-2 h-2 rounded-full bg-green-500 ml-1.5"></span>
                              آنلاین
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="away" id="status-away" />
                            <Label htmlFor="status-away" className="text-sm cursor-pointer flex items-center">
                              <span className="w-2 h-2 rounded-full bg-amber-500 ml-1.5"></span>
                              مشغول
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="busy" id="status-busy" />
                            <Label htmlFor="status-busy" className="text-sm cursor-pointer flex items-center">
                              <span className="w-2 h-2 rounded-full bg-red-500 ml-1.5"></span>
                              مزاحم نشوید
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value="offline" id="status-offline" />
                            <Label htmlFor="status-offline" className="text-sm cursor-pointer flex items-center">
                              <span className="w-2 h-2 rounded-full bg-slate-300 ml-1.5"></span>
                              آفلاین
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </TabsContent>
                  </ScrollArea>
                </CardContent>
              </Card>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// استایل‌های اضافی برای شکل‌های خاص
const styles = `
  .hexagon-shape {
    clip-path: polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%);
  }
  
  .oval-shape {
    border-radius: 50% / 70%;
  }
  
  .heart-shape {
    clip-path: path('M50,30 C35,10 10,20 10,40 C10,60 25,65 50,90 C75,65 90,60 90,40 C90,20 65,10 50,30 Z');
  }
`;

// اضافه کردن استایل‌ها به صفحه
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}