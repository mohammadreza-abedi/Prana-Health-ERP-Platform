import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AtSign, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "خطا",
        description: "لطفا نام کاربری و رمز عبور را وارد کنید",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Dynamic background with Windows 11 style */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-tiffany/5 to-aqua/5 dark:from-navy/20 dark:to-tiffany/10 pointer-events-none"></div>
      
      {/* Blurred circles like Windows 11 */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-tiffany/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-aqua/20 blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-yellow/10 blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tiffany to-aqua flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-3xl">پ</span>
            </div>
            <h1 className="text-4xl font-black mr-3 bg-gradient-to-r from-tiffany to-aqua bg-clip-text text-transparent">پرانا</h1>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="acrylic p-8 dark:bg-slate-900/30">
            <h2 className="text-2xl font-bold mb-8 text-center">ورود به دستیار هوشمند پرانا</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="relative">
                  <AtSign className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="نام کاربری"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pr-12 py-6 bg-white/50 dark:bg-slate-800/50 border-white/30 dark:border-white/10 rounded-xl text-lg"
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="رمز عبور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-12 py-6 bg-white/50 dark:bg-slate-800/50 border-white/30 dark:border-white/10 rounded-xl text-lg"
                  />
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-gradient-to-r from-tiffany to-aqua hover:from-tiffany-light hover:to-aqua-light text-white rounded-xl text-lg font-bold shadow-md"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></span>
                        در حال ورود...
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
            
            <motion.div 
              className="mt-8 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="mb-2 text-slate-600 dark:text-slate-300">کاربران نمونه برای تست:</p>
              <div className="grid grid-cols-2 gap-3 glass p-4 rounded-xl">
                <div className="p-3 mica rounded-lg">
                  <p className="font-bold text-slate-800 dark:text-white">کاربر عادی:</p>
                  <p className="text-slate-600 dark:text-slate-300">amir / password</p>
                </div>
                <div className="p-3 mica rounded-lg">
                  <p className="font-bold text-slate-800 dark:text-white">مدیر HR:</p>
                  <p className="text-slate-600 dark:text-slate-300">hrmanager / password</p>
                </div>
              </div>
            </motion.div>
          </div>
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
