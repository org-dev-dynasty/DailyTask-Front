import { Category } from "../entities/category";

export type GetAllCategoriesResponse = {
    message: string;
    categories: Category[];
};