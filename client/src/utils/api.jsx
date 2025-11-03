import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // or 'http://localhost:5001' if you mounted routes without /api
  withCredentials: true, // crucial for session cookies
});

export default api;
