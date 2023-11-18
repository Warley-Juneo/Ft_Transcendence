import { Injectable } from '@nestjs/common';
import { CreateChatroomDto, CreateDirectChatroomDto, CreateDirectMessageDto } from './dto/input.dto';
import { ChatroomRepository } from './chatroom.repository';
import { privateDecrypt } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { DirectMessage } from '@prisma/client';

@Injectable()
export class ChatroomService {
	constructor(private readonly chatroomRepository: ChatroomRepository,
				private readonly userService: UsersService) {}

	async	create(dto: CreateChatroomDto): Promise<any> {
		let chat = await this.chatroomRepository.create(dto);
	}

	async	createDirectChatroom(userId: string, dto: CreateDirectChatroomDto): Promise<DirectMessage[]> {

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
		let chat = this.chatroomRepository.findDirectChatroom(name);
		
		if(!chat) {
			chat = await this.chatroomRepository.createDirectChatRoom(name);
		}
		return await this.chatroomRepository.findDirectMessage(name);
	}

	async	createDirectMessage(userId: string, dto: CreateDirectMessageDto): Promise<DirectMessage[]> {

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
		
		return await this.chatroomRepository.findDirectMessage(chat);
	}
}
