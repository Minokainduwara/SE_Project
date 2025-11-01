import React, { useState } from "react";
import axios from "axios";

const CheckoutPage = () => {
  const [order, setOrder] = useState({
    order_id: "ORD" + Date.now(),
    items: "Grocery Order",
    amount: 2500.0, // in LKR
    first_name: "Minoka",
    email: "test@example.com",
    phone: "0771234567",
    address: "Colombo, Sri Lanka",
  });

  const handlePayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payments/create-payment", order);
      const paymentData = res.data;

      // Redirect user to PayHere sandbox checkout
      const queryParams = new URLSearchParams(paymentData).toString();
      window.location.href = `https://sandbox.payhere.lk/pay/checkout?${queryParams}`;
    } catch (err) {
      console.error(err);
      alert("Error creating payment");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <p>Total Amount: Rs. {order.amount.toFixed(2)}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default CheckoutPage;
