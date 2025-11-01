import React, { useState, useMemo } from 'react';
import Header from '../components/Productpagecom/Header';
import FiltersSidebar from '../components/Productpagecom/FiltersSidebar';
import ProductGrid from '../components/Productpagecom/ProductGrid';
import Pagination from '../components/Productpagecom/Pagination';
import CartSidebar from '../components/Productpagecom/CartSidebar';
import WishlistSidebar from '../components/Productpagecom/WishlistSidebar';


 


export default function ProductsPage() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedVendor, setSelectedVendor] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const products = [
    { id: 1, name: 'Little lion Cake', vendor: 'Bakery&Snacks', price:5.0, rating: 4.5, stock: 10, image:'🥦', unit: '550g' },
    { id: 2, name: 'Mr pop Classic  ', vendor: 'Bakery&Snacks', price: 5.0, rating: 4.7, stock: 15, image: '🍌', unit: '30g' },
    { id: 3, name: 'Rambo tetos', vendor: 'Bakery&Snacks', price: 5.5, rating: 4.2, stock: 4, image: '🥕', unit: '30g' },

    { id: 4, name: '7 up', vendor: 'Beverages', price: 1.5, rating: 4.8, stock: 20, image: '🥦', unit: '4000ml' },
    { id: 5, name: 'Ahmad tea bopf', vendor: 'Beverages', price: 3.5, rating: 4.9, stock: 20, image: '🥛', unit: '400g' },
    { id: 6, name: 'ahmad tea flavoured chai', vendor: 'Beverages', price:5.6, rating: 4.6, stock: 5, image: '🧀', unit: '500g' },
    { id: 7, name: 'Ambewela fresh milk', vendor: 'Beverages', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1l' },
    { id: 8, name: 'Ancor full cream powder', vendor: 'Beverages', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },    
    { id: 9, name: 'Elephant house ginger beer', vendor: 'Beverages', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '40ml' },
    { id: 10, name: 'Ambewela fresh milk', vendor: 'Beverages', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1l' },
    { id: 11, name: 'Ambewela fresh milk', vendor: 'Beverages', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1l' },

    { id: 12, name: 'Almond', vendor: 'Fruit', price: 1.5, rating: 4.8, stock: 20, image: '🥦', unit: '500g' },
    { id: 13, name: 'Apple', vendor: 'Fruit', price: 3.5, rating: 4.9, stock: 20, image: '🥛', unit: '500g' },
    { id: 14, name: 'Avacado', vendor: 'Fruit', price:5.6, rating: 4.6, stock: 5, image: '🧀', unit: '500g' },
    { id: 15, name: 'Banana', vendor: 'Fruit', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '500g' },
    { id: 16, name: 'Grapes', vendor: 'Fruit', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '500g' },    
    { id: 17, name: 'Green-apple', vendor: 'Fruit', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '500g' },
    { id: 18, name: 'Orange', vendor: 'Fruit', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '500g' },
    { id: 19, name: 'Pomegranate', vendor: 'Fruit', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '500g' },

    { id: 20, name: 'Brown egg 10s', vendor: 'Grocery', price:5.6, rating: 4.6, stock: 5, image: '🧀', unit: '500g' },
    { id: 21, name: 'Dark chocalate', vendor: 'Grocery', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '500g' },
    { id: 22, name: 'Kandos promises', vendor: 'Grocery', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '500g' },    
    { id: 23, name: 'Green-White Kekulu', vendor: 'Grocery', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 24, name: 'White rice', vendor: 'Grocery', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 25, name: 'White suger', vendor: 'Grocery', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },

    { id: 26, name: 'Baygon insect', vendor: 'Household & Cleaning', price:5.6, rating: 4.6, stock: 5, image: '🧀', unit: '500g' },
    { id: 27, name: 'Bellose shampoo', vendor: 'Household & Cleaning', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '500g' },
    { id: 28, name: 'Beverly hills polo clud', vendor: 'Household & Cleaning', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '500g' },    
    { id: 29, name: 'Blacj Knight', vendor: 'Household & Cleaning', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 30, name: 'Dash car', vendor: 'GrocHousehold & Cleaningery', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 31, name: 'Interior liquid', vendor: 'Household & Cleaning', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 31, name: 'Eagle-napththalene-ball', vendor: 'GrocHousehold & Cleaningery', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 32, name: 'ninja mosquito', vendor: 'Household & Cleaning', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },

    { id: 33, name: 'Alagaduwa', vendor: 'Meat ,Fish & Poulty', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 34, name: 'Drumstick', vendor: 'Meat ,Fish & Poulty', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 35, name: 'Hendella', vendor: 'Meat ,Fish & Poulty', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 36, name: 'Tuna fish', vendor: 'Meat ,Fish & Poulty', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    
    { id: 37, name: 'Bitter gourd', vendor: 'Vegitable', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 38, name: 'Brinjals', vendor: 'Vegitable', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 39, name: 'Cabbage', vendor: 'Vegitable', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 40, name: 'Capsicum', vendor: 'Vegitable', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 41, name: 'Carrot', vendor: 'Vegitable', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 42, name: 'Lime', vendor: 'Vegitable', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 43, name: 'Minchi leaves', vendor: 'Vegitable', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' },
    { id: 44, name: 'Onions', vendor: 'Vegitable', price:6.0, rating: 4.6, stock: 5, image: '🍇', unit: '1k' }

  ];

  const vendors = ['All', ...new Set(products.map(p => p.vendor))];

  const filteredProducts = useMemo(() => {
    let result = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      p.price >= priceRange[0] && p.price <= priceRange[1] &&
      (selectedVendor === 'All' || p.vendor === selectedVendor)
    );

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [searchTerm, priceRange, sortBy, selectedVendor]);

  const addToCart = (product) => {
    if (product.stock === 0) return; // Don't add if out of stock
    
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        // Check if we can increase quantity
        if (existing.quantity >= product.stock) return prev; // Already at max stock
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (item, newQty) => {
    if (newQty <= 0) {
      removeFromCart(item);
    } else if (newQty <= item.stock) {
      setCart(prev => prev.map(p => p.id === item.id ? { ...p, quantity: newQty } : p));
    }
  };

  const removeFromCart = (item) => setCart(prev => prev.filter(p => p.id !== item.id));

  const toggleWishlist = (product) => {
    if (wishlist.some(p => p.id === product.id)) {
      setWishlist(prev => prev.filter(p => p.id !== product.id));
    } else {
      setWishlist(prev => [...prev, product]);
    }
  };

  const removeFromWishlist = (product) => setWishlist(prev => prev.filter(p => p.id !== product.id));

  const isInWishlist = (id) => wishlist.some(p => p.id === id);

  const resetFilters = () => {
    setSortBy('name');
    setPriceRange([0, 20]);
    setSelectedVendor('All');
    setSearchTerm('');
  };

  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalPages = Math.ceil(filteredProducts.length / 6);
  const startIdx = (currentPage - 1) * 6;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        setShowCart={setShowCart}
        setShowWishlist={setShowWishlist}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {showFilters && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setShowFilters(false)} />
        )}
        <aside className={`${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transform transition-transform duration-300 lg:static fixed top-0 left-0 w-80 bg-white z-50 lg:z-auto h-full lg:h-auto`}>
          <FiltersSidebar
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
            vendors={vendors}
            filteredCount={filteredProducts.length}
            resetFilters={resetFilters}
          />
        </aside>

        <main className="lg:col-span-3">
          <ProductGrid
            products={paginatedProducts}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            isInWishlist={isInWishlist}
          />
          <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </main>
      </div>

      <CartSidebar showCart={showCart} setShowCart={setShowCart} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} getTotalPrice={getTotalPrice} />
      <WishlistSidebar showWishlist={showWishlist} setShowWishlist={setShowWishlist} wishlist={wishlist} addToCart={addToCart} removeFromWishlist={removeFromWishlist} />
    </div>
  );
}