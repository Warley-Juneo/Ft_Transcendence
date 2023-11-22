import { Controller, Body, Post, Req, Get } from '@nestjs/common';
import { CreateChatroomDto } from './dto/input.dto';
import { ChatroomService } from './chatroom.service';
import { CreateDirectChatroomDto, CreateDirectMessageDto, AddChatAdmDto } from './dto/input.dto';
import { ChatroomsDto } from './dto/output.dto';

@Controller('chatroom')
export class ChatroomController {
	constructor(private readonly chatroomService: ChatroomService) { }

	@Get('find-all')
	async findAllChatrooms(): Promise<ChatroomsDto> {
		return this.chatroomService.findAllChatroom();
	}

	@Get('find-private')
	async	findPrivateChatroom(userId: string): Promise<ChatroomsDto> {
		return this.chatroomService.findPrivateChatroom(userId);
	}

	@Post('create-chatroom')
	async createChatroom(@Req() request, @Body() dto: CreateChatroomDto): Promise<ChatroomsDto> {
		return await this.chatroomService.createChatroom(request.user.sub, dto);
	}

	@Post('direct-chatroom')
	async createDirectChatroom(@Req() request, @Body() dto: CreateDirectChatroomDto): Promise<any> {
		return await this.chatroomService.createDirectChatroom(request.user.sub, dto);
	}

	@Post('direct-message')
	async createDirectMessage(@Req() request, @Body() dto: CreateDirectMessageDto): Promise<any> {
		return await this.chatroomService.createDirectMessage(request.user.sub, dto);
	}
}
