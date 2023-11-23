import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ChatroomRepository } from './chatroom.repository';
import { DirectChatRoom, } from '@prisma/client';
import { CreateChatroomDto, CreateDirectChatroomDto, CreateDirectMessageDto, InputChatroomDto } from './dto/input.dto';
import { ChatroomDto, ChatroomsDto, OutputDirectMessageDto, OutputDirectMessagesDto } from './dto/output.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChatroomService {
	constructor(private readonly chatroomRepository: ChatroomRepository,
		private readonly userService: UsersService) { }

	async createChatroom(userId: string, dto: CreateChatroomDto): Promise<ChatroomsDto> {

		let chat = await this.chatroomRepository.findUniqueChatroom(dto.name);

		console.log("Create Chat: ", dto);
		if (chat) {
			throw new ForbiddenException('Chatroom name already exists');
		}

		if(dto.type == "protected") {
			if (dto.password == '') {
				throw new BadRequestException('Invalid password');
			}
			const	saltOrRound = 10;
			const hash = await bcrypt.hashSync(dto.password, saltOrRound);
			dto.password = hash;
		}
		await this.chatroomRepository.createChatroom(userId, dto);

		let response = await this.findPublicChatroom();

		return response;
	}

	async	deleteChatroom(userId: string, dto: InputChatroomDto): Promise<any> {

		let response;
		let chat = await this.chatroomRepository.findUniqueChatroom(dto.name);

		if(chat.owner.id == userId) {
			response = await this.chatroomRepository.deleteChatroom(dto.name);
		}
		else {
			throw new UnauthorizedException('Only the owner can delete the chat');
		}

		return response;
	}

	async	findUniqueChatroom(dto: InputChatroomDto): Promise<ChatroomDto> {

		let chat =  await this.chatroomRepository.findUniqueChatroom(dto.name);

		if (!chat) {
			throw new BadRequestException('Chatroom do not exist');
		}
		if (chat.type == "protected") {
			if (!bcrypt.compareSync(dto.password, chat.password)) {
				throw new UnauthorizedException("Invalid password");
			}
		}

		let outputDto = new ChatroomDto;
			outputDto.id = chat.id;
			outputDto.name = chat.name;
			outputDto.type = chat.type;
			outputDto.photoUrl = chat.photoUrl;
			outputDto.owner_id = chat.owner.id;
			outputDto.users = chat.users;
			outputDto.owner_nickname = chat.owner.nickname;

		return outputDto;
	}

	async findPublicChatroom(): Promise<ChatroomsDto> {

		let chats = await this.chatroomRepository.findPublicChatroom();

		let outputDto = new ChatroomsDto;
		outputDto.chatrooms = [];

		for (const obj of chats) {
			let dto = new ChatroomDto;
			dto.id = obj.id;
			dto.name = obj.name;
			dto.type = obj.type;
			dto.photoUrl = obj.photoUrl;
			dto.owner_nickname = obj.owner.nickname;
			dto.owner_id = obj.owner.id;
			dto.users = obj.users;
			outputDto.chatrooms.push(dto);
		}

		return outputDto;
	}

	async	findPrivateChatroom(userId: string): Promise<ChatroomsDto> {

		let chats = await this.chatroomRepository.findPrivateChatroom(userId);

		let outputDto = new ChatroomsDto;
		outputDto.chatrooms = [];
		
		for (const obj of chats) {
			let dto = new ChatroomDto;
			dto.id = obj.id;
			dto.name = obj.name;
			dto.type = obj.type;
			dto.photoUrl = obj.photoUrl;
			dto.owner_nickname = obj.owner.nickname;
			dto.owner_id = obj.owner.id;
			console.log("\n\n\nObj.users: ", obj.users, "\n\n\n");
			dto.users = obj.users.map(user => user.nickname);
			outputDto.chatrooms.push(dto);
		}

		return outputDto;
	}

	async createDirectChatroom(userId: string, dto: CreateDirectChatroomDto): Promise<OutputDirectMessagesDto> {

		console.log("USER1: ", userId);
		let user1 = await this.userService.findProfile(userId);

		let comp = user1._nickname.localeCompare(dto.user_nickname);
		let name;
		if (comp < 0) {
			name = user1._nickname + dto.user_nickname;
		}
		else {
			name = dto.user_nickname + user1._nickname
		}
		let chat: DirectChatRoom = await this.chatroomRepository.findDirectChatroom(name);

		if (!chat) {
			chat = await this.chatroomRepository.createDirectChatRoom(name);
		}

		return await this.findAllDirectMessage(name);
	}

	async createDirectMessage(userId: string, dto: CreateDirectMessageDto): Promise<OutputDirectMessagesDto> {

		console.log("USERID: ", userId);
		let user1 = await this.userService.findUser(userId);

		console.log("NICKNAME: ", user1.nickname)

		let comp = user1.nickname.localeCompare(dto.user_nickname);
		let chat;
		if (comp < 0) {
			chat = user1.nickname + dto.user_nickname;
		}
		else {
			chat = dto.user_nickname + user1.nickname
		}
		let msg = this.chatroomRepository.createDirectMessage(user1.nickname, chat, dto);

		return await this.findAllDirectMessage(chat); // findUnique
	}

	async findAllDirectMessage(name: string): Promise<OutputDirectMessagesDto> {
		let msg = await this.chatroomRepository.findAllDirectMessage(name);

		let outputDto = new OutputDirectMessagesDto;
		outputDto.direct_message = [];

		for (const obj of msg) {
			let dto = new OutputDirectMessageDto();
			dto.msg_id = obj.id;
			dto.content = obj.content;
			dto.imgUrl = obj.img_url;
			dto.user_nickname = obj.user_nickname;
			dto.date = obj.createdAt;
			outputDto.direct_message.push(dto);
		}

		return outputDto;
	}
}
