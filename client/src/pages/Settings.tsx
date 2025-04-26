import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  Bell,
  Settings,
  Shield,
  User,
  Lock,
  Eye,
  Clock,
  Globe,
  Palette,
  Moon,
  SunMedium,
  AlarmClock,
  BellOff,
  Wifi,
  WifiOff,
  FileText,
  Languages,
  HelpCircle,
  TrendingUp,
  Database,
  Share2,
  Vibrate,
  Smartphone,
  Laptop,
  RefreshCw,
} from "lucide-react";

// عناصر برای بخش تقویم و زمان بندی
const availableTimezones = [
  { value: "Asia/Tehran", label: "تهران (GMT+03:30)" },
  { value: "Asia/Dubai", label: "دبی (GMT+04:00)" },
  { value: "Asia/Kabul", label: "کابل (GMT+04:30)" },
  { value: "Europe/Istanbul", label: "استانبول (GMT+03:00)" },
  { value: "Europe/Paris", label: "پاریس (GMT+01:00)" },
  { value: "America/New_York", label: "نیویورک (GMT-05:00)" },
];

const workHours = [
  { value: "8-16", label: "۸ الی ۱۶" },
  { value: "9-17", label: "۹ الی ۱۷" },
  { value: "10-18", label: "۱۰ الی ۱۸" },
  { value: "custom", label: "سفارشی" },
];

const languages = [
  { value: "fa", label: "فارسی" },
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
  { value: "tr", label: "Türkçe" },
];

const themes = [
  { value: "light", label: "روشن", icon: <SunMedium className="h-4 w-4 ml-2" /> },
  { value: "dark", label: "تیره", icon: <Moon className="h-4 w-4 ml-2" /> },
  { value: "system", label: "سیستم", icon: <Laptop className="h-4 w-4 ml-2" /> },
];

// بخش تنظیمات مربوط به سلامتی
const healthGoalOptions = [
  { value: "balance", label: "تعادل کار و زندگی" },
  { value: "activity", label: "افزایش فعالیت روزانه" },
  { value: "stress", label: "کاهش استرس" },
  { value: "sleep", label: "بهبود خواب" },
  { value: "posture", label: "بهبود وضعیت بدنی" },
];

const reminderIntervals = [
  { value: "15", label: "هر ۱۵ دقیقه" },
  { value: "30", label: "هر ۳۰ دقیقه" },
  { value: "60", label: "هر ۱ ساعت" },
  { value: "120", label: "هر ۲ ساعت" },
];

