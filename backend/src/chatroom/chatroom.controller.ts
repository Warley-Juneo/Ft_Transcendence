import { Controller, Body, Post } from '@nestjs/common';
import { CreateChatroomDto } from './dto/input.dto';
import { ChatroomService } from './chatroom.service';

@Controller('chatroom')
export class ChatroomController {
	constructor(private readonly chatroomService: ChatroomService) {}

	@Post()
	async	create(@Body() dto: CreateChatroomDto): Promise<any> {
		return await this.chatroomService.create(dto);
	}
}
