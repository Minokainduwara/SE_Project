import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5050/api", // adjust if your backend runs on another port
});

export default API;