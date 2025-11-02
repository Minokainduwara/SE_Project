import { useEffect, useState } from "react";
import API from "../api";

const Cart = () => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  const fetchCart = async () => {
    const { data } = await API.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart(data);
  };

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  const clearCart = async () => {
    await API.delete(`/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between border-b py-3"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>
                  Rs.{item.price} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-4">
            <h3 className="text-lg font-bold">Total: Rs.{cart.totalPrice}</h3>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
            <button
              onClick={() => (window.location.href = "/checkout")}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
