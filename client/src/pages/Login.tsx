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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-tiffany/10 to-aqua/10 pointer-events-none"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-tiffany to-aqua flex items-center justify-center">
              <span className="text-navy font-bold text-2xl">پ</span>
            </div>
            <h1 className="text-3xl font-bold mr-3 text-tiffany">پرانا</h1>
          </div>
        </div>
        
        <Card className="glass dark:bg-slate-900/25 border-white/20 dark:border-white/5 shadow-lg">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-center">ورود به سامانه</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <AtSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="نام کاربری"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pr-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                  />
                </div>
                
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="رمز عبور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-tiffany hover:bg-tiffany-light"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></span>
                      در حال ورود...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <LogIn className="h-5 w-5 ml-2" />
                      ورود
                    </div>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
              <p className="mb-2">کاربران نمونه برای تست:</p>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">کاربر عادی:</p>
                  <p>amir / password</p>
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">مدیر HR:</p>
                  <p>hrmanager / password</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-sm text-center mt-6 text-slate-500 dark:text-slate-400">
          دستیار هوشمند سلامت شغلی، سلامت فردی و ارتقاء منابع انسانی
        </p>
      </motion.div>
    </div>
  );
}
