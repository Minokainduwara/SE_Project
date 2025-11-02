import React from 'react';
import { Heart, Plus, Store } from 'lucide-react';

export default function ProductCard({ product, addToCart, toggleWishlist, isInWishlist }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 relative">
      <button onClick={() => toggleWishlist(product)} className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow hover:shadow-md transition">
        <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
      </button>
      <div className="text-6xl text-center mb-3">
        <img
        src={product.image}
        alt={product.name}
        />
        </div>
      <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
      <div className="flex items-center text-xs text-gray-500 mb-2">
        <Store className="w-3 h-3 mr-1" />
        <span>{product.vendor}</span>
      </div>
      <p className="text-sm text-gray-500 mb-1">{product.unit}</p>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 text-sm">★</span>
        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
        <span className="text-xs text-gray-400 ml-2">({product.stock} in stock)</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-xl font-bold text-green-600">Rs.{product.price}</span>
        <button onClick={() => addToCart(product)} disabled={product.stock === 0} className={`${product.stock === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded-lg transition flex items-center space-x-1`}>
          <Plus className="w-4 h-4" />
          <span>{product.stock === 0 ? 'Out' : 'Add'}</span>
        </button>
      </div>
    </div>
  );
}
