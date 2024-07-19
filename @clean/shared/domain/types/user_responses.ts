import { User } from "../entities/user";

export type LoginResponse = {
    token: string;
    message: string;
}

export type CreateUserResponse = {
    user: User;
    message: string;
}

export type ComfirmEmailResponse = {
    message: string;
}; 