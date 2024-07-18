import { IUserRepository } from "@/@clean/modules/interfaces/user_repo_interface";
import { User } from "../../domain/entities/user";
import { LoginResponse } from "../../domain/types/user_responses";

export class UserRepositoryMock implements IUserRepository {
    create(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    get(user_id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    login(email: string, password: string): Promise<LoginResponse> {
        throw new Error("Method not implemented.");
    }
}