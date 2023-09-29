import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { LoginUserDto } from "src/dtos/user.dtos";
import { UsersRepository } from "./users.repository";
import { randomUUID } from "crypto";

@Injectable()
export class UsersService {
    constructor(private readonly repository: UsersRepository) {}

    async createUser(dto: LoginUserDto): Promise<User> {
        
        var newUser: UserEntity = {
            id: randomUUID(),
            name: dto.name,
            email: dto.email,
        }

        //Validade Dto

        var promise = await this.repository.createUser(newUser);

        return promise;
    }
};