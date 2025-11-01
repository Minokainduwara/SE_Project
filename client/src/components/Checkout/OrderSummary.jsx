import React from 'react';
import OrderItem from './OrderItem';

const OrderSummary = ({ items, subtotal, deliveryFee, total, onBackToCart ,handleProceedToPayment}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      
      <div className="border-b border-gray-200 pb-4">
        {items.map((item, idx) => (
          <OrderItem key={idx} {...item} />
        ))}
      </div>
      
      <div className="py-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold">${subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery fee</span>
          <span className="font-semibold">${deliveryFee}</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
      
      <div className="flex justify-between gap-4 mt-6">
        <button 
          onClick={onBackToCart}
          className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
           BACK TO CART
        </button>

        <button 
          onClick={handleProceedToPayment}
          className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
           PAYMENT
        </button>
      </div>


    </div>

  );
};

export default OrderSummary;