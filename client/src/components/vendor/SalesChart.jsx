// src/components/dashboard/SalesChart.jsx
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const SalesChart = () => {
  const [period, setPeriod] = useState('This Week');

  const data = [
    { name: 'Sep', value: 7000 },
    { name: 'Seb', value: 6500 },
    { name: 'Sep', value: 8000 },
    { name: 'Sug', value: 10000 },
    { name: 'Sec', value: 9000 },
    { name: 'Sep', value: 9500 },
    { name: 'Sec', value: 8000 }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Sales Performance</h2>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            formatter={(value) => [`LKR ${value.toLocaleString()}`, 'Sales']}
          />
          <Bar dataKey="value" fill="#16a34a" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;