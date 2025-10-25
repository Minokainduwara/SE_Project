// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/vendor/Sidebar";
import HeaderTwo from "../components/vendor/HeaderTwo";
import BusinessInformation from "../components/vendor/BusinessInformation";
import ImageUpload from "../components/vendor/ImageUpload";
import ContactInformation from "../components/vendor/ContactInformation";
import ActionButtons from "../components/vendor/ActionButtons";

const VendorProfile = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    orders: null,
    inventory: null,
    topProducts: null,
    testimonials: null,
  });

  useEffect(() => {
    // Fetch dashboard data from API
    // Example: fetchDashboardData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HeaderTwo />
        

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats Cards */}
          <ImageUpload/>
          <BusinessInformation stats={dashboardData.stats} />

          {/* Bottom Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionButtons inventory={dashboardData.inventory} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorProfile;
