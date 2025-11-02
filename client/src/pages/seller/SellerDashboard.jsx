import React, { useState } from "react";
import api from "../../api/axios";

const SellerDashboard = () => {
  const [product, setProduct] = useState({ name: "", price: "", stock: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/products", product);
    alert("Product added successfully");
    setProduct({ name: "", price: "", stock: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Seller Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 w-full"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 w-full"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default SellerDashboard;
