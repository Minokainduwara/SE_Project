import React from 'react'

const ActionButtons = ({ handleSave, handleCancel }) => {
  return (
    <div className="flex justify-end gap-4 mt-6">
      {/* Cancel Button */}
      <button
        onClick={handleCancel}
        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
      >
        Cancel
      </button>
      
      {/* Save Button */}
      <button
        onClick={handleSave}
        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Save
      </button>
    </div>
  );
};

export default ActionButtons