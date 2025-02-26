import axios from "axios";
import { env } from "~/env";
import { localStorageToken } from "../local-storage/token";
import { authApi } from "./auth.api";

export const api = axios.create({
  baseURL: env?.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorageToken.getAccessToken();

  if (!token) {
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 400) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorageToken.getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const { data } = await authApi.refreshToken(refreshToken);

        localStorageToken.setAccessToken(data.tokens.accessToken);
        localStorageToken.setRefreshToken(data.tokens.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.tokens.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Failed to refresh token:", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
