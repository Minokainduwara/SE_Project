import React from 'react';

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
  const methods = [
    { id: 'credit', label: 'Credit Card' },
    { id: 'debit', label: 'Debit Card' }
  ];
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Payment Method</h3>
      <div className="flex gap-6">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className="flex items-center gap-3"
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === method.id
                  ? 'border-teal-700 bg-teal-700'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {selectedMethod === method.id && (
                <div className="w-3 h-3 rounded-full bg-white" />
              )}
            </div>
            <span className="text-gray-900 font-medium">{method.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;