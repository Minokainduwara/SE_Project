import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    checkAuth();
    fetchCart();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/cart');
      setCart(res.data.cart);
    } catch (error) {
      console.error('Error fetching cart');
    }
  };

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    setUser(res.data.user);
    await fetchCart();
    return res.data;
  };

  const register = async (userData) => {
    const res = await axios.post('/api/auth/register', userData);
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
    setCart([]);
  };

  const addToCart = async (productId, quantity) => {
    const res = await axios.post('/api/cart/add', { productId, quantity });
    setCart(res.data.cart);
    return res.data;
  };

  const updateCart = async (productId, quantity) => {
    const res = await axios.put('/api/cart/update', { productId, quantity });
    setCart(res.data.cart);
  };

  const removeFromCart = async (productId) => {
    const res = await axios.delete(`/api/cart/remove/${productId}`);
    setCart(res.data.cart);
  };

  const clearCart = async () => {
    await axios.delete('/api/cart/clear');
    setCart([]);
  };

  const value = {
    user,
    loading,
    cart,
    login,
    register,
    logout,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    fetchCart
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
