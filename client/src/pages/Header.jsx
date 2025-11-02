import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2">
              <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
            </div>
            <span className="text-white font-bold text-xl">MERN Shop</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-green-100 transition duration-200 font-medium">
              HOME
            </a>
            <a href="/products" className="text-white hover:text-green-100 transition duration-200 font-medium">
              Product Page
            </a>
            <a href="/about" className="text-white hover:text-green-100 transition duration-200 font-medium">
              About Us
            </a>
            <a href="/contact" className="text-white hover:text-green-100 transition duration-200 font-medium">
              Contact Us
            </a>
          </div>

          {/* Sign In and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition duration-200 font-medium">
              <User size={18} />
              <span>Sign In</span>
            </button>
            <button className="relative bg-green-700 text-white p-2 rounded-lg hover:bg-green-800 transition duration-200">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="text-white hover:text-green-100 transition duration-200 font-medium py-2">
                HOME
              </a>
              <a href="#products" className="text-white hover:text-green-100 transition duration-200 font-medium py-2">
                Product Page
              </a>
              <a href="#about" className="text-white hover:text-green-100 transition duration-200 font-medium py-2">
                About Us
              </a>
              <a href="#contact" className="text-white hover:text-green-100 transition duration-200 font-medium py-2">
                Contact Us
              </a>
              <div className="flex flex-col space-y-2 pt-2 border-t border-green-500">
                <button className="flex items-center justify-center space-x-2 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition duration-200 font-medium">
                  <User size={18} />
                  <span>Sign In</span>
                </button>
                <button className="relative flex items-center justify-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-200">
                  <ShoppingCart size={18} />
                  <span>Cart (3)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}