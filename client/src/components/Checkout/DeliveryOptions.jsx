import React from 'react';
import DeliveryOption from './DeliveryOption';

const DeliveryOptions = ({ selectedOption, onSelectOption }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">Delivery Option</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DeliveryOption
          selected={selectedOption === 'standard'}
          onSelect={() => onSelectOption('standard')}
          type="Standard"
          duration="3-5 days"
          price="Rs. 150.00"
        />
        <DeliveryOption
          selected={selectedOption === 'express'}
          onSelect={() => onSelectOption('express')}
          type="Express"
          duration="1-2 days"
          price="Rs. 300.00"
        />
      </div>
    </div>
  );
};

export default DeliveryOptions;