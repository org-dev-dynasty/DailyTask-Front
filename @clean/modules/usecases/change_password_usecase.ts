import { IUserRepository } from "../interfaces/user_repo_interface";

export class ChangePasswordUseCase {
    constructor(private readonly user_repo: IUserRepository) {}

    async execute(access_token: string, newPassword: string, oldPassword: string) {
        return await this.user_repo.changePassword(access_token, newPassword, oldPassword); 
    }
}