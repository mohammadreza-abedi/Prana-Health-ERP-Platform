import React from 'react';
import { Heart, Activity, Sun, Moon, TrendingUp, AlertTriangle } from 'lucide-react';

/**
 * جزیره خلاصه وضعیت سلامت با نمودارهای پیشرفته و شاخص‌های مهم
 */
export function HealthSummaryIsland() {
  // داده‌های مثال برای نمایش - در نسخه نهایی از API دریافت خواهد شد
  const healthMetrics = {
    score: 87,
    change: 3,
    restingHeartRate: {
      current: 64,
      previous: 68,
      isGood: true
    },
    sleepQuality: {
      score: 82,
      hours: 7.4,
      isGood: true
    },
    stressLevel: {
      score: 42,
      isGood: true
    },
    activityScore: {
      score: 79,
      steps: 9340,
      isGood: true
    },
    warnings: [
      { id: 1, message: "میزان فعالیت هفته گذشته ۱۵٪ کاهش داشته است" }
    ]
  };

  return (
    <div className="glass-island min-h-[300px] p-5 rounded-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
          <Heart className="w-5 h-5 text-rose-500 mr-2" />
          خلاصه وضعیت سلامت
        </h3>
        <div className="glass px-2 py-1 rounded-lg text-xs font-medium">
          {healthMetrics.change > 0 ? (
            <span className="text-emerald-500 flex items-center">
              <TrendingUp className="w-3 h-3 ml-1" />
              {healthMetrics.change}٪ بهبود
            </span>
          ) : (
            <span className="text-rose-500">
              {Math.abs(healthMetrics.change)}٪ کاهش
            </span>
          )}
        </div>
      </div>

      {/* نمودار اصلی وضعیت سلامت */}
      <div className="relative mb-6 mt-2">
        <div className="flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle 
                className="text-slate-200 dark:text-slate-700" 
                strokeWidth="10"
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" 
              />
              <circle 
                className="text-tiffany" 
                strokeWidth="10" 
                strokeDasharray={`${healthMetrics.score * 2.51} 251`}
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="40" 
                cx="50" 
                cy="50" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-800 dark:text-white">{healthMetrics.score}</span>
              <span className="text-xs text-slate-500">امتیاز کل</span>
            </div>
          </div>
        </div>
      </div>

      {/* شاخص‌های سلامت */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="glass p-3 rounded-xl flex flex-col">
          <div className="flex items-center text-rose-500 mb-1">
            <Activity className="w-4 h-4 ml-1" />
            <span className="font-medium">ضربان قلب استراحت</span>
          </div>
          <div className="flex items-end justify-between mt-auto">
            <span className="text-xl font-bold text-slate-800 dark:text-white">{healthMetrics.restingHeartRate.current}</span>
            <span className={`text-xs ${healthMetrics.restingHeartRate.isGood ? 'text-emerald-500' : 'text-rose-500'}`}>
              {healthMetrics.restingHeartRate.previous > healthMetrics.restingHeartRate.current ? 
                `${healthMetrics.restingHeartRate.previous - healthMetrics.restingHeartRate.current} کاهش` : 
                `${healthMetrics.restingHeartRate.current - healthMetrics.restingHeartRate.previous} افزایش`}
            </span>
          </div>
        </div>

        <div className="glass p-3 rounded-xl flex flex-col">
          <div className="flex items-center text-blue-500 mb-1">
            <Moon className="w-4 h-4 ml-1" />
            <span className="font-medium">کیفیت خواب</span>
          </div>
          <div className="flex items-end justify-between mt-auto">
            <span className="text-xl font-bold text-slate-800 dark:text-white">{healthMetrics.sleepQuality.hours} ساعت</span>
            <span className={`text-xs ${healthMetrics.sleepQuality.isGood ? 'text-emerald-500' : 'text-rose-500'}`}>
              {healthMetrics.sleepQuality.score}% کیفیت
            </span>
          </div>
        </div>

        <div className="glass p-3 rounded-xl flex flex-col">
          <div className="flex items-center text-amber-500 mb-1">
            <Sun className="w-4 h-4 ml-1" />
            <span className="font-medium">سطح استرس</span>
          </div>
          <div className="flex items-end justify-between mt-auto">
            <span className="text-xl font-bold text-slate-800 dark:text-white">{healthMetrics.stressLevel.score}/100</span>
            <span className={`text-xs ${healthMetrics.stressLevel.isGood ? 'text-emerald-500' : 'text-rose-500'}`}>
              {healthMetrics.stressLevel.isGood ? 'طبیعی' : 'بالا'}
            </span>
          </div>
        </div>

        <div className="glass p-3 rounded-xl flex flex-col">
          <div className="flex items-center text-purple-500 mb-1">
            <Activity className="w-4 h-4 ml-1" />
            <span className="font-medium">فعالیت روزانه</span>
          </div>
          <div className="flex items-end justify-between mt-auto">
            <span className="text-xl font-bold text-slate-800 dark:text-white">{healthMetrics.activityScore.steps.toLocaleString()}</span>
            <span className={`text-xs ${healthMetrics.activityScore.isGood ? 'text-emerald-500' : 'text-rose-500'}`}>
              {healthMetrics.activityScore.score}% هدف
            </span>
          </div>
        </div>
      </div>

      {/* هشدارها و توصیه‌ها */}
      {healthMetrics.warnings.length > 0 && (
        <div className="mt-4 glass p-3 rounded-xl text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center text-amber-500 mb-2">
            <AlertTriangle className="w-4 h-4 ml-1" />
            <span className="font-medium">توصیه‌های سلامتی</span>
          </div>
          <ul className="space-y-1">
            {healthMetrics.warnings.map(warning => (
              <li key={warning.id} className="flex items-start">
                <span className="block w-1.5 h-1.5 mt-1.5 ml-2 rounded-full bg-amber-400"></span>
                {warning.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}