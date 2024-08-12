import { AxiosInstance } from "axios";
import { ITaskRepository } from "../../../modules/interfaces/task_repo_interface";
import { Task } from "../../domain/entities/task";
import { GetAllTasksResponse, TaskResponse } from "../../domain/types/task_responses";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class TaskRepositoryHttp implements ITaskRepository {
    constructor(private readonly httpTask: AxiosInstance) {}

    async create(task: Task): Promise<Task> {
        try {
            const token = await AsyncStorage.getItem('id_token');
            const response = await this.httpTask.post(`${process.env.EXPO_PUBLIC_API_URL}/create-task`, task, {
                headers: {Authorization: `Bearer ${token}`}
            });
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
        try {
            const token = await AsyncStorage.getItem('id_token');
            const response = await this.httpTask.get(`${process.env.EXPO_PUBLIC_API_URL}/get-task?task_id=${task_id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data as Task;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getAll(): Promise<GetAllTasksResponse> {
        try {
            const token = await AsyncStorage.getItem('id_token');
            console.log(token);
            const response = await this.httpTask.get<GetAllTasksResponse>(`${process.env.EXPO_PUBLIC_API_URL}/get-all-tasks`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            // console.log("RESPOSTA DA REQ GET ALL");
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            console.log(error.response.data);
            console.log(error.response.status);
            throw new Error(error);
        }
    }

    async update(task_id: string, task: Task): Promise<TaskResponse> {
        try {
            const token = await AsyncStorage.getItem('id_token');
            const response = await this.httpTask.put(`${process.env.EXPO_PUBLIC_API_URL}/update-task?task_id=${task_id}`, {
                task_name: task.task_name,
                task_date: task.task_date,
                task_hour: task.task_hour,
                task_description: task.task_description,
                task_local: task.task_local,
                category_id: task.category_id,
                task_status: task.task_status
            }, {
                headers: {Authorization: `Bearer ${token}`}
            });
            if (response?.status == 200) {
                console.log(task)
            }
            console.log("RESPOSTA DA REQ UPDATE");
            return response.data as TaskResponse;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async delete(task_id: string): Promise<string> {
        try {
            const token = await AsyncStorage.getItem('id_token');
            const response = await this.httpTask.delete(`${process.env.EXPO_PUBLIC_API_URL}/delete-task?task_id=${task_id}`,
                { headers: {Authorization: `Bearer ${token}`} }
            );
            if (response?.status == 200) {
            }
            console.log("RESPOSTA DA REQ DELETE" + response.data);
            return response.data as string;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async taskByDay(day: string): Promise<Task> {
        try {
            const token = await AsyncStorage.getItem('id_token');
            const response = await this.httpTask.get(`${process.env.EXPO_PUBLIC_API_URL}/get-task-by-day?task-day=${day}`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data as Task;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async updateStatus(task_id: string, status: string): Promise<Task> {
        try {
            const token = await AsyncStorage.getItem('id_token');
            const response = await this.httpTask.put(`${process.env.EXPO_PUBLIC_API_URL}/update-task-status?task-id=${task_id}`, { 'task-status': status },
            { headers: {Authorization: `Bearer ${token}`} }
            );
            if (response?.status == 200) {
                console.log(task_id)
            }
            console.log("RESPOSTA DA REQ UPDATE STATUS" + response.data);
            return response.data as Task;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getDisabledTasks(): Promise<Task[]> {
        try {
            const token = await AsyncStorage.getItem('id_token');
            const response = await this.httpTask.get(`${process.env.EXPO_PUBLIC_API_URL}/get-all-inactives-tasks`, {
                headers: {Authorization: `Bearer ${token}`}
            });
            return response.data as Task[];
        } catch (error: any) {
            throw new Error(error);
        }
    }
}