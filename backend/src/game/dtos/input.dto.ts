import { IsNotEmpty, isNotEmpty } from "class-validator";

export class InputUserDto {
	@IsNotEmpty()
	user_id:	string;
}

export class DisconnectDto {
	@IsNotEmpty()
	user_id:	string;

	@IsNotEmpty()
	is_active:	boolean;
}
