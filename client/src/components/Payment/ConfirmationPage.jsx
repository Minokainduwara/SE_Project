import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

const ConfirmationPage = ({ paymentId, onBackToSite }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-400 mb-8 tracking-wide">THANK YOU!</h1>
          
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 rounded-full border-4 border-green-500 flex items-center justify-center">
              <CheckCircle className="w-20 h-20 text-green-500" strokeWidth={2} />
            </div>
          </div>
          
          <h2 className="text-3xl font-medium text-gray-800 mb-16">Payment Approved</h2>
        </div>
        
        <div className="bg-gray-100 rounded-lg py-8 px-6 mb-8">
          <p className="text-gray-600 text-center mb-2">Payment ID #{paymentId}</p>
          <p className="text-gray-500 text-center text-sm">
            You'll receive an Email Receipt with this Payment ID<br />
            for further reference
          </p>
        </div>
        
        <div className="text-center">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-lg">Back to Site (1)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;