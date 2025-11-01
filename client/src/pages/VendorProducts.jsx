// Products.jsx
// Main products page component

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/vendor/Sidebar';
import HeaderTwo from '../components/vendor/HeaderTwo';
import ProductTable from '../components/vendor/ProductTable';
import ProductsPagination from '../components/vendor/ProductsPagination';
import Footer from '../components/homePage/footer';
import Header from '../components/homePage/Header';



/**
 * Products Page Component
 * Main page for managing products
 * 
 * @returns {JSX.Element} Complete products page
 */
const VendorProducts = () => {
  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Red Apple',
      category: 'Fruits',
      price: 1.5,
      stock: 5,
      status: 'Active',
      emoji: '🍎'
    },
    {
      id: 2,
      name: 'Banana',
      category: 'Vegetables',
      price: 2.0,
      stock: 10,
      status: 'Active',
      emoji: '🍌'
    },
    {
      id: 3,
      name: 'Broccoli',
      category: 'Vegetables',
      price: 2.0,
      stock: 10,
      status: 'Active',
      emoji: '🥦'
    },
    {
      id: 4,
      name: 'Tomato',
      category: 'Vegetables',
      price: 3.0,
      stock: 10,
      status: 'Active',
      emoji: '🍅'
    }
  ]);

  const itemsPerPage = 10;

  // Fetch products from API (example)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Uncomment to fetch from your API
        /*
        const response = await fetch('/api/products', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setProducts(data);
        */
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  /**
   * Filter products based on search query and category
   */
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  /**
   * Get paginated products
   */
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /**
   * Handle Add Product button click
   */
  const handleAddProduct = () => {
    // Navigate to add product page
    console.log('Navigate to Add Product page');
    // window.location.href = '/add-product';
    // or use React Router: navigate('/add-product');
  };

  /**
   * Handle Edit Product
   */
  const handleEditProduct = (product) => {
    console.log('Edit product:', product);
    // Navigate to edit page or open modal
    // navigate(`/edit-product/${product.id}`);
  };

  /**
   * Handle Delete Product
   */
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // Uncomment to call your API
        /*
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        */

        // Remove product from state
        setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
        console.log('Product deleted:', productId);
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  /**
   * Handle page change
   */
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  /**
   * Handle search change
   */
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  /**
   * Handle category change
   */
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <div className="min-h-screen bg-white">
      <Header/>
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex h-screen bg-gray-50 overflow-hidden">
    {/* Sidebar */}
    <Sidebar />
    </div>
      
      {/* Main Content Area */}
      <div className="flex-1">
        
        {/* Header */}
        <HeaderTwo />

        <div className="p-5  max-w-1xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Products
          </h1>
          </div>
        
        {/* Products Content */}
        <div className="p-8">
          
          {/* Products Table */}
          <ProductTable
            products={paginatedProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
          
          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <ProductsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}
          
        </div>
      
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default VendorProducts;