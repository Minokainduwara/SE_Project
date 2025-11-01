// Header.jsx
// Main header component with navigation bar

import React from 'react';
import { Leaf } from 'lucide-react';

/**
 * Header Component
 * 
 * @param {string} activePage - Currently active page
 * @returns {JSX.Element} Header with navigation bar
 */
const Header = ({ activePage = 'Home' }) => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-green-600 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo and Brand */}
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Fresh Market</span>
          </a>

          {/* Navigation Links */}
<nav className="hidden md:flex items-center gap-8">
  {navItems.map((item) => (
    <a
      key={item.name}
      href={item.href}
      className={`text-base font-medium transition-all duration-300 px-3 py-2 rounded-md
        ${
          activePage === item.name
            ? 'bg-white text-green-700'
            : 'text-white hover:bg-white hover:text-green-700'
        }`}
    >
      {item.name}
    </a>
  ))}
</nav>

         {/* Login/Signup */}
<div className="flex items-center gap-1">
  <a
    href="/login"
    className="text-base font-medium text-white px-3 py-2 rounded-md transition-all duration-300 hover:bg-white hover:text-green-700"
  >
    Login
  </a>
  <span className="text-gray-400">|</span>
  <a
    href="/signup"
    className="text-base font-medium text-white px-3 py-2 rounded-md transition-all duration-300 hover:bg-white hover:text-green-700"
  >
    Signup
  </a>
</div>


        </div>
      </div>
    </header>
  );
};

export default Header;