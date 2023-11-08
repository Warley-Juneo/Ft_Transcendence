import { Body, Controller, Get, Post, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/createUser.dto';
import { OnlineUsersDto, UserProfileDto } from './dtos/output.dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return await this.service.createUser(dto);
  }
  
  @Get('friends')
  async getFriends(@Req() request): Promise<User[]> {
    return await this.service.getFriends(request.user.userEmail);
  }
  @Get('online')
  async findOnlineUsers(@Req() request): Promise<any> {
    return await this.service.findOnlineUsers(request.user.userEmail);
  }

  @Get('profile')
  async findProfile(@Req() request): Promise<UserProfileDto> {
    return await this.service.findProfile(request.user.userEmail);
  }
}
