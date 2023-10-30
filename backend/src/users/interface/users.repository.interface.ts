import { User } from '@prisma/client';
import { CreateUserDto } from '../dtos/createUser.dto';

export abstract class UsersRepositoryInterface {
  abstract createUser(user: CreateUserDto): Promise<User>;
  abstract findUser(email: String): Promise<User>;
  // abstract updateUser(email: String): Promise<User>;
}
