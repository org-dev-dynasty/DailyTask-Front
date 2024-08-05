import { Task } from "@/@clean/shared/domain/entities/task";
import { ITaskRepository } from "../interfaces/task_repo_interface";

export class GetDisabledTasksUseCase {
    constructor(private readonly task_repo: ITaskRepository) {}

    async execute(): Promise<Task[]> {
        return await this.task_repo.getDisabledTasks();
    }
}