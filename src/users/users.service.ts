import { Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { LoginUserDto } from "src/dtos/user.dtos";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(data: LoginUserDto): Promise<Users> {
        return this.prisma.users.create({
            data,
        })
    }
};