import { useState, useEffect } from "react";
import { useWeather, type WeatherData, type GeoLocation } from "@/hooks/use-weather";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, LocateFixed, MapIcon, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ایجاد آیکون سفارشی برای نقشه
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// کامپوننت برای حرکت نقشه به موقعیت جدید
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);
  return null;
}

/**
 * کامپوننت ویجت آب و هوا
 * طراحی شده به سبک iOS با نمایش نقشه و اطلاعات دقیق موقعیت کاربر
 */
export default function WeatherWidget() {
  const { 
    data, 
    loading, 
    error, 
    userLocation, 
    locationLoading, 
    locationError, 
    getUserLocation 
  } = useWeather();
  
  const [timeString, setTimeString] = useState<string>("");
  
  // بروزرسانی زمان هر دقیقه
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('fa-IR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // تنظیم مرکز نقشه براساس موقعیت کاربر یا داده‌های آب و هوا
  const mapCenter: [number, number] = userLocation 
    ? [userLocation.latitude, userLocation.longitude]
    : data?.location 
      ? [data.location.lat, data.location.lon]
      : [35.6892, 51.3890]; // تهران به عنوان پیش‌فرض
  
  /**
   * انتخاب کلاس رنگ پس‌زمینه براساس وضعیت آب و هوا و زمان روز
   */
  const getWeatherBackgroundClass = () => {
    if (!data) return "bg-gradient-to-b from-sky-400 to-blue-500";
    
    const condition = data.current.condition.text.toLowerCase();
    const isDay = data.current.is_day !== 0;
    
    if (condition.includes("sunny") || condition.includes("clear")) {
      return isDay 
        ? "bg-gradient-to-b from-sky-400 to-blue-500" 
        : "bg-gradient-to-b from-indigo-900 to-blue-900";
    } else if (condition.includes("cloud") || condition.includes("overcast")) {
      return isDay 
        ? "bg-gradient-to-b from-gray-300 to-blue-400" 
        : "bg-gradient-to-b from-gray-800 to-slate-900";
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      return isDay 
        ? "bg-gradient-to-b from-gray-500 to-blue-600" 
        : "bg-gradient-to-b from-gray-900 to-blue-900";
    } else if (condition.includes("snow") || condition.includes("blizzard")) {
      return isDay 
        ? "bg-gradient-to-b from-gray-200 to-blue-300" 
        : "bg-gradient-to-b from-gray-700 to-blue-800";
    } else if (condition.includes("storm") || condition.includes("thunder")) {
      return isDay 
        ? "bg-gradient-to-b from-gray-600 to-indigo-700" 
        : "bg-gradient-to-b from-gray-900 to-indigo-950";
    }
    
    return isDay 
      ? "bg-gradient-to-b from-sky-400 to-blue-500" 
      : "bg-gradient-to-b from-indigo-900 to-blue-900";
  };
  
  /**
   * انتخاب آیکون وضعیت آب و هوا
   */
  const getWeatherIcon = () => {
    if (!data) return null;
    
    return (
      <div className="relative w-24 h-24 mx-auto">
        <img 
          src={data.current.condition.icon.replace('64x64', '128x128')} 
          alt={data.current.condition.text} 
          className="w-full h-full object-contain"
        />
      </div>
    );
  };
  
  /**
   * تبدیل شاخص کیفیت هوا به متن
   */
  const getAirQualityInfo = () => {
    if (!data?.current.air_quality?.["us-epa-index"]) return { text: "نامشخص", color: "text-gray-500", bgColor: "bg-gray-200" };
    
    const aqi = data.current.air_quality["us-epa-index"];
    switch (aqi) {
      case 1:
        return { text: "عالی", color: "text-green-700", bgColor: "bg-green-200" };
      case 2:
        return { text: "خوب", color: "text-green-600", bgColor: "bg-green-100" };
      case 3:
        return { text: "متوسط", color: "text-yellow-700", bgColor: "bg-yellow-200" };
      case 4:
        return { text: "ضعیف", color: "text-orange-700", bgColor: "bg-orange-200" };
      case 5:
        return { text: "بسیار ضعیف", color: "text-red-700", bgColor: "bg-red-200" };
      case 6:
        return { text: "خطرناک", color: "text-red-800", bgColor: "bg-red-300" };
      default:
        return { text: "نامشخص", color: "text-gray-500", bgColor: "bg-gray-200" };
    }
  };
  
  const airQualityInfo = getAirQualityInfo();

  return (
    <Card className="w-full overflow-hidden border-0 rounded-xl shadow-lg">
      <CardContent className="p-0">
        {/* بخش اصلی آب و هوا */}
        <div className={`${getWeatherBackgroundClass()} text-white p-6 transition-all duration-500`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <h2 className="text-xl font-bold">
                {loading || locationLoading ? (
                  <Skeleton className="h-7 w-32 bg-white/20" />
                ) : data ? (
                  data.location.name
                ) : (
                  "موقعیت یابی..."
                )}
              </h2>
            </div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={getUserLocation}
                disabled={locationLoading}
              >
                {locationLoading ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  <LocateFixed className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="text-center mb-8">
            {loading ? (
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-24 w-24 rounded-full bg-white/20" />
                <Skeleton className="h-12 w-32 bg-white/20" />
                <Skeleton className="h-6 w-48 bg-white/20" />
              </div>
            ) : data ? (
              <>
                {getWeatherIcon()}
                <div className="text-6xl font-bold mt-2">{Math.round(data.current.temp_c)}°</div>
                <div className="text-xl mt-1">{data.current.condition.text}</div>
                <div className="text-lg mt-1">
                  احساس دما: {Math.round(data.current.feelslike_c)}°
                </div>
              </>
            ) : error ? (
              <div className="bg-red-500/20 p-4 rounded-lg backdrop-blur-sm">
                <p className="font-bold">خطا در دریافت اطلاعات آب و هوا</p>
                <p className="text-sm mt-1">{error.message}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 border-white text-white hover:bg-white/20 hover:text-white"
                  onClick={getUserLocation}
                >
                  تلاش مجدد
                </Button>
              </div>
            ) : (
              <div className="text-center p-6">
                <p>در حال آماده‌سازی اطلاعات آب و هوا...</p>
                <p className="text-sm mt-2">لطفاً به مرورگر اجازه دسترسی به موقعیت مکانی خود را بدهید</p>
              </div>
            )}
          </div>
          
          {data && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs opacity-80">رطوبت</p>
                <p className="text-lg font-bold mt-1">{data.current.humidity}%</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs opacity-80">باد</p>
                <p className="text-lg font-bold mt-1">{Math.round(data.current.wind_kph)} کیلومتر</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs opacity-80">کیفیت هوا</p>
                <p className={`text-lg font-bold mt-1 ${airQualityInfo.color}`}>
                  {airQualityInfo.text}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* نقشه موقعیت */}
        <div className="h-64 w-full relative">
          {/* اگر در حال لود کردن است یا خطا وجود دارد، اسکلتون نمایش داده می‌شود */}
          {(locationLoading || locationError) ? (
            <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {locationLoading ? (
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">در حال تعیین موقعیت...</p>
                </div>
              ) : (
                <div className="text-center p-4">
                  <MapIcon className="h-8 w-8 mx-auto text-red-500 mb-2" />
                  <p className="text-red-500 dark:text-red-400 font-medium">{locationError}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={getUserLocation}
                  >
                    تلاش مجدد
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <MapContainer
              center={mapCenter}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <MapUpdater center={mapCenter} />
              <Marker position={mapCenter}>
                <Popup>
                  {data?.location.name || 'موقعیت شما'}
                  <br />
                  {data?.location.country}
                </Popup>
              </Marker>
            </MapContainer>
          )}
          
          {/* اطلاعات مختصات */}
          {userLocation && (
            <div className="absolute bottom-2 left-2 right-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg text-xs text-gray-700 dark:text-gray-300 font-mono flex items-center justify-between">
              <div className="flex items-center">
                <Compass className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" />
                <span dir="ltr">
                  {userLocation.latitude.toFixed(4)}°N, {userLocation.longitude.toFixed(4)}°E
                </span>
              </div>
              <div>
                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded text-[10px]">
                  دقت: {Math.round(userLocation.accuracy)} متر
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* پیش‌بینی روزانه */}
        {data?.forecast && (
          <div className="bg-white dark:bg-gray-900 p-4">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3">پیش‌بینی روزانه</h3>
            <div className="flex overflow-x-auto pb-2 space-x-4 rtl:space-x-reverse">
              {data.forecast.forecastday.map((day, index) => (
                <div 
                  key={day.date} 
                  className="flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 w-28 text-center"
                >
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {index === 0 ? 'امروز' : new Date(day.date).toLocaleDateString('fa-IR', { weekday: 'short' })}
                  </p>
                  <img 
                    src={day.day.condition.icon} 
                    alt={day.day.condition.text} 
                    className="w-10 h-10 mx-auto my-1"
                  />
                  <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse text-sm">
                    <span className="font-bold text-gray-900 dark:text-gray-100">{Math.round(day.day.maxtemp_c)}°</span>
                    <span className="text-gray-500">
                      {Math.round(day.day.mintemp_c)}°
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}