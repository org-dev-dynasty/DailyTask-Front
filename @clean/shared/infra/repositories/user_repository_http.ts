import { AxiosInstance } from 'axios';
import { IUserRepository } from '../../../modules/interfaces/user_repo_interface';
import { User } from '../../domain/entities/user';
import { LoginResponse } from '../../domain/types/user_responses';

export class UserRepositoryHttp implements IUserRepository {
    constructor(private readonly httpUser: AxiosInstance) {}

    async create(user: User): Promise<User> {
        return await this.httpUser.post(`${process.env.API_URL}/users`, user);
    }
    async get(user_id: string): Promise<User | null> {
        return await this.httpUser.get(`${process.env.API_URL}/users/${user_id}`);
    }
    async login(email: string, password: string): Promise<LoginResponse> {
        return await this.httpUser.post(`${process.env.API_URL}/users/login`, { email, password });
    }
}