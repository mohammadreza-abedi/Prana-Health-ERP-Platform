import { HardHat, TrendingUp, ShieldCheck, AlertTriangle, ShieldAlert, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function HSEPerformanceIsland() {
  return (
    <div className="glass-island p-4 rounded-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-amber-500/10 mr-2">
            <HardHat className="h-5 w-5 text-amber-400" />
          </div>
          <h3 className="text-base font-bold text-white">عملکرد بهداشت، ایمنی و محیط زیست</h3>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-amber-400 mr-2">+15% نسبت به ماه قبل</span>
          <div className="p-1 rounded-md bg-amber-500/10">
            <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-300 font-medium">ضریب ایمنی</div>
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-3xl font-bold text-white">96.2٪</div>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-emerald-400 text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 mr-1"></div>
                عالی
              </div>
              <div className="flex items-center text-slate-400 text-xs mr-3">
                <div className="w-2 h-2 rounded-full bg-slate-500 mr-1"></div>
                هدف: 95٪
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">پیشرفت ۶ ماهه</span>
            </div>
            <Progress value={96} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-emerald-400" />
          </div>
        </div>
        
        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-300 font-medium">حوادث ثبت شده</div>
            <div className="p-1.5 rounded-lg bg-amber-500/10">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-3xl font-bold text-white">17 <span className="text-sm text-slate-400">مورد</span></div>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-amber-400 text-xs">
                <div className="w-2 h-2 rounded-full bg-amber-400 mr-1"></div>
                متوسط
              </div>
              <div className="flex items-center text-slate-400 text-xs mr-3">
                <div className="w-2 h-2 rounded-full bg-slate-500 mr-1"></div>
                هدف: &lt;15
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">بهبود نسبت به دوره قبل</span>
            </div>
            <Progress value={65} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-amber-400" />
          </div>
        </div>
        
        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-300 font-medium">شاخص خطر</div>
            <div className="p-1.5 rounded-lg bg-rose-500/10">
              <ShieldAlert className="h-4 w-4 text-rose-400" />
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-3xl font-bold text-white">21.3٪</div>
            <div className="flex items-center mt-1">
              <div className="flex items-center text-rose-400 text-xs">
                <div className="w-2 h-2 rounded-full bg-rose-400 mr-1"></div>
                نیاز به توجه
              </div>
              <div className="flex items-center text-slate-400 text-xs mr-3">
                <div className="w-2 h-2 rounded-full bg-slate-500 mr-1"></div>
                هدف: &lt;20٪
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">وضعیت فعلی</span>
            </div>
            <Progress value={45} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-rose-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="p-1.5 rounded-lg bg-rose-500/10 mr-2">
              <AlertCircle className="h-4 w-4 text-rose-400" />
            </div>
            <h4 className="text-sm font-bold text-white">مناطق با ریسک بالا</h4>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-rose-400 mr-2"></div>
              <span className="text-slate-300 font-medium">سالن تولید شماره ۳</span>
              <div className="ml-2 px-1.5 py-0.5 bg-rose-500/10 rounded text-rose-400">ریسک بالا</div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-lg text-slate-400 border border-slate-700/40">
              <p>مشکل: نشت احتمالی مواد شیمیایی در واحد تصفیه</p>
              <p className="mt-1">اقدام: بازرسی فوری لوله‌ها و شیرهای اتصال</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
              <span className="text-slate-300 font-medium">آزمایشگاه کنترل کیفیت</span>
              <div className="ml-2 px-1.5 py-0.5 bg-amber-500/10 rounded text-amber-400">ریسک متوسط</div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-lg text-slate-400 border border-slate-700/40">
              <p>مشکل: سیستم تهویه نیازمند بازبینی و بهینه‌سازی</p>
              <p className="mt-1">اقدام: بررسی کیفیت هوا و سرویس فن‌ها</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-rose-400 mr-2"></div>
              <span className="text-slate-300 font-medium">انبار مواد اولیه</span>
              <div className="ml-2 px-1.5 py-0.5 bg-rose-500/10 rounded text-rose-400">ریسک بالا</div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-lg text-slate-400 border border-slate-700/40">
              <p>مشکل: سیستم اطفاء حریق خودکار نیازمند به‌روزرسانی</p>
              <p className="mt-1">اقدام: بررسی و تعویض تجهیزات فرسوده</p>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></div>
              <span className="text-slate-300 font-medium">دفاتر اداری</span>
              <div className="ml-2 px-1.5 py-0.5 bg-emerald-500/10 rounded text-emerald-400">ریسک پایین</div>
            </div>
            <div className="bg-slate-800/50 p-2 rounded-lg text-slate-400 border border-slate-700/40">
              <p>مشکل: مسیرهای خروج اضطراری نیاز به علامت‌گذاری بهتر</p>
              <p className="mt-1">اقدام: نصب علائم هشدار و آموزش پرسنل</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}