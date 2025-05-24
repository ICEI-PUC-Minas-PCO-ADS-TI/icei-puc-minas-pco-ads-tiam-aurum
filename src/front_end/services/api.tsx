import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.15.7:5038/api/",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export default api;