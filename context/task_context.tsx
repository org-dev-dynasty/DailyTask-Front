import { Task } from "@/@clean/shared/domain/entities/task";
import { GetAllTasksResponse, TaskResponse } from "@/@clean/shared/domain/types/task_responses";
import { httpUser } from "@/@clean/shared/infra/http";
import { TaskRepositoryHttp } from "@/@clean/shared/infra/repositories/task_repository_http";
import { createContext } from "react";

type TaskContextType = {
    create: (task: Task) => Promise<Task>;
    get: (task_id: string) => Promise<Task | null>;
    getAll: () => Promise<GetAllTasksResponse>;
    update: (task_id: string, task: Task) => Promise<TaskResponse>;
    deleteTask: (task_id: string) => Promise<string>;
    taskByDay: (day: string) => Promise<Task | null>;
    getDisabledTasks: () => Promise<Task[]>;
}

const defaultTaskContext: TaskContextType = {
    create: async (task: Task) => {
        return task;
    },
    get: async (task_id: string) => {
        return null;
    },
    getAll: async () => {
        return { tasks: {}, dots: {}, CurrentDay: '', message: '' };
    },
    update: async (task_id: string, task: Task) => {
        return { message: '' };
    },
    deleteTask: async (task_id: string) => {
        return '';
    },
    taskByDay: async (day: string) => {
        return null;
    },
    getDisabledTasks: async () => {
        return [];
    }
};

export const TaskContext = createContext<TaskContextType>(defaultTaskContext);

export function TaskContextProvider({ children }: { children: React.ReactNode }) {
    const taskRepository = new TaskRepositoryHttp(httpUser);

    async function create(task: Task): Promise<Task> {
        try {
            const result = await taskRepository.create(task);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function get(task_id: string): Promise<Task | null> {
        return await taskRepository.get(task_id);
    }

    async function getAll(): Promise<GetAllTasksResponse> {
        try {
            const result = await taskRepository.getAll();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function update(task_id: string, task: Task): Promise<TaskResponse> {
        try {
            const result = await taskRepository.update(task_id, task);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function deleteTask(task_id: string): Promise<string> {
        try {
            const result = await taskRepository.delete(task_id);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function taskByDay(day: string): Promise<Task> {
        try {
            const result = await taskRepository.taskByDay(day);
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async function getDisabledTasks(): Promise<Task[]> {
        try {
            const result = await taskRepository.getDisabledTasks();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    return (
        <TaskContext.Provider value={{ getAll, create, get, update, taskByDay, deleteTask, getDisabledTasks }}>
            {children}
        </TaskContext.Provider>
    );
}