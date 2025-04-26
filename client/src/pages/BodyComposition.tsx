import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icons
import {
  Activity,
  AreaChart,
  Calendar as CalendarIcon,
  CircleHelp,
  Clock,
  Download,
  FileText,
  Heart,
  HelpCircle,
  Info,
  LineChart,
  PieChart,
  Plus,
  ScatterChart,
  Share2,
  Timer,
  User,
  Users,
  Weight,
  Zap,
} from "lucide-react";

// Utilities
import { cn, formatDate, toPersianDigits } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/useAuth";
import useIsMobile from "@/hooks/use-mobile";

// Mock data for body composition history
const mockBodyCompHistory = [
  {
    id: 1,
    date: "2024-04-01T10:00:00Z",
    weight: 75.2,
    bmi: 24.3,
    bodyFatPercentage: 19.1,
    muscleMass: 38.4,
    boneDensity: 3.2,
    metabolicAge: 32,
    visceralFat: 8,
    waterPercentage: 58.2,
    basalMetabolicRate: 1765,
  },
  {
    id: 2,
    date: "2024-03-01T10:00:00Z",
    weight: 77.8,
    bmi: 25.1,
    bodyFatPercentage: 21.3,
    muscleMass: 37.1,
    boneDensity: 3.1,
    metabolicAge: 34,
    visceralFat: 9,
    waterPercentage: 56.8,
    basalMetabolicRate: 1750,
  },
  {
    id: 3,
    date: "2024-02-01T10:00:00Z",
    weight: 79.5,
    bmi: 25.7,
    bodyFatPercentage: 22.5,
    muscleMass: 36.2,
    boneDensity: 3.1,
    metabolicAge: 35,
    visceralFat: 10,
    waterPercentage: 55.4,
    basalMetabolicRate: 1745,
  },
  {
    id: 4,
    date: "2024-01-01T10:00:00Z",
    weight: 80.3,
    bmi: 26.0,
    bodyFatPercentage: 23.2,
    muscleMass: 35.5,
    boneDensity: 3.0,
    metabolicAge: 36,
    visceralFat: 10,
    waterPercentage: 54.8,
    basalMetabolicRate: 1740,
  },
];

// Schema for new body composition entry
const bodyCompSchema = z.object({
  date: z.date({
    required_error: "تاریخ اندازه‌گیری الزامی است.",
  }),
  weight: z.string().transform((val) => parseFloat(val)).pipe(
    z.number().positive({
      message: "وزن باید عددی مثبت باشد.",
    })
  ),
  height: z.string().transform((val) => parseFloat(val)).pipe(
    z.number().positive({
      message: "قد باید عددی مثبت باشد.",
    })
  ),
  bodyFatPercentage: z.string().transform((val) => parseFloat(val)).pipe(
    z.number().min(3, {
      message: "درصد چربی بدن باید بین 3 تا 50 درصد باشد.",
    }).max(50, {
      message: "درصد چربی بدن باید بین 3 تا 50 درصد باشد.",
    })
  ),
  muscleMass: z.string().transform((val) => parseFloat(val)).pipe(
    z.number().positive({
      message: "توده عضلانی باید عددی مثبت باشد.",
    })
  ),
  boneDensity: z.string().transform((val) => parseFloat(val)).pipe(
    z.number().positive({
      message: "تراکم استخوان باید عددی مثبت باشد.",
    })
  ),
  waterPercentage: z.string().transform((val) => parseFloat(val)).pipe(
    z.number().min(30, {
      message: "درصد آب بدن باید بین 30 تا 75 درصد باشد.",
    }).max(75, {
      message: "درصد آب بدن باید بین 30 تا 75 درصد باشد.",
    })
  ),
  visceralFat: z.string().transform((val) => parseInt(val)).pipe(
    z.number().min(1, {
      message: "چربی احشایی باید بین 1 تا 30 باشد.",
    }).max(30, {
      message: "چربی احشایی باید بین 1 تا 30 باشد.",
    })
  ),
  measurementMethod: z.string({
    required_error: "روش اندازه‌گیری را انتخاب کنید.",
  }),
});

// Reference ranges for body composition metrics
const referenceRanges = {
  bmi: {
    underweight: { min: 0, max: 18.5, label: "کمبود وزن", color: "text-blue-500" },
    normal: { min: 18.5, max: 24.9, label: "طبیعی", color: "text-green-500" },
    overweight: { min: 25, max: 29.9, label: "اضافه وزن", color: "text-yellow-500" },
    obese: { min: 30, max: 100, label: "چاقی", color: "text-red-500" },
  },
  bodyFatPercentage: {
    male: {
      essential: { min: 2, max: 5, label: "ضروری", color: "text-blue-500" },
      athletic: { min: 5, max: 13, label: "ورزشکاری", color: "text-green-500" },
      fitness: { min: 13, max: 17, label: "تناسب اندام", color: "text-teal-500" },
      normal: { min: 17, max: 25, label: "طبیعی", color: "text-yellow-500" },
      obese: { min: 25, max: 100, label: "چاقی", color: "text-red-500" },
    },
    female: {
      essential: { min: 10, max: 13, label: "ضروری", color: "text-blue-500" },
      athletic: { min: 13, max: 20, label: "ورزشکاری", color: "text-green-500" },
      fitness: { min: 20, max: 24, label: "تناسب اندام", color: "text-teal-500" },
      normal: { min: 24, max: 31, label: "طبیعی", color: "text-yellow-500" },
      obese: { min: 31, max: 100, label: "چاقی", color: "text-red-500" },
    },
  },
  visceralFat: {
    healthy: { min: 1, max: 9, label: "سالم", color: "text-green-500" },
    excess: { min: 10, max: 14, label: "بالا", color: "text-yellow-500" },
    unhealthy: { min: 15, max: 59, label: "ناسالم", color: "text-red-500" },
  },
  waterPercentage: {
    male: {
      low: { min: 0, max: 50, label: "پایین", color: "text-yellow-500" },
      normal: { min: 50, max: 65, label: "طبیعی", color: "text-green-500" },
      high: { min: 65, max: 100, label: "بالا", color: "text-blue-500" },
    },
    female: {
      low: { min: 0, max: 45, label: "پایین", color: "text-yellow-500" },
      normal: { min: 45, max: 60, label: "طبیعی", color: "text-green-500" },
      high: { min: 60, max: 100, label: "بالا", color: "text-blue-500" },
    },
  },
};

