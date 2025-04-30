import React from "react";
import WeatherWidget from "@/components/weather/WeatherWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

/**
 * صفحه اطلاعات آب و هوا
 * استفاده از API هواشناسی برای نمایش وضعیت آب و هوای شهرهای مختلف
 */
export default function WeatherInfo() {
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">
          اطلاعات آب و هوا
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          در این صفحه می‌توانید وضعیت آب و هوای شهرهای مختلف را مشاهده کنید.
          این اطلاعات با استفاده از API رایگان WeatherAPI دریافت می‌شوند.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="current">وضعیت فعلی</TabsTrigger>
              <TabsTrigger value="howto">راهنمای استفاده</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <WeatherWidget />
            </TabsContent>
            
            <TabsContent value="howto">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">راهنمای استفاده از ویجت آب و هوا</h3>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 dark:border-blue-400">
                      <h4 className="font-semibold mb-2">جستجوی شهر</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        برای مشاهده اطلاعات آب و هوا، نام شهر مورد نظر را در کادر جستجو وارد کرده و دکمه جستجو را بزنید.
                        می‌توانید نام شهر را به فارسی یا انگلیسی وارد کنید.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4 dark:border-green-400">
                      <h4 className="font-semibold mb-2">اطلاعات نمایش داده شده</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        در صفحه نتایج، اطلاعاتی مانند دما، وضعیت آب و هوا، رطوبت، سرعت باد، شاخص UV و کیفیت هوا نمایش داده می‌شود.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-amber-500 pl-4 dark:border-amber-400">
                      <h4 className="font-semibold mb-2">شاخص کیفیت هوا</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        شاخص کیفیت هوا (AQI) به صورت زیر تفسیر می‌شود:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-gray-600 dark:text-gray-400">
                        <li>عالی: کیفیت هوا عالی و بدون آلودگی قابل توجه</li>
                        <li>خوب: کیفیت هوا قابل قبول با آلاینده‌های کم</li>
                        <li>متوسط: کیفیت هوا برای افراد حساس ممکن است مضر باشد</li>
                        <li>ضعیف: افراد حساس باید فعالیت در فضای باز را محدود کنند</li>
                        <li>بسیار ضعیف: تمام افراد باید فعالیت در فضای باز را محدود کنند</li>
                        <li>خطرناک: همه باید از فعالیت در فضای باز خودداری کنند</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full border-0 shadow-sm bg-gradient-to-br from-tiffany/5 to-aqua/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 border-b pb-2 border-tiffany/20">درباره سرویس آب و هوا</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-tiffany mb-2">API مورد استفاده</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    اطلاعات آب و هوا با استفاده از WeatherAPI.com دریافت می‌شوند. این سرویس اطلاعات دقیق و به‌روز را برای بیش از ۲۰۰,۰۰۰ شهر در سراسر جهان ارائه می‌دهد.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-tiffany mb-2">ویژگی‌های اصلی</h4>
                  <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                    <li>• اطلاعات آب و هوای فعلی</li>
                    <li>• دمای واقعی و احساس شده</li>
                    <li>• شاخص کیفیت هوا</li>
                    <li>• میزان رطوبت و سرعت باد</li>
                    <li>• شاخص اشعه فرابنفش (UV)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-tiffany mb-2">کاربردها</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    این اطلاعات می‌توانند در برنامه‌ریزی فعالیت‌های روزانه، ورزش در فضای باز، و تصمیم‌گیری برای سفر به شما کمک کنند. با آگاهی از کیفیت هوا، می‌توانید سلامت خود را بهتر مدیریت کنید.
                  </p>
                </div>
                
                <div className="bg-tiffany/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-tiffany mb-2">نکته</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    برای بهترین نتیجه، نام کامل شهر را به همراه کشور وارد کنید. مثال: "Tehran, Iran"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}