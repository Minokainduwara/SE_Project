import React from 'react';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, addToCart, toggleWishlist, isInWishlist }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} addToCart={addToCart} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />
      ))}
    </div>
  );
}
