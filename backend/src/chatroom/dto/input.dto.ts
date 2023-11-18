export class CreateChatroomDto {
	name:		string;
	type:		string;
	password:	string;
	photo:		string;
}

export class CreateDirectChatroomDto {
	userId:		string;
}

export class CreateDirectMessageDto {
	userId:		string;
	content:	string;
	imgUrl:		string;
}