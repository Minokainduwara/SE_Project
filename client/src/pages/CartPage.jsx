import React, { useState } from 'react';
import CartItemRow from '../components/Cart/CartItemRow';
import EmptyCart from '../components/Cart/EmptyCart';
import Header from '../components/homePage/Header';
import Footer from '../components/homePage/footer';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Organic Milk',
      unit: '1 gallon',
      price: 350,
      quantity: 2,
      image: <div className="text-4xl">🥛</div>
    },
    {
      id: 2,
      name: 'Bananas',
      unit: 'A bunch',
      price: 190,
      quantity: 1,
      image: <div className="text-4xl">🍌</div>
    },
    {
      id: 3,
      name: 'Avocados',
      unit: '2 pieces',
      price: 150,
      quantity: 3,
      image: <div className="text-4xl">🥑</div>
    },
    {
      id: 4,
      name: 'Potato Chips',
      unit: '1 bag',
      price: 240,
      quantity: 1,
      image: <div className="text-4xl">🥔</div>
    }
  ]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    if (window.confirm('Are you sure you want to remove this item from your bag?')) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    }
  };

  const handleContinueShopping = () => {
    alert('Navigating to products page...');
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your bag is empty. Please add items before checkout.');
      return;
    }
    
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    console.log('Checkout Data:', { cartItems, totalItems, totalPrice });
    alert('Proceeding to checkout...');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-serif text-center text-gray-800 mb-12 italic">
          My Cart
        </h1>

        {cartItems.length === 0 ? (
          <EmptyCart onContinueShopping={handleContinueShopping} />
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 border border-gray-200">
              <table className="w-full">
                <thead className="bg-white border-b-2 border-gray-300">
                  <tr>
                    <th className="py-5 px-4 text-left text-sm font-semibold uppercase tracking-wide text-gray-800">
                      Product
                    </th>
                    <th className="py-5 px-4 text-center text-sm font-semibold uppercase tracking-wide text-gray-800">
                      Price
                    </th>
                    <th className="py-5 px-4 text-center text-sm font-semibold uppercase tracking-wide text-gray-800">
                      Quantity
                    </th>
                    <th className="py-5 px-4 text-center text-sm font-semibold uppercase tracking-wide text-gray-800">
                      Total
                    </th>
                    <th className="py-5 px-4 text-center text-sm font-semibold uppercase tracking-wide text-gray-800">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {cartItems.map(item => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-100 rounded-lg shadow-lg p-6">
              <div className="flex gap-150 justify-center">
                <button
                  onClick={handleContinueShopping}
                  className="px-10 py-4 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-colors text-lg"
                >
                  Back to Shopping
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  className="px-10 py-4 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-colors text-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default CartPage;