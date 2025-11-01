// ProductsPagination.jsx
// Pagination component for products list

import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * ProductsPagination Component
 * 
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {number} totalItems - Total number of items
 * @param {number} itemsPerPage - Items displayed per page
 * @param {Function} onPageChange - Function to handle page changes
 * @returns {JSX.Element} Pagination controls
 */
const ProductsPagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  totalItems = 4,
  itemsPerPage = 4,
  onPageChange 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-end gap-4 py-4">
      
      {/* Page Info */}
      <span className="text-gray-700 font-medium">
        {startItem}-{endItem} of {totalItems}
      </span>

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
      
    </div>
  );
};

export default ProductsPagination;