import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Save,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronRight,
  Image,
  Download,
  Share2,
  Palette,
  Sparkles,
  Award,
  ShoppingBag,
  Eye,
  X,
  Trophy,
  FileText
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

// آیتم‌های قابل انتخاب در هر دسته
interface AvatarItem {
  id: string;
  name: string;
  thumbnail: string;
  svg: string;
  premium?: boolean;
  xpRequired?: number;
  isLocked?: boolean;
}

interface AvatarCategory {
  id: string;
  name: string;
  items: AvatarItem[];
  icon: React.ReactNode;
}

// تعریف رنگ‌های پوست
const skinColors = [
  "#FFDBAC", // روشن
  "#F1C27D", // متوسط روشن
  "#E0AC69", // متوسط
  "#C68642", // متوسط تیره
  "#8D5524", // تیره
];

// تعریف رنگ‌های مو
const hairColors = [
  "#090806", // مشکی
  "#4A0100", // قهوه‌ای تیره
  "#A52A2A", // قهوه‌ای
  "#FFDB58", // بلوند
  "#E7A854", // بلوند تیره
  "#B2560D", // حنایی
  "#878787", // خاکستری
  "#FF2934", // قرمز
];

// تعریف دسته‌بندی‌های آواتار
const avatarCategories: AvatarCategory[] = [
  {
    id: "face",
    name: "صورت",
    icon: <span className="text-xl">😊</span>,
    items: [
      { id: "face1", name: "گرد", thumbnail: "/assets/avatar/face/face1_thumb.svg", svg: "<circle cx='50' cy='50' r='40' fill='#FFC0CB' />" },
      { id: "face2", name: "بیضی", thumbnail: "/assets/avatar/face/face2_thumb.svg", svg: "<ellipse cx='50' cy='50' rx='35' ry='45' fill='#FFC0CB' />" },
      { id: "face3", name: "مستطیل", thumbnail: "/assets/avatar/face/face3_thumb.svg", svg: "<rect x='20' y='15' width='60' height='70' rx='10' fill='#FFC0CB' />" },
      { id: "face4", name: "قلب", thumbnail: "/assets/avatar/face/face4_thumb.svg", svg: "<path d='M50 90 C100 30 150 20 100 50 L50 90 C0 30 -50 20 0 50 Z' fill='#FFC0CB' transform='scale(0.5) translate(50, 30)' />" },
      { id: "face5", name: "الماس", thumbnail: "/assets/avatar/face/face5_thumb.svg", svg: "<rect x='25' y='15' width='50' height='70' rx='10' transform='rotate(45 50 50)' fill='#FFC0CB' />" },
    ],
  },
  {
    id: "eyes",
    name: "چشم‌ها",
    icon: <span className="text-xl">👁️</span>,
    items: [
      { id: "eyes1", name: "گرد", thumbnail: "/assets/avatar/eyes/eyes1_thumb.svg", svg: "<circle cx='35' cy='40' r='5' fill='#000'/><circle cx='65' cy='40' r='5' fill='#000'/>" },
      { id: "eyes2", name: "بادامی", thumbnail: "/assets/avatar/eyes/eyes2_thumb.svg", svg: "<ellipse cx='35' cy='40' rx='7' ry='4' fill='#000'/><ellipse cx='65' cy='40' rx='7' ry='4' fill='#000'/>" },
      { id: "eyes3", name: "خندان", thumbnail: "/assets/avatar/eyes/eyes3_thumb.svg", svg: "<path d='M30,40 Q35,35 40,40' stroke='#000' stroke-width='2' fill='none'/><path d='M60,40 Q65,35 70,40' stroke='#000' stroke-width='2' fill='none'/>" },
      { id: "eyes4", name: "ویژه", thumbnail: "/assets/avatar/eyes/eyes4_thumb.svg", svg: "<path d='M30,37 Q35,45 40,37' stroke='#000' stroke-width='2' fill='#88F'/><path d='M60,37 Q65,45 70,37' stroke='#000' stroke-width='2' fill='#88F'/>", premium: true, xpRequired: 1000 },
      { id: "eyes5", name: "ستاره‌ای", thumbnail: "/assets/avatar/eyes/eyes5_thumb.svg", svg: "<path d='M35,40 L37,35 L35,30 L39,33 L43,30 L41,35 L45,40 L39,38 L35,42 L37,37 Z' fill='#FF0'/><path d='M65,40 L67,35 L65,30 L69,33 L73,30 L71,35 L75,40 L69,38 L65,42 L67,37 Z' fill='#FF0'/>", premium: true, xpRequired: 2000 },
    ],
  },
  {
    id: "eyebrows",
    name: "ابرو",
    icon: <span className="text-xl">〰️</span>,
    items: [
      { id: "eyebrow1", name: "ساده", thumbnail: "/assets/avatar/eyebrows/eyebrow1_thumb.svg", svg: "<path d='M25,30 L40,25' stroke='#000' stroke-width='2'/><path d='M60,25 L75,30' stroke='#000' stroke-width='2'/>" },
      { id: "eyebrow2", name: "منحنی", thumbnail: "/assets/avatar/eyebrows/eyebrow2_thumb.svg", svg: "<path d='M25,30 Q35,25 40,30' stroke='#000' stroke-width='2'/><path d='M60,30 Q65,25 75,30' stroke='#000' stroke-width='2'/>" },
      { id: "eyebrow3", name: "زاویه‌دار", thumbnail: "/assets/avatar/eyebrows/eyebrow3_thumb.svg", svg: "<path d='M25,30 L35,25 L40,30' stroke='#000' stroke-width='2'/><path d='M60,30 L65,25 L75,30' stroke='#000' stroke-width='2'/>" },
      { id: "eyebrow4", name: "پرپشت", thumbnail: "/assets/avatar/eyebrows/eyebrow4_thumb.svg", svg: "<path d='M25,30 L40,25' stroke='#000' stroke-width='3'/><path d='M60,25 L75,30' stroke='#000' stroke-width='3'/>" },
    ],
  },
  {
    id: "nose",
    name: "بینی",
    icon: <span className="text-xl">👃</span>,
    items: [
      { id: "nose1", name: "کوچک", thumbnail: "/assets/avatar/nose/nose1_thumb.svg", svg: "<path d='M50,50 Q53,55 50,60' stroke='#000' fill='none'/>" },
      { id: "nose2", name: "متوسط", thumbnail: "/assets/avatar/nose/nose2_thumb.svg", svg: "<path d='M50,45 Q55,55 50,60' stroke='#000' fill='none'/>" },
      { id: "nose3", name: "بزرگ", thumbnail: "/assets/avatar/nose/nose3_thumb.svg", svg: "<path d='M45,40 Q55,60 50,65' stroke='#000' fill='none'/>" },
    ],
  },
  {
    id: "mouth",
    name: "دهان",
    icon: <span className="text-xl">👄</span>,
    items: [
      { id: "mouth1", name: "لبخند", thumbnail: "/assets/avatar/mouth/mouth1_thumb.svg", svg: "<path d='M35,65 Q50,75 65,65' stroke='#FF6B6B' stroke-width='2' fill='none'/>" },
      { id: "mouth2", name: "خنده", thumbnail: "/assets/avatar/mouth/mouth2_thumb.svg", svg: "<path d='M35,65 Q50,80 65,65' stroke='#FF6B6B' stroke-width='2' fill='#FFCCCC'/>" },
      { id: "mouth3", name: "خط ساده", thumbnail: "/assets/avatar/mouth/mouth3_thumb.svg", svg: "<path d='M35,65 L65,65' stroke='#FF6B6B' stroke-width='2'/>" },
      { id: "mouth4", name: "تعجب", thumbnail: "/assets/avatar/mouth/mouth4_thumb.svg", svg: "<circle cx='50' cy='65' r='5' fill='#FF6B6B'/>" },
      { id: "mouth5", name: "لبخند دندان‌نما", thumbnail: "/assets/avatar/mouth/mouth5_thumb.svg", svg: "<path d='M35,65 Q50,80 65,65' stroke='#FF6B6B' stroke-width='2' fill='#FFCCCC'/><path d='M40,65 L40,72 M45,66 L45,74 M50,67 L50,75 M55,66 L55,74 M60,65 L60,72' stroke='#FFF' stroke-width='2'/>", premium: true, xpRequired: 1500 },
    ],
  },
  {
    id: "hair",
    name: "مو",
    icon: <span className="text-xl">💇</span>,
    items: [
      { id: "hair1", name: "کوتاه", thumbnail: "/assets/avatar/hair/hair1_thumb.svg", svg: "<path d='M25,30 C15,10 85,10 75,30' fill='#000'/>" },
      { id: "hair2", name: "متوسط", thumbnail: "/assets/avatar/hair/hair2_thumb.svg", svg: "<path d='M15,60 C5,10 95,10 85,60' fill='#000'/>" },
      { id: "hair3", name: "بلند", thumbnail: "/assets/avatar/hair/hair3_thumb.svg", svg: "<path d='M15,90 C5,10 95,10 85,90' fill='#000'/>" },
      { id: "hair4", name: "فر", thumbnail: "/assets/avatar/hair/hair4_thumb.svg", svg: "<path d='M15,65 C0,50 10,10 50,15 C90,10 100,50 85,65' fill='#000'/><path d='M20,40 C18,35 22,30 25,35 M30,30 C28,25 32,20 35,25 M45,25 C43,20 47,15 50,20 M55,25 C53,20 57,15 60,20 M65,30 C63,25 67,20 70,25 M75,40 C73,35 77,30 80,35' stroke='#555' stroke-width='2' fill='none'/>" },
      { id: "hair5", name: "موهاک", thumbnail: "/assets/avatar/hair/hair5_thumb.svg", svg: "<path d='M45,5 L55,5 L55,30 L45,30 Z' fill='#000'/>" },
      { id: "hair6", name: "آراسته", thumbnail: "/assets/avatar/hair/hair6_thumb.svg", svg: "<path d='M25,40 C15,25 20,10 50,10 C80,10 85,25 75,40' fill='#000'/><path d='M50,10 L50,20 M40,11 L45,18 M60,11 L55,18' stroke='#444' stroke-width='1' fill='none'/>", premium: true, xpRequired: 1200 },
      { id: "hair7", name: "بلند فانتزی", thumbnail: "/assets/avatar/hair/hair7_thumb.svg", svg: "<path d='M10,90 C0,50 5,10 50,5 C95,10 100,50 90,90' fill='#000'/><path d='M20,30 L10,20 M15,45 L5,40 M15,60 L5,65 M85,30 L95,20 M85,45 L95,40 M85,60 L95,65' stroke='#444' stroke-width='2' fill='none'/>", premium: true, xpRequired: 2500 },
    ],
  },
  {
    id: "accessories",
    name: "لوازم جانبی",
    icon: <span className="text-xl">🕶️</span>,
    items: [
      { id: "acc1", name: "عینک", thumbnail: "/assets/avatar/accessories/acc1_thumb.svg", svg: "<rect x='30' y='40' width='15' height='5' rx='2' fill='#333'/><rect x='55' y='40' width='15' height='5' rx='2' fill='#333'/><path d='M45,42.5 L55,42.5' stroke='#333' stroke-width='1'/>" },
      { id: "acc2", name: "عینک آفتابی", thumbnail: "/assets/avatar/accessories/acc2_thumb.svg", svg: "<rect x='30' y='40' width='15' height='8' rx='2' fill='#333'/><rect x='55' y='40' width='15' height='8' rx='2' fill='#333'/><path d='M45,42.5 L55,42.5' stroke='#333' stroke-width='1'/>" },
      { id: "acc3", name: "گوشواره", thumbnail: "/assets/avatar/accessories/acc3_thumb.svg", svg: "<circle cx='25' cy='55' r='3' fill='gold'/><circle cx='75' cy='55' r='3' fill='gold'/>" },
      { id: "acc4", name: "کلاه", thumbnail: "/assets/avatar/accessories/acc4_thumb.svg", svg: "<path d='M25,30 C25,15 75,15 75,30' fill='none' stroke='#333' stroke-width='2'/><ellipse cx='50' cy='15' rx='20' ry='5' fill='#333'/>" },
      { id: "acc5", name: "تاج", thumbnail: "/assets/avatar/accessories/acc5_thumb.svg", svg: "<path d='M30,25 L40,15 L50,25 L60,15 L70,25' fill='none' stroke='gold' stroke-width='2'/><circle cx='40' cy='15' r='2' fill='red'/><circle cx='50' cy='25' r='2' fill='blue'/><circle cx='60' cy='15' r='2' fill='green'/>", premium: true, xpRequired: 3000 },
      { id: "acc6", name: "هدفون", thumbnail: "/assets/avatar/accessories/acc6_thumb.svg", svg: "<path d='M25,40 C25,20 75,20 75,40' fill='none' stroke='#333' stroke-width='2'/><rect x='20' y='40' width='5' height='15' rx='2' fill='#333'/><rect x='75' y='40' width='5' height='15' rx='2' fill='#333'/>", premium: true, xpRequired: 1800 },
    ],
  },
  {
    id: "facial_hair",
    name: "موی صورت",
    icon: <span className="text-xl">🧔</span>,
    items: [
      { id: "fhair1", name: "ریش کوتاه", thumbnail: "/assets/avatar/facial_hair/fhair1_thumb.svg", svg: "<path d='M40,70 C45,75 55,75 60,70' fill='#000'/>" },
      { id: "fhair2", name: "ریش بلند", thumbnail: "/assets/avatar/facial_hair/fhair2_thumb.svg", svg: "<path d='M35,70 C45,85 55,85 65,70' fill='#000'/>" },
      { id: "fhair3", name: "سبیل", thumbnail: "/assets/avatar/facial_hair/fhair3_thumb.svg", svg: "<path d='M40,65 C45,70 55,70 60,65' fill='#000'/>" },
      { id: "fhair4", name: "ته‌ریش", thumbnail: "/assets/avatar/facial_hair/fhair4_thumb.svg", svg: "<path d='M40,65 Q50,75 60,65 L60,75 Q50,85 40,75 Z' fill='#000' opacity='0.3'/>" },
      { id: "fhair5", name: "ریش فانتزی", thumbnail: "/assets/avatar/facial_hair/fhair5_thumb.svg", svg: "<path d='M40,65 Q50,80 60,65 L65,85 Q50,95 35,85 Z' fill='#000'/><path d='M45,75 L42,80 M50,80 L47,85 M55,75 L58,80' stroke='#444' stroke-width='1'/>", premium: true, xpRequired: 2000 },
    ],
  },
  {
    id: "clothing",
    name: "لباس",
    icon: <span className="text-xl">👔</span>,
    items: [
      { id: "cloth1", name: "تی‌شرت", thumbnail: "/assets/avatar/clothing/cloth1_thumb.svg", svg: "<path d='M25,90 L35,100 L65,100 L75,90 L75,140 L25,140 Z' fill='#3498db'/>" },
      { id: "cloth2", name: "پیراهن", thumbnail: "/assets/avatar/clothing/cloth2_thumb.svg", svg: "<path d='M25,90 L35,100 L65,100 L75,90 L75,140 L25,140 Z' fill='#2ecc71'/><path d='M50,100 L50,120' stroke='white' stroke-width='2'/>" },
      { id: "cloth3", name: "کت", thumbnail: "/assets/avatar/clothing/cloth3_thumb.svg", svg: "<path d='M25,90 L35,100 L45,95 L50,100 L55,95 L65,100 L75,90 L75,140 L25,140 Z' fill='#34495e'/><path d='M45,95 L45,140 M55,95 L55,140' stroke='#2c3e50' stroke-width='2'/>" },
      { id: "cloth4", name: "هودی", thumbnail: "/assets/avatar/clothing/cloth4_thumb.svg", svg: "<path d='M20,90 L35,100 L65,100 L80,90 L75,140 L25,140 Z' fill='#9b59b6'/><path d='M35,90 C35,80 65,80 65,90' fill='#8e44ad' stroke='none'/>" },
      { id: "cloth5", name: "کت و شلوار", thumbnail: "/assets/avatar/clothing/cloth5_thumb.svg", svg: "<path d='M25,90 L35,100 L45,95 L50,100 L55,95 L65,100 L75,90 L75,140 L25,140 Z' fill='#2c3e50'/><path d='M45,95 L45,140 M55,95 L55,140' stroke='#34495e' stroke-width='2'/><rect x='45' y='105' width='10' height='5' fill='white'/><circle cx='50' cy='120' r='2' fill='gold'/>", premium: true, xpRequired: 1500 },
      { id: "cloth6", name: "لباس رسمی", thumbnail: "/assets/avatar/clothing/cloth6_thumb.svg", svg: "<path d='M25,90 L35,100 L65,100 L75,90 L75,140 L25,140 Z' fill='#e74c3c'/><path d='M40,100 L40,115 L50,120 L60,115 L60,100' fill='white'/><circle cx='50' cy='110' r='3' fill='gold'/>", premium: true, xpRequired: 2500 },
    ],
  },
  {
    id: "background",
    name: "پس‌زمینه",
    icon: <span className="text-xl">🖼️</span>,
    items: [
      { id: "bg1", name: "آبی ساده", thumbnail: "/assets/avatar/background/bg1_thumb.svg", svg: "<rect x='0' y='0' width='100%' height='100%' fill='#3498db'/>" },
      { id: "bg2", name: "گرادیان گرم", thumbnail: "/assets/avatar/background/bg2_thumb.svg", svg: "<linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:#e74c3c'/><stop offset='100%' style='stop-color:#f39c12'/></linearGradient><rect x='0' y='0' width='100%' height='100%' fill='url(#grad1)'/>" },
      { id: "bg3", name: "گرادیان سرد", thumbnail: "/assets/avatar/background/bg3_thumb.svg", svg: "<linearGradient id='grad2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:#3498db'/><stop offset='100%' style='stop-color:#2ecc71'/></linearGradient><rect x='0' y='0' width='100%' height='100%' fill='url(#grad2)'/>" },
      { id: "bg4", name: "پترن ساده", thumbnail: "/assets/avatar/background/bg4_thumb.svg", svg: "<pattern id='pattern1' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'><circle cx='10' cy='10' r='2' fill='#3498db'/></pattern><rect x='0' y='0' width='100%' height='100%' fill='#ecf0f1'/><rect x='0' y='0' width='100%' height='100%' fill='url(#pattern1)'/>" },
      { id: "bg5", name: "پترن هندسی", thumbnail: "/assets/avatar/background/bg5_thumb.svg", svg: "<pattern id='pattern2' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'><rect x='0' y='0' width='10' height='10' fill='#3498db'/><rect x='10' y='10' width='10' height='10' fill='#3498db'/></pattern><rect x='0' y='0' width='100%' height='100%' fill='#ecf0f1'/><rect x='0' y='0' width='100%' height='100%' fill='url(#pattern2)'/>" },
      { id: "bg6", name: "گرادیان فانتزی", thumbnail: "/assets/avatar/background/bg6_thumb.svg", svg: "<linearGradient id='grad3' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:#9b59b6'/><stop offset='50%' style='stop-color:#3498db'/><stop offset='100%' style='stop-color:#2ecc71'/></linearGradient><rect x='0' y='0' width='100%' height='100%' fill='url(#grad3)'/>", premium: true, xpRequired: 2000 },
      { id: "bg7", name: "نئون", thumbnail: "/assets/avatar/background/bg7_thumb.svg", svg: "<linearGradient id='grad4' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:#8E2DE2'/><stop offset='100%' style='stop-color:#4A00E0'/></linearGradient><rect x='0' y='0' width='100%' height='100%' fill='url(#grad4)'/><filter id='glow'><feGaussianBlur stdDeviation='4' result='blur'/><feComposite in='SourceGraphic' in2='blur' operator='arithmetic' k1='0' k2='1' k3='1' k4='0'/></filter><circle cx='30' cy='30' r='5' fill='#FB3DFF' filter='url(#glow)'/><circle cx='70' cy='70' r='8' fill='#32F9EE' filter='url(#glow)'/>", premium: true, xpRequired: 3000 },
    ],
  },
];

