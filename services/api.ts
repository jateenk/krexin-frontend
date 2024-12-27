// services/api.ts (or api.js if you’re using plain JS)

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000", // Set this to your FastAPI server's base URL
});

export default api;
