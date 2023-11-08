import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepositoryInterface } from './interface/users.repository.interface';
import { User, Match } from '@prisma/client';
import { CreateUserDto } from './dtos/createUser.dto';
import { OnlineUsersDto } from './dtos/output.dtos';
import { AddFriendDto } from './dtos/input.dtos';

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

  async findUserAuth(userEmail: string): Promise<User> {
    let response = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    return response;
  }

  async findUser(userId: string): Promise<User> {
    let response = await this.prisma.user.findUnique({
      where: {
        id: userId,
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

  async addFriend(userId: string, dto: AddFriendDto): Promise<void> {
    let friend = await this.prisma.user.findUnique({
      where: {
        nickname: dto.nick_name,
      },
    });

    let eu = await this.findUser(userId);
    let euf = await this.findUserWithFriends(eu.email);
    console.log("old Friends: ", euf);

    let response = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          connect: [
            {id: friend.id}
          ]
        }
      }
    });

    let me = await this.findUser(userId);
    let mine = await this.findUserWithFriends(me.email);
    console.log("new Friends: ", mine);
  }

  async deleteFriend(userId: string, dto: AddFriendDto): Promise<void> {
    let friend = await this.prisma.user.findUnique({
      where: {
        nickname: dto.nick_name,
      },
    });

    let eu = await this.findUser(userId);
    let euf = await this.findUserWithFriends(eu.email);
    console.log("old Friends: ", euf);

    let response = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          disconnect: [
            {id: friend.id}
          ]
        }
      }
    });

    let me = await this.findUser(userId);
    let mine = await this.findUserWithFriends(me.email);
    console.log("new Friends: ", mine);
  }
}
