export class OutputDirectMessageDto {
	msg_id: 		string;
	user_nickname:	string;
	content:		string;
	imgUrl:			string;
	date:			Date;
}

export class OutputDirectMessagesDto {
	direct_message: OutputDirectMessageDto[];
}

export class OutputMessageDto {
	id:             string;
	content:        string;
	img_url:        string;
	user_nickname:  string;
	user_avatar:	string;
	data:	        Date;
}

export class ChatroomDto {
	id: 			string;
	name: 			string;
	type: 			string;
	photoUrl: 		string;
	owner_nickname: string;
	owner_id:		string;
	users:			string[];
	messages:		OutputMessageDto[];
}

export class ChatroomsDto {
	chatrooms:	ChatroomDto[];
}

export class UniqueUserChatrommDto {
	id:			string;
	nickname:	string;
	avatar:		string;
	is_active:	boolean;
}

export class UniqueChatroomDto {
	id: 			string;
	name: 			string;
	type: 			string;
	password:		string;
	photoUrl: 		string;
	owner_nickname: string;
	owner_id:		string;
	users:			UniqueUserChatrommDto[];
	message:		OutputMessageDto[];
}

