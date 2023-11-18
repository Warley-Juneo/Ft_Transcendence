import { Controller, Body, Post, Req } from '@nestjs/common';
import { CreateChatroomDto } from './dto/input.dto';
import { ChatroomService } from './chatroom.service';
import { CreateDirectChatroomDto, CreateDirectMessageDto } from './dto/input.dto';

@Controller('chatroom')
export class ChatroomController {
	constructor(private readonly chatroomService: ChatroomService) {}

	@Post()
	async	create(@Body() dto: CreateChatroomDto): Promise<any> {
		return await this.chatroomService.create(dto);
	}

	@Post('direct-chatroom')
	async	createDirectChatroom(@Req() request, @Body() dto: CreateDirectChatroomDto): Promise<any> {
		return await this.chatroomService.createDirectChatroom(request.user.sub, dto);
	}

	@Post('direct-message')
	async	createDirectMessage(@Req() request, @Body() dto: CreateDirectMessageDto): Promise<any> {
		return await this.chatroomService.createDirectMessage(request.user.sub, dto);
	}
}
