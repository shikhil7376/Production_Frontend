import axios from "axios";
import errorHandle from "../Api/Error";

const BASE_URL =import.meta.env.VITE_BASE_URL

const api = axios.create({
  baseURL: BASE_URL, 
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response) {
      return errorHandle(error);
    } else {
      console.log("axios error:", error);
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default api;
