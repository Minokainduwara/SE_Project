import React from 'react';

const StatsCards = ({ stats }) => {
  const defaultStats = [
    { label: 'Total Products', value: '35' },
    { label: 'Pending Orders', value: '6' },
    { label: 'Total Sales', value: 'LKR 120,000' },
    { label: 'Customer Rating', value: '4.8 / 5.0' }
  ];

  const displayStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {displayStats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;