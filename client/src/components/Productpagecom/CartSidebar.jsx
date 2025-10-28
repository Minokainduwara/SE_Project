import React from 'react';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function CartSidebar({ showCart, setShowCart, cart, updateQuantity, removeFromCart, getTotalPrice }) {
  return (
    <>
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setShowCart(false)} />
      )}

      <div className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" /> Cart
          </h2>
          <button onClick={() => setShowCart(false)} className="text-gray-600 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.unit}</p>
                  <p className="text-sm font-bold text-green-600">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => updateQuantity(item, item.quantity - 1)} 
                    className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item, item.quantity + 1)} 
                    disabled={item.quantity >= item.stock}
                    className={`${item.quantity >= item.stock ? 'bg-gray-200 cursor-not-allowed opacity-50' : 'bg-gray-200 hover:bg-gray-300'} p-1 rounded`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button onClick={() => removeFromCart(item)} className="text-red-500 hover:text-red-700 ml-2 text-sm">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex justify-between text-lg font-bold text-gray-800 mb-3">
            <span>Total</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">Checkout</button>
        </div>
      </div>
    </>
  );
}