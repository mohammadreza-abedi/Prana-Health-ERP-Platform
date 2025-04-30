import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock, Calendar, PieChart, ArrowUpRight } from 'lucide-react';

/**
 * جزیره نمایش عملکرد HSE با شاخص‌های ایمنی و سلامت محیط کار
 */
export function HSEPerformanceIsland() {
  // داده‌های مثال برای نمایش - در نسخه نهایی از API دریافت خواهد شد
  const hseData = {
    safetyScore: 96,
    incidentFree: 142, // روزهای بدون حادثه
    incidents: {
      total: 3,
      thisYear: 1,
      byType: [
        { type: 'جزئی', count: 2, color: 'amber' },
        { type: 'متوسط', count: 1, color: 'orange' },
        { type: 'شدید', count: 0, color: 'rose' }
      ]
    },
    inspections: {
      completed: 28,
      scheduled: 30,
      nextDate: '1404/02/15'
    },
    compliance: {
      score: 98,
      certificates: [
        { id: 1, name: 'ISO 45001', expiry: '1404/09/22', status: 'active' },
        { id: 2, name: 'HSE-MS', expiry: '1404/06/15', status: 'active' }
      ]
    },
    recentUpdates: [
      { id: 1, text: 'بروزرسانی دستورالعمل‌های ایمنی انجام شد', date: '۱۴۰۴/۰۲/۰۳', type: 'success' },
      { id: 2, text: 'بازرسی دوره‌ای تجهیزات انجام شد', date: '۱۴۰۴/۰۱/۲۸', type: 'info' }
    ]
  };

  // محاسبه درصد اتمام بازرسی‌ها
  const inspectionPercentage = Math.round((hseData.inspections.completed / hseData.inspections.scheduled) * 100);

  return (
    <div className="glass-island success p-5 rounded-2xl">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
          <Shield className="w-5 h-5 text-emerald-500 mr-2" />
          گزارش عملکرد HSE
        </h3>
        <div className="glass px-3 py-1 rounded-full text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center">
          <Clock className="w-3.5 h-3.5 ml-1" />
          {hseData.incidentFree} روز بدون حادثه
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* امتیاز ایمنی */}
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">امتیاز ایمنی</h4>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              hseData.safetyScore >= 90 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
              hseData.safetyScore >= 70 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
              'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
            }`}>
              {hseData.safetyScore >= 90 ? 'عالی' :
               hseData.safetyScore >= 70 ? 'متوسط' :
               'ضعیف'}
            </span>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300">
                  {hseData.safetyScore}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-200 dark:bg-slate-700">
              <div 
                style={{ width: `${hseData.safetyScore}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-emerald-400 to-tiffany"
              ></div>
            </div>
          </div>
        </div>

        {/* پیشرفت بازرسی‌ها */}
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">بازرسی‌های دوره‌ای</h4>
            <div className="flex items-center text-xs font-medium text-slate-600 dark:text-slate-400">
              <Calendar className="w-3.5 h-3.5 ml-1" />
              {hseData.inspections.nextDate}
            </div>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-tiffany bg-tiffany-100 dark:bg-tiffany-900/20 dark:text-tiffany-light">
                  {inspectionPercentage}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {hseData.inspections.completed} از {hseData.inspections.scheduled}
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-200 dark:bg-slate-700">
              <div 
                style={{ width: `${inspectionPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-tiffany to-blue-400"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* حوادث و رخدادها */}
      <div className="glass p-4 rounded-xl mb-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center">
            <AlertTriangle className="w-4 h-4 ml-1 text-amber-500" />
            وضعیت حوادث
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400">{hseData.incidents.thisYear} مورد در سال جاری</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3">
          {hseData.incidents.byType.map((incident, index) => (
            <div key={index} className="glass p-2 rounded-lg flex flex-col items-center justify-center">
              <span className={`text-lg font-bold ${
                incident.color === 'amber' ? 'text-amber-500' :
                incident.color === 'orange' ? 'text-orange-500' :
                'text-rose-500'
              }`}>
                {incident.count}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center">
                {incident.type}
              </span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center">
            <CheckCircle className="w-3.5 h-3.5 ml-1 text-emerald-500" />
            نرخ حوادث نسبت به سال قبل: ۳۵٪ کاهش
          </span>
        </div>
      </div>

      {/* گواهینامه‌ها و به‌روزرسانی‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* گواهینامه‌های HSE */}
        <div className="glass p-4 rounded-xl">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
            گواهینامه‌های HSE
          </h4>
          <ul className="space-y-2">
            {hseData.compliance.certificates.map(cert => (
              <li key={cert.id} className="glass p-2 rounded-md flex items-center justify-between">
                <span className="font-medium text-xs text-slate-700 dark:text-slate-300">{cert.name}</span>
                <div className="flex items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">اعتبار: {cert.expiry}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* به‌روزرسانی‌های اخیر */}
        <div className="glass p-4 rounded-xl">
          <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center justify-between">
            <span>به‌روزرسانی‌های اخیر</span>
            <a href="#" className="text-xs font-medium text-tiffany flex items-center hover:underline">
              مشاهده همه
              <ArrowUpRight className="w-3 h-3 mr-1" />
            </a>
          </h4>
          <ul className="space-y-2">
            {hseData.recentUpdates.map(update => (
              <li key={update.id} className="glass p-2 rounded-md flex items-start">
                <span className={`w-2 h-2 mt-1.5 ml-2 rounded-full ${
                  update.type === 'success' ? 'bg-emerald-500' :
                  update.type === 'warning' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`}></span>
                <div className="flex-1">
                  <p className="text-xs text-slate-700 dark:text-slate-300">{update.text}</p>
                  <p className="text-[10px] text-slate-500">{update.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}