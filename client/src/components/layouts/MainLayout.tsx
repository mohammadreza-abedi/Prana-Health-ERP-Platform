import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";
import TopBar from "./TopBar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar for desktop */}
      <Sidebar />
      
      {/* Mobile bottom navbar */}
      <MobileNavbar />
      
      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 max-w-[1400px] mx-auto">
        {/* Top navigation bar */}
        <TopBar />
        
        {/* Page content */}
        {children}
      </main>
    </div>
  );
}
