import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Crown, 
  Medal, 
  SearchIcon, 
  Trophy, 
  TrendingUp, 
  UserCircle2, 
  Users, 
  Building2, 
  Share2, 
  ArrowUp, 
  ArrowDown, 
  Minus 
} from 'lucide-react';

export interface LeaderboardUser {
  id: number;
  name: string;
  avatar: string;
  role: string;
  department: string;
  level: number;
  xp: number;
  streak: number;
  achievements: number;
  completedChallenges: number;
  rank: number;
  previousRank: number; // برای نمایش تغییر رتبه
  isCurrentUser: boolean;
}

export interface LeaderboardProps {
  userId: number;
  period?: 'daily' | 'weekly' | 'monthly' | 'all-time';
  scope?: 'company' | 'department';
  className?: string;
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  userId = 1,
  period = 'weekly',
  scope = 'company',
  className
}) => {
  const [activeTab, setActiveTab] = useState<'company' | 'department'>('company');
  const [activePeriod, setActivePeriod] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('weekly');
  const [searchQuery, setSearchQuery] = useState('');
  
  // داده‌های نمونه کاربران در رده‌بندی (در نسخه واقعی از API دریافت می‌شود)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([
    {
      id: 1,
      name: "علی محمدی",
      avatar: "/avatar-images/Pria Mohawk.png",
      role: "مهندس نرم‌افزار",
      department: "فناوری اطلاعات",
      level: 12,
      xp: 15240,
      streak: 15,
      achievements: 23,
      completedChallenges: 47,
      rank: 1,
      previousRank: 2,
      isCurrentUser: true
    },
    {
      id: 2,
      name: "سارا کریمی",
      avatar: "/avatar-images/Wanita Berhijab Berkacamata.png",
      role: "مدیر منابع انسانی",
      department: "منابع انسانی",
      level: 15,
      xp: 18950,
      streak: 30,
      achievements: 29,
      completedChallenges: 64,
      rank: 2,
      previousRank: 1,
      isCurrentUser: false
    },
    {
      id: 3,
      name: "حسین رضایی",
      avatar: "/avatar-images/Pria Rambut Pendek Brewokan.png",
      role: "کارشناس HSE",
      department: "ایمنی و بهداشت",
      level: 10,
      xp: 12780,
      streak: 12,
      achievements: 18,
      completedChallenges: 42,
      rank: 3,
      previousRank: 3,
      isCurrentUser: false
    },
    {
      id: 4,
      name: "زهرا احمدی",
      avatar: "/avatar-images/Wanita Hijab Sweater.png",
      role: "حسابدار ارشد",
      department: "مالی",
      level: 9,
      xp: 10540,
      streak: 7,
      achievements: 15,
      completedChallenges: 35,
      rank: 4,
      previousRank: 5,
      isCurrentUser: false
    },
    {
      id: 5,
      name: "مهدی حسینی",
      avatar: "/avatar-images/Pria Keriting Jaket.png",
      role: "کارشناس بازاریابی",
      department: "بازاریابی",
      level: 8,
      xp: 9870,
      streak: 10,
      achievements: 12,
      completedChallenges: 32,
      rank: 5,
      previousRank: 4,
      isCurrentUser: false
    },
    {
      id: 6,
      name: "نسترن جمشیدی",
      avatar: "/avatar-images/Wanita Urai Topi.png",
      role: "مهندس فروش",
      department: "فروش",
      level: 7,
      xp: 8450,
      streak: 5,
      achievements: 10,
      completedChallenges: 28,
      rank: 6,
      previousRank: 8,
      isCurrentUser: false
    },
    {
      id: 7,
      name: "امیر محمدی",
      avatar: "/avatar-images/Pria Keriting Kacamata.png",
      role: "مدیر محصول",
      department: "فناوری اطلاعات",
      level: 7,
      xp: 8120,
      streak: 3,
      achievements: 9,
      completedChallenges: 25,
      rank: 7,
      previousRank: 7,
      isCurrentUser: false
    },
    {
      id: 8,
      name: "فاطمه نوری",
      avatar: "/avatar-images/Wanita Kuncir Topi.png",
      role: "گرافیست",
      department: "طراحی",
      level: 6,
      xp: 7540,
      streak: 6,
      achievements: 8,
      completedChallenges: 22,
      rank: 8,
      previousRank: 6,
      isCurrentUser: false
    },
    {
      id: 9,
      name: "رضا یوسفی",
      avatar: "/avatar-images/Pria Gimbal Kacamata.png",
      role: "متخصص شبکه",
      department: "فناوری اطلاعات",
      level: 5,
      xp: 6780,
      streak: 4,
      achievements: 7,
      completedChallenges: 18,
      rank: 9,
      previousRank: 9,
      isCurrentUser: false
    },
    {
      id: 10,
      name: "مینا صادقی",
      avatar: "/avatar-images/korean-style/Korean Girl Hijab Long Shirt.png",
      role: "دستیار مدیر",
      department: "مدیریت",
      level: 5,
      xp: 6120,
      streak: 2,
      achievements: 6,
      completedChallenges: 16,
      rank: 10,
      previousRank: 10,
      isCurrentUser: false
    }
  ]);

  // داده‌های نمونه رده‌بندی دپارتمان‌ها
  const [departmentData, setDepartmentData] = useState<{
    id: number;
    name: string;
    memberCount: number;
    averageLevel: number;
    totalXp: number;
    completedChallenges: number;
    rank: number;
    previousRank: number;
    isUserDepartment: boolean;
  }[]>([
    {
      id: 1,
      name: "فناوری اطلاعات",
      memberCount: 15,
      averageLevel: 8,
      totalXp: 98750,
      completedChallenges: 320,
      rank: 1,
      previousRank: 2,
      isUserDepartment: true
    },
    {
      id: 2,
      name: "منابع انسانی",
      memberCount: 8,
      averageLevel: 7,
      totalXp: 86540,
      completedChallenges: 290,
      rank: 2,
      previousRank: 1,
      isUserDepartment: false
    },
    {
      id: 3,
      name: "بازاریابی",
      memberCount: 12,
      averageLevel: 6,
      totalXp: 75430,
      completedChallenges: 245,
      rank: 3,
      previousRank: 3,
      isUserDepartment: false
    },
    {
      id: 4,
      name: "ایمنی و بهداشت",
      memberCount: 10,
      averageLevel: 6,
      totalXp: 68920,
      completedChallenges: 210,
      rank: 4,
      previousRank: 5,
      isUserDepartment: false
    },
    {
      id: 5,
      name: "مالی",
      memberCount: 7,
      averageLevel: 5,
      totalXp: 54650,
      completedChallenges: 180,
      rank: 5,
      previousRank: 4,
      isUserDepartment: false
    },
    {
      id: 6,
      name: "فروش",
      memberCount: 14,
      averageLevel: 5,
      totalXp: 49870,
      completedChallenges: 170,
      rank: 6,
      previousRank: 7,
      isUserDepartment: false
    },
    {
      id: 7,
      name: "طراحی",
      memberCount: 6,
      averageLevel: 4,
      totalXp: 42350,
      completedChallenges: 150,
      rank: 7,
      previousRank: 6,
      isUserDepartment: false
    }
  ]);

  // فیلتر کردن داده‌ها بر اساس جستجو
  const filteredUsers = leaderboardData.filter(user => 
    user.name.includes(searchQuery) || 
    user.department.includes(searchQuery) ||
    user.role.includes(searchQuery)
  );

  const filteredDepartments = departmentData.filter(dept => 
    dept.name.includes(searchQuery)
  );

  // یافتن کاربر فعلی
  const currentUser = leaderboardData.find(user => user.isCurrentUser);

  // نمایش وضعیت تغییر رتبه
  const renderRankChange = (current: number, previous: number) => {
    const diff = previous - current;
    if (diff > 0) {
      return (
        <span className="flex items-center text-green-600 dark:text-green-500">
          <ArrowUp className="h-3 w-3 mr-1" />
          {diff}
        </span>
      );
    } else if (diff < 0) {
      return (
        <span className="flex items-center text-red-600 dark:text-red-500">
          <ArrowDown className="h-3 w-3 mr-1" />
          {Math.abs(diff)}
        </span>
      );
    } else {
      return (
        <span className="flex items-center text-slate-500">
          <Minus className="h-3 w-3 mr-1" />
        </span>
      );
    }
  };

  // ایجاد آیکون برای رتبه‌های برتر
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return <Badge className="bg-amber-500 text-white border-0"><Trophy className="h-3 w-3 ml-1" />اول</Badge>;
    } else if (rank === 2) {
      return <Badge className="bg-slate-400 text-white border-0"><Medal className="h-3 w-3 ml-1" />دوم</Badge>;
    } else if (rank === 3) {
      return <Badge className="bg-amber-700 text-white border-0"><Award className="h-3 w-3 ml-1" />سوم</Badge>;
    }
    return null;
  };

  return (
    <div className={className}>
      <Card className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200/60 dark:border-slate-800/60 shadow-xl overflow-hidden">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-lg mb-1">رده‌بندی</CardTitle>
              <CardDescription>رقابت کنید و امتیاز بگیرید</CardDescription>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'company' | 'department')}>
                <TabsList className="h-8 bg-slate-100 dark:bg-slate-900">
                  <TabsTrigger value="company" className="text-xs h-6 px-2">
                    <Users className="h-3 w-3 ml-1" />
                    کاربران
                  </TabsTrigger>
                  <TabsTrigger value="department" className="text-xs h-6 px-2">
                    <Building2 className="h-3 w-3 ml-1" />
                    دپارتمان‌ها
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Tabs value={activePeriod} onValueChange={(value) => setActivePeriod(value as 'daily' | 'weekly' | 'monthly' | 'all-time')}>
                <TabsList className="h-8 bg-slate-100 dark:bg-slate-900">
                  <TabsTrigger value="daily" className="text-xs h-6 px-2">روزانه</TabsTrigger>
                  <TabsTrigger value="weekly" className="text-xs h-6 px-2">هفتگی</TabsTrigger>
                  <TabsTrigger value="monthly" className="text-xs h-6 px-2">ماهانه</TabsTrigger>
                  <TabsTrigger value="all-time" className="text-xs h-6 px-2">کل</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="relative mt-2">
            <Input
              placeholder="جستجوی نام، دپارتمان، نقش..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-white/90 dark:bg-slate-900/90"
            />
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </CardHeader>
        
        <CardContent>
          <AnimatePresence mode="wait">
            {activeTab === 'company' ? (
              <motion.div
                key="users"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* جدول کاربران */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <th className="font-medium text-right py-2 pl-4">رتبه</th>
                        <th className="font-medium text-right py-2 pl-4">کاربر</th>
                        <th className="font-medium text-right py-2 pl-4 hidden sm:table-cell">دپارتمان</th>
                        <th className="font-medium text-right py-2 pl-4 hidden md:table-cell">سطح</th>
                        <th className="font-medium text-right py-2 pl-4">XP</th>
                        <th className="font-medium text-right py-2 pl-4 hidden lg:table-cell">استریک</th>
                        <th className="font-medium text-right py-2 hidden lg:table-cell">تغییر</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                          <tr 
                            key={user.id} 
                            className={`border-b border-slate-100 dark:border-slate-800 text-sm
                              ${user.isCurrentUser ? 'bg-tiffany/5 dark:bg-tiffany/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                          >
                            <td className="py-3 pl-4">
                              <div className="flex items-center">
                                <span className={`font-semibold mr-2 ${
                                  user.rank === 1 ? 'text-amber-500' :
                                  user.rank === 2 ? 'text-slate-400' :
                                  user.rank === 3 ? 'text-amber-700' : ''
                                }`}>
                                  {user.rank}
                                </span>
                                {getRankBadge(user.rank)}
                              </div>
                            </td>
                            <td className="py-3 pl-4">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full overflow-hidden mr-2 bg-slate-200 dark:bg-slate-700">
                                  <img 
                                    src={user.avatar} 
                                    alt={user.name} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {user.name}
                                    {user.isCurrentUser && (
                                      <Badge variant="outline" className="mr-1 text-[10px] bg-tiffany/10 text-tiffany border-tiffany/20">شما</Badge>
                                    )}
                                  </span>
                                  <span className="text-xs text-slate-500 dark:text-slate-400">{user.role}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 pl-4 hidden sm:table-cell">
                              <span className="text-sm">{user.department}</span>
                            </td>
                            <td className="py-3 pl-4 hidden md:table-cell">
                              <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                <Crown className="h-3 w-3 ml-1 text-amber-500" />
                                {user.level}
                              </Badge>
                            </td>
                            <td className="py-3 pl-4 font-medium">
                              <span className="flex items-center">
                                <Zap className="h-3 w-3 ml-1 text-amber-500" />
                                {user.xp.toLocaleString('fa-IR')}
                              </span>
                            </td>
                            <td className="py-3 pl-4 hidden lg:table-cell">
                              <Badge className={user.streak >= 7 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}>
                                <TrendingUp className="h-3 w-3 ml-1" />
                                {user.streak} روز
                              </Badge>
                            </td>
                            <td className="py-3 pr-4 text-right hidden lg:table-cell">
                              {renderRankChange(user.rank, user.previousRank)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-4 text-center text-slate-500 dark:text-slate-400">
                            نتیجه‌ای برای جستجوی شما یافت نشد
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* باکس کاربر فعلی */}
                {currentUser && !searchQuery && (
                  <Card className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-3 md:mb-0">
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-slate-200 dark:bg-slate-700">
                            <img 
                              src={currentUser.avatar} 
                              alt={currentUser.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold">{currentUser.name}</h3>
                              <Badge className="mr-2 text-[10px] bg-tiffany/10 text-tiffany border-tiffany/20">شما</Badge>
                            </div>
                            <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                              <span>رتبه {currentUser.rank} از {leaderboardData.length}</span>
                              <span className="mx-2">•</span>
                              <span className="flex items-center">
                                <Zap className="h-3 w-3 ml-1 text-amber-500" />
                                {currentUser.xp.toLocaleString('fa-IR')} XP
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" className="h-8">
                            <Share2 className="h-4 w-4 ml-1" />
                            اشتراک‌گذاری
                          </Button>
                          <Button variant="default" size="sm" className="h-8">
                            <UserCircle2 className="h-4 w-4 ml-1" />
                            مشاهده پروفایل
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="departments"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* جدول دپارتمان‌ها */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                        <th className="font-medium text-right py-2 pl-4">رتبه</th>
                        <th className="font-medium text-right py-2 pl-4">دپارتمان</th>
                        <th className="font-medium text-right py-2 pl-4">تعداد اعضا</th>
                        <th className="font-medium text-right py-2 pl-4 hidden sm:table-cell">میانگین سطح</th>
                        <th className="font-medium text-right py-2 pl-4">امتیاز کل</th>
                        <th className="font-medium text-right py-2 pl-4 hidden md:table-cell">چالش‌ها</th>
                        <th className="font-medium text-right py-2 hidden lg:table-cell">تغییر</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDepartments.length > 0 ? (
                        filteredDepartments.map(dept => (
                          <tr 
                            key={dept.id} 
                            className={`border-b border-slate-100 dark:border-slate-800 text-sm
                              ${dept.isUserDepartment ? 'bg-tiffany/5 dark:bg-tiffany/10' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                          >
                            <td className="py-3 pl-4">
                              <div className="flex items-center">
                                <span className={`font-semibold mr-2 ${
                                  dept.rank === 1 ? 'text-amber-500' :
                                  dept.rank === 2 ? 'text-slate-400' :
                                  dept.rank === 3 ? 'text-amber-700' : ''
                                }`}>
                                  {dept.rank}
                                </span>
                                {getRankBadge(dept.rank)}
                              </div>
                            </td>
                            <td className="py-3 pl-4">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full overflow-hidden mr-2 bg-gradient-to-br from-tiffany/20 to-blue-500/20 dark:from-tiffany/30 dark:to-blue-500/30 flex items-center justify-center">
                                  <Building2 className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {dept.name}
                                    {dept.isUserDepartment && (
                                      <Badge variant="outline" className="mr-1 text-[10px] bg-tiffany/10 text-tiffany border-tiffany/20">شما</Badge>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 pl-4">
                              <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                <Users className="h-3 w-3 ml-1" />
                                {dept.memberCount} نفر
                              </Badge>
                            </td>
                            <td className="py-3 pl-4 hidden sm:table-cell">
                              <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                <Crown className="h-3 w-3 ml-1" />
                                {dept.averageLevel}
                              </Badge>
                            </td>
                            <td className="py-3 pl-4 font-medium">
                              <span className="flex items-center">
                                <Zap className="h-3 w-3 ml-1 text-amber-500" />
                                {dept.totalXp.toLocaleString('fa-IR')}
                              </span>
                            </td>
                            <td className="py-3 pl-4 hidden md:table-cell">
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <Award className="h-3 w-3 ml-1" />
                                {dept.completedChallenges}
                              </Badge>
                            </td>
                            <td className="py-3 pr-4 text-right hidden lg:table-cell">
                              {renderRankChange(dept.rank, dept.previousRank)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-4 text-center text-slate-500 dark:text-slate-400">
                            نتیجه‌ای برای جستجوی شما یافت نشد
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;