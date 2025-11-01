// Footer.jsx
// Footer component for Online Grocery Marketplace

import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

/**
 * Footer Component
 * 
 * @returns {JSX.Element} Footer with multiple sections
 */
const Footer = () => {
  return (
    <footer className="bg-green-600 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand and Contact Section */}
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-bold mb-6">Fresh Market</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
              <p className="text-green-100 mb-2">
                Visit our{' '}
                <a 
                  href="/support" 
                  className="underline hover:text-white transition-colors"
                >
                  Customer Support
                </a>
              </p>
              <p className="text-green-100 mb-4">for assistance or call us at</p>
              <a 
                href="tel:123-456-7890" 
                className="text-2xl font-bold hover:text-green-100 transition-colors"
              >
                0555 746 598
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-8">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-green-200 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Menu Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Menu</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/deals" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Deals
                </a>
              </li>
              <li>
                <a 
                  href="/food" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Food
                </a>
              </li>
              <li>
                <a 
                  href="/beverages" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Beverages
                </a>
              </li>
              <li>
                <a 
                  href="/household" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Household
                </a>
              </li>
              <li>
                <a 
                  href="/personal-care" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Personal Care
                </a>
              </li>
              <li>
                <a 
                  href="/my-orders" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  My Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/vegetables" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Vegetables
                </a>
              </li>
              <li>
                <a 
                  href="/bakery" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Bakery
                </a>
              </li>
              <li>
                <a 
                  href="/wine" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Wine
                </a>
              </li>
              <li>
                <a 
                  href="/dairy-eggs" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Dairy & Eggs
                </a>
              </li>
              <li>
                <a 
                  href="/meat-poultry" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Meat & Poultry
                </a>
              </li>
              <li>
                <a 
                  href="/soft-drinks" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Soft Drinks
                </a>
              </li>
              <li>
                <a 
                  href="/cleaning-supplies" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Cleaning Supplies
                </a>
              </li>
              <li>
                <a 
                  href="/cereal-snacks" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Cereal & Snacks
                </a>
              </li>
            </ul>
          </div>

          {/* Info Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Info</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/faq" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/support" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Customer Support
                </a>
              </li>
              <li>
                <a 
                  href="/locations" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Locations
                </a>
              </li>
            </ul>
          </div>

          {/* My Choice Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">My Choice</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/favorites" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  Favorites
                </a>
              </li>
              <li>
                <a 
                  href="/my-orders" 
                  className="text-green-100 hover:text-white transition-colors"
                >
                  My Orders
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-green-500 text-center">
          <p className="text-green-100">
            &copy; {new Date().getFullYear()} Fresh Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;