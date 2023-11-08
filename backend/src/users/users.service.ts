import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { userInfo } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { OnlineUsersDto, OutputOnlineUsersDto, UserProfileDto } from './dtos/output.dtos';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  
  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(dto);
  }
  
  async findUser(userEmail: string): Promise<User> {
    return await this.userRepository.findUser(userEmail);
  }
  
  async getFriends(userEmail: string): Promise<User[]> {
    let response = await this.userRepository.findUserWithFriends(userEmail);
    return response.friends;
  }

  async findOnlineUsers(userEmail: string): Promise<any> {
    console.log(userEmail);
    let response = await this.userRepository.findOnlineUsers(userEmail);

    // let onlineUsersDto = new OnlineUsersDto();
    // onlineUsersDto._avatar = response.
    console.log("REsponse:", response);
    return response;
  }

  async findProfile(userEmail: string): Promise<UserProfileDto> {

    let response = await this.userRepository.findUser(userEmail);
    
    let userProfileDto = new UserProfileDto();

    userProfileDto._login = response.login;
    userProfileDto._avatar = response.avatar;
    userProfileDto._first_name = response.first_name;
    userProfileDto._last_name = response.last_name;
    userProfileDto._nickname = response.nickname;

    return userProfileDto;
  }

}
