import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { UserEntity } from './user.entity';
import { userInfo } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { UserPerfilDto } from './dtos/output.dtos';
import { UserInfoDto } from 'src/auth/dtos/userInfo.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(userInfoDto: UserInfoDto): Promise<User> {
    //VALIDATE DTO/ENTITY
    const newUser = new UserEntity();
    newUser.login = userInfoDto._login;
    newUser.email = userInfoDto._email;
    newUser.first_name = userInfoDto._first_name;
    newUser.last_name = userInfoDto._last_name;
    newUser.nickname = userInfoDto._nickname;
    newUser.avatar = userInfoDto._avatar;

    return await this.userRepository.createUser(newUser);
  }

  async findUser(username: string): Promise<User> {
    return await this.userRepository.findUser(username);
  }
}
