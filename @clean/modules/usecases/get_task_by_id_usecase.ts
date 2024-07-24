import { Task } from "@/@clean/shared/domain/entities/task";
import { ITaskRepository } from "../interfaces/task_repo_interface";

export class GetTaskByIdUseCase {
    constructor(private readonly task_repo: ITaskRepository) {}

    async execute(task_id: string): Promise<Task | null> {
        return await this.task_repo.get(task_id);
    }
}