import { Injectable } from "@nestjs/common";
import { CreateChatroomDto, CreateDirectMessageDto, InputChatroomMessageDto } from "./dto/input.dto";
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
				members: {
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

		return true;
	}

	async	updateChatroom(where_filter: any, data_filter: any): Promise<any> {
		let chat = await this.prisma.chatRoom.update({
			where: where_filter,
			  data: data_filter,
			});
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
						avatar: true,
					},
				},
				admin: {
					select: {
						id: true,
						nickname: true,
					},
				},
				members: {
					select: {
						id: true,
						nickname: true,
						avatar: true,
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

	async	addMemberChatroom(adm_id: string, chat_name: string) {

		let chat = this.prisma.chatRoom.update({
			where: {
				name: chat_name,
			},
			data: {
				members: {
					connect: {
						id: adm_id,
					},
				},
			},
		});
		// console.log("\n\nADD USER Repository", chat, "\n\n");
		return chat;
	}

	async	addAdminChatroom(adm_id: string, chat_name: string) {

		let chat = await this.prisma.chatRoom.update({
			where: {
				name: chat_name,
			},
			data: {
				admin: {
					connect: {
						id: adm_id,
					},
				},
			},
		});
		console.log("\n\nADM", chat, "\n\n");
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
						avatar: true,
						is_active: true,
					},
				},
				admin: {
					select: {
						id: true,
						nickname: true,
						avatar: true,
						is_active: true,
					},
				},
				members: {
					select: {
						id: true,
						nickname: true,
						avatar: true,
						is_active: true,
					},
				},
				banned_user: {
					select: {
						id: true,
						nickname: true,
						avatar: true,
						is_active: true,
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

	async findManyChatroom(where_filter: any): Promise<any> {
		let response = await this.prisma.chatRoom.findMany({
			where: where_filter,
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
				members: {
					select: {
						nickname: true,
					},
				},
			},
		});
		return response;
	}

	async	createChatroomMessage(dto: InputChatroomMessageDto): Promise<any> {
		let msg = await this.prisma.message.create({
			data: {
				content: dto.content,
				chat_room: {
					connect: {
						id: dto.chatId,
					},
				},
				user: {
					connect: {
						id: dto.user_id,
					},

				},
			},
			select: {
				id: true,
				content: true,
				user: {
					select: {
						id: true,
						nickname: true,
						avatar: true,
						is_active: true,
					},
				},
				createdAt: true,
			},
		});
		return msg;
	}

	async openDirectChatRoom(name: string): Promise<DirectChatRoom> {

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

	async createDirectMessage(chat: string, dto: CreateDirectMessageDto): Promise<any> {

		let msg = await this.prisma.directMessage.create({
			data: {
				direct_chat_room: {
					connect: {
						name: chat,
					},
				},
				user: {
					connect: {
						nickname: dto.my_nickname,
					},
				},
				// img_url: dto.img_url,
				content: dto.content,
			},
			select: {
				id: true,
				content: true,
				direct_chat_room: {
					select: {
						name: true
					},
				},
				user: {
					select: {
						id: true,
						nickname: true,
						avatar: true,
						is_active: true,
					}
				},
				createdAt: true,
			},
		});
		return msg;
	}

	async findAllDirectMessage(name: string): Promise<any> {

		let response = await this.prisma.directMessage.findMany({
			where: {
				direct_chat_room_name: name,
			},
			orderBy: {
				createdAt: 'asc',
			},
			select: {
				id: true,
				content: true,
				user: {
					select: {
						id: true,
						nickname: true,
						avatar: true,
						is_active: true,
					},
				},
				createdAt: true,
			},
		});
		return response;
	}
}
