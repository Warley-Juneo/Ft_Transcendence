import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepositoryInterface } from './interface/users.repository.interface';
import { User, Match, Ladder } from '@prisma/client';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: UserEntity): Promise<User> {
    //CREATE USER INTO USER MODEL
    let response = await this.prisma.user.create({
      data: {
        login: user.login,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        nickname: user.nickname,
      },
    });
    //CREATE USER INTO LADDER MODEL
    let ladder = await this.prisma.ladder.create({
      data: {
        player_name: response.login,
      },
    });
    console.log(ladder);
    //CREATE USER INTO AVATAR MODEL
    let avatar = await this.prisma.avatar.create({
      data: {
        player_name: user.login,
        url: user.avatar,
      },
    });
    console.log(avatar);
    return response;
  }

  async findUser(email: string): Promise<User> {
    var response = this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return response;
  }
}
