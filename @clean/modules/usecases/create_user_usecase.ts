import { User } from "@/@clean/shared/domain/entities/user";
import { IUserRepository } from "../interfaces/user_repo_interface";


export class CreateUserUseCase {
    constructor(private readonly user_repo: IUserRepository) {}

    async execute(user: User): Promise<User> {
        return await this.user_repo.create(user);
    }
}