import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const tokens = localStorage.getItem("ichi_tokens");
    if (tokens) {
      const { access } = JSON.parse(tokens);
      config.headers.Authorization = `Bearer ${access}`;
    }
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const tokens = localStorage.getItem("ichi_tokens");
        if (tokens) {
          const { refresh } = JSON.parse(tokens);
          const { data } = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refresh,
          });
          localStorage.setItem(
            "ichi_tokens",
            JSON.stringify({ ...JSON.parse(tokens), access: data.access })
          );
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        }
      } catch {
        localStorage.removeItem("ichi_tokens");
        localStorage.removeItem("ichi_user");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
