import React from 'react';
import { Store, Search } from 'lucide-react';

export default function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="bg-green-600 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <Store className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Online Grocery Marketplace</h1>
            <p className="text-xs text-green-100">Multi-Vendor Platform</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
      </div>
    </header>
  );
}
