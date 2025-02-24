import axios from "axios";

// create an Axios instance
const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
    },
});

// request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
