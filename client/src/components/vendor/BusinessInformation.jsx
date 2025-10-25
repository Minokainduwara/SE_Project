import React from 'react'

function BusinessInformation() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      
      {/* Section Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Business Information
      </h2>
      
      {/* Form Fields Container */}
      <div className="space-y-6">
        
        {/* Shop Name Input */}
        <div>
          <label 
            htmlFor="shopName" 
            className="block text-gray-700 font-medium mb-2"
          >
            Shop Name
          </label>
          <input
            id="shopName"
            type="text"
            name="shopName"
            //value={formData.shopName}
            //onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter shop name"
            required
          />
        </div>

        {/* Shop Address Input */}
        <div>
          <label 
            htmlFor="shopAddress" 
            className="block text-gray-700 font-medium mb-2"
          >
            Shop Address
          </label>
          <input
            id="shopAddress"
            type="text"
            name="shopAddress"
            //value={formData.shopAddress}
            //onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter shop address"
            required
          />
        </div>

        {/* Shop Description Textarea */}
        <div>
          <label 
            htmlFor="shopDescription" 
            className="block text-gray-700 font-medium mb-2"
          >
            Shop Description
          </label>
          <textarea
            id="shopDescription"
            name="shopDescription"
            //value={formData.shopDescription}
            //onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all"
            placeholder="Describe your shop"
            required
          />
        </div>
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

export default BusinessInformation