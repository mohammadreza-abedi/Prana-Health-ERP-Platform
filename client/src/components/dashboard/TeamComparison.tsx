/**
 * @file TeamComparison.tsx
 * @description کامپوننت مقایسه تیمی
 * 
 * این کامپوننت مقایسه شاخص‌های سلامت کاربر را با میانگین تیم نمایش می‌دهد.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCircle2, 
  TrendingUp, 
  Medal, 
  Flag, 
  Crown,
  Award,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LabelList 
} from 'recharts';
import { useQuery } from '@tanstack/react-query';

interface TeamComparisonProps {
  userId?: number;
  isLoading: boolean;
}

// کامپوننت مقایسه تیمی
const TeamComparison: React.FC<TeamComparisonProps> = ({ userId, isLoading }) => {
  // دریافت اطلاعات اعضای تیم
  const { data: teamMembers, isLoading: isLoadingTeam } = useQuery({
    queryKey: ['/api/users/sample'],
    enabled: !!userId,
  });
  
  // داده‌های نمونه برای مقایسه تیمی
  const comparisonData = [
    { 
      name: 'قدم روزانه', 
      user: 9500, 
      average: 7800, 
      top: 12000,
      unit: 'قدم'
    },
    { 
      name: 'ساعات خواب', 
      user: 6.7, 
      average: 7.2, 
      top: 8.1,
      unit: 'ساعت'
    },
    { 
      name: 'سطح استرس', 
      user: 35, 
      average: 45, 
      top: 22,
      unit: 'درصد',
      lowerIsBetter: true
    },
    { 
      name: 'تکمیل چالش', 
      user: 70, 
      average: 55, 
      top: 92,
      unit: 'درصد'
    },
    { 
      name: 'امتیاز کلی', 
      user: 82, 
      average: 71, 
      top: 94,
      unit: 'نمره'
    },
  ];
  
  // آماده‌سازی داده‌ها برای نمودار
  const chartData = comparisonData.map(item => ({
    name: item.name,
    'شما': item.user,
    'میانگین تیم': item.average,
    'بهترین عملکرد': item.top,
    unit: item.unit,
    lowerIsBetter: item.lowerIsBetter
  }));
  
  // محاسبه رتبه کاربر در تیم
  const userRank = 3;
  const teamSize = 12;
  
  // وضعیت بارگذاری
  if (isLoading || isLoadingTeam) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-[200px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
      </div>
    );
  }
  
  // نمایش وضعیت مقایسه تیمی
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* نمودار مقایسه‌ای */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#00000011" />
            <XAxis type="number" domain={[0, 'dataMax']} />
            <YAxis dataKey="name" type="category" width={70} />
            <Tooltip 
              formatter={(value, name, props) => {
                return [`${value} ${props.payload.unit}`, name];
              }}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #f0f0f0',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Bar dataKey="میانگین تیم" fill="#A3A3A3" radius={[0, 4, 4, 0]} />
            <Bar dataKey="شما" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="بهترین عملکرد" fill="#10B981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* رتبه کاربر در تیم */}
      <div className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent rounded-lg p-4 border border-blue-100 dark:border-blue-800/30">
        <div className="flex items-start space-x-3 rtl:space-x-reverse">
          <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
            <Medal className="h-6 w-6 text-amber-500" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium">رتبه {userRank} از {teamSize}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              شما در میان {teamSize} نفر از اعضای تیم، رتبه {userRank} را در شاخص‌های سلامت دارید.
            </p>
          </div>
        </div>
      </div>
      
      {/* مقایسه شاخص به شاخص */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium flex items-center">
          <Flag className="h-5 w-5 mr-2 text-purple-500" />
          مقایسه شاخص‌های کلیدی با میانگین تیم
        </h3>
        
        {comparisonData.map((item, index) => {
          // محاسبه وضعیت مقایسه
          const diff = item.user - item.average;
          const percentDiff = Math.round((diff / item.average) * 100);
          const isPositive = item.lowerIsBetter ? diff < 0 : diff > 0;
          const isEqual = diff === 0;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="text-right text-sm">
                  <span className="font-bold">{item.user} {item.unit}</span>
                  <span className="text-gray-500 dark:text-gray-400 mx-1">|</span>
                  <span className="text-gray-600 dark:text-gray-400">میانگین: {item.average}</span>
                </div>
                
                <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isEqual ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                  isPositive ? 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300' :
                  'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300'
                }`}>
                  {isEqual ? (
                    <Minus className="h-3 w-3 mr-1" />
                  ) : isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  
                  {isEqual ? 'برابر' : `${Math.abs(percentDiff)}% ${isPositive ? 'بهتر' : 'ضعیف‌تر'}`}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* برترین‌های تیم */}
      <div>
        <h3 className="text-sm font-medium flex items-center mb-3">
          <Crown className="h-5 w-5 mr-2 text-amber-500" />
          افراد برتر تیم
        </h3>
        
        <div className="space-y-2">
          {[
            { name: 'علی محمدی', score: 94, avatar: null },
            { name: 'سارا رضایی', score: 89, avatar: null },
            { name: 'میلاد کریمی', score: 85, avatar: null },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-lg border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 text-xs font-medium">
                  {index + 1}
                </span>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="h-8 w-8 rounded-full" />
                  ) : (
                    <UserCircle2 className="h-8 w-8 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">{member.name}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 text-xs font-medium">
                  {member.score} امتیاز
                </span>
                
                {index === 0 && (
                  <Award className="h-5 w-5 text-amber-500 ml-2" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamComparison;