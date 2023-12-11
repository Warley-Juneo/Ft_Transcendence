import { IsNotEmpty, isNotEmpty } from "class-validator";

export class InputUserDto {
	@IsNotEmpty()
	user_id:	string;
}

export class UploadedFileDto {
	@IsNotEmpty()
	content:	BinaryData;

	@IsNotEmpty()
	nickname:	string;
}

export class DisconnectDto {
	@IsNotEmpty()
	user_id:	string;

	@IsNotEmpty()
	is_active:	boolean;
}
