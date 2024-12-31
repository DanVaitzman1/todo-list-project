import Cookies from 'js-cookie';
import axiosInstance from "./axiosInstance";

export const signin = async (email, password) => {
    try {
        const response = await axiosInstance.post("/auth/signin", {email, password});
        const {token} = response.data;
        // Store token and assignedUserId in cookies
        Cookies.set("authToken", token.token, {expires: 7});
        Cookies.set("assignedUserId", token.assigned_user_id, {expires: 7});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network Error");
    }
};

export const signup = async (email, password, first_name, last_name) => {
    const response = await axiosInstance.post("/auth/signup", {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name
    });
    return response.data;
};
