import React, { useState } from 'react';
import ProgressSteps from '../components/Payment/ProgressSteps';
import PaymentMethodSelector from '../components/Payment/PaymentMethodSelector';
import CardForm from '../components/Payment/CardForm';
import PaymentImage from '../components/Payment/PaymentImage';
import ConfirmationPage from '../components/Payment/ConfirmationPage';
import Header from '../components/homePage/Header';
import Footer from '../components/homePage/footer';

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [saveCard, setSaveCard] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Format expiry date as MM / YY
    if (name === 'expiryDate') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 2) {
        formattedValue = cleaned;
      } else if (cleaned.length <= 4) {
        formattedValue = `${cleaned.slice(0, 2)} / ${cleaned.slice(2)}`;
      }
    }
    
    // Only allow numbers for CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
    }
    
    setFormData({ ...formData, [name]: formattedValue });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  
  const validateExpiryDate = (expiryDate) => {
    if (!expiryDate) {
      return 'Expiry date is required';
    }
    
    const [month, year] = expiryDate.split(' / ');
    
    if (!month || !year) {
      return 'Invalid expiry date format (MM / YY)';
    }
    
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    
    // Validate month range (01-12)
    if (monthNum < 1 || monthNum > 12) {
      return 'Invalid month. Must be between 01 and 12';
    }
    
    // Get current date
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // Get last 2 digits of year
    const currentMonth = now.getMonth() + 1; // JavaScript months are 0-indexed
    
    // Check if card is expired
    if (yearNum < currentYear) {
      return 'Card has expired';
    }
    
    if (yearNum === currentYear && monthNum < currentMonth) {
      return 'Card has expired';
    }
    
    // Check if expiry date is too far in the future (more than 10 years)
    if (yearNum > currentYear + 10) {
      return 'Invalid expiry date';
    }
    
    return null; // No error
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
    if (!cardNumberClean) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardNumberClean.length !== 16 || !/^\d+$/.test(cardNumberClean)) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    
    // Validate expiry date with real-world validation
    const expiryError = validateExpiryDate(formData.expiryDate);
    if (expiryError) {
      newErrors.expiryDate = expiryError;
    }
    
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const generatePaymentId = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };
  
  const handlePayNow = () => {
    if (validateForm()) {
      const newPaymentId = generatePaymentId();
      setPaymentId(newPaymentId);
      
      console.log('Payment Data:', {
        ...formData,
        paymentMethod,
        saveCard,
        paymentId: newPaymentId
      });
      
      // Show confirmation page
      setShowConfirmation(true);
    } else {
      alert('Please fix the errors in the form');
    }
  };
  
  const handleBackToSite = () => {
    setShowConfirmation(false);
    setFormData({
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
    setErrors({});
    console.log('Redirecting to home page...');
  };
  
  if (showConfirmation) {
    return <ConfirmationPage paymentId={paymentId} onBackToSite={handleBackToSite} />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ProgressSteps currentStep={3} />
        
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">Payment</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Payment Form */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onSelect={setPaymentMethod}
            />
            
            <CardForm
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              saveCard={saveCard}
              setSaveCard={setSaveCard}
              paymentMethod={paymentMethod}
            />
            
            <button
              onClick={handlePayNow}
              className="w-full mt-8 bg-teal-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-800 transition-colors"
            >
              PAY NOW
            </button>
          </div>
          
          {/* Right Column - Payment Image */}
          <div>
            <PaymentImage />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}