import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { userInfo } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { OnlineUsersDto, OutputOnlineUsersDto, UserPerfilDto } from './dtos/output.dtos';
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
    let response = await this.userRepository.findUser(userEmail);
    return response.friends;
  }

  async getOnlineUsers(userEmail: string): Promise<any> {
    console.log(userEmail);
    let response = await this.userRepository.getOnlineUsers(userEmail);

    // let onlineUsersDto = new OnlineUsersDto();
    // onlineUsersDto._avatar = response.
    console.log("REsponse:", response);
    return response;
  }

  async getProfile(userEmail: string): Promise<UserPerfilDto> {

    let response = await this.userRepository.getProfile(userEmail);
    let userPerfilDto = new UserPerfilDto();

    userPerfilDto._login = response.login;
    userPerfilDto._avatar = response.avatar;
    userPerfilDto._first_name = response.first_name;
    userPerfilDto._last_name = response.last_name;
    userPerfilDto._nickname = response.nickname;
    userPerfilDto._wins = response.wins;
    ;
  }

}
