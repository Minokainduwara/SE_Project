import React from 'react';  
import { Store, Filter, Heart, ShoppingCart, Search } from 'lucide-react';

export default function Header({
  wishlistCount,
  cartCount,
  showFilters,
  setShowFilters,
  setShowCart,
  setShowWishlist,
  searchTerm,
  setSearchTerm
}) {
  return (
    <header className="bg-green-600 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Store className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Online Grocery Marketplace</h1>
              <p className="text-xs text-green-100">Multi-Vendor Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden bg-green-700 hover:bg-green-800 px-3 py-2 rounded-lg transition">
              <Filter className="w-5 h-5" />
            </button>

            <button onClick={() => { setShowWishlist(prev => !prev); setShowCart(false); }} className="relative bg-green-700 hover:bg-green-800 px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2 transition">
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">Wishlist</span>
              {wishlistCount > 0 && <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>}
            </button>

            <button onClick={() => { setShowCart(prev => !prev); setShowWishlist(false); }} className="relative bg-green-700 hover:bg-green-800 px-3 md:px-4 py-2 rounded-lg flex items-center space-x-2 transition">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </button>
          </div>
        </div>

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