// مدل داده برای انتخاب‌های فعلی کاربر
interface AvatarSelections {
  [key: string]: {
    selectedItemId: string | null;
    color?: string;
    scale?: number;
    position?: { x: number; y: number };
  };
}

// جزئیات کاربر برای نمایش در صفحه
interface UserDetails {
  name: string;
  xp: number;
  level: number;
  credits: number;
  availableItems: string[]; // آیدی آیتم‌های در دسترس
  premium: boolean;
}

// کامپوننت اصلی سفارشی‌سازی آواتار
const AvatarCustomizer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(avatarCategories[0]);
  const [selections, setSelections] = useState<AvatarSelections>({
    face: { selectedItemId: "face1", color: "#FFDBAC" },
    eyes: { selectedItemId: "eyes1" },
    eyebrows: { selectedItemId: "eyebrow1" },
    nose: { selectedItemId: "nose1" },
    mouth: { selectedItemId: "mouth1" },
    hair: { selectedItemId: "hair1", color: "#090806" },
    accessories: { selectedItemId: null },
    facial_hair: { selectedItemId: null, color: "#090806" },
    clothing: { selectedItemId: "cloth1" },
    background: { selectedItemId: "bg1" },
  });
  const [selectedColor, setSelectedColor] = useState("#FFDBAC");
  const [colorTarget, setColorTarget] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [svgData, setSvgData] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [showRandomizer, setShowRandomizer] = useState(false);
  const [animateAvatar, setAnimateAvatar] = useState(false);
  const [showSavedAvatars, setShowSavedAvatars] = useState(false);
  const [savedAvatars, setSavedAvatars] = useState<{id: string, name: string, svg: string, createdAt: string}[]>([
    {id: "1", name: "آواتار کاری", svg: "", createdAt: "2023-11-10T14:30:00"},
    {id: "2", name: "آواتار تفریحی", svg: "", createdAt: "2023-12-05T10:15:00"},
  ]);
  const [achievementUnlocked, setAchievementUnlocked] = useState<string | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [customColorMode, setCustomColorMode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<"svg" | "png">("svg");
  const [currentXpEarned, setCurrentXpEarned] = useState(0);
  const [customColorPalette, setCustomColorPalette] = useState<string[]>(["#FFDBAC", "#F1C27D", "#E0AC69", "#C68642", "#8D5524"]);
  const [showQuestSystem, setShowQuestSystem] = useState(false);
  const { toast } = useToast();
  
  // سیستم کوئست‌ها - بخش جدید
  const [quests, setQuests] = useState([
    { id: 'q1', title: 'آواتار خلاق', description: 'یک آواتار با ترکیبات خلاقانه بسازید', reward: 200, completed: false, requirements: { selections: 10 } },
    { id: 'q2', title: 'طراح رنگ', description: '5 رنگ سفارشی در آواتار خود استفاده کنید', reward: 150, completed: false, requirements: { colors: 5 } },
    { id: 'q3', title: 'کلکسیونر نخبه', description: 'تمام آیتم‌های ویژه را باز کنید', reward: 500, completed: false, requirements: { premiumItems: 5 } },
    { id: 'q4', title: 'ذخیره‌ساز حرفه‌ای', description: '3 آواتار مختلف ذخیره کنید', reward: 250, completed: false, requirements: { savedAvatars: 3 } },
    { id: 'q5', title: 'شخصی‌ساز ماهر', description: 'از تمام امکانات ویرایش استفاده کنید', reward: 300, completed: false, requirements: { editFeatures: 8 } },
  ]);
  
  // آمار استفاده از ویژگی‌های آواتار - برای گیمیفیکیشن
  const [usageStats, setUsageStats] = useState({
    itemsChanged: 0,
    colorsChanged: 0,
    avatarsSaved: 0,
    featuresUsed: new Set<string>(),
    premiumItemsUnlocked: 0,
    timeSpent: 0,
    dailyStreak: 1,
    lastUsed: new Date().toISOString(),
  });
  
  // داده‌های دمو برای کاربر
  const userDetails: UserDetails = {
    name: "کاربر پرانا",
    xp: 2500,
    level: 5,
    credits: 1200,
    availableItems: ["face1", "face2", "face3", "eyes1", "eyes2", "eyes3", "eyebrow1", "eyebrow2", "nose1", "nose2", "mouth1", "mouth2", "mouth3", "hair1", "hair2", "cloth1", "cloth2", "bg1", "bg2"],
    premium: false,
  };

  // محاسبه لول بر اساس XP
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 500) + 1;
  };
  
  // محاسبه پیشرفت به لول بعدی
  const calculateProgress = (xp: number) => {
    const currentLevel = calculateLevel(xp);
    const currentLevelMinXP = (currentLevel - 1) * 500;
    const nextLevelMinXP = currentLevel * 500;
    return ((xp - currentLevelMinXP) / (nextLevelMinXP - currentLevelMinXP)) * 100;
  };

  // بررسی اینکه آیا آیتم قابل دسترسی است
  const isItemAvailable = (item: AvatarItem) => {
    if (!item.premium && !item.xpRequired) return true;
    if (item.xpRequired && userDetails.xp >= item.xpRequired) return true;
    if (item.premium && userDetails.premium) return true;
    return userDetails.availableItems.includes(item.id);
  };

  // انتخاب یک آیتم
  const selectItem = (categoryId: string, itemId: string | null) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        selectedItemId: itemId,
      },
    }));
  };

  // تغییر رنگ یک بخش
  const changeColor = (categoryId: string, color: string) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        color,
      },
    }));
    setSelectedColor(color);
  };

  // ایجاد SVG بر اساس انتخاب‌های کاربر
  const generateAvatarSvg = () => {
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">`;
    
    // اضافه کردن پس‌زمینه
    const bgItem = selections.background.selectedItemId
      ? avatarCategories.find(cat => cat.id === "background")?.items.find(item => item.id === selections.background.selectedItemId)
      : null;
    if (bgItem) {
      svgContent += bgItem.svg;
    }

    // اضافه کردن صورت با رنگ انتخابی
    const faceItem = selections.face.selectedItemId
      ? avatarCategories.find(cat => cat.id === "face")?.items.find(item => item.id === selections.face.selectedItemId)
      : null;
    if (faceItem) {
      // جایگزینی رنگ با رنگ انتخابی کاربر
      const faceColor = selections.face.color || "#FFDBAC";
      let faceSvg = faceItem.svg.replace(/fill=['"]#FFC0CB['"]/, `fill="${faceColor}"`);
      svgContent += faceSvg;
    }

    // اضافه کردن بقیه اجزا
    Object.entries(selections).forEach(([categoryId, selection]) => {
      if (categoryId !== "face" && categoryId !== "background" && selection.selectedItemId) {
        const category = avatarCategories.find(cat => cat.id === categoryId);
        const item = category?.items.find(i => i.id === selection.selectedItemId);
        
        if (item) {
          let itemSvg = item.svg;
          
          // اعمال رنگ برای اجزایی که قابلیت تغییر رنگ دارند
          if (selection.color && (categoryId === "hair" || categoryId === "facial_hair")) {
            itemSvg = itemSvg.replace(/fill=['"]#000['"]/, `fill="${selection.color}"`);
          }
          
          svgContent += itemSvg;
        }
      }
    });
    
    svgContent += `</svg>`;
    return svgContent;
  };

  // به‌روزرسانی SVG هنگام تغییر انتخاب‌ها
  useEffect(() => {
    const newSvgData = generateAvatarSvg();
    setSvgData(newSvgData);
  }, [selections]);

  // تغییر رنگ پوست
  const handleSkinColorChange = (color: string) => {
    changeColor("face", color);
  };

  // تغییر رنگ مو
  const handleHairColorChange = (color: string) => {
    changeColor(colorTarget || "hair", color);
  };

  // خرید آیتم با کردیت
  const purchaseItem = (itemId: string, price: number) => {
    if (userDetails.credits >= price) {
      // در یک برنامه واقعی، این جا باید API call شود
      toast({
        title: "خرید موفق",
        description: `آیتم جدید به کالکشن شما اضافه شد`,
        variant: "default",
      });
      // اضافه کردن به آیتم‌های در دسترس
      userDetails.availableItems.push(itemId);
      // کم کردن از اعتبار
      userDetails.credits -= price;
    } else {
      toast({
        title: "خطا در خرید",
        description: "اعتبار کافی ندارید",
        variant: "destructive",
      });
    }
  };

  // نمایش دکمه‌های رنگ
  const renderColorButtons = (colors: string[], currentColor: string, onChange: (color: string) => void) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-full border-2 transition-all ${
              currentColor === color ? "border-tiffany scale-110" : "border-white/20"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
    );
  };

  // برگشت به حالت پیش‌فرض
  const resetAvatar = () => {
    setSelections({
      face: { selectedItemId: "face1", color: "#FFDBAC" },
      eyes: { selectedItemId: "eyes1" },
      eyebrows: { selectedItemId: "eyebrow1" },
      nose: { selectedItemId: "nose1" },
      mouth: { selectedItemId: "mouth1" },
      hair: { selectedItemId: "hair1", color: "#090806" },
      accessories: { selectedItemId: null },
      facial_hair: { selectedItemId: null, color: "#090806" },
      clothing: { selectedItemId: "cloth1" },
      background: { selectedItemId: "bg1" },
    });
    setScale(1);
    setRotation(0);
    toast({
      title: "بازنشانی",
      description: "آواتار به حالت پیش‌فرض برگشت",
    });
  };

  // ذخیره‌سازی آواتار
  const saveAvatar = () => {
    // در حالت واقعی، اینجا با API برای ذخیره‌سازی SVG ارتباط برقرار می‌شود
    toast({
      title: "ذخیره‌سازی موفق",
      description: "آواتار شما با موفقیت ذخیره شد",
      variant: "default",
    });
  };

  // دانلود SVG
  const downloadAvatarSvg = () => {
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-avatar.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // بررسی وضعیت کوئست‌ها و به‌روزرسانی آنها
  const checkQuestProgress = () => {
    const updatedQuests = [...quests];
    
    // بررسی کوئست آواتار خلاق
    if (!updatedQuests[0].completed && usageStats.itemsChanged >= 10) {
      updatedQuests[0].completed = true;
      showQuestCompletionReward('آواتار خلاق', 200);
    }
    
    // بررسی کوئست طراح رنگ
    if (!updatedQuests[1].completed && usageStats.colorsChanged >= 5) {
      updatedQuests[1].completed = true;
      showQuestCompletionReward('طراح رنگ', 150);
    }
    
    // بررسی کوئست کلکسیونر نخبه
    if (!updatedQuests[2].completed && usageStats.premiumItemsUnlocked >= 5) {
      updatedQuests[2].completed = true;
      showQuestCompletionReward('کلکسیونر نخبه', 500);
    }
    
    // بررسی کوئست ذخیره‌ساز حرفه‌ای
    if (!updatedQuests[3].completed && usageStats.avatarsSaved >= 3) {
      updatedQuests[3].completed = true;
      showQuestCompletionReward('ذخیره‌ساز حرفه‌ای', 250);
    }
    
    // بررسی کوئست شخصی‌ساز ماهر
    if (!updatedQuests[4].completed && usageStats.featuresUsed.size >= 8) {
      updatedQuests[4].completed = true;
      showQuestCompletionReward('شخصی‌ساز ماهر', 300);
    }
    
    setQuests(updatedQuests);
  };
  
  // نمایش پیام پاداش کوئست
  const showQuestCompletionReward = (questTitle: string, reward: number) => {
    toast({
      title: `کوئست ${questTitle} تکمیل شد!`,
      description: `شما ${reward} کردیت و ${reward} XP دریافت کردید.`,
      variant: "default",
    });
    
    setAchievementUnlocked(questTitle);
    
    // افزایش XP و کردیت کاربر
    userDetails.xp += reward;
    userDetails.credits += reward;
    
    // تایمر برای حذف پیام دستاورد بعد از چند ثانیه
    setTimeout(() => {
      setAchievementUnlocked(null);
    }, 3000);
  };
  
  // رندوم‌سازی آواتار
  const randomizeAvatar = () => {
    // استفاده از ویژگی رندوم‌سازی
    usageStats.featuresUsed.add('randomize');
    
    // انتخاب تصادفی برای هر بخش
    const newSelections = { ...selections };
    
    avatarCategories.forEach(category => {
      if (category.items.length > 0) {
        // انتخاب تصادفی یک آیتم از هر دسته
        const availableItems = category.items.filter(item => isItemAvailable(item));
        if (availableItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableItems.length);
          const randomItem = availableItems[randomIndex];
          
          // اگر دسته صورت یا مو باشد، رنگ نیز تصادفی انتخاب شود
          if (category.id === 'face') {
            const randomSkinColorIndex = Math.floor(Math.random() * skinColors.length);
            newSelections[category.id] = {
              selectedItemId: randomItem.id,
              color: skinColors[randomSkinColorIndex]
            };
          } else if (category.id === 'hair' || category.id === 'facial_hair') {
            const randomHairColorIndex = Math.floor(Math.random() * hairColors.length);
            newSelections[category.id] = {
              selectedItemId: randomItem.id,
              color: hairColors[randomHairColorIndex]
            };
          } else {
            newSelections[category.id] = {
              ...newSelections[category.id],
              selectedItemId: randomItem.id
            };
          }
        }
      }
    });
    
    setSelections(newSelections);
    
    // افزایش آمار استفاده از ویژگی‌ها
    setUsageStats(prev => ({
      ...prev,
      featuresUsed: prev.featuresUsed.add('randomize'),
      itemsChanged: prev.itemsChanged + 5 // افزایش تعداد آیتم‌های تغییر داده شده
    }));
    
    // به‌روزرسانی کوئست‌ها
    checkQuestProgress();
    
    // نمایش پیام موفقیت
    toast({
      title: "آواتار تصادفی",
      description: "یک آواتار تصادفی برای شما ساخته شد!",
      variant: "default",
    });
    
    // پاداش XP برای استفاده از ویژگی رندوم‌سازی
    addXp(50);
  };
  
  // افزودن XP به کاربر با انیمیشن
  const addXp = (amount: number) => {
    setCurrentXpEarned(amount);
    
    // تایمر برای حذف نمایش XP بعد از چند ثانیه
    setTimeout(() => {
      setCurrentXpEarned(0);
    }, 2000);
    
    // افزودن XP به کاربر
    userDetails.xp += amount;
  };
  
  // ذخیره آواتار پیشرفته
  const saveAvatarAdvanced = () => {
    const name = `آواتار ${savedAvatars.length + 1}`;
    const newAvatar = {
      id: Date.now().toString(),
      name,
      svg: svgData,
      createdAt: new Date().toISOString()
    };
    
    setSavedAvatars([...savedAvatars, newAvatar]);
    
    // افزایش آمار آواتارهای ذخیره شده
    setUsageStats(prev => ({
      ...prev,
      avatarsSaved: prev.avatarsSaved + 1,
      featuresUsed: prev.featuresUsed.add('save')
    }));
    
    // بررسی کوئست‌ها
    checkQuestProgress();
    
    // نمایش پیام موفقیت
    toast({
      title: "ذخیره‌سازی موفق",
      description: `آواتار "${name}" با موفقیت ذخیره شد`,
      variant: "default",
    });
    
    // پاداش XP برای ذخیره آواتار
    addXp(25);
  };
  
  // تغییر حالت آواتار (انیمیشن)
  const toggleAvatarAnimation = () => {
    // استفاده از ویژگی انیمیشن
    setUsageStats(prev => ({
      ...prev, 
      featuresUsed: prev.featuresUsed.add('animate')
    }));
    
    setAnimateAvatar(!animateAvatar);
    
    // بررسی کوئست‌ها
    checkQuestProgress();
    
    // پاداش XP برای استفاده از قابلیت انیمیشن
    if (!usageStats.featuresUsed.has('animate')) {
      addXp(15);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* نمایش دستاورد باز شده */}
      {achievementUnlocked && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-4 rounded-xl shadow-xl animate-bounce flex items-center gap-3">
          <Sparkles className="h-6 w-6" />
          <div>
            <div className="font-bold">دستاورد جدید!</div>
            <div>{achievementUnlocked}</div>
          </div>
        </div>
      )}
      
      {/* نمایش XP دریافتی */}
      {currentXpEarned > 0 && (
        <div className="fixed top-20 right-10 transform z-50 bg-tiffany text-white px-4 py-2 rounded-full shadow-xl animate-float-up">
          <div className="font-bold flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            +{currentXpEarned} XP
          </div>
        </div>
      )}
      
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* پنل سمت راست - پیش‌نمایش آواتار */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <div className="sticky top-20">
              <Card className="relative shadow-lg border-slate-200 dark:border-slate-800 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-900/95">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-tiffany to-blue-500">آواتار شما</span>
                      <Badge variant="outline" className="mr-2 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 text-xs">جدید</Badge>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={resetAvatar}
                            >
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>بازنشانی آواتار</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={randomizeAvatar}
                            >
                              <Sparkles className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>آواتار تصادفی</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 rounded-full"
                              onClick={() => setPreviewMode(!previewMode)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>پیش‌نمایش</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <CardDescription>
                    شخصیت خود را با انتخاب ویژگی‌های دلخواه بسازید و جوایز را دریافت کنید
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  <div
                    className={`relative transition-all duration-300 ${
                      previewMode
                        ? "w-64 h-64 rounded-full overflow-hidden"
                        : "w-96 h-96 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg"
                    } ${animateAvatar ? 'animate-subtle-bounce' : ''}`}
                    style={{
                      transform: `scale(${scale}) rotate(${rotation}deg)`,
                      boxShadow: animateAvatar ? '0 0 15px rgba(0, 150, 150, 0.5)' : 'none'
                    }}
                  >
                    <div
                      className={`w-full h-full ${animateAvatar ? 'animate-pulse-subtle' : ''}`}
                      dangerouslySetInnerHTML={{ __html: svgData }}
                    />
                    
                    {/* افکت‌های ویژه روی آواتار */}
                    {animateAvatar && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-500 rounded-full animate-ping-slow opacity-75"></div>
                        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping-slow opacity-75" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-tiffany rounded-full animate-ping-slow opacity-75" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-purple-500 rounded-full animate-ping-slow opacity-75" style={{ animationDelay: '1.5s' }}></div>
                      </div>
                    )}
                  </div>
                  
                  {!previewMode && (
                    <div className="w-full mt-4 space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>اندازه</span>
                          <span>{Math.round(scale * 100)}%</span>
                        </div>
                        <Slider
                          value={[scale * 100]}
                          min={50}
                          max={150}
                          step={1}
                          onValueChange={(value) => setScale(value[0] / 100)}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                          <span>چرخش</span>
                          <span>{rotation}°</span>
                        </div>
                        <Slider
                          value={[rotation]}
                          min={-180}
                          max={180}
                          step={1}
                          onValueChange={(value) => setRotation(value[0])}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button 
                    variant="outline"
                    onClick={downloadAvatarSvg}
                    className="rounded-full"
                  >
                    <Download className="h-4 w-4 ml-2" />
                    دانلود
                  </Button>
                  <Button 
                    onClick={saveAvatar}
                    className="rounded-full"
                  >
                    <Save className="h-4 w-4 ml-2" />
                    ذخیره
                  </Button>
                </CardFooter>
                
                {previewMode && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg">{userDetails.name}</h3>
                    <div className="flex items-center text-white/80 text-sm">
                      <span>لول {userDetails.level}</span>
                      <div className="h-1 bg-white/30 rounded-full w-20 mx-2">
                        <div
                          className="h-1 bg-tiffany rounded-full"
                          style={{ width: `${calculateProgress(userDetails.xp)}%` }}
                        />
                      </div>
                      <span>{userDetails.xp} XP</span>
                    </div>
                    <Button className="mt-2" variant="default" onClick={() => setPreviewMode(false)}>
                      بازگشت به حالت ویرایش
                    </Button>
                  </div>
                )}
              </Card>
              
              {/* پیشرفت کاربر و کردیت‌ها */}
              <Card className="mt-4 border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      <Award className="mr-2 h-5 w-5 text-amber-500" />
                      پیشرفت شما
                    </CardTitle>
                    <Badge variant="secondary" className="rounded-full">
                      لول {userDetails.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>XP: {userDetails.xp} / {userDetails.level * 500}</span>
                    <span>{Math.round(calculateProgress(userDetails.xp))}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-tiffany to-blue-500 rounded-full"
                      style={{ width: `${calculateProgress(userDetails.xp)}%` }}
                    />
                  </div>
                </CardContent>
                <div className="px-6 pb-4 flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => setShowShop(true)}
                  >
                    <ShoppingBag className="h-4 w-4 ml-2" />
                    فروشگاه آیتم‌ها
                  </Button>
                  
                  <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full">
                    <Sparkles className="h-4 w-4" />
                    <span className="font-semibold">{userDetails.credits}</span>
                    <span className="text-xs">کردیت</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* پنل سمت چپ - سفارشی‌سازی */}
          <div className="w-full lg:w-7/12">
            <Card className="mb-6 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-xl">سفارشی‌سازی آواتار</CardTitle>
                <CardDescription>
                  از قسمت‌های مختلف برای سفارشی‌سازی شخصیت خود استفاده کنید
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={avatarCategories[0].id} className="w-full">
                  {/* تب‌های دسته‌بندی */}
                  <TabsList className="flex w-full h-auto flex-wrap mb-4 bg-transparent p-0 justify-start gap-2">
                    {avatarCategories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        onClick={() => setActiveCategory(category)}
                        className="rounded-full h-12 px-4 data-[state=active]:bg-tiffany/10 data-[state=active]:text-tiffany"
                      >
                        <div className="flex items-center gap-2">
                          {category.icon}
                          <span>{category.name}</span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {/* محتوای تب‌ها */}
                  {avatarCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">
                            انتخاب {category.name}
                          </h3>
                          {(category.id === "face" || category.id === "hair" || category.id === "facial_hair") && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full"
                              onClick={() => {
                                setColorTarget(category.id);
                                setShowColorPicker(true);
                              }}
                            >
                              <Palette className="h-4 w-4 ml-2" />
                              تغییر رنگ
                            </Button>
                          )}
                        </div>
                        
                        <ScrollArea className="h-96 rounded-md border border-slate-200 dark:border-slate-800 p-4">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {category.items.map((item) => {
                              const isSelected = selections[category.id]?.selectedItemId === item.id;
                              const isAvailable = isItemAvailable(item);
                              
                              return (
                                <div
                                  key={item.id}
                                  className={`relative overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                                    isSelected
                                      ? "border-tiffany ring-1 ring-tiffany ring-offset-2 dark:ring-offset-slate-900"
                                      : "border-slate-200 dark:border-slate-800 hover:border-tiffany/50"
                                  } ${!isAvailable ? "opacity-50" : ""}`}
                                  onClick={() => {
                                    if (isAvailable) {
                                      selectItem(category.id, item.id);
                                    } else {
                                      toast({
                                        title: "آیتم قفل شده",
                                        description: item.premium 
                                          ? "این آیتم مخصوص کاربران حرفه‌ای است" 
                                          : `برای باز کردن به ${item.xpRequired} XP نیاز دارید`,
                                        variant: "destructive",
                                      });
                                    }
                                  }}
                                >
                                  <div className="aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-2">
                                    <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: item.svg }} />
                                  </div>
                                  <div className="p-2 bg-white dark:bg-slate-900 flex items-center justify-between">
                                    <span className="text-sm">{item.name}</span>
                                    {!isAvailable && (
                                      <div className="flex items-center gap-1">
                                        {item.premium ? (
                                          <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-yellow-500">
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            ویژه
                                          </Badge>
                                        ) : (
                                          <Badge variant="outline" className="text-xs">
                                            {item.xpRequired} XP
                                          </Badge>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  
                                  {isSelected && (
                                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-tiffany text-white flex items-center justify-center">
                                      <Check className="h-4 w-4" />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                            
                            {/* آپشن برای حذف آیتم، اگر الزامی نیست */}
                            {(category.id === "accessories" || category.id === "facial_hair") && (
                              <div
                                className={`aspect-square rounded-xl border-2 transition-all cursor-pointer flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${
                                  selections[category.id]?.selectedItemId === null
                                    ? "border-tiffany ring-1 ring-tiffany ring-offset-2 dark:ring-offset-slate-900"
                                    : "border-slate-200 dark:border-slate-800 hover:border-tiffany/50"
                                }`}
                                onClick={() => selectItem(category.id, null)}
                              >
                                <div className="text-slate-400 dark:text-slate-600 flex flex-col items-center">
                                  <X className="h-8 w-8 mb-2" />
                                  <span>بدون {category.name}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                        
                        {/* رنگ‌ها برای پوست */}
                        {category.id === "face" && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">انتخاب رنگ پوست</h4>
                            {renderColorButtons(skinColors, selections.face.color || "#FFDBAC", handleSkinColorChange)}
                          </div>
                        )}
                        
                        {/* رنگ‌ها برای مو */}
                        {category.id === "hair" && selections.hair.selectedItemId && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">انتخاب رنگ مو</h4>
                            {renderColorButtons(hairColors, selections.hair.color || "#090806", (color) => changeColor("hair", color))}
                          </div>
                        )}
                        
                        {/* رنگ‌ها برای موی صورت */}
                        {category.id === "facial_hair" && selections.facial_hair.selectedItemId && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium mb-2">انتخاب رنگ موی صورت</h4>
                            {renderColorButtons(hairColors, selections.facial_hair.color || "#090806", (color) => changeColor("facial_hair", color))}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* مودال انتخاب رنگ */}
      {showColorPicker && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>انتخاب رنگ سفارشی</CardTitle>
              <CardDescription>
                رنگ دلخواه خود را برای {
                  colorTarget === "face" ? "پوست" : 
                  colorTarget === "hair" ? "مو" : 
                  "موی صورت"
                } انتخاب کنید
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>رنگ انتخابی:</span>
                  <div className="w-10 h-10 rounded-full border-2 border-slate-300" style={{ backgroundColor: selectedColor }} />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">رنگ‌های پیشنهادی</h4>
                  {colorTarget === "face" ? (
                    renderColorButtons(skinColors, selectedColor, setSelectedColor)
                  ) : (
                    renderColorButtons(hairColors, selectedColor, setSelectedColor)
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowColorPicker(false)}
              >
                لغو
              </Button>
              <Button 
                onClick={() => {
                  if (colorTarget) {
                    changeColor(colorTarget, selectedColor);
                  }
                  setShowColorPicker(false);
                }}
              >
                اعمال رنگ
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* سیستم کوئست */}
      {showQuestSystem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            <CardHeader className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-amber-500" />
                کوئست‌های آواتار
              </CardTitle>
              <CardDescription>
                کوئست‌ها را تکمیل کنید و XP و کردیت دریافت کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto p-6">
              <div className="space-y-6">
                {quests.map((quest) => (
                  <div 
                    key={quest.id} 
                    className={`border rounded-lg p-4 transition-all ${
                      quest.completed 
                        ? "bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-800" 
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg flex items-center">
                          {quest.title}
                          {quest.completed && (
                            <Check className="h-5 w-5 text-green-500 ml-2" />
                          )}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mt-1">{quest.description}</p>
                      </div>
                      <Badge variant={quest.completed ? "default" : "outline"} className={quest.completed ? "bg-green-500" : ""}>
                        {quest.reward} XP + {quest.reward} کردیت
                      </Badge>
                    </div>
                    
                    {!quest.completed && (
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                          <span>پیشرفت:</span>
                          <span>
                            {quest.id === 'q1' && `${Math.min(usageStats.itemsChanged, 10)} / 10`}
                            {quest.id === 'q2' && `${Math.min(usageStats.colorsChanged, 5)} / 5`}
                            {quest.id === 'q3' && `${Math.min(usageStats.premiumItemsUnlocked, 5)} / 5`}
                            {quest.id === 'q4' && `${Math.min(usageStats.avatarsSaved, 3)} / 3`}
                            {quest.id === 'q5' && `${Math.min(usageStats.featuresUsed.size, 8)} / 8`}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                            style={{ 
                              width: 
                                quest.id === 'q1' ? `${Math.min(usageStats.itemsChanged / 10 * 100, 100)}%` :
                                quest.id === 'q2' ? `${Math.min(usageStats.colorsChanged / 5 * 100, 100)}%` :
                                quest.id === 'q3' ? `${Math.min(usageStats.premiumItemsUnlocked / 5 * 100, 100)}%` :
                                quest.id === 'q4' ? `${Math.min(usageStats.avatarsSaved / 3 * 100, 100)}%` :
                                quest.id === 'q5' ? `${Math.min(usageStats.featuresUsed.size / 8 * 100, 100)}%` : '0%'
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  <Trophy className="h-4 w-4 ml-2 text-amber-500" />
                  <span>{quests.filter(q => q.completed).length} / {quests.length}</span>
                </Badge>
              </div>
              <Button 
                variant="default" 
                onClick={() => setShowQuestSystem(false)}
                className="rounded-full"
              >
                بستن
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* مودال آواتارهای ذخیره‌شده */}
      {showSavedAvatars && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Save className="mr-2 h-5 w-5" />
                آواتارهای ذخیره‌شده
              </CardTitle>
              <CardDescription>
                مجموعه آواتارهای ذخیره شده شما
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
              {savedAvatars.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Save className="h-16 w-16 text-slate-300 dark:text-slate-700 mb-4" />
                  <h3 className="text-lg font-bold text-slate-500 dark:text-slate-400">هنوز آواتاری ذخیره نکرده‌اید</h3>
                  <p className="text-slate-400 dark:text-slate-500 max-w-md mt-2">
                    آواتار خود را سفارشی کنید و با کلیک روی دکمه ذخیره آن را به کالکشن خود اضافه کنید
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedAvatars.map((avatar) => (
                    <div key={avatar.id} className="border rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                      <div className="aspect-square bg-white dark:bg-slate-900 flex items-center justify-center p-4">
                        <div dangerouslySetInnerHTML={{ __html: avatar.svg || svgData }} className="w-full h-full" />
                      </div>
                      <div className="p-3 flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{avatar.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {new Date(avatar.createdAt).toLocaleDateString('fa-IR')}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              // به‌روزرسانی آواتار فعلی با آواتار ذخیره شده
                              toast({
                                title: "آواتار بارگذاری شد",
                                description: `آواتار "${avatar.name}" بارگذاری شد`,
                              });
                            }}
                          >
                            بارگذاری
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20 w-10 p-0"
                            onClick={() => {
                              // حذف آواتار
                              setSavedAvatars(savedAvatars.filter(a => a.id !== avatar.id));
                              toast({
                                title: "آواتار حذف شد",
                                description: `آواتار "${avatar.name}" با موفقیت حذف شد`,
                              });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {savedAvatars.length} آواتار ذخیره شده
              </div>
              <Button 
                variant="default" 
                onClick={() => setShowSavedAvatars(false)}
                className="rounded-full"
              >
                بستن
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* مودال خروجی گرفتن */}
      {isExporting && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>خروجی گرفتن از آواتار</CardTitle>
              <CardDescription>
                فرمت و تنظیمات خروجی را انتخاب کنید
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">فرمت خروجی</h3>
                  <div className="flex gap-4">
                    <div 
                      className={`border rounded-lg p-3 flex-1 text-center cursor-pointer transition-all ${exportFormat === "svg" ? "border-tiffany bg-tiffany/5" : "hover:border-slate-300"}`}
                      onClick={() => setExportFormat("svg")}
                    >
                      <FileText className="h-8 w-8 mx-auto mb-1 text-slate-500" />
                      <div className="font-medium">SVG</div>
                      <div className="text-xs text-slate-500">قابل ویرایش</div>
                    </div>
                    <div 
                      className={`border rounded-lg p-3 flex-1 text-center cursor-pointer transition-all ${exportFormat === "png" ? "border-tiffany bg-tiffany/5" : "hover:border-slate-300"}`}
                      onClick={() => setExportFormat("png")}
                    >
                      <Image className="h-8 w-8 mx-auto mb-1 text-slate-500" />
                      <div className="font-medium">PNG</div>
                      <div className="text-xs text-slate-500">تصویر با کیفیت</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">اندازه</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border rounded-lg p-2 text-center cursor-pointer hover:border-slate-300">
                      <div className="font-medium">128px</div>
                      <div className="text-xs text-slate-500">کوچک</div>
                    </div>
                    <div className="border rounded-lg p-2 text-center cursor-pointer border-tiffany bg-tiffany/5">
                      <div className="font-medium">256px</div>
                      <div className="text-xs text-slate-500">متوسط</div>
                    </div>
                    <div className="border rounded-lg p-2 text-center cursor-pointer hover:border-slate-300">
                      <div className="font-medium">512px</div>
                      <div className="text-xs text-slate-500">بزرگ</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setIsExporting(false)}
              >
                لغو
              </Button>
              <Button 
                onClick={() => {
                  if (exportFormat === "svg") {
                    downloadAvatarSvg();
                  } else {
                    // در اینجا می‌توانید کد تبدیل SVG به PNG را اضافه کنید
                    toast({
                      title: "خروجی PNG",
                      description: "خروجی PNG در حال حاضر در دسترس نیست",
                    });
                  }
                  setIsExporting(false);
                  
                  // اضافه کردن به آمار
                  setUsageStats(prev => ({
                    ...prev,
                    featuresUsed: prev.featuresUsed.add('export')
                  }));
                  
                  // بررسی کوئست‌ها
                  checkQuestProgress();
                }}
              >
                دانلود
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* مودال فروشگاه */}
      {showShop && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <CardHeader className="bg-gradient-to-r from-amber-500/5 to-yellow-500/10">
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-amber-500" />
                فروشگاه آیتم‌های آواتار
              </CardTitle>
              <CardDescription>
                با خرج کردن کردیت، آیتم‌های جدید و ویژه را باز کنید
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto">
              <Tabs defaultValue="premium" className="w-full">
                <TabsList className="flex justify-center mb-4">
                  <TabsTrigger value="premium">آیتم‌های ویژه</TabsTrigger>
                  <TabsTrigger value="xp">آیتم‌های XP</TabsTrigger>
                  <TabsTrigger value="all">همه آیتم‌ها</TabsTrigger>
                </TabsList>
                
                <TabsContent value="premium">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {avatarCategories
                      .flatMap(cat => cat.items.filter(item => item.premium))
                      .map(item => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                          <div className="aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4">
                            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: item.svg }} />
                          </div>
                          <div className="p-3 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{item.name}</h4>
                              <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-yellow-500">
                                <Sparkles className="h-3 w-3 mr-1" />
                                ویژه
                              </Badge>
                            </div>
                            <Button
                              variant={isItemAvailable(item) ? "outline" : "default"}
                              className="mt-2"
                              onClick={() => {
                                if (!isItemAvailable(item)) {
                                  purchaseItem(item.id, 300);
                                } else {
                                  toast({
                                    title: "توجه",
                                    description: "این آیتم قبلاً باز شده است",
                                    variant: "default",
                                  });
                                }
                              }}
                            >
                              {isItemAvailable(item) ? "باز شده" : "خرید با 300 کردیت"}
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="xp">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {avatarCategories
                      .flatMap(cat => cat.items.filter(item => item.xpRequired && !item.premium))
                      .map(item => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                          <div className="aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4">
                            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: item.svg }} />
                          </div>
                          <div className="p-3 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{item.name}</h4>
                              <Badge variant="outline">
                                {item.xpRequired} XP
                              </Badge>
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                              {userDetails.xp >= (item.xpRequired || 0) 
                                ? "این آیتم با XP شما قابل باز کردن است" 
                                : `به ${(item.xpRequired || 0) - userDetails.xp} XP بیشتر نیاز دارید`}
                            </div>
                            <Button
                              variant="outline"
                              className="mt-auto"
                              disabled={userDetails.xp < (item.xpRequired || 0)}
                              onClick={() => {
                                if (userDetails.xp >= (item.xpRequired || 0)) {
                                  if (!isItemAvailable(item)) {
                                    // باز کردن آیتم با XP
                                    userDetails.availableItems.push(item.id);
                                    toast({
                                      title: "موفقیت",
                                      description: "آیتم با موفقیت باز شد",
                                      variant: "default",
                                    });
                                  } else {
                                    toast({
                                      title: "توجه",
                                      description: "این آیتم قبلاً باز شده است",
                                      variant: "default",
                                    });
                                  }
                                }
                              }}
                            >
                              {isItemAvailable(item) ? "باز شده" : userDetails.xp >= (item.xpRequired || 0) ? "باز کردن" : "XP ناکافی"}
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {avatarCategories
                      .flatMap(cat => cat.items)
                      .map(item => (
                        <div key={item.id} className="border rounded-lg overflow-hidden">
                          <div className="aspect-square bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-4">
                            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: item.svg }} />
                          </div>
                          <div className="p-3 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{item.name}</h4>
                              {item.premium ? (
                                <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-yellow-500">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  ویژه
                                </Badge>
                              ) : item.xpRequired ? (
                                <Badge variant="outline">
                                  {item.xpRequired} XP
                                </Badge>
                              ) : (
                                <Badge variant="secondary">پایه</Badge>
                              )}
                            </div>
                            <Button
                              variant={isItemAvailable(item) ? "outline" : "default"}
                              className="mt-2"
                              onClick={() => {
                                if (!isItemAvailable(item)) {
                                  if (item.premium) {
                                    purchaseItem(item.id, 300);
                                  } else if (item.xpRequired && userDetails.xp >= item.xpRequired) {
                                    userDetails.availableItems.push(item.id);
                                    toast({
                                      title: "موفقیت",
                                      description: "آیتم با موفقیت باز شد",
                                      variant: "default",
                                    });
                                  } else {
                                    toast({
                                      title: "توجه",
                                      description: "شرایط باز کردن این آیتم را ندارید",
                                      variant: "destructive",
                                    });
                                  }
                                } else {
                                  toast({
                                    title: "توجه",
                                    description: "این آیتم قبلاً باز شده است",
                                    variant: "default",
                                  });
                                }
                              }}
                            >
                              {isItemAvailable(item) ? "باز شده" : item.premium 
                                ? "خرید با 300 کردیت" 
                                : item.xpRequired 
                                  ? userDetails.xp >= item.xpRequired ? "باز کردن" : "XP ناکافی"
                                  : "آیتم پایه"
                              }
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t p-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="rounded-full px-3 py-1 flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    <span>{userDetails.credits}</span>
                    <span className="text-xs">کردیت</span>
                  </Badge>
                  
                  <Badge variant="outline" className="rounded-full px-3 py-1 flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>{userDetails.xp}</span>
                    <span className="text-xs">XP</span>
                  </Badge>
                </div>
                
                <Button 
                  variant="default" 
                  onClick={() => setShowShop(false)}
                >
                  بستن فروشگاه
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AvatarCustomizer;