import axios from "axios";

export const httpUser = axios.create({
    baseURL: process.env.API_URL
});