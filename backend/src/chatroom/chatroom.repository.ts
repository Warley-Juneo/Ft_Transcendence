import { Injectable } from "@nestjs/common";
import { CreateChatroomDto, CreateDirectMessageDto } from "./dto/input.dto";
import { PrismaService } from "src/database/prisma.service";
import { DirectMessage } from "@prisma/client";

@Injectable()
export class ChatroomRepository {
	constructor(private readonly prisma: PrismaService) {}

	async	create(dto: CreateChatroomDto): Promise<any> {
	}

	async	createDirectChatRoom(name: string): Promise<any> {

		let chat = await this.prisma.directChatRoom.create({
			data: {
				name: name,
			},
		});
	}

	async	findDirectChatroom(name: string): Promise<any> {
		let response = this.prisma.directChatRoom.findUnique({
			where: {
				name: name,
			},
		});
		return response;
	}

	async	createDirectMessage(user: string, chat: string, dto: CreateDirectMessageDto): Promise<DirectMessage[]> {

		let msg = await this.prisma.directMessage.create({
			data: {
				direct_chat_room_name: chat,
				user: user,
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

	async	findDirectMessage(name: string): Promise<DirectMessage[]> {
	
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