import { Task } from "@/@clean/shared/domain/entities/task";
import { ITaskRepository } from "../interfaces/task_repo_interface";

export class UpdateTaskStatusUseCase {
    constructor(private readonly task_repo: ITaskRepository) {}

    async execute(task_id: string, status: string): Promise<Task> {
        return await this.task_repo.updateStatus(task_id, status);
    }
}