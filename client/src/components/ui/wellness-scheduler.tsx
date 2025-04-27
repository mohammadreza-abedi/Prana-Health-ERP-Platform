import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn, toPersianDigits } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, isToday, isBefore, isAfter, parseISO, formatISO } from 'date-fns-jalali';
import {
  Bell,
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Minus,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  Coffee,
  Droplet,
  Dumbbell,
  Repeat,
  Edit,
  MoreVertical,
  Trash,
  Brain,
  Eye,
  HeartPulse,
  Users,
  Utensils,
  ListTodo,
  Pill,
  ListChecks
} from 'lucide-react';

// تایپ‌های داده‌ای
interface Reminder {
  id: number;
  title: string;
  description?: string;
  type: 'water' | 'exercise' | 'medication' | 'appointment' | 'break' | 'sleep' | 'meal' | 'social' | 'meditation' | 'custom';
  startTime: string;
  endTime?: string;
  daysOfWeek: number[];
  notificationTime: number;
  completed?: boolean;
  priority: 'low' | 'medium' | 'high';
  repeatType: 'daily' | 'weekly' | 'monthly' | 'once';
  category: 'health' | 'fitness' | 'nutrition' | 'mental' | 'social' | 'work';
  isActive: boolean;
}

interface WellnessRoutine {
  id: number;
  name: string;
  description?: string;
  reminderIds: number[];
  category: 'morning' | 'afternoon' | 'evening' | 'work' | 'weekend' | 'custom';
  isActive: boolean;
}

interface WellnessStats {
  waterProgress: number;
  exerciseProgress: number;
  medicationAdherence: number;
  sleepRegularity: number;
  mindfulnessMinutes: number;
  socialEngagement: number;
}

