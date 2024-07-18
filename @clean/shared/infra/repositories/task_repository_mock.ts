import { ITaskRepository } from "@/@clean/modules/interfaces/task_repo_interface";
import { Task } from "../../domain/entities/task";
import { GetAllTasksResponse } from "../../domain/types/task_responses";

export class TaskRepositoryMock implements ITaskRepository {
    create(task: Task): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    get(task_id: string): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<GetAllTasksResponse> {
        throw new Error("Method not implemented.");
    }
    update(task: Task): Promise<Task> {
        throw new Error("Method not implemented.");
    }
    delete(task_id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}