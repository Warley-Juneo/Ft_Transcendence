import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthLoginDto } from "src/auth/dtos/input.dtos";
import { UsersService } from "./users.service";
import { User } from "@prisma/client";

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) {}

    @Post()
    async createUser(@Body() dto: AuthLoginDto): Promise<User> {
        return await this.service.createUser(dto)
    }

}