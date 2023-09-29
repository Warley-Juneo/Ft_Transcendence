import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UsersRepositoryInterface } from "./interface/users.repository.interface";
import { User, UserHistory } from "@prisma/client";

@Injectable()
export class UsersRepository implements UsersRepositoryInterface {
	constructor(private readonly prisma: PrismaService) {}

	async createHistory(): Promise<UserHistory> {
		var history = this.prisma.userHistory.create({
			data: {
				wins: 0,
				loses: 0,
				draws: 0,
			}
		})
		return history;
	}

	async createUser(user: UserEntity): Promise<User> {
		var user_history = await this.createHistory();

		var response = this.prisma.user.create({
			 data: {
				id: user.id,
				name : user.name,
				email: user.email,

				history: {
					connect: {
						id: user_history.id
					}
				}
			 }
		})
		return  response;
	}
}