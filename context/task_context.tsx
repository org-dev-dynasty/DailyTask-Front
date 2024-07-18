import { Task } from "@/@clean/shared/domain/entities/task";
import { GetAllTasksResponse } from "@/@clean/shared/domain/types/task_responses";
import { httpUser } from "@/@clean/shared/infra/http";
import { TaskRepositoryHttp } from "@/@clean/shared/infra/repositories/task_repository_http";
import { createContext } from "react";

type TaskContextType = {
    getAll: () => Promise<GetAllTasksResponse>;
    create: (task: Task) => Promise<Task>;
    get: (task_id: string) => Promise<Task | null>;
}

const defaultTaskContext: TaskContextType = {
    getAll: async () => {
        return { tasks: {}, dots: {}, CurrentDay: '', message: '' };
    },
    create: async (task: Task) => {
        return task;
    },
    get: async (task_id: string) => {
        return null;
    }
};

export const TaskContext = createContext<TaskContextType>(defaultTaskContext);

export function TaskContextProvider({ children }: { children: React.ReactNode }) {
    const taskRepository = new TaskRepositoryHttp(httpUser);

    async function getAll(): Promise<GetAllTasksResponse> {
        try {
            const result = await taskRepository.getAll();
            return result;
        } catch (error: any) {
            throw new Error(error);
        }
    }

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

    return (
        <TaskContext.Provider value={{ getAll, create, get }}>
            {children}
        </TaskContext.Provider>
    );
}