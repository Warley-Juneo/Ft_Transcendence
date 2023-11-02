import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from './users.repository';
import { userInfo } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { UserPerfilDto } from './dtos/output.dtos';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  
  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.createUser(dto);
  }
  
  async findUser(userEmail: string): Promise<User> {
    return await this.userRepository.findUser(userEmail);
  }
  
  async getFriends(userEmail: string): Promise<User[]> {
    let response = await this.userRepository.findUser(userEmail);
    return response.friends;
  }

}
