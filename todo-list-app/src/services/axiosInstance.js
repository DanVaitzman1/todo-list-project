import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // Base API URL
    headers: {
        "Content-Type": "application/json", // Default headers
    },
    withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("authToken"); // Fetch token from cookies
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach the token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);

export default axiosInstance;
