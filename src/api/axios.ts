import axios from "axios";

const URL = "https://challenge-front-7fw1.onrender.com";

export default axios.create({
  baseURL: URL,
});

export const axiosPrivate = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tkn');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);