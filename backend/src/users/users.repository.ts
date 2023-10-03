import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UsersRepositoryInterface } from "./interface/users.repository.interface";
import { User, UserHistory } from "@prisma/client";
import { UserEntity } from "./user.entity";

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(user: UserEntity): Promise<any> {

		var response = this.prisma.user.create({
			 data: {
				login : user.login,
				email: user.email,
				nickname: user.nickname,

				history: {
					create: {
						wins: 0,
						loses: 0,
						draws: 0,
					}
				}
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