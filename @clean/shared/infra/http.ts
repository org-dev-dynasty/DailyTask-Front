import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { RefreshTokenResponse } from "../domain/types/user_responses";

export const httpUser = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
});

httpUser.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error);
        if (error.response.status === 401 && error.response.data.message === "The incoming token has expired") {
            console.log("Token expirado");
            console.log("Refreshing the Token");
            const refreshToken = await AsyncStorage.getItem('refresh_token');
            const response = await httpUser.post<RefreshTokenResponse>(`${process.env.EXPO_PUBLIC_API_URL}/refresh-token`, undefined, {
                headers: {Authorization: `Bearer ${refreshToken}`}
            });
            console.log(response)
            await AsyncStorage.setItem('id_token', response.data.tokens.id_token);
            await AsyncStorage.setItem('refresh_token', response.data.tokens.refresh_token);
            return httpUser.request(error.config);
        }
    }
)