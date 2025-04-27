import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from './use-toast';
import { apiRequest } from '@/lib/queryClient';

export interface HealthSuggestion {
  id: number;
  title: string;
  description: string;
  type: 'nutrition' | 'exercise' | 'sleep' | 'mental' | 'hydration' | 'posture';
  priority: 'high' | 'medium' | 'low';
  timeToImplement: number; // in minutes
  benefits: string[];
  icon: string;
}

export interface MicroExercise {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes
  targetArea: string;
  difficulty: 'easy' | 'medium' | 'hard';
  steps: string[];
  imageUrl?: string;
  videoUrl?: string;
}

export interface BreathingExercise {
  id: number;
  title: string;
  description: string;
  pattern: {
    inhale: number; // in seconds
    hold1?: number; // in seconds
    exhale: number; // in seconds
    hold2?: number; // in seconds
    cycles: number;
  };
  benefits: string[];
  situation: string[];
}

export interface MentalWellnessTip {
  id: number;
  title: string;
  content: string;
  category: 'stress' | 'focus' | 'productivity' | 'mood' | 'anxiety';
  timeToRead: number; // in minutes
  tags: string[];
}

export interface WellnessState {
  energyLevel: number; // 1-10
  stressLevel: number; // 1-10
  hydrationLevel: number; // 1-10
  isAtDesk: boolean;
  hasLongScreenTime: boolean;
  lastBreakTime?: Date;
  lastExerciseTime?: Date;
  lastWaterTime?: Date;
}

