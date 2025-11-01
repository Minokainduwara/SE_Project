import React, { useState } from 'react';
import StatCard from '../components/AdminReport/StatCard';
import UniqueVisitorChart from '../components/AdminReport/UniqueVisitorChart';
import IncomeOverview from '../components/AdminReport/IncomeOverview';
import AnalyticsReport from '../components/AdminReport/AnalyticsReport';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = [
    {
      title: 'Total Page Views',
      value: 4423236,
      change: '59.3%',
      isPositive: true,
      subtitle: 'You made an extra 35,000 this year'
    },
    {
      title: 'Total Users',
      value: 78250,
      change: '70.5%',
      isPositive: true,
      subtitle: 'You made an extra 8,900 this year'
    },
    {
      title: 'Total Order',
      value: 18800,
      change: '27.4%',
      isPositive: true,
      subtitle: 'You made an extra 1,943 this year'
    },
    {
      title: 'Total Sales',
      value: 35078,
      change: '27.4%',
      isPositive: false,
      subtitle: 'You made an extra $20,395 this year'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Unique Visitor Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <UniqueVisitorChart 
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
          />
        </div>

        {/* Income Overview */}
        <div className="lg:col-span-1">
          <IncomeOverview />
        </div>
      </div>

      {/* Analytics Report */}
      <div className="mt-6">
        <AnalyticsReport />
      </div>
    </div>
  );
};

export default AdminDashboard;