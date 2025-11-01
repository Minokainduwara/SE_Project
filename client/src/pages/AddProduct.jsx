import React, { useState } from 'react';
import { ChevronDown, AlertCircle, CheckCircle, Upload, X } from 'lucide-react';
import Sidebar from '../components/vendor/Sidebar';
import HeaderTwo from '../components/vendor/HeaderTwo';
import Footer from '../components/homePage/footer';


function ImageUpload({ onImageUpload, currentImage, error, touched }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onImageUpload(null);
  };

  return (
    <div>
      <label className="block text-gray-800 font-medium mb-2 text-base">
        Product Image <span className="text-red-500">*</span>
      </label>
      
      {!currentImage ? (
        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          error && touched 
            ? 'border-red-500 bg-red-50' 
            : 'border-gray-300 hover:border-blue-500 bg-gray-50'
        }`}>
          <Upload className={`mx-auto mb-4 ${error && touched ? 'text-red-500' : 'text-gray-400'}`} size={48} />
          <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Select Image
          </label>
        </div>
      ) : (
        <div className="relative inline-block">
          <img 
            src={currentImage} 
            alt="Product preview" 
            className="w-48 h-48 object-cover rounded-lg border-2 border-green-500"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            <CheckCircle size={14} />
            Uploaded
          </div>
        </div>
      )}
      
      {error && touched && (
        <div className="flex items-center gap-1 mt-2">
          <AlertCircle className="w-4 h-4 text-red-500" />
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: ''
  });

  const [productImage, setProductImage] = useState(null);

  const [errors, setErrors] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    image: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    category: false,
    price: false,
    quantity: false,
    image: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Beverages'];

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Product name is required';
    }
    if (name.trim().length < 3) {
      return 'Product name must be at least 3 characters';
    }
    if (name.trim().length > 100) {
      return 'Product name must be less than 100 characters';
    }
    return '';
  };

  const validateCategory = (category) => {
    if (!category) {
      return 'Category is required';
    }
    return '';
  };

  const validatePrice = (price) => {
    if (!price) {
      return 'Price is required';
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      return 'Price must be greater than 0';
    }
    if (numPrice > 1000000) {
      return 'Price seems too high';
    }
    return '';
  };

  const validateQuantity = (quantity) => {
    if (!quantity) {
      return 'Quantity is required';
    }
    const numQty = parseInt(quantity);
    if (isNaN(numQty) || numQty < 0) {
      return 'Quantity must be 0 or greater';
    }
    if (numQty > 100000) {
      return 'Quantity seems too high';
    }
    return '';
  };

  const validateImage = (image) => {
    if (!image) {
      return 'Product image is required';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (submitSuccess) {
      setSubmitSuccess(false);
    }

    if (touched[name]) {
      let error = '';
      if (name === 'name') error = validateName(value);
      if (name === 'category') error = validateCategory(value);
      if (name === 'price') error = validatePrice(value);
      if (name === 'quantity') error = validateQuantity(value);
      
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    let error = '';
    if (name === 'name') error = validateName(value);
    if (name === 'category') error = validateCategory(value);
    if (name === 'price') error = validatePrice(value);
    if (name === 'quantity') error = validateQuantity(value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleImageUpload = (image) => {
    setProductImage(image);
    setTouched(prev => ({ ...prev, image: true }));
    
    const error = validateImage(image);
    setErrors(prev => ({ ...prev, image: error }));
  };

  const isFieldValid = (fieldName) => {
    if (fieldName === 'image') {
      return productImage && !errors.image && touched.image;
    }
    return formData[fieldName] && !errors[fieldName] && touched[fieldName];
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.category &&
      formData.price &&
      formData.quantity &&
      productImage &&
      !validateName(formData.name) &&
      !validateCategory(formData.category) &&
      !validatePrice(formData.price) &&
      !validateQuantity(formData.quantity) &&
      !validateImage(productImage)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(formData.name);
    const categoryError = validateCategory(formData.category);
    const priceError = validatePrice(formData.price);
    const quantityError = validateQuantity(formData.quantity);
    const imageError = validateImage(productImage);

    setErrors({
      name: nameError,
      category: categoryError,
      price: priceError,
      quantity: quantityError,
      image: imageError
    });

    setTouched({
      name: true,
      category: true,
      price: true,
      quantity: true,
      image: true
    });

    if (!isFormValid()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        image: productImage,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity)
      };

      console.log('Product data:', productData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        price: '',
        quantity: ''
      });
      setProductImage(null);
      setTouched({
        name: false,
        category: false,
        price: false,
        quantity: false,
        image: false
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      quantity: ''
    });
    setProductImage(null);
    setErrors({
      name: '',
      category: '',
      price: '',
      quantity: '',
      image: ''
    });
    setTouched({
      name: false,
      category: false,
      price: false,
      quantity: false,
      image: false
    });
    setSubmitSuccess(false);
  };

  return (
    <div className="min-h-screen bg-white">
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on left */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderTwo />
        
        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Add Product
            </h1>
            
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-green-800">Product added successfully!</h3>
                  <p className="text-green-700">Your product has been added to the inventory.</p>
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="space-y-6">
                
                {/* Product Name */}
                <div>
                  <label 
                    htmlFor="productName" 
                    className="block text-gray-800 font-medium mb-2 text-base"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="productName"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                        errors.name && touched.name
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                          : isFieldValid('name')
                          ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                          : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      placeholder="Enter product name"
                    />
                    {isFieldValid('name') && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                  </div>
                  {errors.name && touched.name && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    </div>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label 
                    htmlFor="productCategory" 
                    className="block text-gray-800 font-medium mb-2 text-base"
                  >
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="productCategory"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all appearance-none bg-white cursor-pointer ${
                        errors.category && touched.category
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                          : isFieldValid('category')
                          ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                          : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      }`}
                    >
                      <option value="">Select category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none" />
                  </div>
                  {errors.category && touched.category && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <p className="text-red-500 text-sm">{errors.category}</p>
                    </div>
                  )}
                </div>
                
                {/* Price and Quantity Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div>
                    <label 
                      htmlFor="productPrice" 
                      className="block text-gray-800 font-medium mb-2 text-base"
                    >
                      Price <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">
                        Rs
                      </span>
                      <input
                        id="productPrice"
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        min="0"
                        step="0.01"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-all ${
                          errors.price && touched.price
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                            : isFieldValid('price')
                            ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        }`}
                        placeholder="0.00"
                      />
                      {isFieldValid('price') && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.price && touched.price && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <p className="text-red-500 text-sm">{errors.price}</p>
                      </div>
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label 
                      htmlFor="productQuantity" 
                      className="block text-gray-800 font-medium mb-2 text-base"
                    >
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="productQuantity"
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        min="0"
                        step="1"
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                          errors.quantity && touched.quantity
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                            : isFieldValid('quantity')
                            ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        }`}
                        placeholder="Enter stock quantity"
                      />
                      {isFieldValid('quantity') && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                      )}
                    </div>
                    {errors.quantity && touched.quantity && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <p className="text-red-500 text-sm">{errors.quantity}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Image Upload */}
                <ImageUpload 
                  onImageUpload={handleImageUpload} 
                  currentImage={productImage}
                  error={errors.image}
                  touched={touched.image}
                />
                
                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isFormValid() || isSubmitting}
                    className={`flex-1 font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md ${
                      isFormValid() && !isSubmitting
                        ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding Product...
                      </span>
                    ) : (
                      'Add Product'
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {/* Form Progress */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="font-medium text-gray-700 mb-3">Form Completion:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { field: 'name', label: 'Name' },
                      { field: 'category', label: 'Category' },
                      { field: 'price', label: 'Price' },
                      { field: 'quantity', label: 'Quantity' },
                      { field: 'image', label: 'Image' }
                    ].map(({ field, label }) => (
                      <div 
                        key={field}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          isFieldValid(field)
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-gray-100 text-gray-600 border border-gray-300'
                        }`}
                      >
                        {label} {isFieldValid(field) ? '✓' : '○'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default AddProduct;