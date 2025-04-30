import { useState } from "react";

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

  /**
   * دریافت اطلاعات آب و هوا برای یک شهر مشخص
   */
  const getWeatherByCity = async (city: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // استفاده از API رایگان
      const apiKey = "7c7e2a35ab3f4efbb3a115226230811"; // کلید رایگان برای استفاده عمومی - در نسخه تولید از محیط متغیر استفاده کنید
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes&lang=fa`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "خطا در دریافت اطلاعات آب و هوا");
      }

      const weatherData: WeatherData = await response.json();
      setData(weatherData);
      setError(null);
    } catch (err: any) {
      setError({
        message: err.message || "خطا در دریافت اطلاعات آب و هوا. لطفاً مجدداً تلاش کنید."
      });
      setData(null);
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