import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginUserDto } from "src/dtos/user.dtos";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) {}

    @Get()
    getAllUsers(): any {
        return this.service.getAllUsers();
    }

    @Post()
    createUser(@Body() dto: LoginUserDto) {
        console.log(dto)
        this.service.createUser(dto)
    }
}