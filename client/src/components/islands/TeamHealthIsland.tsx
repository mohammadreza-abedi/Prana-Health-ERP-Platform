import { Users, Award, CrownIcon, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function TeamHealthIsland() {
  return (
    <div className="glass-island p-4 rounded-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-purple-500/10 mr-2">
            <Users className="h-5 w-5 text-purple-400" />
          </div>
          <h3 className="text-base font-bold text-white">سلامت تیمی</h3>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-purple-400 mr-2">+7% نسبت به ماه قبل</span>
          <div className="p-1 rounded-md bg-purple-500/10">
            <TrendingUp className="h-3.5 w-3.5 text-purple-400" />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="p-1.5 rounded-lg bg-amber-500/10 mr-2">
                <Award className="h-4 w-4 text-amber-400" />
              </div>
              <h4 className="text-sm font-medium text-white">امتیاز سلامت تیمی</h4>
            </div>
            <div className="text-lg font-bold text-amber-400">۸۷/۱۰۰</div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-2 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">متوسط BMI</span>
                <span className="text-emerald-400">عالی</span>
              </div>
              <Progress value={92} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-emerald-400" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">فشار خون</span>
                <span className="text-emerald-400">عالی</span>
              </div>
              <Progress value={94} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-emerald-400" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-2 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">فعالیت فیزیکی</span>
                <span className="text-amber-400">متوسط</span>
              </div>
              <Progress value={65} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-amber-400" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">استرس</span>
                <span className="text-rose-400">زیاد</span>
              </div>
              <Progress value={45} className="h-1.5 bg-slate-700/50" indicatorClassName="bg-rose-400" />
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="p-1.5 rounded-lg bg-tiffany/10 mr-2">
                <CrownIcon className="h-4 w-4 text-tiffany" />
              </div>
              <h4 className="text-sm font-medium text-white">رتبه‌بندی واحدهای سازمانی</h4>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { name: "واحد فنی و مهندسی", score: 92, color: "bg-emerald-400" },
              { name: "واحد IT", score: 89, color: "bg-emerald-400" },
              { name: "واحد HSE", score: 87, color: "bg-tiffany" },
              { name: "واحد منابع انسانی", score: 76, color: "bg-amber-400" },
              { name: "واحد تولید", score: 65, color: "bg-rose-400" }
            ].map((dept, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs text-slate-300 ml-2">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1 text-xs">
                    <span className="text-slate-300">{dept.name}</span>
                    <span className="text-slate-300">{dept.score}٪</span>
                  </div>
                  <Progress value={dept.score} className="h-1.5 bg-slate-700/50" indicatorClassName={dept.color} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}