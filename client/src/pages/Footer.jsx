import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white rounded-lg p-2">
                <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xl"><img src="assets/images/logo.png"/></span>
                </div>
              </div>
              <span className="text-white font-bold text-xl">Freshoria</span>
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Your trusted online shopping destination for quality products and exceptional service.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="bg-green-700 p-2 rounded-full hover:bg-green-600 transition duration-200">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-green-700 p-2 rounded-full hover:bg-green-600 transition duration-200">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-green-700 p-2 rounded-full hover:bg-green-600 transition duration-200">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-green-700 p-2 rounded-full hover:bg-green-600 transition duration-200">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-green-100 hover:text-white transition duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-green-100 hover:text-white transition duration-200">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="text-green-100 hover:text-white transition duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-green-100 hover:text-white transition duration-200">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-green-100 hover:text-white transition duration-200">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white transition duration-200">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white transition duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white transition duration-200">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-green-100 hover:text-white transition duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-green-300 mt-1 flex-shrink-0" />
                <span className="text-green-100 text-sm">
                  123 Shopping Street, City, State 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-green-300 flex-shrink-0" />
                <span className="text-green-100 text-sm">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-green-300 flex-shrink-0" />
                <span className="text-green-100 text-sm">info@mernshop.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-green-200 text-sm text-center md:text-left">
              © 2024 MERN Shop. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-green-200 hover:text-white transition duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-green-200 hover:text-white transition duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-green-200 hover:text-white transition duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}