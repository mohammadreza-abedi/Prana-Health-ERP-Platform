import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

// تعریف مدل داده برای اطلاعات آب و هوا
export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    uv: number;
    air_quality?: {
      "us-epa-index": number;
      "gb-defra-index": number;
    };
  };
}

interface WeatherError {
  message: string;
}

interface UseWeatherReturn {
  data: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
  getWeatherByCity: (city: string) => Promise<void>;
}

/**
 * هوک سفارشی برای دریافت اطلاعات آب و هوا
 * از API رایگان WeatherAPI استفاده می‌کند
 */
export function useWeather(): UseWeatherReturn {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<WeatherError | null>(null);
  
  // API رایگان هواشناسی - موارد اصلی:
  // - دریافت اطلاعات هواشناسی شهرهای مختلف
  // - قابلیت دریافت پیش‌بینی
  // - آلودگی هوا
  const API_KEY = "e99e9a9b8b3e4153aad181352240804"; // رایگان و محدود به 1 میلیون درخواست ماهانه
  const BASE_URL = "https://api.weatherapi.com/v1";

  /**
   * دریافت اطلاعات آب و هوا برای یک شهر مشخص
   */
  const getWeatherByCity = async (city: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`,
        { method: "GET" }
      );
      
      if (!response.ok) {
        throw new Error(`خطا در دریافت اطلاعات: ${response.status}`);
      }
      
      const weatherData: WeatherData = await response.json();
      setData(weatherData);
      
      // نمایش نوتیفیکیشن موفقیت
      toast({
        title: "اطلاعات آب و هوا",
        description: `دمای ${weatherData.location.name}: ${weatherData.current.temp_c}°C`,
        variant: "success"
      });
    } catch (err: any) {
      const errorMessage = err.message || "خطا در دریافت اطلاعات آب و هوا";
      setError({ message: errorMessage });
      
      // نمایش نوتیفیکیشن خطا
      toast({
        title: "خطای دریافت اطلاعات",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    getWeatherByCity
  };
}