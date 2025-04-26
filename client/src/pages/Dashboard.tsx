import { useAuth } from "@/lib/useAuth";
import DashboardUserSummary from "@/components/dashboard/DashboardUserSummary";
import HealthSummaryCard from "@/components/dashboard/HealthSummaryCard";
import WeeklyProgressCard from "@/components/dashboard/WeeklyProgressCard";
import DailyChallengeCard from "@/components/dashboard/DailyChallengeCard";
import BadgesCard from "@/components/dashboard/BadgesCard";
import LeaderboardCard from "@/components/dashboard/LeaderboardCard";
import UpcomingEventsCard from "@/components/dashboard/UpcomingEventsCard";
import HRAnalyticsCards from "@/components/dashboard/HRAnalyticsCards";
import DepartmentalComparisonChart from "@/components/dashboard/DepartmentalComparisonChart";

export default function Dashboard() {
  const { user } = useAuth();
  const showHRDashboard = user && ['hr', 'hse', 'admin'].includes(user.role);
  
  return (
    <>
      {/* User welcome and profile summary */}
      <DashboardUserSummary />
      
      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Health Status */}
        <div className="space-y-6">
          <HealthSummaryCard />
          <WeeklyProgressCard />
        </div>
        
        {/* Column 2: Gamification */}
        <div className="space-y-6">
          <DailyChallengeCard />
          <BadgesCard />
        </div>
        
        {/* Column 3: Leaderboard and Events */}
        <div className="space-y-6">
          <LeaderboardCard />
          <UpcomingEventsCard />
        </div>
      </div>
      
      {/* HR/HSE Manager Dashboard Preview */}
      {showHRDashboard && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">داشبورد مدیران HR/HSE</h2>
            <button className="text-sm text-tiffany hover:text-tiffany-light transition-colors flex items-center">
              <span>مشاهده کامل</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          
          <HRAnalyticsCards />
          <DepartmentalComparisonChart />
        </div>
      )}
    </>
  );
}
