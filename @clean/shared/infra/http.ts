import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RefreshTokenResponse = {
    tokens: {
        access_token: string;
        refresh_token: string;
        id_token: string;
    },
    message: string;
}

export const httpUser = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
});

httpUser.interceptors.response.use(async response => {
    return response;
}, async error => {
    if(error.response.status === 401 && error.response.data.message === "The incoming token has expired"){
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        const response = await httpUser.post<RefreshTokenResponse>("/refresh-token", undefined, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`
            }
        });
        const tokens = response.data.tokens;
        await AsyncStorage.setItem("access_token", tokens.access_token);
        await AsyncStorage.setItem("refresh_token", tokens.refresh_token);
        await AsyncStorage.setItem("id_token", tokens.id_token);
        return httpUser.request(error.config);
    }
    else{
        return Promise.reject(error);
    }
});