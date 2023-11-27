import { BadRequestException, ConsoleLogger, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ChatroomRepository } from './chatroom.repository';
import { DirectChatRoom, } from '@prisma/client';
import { AddChatUserDto, CreateChatroomDto, CreateDirectChatroomDto, CreateDirectMessageDto, InputChatroomDto } from './dto/input.dto';
import { ChatroomDto, ChatroomsDto, OutputDirectMessageDto, OutputDirectMessagesDto, OutputMessageDto, UniqueChatroomDto } from './dto/output.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChatroomService {
	constructor(private readonly chatroomRepository: ChatroomRepository,
		private readonly userService: UsersService) { }

	async createChatroom(userId: string, dto: CreateChatroomDto): Promise<ChatroomsDto> {

		console.log("\n\nCREATE_DTO:", dto, "\n\n");
		if (dto.type == "protected") {
			if (dto.password == '') {
				throw new BadRequestException('Invalid password');
			}
			const saltOrRound = 8;
			const hash = await bcrypt.hashSync(dto.password, saltOrRound);
			dto.password = hash;
		}
		await this.chatroomRepository.createChatroom(userId, dto);
		let response = await this.findPublicChatroom();

		return response;
	}

	async deleteChatroom(userId: string, dto: InputChatroomDto): Promise<any> {

		let response;
		let chat = await this.findUniqueChatroom(dto);

		if (chat.owner_id == userId) {
			response = await this.chatroomRepository.deleteChatroom(dto.chat_name);
		}
		else {
			throw new UnauthorizedException('Only the owner can delete the chat');
		}

		return response;
	}

	async openChatroom(userId: string, dto: InputChatroomDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto);
		console.log("\n\nchat_password:", chat.password, "\ndto_password", dto.password, "\n\n");
		if (chat.type == 'protected') {
			console.log("\n\nIf Chat Protegido!!!!\n\n");
			if (!await bcrypt.compare(dto.password, chat.password)) {
				console.log("\n\nif Compare!!!!\n\n");
				throw new UnauthorizedException('Password incorrect')
			}
		}

		let user = '';
		if (chat.type == 'private') {
			for (const obj of chat.users) {
				if (userId == obj.id) {
					user = obj.nickname;
				}
			}
		}
		if (user = '') {
			throw new UnauthorizedException('Not a user of this chat')
		}

		let outputDto = new UniqueChatroomDto;
		outputDto.id = chat.id;
		outputDto.name = chat.name;
		outputDto.type = chat.type;
		outputDto.users = chat.users;
		outputDto.message = chat.message;
		outputDto.owner_id = chat.owner_id;
		outputDto.photoUrl = chat.photoUrl;
		outputDto.owner_nickname = chat.owner_nickname;

		return outputDto;
	}

	async	addAdmChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {


		let chat = await this.chatroomRepository.findUniqueChatroom(dto.chat_name);
		console.log("\n\nChat", chat, "\n\n");
		let user_id;
		for (const obj of chat.admin) {
			if (userId == obj.id) {
				user_id = obj.id;
				break;
			}
		}
		console.log("\n\nUSER_ID", user_id, "\n\n");
		if (user_id == '') {
			throw new UnauthorizedException('Not a user of this chat')
		}
		let adm_id;
		for (const obj of chat.users) {
			console.log("\n\nADM_OBJ_IDS ****", dto.add_id, "\n", obj.id, "\n\n");
			if (dto.add_id == obj.id) {
				console.log("\n\nADM_OBJ_IDS", adm_id, "\n", obj.id, "\n\n");
				adm_id = obj.id;
			}
		}
		if (adm_id == '') {
			throw new UnauthorizedException('To be adm, has to be a user.')
		}
		console.log("\n\nAddAdm Chat", adm_id, "\n\n");

		await this.chatroomRepository.addAdminChatroom(dto.add_id, dto.chat_name);

		let response = await this.findUniqueChatroom(dto);
		return response;
	}

	async	addUserChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto);
		console.log("\n\nChat add_user", chat, "\n\n");
		let user_id;
		for (const obj of chat.adm) {
			console.log("\n\nUSER_OBJ_ID", userId, "\n", obj.id,  "\n\n");
			if (userId == obj.id) {
				user_id = obj.id;
				break;
			}
		}
		if (user_id == '') {
			throw new UnauthorizedException('Not a user of this chat')
		}
		console.log("\n\nUSER_ID", user_id, "\n\n");

		await this.chatroomRepository.addUserChatroom(dto.add_id, dto.chat_name);

		let response = await this.findUniqueChatroom(dto);

		return response;
	}

	async findUniqueChatroom(dto: InputChatroomDto | AddChatUserDto): Promise<UniqueChatroomDto> {

		let chat = await this.chatroomRepository.findUniqueChatroom(dto.chat_name);

		if (!chat) {
			throw new BadRequestException('Chatroom do not exist');
		}

		let outputDto = new UniqueChatroomDto;
		outputDto.id = chat.id;
		outputDto.name = chat.name;
		outputDto.password = chat.password;
		outputDto.type = chat.type;
		outputDto.photoUrl = chat.photoUrl;
		outputDto.owner_id = chat.owner.id;
		outputDto.owner_nickname = chat.owner.nickname;
		outputDto.users = chat.users;
		outputDto.adm = chat.admin;
		outputDto.banned = chat.banned;

		outputDto.message = [];
		for (const obj of chat.message) {
			let dto = new OutputMessageDto;
			dto.id = obj.id;
			dto.content = obj.content;
			dto.img_url = obj.imgUrl;
			dto.user_nickname = obj.user.nickname;
			dto.user_avatar = obj.user.avatar;
			dto.data = obj.createdAt;
			outputDto.message.push(dto);
		}
		console.log("\n\nFindUniqueChatroomDto", outputDto, "\n\n");
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

	async findPrivateChatroom(userId: string): Promise<ChatroomsDto> {

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

		let comp = user1.nickname.localeCompare(dto.user_nickname);
		let name;
		if (comp < 0) {
			name = user1.nickname + dto.user_nickname;
		}
		else {
			name = dto.user_nickname + user1.nickname
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
