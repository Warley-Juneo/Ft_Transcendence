import { Body, Controller, Get, Post, Query, Req} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserResumeDto, UserProfileDto, UserLadderDto } from './dtos/output.dtos';
import { AddFriendDto, ProfileDto, UpdateCoinsDto, UpdateProfileDto } from './dtos/input.dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<User> {
    return await this.service.createUser(dto);
  }

  @Post('updateProfile')
  async updateProfile(@Req() request, @Body() dto: UpdateProfileDto): Promise<UserResumeDto> {
	return await this.service.updateProfile(request.user.sub, dto);
  }

  @Post('updateCoins')
  async updateCoins(@Req() request, @Body() dto: UpdateCoinsDto): Promise<UserResumeDto> {
	return await this.service.updateCoins(request.user.sub, dto);
  }

  @Post('add_friend')
  async addFriend(@Req() request, @Body() dto: AddFriendDto): Promise<UserResumeDto[]> {
    return await this.service.addFriend(request.user.sub, dto);
  }

  @Post('delete_friend')
  async deleteFriend(@Req() request, @Body() dto: AddFriendDto): Promise<UserResumeDto[]> {
    return await this.service.deleteFriend(request.user.sub, dto);
  }

  @Get('friends')
  async findFriends(@Req() request): Promise<UserResumeDto[]> {
	return await this.service.findFriends(request.user.sub);
  }

  @Get('find-all')
  async findUserAll(): Promise<UserResumeDto[]> {
    return await this.service.findUserAll();
  }

  @Get('online')
  async findOnlineUsers(@Req() request): Promise<UserResumeDto[]> {
    return await this.service.findOnlineUsers(request.user.sub);
  }

  @Get('profile')
  async findProfile(@Query() dto: ProfileDto): Promise<UserProfileDto> {
    return await this.service.findProfile(dto);
  }

//   @Get('matches')
//   async findUserMatches(@Req() request): Promise<UserMatchesDto[]> {
//     return  this.service.findUserMatches(request.user.sub);
//   }

  @Get('ladder')
  async ladder(): Promise<UserLadderDto[]> {
    return this.service.ladder();
  }
}
