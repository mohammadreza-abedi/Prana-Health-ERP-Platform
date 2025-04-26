import { useQuery } from "@tanstack/react-query";
import { LeaderboardEntry, Department } from "@/types";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { Medal, Trophy, Sparkles, Award, Star, Filter, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function Leaderboard() {
  const [leaderboardType, setLeaderboardType] = useState<'internal' | 'public'>('internal');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('monthly');
  const [filter, setFilter] = useState<'all' | number>('all');
  
  const { user } = useAuth();
  
  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard'],
  });
  
  const { data: departments } = useQuery<Department[]>({
    queryKey: ['/api/departments'],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tiffany"></div>
      </div>
    );
  }
  
  if (!leaderboard || leaderboard.length === 0) {
    return (
      <GlassCard className="p-8 text-center">
        <Trophy className="h-16 w-16 mx-auto text-slate-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">اطلاعات لیدربورد در دسترس نیست</h3>
        <p className="text-slate-500 dark:text-slate-400">
          در حال حاضر اطلاعاتی برای نمایش وجود ندارد.
        </p>
      </GlassCard>
    );
  }
  
  // Find current user's position
  const currentUserPosition = user 
    ? leaderboard.findIndex(entry => entry.id === user.id) + 1
    : null;
  
  // Get medal icon based on rank
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-full w-full text-yellow" />;
      case 2:
        return <Medal className="h-full w-full text-slate-400" />;
      case 3:
        return <Medal className="h-full w-full text-amber-700" />;
      default:
        return null;
    }
  };
  
  // Get background color based on rank
  const getBackgroundColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-br from-slate-300 to-slate-500";
      case 3:
        return "bg-gradient-to-br from-amber-600 to-amber-800";
      default:
        return "bg-white dark:bg-slate-800";
    }
  };
  
  // Get text color based on rank
  const getTextColor = (rank: number) => {
    switch (rank) {
      case 1:
      case 2:
      case 3:
        return "text-white";
      default:
        return "";
    }
  };
  
  // Get timeframe label
  const getTimeframeLabel = () => {
    switch (timeframe) {
      case 'weekly':
        return 'هفتگی';
      case 'monthly':
        return 'ماهانه';
      case 'alltime':
        return 'کل دوره';
    }
  };
  
  // Get filter label
  const getFilterLabel = () => {
    if (filter === 'all') return 'همه واحدها';
    
    const department = departments?.find(d => d.id === filter);
    return department ? department.name : 'همه واحدها';
  };

  return (
    <>
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">لیدربورد و رتبه‌بندی</h1>
        <p className="text-slate-500 dark:text-slate-400">
          مشاهده برترین‌های سلامت و تناسب اندام
        </p>
      </motion.div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <button 
            className={`px-4 py-2 ${leaderboardType === 'internal' ? 'bg-tiffany text-white' : 'bg-white dark:bg-slate-800'}`}
            onClick={() => setLeaderboardType('internal')}
          >
            داخلی
          </button>
          <button 
            className={`px-4 py-2 ${leaderboardType === 'public' ? 'bg-tiffany text-white' : 'bg-white dark:bg-slate-800'}`}
            onClick={() => setLeaderboardType('public')}
          >
            عمومی
          </button>
        </div>
        
        <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
          <button 
            className={`px-4 py-2 ${timeframe === 'weekly' ? 'bg-tiffany text-white' : 'bg-white dark:bg-slate-800'}`}
            onClick={() => setTimeframe('weekly')}
          >
            هفتگی
          </button>
          <button 
            className={`px-4 py-2 ${timeframe === 'monthly' ? 'bg-tiffany text-white' : 'bg-white dark:bg-slate-800'}`}
            onClick={() => setTimeframe('monthly')}
          >
            ماهانه
          </button>
          <button 
            className={`px-4 py-2 ${timeframe === 'alltime' ? 'bg-tiffany text-white' : 'bg-white dark:bg-slate-800'}`}
            onClick={() => setTimeframe('alltime')}
          >
            کل دوره
          </button>
        </div>
        
        {departments && departments.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Filter className="h-4 w-4 ml-2" />
              <span>{getFilterLabel()}</span>
              <ChevronDown className="h-4 w-4 mr-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilter('all')}>
                همه واحدها
              </DropdownMenuItem>
              {departments.map(dept => (
                <DropdownMenuItem 
                  key={dept.id}
                  onClick={() => setFilter(dept.id)}
                >
                  {dept.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      {/* Top 3 users */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center">
          <Sparkles className="h-5 w-5 ml-2 text-yellow" />
          برترین‌های {getTimeframeLabel()}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <motion.div
              key={entry.id}
              className={`rounded-xl p-6 shadow-sm ${getBackgroundColor(index + 1)} ${getTextColor(index + 1)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-white/50">
                  {entry.avatar ? (
                    <img 
                      src={entry.avatar} 
                      alt={entry.displayName}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-slate-700 dark:text-white text-lg font-bold">
                      {entry.displayName[0]}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">{entry.displayName}</h3>
                  <p className={`text-sm ${index < 3 ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                    سطح {entry.level}
                  </p>
                </div>
                
                <div className="ml-auto">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center p-2">
                    {getMedalIcon(index + 1)}
                  </div>
                </div>
              </div>
              
              <div className={`rounded-lg p-3 ${index < 3 ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700'} flex justify-between items-center`}>
                <span className="text-sm">امتیاز کسب شده</span>
                <span className="text-lg font-bold">{entry.xp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Leaderboard table */}
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">جدول امتیازات</h3>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            {leaderboard.length} شرکت‌کننده
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-right py-3 px-4 font-medium">رتبه</th>
                <th className="text-right py-3 px-4 font-medium">نام</th>
                <th className="text-right py-3 px-4 font-medium">سطح</th>
                <th className="text-right py-3 px-4 font-medium">امتیاز</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => {
                const isCurrentUser = user && entry.id === user.id;
                
                return (
                  <motion.tr 
                    key={entry.id}
                    className={`${
                      isCurrentUser 
                        ? 'bg-tiffany/10 border-tiffany/20 border' 
                        : 'border-b border-slate-200 dark:border-slate-700'
                    } ${index < 3 ? 'font-medium' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.05) }}
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="flex items-center">
                        {index < 3 ? (
                          <span className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${
                            index === 0 
                              ? 'bg-yellow text-slate-900' 
                              : index === 1 
                                ? 'bg-slate-300 text-slate-900' 
                                : 'bg-amber-700 text-white'
                          }`}>
                            {index + 1}
                          </span>
                        ) : (
                          <span className="mr-4">{index + 1}</span>
                        )}
                        {isCurrentUser && <span className="text-xs text-tiffany mr-2">شما</span>}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {entry.avatar ? (
                          <img 
                            src={entry.avatar} 
                            alt={entry.displayName}
                            className="w-8 h-8 rounded-full mr-3 object-cover" 
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-3">
                            {entry.displayName[0]}
                          </div>
                        )}
                        {entry.displayName}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-tiffany" />
                        {entry.level}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-medium">
                      {entry.xp}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
      
      {/* Current user stats */}
      {user && currentUserPosition && (
        <motion.div
          className="mt-8 glass p-6 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Star className="h-5 w-5 ml-2 text-tiffany" />
            وضعیت شما
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-tiffany/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-tiffany" />
              </div>
              <div className="mr-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">رتبه شما</p>
                <p className="text-2xl font-bold">{currentUserPosition}</p>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-navy" />
              </div>
              <div className="mr-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">سطح فعلی</p>
                <p className="text-2xl font-bold">{user.level}</p>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 flex items-center">
              <div className="w-12 h-12 rounded-full bg-yellow/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-yellow" />
              </div>
              <div className="mr-3">
                <p className="text-sm text-slate-500 dark:text-slate-400">امتیاز کل</p>
                <p className="text-2xl font-bold">{user.xp}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <p className="text-sm font-medium">تا سطح بعدی</p>
              <p className="text-sm font-medium">
                {user.xp % 100}/100 امتیاز
              </p>
            </div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                className="h-2 rounded-full bg-tiffany"
                initial={{ width: "0%" }}
                animate={{ width: `${user.xp % 100}%` }}
                transition={{ duration: 0.8, delay: 0.7 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
