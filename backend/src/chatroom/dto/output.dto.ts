export class OutputDirectMessageDto {
	id: string;
	content: string;
	img_url: string;
	user: UniqueUserChatrommDto;
	date: Date;

	constructor(obj: any) {
		this.id = obj.id;
		this.content = obj.content;
		this.img_url = obj.img_url;
		this.user = obj.user;
		this.date = obj.date;
	}
}

// export class OutputDirectMessagesDto {
// 	direct_message: OutputDirectMessageDto[];
// }

export class OutputMessageDto extends OutputDirectMessageDto {
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

	owner_id:			string;
	validate_owner_id:	string;
	exclued_owner_id:	string;

	members:			UniqueUserChatrommDto[];
	validate_member_id:	string;

	admin:				UniqueUserChatrommDto[];
	validate_admin_id:	string;

	password:			string;
	validate_password:	string;
	new_password:		string;
	confirm_password:	string;
}
