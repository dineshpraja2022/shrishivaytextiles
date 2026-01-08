import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 👈 backend URL
  withCredentials: true, // 👈 cookies allow
});

export default api;
