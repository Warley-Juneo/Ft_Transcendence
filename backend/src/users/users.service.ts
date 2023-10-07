import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { UsersRepository } from "./users.repository";
import { UserEntity } from "./user.entity";
import { userInfo } from "os";
import { AuthService } from "src/auth/auth.service";
import { UserLoginDto } from "./dtos/output.dtos";
import { AuthLoginDto } from "src/auth/dtos/input.dtos";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) {}

    async login(authLoginDto: AuthLoginDto): Promise<UserLoginDto> {
        //CHECK IF ALREADY EXISTS
        var user: User = await this.findUser(authLoginDto.email);
        if (!user) {
            user = await this.createUser(authLoginDto);
        }
        
        const newDto = new UserLoginDto();
        newDto._login = user.login;
        newDto._email = user.email;
        newDto._first_name = user.first_name;
        newDto._last_name = user.last_name;
        newDto._nickname = user.nickname;
        newDto._avatar = user.avatar;
        

        return newDto;
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