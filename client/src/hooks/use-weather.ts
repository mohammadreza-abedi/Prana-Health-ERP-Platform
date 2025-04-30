import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
    tz_id?: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    feelslike_c: number;
    wind_kph: number;
    wind_dir: string;
    uv: number;
    air_quality?: {
      "us-epa-index": number;
      "gb-defra-index"?: number;
    };
    is_day?: number;
    last_updated?: string;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
    }>;
  };
}

interface WeatherError {
  message: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface UseWeatherReturn {
  data: WeatherData | null;
  loading: boolean;
  error: WeatherError | null;
  userLocation: GeoLocation | null;
  locationLoading: boolean;
  locationError: string | null;
  getWeatherByCity: (city: string) => Promise<void>;
  getWeatherByCoords: (lat: number, lon: number) => Promise<void>;
  getUserLocation: () => Promise<void>;
}

/**
 * هوک سفارشی برای دریافت اطلاعات آب و هوا
 * از API بک‌اند استفاده می‌کند که به نوبه خود به WeatherAPI متصل می‌شود
 * همچنین امکان دریافت موقعیت جغرافیایی کاربر را فراهم می‌کند
 */
export function useWeather(): UseWeatherReturn {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<WeatherError | null>(null);
  const [userLocation, setUserLocation] = useState<GeoLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  /**
   * دریافت اطلاعات آب و هوا برای یک شهر مشخص از طریق API بک‌اند
   */
  const getWeatherByCity = async (city: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest("GET", `/api/weather?city=${encodeURIComponent(city)}`);
      const weatherData = await response.json();
      
      if (response.ok) {
        setData(weatherData);
      } else {
        throw new Error(weatherData.error || "خطا در دریافت اطلاعات آب و هوا");
      }
    } catch (err: any) {
      console.error("Error fetching weather by city:", err);
      setError({
        message: err.message || "خطا در دریافت اطلاعات آب و هوا. لطفاً مجدداً تلاش کنید."
      });
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * دریافت اطلاعات آب و هوا براساس مختصات جغرافیایی از طریق API بک‌اند
   */
  const getWeatherByCoords = async (lat: number, lon: number): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiRequest("GET", `/api/weather?lat=${lat}&lon=${lon}`);
      const weatherData = await response.json();
      
      if (response.ok) {
        setData(weatherData);
      } else {
        throw new Error(weatherData.error || "خطا در دریافت اطلاعات آب و هوا");
      }
    } catch (err: any) {
      console.error("Error fetching weather by coordinates:", err);
      setError({
        message: err.message || "خطا در دریافت اطلاعات آب و هوا. لطفاً مجدداً تلاش کنید."
      });
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * دریافت موقعیت جغرافیایی کاربر با استفاده از Geolocation API
   */
  const getUserLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      setLocationError("مرورگر شما از Geolocation پشتیبانی نمی‌کند");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000 // اطلاعات موقعیت تا 1 دقیقه معتبر هستند
        });
      });

      const newLocation: GeoLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      };

      setUserLocation(newLocation);
      
      // بلافاصله اطلاعات آب و هوا را برای موقعیت کاربر دریافت می‌کنیم
      await getWeatherByCoords(newLocation.latitude, newLocation.longitude);
    } catch (err: any) {
      console.error("Error getting location:", err);
      setLocationError(
        err.code === 1
          ? "دسترسی به موقعیت مکانی رد شد. لطفاً اجازه دسترسی را در مرورگر خود فعال کنید."
          : err.code === 2
          ? "اطلاعات موقعیت مکانی در دسترس نیست."
          : err.code === 3
          ? "درخواست برای دریافت موقعیت مکانی به دلیل تایم‌اوت لغو شد."
          : "خطایی در دریافت موقعیت مکانی رخ داد."
      );
    } finally {
      setLocationLoading(false);
    }
  };

  // به صورت خودکار سعی می‌کنیم موقعیت جغرافیایی کاربر را دریافت کنیم (فقط در اولین رندر)
  useEffect(() => {
    getUserLocation();
  }, []);

  return {
    data,
    loading,
    error,
    userLocation,
    locationLoading,
    locationError,
    getWeatherByCity,
    getWeatherByCoords,
    getUserLocation
  };
}