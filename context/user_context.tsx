import { User } from "@/@clean/shared/domain/entities/user";
import { ComfirmEmailResponse, CreateUserResponse, LoginResponse } from "@/@clean/shared/domain/types/user_responses";
import { httpUser } from "@/@clean/shared/infra/http";
import { UserRepositoryHttp } from "@/@clean/shared/infra/repositories/user_repository_http";
import { createContext } from "react";


type UserContextType = { 
    login: (email: string, password: string) => Promise<LoginResponse>;
    create: (user: User) => Promise<CreateUserResponse>;
    get: (user_id: string) => Promise<User | null>;
    comfirmEmail: (email: string, verificationCode: string) => Promise<ComfirmEmailResponse>;
    changePassword: (access_token: string, newPassword: string, oldPassword: string) => Promise<string>;
    deleteAccount: () => Promise<string>;
    forgotPassword: (email: string) => Promise<string>;
}

const defaultUserContext: UserContextType = { 
    login: async (email: string, password: string) => { 
        return { access_token: '', refresh_token: '', id_token: '', message: '' };
    },
    create: async (user: User) => { 
        return { user: user, message: '' };
    },
    get: async (user_id: string) => { 
        return null;
    },
    comfirmEmail: async (email: string, verificationCode: string) => { 
        return { message: '' };
    },
    changePassword: async (access_token: string, newPassword: string, oldPassword: string) => { 
        return '';
    },
    deleteAccount: async () => { 
        return '';
    },
    forgotPassword: async (email: string) => { 
        return '';
    }
};


export const UserContext = createContext<UserContextType>(defaultUserContext);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const userRepository = new UserRepositoryHttp(httpUser);
    
    async function login(email: string, password: string): Promise<LoginResponse> { 
        try {
            const result = await userRepository.login(email, password);
            console.log("CONTEXTO DE USUÁRIO LOGIN" + result)
            return result;
        } catch (error: any) {  
            throw new Error(error);
        }
    }

    async function create(user: User): Promise<CreateUserResponse> { 
        try {
            const result = await userRepository.create(user);
            console.log("CONTEXTO DE USUÁRIO CREATE" + result)
            return result as CreateUserResponse;
        } catch (error: any) {
            throw new Error(error);
        }
    }   

    async function get(user_id: string): Promise<User | null> { 
        return await userRepository.get(user_id);
    }

    async function comfirmEmail(email: string, verificationCode: string): Promise<ComfirmEmailResponse> { 
        try {
            const result = await userRepository.comfirmEmail(email, verificationCode);
            console.log("CONTEXTO DE USUÁRIO CONFIRM EMAIL" + result)
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function changePassword(access_token: string, newPassword: string, oldPassword: string): Promise<string> { 
        try {
            const result = await userRepository.changePassword(access_token, newPassword, oldPassword);
            console.log("CONTEXTO DE USUÁRIO CHANGE PASSWORD")
            console.log(result)
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function deleteAccount(): Promise<string> { 
        try {
            const result = await userRepository.deleteAccount();
            console.log("CONTEXTO DE USUÁRIO DELETE ACCOUNT" + result)
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function forgotPassword(email: string): Promise<string> {
        try {
            const result = await userRepository.forgotPassword(email);
            console.log("CONTEXTO DE USUÁRIO FORGOT PASSWORD" + result);
            return result; 
        } catch (error: any) {
            throw new Error(error);
        }
    }
    

    return (
        <UserContext.Provider value={{login, create, get, comfirmEmail, changePassword, deleteAccount, forgotPassword }}>
            {children}
        </UserContext.Provider>
    );
}
