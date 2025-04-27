import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { ProCard } from '@/components/ui/pro-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Dumbbell, BarChart3, History, TrendingUp, Flame, Watch } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// دیتای نمونه ورزش‌ها
const workouts = [
  {
    id: 1,
    name: 'تمرین قدرتی بالاتنه',
    duration: 45,
    category: 'قدرتی',
    calories: 320,
    difficulty: 'متوسط',
    completion: 85,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    exercises: [
      { name: 'پرس سینه', sets: 4, reps: 12, weight: 60 },
      { name: 'زیر بغل سیم کش', sets: 3, reps: 15, weight: 50 },
      { name: 'نشر از جانب', sets: 3, reps: 12, weight: 8 },
      { name: 'جلو بازو هالتر', sets: 3, reps: 12, weight: 25 },
      { name: 'پشت بازو طناب', sets: 3, reps: 15, weight: 25 },
    ]
  },
  {
    id: 2,
    name: 'تمرین پایین تنه',
    duration: 50,
    category: 'قدرتی',
    calories: 380,
    difficulty: 'سخت',
    completion: 75,
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    exercises: [
      { name: 'اسکوات هالتر', sets: 4, reps: 10, weight: 80 },
      { name: 'پرس پا', sets: 3, reps: 12, weight: 120 },
      { name: 'جلو پا دستگاه', sets: 3, reps: 15, weight: 40 },
      { name: 'همسترینگ', sets: 3, reps: 12, weight: 35 },
      { name: 'ساق پا نشسته', sets: 4, reps: 20, weight: 60 },
    ]
  },
  {
    id: 3,
    name: 'تمرین کاردیو HIIT',
    duration: 30,
    category: 'کاردیو',
    calories: 350,
    difficulty: 'سخت',
    completion: 60,
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640',
    exercises: [
      { name: 'دویدن سرعتی', duration: 30, sets: 8, rest: 15 },
      { name: 'برپی', duration: 40, sets: 6, rest: 20 },
      { name: 'مانتین کلایمر', duration: 40, sets: 6, rest: 20 },
      { name: 'طناب زدن', duration: 60, sets: 5, rest: 30 },
      { name: 'اسکوات پرشی', duration: 30, sets: 6, rest: 20 },
    ]
  }
];

// دیتای آماری هفتگی
const weeklyStats = [
  { day: 'شنبه', calories: 320, duration: 45, intensity: 7 },
  { day: 'یکشنبه', calories: 0, duration: 0, intensity: 0 },
  { day: 'دوشنبه', calories: 380, duration: 50, intensity: 8 },
  { day: 'سه‌شنبه', calories: 280, duration: 30, intensity: 6 },
  { day: 'چهارشنبه', calories: 0, duration: 0, intensity: 0 },
  { day: 'پنج‌شنبه', calories: 350, duration: 45, intensity: 7 },
  { day: 'جمعه', calories: 150, duration: 20, intensity: 4 },
];

// اهداف تمرینی
const workoutGoals = [
  { id: 1, name: '۴ جلسه تمرین در هفته', progress: 75, target: 4, current: 3 },
  { id: 2, name: '۱۵۰۰ کالری در هفته', progress: 80, target: 1500, current: 1200 },
  { id: 3, name: '۳ ساعت تمرین قدرتی', progress: 66, target: 180, current: 120 },
];

const WorkoutHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">داشبورد تمرینات</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">مدیریت برنامه‌های تمرینی و پیشرفت شما</p>
      </div>
      
      <div className="flex space-x-3 space-x-reverse mt-4 md:mt-0">
        <Select defaultValue="هفته">
          <SelectTrigger className="w-[130px] h-9 text-sm">
            <SelectValue placeholder="بازه زمانی" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="روز">امروز</SelectItem>
            <SelectItem value="هفته">این هفته</SelectItem>
            <SelectItem value="ماه">این ماه</SelectItem>
            <SelectItem value="سال">امسال</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="sm" className="h-9">
          <Calendar className="h-4 w-4 ml-1.5" />
          <span>تقویم</span>
        </Button>
        
        <Button className="h-9 bg-tiffany text-white hover:bg-tiffany-hover">
          <Dumbbell className="h-4 w-4 ml-1.5" />
          <span>تمرین جدید</span>
        </Button>
      </div>
    </div>
  );
};

