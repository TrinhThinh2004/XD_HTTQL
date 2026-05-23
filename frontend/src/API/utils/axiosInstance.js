import axios from "axios";
import store from "../../redux/store";
import { login, resetUser } from "../../redux/slice/userSlice";

const API_URL = import.meta.env.VITE_API_URL;
const baseURL = API_URL ? `${API_URL.replace(/\/$/, "")}/api/v1` : "/api/v1";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Request interceptor to add access token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.access_token || JSON.parse(localStorage.getItem("user") || "{}").access_token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401/403 (Unauthorized/Forbidden - often used for expired token)
    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(
          `${API_URL}/api/v1/user/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { access_token } = response.data;
        
        // Update Redux and LocalStorage
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const newUserData = { ...userData, access_token };
        localStorage.setItem("user", JSON.stringify(newUserData));
        store.dispatch(login(newUserData));

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        processQueue(null, access_token);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(resetUser());
        localStorage.removeItem("user");
        // We don't necessarily redirect here to avoid breaking component logic, 
        // but the user will be logged out in state.
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
