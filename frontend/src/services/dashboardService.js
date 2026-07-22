import axios from "../api/axios";

export const getDashboardData = async () => {

    const response = await axios.get("/dashboard");

    return response.data;

};