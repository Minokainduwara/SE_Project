// HomePage.jsx
// Main home page component

import React, { useState, useEffect } from 'react';
import { Leaf, Truck, CheckCircle } from 'lucide-react';
import Header from '../components/homePage/Header';
import HeroSection from '../components/homePage/HeroSection';
import FeaturedProducts from '../components/homePage/FeaturedProducts';
import TopVendors from '../components/homePage/TopVendors';
import Footer from '../components/homePage/footer';
import DeliveryBanner from '../components/homePage/DeliveryBanner';

/**
 * HomePage Component
 * Main landing page for Fresh Market
 * 
 * @returns {JSX.Element} Complete home page
 */
const Homepage = () => {
  // Sample products data
  const [products] = useState([
    {
      id: 1,
      name: 'Organic Bananas',
      price: 300,
      emoji: '🍌',
      image: null
    },
    {
      id: 2,
      name: 'Fresh Strawberries',
      price: 250,
      emoji: '🍓',
      image: null
    },
    {
      id: 3,
      name: 'Organic Broccoli',
      price: 160,
      emoji: '🥦',
      image: null
    },
    {
      id: 4,
      name: 'Almond Milk',
      price: 450,
      emoji: '🥛',
      image: null
    },
    {
      id: 5,
      name: 'Potatoes 1kg',
      price: 300,
      emoji: '🥔',
      image: null
    },
    {
      id: 6,
      name: 'Brown Rice',
      price: 200,
      emoji: '🍚',
      image: null
    },
    {
      id: 7,
      name: 'Organic Grecores',
      price: 800,
      emoji: '🥬',
      image: null
    },
    {
      id: 8,
      name: 'Organic A2 Milk',
      price: 450,
      emoji: '🥛',
      image: null
    }
  ]);

  // Sample vendors data
  const [vendors] = useState([
    {
      id: 1,
      name: "Nature's Best",
      rating: 4,
      emoji: '🌿',
      icon: <Leaf className="w-8 h-8 text-green-700" />
    },
    {
      id: 2,
      name: 'Farm Fresh',
      rating: 4,
      emoji: '🚚',
      icon: <Truck className="w-8 h-8 text-green-700" />
    },
    {
      id: 3,
      name: 'Green Valley',
      rating: 4,
      emoji: '✓',
      icon: <CheckCircle className="w-8 h-8 text-green-700" />
    }
  ]);

  // Fetch data from API (example)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Uncomment to fetch from your API
        /*
        const productsResponse = await fetch('/api/products/featured');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        const vendorsResponse = await fetch('/api/vendors/top');
        const vendorsData = await vendorsResponse.json();
        setVendors(vendorsData);
        */
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  /**
   * Handle add to cart action
   */
  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists in cart
    const existingProductIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
      // Increase quantity if product exists
      existingCart[existingProductIndex].quantity += 1;
    } else {
      // Add new product with quantity 1
      existingCart.push({ ...product, quantity: 1 });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success message
    alert(`${product.name} added to cart!`);
    
    // You can also update cart state here if using context/redux
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header Navigation */}
      <Header activePage="Home" />

     
 <div className="space-y-4 p-5"></div>
      {/* Hero Section */}
      <HeroSection />
      
      <div className="p-4 mt-3">
        <DeliveryBanner />
      </div>

      {/* Featured Products Section */}
      <FeaturedProducts 
        products={products} 
        onAddToCart={handleAddToCart}
      />

      {/* Offer Images Section */}
      <div className="flex flex-col lg:flex-row w-full h-auto lg:h-96 gap-6 px-4 my-8">
        {/* Left Image */}
        <div
          className="w-full lg:w-1/2 h-96 bg-cover bg-center rounded-2xl shadow-lg"
          style={{ backgroundImage: "url('/assets/images/offer1.png')" }}
        ></div>

        {/* Right Image */}
        <div
          className="w-full lg:w-1/2 h-96 bg-cover bg-center rounded-2xl shadow-lg"
          style={{ backgroundImage: "url('/assets/images/offer2.png')" }}
        ></div>
      </div>

      {/* Top Vendors Section */}
      <TopVendors vendors={vendors} />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Homepage;