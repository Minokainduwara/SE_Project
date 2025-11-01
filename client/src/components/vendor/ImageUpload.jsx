// LogoUpload.jsx
// Component for uploading and displaying shop logo

import React from 'react';
import { Upload } from 'lucide-react';

/**
 * LogoUpload Component
 * 
 * @param {string} logo - Base64 or URL of the uploaded logo
 * @param {Function} handleLogoUpload - Function to handle file upload
 * @returns {JSX.Element} Logo upload section
 */
const ImageUpload = ({ logo, handleLogoUpload }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      
      {/* Section Title */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Profile Picture</h2>
      
      {/* Upload Container */}
      <div className="flex flex-col items-center">
        
        {/* Logo Preview Area */}
        <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
          {logo ? (
            <img 
              src={logo} 
              alt="Shop Logo" 
              className="w-full h-full object-contain rounded-lg" 
            />
          ) : (
            <div className="text-6xl" role="img" aria-label="Default logo">
              🍊
            </div>
          )}
        </div>
        
        {/* Upload Button */}
        <label className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Upload className="w-5 h-5" />
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
            aria-label="Upload shop logo"
          />
        </label>
        
        {/* Upload Instructions */}
        <p className="text-xs text-gray-500 mt-3 text-center">
          Recommended: Square image, max 2MB
        </p>
        
      </div>
    </div>
  );
};

export default ImageUpload;