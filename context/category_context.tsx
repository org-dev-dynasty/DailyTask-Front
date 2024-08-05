import { httpUser } from "@/@clean/shared/infra/http";
import { createContext } from "react";
import {GetAllCategoriesResponse} from "@/@clean/shared/domain/types/category_responses";
import {CategoryRepositoryHttp} from "@/@clean/shared/infra/repositories/category_repository_http";
import {Category} from "@/@clean/shared/domain/entities/category";

type CategoryContextType = {
    createCategory: (category: Category) => Promise<Category>;
    getAll: () => Promise<GetAllCategoriesResponse>;
    deleteCategory: (category_id: string) => Promise<boolean>;
}

const defaultCategoryContext: CategoryContextType = {
    createCategory: async (category: Category): Promise<Category> => {
        return category;
    },
    getAll: async (): Promise<GetAllCategoriesResponse> => {
        return { categories: [{user_id: "", category_id: "",category_name: "", category_primary_color: "", category_secondary_color: ""}], message: '' };
    },
    deleteCategory: async (category_id: string) => {
        return true;
    }
};

export const CategoryContext = createContext<CategoryContextType>(defaultCategoryContext);

export function CategoryContextProvider({ children }: { children: React.ReactNode }) {
    const categoryRepository = new CategoryRepositoryHttp(httpUser);
    async function getAll(): Promise<GetAllCategoriesResponse> {
        try {
            const result = await categoryRepository.getAll();
            console.log("RESULT:" + result);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function createCategory(category: Category): Promise<Category> {
        try {
            const result = await categoryRepository.createCategory(category);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function deleteCategory(category_id: string): Promise<boolean> {
        try {
            const result = await categoryRepository.deleteCategory(category_id);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return (
        <CategoryContext.Provider value={{ getAll, createCategory, deleteCategory}}>
            {children}
        </CategoryContext.Provider>
    );
}