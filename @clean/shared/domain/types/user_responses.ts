import { User } from "../entities/user";

export type LoginResponse = {
    id_token: string;
    access_token: string;
    refresh_token: string;
}

export type CreateUserResponse = {
    user: User;
    message: string;
}

export type ComfirmEmailResponse = {
    message: string;
};

export type RefreshTokenResponse = {
    tokens: {
        access_token: string;
        id_token: string;
        refresh_token: string;
    },
    message: string;
}