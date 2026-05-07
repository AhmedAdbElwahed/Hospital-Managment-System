import axios from "axios";
import { getSession } from "next-auth/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    // Only use getSession on the client side
    if (typeof window !== "undefined") {
      const session = await getSession();
      const token = (session as { accessToken?: string })?.accessToken;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    // Note: For server-side requests, the token should be passed explicitly 
    // or handled by a different mechanism since auth() is preferred there.
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
