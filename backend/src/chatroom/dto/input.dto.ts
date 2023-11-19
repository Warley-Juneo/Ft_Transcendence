export class CreateChatroomDto {
	name:			string;
	type:			string;
	password:		string;
	photoUrl:		string;
}

export class CreateDirectChatroomDto {
	userId:		string;
}

export class CreateDirectMessageDto {
	userId:		string;
	content:	string;
	imgUrl:		string;
}

export class AddChatAdmDto {
	adm_nickname:		string;
	chatroomName:		string;
}