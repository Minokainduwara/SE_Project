// ProductTable.jsx - Fixed Version
// Complete table component with header and rows

import React from 'react';

/**
 * ProductTable Component
 * 
 * @param {Array} products - Array of product objects
 * @param {Function} onEdit - Function to handle edit action
 * @param {Function} onDelete - Function to handle delete action
 * @returns {JSX.Element} Complete products table
 */
function ProductTable({ products = [], onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Image
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                {/* Actions - no header text */}
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => {
                const { id, image, name, category, price, stock, status, emoji } = product;
                
                return (
                  <tr 
                    key={id} 
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    {/* Product Image */}
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        {image ? (
                          <img 
                            src={image} 
                            alt={name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">{emoji || '📦'}</span>
                        )}
                      </div>
                    </td>

                    {/* Product Name */}
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium">{name}</span>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{category}</span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <span className="text-gray-900 font-medium">
                        Rs: {typeof price === 'number' ? price.toFixed(2) : '0.00'}
                      </span>
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{stock}</span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                          status === 'Active'
                            ? 'text-green-700 bg-green-50'
                            : 'text-red-700 bg-red-50'
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onEdit(product)}
                          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  No products found. Click "Add Product" to create your first product.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;