export function WellnessScheduler() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [routines, setRoutines] = useState<WellnessRoutine[]>([]);
  const [stats, setStats] = useState<WellnessStats>({
    waterProgress: 65,
    exerciseProgress: 75,
    medicationAdherence: 90,
    sleepRegularity: 80,
    mindfulnessMinutes: 40,
    socialEngagement: 60
  });
  
  const [newReminder, setNewReminder] = useState<Omit<Reminder, 'id'>>({
    title: '',
    description: '',
    type: 'water',
    startTime: '09:00',
    daysOfWeek: [1, 2, 3, 4, 5],
    notificationTime: 15,
    priority: 'medium',
    repeatType: 'daily',
    category: 'health',
    isActive: true
  });
  
  const [activeWeekDay, setActiveWeekDay] = useState(new Date().getDay());
  const [activeTab, setActiveTab] = useState('calendar');
  const [isAddReminderOpen, setIsAddReminderOpen] = useState(false);
  
  // بارگذاری داده‌های نمونه
  useEffect(() => {
    const sampleReminders: Reminder[] = [
      {
        id: 1,
        title: 'نوشیدن آب',
        description: 'یک لیوان آب بنوشید',
        type: 'water',
        startTime: '09:00',
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        notificationTime: 5,
        priority: 'high',
        repeatType: 'daily',
        category: 'health',
        isActive: true
      },
      {
        id: 2,
        title: 'ورزش صبحگاهی',
        description: '۱۵ دقیقه تمرینات کششی',
        type: 'exercise',
        startTime: '07:30',
        daysOfWeek: [1, 3, 5],
        notificationTime: 15,
        priority: 'medium',
        repeatType: 'weekly',
        category: 'fitness',
        isActive: true
      },
      {
        id: 3,
        title: 'مصرف داروها',
        description: 'قرص فشار خون',
        type: 'medication',
        startTime: '08:00',
        daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
        notificationTime: 10,
        priority: 'high',
        repeatType: 'daily',
        category: 'health',
        isActive: true
      },
      {
        id: 4,
        title: 'استراحت چشم',
        description: '۵ دقیقه استراحت چشم از مانیتور',
        type: 'break',
        startTime: '11:00',
        daysOfWeek: [1, 2, 3, 4, 5],
        notificationTime: 0,
        priority: 'low',
        repeatType: 'daily',
        category: 'health',
        isActive: true
      },
      {
        id: 5,
        title: 'مدیتیشن',
        description: '۱۰ دقیقه تمرین تنفس عمیق',
        type: 'meditation',
        startTime: '17:30',
        daysOfWeek: [1, 2, 3, 4, 5],
        notificationTime: 5,
        priority: 'medium',
        repeatType: 'daily',
        category: 'mental',
        isActive: true
      }
    ];
    
    const sampleRoutines: WellnessRoutine[] = [
      {
        id: 1,
        name: 'روتین صبحگاهی',
        description: 'مجموعه کارهای صبحگاهی برای شروع روز با انرژی',
        reminderIds: [1, 2, 3],
        category: 'morning',
        isActive: true
      },
      {
        id: 2,
        name: 'روتین محل کار',
        description: 'یادآورهای منظم در طول ساعات کاری',
        reminderIds: [1, 4],
        category: 'work',
        isActive: true
      },
      {
        id: 3,
        name: 'روتین عصرگاهی',
        description: 'فعالیت‌های بعد از کار برای آرامش ذهن',
        reminderIds: [5],
        category: 'evening',
        isActive: true
      }
    ];
    
    setReminders(sampleReminders);
    setRoutines(sampleRoutines);
  }, []);
  
  // اضافه کردن یادآور جدید
  const addReminder = () => {
    if (!newReminder.title) {
      toast({
        title: 'عنوان الزامی است',
        description: 'لطفاً عنوان یادآور را وارد کنید',
        variant: 'destructive',
      });
      return;
    }
    
    const id = Math.max(0, ...reminders.map(r => r.id)) + 1;
    
    setReminders([...reminders, { ...newReminder, id }]);
    
    setNewReminder({
      title: '',
      description: '',
      type: 'water',
      startTime: '09:00',
      daysOfWeek: [1, 2, 3, 4, 5],
      notificationTime: 15,
      priority: 'medium',
      repeatType: 'daily',
      category: 'health',
      isActive: true
    });
    
    setIsAddReminderOpen(false);
    
    toast({
      title: 'یادآور جدید ایجاد شد',
      description: `یادآور «${newReminder.title}» با موفقیت اضافه شد.`,
    });
  };
  
  // حذف یادآور
  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
    
    // حذف از روتین‌ها
    setRoutines(routines.map(routine => ({
      ...routine,
      reminderIds: routine.reminderIds.filter(rId => rId !== id)
    })));
    
    toast({
      title: 'یادآور حذف شد',
      description: 'یادآور با موفقیت حذف شد.',
    });
  };
  
  // تغییر وضعیت یادآور
  const toggleReminderStatus = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
    
    const reminder = reminders.find(r => r.id === id);
    
    toast({
      title: `یادآور ${reminder?.isActive ? 'غیرفعال' : 'فعال'} شد`,
      description: `یادآور «${reminder?.title}» ${reminder?.isActive ? 'غیرفعال' : 'فعال'} شد.`,
    });
  };
  
  // انجام یادآور
  const completeReminder = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
    
    const reminder = reminders.find(r => r.id === id);
    
    toast({
      title: reminder?.completed ? 'یادآور به حالت ناتمام برگشت' : 'یادآور انجام شد',
      description: `یادآور «${reminder?.title}» ${reminder?.completed ? 'ناتمام' : 'انجام شد'}.`,
    });
  };
  
  // ایجاد روتین جدید
  const createRoutine = (name: string, category: WellnessRoutine['category'], selectedReminderIds: number[]) => {
    const id = Math.max(0, ...routines.map(r => r.id)) + 1;
    
    const newRoutine: WellnessRoutine = {
      id,
      name,
      reminderIds: selectedReminderIds,
      category,
      isActive: true
    };
    
    setRoutines([...routines, newRoutine]);
    
    toast({
      title: 'روتین جدید ایجاد شد',
      description: `روتین «${name}» با ${toPersianDigits(selectedReminderIds.length)} یادآور ایجاد شد.`,
    });
  };
  
  // فعال/غیرفعال کردن روتین
  const toggleRoutineStatus = (id: number) => {
    setRoutines(routines.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
    
    const routine = routines.find(r => r.id === id);
    
    toast({
      title: `روتین ${routine?.isActive ? 'غیرفعال' : 'فعال'} شد`,
      description: `روتین «${routine?.name}» ${routine?.isActive ? 'غیرفعال' : 'فعال'} شد.`,
    });
  };
  
  // دریافت آیکون بر اساس نوع یادآور
  const getReminderIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'water': return <Droplet className="h-4 w-4 text-blue-500" />;
      case 'exercise': return <Dumbbell className="h-4 w-4 text-green-500" />;
      case 'medication': return <Pill className="h-4 w-4 text-red-500" />;
      case 'appointment': return <Calendar className="h-4 w-4 text-indigo-500" />;
      case 'break': return <Coffee className="h-4 w-4 text-amber-500" />;
      case 'sleep': return <Clock className="h-4 w-4 text-violet-500" />;
      case 'meal': return <Utensils className="h-4 w-4 text-orange-500" />;
      case 'social': return <Users className="h-4 w-4 text-pink-500" />;
      case 'meditation': return <Brain className="h-4 w-4 text-purple-500" />;
      case 'custom': return <ListTodo className="h-4 w-4 text-gray-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };
  
  // دریافت کلاس رنگ بر اساس اولویت
  const getPriorityClass = (priority: Reminder['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500 border-red-500/50 bg-red-500/10';
      case 'medium': return 'text-amber-500 border-amber-500/50 bg-amber-500/10';
      case 'low': return 'text-blue-500 border-blue-500/50 bg-blue-500/10';
      default: return 'text-muted-foreground border-gray-500/50 bg-gray-500/10';
    }
  };
  
  // دریافت نام فارسی روز هفته
  const getDayName = (day: number) => {
    const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
    return days[day];
  };
  
  // دریافت نام فارسی دسته‌بندی
  const getCategoryName = (category: Reminder['category']) => {
    switch (category) {
      case 'health': return 'سلامت';
      case 'fitness': return 'تناسب اندام';
      case 'nutrition': return 'تغذیه';
      case 'mental': return 'سلامت ذهنی';
      case 'social': return 'اجتماعی';
      case 'work': return 'کاری';
      default: return category;
    }
  };
  
  // فیلتر یادآورها برای روز فعلی
  const getDayReminders = (day: number) => {
    return reminders.filter(reminder => 
      reminder.isActive && reminder.daysOfWeek.includes(day)
    ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  };
  
  // فیلتر یادآورها برای تب امروز
  const getTodayReminders = () => {
    const today = new Date().getDay();
    return getDayReminders(today);
  };
  
  // هفت روز آینده برای نمایش در تقویم هفتگی
  const getNextSevenDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(new Date(), i);
      return {
        date,
        day: date.getDay(),
        isToday: i === 0
      };
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          زمان‌بندی سلامت و تندرستی
        </h2>
      </div>
      
      {/* تب‌های اصلی */}
      <Tabs defaultValue="calendar" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="calendar">تقویم هفتگی</TabsTrigger>
          <TabsTrigger value="today">امروز</TabsTrigger>
          <TabsTrigger value="reminders">همه یادآورها</TabsTrigger>
          <TabsTrigger value="routines">روتین‌ها</TabsTrigger>
        </TabsList>
        
        {/* تب تقویم هفتگی */}
        <TabsContent value="calendar" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  برنامه هفتگی
                </CardTitle>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>
                مرور یادآورهای هفت روز آینده
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {getNextSevenDays().map((dayInfo, index) => (
                  <Button
                    key={index}
                    variant={activeWeekDay === dayInfo.day ? 'default' : 'outline'}
                    className={cn(
                      "flex flex-col items-center p-2 h-auto",
                      dayInfo.isToday && "border-primary"
                    )}
                    onClick={() => setActiveWeekDay(dayInfo.day)}
                  >
                    <span className="text-xs mb-1">
                      {getDayName(dayInfo.day)}
                    </span>
                    <span className={cn(
                      "flex items-center justify-center w-7 h-7 rounded-full",
                      dayInfo.isToday && "bg-primary text-primary-foreground"
                    )}>
                      {toPersianDigits(format(dayInfo.date, 'd'))}
                    </span>
                  </Button>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">
                    یادآورهای {getDayName(activeWeekDay)}
                  </h3>
                  <Dialog open={isAddReminderOpen} onOpenChange={setIsAddReminderOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        یادآور جدید
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px]">
                      <DialogHeader>
                        <DialogTitle>افزودن یادآور جدید</DialogTitle>
                        <DialogDescription>
                          مشخصات یادآور جدید را وارد کنید
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">عنوان</Label>
                          <Input
                            id="title"
                            value={newReminder.title}
                            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                            placeholder="عنوان یادآور"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">توضیحات</Label>
                          <Input
                            id="description"
                            value={newReminder.description}
                            onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                            placeholder="توضیحات یادآور (اختیاری)"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="type">نوع</Label>
                            <Select
                              value={newReminder.type}
                              onValueChange={(value: any) => setNewReminder({ ...newReminder, type: value })}
                            >
                              <SelectTrigger id="type">
                                <SelectValue placeholder="انتخاب نوع" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="water">نوشیدن آب</SelectItem>
                                <SelectItem value="exercise">ورزش</SelectItem>
                                <SelectItem value="medication">دارو</SelectItem>
                                <SelectItem value="appointment">قرار ملاقات</SelectItem>
                                <SelectItem value="break">استراحت</SelectItem>
                                <SelectItem value="sleep">خواب</SelectItem>
                                <SelectItem value="meal">وعده غذایی</SelectItem>
                                <SelectItem value="social">فعالیت اجتماعی</SelectItem>
                                <SelectItem value="meditation">مدیتیشن</SelectItem>
                                <SelectItem value="custom">سفارشی</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="category">دسته‌بندی</Label>
                            <Select
                              value={newReminder.category}
                              onValueChange={(value: any) => setNewReminder({ ...newReminder, category: value })}
                            >
                              <SelectTrigger id="category">
                                <SelectValue placeholder="انتخاب دسته‌بندی" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="health">سلامت</SelectItem>
                                <SelectItem value="fitness">تناسب اندام</SelectItem>
                                <SelectItem value="nutrition">تغذیه</SelectItem>
                                <SelectItem value="mental">سلامت ذهنی</SelectItem>
                                <SelectItem value="social">اجتماعی</SelectItem>
                                <SelectItem value="work">کاری</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="startTime">زمان</Label>
                            <Input
                              id="startTime"
                              type="time"
                              value={newReminder.startTime}
                              onChange={(e) => setNewReminder({ ...newReminder, startTime: e.target.value })}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="priority">اولویت</Label>
                            <Select
                              value={newReminder.priority}
                              onValueChange={(value: any) => setNewReminder({ ...newReminder, priority: value })}
                            >
                              <SelectTrigger id="priority">
                                <SelectValue placeholder="انتخاب اولویت" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">بالا</SelectItem>
                                <SelectItem value="medium">متوسط</SelectItem>
                                <SelectItem value="low">پایین</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label>روزهای هفته</Label>
                          <div className="flex flex-wrap gap-2">
                            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                              <Button
                                key={day}
                                type="button"
                                size="sm"
                                variant={newReminder.daysOfWeek.includes(day) ? "default" : "outline"}
                                onClick={() => {
                                  const updatedDays = newReminder.daysOfWeek.includes(day)
                                    ? newReminder.daysOfWeek.filter(d => d !== day)
                                    : [...newReminder.daysOfWeek, day];
                                  setNewReminder({ ...newReminder, daysOfWeek: updatedDays });
                                }}
                              >
                                {getDayName(day)}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddReminderOpen(false)}>
                          انصراف
                        </Button>
                        <Button type="submit" onClick={addReminder}>
                          افزودن یادآور
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="space-y-2">
                  {getDayReminders(activeWeekDay).length > 0 ? (
                    getDayReminders(activeWeekDay).map((reminder) => (
                      <div
                        key={reminder.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border",
                          reminder.completed && "opacity-60 bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              className={cn("h-8 w-8", 
                                reminder.completed ? "bg-primary text-primary-foreground" : "")}
                              onClick={() => completeReminder(reminder.id)}
                            >
                              {reminder.completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                getReminderIcon(reminder.type)
                              )}
                            </Button>
                          </div>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {reminder.title}
                              <Badge className={cn("text-xs", getPriorityClass(reminder.priority))}>
                                {reminder.priority === 'high' ? 'بالا' : 
                                 reminder.priority === 'medium' ? 'متوسط' : 'پایین'}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>{toPersianDigits(reminder.startTime)}</span>
                              {reminder.description && (
                                <span className="truncate max-w-[200px]">• {reminder.description}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleReminderStatus(reminder.id)}
                          >
                            {reminder.isActive ? (
                              <Bell className="h-4 w-4" />
                            ) : (
                              <Bell className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2">
                              <div className="grid gap-1">
                                <Button 
                                  variant="ghost" 
                                  className="w-full justify-start text-sm"
                                  onClick={() => {/* اینجا ویرایش یادآور */}}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  ویرایش
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  className="w-full justify-start text-sm text-destructive"
                                  onClick={() => deleteReminder(reminder.id)}
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  حذف
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 border rounded-lg bg-muted/30">
                      <div className="mb-2">
                        <Bell className="h-8 w-8 mx-auto text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground">یادآوری برای این روز وجود ندارد</p>
                      <p className="text-sm mt-1 text-muted-foreground">
                        با کلیک روی «یادآور جدید» می‌توانید یادآور جدیدی ایجاد کنید
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* کارت آمارها */}
          <Card className="bg-card/50 backdrop-blur-sm border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-primary" />
                آمار روزانه
              </CardTitle>
              <CardDescription>
                پیشرفت شما در اهداف روزانه
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Droplet className="h-4 w-4 text-blue-500" />
                      <span>آب روزانه</span>
                    </div>
                    <span>{toPersianDigits(stats.waterProgress)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${stats.waterProgress}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Dumbbell className="h-4 w-4 text-green-500" />
                      <span>ورزش</span>
                    </div>
                    <span>{toPersianDigits(stats.exerciseProgress)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${stats.exerciseProgress}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Pill className="h-4 w-4 text-red-500" />
                      <span>مصرف دارو</span>
                    </div>
                    <span>{toPersianDigits(stats.medicationAdherence)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ width: `${stats.medicationAdherence}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-violet-500" />
                      <span>نظم خواب</span>
                    </div>
                    <span>{toPersianDigits(stats.sleepRegularity)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-violet-500 rounded-full" 
                      style={{ width: `${stats.sleepRegularity}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Brain className="h-4 w-4 text-purple-500" />
                      <span>ذهن‌آگاهی</span>
                    </div>
                    <span>{toPersianDigits(stats.mindfulnessMinutes)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full" 
                      style={{ width: `${stats.mindfulnessMinutes}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-pink-500" />
                      <span>فعالیت اجتماعی</span>
                    </div>
                    <span>{toPersianDigits(stats.socialEngagement)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-pink-500 rounded-full" 
                      style={{ width: `${stats.socialEngagement}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* تب امروز */}
        <TabsContent value="today" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm border">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-primary" />
                    یادآورهای امروز
                  </CardTitle>
                  <Badge className="bg-primary">
                    {toPersianDigits(getTodayReminders().length)} مورد
                  </Badge>
                </div>
                <CardDescription>
                  {format(new Date(), 'EEEE d MMMM yyyy', { locale: 'fa-IR' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getTodayReminders().length > 0 ? (
                    getTodayReminders().map((reminder) => (
                      <div
                        key={reminder.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border",
                          reminder.completed && "opacity-60 bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <Button
                              variant="outline"
                              size="icon"
                              className={cn("h-8 w-8", 
                                reminder.completed ? "bg-primary text-primary-foreground" : "")}
                              onClick={() => completeReminder(reminder.id)}
                            >
                              {reminder.completed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                getReminderIcon(reminder.type)
                              )}
                            </Button>
                          </div>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {reminder.title}
                              <Badge className={cn("text-xs", getPriorityClass(reminder.priority))}>
                                {reminder.priority === 'high' ? 'بالا' : 
                                 reminder.priority === 'medium' ? 'متوسط' : 'پایین'}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>{toPersianDigits(reminder.startTime)}</span>
                              {reminder.description && (
                                <span className="truncate max-w-[200px]">• {reminder.description}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toggleReminderStatus(reminder.id)}
                          >
                            {reminder.isActive ? (
                              <Bell className="h-4 w-4" />
                            ) : (
                              <Bell className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => deleteReminder(reminder.id)}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 border rounded-lg bg-muted/30">
                      <div className="mb-2">
                        <Check className="h-8 w-8 mx-auto text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground">یادآوری برای امروز وجود ندارد</p>
                      <p className="text-sm mt-1 text-muted-foreground">
                        روز آرامی داشته باشید!
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Repeat className="h-5 w-5 text-primary" />
                  روتین‌های امروز
                </CardTitle>
                <CardDescription>
                  مجموعه یادآورهای منظم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {routines.filter(r => r.isActive).map((routine) => (
                    <div key={routine.id} className="p-3 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">
                          {routine.name}
                        </div>
                        <Switch
                          checked={routine.isActive}
                          onCheckedChange={() => toggleRoutineStatus(routine.id)}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {routine.description}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {routine.reminderIds.map(rId => {
                          const reminder = reminders.find(r => r.id === rId);
                          return reminder ? (
                            <Badge key={rId} variant="outline" className="flex items-center gap-1">
                              {getReminderIcon(reminder.type)}
                              <span>{reminder.title}</span>
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  ))}
                  
                  {routines.filter(r => r.isActive).length === 0 && (
                    <div className="text-center py-6 border rounded-lg bg-muted/30">
                      <div className="mb-2">
                        <Repeat className="h-6 w-6 mx-auto text-muted-foreground/50" />
                      </div>
                      <p className="text-muted-foreground">روتین فعالی وجود ندارد</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* تب همه یادآورها */}
        <TabsContent value="reminders" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  همه یادآورها
                </CardTitle>
                <Dialog open={isAddReminderOpen} onOpenChange={setIsAddReminderOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="gap-1">
                      <Plus className="h-4 w-4" />
                      یادآور جدید
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[550px]">
                    {/* محتوای دیالوگ افزودن یادآور - مشابه بالا */}
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                همه یادآورهای فعال و غیرفعال
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Input
                    placeholder="جستجوی یادآور..."
                    className="max-w-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  {reminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border",
                        !reminder.isActive && "opacity-60 bg-muted/50",
                        reminder.completed && "border-green-500/20 bg-green-500/5"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            `bg-${
                              reminder.type === 'water' ? 'blue' :
                              reminder.type === 'exercise' ? 'green' :
                              reminder.type === 'medication' ? 'red' :
                              reminder.type === 'appointment' ? 'indigo' :
                              reminder.type === 'break' ? 'amber' :
                              reminder.type === 'sleep' ? 'violet' :
                              reminder.type === 'meal' ? 'orange' :
                              reminder.type === 'social' ? 'pink' :
                              reminder.type === 'meditation' ? 'purple' : 'gray'
                            }-500/20`
                          )}>
                            {getReminderIcon(reminder.type)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {reminder.title}
                            <Badge className={cn("text-xs", getPriorityClass(reminder.priority))}>
                              {reminder.priority === 'high' ? 'بالا' : 
                               reminder.priority === 'medium' ? 'متوسط' : 'پایین'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {toPersianDigits(reminder.startTime)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Repeat className="h-3 w-3" />
                              {reminder.repeatType === 'daily' ? 'روزانه' :
                               reminder.repeatType === 'weekly' ? 'هفتگی' :
                               reminder.repeatType === 'monthly' ? 'ماهانه' : 'یکبار'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {getCategoryName(reminder.category)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleReminderStatus(reminder.id)}
                        >
                          {reminder.isActive ? (
                            <Bell className="h-4 w-4" />
                          ) : (
                            <Bell className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteReminder(reminder.id)}
                        >
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* تب روتین‌ها */}
        <TabsContent value="routines" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Repeat className="h-5 w-5 text-primary" />
                  روتین‌های تندرستی
                </CardTitle>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  روتین جدید
                </Button>
              </div>
              <CardDescription>
                مجموعه یادآورهای مرتبط به هم
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {routines.map((routine) => (
                  <div key={routine.id} className="border rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{routine.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {routine.description}
                          </p>
                        </div>
                        <Switch
                          checked={routine.isActive}
                          onCheckedChange={() => toggleRoutineStatus(routine.id)}
                        />
                      </div>
                      
                      <div className="space-y-2 mt-4">
                        {routine.reminderIds.map(rId => {
                          const reminder = reminders.find(r => r.id === rId);
                          return reminder ? (
                            <div 
                              key={rId} 
                              className="text-sm border border-muted rounded-md p-2 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2">
                                {getReminderIcon(reminder.type)}
                                <span>{reminder.title}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {toPersianDigits(reminder.startTime)}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="p-2 bg-muted/30 border-t flex justify-end gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        ویرایش
                      </Button>
                    </div>
                  </div>
                ))}
                
                {/* کارت ایجاد روتین جدید */}
                <div className="border rounded-lg bg-muted/30 p-6 flex flex-col items-center justify-center text-center h-full">
                  <div className="mb-2">
                    <Plus className="h-8 w-8 mx-auto text-muted-foreground/50" />
                  </div>
                  <h3 className="font-medium">روتین جدید</h3>
                  <p className="text-xs text-muted-foreground mt-1 mb-3">
                    ایجاد مجموعه یادآور جدید
                  </p>
                  <Button variant="outline" size="sm">
                    ایجاد روتین
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}