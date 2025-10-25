// src/components/dashboard/Cunneints.jsx
import React from 'react';

const Cunneints = ({ testimonials }) => {
  const defaultTestimonials = [
    { 
      icon: '✍️',
      text: 'Asys.rong entlere.gmotouts.pero/'
    },
    {
      icon: '🍃',
      text: 'Fact and reliable delivery'
    }
  ];

  const displayTestimonials = testimonials || defaultTestimonials;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Cunneints</h2>
      <div className="space-y-4">
        {displayTestimonials.map((item, index) => (
          <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 flex items-center justify-center text-2xl">
              {item.icon}
            </div>
            <p className="text-sm text-gray-700 flex-1">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cunneints;