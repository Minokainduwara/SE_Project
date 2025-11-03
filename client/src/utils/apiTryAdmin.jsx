// src/utils/apiTryAdmin.js
import axios from "axios";

// Create a reusable axios instance
const api = axios.create({
  baseURL: "http://localhost:5001/api", // match your backend
  withCredentials: true, // 🔥 ensures cookies (sessions) are sent
});

export const apiTryAdmin = async (method, url, data = null, config = {}) => {
  try {
    // Prefix /admin automatically for all admin actions
    const fullUrl = `/admin${url}`;
    const response = await api[method](fullUrl, data, {
      ...config,
      withCredentials: true, // ensure cookies travel
    });
    return response.data;
  } catch (error) {
    console.error("❌ Admin API error:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
