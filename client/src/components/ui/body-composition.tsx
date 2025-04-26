import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Weight,
  Ruler,
  Heart,
  Percent,
  Bike,
  Flame,
  Activity,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Scale,
  Droplets,
  Bone,
  Calculator,
  FileEdit,
  Save,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// نمونه داده‌ها برای نمودارها
const weeklyData = [
  { day: "شنبه", weight: 78.2, fat: 21, muscle: 35, water: 55 },
  { day: "یکشنبه", weight: 78.0, fat: 20.8, muscle: 35.1, water: 55.3 },
  { day: "دوشنبه", weight: 77.8, fat: 20.7, muscle: 35.2, water: 55.4 },
  { day: "سه‌شنبه", weight: 77.7, fat: 20.6, muscle: 35.2, water: 55.5 },
  { day: "چهارشنبه", weight: 77.5, fat: 20.4, muscle: 35.3, water: 55.7 },
  { day: "پنج‌شنبه", weight: 77.3, fat: 20.3, muscle: 35.4, water: 55.8 },
  { day: "جمعه", weight: 77.1, fat: 20.1, muscle: 35.5, water: 56 },
];

const monthlyData = [
  { month: "فروردین", weight: 79.2, fat: 22, muscle: 34, water: 54 },
  { month: "اردیبهشت", weight: 78.8, fat: 21.5, muscle: 34.3, water: 54.5 },
  { month: "خرداد", weight: 78.2, fat: 21, muscle: 34.7, water: 54.8 },
  { month: "تیر", weight: 77.7, fat: 20.5, muscle: 35, water: 55.2 },
  { month: "مرداد", weight: 77.1, fat: 20.1, muscle: 35.5, water: 55.8 },
  { month: "شهریور", weight: 76.8, fat: 19.8, muscle: 35.7, water: 56 },
];

const bodyCompositionData = [
  { name: "چربی", value: 20.1, color: "#ef4444" },
  { name: "عضله", value: 35.5, color: "#3b82f6" },
  { name: "آب", value: 56, color: "#06b6d4" },
  { name: "استخوان", value: 3.5, color: "#8b5cf6" },
  { name: "سایر", value: 4.9, color: "#d1d5db" },
];

interface BodyCompositionProps {
  onSave?: (data: any) => void;
}

