import axios from "axios";

const Base_URL = "/api/";

const api = axios.create({
  baseURL: Base_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
