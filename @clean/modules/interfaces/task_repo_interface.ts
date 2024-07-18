import { GetAllTasksResponse } from "@/@clean/shared/domain/types/task_responses";
import { Task } from "../../shared/domain/entities/task";

export interface ITaskRepository {
    create(task: Task): Promise<Task>;
    get(task_id: string): Promise<Task | null>;
    getAll(): Promise<GetAllTasksResponse>;
    update(task: Task): Promise<Task>;
    delete(task_id: string): Promise<boolean>;
}