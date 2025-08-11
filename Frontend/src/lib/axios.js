// lib/axios.js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://adpromotionplatform-backend.onrender.com/api",
  withCredentials: true, // ⬅️ This is crucial for sending/receiving cookies
});
