import axios from "axios";

const API_URL = "https://gs-sentinel-api.azurewebsites.net";

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 3_000,
  headers: {
    "Content-Type": "application/json",
  },
});
