import React from 'react';

const ProgressSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Cart' },
    { id: 2, label: 'Checkout' },
    { id: 3, label: 'Payment' },
    { id: 4, label: 'Done' }
  ];
  
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                step.id === currentStep
                  ? 'bg-blue-600 text-white'
                  : step.id < currentStep
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}
            >
              {step.id < currentStep ? '✓' : step.id}
            </div>
            <span
              className={`mt-2 text-sm font-medium ${
                step.id === currentStep
                  ? 'text-blue-600'
                  : step.id < currentStep
                  ? 'text-gray-900'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;