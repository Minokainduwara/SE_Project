import { useState } from "react";

export default function Filters({onFilter}) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [vendor, setVendor] = useState("");
    const [category, setCategory] = useState("");
    const vendors = ["Vendor1", "Vendor2", "Vendor3"];
    const categories = ["Electronics", "Clothing", "Books"];


    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ startDate, endDate, vendor, category });
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-2 rounded"
      />
      <select
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Vendors</option>
          {vendors.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
      </select>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate Report
      </button>
    </form>
  );
}