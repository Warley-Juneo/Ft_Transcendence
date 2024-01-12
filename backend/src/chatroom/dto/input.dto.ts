import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class CreateDirectChatroomDto {
	@IsNotEmpty({message: 'Nickname can not be empty.'})
	my_nickname:		string;

	@IsNotEmpty({message: 'Nickname can not be empty.'})
	other_nickname:		string;
}

export class CreateDirectMessageDto {

	@IsNotEmpty({message: 'content can not be empty.'})
	@IsString({message: 'content has to be a string.'})
	content:			string;

	@IsNotEmpty({message: 'my_nickname can not be empty.'})
	my_nickname:		string;

	@IsNotEmpty({message: 'other_nickname can not be empty.'})
	other_nickname:		string;
}

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

export class ChangePasswordDto {
	@IsNotEmpty({message: 'chat_name can not be empty.'})
	chat_name:			string;

	@IsNotEmpty({message: 'old_password can not be empty.'})
	old_password:		string;

	@IsNotEmpty({message: 'new_password can not be empty.'})
	new_password:		string;

	@IsNotEmpty({message: 'confirm_password can not be empty.'})
	confirm_password:	string;
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

export class InputChatroomMessageDto {

	@IsNotEmpty({message: 'Chatroom can not be empty.'})
	content:		string;

	@IsNotEmpty({message: 'Chatroom can not be empty.'})
	chatId:			string;

	@IsNotEmpty({message: 'Chatroom can not be empty.'})
	user_id:		string;

	@IsNotEmpty({message: 'Chatroom can not be empty.'})
	chat_name:		string;
}

export class InputOpenChatroomDto {
	@IsNotEmpty({message: 'Chatroom can not be empty.'})
	chatId:			string;
}
