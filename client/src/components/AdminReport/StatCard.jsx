import React from 'react';

const StatCard = ({ title, value, change, isPositive, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-gray-600">{title}</p>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? '+' : ''}{change}
        </span>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">
        {value.toLocaleString()}
      </h3>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  );
};

export default StatCard;