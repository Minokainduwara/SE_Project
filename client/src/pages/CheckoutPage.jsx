import React, { useState } from 'react';
import { Package } from 'lucide-react';
import Header from '../components/Checkout/Header';
import ProgressSteps from '../components/Checkout/ProgressSteps';
import DeliveryInformation from '../components/Checkout/DeliveryInformation';
import DeliveryOptions from '../components/Checkout/DeliveryOptions';
import OrderSummary from '../components/Checkout/OrderSummary';


export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    district: '',
    zip: ''
  });
  
  const [deliveryOption, setDeliveryOption] = useState('express');
  
  const orderItems = [
    {
      name: 'Apple',
      price: '65.00',
      originalPrice: '65.00',
      quantity: 1,
      image: <img src = "../assets/apple.jpg"/>
    },
    {
      name: 'Mango',
      price: '39.99',
      originalPrice: '39.99',
      quantity: 1,
      image: <Package className="w-8 h-8 text-gray-400" />
    }
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleBackToCart = () => {
    console.log('Navigate back to cart');
  };

  const handlePayment = () => {
    console.log('Navigate Payment');

  };

  const handleSaveInformation = () => {
    // Validate form data
    if (!formData.fullName || !formData.email || !formDataphoneNumber || !formData.city || !formData.zip) {
      alert('Please fill in all required fields!');
      return;
    }
  }
    // Save to memory (you can later integrate with backend/API)
    console.log('Saved Delivery Information:', formData);
  
  const subtotal = orderItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
  const deliveryFee = deliveryOption === 'express' ? '300.00' : '150.00';
  const total = (parseFloat(subtotal) + parseFloat(deliveryFee)).toFixed(2);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={orderItems.length} />
      <ProgressSteps currentStep={2} />
      
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DeliveryInformation 
              formData={formData} 
              onChange={handleInputChange} 
            />
            <DeliveryOptions 
              selectedOption={deliveryOption}
              onSelectOption={setDeliveryOption}
            />
          </div>
          
          <div className="lg:col-span-1">
            <OrderSummary
              items={orderItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              onBackToCart={handleBackToCart}
              onPayment={handlePayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}