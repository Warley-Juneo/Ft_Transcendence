import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { UserEntity } from './user.entity';
import { userInfo } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { UserPerfilDto } from './dtos/output.dtos';
import { OutputLoginDto } from 'src/auth/dtos/output.dtos';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(outputLoginDto: OutputLoginDto): Promise<User> {
    //VALIDATE DTO/ENTITY
    const newUser = new UserEntity();
    newUser.login = outputLoginDto._login;
    newUser.email = outputLoginDto._email;
    newUser.first_name = outputLoginDto._first_name;
    newUser.last_name = outputLoginDto._last_name;
    newUser.nickname = outputLoginDto._nickname;
    newUser.avatar = outputLoginDto._avatar;

    return await this.userRepository.createUser(newUser);
  }

  async findUser(username: string): Promise<User> {
    return await this.userRepository.findUser(username);
  }
}
