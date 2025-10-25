import React from 'react'

function ContactInformation() {
  return (
<div className="bg-white rounded-lg p-6 shadow-sm">
      
      {/* Section Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Contact Information
      </h2>
      
      {/* Form Fields Container */}
      <div className="space-y-6">
        
        {/* Phone Input Field */}
        <div>
          <label 
            htmlFor="phone" 
            className="block text-gray-700 font-medium mb-2"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            //value={formData.phone}
            //onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        {/* Email Input Field */}
        <div>
          <label 
            htmlFor="email" 
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            //value={formData.email}
            //onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="vendor@example.com"
            required
          />
        </div>

      </div>
    </div>
  )
}

export default ContactInformation