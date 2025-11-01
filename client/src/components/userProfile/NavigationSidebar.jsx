import React from 'react';
import { User, ShoppingBag, Heart, Star, LogOut, ChevronRight } from 'lucide-react';

const NavigationSidebar = ({ activePage, setActivePage, onLogout, userInfo, onProfilePhotoUpdate }) => {
  const menuItems = [
    { id: 'profile', icon: User, label: 'My Profile' },
    { id: 'orders', icon: ShoppingBag, label: 'My Orders' },
    { id: 'wishlist', icon: Heart, label: 'My Wishlist' },
    { id: 'reviews', icon: Star, label: 'Reviews' }
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onProfilePhotoUpdate(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-6">
      {/* User Info */}
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
        <div className="relative">
          {userInfo.profilePhoto ? (
            <img
              src={userInfo.profilePhoto}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
              {userInfo.firstName.charAt(0)}{userInfo.lastName.charAt(0)}
            </div>
          )}
          <label
            htmlFor="profilePhotoUpload"
            className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-800 transition-colors"
          >
            <span className="text-white text-xs">📷</span>
          </label>
          <input
            id="profilePhotoUpload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="font-bold text-lg text-gray-900 truncate">
            {userInfo.firstName} {userInfo.lastName}
          </h3>
          <p className="text-sm text-gray-500 truncate">{userInfo.email}</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-5 h-5" />}
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-6"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NavigationSidebar;