// src/components/dashboard/TopProducts.jsx
import React from 'react';
import { Package, Apple } from 'lucide-react';

const TopProducts = ({ products }) => {
  const defaultProducts = [
    { name: 'Fresh P...', icon: '📦', rating: 4.6, sales: null },
    { name: 'Apples', icon: '🍎', rating: null, sales: 120 }
  ];

  const displayProducts = products || defaultProducts;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Top Products</h2>
      <div className="space-y-4">
        {displayProducts.map((product, index) => (
          <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center text-2xl">
              {product.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              {product.rating && (
                <p className="text-sm text-gray-600">⭐ {product.rating}</p>
              )}
              {product.sales && (
                <p className="text-sm text-gray-600">{product.sales} sales</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;