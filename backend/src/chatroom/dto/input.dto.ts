import { IsAscii, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CreateChatroomDto {
	@IsString({message: 'Chatroom name must be a string.'})
	@IsNotEmpty({message: 'Chatroom name can not be empty.'})
	name:			string;
	
	@IsString()
	type:			string;

	@ValidateIf(o => o.password != null)
	@IsString()
	password:		string;

	@IsString()
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

export class AddChatUserDto {
	@IsNotEmpty({message: 'User id can not be empty.'})
	add_id:			string;

	@IsNotEmpty({message: 'Chatroom can not be empty.'})
	chat_name:		string;

}

export class InputChatroomDto {
	@IsNotEmpty({message: 'Chatroom can not be empty.'})
	chat_name:			string;

	@ValidateIf(o => o.password != null)
	@IsString()
	password:		string;
}