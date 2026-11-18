import axios from "axios";

/**
 * Backend origin, no trailing slash. Configured via VITE_API_URL
 * (set in frontend/.env locally and in Netlify env for production).
 * All API paths are mounted under `${API_BASE}/api/...`.
 */
export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

/**
 * Shared axios client. baseURL already includes `/api`, and the user's
 * bearer token (if present) is attached to every request.
 */
const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("triksha_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
