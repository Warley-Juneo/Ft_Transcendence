import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepositoryInterface } from './interface/users.repository.interface';
import { User, Match } from '@prisma/client';
import { CreateUserDto } from './dtos/createUser.dto';
import { OnlineUsersDto } from './dtos/output.dtos';

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: CreateUserDto): Promise<User> {
    //CREATE USER INTO USER MODEL
    let response = await this.prisma.user.create({
      data: {
        login: user.login,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        nickname: user.nickname,
        avatar: "https://i.pinimg.com/originals/e7/3a/7c/e73a7c77c2430210674a0c0627d9ca76.jpg",
      },
    });
    return response;
  }

  async findUser(userEmail: string): Promise<User> {
    let response = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    return response;
  }

  async findUserWithFriends(userEmail: string): Promise<any> {
    let response = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        friends: true,
      }
    });
    return response;
  }

  async findOnlineUsers(userEmail: string): Promise<any> {
    let response = await this.prisma.user.findMany({
      where: {
        is_active: true,
        email: {
          not: {
            equals: userEmail,
          },
        },
      },
      select: {
        id: true,
        avatar: true,
        nickname: true,
        is_active: true,
      }
    });
    return response;
  }

}
