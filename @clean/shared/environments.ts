import { IUserRepository } from '../modules/interfaces/user_repo_interface';
import { STAGE } from '../shared/domain/enum/stage_enum';
import { UserRepositoryMock } from '../shared/infra/repositories/user_repository_mock';
import { httpUser } from './infra/http';
import { UserRepositoryHttp } from './infra/repositories/user_repository_http';

export class Environments {
    stage: STAGE = STAGE.TEST;
    configureLocal() {
        process.env.STAGE = process.env.STAGE || "TEST";
    }

    loadEnvs() {
        if (!process.env.STAGE) {
            this.configureLocal();
        }
        this.stage = process.env.STAGE as STAGE;
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

    static getEnvs() {
        const envs = new Environments();
        envs.loadEnvs();
        return envs;
    }
}