// کامپوننت فعالیت هفتگی
const WeeklyActivity = () => {
  return (
    <div className="w-full">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">فعالیت هفتگی</CardTitle>
            <Button variant="ghost" size="sm" className="h-8 text-xs text-tiffany hover:text-tiffany-hover">
              <span>مشاهده همه</span>
              <ChevronRight className="h-3.5 w-3.5 mr-1" />
            </Button>
          </div>
          <CardDescription>آمار تمرینات شما در هفته جاری</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mt-2">
            {weeklyStats.map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className={`relative w-full max-w-[40px] bg-slate-100 dark:bg-slate-800 rounded-t-md overflow-hidden ${day.calories === 0 ? 'opacity-40' : ''}`} 
                  style={{ height: `${(day.calories / 400) * 120}px` }}
                >
                  {day.calories > 0 && (
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-tiffany to-aqua opacity-60 dark:opacity-70"
                      style={{ height: `${(day.calories / 400) * 120}px` }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-slate-600 dark:text-slate-300">
                    {day.calories > 0 ? day.calories : '-'}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  {day.day.substring(0, 1)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-tiffany/10 flex items-center justify-center text-tiffany">
                    <Flame size={18} />
                  </div>
                  <div className="mr-2">
                    <div className="text-xs text-slate-500 dark:text-slate-400">کالری</div>
                    <div className="font-bold">۱,۴۸۰</div>
                  </div>
                </div>
                <div className="text-xs text-success flex items-center">
                  <TrendingUp size={14} className="ml-0.5" />
                  ۱۲٪
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-aqua/10 flex items-center justify-center text-aqua">
                    <Watch size={18} />
                  </div>
                  <div className="mr-2">
                    <div className="text-xs text-slate-500 dark:text-slate-400">زمان</div>
                    <div className="font-bold">۳:۲۰</div>
                  </div>
                </div>
                <div className="text-xs text-success flex items-center">
                  <TrendingUp size={14} className="ml-0.5" />
                  ۸٪
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// کامپوننت اهداف تمرینی
const WorkoutGoals = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">اهداف تمرینی</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-xs text-tiffany hover:text-tiffany-hover">
            <span>ویرایش</span>
          </Button>
        </div>
        <CardDescription>پیشرفت شما در اهداف تمرینی</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workoutGoals.map((goal) => (
            <div key={goal.id}>
              <div className="flex justify-between text-sm mb-1">
                <span>{goal.name}</span>
                <span className="font-medium">{goal.current} / {goal.target}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-tiffany to-aqua rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
          
          <Button className="w-full mt-2" variant="outline" size="sm">
            <span>افزودن هدف جدید</span>
            <span className="mr-1">+</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ExerciseList = ({ exercises }: { exercises: any[] }) => {
  return (
    <div className="mt-4 space-y-3">
      {exercises.map((exercise, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
          <div>
            <div className="font-medium">{exercise.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {exercise.sets} ست × {exercise.reps ? `${exercise.reps} تکرار` : `${exercise.duration} ثانیه`}
              {exercise.weight && ` | ${exercise.weight} کیلوگرم`}
              {exercise.rest && ` | استراحت: ${exercise.rest} ثانیه`}
            </div>
          </div>
          <Button size="sm" variant="ghost" className="h-7 px-2">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default function WorkoutDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
  
  const handleWorkoutClick = (workoutId: number) => {
    setSelectedWorkout(workoutId === selectedWorkout ? null : workoutId);
  };
  
  return (
    <MainLayout>
      <div className="pb-8">
        <WorkoutHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="pro-tabs mb-6"
            >
              <TabsList>
                <TabsTrigger value="upcoming" className="pro-tab">
                  <Dumbbell className="h-4 w-4 ml-1.5" />
                  تمرینات پیش رو
                </TabsTrigger>
                <TabsTrigger value="history" className="pro-tab">
                  <History className="h-4 w-4 ml-1.5" />
                  تاریخچه تمرینات
                </TabsTrigger>
                <TabsTrigger value="stats" className="pro-tab">
                  <BarChart3 className="h-4 w-4 ml-1.5" />
                  آمار و تحلیل
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="pro-tab-content">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {workouts.map((workout) => (
                    <ProCard 
                      key={workout.id}
                      variant={selectedWorkout === workout.id ? 'premium' : 'default'}
                      color="tiffany"
                      className="cursor-pointer"
                      onClick={() => handleWorkoutClick(workout.id)}
                    >
                      <div className="relative h-36 -mx-5 -mt-5 mb-3 rounded-t-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10"></div>
                        <img 
                          src={workout.image} 
                          alt={workout.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                          <div>
                            <h3 className="text-white font-bold text-lg">{workout.name}</h3>
                            <div className="flex items-center text-white/80 text-xs mt-1">
                              <span>{workout.category}</span>
                              <span className="mx-2">•</span>
                              <span>{workout.duration} دقیقه</span>
                              <span className="mx-2">•</span>
                              <span>{workout.calories} کالری</span>
                            </div>
                          </div>
                          <span className="bg-tiffany/90 text-white text-xs font-medium px-2 py-1 rounded">
                            {workout.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>پیشرفت تمرین</span>
                          <span className="font-medium">{workout.completion}%</span>
                        </div>
                        <Progress value={workout.completion} className="h-1.5" />
                      </div>
                      
                      {selectedWorkout === workout.id && (
                        <div className="mt-6">
                          <div className="flex justify-between items-center">
                            <h4 className="font-bold">تمرینات</h4>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {workout.exercises.length} تمرین
                            </span>
                          </div>
                          
                          <ExerciseList exercises={workout.exercises} />
                          
                          <div className="flex gap-2 mt-4">
                            <Button className="w-full bg-tiffany hover:bg-tiffany-hover text-white">
                              شروع تمرین
                            </Button>
                            <Button variant="outline" size="icon" className="shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </Button>
                          </div>
                        </div>
                      )}
                    </ProCard>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="pro-tab-content">
                <div className="text-center py-10">
                  <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300">در حال بارگذاری تاریخچه تمرینات...</h3>
                  <p className="text-slate-500 mt-2">این بخش به زودی تکمیل خواهد شد</p>
                </div>
              </TabsContent>
              
              <TabsContent value="stats" className="pro-tab-content">
                <div className="text-center py-10">
                  <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300">در حال آماده‌سازی آمار و تحلیل...</h3>
                  <p className="text-slate-500 mt-2">این بخش به زودی تکمیل خواهد شد</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <WeeklyActivity />
            <WorkoutGoals />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}