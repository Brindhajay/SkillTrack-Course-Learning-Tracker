import axios from "../api/axios";

export const getProfile = async () => {
    const response = await axios.get("/users/profile");
    return response.data;
};

export const updateProfile = async (fullName) => {
    const response = await axios.put("/users/profile", {
        fullName,
    });
    return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
    const response = await axios.put("/users/change-password", {
        currentPassword,
        newPassword,
    });
    return response.data;
};