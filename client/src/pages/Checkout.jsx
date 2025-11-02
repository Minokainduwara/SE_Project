import { useEffect, useState } from "react";
import API from "../api/axios";

const Checkout = () => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await API.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(data);
    };
    fetchCart();
  }, []);

  const handlePayment = () => {
    alert("💳 PayHere integration coming next!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {cart.items.map((item) => (
        <div key={item.productId} className="flex justify-between border-b py-2">
          <p>
            {item.name} × {item.quantity}
          </p>
          <p>Rs.{item.price * item.quantity}</p>
        </div>
      ))}

      <div className="text-right mt-4 font-bold">
        Total: Rs.{cart.totalPrice}
      </div>

      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white py-2 px-4 mt-6 rounded hover:bg-blue-700 w-full"
      >
        Pay with PayHere
      </button>
    </div>
  );
};

export default Checkout;
