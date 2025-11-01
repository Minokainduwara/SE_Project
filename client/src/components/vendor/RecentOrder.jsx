// src/components/dashboard/RecentOrders.jsx
import React from 'react';

const RecentOrder = ({ orders }) => {
  const defaultOrders = [
    { orderId: 'O102', customer: 'Nuwan P', product: 'Red Rice', quantity: 2, status: 'Panaling', date: '2025-10-12' },
    { orderId: 'O101', customer: 'Nallh Silva', product: 'Potatoes', quantity: 6, status: 'Completed', date: '2025-10-11' },
    { orderId: 'O100', customer: 'Shanika', product: 'Ceylon Tea', quantity: 3, status: 'Cancelled', date: '2025-10-10' }
  ];

  const displayOrders = orders || defaultOrders;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Panaling':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-gray-600 text-sm font-medium py-3 px-4">Order ID</th>
              <th className="text-left text-gray-600 text-sm font-medium py-3 px-4">Customer</th>
              <th className="text-left text-gray-600 text-sm font-medium py-3 px-4">Product</th>
              <th className="text-left text-gray-600 text-sm font-medium py-3 px-4">Quainity</th>
              <th className="text-left text-gray-600 text-sm font-medium py-3 px-4">Status</th>
              <th className="text-left text-gray-600 text-sm font-medium py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.map((order, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">{order.orderId}</td>
                <td className="py-3 px-4 text-gray-900">{order.customer}</td>
                <td className="py-3 px-4 text-gray-900">{order.product}</td>
                <td className="py-3 px-4 text-gray-900">{order.quantity}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-900">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrder;