import { Task } from "@/@clean/shared/domain/entities/task";
import { ITaskRepository } from "../interfaces/task_repo_interface";

export class UpdateTaskUseCase {
    constructor(private readonly task_repo: ITaskRepository) {}

    async execute(task_id: string, task: Task): Promise<Task> {
        return await this.task_repo.update(task_id, task);
    }
}