import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepositoryInterface } from './interface/users.repository.interface';
import { User, Match } from '@prisma/client';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserResumeDto } from './dtos/output.dtos';
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

  async findUserAll(): Promise<any> {
    let response = this.prisma.user.findMany({
      orderBy: {
        points: 'desc',
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

  async findUserWithFriends(userId: string): Promise<any> {
    let response = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friends: true,
      }
    });
    return response;
  }

  async findOnlineUsers(userId: string): Promise<any> {
    let response = await this.prisma.user.findMany({
      where: {
        is_active: true,
        id: {
          not: {
            equals: userId,
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

  async addFriend(userId: string, dto: AddFriendDto): Promise<any> {
    
    try {
      let friend = await this.prisma.user.findUniqueOrThrow({
        where: {
          nickname: dto.nick_name,
        },
      });

      if (!friend) {
        return null;
      }
      let status = await this.prisma.user.update({
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
      let user = await this.findUserWithFriends(userId);
      
      return user.friends;
    
    } catch(error) {
      return null;
    }
  }

  async deleteFriend(userId: string, dto: AddFriendDto): Promise<any> {
    
    try {
      let friend = await this.prisma.user.findUniqueOrThrow({
        where: {
          nickname: dto.nick_name,
        },
      });

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
      let user = await this.findUserWithFriends(userId);

      return user.friends;

    } catch(error) {
      return null;
    }  
  }

  async findMatchesAsPlayer1(userId: string): Promise<any> {
    let response = await this.prisma.match.findMany({
      where: {
        player1_id: userId,
      },
      select: {
        player_2: {
          select: {
            nickname: true,
            avatar: true,
          },
        },
        score_p2: true,
        score_p1: true,
        draws: true,
      },
    });
    return response;
  }

  async findMatchesAsPlayer2(userId: string): Promise<any> {
    let response = await this.prisma.match.findMany({
      where: {
        player2_id: userId,
      },
      select: {
        player_1: {
          select: {
            nickname: true,
            avatar: true,
          },
        },
        score_p1: true,
        score_p2: true,
        draws: true,
      },
    });
    return response;
  }

  async ladder(): Promise<any> {
    let response = await this.prisma.user.findMany({
      select: {
        avatar: true,
        nickname: true,
        points: true,
        _count: {
          select: {
            match_as_player_1: true,
            match_as_player_2: true,
            match_wins: true,
            math_loses: true,
          },
        },
      },
      orderBy: {
        points: 'desc',
      },
    });
    return response;
  }
}
