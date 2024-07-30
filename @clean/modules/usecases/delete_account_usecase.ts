import { IUserRepository } from "../interfaces/user_repo_interface";

export class DeleteAccountUseCase {
    constructor(private readonly user_repo: IUserRepository) {}

    async execute(): Promise<string> {
        return await this.user_repo.deleteAccount(); 
    }
}