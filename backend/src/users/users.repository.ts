import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UsersRepositoryInterface } from "./interface/users.repository.interface";
import { User, Match } from "@prisma/client";
import { UserEntity } from "./user.entity";

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(user: UserEntity): Promise<User> {

		var response = this.prisma.user.create({
			 data: {
				login : user.login,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				nickname: user.nickname,
				// avatar: user.avatar,
			 }
		})
		return  response;
	}

	async findUser(email: string): Promise<User> {

		var response = this.prisma.user.findUnique({
			where: {
				email: email
			}
		})
		return response;
	}
}