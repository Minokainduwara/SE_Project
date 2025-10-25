import React, { useState } from "react";
import {
  Home,
  Package,
  PlusSquare,
  ShoppingBag,
  CreditCard,
  Star,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Products", icon: Package },
    { name: "Add Product", icon: PlusSquare },
    { name: "Profile", icon: User },
  ];

  return (
    <div className="w-64 bg-green-800 text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="text-green-800 font-bold text-xl">🥬</span>
        </div>
        <h1 className="text-xl font-bold">Fresh Market</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                activeItem === item.name
                  ? "bg-green-700"
                  : "hover:bg-green-700/50"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-700/50">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
