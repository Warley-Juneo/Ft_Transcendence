import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepositoryInterface } from './interface/users.repository.interface';
import { User, Match, Ladder } from '@prisma/client';
import { CreateUserDto } from './dtos/createUser.dto';

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
      },
    });
    return response;
  }

  async findUser(userEmail: string): Promise<User> {
    var response = this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    return response;
  }
}
