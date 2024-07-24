import { LoginResponse } from '@/@clean/shared/domain/types/user_responses';
import { User } from '../../shared/domain/entities/user';
import { IUserRepository } from '../interfaces/user_repo_interface';

export class LoginUseCase {
    constructor(private readonly user_repo: IUserRepository) {}

    async execute(email: string, password: string): Promise<LoginResponse> {
        return await this.user_repo.login(email, password);
    }
}