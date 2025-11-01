import React from 'react';
import { ShoppingBag } from 'lucide-react';
//import allLogos from './assets/images/allLogos.jpg';


const PaymentImage = () => {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[500px]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg mb-6">
          <ShoppingBag className="w-16 h-16 text-teal-700" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure Payment</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Your payment information is encrypted and secure. Complete your purchase with confidence.
        </p>

        {/*Payment method logo */}
        {/* Payment Methods Image - All logos in one horizontal image */}
        <div className="mt-8 flex justify-center">
          <img 
            src="/assets/images/allLogos.jpg" 
            alt="Accepted Payment Methods" 
            className="max-w-md w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentImage;
