import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IncomeOverview = () => {
  const data = [
    { day: 'Mo', amount: 7200 },
    { day: 'Tu', amount: 8500 },
    { day: 'We', amount: 6800 },
    { day: 'Th', amount: 5900 },
    { day: 'Fr', amount: 7500 },
    { day: 'Sa', amount: 6200 },
    { day: 'Su', amount: 8100 }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Income Overview</h3>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">This Week Statistics</p>
        <h2 className="text-3xl font-bold text-gray-900">Rs.7,650</h2>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="day" stroke="#666" style={{ fontSize: '12px' }} />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="amount" fill="#6ee7b7" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeOverview;