import { User } from "../entities/user";

export type LoginResponse = {
    token: string;
    message: string;
}

export type CreateUserResponse = {
    user: User;
    message: string;
}