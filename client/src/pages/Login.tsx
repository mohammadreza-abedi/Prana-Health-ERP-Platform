import { useState, useEffect } from "react";
import { useAuth } from "@/lib/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { 
  AtSign, 
  Lock, 
  LogIn, 
  Eye, 
  EyeOff,
  UserPlus,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  ArrowRight,
  Fingerprint,
  KeyRound,
  ShieldCheck
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PulsingLogo from "@/components/ui/pulsing-logo";

export default function Login() {
  // حالت ورود
  const [loginMode, setLoginMode] = useState<"normal" | "fingerprint" | "otp">("normal");
  
  // حالت‌های کاربر
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [quickLoginUserId, setQuickLoginUserId] = useState<string | null>(null);
  
  // برای اثر انگشت
  const [fingerprintScan, setFingerprintScan] = useState(false);
  
  // برای رمز یکبار مصرف
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimeout, setOtpTimeout] = useState(60);
  
  // وضعیت احراز هویت
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // تابع کاهش زمان باقی‌مانده OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (otpSent && otpTimeout > 0) {
      timer = setInterval(() => {
        setOtpTimeout((prev) => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [otpSent, otpTimeout]);
  
  // کاربران نمونه برای دمو
  const sampleUsers = [
    { id: "1", username: "amir", role: "user", displayName: "امیر کاربر" },
    { id: "2", username: "sara", role: "manager", displayName: "سارا مدیر" },
    { id: "3", username: "hrmanager", role: "hr", displayName: "مدیر منابع انسانی" },
    { id: "4", username: "admin", role: "admin", displayName: "ادمین سیستم" },
  ];
  
  // درخواست OTP
  const requestOtp = () => {
    if (!username) {
      toast({
        title: "خطا",
        description: "لطفا ابتدا نام کاربری خود را وارد کنید",
        variant: "destructive",
      });
      return;
    }
    
    setOtpSent(true);
    setOtpTimeout(60);
    
    toast({
      title: "رمز یکبار مصرف ارسال شد",
      description: "یک کد ۶ رقمی به شماره موبایل/ایمیل شما ارسال شد",
      variant: "default",
    });
  };
  
  // شبیه‌سازی اسکن اثر انگشت
  const simulateFingerprintScan = () => {
    setFingerprintScan(true);
    setTimeout(() => {
      setFingerprintScan(false);
      handleSubmit(null, "fingerprint");
    }, 2500);
  };
  
  // ورود با رمز یکبار مصرف
  const handleOtpLogin = () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "خطا",
        description: "لطفا رمز یکبار مصرف ۶ رقمی را به درستی وارد کنید",
        variant: "destructive",
      });
      return;
    }
    
    handleSubmit(null, "otp");
  };
  
  // ورود سریع با حساب دمو
  const quickLogin = (userId: string) => {
    setQuickLoginUserId(userId);
    const selectedUser = sampleUsers.find(user => user.id === userId);
    
    if (selectedUser) {
      setUsername(selectedUser.username);
      setPassword("password"); // برای دمو همه رمزها password است
      setTimeout(() => {
        handleSubmit(null, "normal");
      }, 500);
    }
  };

  // ورود به سیستم
  const handleSubmit = async (e?: React.FormEvent | null, mode: "normal" | "fingerprint" | "otp" = "normal") => {
    if (e) e.preventDefault();
    
    // بررسی داده‌های ورودی بر اساس حالت ورود
    if (mode === "normal") {
      if (!username || !password) {
        toast({
          title: "خطا",
          description: "لطفا نام کاربری و رمز عبور را وارد کنید",
          variant: "destructive",
        });
        setLoginError("لطفا نام کاربری و رمز عبور را وارد کنید");
        return;
      }
    } else if (mode === "otp") {
      if (!username || !otp) {
        toast({
          title: "خطا",
          description: "لطفا نام کاربری و کد تایید را وارد کنید",
          variant: "destructive",
        });
        setLoginError("لطفا نام کاربری و کد تایید را وارد کنید");
        return;
      }
    }
    
    try {
      setIsLoading(true);
      setLoginError(null);
      
      // در دمو، همه حالت‌های ورود موفق هستند
      // در حالت واقعی اینجا پارامترهای مختلفی به API ارسال می‌شود
      const credentials = mode === "normal" 
        ? { username, password } 
        : mode === "otp" 
        ? { username, otp } 
        : { username: "admin", authType: "biometric" };
      
      // استفاده از API احراز هویت با پارامترهای مناسب
      await login(credentials as any);
      
      // نمایش پیام موفقیت
      setLoginSuccess(true);
      toast({
        title: "ورود موفق",
        description: "به پرانا خوش آمدید!",
        variant: "default",
      });
      
      // انتقال به صفحه اصلی
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(error.message || "خطا در ورود به سیستم");
      
      toast({
        title: "خطا در ورود",
        description: error.message || "نام کاربری یا رمز عبور اشتباه است",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // انتقال به صفحه ثبت‌نام
  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* پس‌زمینه با افکت‌های ویندوز 11 */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-tiffany/5 to-aqua/5 dark:from-navy/20 dark:to-tiffany/10 pointer-events-none"></div>
      
      {/* دایره‌های محو */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-tiffany/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-aqua/20 blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-yellow/10 blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10"
      >
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <div className="flex flex-col items-center">
            <PulsingLogo size="md" showText={true} />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              دستیار هوشمند سلامت و ولنس سازمانی
            </p>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={loginMode}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-white/20 dark:border-white/5 shadow-xl mica overflow-hidden">
              <CardHeader className="pb-4 relative">
                <div className="absolute top-2 left-4 flex gap-1">
                  <Link href="/">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <motion.div 
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 10 }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 1.5 
                    }}
                  >
                    <LogIn className="h-6 w-6 text-tiffany" />
                  </motion.div>
                  <span>ورود به پرانا</span>
                </CardTitle>
                <CardDescription className="text-center">
                  وارد حساب کاربری خود شوید و از امکانات پیشرفته پرانا استفاده کنید
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="normal" className="w-full" onValueChange={(value) => setLoginMode(value as any)}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="normal" className="flex gap-1 items-center">
                      <KeyRound className="h-4 w-4" />
                      <span>ورود عادی</span>
                    </TabsTrigger>
                    <TabsTrigger value="fingerprint" className="flex gap-1 items-center">
                      <Fingerprint className="h-4 w-4" />
                      <span>اثر انگشت</span>
                    </TabsTrigger>
                    <TabsTrigger value="otp" className="flex gap-1 items-center">
                      <ShieldCheck className="h-4 w-4" />
                      <span>رمز یکبار</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* حالت ورود با نام کاربری و رمز عبور */}
                  <TabsContent value="normal">
                    {loginError && (
                      <Alert variant="destructive" className="mb-4 animate__animated animate__shakeX">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>خطا در ورود</AlertTitle>
                        <AlertDescription>{loginError}</AlertDescription>
                      </Alert>
                    )}
                    
                    <form onSubmit={(e) => handleSubmit(e, "normal")}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-sm font-medium">
                            نام کاربری
                          </Label>
                          <div className="relative">
                            <AtSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <Input
                              id="username"
                              type="text"
                              placeholder="نام کاربری خود را وارد کنید"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              disabled={isLoading || loginSuccess}
                              className="pr-10 py-5"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm font-medium">
                              رمز عبور
                            </Label>
                            <Link href="#" onClick={(e) => { e.preventDefault(); toast({ title: "بازیابی رمز عبور", description: "لینک بازیابی به ایمیل شما ارسال شد" }); }}>
                              <Button variant="link" className="h-auto p-0 text-xs text-slate-500 hover:text-tiffany">
                                فراموشی رمز عبور؟
                              </Button>
                            </Link>
                          </div>
                          <div className="relative">
                            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="رمز عبور خود را وارد کنید"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              disabled={isLoading || loginSuccess}
                              className="pr-10 py-5"
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
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Checkbox 
                              id="remember-me" 
                              checked={rememberMe} 
                              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                              disabled={isLoading || loginSuccess}
                            />
                            <Label htmlFor="remember-me" className="text-sm text-slate-500 dark:text-slate-400">
                              مرا به خاطر بسپار
                            </Label>
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: loginSuccess || isLoading ? 1 : 1.02 }}
                          whileTap={{ scale: loginSuccess || isLoading ? 1 : 0.98 }}
                        >
                          <Button 
                            type="submit" 
                            className="w-full py-6 bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light text-white rounded-xl text-base font-bold shadow-md"
                            disabled={isLoading || loginSuccess}
                          >
                            {isLoading ? (
                              <div className="flex items-center justify-center">
                                <RefreshCw className="h-5 w-5 ml-2 animate-spin" />
                                در حال ورود...
                              </div>
                            ) : loginSuccess ? (
                              <div className="flex items-center justify-center">
                                <CheckCircle2 className="h-5 w-5 ml-2" />
                                ورود موفق
                              </div>
                            ) : (
                              <div className="flex items-center justify-center">
                                <LogIn className="h-5 w-5 ml-2" />
                                ورود به سیستم
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </form>
                  </TabsContent>
                  
                  {/* حالت ورود با اثر انگشت */}
                  <TabsContent value="fingerprint">
                    <div className="text-center py-4">
                      <div className="flex justify-center mb-6">
                        <motion.div
                          animate={{
                            scale: fingerprintScan ? [1, 1.1, 1] : 1,
                            opacity: fingerprintScan ? [1, 0.7, 1] : 1
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: fingerprintScan ? Infinity : 0,
                            repeatType: "loop"
                          }}
                          className="w-32 h-32 rounded-full bg-tiffany/10 dark:bg-tiffany/20 flex items-center justify-center"
                        >
                          <Fingerprint className={`h-20 w-20 ${fingerprintScan ? 'text-tiffany' : 'text-slate-400 dark:text-slate-300'}`} />
                        </motion.div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">اثر انگشت خود را اسکن کنید</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-6">
                        برای ورود سریع، سنسور اثر انگشت را لمس کنید
                      </p>
                      
                      {!fingerprintScan && !isLoading && !loginSuccess && (
                        <Button
                          className="bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light text-white rounded-xl"
                          onClick={simulateFingerprintScan}
                          disabled={isLoading || loginSuccess}
                        >
                          شبیه‌سازی اسکن اثر انگشت
                        </Button>
                      )}
                      
                      {isLoading && (
                        <div className="flex items-center justify-center space-x-2 space-x-reverse">
                          <RefreshCw className="h-5 w-5 animate-spin text-tiffany" />
                          <span>در حال تایید هویت...</span>
                        </div>
                      )}
                      
                      {loginSuccess && (
                        <div className="flex items-center justify-center space-x-2 space-x-reverse">
                          <CheckCircle2 className="h-5 w-5 text-tiffany" />
                          <span>هویت شما تایید شد</span>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  {/* حالت ورود با رمز یکبار مصرف */}
                  <TabsContent value="otp">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username-otp" className="text-sm font-medium">
                          نام کاربری یا ایمیل
                        </Label>
                        <div className="relative">
                          <AtSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                          <Input
                            id="username-otp"
                            type="text"
                            placeholder="نام کاربری یا ایمیل خود را وارد کنید"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading || loginSuccess || otpSent}
                            className="pr-10 py-5"
                          />
                        </div>
                      </div>
                      
                      {otpSent ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="otp" className="text-sm font-medium">
                              رمز یکبار مصرف
                            </Label>
                            <div className="text-xs text-slate-500">
                              {otpTimeout > 0 ? (
                                <span>{otpTimeout} ثانیه تا درخواست مجدد</span>
                              ) : (
                                <Button 
                                  variant="link" 
                                  className="h-auto p-0 text-xs"
                                  onClick={requestOtp}
                                  disabled={isLoading || loginSuccess}
                                >
                                  ارسال مجدد کد
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="relative">
                            <Input
                              id="otp"
                              type="text"
                              placeholder="کد ۶ رقمی ارسال شده را وارد کنید"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                              maxLength={6}
                              disabled={isLoading || loginSuccess}
                              className="py-5 text-center tracking-widest text-lg"
                            />
                          </div>
                          
                          <motion.div
                            whileHover={{ scale: loginSuccess || isLoading ? 1 : 1.02 }}
                            whileTap={{ scale: loginSuccess || isLoading ? 1 : 0.98 }}
                            className="mt-4"
                          >
                            <Button 
                              type="button" 
                              className="w-full py-6 bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light text-white rounded-xl text-base font-bold shadow-md"
                              onClick={handleOtpLogin}
                              disabled={isLoading || loginSuccess || otp.length !== 6}
                            >
                              {isLoading ? (
                                <div className="flex items-center justify-center">
                                  <RefreshCw className="h-5 w-5 ml-2 animate-spin" />
                                  در حال ورود...
                                </div>
                              ) : loginSuccess ? (
                                <div className="flex items-center justify-center">
                                  <CheckCircle2 className="h-5 w-5 ml-2" />
                                  ورود موفق
                                </div>
                              ) : (
                                <div className="flex items-center justify-center">
                                  <LogIn className="h-5 w-5 ml-2" />
                                  ورود با رمز یکبار مصرف
                                </div>
                              )}
                            </Button>
                          </motion.div>
                        </div>
                      ) : (
                        <Button
                          type="button"
                          onClick={requestOtp}
                          className="w-full py-6 bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light text-white rounded-xl text-base font-bold shadow-md"
                          disabled={isLoading || loginSuccess || !username}
                        >
                          <div className="flex items-center justify-center">
                            <ShieldCheck className="h-5 w-5 ml-2" />
                            دریافت رمز یکبار مصرف
                          </div>
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                  <Separator className="mb-6" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      حساب کاربری ندارید؟
                    </span>
                    <Button 
                      variant="outline" 
                      onClick={navigateToRegister}
                      className="border-tiffany text-tiffany hover:bg-tiffany/10"
                      disabled={isLoading || loginSuccess}
                    >
                      <UserPlus className="h-4 w-4 ml-2" />
                      ثبت‌نام
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 pb-5">
                {/* ورود سریع با حساب‌های دمو */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="link" className="w-full text-slate-500 dark:text-slate-400 text-xs">
                      ورود سریع با حساب‌های نمونه
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="center">
                    <div className="grid gap-2">
                      <h4 className="font-medium mb-1 flex justify-between items-center">
                        <span>حساب‌های کاربری نمونه</span>
                        <Badge variant="outline" className="text-xs">رمز: password</Badge>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {sampleUsers.map((user) => (
                          <Button
                            key={user.id}
                            variant="outline"
                            size="sm"
                            onClick={() => quickLogin(user.id)}
                            disabled={isLoading || loginSuccess}
                            className={`flex justify-start gap-2 transition-all ${
                              quickLoginUserId === user.id ? "border-tiffany bg-tiffany/5" : ""
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${
                              user.role === "admin" ? "bg-red-500" :
                              user.role === "hr" ? "bg-purple-500" :
                              user.role === "manager" ? "bg-blue-500" :
                              "bg-green-500"
                            }`}></span>
                            <span className="text-xs">{user.displayName}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
        
        <motion.p 
          className="text-sm text-center mt-6 text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          © ۱۴۰۳ پرانا - تمامی حقوق محفوظ است
        </motion.p>
      </motion.div>
    </div>
  );
}
