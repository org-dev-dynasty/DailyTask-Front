import { ICategoryRepository } from "@/@clean/modules/interfaces/categories_repo_interface";
import { Category } from "../../domain/entities/category";

export class CategoryRepositoryMock implements ICategoryRepository {
    createCategory(category: Category): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    deleteCategory(category_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    create(category: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    get(category_id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    update(category_id: string, category: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    delete(category_id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}