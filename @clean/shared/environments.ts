import { IUserRepository } from '../modules/interfaces/user_repo_interface';
import { STAGE } from '../shared/domain/enum/stage_enum';
import { httpUser } from './infra/http';
import { UserRepositoryMock } from '../shared/infra/repositories/user_repository_mock';
import { UserRepositoryHttp } from './infra/repositories/user_repository_http';
import { TaskRepositoryMock } from '../shared/infra/repositories/task_repository_mock';
import { TaskRepositoryHttp } from './infra/repositories/task_repository_http';
import { ITaskRepository } from '../modules/interfaces/task_repo_interface';

export class Environments {
    stage: STAGE = STAGE.TEST;
    configureLocal() {
        process.env.EXPO_PUBLIC_STAGE = process.env.EXPO_PUBLIC_STAGE || "TEST";
    }

    loadEnvs() {
        if (!process.env.EXPO_PUBLIC_STAGE) {
            this.configureLocal();
        }
        this.stage = process.env.EXPO_PUBLIC_STAGE as STAGE;
    }

    static getUserRepo(): IUserRepository {
        if (Environments.getEnvs().stage === STAGE.TEST) {
            return new UserRepositoryMock();
        }
        else if (Environments.getEnvs().stage === STAGE.DEV || Environments.getEnvs().stage === STAGE.PROD) {
            return new UserRepositoryHttp(httpUser);
        }
        else {
            return new UserRepositoryMock();
        }
    }

    static getTaskRepo(): ITaskRepository {
        if (Environments.getEnvs().stage === STAGE.TEST) {
            return new TaskRepositoryMock();
        }
        else if (Environments.getEnvs().stage === STAGE.DEV || Environments.getEnvs().stage === STAGE.PROD) {
            return new TaskRepositoryHttp(httpUser);
        }
        else {
            return new TaskRepositoryMock();
        }
    }

    static getEnvs() {
        const envs = new Environments();
        envs.loadEnvs();
        return envs;
    }
}