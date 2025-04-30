import React from 'react';
import { Users, Medal, TrendingUp, Award } from 'lucide-react';

/**
 * جزیره سلامت تیمی با امتیازات و رتبه‌بندی دپارتمان‌ها
 */
export function TeamHealthIsland() {
  // داده‌های مثال برای نمایش - در نسخه نهایی از API دریافت خواهد شد
  const teamData = {
    departmentRank: 2,
    totalDepartments: 8,
    score: 91,
    change: 4,
    leaderboard: [
      { id: 1, name: "مالی", score: 94, change: 2, color: "amber" },
      { id: 2, name: "فناوری اطلاعات", score: 91, change: 4, color: "tiffany" },
      { id: 3, name: "منابع انسانی", score: 87, change: -1, color: "purple" },
      { id: 4, name: "عملیات", score: 84, change: 3, color: "aqua" },
      { id: 5, name: "فروش", score: 82, change: 1, color: "emerald" }
    ],
    topPerformers: [
      { id: 101, name: "مریم احمدی", department: "فناوری اطلاعات", score: 97 },
      { id: 102, name: "علی محمدی", department: "فناوری اطلاعات", score: 95 }
    ]
  };

  return (
    <div className="glass-island tiffany p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
          <Users className="w-5 h-5 text-tiffany mr-2" />
          سلامت سازمانی
        </h3>
        <div className="glass px-3 py-1 rounded-full text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center">
          <Medal className="w-3.5 h-3.5 ml-1" />
          رتبه {teamData.departmentRank} از {teamData.totalDepartments}
        </div>
      </div>

      {/* نمودار امتیاز تیمی */}
      <div className="flex items-center mb-6">
        <div className="relative w-20 h-20">
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
              strokeDasharray={`${teamData.score * 2.51} 251`}
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-slate-800 dark:text-white">{teamData.score}</span>
            <span className="text-xs text-slate-500">امتیاز</span>
          </div>
        </div>
        <div className="mr-4 flex-1">
          <div className="flex items-center text-xs mb-1">
            <span className="font-medium text-slate-600 dark:text-slate-400">امتیاز سلامت سازمانی</span>
            <span className="glass ml-auto px-2 py-0.5 rounded-md text-tiffany flex items-center text-xs">
              <TrendingUp className="w-3 h-3 ml-1" />
              {teamData.change}٪
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-tiffany to-tiffany-light rounded-full" 
              style={{ width: `${teamData.score}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      </div>

      {/* جدول امتیازات دپارتمان‌ها */}
      <div className="mb-5">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">رتبه‌بندی دپارتمان‌ها</h4>
        <div className="space-y-3">
          {teamData.leaderboard.map((dept, index) => (
            <div key={dept.id} className="glass p-2 rounded-lg flex items-center">
              <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                index === 0 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300' :
                index === 1 ? 'bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300' :
                index === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-300' :
                'bg-slate-100 text-slate-600 dark:bg-slate-800/50 dark:text-slate-400'
              }`}>
                {index + 1}
              </div>
              <span className="mr-2 text-sm font-medium text-slate-700 dark:text-slate-300">{dept.name}</span>
              <div className="ml-auto flex items-center">
                <span className="text-sm font-bold text-slate-800 dark:text-white">{dept.score}</span>
                <span className={`mr-2 text-xs ${
                  dept.change > 0 ? 'text-emerald-500' : 'text-rose-500'
                }`}>
                  {dept.change > 0 ? '▲' : '▼'} {Math.abs(dept.change)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* برترین‌های سلامت */}
      <div>
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center">
          <Award className="w-4 h-4 ml-1 text-amber-500" />
          برترین‌های سلامت دپارتمان
        </h4>
        <div className="space-y-2">
          {teamData.topPerformers.map((person) => (
            <div key={person.id} className="glass p-2 rounded-lg flex items-center">
              <div className="w-8 h-8 rounded-full bg-tiffany/10 flex items-center justify-center text-tiffany">
                {person.name.charAt(0)}
              </div>
              <div className="mr-2">
                <div className="text-sm font-medium text-slate-800 dark:text-white">{person.name}</div>
                <div className="text-xs text-slate-500">{person.department}</div>
              </div>
              <div className="ml-auto px-2 py-0.5 bg-tiffany/10 rounded-md text-xs font-medium text-tiffany">
                {person.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}