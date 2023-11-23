export class CreateChatroomDto {
	name:			string;
	type:			string;
	password:		string;
	photoUrl:		string;
}

export class CreateDirectChatroomDto {
	user_nickname:		string;
}

export class CreateDirectMessageDto {
	user_nickname:		string;
	content:			string;
	imgUrl:				string;
}

export class AddChatAdmDto {
	adm_nickname:		string;
	chatroomName:		string;
}

export class InputChatroomDto {
	name:			string;
	password:		string;
}