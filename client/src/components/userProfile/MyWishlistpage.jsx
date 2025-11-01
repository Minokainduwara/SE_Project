import React from 'react';

const MyWishlistPage = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'Organic Apples',
      price: 4.99,
      image: '🍎',
      inStock: true
    },
    {
      id: 2,
      name: 'Fresh Bananas',
      price: 2.99,
      image: '🍌',
      inStock: true
    },
    {
      id: 3,
      name: 'Strawberries',
      price: 5.99,
      image: '🍓',
      inStock: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="text-6xl mb-4 text-center">{item.image}</div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">{item.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-4">${item.price}</p>
            
            <div className="flex gap-2">
              <button className="flex-1 px-4 py-2 bg-emerald-700 text-white rounded-lg font-medium hover:bg-emerald-800 transition-colors">
                Add to Cart
              </button>
              <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors">
                Remove
              </button>
            </div>
            
            {!item.inStock && (
              <p className="text-sm text-red-500 mt-2">Out of Stock</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWishlistPage;