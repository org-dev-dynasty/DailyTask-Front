import { Task } from "@/@clean/shared/domain/entities/task";
import { ITaskRepository } from "../interfaces/task_repo_interface";

export class GetTaskByDayUseCase {
    constructor(private readonly task_repo: ITaskRepository) {}

    async execute(day: string): Promise<Task> {
        return await this.task_repo.taskByDay(day);
    }
}