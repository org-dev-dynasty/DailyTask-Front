import { AxiosInstance } from "axios";
import { ITaskRepository } from "../../../modules/interfaces/task_repo_interface";
import { Task } from "../../domain/entities/task";
import {GetAllTasksResponse, GetTaskByIdResponse} from "../../domain/types/task_responses";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class TaskRepositoryHttp implements ITaskRepository {
    constructor(private readonly httpTask: AxiosInstance) {}

    async create(task: Task): Promise<Task> {
        try {
            const token = await AsyncStorage.getItem("id_token");
            const response = await this.httpTask.post(`${process.env.EXPO_PUBLIC_API_URL}/create-task`, task, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            if (response?.status == 201) {
                console.log(task)
                router.replace('/home');
            }
            console.log("RESPOSTA DA REQ CREATE" + response.data);
            return response.data as Task;
        } catch (error: any) {
            console.log(error.response.data)
            throw new Error(error);
        }
    }

    async get(task_id: string): Promise<Task | null> {
        try{
            const token = await AsyncStorage.getItem("id_token");
            const response = await this.httpTask.get<GetTaskByIdResponse>(`${process.env.EXPO_PUBLIC_API_URL}/get-task-by-id?task_id=${task_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.task;
        }
        catch (error: any) {
            console.log(error.response.data)
            throw new Error(error);
        }
    }

    async getAll(): Promise<GetAllTasksResponse> {
        const response = await this.httpTask.get(`${process.env.EXPO_PUBLIC_API_URL}/get-all-tasks`);
        return response.data as GetAllTasksResponse;
    }

    async update(task_id: string, task: Task): Promise<Task> {
        try {
            const token = await AsyncStorage.getItem("id_token");
            const response = await this.httpTask.put(`${process.env.EXPO_PUBLIC_API_URL}/update-task`, task,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
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
            const response = await this.httpTask.delete(`${process.env.EXPO_PUBLIC_API_URL}/delete-task?task_id=${task_id}`);
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
            const response = await this.httpTask.put(`${process.env.EXPO_PUBLIC_API_URL}/update-task-status?task-id=${task_id}`, { 'task-status': status });
            if (response?.status == 200) {
                console.log(task_id)
            }
            console.log("RESPOSTA DA REQ UPDATE STATUS" + response.data);
            return response.data as Task;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async loadTaskOpenAI(task_massage: string): Promise<Task> {
        try {
            const response = await this.httpTask.post(`${process.env.EXPO_PUBLIC_API_URL}/load-task-open-ai`, { 'task_message': task_massage });
            console.log("RESPOSTA DA REQ LOAD TASK OPENAI");
            console.log(response.data);
            return response.data as Task;
        } catch (error: any) {
            console.log('----------------')
            console.log(error.response.data)
            console.log('----------------')
            throw new Error(error);
        }
    }
}