import { Activity, Heart, TrendingUp, ArrowUp, ArrowDown, BarChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function HealthSummaryIsland() {
  return (
    <div className="glass-island p-4 rounded-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-tiffany/10 mr-2">
            <Heart className="h-5 w-5 text-tiffany" />
          </div>
          <h3 className="text-base font-bold text-white">وضعیت کلی سلامت</h3>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-tiffany mr-2">+12% نسبت به ماه قبل</span>
          <div className="p-1 rounded-md bg-tiffany/10">
            <TrendingUp className="h-3.5 w-3.5 text-tiffany" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-300 font-medium">شاخص BMI</div>
            <div className="p-1.5 rounded-lg bg-amber-500/10">
              <Activity className="h-4 w-4 text-amber-400" />
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-3xl font-bold text-white">23.4</div>
            <div className="flex items-center mt-1">
              <ArrowUp className="h-3 w-3 text-emerald-400 mr-1" />
              <span className="text-xs text-emerald-400">نرمال</span>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">میانگین تیم</span>
              <span className="text-slate-300">24.2</span>
            </div>
            <Progress value={78} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-amber-400" />
          </div>
        </div>
        
        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-300 font-medium">فشار خون</div>
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-3xl font-bold text-white">120/80</div>
            <div className="flex items-center mt-1">
              <ArrowUp className="h-3 w-3 text-emerald-400 mr-1" />
              <span className="text-xs text-emerald-400">عالی</span>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">میانگین تیم</span>
              <span className="text-slate-300">130/85</span>
            </div>
            <Progress value={95} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-emerald-400" />
          </div>
        </div>
        
        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-300 font-medium">فعالیت فیزیکی</div>
            <div className="p-1.5 rounded-lg bg-rose-500/10">
              <Activity className="h-4 w-4 text-rose-400" />
            </div>
          </div>
          
          <div className="mt-2">
            <div className="text-3xl font-bold text-white">5.4k</div>
            <div className="flex items-center mt-1">
              <ArrowDown className="h-3 w-3 text-rose-400 mr-1" />
              <span className="text-xs text-rose-400">پایین‌تر از حد نرمال</span>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">میانگین تیم</span>
              <span className="text-slate-300">7.5k</span>
            </div>
            <Progress value={45} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-rose-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="p-1.5 rounded-lg bg-tiffany/10 mr-2">
              <BarChart className="h-4 w-4 text-tiffany" />
            </div>
            <h4 className="text-sm font-bold text-white">روند شاخص‌های سلامت طی ۶ ماه اخیر</h4>
          </div>
        </div>
        
        <div className="h-60">
          {/* اینجا نمودار قرار می‌گیرد - در نسخه بعدی */}
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-slate-400 text-sm mb-2">در حال بارگذاری نمودارها...</div>
              <div className="spacecraft-loader"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}