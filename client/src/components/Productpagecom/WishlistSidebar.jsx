import React from 'react';
import { X, Heart, ShoppingCart } from 'lucide-react';

export default function WishlistSidebar({ showWishlist, setShowWishlist, wishlist, addToCart, removeFromWishlist }) {
  return (
    <>
      {showWishlist && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setShowWishlist(false)} />
      )}

      <div className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${showWishlist ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-pink-500" /> Wishlist
          </h2>
          <button onClick={() => setShowWishlist(false)} className="text-gray-600 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-100px)]">
          {wishlist.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your wishlist is empty.</p>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.unit}</p>
                  <p className="text-sm font-bold text-green-600">${item.price}</p>
                  {item.stock === 0 && (
                    <p className="text-xs text-red-500 font-semibold mt-1">Out of Stock</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => addToCart(item)} 
                    disabled={item.stock === 0}
                    className={`${item.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white p-2 rounded-lg flex items-center space-x-1 transition`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm">{item.stock === 0 ? 'Out' : 'Add'}</span>
                  </button>
                  <button onClick={() => removeFromWishlist(item)} className="text-red-500 hover:text-red-700 ml-2 text-sm">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}