import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Debug: verify value in console
console.log("API baseURL:", baseURL);

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
const token = localStorage.getItem("token");
if (token) config.headers.Authorization = `Bearer ${token}`;
return config;
});

export default api;

