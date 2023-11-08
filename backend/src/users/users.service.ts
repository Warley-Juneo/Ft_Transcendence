import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { userInfo } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { OnlineUsersDto, OutputOnlineUsersDto, UserProfileDto } from './dtos/output.dtos';
import { CreateUserDto } from './dtos/createUser.dto';
import { GameService } from 'src/game/game.service';
import { AddFriendDto } from './dtos/input.dtos';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository,
              private readonly gameService: GameService) {}

  
  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(dto);
  }
  
  async addFriend(userId: string, nick_name: AddFriendDto): Promise<void> {
    return await this.userRepository.addFriend(userId, nick_name);
  }

  async deleteFriend(userId: string, nick_name: AddFriendDto): Promise<void> {
    return await this.userRepository.deleteFriend(userId, nick_name);
  }

  async findUserAuth(userEmail: string): Promise<User> {
    return await this.userRepository.findUserAuth(userEmail);
  }

  async findUser(userId: string): Promise<User> {
    return await this.userRepository.findUser(userId);
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

  async findProfile(userId: string): Promise<UserProfileDto> {

    let user = await this.userRepository.findUser(userId);
    let wins = await this.gameService.numberOfUserMatchWins(userId);
    let loses = await this.gameService.numberOfUserMatchLoses(userId);
    let draws = await this.gameService.numberOfUserMatchDraws(userId);
    

    let userProfileDto = new UserProfileDto();
    userProfileDto._login = user.login;
    userProfileDto._avatar = user.avatar;
    userProfileDto._first_name = user.first_name;
    userProfileDto._last_name = user.last_name;
    userProfileDto._nickname = user.nickname;
    userProfileDto._wins = wins;
    userProfileDto._loses = loses;
    userProfileDto._draws = draws;

    return userProfileDto;
  }

}
