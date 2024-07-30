import { AxiosInstance } from "axios";
import {GetAllCategoriesResponse} from "../../domain/types/category_responses";
import {ICategoryRepository} from "@/@clean/modules/interfaces/categories_repo_interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Category} from "@/@clean/shared/domain/entities/category";

export class CategoryRepositoryHttp implements ICategoryRepository {
    constructor(private readonly httpTask: AxiosInstance) {}

    async createCategory(category: Category): Promise<Category> {
        try {
            const token = await AsyncStorage.getItem("id_token");
            const response = await this.httpTask.post(`${process.env.EXPO_PUBLIC_API_URL}/create-category`, category, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("RESPOSTA DA REQ CREATE CATEGORY" + response.data);
            return response.data as Category;
        } catch (error: any) {
            console.log(error.response.data)
            throw new Error(error);
        }
    }

    async getAll(): Promise<GetAllCategoriesResponse> {
        try {
            const token = await AsyncStorage.getItem('id_token');
            const response = await this.httpTask.get<GetAllCategoriesResponse>(`${process.env.EXPO_PUBLIC_API_URL}/get-all-categories`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            console.log("RESPOSTA DA REQ GET ALL");
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            console.log(error.response.status);
            throw new Error(error);
        }
    }


}