export default function SettingsPage() {
  const { toast } = useToast();
  
  // General settings
  const [language, setLanguage] = useState("fa");
  const [theme, setTheme] = useState<string>("system");
  const [fontSize, setFontSize] = useState<number>(16);
  
  // Notification settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [desktopAlerts, setDesktopAlerts] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);

  // Privacy settings
  const [showOnLeaderboard, setShowOnLeaderboard] = useState(true);
  const [shareHealthStats, setShareHealthStats] = useState(true);
  const [allowDataAnalysis, setAllowDataAnalysis] = useState(true);
  const [showActivityStatus, setShowActivityStatus] = useState(true);
  
  // Health reminders
  const [waterReminderEnabled, setWaterReminderEnabled] = useState(true);
  const [exerciseReminderEnabled, setExerciseReminderEnabled] = useState(true);
  const [eyeRestReminderEnabled, setEyeRestReminderEnabled] = useState(true);
  const [postureReminderEnabled, setPostureReminderEnabled] = useState(true);
  const [reminderInterval, setReminderInterval] = useState("60");
  const [healthGoal, setHealthGoal] = useState("balance");
  
  // Work schedule
  const [workSchedule, setWorkSchedule] = useState("9-17");
  const [timezone, setTimezone] = useState("Asia/Tehran");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [workDays, setWorkDays] = useState(["1", "2", "3", "4", "5"]);
  
  // Calendar synchronization
  const [syncCalendar, setSyncCalendar] = useState(false);
  const [reminderBeforeEvents, setReminderBeforeEvents] = useState(true);
  const [defaultEventDuration, setDefaultEventDuration] = useState(60);
  
  // Device settings
  const [offlineMode, setOfflineMode] = useState(false);
  const [dataSaving, setDataSaving] = useState(false);
  const [reducedAnimations, setReducedAnimations] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  
  // Notes & Tasks settings
  const [defaultNote, setDefaultNote] = useState("");
  const [autosaveNotes, setAutosaveNotes] = useState(true);
  const [reminderForTasks, setReminderForTasks] = useState(true);
  
  // Theme settings
  const [primaryColor, setPrimaryColor] = useState("#10B981");
  const [borderRadius, setBorderRadius] = useState<number>(8);
  
  // Update theme on change
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  
  // Save settings
  const saveSettings = () => {
    // تنظیمات را در localStorage ذخیره می‌کنیم
    const settings = {
      general: { language, theme, fontSize },
      notifications: { pushNotifications, emailNotifications, soundEffects, vibration, desktopAlerts, achievementAlerts },
      privacy: { showOnLeaderboard, shareHealthStats, allowDataAnalysis, showActivityStatus },
      health: { waterReminderEnabled, exerciseReminderEnabled, eyeRestReminderEnabled, postureReminderEnabled, reminderInterval, healthGoal },
      work: { workSchedule, timezone, startTime, endTime, workDays },
      calendar: { syncCalendar, reminderBeforeEvents, defaultEventDuration },
      device: { offlineMode, dataSaving, reducedAnimations, autoSync },
      notes: { defaultNote, autosaveNotes, reminderForTasks },
      theme: { primaryColor, borderRadius }
    };
    
    localStorage.setItem("userSettings", JSON.stringify(settings));
    
    toast({
      title: "تنظیمات ذخیره شد",
      description: "تنظیمات شما با موفقیت ذخیره شد",
      variant: "success",
    });
  };
  
  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        
        // Load general settings
        setLanguage(settings.general.language || "fa");
        setTheme(settings.general.theme || "system");
        setFontSize(settings.general.fontSize || 16);
        
        // Load notification settings
        setPushNotifications(settings.notifications.pushNotifications);
        setEmailNotifications(settings.notifications.emailNotifications);
        setSoundEffects(settings.notifications.soundEffects);
        setVibration(settings.notifications.vibration);
        setDesktopAlerts(settings.notifications.desktopAlerts);
        setAchievementAlerts(settings.notifications.achievementAlerts);
        
        // Load privacy settings
        setShowOnLeaderboard(settings.privacy.showOnLeaderboard);
        setShareHealthStats(settings.privacy.shareHealthStats);
        setAllowDataAnalysis(settings.privacy.allowDataAnalysis);
        setShowActivityStatus(settings.privacy.showActivityStatus);
        
        // Load health reminder settings
        setWaterReminderEnabled(settings.health.waterReminderEnabled);
        setExerciseReminderEnabled(settings.health.exerciseReminderEnabled);
        setEyeRestReminderEnabled(settings.health.eyeRestReminderEnabled);
        setPostureReminderEnabled(settings.health.postureReminderEnabled);
        setReminderInterval(settings.health.reminderInterval || "60");
        setHealthGoal(settings.health.healthGoal || "balance");
        
        // Load work schedule settings
        setWorkSchedule(settings.work.workSchedule || "9-17");
        setTimezone(settings.work.timezone || "Asia/Tehran");
        setStartTime(settings.work.startTime || "09:00");
        setEndTime(settings.work.endTime || "17:00");
        setWorkDays(settings.work.workDays || ["1", "2", "3", "4", "5"]);
        
        // Load calendar settings
        setSyncCalendar(settings.calendar.syncCalendar);
        setReminderBeforeEvents(settings.calendar.reminderBeforeEvents);
        setDefaultEventDuration(settings.calendar.defaultEventDuration || 60);
        
        // Load device settings
        setOfflineMode(settings.device.offlineMode);
        setDataSaving(settings.device.dataSaving);
        setReducedAnimations(settings.device.reducedAnimations);
        setAutoSync(settings.device.autoSync);
        
        // Load notes settings
        setDefaultNote(settings.notes.defaultNote || "");
        setAutosaveNotes(settings.notes.autosaveNotes);
        setReminderForTasks(settings.notes.reminderForTasks);
        
        // Load theme settings
        setPrimaryColor(settings.theme.primaryColor || "#10B981");
        setBorderRadius(settings.theme.borderRadius || 8);
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);
  
  // Toggle work days
  const toggleWorkDay = (day: string) => {
    if (workDays.includes(day)) {
      setWorkDays(workDays.filter(d => d !== day));
    } else {
      setWorkDays([...workDays, day]);
    }
  };
  
  // Reset all settings
  const resetSettings = () => {
    setLanguage("fa");
    setTheme("system");
    setFontSize(16);
    
    setPushNotifications(true);
    setEmailNotifications(true);
    setSoundEffects(true);
    setVibration(true);
    setDesktopAlerts(true);
    setAchievementAlerts(true);
    
    setShowOnLeaderboard(true);
    setShareHealthStats(true);
    setAllowDataAnalysis(true);
    setShowActivityStatus(true);
    
    setWaterReminderEnabled(true);
    setExerciseReminderEnabled(true);
    setEyeRestReminderEnabled(true);
    setPostureReminderEnabled(true);
    setReminderInterval("60");
    setHealthGoal("balance");
    
    setWorkSchedule("9-17");
    setTimezone("Asia/Tehran");
    setStartTime("09:00");
    setEndTime("17:00");
    setWorkDays(["1", "2", "3", "4", "5"]);
    
    setSyncCalendar(false);
    setReminderBeforeEvents(true);
    setDefaultEventDuration(60);
    
    setOfflineMode(false);
    setDataSaving(false);
    setReducedAnimations(false);
    setAutoSync(true);
    
    setDefaultNote("");
    setAutosaveNotes(true);
    setReminderForTasks(true);
    
    setPrimaryColor("#10B981");
    setBorderRadius(8);
    
    localStorage.removeItem("userSettings");
    
    toast({
      title: "تنظیمات بازنشانی شد",
      description: "تمام تنظیمات به حالت پیش‌فرض بازگشت",
      variant: "default",
    });
  };

  // Handle export settings
  const exportSettings = () => {
    const settings = {
      general: { language, theme, fontSize },
      notifications: { pushNotifications, emailNotifications, soundEffects, vibration, desktopAlerts, achievementAlerts },
      privacy: { showOnLeaderboard, shareHealthStats, allowDataAnalysis, showActivityStatus },
      health: { waterReminderEnabled, exerciseReminderEnabled, eyeRestReminderEnabled, postureReminderEnabled, reminderInterval, healthGoal },
      work: { workSchedule, timezone, startTime, endTime, workDays },
      calendar: { syncCalendar, reminderBeforeEvents, defaultEventDuration },
      device: { offlineMode, dataSaving, reducedAnimations, autoSync },
      notes: { defaultNote, autosaveNotes, reminderForTasks },
      theme: { primaryColor, borderRadius }
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "prana-settings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast({
      title: "تنظیمات صادر شد",
      description: "فایل تنظیمات با موفقیت دانلود شد",
      variant: "success",
    });
  };
  
  // Handle import settings
  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        
        // تنظیمات را در state بارگذاری می‌کنیم
        // (مشابه کد useEffect برای بارگذاری تنظیمات)
        
        localStorage.setItem("userSettings", JSON.stringify(settings));
        
        toast({
          title: "تنظیمات وارد شد",
          description: "تنظیمات با موفقیت بارگذاری شد",
          variant: "success",
        });
        
        // Reload page to apply all settings
        window.location.reload();
      } catch (error) {
        toast({
          title: "خطا در وارد کردن تنظیمات",
          description: "فایل تنظیمات معتبر نیست",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="flex items-center mb-6">
        <Settings className="w-6 h-6 ml-2 text-tiffany" />
        <h1 className="text-2xl font-bold">تنظیمات کاربری</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8 md:grid-cols-9">
          <TabsTrigger value="general" className="text-xs md:text-sm">
            <Settings className="w-4 h-4 ml-1 hidden md:block" />
            عمومی
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs md:text-sm">
            <Bell className="w-4 h-4 ml-1 hidden md:block" />
            اعلان‌ها
          </TabsTrigger>
          <TabsTrigger value="privacy" className="text-xs md:text-sm">
            <Shield className="w-4 h-4 ml-1 hidden md:block" />
            حریم خصوصی
          </TabsTrigger>
          <TabsTrigger value="health" className="text-xs md:text-sm">
            <Heart className="w-4 h-4 ml-1 hidden md:block" />
            سلامتی
          </TabsTrigger>
          <TabsTrigger value="work" className="text-xs md:text-sm">
            <Clock className="w-4 h-4 ml-1 hidden md:block" />
            زمان‌بندی کاری
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-xs md:text-sm">
            <FileText className="w-4 h-4 ml-1 hidden md:block" />
            یادداشت‌ها
          </TabsTrigger>
          <TabsTrigger value="device" className="text-xs md:text-sm">
            <Smartphone className="w-4 h-4 ml-1 hidden md:block" />
            دستگاه
          </TabsTrigger>
          <TabsTrigger value="theme" className="text-xs md:text-sm">
            <Palette className="w-4 h-4 ml-1 hidden md:block" />
            ظاهر
          </TabsTrigger>
          <TabsTrigger value="about" className="text-xs md:text-sm">
            <HelpCircle className="w-4 h-4 ml-1 hidden md:block" />
            درباره
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Settings className="w-5 h-5 ml-2 text-tiffany" />
              تنظیمات عمومی
            </h2>
            
            <div className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>زبان</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب زبان" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 ml-2" />
                            {lang.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>حالت نمایش</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب تم" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map(themeOption => (
                        <SelectItem key={themeOption.value} value={themeOption.value}>
                          <div className="flex items-center">
                            {themeOption.icon}
                            {themeOption.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>اندازه متن ({fontSize}px)</Label>
                    <span className="text-sm text-slate-500">{fontSize < 14 ? 'کوچک' : fontSize > 18 ? 'بزرگ' : 'متوسط'}</span>
                  </div>
                  <Slider
                    min={12}
                    max={24}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(values) => setFontSize(values[0])}
                  />
                </div>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Database className="w-5 h-5 ml-2 text-tiffany" />
              مدیریت داده‌ها
            </h2>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Button onClick={exportSettings} variant="outline" className="w-full">
                <Share2 className="w-4 h-4 ml-2" />
                صدور تنظیمات
              </Button>
              
              <div className="relative">
                <Button variant="outline" className="w-full">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importSettings}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <RefreshCw className="w-4 h-4 ml-2" />
                  ورود تنظیمات
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <Button onClick={resetSettings} variant="destructive" className="w-full">
                بازنشانی تمام تنظیمات
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Bell className="w-5 h-5 ml-2 text-tiffany" />
              تنظیمات اعلان‌ها
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>اعلان‌های پوش</Label>
                  <p className="text-xs text-slate-500">
                    نمایش اعلان‌ها در گوشه صفحه
                  </p>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>اعلان‌های ایمیلی</Label>
                  <p className="text-xs text-slate-500">
                    دریافت اعلان‌های مهم از طریق ایمیل
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>صدای اعلان‌ها</Label>
                  <p className="text-xs text-slate-500">
                    پخش صدا هنگام دریافت اعلان
                  </p>
                </div>
                <Switch
                  checked={soundEffects}
                  onCheckedChange={setSoundEffects}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ویبره</Label>
                  <p className="text-xs text-slate-500">
                    ویبره هنگام دریافت اعلان (در دستگاه‌های موبایل)
                  </p>
                </div>
                <Switch
                  checked={vibration}
                  onCheckedChange={setVibration}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>اعلان‌های دسکتاپ</Label>
                  <p className="text-xs text-slate-500">
                    نمایش اعلان‌ها در سیستم عامل
                  </p>
                </div>
                <Switch
                  checked={desktopAlerts}
                  onCheckedChange={setDesktopAlerts}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>اعلان دستاوردها</Label>
                  <p className="text-xs text-slate-500">
                    نمایش اعلان هنگام کسب دستاورد جدید
                  </p>
                </div>
                <Switch
                  checked={achievementAlerts}
                  onCheckedChange={setAchievementAlerts}
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Shield className="w-5 h-5 ml-2 text-tiffany" />
              تنظیمات حریم خصوصی
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>نمایش در لیدربورد</Label>
                  <p className="text-xs text-slate-500">
                    امتیازات شما در جدول امتیازات نمایش داده شود
                  </p>
                </div>
                <Switch
                  checked={showOnLeaderboard}
                  onCheckedChange={setShowOnLeaderboard}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>اشتراک آمار سلامتی</Label>
                  <p className="text-xs text-slate-500">
                    به اشتراک گذاری آمار سلامتی با تیم مدیریت
                  </p>
                </div>
                <Switch
                  checked={shareHealthStats}
                  onCheckedChange={setShareHealthStats}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تحلیل داده‌ها</Label>
                  <p className="text-xs text-slate-500">
                    اجازه تحلیل داده‌های کاربری برای پیشنهادات بهتر
                  </p>
                </div>
                <Switch
                  checked={allowDataAnalysis}
                  onCheckedChange={setAllowDataAnalysis}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>نمایش وضعیت آنلاین</Label>
                  <p className="text-xs text-slate-500">
                    نمایش وضعیت فعالیت شما به سایر کاربران
                  </p>
                </div>
                <Switch
                  checked={showActivityStatus}
                  onCheckedChange={setShowActivityStatus}
                />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Lock className="w-5 h-5 ml-2 text-tiffany" />
              امنیت حساب کاربری
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>تغییر رمز عبور</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Input type="password" placeholder="رمز عبور فعلی" />
                  </div>
                  <div>
                    <Input type="password" placeholder="رمز عبور جدید" />
                  </div>
                </div>
                <Button className="mt-2" variant="outline">تغییر رمز عبور</Button>
              </div>
              
              <div className="pt-2">
                <Button variant="destructive">حذف حساب کاربری</Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
        
        {/* Health Settings */}
        <TabsContent value="health">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Heart className="w-5 h-5 ml-2 text-tiffany" />
              تنظیمات سلامتی
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>هدف اصلی سلامتی</Label>
                <Select value={healthGoal} onValueChange={setHealthGoal}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب هدف" />
                  </SelectTrigger>
                  <SelectContent>
                    {healthGoalOptions.map(goal => (
                      <SelectItem key={goal.value} value={goal.value}>
                        {goal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>فاصله یادآوری‌ها</Label>
                <Select value={reminderInterval} onValueChange={setReminderInterval}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب فاصله" />
                  </SelectTrigger>
                  <SelectContent>
                    {reminderIntervals.map(interval => (
                      <SelectItem key={interval.value} value={interval.value}>
                        {interval.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label>یادآوری‌های فعال</Label>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">یادآوری آب</div>
                    <p className="text-xs text-slate-500">
                      یادآوری نوشیدن آب در فواصل منظم
                    </p>
                  </div>
                  <Switch
                    checked={waterReminderEnabled}
                    onCheckedChange={setWaterReminderEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">یادآوری تمرین</div>
                    <p className="text-xs text-slate-500">
                      یادآوری انجام تمرینات کششی و ورزش
                    </p>
                  </div>
                  <Switch
                    checked={exerciseReminderEnabled}
                    onCheckedChange={setExerciseReminderEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">استراحت چشم</div>
                    <p className="text-xs text-slate-500">
                      یادآوری استراحت چشم‌ها از نمایشگر
                    </p>
                  </div>
                  <Switch
                    checked={eyeRestReminderEnabled}
                    onCheckedChange={setEyeRestReminderEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">وضعیت بدنی</div>
                    <p className="text-xs text-slate-500">
                      یادآوری بررسی وضعیت نشستن و پوسچر بدن
                    </p>
                  </div>
                  <Switch
                    checked={postureReminderEnabled}
                    onCheckedChange={setPostureReminderEnabled}
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
        
        {/* Work Schedule Settings */}
        <TabsContent value="work">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Clock className="w-5 h-5 ml-2 text-tiffany" />
              زمان‌بندی کاری
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>منطقه زمانی</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب منطقه زمانی" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimezones.map(tz => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>ساعت کاری</Label>
                <Select value={workSchedule} onValueChange={setWorkSchedule}>
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب ساعت کاری" />
                  </SelectTrigger>
                  <SelectContent>
                    {workHours.map(hours => (
                      <SelectItem key={hours.value} value={hours.value}>
                        {hours.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {workSchedule === "custom" && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>ساعت شروع</Label>
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ساعت پایان</Label>
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>روزهای کاری</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "0", label: "یکشنبه" },
                    { id: "1", label: "دوشنبه" },
                    { id: "2", label: "سه‌شنبه" },
                    { id: "3", label: "چهارشنبه" },
                    { id: "4", label: "پنج‌شنبه" },
                    { id: "5", label: "جمعه" },
                    { id: "6", label: "شنبه" },
                  ].map((day) => (
                    <Button
                      key={day.id}
                      type="button"
                      variant={workDays.includes(day.id) ? "default" : "outline"}
                      className="text-xs"
                      onClick={() => toggleWorkDay(day.id)}
                    >
                      {day.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <CalendarIcon className="w-5 h-5 ml-2 text-tiffany" />
              تنظیمات تقویم
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>همگام‌سازی با تقویم</Label>
                  <p className="text-xs text-slate-500">
                    همگام‌سازی با تقویم گوگل یا Outlook
                  </p>
                </div>
                <Switch
                  checked={syncCalendar}
                  onCheckedChange={setSyncCalendar}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>یادآوری قبل از رویدادها</Label>
                  <p className="text-xs text-slate-500">
                    نمایش یادآوری قبل از شروع رویدادها
                  </p>
                </div>
                <Switch
                  checked={reminderBeforeEvents}
                  onCheckedChange={setReminderBeforeEvents}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>مدت پیش‌فرض رویداد (دقیقه)</Label>
                  <span className="text-sm text-slate-500">{defaultEventDuration} دقیقه</span>
                </div>
                <Slider
                  min={15}
                  max={120}
                  step={15}
                  value={[defaultEventDuration]}
                  onValueChange={(values) => setDefaultEventDuration(values[0])}
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>
        
        {/* Notes & Tasks Settings */}
        <TabsContent value="notes">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <FileText className="w-5 h-5 ml-2 text-tiffany" />
              یادداشت‌ها و کارها
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>ذخیره خودکار</Label>
                  <p className="text-xs text-slate-500">
                    ذخیره خودکار یادداشت‌ها حین تایپ
                  </p>
                </div>
                <Switch
                  checked={autosaveNotes}
                  onCheckedChange={setAutosaveNotes}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>یادآوری کارها</Label>
                  <p className="text-xs text-slate-500">
                    نمایش یادآوری برای کارهای نزدیک به سررسید
                  </p>
                </div>
                <Switch
                  checked={reminderForTasks}
                  onCheckedChange={setReminderForTasks}
                />
              </div>
              
              <div className="space-y-2">
                <Label>یادداشت پیش‌فرض</Label>
                <p className="text-xs text-slate-500 mb-2">
                  این یادداشت به صورت خودکار در یادداشت‌های جدید اضافه می‌شود
                </p>
                <Textarea
                  placeholder="یادداشت پیش‌فرض خود را وارد کنید..."
                  value={defaultNote}
                  onChange={(e) => setDefaultNote(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 ml-2 text-tiffany" />
              عملکرد روزانه
            </h2>
            
            <p className="text-sm text-slate-500 mb-4">
              برنامه‌ریزی روزانه و دنبال کردن کارها به شما کمک می‌کند تا بهره‌وری بالاتری داشته باشید.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                <h3 className="text-sm font-medium mb-2">برنامه‌ریزی روزانه</h3>
                <p className="text-xs text-slate-500">
                  صبح‌ها برنامه روز خود را مرور کنید و اولویت‌ها را مشخص کنید.
                </p>
              </div>
              
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                <h3 className="text-sm font-medium mb-2">بررسی عملکرد</h3>
                <p className="text-xs text-slate-500">
                  پایان روز، عملکرد خود را ارزیابی کنید و برای روز بعد برنامه‌ریزی کنید.
                </p>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
        
        {/* Device Settings */}
        <TabsContent value="device">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Smartphone className="w-5 h-5 ml-2 text-tiffany" />
              تنظیمات دستگاه
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>حالت آفلاین</Label>
                  <p className="text-xs text-slate-500">
                    استفاده از برنامه در حالت آفلاین
                  </p>
                </div>
                <Switch
                  checked={offlineMode}
                  onCheckedChange={(value) => {
                    setOfflineMode(value);
                    if (value) {
                      toast({
                        title: "حالت آفلاین فعال شد",
                        description: "برخی از ویژگی‌ها ممکن است در دسترس نباشند",
                        variant: "default",
                      });
                    }
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>صرفه‌جویی در مصرف داده</Label>
                  <p className="text-xs text-slate-500">
                    کاهش مصرف داده اینترنت
                  </p>
                </div>
                <Switch
                  checked={dataSaving}
                  onCheckedChange={setDataSaving}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>کاهش انیمیشن‌ها</Label>
                  <p className="text-xs text-slate-500">
                    کاهش انیمیشن‌ها برای عملکرد بهتر
                  </p>
                </div>
                <Switch
                  checked={reducedAnimations}
                  onCheckedChange={setReducedAnimations}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>همگام‌سازی خودکار</Label>
                  <p className="text-xs text-slate-500">
                    همگام‌سازی خودکار داده‌ها با سرور
                  </p>
                </div>
                <Switch
                  checked={autoSync}
                  onCheckedChange={setAutoSync}
                />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Vibrate className="w-5 h-5 ml-2 text-tiffany" />
              اتصال دستگاه‌های سلامتی
            </h2>
            
            <p className="text-sm text-slate-500 mb-4">
              برنامه پرانا می‌تواند به دستگاه‌های سلامتی هوشمند متصل شود و داده‌های سلامتی شما را به طور خودکار دریافت کند.
            </p>
            
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">ساعت هوشمند</h3>
                  <p className="text-xs text-slate-500">متصل نشده</p>
                </div>
                <Button variant="outline" size="sm">
                  <Wifi className="h-4 w-4 ml-1" />
                  اتصال
                </Button>
              </div>
              
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">دستبند سلامتی</h3>
                  <p className="text-xs text-slate-500">متصل نشده</p>
                </div>
                <Button variant="outline" size="sm">
                  <Wifi className="h-4 w-4 ml-1" />
                  اتصال
                </Button>
              </div>
              
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">ترازوی هوشمند</h3>
                  <p className="text-xs text-slate-500">متصل نشده</p>
                </div>
                <Button variant="outline" size="sm">
                  <Wifi className="h-4 w-4 ml-1" />
                  اتصال
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
        
        {/* Theme Settings */}
        <TabsContent value="theme">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Palette className="w-5 h-5 ml-2 text-tiffany" />
              تنظیمات ظاهری
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>رنگ اصلی</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                  <div className="col-span-1 flex items-center">
                    <div
                      className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    <span className="mr-3 text-sm">{primaryColor}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>گرد گوشه‌ها</Label>
                  <span className="text-sm text-slate-500">{borderRadius}px</span>
                </div>
                <Slider
                  min={0}
                  max={20}
                  step={1}
                  value={[borderRadius]}
                  onValueChange={(values) => setBorderRadius(values[0])}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>بدون گرد گوشه</span>
                  <span>کاملاً گرد</span>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label>پیش‌نمایش</Label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div
                    className="p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-center"
                    style={{ 
                      borderRadius: `${borderRadius}px`,
                      backgroundColor: primaryColor + "10",
                      borderColor: primaryColor + "30"
                    }}
                  >
                    <span className="font-medium" style={{ color: primaryColor }}>
                      نمونه متن
                    </span>
                  </div>
                  
                  <div
                    className="p-4 flex items-center justify-center"
                    style={{ 
                      borderRadius: `${borderRadius}px`,
                      backgroundColor: primaryColor,
                      color: "#ffffff"
                    }}
                  >
                    <span className="font-medium">
                      دکمه نمونه
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Eye className="w-5 h-5 ml-2 text-tiffany" />
              قابلیت‌های دسترسی
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>کنتراست متن</Label>
                  <span className="text-sm text-slate-500">متوسط</span>
                </div>
                <Slider
                  min={0}
                  max={2}
                  step={1}
                  value={[1]}
                  onValueChange={() => {}}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>کم</span>
                  <span>زیاد</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>متن خوانا‌تر</Label>
                  <p className="text-xs text-slate-500">
                    استفاده از فونت خواناتر برای خواندن بهتر
                  </p>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {}}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>حالت تمرکز</Label>
                  <p className="text-xs text-slate-500">
                    کاهش عناصر حواس‌پرت‌کننده در رابط کاربری
                  </p>
                </div>
                <Switch
                  checked={false}
                  onCheckedChange={() => {}}
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>
        
        {/* About System */}
        <TabsContent value="about">
          <GlassCard className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <HelpCircle className="w-5 h-5 ml-2 text-tiffany" />
              درباره سیستم
            </h2>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center text-center mb-6">
                <div className="w-20 h-20 mb-4 bg-gradient-to-br from-tiffany to-aqua rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-2xl">پ</span>
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-tiffany to-aqua bg-clip-text text-transparent">
                  پرانا - دستیار هوشمند سلامت
                </h3>
                <p className="text-sm text-slate-500 mt-1">نسخه 1.0.0</p>
              </div>
              
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <h3 className="text-sm font-medium mb-1">راهنما و پشتیبانی</h3>
                  <p className="text-xs text-slate-500 mb-3">
                    برای دریافت راهنمایی و پاسخ سوالات خود با ما در تماس باشید.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    مشاهده راهنما
                  </Button>
                </div>
                
                <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <h3 className="text-sm font-medium mb-1">گزارش مشکل</h3>
                  <p className="text-xs text-slate-500 mb-3">
                    مشکلات فنی یا پیشنهادات خود را با ما در میان بگذارید.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    ارسال گزارش
                  </Button>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">سیستم‌های مرتبط</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium mr-3">سیستم مدیریت عملکرد</span>
                    </div>
                    <span className="text-xs text-green-500">متصل</span>
                  </div>
                  
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium mr-3">سیستم مدیریت کارکنان</span>
                    </div>
                    <span className="text-xs text-green-500">متصل</span>
                  </div>
                  
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <CalendarIcon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium mr-3">سیستم تقویم سازمانی</span>
                    </div>
                    <span className="text-xs text-red-500">غیرفعال</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-6 mt-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <Lock className="w-5 h-5 ml-2 text-tiffany" />
              حریم خصوصی و قوانین
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                <h3 className="text-sm font-medium mb-1">قوانین استفاده</h3>
                <p className="text-xs text-slate-500">
                  شرایط و قوانین استفاده از سیستم پرانا
                </p>
                <Button variant="link" size="sm" className="mt-2 h-auto p-0">
                  مشاهده قوانین
                </Button>
              </div>
              
              <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                <h3 className="text-sm font-medium mb-1">حریم خصوصی</h3>
                <p className="text-xs text-slate-500">
                  نحوه جمع‌آوری، استفاده و محافظت از داده‌های شما
                </p>
                <Button variant="link" size="sm" className="mt-2 h-auto p-0">
                  مشاهده سیاست حریم خصوصی
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={saveSettings} className="bg-tiffany hover:bg-tiffany/90">
          ذخیره تنظیمات
        </Button>
      </div>
    </motion.div>
  );
}