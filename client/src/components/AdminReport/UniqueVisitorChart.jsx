import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const UniqueVisitorChart = ({ selectedPeriod, setSelectedPeriod }) => {
  const weekData = [
    { day: 'Mon', pageViews: 45, sessions: 30 },
    { day: 'Tue', pageViews: 52, sessions: 45 },
    { day: 'Wed', pageViews: 38, sessions: 35 },
    { day: 'Thu', pageViews: 65, sessions: 50 },
    { day: 'Fri', pageViews: 95, sessions: 70 },
    { day: 'Sat', pageViews: 105, sessions: 85 },
    { day: 'Sun', pageViews: 88, sessions: 65 }
  ];

  const monthData = [
    { day: 'Week 1', pageViews: 250, sessions: 180 },
    { day: 'Week 2', pageViews: 320, sessions: 240 },
    { day: 'Week 3', pageViews: 280, sessions: 210 },
    { day: 'Week 4', pageViews: 380, sessions: 290 }
  ];

  const data = selectedPeriod === 'week' ? weekData : monthData;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900">Unique Visitor</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === 'month'
                ? 'bg-gray-100 text-gray-700'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === 'week'
                ? 'bg-blue-500 text-white'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" stroke="#666" style={{ fontSize: '12px' }} />
          <YAxis stroke="#666" style={{ fontSize: '12px' }} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="pageViews" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fill="#3b82f6"
            fillOpacity={0.1}
            name="Page Views"
          />
          <Line 
            type="monotone" 
            dataKey="sessions" 
            stroke="#8b5cf6" 
            strokeWidth={2}
            name="Sessions"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UniqueVisitorChart;