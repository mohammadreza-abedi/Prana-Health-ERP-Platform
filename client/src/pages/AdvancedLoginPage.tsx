import React, { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Shield, User, Briefcase, Key, Users as UsersIcon, EyeIcon, EyeOffIcon, AtSign, Lock, RefreshCcw, UserPlus, LogIn } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import PulsingLogo from '@/components/ui/pulsing-logo';

// تعریف انواع کاربران
type UserType = 'employee' | 'customer' | 'manager' | 'regular';

// اسکیمای فرم ورود
const loginSchema = z.object({
  username: z.string().min(3, {
    message: 'نام کاربری باید حداقل ۳ کاراکتر باشد',
  }),
  password: z.string().min(6, {
    message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
  }),
  userType: z.enum(['employee', 'customer', 'manager', 'regular']),
});

// اسکیمای فرم ثبت نام
const registerSchema = z.object({
  username: z.string().min(3, {
    message: 'نام کاربری باید حداقل ۳ کاراکتر باشد',
  }),
  displayName: z.string().min(2, {
    message: 'نام نمایشی باید حداقل ۲ کاراکتر باشد',
  }),
  email: z.string().email({
    message: 'ایمیل وارد شده معتبر نیست',
  }),
  password: z.string().min(6, {
    message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
  }),
  confirmPassword: z.string(),
  userType: z.enum(['employee', 'customer', 'manager', 'regular']),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'پذیرش قوانین و مقررات الزامی است',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'رمزهای عبور وارد شده مطابقت ندارند',
  path: ['confirmPassword'],
});

export default function AdvancedLoginPage() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<UserType>('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  // مدیریت انیمیشن بک‌گراند براساس حرکت موس
  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setBgPosition({ x, y });
  };

  // فرم ورود
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      userType: 'employee',
    },
  });

  // فرم ثبت نام
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'employee',
      agreeToTerms: false,
    },
  });

  // ارسال فرم ورود
  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      console.log('Login values:', values);
      
      // در اینجا باید اتصال به API واقعی انجام شود
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      
      toast({
        title: 'ورود موفقیت‌آمیز',
        description: 'در حال انتقال به داشبورد...',
        variant: 'default',
      });
      
      // هدایت کاربر به صفحه داشبورد
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'خطا در ورود',
        description: 'نام کاربری یا رمز عبور اشتباه است',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ارسال فرم ثبت‌نام
  const onRegisterSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      console.log('Register values:', values);
      
      // در اینجا باید اتصال به API واقعی انجام شود
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          displayName: values.displayName,
          email: values.email,
          password: values.password,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      const data = await response.json();
      
      toast({
        title: 'ثبت‌نام موفقیت‌آمیز',
        description: 'حساب کاربری شما با موفقیت ایجاد شد. اکنون می‌توانید وارد شوید.',
        variant: 'default',
      });
      
      // تغییر به تب ورود
      setActiveTab('login');
      loginForm.setValue('username', values.username);
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'خطا در ثبت‌نام',
        description: 'مشکلی در ایجاد حساب کاربری رخ داده است. لطفاً بعداً تلاش کنید.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // به‌روزرسانی userType در فرم‌ها هنگام تغییر
  useEffect(() => {
    loginForm.setValue('userType', userType);
    registerForm.setValue('userType', userType);
  }, [userType, loginForm, registerForm]);

  // کارت‌های اطلاعات نوع کاربری
  const userTypeInfo = {
    employee: {
      title: 'کارمندان',
      description: 'کارمندان و پرسنل سازمان می‌توانند به پنل مخصوص خود دسترسی داشته باشند.',
      icon: <User className="h-6 w-6" />,
      color: 'bg-tiffany/10 dark:bg-tiffany/20 text-tiffany dark:text-tiffany-light',
      cardClass: 'border-l-tiffany dark:border-l-tiffany-light'
    },
    customer: {
      title: 'مشتریان',
      description: 'مشتریان سازمان می‌توانند به پنل مخصوص مشتریان و پیگیری سفارشات دسترسی داشته باشند.',
      icon: <Briefcase className="h-6 w-6" />,
      color: 'bg-yellow/10 dark:bg-yellow/20 text-yellow dark:text-yellow-light',
      cardClass: 'border-l-yellow dark:border-l-yellow-light'
    },
    manager: {
      title: 'مدیران HR و HSE',
      description: 'مدیران و کارشناسان منابع انسانی و ایمنی به پنل‌های مدیریتی دسترسی خواهند داشت.',
      icon: <Shield className="h-6 w-6" />,
      color: 'bg-navy/10 dark:bg-navy/20 text-navy dark:text-navy-light',
      cardClass: 'border-l-navy dark:border-l-navy-light'
    },
    regular: {
      title: 'کاربران عادی',
      description: 'کاربران عادی می‌توانند به بخش‌های عمومی سامانه دسترسی داشته باشند.',
      icon: <UsersIcon className="h-6 w-6" />,
      color: 'bg-aqua/10 dark:bg-aqua/20 text-aqua dark:text-aqua-light',
      cardClass: 'border-l-aqua dark:border-l-aqua-light'
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(46, 196, 182, 0.15) 0%, rgba(46, 196, 182, 0) 50%),
          radial-gradient(circle at 80% 30%, rgba(0, 43, 69, 0.2) 0%, rgba(0, 43, 69, 0) 50%),
          radial-gradient(circle at 30% 70%, rgba(255, 187, 0, 0.1) 0%, rgba(255, 187, 0, 0) 50%),
          radial-gradient(circle at 85% 80%, rgba(82, 196, 185, 0.15) 0%, rgba(82, 196, 185, 0) 50%)
        `,
        backgroundSize: '200% 200%',
        backgroundPosition: `${50 + bgPosition.x * 10}% ${50 + bgPosition.y * 10}%`,
        transition: 'background-position 0.5s ease-out'
      }}
      onMouseMove={handleMouseMove}
    >
      {/* کارت اصلی با افکت شیشه‌ای */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* بخش راست - توضیحات و اطلاعات */}
          <div className="hidden md:flex flex-col space-y-6 order-2 md:order-1">
            {/* لوگو و عنوان */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center md:items-start mb-6"
            >
              <PulsingLogo size="lg" showText={true} />
              <p className="mt-4 text-slate-500 dark:text-slate-400 text-center md:text-right max-w-md">
                سامانه جامع هوشمند مدیریت سلامت و ایمنی شغلی پرانا
              </p>
            </motion.div>
            
            {/* اطلاعات انواع کاربری */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-3">
                انتخاب نوع کاربری
              </h3>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={userType}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`overflow-hidden border-r-0 border-l-4 ${userTypeInfo[userType].cardClass}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className={`p-3 rounded-xl ${userTypeInfo[userType].color} mr-4`}>
                          {userTypeInfo[userType].icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{userTypeInfo[userType].title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                            {userTypeInfo[userType].description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
              
              <div className="grid grid-cols-4 gap-2 mt-4">
                {(Object.keys(userTypeInfo) as UserType[]).map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setUserType(type)}
                    className={`p-2 rounded-lg text-center ${
                      userType === type
                        ? `${userTypeInfo[type].color} ring-2 ring-offset-2 ring-offset-background ring-${type === 'employee' ? 'tiffany' : type === 'customer' ? 'yellow' : type === 'manager' ? 'navy' : 'aqua'}/50`
                        : 'bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                    } transition-all duration-200`}
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-1">
                        {userTypeInfo[type].icon}
                      </div>
                      <span className="text-xs font-medium">
                        {type === 'employee' ? 'کارمندان' : 
                         type === 'customer' ? 'مشتریان' : 
                         type === 'manager' ? 'مدیران' : 'کاربران'}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* ویژگی‌های برجسته */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4">
                ویژگی‌های سامانه پرانا
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm p-3 rounded-lg">
                  <div className="p-2 bg-tiffany/10 dark:bg-tiffany/20 rounded-lg text-tiffany dark:text-tiffany-light mr-3">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">امنیت پیشرفته</div>
                </div>
                
                <div className="flex items-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm p-3 rounded-lg">
                  <div className="p-2 bg-yellow/10 dark:bg-yellow/20 rounded-lg text-yellow dark:text-yellow-light mr-3">
                    <RefreshCcw className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">همگام‌سازی خودکار</div>
                </div>
                
                <div className="flex items-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm p-3 rounded-lg">
                  <div className="p-2 bg-navy/10 dark:bg-navy/20 rounded-lg text-navy dark:text-navy-light mr-3">
                    <Key className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">سطوح دسترسی</div>
                </div>
                
                <div className="flex items-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm p-3 rounded-lg">
                  <div className="p-2 bg-aqua/10 dark:bg-aqua/20 rounded-lg text-aqua dark:text-aqua-light mr-3">
                    <UsersIcon className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">مدیریت کاربران</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* بخش چپ - فرم ورود/ثبت‌نام */}
          <div className="order-1 md:order-2">
            <Card className="backdrop-blur-xl border border-white/20 dark:border-white/5 shadow-xl">
              <CardContent className="p-6 md:p-8">
                <div className="md:hidden flex justify-center mb-8">
                  <PulsingLogo size="md" showText={true} />
                </div>
                
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
                  <TabsList className="grid grid-cols-2 mb-8">
                    <TabsTrigger value="login" className="text-base">ورود</TabsTrigger>
                    <TabsTrigger value="register" className="text-base">ثبت‌نام</TabsTrigger>
                  </TabsList>
                  
                  {/* فرم ورود */}
                  <TabsContent value="login" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">خوش آمدید</h2>
                        <p className="text-slate-500 dark:text-slate-400">
                          برای دسترسی به حساب کاربری خود وارد شوید
                        </p>
                      </div>
                      
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                          <FormField
                            control={loginForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>نام کاربری</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <AtSign className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <Input 
                                      placeholder="نام کاربری خود را وارد کنید" 
                                      className="pr-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>رمز عبور</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <Input 
                                      type={showPassword ? "text" : "password"} 
                                      placeholder="رمز عبور خود را وارد کنید" 
                                      className="pr-10" 
                                      {...field} 
                                    />
                                    <button 
                                      type="button"
                                      onClick={() => setShowPassword(!showPassword)}
                                      className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                    >
                                      {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                    </button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="text-sm text-left">
                            <a href="#" className="text-tiffany hover:text-tiffany-dark dark:hover:text-tiffany-light">
                              رمز عبور خود را فراموش کرده‌اید؟
                            </a>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-tiffany hover:bg-tiffany-hover text-white py-6"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                            ) : (
                              <LogIn className="h-5 w-5 ml-2" />
                            )}
                            ورود به حساب کاربری
                          </Button>
                        </form>
                      </Form>
                      
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
                          <span>حساب کاربری ندارید؟</span>
                          <button 
                            className="text-tiffany hover:text-tiffany-dark dark:hover:text-tiffany-light font-medium mr-1"
                            onClick={() => setActiveTab('register')}
                          >
                            ثبت‌نام کنید
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                  
                  {/* فرم ثبت‌نام */}
                  <TabsContent value="register" className="mt-0">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-2">ایجاد حساب کاربری</h2>
                        <p className="text-slate-500 dark:text-slate-400">
                          اطلاعات خود را وارد کنید و حساب کاربری جدید بسازید
                        </p>
                      </div>
                      
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={registerForm.control}
                              name="username"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>نام کاربری</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <AtSign className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                                      <Input 
                                        placeholder="نام کاربری" 
                                        className="pr-10" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registerForm.control}
                              name="displayName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>نام و نام خانوادگی</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                                      <Input 
                                        placeholder="نام و نام خانوادگی" 
                                        className="pr-10" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ایمیل</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <AtSign className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                                    <Input 
                                      type="email" 
                                      placeholder="ایمیل خود را وارد کنید" 
                                      className="pr-10" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={registerForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>رمز عبور</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Lock className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                                      <Input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="رمز عبور" 
                                        className="pr-10" 
                                        {...field} 
                                      />
                                      <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute left-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                      >
                                        {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                      </button>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={registerForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>تکرار رمز عبور</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Lock className="absolute right-3 top-2.5 h-5 w-5 text-slate-400" />
                                      <Input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="تکرار رمز عبور" 
                                        className="pr-10" 
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={registerForm.control}
                            name="agreeToTerms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 space-x-reverse">
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    className="accent-tiffany h-4 w-4 mt-1 ml-2"
                                    checked={field.value}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="font-normal cursor-pointer">
                                    <span className="text-slate-600 dark:text-slate-300">با </span>
                                    <a href="#" className="text-tiffany hover:text-tiffany-dark dark:hover:text-tiffany-light">قوانین و مقررات</a>
                                    <span className="text-slate-600 dark:text-slate-300"> استفاده از سامانه موافقم</span>
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-tiffany hover:bg-tiffany-hover text-white py-6 mt-4"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="h-5 w-5 ml-2 animate-spin" />
                            ) : (
                              <UserPlus className="h-5 w-5 ml-2" />
                            )}
                            ثبت‌نام
                          </Button>
                        </form>
                      </Form>
                      
                      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
                          <span>قبلاً ثبت‌نام کرده‌اید؟</span>
                          <button 
                            className="text-tiffany hover:text-tiffany-dark dark:hover:text-tiffany-light font-medium mr-1"
                            onClick={() => setActiveTab('login')}
                          >
                            وارد شوید
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}