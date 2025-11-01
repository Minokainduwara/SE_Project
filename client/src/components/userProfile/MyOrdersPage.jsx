import React from 'react';

const MyOrdersPage = () => {
  const orders = [
    {
      id: 'ORD-001',
      date: '2025-10-25',
      status: 'Delivered',
      total: 145.99,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2025-10-28',
      status: 'Shipped',
      total: 89.50,
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2025-10-30',
      status: 'Processing',
      total: 234.75,
      items: 5
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{order.id}</h3>
                <p className="text-sm text-gray-500">Order Date: {order.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{order.items} items</p>
                <p className="text-lg font-bold text-gray-900">Rs.{order.total.toFixed(2)}</p>
              </div>
              <button className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;