export function useWellnessCoach(userId: number) {
  const { toast } = useToast();
  const [wellnessState, setWellnessState] = useState<WellnessState>({
    energyLevel: 7,
    stressLevel: 5,
    hydrationLevel: 6,
    isAtDesk: true,
    hasLongScreenTime: true
  });
  
  const [microExercises, setMicroExercises] = useState<MicroExercise[]>([]);
  const [breathingExercises, setBreathingExercises] = useState<BreathingExercise[]>([]);
  const [mentalTips, setMentalTips] = useState<MentalWellnessTip[]>([]);
  
  // Retrieve wellness data from server
  const { data: suggestions, isLoading, error } = useQuery({
    queryKey: ['/api/wellness/suggestions', userId],
    queryFn: async () => {
      try {
        // This would normally come from the server
        // For now we're returning mock data
        return generateSuggestions(wellnessState);
      } catch (error) {
        console.error('Error fetching wellness suggestions:', error);
        throw error;
      }
    },
    enabled: !!userId
  });
  
  // Load sample exercises
  useEffect(() => {
    // This would typically come from the API
    const sampleMicroExercises: MicroExercise[] = [
      {
        id: 1,
        title: 'تمرین‌های چشمی 20-20-20',
        description: 'هر ۲۰ دقیقه، به مدت ۲۰ ثانیه به فاصله ۲۰ فوتی نگاه کنید تا خستگی چشم را کاهش دهید.',
        duration: 1,
        targetArea: 'چشم‌ها',
        difficulty: 'easy',
        steps: [
          'کار با صفحه نمایش را متوقف کنید',
          'به شیئی در فاصله حداقل ۶ متری نگاه کنید',
          '۲۰ ثانیه صبر کنید و به آن شی خیره شوید',
          'به کار خود برگردید'
        ]
      },
      {
        id: 2,
        title: 'کشش گردن و شانه',
        description: 'کشش ساده برای کاهش گرفتگی عضلات گردن و شانه در هنگام کار با کامپیوتر',
        duration: 2,
        targetArea: 'گردن و شانه‌ها',
        difficulty: 'easy',
        steps: [
          'صاف بنشینید',
          'سر خود را به سمت راست خم کنید تا کشش را در سمت چپ گردن احساس کنید',
          '۱۵ ثانیه نگه دارید',
          'به حالت وسط برگردید',
          'سر خود را به سمت چپ خم کنید',
          '۱۵ ثانیه نگه دارید',
          'تکرار کنید'
        ]
      },
      {
        id: 3,
        title: 'کشش مچ دست',
        description: 'کشش ساده برای جلوگیری از سندروم تونل کارپال و خستگی مچ دست',
        duration: 1,
        targetArea: 'مچ دست',
        difficulty: 'easy',
        steps: [
          'دست راست خود را با کف دست رو به بالا دراز کنید',
          'با دست چپ، انگشتان دست راست را به سمت پایین و به سمت بدن خود بکشید',
          'کشش را در مچ دست احساس کنید',
          '۱۵ ثانیه نگه دارید',
          'دست‌ها را عوض کنید و تکرار کنید'
        ]
      },
      {
        id: 4,
        title: 'تنفس دیافراگمی',
        description: 'تنفس عمیق برای کاهش استرس و افزایش اکسیژن‌رسانی به مغز',
        duration: 3,
        targetArea: 'قفسه سینه و دیافراگم',
        difficulty: 'easy',
        steps: [
          'صاف بنشینید یا دراز بکشید',
          'یک دست را روی شکم و یک دست را روی قفسه سینه قرار دهید',
          'از بینی به آرامی نفس بکشید و اجازه دهید شکم بالا بیاید',
          '۳ ثانیه نفس را نگه دارید',
          'به آرامی از دهان بازدم کنید و شکم را به داخل بکشید',
          '۵ بار تکرار کنید'
        ]
      },
      {
        id: 5,
        title: 'اسکوات کوتاه',
        description: 'حرکت سریع برای فعال کردن عضلات پا بعد از نشستن طولانی مدت',
        duration: 2,
        targetArea: 'پاها و کمر',
        difficulty: 'medium',
        steps: [
          'با پاهای به اندازه عرض شانه باز بایستید',
          'مانند نشستن روی صندلی، تا حد امکان پایین بروید',
          'پشت خود را صاف نگه دارید',
          'به آرامی به حالت ایستاده برگردید',
          '۱۰ بار تکرار کنید'
        ]
      }
    ];
    
    const sampleBreathingExercises: BreathingExercise[] = [
      {
        id: 1,
        title: 'تنفس 4-7-8',
        description: 'تکنیک تنفس آرامش‌بخش که به کاهش استرس و اضطراب کمک می‌کند',
        pattern: {
          inhale: 4,
          hold1: 7,
          exhale: 8,
          cycles: 4
        },
        benefits: [
          'کاهش استرس و اضطراب',
          'کمک به خواب بهتر',
          'بهبود تمرکز'
        ],
        situation: ['قبل از جلسات استرس‌زا', 'هنگام احساس خستگی', 'قبل از خواب']
      },
      {
        id: 2,
        title: 'تنفس مربعی',
        description: 'یک روش تنفس متعادل که برای آرامش سریع مناسب است',
        pattern: {
          inhale: 4,
          hold1: 4,
          exhale: 4,
          hold2: 4,
          cycles: 5
        },
        benefits: [
          'ایجاد آرامش سریع',
          'کاهش تنش عضلانی',
          'تنظیم ضربان قلب'
        ],
        situation: ['قبل از سخنرانی', 'در شرایط استرس‌زا', 'هنگام نیاز به تمرکز']
      },
      {
        id: 3,
        title: 'تنفس عمیق شکمی',
        description: 'تنفس دیافراگمی که اکسیژن‌رسانی را افزایش می‌دهد',
        pattern: {
          inhale: 5,
          exhale: 5,
          cycles: 6
        },
        benefits: [
          'افزایش اکسیژن‌رسانی',
          'کاهش فشار خون',
          'تقویت سیستم ایمنی'
        ],
        situation: ['هنگام خستگی', 'قبل از فعالیت فیزیکی', 'هنگام نیاز به انرژی']
      }
    ];
    
    const sampleMentalTips: MentalWellnessTip[] = [
      {
        id: 1,
        title: 'اصل پومودورو برای بهره‌وری بیشتر',
        content: 'تکنیک پومودورو شامل کار متمرکز به مدت ۲۵ دقیقه و سپس استراحت ۵ دقیقه‌ای است. بعد از ۴ دوره، یک استراحت طولانی‌تر ۱۵-۳۰ دقیقه‌ای در نظر بگیرید. این روش به حفظ تمرکز و جلوگیری از خستگی ذهنی کمک می‌کند.',
        category: 'productivity',
        timeToRead: 2,
        tags: ['تمرکز', 'بهره‌وری', 'مدیریت زمان']
      },
      {
        id: 2,
        title: 'تکنیک سه نفس عمیق',
        content: 'هرگاه احساس استرس کردید، کار خود را متوقف کنید و سه نفس عمیق و آگاهانه بکشید. بر روی حس دم و بازدم تمرکز کنید. این کار سیستم عصبی پاراسمپاتیک را فعال کرده و به آرامش سریع کمک می‌کند.',
        category: 'stress',
        timeToRead: 1,
        tags: ['آرامش', 'مدیریت استرس', 'ذهن‌آگاهی']
      },
      {
        id: 3,
        title: 'قانون ۲ دقیقه',
        content: 'اگر انجام کاری کمتر از ۲ دقیقه طول می‌کشد، همان لحظه آن را انجام دهید. این قانون ساده از انباشته شدن کارهای کوچک جلوگیری می‌کند و احساس پیشرفت مداوم به شما می‌دهد.',
        category: 'productivity',
        timeToRead: 1,
        tags: ['بهره‌وری', 'مدیریت زمان', 'عادت‌سازی']
      },
      {
        id: 4,
        title: 'تمرین قدردانی روزانه',
        content: 'هر روز صبح یا شب، سه چیز که برای آنها سپاسگزار هستید را یادداشت کنید. این تمرین ساده به تدریج الگوی ذهنی شما را از تمرکز بر منفی‌ها به سمت مثبت‌ها تغییر می‌دهد و می‌تواند افسردگی و اضطراب را کاهش دهد.',
        category: 'mood',
        timeToRead: 2,
        tags: ['شادی', 'قدردانی', 'سلامت روان']
      },
      {
        id: 5,
        title: 'استراتژی 5-4-3-2-1 برای کاهش اضطراب',
        content: 'برای کاهش سریع اضطراب، از تکنیک ۵-۴-۳-۲-۱ استفاده کنید: پنج چیز که می‌بینید، چهار چیز که می‌توانید لمس کنید، سه چیز که می‌شنوید، دو چیز که بو می‌کنید و یک چیز که می‌توانید بچشید را شناسایی کنید. این تمرین شما را به زمان حال می‌آورد و از چرخه افکار اضطراب‌آور خارج می‌کند.',
        category: 'anxiety',
        timeToRead: 3,
        tags: ['اضطراب', 'ذهن‌آگاهی', 'تکنیک آرامش']
      }
    ];
    
    setMicroExercises(sampleMicroExercises);
    setBreathingExercises(sampleBreathingExercises);
    setMentalTips(sampleMentalTips);
  }, []);
  
  // عملکرد به‌روزرسانی وضعیت سلامتی کاربر
  const updateWellnessState = (newState: Partial<WellnessState>) => {
    setWellnessState(prev => ({ ...prev, ...newState }));
  };
  
  // تولید پیشنهادهای سلامتی بر اساس وضعیت فعلی
  const generateSuggestions = (state: WellnessState): HealthSuggestion[] => {
    const suggestions: HealthSuggestion[] = [];
    
    // پیشنهاد آب‌رسانی
    if (state.hydrationLevel < 7) {
      suggestions.push({
        id: 1,
        title: 'زمان نوشیدن آب',
        description: 'کم‌آبی می‌تواند باعث خستگی و کاهش تمرکز شود. یک لیوان آب بنوشید.',
        type: 'hydration',
        priority: state.hydrationLevel < 4 ? 'high' : 'medium',
        timeToImplement: 2,
        benefits: ['افزایش انرژی', 'بهبود تمرکز', 'کمک به سوخت و ساز بدن'],
        icon: 'droplet'
      });
    }
    
    // پیشنهاد استراحت چشم
    if (state.hasLongScreenTime) {
      suggestions.push({
        id: 2,
        title: 'استراحت چشم',
        description: 'از قانون 20-20-20 استفاده کنید: هر 20 دقیقه، به مدت 20 ثانیه به فاصله 20 فوتی نگاه کنید.',
        type: 'posture',
        priority: 'medium',
        timeToImplement: 1,
        benefits: ['کاهش خستگی چشم', 'جلوگیری از خشکی چشم', 'کاهش سردرد'],
        icon: 'eye'
      });
    }
    
    // پیشنهاد ورزش کوتاه
    if (state.isAtDesk && state.energyLevel < 6) {
      suggestions.push({
        id: 3,
        title: 'تمرین کوتاه',
        description: 'چند دقیقه ورزش کوتاه می‌تواند سطح انرژی شما را افزایش دهد.',
        type: 'exercise',
        priority: 'medium',
        timeToImplement: 5,
        benefits: ['افزایش انرژی', 'بهبود گردش خون', 'کاهش خستگی'],
        icon: 'dumbbell'
      });
    }
    
    // پیشنهاد مدیتیشن کوتاه
    if (state.stressLevel > 7) {
      suggestions.push({
        id: 4,
        title: 'تمرین تنفس عمیق',
        description: 'یک تمرین تنفس ۳ دقیقه‌ای برای کاهش سریع استرس',
        type: 'mental',
        priority: 'high',
        timeToImplement: 3,
        benefits: ['کاهش استرس', 'تمرکز بهتر', 'آرامش ذهنی'],
        icon: 'brain'
      });
    }
    
    return suggestions;
  };
  
  // تجزیه و تحلیل برای پیشنهاد هوشمند
  const getSmartSuggestion = () => {
    // الگوریتم ساده برای تشخیص نیاز فعلی
    let priority: 'hydration' | 'exercise' | 'mental' | 'posture' = 'posture';
    
    if (wellnessState.hydrationLevel < 4) {
      priority = 'hydration';
    } else if (wellnessState.stressLevel > 8) {
      priority = 'mental';
    } else if (wellnessState.energyLevel < 4) {
      priority = 'exercise';
    }
    
    switch (priority) {
      case 'hydration':
        return {
          message: 'زمان نوشیدن آب',
          action: 'drink_water',
          data: null
        };
      case 'exercise':
        // انتخاب یک تمرین تصادفی مناسب
        const exercise = microExercises.find(e => e.difficulty === 'easy');
        return {
          message: 'زمان حرکت کردن',
          action: 'do_exercise',
          data: exercise
        };
      case 'mental':
        // انتخاب یک تمرین تنفس مناسب
        const breathingExercise = breathingExercises.find(e => e.pattern.cycles <= 5);
        return {
          message: 'زمان آرامش',
          action: 'do_breathing',
          data: breathingExercise
        };
      case 'posture':
        return {
          message: 'وضعیت نشستن خود را بررسی کنید',
          action: 'check_posture',
          data: null
        };
    }
  };
  
  // انتخاب یک تمرین کوتاه تصادفی
  const getRandomMicroExercise = (difficulty?: 'easy' | 'medium' | 'hard'): MicroExercise | undefined => {
    const filtered = difficulty 
      ? microExercises.filter(e => e.difficulty === difficulty)
      : microExercises;
      
    if (filtered.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  };
  
  // انتخاب یک تمرین تنفس تصادفی
  const getRandomBreathingExercise = (): BreathingExercise | undefined => {
    if (breathingExercises.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * breathingExercises.length);
    return breathingExercises[randomIndex];
  };
  
  // انتخاب یک نکته سلامت ذهنی تصادفی
  const getRandomMentalTip = (category?: MentalWellnessTip['category']): MentalWellnessTip | undefined => {
    const filtered = category 
      ? mentalTips.filter(t => t.category === category)
      : mentalTips;
      
    if (filtered.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  };
  
  // ثبت تکمیل فعالیت سلامتی
  const logWellnessActivity = async (
    activityType: 'water' | 'exercise' | 'breathing' | 'break' | 'mental',
    duration?: number,
    details?: any
  ) => {
    try {
      // در یک اپلیکیشن واقعی، این داده‌ها به سرور ارسال می‌شوند
      console.log('Activity logged:', { activityType, duration, details, timestamp: new Date() });
      
      // به‌روزرسانی وضعیت محلی
      switch (activityType) {
        case 'water':
          updateWellnessState({ 
            hydrationLevel: Math.min(10, wellnessState.hydrationLevel + 2),
            lastWaterTime: new Date()
          });
          break;
        case 'exercise':
          updateWellnessState({ 
            energyLevel: Math.min(10, wellnessState.energyLevel + 1),
            lastExerciseTime: new Date()
          });
          break;
        case 'breathing':
        case 'mental':
          updateWellnessState({ 
            stressLevel: Math.max(1, wellnessState.stressLevel - 2)
          });
          break;
        case 'break':
          updateWellnessState({ 
            hasLongScreenTime: false,
            lastBreakTime: new Date()
          });
          break;
      }
      
      toast({
        title: 'فعالیت ثبت شد',
        description: `فعالیت ${getActivityName(activityType)} با موفقیت ثبت شد.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error logging wellness activity:', error);
      toast({
        title: 'خطا در ثبت فعالیت',
        description: 'متأسفانه امکان ثبت فعالیت وجود ندارد.',
        variant: 'destructive',
      });
      return false;
    }
  };
  
  // تبدیل نوع فعالیت به نام فارسی
  const getActivityName = (type: string): string => {
    switch (type) {
      case 'water': return 'نوشیدن آب';
      case 'exercise': return 'ورزش کوتاه';
      case 'breathing': return 'تمرین تنفس';
      case 'break': return 'استراحت';
      case 'mental': return 'تمرین ذهنی';
      default: return type;
    }
  };
  
  return {
    suggestions,
    microExercises,
    breathingExercises,
    mentalTips,
    wellnessState,
    updateWellnessState,
    getSmartSuggestion,
    getRandomMicroExercise,
    getRandomBreathingExercise,
    getRandomMentalTip,
    logWellnessActivity,
    isLoading,
    error
  };
}