import React, { useState } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

function MinimalApp() {
  const [mode, setMode] = useState('minimal');
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="p-8 bg-slate-800 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6 text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>
            پرانا - دستیار هوشمند سلامت
          </h1>
          <p className="text-center text-slate-300 mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
            سیستم در حال بازیابی و آماده‌سازی است. لطفا شکیبا باشید.
          </p>
          <div className="flex justify-center mb-6">
            <div className="h-10 w-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <div className="flex flex-col gap-3 mt-8">
            <button 
              onClick={() => {
                localStorage.removeItem('prana_app_mode');
                window.location.reload();
              }}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              نسخه کامل
            </button>
            
            <button 
              onClick={() => {
                localStorage.setItem('prana_app_mode', 'MINIMAL');
                window.location.reload();
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              نسخه ساده‌شده
            </button>
            
            <button 
              onClick={() => {
                localStorage.setItem('prana_app_mode', 'SIMPLEST');
                window.location.reload();
              }}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              ساده‌ترین نسخه (بدون استایل)
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-slate-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
          حالت فعلی: {localStorage.getItem('prana_app_mode') || 'کامل'}
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default MinimalApp;