import { useQuery } from "@tanstack/react-query";
import { Department, OrganizationalMetric } from "@/types";
import { GlassCard } from "../ui/glass-card";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DepartmentalComparisonChart() {
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  
  const { data: departments } = useQuery<Department[]>({
    queryKey: ['/api/departments'],
  });
  
  // For simplicity, we'll just use the metrics data for all departments
  // In a real app, you'd make individual queries for each department
  const { data: allMetrics, isLoading } = useQuery<OrganizationalMetric[]>({
    queryKey: ['/api/organizational-metrics'],
    enabled: !!departments && departments.length > 0,
  });
  
  if (isLoading || !departments || !allMetrics) {
    return (
      <GlassCard className="p-6 rounded-xl">
        <div className="flex justify-between items-start mb-6">
          <h3 className="font-semibold text-lg">مقایسه شاخص‌های سلامت واحدها</h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tiffany"></div>
        </div>
      </GlassCard>
    );
  }
  
  const getDepartmentMetrics = (departmentId: number) => {
    return allMetrics.find(metric => metric.departmentId === departmentId) || {
      participationRate: 0,
      wellBeingScore: 0
    };
  };
  
  // Prepare data for the chart
  const chartData = departments.map(dept => {
    const metrics = getDepartmentMetrics(dept.id);
    return {
      name: dept.name,
      participation: metrics.participationRate,
      health: metrics.wellBeingScore
    };
  });

  return (
    <GlassCard className="p-6 rounded-xl">
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-semibold text-lg">مقایسه شاخص‌های سلامت واحدها</h3>
        <div className="flex space-x-2 space-x-reverse">
          <button 
            className={`text-sm ${timeframe === 'monthly' ? 'text-tiffany font-medium' : 'text-slate-500 dark:text-slate-400 hover:text-tiffany transition-colors'}`}
            onClick={() => setTimeframe('monthly')}
          >
            ماهانه
          </button>
          <button 
            className={`text-sm ${timeframe === 'quarterly' ? 'text-tiffany font-medium' : 'text-slate-500 dark:text-slate-400 hover:text-tiffany transition-colors'}`}
            onClick={() => setTimeframe('quarterly')}
          >
            فصلی
          </button>
          <button 
            className={`text-sm ${timeframe === 'yearly' ? 'text-tiffany font-medium' : 'text-slate-500 dark:text-slate-400 hover:text-tiffany transition-colors'}`}
            onClick={() => setTimeframe('yearly')}
          >
            سالانه
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <div className="flex h-64 items-end justify-between">
          <div className="flex w-full justify-between h-full items-end px-2">
            {chartData.map((dept, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center w-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex h-full items-end mb-2">
                  <motion.div 
                    className="w-8 mx-auto bg-navy rounded-t-md"
                    initial={{ height: 0 }}
                    animate={{ height: `${dept.participation}%` }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  ></motion.div>
                  <motion.div 
                    className="w-8 mx-auto bg-tiffany rounded-t-md -ml-2"
                    initial={{ height: 0 }}
                    animate={{ height: `${dept.health}%` }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  ></motion.div>
                </div>
                <span className="text-xs whitespace-nowrap">{dept.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-4 space-x-8 space-x-reverse">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-navy rounded-sm ml-2"></div>
            <span className="text-xs">مشارکت</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-tiffany rounded-sm ml-2"></div>
            <span className="text-xs">شاخص سلامت</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
