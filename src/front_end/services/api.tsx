import axios from 'axios';

const api = axios.create({
  baseURL: "http://10.205.34.65:5038/api/",
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export default api;