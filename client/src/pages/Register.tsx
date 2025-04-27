import { useState, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { 
  AtSign, 
  Lock, 
  User, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building,
  UserCheck
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// تعریف دپارتمان‌ها
const departments = [
  { id: "it", name: "فناوری اطلاعات" },
  { id: "hr", name: "منابع انسانی" },
  { id: "marketing", name: "بازاریابی" },
  { id: "finance", name: "مالی" },
  { id: "operations", name: "عملیات" },
  { id: "rd", name: "تحقیق و توسعه" },
  { id: "sales", name: "فروش" },
  { id: "support", name: "پشتیبانی" },
  { id: "logistics", name: "لجستیک" },
  { id: "other", name: "سایر" },
];

// کامپوننت مراحل ثبت‌نام
const RegisterSteps = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { id: 1, title: "اطلاعات حساب" },
    { id: 2, title: "اطلاعات شخصی" },
    { id: 3, title: "تنظیمات سازمانی" },
    { id: 4, title: "تکمیل ثبت‌نام" },
  ];

  return (
    <div className="mb-8">
      <div className="relative">
        <div className="flex justify-between mb-2">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center"
            >
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.id < currentStep 
                    ? "bg-green-500 text-white" 
                    : step.id === currentStep 
                    ? "bg-tiffany text-white" 
                    : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                }`}
                animate={{
                  scale: step.id === currentStep ? [1, 1.1, 1] : 1,
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: step.id === currentStep ? Infinity : 0,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  repeatDelay: 1
                }}
              >
                {step.id < currentStep ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </motion.div>
              <span className={`text-xs mt-2 ${
                step.id === currentStep 
                  ? "text-tiffany font-bold" 
                  : "text-slate-500 dark:text-slate-400"
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        
        <div className="absolute top-5 left-0 right-0 mx-auto h-1 bg-slate-200 dark:bg-slate-700 -z-10">
          <div 
            className="h-full bg-tiffany transition-all duration-500"
            style={{ width: `${(currentStep - 1) * 100 / (steps.length - 1)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// بخش پیشرفت قدرت رمز عبور
interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const calculateStrength = (): { score: number; text: string; color: string } => {
    if (!password) return { score: 0, text: "وارد نشده", color: "bg-slate-300 dark:bg-slate-700" };
    
    let score = 0;
    
    // حداقل طول
    if (password.length >= 8) score += 1;
    
    // وجود حروف کوچک
    if (/[a-z]/.test(password)) score += 1;
    
    // وجود حروف بزرگ
    if (/[A-Z]/.test(password)) score += 1;
    
    // وجود اعداد
    if (/[0-9]/.test(password)) score += 1;
    
    // وجود کاراکترهای خاص
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // تنظیم متن و رنگ بر اساس امتیاز
    const strengthMap = [
      { text: "بسیار ضعیف", color: "bg-red-500" },
      { text: "ضعیف", color: "bg-orange-500" },
      { text: "متوسط", color: "bg-yellow-500" },
      { text: "خوب", color: "bg-blue-500" },
      { text: "عالی", color: "bg-green-500" },
    ];
    
    return { 
      score, 
      text: strengthMap[score < 5 ? score : 4].text, 
      color: strengthMap[score < 5 ? score : 4].color 
    };
  };
  
  const strength = calculateStrength();
  
  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
        <span>قدرت رمز عبور:</span>
        <span>{strength.text}</span>
      </div>
      <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${strength.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${(strength.score / 5) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {password && (
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-3">
          <div className="flex items-center gap-1 text-xs">
            {/[a-z]/.test(password) ? 
              <CheckCircle2 className="h-3 w-3 text-green-500" /> : 
              <XCircle className="h-3 w-3 text-red-500" />
            }
            <span>حروف کوچک</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {/[A-Z]/.test(password) ? 
              <CheckCircle2 className="h-3 w-3 text-green-500" /> : 
              <XCircle className="h-3 w-3 text-red-500" />
            }
            <span>حروف بزرگ</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {/[0-9]/.test(password) ? 
              <CheckCircle2 className="h-3 w-3 text-green-500" /> : 
              <XCircle className="h-3 w-3 text-red-500" />
            }
            <span>اعداد</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {/[^A-Za-z0-9]/.test(password) ? 
              <CheckCircle2 className="h-3 w-3 text-green-500" /> : 
              <XCircle className="h-3 w-3 text-red-500" />
            }
            <span>کاراکترهای خاص</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            {password.length >= 8 ? 
              <CheckCircle2 className="h-3 w-3 text-green-500" /> : 
              <XCircle className="h-3 w-3 text-red-500" />
            }
            <span>حداقل ۸ کاراکتر</span>
          </div>
        </div>
      )}
    </div>
  );
};

// کامپوننت اصلی ثبت‌نام
export default function Register() {
  // مرحله فعلی ثبت‌نام
  const [currentStep, setCurrentStep] = useState(1);
  
  // اطلاعات حساب کاربری
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // اطلاعات شخصی
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  
  // اطلاعات سازمانی
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("user");
  const [employeeId, setEmployeeId] = useState("");
  
  // وضعیت ثبت‌نام
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  
  // هوک‌ها
  const { register } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // اعتبارسنجی فرم
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!username) newErrors.username = "نام کاربری الزامی است";
      else if (username.length < 3) newErrors.username = "نام کاربری باید حداقل ۳ کاراکتر باشد";
      
      if (!email) newErrors.email = "ایمیل الزامی است";
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "ایمیل وارد شده معتبر نیست";
      
      if (!password) newErrors.password = "رمز عبور الزامی است";
      else if (password.length < 8) newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
      
      if (password !== confirmPassword) newErrors.confirmPassword = "تکرار رمز عبور مطابقت ندارد";
    }
    
    if (step === 2) {
      if (!displayName) newErrors.displayName = "نام نمایشی الزامی است";
    }
    
    if (step === 3) {
      if (!department) newErrors.department = "انتخاب دپارتمان الزامی است";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // پیشروی به مرحله بعد
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  // بازگشت به مرحله قبل
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // ارسال فرم ثبت‌نام
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    try {
      setIsLoading(true);
      
      // ترکیب تمام اطلاعات برای ثبت‌نام
      const userData = {
        username,
        email,
        password,
        displayName: displayName || `${firstName} ${lastName}`.trim(),
        firstName,
        lastName,
        bio,
        department,
        role,
        employeeId
      };
      
      // فراخوانی تابع ثبت‌نام
      await register(userData);
      
      // نمایش پیام موفقیت
      toast({
        title: "ثبت‌نام با موفقیت انجام شد",
        description: "به پرانا خوش آمدید! شما با موفقیت ثبت‌نام کردید و در حال ورود به حساب کاربری خود هستید.",
        variant: "default",
      });
      
      // تنظیم وضعیت موفقیت
      setRegisterSuccess(true);
      
      // انتقال به صفحه اصلی پس از مدتی
      setTimeout(() => {
        navigate("/");
      }, 3000);
      
    } catch (error: any) {
      console.error("Register error:", error);
      
      // نمایش پیام خطا
      toast({
        title: "خطا در ثبت‌نام",
        description: error.message || "مشکلی در ثبت‌نام رخ داده است. لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // انتقال به صفحه ورود
  const navigateToLogin = () => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* پس‌زمینه با افکت های ویندوز 11 */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-tiffany/5 to-aqua/5 dark:from-navy/20 dark:to-tiffany/10 pointer-events-none"></div>
      
      {/* دایره‌های محو */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-tiffany/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-aqua/20 blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-yellow/10 blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl z-10"
      >
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-tiffany to-aqua flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-2xl">پ</span>
            </div>
            <div className="mr-3">
              <h1 className="text-3xl font-black bg-gradient-to-r from-tiffany to-aqua bg-clip-text text-transparent">پرانا</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">دستیار هوشمند سلامت و ولنس سازمانی</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="border border-white/20 dark:border-white/5 shadow-xl mica">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex items-center gap-2">
                <motion.div 
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 10 }}
                  transition={{ 
                    repeat: Infinity, 
                    repeatType: "reverse", 
                    duration: 1.5 
                  }}
                >
                  <UserCheck className="h-6 w-6 text-tiffany" />
                </motion.div>
                <span>ثبت‌نام در پرانا</span>
              </CardTitle>
              <CardDescription>
                حساب کاربری خود را ایجاد کنید و از امکانات حرفه‌ای پرانا بهره‌مند شوید
              </CardDescription>
              
              {/* نمایش مراحل ثبت‌نام */}
              <RegisterSteps currentStep={currentStep} />
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* مرحله 1: اطلاعات حساب کاربری */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium">
                          نام کاربری <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <AtSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            id="username"
                            type="text"
                            placeholder="نام کاربری خود را وارد کنید"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`pr-10 ${errors.username ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                        </div>
                        {errors.username && (
                          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          ایمیل <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="ایمیل خود را وارد کنید"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`pr-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                          رمز عبور <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="رمز عبور خود را وارد کنید"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                        
                        {/* نمایش قدرت رمز عبور */}
                        <PasswordStrength password={password} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">
                          تکرار رمز عبور <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="رمز عبور خود را تکرار کنید"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* مرحله 2: اطلاعات شخصی */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="displayName" className="text-sm font-medium">
                          نام نمایشی <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            id="displayName"
                            type="text"
                            placeholder="نام نمایشی خود را وارد کنید"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className={`pr-10 ${errors.displayName ? 'border-red-500 focus:ring-red-500' : ''}`}
                          />
                        </div>
                        {errors.displayName && (
                          <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            نام
                          </Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="نام خود را وارد کنید"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            نام خانوادگی
                          </Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="نام خانوادگی خود را وارد کنید"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-sm font-medium">
                          درباره من
                        </Label>
                        <textarea
                          id="bio"
                          placeholder="توضیحات کوتاهی درباره خود بنویسید (اختیاری)"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none h-24"
                        />
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                        <div className="flex items-start">
                          <ShieldCheck className="h-5 w-5 text-blue-500 mt-0.5 ml-2 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">اطلاعات شخصی</h4>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                              اطلاعات شخصی شما با ما محفوظ خواهد ماند و تنها برای شخصی‌سازی تجربه شما استفاده می‌شود.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* مرحله 3: اطلاعات سازمانی */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="department" className="text-sm font-medium">
                          دپارتمان <span className="text-red-500">*</span>
                        </Label>
                        <Select value={department} onValueChange={setDepartment}>
                          <SelectTrigger className={`w-full ${errors.department ? 'border-red-500 focus:ring-red-500' : ''}`}>
                            <SelectValue placeholder="دپارتمان خود را انتخاب کنید" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>دپارتمان‌ها</SelectLabel>
                              {departments.map((dep) => (
                                <SelectItem key={dep.id} value={dep.id}>{dep.name}</SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.department && (
                          <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm font-medium">
                          نقش سازمانی
                        </Label>
                        <Select value={role} onValueChange={setRole}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="نقش سازمانی خود را انتخاب کنید" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>نقش‌ها</SelectLabel>
                              <SelectItem value="user">کارمند عادی</SelectItem>
                              <SelectItem value="manager">مدیر</SelectItem>
                              <SelectItem value="hr">کارشناس منابع انسانی</SelectItem>
                              <SelectItem value="admin">ادمین</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="employeeId" className="text-sm font-medium">
                          کد پرسنلی
                        </Label>
                        <div className="relative">
                          <Building className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            id="employeeId"
                            type="text"
                            placeholder="کد پرسنلی خود را وارد کنید (اختیاری)"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className="pr-10"
                          />
                        </div>
                      </div>
                      
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800">
                        <div className="flex items-start">
                          <Sparkles className="h-5 w-5 text-amber-500 mt-0.5 ml-2 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300">مزایای سازمانی</h4>
                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                              با وارد کردن اطلاعات سازمانی، از امکانات ویژه سازمانی مانند گزارش‌های گروهی، چالش‌های تیمی و تحلیل‌های پیشرفته بهره‌مند شوید.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* مرحله 4: تکمیل ثبت‌نام */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="text-center py-4">
                        <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                          <CheckCircle2 className="h-10 w-10 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">همه چیز آماده است!</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                          اطلاعات شما با موفقیت جمع‌آوری شد. برای تکمیل ثبت‌نام و ایجاد حساب کاربری، روی دکمه ثبت‌نام کلیک کنید.
                        </p>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3">خلاصه اطلاعات ثبت‌نام</h4>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">نام کاربری:</span>
                            <span className="font-medium">{username}</span>
                          </div>
                          <Separator className="my-1" />
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">ایمیل:</span>
                            <span className="font-medium">{email}</span>
                          </div>
                          <Separator className="my-1" />
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">نام نمایشی:</span>
                            <span className="font-medium">{displayName || `${firstName} ${lastName}`.trim() || "-"}</span>
                          </div>
                          <Separator className="my-1" />
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">دپارتمان:</span>
                            <span className="font-medium">
                              {department ? departments.find(d => d.id === department)?.name : "-"}
                            </span>
                          </div>
                          <Separator className="my-1" />
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500 dark:text-slate-400">نقش:</span>
                            <Badge variant="outline" className="font-normal">
                              {role === "user" ? "کارمند" : 
                               role === "manager" ? "مدیر" : 
                               role === "hr" ? "منابع انسانی" : 
                               role === "admin" ? "ادمین" : role}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center text-xs text-tiffany underline cursor-pointer">
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              حریم خصوصی و شرایط استفاده
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                              <p className="text-xs">
                                با ثبت‌نام در پرانا، شما شرایط استفاده و سیاست حریم خصوصی ما را می‌پذیرید.
                                اطلاعات شما به صورت محرمانه نگهداری می‌شود و تنها برای بهبود خدمات استفاده می‌شود.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2 border-t">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPrevStep}
                  disabled={isLoading || registerSuccess}
                  className="flex items-center gap-1"
                >
                  <ArrowRight className="h-4 w-4" />
                  مرحله قبل
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={navigateToLogin}
                  disabled={isLoading || registerSuccess}
                  className="flex items-center gap-1"
                >
                  <ArrowRight className="h-4 w-4" />
                  بازگشت به ورود
                </Button>
              )}
              
              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  disabled={isLoading || registerSuccess}
                  className="flex items-center gap-1 bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-dark hover:to-aqua-dark"
                >
                  مرحله بعد
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading || registerSuccess}
                  className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-tiffany hover:from-green-600 hover:to-tiffany-dark"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin ml-1"></div>
                      در حال ثبت‌نام...
                    </>
                  ) : registerSuccess ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 ml-1" />
                      ثبت‌نام موفق
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4 ml-1" />
                      تکمیل ثبت‌نام
                    </>
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.p 
          className="text-sm text-center mt-6 text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          دستیار هوشمند سلامت شغلی، سلامت فردی و ارتقاء منابع انسانی
        </motion.p>
      </motion.div>
    </div>
  );
}