// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import RecentOrder from "../components/vendor/RecentOrder";
import SalesChart from "../components/vendor/SalesChart";
import InventorySummary from "../components/vendor/InventorySummary";
import TopProducts from "../components/vendor/TopProducts";
import Cunneints from "../components/vendor/Cunneints";
import StatsCards from "../components/vendor/StatsCards";
import Sidebar from "../components/vendor/Sidebar";
import HeaderTwo from "../components/vendor/HeaderTwo";
import DashboardLayout from "../components/vendor/DashboardLayout";

const Vendordashboard = () => {
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
        <StatsCards stats={dashboardData.stats} />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders - 2/3 width */}
          <div className="lg:col-span-2">
            <RecentOrder orders={dashboardData.orders} />
          </div>

          {/* Sales Chart - 1/3 width */}
          <div className="lg:col-span-1">
            <SalesChart />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InventorySummary inventory={dashboardData.inventory} />
          <TopProducts products={dashboardData.topProducts} />
          <Cunneints testimonials={dashboardData.testimonials} />
        </div>
      </main>
    </div>
  </div>
);
};

export default Vendordashboard;
