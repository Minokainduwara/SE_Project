import React from 'react';
import { Search, Bell, RefreshCw } from 'lucide-react';

const HeaderTwo = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search Products or Orders"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} className="text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <RefreshCw size={20} className="text-gray-600" />
        </button>
        <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">V</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderTwo;