
// Top vendors section component

import React from 'react';
import VendorCard from './VendorCard';

/**
 * TopVendors Component
 * 
 * @param {Array} vendors - Array of vendor objects
 * @returns {JSX.Element} Top vendors section
 */
const TopVendors = ({ vendors }) => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-10">
          Top Vendors
        </h2>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors && vendors.length > 0 ? (
            vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No vendors available at the moment.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default TopVendors;