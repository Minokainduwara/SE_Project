import React, { useState } from 'react';
import { User, Lock, Facebook, Linkedin, Eye, EyeOff } from 'lucide-react';
import Header from '../components/homePage/Header';
import Footer from '../components/homePage/footer';

export default function LogInPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    username: false,
    password: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateUsername = (username) => {
    if (!username.trim()) {
      return 'Username is required';
    }
    if (username.trim().length < 3) {
      return 'Username must be at least 3 characters';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate on change if field has been touched
    if (touched[name]) {
      let error = '';
      if (name === 'username') error = validateUsername(value);
      if (name === 'password') error = validatePassword(value);
      
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
    if (name === 'username') error = validateUsername(value);
    if (name === 'password') error = validatePassword(value);
    
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);

    setErrors({
      username: usernameError,
      password: passwordError
    });

    setTouched({
      username: true,
      password: true
    });

    // If no errors, proceed with submission
    if (!usernameError && !passwordError) {
      setIsSubmitting(true);
      console.log('Login data:', formData);
      
      // Simulate API call
      setTimeout(() => {
        alert('Login successful! Check console for data.');
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const handleSocialSignIn = (provider) => {
    console.log(`Sign in with ${provider}`);
    // Handle social sign in logic here
  };

  const isFormValid = () => {
    return (
      formData.username &&
      formData.password &&
      !validateUsername(formData.username) &&
      !validatePassword(formData.password)
    );
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header Navigation */}
      <Header activePage="Home" />

    <div className="min-h-screen flex">
      {/* Left Panel - Log In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-teal-500 mb-2">LOG IN</h2>
          </div>

          {/* Social Sign In Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleSocialSignIn('facebook')}
              className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Facebook className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleSocialSignIn('google')}
              className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
            <button
              onClick={() => handleSocialSignIn('linkedin')}
              className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mb-6">
            or use your account:
          </p>

          {/* Log In Form */}
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.username && touched.username ? 'ring-2 ring-red-500' : 'focus:ring-teal-500'
                  }`}
                />
              </div>
              {errors.username && touched.username && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.password && touched.password ? 'ring-2 ring-red-500' : 'focus:ring-teal-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            <div className="text-center">
              <button className="text-gray-600 text-sm hover:text-teal-500 transition-colors">
                Forgot your password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid() || isSubmitting}
              className={`w-full py-3 rounded-full font-semibold transition-all duration-300 shadow-md mt-6 ${
                isFormValid() && !isSubmitting
                  ? 'bg-teal-500 text-white hover:bg-teal-600 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                'LOG IN'
              )}
            </button>
          </div>

          {/* Mobile Sign Up Link */}
          <div className="lg:hidden text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button className="text-teal-500 font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Teal Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-400 to-teal-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-teal-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-teal-600 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-300 rounded-full opacity-25"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          {/* Welcome Message */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold">Hello, Friend!</h1>
            <p className="text-lg text-teal-50 max-w-md">
              Enter your personal details and start journey with us
            </p>
            <button className="mt-8 px-12 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-teal-500 transition-all duration-300 font-semibold">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}