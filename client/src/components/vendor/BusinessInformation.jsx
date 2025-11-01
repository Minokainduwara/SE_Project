import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

// Contact Information Component
function ContactInformation({ formData, setFormData, errors, setErrors, touched, setTouched }) {
  // Validation functions
  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (digitsOnly.length < 9) {
      return 'Phone number is too short';
    }
    
    if (digitsOnly.length > 15) {
      return 'Phone number is too long';
    }
    
    const phoneRegex = /^[\d\s\-+()]+$/;
    if (!phoneRegex.test(phone)) {
      return 'Phone number contains invalid characters';
    }
    
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    if (email.includes('..')) {
      return 'Email address has invalid format';
    }
    
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    if (touched[name]) {
      let error = '';
      if (name === 'phone') error = validatePhone(value);
      if (name === 'email') error = validateEmail(value);
      
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched({
      ...touched,
      [name]: true
    });

    let error = '';
    if (name === 'phone') error = validatePhone(value);
    if (name === 'email') error = validateEmail(value);
    
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const isFieldValid = (fieldName) => {
    return formData[fieldName] && !errors[fieldName] && touched[fieldName];
  };

  return (
    <div className="space-y-6 mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
      
      {/* Phone Input Field */}
      <div>
        <label 
          htmlFor="phone" 
          className="block text-gray-700 font-medium mb-2"
        >
          Phone <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
              errors.phone && touched.phone
                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                : isFieldValid('phone')
                ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }`}
            placeholder="+94 555 746 569"
          />
          {isFieldValid('phone') && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {errors.phone && touched.phone && (
          <div className="flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-red-500 text-sm">{errors.phone}</p>
          </div>
        )}
      </div>

      {/* Email Input Field */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-gray-700 font-medium mb-2"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
              errors.email && touched.email
                ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                : isFieldValid('email')
                ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }`}
            placeholder="vendor@example.com"
          />
          {isFieldValid('email') && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
        </div>
        {errors.email && touched.email && (
          <div className="flex items-center gap-1 mt-1">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-red-500 text-sm">{errors.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Business Information Component
function BusinessInformation() {
  const [formData, setFormData] = useState({
    shopName: '',
    shopAddress: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    shopName: '',
    shopAddress: '',
    phone: '',
    email: ''
  });

  const [touched, setTouched] = useState({
    shopName: false,
    shopAddress: false,
    phone: false,
    email: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation functions
  const validateShopName = (name) => {
    if (!name.trim()) {
      return 'Shop name is required';
    }
    if (name.trim().length < 3) {
      return 'Shop name must be at least 3 characters';
    }
    if (name.trim().length > 100) {
      return 'Shop name must be less than 100 characters';
    }
    return '';
  };

  const validateShopAddress = (address) => {
    if (!address.trim()) {
      return 'Shop address is required';
    }
    if (address.trim().length < 10) {
      return 'Shop address must be at least 10 characters';
    }
    if (address.trim().length > 200) {
      return 'Shop address must be less than 200 characters';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    if (submitSuccess) {
      setSubmitSuccess(false);
    }

    if (touched[name]) {
      let error = '';
      if (name === 'shopName') error = validateShopName(value);
      if (name === 'shopAddress') error = validateShopAddress(value);
      
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched({
      ...touched,
      [name]: true
    });

    let error = '';
    if (name === 'shopName') error = validateShopName(value);
    if (name === 'shopAddress') error = validateShopAddress(value);
    
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const isFieldValid = (fieldName) => {
    return formData[fieldName] && !errors[fieldName] && touched[fieldName];
  };

  const isFormValid = () => {
    return (
      formData.shopName &&
      formData.shopAddress &&
      formData.phone &&
      formData.email &&
      !validateShopName(formData.shopName) &&
      !validateShopAddress(formData.shopAddress) &&
      !errors.phone &&
      !errors.email
    );
  };

  const handleSubmit = () => {
    // Validate all fields
    const shopNameError = validateShopName(formData.shopName);
    const shopAddressError = validateShopAddress(formData.shopAddress);

    setErrors({
      ...errors,
      shopName: shopNameError,
      shopAddress: shopAddressError
    });

    setTouched({
      shopName: true,
      shopAddress: true,
      phone: true,
      email: true
    });

    // If no errors, proceed with submission
    if (isFormValid()) {
      setIsSubmitting(true);
      console.log('Business Information submitted:', formData);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        
        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Information saved successfully!</h3>
              <p className="text-green-700">Your business information has been updated.</p>
            </div>
          </div>
        )}

        {/* Section Title */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Business Information
        </h2>
        
        {/* Form Fields Container */}
        <div className="space-y-6">
          
          {/* Shop Name Input */}
          <div>
            <label 
              htmlFor="shopName" 
              className="block text-gray-700 font-medium mb-2"
            >
              Shop Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="shopName"
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                  errors.shopName && touched.shopName
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                    : isFieldValid('shopName')
                    ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                }`}
                placeholder="Enter shop name"
              />
              {isFieldValid('shopName') && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.shopName && touched.shopName && (
              <div className="flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-red-500 text-sm">{errors.shopName}</p>
              </div>
            )}
          </div>

          {/* Shop Address Input */}
          <div>
            <label 
              htmlFor="shopAddress" 
              className="block text-gray-700 font-medium mb-2"
            >
              Shop Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="shopAddress"
                type="text"
                name="shopAddress"
                value={formData.shopAddress}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg outline-none transition-all ${
                  errors.shopAddress && touched.shopAddress
                    ? 'border-red-500 focus:ring-2 focus:ring-red-500'
                    : isFieldValid('shopAddress')
                    ? 'border-green-500 focus:ring-2 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                }`}
                placeholder="Enter shop address"
              />
              {isFieldValid('shopAddress') && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
              )}
            </div>
            {errors.shopAddress && touched.shopAddress && (
              <div className="flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-red-500 text-sm">{errors.shopAddress}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information Component */}
        <ContactInformation 
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          touched={touched}
          setTouched={setTouched}
        />

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className={`w-full font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md ${
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
                Saving...
              </span>
            ) : (
              'Save Business Information'
            )}
          </button>
        </div>

        {/* Form Progress Indicator */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm">
            <p className="font-medium text-gray-700 mb-3">Form Completion:</p>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg ${formData.shopName && !errors.shopName ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                <p className={`font-medium ${formData.shopName && !errors.shopName ? 'text-green-700' : 'text-gray-600'}`}>
                  Shop Name {formData.shopName && !errors.shopName ? '✓' : '○'}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${formData.shopAddress && !errors.shopAddress ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                <p className={`font-medium ${formData.shopAddress && !errors.shopAddress ? 'text-green-700' : 'text-gray-600'}`}>
                  Shop Address {formData.shopAddress && !errors.shopAddress ? '✓' : '○'}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${formData.phone && !errors.phone ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                <p className={`font-medium ${formData.phone && !errors.phone ? 'text-green-700' : 'text-gray-600'}`}>
                  Phone {formData.phone && !errors.phone ? '✓' : '○'}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${formData.email && !errors.email ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                <p className={`font-medium ${formData.email && !errors.email ? 'text-green-700' : 'text-gray-600'}`}>
                  Email {formData.email && !errors.email ? '✓' : '○'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessInformation;