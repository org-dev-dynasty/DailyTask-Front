import { AxiosInstance } from "axios";
import { ITaskRepository } from "../../../modules/interfaces/task_repo_interface";
import { Task } from "../../domain/entities/task";
import { GetAllTasksResponse } from "../../domain/types/task_responses";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class TaskRepositoryHttp implements ITaskRepository {
    constructor(private readonly httpTask: AxiosInstance) { }

    async create(task: Task): Promise<Task> {
        try {
            const response = await this.httpTask.post(`${process.env.EXPO_PUBLIC_API_URL}/create-task`, task);
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
        return await this.httpTask.get(`${process.env.EXPO_PUBLIC_API_URL}/get-task?task_id=${task_id}`);
    }

    async getAll(): Promise<GetAllTasksResponse> {
        const response = await this.httpTask.get(`${process.env.EXPO_PUBLIC_API_URL}/get-all-tasks`);
        return response.data as GetAllTasksResponse;
    }

    async update(task_id: string, task: Task): Promise<Task> {
        try {
            const response = await this.httpTask.put(`${process.env.EXPO_PUBLIC_API_URL}/update-task`, task);
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
            const response = await this.httpTask.delete(`${process.env.EXPO_PUBLIC_API_URL}/delete-task?task_id=${task_id}`,
                {
                    headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` }
                });
            if (response?.status == 200) {
                router.replace('/home');
            }
            console.log("RESPOSTA DA REQ DELETE" + response.data);
            return true;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async taskByDay(day: string): Promise<GetAllTasksResponse> {
        const response = await this.httpTask.get(`${process.env.EXPO_PUBLIC_API_URL}/get-task-by-day?task-day=${day}`);
        return response.data as GetAllTasksResponse;
    }

    async updateStatus(task_id: string, status: string): Promise<Task> {
        try {
            const response = await this.httpTask.put(`${process.env.EXPO_PUBLIC_API_URL}/update-task-status?task-id=${task_id}`, { 'task-status': status }, { headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` } });
            if (response?.status == 200) {
                console.log(task_id)
            }
            console.log("RESPOSTA DA REQ UPDATE STATUS" + response.data);
            return response.data as Task;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}