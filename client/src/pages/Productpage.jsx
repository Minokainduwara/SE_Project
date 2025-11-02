import React, { useState, useMemo } from 'react';
import Header from '../components/Productpagecom/Header';
import FiltersSidebar from '../components/Productpagecom/FiltersSidebar';
import ProductGrid from '../components/Productpagecom/ProductGrid';
import Pagination from '../components/Productpagecom/Pagination';
import CartSidebar from '../components/Productpagecom/CartSidebar';
import WishlistSidebar from '../components/Productpagecom/WishlistSidebar';
import { Filter, Heart, ShoppingCart } from 'lucide-react';

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

  // sample products
  const products = [
    { id: 1, name: 'Little lion Cake', vendor: 'Bakery&Snacks', price:3.1, rating: 4.5, stock: 10, image:'/assets/images/ProductImags/Bakery & Snacks/little lion 500.jpg', unit: '550g' },
    { id: 2, name: 'Mr pop Classic  ', vendor: 'Bakery&Snacks', price: 3.1, rating: 4.7, stock: 15, image: '/assets/images/ProductImags/Bakery & Snacks/mr pop classic 50.jpg', unit: '30g' },
    { id: 3, name: 'Rambo tetos', vendor: 'Bakery&Snacks', price: 5.5, rating: 4.2, stock: 4, image: '/assets/images/ProductImags/Bakery & Snacks/rambo tetos 85.jpg', unit: '30g' },
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

  // cart + wishlist logic
  const addToCart = (product) => {
    if (product.stock === 0) return;
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (item, newQty) => {
    if (newQty <= 0) removeFromCart(item);
    else if (newQty <= item.stock)
      setCart(prev => prev.map(p => p.id === item.id ? { ...p, quantity: newQty } : p));
  };

  const removeFromCart = (item) => setCart(prev => prev.filter(p => p.id !== item.id));

  const toggleWishlist = (product) => {
    setWishlist(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  const removeFromWishlist = (product) => setWishlist(prev => prev.filter(p => p.id !== product.id));
  const isInWishlist = (id) => wishlist.some(p => p.id === id);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalPages = Math.ceil(filteredProducts.length / 6);
  const startIdx = (currentPage - 1) * 6;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Buttons moved below header */}
      <div className="bg-white shadow-md py-3 px-4 flex justify-end space-x-3 sticky top-[84px] z-30">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition"
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filters</span>
        </button>

        <button
          onClick={() => { setShowWishlist(!showWishlist); setShowCart(false); }}
          className="relative bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition"
        >
          <Heart className="w-5 h-5" />
          <span className="hidden sm:inline">Wishlist</span>
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {wishlist.length}
            </span>
          )}
        </button>

        <button
          onClick={() => { setShowCart(!showCart); setShowWishlist(false); }}
          className="relative bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {showFilters && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setShowFilters(false)} />
        )}

        {/* Filters */}
        <aside
          className={`${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transform transition-transform duration-300 lg:static fixed top-0 left-0 w-80 bg-white z-50 lg:z-auto h-full lg:h-auto`}
        >
          <FiltersSidebar
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedVendor={selectedVendor}
            setSelectedVendor={setSelectedVendor}
            vendors={vendors}
            filteredCount={filteredProducts.length}
          />
        </aside>

        {/* Products */}
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

      {/* Cart + Wishlist Sidebars */}
      <CartSidebar showCart={showCart} setShowCart={setShowCart} cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} getTotalPrice={getTotalPrice} />
      <WishlistSidebar showWishlist={showWishlist} setShowWishlist={setShowWishlist} wishlist={wishlist} addToCart={addToCart} removeFromWishlist={removeFromWishlist} />
    </div>
  );
}
