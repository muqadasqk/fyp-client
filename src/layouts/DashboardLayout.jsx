import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DashboardHeader, DashboardSidebar } from "@components";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div key={location.pathname}>
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div>
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main>
          <div>
            <Outlet />
          </div>
        </main>
      </div >
    </div>
  );
};

export default DashboardLayout;
