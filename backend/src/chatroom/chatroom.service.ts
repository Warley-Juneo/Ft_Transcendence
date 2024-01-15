import { BadRequestException, ConsoleLogger, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ChatroomRepository } from './chatroom.repository';
import { DirectChatRoom, } from '@prisma/client';
import { AddChatUserDto, BanMember, ChangePasswordDto, CreateChatroomDto, CreateDirectChatroomDto, CreateDirectMessageDto, InputChatroomDto, InputChatroomMessageDto, WebsocketDto, WebsocketWithTimeDto } from './dto/input.dto';
import { ChatroomsDto, OutputDirectMessageDto, OutputMessageDto, OutputValidateDto, UniqueChatroomDto } from './dto/output.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ChatroomService {
	constructor(private readonly chatroomRepository: ChatroomRepository,
		private readonly userService: UsersService) { }

	async validate(dto: OutputValidateDto): Promise<OutputValidateDto> {

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

		let chat = await this.findUniqueChatroom(dto.chat_name);

		let data_validation: OutputValidateDto = {} as OutputValidateDto;
		data_validation.validate_owner_id = userId;
		data_validation.owner_id = chat.owner_id;
		await this.validate(data_validation);

		await this.chatroomRepository.deleteChatroom(dto.chat_name);

		let response = await this.findAllPublicChatrooms();

		return response;
	}

	async openChatroom(userId: string, dto: InputChatroomDto): Promise<UniqueChatroomDto> {

		let chat: UniqueChatroomDto = await this.findUniqueChatroom(dto.chat_name);

		if (chat.banned.find((item) => item.id == userId)) {
			throw new UnauthorizedException("You were banned of this chat!!!")
		}
		if (chat.type == "protected") {
			if (!await bcrypt.compare(dto.password, chat.password)) {
				throw new UnauthorizedException('Password incorrect')
			}
		}
		if (chat.type == "private") {
			if (!chat.members.find((item) => item.id == userId)) {
				throw new UnauthorizedException("You are not a member of this group")
			}
		}
		return chat;
	}

	async changePassword(userId: string, dto: ChangePasswordDto): Promise<any> {

		let chat = await this.findUniqueChatroom(dto.chat_name);

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

	async addAdmChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto.chat_name);

		if (chat.owner_id != userId) {
			if (!chat.admin.find((item) => item.id == userId)) {
				throw new UnauthorizedException("You are not adm of this group")
			}
			if (!chat.members.find((item) => item.id == dto.add_id)) {
				throw new UnauthorizedException("You can not add a adm that is not a member of this group")
			}
		}

		let where_filter = {
			name: chat.name,
		};
		let data_filter = {
			admin: {
				connect: {
					id: dto.add_id,
				},
			},
			banned_member: {
				disconnect: {
					id: dto.add_id,
				},
			},
		};
		await this.chatroomRepository.updateChatroom(where_filter, data_filter);

		let response = await this.findUniqueChatroom(dto.chat_name);
		response.password = '';

		return response;
	}

	async removeAdmChatroom(userId: string, dto: AddChatUserDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto.chat_name);

		if (chat.owner_id == dto.add_id) {
			throw new UnauthorizedException("You can not remove the owner from adm")
		}

		if (chat.owner_id != userId) {
			if (!chat.admin.find((item) => item.id == userId)) {
				throw new UnauthorizedException("You are not adm of this group");
			}
			if (chat.admin.find((item) => item.id == dto.add_id)) {
				throw new UnauthorizedException("You can not ban a adm from this group");
			}
		}

		let where_filter = {
			name: chat.name,
		};
		let data_filter = {
			admin: {
				disconnect: {
					id: dto.add_id,
				},
			},
		};
		await this.chatroomRepository.updateChatroom(where_filter, data_filter);

		let response = await this.findUniqueChatroom(dto.chat_name);
		response.password = '';

		return response;
	}

	async addMemberChatroom(userId: string, dto: WebsocketDto): Promise<UniqueChatroomDto> {

		let chat = await this.findUniqueChatroom(dto.chat_name);

		if (chat.type == "private") {
			if (!chat.admin.find((item) => item.id == userId)) {
				throw new UnauthorizedException("You are not adm of this group")
			}
		}

		let where_filter = {
			name: chat.name,
		};
		let data_filter = {
			members: {
				connect: {
					id: dto.other_id,
				},
			},
			banned_member: {
				disconnect: {
					id: dto.other_id,
				},
			},
		};
		await this.chatroomRepository.updateChatroom(where_filter, data_filter);

		let response = await this.findUniqueChatroom(dto.chat_name);
		console.log(response);
		response.password = '';
		return response;
	}

	async banMemberChatroom(userId: string, dto: BanMember): Promise<UniqueChatroomDto> {
		let chat = await this.findUniqueChatroom(dto.chat_name);

		if (chat.owner_id == dto.ban_id) {
			throw new UnauthorizedException("You can not ban the owner of the chatroom")
		}

		if (chat.owner_id != userId) {
			if (!chat.admin.find((item) => item.id == userId)) {
				throw new UnauthorizedException("You are not adm of this group");
			}
			if (chat.admin.find((item) => item.id == dto.ban_id)) {
				throw new UnauthorizedException("You can not ban a adm from this group");
			}
		}

		let where_filter = {
			name: chat.name,
		};
		let data_filter = {
			banned_member: {
				connect: {
					id: dto.ban_id,
				},
			},
			members: {
				disconnect: {
					id: dto.ban_id,
				},
			},
			admin: {
				disconnect: {
					id: dto.ban_id,
				},
			},
			muted_member: {
				disconnect: {
					id: dto.ban_id,
				},
			},
		};
		await this.chatroomRepository.updateChatroom(where_filter, data_filter);

		let response = await this.findUniqueChatroom(dto.chat_name);
		response.password = '';
		return response;
	}

	async	kickMemberChatroom(userId: string, dto: WebsocketWithTimeDto): Promise<void> {
		let chat = await this.findUniqueChatroom(dto.chat_name);

		console.log("\n\nEntrei kickMember Service\n\n");

		if (chat.owner_id == dto.other_id) {
			throw new UnauthorizedException("You can not ban the owner of the chatroom")
		}

		if (chat.owner_id != userId) {
			if (!chat.admin.find((item) => item.id == userId)) {
				throw new UnauthorizedException("You are not adm of this group");
			}
			if (chat.admin.find((item) => item.id == dto.other_id)) {
				throw new UnauthorizedException("You can not ban a adm from this group");
			}
		}

		if (!chat.members.find((item) => item.id == dto.other_id)) {
			throw new UnauthorizedException("You can not kick a non member");
		}

		let now = new Date();
		let time = now;

		let data_filter = {
			userId: {
				connect: {
					id: dto.other_id,
				},
			},
			chatroom: {
				connect: {
					id: dto.chat_id,
				},
			},

			freedom_time: time,
		};

		await this.chatroomRepository.kickChatroom(data_filter);

		let response = await this.findUniqueChatroom(dto.chat_name);
		response.password = '';
		console.log("\n\nResponse:\n", response);

	}

	async findUniqueChatroom(chat_name: string): Promise<UniqueChatroomDto> {

		let chat = await this.chatroomRepository.findUniqueChatroom(chat_name);

		if (!chat) {
			throw new BadRequestException('Chatroom do not exist');
		}

		let outputDto = new UniqueChatroomDto(chat);
		outputDto.message = [];
		for (const obj of chat.message) {
			outputDto.message.push(new OutputMessageDto(obj));
		}
		return outputDto;
	}


	async findAllPublicChatrooms(): Promise<ChatroomsDto> {

		let where_filter = {
			type: { not: "private" },
		};
		return await this.findManyChatroom(where_filter);
	}

	async findPublicChatroom(dto: InputChatroomDto): Promise<UniqueChatroomDto> {
		return this.findUniqueChatroom(dto.chat_name);
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
			obj.members = obj.members.map(user => user.id);
			let dto = new UniqueChatroomDto(obj);
			outputDto.chatrooms.push(new UniqueChatroomDto(obj));
		}

		return outputDto;
	}

	async createChatroomMessage(dto: InputChatroomMessageDto): Promise<OutputMessageDto> {

		let msg = await this.chatroomRepository.createChatroomMessage(dto);
		return new OutputMessageDto(msg);
	}

	async getChatroomMessage(dto: CreateDirectChatroomDto): Promise<{ chat: DirectChatRoom, name: string }> {
		let name = dto.other_nickname + dto.my_nickname;
		if (dto.my_nickname.localeCompare(dto.other_nickname) < 0) {
			name = dto.my_nickname + dto.other_nickname;
		}
		let chat: DirectChatRoom = await this.chatroomRepository.findDirectChatroom(name);
		return { chat, name };
	}

	async openDirectChatroom(dto: CreateDirectChatroomDto): Promise<OutputDirectMessageDto[]> {
		let { chat, name } = await this.getChatroomMessage(dto);

		if (!chat) {
			chat = await this.chatroomRepository.openDirectChatRoom(name);
		}

		return await this.findAllDirectMessage(name);
	}

	async createDirectMessage(dto: CreateDirectMessageDto): Promise<OutputDirectMessageDto> {
		let { chat, name } = await this.getChatroomMessage(dto);

		if (!chat) {
			throw new BadRequestException('chat name do not exist.');
		}

		let msg = await this.chatroomRepository.createDirectMessage(name, dto);

		let outpuDto = new OutputDirectMessageDto(msg);
		return outpuDto;
	}

	async findAllDirectMessage(name: string): Promise<OutputDirectMessageDto[]> {
		let msg = await this.chatroomRepository.findAllDirectMessage(name);

		let outputDto: OutputDirectMessageDto[] = [];

		for (const obj of msg) {
			outputDto.push(new OutputDirectMessageDto(obj));
		}

		console.log("\n\nFindAllDirectMessageDto", outputDto, "\n\n");
		return outputDto;
	}
}
