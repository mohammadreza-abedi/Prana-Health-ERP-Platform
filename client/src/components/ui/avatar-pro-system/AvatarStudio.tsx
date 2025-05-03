import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { HexColorPicker, HexColorInput } from "react-colorful";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  CalendarRange,
  Undo,
  Redo,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
  X,
  ArrowRight,
  Bookmark,
  Star,
  Grid,
  Layout,
  Check,
  Clock,
  AlertTriangle,
  Brush,
  Gift,
  PanelLeft,
  Shuffle,
  Lamp,
  Gamepad2,
  Filter,
  Workflow,
  Medal,
  Briefcase
} from "lucide-react";
// تعریف نوع LucideIcon
type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// ----------- تعریف انواع و رابط‌های مورد نیاز -----------

// انواع پکیج‌های آواتار - هر پکیج شامل مجموعه‌ای از آیتم‌ها با یک موضوع خاص است
export type AvatarPackageType = "basic" | "premium" | "pro" | "business" | "gaming" | "sports" | "fashion" | "seasonal";

// ساختار ویژگی‌های پکیج
export interface AvatarPackage {
  id: string;
  name: string;
  type: AvatarPackageType;
  icon: LucideIcon;
  description: string;
  items: AvatarItem[];
  isPremium: boolean;
  isActive: boolean;
}

// انواع آیتم‌های قابل سفارشی‌سازی در آواتار
export type AvatarItemType = 
  // ویژگی‌های اصلی
  "faceShape" | "skinTone" | "expression" | "eyeColor" | "hairStyle" | "hairColor" | 
  // پوشاک و اکسسوری
  "outfit" | "accessory" | "hat" | "glasses" | "facialHair" | "jewelry" | "tattoo" | 
  // تنظیمات پیشرفته
  "pose" | "background" | "effect" | "frame" | "badge" | "emote" | "animation" |
  // آپشن‌های دیگر
  "pet" | "prop" | "vehicle" | "environment" | "weather" | "theme" | "special";

// ساختار آیتم آواتار
export interface AvatarItem {
  id: string;
  type: AvatarItemType;
  name: string;
  thumbnailSvg?: string;
  svgPath?: string;
  isNew?: boolean;
  isPremium?: boolean;
  colors?: string[];
  variants?: string[];
  category?: string;
  tags?: string[];
}

// ساختار داده‌های کامل آواتار - شامل تمام انتخاب‌های کاربر
export interface AvatarData {
  // اطلاعات پایه
  id: string;
  userId: string; 
  name: string;
  createdAt: string;
  updatedAt: string;
  
  // ویژگی‌های چهره
  faceShape: string;
  skinTone: string;
  skinShader: boolean;
  expression: string;
  eyeColor: string;
  
  // ویژگی‌های مو
  hairStyle: string;
  hairColor: string;
  facialHairStyle: string;
  facialHairColor: string;
  
  // پوشاک
  outfit: string;
  outfitColor: string;
  outfitPattern: string;
  
  // اکسسوری‌ها
  accessories: string[];
  accessoryColors: Record<string, string>;
  
  // تنظیمات پیشرفته
  background: string;
  backgroundPattern: boolean;
  backgroundEffect: string;
  
  // جلوه‌های ویژه
  effect: string;
  glow: boolean;
  glowColor: string;
  animation: string;
  
  // تنظیمات نمایش
  size: string;
  borderWidth: number;
  borderColor: string;
  borderStyle: string;
  badgeType: string;
  badgePosition: string;
  
  // فراداده‌ها
  metaInfo: {
    level: number;
    role: string;
    department: string;
    lastActive: string;
    status: string;
    xp: number;
    achievements: string[];
    stats: Record<string, number>;
    preferences: Record<string, any>;
  };
  
  // نسخه‌های ذخیره شده
  savedVersions: AvatarVersion[];
  
  // تنظیمات اشتراک‌گذاری
  sharingSettings: {
    isPublic: boolean;
    allowDownload: boolean;
    allowRemix: boolean;
    attribution: string;
  };
}

// ساختار نسخه ذخیره شده آواتار
export interface AvatarVersion {
  id: string;
  name: string;
  timestamp: string;
  thumbnailUrl: string;
  data: Partial<AvatarData>;
}

// تنظیمات پیش‌فرض برای حالت اولیه آواتار
export const defaultAvatarData: AvatarData = {
  id: "",
  userId: "",
  name: "آواتار جدید من",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  
  // ویژگی‌های چهره
  faceShape: "round",
  skinTone: "#f8d5c2",
  skinShader: true,
  expression: "smile",
  eyeColor: "#4682b4",
  
  // ویژگی‌های مو
  hairStyle: "short-straight",
  hairColor: "#3a3a3a",
  facialHairStyle: "",
  facialHairColor: "#5a3825",
  
  // پوشاک
  outfit: "casual-shirt",
  outfitColor: "#2980b9",
  outfitPattern: "",
  
  // اکسسوری‌ها
  accessories: [],
  accessoryColors: {},
  
  // تنظیمات پیشرفته
  background: "#ffffff",
  backgroundPattern: false,
  backgroundEffect: "none",
  
  // جلوه‌های ویژه
  effect: "none",
  glow: false,
  glowColor: "#38bdf8",
  animation: "",
  
  // تنظیمات نمایش
  size: "medium",
  borderWidth: 0,
  borderColor: "#e2e8f0",
  borderStyle: "solid",
  badgeType: "",
  badgePosition: "bottom-right",
  
  // فراداده‌ها
  metaInfo: {
    level: 1,
    role: "کاربر",
    department: "",
    lastActive: new Date().toISOString(),
    status: "online",
    xp: 0,
    achievements: [],
    stats: {},
    preferences: {}
  },
  
  // نسخه‌های ذخیره شده
  savedVersions: [],
  
  // تنظیمات اشتراک‌گذاری
  sharingSettings: {
    isPublic: false,
    allowDownload: true,
    allowRemix: false,
    attribution: ""
  }
};

