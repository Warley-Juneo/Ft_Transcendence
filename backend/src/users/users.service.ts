import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { UserResumeDto, UserProfileDto, UserLadderDto } from './dtos/output.dtos';
import { CreateUserDto } from './dtos/createUser.dto';
import { GameService } from 'src/game/game.service';
import { AddFriendDto, ProfileDto, UpdateCoinsDto, UpdateProfileDto } from './dtos/input.dtos';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository,
              private readonly gameService: GameService) {}


  async createUser(dto: CreateUserDto): Promise<User> {
    dto.avatar = "https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg";
    return await this.userRepository.createUser(dto);
  }

  async uploadPhoto(user_id: string, avatar: string): Promise<void> {
	const base64Data = avatar.replace(/^data:image\/png;base64,/, "");
	const uploadDir = path.resolve(__dirname, '..', 'uploads');
	const uploadPhotoPath = path.resolve(__dirname, '..', 'uploads', `${user_id}.png`);

	try {
		if (!fs.existsSync(uploadDir)) {
			await fs.promises.mkdir(uploadDir, { recursive: true });
		}
		await fs.promises.writeFile(uploadPhotoPath, base64Data, 'base64');
	} catch (error) {
		throw new Error(`\n\nError saving file: ${error.message}`); //TODO: change to custom error
	}
}

  async updateProfile(user_id: string, dto: UpdateProfileDto): Promise<UserResumeDto> {
	let user;
	if (dto.avatar) {
		await this.uploadPhoto(user_id, dto.avatar);
	}
	if (dto.nick_name) {
      user = await this.userRepository.updateNickname(user_id, dto);
    }

    return new UserResumeDto(user);
  }

  async updateCoins(userId: string, dto: UpdateCoinsDto): Promise<UserResumeDto> {
	const user = await this.userRepository.updateCoins(userId, dto);
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
    let wins = await this.gameService.numberOfUserMatchWins(user.id);
    let loses = await this.gameService.numberOfUserMatchLoses(user.id);
    let draws = await this.gameService.numberOfUserMatchDraws(user.id);
    let ladder = await this.userRepository.findAllUsers();

    const position = ladder.findIndex(u => u.id === user.id) + 1;
	let objaux = {...user, wins, loses, draws, position}
    return new UserProfileDto(objaux);
  }

  async ladder(): Promise<UserLadderDto[]> {
    let ladder = await this.userRepository.ladder();

    let outputLadderDto: UserLadderDto[] = [];

    for(const obj of ladder) {
      const position = ladder.findIndex(u => u.nickname === obj.nickname) + 1;
	  const objAux = {...obj, lander: position}
      outputLadderDto.push(new UserLadderDto(obj));
    };
    return outputLadderDto;
  }
}
