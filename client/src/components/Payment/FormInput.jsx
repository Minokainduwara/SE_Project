import React from 'react';

const FormInput = ({ label, type = 'text', value, onChange, placeholder, name, error, maxLength }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-bold text-gray-900">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
          error ? 'border-red-500' : 'border-gray-200'
        }`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default FormInput;
