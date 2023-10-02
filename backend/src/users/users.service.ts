import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { LoginUserDto } from "src/dtos/user.dtos";
import { UsersRepository } from "./users.repository";
import { randomUUID } from "crypto";
import { HttpService } from "@nestjs/axios"; //Make HTTP Requests
import { Observable, last, lastValueFrom } from "rxjs";
import { UserEntity } from "./user.entity";
import { userInfo } from "os";
import { LoginService } from "src/login/login.service";

@Injectable()
export class UsersService {
    constructor(
        private readonly httpService: HttpService,
        private readonly userRepository: UsersRepository,
        private readonly loginService: LoginService) {}

    async createUser(dto: LoginUserDto): Promise<any> {

        var userInfoResolved = await this.loginService.Login(dto.authCode);

        //CHECK IF ALREADY EXISTS
        var promise: User = await this.userRepository.findUser(userInfoResolved.data.email);
        console.log(promise);
        if (!promise)
        {
            // SET USER_ENTITY
            const newUser = new UserEntity();
            newUser.login = userInfoResolved.data.login,
            newUser.email = userInfoResolved.data.email,
            newUser.nickname = userInfoResolved.data.usual_full_name,
            // console.log(newUser);
            promise = await this.userRepository.createUser(newUser);
        }
        else {
            console.log("USER ALREADY EXISTS")
            promise = await this.userRepository.findUser(userInfoResolved.data.email)
        }
        return promise;
    }
};