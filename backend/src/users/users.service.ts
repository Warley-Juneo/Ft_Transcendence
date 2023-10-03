import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UsersRepository } from "./users.repository";
import { UserEntity } from "./user.entity";
import { userInfo } from "os";
import { LoginService } from "src/login/login.service";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) {}

    async login(userInfoResolved: any): Promise<User> {
        //CHECK IF ALREADY EXISTS
        var promise: User = await this.userRepository.findUser(userInfoResolved.data.email);
        console.log(promise);
        if (!promise) {
            promise = await this.createUser(userInfoResolved);
        }
        return promise;
    }

    async createUser(userInfoResolved: any): Promise<User> {

        const newUser = new UserEntity();
        newUser.login = userInfoResolved.data.login;
        newUser.email = userInfoResolved.data.email;
        newUser.nickname = userInfoResolved.data.usual_full_name;
        return await this.userRepository.createUser(newUser);
    }
};