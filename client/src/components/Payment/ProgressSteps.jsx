import React from 'react';

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'CART' },
    { id: 2, label: 'CHECKOUT' },
    { id: 3, label: 'PAYMENT' },
    { id: 4, label: 'DONE' }
  ];
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -z-10" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-teal-700 -z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center bg-gray-50">
            <div
              className={`px-3 py-1 text-xs font-semibold tracking-wide ${
                step.id === currentStep
                  ? 'text-teal-900'
                  : step.id < currentStep
                  ? 'text-gray-700'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
