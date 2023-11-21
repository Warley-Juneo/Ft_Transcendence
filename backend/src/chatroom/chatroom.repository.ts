import { Injectable } from "@nestjs/common";
import { CreateChatroomDto, CreateDirectMessageDto } from "./dto/input.dto";
import { PrismaService } from "src/database/prisma.service";
import { DirectChatRoom, DirectMessage } from "@prisma/client";

@Injectable()
export class ChatroomRepository {
	constructor(private readonly prisma: PrismaService) {}

	async	createChatroom(userId: string ,dto: CreateChatroomDto): Promise<CreateChatroomDto> {
		let chat = await this.prisma.chatRoom.create({
			data: {
				name: dto.name,
				type: dto.type,
				password: dto.password,
				photoUrl: dto.photoUrl,
				owner_id: userId,
			},
		});
		return dto;
	}

	async	createDirectChatRoom(name: string): Promise<DirectChatRoom> {

		let chat = await this.prisma.directChatRoom.create({
			data: {
				name: name,
			},
		});
		return chat;
	}

	async	findDirectChatroom(name: string): Promise<DirectChatRoom> {
		let chat = this.prisma.directChatRoom.findUnique({
			where: {
				name: name,
			},
		});
		return chat;
	}

	async	createDirectMessage(userNickname: string, chat: string, dto: CreateDirectMessageDto): Promise<DirectMessage[]> {

		let msg = await this.prisma.directMessage.create({
			data: {
				direct_chat_room_name: chat,
				user_nickname: userNickname,
				img_url: dto.imgUrl,
				content: dto.content,
			},
		}) ;
		console.log("MSG: ", msg);
		let response =  await this.prisma.directMessage.findMany({
			where: {
				direct_chat_room_name: chat,
			},
			orderBy:{
				createdAt: 'asc',
			},
		});
		return response;
	}

	async	findAllDirectMessage(name: string): Promise<DirectMessage[]> {
	
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