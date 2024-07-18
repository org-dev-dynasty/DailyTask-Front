import { LoginResponse } from "@/@clean/shared/domain/types/user_responses";
import { User } from "../../shared/domain/entities/user";

export interface IUserRepository {
    create(user: User): Promise<User>;
    get(user_id: string): Promise<User | null>;
    login(email: string, password: string): Promise<LoginResponse>;
}