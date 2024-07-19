import { User } from "@/@clean/shared/domain/entities/user";
import { IUserRepository } from "../interfaces/user_repo_interface";


export class ComfirmEmailUseCase {
    constructor(private readonly user_repo: IUserRepository) {}

    async execute(email: string, verificationCode: string) {
        return await this.user_repo.comfirmEmail(email, verificationCode); 
    }
}  