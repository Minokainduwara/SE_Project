import React from 'react';

const OrderItem = ({ name, price, originalPrice, image, quantity }) => {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
        {image}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">${price}</p>
        {quantity && <p className="text-xs text-gray-500">Qty: {quantity}</p>}
      </div>
      <div className="text-right">
        {originalPrice && originalPrice !== price && (
          <p className="text-gray-400 line-through text-sm">Rs.{originalPrice}</p>
        )}
        <p className="font-semibold text-gray-900">Rs.{price}</p>
      </div>
    </div>
  );
};

export default OrderItem;