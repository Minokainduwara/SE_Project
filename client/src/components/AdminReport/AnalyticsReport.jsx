import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const AnalyticsReport = () => {
  const reports = [
    {
      title: 'Company Finance Growth',
      value: '+45.14%',
      isPositive: true
    },
    {
      title: 'Company Expenses Ratio',
      value: '0.58%',
      isPositive: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Analytics Report</h3>
      
      <div className="space-y-6">
        {reports.map((report, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{report.title}</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">{report.value}</span>
              {report.isPositive ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsReport;