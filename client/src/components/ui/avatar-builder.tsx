import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover";
import {
  User,
  Upload,
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
  Download,
  Eraser,
  Shapes,
  Braces,
  Heart,
  BadgeCheck
} from "lucide-react";

export interface AvatarOptions {
  faceShape: "round" | "square" | "oval" | "heart" | "diamond";
  skinTone: string;
  expression: "smile" | "neutral" | "serious";
  hairColor: string;
  hairStyle: string;
  clothingColor: string;
  clothingStyle: "formal" | "casual" | "sporty";
  accessories: string[];
  background: string;
  glow: boolean;
  glowColor: string;
  size: "small" | "medium" | "large";
  badgeVisible: boolean;
  badgeType: "level" | "achievement" | "role";
  animation: boolean;
}

const defaultAvatarOptions: AvatarOptions = {
  faceShape: "round",
  skinTone: "#f8d5c2",
  expression: "smile",
  hairColor: "#3a3a3a",
  hairStyle: "short",
  clothingColor: "#2980b9",
  clothingStyle: "casual",
  accessories: [],
  background: "#ffffff",
  glow: false,
  glowColor: "#38bdf8",
  size: "medium",
  badgeVisible: false,
  badgeType: "level",
  animation: false,
};

interface AvatarBuilderProps {
  initialOptions?: Partial<AvatarOptions>;
  onSave?: (options: AvatarOptions, dataUrl: string) => void;
}

export default function AvatarBuilder({ initialOptions, onSave }: AvatarBuilderProps) {
  const [options, setOptions] = useState<AvatarOptions>({
    ...defaultAvatarOptions,
    ...initialOptions,
  });

  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [tab, setTab] = useState("character");

  // Hair style options
  const hairStyles = [
    { id: "short", label: "کوتاه" },
    { id: "medium", label: "متوسط" },
    { id: "long", label: "بلند" },
    { id: "curly", label: "فر" },
    { id: "wavy", label: "موج‌دار" },
  ];

  // Face shape options
  const faceShapes = [
    { id: "round", label: "گرد", icon: <UserRound /> },
    { id: "square", label: "مربعی", icon: <Shapes /> },
    { id: "oval", label: "بیضی", icon: <User /> },
    { id: "heart", label: "قلبی", icon: <Heart /> },
    { id: "diamond", label: "الماسی", icon: <Braces /> },
  ];

  // Expression options
  const expressions = [
    { id: "smile", label: "لبخند", icon: <Smile /> },
    { id: "neutral", label: "خنثی", icon: <Meh /> },
    { id: "serious", label: "جدی", icon: <Frown /> },
  ];

  // Accessories options
  const accessoriesOptions = [
    { id: "glasses", label: "عینک", icon: <Glasses /> },
    { id: "crown", label: "تاج", icon: <Crown /> },
    { id: "badge", label: "نشان", icon: <BadgeCheck /> },
  ];

  // Clothing style options
  const clothingStyles = [
    { id: "formal", label: "رسمی" },
    { id: "casual", label: "معمولی" },
    { id: "sporty", label: "ورزشی" },
  ];

  // Color palette for various options
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

  // Skin tone palette
  const skinTones = [
    "#f8d5c2", // روشن
    "#eeceb3", // کمی تیره
    "#e0ac69", // متوسط
    "#c68642", // قهوه‌ای روشن
    "#89581a", // قهوه‌ای
    "#553016", // قهوه‌ای تیره
  ];

  const updateOption = <K extends keyof AvatarOptions>(
    key: K,
    value: AvatarOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

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

  const resetToDefault = () => {
    setOptions(defaultAvatarOptions);
    setCustomImageUrl(null);
  };

  const generateAvatarImage = (): string => {
    // This is placeholder - in a real implementation, this would generate an image based on options
    // For now, we'll just return a placeholder or the custom image if one is uploaded
    return customImageUrl || `https://ui-avatars.com/api/?name=${options.expression}&background=${options.background.replace('#', '')}&color=${options.clothingColor.replace('#', '')}&size=256`;
  };

  const handleSave = () => {
    const avatarImage = generateAvatarImage();
    if (onSave) {
      onSave(options, avatarImage);
    }
  };

  return (
    <div className="rounded-xl border bg-white dark:bg-slate-950 shadow-sm">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">ساخت آواتار شخصی</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              آواتار خود را با ویژگی‌های مختلف شخصی‌سازی کنید
            </p>
          </div>
          <Button variant="default" size="sm" onClick={resetToDefault} className="flex items-center">
            <RefreshCcw className="h-4 w-4 ml-1" />
            بازنشانی
          </Button>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          {/* Preview Panel */}
          <div className="md:col-span-5 flex flex-col items-center space-y-4">
            <div 
              className={cn(
                "relative rounded-full overflow-hidden", 
                {
                  "w-32 h-32": options.size === "small",
                  "w-48 h-48": options.size === "medium",
                  "w-64 h-64": options.size === "large",
                },
                options.glow && "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-slate-950",
                options.glow && `ring-${options.glowColor}`
              )}
              style={{
                borderColor: options.glowColor,
                backgroundColor: options.background,
                boxShadow: options.glow ? `0 0 15px ${options.glowColor}` : 'none'
              }}
            >
              {customImageUrl ? (
                <img 
                  src={customImageUrl} 
                  alt="آواتار شخصی" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                  <UserRound className="w-1/2 h-1/2 text-slate-400 dark:text-slate-600" />
                </div>
              )}
              
              {options.badgeVisible && (
                <div className="absolute bottom-0 right-0 bg-tiffany text-white rounded-full p-1 w-8 h-8 flex items-center justify-center">
                  {options.badgeType === "level" && <span className="text-xs font-bold">18</span>}
                  {options.badgeType === "achievement" && <Sparkles className="w-4 h-4" />}
                  {options.badgeType === "role" && <Crown className="w-4 h-4" />}
                </div>
              )}
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="font-medium">پیش‌نمایش آواتار</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">چهره دیجیتال شما در پلتفرم</p>
            </div>
            
            <div className="space-y-3 w-full max-w-xs">
              <div>
                <Label className="mb-2 block text-xs">اندازه آواتار</Label>
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
                    {["#38bdf8", "#f43f5e", "#22c55e", "#f59e0b", "#8b5cf6"].map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "w-6 h-6 rounded-full",
                          options.glowColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => updateOption("glowColor", color)}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <Label htmlFor="badge-toggle" className="text-xs">نمایش نشان</Label>
                <Switch
                  id="badge-toggle"
                  checked={options.badgeVisible}
                  onCheckedChange={(checked) => updateOption("badgeVisible", checked)}
                />
              </div>
              
              {options.badgeVisible && (
                <div>
                  <Label className="mb-2 block text-xs">نوع نشان</Label>
                  <RadioGroup
                    value={options.badgeType}
                    onValueChange={(value) => updateOption("badgeType", value as "level" | "achievement" | "role")}
                    className="flex space-x-2 space-x-reverse"
                  >
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <RadioGroupItem value="level" id="badge-level" />
                      <Label htmlFor="badge-level" className="text-xs cursor-pointer">سطح</Label>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <RadioGroupItem value="achievement" id="badge-achievement" />
                      <Label htmlFor="badge-achievement" className="text-xs cursor-pointer">دستاورد</Label>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <RadioGroupItem value="role" id="badge-role" />
                      <Label htmlFor="badge-role" className="text-xs cursor-pointer">نقش</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
              
              <div className="mt-4 space-y-2">
                <Button 
                  className="w-full"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 ml-2" />
                  ذخیره آواتار
                </Button>
                <Button variant="outline" className="w-full" onClick={() => document.getElementById('avatar-upload')?.click()}>
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
          
          {/* Editor Panel */}
          <div className="md:col-span-7">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="character" className="text-xs">
                  <UserRound className="h-4 w-4 ml-1" />
                  چهره
                </TabsTrigger>
                <TabsTrigger value="clothing" className="text-xs">
                  <Shirt className="h-4 w-4 ml-1" />
                  لباس
                </TabsTrigger>
                <TabsTrigger value="accessories" className="text-xs">
                  <Glasses className="h-4 w-4 ml-1" />
                  اکسسوری
                </TabsTrigger>
                <TabsTrigger value="background" className="text-xs">
                  <Image className="h-4 w-4 ml-1" />
                  پس‌زمینه
                </TabsTrigger>
              </TabsList>
              
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
                <TabsContent value="character" className="space-y-5 mt-0">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">فرم چهره</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {faceShapes.map((shape) => (
                        <Button
                          key={shape.id}
                          variant={options.faceShape === shape.id ? "default" : "outline"}
                          className="flex flex-col items-center justify-center h-auto py-2 text-xs"
                          onClick={() => updateOption("faceShape", shape.id as AvatarOptions["faceShape"])}
                        >
                          {shape.icon}
                          <span className="mt-1">{shape.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">رنگ پوست</Label>
                    <div className="flex flex-wrap gap-2">
                      {skinTones.map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "w-8 h-8 rounded-full",
                            options.skinTone === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => updateOption("skinTone", color)}
                        />
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
                          onClick={() => updateOption("expression", expression.id as AvatarOptions["expression"])}
                        >
                          {expression.icon}
                          <span className="mt-1">{expression.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">مدل مو</Label>
                    <RadioGroup
                      value={options.hairStyle}
                      onValueChange={(value) => updateOption("hairStyle", value)}
                      className="grid grid-cols-3 gap-2"
                    >
                      {hairStyles.map((style) => (
                        <div key={style.id} className="flex items-center space-x-2 space-x-reverse">
                          <RadioGroupItem value={style.id} id={`hair-${style.id}`} />
                          <Label htmlFor={`hair-${style.id}`} className="cursor-pointer">{style.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">رنگ مو</Label>
                    <div className="flex flex-wrap gap-2">
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "w-8 h-8 rounded-full",
                            options.hairColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => updateOption("hairColor", color)}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="clothing" className="space-y-5 mt-0">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">سبک لباس</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {clothingStyles.map((style) => (
                        <Button
                          key={style.id}
                          variant={options.clothingStyle === style.id ? "default" : "outline"}
                          className="text-xs"
                          onClick={() => updateOption("clothingStyle", style.id as AvatarOptions["clothingStyle"])}
                        >
                          {style.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">رنگ لباس</Label>
                    <div className="flex flex-wrap gap-2">
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "w-8 h-8 rounded-full",
                            options.clothingColor === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => updateOption("clothingColor", color)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">پیش‌نمایش لباس</Label>
                    <div className="h-24 border rounded-md bg-white dark:bg-slate-800 flex items-center justify-center">
                      <div 
                        className="w-12 h-16 rounded-md"
                        style={{ backgroundColor: options.clothingColor }}
                      ></div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="accessories" className="space-y-5 mt-0">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">افزودن اکسسوری</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {accessoriesOptions.map((accessory) => (
                        <Button
                          key={accessory.id}
                          variant={options.accessories.includes(accessory.id) ? "default" : "outline"}
                          className="flex flex-col items-center justify-center h-auto py-2 text-xs"
                          onClick={() => toggleAccessory(accessory.id)}
                        >
                          {accessory.icon}
                          <span className="mt-1">{accessory.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">ویژگی‌های ظاهری</Label>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="animation-toggle" className="text-xs">انیمیشن آواتار</Label>
                      <Switch
                        id="animation-toggle"
                        checked={options.animation}
                        onCheckedChange={(checked) => updateOption("animation", checked)}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="background" className="space-y-5 mt-0">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">رنگ پس‌زمینه</Label>
                    <div className="flex flex-wrap gap-2">
                      {["#ffffff", "#f3f4f6", "#d1d5db", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "w-8 h-8 rounded-full",
                            options.background === color ? "ring-2 ring-offset-2 ring-black dark:ring-white" : ""
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => updateOption("background", color)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">نوع پس‌زمینه</Label>
                    <RadioGroup
                      value={options.background === "gradient" ? "gradient" : "solid"}
                      onValueChange={(value) => {
                        if (value === "gradient") {
                          updateOption("background", "gradient");
                        } else {
                          updateOption("background", "#ffffff");
                        }
                      }}
                      className="flex space-x-2 space-x-reverse"
                    >
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <RadioGroupItem value="solid" id="bg-solid" />
                        <Label htmlFor="bg-solid" className="text-xs cursor-pointer">تک رنگ</Label>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <RadioGroupItem value="gradient" id="bg-gradient" />
                        <Label htmlFor="bg-gradient" className="text-xs cursor-pointer">گرادینت</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            
            <Separator className="my-4" />
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={resetToDefault}>
                <Eraser className="h-4 w-4 ml-1" />
                پاک کردن همه
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                <Sparkles className="h-4 w-4 ml-1" />
                ثبت و استفاده
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-b-xl border-t">
        <div className="flex flex-wrap gap-2 justify-center text-xs text-slate-500">
          <span className="flex items-center">
            <Sparkles className="h-3 w-3 ml-1 text-tiffany" />
            20+ ویژگی سفارشی‌سازی
          </span>
          <span className="flex items-center">
            <Download className="h-3 w-3 ml-1 text-tiffany" />
            قابلیت دانلود
          </span>
          <span className="flex items-center">
            <Image className="h-3 w-3 ml-1 text-tiffany" />
            پشتیبانی از فرمت‌های مختلف
          </span>
        </div>
      </div>
    </div>
  );
}