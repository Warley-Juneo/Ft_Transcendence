import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UsersRepository } from "./users.repository";
import { UserEntity } from "./user.entity";
import { userInfo } from "os";
import { AuthService } from "src/auth/auth.service";
import { UserPerfilDto } from "./dtos/output.dtos";
import { AuthLoginDto } from "src/auth/dtos/input.dtos";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) {}

    async login(authLoginDto: AuthLoginDto): Promise<User> {
        //CHECK IF ALREADY EXISTS
        var user: User = await this.findUser(authLoginDto.email);
        if (!user) {
            user = await this.createUser(authLoginDto);
        }
        return user;
    }

    async createUser(authLoginDto: AuthLoginDto): Promise<User> {

        //VALIDATE DTO/ENTITY
        const newUser = new UserEntity();
        newUser.login = authLoginDto.login;
        newUser.email = authLoginDto.email;
        newUser.first_name = authLoginDto.first_name;
        newUser.last_name = authLoginDto.last_name;
        newUser.nickname = authLoginDto.nickname;

        return await this.userRepository.createUser(newUser);
    }

    async findUser (email: string): Promise<User> {

        return await this.userRepository.findUser(email);
    }

};