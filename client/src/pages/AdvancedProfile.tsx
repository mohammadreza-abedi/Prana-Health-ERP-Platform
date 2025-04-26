import { useState, useEffect } from "react";
import { useNavigate, useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Components
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Icons
import {
  Award,
  BookOpen,
  Certificate,
  Check,
  Crown,
  Edit3,
  Heart,
  Link,
  LineChart,
  Medal,
  Share2,
  ShieldCheck,
  Star,
  Trophy,
  User,
  UserPlus,
  Users,
  Zap,
  Activity,
  PieChart,
  BarChart4,
  ScatterChart,
  Timer,
  Briefcase,
  GraduationCap,
  Workflow,
  Flower2,
  Brain,
  Compass,
  Calendar,
  Mail,
  Smartphone,
  MapPin,
  Bookmark,
  FileText,
  Settings,
  CalendarRange,
} from "lucide-react";

// Utilities
import { cn, formatDate, toPersianDigits, getLevelTitle } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCredits } from "@/hooks/use-credits";
import { useAuth } from "@/lib/useAuth";
import useIsMobile from "@/hooks/use-mobile";

// Progress animation
import { motion } from "framer-motion";

// Define badges
const BADGES = {
  HEALTH_PIONEER: {
    id: "health_pioneer",
    name: "پیشگام سلامت",
    icon: <Award className="h-6 w-6 text-yellow-500" />,
    description: "کسب حداقل 10،000 امتیاز در چالش‌های سلامتی",
  },
  EXERCISE_MASTER: {
    id: "exercise_master",
    name: "استاد تمرین",
    icon: <Zap className="h-6 w-6 text-indigo-500" />,
    description: "تکمیل حداقل 50 چالش ورزشی",
  },
  NUTRITION_EXPERT: {
    id: "nutrition_expert",
    name: "متخصص تغذیه",
    icon: <Flower2 className="h-6 w-6 text-green-500" />,
    description: "پیروی از برنامه غذایی سالم به مدت 30 روز متوالی",
  },
  MENTAL_WELLNESS: {
    id: "mental_wellness",
    name: "سلامت روان",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    description: "تکمیل تمام ارزیابی‌های سلامت روان و تمرینات مدیتیشن",
  },
  TEAM_LEADER: {
    id: "team_leader",
    name: "رهبر تیم",
    icon: <Users className="h-6 w-6 text-blue-500" />,
    description: "هدایت تیم به سوی اهداف سلامتی مشترک",
  },
  SLEEP_OPTIMIZER: {
    id: "sleep_optimizer",
    name: "بهینه‌ساز خواب",
    icon: <Moon className="h-6 w-6 text-indigo-400" />,
    description: "حفظ الگوی خواب سالم به مدت 21 روز متوالی",
  },
  HYDRATION_HERO: {
    id: "hydration_hero",
    name: "قهرمان آب‌رسانی",
    icon: <Droplet className="h-6 w-6 text-cyan-500" />,
    description: "نوشیدن حداقل 2 لیتر آب روزانه به مدت 14 روز متوالی",
  },
  STRESS_MANAGER: {
    id: "stress_manager",
    name: "مدیر استرس",
    icon: <ShieldCheck className="h-6 w-6 text-teal-500" />,
    description: "کامل کردن تکنیک‌های مدیریت استرس به مدت 30 روز",
  },
  CONSISTENCY_KING: {
    id: "consistency_king",
    name: "پادشاه پیوستگی",
    icon: <Crown className="h-6 w-6 text-amber-500" />,
    description: "ورود روزانه به برنامه به مدت 60 روز متوالی",
  },
  WELLNESS_AMBASSADOR: {
    id: "wellness_ambassador",
    name: "سفیر تندرستی",
    icon: <Trophy className="h-6 w-6 text-orange-500" />,
    description: "الهام‌بخشی به حداقل 10 همکار برای پیوستن به چالش‌های سلامتی",
  },
};