// پالت‌های رنگ استاندارد برای همه بخش‌ها
export const colorPalettes = {
  skinTones: [
    { id: "light", value: "#f8d5c2", name: "روشن" },
    { id: "fair", value: "#eeceb3", name: "کمی روشن" },
    { id: "medium", value: "#e0ac69", name: "متوسط" },
    { id: "tan", value: "#c68642", name: "برنزه" },
    { id: "brown", value: "#89581a", name: "قهوه‌ای" },
    { id: "dark", value: "#553016", name: "تیره" },
    { id: "deepDark", value: "#3b2219", name: "خیلی تیره" },
    { id: "olive", value: "#8d7357", name: "زیتونی" }
  ],
  
  hairColors: [
    { id: "black", value: "#3a3a3a", name: "مشکی" },
    { id: "darkBrown", value: "#5a3825", name: "قهوه‌ای تیره" },
    { id: "brown", value: "#8b4513", name: "قهوه‌ای" },
    { id: "lightBrown", value: "#a87c5b", name: "قهوه‌ای روشن" },
    { id: "blonde", value: "#ffd700", name: "بلوند" },
    { id: "red", value: "#a52a2a", name: "قرمز" },
    { id: "auburn", value: "#a33027", name: "ماهگونی" },
    { id: "ginger", value: "#d7742b", name: "حنایی" },
    { id: "gray", value: "#c0c0c0", name: "خاکستری" },
    { id: "white", value: "#f5f5f5", name: "سفید" },
    { id: "blue", value: "#6495ed", name: "آبی" },
    { id: "purple", value: "#9370db", name: "بنفش" },
    { id: "green", value: "#20b27f", name: "سبز" },
    { id: "pink", value: "#ff69b4", name: "صورتی" }
  ],
  
  eyeColors: [
    { id: "brown", value: "#8b4513", name: "قهوه‌ای" },
    { id: "darkBrown", value: "#3a2218", name: "قهوه‌ای تیره" },
    { id: "hazel", value: "#c8a66b", name: "عسلی" },
    { id: "blue", value: "#4682b4", name: "آبی" },
    { id: "lightBlue", value: "#87ceeb", name: "آبی روشن" },
    { id: "green", value: "#2e8b57", name: "سبز" },
    { id: "amber", value: "#cda65c", name: "کهربایی" },
    { id: "gray", value: "#708090", name: "خاکستری" },
    { id: "black", value: "#000000", name: "سیاه" },
    { id: "violet", value: "#800080", name: "بنفش" }
  ],
  
  outfitColors: [
    { id: "blue", value: "#2980b9", name: "آبی" },
    { id: "darkBlue", value: "#1e3a8a", name: "آبی تیره" },
    { id: "red", value: "#e74c3c", name: "قرمز" },
    { id: "green", value: "#27ae60", name: "سبز" }, 
    { id: "purple", value: "#8e44ad", name: "بنفش" },
    { id: "yellow", value: "#f39c12", name: "زرد" },
    { id: "orange", value: "#e67e22", name: "نارنجی" },
    { id: "black", value: "#2c3e50", name: "سیاه" },
    { id: "gray", value: "#95a5a6", name: "خاکستری" },
    { id: "white", value: "#ecf0f1", name: "سفید" },
    { id: "brown", value: "#8b5a2b", name: "قهوه‌ای" },
    { id: "pink", value: "#fd79a8", name: "صورتی" },
    { id: "teal", value: "#00a9a5", name: "فیروزه‌ای" }
  ],
  
  accentColors: [
    { id: "tiffany", value: "#38bdf8", name: "فیروزه‌ای" },
    { id: "pink", value: "#f43f5e", name: "صورتی" },
    { id: "green", value: "#22c55e", name: "سبز" },
    { id: "amber", value: "#f59e0b", name: "کهربایی" },
    { id: "purple", value: "#8b5cf6", name: "بنفش" },
    { id: "red", value: "#ef4444", name: "قرمز" },
    { id: "blue", value: "#3b82f6", name: "آبی" },
    { id: "emerald", value: "#10b981", name: "زمردی" },
    { id: "orange", value: "#fb923c", name: "نارنجی" },
    { id: "indigo", value: "#6366f1", name: "نیلی" },
    { id: "rose", value: "#ec4899", name: "گلابی" },
    { id: "cyan", value: "#06b6d4", name: "آبی فیروزه‌ای" },
    { id: "gold", value: "#ffd700", name: "طلایی" }
  ]
};

// -------- تعریف Context برای اشتراک داده بین کامپوننت‌ها --------
interface AvatarStudioContextType {
  avatarData: AvatarData;
  updateAvatarData: (data: Partial<AvatarData>) => void;
  updateAvatarFeature: <K extends keyof AvatarData>(
    key: K,
    value: AvatarData[K]
  ) => void;
  updateMetaInfo: <K extends keyof AvatarData['metaInfo']>(
    key: K,
    value: AvatarData['metaInfo'][K]
  ) => void;
  toggleAccessory: (accessoryId: string) => void;
  setAccessoryColor: (accessoryId: string, color: string) => void;
  undoChanges: () => void;
  redoChanges: () => void;
  resetToDefault: () => void;
  saveVersion: (name?: string) => void;
  loadVersion: (versionId: string) => void;
  history: {
    past: Partial<AvatarData>[];
    future: Partial<AvatarData>[];
  };
  uiState: {
    currentTab: string;
    previewMode: "normal" | "animated" | "3d";
    zoomLevel: number;
    showGrid: boolean;
    showHelpers: boolean;
  };
  updateUIState: <K extends keyof AvatarStudioContextType['uiState']>(
    key: K,
    value: AvatarStudioContextType['uiState'][K]
  ) => void;
  packages: AvatarPackage[];
  togglePackage: (packageId: string) => void;
}

const AvatarStudioContext = createContext<AvatarStudioContextType | undefined>(undefined);

export const useAvatarStudio = () => {
  const context = useContext(AvatarStudioContext);
  if (context === undefined) {
    throw new Error("useAvatarStudio must be used within an AvatarStudioProvider");
  }
  return context;
};

// ------------ کامپوننت‌های اصلی برای استودیوی آواتار ------------

interface AvatarStudioProps {
  initialData?: Partial<AvatarData>;
  packages?: AvatarPackage[];
  onSave?: (data: AvatarData, imageUrl?: string) => void;
  onExport?: (imageUrl: string, data: AvatarData) => void;
  className?: string;
  userId?: string;
  userRole?: string;
  userName?: string;
}

