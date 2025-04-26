import { useQuery } from "@tanstack/react-query";
import { OrganizationalMetric, Department } from "@/types";
import { motion } from "framer-motion";
import { GlassCard } from "../ui/glass-card";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function HRAnalyticsCards() {
  const { data: departments } = useQuery<Department[]>({
    queryKey: ['/api/departments'],
  });
  
  // If departments exist, get metrics for the first department
  const departmentId = departments && departments.length > 0 ? departments[0].id : undefined;
  
  const { data: metrics, isLoading } = useQuery<OrganizationalMetric[]>({
    queryKey: ['/api/organizational-metrics', departmentId],
    enabled: !!departmentId,
  });
  
  if (isLoading || !metrics || metrics.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <GlassCard key={i} className="p-6 rounded-xl h-44">
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse flex flex-col space-y-4 w-full">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    );
  }
  
  // Get the latest metrics
  const latestMetrics = metrics[0];
  
  // Mock previous metrics for comparison (in a real app, this would come from API)
  const prevParticipationRate = latestMetrics.participationRate - 8;
  const prevHealthRiskIndex = latestMetrics.healthRiskIndex + 5;
  const prevWellBeingScore = latestMetrics.wellBeingScore - 3;
  const prevStressManagementIndex = latestMetrics.stressManagementIndex + 6;
  
  const analyticsData = [
    {
      title: 'نرخ مشارکت کارکنان',
      value: latestMetrics.participationRate,
      unit: '%',
      subtitle: 'از کل کارکنان',
      change: latestMetrics.participationRate - prevParticipationRate,
      color: 'bg-tiffany/10 text-tiffany',
      progressColor: 'bg-tiffany',
      progressValue: latestMetrics.participationRate
    },
    {
      title: 'شاخص ریسک سلامت',
      value: latestMetrics.healthRiskIndex,
      unit: '/100',
      subtitle: latestMetrics.healthRiskIndex <= 30 ? 'پایین' : latestMetrics.healthRiskIndex <= 70 ? 'متوسط' : 'بالا',
      change: prevHealthRiskIndex - latestMetrics.healthRiskIndex,
      color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      progressColor: 'bg-green-500',
      progressValue: latestMetrics.healthRiskIndex
    },
    {
      title: 'شاخص سلامت کارکنان',
      value: latestMetrics.wellBeingScore,
      unit: '/100',
      subtitle: 'میانگین سازمانی',
      change: latestMetrics.wellBeingScore - prevWellBeingScore,
      color: 'bg-tiffany/10 text-tiffany',
      progressColor: 'bg-tiffany',
      progressValue: latestMetrics.wellBeingScore
    },
    {
      title: 'مدیریت استرس',
      value: latestMetrics.stressManagementIndex,
      unit: '/100',
      subtitle: latestMetrics.stressManagementIndex < 50 ? 'نیاز به بهبود' : 'قابل قبول',
      change: prevStressManagementIndex - latestMetrics.stressManagementIndex,
      color: latestMetrics.stressManagementIndex < 50 
        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500',
      progressColor: latestMetrics.stressManagementIndex < 50 ? 'bg-red-500' : 'bg-amber-500',
      progressValue: latestMetrics.stressManagementIndex
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {analyticsData.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <GlassCard className="p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-sm text-slate-500 dark:text-slate-400">{item.title}</h4>
              <div className={`${item.color} px-2 py-1 rounded-full text-xs`}>
                {item.change > 0 ? (
                  <>
                    <ArrowUp className="h-3 w-3 inline-block ml-1" />
                    <span>{Math.abs(item.change)}٪</span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-3 w-3 inline-block ml-1" />
                    <span>{Math.abs(item.change)}٪</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-end">
              <div className="text-3xl font-bold">
                {item.title === 'شاخص ریسک سلامت' && item.value <= 30 ? 'پایین' : item.value}
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-sm mr-2 mb-1">
                {item.unit === '/100' && item.value !== 'پایین' ? `${item.unit}` : item.subtitle}
              </div>
            </div>
            
            <div className="h-2 mt-4 rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div 
                className={`h-2 rounded-full ${item.progressColor}`}
                initial={{ width: "0%" }}
                animate={{ width: `${item.progressValue}%` }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              ></motion.div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
