import { useState } from "react";
import { useWeather, type WeatherData } from "@/hooks/use-weather";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sun, Cloud, CloudRain, Droplets, Wind, ThermometerSun, Umbrella, CloudLightning, CloudSnow } from "lucide-react";

/**
 * کامپوننت ویجت آب و هوا
 * نمایش اطلاعات آب و هوای شهر انتخابی و امکان جستجوی شهرهای مختلف
 */
export default function WeatherWidget() {
  const { data, loading, error, getWeatherByCity } = useWeather();
  const [city, setCity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      getWeatherByCity(city.trim());
    }
  };

  /**
   * انتخاب آیکون مناسب براساس وضعیت آب و هوا
   */
  const getWeatherIcon = (condition: string, code: number) => {
    // انتخاب آیکون براساس کد وضعیت آب و هوا
    const iconMap: Record<string, React.ReactNode> = {
      // آفتابی
      sunny: <Sun className="h-10 w-10 text-amber-500" />,
      clear: <Sun className="h-10 w-10 text-amber-500" />,
      
      // ابری
      cloudy: <Cloud className="h-10 w-10 text-slate-500" />,
      overcast: <Cloud className="h-10 w-10 text-slate-700" />,
      
      // بارانی
      rain: <CloudRain className="h-10 w-10 text-blue-500" />,
      drizzle: <Droplets className="h-10 w-10 text-blue-400" />,
      
      // طوفانی
      storm: <CloudLightning className="h-10 w-10 text-purple-500" />,
      thunder: <CloudLightning className="h-10 w-10 text-purple-500" />,
      
      // برفی
      snow: <CloudSnow className="h-10 w-10 text-indigo-300" />,
      blizzard: <CloudSnow className="h-10 w-10 text-indigo-500" />,
      
      // سایر موارد
      default: <Sun className="h-10 w-10 text-amber-500" />
    };
    
    // تشخیص حالت براساس متن وضعیت
    const conditionLower = condition.toLowerCase();
    for (const key in iconMap) {
      if (conditionLower.includes(key)) {
        return iconMap[key];
      }
    }
    
    // حالت پیش‌فرض
    return iconMap.default;
  };

  /**
   * تبدیل شاخص کیفیت هوا به متن
   */
  const getAirQualityText = (aqi: number) => {
    switch (aqi) {
      case 1:
        return { text: "عالی", color: "text-green-500" };
      case 2:
        return { text: "خوب", color: "text-green-400" };
      case 3:
        return { text: "متوسط", color: "text-yellow-500" };
      case 4:
        return { text: "ضعیف", color: "text-orange-500" };
      case 5:
        return { text: "بسیار ضعیف", color: "text-red-500" };
      case 6:
        return { text: "خطرناک", color: "text-red-700" };
      default:
        return { text: "نامشخص", color: "text-gray-500" };
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-slate-900">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">ویجت آب و هوا</CardTitle>
          {data && (
            <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              زمان محلی: {data.location.localtime.split(" ")[1]}
            </Badge>
          )}
        </div>
        <CardDescription>اطلاعات آب و هوا از سرویس WeatherAPI</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <form onSubmit={handleSearch} className="flex space-x-2 mb-4 rtl:space-x-reverse">
          <Input
            placeholder="نام شهر را وارد کنید..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-lg"
          />
          <Button type="submit" disabled={loading || !city.trim()}>
            جستجو
          </Button>
        </form>
        
        {loading && (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg">
            <p>{error.message}</p>
            <p className="text-sm mt-2">لطفاً نام شهر را به صورت صحیح وارد کنید یا مجدداً تلاش نمایید.</p>
          </div>
        )}
        
        {data && !loading && !error && (
          <div className="pt-2">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold">{data.location.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{data.location.country}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{data.current.temp_c}°C</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  احساس دما: {data.current.feelslike_c}°C
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              {getWeatherIcon(data.current.condition.text, data.current.condition.code)}
              <div className="ml-4 rtl:mr-4 rtl:ml-0">
                <p className="font-medium">{data.current.condition.text}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg">
                <Droplets className="w-5 h-5 text-blue-500 mr-2 rtl:ml-2 rtl:mr-0" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">رطوبت</p>
                  <p className="font-medium">{data.current.humidity}%</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg">
                <Wind className="w-5 h-5 text-teal-500 mr-2 rtl:ml-2 rtl:mr-0" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">باد</p>
                  <p className="font-medium">{data.current.wind_kph} km/h</p>
                </div>
              </div>
              
              <div className="flex items-center bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg">
                <ThermometerSun className="w-5 h-5 text-amber-500 mr-2 rtl:ml-2 rtl:mr-0" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">شاخص UV</p>
                  <p className="font-medium">{data.current.uv}</p>
                </div>
              </div>
              
              {data.current.air_quality && (
                <div className="flex items-center bg-white/60 dark:bg-slate-800/60 p-2 rounded-lg">
                  <Umbrella className="w-5 h-5 text-purple-500 mr-2 rtl:ml-2 rtl:mr-0" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">کیفیت هوا</p>
                    <p className={`font-medium ${getAirQualityText(data.current.air_quality["us-epa-index"]).color}`}>
                      {getAirQualityText(data.current.air_quality["us-epa-index"]).text}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="text-xs text-gray-500 pt-0">
        پیشنهاد: تهران، شیراز، اصفهان، مشهد، تبریز، رشت
      </CardFooter>
    </Card>
  );
}