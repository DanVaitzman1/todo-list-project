import axiosInstance from "./axiosInstance";

// Get tasks
export const getTasks = async () => {
    try {
        const response = await axiosInstance.get("/tasks");
        return response.data;
    } catch (error) {
        console.error("Error getting tasks:", error.response?.data || error.message);
        throw error.response ? error.response.data : new Error("Network Error");
    }
};

// Create a task
export const createTask = async (taskData) => {
    try {
        const response = await axiosInstance.post("/tasks", taskData);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error.response?.data || error.message);
        throw error.response ? error.response.data : new Error("Network Error");
    }
};

// Update a task
export const updateTask = async (taskId, taskData) => {
    try {
        const response = await axiosInstance.put(`/tasks/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error.response?.data || error.message);
        throw error.response ? error.response.data : new Error("Network Error");
    }
};

// Delete a task
export const deleteTask = async (taskId) => {
    try {
        const response = await axiosInstance.delete(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleteing task:", error.response?.data || error.message);
        throw error.response ? error.response.data : new Error("Network Error");
    }
};