import React from "react";
import WeatherWidget from "@/components/weather/WeatherWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { CloudSun, Map, Info, MapPin, CloudRain, Droplets, Wind, ThermometerSun, Umbrella, CloudLightning, CloudSnow, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/hooks/use-weather";

/**
 * صفحه اطلاعات آب و هوا
 * نمایش اطلاعات آب و هوای موقعیت کاربر به شکل پیشرفته
 */
export default function WeatherInfo() {
  const { getUserLocation } = useWeather();
  
  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2 pb-2 border-b border-gray-200 dark:border-gray-800 inline-block">
          <CloudSun className="inline-block mr-2 text-sky-500" />
          اطلاعات آب و هوا
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
          در این صفحه می‌توانید وضعیت آب و هوای موقعیت فعلی خود را مشاهده کنید.
          این سیستم با استفاده از API جامع هواشناسی، اطلاعات دقیق و به روز را نمایش می‌دهد.
        </p>
        <div className="mt-2 flex justify-center">
          <Button 
            size="sm" 
            variant="outline" 
            className="text-sm flex items-center font-normal" 
            onClick={getUserLocation}
          >
            <MapPin className="h-4 w-4 mr-1" /> دریافت موقعیت فعلی
          </Button>
        </div>
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
              <TabsTrigger value="current" className="flex items-center">
                <CloudSun className="h-4 w-4 mr-2" />
                وضعیت آب و هوا
              </TabsTrigger>
              <TabsTrigger value="howto" className="flex items-center">
                <Info className="h-4 w-4 mr-2" />
                راهنمای استفاده
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <WeatherWidget />
            </TabsContent>
            
            <TabsContent value="howto">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-blue-600 dark:text-blue-400">
                    <Info className="h-5 w-5 mr-2" />
                    راهنمای استفاده از ویجت آب و هوا
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        تعیین موقعیت
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        برای دریافت اطلاعات دقیق آب و هوا، دکمه موقعیت‌یابی (آیکون <LocateFixed className="inline-block h-4 w-4 mx-1 text-blue-500" />) را بزنید و به مرورگر اجازه دسترسی به موقعیت خود را بدهید. این ویژگی به شما اجازه می‌دهد دقیق‌ترین اطلاعات آب و هوا را برای موقعیت فعلی خود دریافت کنید.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Map className="h-4 w-4 mr-2 text-green-500" />
                        نقشه تعاملی
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        نقشه تعاملی موقعیت شما را نمایش می‌دهد و میتوانید با آن تعامل داشته باشید:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300 space-y-1">
                        <li>بزرگنمایی و کوچک‌نمایی با اسکرول</li>
                        <li>حرکت روی نقشه با کشیدن</li>
                        <li>کلیک روی مارکر برای نمایش جزئیات موقعیت</li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-500">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <CloudRain className="h-4 w-4 mr-2 text-amber-500" />
                        اطلاعات آب و هوا
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        اطلاعاتی که در ویجت نمایش داده می‌شود:
                      </p>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="flex items-start">
                          <Droplets className="h-4 w-4 mr-2 text-blue-500 mt-0.5" />
                          <div>
                            <p className="font-medium">رطوبت</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">میزان رطوبت هوا به درصد</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Wind className="h-4 w-4 mr-2 text-teal-500 mt-0.5" />
                          <div>
                            <p className="font-medium">باد</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">سرعت باد بر حسب کیلومتر بر ساعت</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <ThermometerSun className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                          <div>
                            <p className="font-medium">دما</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">دمای واقعی و احساس شده</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Umbrella className="h-4 w-4 mr-2 text-purple-500 mt-0.5" />
                          <div>
                            <p className="font-medium">کیفیت هوا</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">شاخص EPA برای کیفیت هوا</p>
                          </div>
                        </div>
                      </div>
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
          <Card className="h-full border-0 shadow-md bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-slate-900/50 dark:to-blue-950/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 border-b pb-2 border-blue-200 dark:border-blue-800 flex items-center text-blue-600 dark:text-blue-400">
                <CloudSun className="h-5 w-5 mr-2" />
                درباره سرویس آب و هوا
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                    <CloudSun className="h-4 w-4 mr-2" />
                    API مورد استفاده
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    اطلاعات آب و هوا از طریق API سرور داخلی پرانا دریافت می‌شوند که به سرویس WeatherAPI.com متصل شده است. سرور داخلی داده‌ها را پردازش کرده و فقط اطلاعات ضروری را به کلاینت ارسال می‌کند.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    اطلاعات موقعیت
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    این سرویس از API مرورگر برای دسترسی به موقعیت جغرافیایی شما استفاده می‌کند. اطلاعات موقعیت شما فقط برای نمایش آب و هوای مرتبط استفاده می‌شود و هیچ‌گاه ذخیره نمی‌شود.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center">
                    <Map className="h-4 w-4 mr-2" />
                    نقشه تعاملی
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    نقشه با استفاده از کتابخانه Leaflet پیاده‌سازی شده است که یک کتابخانه متن‌باز برای ایجاد نقشه‌های تعاملی است. نقشه‌های پایه از سرویس OpenStreetMap دریافت می‌شوند.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    نسخه جدید
                  </h4>
                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    این ویجت با طراحی الهام گرفته از iOS پیاده‌سازی شده و شامل ویژگی‌های پیشرفته‌ای مانند نقشه تعاملی، نمایش مختصات دقیق، تغییر ظاهر بر اساس وضعیت آب و هوا، و امکان دریافت خودکار موقعیت کاربر است.
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