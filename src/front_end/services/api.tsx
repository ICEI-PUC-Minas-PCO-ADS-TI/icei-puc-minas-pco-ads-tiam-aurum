import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: "https://aurumapi.onrender.com/api/",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default api;