import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * RESPONSE INTERCEPTOR
 * - Runs automatically for EVERY response
 * - Success → just return response
 * - Error → normalize backend error
 */
api.interceptors.response.use(
  (response) => {
    // ✅ Success responses pass through unchanged
    return response;
  },
  (error) => {
    // ❌ Error responses come here

    const backendError = error.response?.data?.error;

    // Normalize error format
    const normalizedError = {
      code: backendError?.code || "UNKNOWN_ERROR",
      message: backendError?.message || "Unexpected error occurred",
      status: error.response?.status || 500,
    };

    // IMPORTANT: reject with normalized error
    return Promise.reject(normalizedError);
  }
);

export default api;
