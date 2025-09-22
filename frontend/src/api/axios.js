import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Change this to your backend API base URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000, // 10 seconds timeout
});

// Optional: Add an interceptor so auth tokens are automatically attached to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or get it from a state/context if storing elsewhere
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
