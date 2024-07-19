import { GetAllTasksResponse } from "@/@clean/shared/domain/types/task_responses";
import { ITaskRepository } from "../interfaces/task_repo_interface";

export class GetAllTasksUseCase {
    constructor(private readonly task_repo: ITaskRepository) {}

    async execute(): Promise<GetAllTasksResponse> {
        return await this.task_repo.getAll();
    }
}