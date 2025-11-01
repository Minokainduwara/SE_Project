// VendorCard.jsx
// Individual vendor card component

import React from 'react';
import { Star } from 'lucide-react';

/**
 * VendorCard Component
 * 
 * @param {Object} vendor - Vendor data
 * @returns {JSX.Element} Vendor card
 */
const VendorCard = ({ vendor }) => {
  const { id, name, rating, icon, description } = vendor;

  // Render stars based on rating
  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
      
      {/* Vendor Icon/Logo */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        {icon ? (
          icon
        ) : (
          <span className="text-3xl">{vendor.emoji || '🏪'}</span>
        )}
      </div>

      {/* Vendor Name */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>

      {/* Rating */}
      <div className="mb-3">
        {renderStars()}
      </div>

      {/* Description (optional) */}
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      
    </div>
  );
};

export default VendorCard;