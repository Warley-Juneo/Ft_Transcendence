import { Controller, Body, Post, Req, Get, Delete, Query } from '@nestjs/common';
import { ChangePasswordDto, CreateChatroomDto, InputChatroomDto } from './dto/input.dto';
import { ChatroomService } from './chatroom.service';
import { CreateDirectChatroomDto, AddChatUserDto } from './dto/input.dto';
import { ChatroomsDto, OutputDirectMessageDto, UniqueChatroomDto } from './dto/output.dto';

@Controller('chatroom')
export class ChatroomController {
	constructor(private readonly chatroomService: ChatroomService) { }

	@Get('find-all-public')
	async findAllPublicChatrooms(): Promise<ChatroomsDto> {
		return await this.chatroomService.findAllPublicChatrooms();
	}

	//TODO: Criei essa rota como prova de conceito mas o faustão vai validar ela
	@Get('find-public')
	async findPublicChatroom(@Query() dto: InputChatroomDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.findPublicChatroom(dto);
	}

	@Get('find-private')
	async	findPrivateChatroom(@Req() request): Promise<ChatroomsDto> {
		return await this.chatroomService.findPrivateChatroom(request.user.sub);
	}

	@Post('create-group')
	async createChatroom(@Req() request, @Body() dto: CreateChatroomDto): Promise<ChatroomsDto> {
		let response =  await this.chatroomService.createChatroom(request.user.sub, dto);
		return response;
	}

	@Delete('delete-group')
	async	deleteChatroom(@Req() request, @Body() dto: InputChatroomDto): Promise <any> {
		return await this.chatroomService.deleteChatroom(request.user.sub, dto);
	}

	@Post('change-password-group')
	async	changePassword(@Req() request, @Body() dto: ChangePasswordDto): Promise<any> {
		return await this.chatroomService.changePassword(request.user.sub, dto);
	}

	@Post('open-group')
	async	openChatroom(@Req() request, @Body() dto: InputChatroomDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.openChatroom(request.user.sub, dto);
	}

	@Post('add-member-group')
	async	addMemberChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.addMemberChatroom(request.user.sub, dto);
	}

	@Post('ban-member-group')
	async	banMemberChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.banMemberChatroom(request.user.sub, dto);
	}

	@Post('add-adm-group')
	async	addAdmChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.addAdmChatroom(request.user.sub, dto);
	}

	@Post('remove-adm-group')
	async	removeAdmChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.removeAdmChatroom(request.user.sub, dto);
	}

	// @Post('kick-member-group')
	// async	kickMemberChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<void> {
	// 	return await this.chatroomService.kickMemberChatroom(request.user.sub, dto);
	// }

	@Post('open-direct')
	async openDirectChatroom(@Body() dto: CreateDirectChatroomDto): Promise<OutputDirectMessageDto[]> {
		return await this.chatroomService.openDirectChatroom(dto);
	}

	// @Post('direct-message')
	// async createDirectMessage(@Req() request, @Body() dto: CreateDirectMessageDto): Promise<any> {
	// 	return await this.chatroomService.createDirectMessage(request.user.sub, dto);
	// }
}
