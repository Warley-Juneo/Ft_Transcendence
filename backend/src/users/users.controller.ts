import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginUserDto } from "src/dtos/user.dtos";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) {}

    @Post()
    async createUser(@Body() dto: LoginUserDto): Promise<User> {
        return await this.service.createUser(dto)
    }

    
}