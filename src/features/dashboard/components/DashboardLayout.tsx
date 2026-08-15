import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/DashboardLayout.css";
import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="dashboardLayout">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <div className={`dashboardMain ${isCollapsed ? "dashboardMainExpanded" : ""}`}>
        <Header onOpenMobileSidebar={() => setIsMobileOpen(true)} />
        <main className="dashboardContent">{children ?? <Outlet />}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;