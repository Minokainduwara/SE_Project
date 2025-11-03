import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// ✅ Axios defaults
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart();
      fetchOrders();
    } else {
      setCart([]);
      setOrders([]);
    }
  }, [user]);

  // ✅ Auth
  const checkAuth = async () => {
    try {
      const res = await axios.get('/auth/me');
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    const res = await axios.post('/auth/register', formData);
    setUser(res.data.user);
    await fetchCart();
    await fetchOrders();
  };

  const login = async (formData) => {
    const res = await axios.post('/auth/login', formData);
    setUser(res.data.user);
    await fetchCart();
    await fetchOrders();
    return res.data;
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
    setCart([]);
    setOrders([]);
  };

  // ✅ Cart
  const fetchCart = async () => {
    try {
      const res = await axios.get('/cart');
      setCart(res.data.cart || []);
    } catch {
      setCart([]);
    }
  };

  const addToCart = async (productId, quantity) => {
    const res = await axios.post('/cart/add', { productId, quantity });
    setCart(res.data.cart);
    return res.data;
  };

  const updateCartItem = async (productId, quantity) => {
    const res = await axios.put('/cart/update', { productId, quantity });
    setCart(res.data.cart);
    return res.data;
  };

  const removeFromCart = async (productId) => {
    const res = await axios.delete(`/cart/remove/${productId}`);
    setCart(res.data.cart);
    return res.data;
  };

  const clearCart = async () => {
    const res = await axios.delete('/cart/clear');
    setCart([]);
    return res.data;
  };

  // ✅ Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get('/orders/my-orders');
      setOrders(res.data.orders || []);
      return res.data.orders;
    } catch (error) {
      console.error('Fetch orders failed:', error.response?.data?.message || error.message);
      setOrders([]);
      throw error;
    }
  };

  const createOrder = async (shippingAddress, paymentMethod) => {
    try {
      if (!cart || cart.length === 0) {
        throw new Error("Your cart is empty.");
      }

      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        shippingAddress, // object: { street, city, state, zipCode }
        paymentMethod // 'cash', 'card', 'upi'
      };

      const res = await axios.post('/orders', orderData);

      setOrders(prev => [...prev, res.data.order]);
      setCart([]); // clear cart
      return res.data.order;
    } catch (error) {
      console.error('Create order failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const res = await axios.put(`/orders/cancel/${orderId}`);
      setOrders(prev =>
        prev.map(order => (order._id === orderId ? res.data.order : order))
      );
      return res.data.order;
    } catch (error) {
      console.error('Cancel order failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        cart,
        orders,
        register,
        login,
        logout,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchOrders,
        createOrder,
        cancelOrder,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