// Define skill types
const SKILL_TYPES = {
  HEALTH: {
    id: "health",
    name: "سلامت جسمی",
    icon: <Heart className="h-4 w-4" />,
    color: "bg-red-100 text-red-800",
  },
  FITNESS: {
    id: "fitness",
    name: "آمادگی جسمانی",
    icon: <Activity className="h-4 w-4" />,
    color: "bg-amber-100 text-amber-800",
  },
  NUTRITION: {
    id: "nutrition",
    name: "تغذیه",
    icon: <Flower2 className="h-4 w-4" />,
    color: "bg-green-100 text-green-800",
  },
  MENTAL: {
    id: "mental",
    name: "سلامت روان",
    icon: <Brain className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-800",
  },
  LEADERSHIP: {
    id: "leadership",
    name: "رهبری",
    icon: <Users className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-800",
  },
  SLEEP: {
    id: "sleep",
    name: "خواب",
    icon: <Moon className="h-4 w-4" />,
    color: "bg-indigo-100 text-indigo-800",
  },
  HYDRATION: {
    id: "hydration",
    name: "آب‌رسانی",
    icon: <Droplet className="h-4 w-4" />,
    color: "bg-cyan-100 text-cyan-800",
  },
  STRESS: {
    id: "stress",
    name: "مدیریت استرس",
    icon: <ShieldCheck className="h-4 w-4" />,
    color: "bg-teal-100 text-teal-800",
  },
  CONSISTENCY: {
    id: "consistency",
    name: "پیوستگی",
    icon: <CalendarRange className="h-4 w-4" />,
    color: "bg-orange-100 text-orange-800",
  },
  INFLUENCE: {
    id: "influence",
    name: "تأثیرگذاری",
    icon: <UserPlus className="h-4 w-4" />,
    color: "bg-pink-100 text-pink-800",
  },
};

// Define assessment types
const ASSESSMENT_TYPES = {
  BODY_COMPOSITION: "ترکیب بدن",
  BLOOD_PRESSURE: "فشار خون",
  STRESS_LEVEL: "سطح استرس",
  SLEEP_QUALITY: "کیفیت خواب",
  FITNESS_ASSESSMENT: "ارزیابی آمادگی جسمانی",
  MENTAL_WELLNESS: "سلامت روان",
  NUTRITION_EVALUATION: "ارزیابی تغذیه",
  POSTURE_ANALYSIS: "تحلیل وضعیت بدنی",
};

// Define schema for profile update
const profileUpdateSchema = z.object({
  displayName: z.string().min(2, { message: "نام نمایشی باید حداقل 2 کاراکتر باشد" }),
  bio: z.string().max(200, { message: "بیوگرافی نمی‌تواند بیش از 200 کاراکتر باشد" }),
  title: z.string().optional(),
  department: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email({ message: "ایمیل نامعتبر است" }).optional(),
  location: z.string().optional(),
});

// Import moon and droplet icons
import { Moon, Droplet } from "lucide-react";

