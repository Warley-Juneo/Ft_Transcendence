import { Injectable } from "@nestjs/common";
import { CreateChatroomDto, CreateDirectMessageDto } from "./dto/input.dto";
import { PrismaService } from "src/database/prisma.service";
import { DirectChatRoom, DirectMessage } from "@prisma/client";

@Injectable()
export class ChatroomRepository {
	constructor(private readonly prisma: PrismaService) { }

	async createChatroom(userId: string, dto: CreateChatroomDto): Promise<void> {

		let chat = await this.prisma.chatRoom.create({
			data: {
				name: dto.name,
				type: dto.type,
				password: dto.password,
				photoUrl: dto.photoUrl,
				owner_id: userId,
				users: {
					connect:[
						{id: userId},
					],
				},
				admin: {
					connect: [
						{id: userId},
					],
				},
			},
		});
	}

	async	deleteChatroom(name: string): Promise<any> {

		let response = await this.prisma.chatRoom.delete({
			where: {
				name: name,
			},
		});
		console.log("\n\ndeleteChat", response, "\n\n");

		return await this.findPublicChatroom();
	}

	async	openChatroom(name:string): Promise<any> {
		let chat = await this.prisma.chatRoom.findUnique({
			where: {
				name: name,
			},
			select: {
				id: true,
				name: true,
				photoUrl: true,
				owner: {
					select: {
						id: true,
						nickname: true,
					},
				},
				admin: {
					select: {
						id: true,
						nickname: true,
					},
				},
				users: {
					select: {
						id: true,
						nickname: true,
					},
				},
				message: {
					select: {
						id: true,
						content: true,
						img_url: true,
						user: {
							select: {
								nickname: true,
								avatar: true,
							},
						},
						createdAt: true,
					}
				}
			},
		});
		return chat;
	}

	async	findUniqueChatroom(name: string): Promise<any> {
		let chat = await this.prisma.chatRoom.findUnique({
			where: {
				name: name,
			},
			select: {
				id: true,
				name: true,
				photoUrl: true,
				type: true,
				password: true,
				owner: {
					select: {
						id: true,
						nickname: true,
					},
				},
				users: {
					select: {
						id: true,
						nickname: true,
					},
				},
				message: {
					select: {
						id: true,
						content: true,
						img_url: true,
						user: {
							select: {
								nickname: true,
								avatar: true,
							},
						},
						createdAt: true,
					}
				}
			},
		});
		return chat;
	}

	async findPublicChatroom(): Promise<any> {
		let response = await this.prisma.chatRoom.findMany({
			where: {
				type: {not: "private"},
			},
			select: {
				id: true,
				name: true,
				type: true,
				photoUrl: true,
				owner: {
					select: {
						nickname: true,
						id: true,
					},
				},
				users: {
					select: {
						nickname: true,
					},
				},
			},
		});
		return response;
	}

	async	findPrivateChatroom(userId: string): Promise<any> {

		let response = await this.prisma.chatRoom.findMany({
			where: {
				users: {
					some: {
						id: userId,
					},
				},
				type: "private",
			},
			select: {
				id: true,
				name: true,
				photoUrl: true,
				owner: {
					select: {
						id: true,
						nickname: true,
					},
				},
				users: {
					select: {
						id: true,
						nickname: true,
					},
				},
			},
		});
		return response;
	}

	async createDirectChatRoom(name: string): Promise<DirectChatRoom> {

		let chat = await this.prisma.directChatRoom.create({
			data: {
				name: name,
			},
		});
		return chat;
	}

	async findDirectChatroom(name: string): Promise<DirectChatRoom> {
		let chat = this.prisma.directChatRoom.findUnique({
			where: {
				name: name,
			},
		});
		return chat;
	}

	async createDirectMessage(userNickname: string, chat: string, dto: CreateDirectMessageDto): Promise<DirectMessage[]> {

		let msg = await this.prisma.directMessage.create({
			data: {
				direct_chat_room_name: chat,
				user_nickname: userNickname,
				// img_url: dto.imgUrl,
				content: dto.content,
			},
		});
		console.log("MSG: ", msg);
		let response = await this.prisma.directMessage.findMany({
			where: {
				direct_chat_room_name: chat,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		return response;
	}

	async findAllDirectMessage(name: string): Promise<DirectMessage[]> {

		let response = await this.prisma.directMessage.findMany({
			where: {
				direct_chat_room_name: name,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		return response;
	}
}
