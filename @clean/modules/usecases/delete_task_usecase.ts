import { Task } from "@/@clean/shared/domain/entities/task";
import { ITaskRepository } from "../interfaces/task_repo_interface";

export class DeleteTaskUseCase {
    constructor(private readonly task_repo: ITaskRepository) {}

    async execute(task_id: string): Promise<boolean> {
        return await this.task_repo.delete(task_id);
    }
}