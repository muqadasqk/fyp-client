import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container, DashboardHeader, DashboardSidebar } from "@components";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="d-flex vh-100 bg-light" key={location.pathname}>
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Container fluid className="d-flex flex-column flex-grow-1">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main className="flex-grow-1 overflow-auto p-3">
          <Container>
            <Outlet />
          </Container>
        </main>
      </Container>
    </div>
  );
};

export default DashboardLayout;
