import React, { useState } from 'react';
import { User, Mail, Lock, Facebook, Linkedin, Eye, EyeOff } from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });

  const [showPassword, setShowPassword] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters';
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

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
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
      if (name === 'name') error = validateName(value);
      if (name === 'email') error = validateEmail(value);
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
    if (name === 'name') error = validateName(value);
    if (name === 'email') error = validateEmail(value);
    if (name === 'password') error = validatePassword(value);
    
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError
    });

    setTouched({
      name: true,
      email: true,
      password: true
    });

    // If no errors, proceed with submission
    if (!nameError && !emailError && !passwordError) {
      console.log('Sign up data:', formData);
      alert('Sign up successful! Check console for data.');
      // Handle sign up logic here
    }
  };

  const handleSocialSignUp = (provider) => {
    console.log(`Sign up with ${provider}`);
    // Handle social sign up logic here
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      !validateName(formData.name) &&
      !validateEmail(formData.email) &&
      !validatePassword(formData.password)
    );
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[@$!%*?&])/.test(password)) strength++;

    if (strength <= 2) return { strength: 33, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { strength: 66, label: 'Medium', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Teal Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-400 to-teal-500 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-teal-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-600 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 left-20 w-24 h-24 bg-teal-300 rounded-full opacity-25"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          {/* Welcome Message */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold">Welcome Back!</h1>
            <p className="text-lg text-teal-50 max-w-md">
              To keep connected with us please login with your personal info
            </p>
            <button className="mt-8 px-12 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-teal-500 transition-all duration-300 font-semibold">
              SIGN IN
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <div className="text-white font-bold text-xl">D</div>
            </div>
            <span className="text-gray-800 font-semibold text-lg">Diprella</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-teal-500 mb-2">Create Account</h2>
          </div>

          {/* Social Sign Up Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => handleSocialSignUp('facebook')}
              className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Facebook className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => handleSocialSignUp('google')}
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
              onClick={() => handleSocialSignUp('linkedin')}
              className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Linkedin className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mb-6">
            or use your email for registration:
          </p>

          {/* Sign Up Form */}
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.name && touched.name ? 'ring-2 ring-red-500' : 'focus:ring-teal-500'
                  }`}
                />
              </div>
              {errors.name && touched.name && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.email && touched.email ? 'ring-2 ring-red-500' : 'focus:ring-teal-500'
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{passwordStrength.label}</span>
                  </div>
                </div>
              )}
              
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`w-full py-3 rounded-full font-semibold transition-all duration-300 shadow-md mt-6 ${
                isFormValid()
                  ? 'bg-teal-500 text-white hover:bg-teal-600 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Mobile Sign In Link */}
          <div className="lg:hidden text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button className="text-teal-500 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}