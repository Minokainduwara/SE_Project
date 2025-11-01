import React from 'react';
import { ShoppingCart } from 'lucide-react';

const EmptyCart = ({ onContinueShopping }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
        <ShoppingCart className="w-16 h-16 text-gray-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Bag is Empty</h2>
      <p className="text-gray-600 mb-8">Add some items to get started!</p>
      <button
        onClick={onContinueShopping}
        className="px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;