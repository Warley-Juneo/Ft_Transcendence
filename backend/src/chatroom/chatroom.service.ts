import { BadRequestException, ConsoleLogger, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ChatroomRepository } from './chatroom.repository';
import { DirectChatRoom, } from '@prisma/client';
import { AddChatUserDto, ChangePasswordDto, CreateChatroomDto, CreateDirectChatroomDto, CreateDirectMessageDto, InputChatroomDto, InputChatroomMessageDto } from './dto/input.dto';
import { ChatroomsDto, OutputDirectMessageDto, OutputDirectMessagesDto, OutputMessageDto, OutputValidateDto, UniqueChatroomDto } from './dto/output.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChatroomService {
	constructor(private readonly chatroomRepository: ChatroomRepository,
		private readonly userService: UsersService) { }

	async	validate(dto: OutputValidateDto): Promise<OutputValidateDto> {

		if (dto.owner_id && dto.validate_owner_id) {
			if ((dto.owner_id !== dto.validate_owner_id)) {
				throw new UnauthorizedException('Only the owner can delete the chat');
			}
		}
		if (dto.owner_id && dto.exclued_owner_id) {
			if ((dto.owner_id == dto.validate_owner_id)) {
				throw new UnauthorizedException('The owner can not be excluded');
			}
		}

		// console.log("\n\nQQQQQQQ\n\n", dto.password, "\n", dto.validate_password, "\n\n");
		if (dto.password) {

			if (!await bcrypt.compare(dto.validate_password, dto.password)) {
				throw new UnauthorizedException('Password incorrect')
			}
			if (dto.new_password != dto.confirm_password) {
				throw new BadRequestException('Invalid password confirmation.')
			}
		}

		if (dto.validate_member_id) {
			let member = '';
			for (const obj of dto.members) {
				if (dto.validate_member_id == obj.id) {
					return dto;
				}
			}
			throw new UnauthorizedException('Not a user of this chat');
		}

		if (dto.validate_admin_id) {
			let member = '';
			for (const obj of dto.admin) {
				if (dto.validate_admin_id == obj.id) {
					return dto;
				}
			}
			throw new UnauthorizedException('Not a admin of this chat');
		}
		return dto;
	}


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
		let response = await this.findAllPublicChatrooms();

		return response;
	}

	async deleteChatroom(userId: string, dto: InputChatroomDto): Promise<any> {

		let chat = await this.findUniqueChatroom(dto);

		let data_validation: OutputValidateDto = {} as OutputValidateDto;
		data_validation.validate_owner_id = userId;
		data_validation.owner_id = chat.owner_id;
		await this.validate(data_validation);

		await this.chatroomRepository.deleteChatroom(dto.chat_name);

		let response = await this.findAllPublicChatrooms();

		console.log("\n\nResponse ", response, "\n\n");

		return response;
	}



	async openChatroom(userId: string, dto: InputChatroomDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto);

		let data_validation: OutputValidateDto = {} as OutputValidateDto;
		if (chat.type == 'protected') {
			data_validation.validate_password = dto.password;
			data_validation.password = chat.password;
		}
		if (chat.type == 'private') {
			data_validation.members = chat.members;
			data_validation.validate_member_id = userId;
		}
		await this.validate(data_validation);

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

	async	changePassword(userId: string, dto: ChangePasswordDto): Promise<any> {

		let chat = await this.findUniqueChatroom(dto);

		if (!dto.new_password || !dto.new_password) {
			throw new BadRequestException('Invalid password.')
		}
		let data_validation: OutputValidateDto = {} as OutputValidateDto;
		data_validation.validate_password = dto.old_password;
		data_validation.password = chat.password;
		data_validation.new_password = dto.new_password;
		data_validation.confirm_password = dto.confirm_password;
		data_validation.owner_id = chat.owner_id;
		data_validation.validate_owner_id = userId;
		await this.validate(data_validation);

		const saltOrRound = 8;
		const hash = await bcrypt.hashSync(dto.new_password, saltOrRound);

		let where_filter = {
			name: chat.name,
		};
		let data_filter = {
			password: hash,
		};
		await await this.chatroomRepository.updateChatroom(where_filter, data_filter);
	}

	async	addAdmChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto);

		let data_validation: OutputValidateDto = {} as OutputValidateDto;
		data_validation.admin = chat.admin;
		data_validation.validate_admin_id = userId;

		await this.validate(data_validation);

		let where_filter = {
			name: chat.name,
		};
		let data_filter = {
				admin: {
					connect: {
						id: dto.add_id,
					},
				},
			};
		await await this.chatroomRepository.updateChatroom(where_filter, data_filter);

		let response = await this.findUniqueChatroom(dto);
		response.password = '';

		return response;
	}

	async	excludeAdmChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto);

		let data_validation: OutputValidateDto = {} as OutputValidateDto;

		data_validation.admin = chat.admin;
		data_validation.validate_admin_id = userId;
		data_validation.owner_id = chat.owner_id;
		data_validation.exclued_owner_id = dto.add_id;
		await this.validate(data_validation);

		let where_filter = {
			name: chat.name,
		};
		let data_filter ={
			admin: {
				disconnect: {
					id: dto.add_id,
				},
			},
		};
		await await this.chatroomRepository.updateChatroom(where_filter, data_filter);

		let response = await this.findUniqueChatroom(dto);
		response.password = '';
		return response;
	}

	async	addMemberChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto);

		let data_validation: OutputValidateDto = {} as OutputValidateDto;

		data_validation.admin = chat.admin;
		data_validation.validate_admin_id = userId;
		data_validation.members = chat.members;
		data_validation.validate_member_id = userId;
		await this.validate(data_validation);

		let where_filter = {
			name: chat.name,
		};
		let data_filter ={
			members: {
				connect: {
					id: dto.add_id,
				},
			},
		};
		await await this.chatroomRepository.updateChatroom(where_filter, data_filter);

		let response = await this.findUniqueChatroom(dto);
		response.password = '';
		return response;
	}

	async	excludeMemberChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto);

		let data_validation: OutputValidateDto = {} as OutputValidateDto;

		data_validation.admin = chat.admin;
		data_validation.validate_admin_id = userId;
		data_validation.owner_id = chat.owner_id;
		data_validation.exclued_owner_id = dto.add_id;
		await this.validate(data_validation);

		let where_filter = {
			name: chat.name,
		};
		let data_filter ={
			members: {
				disconnect: {
					id: dto.add_id,
				},
			},
		};
		await await this.chatroomRepository.updateChatroom(where_filter, data_filter);

		let response = await this.findUniqueChatroom(dto);
		response.password = '';
		return response;
	}

	async findUniqueChatroom(dto: InputChatroomDto | AddChatUserDto | ChangePasswordDto): Promise<UniqueChatroomDto> {

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
			outputDto.message.push(new OutputMessageDto(obj));
		}
		// console.log("\n\nFindUniqueChatroomDto", outputDto, "\n\n");
		return outputDto;
	}

	async findAllPublicChatrooms(): Promise<ChatroomsDto> {

		let where_filter = {
			type: {not: "private"},
		};
		return await this.findManyChatroom(where_filter);
	}

	async findPublicChatroom(dto: InputChatroomDto): Promise<UniqueChatroomDto> {
		return this.findUniqueChatroom(dto);
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
		let outpuDto = new OutputMessageDto(msg);


		return outpuDto;
	}

	async getChatroomMessage(dto: CreateDirectChatroomDto): Promise<{chat: DirectChatRoom, name: string}> {
		let name = dto.other_nickname + dto.my_nickname;
		if (dto.my_nickname.localeCompare(dto.other_nickname) < 0) {
			name = dto.my_nickname + dto.other_nickname;
		}
		let chat: DirectChatRoom = await this.chatroomRepository.findDirectChatroom(name);
		return {chat, name};
	}

	async openDirectChatroom(dto: CreateDirectChatroomDto): Promise<OutputDirectMessagesDto> {
		let {chat, name} = await this.getChatroomMessage(dto);

		if (!chat) {
			chat = await this.chatroomRepository.openDirectChatRoom(name);
		}

		return await this.findAllDirectMessage(name);
	}

	async createDirectMessage(dto: CreateDirectMessageDto): Promise<OutputDirectMessageDto> {
		let {chat, name} = await this.getChatroomMessage(dto);

		if (!chat) {
			throw new BadRequestException('chat name do not exist.');
		}

		let msg = await this.chatroomRepository.createDirectMessage(name, dto);

		let outpuDto = new OutputDirectMessageDto(msg);
		return outpuDto;
	}

	async findAllDirectMessage(name: string): Promise<OutputDirectMessagesDto> {
		let msg = await this.chatroomRepository.findAllDirectMessage(name);

		let outputDto = new OutputDirectMessagesDto;
		outputDto.direct_message = [];

		for (const obj of msg) {
			let dto = new OutputDirectMessageDto(msg);
			outputDto.direct_message.push(dto);
		}

		return outputDto;
	}
}
