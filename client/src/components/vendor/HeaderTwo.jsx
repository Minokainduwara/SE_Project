import React, { useState } from 'react';
import { Search, Bell, RefreshCw, ChevronDown, User, Settings, LogOut } from 'lucide-react';

const HeaderTwo = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState(3); // Unread notifications count

  // Mock vendor data
  const vendorData = {
    name: "John Smith",
    email: "john.smith@vendor.com",
    shopName: "Fresh Fruits Market",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" // Using avatar generator
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left Section - Title and Search */}
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-gray-900">Vendor Dashboard</h1>
          </div>

          {/* Right Section - Actions and Profile */}
          <div className="flex items-center gap-4">
            {/* Refresh Button */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notifications */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {notifications}
                </span>
              )}
            </button>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-300"></div>

            {/* Vendor Profile Section */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                {/* Profile Info */}
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{vendorData.name}</p>
                  <p className="text-xs text-gray-500">{vendorData.shopName}</p>
                </div>

                {/* Profile Picture */}
                <div className="relative">
                  <img
                    src={vendorData.profileImage}
                    alt={vendorData.name}
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* Dropdown Arrow */}
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* User Info in Dropdown */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{vendorData.name}</p>
                    <p className="text-xs text-gray-500">{vendorData.email}</p>
                    <p className="text-xs text-blue-600 mt-1">{vendorData.shopName}</p>
                  </div>
                  </div>
                 )};
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTwo;