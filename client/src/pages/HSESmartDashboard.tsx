import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// کامپوننت اصلی داشبورد HSE
export default function HSESmartDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">داشبورد هوشمند HSE</h1>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        نمای 360 درجه از وضعیت سلامت، ایمنی و محیط زیست سازمان
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>شاخص HSE سازمانی</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">94</p>
            <p className="text-tiffany">بهبود 12% نسبت به دوره قبل</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>حوادث بدون توقف کار</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">5</p>
            <p className="text-amber-500">کاهش 35% نسبت به دوره قبل</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>روزهای بدون حادثه</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">183</p>
            <p className="text-blue-500">6 ماه بدون حادثه اصلی</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}