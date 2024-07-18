import { AxiosInstance } from "axios";
import { ITaskRepository } from "../../../modules/interfaces/task_repo_interface";
import { Task } from "../../domain/entities/task";
import { GetAllTasksResponse } from "../../domain/types/task_responses";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class TaskRepositoryHttp implements ITaskRepository {
    constructor(private readonly httpTask: AxiosInstance) {}

    async create(task: Task): Promise<Task> {
        try {
            const response = await this.httpTask.post(`${process.env.API_URL}/create-task`, task);
            if (response?.status == 201) {
                console.log(task)
                router.replace('/home');
            }
            console.log("RESPOSTA DA REQ CREATE" + response.data);
            return response.data as Task;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async get(task_id: string): Promise<Task | null> {
        return await this.httpTask.get(`${process.env.API_URL}/get-task?task_id=${task_id}`);
    }

    async getAll(): Promise<GetAllTasksResponse> {
        const response = await this.httpTask.get(`${process.env.API_URL}/get-all-tasks`);
        return response.data as GetAllTasksResponse;
    }

    async update(task: Task): Promise<Task> {
        try {
            const response = await this.httpTask.put(`${process.env.API_URL}/update-task`, task);
            if (response?.status == 200) {
                console.log(task)
                router.replace('/home');
            }
            console.log("RESPOSTA DA REQ UPDATE" + response.data);
            return response.data as Task;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async delete(task_id: string): Promise<boolean> {
        try {
            const response = await this.httpTask.delete(`${process.env.API_URL}/delete-task?task_id=${task_id}`);
            if (response?.status == 200) {
                router.replace('/home');
            }
            console.log("RESPOSTA DA REQ DELETE" + response.data);
            return true;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}