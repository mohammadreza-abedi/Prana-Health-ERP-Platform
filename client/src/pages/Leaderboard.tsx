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
      
      {/* Top 3 users - Premium Podium Style */}
      <div className="mb-12">
        <h2 className="text-lg font-bold mb-6 flex items-center">
          <Sparkles className="h-5 w-5 ml-2 text-yellow" />
          برترین‌های {getTimeframeLabel()}
        </h2>
        
        <div className="relative h-[400px] md:h-[500px] mt-14">
          {/* Create podium display for top 3 */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end">
            {/* Second Place */}
            {leaderboard.length > 1 && (
              <motion.div
                className="relative mx-2 md:mx-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-3">
                    <motion.div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-slate-300 overflow-hidden"
                      whileHover={{ scale: 1.05, borderColor: "rgba(160, 174, 192, 1)" }}
                    >
                      {leaderboard[1].avatar ? (
                        <img 
                          src={leaderboard[1].avatar} 
                          alt={leaderboard[1].displayName}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-700 text-xl font-bold">
                          {leaderboard[1].displayName[0]}
                        </div>
                      )}
                    </motion.div>
                    <div className="absolute -top-3 -right-3 bg-slate-300 w-8 h-8 rounded-full flex items-center justify-center text-slate-900 font-bold shadow-lg border-2 border-white">
                      2
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 scale-150">
                      <Medal className="h-7 w-7 text-slate-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-md text-center">{leaderboard[1].displayName}</h3>
                  <div className="bg-slate-300/90 text-slate-800 rounded-full px-3 py-1 text-xs mt-1 font-medium">
                    {leaderboard[1].xp} امتیاز
                  </div>
                  
                  {/* Podium */}
                  <motion.div 
                    className="w-24 md:w-32 h-32 md:h-40 bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-lg mt-3 flex items-center justify-center"
                    initial={{ height: 0 }}
                    animate={{ height: "160px" }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <span className="text-white text-xl font-bold">2</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {/* First Place - Taller */}
            {leaderboard.length > 0 && (
              <motion.div
                className="relative mx-2 md:mx-4 -mb-5 md:-mb-8 z-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-3">
                    <motion.div
                      className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-yellow-500 overflow-hidden"
                      whileHover={{ scale: 1.05, borderColor: "rgba(245, 158, 11, 1)" }}
                    >
                      {leaderboard[0].avatar ? (
                        <img 
                          src={leaderboard[0].avatar} 
                          alt={leaderboard[0].displayName}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-yellow-200 flex items-center justify-center text-yellow-800 text-2xl font-bold">
                          {leaderboard[0].displayName[0]}
                        </div>
                      )}
                    </motion.div>
                    <div className="absolute -top-4 -right-3 bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">
                      1
                    </div>
                    <motion.div 
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      <Trophy className="h-10 w-10 text-yellow-500" />
                    </motion.div>
                    <motion.div 
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1.5 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <Trophy className="h-8 w-8 text-yellow" />
                    </motion.div>
                  </div>
                  <h3 className="font-bold text-xl text-center">{leaderboard[0].displayName}</h3>
                  <div className="bg-yellow-500/90 text-white rounded-full px-4 py-1 text-sm mt-1 font-medium">
                    {leaderboard[0].xp} امتیاز
                  </div>
                  
                  {/* Sparkling effects */}
                  <motion.div 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1.2, 0.8],
                      rotate: [0, 15, 0]
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="h-8 w-8 text-yellow" />
                  </motion.div>
                  
                  {/* Podium */}
                  <motion.div 
                    className="w-28 md:w-36 h-40 md:h-52 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-lg mt-3 flex items-center justify-center relative overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: "220px" }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                  >
                    <span className="text-white text-2xl font-bold">1</span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-transparent to-yellow-300/30"
                      animate={{ 
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {/* Third Place */}
            {leaderboard.length > 2 && (
              <motion.div
                className="relative mx-2 md:mx-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-3">
                    <motion.div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-amber-700 overflow-hidden"
                      whileHover={{ scale: 1.05, borderColor: "rgba(180, 83, 9, 1)" }}
                    >
                      {leaderboard[2].avatar ? (
                        <img 
                          src={leaderboard[2].avatar} 
                          alt={leaderboard[2].displayName}
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-amber-200 flex items-center justify-center text-amber-800 text-xl font-bold">
                          {leaderboard[2].displayName[0]}
                        </div>
                      )}
                    </motion.div>
                    <div className="absolute -top-3 -right-3 bg-amber-700 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">
                      3
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 scale-150">
                      <Medal className="h-7 w-7 text-amber-700" />
                    </div>
                  </div>
                  <h3 className="font-bold text-md text-center">{leaderboard[2].displayName}</h3>
                  <div className="bg-amber-700/90 text-white rounded-full px-3 py-1 text-xs mt-1 font-medium">
                    {leaderboard[2].xp} امتیاز
                  </div>
                  
                  {/* Podium */}
                  <motion.div 
                    className="w-24 md:w-32 h-24 md:h-32 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg mt-3 flex items-center justify-center"
                    initial={{ height: 0 }}
                    animate={{ height: "120px" }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                  >
                    <span className="text-white text-xl font-bold">3</span>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
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
