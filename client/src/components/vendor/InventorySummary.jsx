// src/components/dashboard/InventorySummary.jsx
import React from 'react';

const InventorySummary = ({ inventory }) => {
  const defaultInventory = [
    { product: 'Potatoes 1kg', stock: 8, status: 'New Stock' },
    { product: 'Ceylon Tea', stock: 0, status: 'Out of Stock' }
  ];

  const displayInventory = inventory || defaultInventory;

  const getStatusColor = (status) => {
    switch (status) {
      case 'New Stock':
        return 'bg-green-100 text-green-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Inventory Summary</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-600 text-sm font-medium py-3 px-4">Product</th>
              <th className="text-left text-gray-600 text-sm font-medium py-3 px-4">Stock</th>
              <th className="text-left text-gray-600 text-sm font-medium py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayInventory.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">{item.product}</td>
                <td className="py-3 px-4 text-gray-900">{item.stock}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventorySummary;