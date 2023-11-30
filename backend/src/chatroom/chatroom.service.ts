import { BadRequestException, ConsoleLogger, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ChatroomRepository } from './chatroom.repository';
import { DirectChatRoom, } from '@prisma/client';
import { AddChatUserDto, CreateChatroomDto, CreateDirectChatroomDto, CreateDirectMessageDto, InputChatroomDto, InputChatroomMessageDto } from './dto/input.dto';
import { ChatroomsDto, OutputDirectMessageDto, OutputDirectMessagesDto, OutputMessageDto, OutputValidateDto, UniqueChatroomDto } from './dto/output.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChatroomService {
	constructor(private readonly chatroomRepository: ChatroomRepository,
		private readonly userService: UsersService) { }

	async createChatroom(userId: string, dto: CreateChatroomDto): Promise<ChatroomsDto> {

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

	async	validate(dto: OutputValidateDto): Promise<OutputValidateDto> {
		
		if (dto.owner_id && dto.validate_owner_id) {
			if ((dto.owner_id !== dto.validate_owner_id)) {
				throw new UnauthorizedException('Only the owner can delete the chat');
			}
		}

		// console.log("\n\nQQQQQQQ\n\n", dto.password, "\n", dto.validate_password, "\n\n");
		if (dto.validate_password) {
			
			if (!await bcrypt.compare(dto.validate_password, dto.password)) {
				throw new UnauthorizedException('Password incorrect')
			}
		}
		return dto;
	}

	async deleteChatroom(userId: string, dto: InputChatroomDto): Promise<any> {

		let chat = await this.findUniqueChatroom(dto);

		let data_validation: OutputValidateDto = {} as OutputValidateDto;
		data_validation.validate_owner_id = userId;
		data_validation.owner_id = chat.owner_id;
		await this.validate(data_validation);
		
		await this.chatroomRepository.deleteChatroom(dto.chat_name);
		
		let response = await this.findPublicChatroom();

		console.log("\n\nResponse ", response, "\n\n");

		return response;
	}

	async openChatroom(userId: string, dto: InputChatroomDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto);
		console.log("\n\nchat_password:", chat.password, "\ndto_password", dto.password, "\n\n");

		let data_validation: OutputValidateDto = {} as OutputValidateDto;
		if (chat.type == 'protected') {
			data_validation.password = dto.password;
			data_validation.validate_password = chat.password;
		}
		await this.validate(data_validation);

		let member = '';
		if (chat.type == 'private') {
			for (const obj of chat.members) {
				if (userId == obj.id) {
					member = obj.nickname;
				}
			}
		}
		if (member = '') {
			throw new UnauthorizedException('Not a user of this chat')
		}

		let outputDto = new UniqueChatroomDto;
		outputDto.id = chat.id;
		outputDto.name = chat.name;
		outputDto.type = chat.type;
		outputDto.members = chat.members;
		outputDto.message = chat.message;
		outputDto.owner_id = chat.owner_id;
		outputDto.photoUrl = chat.photoUrl;
		outputDto.owner_nickname = chat.owner_nickname;
		outputDto.admin = chat.admin;
		outputDto.banned = chat.banned;

		return outputDto;
	}

	async	addAdmChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {


		let chat = await this.chatroomRepository.findUniqueChatroom(dto.chat_name);

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
		for (const obj of chat.members) {
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
		response.password = '';
		return response;
	}

	async	addMemberChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {

		let chat = await this.chatroomRepository.findUniqueChatroom(dto.chat_name);

		let user_id;
		for (const obj of chat.admin) {
			if (userId == obj.id) {
				user_id = obj.id;
				break;
			}
		}
		if (user_id == '') {
			throw new UnauthorizedException('Not a user of this chat')
		}

		await this.chatroomRepository.addMemberChatroom(dto.add_id, dto.chat_name);

		let response = await this.findUniqueChatroom(dto);
		response.password = '';
		return response;
	}

	async findUniqueChatroom(dto: InputChatroomDto | AddChatUserDto): Promise<UniqueChatroomDto> {

		console.log("findUniqueDto chat_name", dto.chat_name);
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
		outputDto.members = chat.members;
		outputDto.admin = chat.admin;
		outputDto.banned = chat.banned;

		outputDto.message = [];
		for (const obj of chat.message) {
			let dto = new OutputMessageDto;
			dto.id = obj.id;
			dto.content = obj.content;
			dto.img_url = obj.imgUrl;
			dto.user = obj.user;
			dto.date = obj.createdAt;
			outputDto.message.push(dto);
		}
		// console.log("\n\nFindUniqueChatroomDto", outputDto, "\n\n");
		return outputDto;
	}

	async findPublicChatroom(): Promise<ChatroomsDto> {

		let where_filter = {
			type: {not: "private"},
		};
		return await this.findManyChatroom(where_filter);
	}

	async findPrivateChatroom(userId: string): Promise<ChatroomsDto> {

		let where_filter = {
			members: {
				some: {
					id: userId,
				},
			},
			type: "private",
		};
		return await this.findManyChatroom(where_filter);
	}

	async findManyChatroom(where_filter: any): Promise<ChatroomsDto> {
	
		let chats = await this.chatroomRepository.findManyChatroom(where_filter);

		let outputDto = new ChatroomsDto;
		outputDto.chatrooms = [];

		for (const obj of chats) {
			let dto = new UniqueChatroomDto;
			dto.id = obj.id;
			dto.name = obj.name;
			dto.type = obj.type;
			dto.photoUrl = obj.photoUrl;
			dto.owner_nickname = obj.owner.nickname;
			dto.owner_id = obj.owner.id;
			dto.members = obj.members.map(user => user.nickname);
			outputDto.chatrooms.push(dto);
		}

		return outputDto;
	}

	async	createChatroomMessage(dto: InputChatroomMessageDto): Promise<OutputMessageDto> {

		let msg = await this.chatroomRepository.createChatroomMessage(dto);
		console.log("MESSAGEM", msg);
		let outpuDto = new OutputMessageDto;
		outpuDto.id = msg.id;
		outpuDto.content = msg.content;
		outpuDto.user = msg.user;
		outpuDto.date = msg.createdAt;


		return outpuDto;
	}

	async openDirectChatroom(dto: CreateDirectChatroomDto): Promise<OutputDirectMessagesDto> {

		let comp = dto.my_nickname.localeCompare(dto.other_nickname);
		let name;
		if (comp < 0) {
			name = dto.my_nickname + dto.other_nickname;
		}
		else {
			name = dto.other_nickname + dto.my_nickname
		}
		let chat: DirectChatRoom = await this.chatroomRepository.findDirectChatroom(name);

		if (!chat) {
			chat = await this.chatroomRepository.openDirectChatRoom(name);
		}

		return await this.findAllDirectMessage(name);
	}

	async createDirectMessage(dto: CreateDirectMessageDto): Promise<OutputDirectMessageDto> {

		let comp = dto.my_nickname.localeCompare(dto.other_nickname);
		let name;
		if (comp < 0) {
			name = dto.my_nickname + dto.other_nickname;
		}
		else {
			name = dto.other_nickname + dto.my_nickname
		}
		let chat: DirectChatRoom = await this.chatroomRepository.findDirectChatroom(name);

		if (!chat) {
			throw new BadRequestException('chat name do not exist.');
		}

		console.log("\n\nchat name", name, "\n\n");

		let msg = await this.chatroomRepository.createDirectMessage(name, dto);

		let outpuDto = new OutputDirectMessageDto;
		outpuDto.id = msg.id;
		outpuDto.content = msg.content;
		outpuDto.user = msg.user;
		outpuDto.date = msg.createdAt;
		return outpuDto;
	}

	async findAllDirectMessage(name: string): Promise<OutputDirectMessagesDto> {
		let msg = await this.chatroomRepository.findAllDirectMessage(name);

		let outputDto = new OutputDirectMessagesDto;
		outputDto.direct_message = [];

		for (const obj of msg) {
			let dto = new OutputDirectMessageDto();
			dto.id = obj.id;
			dto.content = obj.content;
			dto.img_url = obj.img_url;
			dto.user = obj.user;
			dto.date = obj.createdAt;
			outputDto.direct_message.push(dto);
		}

		return outputDto;
	}
}
