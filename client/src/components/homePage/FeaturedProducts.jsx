// FeaturedProducts.jsx
// Featured products section component

import React from 'react';
import ProductCard from './ProductCard';

/**
 * FeaturedProducts Component
 * 
 * @param {Array} products - Array of product objects
 * @param {Function} onAddToCart - Function to handle add to cart
 * @returns {JSX.Element} Featured products section
 */
const FeaturedProducts = ({ products, onAddToCart }) => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          Featured Products
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No products available at the moment.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;