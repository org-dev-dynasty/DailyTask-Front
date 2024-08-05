import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { RefreshTokenResponse } from "../domain/types/user_responses";

export const httpUser = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
});

httpUser.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Contador de tentativas
      const MAX_ATTEMPTS = 1;
  
      // Verifique se a configuração da requisição já tem a propriedade _retry
      if (!error.config._retry) {
        error.config._retry = true;
        error.config._retryCount = 0;
      }
  
      // Incrementa o contador de tentativas
      error.config._retryCount += 1;
  
      // Verifica se o número máximo de tentativas foi excedido
      if (error.config._retryCount > MAX_ATTEMPTS) {
        return Promise.reject(error);
      }
  
      // Log de erro
      console.log(error);
  
      // Verifica se o erro é devido ao token expirado
      if (error.response && error.response.status === 401 && error.response.data.message === "The incoming token has expired") {
        console.log("Token expirado");
        console.log("Refreshing the Token");
  
        try {
          // Obtém o refresh token do armazenamento
          const refreshToken = await AsyncStorage.getItem('refresh_token');
  
          // Faz a requisição para renovar o token
          const response = await httpUser.post<RefreshTokenResponse>(`${process.env.EXPO_PUBLIC_API_URL}/refresh-token`, undefined, {
            headers: {Authorization: `Bearer ${refreshToken}`}
          });
  
          console.log(response);
  
          // Armazena os novos tokens
          await AsyncStorage.setItem('id_token', response.data.tokens.id_token);
          await AsyncStorage.setItem('refresh_token', response.data.tokens.refresh_token);
  
          // Atualiza o cabeçalho de autorização da requisição original
          error.config.headers['Authorization'] = `Bearer ${response.data.tokens.id_token}`;
  
          // Reenvia a requisição original com o novo token
          return httpUser.request(error.config);
        } catch (tokenRefreshError) {
          console.error("Failed to refresh token", tokenRefreshError);
          return Promise.reject(tokenRefreshError);
        }
      }
  
      // Rejeita a promessa com o erro original se não for um erro de token expirado
      return Promise.reject(error);
    }
  );