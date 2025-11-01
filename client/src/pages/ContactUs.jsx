import React, { useState } from 'react';
import { MapPin, Phone, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '../components/homePage/Header';
import Footer from '../components/homePage/footer';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (name.trim().length > 50) {
      return 'Name must be less than 50 characters';
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
    return '';
  };

  const validateMessage = (message) => {
    if (!message.trim()) {
      return 'Message is required';
    }
    if (message.trim().length < 10) {
      return 'Message must be at least 10 characters';
    }
    if (message.trim().length > 500) {
      return 'Message must be less than 500 characters';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear success message when user starts typing
    if (submitSuccess) {
      setSubmitSuccess(false);
    }

    // Validate on change if field has been touched
    if (touched[name]) {
      let error = '';
      if (name === 'name') error = validateName(value);
      if (name === 'email') error = validateEmail(value);
      if (name === 'message') error = validateMessage(value);
      
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
    if (name === 'name') error = validateName(value);
    if (name === 'email') error = validateEmail(value);
    if (name === 'message') error = validateMessage(value);
    
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = () => {
    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    setErrors({
      name: nameError,
      email: emailError,
      message: messageError
    });

    setTouched({
      name: true,
      email: true,
      message: true
    });

    // If no errors, proceed with submission
    if (!nameError && !emailError && !messageError) {
      setIsSubmitting(true);
      console.log('Contact form submitted:', formData);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1000);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.message &&
      !validateName(formData.name) &&
      !validateEmail(formData.email) &&
      !validateMessage(formData.message)
    );
  };

  const getCharacterCount = (text, max) => {
    const current = text.length;
    const remaining = max - current;
    const color = remaining < 50 ? 'text-red-500' : remaining < 100 ? 'text-yellow-600' : 'text-gray-500';
    return { current, remaining, color };
  };

  const messageCount = getCharacterCount(formData.message, 500);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <Header activePage="Contact" />

      <div className="space-y-4 p-5"></div>

      {/* Main Content Section with Green Background */}
      <div className="bg-gradient-to-b from-green-100 to-green-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Have any questions or suggestions? We'd love to hear from you!
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-8 bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-green-800">Message sent successfully!</h3>
                <p className="text-green-700">Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Left Column - Contact Form */}
            <div className="space-y-6 bg-white rounded-2xl p-8 shadow-lg">
              {/* Name Field */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                    errors.name && touched.name 
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-transparent'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && touched.name && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                    errors.email && touched.email 
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-transparent'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && touched.email && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  </div>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="5"
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all resize-none ${
                    errors.message && touched.message 
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-transparent'
                  }`}
                  placeholder="Your message..."
                ></textarea>
                <div className="flex justify-between items-start mt-1">
                  <div className="flex-1">
                    {errors.message && touched.message && (
                      <div className="flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <p className="text-red-500 text-sm">{errors.message}</p>
                      </div>
                    )}
                  </div>
                  <p className={`text-sm ${messageCount.color} ml-2`}>
                    {messageCount.current}/500
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className={`w-full font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-md text-lg ${
                  isFormValid() && !isSubmitting
                    ? 'bg-green-700 text-white hover:bg-green-800 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>

            {/* Right Column - Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-green-700 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-lg text-gray-900 font-medium">No 254, </p>
                    <p className="text-lg text-gray-900 font-medium">Kollupitiya, Colombo 3</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-green-700 flex-shrink-0" />
                  <p className="text-lg text-gray-900 font-medium">0555 746 598</p>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-green-700 flex-shrink-0" />
                  <p className="text-lg text-gray-900 font-medium">info@freshmarket.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}