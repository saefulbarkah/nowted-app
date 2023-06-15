import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  maxBodyLength: Infinity,
  timeout: 5000,
  headers: {
    'Content-Type': 'Application/json',
  },
});

export default api;
