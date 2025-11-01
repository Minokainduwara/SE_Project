import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

function ContactInformation() {
  const [formData, setFormData] = useState({
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    phone: '',
    email: ''
  });

  const [touched, setTouched] = useState({
    phone: false,
    email: false
  });

  // Validation functions
  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check if it's a valid Sri Lankan number (should have 9-10 digits after country code)
    if (digitsOnly.length < 9) {
      return 'Phone number is too short';
    }
    
    if (digitsOnly.length > 15) {
      return 'Phone number is too long';
    }
    
    // Basic format validation - should contain only numbers, spaces, +, -, ()
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
    
    // Check for common typos
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (domain && domain.includes('..')) {
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

    // Validate on change if field has been touched
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

    // Validate on blur
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
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Form Fields Container */}
      <div className="space-y-6">
        
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
          {!errors.phone && touched.phone && formData.phone && (
            <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Phone number is valid
            </p>
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
          {!errors.email && touched.email && formData.email && (
            <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Email address is valid
            </p>
          )}
        </div>

      </div>

      
    </div>
  );
}

export default ContactInformation;