import axios from "axios";

const api = axios.create({
  baseURL: "https://restaurunt-api.fwebstack.workers.dev/Users",
});

export default api;
