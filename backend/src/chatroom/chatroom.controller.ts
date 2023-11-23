import { Controller, Body, Post, Req, Get, Delete } from '@nestjs/common';
import { CreateChatroomDto, InputChatroomDto } from './dto/input.dto';
import { ChatroomService } from './chatroom.service';
import { CreateDirectChatroomDto, CreateDirectMessageDto, AddChatAdmDto } from './dto/input.dto';
import { ChatroomsDto, ChatroomDto } from './dto/output.dto';

@Controller('chatroom')
export class ChatroomController {
	constructor(private readonly chatroomService: ChatroomService) { }

	@Get('find-unique')
	async	findUniqueChatroom(dto: InputChatroomDto): Promise<ChatroomDto> {
		return	this.chatroomService.findUniqueChatroom(dto);
	}

	@Get('find-public')
	async findPublicChatrooms(): Promise<ChatroomsDto> {
		return await this.chatroomService.findPublicChatroom();
	}

	@Get('find-private')
	async	findPrivateChatroom(@Req() request): Promise<ChatroomsDto> {
		return await this.chatroomService.findPrivateChatroom(request.user.sub);
	}

	@Post('create-chatroom')
	async createChatroom(@Req() request, @Body() dto: CreateChatroomDto): Promise<ChatroomsDto> {
		return await this.chatroomService.createChatroom(request.user.sub, dto);
	}
	@Delete('delete-chatroom')
	async	deleteChatroom(@Req() request, @Body() dto: InputChatroomDto): Promise <any> {
		return this.chatroomService.deleteChatroom(request.user.sub, dto);
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
