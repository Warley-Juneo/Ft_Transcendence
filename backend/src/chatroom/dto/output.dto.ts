export class OutputDirectMessageDto {
	msg_id:				string;
	user_nickname:		string;
	content:			string;
	imgUrl:				string;
	date:				Date;	
}

export class OutputDirectMessagesDto {
	direct_message: OutputDirectMessageDto[];
}