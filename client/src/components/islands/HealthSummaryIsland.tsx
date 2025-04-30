import { Activity, Heart, PlusCircle, TrendingUp, ArrowUpRight, BarChart2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

// مدلسازی داده برای نمایش در چارت‌ها
const healthData = [
  { name: "شنبه", value: 82 },
  { name: "یکشنبه", value: 84 },
  { name: "دوشنبه", value: 78 },
  { name: "سه‌شنبه", value: 81 },
  { name: "چهارشنبه", value: 85 },
  { name: "پنجشنبه", value: 88 },
  { name: "جمعه", value: 90 },
];

export function HealthSummaryIsland() {
  return (
    <div className="glass-island p-4 rounded-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-tiffany/10 mr-2">
            <Heart className="h-5 w-5 text-tiffany" />
          </div>
          <h3 className="text-base font-bold text-white">خلاصه وضعیت سلامت</h3>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-tiffany mr-2">+12% نسبت به ماه قبل</span>
          <div className="p-1 rounded-md bg-tiffany/10">
            <TrendingUp className="h-3.5 w-3.5 text-tiffany" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* بخش اول: امتیاز سلامت کلی */}
        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
          <div className="text-sm text-slate-300 mb-1">امتیاز سلامت</div>
          <div className="text-3xl font-bold text-tiffany">۸۵<span className="text-sm text-slate-400"> / ۱۰۰</span></div>
          
          <div className="mt-2 space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">فعالیت فیزیکی</span>
                <span className="text-tiffany">خوب</span>
              </div>
              <Progress value={85} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-tiffany" />
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">تغذیه</span>
                <span className="text-tiffany">خوب</span>
              </div>
              <Progress value={78} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-tiffany" />
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">خواب</span>
                <span className="text-amber-400">متوسط</span>
              </div>
              <Progress value={65} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-amber-400" />
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">مدیریت استرس</span>
                <span className="text-amber-400">متوسط</span>
              </div>
              <Progress value={60} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-amber-400" />
            </div>
            
            <div className="pt-2">
              <Button variant="ghost" size="sm" className="w-full text-xs text-tiffany bg-tiffany/5 hover:bg-tiffany/10 border border-tiffany/10">
                <PlusCircle className="h-3.5 w-3.5 mr-1" />
                ثبت داده‌های جدید
              </Button>
            </div>
          </div>
        </div>
        
        {/* بخش دوم: روند سلامت و شاخص‌های کلیدی */}
        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
          <div className="text-sm text-slate-300 mb-2">روند سلامت هفته گذشته</div>
          
          <div className="h-[140px] w-full relative mb-3">
            <div className="absolute inset-0 flex items-end space-x-1">
              {healthData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-tiffany/50 rounded-t"
                    style={{ 
                      height: `${(item.value / 100) * 100}px`,
                      backgroundImage: 'linear-gradient(to top, rgba(46, 217, 189, 0.9), rgba(46, 217, 189, 0.2))'
                    }}
                  ></div>
                  <div className="text-[9px] text-slate-400 mt-1">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-tiffany mr-2"></div>
                <span className="text-xs text-slate-300">BMI</span>
              </div>
              <div className="text-sm font-medium text-white">۲۲.۸</div>
              <span className="text-xs text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                طبیعی
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-rose-400 mr-2"></div>
                <span className="text-xs text-slate-300">فشار خون</span>
              </div>
              <div className="text-sm font-medium text-white">۱۲۰/۸۰</div>
              <span className="text-xs text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                طبیعی
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
                <span className="text-xs text-slate-300">قند خون</span>
              </div>
              <div className="text-sm font-medium text-white">۹۸ mg/dL</div>
              <span className="text-xs text-emerald-400 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                طبیعی
              </span>
            </div>
          </div>
        </div>
        
        {/* بخش سوم: فعالیت‌های و پیشنهادات سلامتی */}
        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/30">
          <div className="text-sm text-slate-300 mb-3">پیشنهادات تندرستی</div>
          
          <div className="space-y-3">
            <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-700/40">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-tiffany/10 flex items-center justify-center flex-shrink-0 mr-2">
                  <Activity className="h-4 w-4 text-tiffany" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">افزایش فعالیت فیزیکی</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">پیاده‌روی سریع ۳۰ دقیقه در روز</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-700/40">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mr-2">
                  <BarChart2 className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">بهبود الگوی خواب</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">۷-۸ ساعت خواب منظم در شب</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900/50 p-2.5 rounded-lg border border-slate-700/40">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0 mr-2">
                  <Heart className="h-4 w-4 text-rose-400" />
                </div>
                <div>
                  <div className="text-xs font-medium text-white">مدیریت استرس</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">تمرینات تنفس و مدیتیشن ۱۰ دقیقه‌ای</div>
                </div>
              </div>
            </div>
            
            <div className="pt-1">
              <Button variant="outline" size="sm" className="w-full text-xs text-slate-300 bg-slate-800/60 border-slate-700/50 hover:bg-slate-700/50">
                مشاهده همه پیشنهادات
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}