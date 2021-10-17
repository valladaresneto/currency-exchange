import {getConnection} from "typeorm";
import {UserRepository} from "../repositories/user-repository";
import {UserEntity} from "../models/user";

class UserService {
    private userRepository: UserRepository;

    public getOne = async (user: UserEntity) => {
        return await this.getRepository().findOne(user)
    }

    public create = async (user: UserEntity) => {
        return await this.getRepository().save(user);
    }

    private getRepository() {
        if (!this.userRepository) {
            this.userRepository = getConnection("user-db").getCustomRepository(UserRepository);
        }
        return this.userRepository;
    }
}

export { UserService };