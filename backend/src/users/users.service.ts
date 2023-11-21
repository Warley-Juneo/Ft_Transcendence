import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { userInfo } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { UserResumeDto, OutputUsersResumeDto, UserProfileDto, OutputUserMatchesDto, UserMatchesDto, OutputLadderDto, UserLadderDto } from './dtos/output.dtos';
import { CreateUserDto } from './dtos/createUser.dto';
import { GameService } from 'src/game/game.service';
import { AddFriendDto, UpdateProfileDto } from './dtos/input.dtos';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository,
              private readonly gameService: GameService) {}

  
  async createUser(dto: CreateUserDto): Promise<User> {
    dto.avatar = "https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg";
    return await this.userRepository.createUser(dto);
  }
  
  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UserResumeDto> {
    
    let user;
    if (dto.avatar) {
      user = await this.userRepository.updateAvatar(userId, dto);
    }
    if (dto.nick_name) {
      user = await this.userRepository.updateNickname(userId, dto);
    }

    let userResumeDto = new UserResumeDto;
    userResumeDto._id = user.id;
    userResumeDto._avatar = user.avatar;
    userResumeDto._nickname = user.nickname;
    userResumeDto._is_active = user.is_active;
    
    return userResumeDto;
  }

  async addFriend(userId: string, nick_name: AddFriendDto): Promise<OutputUsersResumeDto> {
    let friends = await this.userRepository.addFriend(userId, nick_name);
    if (!friends) {
      return null
    }
    let outputUsersResumeDto = new OutputUsersResumeDto();
    outputUsersResumeDto.users = [];

    for (const obj of friends) {
      let userResumeDto = new UserResumeDto();
      userResumeDto._id = obj.id;
      userResumeDto._avatar = obj.avatar;
      userResumeDto._nickname = obj.nickname;
      userResumeDto._is_active = obj.is_active;
      outputUsersResumeDto.users.push(userResumeDto);
    };
    return outputUsersResumeDto;
  }

  async deleteFriend(userId: string, nick_name: AddFriendDto): Promise<OutputUsersResumeDto> {
    let friends =  await this.userRepository.deleteFriend(userId, nick_name);

    if (!friends) {
      return null
    }

    let outputUsersResumeDto = new OutputUsersResumeDto();
    outputUsersResumeDto.users = [];

    for (const obj of friends) {
      let userResumeDto = new UserResumeDto();
      userResumeDto._id = obj.id;
      userResumeDto._avatar = obj.avatar;
      userResumeDto._nickname = obj.nickname;
      userResumeDto._is_active = obj.is_active;
      outputUsersResumeDto.users.push(userResumeDto);
    };
    return outputUsersResumeDto;
  }

  async findUserAuth(userEmail: string): Promise<User> {
    return await this.userRepository.findUserAuth(userEmail);
  }

  async findUser(userId: string): Promise<User> {
    return await this.userRepository.findUser(userId);
  }
  
  async findFriends(userId: string): Promise<OutputUsersResumeDto> {
    let user = await this.userRepository.findUserWithFriends(userId);
    
    if (!user) {
      return null
    }
    
    let outputUsersResumeDto = new OutputUsersResumeDto();
    outputUsersResumeDto.users = [];

    for (const obj of user.friends) {
      let userResumeDto = new UserResumeDto();
      userResumeDto._id = obj.id;
      userResumeDto._avatar = obj.avatar;
      userResumeDto._nickname = obj.nickname;
      userResumeDto._is_active = obj.is_active;
      outputUsersResumeDto.users.push(userResumeDto);
    };

    console.log("Friends:", outputUsersResumeDto);
    return outputUsersResumeDto;
  }

  async findOnlineUsers(userId: string): Promise<OutputUsersResumeDto> {

    let users = await this.userRepository.findOnlineUsers(userId);

    if (!users) {
      return null
    }
    
    let outputUsersResumeDto = new OutputUsersResumeDto();
    outputUsersResumeDto.users = [];

    for (const obj of users) {
      let userResumeDto = new UserResumeDto();
      userResumeDto._id = obj.id;
      userResumeDto._avatar = obj.avatar;
      userResumeDto._nickname = obj.nickname;
      userResumeDto._is_active = obj.is_active;
      outputUsersResumeDto.users.push(userResumeDto);
    };

    console.log("Online Users:", outputUsersResumeDto);
    return outputUsersResumeDto;
  }

  async findProfile(userId: string): Promise<UserProfileDto> {

    let user = await this.userRepository.findUser(userId);
    let wins = await this.gameService.numberOfUserMatchWins(userId);
    let loses = await this.gameService.numberOfUserMatchLoses(userId);
    let draws = await this.gameService.numberOfUserMatchDraws(userId);
    let ladder = await this.userRepository.findUserAll();
  
    const position = ladder.findIndex(u => u.id === userId) + 1;

    let userProfileDto = new UserProfileDto();
    userProfileDto._login = user.login;
    userProfileDto._avatar = user.avatar;
    userProfileDto._first_name = user.first_name;
    userProfileDto._last_name = user.last_name;
    userProfileDto._nickname = user.nickname;
    userProfileDto._wins = wins;
    userProfileDto._loses = loses;
    userProfileDto._draws = draws;
    userProfileDto._ladder = position;

    return userProfileDto;
  }

  async findUserMatches(userId: string): Promise<OutputUserMatchesDto> {
    let as_player_1 =  await this.userRepository.findMatchesAsPlayer1(userId);
    let as_player_2 =  await this.userRepository.findMatchesAsPlayer2(userId);

    let outputUserMatchesDto = new OutputUserMatchesDto()
    outputUserMatchesDto.users = [];

    for (const obj of as_player_1) {
      let userMatchesDto = new UserMatchesDto();
      userMatchesDto._opponent = obj.player_2.nickname;
      userMatchesDto._opponent_avatar = obj.player_2.avatar;
      userMatchesDto._opponent_score = obj.score_p2;
      userMatchesDto._my_score = obj.score_p1;
      if (obj.draws == true){
        userMatchesDto._status = "DRAW";
      }
      else if (userMatchesDto._opponent_score < userMatchesDto._my_score) {
        userMatchesDto._status = "WINNER";
      }
      else
      userMatchesDto._status = "LOSER";
      outputUserMatchesDto.users.push(userMatchesDto);
    };

    for (const obj of as_player_2) {
      let userMatchesDto = new UserMatchesDto();
      userMatchesDto._opponent = obj.player_1.nickname;
      userMatchesDto._opponent_avatar = obj.player_1.avatar;
      userMatchesDto._opponent_score = obj.score_p1;
      userMatchesDto._my_score = obj.score_p2;
      if (obj.draws == true){
        userMatchesDto._status = "DRAW";
      }
      else if (userMatchesDto._opponent_score < userMatchesDto._my_score) {
        userMatchesDto._status = "WINNER";
      }
      else
      userMatchesDto._status = "LOSER";
      outputUserMatchesDto.users.push(userMatchesDto);
    };

    return outputUserMatchesDto;
  }

  async ladder(): Promise<OutputLadderDto> {
    let ladder = await this.userRepository.ladder();

    let outputLadderDto = new OutputLadderDto();
    outputLadderDto.ladder = [];
    
    for(const obj of ladder) {
      let userLadderDto = new UserLadderDto();
      userLadderDto._id = obj.id;
      userLadderDto._avatar = obj.avatar;
      userLadderDto._nickname = obj.nickname;
      userLadderDto.points = obj.points;
      userLadderDto._matches = obj._count.match_as_player_1 + obj._count.match_as_player_2;
      userLadderDto._wins = obj._count.match_wins;
      userLadderDto._loses = obj._count.math_loses;
      userLadderDto._draws = userLadderDto._matches - (userLadderDto._wins + userLadderDto._loses);
      const position = ladder.findIndex(u => u.nickname === obj.nickname) + 1;
      userLadderDto._ladder = position;
      outputLadderDto.ladder.push(userLadderDto);
    };
    console.log("Ladder: ", outputLadderDto);
    return outputLadderDto;
  }
}
