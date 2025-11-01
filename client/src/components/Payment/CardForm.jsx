import React from 'react';
import FormInput from './FormInput';

const CardForm = ({ formData, errors, onChange, saveCard, setSaveCard }) => {
  return (
    <div className="space-y-6">
      <FormInput
        label="Cardholder Name"
        name="cardholderName"
        value={formData.cardholderName}
        onChange={onChange}
        placeholder="Enter your name"
        error={errors.cardholderName}
      />
      
      <FormInput
        label="Card Number"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={onChange}
        placeholder="1234 5678 1234 5678"
        maxLength={19}
        error={errors.cardNumber}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Expiry Date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={onChange}
          placeholder="MM / YY"
          maxLength={7}
          error={errors.expiryDate}
        />
        
        <FormInput
          label="CVV"
          name="cvv"
          type="password"
          value={formData.cvv}
          onChange={onChange}
          placeholder="•••"
          maxLength={3}
          error={errors.cvv}
        />
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSaveCard(!saveCard)}
          className="flex items-center gap-3"
        >
          <div
            className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
              saveCard ? 'bg-teal-700' : 'border-2 border-gray-300 bg-white'
            }`}
          >
            {saveCard && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-gray-900">Save this card for future use</span>
        </button>
      </div>
    </div>
  );
};

export default CardForm;