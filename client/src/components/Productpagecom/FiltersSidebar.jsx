import React from 'react';

export default function FiltersSidebar({
  sortBy, setSortBy,
  priceRange, setPriceRange,
  selectedVendor, setSelectedVendor,
  vendors,
  filteredCount,
  resetFilters
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sticky top-[200px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        <button onClick={resetFilters} className="text-sm text-green-600 hover:text-green-700">Reset</button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full border rounded-lg px-3 py-2">
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Price: Rs.{priceRange[0]} - Rs.{priceRange[1]}</label>
        <input type="range" min="0" max="5000" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">category</label>
        <select value={selectedVendor} onChange={(e) => setSelectedVendor(e.target.value)} className="w-full border rounded-lg px-3 py-2">
          {vendors.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div className="text-sm text-gray-600 mt-4 pt-4 border-t">Showing {filteredCount} products</div>
    </div>
  );
}
