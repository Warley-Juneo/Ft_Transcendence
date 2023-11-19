import { Injectable } from '@nestjs/common';
import { AddChatAdmDto, CreateChatroomDto, CreateDirectChatroomDto, CreateDirectMessageDto } from './dto/input.dto';
import { ChatroomRepository } from './chatroom.repository';
import { privateDecrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { DirectChatRoom, DirectMessage } from '@prisma/client';
import { OutputDirectMessageDto, OutputDirectMessagesDto } from './dto/output.dto';

@Injectable()
export class ChatroomService {
	constructor(private readonly chatroomRepository: ChatroomRepository,
				private readonly userService: UsersService) {}

	async	createChatroom(userId: string, dto: CreateChatroomDto): Promise<CreateChatroomDto> {
		
		let response = await this.chatroomRepository.createChatroom(userId, dto);
		return response;
	}

	async	createDirectChatroom(userId: string, dto: CreateDirectChatroomDto): Promise<OutputDirectMessagesDto> {

		console.log("USER1: ", userId);
		let user1 = await this.userService.findProfile(userId);
		let user2 = await this.userService.findProfile(dto.userId);

		let comp = user1._nickname.localeCompare(user2._nickname);
		let name;
		if (comp < 0) {
			name = user1._nickname + user2._nickname;
		}
		else {
			name = user2._nickname + user1._nickname
		}
		let chat: DirectChatRoom = await this.chatroomRepository.findDirectChatroom(name);
		
		if(!chat) {
			chat = await this.chatroomRepository.createDirectChatRoom(name);
		}
		return await this.findAllDirectMessage(name);
	}

	async	createDirectMessage(userId: string, dto: CreateDirectMessageDto): Promise<OutputDirectMessagesDto> {

		console.log("USERID: ", userId);
		let user1 = await this.userService.findUser(userId);
		let user2 = await this.userService.findUser(dto.userId);

		let comp = user1.nickname.localeCompare(user2.nickname);
		let chat;
		if (comp < 0) {
			chat = user1.nickname + user2.nickname;
		}
		else {
			chat = user2.nickname + user1.nickname
		}
		let msg = this.chatroomRepository.createDirectMessage(user1.nickname, chat, dto);
		
		return await this.findAllDirectMessage(chat);
	}

	async	findAllDirectMessage(name: string): Promise<OutputDirectMessagesDto> {
		let msg = await this.chatroomRepository.findDirectMessage(name);

		let outputDto = new OutputDirectMessagesDto;
		outputDto.direct_message = [];

		for(const obj of msg) {
			let dto = new OutputDirectMessageDto();
			dto.content = obj.content;
			dto.imgUrl = obj.img_url;
			dto.userId = obj.id;
			outputDto.direct_message.push(dto);
		}
		return outputDto;
	}
}
