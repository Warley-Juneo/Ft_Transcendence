import { IsNotEmpty, isNotEmpty } from "class-validator";

export class InputUserDto {
	@IsNotEmpty()
	user_id:	string;
}
