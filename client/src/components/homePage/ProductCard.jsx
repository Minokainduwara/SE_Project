// ProductCard.jsx
// Individual product card component

import React from 'react';

/**
 * ProductCard Component
 * 
 * @param {Object} product - Product data
 * @param {Function} onAddToCart - Function to handle add to cart
 * @returns {JSX.Element} Product card
 */
const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, price, image, emoji } = product;

  return (
    <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="bg-white rounded-lg h-48 flex items-center justify-center mb-4">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-6xl">{emoji || '🛒'}</span>
        )}
      </div>

      {/* Product Info */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-xl font-bold text-gray-900 mb-4">LKR {price}</p>

      {/* Add to Cart Button */}
      <button
        onClick={() => onAddToCart(product)}
        className="w-full bg-green-700 text-white py-2.5 rounded-lg font-medium hover:bg-green-800 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;