import { AxiosInstance } from 'axios';
import { IUserRepository } from '../../../modules/interfaces/user_repo_interface';
import { User } from '../../domain/entities/user';
import { ComfirmEmailResponse, CreateUserResponse, LoginResponse } from '../../domain/types/user_responses';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class UserRepositoryHttp implements IUserRepository {
    constructor(private readonly httpUser: AxiosInstance) {}

    async create(user: User): Promise<CreateUserResponse> {
        try {
            const response = await this.httpUser.post(`${process.env.API_URL}/create-user`, {
                name: user.name,
                email: user.email,
                password: user.password,
                accepted_terms: user.accepted_terms,
                accepted_notifications_email: user.accepted_notifications_email
            });
            if (response?.status == 201) {
                console.log(user)
                router.replace('/login');
            }
            console.log("RESPOSTA DA REQ CREATE" + response.data);
            return response.data as CreateUserResponse;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async get(user_id: string): Promise<User | null> {
        return await this.httpUser.get(`${process.env.API_URL}/get-user?user_id=${user_id}`);
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        try{
            const response = await this.httpUser.post(`${process.env.API_URL}/login`, { email, password });
            if (response.data.token) {
                await AsyncStorage.setItem('token', response.data.token);
                router.replace('/home');
            }
            console.log("RESPOSTA DA REQ LOGIN" + response.data);
            return response.data as LoginResponse;
        } catch (error: any) {
            throw new Error(error);
        }
     }

     async comfirmEmail(email: string, verificationCode: string): Promise<ComfirmEmailResponse> {
        try {
            const response = await this.httpUser.post<ComfirmEmailResponse>(`${process.env.API_URL}/confirm-user-email`, { email, verificationCode });
            if (response.data) {
                router.replace('/home');
            }
            console.log("RESPOSTA DA REQ CONFIRM EMAIL" + response.data);
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}