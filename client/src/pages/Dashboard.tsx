import { useState, useEffect } from "react";
import { HealthSummaryIsland } from "@/components/islands/HealthSummaryIsland";
import { TeamHealthIsland } from "@/components/islands/TeamHealthIsland";
import { HSEPerformanceIsland } from "@/components/islands/HSEPerformanceIsland";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* جزیره خلاصه وضعیت سلامت فردی */}
      <div className="col-span-12 lg:col-span-8">
        <HealthSummaryIsland />
      </div>
      
      {/* جزیره سلامت تیمی */}
      <div className="col-span-12 lg:col-span-4">
        <TeamHealthIsland />
      </div>
      
      {/* جزیره عملکرد HSE */}
      <div className="col-span-12">
        <HSEPerformanceIsland />
      </div>
    </div>
  );
};

export default Dashboard;