// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/vendor/Sidebar";
import HeaderTwo from "../components/vendor/HeaderTwo";
import BusinessInformation from "../components/vendor/BusinessInformation";
import ImageUpload from "../components/vendor/ImageUpload";
import ContactInformation from "../components/vendor/ContactInformation";
import Footer from "../components/homePage/footer";


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
    <div className="min-h-screen bg-white">
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

        </main>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default VendorProfile;
