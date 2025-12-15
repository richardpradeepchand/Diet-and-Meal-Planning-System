import axios from "axios";

const instance = axios.create({
  baseURL: "https://diet-and-meal-planning-system-2.onrender.com/v1",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
