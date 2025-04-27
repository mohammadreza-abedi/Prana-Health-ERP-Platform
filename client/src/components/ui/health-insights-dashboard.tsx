import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useHealthAnalytics, HealthMetric } from '@/hooks/use-health-analytics';
import { useToast } from '@/hooks/use-toast';
import { toPersianDigits } from '@/lib/utils';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Activity, Brain, Calendar, Clock, Dumbbell, Heart, LineChart as LineChartIcon, BarChart3, ArrowRight, ArrowLeft, Droplets, Utensils, Bath, Zap, Target, Medal, Award, Trophy, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InsightCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress?: number;
  change?: {
    value: number;
    positive: boolean;
  };
}

const InsightCard = ({ title, value, description, icon, color, progress, change }: InsightCardProps) => (
  <Card className="bg-card/50 backdrop-blur-sm border">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-md ${color}`}>
          {icon}
        </div>
        {change && (
          <span className={`text-xs font-medium ${change.positive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {change.positive ? '↑' : '↓'} {Math.abs(change.value)}%
          </span>
        )}
      </div>
      <CardTitle className="text-xl mt-2">{value}</CardTitle>
      <CardDescription>{title}</CardDescription>
    </CardHeader>
    <CardContent>
      {progress !== undefined && (
        <Progress value={progress} className="h-2" />
      )}
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </CardContent>
  </Card>
);

