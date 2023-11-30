export class OutputDirectMessageDto {
	id: string;
	content: string;
	img_url: string;
	user: UniqueUserChatrommDto;
	date: Date;
}

export class OutputDirectMessagesDto {
	direct_message: OutputDirectMessageDto[];
}

export class OutputMessageDto {
	id: string;
	content: string;
	img_url: string;
	user: UniqueUserChatrommDto;
	date: Date;
}

export class ChatroomsDto {
	chatrooms: UniqueChatroomDto[];
}

export class UniqueUserChatrommDto {
	id: string;
	nickname: string;
	avatar: string;
	is_active: boolean;
}

export class UniqueChatroomDto {
	id: string;
	name: string;
	type: string;
	password: string;
	photoUrl: string;
	owner_nickname: string;
	owner_id: string;
	members: UniqueUserChatrommDto[];
	admin: UniqueUserChatrommDto[];
	banned: UniqueUserChatrommDto[];
	message: OutputMessageDto[];
}



export class OutputValidateDto {
	chat_name:			string;
	type:				string;
	
	owner_id:			string;
	validate_owner_id:	string;

	members:			UniqueUserChatrommDto[];
	validate_member_id:	string;

	admin:				UniqueUserChatrommDto[];
	validate_admin_id:	string;

	password:			string;
	validate_password:	string;
}
