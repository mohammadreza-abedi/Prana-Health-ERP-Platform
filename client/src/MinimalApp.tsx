import React from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

function MinimalApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center">
        <div className="p-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">
            پرانا - دستیار هوشمند سلامت
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            سیستم در حال بازیابی و آماده‌سازی است. لطفا شکیبا باشید.
          </p>
          <div className="flex justify-center">
            <div className="h-10 w-10 border-4 border-tiffany border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default MinimalApp;