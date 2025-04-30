/**
 * @file Leaderboard.tsx
 * @description کامپوننت جدول رتبه‌بندی
 * 
 * این کامپوننت جدول رتبه‌بندی کاربران را بر اساس امتیازات و سطح آنها نمایش می‌دهد.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Star, 
  Users, 
  Filter,
  Calendar,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Sparkles,
  Building2,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/design-system/atoms/Card';
import { Button } from '@/design-system/atoms/Button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';

// نوع داده کاربر در رتبه‌بندی
interface LeaderboardUser {
  id: number;
  displayName: string;
  username?: string;
  avatar?: string;
  rank?: number;
  xp: number;
  level: number;
  department?: string;
  title?: string;
  previousRank?: number;
  streak?: number;
  badges?: number;
  challengesCompleted?: number;
  lastActive?: string;
  rankChange?: 'up' | 'down' | 'same' | 'بالا' | 'پایین' | 'ثابت';
}

// پراپس Leaderboard
interface LeaderboardProps {
  data: LeaderboardUser[] | undefined;
  isLoading: boolean;
}

// کامپوننت نمایش رتبه‌بندی بالاترین‌ها
const TopRankedUsers: React.FC<{ users: LeaderboardUser[] }> = ({ users }) => {
  const getAvatarBackground = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-300 to-amber-500 border-amber-300 dark:border-amber-500';
      case 2:
        return 'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-300 dark:border-gray-400';
      case 3:
        return 'bg-gradient-to-br from-orange-300 to-amber-600 border-amber-400 dark:border-amber-600';
      default:
        return 'bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-800 border-gray-300 dark:border-gray-600';
    }
  };

  const getTrophyIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-amber-600" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-600" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <Star className="h-6 w-6 text-primary-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {users.slice(0, 3).map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className={`h-full ${index === 0 ? 'bg-amber-50/50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800/30' : ''}`}>
            <CardContent className="pt-6 pb-4 text-center">
              <div className="relative flex justify-center mb-3">
                <div className={`absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center ${
                  index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                } text-white font-bold text-sm z-10`}>
                  {index + 1}
                </div>
                
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${getAvatarBackground(index + 1)} relative`}>
                  {user.avatar ? (
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar} alt={user.displayName} />
                      <AvatarFallback>{user.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-800/50 flex items-center justify-center text-primary-600 dark:text-primary-300 text-xl font-bold">
                      {user.displayName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-1">{user.displayName}</h3>
              
              {user.department && (
                <p className="text-sm text-muted-foreground mb-3">{user.department}</p>
              )}
              
              <div className="flex justify-center gap-3 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{user.xp}</p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
                
                <div className="h-10 border-r border-gray-200 dark:border-gray-700"></div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{user.level}</p>
                  <p className="text-xs text-muted-foreground">سطح</p>
                </div>
                
                {user.streak && (
                  <>
                    <div className="h-10 border-r border-gray-200 dark:border-gray-700"></div>
                    
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-500">{user.streak}</p>
                      <p className="text-xs text-muted-foreground">روز</p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex justify-center gap-2">
                {user.badges && (
                  <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/30">
                    {user.badges} نشان
                  </Badge>
                )}
                
                {user.challengesCompleted && (
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/30">
                    {user.challengesCompleted} چالش
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// کامپوننت وضعیت بارگذاری
const LeaderboardLoadingSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="pt-6 pb-4 text-center">
              <div className="flex justify-center mb-3">
                <Skeleton className="w-20 h-20 rounded-full" />
              </div>
              <Skeleton className="h-6 w-32 mx-auto mb-1" />
              <Skeleton className="h-4 w-24 mx-auto mb-3" />
              
              <div className="flex justify-center gap-3 mb-4">
                <div className="text-center">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-10 mt-1 mx-auto" />
                </div>
                
                <div className="h-10 border-r border-gray-200 dark:border-gray-700"></div>
                
                <div className="text-center">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-10 mt-1 mx-auto" />
                </div>
              </div>
              
              <div className="flex justify-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-40" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-32 rounded-md" />
              <Skeleton className="h-9 w-32 rounded-md" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Skeleton className="w-7 h-7 mr-3 rounded-full" />
                  <Skeleton className="w-9 h-9 mr-3 rounded-full" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between">
            <Skeleton className="h-10 w-20 rounded-md" />
            <div className="flex gap-1">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </div>
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

// کامپوننت اصلی Leaderboard
const Leaderboard: React.FC<LeaderboardProps> = ({ data, isLoading }) => {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<string>('weekly');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // تعداد آیتم در هر صفحه
  const itemsPerPage = 10;
  
  // نمونه داده‌های رتبه‌بندی اگر داده واقعی موجود نباشد
  const sampleLeaderboardData: LeaderboardUser[] = [
    {
      id: 1,
      displayName: "محمد احمدی",
      avatar: "",
      rank: 1,
      xp: 12450,
      level: 32,
      department: "IT",
      title: "توسعه‌دهنده ارشد",
      previousRank: 1,
      streak: 45,
      badges: 28,
      challengesCompleted: 87,
      lastActive: "امروز",
      rankChange: "ثابت"
    },
    {
      id: 2,
      displayName: "علی محمدی",
      avatar: "",
      rank: 2,
      xp: 11875,
      level: 30,
      department: "مارکتینگ",
      title: "مدیر محتوا",
      previousRank: 3,
      streak: 38,
      badges: 24,
      challengesCompleted: 79,
      lastActive: "امروز",
      rankChange: "بالا"
    },
    {
      id: 3,
      displayName: "زهرا کریمی",
      avatar: "",
      rank: 3,
      xp: 10950,
      level: 28,
      department: "منابع انسانی",
      title: "مدیر منابع انسانی",
      previousRank: 2,
      streak: 22,
      badges: 21,
      challengesCompleted: 72,
      lastActive: "امروز",
      rankChange: "پایین"
    },
    {
      id: 4,
      displayName: "امیر رضایی",
      avatar: "",
      rank: 4,
      xp: 9840,
      level: 26,
      department: "فروش",
      title: "کارشناس فروش",
      previousRank: 4,
      streak: 19,
      badges: 19,
      challengesCompleted: 65,
      lastActive: "امروز",
      rankChange: "ثابت"
    },
    {
      id: 5,
      displayName: "سارا حسینی",
      avatar: "",
      rank: 5,
      xp: 8950,
      level: 24,
      department: "IT",
      title: "طراح UX/UI",
      previousRank: 7,
      streak: 28,
      badges: 18,
      challengesCompleted: 60,
      lastActive: "دیروز",
      rankChange: "بالا"
    },
    {
      id: 6,
      displayName: "حسین قاسمی",
      avatar: "",
      rank: 6,
      xp: 8240,
      level: 22,
      department: "حسابداری",
      title: "حسابدار ارشد",
      previousRank: 5,
      streak: 14,
      badges: 16,
      challengesCompleted: 58,
      lastActive: "دیروز",
      rankChange: "پایین"
    },
    {
      id: 7,
      displayName: "فاطمه نوری",
      avatar: "",
      rank: 7,
      xp: 7850,
      level: 21,
      department: "مارکتینگ",
      title: "کارشناس دیجیتال مارکتینگ",
      previousRank: 6,
      streak: 12,
      badges: 15,
      challengesCompleted: 52,
      lastActive: "دیروز",
      rankChange: "پایین"
    },
    {
      id: 8,
      displayName: "رضا صادقی",
      avatar: "",
      rank: 8,
      xp: 7245,
      level: 20,
      department: "پشتیبانی",
      title: "کارشناس پشتیبانی",
      previousRank: 8,
      streak: 9,
      badges: 14,
      challengesCompleted: 48,
      lastActive: "امروز",
      rankChange: "ثابت"
    },
    {
      id: 9,
      displayName: "مریم جعفری",
      avatar: "",
      rank: 9,
      xp: 6780,
      level: 19,
      department: "منابع انسانی",
      title: "کارشناس استخدام",
      previousRank: 10,
      streak: 8,
      badges: 12,
      challengesCompleted: 45,
      lastActive: "دیروز",
      rankChange: "بالا"
    },
    {
      id: 10,
      displayName: "کاوه صفری",
      avatar: "",
      rank: 10,
      xp: 6540,
      level: 18,
      department: "IT",
      title: "توسعه‌دهنده فرانت‌اند",
      previousRank: 9,
      streak: 7,
      badges: 11,
      challengesCompleted: 42,
      lastActive: "۲ روز پیش",
      rankChange: "پایین"
    },
    {
      id: 11,
      displayName: "نرگس موسوی",
      avatar: "",
      rank: 11,
      xp: 6120,
      level: 17,
      department: "پشتیبانی",
      title: "مدیر پشتیبانی مشتریان",
      previousRank: 11,
      streak: 5,
      badges: 10,
      challengesCompleted: 40,
      lastActive: "امروز",
      rankChange: "ثابت"
    },
    {
      id: 12,
      displayName: "پویا امینی",
      avatar: "",
      rank: 12,
      xp: 5840,
      level: 16,
      department: "فروش",
      title: "مدیر فروش",
      previousRank: 13,
      streak: 4,
      badges: 9,
      challengesCompleted: 38,
      lastActive: "امروز",
      rankChange: "بالا"
    },
    {
      id: 13,
      displayName: "شیما محمودی",
      avatar: "",
      rank: 13,
      xp: 5620,
      level: 16,
      department: "مارکتینگ",
      title: "کارشناس شبکه‌های اجتماعی",
      previousRank: 12,
      streak: 3,
      badges: 8,
      challengesCompleted: 36,
      lastActive: "دیروز",
      rankChange: "پایین"
    },
    {
      id: 14,
      displayName: "سینا هاشمی",
      avatar: "",
      rank: 14,
      xp: 5250,
      level: 15,
      department: "IT",
      title: "مهندس DevOps",
      previousRank: 15,
      streak: 2,
      badges: 7,
      challengesCompleted: 34,
      lastActive: "امروز",
      rankChange: "بالا"
    },
    {
      id: 15,
      displayName: "نازنین رحیمی",
      avatar: "",
      rank: 15,
      xp: 4980,
      level: 14,
      department: "حسابداری",
      title: "کارشناس مالی",
      previousRank: 14,
      streak: 1,
      badges: 6,
      challengesCompleted: 32,
      lastActive: "۳ روز پیش",
      rankChange: "پایین"
    }
  ];
  
  // فیلتر و جستجوی داده‌های رتبه‌بندی
  const filteredLeaderboardData = () => {
    // استفاده از داده‌های نمونه اگر داده واقعی موجود نباشد
    const allUsers = data || sampleLeaderboardData;
    
    return allUsers.filter(user => {
      // فیلتر بر اساس دپارتمان
      const departmentMatch = filterDepartment === 'all' || 
                             user.department?.toLowerCase() === filterDepartment.toLowerCase();
      
      // فیلتر بر اساس عبارت جستجو
      const searchMatch = !searchQuery || 
                         user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.department?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return departmentMatch && searchMatch;
    });
  };
  
  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(filteredLeaderboardData().length / itemsPerPage);
  
  // داده‌های صفحه فعلی
  const currentPageData = filteredLeaderboardData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // مدیریت تغییر صفحه
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  
  // مدیریت تغییر عبارت جستجو
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // بازگشت به صفحه اول هنگام جستجو
  };
  
  // وضعیت بارگذاری
  if (isLoading) {
    return <LeaderboardLoadingSkeleton />;
  }
  
  // یافتن کاربر فعلی در لیست رتبه‌بندی
  const currentUser = user ? filteredLeaderboardData().find(u => u.id === user.id) : undefined;
  
  return (
    <>
      {/* کاربران برتر */}
      <TopRankedUsers users={filteredLeaderboardData().slice(0, 3)} />
      
      {/* رتبه کاربر فعلی */}
      {currentUser && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent border-primary-100 dark:border-primary-800/30">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 mr-3 text-sm font-bold">
                    {currentUser.rank}
                  </div>
                  
                  {currentUser.avatar ? (
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.displayName} />
                      <AvatarFallback>{currentUser.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-800/50 flex items-center justify-center text-primary-600 dark:text-primary-300 text-lg font-bold mr-3">
                      {currentUser.displayName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  
                  <div>
                    <p className="font-medium">رتبه شما</p>
                    <div className="flex items-center text-sm">
                      <span className="text-muted-foreground">{currentUser.displayName}</span>
                      {currentUser.rankChange && (
                        <Badge className={`ml-2 ${
                          currentUser.rankChange.toLowerCase() === 'up' || currentUser.rankChange === 'بالا'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : currentUser.rankChange.toLowerCase() === 'down' || currentUser.rankChange === 'پایین'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {currentUser.rankChange.toLowerCase() === 'up' || currentUser.rankChange === 'بالا' ? (
                            <span className="flex items-center">
                              <ArrowUp className="h-3 w-3 mr-0.5" />
                              {currentUser.previousRank && `${currentUser.previousRank - currentUser.rank}`}
                            </span>
                          ) : currentUser.rankChange.toLowerCase() === 'down' || currentUser.rankChange === 'پایین' ? (
                            <span className="flex items-center">
                              <ArrowDown className="h-3 w-3 mr-0.5" />
                              {currentUser.previousRank && `${currentUser.rank - currentUser.previousRank}`}
                            </span>
                          ) : (
                            <ArrowRight className="h-3 w-3" />
                          )}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">XP</p>
                    <p className="text-xl font-bold">{currentUser.xp}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">سطح</p>
                    <p className="text-xl font-bold">{currentUser.level}</p>
                  </div>
                  
                  {currentUser.streak && (
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">تداوم</p>
                      <p className="text-xl font-bold">{currentUser.streak} روز</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      {/* فیلترها و جدول رتبه‌بندی */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center">
              <Tabs value={timeRange} onValueChange={setTimeRange} className="w-[300px]">
                <TabsList>
                  <TabsTrigger value="weekly">هفتگی</TabsTrigger>
                  <TabsTrigger value="monthly">ماهانه</TabsTrigger>
                  <TabsTrigger value="yearly">سالانه</TabsTrigger>
                  <TabsTrigger value="all-time">همه زمان‌ها</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجوی کاربر..."
                  className="pl-9 w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-[130px]">
                  <Building2 className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="دپارتمان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="مارکتینگ">مارکتینگ</SelectItem>
                  <SelectItem value="منابع انسانی">منابع انسانی</SelectItem>
                  <SelectItem value="فروش">فروش</SelectItem>
                  <SelectItem value="حسابداری">حسابداری</SelectItem>
                  <SelectItem value="پشتیبانی">پشتیبانی</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {currentPageData.length > 0 ? (
            <div className="space-y-3">
              {currentPageData.map((leaderboardUser) => (
                <motion.div
                  key={leaderboardUser.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                    user && leaderboardUser.id === user.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/30'
                      : 'hover:bg-accent hover:dark:bg-accent/20'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm mr-3 ${
                      leaderboardUser.rank === 1
                        ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                        : leaderboardUser.rank === 2
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
                          : leaderboardUser.rank === 3
                            ? 'bg-amber-100/50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300'
                            : 'bg-muted text-muted-foreground'
                    }`}>
                      {leaderboardUser.rank}
                    </div>
                    
                    {leaderboardUser.avatar ? (
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage src={leaderboardUser.avatar} alt={leaderboardUser.displayName} />
                        <AvatarFallback>{leaderboardUser.displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-bold mr-3">
                        {leaderboardUser.displayName.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    
                    <div>
                      <p className="font-medium">{leaderboardUser.displayName}</p>
                      <div className="flex items-center text-sm">
                        {leaderboardUser.department && (
                          <span className="text-muted-foreground">{leaderboardUser.department}</span>
                        )}
                        
                        {leaderboardUser.title && leaderboardUser.department && (
                          <span className="mx-1 text-muted-foreground">•</span>
                        )}
                        
                        {leaderboardUser.title && (
                          <span className="text-muted-foreground">{leaderboardUser.title}</span>
                        )}
                        
                        {leaderboardUser.rankChange && (
                          <Badge className={`ml-2 ${
                            leaderboardUser.rankChange.toLowerCase() === 'up' || leaderboardUser.rankChange === 'بالا'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : leaderboardUser.rankChange.toLowerCase() === 'down' || leaderboardUser.rankChange === 'پایین'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {leaderboardUser.rankChange.toLowerCase() === 'up' || leaderboardUser.rankChange === 'بالا' ? (
                              <span className="flex items-center">
                                <ArrowUp className="h-3 w-3 mr-0.5" />
                                {leaderboardUser.previousRank && `${leaderboardUser.previousRank - leaderboardUser.rank}`}
                              </span>
                            ) : leaderboardUser.rankChange.toLowerCase() === 'down' || leaderboardUser.rankChange === 'پایین' ? (
                              <span className="flex items-center">
                                <ArrowDown className="h-3 w-3 mr-0.5" />
                                {leaderboardUser.previousRank && `${leaderboardUser.rank - leaderboardUser.previousRank}`}
                              </span>
                            ) : (
                              <ArrowRight className="h-3 w-3" />
                            )}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">XP</p>
                      <p className="font-bold">{leaderboardUser.xp}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">سطح</p>
                      <p className="font-bold">{leaderboardUser.level}</p>
                    </div>
                    
                    {leaderboardUser.badges && (
                      <div className="hidden md:block text-right">
                        <p className="text-sm text-muted-foreground">نشان‌ها</p>
                        <p className="font-bold">{leaderboardUser.badges}</p>
                      </div>
                    )}
                    
                    {leaderboardUser.lastActive && (
                      <div className="hidden lg:block text-right">
                        <p className="text-sm text-muted-foreground">آخرین فعالیت</p>
                        <p className="font-bold">{leaderboardUser.lastActive}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-30" />
              <h3 className="text-lg font-medium mb-1">هیچ کاربری یافت نشد</h3>
              <p className="text-sm text-muted-foreground">
                با تغییر فیلترها یا عبارت جستجو، نتایج بیشتری را جستجو کنید.
              </p>
            </div>
          )}
        </CardContent>
        
        {/* صفحه‌بندی */}
        {totalPages > 1 && (
          <CardFooter>
            <div className="flex justify-between items-center w-full">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-1 rtl:space-x-reverse">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                  let pageNumber;
                  
                  if (totalPages <= 5) {
                    pageNumber = index + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = index + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + index;
                  } else {
                    pageNumber = currentPage - 2 + index;
                  }
                  
                  return (
                    <Button
                      key={index}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default Leaderboard;