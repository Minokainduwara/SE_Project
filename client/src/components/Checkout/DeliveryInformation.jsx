import React from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

const DeliveryInformation = ({ formData, onChange ,onSave }) => {
  const districts = ['Colombo','Gampaha','Kalutara','Kandy','Matale',
  'Nuwara Eliya','Galle', 'Matara', 'Hambantota','Jaffna', 'Kilinochchi',
  'Mannar','Vavuniya','Mullaitivu','Trincomalee','Batticaloa','Ampara',
  'Kurunegala','Puttalam','Anuradhapura','Polonnaruwa','Badulla',
  'Monaragala','Ratnapura','Kegalle'];

  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={onChange} 
          placeholder="Enter your full name"
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="User@gmail.com"
        />
        <FormInput
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={onChange}
          placeholder="+94 Mobile"
        />

        <FormSelect
          label="District"
          name="district"
          value={formData.districts}
          onChange={onChange}
          options={districts}
        />

        <FormInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="Enter your address"
        />
        
        <FormInput
          label="ZIP"
          name="zip"
          value={formData.zip}
          onChange={onChange}
          placeholder="Zip code"
        />
      </div>

       <div className="mt-6 flex gap-4">
        <button
          onClick={onSave}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Save Information
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
        
      </div>

    </div>
  );
};

export default DeliveryInformation;
