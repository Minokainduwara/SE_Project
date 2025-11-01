import React from 'react';

const DeliveryOption = ({ selected, onSelect, type, duration, price }) => {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center justify-between p-4 border-2 rounded-lg transition-all w-full ${
        selected
          ? 'border-blue-600 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            selected ? 'border-blue-600' : 'border-gray-300'
          }`}
        >
          {selected && <div className="w-3 h-3 rounded-full bg-blue-600" />}
        </div>
        <div className="text-left">
          <div className="font-semibold text-gray-900">{type}</div>
          <div className="text-sm text-gray-500">{duration}</div>
        </div>
      </div>
      <div className="font-semibold text-gray-900">{price}</div>
    </button>
  );
};

export default DeliveryOption;