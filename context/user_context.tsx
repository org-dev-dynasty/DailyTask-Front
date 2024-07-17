import { User } from "@/@clean/shared/domain/entities/user";
import { LoginResponse } from "@/@clean/shared/domain/types/user_responses";
import { httpUser } from "@/@clean/shared/infra/http";
import { UserRepositoryHttp } from "@/@clean/shared/infra/repositories/user_repository_http";
import { createContext } from "react";


type UserContextType = { 
    login: (email: string, password: string) => Promise<LoginResponse>;
    create: (user: User) => Promise<User>;
    get: (user_id: string) => Promise<User | null>;
}

const defaultUserContext: UserContextType = { 
    login: async (email: string, password: string) => { 
        return { token: '', message: '' };
    },
    create: async (user: User) => { 
        return user;
    },
    get: async (user_id: string) => { 
        return null;
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

    async function create(user: User): Promise<User> { 
        try {
            const result = await userRepository.create(user);
            console.log("CONTEXTO DE USUÁRIO CREATE" + result)
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }   

    async function get(user_id: string): Promise<User | null> { 
        return await userRepository.get(user_id);
    }

    return (
        <UserContext.Provider value={{login, create, get}}>
            {children}
        </UserContext.Provider>
    );
}
