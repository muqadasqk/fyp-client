"use client";

import { useState } from "react";
import Container from "@components/app/Container";
import DashboardHeader from "@components/dashboard/DashboardHeader";
import DashboardSidebar from "@components/dashboard/DashboardSidebar";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const DashboardLayout = ({ children, title, description }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="d-flex vh-100 bg-light" key={location.pathname}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <DashboardSidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      <Container.Inner className="d-flex flex-column flex-grow-1">
        <DashboardHeader toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <main className="flex-grow-1 overflow-auto p-3">
          <Container>{children}</Container>
        </main>
      </Container.Inner>
    </div>
  );
};

export default DashboardLayout;
