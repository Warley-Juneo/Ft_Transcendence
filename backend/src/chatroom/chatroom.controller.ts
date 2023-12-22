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
		console.log("\n\n\n DTO:", dto, "\n\n\n")
		return await this.chatroomService.changePassword(request.user.sub, dto);
	}

	@Post('open-group')
	async	openChatroom(@Req() request, @Body() dto: InputChatroomDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.openChatroom(request.user.sub, dto);
	}

	@Post('add-member-group')
	async	addMemberChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		console.log("cheguei aqui", dto)
		return await this.chatroomService.addMemberChatroom(request.user.sub, dto);
	}

	@Post('exclude-member-group')
	async	excludeMemberChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.excludeMemberChatroom(request.user.sub, dto);
	}

	@Post('add-adm-group')
	async	addAdmChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.addAdmChatroom(request.user.sub, dto);
	}

	@Post('exclude-adm-group')
	async	excludeAdmChatroom(@Req() request, @Body() dto: AddChatUserDto): Promise<UniqueChatroomDto> {
		return await this.chatroomService.excludeAdmChatroom(request.user.sub, dto);
	}

	@Post('open-direct')
	async openDirectChatroom(@Body() dto: CreateDirectChatroomDto): Promise<OutputDirectMessageDto[]> {
		console.log("\n\n\n DTO:", dto, "\n\n\n")
		return await this.chatroomService.openDirectChatroom(dto);
	}

	// @Post('direct-message')
	// async createDirectMessage(@Req() request, @Body() dto: CreateDirectMessageDto): Promise<any> {
	// 	return await this.chatroomService.createDirectMessage(request.user.sub, dto);
	// }
}
