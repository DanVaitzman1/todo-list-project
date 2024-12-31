import axiosInstance from "./axiosInstance";

// Fetch all users
export const getUsers = async () => {
    try {
        const response = await axiosInstance.get("/users");
        return response.data;
    } catch (error) {
        console.error("Error getting users:", error.response?.data || error.message);
        throw error.response ? error.response.data : new Error("Network Error");
    }
};