export default function AdvancedProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  const { getUserCredits, getUserCreditTransactions } = useCredits();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Get user data
  const {
    data: profileUser,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery({
    queryKey: ["/api/users", id || user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${id || user?.id}`);
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return await res.json();
    },
  });

  // Get user badges
  const {
    data: userBadges,
    isLoading: badgesLoading,
  } = useQuery({
    queryKey: ["/api/user-badges", id || user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/user-badges/${id || user?.id}`);
      if (!res.ok) throw new Error("Failed to fetch user badges");
      return await res.json();
    },
    enabled: !!profileUser,
  });

  // Get user assessments
  const {
    data: userAssessments,
    isLoading: assessmentsLoading,
  } = useQuery({
    queryKey: ["/api/user-assessments", id || user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/user-assessments/${id || user?.id}`);
      if (!res.ok) throw new Error("Failed to fetch user assessments");
      return await res.json();
    },
    enabled: !!profileUser,
  });

  // Get user challenges
  const {
    data: userChallenges,
    isLoading: challengesLoading,
  } = useQuery({
    queryKey: ["/api/user-challenges", id || user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/user-challenges/${id || user?.id}`);
      if (!res.ok) throw new Error("Failed to fetch user challenges");
      return await res.json();
    },
    enabled: !!profileUser,
  });

  // Get user skills
  const {
    data: userSkills,
    isLoading: skillsLoading,
  } = useQuery({
    queryKey: ["/api/user-skills", id || user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/user-skills/${id || user?.id}`);
      if (!res.ok) throw new Error("Failed to fetch user skills");
      return await res.json();
    },
    enabled: !!profileUser,
  });

  // Get user certifications
  const {
    data: userCertifications,
    isLoading: certificationsLoading,
  } = useQuery({
    queryKey: ["/api/user-certifications", id || user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/user-certifications/${id || user?.id}`);
      if (!res.ok) throw new Error("Failed to fetch user certifications");
      return await res.json();
    },
    enabled: !!profileUser,
  });

  // Get user achievements
  const {
    data: userAchievements,
    isLoading: achievementsLoading,
  } = useQuery({
    queryKey: ["/api/user-achievements", id || user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/user-achievements/${id || user?.id}`);
      if (!res.ok) throw new Error("Failed to fetch user achievements");
      return await res.json();
    },
    enabled: !!profileUser,
  });

  // Get user credit transactions
  const {
    data: creditTransactions,
    isLoading: transactionsLoading,
  } = useQuery({
    queryKey: ["/api/credit-transactions", id || user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/credit-transactions/${id || user?.id}`);
      if (!res.ok) throw new Error("Failed to fetch credit transactions");
      return await res.json();
    },
    enabled: !!profileUser,
  });

  // Get user's health metrics
  const {
    data: healthMetrics,
    isLoading: healthMetricsLoading,
  } = useQuery({
    queryKey: ["/api/health-metrics", id || user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/health-metrics/${id || user?.id}`);
      if (!res.ok) throw new Error("Failed to fetch health metrics");
      return await res.json();
    },
    enabled: !!profileUser,
  });

  // Form setup for profile editing
  const form = useForm({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      title: "",
      department: "",
      phone: "",
      email: "",
      location: "",
    },
  });

  // Update form defaults when profile data loads
  useEffect(() => {
    if (profileUser) {
      form.reset({
        displayName: profileUser.displayName || "",
        bio: profileUser.bio || "",
        title: profileUser.title || "",
        department: profileUser.department || "",
        phone: profileUser.phone || "",
        email: profileUser.email || "",
        location: profileUser.location || "",
      });
    }
  }, [profileUser, form]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`/api/users/${user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        throw new Error("Failed to update profile");
      }
      
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id] });
      setEditDialogOpen(false);
      toast({
        title: "بروزرسانی موفق",
        description: "پروفایل شما با موفقیت بروز شد",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "خطا در بروزرسانی",
        description: error.message || "خطایی رخ داد",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data) => {
    updateProfileMutation.mutate(data);
  };

  // Share profile
  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `پروفایل ${profileUser?.displayName} در پلتفرم پرانا`,
        text: `نگاهی به پروفایل ${profileUser?.displayName} در پلتفرم پرانا بیندازید!`,
        url: window.location.href,
      }).catch(err => {
        toast({
          title: "خطا در اشتراک‌گذاری",
          description: "امکان اشتراک‌گذاری در این مرورگر وجود ندارد",
          variant: "destructive",
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "کپی شد",
        description: "لینک پروفایل کپی شد",
        variant: "success",
      });
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">در حال بارگذاری پروفایل...</p>
        </div>
      </div>
    );
  }

  if (profileError || !profileUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="flex flex-col items-center text-center gap-2">
          <User className="h-16 w-16 text-muted-foreground" />
          <h1 className="text-2xl font-bold">پروفایل یافت نشد</h1>
          <p className="text-muted-foreground">این کاربر وجود ندارد یا دسترسی شما محدود شده است</p>
        </div>
        <Button onClick={() => navigate("/")}>بازگشت به خانه</Button>
      </div>
    );
  }

  const isOwnProfile = !id || id === user?.id?.toString();
  const nextLevelXP = profileUser.level * 1000;
  const levelProgress = (profileUser.xp / nextLevelXP) * 100;

  // Mock badges data while API is being developed
  const mockBadges = [
    {
      id: 1,
      badgeId: "health_pioneer",
      dateAwarded: "2023-12-15T12:00:00Z",
    },
    {
      id: 2,
      badgeId: "exercise_master",
      dateAwarded: "2024-01-20T12:00:00Z",
    },
    {
      id: 3,
      badgeId: "nutrition_expert",
      dateAwarded: "2024-02-10T12:00:00Z",
    },
    {
      id: 4,
      badgeId: "mental_wellness",
      dateAwarded: "2024-03-05T12:00:00Z",
    },
    {
      id: 5,
      badgeId: "consistency_king",
      dateAwarded: "2024-04-01T12:00:00Z",
    },
  ];

  // Mock skills data
  const mockSkills = [
    { id: 1, name: "مدیریت استرس", type: "stress", level: 85 },
    { id: 2, name: "آمادگی قلبی-تنفسی", type: "fitness", level: 78 },
    { id: 3, name: "برنامه‌ریزی غذایی", type: "nutrition", level: 92 },
    { id: 4, name: "تکنیک‌های مدیتیشن", type: "mental", level: 65 },
    { id: 5, name: "ارگونومی محل کار", type: "health", level: 73 },
    { id: 6, name: "رهبری تیم‌های سلامت", type: "leadership", level: 88 },
    { id: 7, name: "بهینه‌سازی خواب", type: "sleep", level: 70 },
    { id: 8, name: "مدیریت هیدراتاسیون", type: "hydration", level: 95 },
  ];

  // Mock certifications data
  const mockCertifications = [
    {
      id: 1,
      title: "گواهی متخصص سلامت شغلی",
      issuer: "انجمن سلامت کار",
      dateIssued: "2023-11-15T12:00:00Z",
      credentialId: "OSH-2023-1245",
      expiryDate: "2025-11-15T12:00:00Z",
    },
    {
      id: 2,
      title: "دوره پیشرفته مدیریت استرس",
      issuer: "مرکز آموزش پرانا",
      dateIssued: "2024-01-10T12:00:00Z",
      credentialId: "SM-ADV-243",
      expiryDate: null,
    },
    {
      id: 3,
      title: "مربی تغذیه محل کار",
      issuer: "انستیتو تغذیه ایران",
      dateIssued: "2024-02-22T12:00:00Z",
      credentialId: "WPN-2024-326",
      expiryDate: "2026-02-22T12:00:00Z",
    },
  ];

  // Mock assessments data
  const mockAssessments = [
    {
      id: 1,
      type: ASSESSMENT_TYPES.BODY_COMPOSITION,
      date: "2024-03-15T10:00:00Z",
      results: {
        bmi: 23.5,
        bodyFatPercentage: 18.2,
        muscleMass: 65.4,
        boneDensity: 3.8,
      },
      score: 87,
      assessorName: "دکتر رضا محمدی",
    },
    {
      id: 2,
      type: ASSESSMENT_TYPES.FITNESS_ASSESSMENT,
      date: "2024-03-01T14:30:00Z",
      results: {
        cardioFitness: "عالی",
        flexibility: "خوب",
        coreStrength: "عالی",
        endurance: "بسیار خوب",
      },
      score: 92,
      assessorName: "مهندس علی احمدی",
    },
    {
      id: 3,
      type: ASSESSMENT_TYPES.MENTAL_WELLNESS,
      date: "2024-02-20T11:15:00Z",
      results: {
        stressLevel: "پایین",
        anxietyScore: 12,
        depressionScore: 5,
        wellnessIndex: 85,
      },
      score: 85,
      assessorName: "دکتر سارا کریمی",
    },
    {
      id: 4,
      type: ASSESSMENT_TYPES.SLEEP_QUALITY,
      date: "2024-02-10T09:00:00Z",
      results: {
        sleepDuration: "7.5 ساعت",
        sleepEfficiency: 92,
        remPercentage: 23,
        deepSleepPercentage: 25,
      },
      score: 78,
      assessorName: "دکتر محمد علیزاده",
    },
  ];

  // Mock achievements data
  const mockAchievements = [
    {
      id: 1,
      title: "پیروزی در چالش پله‌نوردی",
      date: "2024-03-10T12:00:00Z",
      description: "کسب رتبه اول در چالش پله‌نوردی بین دپارتمانی با ثبت 15000 پله",
      points: 500,
    },
    {
      id: 2,
      title: "50 روز متوالی تمرین",
      date: "2024-02-25T12:00:00Z",
      description: "انجام تمرینات ورزشی به مدت 50 روز متوالی بدون وقفه",
      points: 300,
    },
    {
      id: 3,
      title: "رهبر تیم برتر ماه",
      date: "2024-01-31T12:00:00Z",
      description: "هدایت تیم دپارتمان به کسب بالاترین امتیاز چالش‌های سلامتی ماه",
      points: 450,
    },
  ];

  return (
    <div className="container mx-auto py-6 max-w-screen-xl">
      {/* Profile header */}
      <div className="bg-background backdrop-blur-md rounded-xl border shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Avatar and basic info */}
          <div className="flex flex-col items-center md:items-start gap-4 md:flex-row">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-primary/10 overflow-hidden bg-primary/5 flex items-center justify-center">
                {profileUser.avatar ? (
                  <img 
                    src={profileUser.avatar} 
                    alt={profileUser.displayName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-muted-foreground" />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-md border">
                <Badge variant="success" className="flex items-center gap-1 px-2 py-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs">آنلاین</span>
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-start text-center md:text-right">
              <h1 className="text-2xl sm:text-3xl font-bold">{profileUser.displayName}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge variant="outline" className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{profileUser.username}</span>
                </Badge>
                
                {profileUser.title && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    <span>{profileUser.title}</span>
                  </Badge>
                )}
                
                {profileUser.department && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{profileUser.department}</span>
                  </Badge>
                )}
              </div>
              
              <p className="mt-2 text-muted-foreground max-w-md">
                {profileUser.bio || "هنوز بیوگرافی تنظیم نشده است."}
              </p>
              
              <div className="flex flex-wrap gap-4 mt-4">
                {profileUser.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{profileUser.email}</span>
                  </div>
                )}
                
                {profileUser.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Smartphone className="w-4 h-4" />
                    <span>{profileUser.phone}</span>
                  </div>
                )}
                
                {profileUser.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{profileUser.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Stats and actions */}
          <div className="flex-1 flex flex-col mt-6 md:mt-0">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              {/* Level and XP */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-1 bg-primary/5">
                    سطح {toPersianDigits(profileUser.level)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {getLevelTitle(profileUser.level)}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1 w-full max-w-xs">
                  <div className="flex items-center justify-between text-xs">
                    <span>{toPersianDigits(profileUser.xp)} امتیاز</span>
                    <span>{toPersianDigits(nextLevelXP)} امتیاز</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${levelProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {toPersianDigits(Math.floor(levelProgress))}% تا سطح بعدی
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-2 self-center md:self-end">
                {isOwnProfile ? (
                  <>
                    <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Edit3 className="w-4 h-4" />
                          <span>ویرایش پروفایل</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>ویرایش پروفایل</DialogTitle>
                          <DialogDescription>
                            اطلاعات پروفایل خود را بروزرسانی کنید
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="displayName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>نام نمایشی</FormLabel>
                                  <FormControl>
                                    <Input placeholder="نام و نام خانوادگی" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="bio"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>بیوگرافی</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="توضیح کوتاهی درباره خود بنویسید..." 
                                      {...field}
                                      className="resize-none"
                                      rows={3}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>عنوان شغلی</FormLabel>
                                    <FormControl>
                                      <Input placeholder="مثال: کارشناس منابع انسانی" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="department"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>دپارتمان</FormLabel>
                                    <FormControl>
                                      <Input placeholder="مثال: منابع انسانی" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>ایمیل تماس</FormLabel>
                                    <FormControl>
                                      <Input type="email" placeholder="ایمیل" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>تلفن تماس</FormLabel>
                                    <FormControl>
                                      <Input placeholder="شماره تلفن" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>موقعیت</FormLabel>
                                  <FormControl>
                                    <Input placeholder="مثال: تهران، ایران" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <DialogFooter className="pt-4">
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setEditDialogOpen(false)}
                              >
                                انصراف
                              </Button>
                              <Button 
                                type="submit"
                                disabled={updateProfileMutation.isPending}
                              >
                                {updateProfileMutation.isPending ? (
                                  <>
                                    <div className="animate-spin w-4 h-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                                    در حال ذخیره...
                                  </>
                                ) : (
                                  "ذخیره تغییرات"
                                )}
                              </Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span>تنظیمات حساب</span>
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span>افزودن به همکاران</span>
                  </Button>
                )}
                
                <Button variant="outline" className="flex items-center gap-2" onClick={shareProfile}>
                  <Share2 className="w-4 h-4" />
                  <span>اشتراک‌گذاری</span>
                </Button>
              </div>
            </div>
            
            {/* Featured badges */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">نشان‌های شاخص</h3>
                {activeTab !== "badges" && (
                  <Button variant="link" className="p-0 h-auto text-xs" onClick={() => setActiveTab("badges")}>
                    مشاهده همه
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(userBadges || mockBadges).slice(0, 5).map((badge) => {
                  const badgeInfo = BADGES[badge.badgeId?.toUpperCase()] || {
                    name: "نشان ناشناخته",
                    icon: <Award className="h-6 w-6 text-muted-foreground" />,
                  };
                  
                  return (
                    <div 
                      key={badge.id} 
                      className="flex flex-col items-center bg-background rounded-lg border p-2 hover:bg-accent/10 transition-colors cursor-help"
                      title={badgeInfo.description}
                    >
                      <div className="mb-1">
                        {badgeInfo.icon}
                      </div>
                      <span className="text-xs text-center">{badgeInfo.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs for different sections */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-background backdrop-blur-md rounded-t-xl border shadow-md p-2 sticky top-0 z-10">
          <TabsList className="flex flex-wrap md:flex-nowrap justify-start overflow-x-auto">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>نمای کلی</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>نشان‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span>مهارت‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-1">
              <Certificate className="w-4 h-4" />
              <span>گواهینامه‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="assessments" className="flex items-center gap-1">
              <LineChart className="w-4 h-4" />
              <span>ارزیابی‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>چالش‌ها</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>دستاوردها</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <Activity className="w-4 h-4" />
              <span>فعالیت‌ها</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="bg-background backdrop-blur-md rounded-b-xl border-x border-b shadow-md p-6">
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - summary cards */}
              <div className="col-span-1 space-y-6">
                {/* Health Score */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>امتیاز سلامت</span>
                      <Badge variant="outline" className="bg-primary/5">
                        85 / 100
                      </Badge>
                    </CardTitle>
                    <CardDescription>وضعیت کلی سلامت شما</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-36 flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-90">
                          <circle 
                            cx="50" cy="50" r="45" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="8" 
                            strokeDasharray="283" 
                            strokeDashoffset="0" 
                            className="text-muted"
                          />
                          <circle 
                            cx="50" cy="50" r="45" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="8" 
                            strokeDasharray="283" 
                            strokeDashoffset="42.45" 
                            className="text-primary"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold">85</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                        <span className="text-sm text-muted-foreground">جسمی</span>
                        <span className="font-medium">87/100</span>
                      </div>
                      <div className="flex flex-col items-center p-2 bg-primary/5 rounded-lg">
                        <span className="text-sm text-muted-foreground">ذهنی</span>
                        <span className="font-medium">83/100</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="w-full" onClick={() => setActiveTab("assessments")}>
                      مشاهده جزئیات ارزیابی
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Credits Summary */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">اعتبار و امتیازات</CardTitle>
                    <CardDescription>اعتبار و امتیازات کسب شده</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between bg-primary/5 p-3 rounded-lg mb-4">
                      <span>اعتبار فعلی</span>
                      <span className="font-bold">{toPersianDigits(profileUser.credits || 0)} امتیاز</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">چالش‌های هفتگی</span>
                        <span>+{toPersianDigits(250)} امتیاز</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">تکمیل آزمون‌های سلامت</span>
                        <span>+{toPersianDigits(120)} امتیاز</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">ورود روزانه</span>
                        <span>+{toPersianDigits(75)} امتیاز</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="w-full" onClick={() => setActiveTab("activity")}>
                      مشاهده تاریخچه تراکنش‌ها
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Recent Badges */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">آخرین نشان‌ها</CardTitle>
                    <CardDescription>نشان‌های اخیر کسب شده</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(userBadges || mockBadges).slice(0, 3).map((badge) => {
                        const badgeInfo = BADGES[badge.badgeId?.toUpperCase()] || {
                          name: "نشان ناشناخته",
                          icon: <Award className="h-5 w-5 text-muted-foreground" />,
                          description: "توضیحات نشان در دسترس نیست"
                        };
                        
                        return (
                          <div key={badge.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10">
                            <div className="flex-shrink-0">
                              {badgeInfo.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{badgeInfo.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{badgeInfo.description}</p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(new Date(badge.dateAwarded))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="w-full" onClick={() => setActiveTab("badges")}>
                      مشاهده تمام نشان‌ها
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Middle column - skills and content */}
              <div className="col-span-1 md:col-span-2 space-y-6">
                {/* Top Skills */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">مهارت‌های برتر</CardTitle>
                    <CardDescription>نقاط قوت در زمینه‌های سلامت و تندرستی</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(userSkills || mockSkills).slice(0, 4).map((skill) => {
                        const skillType = SKILL_TYPES[skill.type?.toUpperCase()] || {
                          name: "سایر",
                          icon: <Bookmark className="h-4 w-4" />,
                          color: "bg-gray-100 text-gray-800",
                        };
                        
                        return (
                          <div key={skill.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge className={skillType.color}>
                                  <div className="flex items-center gap-1">
                                    {skillType.icon}
                                    <span>{skillType.name}</span>
                                  </div>
                                </Badge>
                              </div>
                              <span className="text-sm">{skill.level}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{skill.name}</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-primary"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="w-full" onClick={() => setActiveTab("skills")}>
                      مشاهده تمام مهارت‌ها
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Recent Assessments */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">ارزیابی‌های اخیر</CardTitle>
                    <CardDescription>نتایج آخرین ارزیابی‌های سلامت</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(userAssessments || mockAssessments).slice(0, 2).map((assessment) => (
                        <div key={assessment.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="bg-primary/5">
                                {assessment.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(new Date(assessment.date))}
                              </span>
                            </div>
                            <Badge variant={assessment.score >= 80 ? "success" : assessment.score >= 60 ? "warning" : "destructive"}>
                              {assessment.score}/100
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {Object.entries(assessment.results).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                                <span className="text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-3 text-xs text-right">
                            <span className="text-muted-foreground">ارزیاب: {assessment.assessorName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="w-full" onClick={() => setActiveTab("assessments")}>
                      مشاهده تمام ارزیابی‌ها
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Recent Achievements */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">دستاوردهای اخیر</CardTitle>
                    <CardDescription>موفقیت‌های اخیر در برنامه سلامت</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(userAchievements || mockAchievements).map((achievement) => (
                        <div key={achievement.id} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="flex-shrink-0 mt-1">
                            <Trophy className="h-5 w-5 text-amber-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{achievement.title}</p>
                              <Badge variant="outline">
                                +{toPersianDigits(achievement.points)}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {formatDate(new Date(achievement.date))}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="w-full" onClick={() => setActiveTab("achievements")}>
                      مشاهده تمام دستاوردها
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Badges Tab */}
          <TabsContent value="badges" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">نشان‌ها</h3>
                <Badge variant="outline">
                  {toPersianDigits((userBadges || mockBadges).length)} از {toPersianDigits(Object.keys(BADGES).length)} نشان
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Object.entries(BADGES).map(([id, badge]) => {
                  const earnedBadge = (userBadges || mockBadges).find(b => b.badgeId?.toUpperCase() === id);
                  const isEarned = !!earnedBadge;
                  
                  return (
                    <div 
                      key={id}
                      className={cn(
                        "flex flex-col items-center text-center p-4 rounded-lg border transition-all",
                        isEarned ? "bg-background" : "bg-muted/30 opacity-60"
                      )}
                    >
                      <div className={cn(
                        "p-3 rounded-full mb-3",
                        isEarned ? "bg-primary/10" : "bg-muted"
                      )}>
                        {badge.icon}
                      </div>
                      <h4 className="font-medium mb-1">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>
                      {isEarned ? (
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                          <Check className="h-3 w-3 mr-1 text-green-500" />
                          دریافت شده در {formatDate(new Date(earnedBadge.dateAwarded))}
                        </div>
                      ) : (
                        <Badge variant="outline" className="bg-muted mt-2">
                          قفل شده
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          
          {/* Skills Tab */}
          <TabsContent value="skills" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">مهارت‌ها</h3>
                <div className="flex flex-wrap gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="همه مهارت‌ها" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه مهارت‌ها</SelectItem>
                      {Object.entries(SKILL_TYPES).map(([id, type]) => (
                        <SelectItem key={id} value={id}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            <span>{type.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="level">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="مرتب‌سازی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="level">بر اساس سطح (نزولی)</SelectItem>
                      <SelectItem value="level-asc">بر اساس سطح (صعودی)</SelectItem>
                      <SelectItem value="name">بر اساس نام (الفبا)</SelectItem>
                      <SelectItem value="type">بر اساس دسته‌بندی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(userSkills || mockSkills).map((skill) => {
                  const skillType = SKILL_TYPES[skill.type?.toUpperCase()] || {
                    name: "سایر",
                    icon: <Bookmark className="h-4 w-4" />,
                    color: "bg-gray-100 text-gray-800",
                  };
                  
                  return (
                    <Card key={skill.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md flex items-center justify-between">
                          <span>{skill.name}</span>
                          <Badge className={skillType.color}>
                            <div className="flex items-center gap-1">
                              {skillType.icon}
                              <span>{skillType.name}</span>
                            </div>
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">سطح مهارت</span>
                            <Badge variant="outline">{skill.level}%</Badge>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                          
                          <div className="flex items-center justify-between text-xs mt-3">
                            <span className="text-muted-foreground">مبتدی</span>
                            <span className="text-muted-foreground">متوسط</span>
                            <span className="text-muted-foreground">حرفه‌ای</span>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">وضعیت</span>
                            <Badge 
                              variant={skill.level >= 80 ? "success" : skill.level >= 50 ? "warning" : "default"}
                            >
                              {skill.level >= 80 ? "حرفه‌ای" : skill.level >= 50 ? "متوسط" : "مبتدی"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>
          
          {/* Certifications Tab */}
          <TabsContent value="certifications" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">گواهینامه‌ها</h3>
                <Badge variant="outline">
                  {toPersianDigits((userCertifications || mockCertifications).length)} گواهینامه
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(userCertifications || mockCertifications).map((certification) => (
                  <Card key={certification.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">{certification.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Certificate className="h-3 w-3" />
                        <span>صادر شده توسط {certification.issuer}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">تاریخ صدور</span>
                          <span>{formatDate(new Date(certification.dateIssued))}</span>
                        </div>
                        
                        {certification.expiryDate && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">تاریخ انقضا</span>
                            <span>{formatDate(new Date(certification.expiryDate))}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">شناسه مدرک</span>
                          <Badge variant="outline">{certification.credentialId}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm mt-4">
                          <span className="text-muted-foreground">وضعیت</span>
                          <Badge variant={
                            !certification.expiryDate || new Date(certification.expiryDate) > new Date()
                              ? "success"
                              : "destructive"
                          }>
                            {!certification.expiryDate ? "بدون انقضا" : 
                              new Date(certification.expiryDate) > new Date() ? "معتبر" : "منقضی شده"}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" disabled>
                        <Link className="h-4 w-4 mr-2" />
                        <span>مشاهده گواهینامه</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {isOwnProfile && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>افزودن گواهینامه جدید</span>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Assessments Tab */}
          <TabsContent value="assessments" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">ارزیابی‌های سلامت</h3>
                <div className="flex flex-wrap gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="نوع ارزیابی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">همه ارزیابی‌ها</SelectItem>
                      {Object.values(ASSESSMENT_TYPES).map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select defaultValue="date">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="مرتب‌سازی" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">تاریخ (جدیدترین)</SelectItem>
                      <SelectItem value="date-asc">تاریخ (قدیمی‌ترین)</SelectItem>
                      <SelectItem value="score">امتیاز (بالاترین)</SelectItem>
                      <SelectItem value="score-asc">امتیاز (پایین‌ترین)</SelectItem>
                      <SelectItem value="type">نوع ارزیابی</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-6">
                {(userAssessments || mockAssessments).map((assessment) => (
                  <Card key={assessment.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md flex items-center gap-2">
                          {assessment.type === ASSESSMENT_TYPES.BODY_COMPOSITION && <PieChart className="h-5 w-5" />}
                          {assessment.type === ASSESSMENT_TYPES.FITNESS_ASSESSMENT && <Activity className="h-5 w-5" />}
                          {assessment.type === ASSESSMENT_TYPES.MENTAL_WELLNESS && <Brain className="h-5 w-5" />}
                          {assessment.type === ASSESSMENT_TYPES.SLEEP_QUALITY && <Moon className="h-5 w-5" />}
                          {assessment.type === ASSESSMENT_TYPES.NUTRITION_EVALUATION && <Flower2 className="h-5 w-5" />}
                          {assessment.type === ASSESSMENT_TYPES.BLOOD_PRESSURE && <Heart className="h-5 w-5" />}
                          {assessment.type === ASSESSMENT_TYPES.STRESS_LEVEL && <ShieldCheck className="h-5 w-5" />}
                          {assessment.type === ASSESSMENT_TYPES.POSTURE_ANALYSIS && <Users className="h-5 w-5" />}
                          <span>{assessment.type}</span>
                        </CardTitle>
                        <Badge
                          variant={
                            assessment.score >= 80 ? "success"
                              : assessment.score >= 60 ? "warning"
                              : "destructive"
                          }
                        >
                          {assessment.score}/100
                        </Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center justify-between">
                          <span>ارزیاب: {assessment.assessorName}</span>
                          <time className="text-xs">{formatDate(new Date(assessment.date))}</time>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Results graph visualization */}
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="text-sm font-medium mb-4">نتایج ارزیابی</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(assessment.results).map(([key, value]) => (
                              <div key={key} className="flex flex-col gap-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                  <span className="font-medium">{value}</span>
                                </div>
                                {typeof value === 'number' && (
                                  <Progress value={Math.min(value * 10, 100)} className="h-1" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Comparison with previous assessments */}
                        {assessment.type === ASSESSMENT_TYPES.BODY_COMPOSITION && (
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <h4 className="text-sm font-medium mb-4">مقایسه با ارزیابی قبلی</h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">BMI</span>
                                <Badge variant="outline" className="bg-success/10 text-success-foreground">
                                  <div className="flex items-center gap-1">
                                    <Zap className="h-3 w-3" />
                                    <span>بهبود 1.2%</span>
                                  </div>
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">چربی بدن</span>
                                <Badge variant="outline" className="bg-success/10 text-success-foreground">
                                  <div className="flex items-center gap-1">
                                    <Zap className="h-3 w-3" />
                                    <span>بهبود 2.5%</span>
                                  </div>
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">توده عضلانی</span>
                                <Badge variant="outline" className="bg-success/10 text-success-foreground">
                                  <div className="flex items-center gap-1">
                                    <Zap className="h-3 w-3" />
                                    <span>بهبود 3.1%</span>
                                  </div>
                                </Badge>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Recommendations based on assessment */}
                        <div className="p-4 bg-primary/5 rounded-lg">
                          <h4 className="text-sm font-medium mb-3">توصیه‌ها</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>ادامه برنامه تمرینی فعلی با تمرکز بر تمرینات قدرتی</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>افزایش مصرف پروتئین به 1.8 گرم به ازای هر کیلوگرم وزن بدن</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span>بهبود کیفیت خواب با رعایت ساعت خواب منظم</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <LineChart className="h-4 w-4 mr-2" />
                        <span>گزارش کامل ارزیابی</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {isOwnProfile && (
                <div className="flex justify-center mt-8">
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>درخواست ارزیابی جدید</span>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Add remaining tab content for challenges, achievements and activity logs */}
          <TabsContent value="challenges" className="mt-0">
            <div className="flex items-center justify-center p-12 text-muted-foreground">
              <div className="flex flex-col items-center gap-2 text-center">
                <Trophy className="h-12 w-12" />
                <h3 className="text-lg font-medium">در حال آماده‌سازی چالش‌ها</h3>
                <p className="max-w-md">این بخش در حال توسعه است و به زودی فعال خواهد شد</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-0">
            <div className="flex items-center justify-center p-12 text-muted-foreground">
              <div className="flex flex-col items-center gap-2 text-center">
                <Medal className="h-12 w-12" />
                <h3 className="text-lg font-medium">در حال آماده‌سازی دستاوردها</h3>
                <p className="max-w-md">این بخش در حال توسعه است و به زودی فعال خواهد شد</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0">
            <div className="flex items-center justify-center p-12 text-muted-foreground">
              <div className="flex flex-col items-center gap-2 text-center">
                <Activity className="h-12 w-12" />
                <h3 className="text-lg font-medium">در حال آماده‌سازی فعالیت‌ها</h3>
                <p className="max-w-md">این بخش در حال توسعه است و به زودی فعال خواهد شد</p>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}