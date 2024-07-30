import { IUserRepository } from "@/@clean/modules/interfaces/user_repo_interface";
import { User } from "../../domain/entities/user";
import { ComfirmEmailResponse, CreateUserResponse, LoginResponse } from "../../domain/types/user_responses";

export class UserRepositoryMock implements IUserRepository {
    create(user: User): Promise<CreateUserResponse> {
        throw new Error("Method not implemented.");
    }
    get(user_id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    login(email: string, password: string): Promise<LoginResponse> {
        throw new Error("Method not implemented.");
    }
    comfirmEmail(email: string, verificationCode: string): Promise<ComfirmEmailResponse> {
        throw new Error("Method not implemented.");
    }
    changePassword(access_token: string, newPassword: string, oldPassword: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}