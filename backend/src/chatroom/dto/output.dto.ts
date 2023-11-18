export class OutputDirectMessageDto {
	userId:		string;
	content:	string;
	imgUrl:		string;
}

export class OutputDirectMessagesDto {
	direct_message: OutputDirectMessageDto[];
}