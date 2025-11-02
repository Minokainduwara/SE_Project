import React, { useState, useEffect } from "react";
import api from "../api/axios";
import HeroSection from "../components/HeroSection";
import DeliveryBanner from "../components/DeliveryBanner";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then(res => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <>
    < HeroSection />
    < DeliveryBanner/>
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">🛒 Grocery Store</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded">
            <h3 className="font-bold">{p.name}</h3>
            <p>Rs.{p.price}</p>
            <button
              className="bg-blue-600 text-white px-3 py-1 mt-2 rounded"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
