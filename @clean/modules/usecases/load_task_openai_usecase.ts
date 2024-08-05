import { ITaskRepository } from "../interfaces/task_repo_interface";

export class LoadTaskOpenAIUseCase {
    constructor(private readonly task_repo: ITaskRepository) {}

    async execute(task_massage: string) {
        return await this.task_repo.loadTaskOpenAI(task_massage); 
    }
}