export function HealthInsightsDashboard() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<[string, string]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    new Date().toISOString().split('T')[0]
  ]);
  const [userId, setUserId] = useState<number>(1); // باید از context کاربر گرفته شود
  const [timeFrame, setTimeFrame] = useState<'week' | 'month' | 'year'>('month');
  
  const { 
    analyticsData, 
    healthMetrics, 
    isLoading, 
    error, 
    recordHealthMetric,
    predictHealthTrend
  } = useHealthAnalytics(userId, dateRange);

  const [sleepQualityScore, setSleepQualityScore] = useState(0);
  const [stressManagementScore, setStressManagementScore] = useState(0);
  const [nutritionScore, setNutritionScore] = useState(0);
  const [activityScore, setActivityScore] = useState(0);
  const [overallHealthScore, setOverallHealthScore] = useState(0);
  const [healthRecommendation, setHealthRecommendation] = useState('');

  const [healthInsights, setHealthInsights] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  // خلاصه آخرین داده‌های سلامتی
  useEffect(() => {
    if (healthMetrics && healthMetrics.length > 0) {
      const latestMetric = healthMetrics[healthMetrics.length - 1];
      
      // محاسبه امتیازهای سلامتی
      const sleepScore = Math.min(100, (latestMetric.sleepHours / 8) * 100);
      const stressScore = Math.max(0, 100 - (latestMetric.stressLevel / 10) * 100);
      const nutScore = latestMetric.nutritionScore;
      const actScore = Math.min(100, (latestMetric.activityMinutes / 60) * 100);
      
      setSleepQualityScore(sleepScore);
      setStressManagementScore(stressScore);
      setNutritionScore(nutScore);
      setActivityScore(actScore);
      
      // امتیاز کلی سلامت
      const overall = (sleepScore * 0.3) + (stressScore * 0.2) + (nutScore * 0.25) + (actScore * 0.25);
      setOverallHealthScore(overall);

      // تولید توصیه‌های سلامتی
      generateHealthInsights(healthMetrics);
      
      // پیش‌بینی روند سلامتی
      const prediction = predictHealthTrend();
      if (prediction) {
        setHealthRecommendation(prediction.recommendation);
      }
    }
  }, [healthMetrics]);

  // تولید توصیه‌های سلامتی بر اساس داده‌ها
  const generateHealthInsights = (metrics: HealthMetric[]) => {
    if (!metrics || metrics.length < 3) return;
    
    const latest = metrics[metrics.length - 1];
    const insights = [];
    
    // توصیه‌های خواب
    if (latest.sleepHours < 7) {
      insights.push({
        title: "کمبود خواب",
        description: "خواب شما کمتر از میزان توصیه شده (۷-۸ ساعت) است. سعی کنید زمان خواب منظمی داشته باشید.",
        priority: "high",
        icon: <Clock className="h-5 w-5" />
      });
    }
    
    // توصیه‌های فعالیت بدنی
    if (latest.activityMinutes < 30) {
      insights.push({
        title: "کم‌تحرکی",
        description: "فعالیت بدنی شما کمتر از ۳۰ دقیقه در روز است. حداقل ۳۰ دقیقه فعالیت متوسط روزانه را هدف قرار دهید.",
        priority: "medium",
        icon: <Dumbbell className="h-5 w-5" />
      });
    }
    
    // توصیه‌های آب‌رسانی
    if (latest.hydrationMl < 2000) {
      insights.push({
        title: "کم‌آبی بدن",
        description: "میزان آب مصرفی شما کمتر از ۲ لیتر در روز است. نوشیدن حداقل ۸ لیوان آب روزانه را به خاطر داشته باشید.",
        priority: "medium",
        icon: <Droplets className="h-5 w-5" />
      });
    }
    
    // توصیه‌های استرس
    if (latest.stressLevel > 7) {
      insights.push({
        title: "سطح استرس بالا",
        description: "سطح استرس شما بالاست. تکنیک‌های مدیریت استرس مانند مدیتیشن یا تنفس عمیق را امتحان کنید.",
        priority: "high",
        icon: <Brain className="h-5 w-5" />
      });
    }

    // توصیه‌های تغذیه
    if (latest.nutritionScore < 60) {
      insights.push({
        title: "تغذیه نامناسب",
        description: "امتیاز تغذیه شما پایین است. مصرف میوه و سبزیجات بیشتر و کاهش غذاهای فرآوری شده توصیه می‌شود.",
        priority: "medium",
        icon: <Utensils className="h-5 w-5" />
      });
    }
    
    setHealthInsights(insights);
  };

  // داده‌های نمودار رادار برای بررسی وضعیت کلی سلامت
  const radarData = [
    {
      subject: 'خواب',
      A: sleepQualityScore,
      fullMark: 100,
    },
    {
      subject: 'استرس',
      A: stressManagementScore,
      fullMark: 100,
    },
    {
      subject: 'تغذیه',
      A: nutritionScore,
      fullMark: 100,
    },
    {
      subject: 'فعالیت',
      A: activityScore,
      fullMark: 100,
    },
    {
      subject: 'آب‌رسانی',
      A: healthMetrics?.length ? (healthMetrics[healthMetrics.length - 1].hydrationMl / 30) : 0,
      fullMark: 100,
    },
  ];

  // فیلتر بر اساس زمان
  const handleTimeFrameChange = (value: 'week' | 'month' | 'year') => {
    setTimeFrame(value);
    
    const endDate = new Date().toISOString().split('T')[0];
    let startDate;
    
    switch (value) {
      case 'week':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case 'month':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
      case 'year':
        startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        break;
    }
    
    setDateRange([startDate, endDate]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          داشبورد سلامت و تندرستی
        </h2>
        
        <Select value={timeFrame} onValueChange={(value: any) => handleTimeFrameChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="بازه زمانی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">هفته اخیر</SelectItem>
            <SelectItem value="month">ماه اخیر</SelectItem>
            <SelectItem value="year">سال اخیر</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card className="bg-destructive/10 border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              خطا در دریافت داده‌ها
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>متأسفانه امکان دریافت اطلاعات سلامتی وجود ندارد. لطفاً دوباره تلاش کنید.</p>
            <Button className="mt-4" variant="outline" onClick={() => window.location.reload()}>
              تلاش مجدد
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* کارت‌های وضعیت سلامتی */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InsightCard 
              title="امتیاز کلی سلامت" 
              value={`${toPersianDigits(Math.round(overallHealthScore))}/100`}
              description="وضعیت کلی سلامتی شما بر اساس معیارهای مختلف" 
              icon={<Heart className="h-5 w-5 text-white" />}
              color="bg-red-500/20"
              progress={overallHealthScore}
            />
            
            <InsightCard 
              title="قدم‌های روزانه" 
              value={toPersianDigits(healthMetrics?.length ? healthMetrics[healthMetrics.length - 1].stepCount : 0)}
              description="میانگین قدم‌های روزانه شما در بازه انتخابی" 
              icon={<Dumbbell className="h-5 w-5 text-white" />}
              color="bg-blue-500/20"
              change={healthMetrics?.length > 1 ? {
                value: Math.round(((healthMetrics[healthMetrics.length - 1].stepCount - healthMetrics[healthMetrics.length - 2].stepCount) / healthMetrics[healthMetrics.length - 2].stepCount) * 100),
                positive: healthMetrics[healthMetrics.length - 1].stepCount > healthMetrics[healthMetrics.length - 2].stepCount
              } : undefined}
            />
            
            <InsightCard 
              title="کیفیت خواب" 
              value={`${toPersianDigits(healthMetrics?.length ? healthMetrics[healthMetrics.length - 1].sleepHours : 0)} ساعت`}
              description="میانگین ساعات خواب شبانه شما" 
              icon={<Clock className="h-5 w-5 text-white" />}
              color="bg-indigo-500/20"
              progress={sleepQualityScore}
            />
            
            <InsightCard 
              title="مدیریت استرس" 
              value={`${toPersianDigits(Math.round(stressManagementScore))}/100`}
              description="میزان توانایی شما در مدیریت استرس" 
              icon={<Brain className="h-5 w-5 text-white" />}
              color="bg-purple-500/20"
              progress={stressManagementScore}
            />
          </div>
          
          {/* تب‌های داشبورد */}
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 lg:grid-cols-5 mb-4">
              <TabsTrigger value="overview">نمای کلی</TabsTrigger>
              <TabsTrigger value="activity">فعالیت بدنی</TabsTrigger>
              <TabsTrigger value="sleep">خواب</TabsTrigger>
              <TabsTrigger value="nutrition">تغذیه</TabsTrigger>
              <TabsTrigger value="recommendations">توصیه‌ها</TabsTrigger>
            </TabsList>
            
            {/* نمای کلی */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChartIcon className="h-5 w-5 text-primary" />
                      روند سلامتی
                    </CardTitle>
                    <CardDescription>نمایش روند شاخص‌های مختلف سلامتی در طول زمان</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData.dates.map((date, i) => ({
                          date,
                          sleep: analyticsData.sleepQuality[i],
                          steps: analyticsData.dailySteps[i] / 1000,
                          stress: 10 - analyticsData.stressLevel[i],
                          nutrition: analyticsData.nutritionScore[i] / 10
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="sleep" name="خواب (ساعت)" stroke="#8884d8" activeDot={{ r: 8 }} />
                          <Line type="monotone" dataKey="steps" name="قدم (هزار)" stroke="#82ca9d" />
                          <Line type="monotone" dataKey="stress" name="آرامش (از ۱۰)" stroke="#ff7300" />
                          <Line type="monotone" dataKey="nutrition" name="تغذیه (از ۱۰)" stroke="#0088fe" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      وضعیت کلی سلامت
                    </CardTitle>
                    <CardDescription>نمودار رادار وضعیت ابعاد مختلف سلامتی</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis />
                          <Radar name="وضعیت فعلی" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      {healthRecommendation}
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* توصیه‌های سلامتی */}
              {healthInsights.length > 0 && (
                <Card className="bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      توصیه‌های سلامتی
                    </CardTitle>
                    <CardDescription>پیشنهادهای شخصی‌سازی شده برای بهبود سلامتی</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {healthInsights.map((insight, index) => (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg border flex items-start gap-3 ${
                            insight.priority === 'high' ? 'border-red-500/50 bg-red-500/10' : 
                            insight.priority === 'medium' ? 'border-yellow-500/50 bg-yellow-500/10' : 
                            'border-blue-500/50 bg-blue-500/10'
                          }`}
                        >
                          <div className={`p-2 rounded-full ${
                            insight.priority === 'high' ? 'bg-red-500/20' : 
                            insight.priority === 'medium' ? 'bg-yellow-500/20' : 
                            'bg-blue-500/20'
                          }`}>
                            {insight.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{insight.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* فعالیت بدنی */}
            <TabsContent value="activity" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Dumbbell className="h-5 w-5 text-primary" /> 
                      قدم‌های روزانه
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-center my-4">
                      <ProgressRing
                        value={healthMetrics?.length ? (healthMetrics[healthMetrics.length - 1].stepCount / 10000) * 100 : 0}
                        size={120}
                        strokeWidth={8}
                        valueLabel={`${toPersianDigits(healthMetrics?.length ? healthMetrics[healthMetrics.length - 1].stepCount : 0)}`}
                        descriptionLabel="قدم"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      هدف روزانه: ۱۰,۰۰۰ قدم
                    </div>
                  </CardContent>
                </Card>
              
                <Card className="bg-card/50 backdrop-blur-sm border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" /> 
                      دقایق فعالیت
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-center my-4">
                      <ProgressRing
                        value={healthMetrics?.length ? (healthMetrics[healthMetrics.length - 1].activityMinutes / 60) * 100 : 0}
                        size={120}
                        strokeWidth={8}
                        valueLabel={`${toPersianDigits(healthMetrics?.length ? healthMetrics[healthMetrics.length - 1].activityMinutes : 0)}`}
                        descriptionLabel="دقیقه"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-center">
                      هدف روزانه: ۶۰ دقیقه فعالیت
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      روند فعالیت
                    </CardTitle>
                    <CardDescription>مقایسه روزانه قدم‌ها و دقایق فعالیت</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.dates.map((date, i) => ({
                          date,
                          steps: analyticsData.dailySteps[i] / 100,
                          activity: analyticsData.weeklyActivity[i]
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="steps" name="قدم (÷۱۰۰)" fill="#8884d8" />
                          <Bar dataKey="activity" name="فعالیت (دقیقه)" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* خواب */}
            <TabsContent value="sleep" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      کیفیت خواب
                    </CardTitle>
                    <CardDescription>وضعیت خواب شما در {timeFrame === 'week' ? 'هفته' : timeFrame === 'month' ? 'ماه' : 'سال'} اخیر</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center my-4">
                      <ProgressRing
                        value={sleepQualityScore}
                        size={150}
                        strokeWidth={10}
                        valueLabel={`${toPersianDigits(Math.round(sleepQualityScore))}`}
                        descriptionLabel="امتیاز"
                      />
                    </div>
                    <div className="text-sm text-center mt-6">
                      میانگین خواب روزانه: {toPersianDigits(healthMetrics?.length ? 
                        (healthMetrics.reduce((sum, m) => sum + m.sleepHours, 0) / healthMetrics.length).toFixed(1) : 0)} ساعت
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChartIcon className="h-5 w-5 text-primary" />
                      روند خواب
                    </CardTitle>
                    <CardDescription>ساعات خواب شما در طول زمان</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={analyticsData.dates.map((date, i) => ({
                          date,
                          sleep: analyticsData.sleepQuality[i]
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="date" />
                          <YAxis domain={[0, 10]} />
                          <Tooltip />
                          <Legend />
                          <defs>
                            <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="sleep" name="ساعات خواب" stroke="#8884d8" fillOpacity={1} fill="url(#sleepGradient)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* تغذیه */}
            <TabsContent value="nutrition" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary" />
                      امتیاز تغذیه
                    </CardTitle>
                    <CardDescription>کیفیت کلی تغذیه شما</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center my-4">
                      <ProgressRing
                        value={nutritionScore}
                        size={150}
                        strokeWidth={10}
                        valueLabel={`${toPersianDigits(Math.round(nutritionScore))}`}
                        descriptionLabel="امتیاز"
                      />
                    </div>
                    <div className="mt-6 space-y-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>میوه و سبزیجات</span>
                          <span className="text-green-500">خوب</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>پروتئین</span>
                          <span className="text-yellow-500">متوسط</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>آب</span>
                          <span className="text-red-500">ضعیف</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-primary" />
                      میزان آب مصرفی
                    </CardTitle>
                    <CardDescription>مقدار آب مصرف شده روزانه (میلی‌لیتر)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsData.dates.map((date, i) => ({
                          date,
                          hydration: analyticsData.hydrationLevel[i] * 1000
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <defs>
                            <linearGradient id="hydrationGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <Bar dataKey="hydration" name="آب (میلی‌لیتر)" fill="url(#hydrationGradient)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* توصیه‌ها */}
            <TabsContent value="recommendations" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      دستاوردهای سلامتی
                    </CardTitle>
                    <CardDescription>پیشرفت‌ها و موفقیت‌های شما در مسیر سلامتی</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-muted/30 rounded-lg p-4 flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-green-500/20 mb-3">
                          <Trophy className="h-6 w-6 text-green-500" />
                        </div>
                        <h3 className="font-medium">۷ روز پیاده‌روی متوالی</h3>
                        <p className="text-sm text-muted-foreground mt-2">بیش از ۸۰۰۰ قدم روزانه به مدت یک هفته</p>
                        <span className="text-xs mt-2 bg-green-500/20 text-green-700 dark:text-green-300 py-1 px-2 rounded">تکمیل شده</span>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4 flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-blue-500/20 mb-3">
                          <Award className="h-6 w-6 text-blue-500" />
                        </div>
                        <h3 className="font-medium">خواب منظم</h3>
                        <p className="text-sm text-muted-foreground mt-2">خواب ۷-۸ ساعته به مدت ۱۴ روز متوالی</p>
                        <div className="w-full mt-2">
                          <Progress value={65} className="h-2" />
                          <span className="text-xs text-muted-foreground">۹ روز از ۱۴ روز</span>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4 flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-purple-500/20 mb-3">
                          <Medal className="h-6 w-6 text-purple-500" />
                        </div>
                        <h3 className="font-medium">هیدراته ماندن</h3>
                        <p className="text-sm text-muted-foreground mt-2">نوشیدن حداقل ۲ لیتر آب روزانه به مدت ۳۰ روز</p>
                        <div className="w-full mt-2">
                          <Progress value={30} className="h-2" />
                          <span className="text-xs text-muted-foreground">۹ روز از ۳۰ روز</span>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4 flex flex-col items-center text-center">
                        <div className="p-3 rounded-full bg-orange-500/20 mb-3">
                          <Zap className="h-6 w-6 text-orange-500" />
                        </div>
                        <h3 className="font-medium">کاهش استرس</h3>
                        <p className="text-sm text-muted-foreground mt-2">حفظ سطح استرس زیر ۵ به مدت ۲۱ روز</p>
                        <div className="w-full mt-2">
                          <Progress value={15} className="h-2" />
                          <span className="text-xs text-muted-foreground">۳ روز از ۲۱ روز</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      اهداف سلامتی
                    </CardTitle>
                    <CardDescription>اهداف شخصی شما برای ارتقای سلامت</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-blue-500/20">
                            <Dumbbell className="h-4 w-4 text-blue-500" />
                          </div>
                          <span>تمرین روزانه</span>
                        </div>
                        <span className="text-sm text-muted-foreground">۳۰ دقیقه</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-green-500/20">
                            <Droplets className="h-4 w-4 text-green-500" />
                          </div>
                          <span>مصرف آب</span>
                        </div>
                        <span className="text-sm text-muted-foreground">۲ لیتر</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-purple-500/20">
                            <Clock className="h-4 w-4 text-purple-500" />
                          </div>
                          <span>خواب شبانه</span>
                        </div>
                        <span className="text-sm text-muted-foreground">۸ ساعت</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-orange-500/20">
                            <Brain className="h-4 w-4 text-orange-500" />
                          </div>
                          <span>مدیتیشن</span>
                        </div>
                        <span className="text-sm text-muted-foreground">۱۵ دقیقه</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bath className="h-5 w-5 text-primary" />
                      توصیه‌های سبک زندگی
                    </CardTitle>
                    <CardDescription>راهکارهای بهبود سلامتی با توجه به وضعیت شما</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          زمانبندی منظم خواب
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          سعی کنید هر شب رأس ساعت مشخصی بخوابید و صبح‌ها در زمان ثابتی بیدار شوید، حتی در تعطیلات.
                          این به تنظیم ساعت بیولوژیک بدن کمک می‌کند.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-primary" />
                          افزایش مصرف آب
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          یک بطری آب همراه خود داشته باشید و به طور منظم از آن بنوشید. 
                          می‌توانید یادآورهایی در طول روز تنظیم کنید تا نوشیدن آب را فراموش نکنید.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                          <Brain className="h-4 w-4 text-primary" />
                          تمرین‌های کاهش استرس
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          روزانه ۱۰-۱۵ دقیقه برای تمرین‌های تنفس عمیق یا مدیتیشن اختصاص دهید. 
                          این تمرین‌ها به کاهش سطح استرس و بهبود تمرکز کمک می‌کنند.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}