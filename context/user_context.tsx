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
}

const defaultUserContext: UserContextType = { 
    login: async (email: string, password: string) => { 
        return { access_token: '', refresh_token: '' };
    },
    create: async (user: User) => { 
        return { user: user, message: '' };
    },
    get: async (user_id: string) => { 
        return null;
    },
    comfirmEmail: async (email: string, verificationCode: string) => { 
        return { message: '' };
    }
};


export const UserContext = createContext<UserContextType>(defaultUserContext);

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const userRepository = new UserRepositoryHttp(httpUser);

    async function login(email: string, password: string): Promise<LoginResponse> { 
        try {
            const result = await userRepository.login(email, password);
            console.log("CONTEXTO DE USUÁRIO LOGIN")
            console.log(result)
            return result as LoginResponse;
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
            console.log(result)
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return (
        <UserContext.Provider value={{login, create, get, comfirmEmail}}>
            {children}
        </UserContext.Provider>
    );
}
