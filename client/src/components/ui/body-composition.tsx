import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, BarChart3, Calendar, Edit, Plus, Save, Scale, Trash2, TrendingUp, FileText, Heart, Target, ArrowLeft, ArrowRight, Info, HelpCircle, LifeBuoy } from 'lucide-react';
import { toPersianDigits, formatDate } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// تایپ‌های داده‌ای
interface BodyMeasurement {
  id: number;
  date: string;
  weight: number; // کیلوگرم
  bodyFatPercentage?: number;
  musclePercentage?: number;
  waterPercentage?: number;
  bmi?: number;
  visceralFat?: number;
  waistCircumference?: number; // سانتی‌متر
  hipCircumference?: number; // سانتی‌متر
  chestCircumference?: number; // سانتی‌متر
  neckCircumference?: number; // سانتی‌متر
  armCircumference?: number; // سانتی‌متر
  thighCircumference?: number; // سانتی‌متر
  notes?: string;
}

interface UserProfile {
  height: number; // سانتی‌متر
  birthDate: string;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
  goal: 'loseWeight' | 'maintain' | 'gainWeight' | 'gainMuscle';
}

// کامپوننت اصلی
export function BodyComposition() {
  const { toast } = useToast();
  
  // داده‌های پروفایل کاربر
  const [profile, setProfile] = useState<UserProfile>({
    height: 175,
    birthDate: '1990-01-01',
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  });
  
  // تاریخچه اندازه‌گیری‌ها
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([
    {
      id: 1,
      date: '2025-04-01',
      weight: 78.2,
      bodyFatPercentage: 24.5,
      musclePercentage: 37.8,
      waterPercentage: 55.3,
      bmi: 25.6,
      visceralFat: 8,
      waistCircumference: 86,
      hipCircumference: 101,
      chestCircumference: 98,
      neckCircumference: 39,
      armCircumference: 32,
      thighCircumference: 56,
      notes: 'اندازه‌گیری صبح قبل از صبحانه'
    },
    {
      id: 2,
      date: '2025-03-15',
      weight: 79.6,
      bodyFatPercentage: 25.2,
      musclePercentage: 36.9,
      waterPercentage: 54.8,
      bmi: 26.1,
      visceralFat: 9,
      waistCircumference: 88,
      hipCircumference: 102,
      chestCircumference: 99,
      neckCircumference: 39.5,
      armCircumference: 32,
      thighCircumference: 57,
      notes: 'اندازه‌گیری بعد از تعطیلات نوروز'
    },
    {
      id: 3,
      date: '2025-02-20',
      weight: 80.5,
      bodyFatPercentage: 26.0,
      musclePercentage: 36.4,
      waterPercentage: 54.2,
      bmi: 26.3,
      visceralFat: 9,
      waistCircumference: 89,
      hipCircumference: 103,
      chestCircumference: 100,
      neckCircumference: 40,
      armCircumference: 32.5,
      thighCircumference: 57.5,
      notes: ''
    }
  ]);
  
  // امروز
  const today = new Date().toISOString().split('T')[0];
  
  // اندازه‌گیری جدید
  const [newMeasurement, setNewMeasurement] = useState<Omit<BodyMeasurement, 'id'>>({
    date: today,
    weight: 0,
    bodyFatPercentage: undefined,
    musclePercentage: undefined,
    waterPercentage: undefined,
    visceralFat: undefined,
    waistCircumference: undefined,
    hipCircumference: undefined,
    chestCircumference: undefined,
    neckCircumference: undefined,
    armCircumference: undefined,
    thighCircumference: undefined,
    notes: ''
  });
  
  // مود ویرایش
  const [editMode, setEditMode] = useState(false);
  const [editingMeasurement, setEditingMeasurement] = useState<BodyMeasurement | null>(null);
  
  // وضعیت مقایسه
  const [compareMode, setCompareMode] = useState(false);
  const [selectedMeasurements, setSelectedMeasurements] = useState<number[]>([]);
  
  // ترتیب نمایش
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // محاسبه BMI
  const calculateBMI = (weight: number, height: number): number => {
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
  };
  
  // محاسبه WHR (نسبت دور کمر به دور باسن)
  const calculateWHR = (waist?: number, hip?: number): number | undefined => {
    if (!waist || !hip) return undefined;
    return parseFloat((waist / hip).toFixed(2));
  };
  
  // محاسبه تغییرات
  const calculateChange = (current: number | undefined, previous: number | undefined): string => {
    if (current === undefined || previous === undefined) return '-';
    const change = current - previous;
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}`;
  };
  
  // تفسیر BMI
  const interpretBMI = (bmi: number | undefined): { status: string; color: string } => {
    if (bmi === undefined) return { status: 'نامشخص', color: 'text-gray-500' };
    
    if (bmi < 18.5) return { status: 'کمبود وزن', color: 'text-blue-500' };
    if (bmi < 25) return { status: 'وزن نرمال', color: 'text-green-500' };
    if (bmi < 30) return { status: 'اضافه وزن', color: 'text-yellow-500' };
    if (bmi < 35) return { status: 'چاقی درجه 1', color: 'text-orange-500' };
    if (bmi < 40) return { status: 'چاقی درجه 2', color: 'text-red-500' };
    return { status: 'چاقی درجه 3', color: 'text-red-600' };
  };
  
  // تفسیر درصد چربی بدن
  const interpretBodyFat = (bodyFat: number | undefined, gender: 'male' | 'female'): { status: string; color: string } => {
    if (bodyFat === undefined) return { status: 'نامشخص', color: 'text-gray-500' };
    
    if (gender === 'male') {
      if (bodyFat < 6) return { status: 'خیلی کم', color: 'text-blue-500' };
      if (bodyFat < 14) return { status: 'ورزشکاری', color: 'text-green-500' };
      if (bodyFat < 18) return { status: 'فیتنس', color: 'text-green-400' };
      if (bodyFat < 25) return { status: 'متوسط', color: 'text-yellow-500' };
      return { status: 'بالا', color: 'text-orange-500' };
    } else {
      if (bodyFat < 16) return { status: 'خیلی کم', color: 'text-blue-500' };
      if (bodyFat < 24) return { status: 'ورزشکاری', color: 'text-green-500' };
      if (bodyFat < 30) return { status: 'فیتنس', color: 'text-green-400' };
      if (bodyFat < 32) return { status: 'متوسط', color: 'text-yellow-500' };
      return { status: 'بالا', color: 'text-orange-500' };
    }
  };
  
  // دریافت داده‌های آخرین اندازه‌گیری
  const latestMeasurement = measurements.length > 0 
    ? measurements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : null;
  
  // دریافت داده‌های اندازه‌گیری قبلی
  const previousMeasurement = measurements.length > 1 
    ? measurements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[1]
    : null;
  
  // ذخیره اندازه‌گیری جدید
  const handleSaveNewMeasurement = () => {
    if (!newMeasurement.weight) {
      toast({
        title: 'مقدار وزن الزامی است',
        description: 'لطفاً وزن خود را وارد کنید',
        variant: 'destructive',
      });
      return;
    }
    
    // محاسبه BMI
    const bmi = calculateBMI(newMeasurement.weight, profile.height);
    
    const newRecord: BodyMeasurement = {
      ...newMeasurement,
      id: Date.now(),
      bmi
    };
    
    setMeasurements([newRecord, ...measurements]);
    
    setNewMeasurement({
      date: today,
      weight: 0,
      bodyFatPercentage: undefined,
      musclePercentage: undefined,
      waterPercentage: undefined,
      visceralFat: undefined,
      waistCircumference: undefined,
      hipCircumference: undefined,
      chestCircumference: undefined,
      neckCircumference: undefined,
      armCircumference: undefined,
      thighCircumference: undefined,
      notes: ''
    });
    
    toast({
      title: 'داده‌های جدید ذخیره شدند',
      description: 'اطلاعات ترکیب بدنی جدید شما با موفقیت ثبت شد',
    });
  };
  
  // آپدیت اندازه‌گیری موجود
  const handleUpdateMeasurement = () => {
    if (!editingMeasurement) return;
    
    // محاسبه BMI
    const bmi = calculateBMI(editingMeasurement.weight, profile.height);
    
    const updatedMeasurement: BodyMeasurement = {
      ...editingMeasurement,
      bmi
    };
    
    setMeasurements(measurements.map(m => 
      m.id === updatedMeasurement.id ? updatedMeasurement : m
    ));
    
    setEditMode(false);
    setEditingMeasurement(null);
    
    toast({
      title: 'داده‌ها به‌روزرسانی شدند',
      description: 'اطلاعات ترکیب بدنی شما با موفقیت به‌روز شد',
    });
  };
  
  // حذف اندازه‌گیری
  const handleDeleteMeasurement = (id: number) => {
    setMeasurements(measurements.filter(m => m.id !== id));
    
    toast({
      title: 'رکورد حذف شد',
      description: 'داده مورد نظر با موفقیت حذف شد',
    });
  };
  
  // شروع ویرایش
  const startEditing = (measurement: BodyMeasurement) => {
    setEditingMeasurement(measurement);
    setEditMode(true);
  };
  
  // توقف ویرایش
  const cancelEditing = () => {
    setEditingMeasurement(null);
    setEditMode(false);
  };
  
  // انتخاب مورد برای مقایسه
  const toggleSelectMeasurement = (id: number) => {
    if (selectedMeasurements.includes(id)) {
      setSelectedMeasurements(selectedMeasurements.filter(m => m !== id));
    } else {
      if (selectedMeasurements.length < 2) {
        setSelectedMeasurements([...selectedMeasurements, id]);
      } else {
        toast({
          title: 'محدودیت انتخاب',
          description: 'حداکثر دو مورد برای مقایسه می‌توانید انتخاب کنید',
          variant: 'destructive',
        });
      }
    }
  };
  
  // مرتب کردن اندازه‌گیری‌ها
  const sortedMeasurements = [...measurements].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });
  
  // انتخاب داده‌های مقایسه
  const comparisonData = selectedMeasurements.map(id => 
    measurements.find(m => m.id === id)
  ).filter((m): m is BodyMeasurement => m !== undefined);
  
  return (
    <div className="space-y-6">
      {/* بخش خلاصه وضعیت */}
      <Card className="bg-card/50 backdrop-blur-sm border">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" /> 
            وضعیت ترکیب بدنی
          </CardTitle>
          <CardDescription>
            خلاصه آخرین وضعیت ترکیب بدن و تغییرات نسبت به اندازه‌گیری قبلی
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {latestMeasurement ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* وزن */}
                <div className="bg-card rounded-lg border p-4 flex flex-col items-center justify-center text-center">
                  <Scale className="h-6 w-6 text-blue-500 mb-2" />
                  <div className="text-2xl font-bold">{toPersianDigits(latestMeasurement.weight)} <span className="text-sm font-normal text-muted-foreground">کیلوگرم</span></div>
                  <div className="text-sm text-muted-foreground">وزن</div>
                  {previousMeasurement && (
                    <div className={`text-xs mt-1 ${
                      latestMeasurement.weight < previousMeasurement.weight ? 'text-green-500' : 
                      latestMeasurement.weight > previousMeasurement.weight ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {toPersianDigits(calculateChange(latestMeasurement.weight, previousMeasurement.weight))} کیلوگرم
                    </div>
                  )}
                </div>
                
                {/* BMI */}
                <div className="bg-card rounded-lg border p-4 flex flex-col items-center justify-center text-center">
                  <Activity className="h-6 w-6 text-green-500 mb-2" />
                  <div className="text-2xl font-bold">
                    {latestMeasurement.bmi ? toPersianDigits(latestMeasurement.bmi) : '-'}
                  </div>
                  <div className="text-sm text-muted-foreground">BMI</div>
                  {latestMeasurement.bmi && (
                    <div className={`text-xs mt-1 ${interpretBMI(latestMeasurement.bmi).color}`}>
                      {interpretBMI(latestMeasurement.bmi).status}
                    </div>
                  )}
                </div>
                
                {/* درصد چربی */}
                <div className="bg-card rounded-lg border p-4 flex flex-col items-center justify-center text-center">
                  <Droplet className="h-6 w-6 text-yellow-500 mb-2" />
                  <div className="text-2xl font-bold">
                    {latestMeasurement.bodyFatPercentage ? toPersianDigits(latestMeasurement.bodyFatPercentage) : '-'}<span className="text-sm font-normal text-muted-foreground">%</span>
                  </div>
                  <div className="text-sm text-muted-foreground">درصد چربی</div>
                  {latestMeasurement.bodyFatPercentage && previousMeasurement?.bodyFatPercentage && (
                    <div className={`text-xs mt-1 ${
                      latestMeasurement.bodyFatPercentage < previousMeasurement.bodyFatPercentage ? 'text-green-500' : 
                      latestMeasurement.bodyFatPercentage > previousMeasurement.bodyFatPercentage ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {toPersianDigits(calculateChange(latestMeasurement.bodyFatPercentage, previousMeasurement.bodyFatPercentage))}%
                    </div>
                  )}
                </div>
                
                {/* درصد عضله */}
                <div className="bg-card rounded-lg border p-4 flex flex-col items-center justify-center text-center">
                  <BodyDumbbell className="h-6 w-6 text-purple-500 mb-2" />
                  <div className="text-2xl font-bold">
                    {latestMeasurement.musclePercentage ? toPersianDigits(latestMeasurement.musclePercentage) : '-'}<span className="text-sm font-normal text-muted-foreground">%</span>
                  </div>
                  <div className="text-sm text-muted-foreground">درصد عضله</div>
                  {latestMeasurement.musclePercentage && previousMeasurement?.musclePercentage && (
                    <div className={`text-xs mt-1 ${
                      latestMeasurement.musclePercentage > previousMeasurement.musclePercentage ? 'text-green-500' : 
                      latestMeasurement.musclePercentage < previousMeasurement.musclePercentage ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {toPersianDigits(calculateChange(latestMeasurement.musclePercentage, previousMeasurement.musclePercentage))}%
                    </div>
                  )}
                </div>
              </div>
              
              {/* ردیف دوم معیارها */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* دور کمر */}
                <div className="bg-card/50 rounded-lg border p-3 flex items-center gap-3">
                  <div className="shrink-0">
                    <BodyTape className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">دور کمر</div>
                    <div className="text-lg">
                      {latestMeasurement.waistCircumference 
                        ? toPersianDigits(latestMeasurement.waistCircumference) + ' سانتی‌متر'
                        : '-'}
                    </div>
                  </div>
                </div>
                
                {/* چربی احشایی */}
                <div className="bg-card/50 rounded-lg border p-3 flex items-center gap-3">
                  <div className="shrink-0">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">چربی احشایی</div>
                    <div className="text-lg">
                      {latestMeasurement.visceralFat 
                        ? toPersianDigits(latestMeasurement.visceralFat)
                        : '-'}
                    </div>
                  </div>
                </div>
                
                {/* درصد آب */}
                <div className="bg-card/50 rounded-lg border p-3 flex items-center gap-3">
                  <div className="shrink-0">
                    <Droplet className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">درصد آب</div>
                    <div className="text-lg">
                      {latestMeasurement.waterPercentage 
                        ? toPersianDigits(latestMeasurement.waterPercentage) + '%'
                        : '-'}
                    </div>
                  </div>
                </div>
                
                {/* نسبت دور کمر به باسن */}
                <div className="bg-card/50 rounded-lg border p-3 flex items-center gap-3">
                  <div className="shrink-0">
                    <BodyRuler className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">نسبت WHR</div>
                    <div className="text-lg">
                      {calculateWHR(latestMeasurement.waistCircumference, latestMeasurement.hipCircumference) 
                        ? toPersianDigits(calculateWHR(latestMeasurement.waistCircumference, latestMeasurement.hipCircumference) || 0)
                        : '-'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground text-center">
                آخرین اندازه‌گیری: {formatDate(latestMeasurement.date)}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-muted-foreground mb-4">هنوز داده‌ای ثبت نشده است</div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    ثبت اولین اندازه‌گیری
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <NewMeasurementForm 
                    newMeasurement={newMeasurement} 
                    setNewMeasurement={setNewMeasurement}
                    onSave={handleSaveNewMeasurement}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* بخش نمودارها و گراف‌ها */}
      {measurements.length > 0 && (
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="history">تاریخچه</TabsTrigger>
            <TabsTrigger value="compare" onClick={() => setCompareMode(true)}>مقایسه</TabsTrigger>
            <TabsTrigger value="addNew">افزودن داده جدید</TabsTrigger>
          </TabsList>
          
          {/* تب تاریخچه */}
          <TabsContent value="history" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">تاریخچه اندازه‌گیری‌ها</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                >
                  {sortOrder === 'desc' ? (
                    <ArrowLeft className="h-4 w-4 ml-2" />
                  ) : (
                    <ArrowRight className="h-4 w-4 ml-2" />
                  )}
                  {sortOrder === 'desc' ? 'جدیدترین' : 'قدیمی‌ترین'}
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md">
              <div className="bg-muted/50 p-3 grid grid-cols-6 gap-2 text-sm font-medium">
                <div>تاریخ</div>
                <div>وزن (kg)</div>
                <div>BMI</div>
                <div>چربی (%)</div>
                <div>عضله (%)</div>
                <div>عملیات</div>
              </div>
              
              <ScrollArea className={measurements.length > 5 ? "h-[350px]" : ""}>
                {sortedMeasurements.map((measurement) => (
                  <div key={measurement.id} className="border-t p-3 grid grid-cols-6 gap-2 hover:bg-muted/20">
                    <div className="text-sm">{formatDate(measurement.date)}</div>
                    <div className="font-medium">{toPersianDigits(measurement.weight)}</div>
                    <div>{measurement.bmi ? toPersianDigits(measurement.bmi) : '-'}</div>
                    <div>{measurement.bodyFatPercentage ? toPersianDigits(measurement.bodyFatPercentage) : '-'}</div>
                    <div>{measurement.musclePercentage ? toPersianDigits(measurement.musclePercentage) : '-'}</div>
                    <div className="flex space-x-1 space-x-reverse">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => startEditing(measurement)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>حذف اندازه‌گیری</DialogTitle>
                            <DialogDescription>
                              آیا از حذف این داده اطمینان دارید؟ این عمل قابل بازگشت نیست.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button 
                              variant="destructive"
                              onClick={() => handleDeleteMeasurement(measurement.id)}
                            >
                              حذف
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </TabsContent>
          
          {/* تب مقایسه */}
          <TabsContent value="compare" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">مقایسه اندازه‌گیری‌ها</h3>
              <div className="text-sm text-muted-foreground">
                {selectedMeasurements.length} از 2 مورد انتخاب شده
              </div>
            </div>
            
            {selectedMeasurements.length < 2 ? (
              <div className="border rounded-md divide-y">
                <div className="bg-muted/50 p-3 grid grid-cols-7 gap-2 text-sm font-medium">
                  <div>انتخاب</div>
                  <div>تاریخ</div>
                  <div>وزن (kg)</div>
                  <div>BMI</div>
                  <div>چربی (%)</div>
                  <div>عضله (%)</div>
                  <div>آب (%)</div>
                </div>
                
                <ScrollArea className={measurements.length > 5 ? "h-[350px]" : ""}>
                  {sortedMeasurements.map((measurement) => (
                    <div 
                      key={measurement.id} 
                      className={`p-3 grid grid-cols-7 gap-2 hover:bg-muted/20 ${
                        selectedMeasurements.includes(measurement.id) ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div>
                        <input 
                          type="checkbox" 
                          checked={selectedMeasurements.includes(measurement.id)}
                          onChange={() => toggleSelectMeasurement(measurement.id)}
                          className="h-4 w-4"
                        />
                      </div>
                      <div className="text-sm">{formatDate(measurement.date)}</div>
                      <div className="font-medium">{toPersianDigits(measurement.weight)}</div>
                      <div>{measurement.bmi ? toPersianDigits(measurement.bmi) : '-'}</div>
                      <div>{measurement.bodyFatPercentage ? toPersianDigits(measurement.bodyFatPercentage) : '-'}</div>
                      <div>{measurement.musclePercentage ? toPersianDigits(measurement.musclePercentage) : '-'}</div>
                      <div>{measurement.waterPercentage ? toPersianDigits(measurement.waterPercentage) : '-'}</div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">مقایسه داده‌ها</CardTitle>
                    <CardDescription>
                      {`${formatDate(comparisonData[0].date)} و ${formatDate(comparisonData[1].date)}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* وزن */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">وزن (کیلوگرم)</span>
                          <span className="flex gap-4">
                            <span className="text-blue-500">{toPersianDigits(comparisonData[0].weight)}</span>
                            <span className="text-purple-500">{toPersianDigits(comparisonData[1].weight)}</span>
                          </span>
                        </div>
                        <div className="rounded-full h-4 bg-muted overflow-hidden flex">
                          <div 
                            className="bg-blue-500 h-full"
                            style={{ width: `${(comparisonData[0].weight / (comparisonData[0].weight + comparisonData[1].weight)) * 100}%` }}
                          />
                          <div 
                            className="bg-purple-500 h-full"
                            style={{ width: `${(comparisonData[1].weight / (comparisonData[0].weight + comparisonData[1].weight)) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground text-center">
                          تغییر: {toPersianDigits(Math.abs(comparisonData[0].weight - comparisonData[1].weight).toFixed(1))} کیلوگرم
                          {comparisonData[0].weight !== comparisonData[1].weight && (
                            <span className={comparisonData[0].weight < comparisonData[1].weight ? ' text-green-500' : ' text-red-500'}>
                              {comparisonData[0].weight < comparisonData[1].weight ? ' (کاهش)' : ' (افزایش)'}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* درصد چربی */}
                      {comparisonData[0].bodyFatPercentage !== undefined && comparisonData[1].bodyFatPercentage !== undefined && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">درصد چربی</span>
                            <span className="flex gap-4">
                              <span className="text-blue-500">{toPersianDigits(comparisonData[0].bodyFatPercentage || 0)}%</span>
                              <span className="text-purple-500">{toPersianDigits(comparisonData[1].bodyFatPercentage || 0)}%</span>
                            </span>
                          </div>
                          <div className="rounded-full h-4 bg-muted overflow-hidden flex">
                            <div 
                              className="bg-blue-500 h-full"
                              style={{ width: `${(comparisonData[0].bodyFatPercentage || 0) / ((comparisonData[0].bodyFatPercentage || 0) + (comparisonData[1].bodyFatPercentage || 0)) * 100}%` }}
                            />
                            <div 
                              className="bg-purple-500 h-full"
                              style={{ width: `${(comparisonData[1].bodyFatPercentage || 0) / ((comparisonData[0].bodyFatPercentage || 0) + (comparisonData[1].bodyFatPercentage || 0)) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground text-center">
                            تغییر: {toPersianDigits(Math.abs((comparisonData[0].bodyFatPercentage || 0) - (comparisonData[1].bodyFatPercentage || 0)).toFixed(1))}%
                            {comparisonData[0].bodyFatPercentage !== comparisonData[1].bodyFatPercentage && (
                              <span className={comparisonData[0].bodyFatPercentage < comparisonData[1].bodyFatPercentage ? ' text-green-500' : ' text-red-500'}>
                                {comparisonData[0].bodyFatPercentage < comparisonData[1].bodyFatPercentage ? ' (کاهش)' : ' (افزایش)'}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* درصد عضله */}
                      {comparisonData[0].musclePercentage !== undefined && comparisonData[1].musclePercentage !== undefined && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">درصد عضله</span>
                            <span className="flex gap-4">
                              <span className="text-blue-500">{toPersianDigits(comparisonData[0].musclePercentage || 0)}%</span>
                              <span className="text-purple-500">{toPersianDigits(comparisonData[1].musclePercentage || 0)}%</span>
                            </span>
                          </div>
                          <div className="rounded-full h-4 bg-muted overflow-hidden flex">
                            <div 
                              className="bg-blue-500 h-full"
                              style={{ width: `${(comparisonData[0].musclePercentage || 0) / ((comparisonData[0].musclePercentage || 0) + (comparisonData[1].musclePercentage || 0)) * 100}%` }}
                            />
                            <div 
                              className="bg-purple-500 h-full"
                              style={{ width: `${(comparisonData[1].musclePercentage || 0) / ((comparisonData[0].musclePercentage || 0) + (comparisonData[1].musclePercentage || 0)) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground text-center">
                            تغییر: {toPersianDigits(Math.abs((comparisonData[0].musclePercentage || 0) - (comparisonData[1].musclePercentage || 0)).toFixed(1))}%
                            {comparisonData[0].musclePercentage !== comparisonData[1].musclePercentage && (
                              <span className={comparisonData[0].musclePercentage > comparisonData[1].musclePercentage ? ' text-green-500' : ' text-red-500'}>
                                {comparisonData[0].musclePercentage > comparisonData[1].musclePercentage ? ' (افزایش)' : ' (کاهش)'}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedMeasurements([])}>
                    پاک کردن انتخاب‌ها
                  </Button>
                  <div className="flex gap-2">
                    <div className="bg-blue-500 w-4 h-4 rounded-full self-center"></div>
                    <div className="text-sm">{formatDate(comparisonData[0].date)}</div>
                    <div className="bg-purple-500 w-4 h-4 rounded-full self-center mr-2"></div>
                    <div className="text-sm">{formatDate(comparisonData[1].date)}</div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* تب افزودن داده جدید */}
          <TabsContent value="addNew" className="space-y-4">
            <h3 className="text-lg font-medium">ثبت اندازه‌گیری جدید</h3>
            
            <NewMeasurementForm 
              newMeasurement={newMeasurement} 
              setNewMeasurement={setNewMeasurement}
              onSave={handleSaveNewMeasurement}
            />
          </TabsContent>
        </Tabs>
      )}
      
      {/* دیالوگ ویرایش */}
      {editMode && editingMeasurement && (
        <Dialog open={editMode} onOpenChange={cancelEditing}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>ویرایش داده‌های ترکیب بدنی</DialogTitle>
              <DialogDescription>
                ویرایش اندازه‌گیری {formatDate(editingMeasurement.date)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="edit-date">تاریخ</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={editingMeasurement.date}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      date: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="edit-weight">وزن (کیلوگرم)</Label>
                  <Input
                    id="edit-weight"
                    type="number"
                    step="0.1"
                    value={editingMeasurement.weight || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      weight: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="edit-bodyFat">درصد چربی</Label>
                  <Input
                    id="edit-bodyFat"
                    type="number"
                    step="0.1"
                    value={editingMeasurement.bodyFatPercentage || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      bodyFatPercentage: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="edit-muscle">درصد عضله</Label>
                  <Input
                    id="edit-muscle"
                    type="number"
                    step="0.1"
                    value={editingMeasurement.musclePercentage || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      musclePercentage: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="edit-water">درصد آب</Label>
                  <Input
                    id="edit-water"
                    type="number"
                    step="0.1"
                    value={editingMeasurement.waterPercentage || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      waterPercentage: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="edit-visceralFat">چربی احشایی</Label>
                  <Input
                    id="edit-visceralFat"
                    type="number"
                    step="1"
                    value={editingMeasurement.visceralFat || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      visceralFat: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="edit-waist">دور کمر (سانتی‌متر)</Label>
                  <Input
                    id="edit-waist"
                    type="number"
                    step="0.5"
                    value={editingMeasurement.waistCircumference || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      waistCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="edit-hip">دور باسن (سانتی‌متر)</Label>
                  <Input
                    id="edit-hip"
                    type="number"
                    step="0.5"
                    value={editingMeasurement.hipCircumference || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      hipCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="edit-chest">دور سینه (سانتی‌متر)</Label>
                  <Input
                    id="edit-chest"
                    type="number"
                    step="0.5"
                    value={editingMeasurement.chestCircumference || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      chestCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="edit-neck">دور گردن (سانتی‌متر)</Label>
                  <Input
                    id="edit-neck"
                    type="number"
                    step="0.5"
                    value={editingMeasurement.neckCircumference || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      neckCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="edit-arm">دور بازو (سانتی‌متر)</Label>
                  <Input
                    id="edit-arm"
                    type="number"
                    step="0.5"
                    value={editingMeasurement.armCircumference || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      armCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="edit-thigh">دور ران (سانتی‌متر)</Label>
                  <Input
                    id="edit-thigh"
                    type="number"
                    step="0.5"
                    value={editingMeasurement.thighCircumference || ''}
                    onChange={(e) => setEditingMeasurement({
                      ...editingMeasurement,
                      thighCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="edit-notes">یادداشت</Label>
                <Textarea
                  id="edit-notes"
                  value={editingMeasurement.notes || ''}
                  onChange={(e) => setEditingMeasurement({
                    ...editingMeasurement,
                    notes: e.target.value
                  })}
                  rows={3}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={cancelEditing}>انصراف</Button>
              <Button 
                type="submit"
                onClick={handleUpdateMeasurement}
                disabled={!editingMeasurement.weight}
              >
                <Save className="h-4 w-4 mr-2" />
                ذخیره تغییرات
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// کامپوننت فرم اندازه‌گیری جدید
function NewMeasurementForm({
  newMeasurement,
  setNewMeasurement,
  onSave
}: {
  newMeasurement: Omit<BodyMeasurement, 'id'>;
  setNewMeasurement: React.Dispatch<React.SetStateAction<Omit<BodyMeasurement, 'id'>>>;
  onSave: () => void;
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label htmlFor="new-date">تاریخ</Label>
          <Input
            id="new-date"
            type="date"
            value={newMeasurement.date}
            onChange={(e) => setNewMeasurement({
              ...newMeasurement,
              date: e.target.value
            })}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="new-weight">وزن (کیلوگرم) *</Label>
          <Input
            id="new-weight"
            type="number"
            step="0.1"
            value={newMeasurement.weight || ''}
            onChange={(e) => setNewMeasurement({
              ...newMeasurement,
              weight: parseFloat(e.target.value) || 0
            })}
            required
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="new-bodyFat">درصد چربی</Label>
          <Input
            id="new-bodyFat"
            type="number"
            step="0.1"
            value={newMeasurement.bodyFatPercentage || ''}
            onChange={(e) => setNewMeasurement({
              ...newMeasurement,
              bodyFatPercentage: e.target.value ? parseFloat(e.target.value) : undefined
            })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label htmlFor="new-muscle">درصد عضله</Label>
          <Input
            id="new-muscle"
            type="number"
            step="0.1"
            value={newMeasurement.musclePercentage || ''}
            onChange={(e) => setNewMeasurement({
              ...newMeasurement,
              musclePercentage: e.target.value ? parseFloat(e.target.value) : undefined
            })}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="new-water">درصد آب</Label>
          <Input
            id="new-water"
            type="number"
            step="0.1"
            value={newMeasurement.waterPercentage || ''}
            onChange={(e) => setNewMeasurement({
              ...newMeasurement,
              waterPercentage: e.target.value ? parseFloat(e.target.value) : undefined
            })}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="new-visceralFat">چربی احشایی</Label>
          <Input
            id="new-visceralFat"
            type="number"
            step="1"
            value={newMeasurement.visceralFat || ''}
            onChange={(e) => setNewMeasurement({
              ...newMeasurement,
              visceralFat: e.target.value ? parseFloat(e.target.value) : undefined
            })}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 space-x-reverse">
        <Switch
          id="show-advanced"
          checked={showAdvanced}
          onCheckedChange={setShowAdvanced}
        />
        <Label htmlFor="show-advanced">نمایش فیلدهای پیشرفته</Label>
      </div>
      
      {showAdvanced && (
        <>
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="new-waist">دور کمر (سانتی‌متر)</Label>
              <Input
                id="new-waist"
                type="number"
                step="0.5"
                value={newMeasurement.waistCircumference || ''}
                onChange={(e) => setNewMeasurement({
                  ...newMeasurement,
                  waistCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                })}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="new-hip">دور باسن (سانتی‌متر)</Label>
              <Input
                id="new-hip"
                type="number"
                step="0.5"
                value={newMeasurement.hipCircumference || ''}
                onChange={(e) => setNewMeasurement({
                  ...newMeasurement,
                  hipCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                })}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="new-chest">دور سینه (سانتی‌متر)</Label>
              <Input
                id="new-chest"
                type="number"
                step="0.5"
                value={newMeasurement.chestCircumference || ''}
                onChange={(e) => setNewMeasurement({
                  ...newMeasurement,
                  chestCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label htmlFor="new-neck">دور گردن (سانتی‌متر)</Label>
              <Input
                id="new-neck"
                type="number"
                step="0.5"
                value={newMeasurement.neckCircumference || ''}
                onChange={(e) => setNewMeasurement({
                  ...newMeasurement,
                  neckCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                })}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="new-arm">دور بازو (سانتی‌متر)</Label>
              <Input
                id="new-arm"
                type="number"
                step="0.5"
                value={newMeasurement.armCircumference || ''}
                onChange={(e) => setNewMeasurement({
                  ...newMeasurement,
                  armCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                })}
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="new-thigh">دور ران (سانتی‌متر)</Label>
              <Input
                id="new-thigh"
                type="number"
                step="0.5"
                value={newMeasurement.thighCircumference || ''}
                onChange={(e) => setNewMeasurement({
                  ...newMeasurement,
                  thighCircumference: e.target.value ? parseFloat(e.target.value) : undefined
                })}
              />
            </div>
          </div>
        </>
      )}
      
      <div className="space-y-1">
        <Label htmlFor="new-notes">یادداشت</Label>
        <Textarea
          id="new-notes"
          value={newMeasurement.notes}
          onChange={(e) => setNewMeasurement({
            ...newMeasurement,
            notes: e.target.value
          })}
          placeholder="توضیحات یا یادداشت اضافی..."
          rows={2}
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit"
          onClick={onSave}
          disabled={!newMeasurement.weight}
        >
          <Plus className="h-4 w-4 mr-2" />
          ذخیره اطلاعات
        </Button>
      </div>
    </div>
  );
}

// آیکون‌های اضافی
const Droplet = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
  </svg>
);

// آیکون‌های دیگر
const BodyDumbbell = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6.5 6.5 11 11" />
    <path d="m21 21-1-1" />
    <path d="m3 3 1 1" />
    <path d="m18 22 4-4" />
    <path d="m2 6 4-4" />
    <path d="m3 10 7-7" />
    <path d="m14 21 7-7" />
  </svg>
);

const BodyTape = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="16" height="4" x="2" y="6" rx="2" />
    <rect width="16" height="4" x="2" y="14" rx="2" />
    <path d="M22 6h-4" />
    <path d="M22 14h-4" />
    <path d="M6 10v4" />
    <path d="M14 10v4" />
  </svg>
);

const BodyRuler = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21.3 15.7a2.4 2.4 0 0 1 0 3.4l-2.2 2.2a2.4 2.4 0 0 1-3.4 0L2.3 7.9a2.4 2.4 0 0 1 0-3.4l2.2-2.2a2.4 2.4 0 0 1 3.4 0Z" />
    <path d="m14.5 12.5 2-2" />
    <path d="m11.5 9.5 2-2" />
    <path d="m8.5 6.5 2-2" />
    <path d="m17.5 15.5 2-2" />
  </svg>
);