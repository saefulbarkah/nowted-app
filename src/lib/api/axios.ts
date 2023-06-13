import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.BASE_URL}/api`,
  maxBodyLength: Infinity,
  timeout: 5000,
  headers: {
    "Content-Type": "Application/json",
  },
});

export default api;
