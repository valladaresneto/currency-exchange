import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../models/user";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

}