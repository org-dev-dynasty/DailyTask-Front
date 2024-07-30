import { LoginResponse, CreateUserResponse, ComfirmEmailResponse } from "@/@clean/shared/domain/types/user_responses";
import { User } from "../../shared/domain/entities/user";

export interface IUserRepository {
    create(user: User): Promise<CreateUserResponse>;
    get(user_id: string): Promise<User | null>;
    login(email: string, password: string): Promise<LoginResponse>;
    comfirmEmail(email: string, verification_code: string): Promise<ComfirmEmailResponse>;
    changePassword(access_token: string, newPassword: string, oldPassword: string): Promise<string>;
    deleteAccount(): Promise<string>;

    // forgotPassword(email: string): Promise<string>;
}