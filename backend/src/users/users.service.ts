import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { UserResumeDto, UserProfileDto, OutputUserMatchesDto, UserMatchesDto, OutputLadderDto, UserLadderDto } from './dtos/output.dtos';
import { CreateUserDto } from './dtos/createUser.dto';
import { GameService } from 'src/game/game.service';
import { AddFriendDto, ProfileDto, UpdateProfileDto } from './dtos/input.dtos';

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

    return new UserResumeDto(user);
  }

  async fillUserResumeDto(Data: any): Promise<UserResumeDto[]> {
	let outputUsersResumeDto: UserResumeDto[] = [];

	for (const obj of Data) {
	  outputUsersResumeDto.push(new UserResumeDto(obj));
	};

	return outputUsersResumeDto;
  }

  async addFriend(userId: string, nick_name: AddFriendDto): Promise<UserResumeDto[]> {
    let friends = await this.userRepository.addFriend(userId, nick_name);
	return friends ? await this.fillUserResumeDto(friends) : null;
}

  async deleteFriend(userId: string, nick_name: AddFriendDto): Promise<UserResumeDto[]> {
    let friends =  await this.userRepository.deleteFriend(userId, nick_name);
	return friends ? await this.fillUserResumeDto(friends) : null;
  }

  async findUserAuth(userEmail: string): Promise<User> {
    return await this.userRepository.findUserAuth(userEmail);
  }

  async findUser(userId: string): Promise<User> {
    return await this.userRepository.findUser(userId);
  }

  async findFriends(userId: string): Promise<UserResumeDto[]> {
    let user = await this.userRepository.findUserWithFriends(userId);
	return user ? await this.fillUserResumeDto(user.friends) : null;
  }

  async findUserAll(): Promise<UserResumeDto[]> {
    let users = await this.userRepository.findAllUsers();
	return users ? await this.fillUserResumeDto(users) : null;
  }

  async findOnlineUsers(userId: string): Promise<UserResumeDto[]> {
    let users = await this.userRepository.findOnlineUsers(userId);
	return users ? await this.fillUserResumeDto(users) : null;
  }

  async findProfile(dto: ProfileDto): Promise<UserProfileDto> {

    let user = await this.userRepository.findUserByNickname(dto.nick_name);

    console.log("\n\nfindProfile Service DTO: ", user);

    let wins = await this.gameService.numberOfUserMatchWins(user.id);
    let loses = await this.gameService.numberOfUserMatchLoses(user.id);
    let draws = await this.gameService.numberOfUserMatchDraws(user.id);
    let ladder = await this.userRepository.findAllUsers();

    const position = ladder.findIndex(u => u.id === user.id) + 1;

    let userProfileDto = new UserProfileDto();
    userProfileDto.login = user.login;
    userProfileDto.avatar = user.avatar;
    userProfileDto.first_name = user.first_name;
    userProfileDto.last_name = user.last_name;
    userProfileDto.nickname = user.nickname;
    userProfileDto.wins = wins;
    userProfileDto.loses = loses;
    userProfileDto.draws = draws;
    userProfileDto.ladder = position;

    return userProfileDto;
  }

  async findUserMatches(userId: string): Promise<OutputUserMatchesDto> {
    let as_player_1 =  await this.userRepository.findMatchesAsPlayer1(userId);
    let as_player_2 =  await this.userRepository.findMatchesAsPlayer2(userId);

    let outputUserMatchesDto = new OutputUserMatchesDto()
    outputUserMatchesDto.users = [];

    for (const obj of as_player_1) {
      let userMatchesDto = new UserMatchesDto();
      userMatchesDto.opponent = obj.player_2.nickname;
      userMatchesDto.opponent_avatar = obj.player_2.avatar;
      userMatchesDto.opponent_score = obj.score_p2;
      userMatchesDto.my_score = obj.score_p1;
      if (obj.draws == true){
        userMatchesDto.status = "DRAW";
      }
      else if (userMatchesDto.opponent_score < userMatchesDto.my_score) {
        userMatchesDto.status = "WINNER";
      }
      else
      userMatchesDto.status = "LOSER";
      outputUserMatchesDto.users.push(userMatchesDto);
    };

    for (const obj of as_player_2) {
      let userMatchesDto = new UserMatchesDto();
      userMatchesDto.opponent = obj.player_1.nickname;
      userMatchesDto.opponent_avatar = obj.player_1.avatar;
      userMatchesDto.opponent_score = obj.score_p1;
      userMatchesDto.my_score = obj.score_p2;
      if (obj.draws == true){
        userMatchesDto.status = "DRAW";
      }
      else if (userMatchesDto.opponent_score < userMatchesDto.my_score) {
        userMatchesDto.status = "WINNER";
      }
      else
      userMatchesDto.status = "LOSER";
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
      userLadderDto.id = obj.id;
      userLadderDto.avatar = obj.avatar;
      userLadderDto.nickname = obj.nickname;
      userLadderDto.points = obj.points;
      userLadderDto.matches = obj._count.match_as_player_1 + obj._count.match_as_player_2;
      userLadderDto.wins = obj._count.match_wins;
      userLadderDto.loses = obj._count.math_loses;
      userLadderDto.draws = userLadderDto.matches - (userLadderDto.wins + userLadderDto.loses);
      const position = ladder.findIndex(u => u.nickname === obj.nickname) + 1;
      userLadderDto.ladder = position;
      outputLadderDto.ladder.push(userLadderDto);
    };
    return outputLadderDto;
  }
}
