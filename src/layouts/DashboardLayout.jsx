import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardHeader, DashboardSidebar } from "@components";

const DashboardLayout = ({ hidesidebar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100 relative" key={location.pathname}>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {!hidesidebar && (
        <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
