import { User } from "@prisma/client";

export abstract class UsersRepositoryInterface {

	abstract createUser(user: UserEntity): Promise<User>;
	// abstract updateUser(email: String): Promise<UserEntity>;
	// abstract getUser(email: String): Promise<UserEntity>;
}