// کامپوننت اصلی AvatarStudio
export function AvatarStudio({
  initialData,
  packages = [],
  onSave,
  onExport,
  className,
  userId = "",
  userRole = "کاربر",
  userName = ""
}: AvatarStudioProps) {
  const { toast } = useToast();
  const avatarRef = useRef<HTMLDivElement>(null);
  
  // ترکیب داده‌های اولیه با مقادیر پیش‌فرض
  const initialAvatarData: AvatarData = {
    ...defaultAvatarData,
    ...initialData,
    userId: userId || defaultAvatarData.userId,
    metaInfo: {
      ...defaultAvatarData.metaInfo,
      ...initialData?.metaInfo,
      role: userRole || defaultAvatarData.metaInfo.role
    }
  };
  
  // state اصلی برای داده‌های آواتار
  const [avatarData, setAvatarData] = useState<AvatarData>(initialAvatarData);
  
  // state برای تاریخچه تغییرات (undo و redo)
  const [history, setHistory] = useState<{
    past: Partial<AvatarData>[];
    future: Partial<AvatarData>[];
  }>({
    past: [],
    future: []
  });
  
  // state برای وضعیت UI
  const [uiState, setUIState] = useState({
    currentTab: "face",
    previewMode: "normal" as "normal" | "animated" | "3d",
    zoomLevel: 100,
    showGrid: false,
    showHelpers: true
  });
  
  // state برای پکیج‌های فعال
  const [availablePackages, setAvailablePackages] = useState<AvatarPackage[]>(packages);
  
  // به‌روزرسانی کامل داده‌های آواتار با ثبت در تاریخچه
  const updateAvatarData = (newData: Partial<AvatarData>) => {
    setHistory(prev => ({
      past: [...prev.past, avatarData],
      future: []
    }));
    
    setAvatarData(prev => ({
      ...prev,
      ...newData,
      updatedAt: new Date().toISOString()
    }));
  };
  
  // به‌روزرسانی یک ویژگی خاص از آواتار
  const updateAvatarFeature = <K extends keyof AvatarData>(
    key: K,
    value: AvatarData[K]
  ) => {
    // فقط اگر مقدار واقعاً تغییر کرده باشد در تاریخچه ثبت می‌کنیم
    if (avatarData[key] !== value) {
      setHistory(prev => ({
        past: [...prev.past, { [key]: avatarData[key] } as Partial<AvatarData>],
        future: []
      }));
      
      setAvatarData(prev => ({
        ...prev,
        [key]: value,
        updatedAt: new Date().toISOString()
      }));
    }
  };
  
  // به‌روزرسانی اطلاعات متا
  const updateMetaInfo = <K extends keyof AvatarData['metaInfo']>(
    key: K,
    value: AvatarData['metaInfo'][K]
  ) => {
    // فقط اگر مقدار واقعاً تغییر کرده باشد در تاریخچه ثبت می‌کنیم
    if (avatarData.metaInfo[key] !== value) {
      setHistory(prev => ({
        past: [...prev.past, { 
          metaInfo: { ...avatarData.metaInfo, [key]: avatarData.metaInfo[key] } 
        } as Partial<AvatarData>],
        future: []
      }));
      
      setAvatarData(prev => ({
        ...prev,
        metaInfo: {
          ...prev.metaInfo,
          [key]: value
        },
        updatedAt: new Date().toISOString()
      }));
    }
  };
  
  // تغییر وضعیت یک اکسسوری (افزودن یا حذف)
  const toggleAccessory = (accessoryId: string) => {
    const accessories = [...avatarData.accessories];
    const index = accessories.indexOf(accessoryId);
    
    if (index > -1) {
      accessories.splice(index, 1);
    } else {
      accessories.push(accessoryId);
    }
    
    setHistory(prev => ({
      past: [...prev.past, { accessories: [...avatarData.accessories] }],
      future: []
    }));
    
    setAvatarData(prev => ({
      ...prev,
      accessories,
      updatedAt: new Date().toISOString()
    }));
  };
  
  // تنظیم رنگ یک اکسسوری خاص
  const setAccessoryColor = (accessoryId: string, color: string) => {
    const newAccessoryColors = {
      ...avatarData.accessoryColors,
      [accessoryId]: color
    };
    
    setHistory(prev => ({
      past: [...prev.past, { accessoryColors: { ...avatarData.accessoryColors } }],
      future: []
    }));
    
    setAvatarData(prev => ({
      ...prev,
      accessoryColors: newAccessoryColors,
      updatedAt: new Date().toISOString()
    }));
  };
  
  // برگرداندن آخرین تغییر (Undo)
  const undoChanges = () => {
    if (history.past.length === 0) return;
    
    const lastState = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);
    
    setHistory({
      past: newPast,
      future: [{ ...avatarData, ...lastState }, ...history.future]
    });
    
    setAvatarData(prev => {
      const keys = Object.keys(lastState);
      const updatedData = { ...prev };
      
      keys.forEach(key => {
        // @ts-ignore - در اینجا key می‌تواند هر کلیدی از AvatarData باشد
        updatedData[key] = lastState[key];
      });
      
      return {
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
    });
  };
  
  // بازگرداندن تغییرات برگشته (Redo)
  const redoChanges = () => {
    if (history.future.length === 0) return;
    
    const nextState = history.future[0];
    const newFuture = history.future.slice(1);
    
    setHistory({
      past: [...history.past, { ...avatarData, ...nextState }],
      future: newFuture
    });
    
    setAvatarData(prev => {
      const keys = Object.keys(nextState);
      const updatedData = { ...prev };
      
      keys.forEach(key => {
        // @ts-ignore - در اینجا key می‌تواند هر کلیدی از AvatarData باشد
        updatedData[key] = nextState[key];
      });
      
      return {
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
    });
  };
  
  // بازنشانی به تنظیمات پیش‌فرض
  const resetToDefault = () => {
    setHistory(prev => ({
      past: [...prev.past, avatarData],
      future: []
    }));
    
    setAvatarData({
      ...defaultAvatarData,
      id: avatarData.id,
      userId: avatarData.userId,
      name: avatarData.name,
      createdAt: avatarData.createdAt,
      updatedAt: new Date().toISOString(),
      metaInfo: {
        ...defaultAvatarData.metaInfo,
        role: avatarData.metaInfo.role,
        level: avatarData.metaInfo.level,
        xp: avatarData.metaInfo.xp
      }
    });
    
    toast({
      title: "بازنشانی انجام شد",
      description: "آواتار به حالت پیش‌فرض بازگشت.",
      variant: "default",
    });
  };
  
  // ذخیره یک نسخه از آواتار فعلی
  const saveVersion = async (name?: string) => {
    try {
      // ایجاد تصویر بندانگشتی از آواتار
      let thumbnailUrl = "";
      if (avatarRef.current) {
        const canvas = await html2canvas(avatarRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        thumbnailUrl = canvas.toDataURL('image/png');
      }
      
      const newVersion: AvatarVersion = {
        id: `v_${Date.now()}`,
        name: name || `نسخه ${avatarData.savedVersions.length + 1}`,
        timestamp: new Date().toISOString(),
        thumbnailUrl,
        data: { ...avatarData },
      };
      
      setAvatarData(prev => ({
        ...prev,
        savedVersions: [...prev.savedVersions, newVersion],
        updatedAt: new Date().toISOString()
      }));
      
      toast({
        title: "نسخه ذخیره شد",
        description: `نسخه "${newVersion.name}" با موفقیت ذخیره شد.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error saving version:", error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی نسخه آواتار به وجود آمد.",
        variant: "destructive",
      });
    }
  };
  
  // بارگذاری یک نسخه ذخیره شده
  const loadVersion = (versionId: string) => {
    const version = avatarData.savedVersions.find(v => v.id === versionId);
    if (!version) return;
    
    setHistory(prev => ({
      past: [...prev.past, avatarData],
      future: []
    }));
    
    setAvatarData({
      ...avatarData,
      ...version.data,
      updatedAt: new Date().toISOString()
    });
    
    toast({
      title: "نسخه بارگذاری شد",
      description: `نسخه "${version.name}" با موفقیت بارگذاری شد.`,
      variant: "default",
    });
  };
  
  // به‌روزرسانی وضعیت UI
  const updateUIState = <K extends keyof typeof uiState>(
    key: K,
    value: typeof uiState[K]
  ) => {
    setUIState(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // تغییر وضعیت فعال بودن یک پکیج
  const togglePackage = (packageId: string) => {
    setAvailablePackages(prev => 
      prev.map(pkg => 
        pkg.id === packageId
          ? { ...pkg, isActive: !pkg.isActive }
          : pkg
      )
    );
  };
  
  // گرفتن عکس از آواتار فعلی
  const captureAvatar = async () => {
    if (avatarRef.current) {
      try {
        const canvas = await html2canvas(avatarRef.current, {
          backgroundColor: null,
          scale: 2,
        });
        
        const dataUrl = canvas.toDataURL('image/png');
        
        if (onExport) {
          onExport(dataUrl, avatarData);
        }
        
        toast({
          title: "آواتار دانلود شد",
          description: "تصویر آواتار با موفقیت دانلود شد.",
          variant: "default",
        });
        
        return dataUrl;
      } catch (error) {
        console.error('Error capturing avatar:', error);
        toast({
          title: "خطا در ذخیره‌سازی",
          description: "مشکلی در ذخیره‌سازی تصویر آواتار به وجود آمد.",
          variant: "destructive",
        });
      }
    }
    return null;
  };
  
  // ذخیره نهایی آواتار
  const handleSaveAvatar = async () => {
    try {
      const imageUrl = await captureAvatar();
      
      if (onSave) {
        onSave(avatarData, imageUrl || undefined);
      }
      
      toast({
        title: "آواتار ذخیره شد",
        description: "آواتار شما با موفقیت ذخیره شد.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error saving avatar:', error);
      toast({
        title: "خطا در ذخیره‌سازی",
        description: "مشکلی در ذخیره‌سازی آواتار به وجود آمد.",
        variant: "destructive",
      });
    }
  };
  
  // فراهم کردن context برای کامپوننت‌های فرزند
  const contextValue: AvatarStudioContextType = {
    avatarData,
    updateAvatarData,
    updateAvatarFeature,
    updateMetaInfo,
    toggleAccessory,
    setAccessoryColor,
    undoChanges,
    redoChanges,
    resetToDefault,
    saveVersion,
    loadVersion,
    history,
    uiState,
    updateUIState,
    packages: availablePackages,
    togglePackage
  };
  
  // حالت‌ها و استایل‌های مختلف برای آواتار
  const styles = {
    faceShape: {
      "round": "rounded-full",
      "square": "rounded-xl",
      "hexagon": "hexagon-shape",
      "oval": "oval-shape",
      "heart": "heart-shape"
    }
  };
  
  return (
    <AvatarStudioContext.Provider value={contextValue}>
      <div className={cn("bg-white dark:bg-slate-950 shadow-xl border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden", className)}>
        <div className="flex flex-col lg:flex-row h-full">
          {/* بخش پیش‌نمایش آواتار - یک سوم صفحه */}
          <div className="lg:w-1/3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 p-6 border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-slate-800 relative">
            <div className="flex flex-col h-full">
              {/* سربرگ پیش‌نمایش */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">پیش‌نمایش آواتار</h3>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8" 
                          onClick={() => updateUIState("showGrid", !uiState.showGrid)}
                        >
                          <Grid className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{uiState.showGrid ? "مخفی کردن خطوط راهنما" : "نمایش خطوط راهنما"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <Select
                    value={uiState.previewMode}
                    onValueChange={(value) => updateUIState("previewMode", value as "normal" | "animated" | "3d")}
                  >
                    <SelectTrigger className="h-8 w-32 text-xs">
                      <SelectValue placeholder="حالت نمایش" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">نمایش عادی</SelectItem>
                      <SelectItem value="animated">نمایش متحرک</SelectItem>
                      <SelectItem value="3d">نمایش سه‌بعدی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* نمایش آواتار */}
              <div className="flex-grow flex flex-col items-center justify-center relative">
                <div className="relative mb-4">
                  <motion.div
                    ref={avatarRef}
                    className={cn(
                      "relative overflow-hidden transition-all duration-300",
                      styles.faceShape[avatarData.faceShape as keyof typeof styles.faceShape] || "rounded-full",
                      {
                        "w-32 h-32": avatarData.size === "small",
                        "w-48 h-48": avatarData.size === "medium",
                        "w-64 h-64": avatarData.size === "large",
                      },
                      avatarData.glow && "ring ring-offset-2 ring-offset-white dark:ring-offset-slate-950",
                    )}
                    style={{
                      backgroundColor: avatarData.background,
                      borderWidth: avatarData.borderWidth,
                      borderColor: avatarData.borderColor,
                      borderStyle: avatarData.borderStyle,
                      boxShadow: avatarData.glow ? `0 0 15px ${avatarData.glowColor}` : 'none',
                      transform: `scale(${uiState.zoomLevel / 100})`,
                    }}
                    animate={uiState.previewMode === "animated" && avatarData.animation ? 
                      avatarData.animation === "pulse" 
                        ? { scale: [1, 1.05, 1], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }} 
                        : avatarData.animation === "float" 
                          ? { y: [0, -10, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }} 
                          : {} 
                      : {}
                    }
                  >
                    {/* محتوای آواتار (به پیچیدگی آواتار واقعی بستگی دارد) */}
                    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      {/* سر و صورت */}
                      <circle cx="50" cy="50" r="30" fill={avatarData.skinTone} />
                      
                      {/* سایه‌های صورت */}
                      {avatarData.skinShader && (
                        <>
                          <ellipse cx="40" cy="55" rx="10" ry="5" fill="rgba(0,0,0,0.05)" opacity="0.3" />
                          <ellipse cx="60" cy="55" rx="10" ry="5" fill="rgba(0,0,0,0.05)" opacity="0.3" />
                        </>
                      )}
                      
                      {/* چشم‌ها */}
                      {avatarData.expression === "smile" && (
                        <>
                          <circle cx="40" cy="40" r="5" fill="white" />
                          <circle cx="40" cy="40" r="3" fill={avatarData.eyeColor} />
                          <circle cx="40" cy="39" r="1" fill="white" />
                          
                          <circle cx="60" cy="40" r="5" fill="white" />
                          <circle cx="60" cy="40" r="3" fill={avatarData.eyeColor} />
                          <circle cx="60" cy="39" r="1" fill="white" />
                        </>
                      )}
                      
                      {avatarData.expression === "neutral" && (
                        <>
                          <circle cx="40" cy="40" r="5" fill="white" />
                          <circle cx="40" cy="40" r="3" fill={avatarData.eyeColor} />
                          <circle cx="40" cy="39" r="1" fill="white" />
                          
                          <circle cx="60" cy="40" r="5" fill="white" />
                          <circle cx="60" cy="40" r="3" fill={avatarData.eyeColor} />
                          <circle cx="60" cy="39" r="1" fill="white" />
                        </>
                      )}
                      
                      {/* دهان */}
                      {avatarData.expression === "smile" && (
                        <path d="M40 60 Q50 70, 60 60" stroke="black" strokeWidth="2" fill="none" />
                      )}
                      
                      {avatarData.expression === "neutral" && (
                        <line x1="40" y1="60" x2="60" y2="60" stroke="black" strokeWidth="2" />
                      )}
                      
                      {/* مو */}
                      {avatarData.hairStyle && (
                        <g fill={avatarData.hairColor} stroke={avatarData.hairColor}>
                          {/* کد مربوط به مدل موی انتخاب شده */}
                          {avatarData.hairStyle === "short-straight" && (
                            <>
                              <path d="M50 30 C 30 30, 20 50, 25 80" strokeWidth="2" fill="none" />
                              <path d="M50 30 C 70 30, 80 50, 75 80" strokeWidth="2" fill="none" />
                            </>
                          )}
                          {avatarData.hairStyle === "medium-wavy" && (
                            <>
                              <path d="M50 25 C 20 25, 15 40, 15 60 Q 15 80, 25 90" strokeWidth="2" fill="none" />
                              <path d="M50 25 C 80 25, 85 40, 85 60 Q 85 80, 75 90" strokeWidth="2" fill="none" />
                            </>
                          )}
                        </g>
                      )}
                      
                      {/* اکسسوری‌ها */}
                      {avatarData.accessories.includes("glasses-round") && (
                        <g fill="none" stroke={avatarData.accessoryColors["glasses-round"] || "#000000"}>
                          <circle cx="35" cy="45" r="10" strokeWidth="2" />
                          <circle cx="65" cy="45" r="10" strokeWidth="2" />
                          <path d="M45 45 L 55 45" strokeWidth="2" />
                        </g>
                      )}
                      
                      {/* لباس */}
                      <path
                        d={
                          avatarData.outfit === "casual-shirt" ? 
                          "M30 85 L35 65 L50 70 L65 65 L70 85" :
                          "M25 85 L35 65 L50 75 L65 65 L75 85"
                        }
                        fill={avatarData.outfitColor}
                        stroke={avatarData.outfitColor}
                        strokeWidth="1"
                      />
                    </svg>
                    
                    {/* نشان کاربر */}
                    {avatarData.badgeType && (
                      <div 
                        className={cn(
                          "absolute bg-gradient-to-r from-tiffany to-blue-500 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center",
                          {
                            "top-0 right-0": avatarData.badgePosition === "top-right",
                            "top-0 left-0": avatarData.badgePosition === "top-left",
                            "bottom-0 right-0": avatarData.badgePosition === "bottom-right",
                            "bottom-0 left-0": avatarData.badgePosition === "bottom-left"
                          }
                        )}
                      >
                        {avatarData.badgeType === "level" && (
                          <span className="text-xs font-bold">{avatarData.metaInfo.level}</span>
                        )}
                        {avatarData.badgeType === "role" && (
                          <Crown className="w-4 h-4" />
                        )}
                      </div>
                    )}
                    
                    {/* وضعیت آنلاین */}
                    {avatarData.metaInfo.status !== "offline" && (
                      <div 
                        className={cn(
                          "absolute w-4 h-4 rounded-full border-2 border-white dark:border-slate-900",
                          {
                            "bg-green-500": avatarData.metaInfo.status === "online",
                            "bg-amber-500": avatarData.metaInfo.status === "away",
                            "bg-red-500": avatarData.metaInfo.status === "busy"
                          },
                          "top-0 right-0"
                        )}
                      />
                    )}
                    
                    {/* خطوط راهنما */}
                    {uiState.showGrid && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTAwLDEwMCwxMDAsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] bg-repeat" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-px h-full bg-red-500/20"></div>
                          <div className="h-px w-full bg-red-500/20"></div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                  
                  {/* کنترل‌های زوم در زیر آواتار */}
                  <div className="flex items-center justify-center mt-4 space-x-2 space-x-reverse">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => updateUIState("zoomLevel", Math.max(50, uiState.zoomLevel - 10))}
                      disabled={uiState.zoomLevel <= 50}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <div className="w-32">
                      <Slider
                        value={[uiState.zoomLevel]}
                        min={50}
                        max={150}
                        step={5}
                        onValueChange={(value) => updateUIState("zoomLevel", value[0])}
                      />
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => updateUIState("zoomLevel", Math.min(150, uiState.zoomLevel + 10))}
                      disabled={uiState.zoomLevel >= 150}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* اطلاعات کاربر */}
                <div className="w-full mt-4">
                  <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center">
                        <h4 className="font-semibold text-slate-900 dark:text-white">{avatarData.name}</h4>
                        <div className="flex items-center mt-1 text-xs text-slate-500 dark:text-slate-400">
                          <span className={cn(
                            "inline-block w-2 h-2 rounded-full ml-1",
                            {
                              "bg-green-500": avatarData.metaInfo.status === "online",
                              "bg-amber-500": avatarData.metaInfo.status === "away",
                              "bg-red-500": avatarData.metaInfo.status === "busy",
                              "bg-slate-300": avatarData.metaInfo.status === "offline"
                            }
                          )} />
                          {avatarData.metaInfo.role} • سطح {avatarData.metaInfo.level}
                        </div>
                        
                        {/* نوار پیشرفت */}
                        <div className="w-full mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-tiffany to-blue-500"
                            style={{ width: `${Math.min(100, (avatarData.metaInfo.xp / ((avatarData.metaInfo.level || 1) * 100)) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {avatarData.metaInfo.xp} XP / {(avatarData.metaInfo.level || 1) * 100} XP
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* دکمه‌های عملیات */}
              <div className="mt-6 flex flex-col space-y-2">
                <div className="flex space-x-2 space-x-reverse">
                  <Button 
                    className="flex-1"
                    onClick={handleSaveAvatar}
                  >
                    <Save className="ml-2 h-4 w-4" />
                    ذخیره آواتار
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={captureAvatar}
                  >
                    <Download className="ml-2 h-4 w-4" />
                    دانلود تصویر
                  </Button>
                </div>
                
                <div className="flex space-x-2 space-x-reverse">
                  <Button 
                    variant="secondary" 
                    className="flex-1"
                    onClick={() => saveVersion()}
                  >
                    <Bookmark className="ml-2 h-4 w-4" />
                    ذخیره نسخه
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={resetToDefault}
                  >
                    <RefreshCcw className="ml-2 h-4 w-4" />
                    بازنشانی
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* بخش ویرایشگر - دو سوم صفحه */}
          <div className="lg:w-2/3 h-full flex flex-col overflow-hidden">
            {/* نوار ابزار بالا */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">استودیوی آواتار</h2>
                <Badge variant="outline" className="mr-2 text-xs">نسخه 2.5</Badge>
              </div>
              
              <div className="flex items-center space-x-1 space-x-reverse">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={undoChanges}
                  disabled={history.past.length === 0}
                  className="h-9 w-9"
                >
                  <Undo className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={redoChanges}
                  disabled={history.future.length === 0}
                  className="h-9 w-9"
                >
                  <Redo className="h-5 w-5" />
                </Button>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9"
                    >
                      <Filter className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4">
                    <div className="space-y-4">
                      <h4 className="font-semibold">فیلترها و رویکردها</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Checkbox id="show-premium" />
                          <Label htmlFor="show-premium" className="mr-2 text-sm">نمایش آیتم‌های ویژه</Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="show-new" defaultChecked />
                          <Label htmlFor="show-new" className="mr-2 text-sm">نمایش آیتم‌های جدید</Label>
                        </div>
                        <div className="flex items-center">
                          <Checkbox id="show-recommended" defaultChecked />
                          <Label htmlFor="show-recommended" className="mr-2 text-sm">پیشنهادهای هوشمند</Label>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          const randomEyeColor = colorPalettes.eyeColors[Math.floor(Math.random() * colorPalettes.eyeColors.length)].value;
                          const randomHairColor = colorPalettes.hairColors[Math.floor(Math.random() * colorPalettes.hairColors.length)].value;
                          const randomOutfitColor = colorPalettes.outfitColors[Math.floor(Math.random() * colorPalettes.outfitColors.length)].value;
                          
                          updateAvatarData({
                            hairColor: randomHairColor,
                            eyeColor: randomEyeColor,
                            outfitColor: randomOutfitColor,
                            expression: Math.random() > 0.5 ? "smile" : "neutral",
                            glow: Math.random() > 0.7,
                            glowColor: colorPalettes.accentColors[Math.floor(Math.random() * colorPalettes.accentColors.length)].value
                          });
                          
                          toast({
                            title: "ترکیب رنگی جدید اعمال شد",
                            description: "یک ترکیب رنگی تصادفی روی آواتار شما اعمال شد.",
                            variant: "default",
                          });
                        }}
                        className="h-9 w-9"
                      >
                        <Shuffle className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>ترکیب رنگی تصادفی</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => {
                          toast({
                            title: "پیشنهادهای هوشمند",
                            description: "در حال تحلیل آواتار شما برای پیشنهادهای شخصی‌سازی...",
                            variant: "default",
                          });
                          
                          // اینجا می‌توان یک تابع هوشمند برای پیشنهادات براساس آواتار فعلی داشت
                          setTimeout(() => {
                            updateAvatarData({
                              // پیشنهادات هوشمند
                            });
                          }, 1500);
                        }}
                        className="h-9 w-9"
                      >
                        <Wand2 className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>پیشنهادهای هوشمند</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            {/* محتوای اصلی ویرایشگر با تب‌های مختلف */}
            <div className="flex-grow overflow-hidden">
              <Tabs
                value={uiState.currentTab}
                onValueChange={(value) => updateUIState("currentTab", value)}
                className="h-full flex flex-col"
              >
                <div className="border-b border-slate-200 dark:border-slate-800">
                  <TabsList className="bg-transparent p-0 h-14 justify-start overflow-x-auto">
                    <TabsTrigger
                      value="face"
                      className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-tiffany data-[state=active]:shadow-none h-14 px-4"
                    >
                      <User className="ml-2 h-5 w-5" />
                      چهره و پوست
                    </TabsTrigger>
                    <TabsTrigger
                      value="hair"
                      className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-tiffany data-[state=active]:shadow-none h-14 px-4"
                    >
                      <Brush className="ml-2 h-5 w-5" />
                      مو و آرایش
                    </TabsTrigger>
                    <TabsTrigger
                      value="outfit"
                      className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-tiffany data-[state=active]:shadow-none h-14 px-4"
                    >
                      <Shirt className="ml-2 h-5 w-5" />
                      لباس و استایل
                    </TabsTrigger>
                    <TabsTrigger
                      value="accessories"
                      className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-tiffany data-[state=active]:shadow-none h-14 px-4"
                    >
                      <Glasses className="ml-2 h-5 w-5" />
                      اکسسوری‌ها
                    </TabsTrigger>
                    <TabsTrigger
                      value="effects"
                      className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-tiffany data-[state=active]:shadow-none h-14 px-4"
                    >
                      <Sparkles className="ml-2 h-5 w-5" />
                      افکت‌ها و جلوه‌ها
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-tiffany data-[state=active]:shadow-none h-14 px-4"
                    >
                      <Settings className="ml-2 h-5 w-5" />
                      تنظیمات نمایش
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                {/* محتوای تب‌ها با قابلیت اسکرول */}
                <div className="flex-grow overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      {/* تب چهره و پوست */}
                      <TabsContent value="face" className="m-0">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">شکل چهره</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                              {["round", "square", "hexagon", "oval", "heart"].map((shape) => (
                                <Card
                                  key={shape}
                                  className={cn(
                                    "cursor-pointer transition-all hover:scale-105 overflow-hidden group",
                                    avatarData.faceShape === shape && "ring-2 ring-tiffany"
                                  )}
                                  onClick={() => updateAvatarFeature("faceShape", shape)}
                                >
                                  <CardContent className="p-3 flex flex-col items-center">
                                    <div className={cn(
                                      "w-16 h-16 flex items-center justify-center bg-slate-100 dark:bg-slate-800 mb-2",
                                      styles.faceShape[shape as keyof typeof styles.faceShape] || "rounded-full"
                                    )}>
                                      <UserRound className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <span className="text-sm">
                                      {shape === "round" ? "گرد" : 
                                       shape === "square" ? "مربعی" : 
                                       shape === "hexagon" ? "شش‌ضلعی" : 
                                       shape === "oval" ? "بیضی" : 
                                       "قلبی"}
                                    </span>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">رنگ پوست</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-4">
                              {colorPalettes.skinTones.map((tone) => (
                                <TooltipProvider key={tone.id}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        className={cn(
                                          "w-12 h-12 rounded-full transition-transform hover:scale-110",
                                          avatarData.skinTone === tone.value ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                        )}
                                        style={{ backgroundColor: tone.value }}
                                        onClick={() => updateAvatarFeature("skinTone", tone.value)}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{tone.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                              
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-12 h-12 p-0 rounded-full">
                                    <Palette className="h-6 w-6" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <div className="p-3">
                                    <div className="mb-2">
                                      <Label>رنگ سفارشی</Label>
                                    </div>
                                    <HexColorPicker
                                      color={avatarData.skinTone}
                                      onChange={(color) => updateAvatarFeature("skinTone", color)}
                                    />
                                    <div className="mt-2">
                                      <HexColorInput
                                        color={avatarData.skinTone}
                                        onChange={(color) => updateAvatarFeature("skinTone", color)}
                                        prefixed
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                      />
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <Label htmlFor="skin-shader-toggle" className="text-sm">سایه‌پردازی پوست</Label>
                              <Switch
                                id="skin-shader-toggle"
                                checked={avatarData.skinShader}
                                onCheckedChange={(checked) => updateAvatarFeature("skinShader", checked)}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">حالت چهره</h3>
                            <div className="grid grid-cols-3 gap-3">
                              {[
                                { id: "smile", name: "لبخند", icon: <Smile className="h-8 w-8" /> },
                                { id: "neutral", name: "خنثی", icon: <Meh className="h-8 w-8" /> },
                                { id: "serious", name: "جدی", icon: <Frown className="h-8 w-8" /> }
                              ].map((expression) => (
                                <Card
                                  key={expression.id}
                                  className={cn(
                                    "cursor-pointer transition-all hover:scale-105",
                                    avatarData.expression === expression.id && "ring-2 ring-tiffany"
                                  )}
                                  onClick={() => updateAvatarFeature("expression", expression.id)}
                                >
                                  <CardContent className="p-4 flex flex-col items-center justify-center">
                                    <div className="mb-2">
                                      {expression.icon}
                                    </div>
                                    <span className="text-sm">{expression.name}</span>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">رنگ چشم</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4">
                              {colorPalettes.eyeColors.map((color) => (
                                <TooltipProvider key={color.id}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        className={cn(
                                          "w-10 h-10 rounded-full transition-transform hover:scale-110",
                                          avatarData.eyeColor === color.value ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                        )}
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => updateAvatarFeature("eyeColor", color.value)}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{color.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                              
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
                                    <Palette className="h-5 w-5" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <div className="p-3">
                                    <div className="mb-2">
                                      <Label>رنگ سفارشی چشم</Label>
                                    </div>
                                    <HexColorPicker
                                      color={avatarData.eyeColor}
                                      onChange={(color) => updateAvatarFeature("eyeColor", color)}
                                    />
                                    <div className="mt-2">
                                      <HexColorInput
                                        color={avatarData.eyeColor}
                                        onChange={(color) => updateAvatarFeature("eyeColor", color)}
                                        prefixed
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                      />
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      {/* سایر تب‌ها مشابه تب بالا پیاده‌سازی می‌شوند */}
                      <TabsContent value="hair" className="m-0">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">مدل مو</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                              {[
                                { id: "short-straight", name: "کوتاه صاف" },
                                { id: "medium-wavy", name: "متوسط موج‌دار" },
                                { id: "long-straight", name: "بلند صاف" },
                                { id: "curly", name: "فرفری" },
                                { id: "mohawk", name: "موهاک" },
                                { id: "bald", name: "طاس" }
                              ].map((style) => (
                                <Card
                                  key={style.id}
                                  className={cn(
                                    "cursor-pointer transition-all hover:scale-105",
                                    avatarData.hairStyle === style.id && "ring-2 ring-tiffany"
                                  )}
                                  onClick={() => updateAvatarFeature("hairStyle", style.id)}
                                >
                                  <CardContent className="p-3 flex flex-col items-center">
                                    <div className="w-20 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-800 mb-2 rounded-full overflow-hidden">
                                      <svg viewBox="0 0 100 100" width="60" height="60">
                                        {/* کد مدل مو مربوطه */}
                                        <circle cx="50" cy="60" r="30" fill="#f8d5c2" />
                                        {style.id === "short-straight" && (
                                          <>
                                            <path d="M50 30 C 30 30, 20 50, 25 80" stroke="#3a3a3a" strokeWidth="2" fill="none" />
                                            <path d="M50 30 C 70 30, 80 50, 75 80" stroke="#3a3a3a" strokeWidth="2" fill="none" />
                                          </>
                                        )}
                                        {style.id === "medium-wavy" && (
                                          <>
                                            <path d="M50 25 C 20 25, 15 40, 15 60 Q 15 80, 25 90" stroke="#3a3a3a" strokeWidth="2" fill="none" />
                                            <path d="M50 25 C 80 25, 85 40, 85 60 Q 85 80, 75 90" stroke="#3a3a3a" strokeWidth="2" fill="none" />
                                          </>
                                        )}
                                        {style.id === "long-straight" && (
                                          <>
                                            <path d="M50 25 C 20 25, 10 50, 10 100" stroke="#3a3a3a" strokeWidth="2" fill="none" />
                                            <path d="M50 25 C 80 25, 90 50, 90 100" stroke="#3a3a3a" strokeWidth="2" fill="none" />
                                          </>
                                        )}
                                        {style.id === "curly" && (
                                          <>
                                            <path d="M50 25 C 30 25, 20 30, 15 40 Q 10 50, 15 60 Q 20 70, 15 80 Q 10 90, 15 100" stroke="#3a3a3a" strokeWidth="2" fill="none" />
                                            <path d="M50 25 C 70 25, 80 30, 85 40 Q 90 50, 85 60 Q 80 70, 85 80 Q 90 90, 85 100" stroke="#3a3a3a" strokeWidth="2" fill="none" />
                                          </>
                                        )}
                                        {style.id === "mohawk" && (
                                          <>
                                            <path d="M50 20 L 50 35 M 50 20 L 40 25 M 50 20 L 60 25 M 50 20 L 45 23 M 50 20 L 55 23" stroke="#3a3a3a" strokeWidth="3" fill="none" />
                                          </>
                                        )}
                                      </svg>
                                    </div>
                                    <span className="text-sm">{style.name}</span>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">رنگ مو</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-4">
                              {colorPalettes.hairColors.map((color) => (
                                <TooltipProvider key={color.id}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        className={cn(
                                          "w-10 h-10 rounded-full transition-transform hover:scale-110",
                                          avatarData.hairColor === color.value ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                                        )}
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => updateAvatarFeature("hairColor", color.value)}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{color.name}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                              
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
                                    <Palette className="h-5 w-5" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <div className="p-3">
                                    <div className="mb-2">
                                      <Label>رنگ سفارشی مو</Label>
                                    </div>
                                    <HexColorPicker
                                      color={avatarData.hairColor}
                                      onChange={(color) => updateAvatarFeature("hairColor", color)}
                                    />
                                    <div className="mt-2">
                                      <HexColorInput
                                        color={avatarData.hairColor}
                                        onChange={(color) => updateAvatarFeature("hairColor", color)}
                                        prefixed
                                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                      />
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                          
                          {/* سایر گزینه‌های مو و آرایش */}
                        </div>
                      </TabsContent>
                      
                      {/* سایر تب‌ها */}
                      <TabsContent value="outfit" className="m-0">
                        {/* محتوای تب لباس و استایل */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">استایل لباس</h3>
                          {/* محتوای مربوط به لباس */}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="accessories" className="m-0">
                        {/* محتوای تب اکسسوری‌ها */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">اکسسوری‌ها</h3>
                          {/* محتوای مربوط به اکسسوری‌ها */}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="effects" className="m-0">
                        {/* محتوای تب افکت‌ها و جلوه‌ها */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">افکت‌ها و جلوه‌ها</h3>
                          {/* محتوای مربوط به افکت‌ها */}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="settings" className="m-0">
                        {/* محتوای تب تنظیمات نمایش */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">تنظیمات نمایش</h3>
                          {/* محتوای مربوط به تنظیمات */}
                        </div>
                      </TabsContent>
                    </div>
                  </ScrollArea>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AvatarStudioContext.Provider>
  );
}

// --------  شکل‌های مختلف آواتار --------
const shapes = {
  faceShape: {
    round: "rounded-full",
    square: "rounded-xl",
    hexagon: "hexagon-shape",
    oval: "oval-shape",
    heart: "heart-shape"
  }
};

// -------- استایل‌های اضافی برای شکل‌های پیچیده --------
export const avatarProStyles = `
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
  styleElement.innerHTML = avatarProStyles;
  document.head.appendChild(styleElement);
}