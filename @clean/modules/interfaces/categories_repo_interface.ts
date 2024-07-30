import {GetAllCategoriesResponse} from "@/@clean/shared/domain/types/category_responses";
import {Category} from "@/@clean/shared/domain/entities/category";

export interface ICategoryRepository {
    createCategory(category: Category): Promise<Category>;
    getAll(): Promise<GetAllCategoriesResponse>;
}