import { Controller, Body, Post, Req, Get, Delete, Query } from '@nestjs/common';
import { CreateChatroomDto, InputChatroomDto } from './dto/input.dto';
import { ChatroomService } from './chatroom.service';
import { CreateDirectChatroomDto, CreateDirectMessageDto, AddChatUserDto } from './dto/input.dto';
import { ChatroomsDto, UniqueChatroomDto } from './dto/output.dto';

@Controller('chatroom')
export class ChatroomController {
	constructor(private readonly chatroomService: ChatroomService) { }

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
		let response =  await this.chatroomService.createChatroom(request.user.sub, dto);
		return response;
	}

	@Delete('delete-chatroom')
	async	deleteChatroom(@Req() request, @Body() dto: InputChatroomDto): Promise <any> {
		console.log("\n\ndeltete-chatromm dto ", dto, "\n\n");
		return await this.chatroomService.deleteChatroom(request.user.sub, dto);
	}

	@Post('open')
	async	openChatroom(@Req() request, @Body() dto: InputChatroomDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.openChatroom(request.user.sub, dto);
	}

	@Post('add-member')
	async	addMemberChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.addMemberChatroom(request.user.sub, dto);
	}

	@Post('add-adm')
	async	addAdmChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.addAdmChatroom(request.user.sub, dto);
	}

	@Post('direct-chatroom')
	async createDirectChatroom(@Body() dto: CreateDirectChatroomDto): Promise<any> {
		return await this.chatroomService.createDirectChatroom(dto);
	}

	// @Post('direct-message')
	// async createDirectMessage(@Req() request, @Body() dto: CreateDirectMessageDto): Promise<any> {
	// 	return await this.chatroomService.createDirectMessage(request.user.sub, dto);
	// }
}
