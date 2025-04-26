import { useQuery } from "@tanstack/react-query";
import { Event, User } from "@/types";
import { GlassCard } from "../ui/glass-card";
import { motion } from "framer-motion";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function UpcomingEventsCard() {
  const { toast } = useToast();
  
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ['/api/events'],
  });
  
  const handleJoinEvent = async (eventId: number) => {
    try {
      await apiRequest('POST', `/api/events/${eventId}/join`);
      
      // Invalidate events to refresh participants
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      
      toast({
        title: 'ثبت‌نام موفق',
        description: 'شما با موفقیت در این رویداد ثبت‌نام شدید',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'خطا در ثبت‌نام',
        description: 'مشکلی در ثبت‌نام شما پیش آمد. لطفا دوباره تلاش کنید',
        variant: 'destructive',
      });
    }
  };
  
  if (isLoading) {
    return (
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-semibold text-lg">رویدادهای پیش رو</h3>
        </div>
        <div className="h-56 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tiffany"></div>
        </div>
      </GlassCard>
    );
  }
  
  if (!events || events.length === 0) {
    return (
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-semibold text-lg">رویدادهای پیش رو</h3>
        </div>
        <div className="py-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            در حال حاضر رویداد پیش رویی وجود ندارد.
          </p>
        </div>
      </GlassCard>
    );
  }
  
  // Sort events by date (nearest first)
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });
  
  // Take the first 3 upcoming events
  const upcomingEvents = sortedEvents.slice(0, 3);
  
  // Get the event card background color based on index
  const getEventColorClass = (index: number) => {
    switch (index % 3) {
      case 0:
        return 'bg-tiffany/10 text-tiffany';
      case 1:
        return 'bg-navy/10 text-navy';
      case 2:
        return 'bg-yellow/10 text-yellow-700 dark:text-yellow';
      default:
        return 'bg-tiffany/10 text-tiffany';
    }
  };
  
  // Format event date to Persian
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    
    // Persian month names
    const months = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    
    const month = months[date.getMonth()];
    
    return { day, month };
  };

  return (
    <GlassCard className="p-6 rounded-xl">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-semibold text-lg">رویدادهای پیش رو</h3>
        <button className="text-sm text-tiffany hover:text-tiffany-light transition-colors">مشاهده همه</button>
      </div>
      
      <motion.ul 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {upcomingEvents.map((event, index) => {
          const { day, month } = formatEventDate(event.startDate);
          
          // EventParticipants query
          const { data: participants } = useQuery<User[]>({
            queryKey: [`/api/events/${event.id}/participants`],
          });
          
          return (
            <motion.li 
              key={event.id}
              className="flex items-start"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`min-w-[50px] h-12 rounded-lg ${getEventColorClass(index)} flex flex-col items-center justify-center mr-3`}>
                <span className="text-sm font-bold">{day}</span>
                <span className="text-xs">{month}</span>
              </div>
              <div>
                <h4 className="font-medium text-sm">{event.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {event.startTime} تا {event.endTime} - {event.location}
                </p>
                
                {participants ? (
                  <div className="flex items-center mt-2">
                    <div className="flex -space-x-2 space-x-reverse ml-2">
                      {participants.slice(0, 3).map((user, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden">
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt="شرکت‌کننده" 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-xs">
                              {user.displayName[0]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {participants.length} نفر
                    </span>
                  </div>
                ) : (
                  <div className="flex mt-2">
                    <button 
                      onClick={() => handleJoinEvent(event.id)}
                      className="text-xs text-tiffany font-medium border border-tiffany/20 rounded-full px-3 py-1 hover:bg-tiffany/10 transition-colors"
                    >
                      ثبت‌نام
                    </button>
                  </div>
                )}
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </GlassCard>
  );
}