// Get status category for a metric
function getStatusCategory(metric: string, value: number, gender: string = "male") {
  const ranges = metric === "bodyFatPercentage" || metric === "waterPercentage"
    ? referenceRanges[metric][gender]
    : referenceRanges[metric];

  for (const [category, range] of Object.entries(ranges)) {
    if (value >= range.min && value < range.max) {
      return {
        category,
        ...range
      };
    }
  }

  return null;
}

// Calculate BMI
function calculateBMI(weight: number, height: number) {
  return parseFloat((weight / ((height / 100) ** 2)).toFixed(1));
}

export default function BodyCompositionPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [gender, setGender] = useState("male");
  const [activeTab, setActiveTab] = useState("current");
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [measurementDialogOpen, setMeasurementDialogOpen] = useState(false);

  // Get current user's health metrics
  const {
    data: healthMetrics,
    isLoading: healthMetricsLoading,
    error: healthMetricsError
  } = useQuery({
    queryKey: ["/api/health-metrics", user?.id],
    queryFn: async () => {
      // Replace with actual API call when available
      return { metrics: mockBodyCompHistory };
    },
    enabled: !!user?.id,
  });

  // Form setup for adding new body composition measurement
  const form = useForm({
    resolver: zodResolver(bodyCompSchema),
    defaultValues: {
      date: new Date(),
      weight: "",
      height: "",
      bodyFatPercentage: "",
      muscleMass: "",
      boneDensity: "",
      waterPercentage: "",
      visceralFat: "",
      measurementMethod: "",
    },
  });

  // Add new measurement mutation
  const addMeasurementMutation = useMutation({
    mutationFn: async (data) => {
      // Replace with actual API call when available
      console.log("Adding new measurement:", data);
      return { id: Date.now(), ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/health-metrics", user?.id] });
      setMeasurementDialogOpen(false);
      toast({
        title: "ثبت موفق",
        description: "اندازه‌گیری جدید با موفقیت ثبت شد",
        variant: "success",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "خطا در ثبت",
        description: error.message || "خطایی رخ داد",
        variant: "destructive",
      });
    },
  });

  // Submit handler for new measurement
  const onSubmit = (data) => {
    // Calculate BMI
    const bmi = calculateBMI(data.weight, data.height);

    // Calculate metabolic age (simplified formula for demo)
    const metabolicAge = Math.round((data.weight / (data.height / 100)) + 20);

    // Calculate basal metabolic rate (simplified formula for demo)
    const bmr = gender === "male"
      ? Math.round(10 * data.weight + 6.25 * data.height - 5 * 30 + 5)
      : Math.round(10 * data.weight + 6.25 * data.height - 5 * 30 - 161);

    const newData = {
      ...data,
      bmi,
      metabolicAge,
      basalMetabolicRate: bmr,
    };

    addMeasurementMutation.mutate(newData);
  };

  // Get the latest record
  const latestRecord = healthMetrics?.metrics?.[0] || null;

  // Handle record selection
  const handleRecordSelect = (record) => {
    setSelectedRecord(record);
  };

  // Clear selected record
  const clearSelectedRecord = () => {
    setSelectedRecord(null);
  };

  // Check height and weight changes
  const calculateChange = (current, previous, type) => {
    if (!previous) return null;
    
    const diff = current - previous;
    const percentage = ((diff / previous) * 100).toFixed(1);
    
    let status;
    if (type === "weight" || type === "bmi" || type === "bodyFatPercentage" || type === "visceralFat") {
      status = diff < 0 ? "positive" : diff > 0 ? "negative" : "neutral";
    } else {
      status = diff > 0 ? "positive" : diff < 0 ? "negative" : "neutral";
    }
    
    return {
      diff: Math.abs(diff).toFixed(1),
      percentage,
      status,
    };
  };

  // Compare latest with previous record
  const changes = latestRecord && healthMetrics?.metrics?.[1] ? {
    weight: calculateChange(latestRecord.weight, healthMetrics.metrics[1].weight, "weight"),
    bmi: calculateChange(latestRecord.bmi, healthMetrics.metrics[1].bmi, "bmi"),
    bodyFatPercentage: calculateChange(latestRecord.bodyFatPercentage, healthMetrics.metrics[1].bodyFatPercentage, "bodyFatPercentage"),
    muscleMass: calculateChange(latestRecord.muscleMass, healthMetrics.metrics[1].muscleMass, "muscleMass"),
    waterPercentage: calculateChange(latestRecord.waterPercentage, healthMetrics.metrics[1].waterPercentage, "waterPercentage"),
    visceralFat: calculateChange(latestRecord.visceralFat, healthMetrics.metrics[1].visceralFat, "visceralFat"),
  } : null;

  if (healthMetricsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">در حال بارگذاری اطلاعات...</p>
        </div>
      </div>
    );
  }

  if (healthMetricsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <div className="text-destructive">
          <Activity className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-bold">خطا در بارگذاری اطلاعات</h2>
        <p className="text-muted-foreground">متأسفانه خطایی در بارگذاری اطلاعات ترکیب بدن رخ داده است.</p>
        <Button onClick={() => window.location.reload()}>تلاش مجدد</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-screen-xl">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">آنالیز ترکیب بدن</h1>
          <p className="text-muted-foreground">
            ردیابی و تحلیل ترکیب بدن شما برای بهبود سلامت و تناسب اندام
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={measurementDialogOpen} onOpenChange={setMeasurementDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>ثبت اندازه‌گیری جدید</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>ثبت اندازه‌گیری جدید ترکیب بدن</DialogTitle>
                <DialogDescription>
                  نتایج اندازه‌گیری ترکیب بدن خود را وارد کنید. همه مقادیر را با دقت وارد کنید.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {/* Date picker */}
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>تاریخ اندازه‌گیری</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      formatDate(field.value)
                                    ) : (
                                      <span>تاریخ را انتخاب کنید</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Measurement method */}
                      <FormField
                        control={form.control}
                        name="measurementMethod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>روش اندازه‌گیری</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="روش اندازه‌گیری را انتخاب کنید" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="bioimpedance">بیوامپدانس</SelectItem>
                                <SelectItem value="dexa">دکسا (DEXA)</SelectItem>
                                <SelectItem value="calipers">کالیپر</SelectItem>
                                <SelectItem value="hydrostatic">هیدرواستاتیک</SelectItem>
                                <SelectItem value="other">سایر</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Gender selection */}
                      <div className="space-y-2">
                        <FormLabel>جنسیت</FormLabel>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={gender === "male" ? "default" : "outline"}
                            onClick={() => setGender("male")}
                            className="flex-1"
                          >
                            مرد
                          </Button>
                          <Button
                            type="button"
                            variant={gender === "female" ? "default" : "outline"}
                            onClick={() => setGender("female")}
                            className="flex-1"
                          >
                            زن
                          </Button>
                        </div>
                      </div>
                      
                      {/* Height */}
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>قد (سانتی‌متر)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                placeholder="قد"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Weight */}
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>وزن (کیلوگرم)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                placeholder="وزن"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      {/* Body Fat Percentage */}
                      <FormField
                        control={form.control}
                        name="bodyFatPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              درصد چربی بدن (%)
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <CircleHelp className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      درصد چربی بدن نشان‌دهنده نسبت بافت چربی به وزن کل بدن است. محدوده مطلوب برای مردان بین 10 تا 20 و برای زنان بین 18 تا 28 درصد است.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                placeholder="درصد چربی بدن"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Muscle Mass */}
                      <FormField
                        control={form.control}
                        name="muscleMass"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              توده عضلانی (کیلوگرم)
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <CircleHelp className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      توده عضلانی وزن کل عضلات اسکلتی بدن است.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                placeholder="توده عضلانی"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Bone Density */}
                      <FormField
                        control={form.control}
                        name="boneDensity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              تراکم استخوان (کیلوگرم)
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <CircleHelp className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      تراکم استخوان وزن کل بافت استخوانی بدن است.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                placeholder="تراکم استخوان"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Water Percentage */}
                      <FormField
                        control={form.control}
                        name="waterPercentage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              درصد آب بدن (%)
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <CircleHelp className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      درصد آب بدن نشان‌دهنده نسبت آب به وزن کل بدن است. محدوده طبیعی برای مردان بین 50 تا 65 و برای زنان بین 45 تا 60 درصد است.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.1"
                                placeholder="درصد آب بدن"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Visceral Fat */}
                      <FormField
                        control={form.control}
                        name="visceralFat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-1">
                              چربی احشایی (سطح)
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <CircleHelp className="h-3 w-3 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      چربی احشایی چربی ذخیره شده در حفره شکمی است که اندام‌های داخلی را احاطه می‌کند. سطح سالم زیر 10 است.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="1"
                                placeholder="چربی احشایی"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setMeasurementDialogOpen(false)}
                      className="ml-2"
                    >
                      انصراف
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={addMeasurementMutation.isPending}
                    >
                      {addMeasurementMutation.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent ml-2"></div>
                          در حال ثبت...
                        </>
                      ) : "ثبت اندازه‌گیری"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>دانلود گزارش</span>
          </Button>
        </div>
      </div>
      
      {latestRecord ? (
        <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-background backdrop-blur-md rounded-t-xl border shadow-md p-2 sticky top-0 z-10">
            <TabsList className="flex flex-wrap md:flex-nowrap justify-start overflow-x-auto">
              <TabsTrigger value="current" className="flex items-center gap-1">
                <PieChart className="w-4 h-4" />
                <span>آخرین وضعیت</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1">
                <LineChart className="w-4 h-4" />
                <span>تاریخچه</span>
              </TabsTrigger>
              <TabsTrigger value="compare" className="flex items-center gap-1">
                <ScatterChart className="w-4 h-4" />
                <span>مقایسه</span>
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-1">
                <AreaChart className="w-4 h-4" />
                <span>تحلیل پیشرفته</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>توصیه‌ها</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="bg-background backdrop-blur-md rounded-b-xl border-x border-b shadow-md p-6">
            {/* Current Tab */}
            <TabsContent value="current" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Summary Card */}
                <Card className="md:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">خلاصه وضعیت</CardTitle>
                    <CardDescription className="flex items-center justify-between">
                      <span>اندازه‌گیری شده در {formatDate(new Date(latestRecord.date))}</span>
                      <Badge variant="outline" className="bg-primary/5">
                        <Clock className="w-3 h-3 ml-1" />
                        <span>جدیدترین</span>
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Body Score */}
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="relative w-40 h-40">
                        <svg viewBox="0 0 100 100" className="w-full h-full rotate-90">
                          <circle 
                            cx="50" cy="50" r="45" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="10" 
                            strokeLinecap="round"
                            className="text-muted/20"
                          />
                          <circle 
                            cx="50" cy="50" r="45" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="10" 
                            strokeDasharray="283" 
                            strokeDashoffset="85"
                            strokeLinecap="round"
                            className="text-primary"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-4xl font-bold">
                            {toPersianDigits(70)}
                          </span>
                          <span className="text-sm text-muted-foreground">امتیاز سلامت</span>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <Badge variant="outline" className="bg-primary/5">
                          خوب
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-2">
                          وضعیت کلی ترکیب بدن شما خوب است.
                        </p>
                      </div>
                    </div>
                    
                    {/* Key metrics */}
                    <div className="space-y-3">
                      <div className="font-medium text-sm">شاخص‌های کلیدی:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col bg-muted/30 p-3 rounded-lg">
                          <span className="text-xs text-muted-foreground">وزن</span>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{toPersianDigits(latestRecord.weight)} کیلوگرم</span>
                            {changes?.weight && (
                              <Badge 
                                variant={changes.weight.status === "positive" ? "success" : changes.weight.status === "negative" ? "destructive" : "outline"}
                                className="text-xs"
                              >
                                {changes.weight.status === "positive" ? "-" : "+"}
                                {toPersianDigits(changes.weight.diff)} کیلوگرم
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col bg-muted/30 p-3 rounded-lg">
                          <span className="text-xs text-muted-foreground">BMI</span>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{toPersianDigits(latestRecord.bmi)}</span>
                            {changes?.bmi && (
                              <Badge 
                                variant={changes.bmi.status === "positive" ? "success" : changes.bmi.status === "negative" ? "destructive" : "outline"}
                                className="text-xs"
                              >
                                {changes.bmi.status === "positive" ? "-" : "+"}
                                {toPersianDigits(changes.bmi.diff)}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col bg-muted/30 p-3 rounded-lg">
                          <span className="text-xs text-muted-foreground">چربی بدن</span>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{toPersianDigits(latestRecord.bodyFatPercentage)}%</span>
                            {changes?.bodyFatPercentage && (
                              <Badge 
                                variant={changes.bodyFatPercentage.status === "positive" ? "success" : changes.bodyFatPercentage.status === "negative" ? "destructive" : "outline"}
                                className="text-xs"
                              >
                                {changes.bodyFatPercentage.status === "positive" ? "-" : "+"}
                                {toPersianDigits(changes.bodyFatPercentage.diff)}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col bg-muted/30 p-3 rounded-lg">
                          <span className="text-xs text-muted-foreground">توده عضلانی</span>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{toPersianDigits(latestRecord.muscleMass)} کیلوگرم</span>
                            {changes?.muscleMass && (
                              <Badge 
                                variant={changes.muscleMass.status === "positive" ? "success" : changes.muscleMass.status === "negative" ? "destructive" : "outline"}
                                className="text-xs"
                              >
                                {changes.muscleMass.status === "positive" ? "+" : "-"}
                                {toPersianDigits(changes.muscleMass.diff)} کیلوگرم
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Last measurement date */}
                    <div className="pt-4 border-t text-sm text-center text-muted-foreground">
                      <p>
                        آخرین اندازه‌گیری: {formatDate(new Date(latestRecord.date))}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Detailed metrics */}
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">جزئیات شاخص‌ها</CardTitle>
                    <CardDescription>
                      اطلاعات دقیق ترکیب بدن و مقایسه با محدوده‌های استاندارد
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* BMI */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Weight className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-medium">شاخص توده بدنی (BMI)</h3>
                          </div>
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className={cn(
                                "bg-primary/5",
                                latestRecord.bmi < 18.5 ? "text-blue-500" :
                                latestRecord.bmi < 25 ? "text-green-500" :
                                latestRecord.bmi < 30 ? "text-yellow-500" :
                                "text-red-500"
                              )}
                            >
                              {latestRecord.bmi < 18.5 ? "کمبود وزن" :
                               latestRecord.bmi < 25 ? "طبیعی" :
                               latestRecord.bmi < 30 ? "اضافه وزن" :
                               "چاقی"}
                            </Badge>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>شاخص توده بدنی (BMI) از تقسیم وزن بر مجذور قد (به متر) محاسبه می‌شود و معیاری برای تخمین میزان چربی بدن است.</p>
                                  <div className="text-xs mt-2">
                                    <p className="text-blue-500">کمبود وزن: کمتر از 18.5</p>
                                    <p className="text-green-500">طبیعی: 18.5 تا 24.9</p>
                                    <p className="text-yellow-500">اضافه وزن: 25 تا 29.9</p>
                                    <p className="text-red-500">چاقی: 30 و بالاتر</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="relative pt-2">
                          <Progress
                            value={Math.min((latestRecord.bmi / 40) * 100, 100)}
                            className="h-2"
                          />
                          <div className="flex text-xs text-muted-foreground mt-1 justify-between">
                            <span>0</span>
                            <span className="absolute left-[18.5%] transform -translate-x-1/2">18.5</span>
                            <span className="absolute left-[25%] transform -translate-x-1/2">25</span>
                            <span className="absolute left-[30%] transform -translate-x-1/2">30</span>
                            <span>40+</span>
                          </div>
                          <div className="absolute left-0 right-0 flex justify-between mt-6 text-xs">
                            <div className={`text-blue-500 ${latestRecord.bmi >= 18.5 ? 'opacity-50' : ''}`}>کمبود وزن</div>
                            <div className={`text-green-500 ${latestRecord.bmi < 18.5 || latestRecord.bmi >= 25 ? 'opacity-50' : ''}`}>طبیعی</div>
                            <div className={`text-yellow-500 ${latestRecord.bmi < 25 || latestRecord.bmi >= 30 ? 'opacity-50' : ''}`}>اضافه وزن</div>
                            <div className={`text-red-500 ${latestRecord.bmi < 30 ? 'opacity-50' : ''}`}>چاقی</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-8 pt-4">
                          <span className="text-sm text-muted-foreground">مقدار فعلی: {toPersianDigits(latestRecord.bmi)}</span>
                          <span className="text-sm text-muted-foreground">محدوده ایده‌آل: 18.5 - 24.9</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Body Fat */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-muted-foreground" />
                            <h3 className="font-medium">درصد چربی بدن</h3>
                          </div>
                          <div className="flex items-center">
                            <Badge
                              variant="outline"
                              className={cn(
                                "bg-primary/5",
                                gender === "male" ? (
                                  latestRecord.bodyFatPercentage < 5 ? "text-blue-500" :
                                  latestRecord.bodyFatPercentage < 13 ? "text-green-500" :
                                  latestRecord.bodyFatPercentage < 17 ? "text-teal-500" :
                                  latestRecord.bodyFatPercentage < 25 ? "text-yellow-500" :
                                  "text-red-500"
                                ) : (
                                  latestRecord.bodyFatPercentage < 13 ? "text-blue-500" :
                                  latestRecord.bodyFatPercentage < 20 ? "text-green-500" :
                                  latestRecord.bodyFatPercentage < 24 ? "text-teal-500" :
                                  latestRecord.bodyFatPercentage < 31 ? "text-yellow-500" :
                                  "text-red-500"
                                )
                              )}
                            >
                              {gender === "male" ? (
                                latestRecord.bodyFatPercentage < 5 ? "ضروری" :
                                latestRecord.bodyFatPercentage < 13 ? "ورزشکاری" :
                                latestRecord.bodyFatPercentage < 17 ? "تناسب اندام" :
                                latestRecord.bodyFatPercentage < 25 ? "طبیعی" :
                                "چاقی"
                              ) : (
                                latestRecord.bodyFatPercentage < 13 ? "ضروری" :
                                latestRecord.bodyFatPercentage < 20 ? "ورزشکاری" :
                                latestRecord.bodyFatPercentage < 24 ? "تناسب اندام" :
                                latestRecord.bodyFatPercentage < 31 ? "طبیعی" :
                                "چاقی"
                              )}
                            </Badge>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 ml-2 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                  <p>درصد چربی بدن نشان‌دهنده نسبت بافت چربی به وزن کل بدن است.</p>
                                  <div className="text-xs mt-2">
                                    {gender === "male" ? (
                                      <>
                                        <p className="text-blue-500">ضروری: 2-5%</p>
                                        <p className="text-green-500">ورزشکاری: 5-13%</p>
                                        <p className="text-teal-500">تناسب اندام: 13-17%</p>
                                        <p className="text-yellow-500">طبیعی: 17-25%</p>
                                        <p className="text-red-500">چاقی: بیش از 25%</p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-blue-500">ضروری: 10-13%</p>
                                        <p className="text-green-500">ورزشکاری: 13-20%</p>
                                        <p className="text-teal-500">تناسب اندام: 20-24%</p>
                                        <p className="text-yellow-500">طبیعی: 24-31%</p>
                                        <p className="text-red-500">چاقی: بیش از 31%</p>
                                      </>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="relative pt-2">
                          <Progress
                            value={Math.min((latestRecord.bodyFatPercentage / 50) * 100, 100)}
                            className="h-2"
                          />
                          <div className="absolute left-0 right-0 flex justify-between mt-6 text-xs">
                            {gender === "male" ? (
                              <>
                                <div className={`text-blue-500 ${latestRecord.bodyFatPercentage >= 5 ? 'opacity-50' : ''}`}>ضروری</div>
                                <div className={`text-green-500 ${latestRecord.bodyFatPercentage < 5 || latestRecord.bodyFatPercentage >= 13 ? 'opacity-50' : ''}`}>ورزشکاری</div>
                                <div className={`text-teal-500 ${latestRecord.bodyFatPercentage < 13 || latestRecord.bodyFatPercentage >= 17 ? 'opacity-50' : ''}`}>تناسب اندام</div>
                                <div className={`text-yellow-500 ${latestRecord.bodyFatPercentage < 17 || latestRecord.bodyFatPercentage >= 25 ? 'opacity-50' : ''}`}>طبیعی</div>
                                <div className={`text-red-500 ${latestRecord.bodyFatPercentage < 25 ? 'opacity-50' : ''}`}>چاقی</div>
                              </>
                            ) : (
                              <>
                                <div className={`text-blue-500 ${latestRecord.bodyFatPercentage >= 13 ? 'opacity-50' : ''}`}>ضروری</div>
                                <div className={`text-green-500 ${latestRecord.bodyFatPercentage < 13 || latestRecord.bodyFatPercentage >= 20 ? 'opacity-50' : ''}`}>ورزشکاری</div>
                                <div className={`text-teal-500 ${latestRecord.bodyFatPercentage < 20 || latestRecord.bodyFatPercentage >= 24 ? 'opacity-50' : ''}`}>تناسب اندام</div>
                                <div className={`text-yellow-500 ${latestRecord.bodyFatPercentage < 24 || latestRecord.bodyFatPercentage >= 31 ? 'opacity-50' : ''}`}>طبیعی</div>
                                <div className={`text-red-500 ${latestRecord.bodyFatPercentage < 31 ? 'opacity-50' : ''}`}>چاقی</div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-8 pt-4">
                          <span className="text-sm text-muted-foreground">مقدار فعلی: {toPersianDigits(latestRecord.bodyFatPercentage)}%</span>
                          <span className="text-sm text-muted-foreground">
                            محدوده ایده‌آل: {gender === "male" ? "13-17%" : "20-24%"}
                          </span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* More metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Muscle Mass */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Zap className="h-5 w-5 text-muted-foreground" />
                              <h3 className="font-medium">توده عضلانی</h3>
                            </div>
                            <Badge variant="outline" className="bg-success/10 text-success-foreground">
                              مطلوب
                            </Badge>
                          </div>
                          <Progress value={75} className="h-2" />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-muted-foreground">
                              {toPersianDigits(latestRecord.muscleMass)} کیلوگرم
                            </span>
                            {changes?.muscleMass && (
                              <Badge 
                                variant={changes.muscleMass.status === "positive" ? "success" : "destructive"}
                                className="text-xs"
                              >
                                {changes.muscleMass.status === "positive" ? "+" : "-"}
                                {toPersianDigits(changes.muscleMass.diff)} کیلوگرم
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Visceral Fat */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Activity className="h-5 w-5 text-muted-foreground" />
                              <h3 className="font-medium">چربی احشایی</h3>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "bg-primary/5",
                                latestRecord.visceralFat < 10 ? "text-green-500" :
                                latestRecord.visceralFat < 15 ? "text-yellow-500" :
                                "text-red-500"
                              )}
                            >
                              {latestRecord.visceralFat < 10 ? "سالم" :
                               latestRecord.visceralFat < 15 ? "بالا" :
                               "ناسالم"}
                            </Badge>
                          </div>
                          <Progress 
                            value={(latestRecord.visceralFat / 30) * 100} 
                            className="h-2"
                          />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-muted-foreground">
                              سطح {toPersianDigits(latestRecord.visceralFat)}
                            </span>
                            {changes?.visceralFat && (
                              <Badge 
                                variant={changes.visceralFat.status === "positive" ? "success" : "destructive"}
                                className="text-xs"
                              >
                                {changes.visceralFat.status === "positive" ? "-" : "+"}
                                {toPersianDigits(changes.visceralFat.diff)} سطح
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Water Percentage */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Activity className="h-5 w-5 text-muted-foreground" />
                              <h3 className="font-medium">درصد آب بدن</h3>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "bg-primary/5",
                                gender === "male" ? (
                                  latestRecord.waterPercentage < 50 ? "text-yellow-500" :
                                  latestRecord.waterPercentage < 65 ? "text-green-500" :
                                  "text-blue-500"
                                ) : (
                                  latestRecord.waterPercentage < 45 ? "text-yellow-500" :
                                  latestRecord.waterPercentage < 60 ? "text-green-500" :
                                  "text-blue-500"
                                )
                              )}
                            >
                              {gender === "male" ? (
                                latestRecord.waterPercentage < 50 ? "پایین" :
                                latestRecord.waterPercentage < 65 ? "طبیعی" :
                                "بالا"
                              ) : (
                                latestRecord.waterPercentage < 45 ? "پایین" :
                                latestRecord.waterPercentage < 60 ? "طبیعی" :
                                "بالا"
                              )}
                            </Badge>
                          </div>
                          <Progress 
                            value={(latestRecord.waterPercentage / 75) * 100} 
                            className="h-2"
                          />
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-muted-foreground">
                              {toPersianDigits(latestRecord.waterPercentage)}%
                            </span>
                            {changes?.waterPercentage && (
                              <Badge 
                                variant={changes.waterPercentage.status === "positive" ? "success" : "destructive"}
                                className="text-xs"
                              >
                                {changes.waterPercentage.status === "positive" ? "+" : "-"}
                                {toPersianDigits(changes.waterPercentage.diff)}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {/* Metabolic Age */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Clock className="h-5 w-5 text-muted-foreground" />
                              <h3 className="font-medium">سن متابولیک</h3>
                            </div>
                            <Badge
                              variant="outline"
                              className={`bg-primary/5 ${latestRecord.metabolicAge > 30 ? "text-yellow-500" : "text-green-500"}`}
                            >
                              {latestRecord.metabolicAge <= 30 ? "جوان‌تر از سن تقویمی" : "بالاتر از سن تقویمی"}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-muted-foreground">
                              {toPersianDigits(latestRecord.metabolicAge)} سال
                            </span>
                            <span className="text-sm text-muted-foreground">
                              (سن تقویمی: {toPersianDigits(30)} سال)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* History Tab */}
            <TabsContent value="history" className="mt-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">تاریخچه اندازه‌گیری‌ها</CardTitle>
                    <CardDescription>
                      روند تغییرات ترکیب بدن در طول زمان
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-muted/30 rounded-lg flex items-center justify-center mb-6">
                      <div className="text-muted-foreground flex flex-col items-center">
                        <LineChart className="h-12 w-12 mb-2" />
                        <div className="text-sm text-center">
                          <p>نمودار روند تغییرات وزن و BMI</p>
                          <p className="text-xs">(در حال توسعه)</p>
                        </div>
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>تاریخ</TableHead>
                          <TableHead>وزن</TableHead>
                          <TableHead>BMI</TableHead>
                          <TableHead>چربی بدن</TableHead>
                          <TableHead>توده عضلانی</TableHead>
                          <TableHead>چربی احشایی</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {healthMetrics.metrics.map((record) => (
                          <TableRow 
                            key={record.id}
                            className={selectedRecord?.id === record.id ? "bg-primary/5" : undefined}
                            onClick={() => handleRecordSelect(record)}
                            style={{ cursor: "pointer" }}
                          >
                            <TableCell>{formatDate(new Date(record.date))}</TableCell>
                            <TableCell>{toPersianDigits(record.weight)} کیلوگرم</TableCell>
                            <TableCell>{toPersianDigits(record.bmi)}</TableCell>
                            <TableCell>{toPersianDigits(record.bodyFatPercentage)}%</TableCell>
                            <TableCell>{toPersianDigits(record.muscleMass)} کیلوگرم</TableCell>
                            <TableCell>سطح {toPersianDigits(record.visceralFat)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                {selectedRecord && (
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">جزئیات اندازه‌گیری {formatDate(new Date(selectedRecord.date))}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={clearSelectedRecord}>
                          <HelpCircle className="h-4 w-4 ml-2" />
                          <span>بستن</span>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">وزن</div>
                          <div className="text-lg font-medium mt-1">
                            {toPersianDigits(selectedRecord.weight)} کیلوگرم
                          </div>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">BMI</div>
                          <div className="text-lg font-medium mt-1">
                            {toPersianDigits(selectedRecord.bmi)}
                          </div>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">چربی بدن</div>
                          <div className="text-lg font-medium mt-1">
                            {toPersianDigits(selectedRecord.bodyFatPercentage)}%
                          </div>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">توده عضلانی</div>
                          <div className="text-lg font-medium mt-1">
                            {toPersianDigits(selectedRecord.muscleMass)} کیلوگرم
                          </div>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">تراکم استخوان</div>
                          <div className="text-lg font-medium mt-1">
                            {toPersianDigits(selectedRecord.boneDensity)} کیلوگرم
                          </div>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">درصد آب بدن</div>
                          <div className="text-lg font-medium mt-1">
                            {toPersianDigits(selectedRecord.waterPercentage)}%
                          </div>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">چربی احشایی</div>
                          <div className="text-lg font-medium mt-1">
                            سطح {toPersianDigits(selectedRecord.visceralFat)}
                          </div>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">سن متابولیک</div>
                          <div className="text-lg font-medium mt-1">
                            {toPersianDigits(selectedRecord.metabolicAge)} سال
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                        <h4 className="font-medium mb-2">توضیحات و توصیه‌ها</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedRecord.id === latestRecord.id ? (
                            "این آخرین اندازه‌گیری شما است. ترکیب بدن شما از آخرین اندازه‌گیری بهبود یافته است. ادامه برنامه تمرینی و تغذیه کنونی توصیه می‌شود."
                          ) : (
                            "این اندازه‌گیری مربوط به گذشته است. برای مشاهده وضعیت فعلی خود به آخرین اندازه‌گیری مراجعه کنید."
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            {/* Compare Tab */}
            <TabsContent value="compare" className="mt-0">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">مقایسه اندازه‌گیری‌ها</CardTitle>
                    <CardDescription>
                      مقایسه دو اندازه‌گیری برای بررسی پیشرفت
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">اندازه‌گیری فعلی</h3>
                          <Badge variant="outline">{formatDate(new Date(healthMetrics.metrics[0].date))}</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">وزن</span>
                            <span className="font-medium">
                              {toPersianDigits(healthMetrics.metrics[0].weight)} کیلوگرم
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">BMI</span>
                            <span className="font-medium">
                              {toPersianDigits(healthMetrics.metrics[0].bmi)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">چربی بدن</span>
                            <span className="font-medium">
                              {toPersianDigits(healthMetrics.metrics[0].bodyFatPercentage)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">توده عضلانی</span>
                            <span className="font-medium">
                              {toPersianDigits(healthMetrics.metrics[0].muscleMass)} کیلوگرم
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">چربی احشایی</span>
                            <span className="font-medium">
                              سطح {toPersianDigits(healthMetrics.metrics[0].visceralFat)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">اندازه‌گیری قبلی</h3>
                          <Badge variant="outline">{formatDate(new Date(healthMetrics.metrics[3].date))}</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">وزن</span>
                            <span className="font-medium">
                              {toPersianDigits(healthMetrics.metrics[3].weight)} کیلوگرم
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">BMI</span>
                            <span className="font-medium">
                              {toPersianDigits(healthMetrics.metrics[3].bmi)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">چربی بدن</span>
                            <span className="font-medium">
                              {toPersianDigits(healthMetrics.metrics[3].bodyFatPercentage)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">توده عضلانی</span>
                            <span className="font-medium">
                              {toPersianDigits(healthMetrics.metrics[3].muscleMass)} کیلوگرم
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">چربی احشایی</span>
                            <span className="font-medium">
                              سطح {toPersianDigits(healthMetrics.metrics[3].visceralFat)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-medium">تغییرات</h3>
                          <Badge variant="outline">بازه {toPersianDigits(3)} ماهه</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">وزن</span>
                            <Badge 
                              variant="outline" 
                              className={healthMetrics.metrics[0].weight < healthMetrics.metrics[3].weight ? "bg-success/10 text-success-foreground" : "bg-destructive/10 text-destructive-foreground"}
                            >
                              {healthMetrics.metrics[0].weight < healthMetrics.metrics[3].weight ? "-" : "+"}
                              {toPersianDigits(Math.abs(healthMetrics.metrics[0].weight - healthMetrics.metrics[3].weight).toFixed(1))} کیلوگرم
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">BMI</span>
                            <Badge 
                              variant="outline" 
                              className={healthMetrics.metrics[0].bmi < healthMetrics.metrics[3].bmi ? "bg-success/10 text-success-foreground" : "bg-destructive/10 text-destructive-foreground"}
                            >
                              {healthMetrics.metrics[0].bmi < healthMetrics.metrics[3].bmi ? "-" : "+"}
                              {toPersianDigits(Math.abs(healthMetrics.metrics[0].bmi - healthMetrics.metrics[3].bmi).toFixed(1))}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">چربی بدن</span>
                            <Badge 
                              variant="outline" 
                              className={healthMetrics.metrics[0].bodyFatPercentage < healthMetrics.metrics[3].bodyFatPercentage ? "bg-success/10 text-success-foreground" : "bg-destructive/10 text-destructive-foreground"}
                            >
                              {healthMetrics.metrics[0].bodyFatPercentage < healthMetrics.metrics[3].bodyFatPercentage ? "-" : "+"}
                              {toPersianDigits(Math.abs(healthMetrics.metrics[0].bodyFatPercentage - healthMetrics.metrics[3].bodyFatPercentage).toFixed(1))}%
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">توده عضلانی</span>
                            <Badge 
                              variant="outline" 
                              className={healthMetrics.metrics[0].muscleMass > healthMetrics.metrics[3].muscleMass ? "bg-success/10 text-success-foreground" : "bg-destructive/10 text-destructive-foreground"}
                            >
                              {healthMetrics.metrics[0].muscleMass > healthMetrics.metrics[3].muscleMass ? "+" : "-"}
                              {toPersianDigits(Math.abs(healthMetrics.metrics[0].muscleMass - healthMetrics.metrics[3].muscleMass).toFixed(1))} کیلوگرم
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                            <span className="text-sm">چربی احشایی</span>
                            <Badge 
                              variant="outline" 
                              className={healthMetrics.metrics[0].visceralFat < healthMetrics.metrics[3].visceralFat ? "bg-success/10 text-success-foreground" : "bg-destructive/10 text-destructive-foreground"}
                            >
                              {healthMetrics.metrics[0].visceralFat < healthMetrics.metrics[3].visceralFat ? "-" : "+"}
                              {toPersianDigits(Math.abs(healthMetrics.metrics[0].visceralFat - healthMetrics.metrics[3].visceralFat))} سطح
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">تحلیل تغییرات</h3>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          در بازه {toPersianDigits(3)} ماهه‌ی اخیر، شما به طور کلی {toPersianDigits(5.1)} کیلوگرم کاهش وزن داشته‌اید که عمدتاً از کاهش {toPersianDigits(4.1)}% چربی بدن نشأت گرفته است. توده عضلانی شما نیز {toPersianDigits(2.9)} کیلوگرم افزایش یافته است که نشان‌دهنده پیشرفت مثبت در ترکیب بدن شما است.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-success/10 text-success-foreground p-3 rounded-lg text-center">
                            <div className="text-xl font-bold">{toPersianDigits(5.1)}-</div>
                            <div className="text-sm">کیلوگرم کاهش وزن</div>
                          </div>
                          <div className="bg-success/10 text-success-foreground p-3 rounded-lg text-center">
                            <div className="text-xl font-bold">{toPersianDigits(4.1)}-</div>
                            <div className="text-sm">درصد کاهش چربی</div>
                          </div>
                          <div className="bg-success/10 text-success-foreground p-3 rounded-lg text-center">
                            <div className="text-xl font-bold">{toPersianDigits(2.9)}+</div>
                            <div className="text-sm">کیلوگرم افزایش عضله</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Analysis Tab */}
            <TabsContent value="analysis" className="mt-0">
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                <div className="flex flex-col items-center gap-2 text-center">
                  <AreaChart className="h-12 w-12" />
                  <h3 className="text-lg font-medium">در حال آماده‌سازی تحلیل پیشرفته</h3>
                  <p className="max-w-md">این بخش در حال توسعه است و به زودی با امکانات تحلیل پیشرفته و هوش مصنوعی فعال خواهد شد</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="mt-0">
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                <div className="flex flex-col items-center gap-2 text-center">
                  <FileText className="h-12 w-12" />
                  <h3 className="text-lg font-medium">در حال آماده‌سازی توصیه‌های تخصصی</h3>
                  <p className="max-w-md">این بخش در حال توسعه است و به زودی با توصیه‌های تخصصی مبتنی بر وضعیت شما فعال خواهد شد</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 bg-background backdrop-blur-md rounded-xl border shadow-md p-8">
          <div className="text-muted-foreground">
            <User className="h-16 w-16" />
          </div>
          <h2 className="text-2xl font-bold">داده‌ای یافت نشد</h2>
          <p className="text-muted-foreground text-center max-w-md">
            هنوز هیچ داده‌ای برای ترکیب بدن شما ثبت نشده است. برای شروع، اندازه‌گیری جدیدی ثبت کنید.
          </p>
          <Dialog open={measurementDialogOpen} onOpenChange={setMeasurementDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>ثبت اولین اندازه‌گیری</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              {/* Dialog content copied from above */}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}