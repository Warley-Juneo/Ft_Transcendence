import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { OutputLoginDto } from 'src/auth/dtos/output.dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async createUser(@Body() dto: OutputLoginDto): Promise<User> {
    return await this.service.createUser(dto);
  }
}
