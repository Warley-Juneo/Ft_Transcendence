import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateChatroomDto {
	@IsString({message: 'Chatroom name must be a string.'})
	@IsNotEmpty({message: 'Chatroom name can not be empty.'})
	name:			string;
	
	type:			string;
	
	password:		string;
	
	photoUrl:		string;
}

export class CreateDirectChatroomDto {
	@IsNotEmpty({message: 'Nickname can not be empty.'})
	user_nickname:		string;
}

export class CreateDirectMessageDto {
	@IsNotEmpty({message: 'Nickname can not be empty.'})
	user_nickname:		string;

	@IsNotEmpty()
	content:			string;
}

export class AddChatAdmDto {
	@IsNotEmpty({message: 'Admin name can not be empty.'})
	adm_nickname:		string;
	
	@IsNotEmpty({message: 'Chatroom can not be empty.'})
	chatroomName:		string;
}

export class InputChatroomDto {
	@IsNotEmpty({message: 'Chatroom can not be empty.'})
	name:			string;
	
	password:		string;
}