import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import router from "@/router";
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      // if (status === 401) {
      //   console.warn("⚠️ Unauthorized — redirecting to login...");
      //   // Example: redirect to login page
      //   localStorage.clear();
      //   router.push({ name: "authorized" });
      // }

      if (status === 403) {
        console.error("🚫 Forbidden: You don’t have permission.");
        localStorage.clear();
        router.push({ name: "authorized" });
      }
    } else if (error.request) {
      console.error("❌ Network error — server not reachable.");
    } else {
      console.error("Unexpected error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
