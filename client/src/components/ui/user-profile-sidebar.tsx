import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useCredits } from '@/hooks/use-credits';
import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  User,
  Settings,
  LogOut,
  Bell,
  Award,
  Star,
  Shield,
  Crown,
  Zap,
  BarChart3,
  Coins,
  Calendar,
  MessageSquare,
  Mail,
  HelpCircle,
  CheckCircle2,
  CheckCircle,
  CircleEllipsis,
  Clock
} from 'lucide-react';

// تعریف ساختار بج‌ها
interface UserBadge {
  id: number;
  userId: number;
  badgeId: number;
  earnedAt: string;
  badge: {
    id: number;
    title: string;
    description: string;
    icon: string;
  };
}

// تعریف اعلان‌ها
interface Notification {
  id: number;
  title: string;
  description: string;
  type: 'achievement' | 'challenge' | 'system' | 'message' | 'health';
  read: boolean;
  createdAt: string;
}

export function UserProfileSidebar() {
  const { user, logout } = useAuth();
  const { credits } = useCredits();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [status, setStatus] = useState<'online' | 'away' | 'busy' | 'offline'>('online');
  
  // دریافت بج‌های کاربر
  const { data: userBadges } = useQuery<UserBadge[]>({
    queryKey: ['/api/user-badges'],
    enabled: !!user,
  });
  
  // دریافت اعلان‌های کاربر
  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ['/api/notifications'],
    enabled: !!user,
  });
  
  // محاسبه تعداد اعلان‌های خوانده نشده
  useEffect(() => {
    if (notifications) {
      const unread = notifications.filter(n => !n.read).length;
      setUnreadCount(unread);
    }
  }, [notifications]);
  
  if (!user) return null;
  
  // محاسبه XP مورد نیاز برای سطح بعدی
  const xpForNextLevel = user.level * 100;
  const xpProgress = user.xp % xpForNextLevel;
  const xpPercent = (xpProgress / xpForNextLevel) * 100;
  
  // تبدیل تاریخ به فرمت فارسی
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // استفاده از Intl برای فرمت فارسی
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // نام کاربر یا نام نمایشی
  const displayName = user.displayName || user.username || 'کاربر پرانا';
  
  // دریافت آیکون متناسب با نوع اعلان
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'achievement':
        return <Award className="h-4 w-4 text-tiffany" />;
      case 'challenge':
        return <Zap className="h-4 w-4 text-amber-500" />;
      case 'system':
        return <Bell className="h-4 w-4 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case 'health':
        return <Shield className="h-4 w-4 text-red-500" />;
      default:
        return <CircleEllipsis className="h-4 w-4 text-slate-500" />;
    }
  };
  
  // نمایش وضعیت آنلاین
  const getStatusIcon = () => {
    switch (status) {
      case 'online':
        return <div className="h-3 w-3 rounded-full bg-green-500" />;
      case 'away':
        return <div className="h-3 w-3 rounded-full bg-amber-500" />;
      case 'busy':
        return <div className="h-3 w-3 rounded-full bg-red-500" />;
      case 'offline':
        return <div className="h-3 w-3 rounded-full bg-slate-400" />;
    }
  };
  
  const getStatusLabel = () => {
    switch (status) {
      case 'online':
        return 'آنلاین';
      case 'away':
        return 'دور از دسترس';
      case 'busy':
        return 'مشغول';
      case 'offline':
        return 'آفلاین';
    }
  };

  // محاسبه بج‌های اخیر
  const recentBadges = userBadges?.slice(0, 3) || [];
  
  // اعلان‌های نمونه برای آزمایش
  const sampleNotifications: Notification[] = [
    {
      id: 1,
      title: 'دستاورد جدید',
      description: 'تبریک! شما به دستاورد «قهرمان سلامت» دست یافتید.',
      type: 'achievement',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'پیام جدید',
      description: 'شما یک پیام جدید از مدیر منابع انسانی دارید.',
      type: 'message',
      read: true,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 3,
      title: 'چالش تکمیل شد',
      description: 'چالش «پیاده‌روی روزانه» با موفقیت به پایان رسید.',
      type: 'challenge',
      read: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 4,
      title: 'یادآوری سلامتی',
      description: 'زمان نوشیدن آب و استراحت چشم‌ها رسیده است.',
      type: 'health',
      read: true,
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: 5,
      title: 'بروزرسانی سیستم',
      description: 'ویژگی‌های جدید به پلتفرم اضافه شده است. مشاهده کنید.',
      type: 'system',
      read: false,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ];
  
  // استفاده از اعلان‌های دریافت شده یا نمونه
  const displayNotifications = notifications || sampleNotifications;

  return (
    <Card className="h-full overflow-hidden border-0 shadow-none">
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={displayName} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-tiffany to-sky-700 text-white">
                    {displayName[0]}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute -bottom-1 -left-1 rounded-full p-0.5 bg-white dark:bg-slate-900">
                <Popover>
                  <PopoverTrigger>
                    {getStatusIcon()}
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0" align="start">
                    <div className="p-2">
                      <div className="text-sm font-medium mb-2">تنظیم وضعیت</div>
                      <div className="space-y-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-sm"
                          onClick={() => setStatus('online')}
                        >
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />
                          آنلاین
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-sm"
                          onClick={() => setStatus('away')}
                        >
                          <div className="h-2.5 w-2.5 rounded-full bg-amber-500 mr-2" />
                          دور از دسترس
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-sm"
                          onClick={() => setStatus('busy')}
                        >
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />
                          مشغول
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-start text-sm"
                          onClick={() => setStatus('offline')}
                        >
                          <div className="h-2.5 w-2.5 rounded-full bg-slate-400 mr-2" />
                          آفلاین
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <div className="font-semibold">{displayName}</div>
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  {getStatusLabel()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Popover open={showNotifications} onOpenChange={setShowNotifications}>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[320px] p-0">
                      <div className="p-2 border-b">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">اعلان‌ها</h4>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">
                            علامت همه به عنوان خوانده شده
                          </Button>
                        </div>
                      </div>
                      <ScrollArea className="h-[300px]">
                        <div className="p-2 space-y-1">
                          {displayNotifications.length > 0 ? (
                            displayNotifications.map((notification) => (
                              <div 
                                key={notification.id} 
                                className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer ${!notification.read ? 'bg-tiffany/5' : ''}`}
                              >
                                <div className="flex gap-3">
                                  <div className={`mt-0.5 rounded-full p-1.5 ${
                                    notification.type === 'achievement' ? 'bg-tiffany/10 text-tiffany' :
                                    notification.type === 'challenge' ? 'bg-amber-500/10 text-amber-500' :
                                    notification.type === 'system' ? 'bg-blue-500/10 text-blue-500' :
                                    notification.type === 'message' ? 'bg-green-500/10 text-green-500' :
                                    'bg-red-500/10 text-red-500'
                                  }`}>
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <p className="text-sm font-medium">{notification.title}</p>
                                      {!notification.read && (
                                        <div className="h-2 w-2 rounded-full bg-tiffany mt-1.5" />
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                                      {notification.description}
                                    </p>
                                    <div className="flex items-center text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                                      <Clock className="h-3 w-3 mr-0.5" />
                                      {formatDate(notification.createdAt)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                              <Bell className="h-10 w-10 mx-auto mb-2 opacity-20" />
                              <p>هیچ اعلانی وجود ندارد</p>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                      <div className="p-2 border-t">
                        <Link href="/notifications">
                          <Button variant="ghost" size="sm" className="w-full text-xs">
                            مشاهده همه اعلان‌ها
                          </Button>
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent>
                  اعلان‌ها
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/profile?tab=settings">
                      <Settings className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  تنظیمات
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={logout}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  خروج
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-tiffany/10 p-3 flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-tiffany mb-1">
                <Star className="h-3.5 w-3.5" />
                امتیاز (XP)
              </div>
              <div className="font-bold text-lg text-tiffany">
                {user.xp}
              </div>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-3 flex flex-col">
              <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
                <Coins className="h-3.5 w-3.5" />
                اعتبار
              </div>
              <div className="font-bold text-lg text-amber-500">
                {credits}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <BarChart3 className="h-3.5 w-3.5" />
                سطح کاربری
              </div>
              <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-500 border-purple-500/20">
                {user.level}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>{xpProgress} / {xpForNextLevel}</span>
                <span>{xpForNextLevel - xpProgress} تا سطح بعدی</span>
              </div>
              <Progress value={xpPercent} className="h-1.5 bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Award className="h-4 w-4" />
              دستاوردهای اخیر
            </h4>
            <Link href="/achievements">
              <Button variant="ghost" size="sm" className="h-7 text-xs px-2">
                مشاهده همه
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {recentBadges.length > 0 ? (
              recentBadges.map(item => (
                <div 
                  key={item.id} 
                  className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2 flex flex-col items-center text-center"
                >
                  <div className="rounded-full bg-white dark:bg-slate-900 p-2 mb-1.5">
                    {item.badge.icon === 'star' && <Star className="h-5 w-5 text-amber-500" />}
                    {item.badge.icon === 'shield' && <Shield className="h-5 w-5 text-tiffany" />}
                    {item.badge.icon === 'crown' && <Crown className="h-5 w-5 text-purple-500" />}
                  </div>
                  <span className="text-xs font-medium line-clamp-1">{item.badge.title}</span>
                </div>
              ))
            ) : (
              // نمایش بج‌های نمونه اگر داده‌ای وجود نداشت
              <>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2 flex flex-col items-center text-center">
                  <div className="rounded-full bg-white dark:bg-slate-900 p-2 mb-1.5">
                    <Star className="h-5 w-5 text-amber-500" />
                  </div>
                  <span className="text-xs font-medium line-clamp-1">قهرمان آب</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2 flex flex-col items-center text-center">
                  <div className="rounded-full bg-white dark:bg-slate-900 p-2 mb-1.5">
                    <Shield className="h-5 w-5 text-tiffany" />
                  </div>
                  <span className="text-xs font-medium line-clamp-1">مدافع سلامت</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2 flex flex-col items-center text-center">
                  <div className="rounded-full bg-white dark:bg-slate-900 p-2 mb-1.5">
                    <Crown className="h-5 w-5 text-purple-500" />
                  </div>
                  <span className="text-xs font-medium line-clamp-1">پادشاه قدم</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="space-y-1.5 mt-2">
          <Link href="/profile">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
              <User className="h-3.5 w-3.5 ml-2" />
              مشاهده پروفایل
            </Button>
          </Link>
          <Link href="/profile?tab=settings">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
              <Settings className="h-3.5 w-3.5 ml-2" />
              تنظیمات حساب کاربری
            </Button>
          </Link>
          <Link href="/help">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
              <HelpCircle className="h-3.5 w-3.5 ml-2" />
              راهنما و پشتیبانی
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
              <Mail className="h-3.5 w-3.5 ml-2" />
              تماس با ما
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}