export default function BodyComposition({ onSave }: BodyCompositionProps) {
  const [activeTab, setActiveTab] = useState("metrics");
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    weight: "77.1",
    height: "178",
    bodyFat: "20.1",
    muscleMass: "35.5",
    waterPercentage: "56",
    boneMass: "3.5",
    visceralFat: "7",
    metabolicAge: "32",
    bmi: "24.3",
    bmr: "1820",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditing(false);
    if (onSave) {
      onSave(formData);
    }
  };

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100; // convert cm to meters
    if (weight > 0 && height > 0) {
      const bmi = (weight / (height * height)).toFixed(1);
      setFormData(prev => ({ ...prev, bmi }));
    }
  };

  const getBMICategory = () => {
    const bmi = parseFloat(formData.bmi);
    if (bmi < 18.5) return { label: "کمبود وزن", color: "text-blue-500" };
    if (bmi < 25) return { label: "وزن نرمال", color: "text-green-500" };
    if (bmi < 30) return { label: "اضافه وزن", color: "text-yellow-500" };
    if (bmi < 35) return { label: "چاقی درجه ۱", color: "text-orange-500" };
    if (bmi < 40) return { label: "چاقی درجه ۲", color: "text-red-500" };
    return { label: "چاقی درجه ۳", color: "text-red-700" };
  };

  const getTrend = (metric: string) => {
    // این تابع به صورت نمونه وضعیت روند تغییرات را نشان می‌دهد
    // در یک پیاده‌سازی واقعی، باید داده‌های واقعی بررسی شوند
    const trends: {[key: string]: {direction: "up" | "down" | "flat", good: boolean}} = {
      weight: { direction: "down", good: true },
      bodyFat: { direction: "down", good: true },
      muscleMass: { direction: "up", good: true },
      waterPercentage: { direction: "up", good: true },
      visceralFat: { direction: "down", good: true },
      metabolicAge: { direction: "down", good: true },
    };
    
    return trends[metric] || { direction: "flat", good: false };
  };

  return (
    <GlassCard>
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">ترکیب بدنی</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              پیگیری وضعیت ترکیب بدن و شاخص‌های سلامت جسمانی
            </p>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleSave}
                className="flex items-center"
              >
                <Save className="h-4 w-4 ml-1" />
                ذخیره
              </Button>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setEditing(true)}
                className="flex items-center"
              >
                <FileEdit className="h-4 w-4 ml-1" />
                ویرایش
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="metrics" className="text-xs">
              <Scale className="h-4 w-4 ml-1" />
              شاخص‌ها
            </TabsTrigger>
            <TabsTrigger value="charts" className="text-xs">
              <BarChart2 className="h-4 w-4 ml-1" />
              نمودارها
            </TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs">
              <Activity className="h-4 w-4 ml-1" />
              تحلیل
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-4 mt-0">
            {editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">وزن (کیلوگرم)</Label>
                  <div className="relative">
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={handleFormChange}
                      className="pl-10"
                    />
                    <Weight className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">قد (سانتی‌متر)</Label>
                  <div className="relative">
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleFormChange}
                      className="pl-10"
                    />
                    <Ruler className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bodyFat">درصد چربی بدن</Label>
                  <div className="relative">
                    <Input
                      id="bodyFat"
                      name="bodyFat"
                      type="number"
                      step="0.1"
                      value={formData.bodyFat}
                      onChange={handleFormChange}
                      className="pl-10"
                    />
                    <Percent className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="muscleMass">توده عضلانی (درصد)</Label>
                  <div className="relative">
                    <Input
                      id="muscleMass"
                      name="muscleMass"
                      type="number"
                      step="0.1"
                      value={formData.muscleMass}
                      onChange={handleFormChange}
                      className="pl-10"
                    />
                    <Activity className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="waterPercentage">آب بدن (درصد)</Label>
                  <div className="relative">
                    <Input
                      id="waterPercentage"
                      name="waterPercentage"
                      type="number"
                      step="0.1"
                      value={formData.waterPercentage}
                      onChange={handleFormChange}
                      className="pl-10"
                    />
                    <Droplets className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="boneMass">توده استخوانی (درصد)</Label>
                  <div className="relative">
                    <Input
                      id="boneMass"
                      name="boneMass"
                      type="number"
                      step="0.1"
                      value={formData.boneMass}
                      onChange={handleFormChange}
                      className="pl-10"
                    />
                    <Bone className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visceralFat">چربی احشایی</Label>
                  <div className="relative">
                    <Input
                      id="visceralFat"
                      name="visceralFat"
                      type="number"
                      value={formData.visceralFat}
                      onChange={handleFormChange}
                      className="pl-10"
                    />
                    <Scale className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metabolicAge">سن متابولیک (سال)</Label>
                  <div className="relative">
                    <Input
                      id="metabolicAge"
                      name="metabolicAge"
                      type="number"
                      value={formData.metabolicAge}
                      onChange={handleFormChange}
                      className="pl-10"
                    />
                    <Heart className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bmr">BMR (کالری)</Label>
                  <div className="relative">
                    <Input
                      id="bmr"
                      name="bmr"
                      type="number"
                      value={formData.bmr}
                      onChange={handleFormChange}
                      className="pl-10"
                    />
                    <Flame className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="bmi">شاخص توده بدنی (BMI)</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={calculateBMI}
                      className="text-xs"
                    >
                      <Calculator className="h-3 w-3 ml-1" />
                      محاسبه
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="bmi"
                      name="bmi"
                      type="number"
                      step="0.1"
                      value={formData.bmi}
                      onChange={handleFormChange}
                      className="pl-10"
                      readOnly
                    />
                    <Scale className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* کارت وزن */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">وزن</h3>
                    <div className="rounded-full bg-blue-50 dark:bg-blue-900/30 p-1.5">
                      <Weight className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">{formData.weight}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">کیلوگرم</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getTrend("weight").direction === "down" ? (
                      <TrendingDown className={cn(
                        "h-4 w-4 ml-1",
                        getTrend("weight").good ? "text-green-500" : "text-red-500"
                      )} />
                    ) : (
                      <TrendingUp className={cn(
                        "h-4 w-4 ml-1",
                        getTrend("weight").good ? "text-green-500" : "text-red-500"
                      )} />
                    )}
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      0.2 کیلوگرم کاهش در هفته
                    </span>
                  </div>
                </div>
                
                {/* کارت درصد چربی */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">چربی بدن</h3>
                    <div className="rounded-full bg-red-50 dark:bg-red-900/30 p-1.5">
                      <Percent className="h-4 w-4 text-red-500 dark:text-red-400" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">{formData.bodyFat}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">درصد</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getTrend("bodyFat").direction === "down" ? (
                      <TrendingDown className={cn(
                        "h-4 w-4 ml-1",
                        getTrend("bodyFat").good ? "text-green-500" : "text-red-500"
                      )} />
                    ) : (
                      <TrendingUp className={cn(
                        "h-4 w-4 ml-1",
                        getTrend("bodyFat").good ? "text-green-500" : "text-red-500"
                      )} />
                    )}
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      0.8% کاهش در ماه
                    </span>
                  </div>
                </div>
                
                {/* کارت توده عضلانی */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">توده عضلانی</h3>
                    <div className="rounded-full bg-blue-50 dark:bg-blue-900/30 p-1.5">
                      <Activity className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">{formData.muscleMass}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">درصد</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {getTrend("muscleMass").direction === "down" ? (
                      <TrendingDown className={cn(
                        "h-4 w-4 ml-1",
                        getTrend("muscleMass").good ? "text-green-500" : "text-red-500"
                      )} />
                    ) : (
                      <TrendingUp className={cn(
                        "h-4 w-4 ml-1",
                        getTrend("muscleMass").good ? "text-green-500" : "text-red-500"
                      )} />
                    )}
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      0.4% افزایش در ماه
                    </span>
                  </div>
                </div>
                
                {/* کارت شاخص توده بدنی */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">BMI</h3>
                    <div className="rounded-full bg-green-50 dark:bg-green-900/30 p-1.5">
                      <Scale className="h-4 w-4 text-green-500 dark:text-green-400" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">{formData.bmi}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">kg/m²</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <Badge variant="outline" className={cn("text-xs rounded-full", getBMICategory().color)}>
                      {getBMICategory().label}
                    </Badge>
                  </div>
                </div>
                
                {/* کارت متابولیسم پایه */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">BMR</h3>
                    <div className="rounded-full bg-orange-50 dark:bg-orange-900/30 p-1.5">
                      <Flame className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">{formData.bmr}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">کالری</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      کالری مصرفی در حالت استراحت
                    </span>
                  </div>
                </div>
                
                {/* کارت آب بدن */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">آب بدن</h3>
                    <div className="rounded-full bg-cyan-50 dark:bg-cyan-900/30 p-1.5">
                      <Droplets className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="text-2xl font-bold">{formData.waterPercentage}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-xs ml-1">درصد</span>
                  </div>
                  <div className="mt-2 flex items-center">
                    <Badge variant="outline" className="text-xs rounded-full text-green-500">
                      وضعیت مطلوب
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="charts" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* نمودار ترکیب بدنی */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-medium mb-4">ترکیب بدنی</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bodyCompositionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bodyCompositionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* نمودار تغییرات وزن */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-medium mb-4">تغییرات وزن</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#38bdf8"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* نمودار تغییرات چربی و عضله */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-medium mb-4">تغییرات چربی و عضله</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="fat"
                        stackId="1"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="muscle"
                        stackId="2"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* نمودار تغییرات آب بدن */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-medium mb-4">تغییرات آب بدن</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="water" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-0">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-medium mb-4">تحلیل وضعیت بدنی</h3>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <Scale className="h-4 w-4 ml-1 text-tiffany" />
                    وضعیت وزن
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    با توجه به قد شما ({formData.height} سانتی‌متر)، وزن فعلی شما ({formData.weight} کیلوگرم) در محدوده {getBMICategory().label} قرار دارد. 
                    شاخص توده بدنی شما {formData.bmi} است که {
                      parseFloat(formData.bmi) < 18.5 ? "کمتر از حد نرمال" :
                      parseFloat(formData.bmi) < 25 ? "در محدوده نرمال" :
                      "بیشتر از حد نرمال"
                    } است.
                  </p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                      style={{ width: "100%" }}
                    />
                    <div 
                      className="h-4 w-4 bg-white dark:bg-slate-900 rounded-full border-2 border-tiffany transform -translate-y-3"
                      style={{ marginLeft: `${Math.min(Math.max((parseFloat(formData.bmi) - 15) / 25 * 100, 0), 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>کمبود وزن</span>
                    <span>نرمال</span>
                    <span>اضافه وزن</span>
                    <span>چاقی</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <Percent className="h-4 w-4 ml-1 text-red-500" />
                    چربی بدن
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    درصد چربی بدن شما {formData.bodyFat}% است. با توجه به میزان درصد چربی، شما در محدوده {
                      parseFloat(formData.bodyFat) < 10 ? "بسیار پایین" :
                      parseFloat(formData.bodyFat) < 18 ? "نرمال و سالم" :
                      parseFloat(formData.bodyFat) < 25 ? "مرزی" :
                      "بالا"
                    } قرار دارید. روند کلی نشان می‌دهد که میزان چربی بدن شما در حال کاهش است که نشانه مثبتی است.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <Activity className="h-4 w-4 ml-1 text-blue-500" />
                    توده عضلانی
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    توده عضلانی شما {formData.muscleMass}% است که در محدوده {
                      parseFloat(formData.muscleMass) < 30 ? "پایین" :
                      parseFloat(formData.muscleMass) < 40 ? "متوسط" :
                      "بالا"
                    } قرار دارد. افزایش تدریجی توده عضلانی شما نشان‌دهنده تمرینات منظم و مناسب است.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <Droplets className="h-4 w-4 ml-1 text-cyan-500" />
                    آب بدن
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    میزان آب بدن شما {formData.waterPercentage}% است که در محدوده {
                      parseFloat(formData.waterPercentage) < 50 ? "پایین" :
                      parseFloat(formData.waterPercentage) < 65 ? "نرمال" :
                      "بالا"
                    } قرار دارد. حفظ سطح هیدراتاسیون مناسب برای عملکرد بهینه بدن ضروری است.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center">
                    <Heart className="h-4 w-4 ml-1 text-pink-500" />
                    وضعیت متابولیک
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    سن متابولیک شما {formData.metabolicAge} سال است که {
                      parseInt(formData.metabolicAge) < 30 ? "پایین‌تر از سن تقویمی شما است. این نشانه‌ی سلامت متابولیک و عملکرد مناسب بدن شماست." :
                      parseInt(formData.metabolicAge) <= 35 ? "تقریباً معادل سن تقویمی شماست که نشان‌دهنده‌ی وضعیت متعادل است." :
                      "بالاتر از سن تقویمی شماست. با بهبود سبک زندگی و افزایش فعالیت بدنی می‌توانید این شاخص را بهبود بخشید."
                    }
                  </p>
                </div>
                
                <div className="rounded-xl bg-tiffany/10 dark:bg-tiffany/20 p-4 border border-tiffany/20 mt-4">
                  <h4 className="font-medium flex items-center text-tiffany">
                    <Sparkles className="h-4 w-4 ml-1" />
                    پیشنهادات
                  </h4>
                  <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 mt-2 space-y-1">
                    <li>ادامه روند کاهش چربی بدن با ترکیب ورزش هوازی و مقاومتی</li>
                    <li>افزایش مصرف پروتئین برای تقویت رشد عضلات</li>
                    <li>نوشیدن حداقل 2 لیتر آب در روز برای حفظ سطح هیدراتاسیون مناسب</li>
                    <li>خواب کافی (7-8 ساعت) برای بازیابی و رشد عضلات</li>
                    <li>کاهش مصرف کربوهیدرات‌های تصفیه شده و قندهای ساده</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-b-xl border-t flex justify-between items-center">
        <div className="flex items-center text-xs text-slate-500">
          <RefreshCw className="h-3 w-3 ml-1 animate-spin-slow" />
          آخرین بروزرسانی: امروز، ساعت 10:30
        </div>
        
        <div className="flex items-center space-x-1 space-x-reverse">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}