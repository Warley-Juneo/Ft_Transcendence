import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatroomDto {
	@IsString()
	@IsNotEmpty()
	name:			string;
	type:			string;
	@IsString()
	password:		string;
	photoUrl:		string;
}

export class CreateDirectChatroomDto {
	@IsNotEmpty()
	user_nickname:		string;
}

export class CreateDirectMessageDto {
	@IsNotEmpty()
	user_nickname:		string;
	@IsNotEmpty()
	content:			string;
}

export class AddChatAdmDto {
	@IsNotEmpty()
	adm_nickname:		string;
	@IsNotEmpty()
	chatroomName:		string;
}

export class InputChatroomDto {
	@IsNotEmpty()
	name:			string;
	password:		string;
}