import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// Set default Axios configurations
axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data.user);
    } catch (error) {
      // Silently handle 401 - user is just not logged in
      if (error.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Auth check error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get('/api/cart');
      setCart(res.data.cart || []);
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error("Failed to fetch cart:", error.message);
      }
      setCart([]);
    }
  };

  const register = async (formData) => {
    const res = await axios.post('/api/auth/register', formData);
    setUser(res.data.user);
    await fetchCart();
  };

  const login = async (formData) => {
    const res = await axios.post('/api/auth/login', formData);
    setUser(res.data.user);
    await fetchCart();
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
    setCart([]);
  };

  return (
    <AuthContext.Provider value={{ user, loading, cart, register, login, logout, fetchCart }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};