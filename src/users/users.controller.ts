import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginUserDto } from "src/dtos/user.dtos";
import { UsersService } from "./users.service";
import { Users } from "@prisma/client";

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) {}

    @Post()
    async createUser(@Body() dto: LoginUserDto): Promise<Users> {
        return await this.service.createUser(dto)
    }
}