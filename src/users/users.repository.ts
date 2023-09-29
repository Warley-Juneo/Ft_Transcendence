import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UsersRepositoryInterface } from "./interface/users.repository.interface";
import { Users } from "@prisma/client";

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {

	constructor(private readonly prisma: PrismaService) {}

	async createUser(user: UserEntity): Promise<Users> {
		var response = this.prisma.users.create({
			 data: {
				name : user.name,
				email: user.email
			 } 
		})
		return  response;
	}

	// updateUser(email: String): Promise<UserEntity> {
		
	// }

	// getUser(email: String): Promise<UserEntity> {
		
	// }
}