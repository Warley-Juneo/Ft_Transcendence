export class OutputDirectMessageDto {
	msg_id: string;
	user_nickname: string;
	content: string;
	imgUrl: string;
	date: Date;
}

export class OutputDirectMessagesDto {
	direct_message: OutputDirectMessageDto[];
}

export class ChatroomDto {
	id: string;
	name: string;
	type: string;
	photoUrl: string;
	owner_nickname: string;
	owner_id:		string;
}

export class ChatroomsDto {
	chatrooms: ChatroomDto[];
}

