import React from 'react';

export default function BasicHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="block mb-2">پرانا،</span>
          <span className="text-tiffany">دستیار هوشمند سلامت</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
          سامانه جامع مدیریت سلامت و ایمنی شغلی با امکانات پیشرفته گیمیفیکیشن، هوش مصنوعی و تحلیل داده برای محیط‌های کاری سالم‌تر و کارآمدتر
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <button className="px-6 py-3 bg-tiffany text-white rounded-lg shadow-lg hover:bg-tiffany-dark transition-all">
            شروع استفاده از پرانا
          </button>
          <button className="px-6 py-3 bg-white text-gray-900 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-100 transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
            مشاهده قابلیت‌ها
          </button>
        </div>
      </div>
    </div>
  );
}