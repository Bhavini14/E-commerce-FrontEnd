import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44378/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  return config;
});

export default api;