import { useState } from "react";
import { Shield, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const AdminPanelButton = ({ 
  variant = "outline", 
  className = "" 
}: { 
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null; 
  className?: string;
}) => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // برای سادگی، در اینجا رمز عبور را به صورت هاردکد قرار می‌دهیم
  // در نسخه تولید، این باید با سیستم احراز هویت واقعی جایگزین شود
  const ADMIN_PASSWORD = "admin1234";

  const handleAdminAuth = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setIsAuthDialogOpen(false);
      window.location.href = "/admin-panel";
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant={variant}
                className={`group transition-all duration-300 relative overflow-hidden ${className}`}
                size="icon"
                onClick={() => {
                  if (isAuthorized) {
                    window.location.href = "/admin-panel";
                  } else {
                    setIsAuthDialogOpen(true);
                  }
                }}
              >
                <Shield className="h-5 w-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 text-slate-700 dark:text-slate-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ zIndex: -1 }}>
                  <div className="absolute inset-0 bg-grid-slate-300/[0.04] dark:bg-grid-slate-100/[0.03] bg-[size:20px_20px]"></div>
                </div>
                
                {/* افکت درخشش */}
                <div className="absolute -inset-1 rounded-md bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 dark:from-red-600/10 dark:via-red-600/5 dark:to-red-600/10 blur-md opacity-0 group-hover:opacity-100 animate-pulse-slow"></div>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-white/95 dark:bg-slate-800/95 border border-slate-200/50 dark:border-slate-700/50 shadow-lg backdrop-blur-sm">
            <p>دسترسی به پنل مدیریت</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-500" />
              ورود به پنل مدیریت
            </DialogTitle>
            <DialogDescription>
              برای دسترسی به پنل مدیریت، لطفاً رمز عبور ادمین را وارد کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="admin-password" className={isInvalid ? "text-red-500" : ""}>
                رمز عبور ادمین
              </Label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="off"
                className={isInvalid ? "border-red-500 focus-visible:ring-red-500" : ""}
                value={adminPassword}
                onChange={(e) => {
                  setAdminPassword(e.target.value);
                  setIsInvalid(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAdminAuth();
                  }
                }}
              />
              {isInvalid && (
                <p className="text-red-500 text-sm">رمز عبور نادرست است.</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleAdminAuth}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              ورود به پنل مدیریت
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};